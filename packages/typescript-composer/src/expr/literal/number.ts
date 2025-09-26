import { Node, type UnknownNodeInput } from "../../plumbing.js";
import type { Transformer } from "../../plumbing.js";
import { type ExprNode, exprProvider, exprProxy } from "../expr.js";

export class NumberLiteralNode implements Node<"numberLiteral"> {
  static readonly kind = "numberLiteral";
  static readonly #registry: NumberLiteral[] = [];
  readonly kind = "numberLiteral";
  readonly family = Node.Family.EXPR;

  constructor(readonly value: number) {}

  toString() {
    return String(this.value);
  }

  transform(_: Transformer): NumberLiteral {
    return exprProxy(this);
  }

  static marshal(input: NumberLiteralInput): NumberLiteral {
    if (NumberLiteralNode.is(input)) return input;

    const found = NumberLiteralNode.#registry.find((v) => v.value === input);
    if (found) return found;

    const created = exprProxy(new NumberLiteralNode(input));
    NumberLiteralNode.#registry.push(created);

    return created;
  }

  static is(input: UnknownNodeInput): input is NumberLiteral {
    return input instanceof NumberLiteralNode;
  }

  static isInput(input: UnknownNodeInput): input is NumberLiteralInput {
    return NumberLiteralNode.is(input) || typeof input === "number";
  }
}

export type NumberLiteralInput = NumberLiteral | number;
export type NumberLiteral = ExprNode<NumberLiteralNode>;
export const NumberLiteral = exprProvider(NumberLiteralNode);
export const { numberLiteral, isNumberLiteral, isNumberLiteralInput } =
  NumberLiteral;
