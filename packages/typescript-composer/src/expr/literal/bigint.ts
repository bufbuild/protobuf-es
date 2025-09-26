import { Node, type UnknownNodeInput } from "../../plumbing.js";
import type { Transformer } from "../../plumbing.js";
import { type ExprNode, exprProvider, exprProxy } from "../expr.js";

export class BigIntLiteralNode implements Node<"bigIntLiteral"> {
  static readonly kind = "bigIntLiteral";
  static readonly #registry: BigIntLiteral[] = [];
  readonly kind = "bigIntLiteral";
  readonly family = Node.Family.EXPR;

  private constructor(readonly value: bigint) {}

  toString() {
    return `${this.value}n`;
  }

  transform(_: Transformer): BigIntLiteral {
    return exprProxy(this);
  }

  static marshal(input: BigIntLiteralInput): BigIntLiteral {
    if (BigIntLiteralNode.is(input)) return input;

    const found = BigIntLiteralNode.#registry.find((v) => v.value === input);
    if (found) return found;

    const created = exprProxy(new BigIntLiteralNode(input));
    BigIntLiteralNode.#registry.push(created);

    return created;
  }

  static is(input: UnknownNodeInput): input is BigIntLiteral {
    return input instanceof BigIntLiteralNode;
  }

  static isInput(input: UnknownNodeInput): input is BigIntLiteralInput {
    return BigIntLiteralNode.is(input) || typeof input === "bigint";
  }
}

export type BigIntLiteralInput = BigIntLiteral | bigint;
export type BigIntLiteral = ExprNode<BigIntLiteralNode>;
export const BigIntLiteral = exprProvider(BigIntLiteralNode);
export const { bigIntLiteral, isBigIntLiteral, isBigIntLiteralInput } =
  BigIntLiteral;
