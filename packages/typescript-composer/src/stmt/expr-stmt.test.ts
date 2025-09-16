import assert from "node:assert";
import { suite, test } from "node:test";
import { inline } from "../expr/inline.js";
import { exprStmt, isExprStmt } from "./expr-stmt.js";

void suite("isExprStmt()", () => {
  void test("true", () => {
    const statement = exprStmt(inline("foo"));

    assert(
      isExprStmt(statement),
      "`isExprStmt()` must return `true` for `ExprStmt` instance",
    );
  });
  void test("false", () => {
    assert(
      !isExprStmt({}),
      "`isExprStmt()` must return `false` for empty object",
    );
  });
});

void suite("exprStmt()", () => {
  void test("idempotency", () => {
    const statement = exprStmt(inline("foo"));

    assert.equal(
      exprStmt(statement),
      statement,
      "`exprStmt()` must be idempotent",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const statement = exprStmt(inline('console.log("hello")'));

    assert.equal(
      statement.toString(),
      'console.log("hello");',
      "A barebones `ExprStmt` instance must print correctly",
    );
  });
});
