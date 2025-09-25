import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { varDeclList } from "../expr/var-decl-list.js";
import { varDecl } from "../expr/var-decl.js";
import { isVarDeclStmt, varDeclStmt } from "./var-decl-stmt.js";

void suite("isVarDeclStmt()", () => {
  void test("true", () => {
    const statement = varDeclStmt({ const: varDeclList(varDecl(id("foo"))) });

    assert(
      isVarDeclStmt(statement),
      "`isVarDeclStmt()` must return `true` for `VarDeclStmt` instance",
    );
  });
  void test("false", () => {
    assert(
      !isVarDeclStmt({}),
      "`isVarDeclStmt()` must return `false` for empty object",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const statement = varDeclStmt({
      const: varDeclList(varDecl(id("foo")), "bar"),
    });

    assert.equal(
      statement.toString(),
      "const foo, bar;",
      "A barebones `VarDeclStmt` instance must print correctly",
    );
  });
});
