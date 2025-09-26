import type { ExprNode } from "../../expr/expr.js";
import {
  type Expr,
  expr,
  exprProvider,
  exprProxy,
  isExpr,
} from "../../expr/expr.js";
import { Node, type UnknownNodeInput } from "../../plumbing.js";
import type { Transformer } from "../../plumbing.js";
import { type RawLiteralInput, isLiteralInput, literal } from "./literal.js";

export class ArrayLiteralNode implements Node<"arrayLiteral"> {
  static readonly kind = "arrayLiteral";
  readonly kind = "arrayLiteral";
  readonly family = Node.Family.EXPR;

  private constructor(readonly values: Expr[]) {}

  toString() {
    return `[${this.values.join(", ")}]`;
  }

  transform(t: Transformer): ArrayLiteral {
    return t.replace(exprProxy(this), () =>
      ArrayLiteralNode.marshal(this.values.map((v) => v.transform(t))),
    );
  }

  static marshal(...input: ArrayLiteralInput): ArrayLiteral {
    const i = input.map((v) => (isLiteralInput(v) ? literal(v) : expr(v)));

    return exprProxy(new ArrayLiteralNode(i));
  }

  static is(input: UnknownNodeInput): input is ArrayLiteral {
    return input instanceof ArrayLiteralNode;
  }

  static isInput(input: UnknownNodeInput): input is ArrayLiteralInput {
    return (
      Array.isArray(input) && input.every((i) => isExpr(i) || isLiteralInput(i))
    );
  }
}

export type foo = ExprNode<ArrayLiteralNode>;

export type ArrayLiteralInput = (Expr | RawLiteralInput)[];
export type ArrayLiteral = ExprNode<ArrayLiteralNode>;
export const ArrayLiteral = exprProvider(ArrayLiteralNode);
export const { arrayLiteral, isArrayLiteral, isArrayLiteralInput } =
  ArrayLiteral;
