import { Node, type UnknownNodeInput } from "../plumbing.js";
import type { Transformer } from "../plumbing.js";
import {
  type Expr,
  type ExprInput,
  type ExprNode,
  expr,
  exprProvider,
  exprProxy,
  isExprInput,
} from "./expr.js";

class BinaryNode implements Node<"binary"> {
  static readonly kind = "binary";
  readonly family = Node.Family.EXPR;
  readonly kind = "binary";

  static readonly operators = [
    "=", //   assignment

    "??", //  nullish coalescing
    "??=", // nullish coalescing + assignment

    ">", //   greater than
    ">=", //  greater than or equal
    "<", //   less than
    "<=", //  less than or equal

    "==", //  equality
    "!=", //  inequality

    "===", // strict equality
    "!==", // strict inequality

    "+", //   addition
    "/", //   division
    "**", //  exponentiation
    "*", //   multiplication
    "%", //   remainder
    "-", //   subtraction

    "/=", //  division           + assignment
    "**=", // exponentiation    + assignment
    "*=", //  multiplication     + assignment
    "%=", //  remainder          + assignment
    "-=", //  subtraction        + assignment
    "+=", //  addition           + assignment

    "&&", //  logical and
    "||", //  logical or

    "&&=", // logical and        + assignment
    "||=", // logical or         + assignment

    "<<", //  left shift
    ">>", //  right shift

    "<<=", // left shift         + assignment
    ">>=", // right shift        + assignment

    "&", //   bitwise and
    "|", //   bitwise or
    "^", //   bitwise xor

    "&=", //  bitwise and        + assignment
    "|=", //  bitwise or         + assignment
    "^=", //  bitwise xor        + assignment

    "in",
    "instanceof",
  ] as const;

  private constructor(
    readonly left: Expr,
    readonly op: BinaryOperator,
    readonly right: Expr,
  ) {}

  toString() {
    return `${this.left} ${this.op} ${this.right}`;
  }

  transform(_: Transformer): Binary {
    return exprProxy(this);
  }

  static marshal(
    leftOperand: ExprInput,
    operator: BinaryOperator,
    rightOperand: ExprInput,
  ): Binary {
    return exprProxy(
      new BinaryNode(expr(leftOperand), operator, expr(rightOperand)),
    );
  }

  static is(input: UnknownNodeInput): input is Binary {
    return input instanceof BinaryNode;
  }

  static isInput(input: UnknownNodeInput): input is BinaryInput {
    return (
      Array.isArray(input) &&
      input.length === 3 &&
      isExprInput(input[0]) && // left
      BinaryNode.operators.includes(input[1]) && // op
      isExprInput(input[2]) // right
    );
  }
}

type BinaryOperator = (typeof BinaryNode.operators)[number];

export type BinaryInput = Parameters<typeof BinaryNode.marshal>;
export type Binary = ExprNode<BinaryNode>;
export const Binary = exprProvider(BinaryNode);
export const { binary, isBinary, isBinaryInput } = Binary;
