import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import { type Id, type IdInput, id, isIdInput } from "../expr/id.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";
import type { Transformer } from "../plumbing.js";
import { type BlockInput, blockish, isBlockInput } from "./block.js";
import type { Stmt } from "./stmt.js";

class ForOfNode implements Node<"forOf", Node.Family.STMT> {
  static readonly kind = "forOf";
  readonly kind = "forOf";
  readonly family = Node.Family.STMT;
  readonly for: Id;
  readonly of: Expr;
  readonly then: Stmt;

  private constructor(item: Id, items: Expr, then: Stmt) {
    this.for = item;
    this.of = items;
    this.then = then;
  }

  toString() {
    return `for (const ${this.for} of ${this.of}) ${this.then}`;
  }

  transform(_: Transformer) {
    return this;
  }

  static marshal(
    forId: IdInput,
    inExpr: ExprInput,
    then: FofOfThenInput,
  ): ForOf;
  static marshal(input: ForOfInput): ForOf;
  static marshal(...i: ForOfTuple | [ForOfInput]): ForOf {
    const [itemId, of, thenStmt] =
      i.length === 1 ? [i[0].for, i[0].of, i[0].then] : i;
    const item = id(itemId);
    const then = typeof thenStmt === "function" ? thenStmt(item) : thenStmt;

    return new ForOfNode(item, expr(of), blockish(then));
  }

  static is(input: UnknownNodeInput): input is ForOf {
    return input instanceof ForOfNode;
  }

  static isInput(input: UnknownNodeInput): input is ForOfInput {
    return (
      hasNodeInputProperty(input, "for") &&
      isIdInput(input.for) &&
      hasNodeInputProperty(input, "of") &&
      isExprInput(input.for) &&
      hasNodeInputProperty(input, "then") &&
      (isBlockInput(Array.isArray(input.then) ? input.then : [input.then]) ||
        typeof input.then === "function")
    );
  }
}

type FofOfThenInput = BlockInput | ((item: Id) => BlockInput);
type ForOfTuple = [IdInput, ExprInput, FofOfThenInput];
export type ForOfInput = { for: IdInput; of: ExprInput; then: FofOfThenInput };
export type ForOf = ForOfNode;
export const ForOf = provider(ForOfNode);
export const { forOf, isForOf, isForOfInput } = ForOf;
