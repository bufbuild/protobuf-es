import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";
import type { Transformer } from "../plumbing.js";
import { blockish } from "./block.js";
import { type Stmt, type StmtInput, isStmtInput } from "./stmt.js";

export class WhileLoopNode implements Node<"whileLoop", Node.Family.STMT> {
  static readonly kind = "whileLoop";
  readonly kind = "whileLoop";
  readonly family = Node.Family.STMT;
  readonly while: Expr;

  private constructor(
    readonly whileCond: Expr,
    readonly then: Stmt,
  ) {
    this.while = whileCond;
  }

  toString() {
    return `while (${this.while}) ${this.then}`;
  }

  transform(_: Transformer) {
    return this;
  }

  static marshal(whileCond: ExprInput, then: StmtInput): WhileLoop;
  static marshal(input: WhileLoopInput): WhileLoop;
  static marshal(...input: WhileLoopTuple | [WhileLoopInput]): WhileLoop {
    if (input.length === 1)
      return new WhileLoopNode(expr(input[0].cond), blockish(input[0].then));

    return new WhileLoopNode(expr(input[0]), blockish(input[1]));
  }

  static is(input: UnknownNodeInput): input is WhileLoopNode {
    return input instanceof WhileLoopNode;
  }

  static isInput(input: UnknownNodeInput): input is WhileLoopInput {
    return (
      hasNodeInputProperty(input, "while") &&
      isExprInput(input.while) &&
      hasNodeInputProperty(input, "then") &&
      isStmtInput(input.then)
    );
  }
}

type WhileLoopTuple = [ExprInput, StmtInput];

export type WhileLoopInput = {
  cond: ExprInput;
  then: StmtInput;
};

export type WhileLoop = WhileLoopNode;
export const WhileLoop = provider(WhileLoopNode);
export const { whileLoop, isWhileLoop, isWhileLoopInput } = WhileLoop;
