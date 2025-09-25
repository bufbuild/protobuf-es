import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import { type Id, type IdInput, id, isIdInput } from "../expr/id.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";
import { type BlockInput, blockish, isBlockInput } from "./block.js";
import type { Stmt } from "./stmt.js";

class ForInNode implements Node<"forIn", Node.Family.STMT> {
  static readonly kind = "forIn";
  readonly kind = "forIn";
  readonly family = Node.Family.STMT;
  readonly for: Id;
  readonly in: Expr;
  readonly then: Stmt;

  private constructor(item: Id, items: Expr, then: Stmt) {
    this.for = item;
    this.in = items;
    this.then = then;
  }

  toString() {
    return `for (const ${this.for} in ${this.in}) ${this.then}`;
  }

  static marshal(
    forId: IdInput,
    inExpr: ExprInput,
    then: FofInThenInput,
  ): ForIn;
  static marshal(input: ForInInput): ForIn;
  static marshal(...i: ForInTuple | [ForInInput]): ForIn {
    const [itemId, inExpr, thenStmt] =
      i.length === 1 ? [i[0].for, i[0].in, i[0].then] : i;
    const item = id(itemId);
    const then = typeof thenStmt === "function" ? thenStmt(item) : thenStmt;

    return new ForInNode(item, expr(inExpr), blockish(then));
  }

  static is(input: UnknownNodeInput): input is ForIn {
    return input instanceof ForInNode;
  }

  static isInput(input: UnknownNodeInput): input is ForInInput {
    return (
      hasNodeInputProperty(input, "for") &&
      isIdInput(input.for) &&
      hasNodeInputProperty(input, "in") &&
      isExprInput(input.for) &&
      hasNodeInputProperty(input, "then") &&
      (isBlockInput(Array.isArray(input.then) ? input.then : [input.then]) ||
        typeof input.then === "function")
    );
  }
}

type FofInThenInput = BlockInput | ((item: Id) => BlockInput);
type ForInTuple = [IdInput, ExprInput, FofInThenInput];
export type ForInInput = { for: IdInput; in: ExprInput; then: FofInThenInput };
export type ForIn = ForInNode;
export const ForIn = provider(ForInNode);
export const { forIn, isForIn, isForInInput } = ForIn;
