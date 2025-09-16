import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { isTypeExpr, typeExpr } from "./type-expr.js";

void suite("isTypeExpr()", () => {
  void test("true", () => {
    const type = typeExpr(id("Foo"));

    assert(
      isTypeExpr(type),
      "`isTypeExpr()` must return `true` for `TypeExpr` instance",
    );
  });
  void test("false", () => {
    assert(
      !isTypeExpr({}),
      "`isTypeExpr()` must return `false` for empty object",
    );
  });
});

void suite("typeExpr()", () => {
  void test("identity", () => {
    const type = typeExpr(id("Foo"));

    assert.equal(typeExpr(type), type, "`typeExpr()` must be idempotent");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const type = typeExpr(id("Foo"));

    assert.equal(
      type.toString(),
      "Foo",
      "A barebones `TypeExpr` instance must print correctly",
    );
  });
});
