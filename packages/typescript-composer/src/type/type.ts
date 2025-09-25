import { type Id, type IdInput, id, isIdInput } from "../expr/id.js";
import { Node, type UnknownNodeInput, provider } from "../plumbing.js";
import { hasNodeInputProperty } from "../plumbing.js";

export class TypeNode implements Node<"type", Node.Family.TYPE> {
  static readonly kind = "type";
  readonly kind = "type";
  readonly family = Node.Family.TYPE;

  private constructor(readonly id: Id) {}

  toString() {
    return this.id.toString();
  }

  static marshal(input: TypeInput): Type {
    if (TypeNode.is(input)) return input;
    if (TypeNode.#isObjectInput(input)) return TypeNode.marshal(input.type);
    if (isIdInput(input)) return new TypeNode(id(input));
    return new TypeNode(input);
  }

  static is(input: UnknownNodeInput): input is Type {
    return input instanceof TypeNode;
  }

  static isInput(input: UnknownNodeInput): input is TypeInput {
    return (
      TypeNode.is(input) ||
      TypeNode.#isObjectInput(input) ||
      isIdInput(input) ||
      typeof input === "string"
    );
  }

  static #isObjectInput(input: UnknownNodeInput): input is ObjectTypeInput {
    return hasNodeInputProperty(input, "type") && isIdInput(input.type);
  }
}

type ObjectTypeInput = {
  type: string | IdInput;
};

export type TypeInput = TypeNode | ObjectTypeInput | IdInput;
export type Type = TypeNode;
export const Type = provider(TypeNode);
export const { type, isType, isTypeInput } = Type;
