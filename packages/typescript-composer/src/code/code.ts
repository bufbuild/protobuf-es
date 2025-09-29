import { expr, isExprInput } from "../expr/expr.js";
import type { ExprInput } from "../expr/expr.js";
import {
  Node,
  type UnknownNodeInput,
  isTemplateStringsArray,
  provider,
} from "../plumbing.js";
import type { Transformer } from "../plumbing.js";
import { isStmt, isStmtInput, stmt } from "../stmt/stmt.js";
import type { StmtInput } from "../stmt/stmt.js";
import { type Type, isType } from "../type/type.js";
import { type CodeSequence, codeSequence, isCodeSequence } from "./sequence.js";

const entropy =
  "f39ed95947bc" +
  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);

class CodeNode implements Node<"code", Node.Family.CODE> {
  static readonly kind = "code";
  readonly kind = "code";
  readonly family = Node.Family.CODE;

  private constructor(
    readonly lines: CodeNodePart[],
    readonly indention: number = 0,
  ) {}

  toString() {
    return this.lines
      .join("\n")
      .split("\n")
      .map((l) => `${" ".repeat(this.indention)}${l}`)
      .join("\n");
  }

  transform(t: Transformer): Code {
    return t.replace(
      this,
      () =>
        new CodeNode(
          this.lines.map((p) => p.transform(t)),
          this.indention,
        ),
    );
  }

  with(...input: CodeNodePart[]) {
    return CodeNode.marshal([...this.lines, ...input], this.indention);
  }

  tail() {
    return new CodeNode(this.lines.slice(1), this.indention);
  }

  static marshal(input: CodeInput, indention?: number): Code;
  static marshal(...input: [CodeInput]): Code;
  static marshal(...input: [CodeInput, number]): Code;
  static marshal(
    segs: TemplateStringsArray,
    ...params: (ExprInput | StmtInput | Type)[]
  ): Code;
  static marshal(
    input: CodeInput | TemplateStringsArray,
    param?: number | ExprInput | StmtInput | Type,
    ...additionalParams: (ExprInput | StmtInput | Type)[]
  ): Code {
    if (isTemplateStringsArray(input)) {
      const params = param !== undefined ? [param, ...additionalParams] : [];
      return CodeNode.tag(input, ...params);
    }

    const indention = param as number;

    if (CodeNode.is(input)) {
      if (indention === undefined || indention === 0) return input;
      return new CodeNode([input], indention);
    }

    const newInput: CodeNodePart[] = [];
    for (const part of input) {
      if (CodeNode.is(part) && part.indention === 0)
        newInput.push(...part.lines);
      else newInput.push(part);
    }

    return new CodeNode(newInput, indention);
  }

  static tag(
    segments: TemplateStringsArray,
    ...params: (ExprInput | StmtInput | Type)[]
  ): Code {
    // In general, we don't want to require that escape sequences are double-escaped, but we still
    // have to allow for escaped backticks, _and_ for escaped backslashes preceding escaped
    // backticks — otherwise there'd be no way to express those sequences.
    const segs = segments.raw.map(
      (s) =>
        s
          .replace(/\\\\\\`/g, entropy) //              Replace \\\` with <entropy>
          .replace(/\\`/g, "`") //                      Replace \` with `
          .replace(new RegExp(entropy, "g"), "\\`"), // Replace <entropy> with \`
    );

    // Require a leading new line. It looks nicer for a multiline template and it
    // helps us ensure the caller is on the same page that this is meant to expand
    // over multiple lines and have inferred indention.
    if (!segs[0].startsWith("\n")) {
      throw new Error("A block template literal must start with a new line.");
    }

    // Some things to be aware of:
    // * The length of segs is always (params.length + 1).
    // * The order of the sequence is:
    //   segs[0] + params[0] + segs[1] + params[1] + ... + segs[n-1] + params[n-1] + segs[n]
    // * If a template literal starts or ends with a parameter, there's still an empty string
    //   segment before or after it, respectively.
    // * Each template segment or parameter may be part of a single line or span multiple lines,
    //   which makes this iteration tricky!

    // We need a stack of line sets because when we encounter deeper indention, we'll have to
    // push onto the stack and use a new line set until indention returns to a higher level.
    const stack: CodeNode[] = [];

    // If we encounter the same level of indention, use the current line set
    // If we encounter less indention, pop the `CodeNode` stack.
    // If we encounter less indention, and there's nothing in the stack to pop, throw an error.
    let currentIndention = CodeNode.checkIndention(
      segs[0].slice(1), // skip the leading new line
    );

    // This is the current line set we've built up to.
    // Line sets are immutable, so we'll use this variable for new line sets
    // with additional lines whenever indention remains the same.
    let currentCodeNode = new CodeNode([]);

    // This is just a container for a sequence of nodes. We think of it as a single line,
    // but it may expand to multiple lines of output. As above, an sequence node is
    // immutable, so we'll replace the ref in this variable whenever we need to
    // append new segments or parameters.
    let currentLine = codeSequence([]);

    let swallowNextSemicolon = false;

    for (let i = 0; i < segs.length; ++i) {
      // ForLoop the first iteration of this loop, continuationOfLastLine will be an empty
      // string, owing to the leading new line. This is good because it means we process the
      // "real" first line as a new line, stripping its indention, but it does mean we'll
      // have an extra leading line at the end to discard.
      const [continuationOfLastLine, ...additionalCodeNode] =
        segs[i].split("\n");

      // Append the continuation to the current line. Note that this may be all we have to do
      // in this loop iteration because the current segment may be internal to a line.
      currentLine = currentLine.with(
        // If a preceding parameter was a complete statement, we want to swallow the next
        // semicolon (either the statement will include a semicolon, or it won't need one).
        swallowNextSemicolon && continuationOfLastLine[0] === ";"
          ? continuationOfLastLine.slice(1)
          : continuationOfLastLine,
      );

      // Whether or not we did swallow one, the directive only applies to the first segment
      // following a complete statement.
      swallowNextSemicolon = false;

      // If the current segment spans lines, for each additional line, create a new one and
      // add the previous one to the current line set. If indention changes, use the
      // stack accordingly.

      for (let j = 0; j < additionalCodeNode.length; ++j) {
        const additionalLine = additionalCodeNode[j];
        currentCodeNode = currentCodeNode.with(currentLine);
        currentLine = codeSequence([]);

        // If this line only has whitespace and there's another additional line following it,
        // OR there are no segments or parameters following it, we know it's a blank line and
        // should have no impact on indention tracking.
        if (
          /^ *$/.test(additionalLine) &&
          (j + 1 < additionalCodeNode.length || i + 1 === segs.length)
        )
          continue;

        const newIndention = CodeNode.checkIndention(additionalLine);
        if (newIndention === currentIndention) {
          // Indention is unchanged, so there's nothing additional to do here.
        } else if (newIndention > currentIndention) {
          // Indention has increased; push the old `currentCodeNode` onto the stack, create a new
          // one with the indention difference, and, update the current indention.
          stack.push(currentCodeNode);
          currentCodeNode = new CodeNode([], newIndention - currentIndention);
          currentIndention = newIndention;
        } else {
          while (newIndention < currentIndention) {
            // Indention has decreased, so let's hope there's something on the stack!
            const previousCodeNode = stack.pop();

            if (previousCodeNode === undefined) {
              throw new Error(
                "The first line of a code template literal must not " +
                  "be indented more than any subsequent lines.",
              );
            }

            // When we pop the stack, we have to add our old line set to the current one!
            currentIndention = currentIndention - currentCodeNode.indention;
            currentCodeNode = previousCodeNode.with(currentCodeNode);
          }

          // Now, on our last pop did we overshoot?
          if (newIndention > currentIndention) {
            stack.push(currentCodeNode);
            currentCodeNode = new CodeNode([], newIndention - currentIndention);
            currentIndention = newIndention;
          }
        }

        // If there are more additional lines, this will get added to the current line set
        // on the next iteration of the inner loop. Otherwise, we have to assume it may be
        // continued on the next iteration of the outer loop.
        currentLine = currentLine.with(additionalLine.slice(currentIndention));
      }

      // The length of segs is always (params.length + 1), so for the last iteration,
      // we won't have a parameter to add.
      if (i < params.length) {
        // We need to check whether we're expecting a statement or an expression. We only expect a
        // Statement if the parameter is alone on its line or is followed only by a semicolon (in
        // which case we will strip a redundant semicolon).
        let expectStatement = false;
        const lastPart = currentLine.parts.length
          ? currentLine.parts.slice(-1)[0]
          : undefined;

        if (
          // Check if non-whitespace precedes this parameter. (Note that whitespace will always be
          // handled via additional `Code` instances with an indention value.)
          (!lastPart ||
            // Alternatively, check if this parameter follows another statement or a verbatim string
            // ending in a semicolon.
            isStmt(lastPart) ||
            (typeof lastPart === "string" &&
              lastPart.length > 0 &&
              lastPart.trim().slice(-1)[0] === ";")) &&
          // Check if a semicolon or newline follows this parameter. Accessing segs[i+1] is safe
          // within this block since there's always a following segment.
          (/^ *(;|\n)/.test(segs[i + 1]) ||
            // Alternatively, check if this is the end of the whole sequence.
            (i === params.length - 1 && ["", ";"].includes(segs[i + 1].trim())))
        )
          expectStatement = true;

        const param = params[i];

        // In this context, strings are always treated as additional raw input; string literals must
        // be pre-wrapped as nodes. Additionally, we never want a type node to be mistaken for an
        // object literal.
        if (typeof param === "string" || isType(param)) {
          currentLine = currentLine.with(param);
        } else if (
          (expectStatement && isStmtInput(param)) ||
          !isExprInput(param)
        ) {
          currentLine = currentLine.with(stmt(param));
          swallowNextSemicolon = true;
        } else {
          currentLine = currentLine.with(expr(param));
        }
      }
    }

    // We don't add the current line to the current line set until we have need to, so we'll
    // always end our loop with the last line leftover.
    currentCodeNode = currentCodeNode.with(currentLine);

    // Now we have to empty the stack and return the top-most line set.
    while (stack.length > 0) {
      currentCodeNode = (stack.pop() as CodeNode).with(currentCodeNode);
    }

    return currentCodeNode.tail();
  }

  static checkIndention(s: string): number {
    return s.search(/([^ ]|$)/); // get position of first non-space character (or end)
  }

  static is(input: UnknownNodeInput): input is Code {
    return input instanceof CodeNode;
  }

  static isInput(input: UnknownNodeInput): input is CodeInput {
    return (
      CodeNode.#isPart(input) ||
      (Array.isArray(input) && input.every((p) => CodeNode.#isPart(p)))
    );
  }

  static #isPart(input: UnknownNodeInput): input is CodeInput {
    return CodeNode.is(input) || isCodeSequence(input);
  }
}

type CodeNodePart = Code | CodeSequence;
export type CodeInput = Code | CodeNodePart[];
export type Code = CodeNode;
export const Code = provider(CodeNode);
export const { code, isCode, isCodeInput } = Code;
