import assert from "node:assert";
import { suite, test } from "node:test";
import { type } from "../type/type.js";
import { id } from "./id.js";
import { numberLiteral } from "./literal/number.js";
import { isVarDeclList, varDeclList } from "./var-decl-list.js";
import { varDecl } from "./var-decl.js";

void suite("isVarDeclList()", () => {
  void test("true", () => {
    const list = varDeclList(varDecl(id("foo")));

    assert(
      isVarDeclList(list),
      "`isVarDeclList()` must return `true` for `VarDeclList` instance",
    );
  });
  void test("false", () => {
    assert(
      !isVarDeclList({}),
      "`isVarDeclList()` must return `false` for empty object",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const list = varDeclList(
      varDecl(id("foo")),
      varDecl(id("bar"), type(id("Bar")), numberLiteral(5)),
    );

    assert.equal(
      list.toString(),
      "foo, bar: Bar = 5",
      "A barebones `VarDeclList` instance must print correctly",
    );
  });
});
