import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";
import { type BlockInput, blockish, isBlockInput } from "./block.js";
import type { Stmt } from "./stmt.js";
import {
  type FlexibleVarDeclListInput,
  type VarDeclStmt,
  isVarDeclStmtInput,
  varDeclStmt,
} from "./var-decl-stmt.js";

export class ForLoopNode implements Node<"forLoop", Node.Family.STMT> {
  static readonly kind = "forLoop";
  readonly kind = "forLoop";
  readonly family = Node.Family.STMT;
  readonly for: VarDeclStmt;

  private constructor(
    forVarDecl: VarDeclStmt,
    readonly cond: Expr,
    readonly each: Expr,
    readonly then: Stmt,
  ) {
    this.for = forVarDecl;
  }

  toString() {
    return `for (${this.for}; ${this.cond}; ${this.each}) ${this.then}`;
  }

  static marshal(
    forVarDecl: FlexibleVarDeclListInput,
    cond: ExprInput,
    each: ExprInput,
    then: BlockInput,
  ): ForLoop;
  static marshal(input: ForLoopInput): ForLoop;
  static marshal(...input: ForLoopTuple | [ForLoopInput]): ForLoop {
    if (input.length === 1)
      return new ForLoopNode(
        varDeclStmt({ let: input[0].for }),
        expr(input[0].cond),
        expr(input[0].each),
        blockish(input[0].then),
      );

    return new ForLoopNode(
      varDeclStmt({ let: input[0] }),
      expr(input[1]),
      expr(input[2]),
      blockish(input[3]),
    );
  }

  static is(input: UnknownNodeInput): input is ForLoopNode {
    return input instanceof ForLoopNode;
  }

  static isInput(input: UnknownNodeInput): input is ForLoopInput {
    return (
      hasNodeInputProperty(input, "for") &&
      isVarDeclStmtInput({ let: input.for }) &&
      hasNodeInputProperty(input, "cond") &&
      isExprInput(input.cond) &&
      hasNodeInputProperty(input, "each") &&
      isExprInput(input.each) &&
      hasNodeInputProperty(input, "then") &&
      isBlockInput(Array.isArray(input.then) ? input.then : [input.then])
    );
  }
}

type ForLoopTuple = [
  FlexibleVarDeclListInput,
  ExprInput,
  ExprInput,
  BlockInput,
];
export type ForLoopInput = {
  for: FlexibleVarDeclListInput;
  cond: ExprInput;
  each: ExprInput;
  then: BlockInput;
};

export type ForLoop = ForLoopNode;
export const ForLoop = provider(ForLoopNode);
export const { forLoop, isForLoop, isForLoopInput } = ForLoop;
