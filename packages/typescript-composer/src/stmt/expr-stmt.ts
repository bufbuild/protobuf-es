import { type Expr, type ExprInput, expr, isExprInput } from "../expr/expr.js";
import {
  Node,
  type Transformer,
  type UnknownNodeInput,
  provider,
} from "../plumbing.js";

class ExprStmtNode implements Node<"exprStmt", Node.Family.STMT> {
  static readonly kind = "exprStmt";
  readonly kind = "exprStmt";
  readonly family = Node.Family.STMT;

  private constructor(readonly expr: Expr) {}

  toString() {
    return `${this.expr};`;
  }

  transform(t: Transformer) {
    return t.replace(this, () => new ExprStmtNode(this.expr.transform(t)));
  }

  static marshal(input: ExprStmtInput): ExprStmt {
    if (ExprStmtNode.is(input)) return input;
    if (isExprInput(input)) return new ExprStmtNode(expr(input));
    return new ExprStmtNode(input);
  }

  static is(input: UnknownNodeInput): input is ExprStmt {
    return input instanceof ExprStmtNode;
  }

  static isInput(input: UnknownNodeInput): input is ExprStmtInput {
    return ExprStmtNode.is(input) || isExprInput(input);
  }
}

export type ExprStmtInput = ExprStmtNode | ExprInput;
export type ExprStmt = ExprStmtNode;
export const ExprStmt = provider(ExprStmtNode);
export const { exprStmt, isExprStmt, isExprStmtInput } = ExprStmt;
