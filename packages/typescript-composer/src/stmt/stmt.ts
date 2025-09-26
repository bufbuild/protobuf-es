import { type Expr, isExpr } from "../expr/expr.js";
import { Node, type UnknownNodeInput, isNode } from "../plumbing.js";
import { exprStmt } from "./expr-stmt.js";
import { type ForInInput, forIn, isForInInput } from "./for-in.js";
import { type ForLoopInput, forLoop, isForLoopInput } from "./for-loop.js";
import { type ForOfInput, forOf, isForOfInput } from "./for-of.js";
import { type IfThenInput, ifThen, isIfThenInput } from "./if-then.js";
import { type RetInput, isRetInput, ret } from "./ret.js";
import {
  type VarDeclStmtInput,
  isVarDeclStmtInput,
  varDeclStmt,
} from "./var-decl-stmt.js";
import {
  type WhileLoopInput,
  isWhileLoopInput,
  whileLoop,
} from "./while-loop.js";

export function stmt(input: StmtInput): Stmt {
  if (isStmt(input)) return input;
  if (isExpr(input)) return exprStmt(input);
  if (isForInInput(input)) return forIn(input);
  if (isForLoopInput(input)) return forLoop(input);
  if (isForOfInput(input)) return forOf(input);
  if (isIfThenInput(input)) return ifThen(input);
  if (isRetInput(input)) return ret(input);
  if (isVarDeclStmtInput(input)) return varDeclStmt(input);
  if (isWhileLoopInput(input)) return whileLoop(input);
  throw new Error("Invalid statement input.");
}

export function isStmt(input: UnknownNodeInput): input is Stmt {
  return isNode(input) && input.family === Node.Family.STMT;
}

export function isStmtInput(input: UnknownNodeInput): input is StmtInput {
  return (
    isStmt(input) ||
    isExpr(input) ||
    isForInInput(input) ||
    isForLoopInput(input) ||
    isForOfInput(input) ||
    isIfThenInput(input) ||
    isRetInput(input) ||
    isVarDeclStmtInput(input) ||
    isWhileLoopInput(input)
  );
}

export type Stmt = Node<string, Node.Family.STMT>;
export type StmtInput =
  | Stmt
  | Expr
  | ForInInput
  | ForLoopInput
  | ForOfInput
  | IfThenInput
  | RetInput
  | VarDeclStmtInput
  | WhileLoopInput;

export const Stmt = { stmt, isStmt, isStmtInput };

export * from "./arg.js";
export * from "./block.js";
export * from "./expr-stmt.js";
export * from "./for-in.js";
export * from "./for-of.js";
export * from "./for-loop.js";
export * from "./func.js";
export * from "./if-then.js";
export * from "./ret.js";
export * from "./var-decl-stmt.js";
export * from "./while-loop.js";
