import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import {
  Node,
  type UnknownNodeInput,
  hasNodeInputProperty,
  provider,
} from "../plumbing.js";
import { blockish, isBlockInput } from "./block.js";
import type { BlockInput, Stmt } from "./stmt.js";

export class IfThenNode implements Node<"ifThen", Node.Family.STMT> {
  static readonly kind = "ifThen";
  readonly kind = "ifThen";
  readonly family = Node.Family.STMT;
  readonly if: Expr;
  readonly then: Stmt;
  readonly else?: Stmt;

  private constructor(ifCond: Expr, thenStmt: Stmt, elseStmt?: Stmt) {
    this.if = ifCond;
    this.then = thenStmt;
    this.else = elseStmt;
  }

  toString(): string {
    return `if (${this.if}) ${this.then}${this.else ? ` else ${this.else}` : ""}`;
  }

  static marshal(...input: [IfThenInput] | IfThenTuple): IfThen {
    if (input.length === 1)
      return new IfThenNode(
        expr(input[0].if),
        blockish(input[0].then),
        input[0].else !== undefined ? blockish(input[0].else) : undefined,
      );

    return new IfThenNode(
      expr(input[0]),
      blockish(input[1]),
      input[2] !== undefined ? blockish(input[2]) : undefined,
    );
  }

  static is(input: UnknownNodeInput): input is IfThen {
    return input instanceof IfThenNode;
  }

  static isInput(input: UnknownNodeInput): input is IfThenInput {
    return (
      hasNodeInputProperty(input, "if") &&
      isExprInput(input.if) &&
      hasNodeInputProperty(input, "then") &&
      isBlockInput(Array.isArray(input.then) ? input.then : [input.then]) &&
      (!hasNodeInputProperty(input, "else") ||
        isBlockInput(Array.isArray(input.else) ? input.else : [input.else]))
    );
  }
}

type IfThenTuple =
  | [ExprInput, BlockInput]
  | [ExprInput, BlockInput, BlockInput];

type ObjectIfThenInput = {
  if: ExprInput;
  then: BlockInput;
  else?: BlockInput;
};

export type IfThenInput = IfThenNode | ObjectIfThenInput;
export type IfThen = IfThenNode;
export const IfThen = provider(IfThenNode);
export const { ifThen, isIfThen, isIfThenInput } = IfThen;
