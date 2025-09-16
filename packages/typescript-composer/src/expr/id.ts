import { Node, type UnknownNodeInput } from "../plumbing.js";
import { hasNodeInputProperty } from "../plumbing.js";
import { type ExprNode, exprProvider, exprProxy } from "./expr.js";

class IdNode implements Node<"id"> {
  static readonly kind = "id";
  readonly family = Node.Family.EXPR;
  readonly kind = "id";

  private constructor(readonly id: string) {}

  toString() {
    return this.id;
  }

  static marshal(input: IdInput): Id {
    if (IdNode.is(input)) return input;
    if (IdNode.#isObjectInput(input)) return IdNode.marshal(input.id);

    return exprProxy(new IdNode(input));
  }

  static is(input: UnknownNodeInput): input is Id {
    // safe because we control instantiation
    return input instanceof IdNode;
  }

  static isInput(input: UnknownNodeInput): input is IdInput {
    return (
      IdNode.is(input) ||
      IdNode.#isObjectInput(input) ||
      typeof input === "string"
    );
  }

  static #isObjectInput(input: UnknownNodeInput): input is { id: string } {
    return hasNodeInputProperty(input, "id") && typeof input.id === "string";
  }
}

export type IdInput = string | { id: string } | IdNode;
export type Id = ExprNode<IdNode>;
export const Id = exprProvider(IdNode);
export const { id, isId, isIdInput } = Id;
