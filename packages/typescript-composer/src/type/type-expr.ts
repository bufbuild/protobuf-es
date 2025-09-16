import { type Id, type IdInput, id, isIdInput } from "../expr/id.js";
import { Node, type UnknownNodeInput, provider } from "../plumbing.js";
import { hasNodeInputProperty } from "../plumbing.js";

export class TypeExprNode implements Node<"typeExpr", Node.Family.TYPE> {
  static readonly kind = "typeExpr";
  readonly kind = "typeExpr";
  readonly family = Node.Family.TYPE;

  private constructor(readonly id: Id) {}

  toString() {
    return this.id.toString();
  }

  static marshal(input: TypeExprInput): TypeExpr {
    if (TypeExprNode.is(input)) return input;
    if (TypeExprNode.#isObjectInput(input))
      return TypeExprNode.marshal(input.type);
    if (isIdInput(input)) return new TypeExprNode(id(input));
    return new TypeExprNode(input);
  }

  static is(input: UnknownNodeInput): input is TypeExpr {
    return input instanceof TypeExprNode;
  }

  static isInput(input: UnknownNodeInput): input is TypeExprInput {
    return (
      TypeExprNode.is(input) ||
      TypeExprNode.#isObjectInput(input) ||
      isIdInput(input) ||
      typeof input === "string"
    );
  }

  static #isObjectInput(input: UnknownNodeInput): input is ObjectTypeExprInput {
    return hasNodeInputProperty(input, "type") && isIdInput(input.type);
  }
}

type ObjectTypeExprInput = {
  type: string | IdInput;
};

export type TypeExprInput = TypeExprNode | ObjectTypeExprInput | IdInput;
export type TypeExpr = TypeExprNode;
export const TypeExpr = provider(TypeExprNode);
export const { typeExpr, isTypeExpr, isTypeExprInput } = TypeExpr;
