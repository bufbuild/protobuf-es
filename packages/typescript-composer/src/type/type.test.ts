import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { isType, type } from "./type.js";

void suite("isType()", () => {
  void test("true", () => {
    const value = type(id("Foo"));

    assert(isType(value), "`isType()` must return `true` for `Type` instance");
  });
  void test("false", () => {
    assert(!isType({}), "`isType()` must return `false` for empty object");
  });
});

void suite("type()", () => {
  void test("identity", () => {
    const value = type(id("Foo"));

    assert.equal(type(value), value, "`type()` must be idempotent");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const value = type(id("Foo"));

    assert.equal(
      value.toString(),
      "Foo",
      "A barebones `Type` instance must print correctly",
    );
  });
});
