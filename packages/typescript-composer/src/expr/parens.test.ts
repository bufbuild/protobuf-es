import assert from "node:assert";
import { suite, test } from "node:test";
import { isParens, parens } from "./parens.js";

void suite("isParens()", () => {
  void test("true", () => {
    const value = parens(5);

    assert(isParens(value), "isParens() must return true for Parens instance");
  });
  void test("false", () => {
    assert(!isParens({}), "isParens() must return false for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const value = parens(5);

    assert.equal(
      value.toString(),
      "(5)",
      "A barebones Parens instance must print correctly",
    );
  });
});
