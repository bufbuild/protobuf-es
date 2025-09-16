import { type Expr, isExpr } from "../expr/expr.js";
import {
  type RawLiteralInput,
  isLiteralInput,
  literal,
} from "../expr/literal/literal.js";
import { Node, type UnknownNodeInput, isNode } from "../plumbing.js";
import { exprStmt } from "./expr-stmt.js";

export function stmt(input: StmtInput): Stmt {
  if (isStmt(input)) return input;
  if (isExpr(input)) return exprStmt(input);
  return exprStmt(literal(input));
}

export function isStmt(input: UnknownNodeInput): input is Stmt {
  return isNode(input) && input.family === Node.Family.STMT;
}

export function isStmtInput(input: UnknownNodeInput): input is StmtInput {
  return isStmt(input) || isExpr(input) || isLiteralInput(input);
}

export type Stmt = Node<string, Node.Family.STMT>;
export type StmtInput = Stmt | Expr | RawLiteralInput;

export const Stmt = { stmt, isStmt, isStmtInput };

export * from "./arg.js";
export * from "./block.js";
export * from "./expr-stmt.js";
export * from "./for-in.js";
export * from "./for-of.js";
export * from "./for-loop.js";
export * from "./func.js";
export * from "./if-then.js";
export * from "./var-decl-stmt.js";
export * from "./while-loop.js";
