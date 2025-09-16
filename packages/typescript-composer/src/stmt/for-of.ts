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

  static marshal(forId: IdInput, inExpr: ExprInput, then: BlockInput): ForOf;
  static marshal(input: ForOfInput): ForOf;
  static marshal(...input: ForOfTuple | [ForOfInput]): ForOf {
    if (input.length === 1) {
      return new ForOfNode(
        id(input[0].for),
        expr(input[0].of),
        blockish(input[0].then),
      );
    }

    return new ForOfNode(id(input[0]), expr(input[1]), blockish(input[2]));
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
      isBlockInput(Array.isArray(input.then) ? input.then : [input.then])
    );
  }
}

type ForOfTuple = [IdInput, ExprInput, BlockInput];
export type ForOfInput = { for: IdInput; of: ExprInput; then: BlockInput };
export type ForOf = ForOfNode;
export const ForOf = provider(ForOfNode);
export const { forOf, isForOf, isForOfInput } = ForOf;
