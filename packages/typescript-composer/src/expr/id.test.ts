import assert from "node:assert";
import { suite, test } from "node:test";
import { id, isId } from "./id.js";

void suite("isId()", () => {
  void test("true", () => {
    assert(isId(id("myVar")), "`isId()` must return `true` for `Id` instance");
  });
  void test("false", () => {
    assert(!isId({}), "`isId()` must return `false` for empty object");
  });
});

void suite("id()", () => {
  void test("identity", () => {
    const expr = id("myVar");

    assert.equal(id(expr), expr, "`id()` must be idempotent");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      id("myVar").toString(),
      "myVar",
      "A barebones `Id` instance must print correctly",
    );
  });
});
