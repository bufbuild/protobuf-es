import assert from "node:assert";
import { suite, test } from "node:test";
import { inline } from "../expr/inline.js";
import { literal } from "../expr/literal/literal.js";
import { block } from "./block.js";
import { exprStmt } from "./expr-stmt.js";
import { isStmt, stmt } from "./stmt.js";

void suite("isStmt()", () => {
  void test("true for Block", () => {
    const stmt = block();

    assert(isStmt(stmt), "`isStmt()` must return `true` for `Block` instance");
  });
  void test("true for ExprStmt", () => {
    const stmt = exprStmt(inline());

    assert(
      isStmt(stmt),
      "`isStmt()` must return `true` for `ExprStmt` instance",
    );
  });
  void test("false", () => {
    assert(!isStmt({}), "`isBlock()` must return `false` for empty object");
  });
});

void suite.skip("stmt()", () => {
  void test("[]", () => {
    assert.deepEqual(
      stmt([]),
      exprStmt(literal([])),
      "stmt([]) must return an empty array literal wrapped in an expression statement",
    );
  });
  void test('""', () => {
    assert.deepEqual(
      stmt(""),
      exprStmt(literal("")),
      'stmt("") must return an ExprStmt wrapping a StringLiteral wrapping an empty string',
    );
  });
});
