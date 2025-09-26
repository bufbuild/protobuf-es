import { id, isIdInput } from "../expr/id.js";
import { Node, type UnknownNodeInput, provider } from "../plumbing.js";
import type { Transformer } from "../plumbing.js";
import { isTypeInput, type } from "../type/type.js";

export class CodeSequenceNode
  implements Node<"codeSequence", Node.Family.CODE>
{
  static readonly kind = "codeSequence";
  readonly kind = "codeSequence";
  readonly family = Node.Family.CODE;

  private constructor(readonly parts: (string | Node<string, Node.Family>)[]) {}

  toString() {
    return this.parts.join("");
  }

  transform(_: Transformer) {
    return this;
  }

  with(...input: CodeSequenceInput[]) {
    const flatInput = input.flat();
    if (flatInput.every((i) => i === "")) return this;
    return CodeSequenceNode.marshal([...this.parts, ...flatInput]);
  }

  static marshal(input: CodeSequenceInput): CodeSequence {
    if (CodeSequenceNode.is(input)) return input;

    return new CodeSequenceNode(
      [input]
        .flat(2)
        .flatMap(
          (
            p,
          ):
            | string
            | Node<string, Node.Family>
            | (string | Node<string, Node.Family>)[] => {
            if (CodeSequenceNode.is(p)) return p.parts;
            if (isIdInput(p)) return id(p);
            if (isTypeInput(p)) return type(p);
            return p;
          },
        ),
    );
  }

  static is(input: UnknownNodeInput): input is CodeSequence {
    return input instanceof CodeSequenceNode;
  }

  static isInput(input: UnknownNodeInput): input is CodeSequenceInput {
    return CodeSequenceNode.is(input) || typeof input === "string";
  }
}

type SingularCodeSequenceInput = Node<string, Node.Family> | string;

type ArrayCodeSequenceInput = SingularCodeSequenceInput[];

export type CodeSequenceInput =
  | SingularCodeSequenceInput
  | ArrayCodeSequenceInput;
export type CodeSequence = CodeSequenceNode;
export const CodeSequence = provider(CodeSequenceNode);
export const { codeSequence, isCodeSequence, isCodeSequenceInput } =
  CodeSequence;
