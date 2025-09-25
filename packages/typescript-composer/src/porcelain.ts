import { type ExprInput, expr, isExprInput } from "./expr/expr.js";
import { type StmtInput, stmt } from "./stmt/stmt.js";

export * from "./code/code.js";
export * from "./expr/expr.js";
export * from "./stmt/stmt.js";
export * from "./type/type.js";

import * as CodeSpace from "./code/code.js";
import * as ExprSpace from "./expr/expr.js";
import * as StmtSpace from "./stmt/stmt.js";
import * as TypeSpace from "./type/type.js";

export type NodeInput = ExprInput | StmtInput;

export function compose(input: NodeInput) {
  if (isExprInput(input)) return expr(input);
  return stmt(input);
}

Object.assign(compose, CodeSpace);
Object.assign(compose, ExprSpace);
Object.assign(compose, StmtSpace);
Object.assign(compose, TypeSpace);
