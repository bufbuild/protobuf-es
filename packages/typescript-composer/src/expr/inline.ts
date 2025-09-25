import {
  Node,
  type UnknownNodeInput,
  isTemplateStringsArray,
} from "../plumbing.js";
import { hasNodeInputProperty } from "../plumbing.js";
import type { Type } from "../type/type.js";
import {
  type Expr,
  type ExprInput,
  type ExprNode,
  expr,
  exprProvider,
  exprProxy,
  isExpr,
} from "./expr.js";

export class InlineNode implements Node<"inline"> {
  static readonly kind = "inline" as const;
  readonly kind = "inline" as const;
  readonly family = Node.Family.EXPR;

  private constructor(readonly parts: (string | Expr | Type)[]) {}

  toString() {
    return this.parts.join("");
  }

  with(...input: InlineInput) {
    if (input.every((i) => i === "")) return this;
    return InlineNode.marshal(...this.parts, ...input);
  }

  static marshal(...input: InlineInput): Inline;
  static marshal(
    segments: TemplateStringsArray,
    ...params: (string | ExprInput)[]
  ): Inline;
  static marshal(
    ...uncertainInput:
      | InlineInput
      | [TemplateStringsArray, ...(string | ExprInput)[]]
  ): Inline {
    if (uncertainInput.length === 1) {
      if (InlineNode.is(uncertainInput[0])) return uncertainInput[0];
    }

    if (isTemplateStringsArray(uncertainInput[0])) {
      return InlineNode.tag(
        uncertainInput[0],
        ...(uncertainInput.slice(1) as (string | ExprInput)[]),
      );
    }

    const input = uncertainInput as InlineInput;

    const constructorInput = input.flatMap((p) => {
      if (InlineNode.is(p)) return p.parts;
      if (InlineNode.#isObjectInput(p))
        return InlineNode.marshal(...p.inline).parts;
      return p;
    });

    return exprProxy(new InlineNode(constructorInput.filter((i) => i !== "")));
  }

  static tag(
    segments: TemplateStringsArray,
    ...params: (string | ExprInput)[]
  ): Inline {
    // Forbid a new line beginning, which clearly differentiates this from line set templates.
    if (segments[0].startsWith("\n")) {
      throw new Error(
        "An inline template literal must not start with a new line.",
      );
    }

    let parts: (string | Expr)[] = [];
    for (let i = 0; i < segments.length; ++i) {
      parts.push(segments[i]);

      // The length of segments is always (params.length + 1),
      // so for the last iteration, we won't have a parameter to add.
      if (i < params.length) {
        const param = params[i];
        parts.push(typeof param === "string" ? param : expr(param));
      }
    }

    return InlineNode.marshal(parts[0], ...parts.slice(1));
  }

  static is(input: UnknownNodeInput): input is Inline {
    return input instanceof InlineNode;
  }

  static isInput(input: UnknownNodeInput): input is InlineInput {
    return (
      isExpr(input) ||
      InlineNode.#isObjectInput(input) ||
      typeof input === "string"
    );
  }

  static #isObjectInput(
    input: UnknownNodeInput,
  ): input is { inline: AtomicInlineInput[] } {
    return (
      hasNodeInputProperty(input, "inline") && InlineNode.isInput(input.inline)
    );
  }
}

type AtomicInlineInput = string | Expr | Type | { inline: AtomicInlineInput[] };
export type InlineInput = AtomicInlineInput[];
export type Inline = ExprNode<InlineNode>;
export const Inline = exprProvider(InlineNode);
export const { inline, isInline, isInlineInput } = Inline;
