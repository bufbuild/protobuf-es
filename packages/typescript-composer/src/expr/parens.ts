import { Node, type UnknownNodeInput } from "../plumbing.js";
import {
  type Expr,
  type ExprInput,
  type ExprNode,
  expr,
  exprProvider,
  exprProxy,
  isExprInput,
} from "./expr.js";

class ParensNode implements Node<"parens"> {
  static readonly kind = "parens" as const;
  readonly family = Node.Family.EXPR;
  readonly kind = "parens" as const;

  private constructor(readonly value: Expr) {}

  toString(): string {
    return `(${this.value})`;
  }

  static marshal(input: ExprInput): Parens {
    return exprProxy(new ParensNode(expr(input)));
  }

  static is(input: UnknownNodeInput): input is Parens {
    return input instanceof ParensNode;
  }

  static isInput(input: UnknownNodeInput): input is ParensInput {
    return isExprInput(input);
  }
}

export type ParensInput = ExprInput;
export type Parens = ExprNode<ParensNode>;
export const Parens = exprProvider(ParensNode);
export const { parens, isParens, isParensInput } = Parens;
