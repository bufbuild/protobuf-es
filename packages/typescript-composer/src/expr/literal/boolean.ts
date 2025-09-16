import { Node, type UnknownNodeInput } from "../../plumbing.js";
import { type ExprNode, exprProvider, exprProxy } from "../expr.js";

export class BooleanLiteralNode implements Node<"booleanLiteral"> {
  static readonly kind = "booleanLiteral";
  readonly kind = "booleanLiteral";
  readonly family = Node.Family.EXPR;
  static #registry: BooleanLiteral[] = [];

  private constructor(readonly value: boolean) {}

  toString() {
    return this.value ? "true" : "false";
  }

  static marshal(input: BooleanLiteralInput): BooleanLiteral {
    if (BooleanLiteralNode.is(input)) return input;

    const found = BooleanLiteralNode.#registry.find((v) => v.value === input);
    if (found) return found;

    const created = exprProxy(new BooleanLiteralNode(input));
    BooleanLiteralNode.#registry.push(created);

    return created;
  }

  static is(input: UnknownNodeInput): input is BooleanLiteral {
    return input instanceof BooleanLiteralNode;
  }

  static isInput(input: UnknownNodeInput): input is BooleanLiteralInput {
    return BooleanLiteralNode.is(input) || typeof input === "boolean";
  }
}

export type BooleanLiteralInput = BooleanLiteral | boolean;
export type BooleanLiteral = ExprNode<BooleanLiteralNode>;
export const BooleanLiteral = exprProvider(BooleanLiteralNode);
export const { booleanLiteral, isBooleanLiteral, isBooleanLiteralInput } =
  BooleanLiteral;
