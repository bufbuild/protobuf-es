import assert from "node:assert";
import { suite, test } from "node:test";
import { typeExpr } from "../type/type-expr.js";
import { id } from "./id.js";
import { stringLiteral } from "./literal/string.js";
import { isVarDecl, varDecl } from "./var-decl.js";

void suite("isVarDecl()", () => {
  void test("true", () => {
    const decl = varDecl(id("foo"));

    assert(
      isVarDecl(decl),
      "`isVarDecl()` must return `true` for `VarDecl` instance",
    );
  });
  void test("false", () => {
    assert(
      !isVarDecl({}),
      "`isVarDecl()` must return `false` for empty object",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const decl = varDecl(id("foo"));

    assert.equal(
      decl.toString(),
      "foo",
      "A barebones `VarDecl` instance must print correctly",
    );
  });
  void test("with type", () => {
    const decl = varDecl(id("foo"), typeExpr(id("Foo")));

    assert.equal(
      decl.toString(),
      "foo: Foo",
      "A barebones `VarDecl` instance must print correctly",
    );
  });
  void test("with value", () => {
    const decl = varDecl(id("foo"), stringLiteral("bar"));

    assert.equal(
      decl.toString(),
      'foo = "bar"',
      "A barebones `VarDecl` instance must print correctly",
    );
  });
  void test("with type and value", () => {
    const decl = varDecl(id("foo"), typeExpr(id("Foo")), stringLiteral("bar"));

    assert.equal(
      decl.toString(),
      'foo: Foo = "bar"',
      "A barebones `VarDecl` instance must print correctly",
    );
  });
});
