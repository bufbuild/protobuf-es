import assert from "node:assert";
import { suite, test } from "node:test";
import { arrayLiteral, isArrayLiteral } from "./array.js";

void suite("isArrayLiteral()", () => {
  void test("true", () => {
    const literal = arrayLiteral();

    assert(
      isArrayLiteral(literal),
      "`isArrayLiteral()` must return `true` for `ArrayLiteral` instance",
    );
  });
  void test("false", () => {
    assert(
      !isArrayLiteral({}),
      "`isArrayLiteral()` must return `false` for empty object",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const literal = arrayLiteral("foo", "bar");

    assert.equal(
      literal.toString(),
      '["foo", "bar"]',
      "A barebones `ArrayLiteral` instance must print correctly",
    );
  });
});
