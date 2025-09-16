import assert from "node:assert";
import { suite, test } from "node:test";
import { isStringLiteral, stringLiteral } from "./string.js";

void suite("isStringLiteral()", () => {
  void test("true", () => {
    assert(
      isStringLiteral(stringLiteral("foo")),
      "`isStringLiteral()` must return `true` for `StringLiteral` instance",
    );
  });
  void test("false for `{}`", () => {
    assert(
      !isStringLiteral({}),
      "`isStringLiteral()` must return `false` for empty object",
    );
  });
});

void suite("stringLiteral()", () => {
  void test("identity", () => {
    assert.equal(
      stringLiteral("foo"),
      stringLiteral("foo"),
      "if `x === y`, `stringLiteral(x) === stringLiteral(y)`",
    );
  });
  void test("identity", () => {
    const literal = stringLiteral("foo");

    assert.equal(
      stringLiteral(literal),
      literal,
      "`stringLiteral()` must be idempotent",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      stringLiteral("foo").toString(),
      '"foo"',
      "A barebones `StringLiteral` instance must print correctly",
    );
  });
});
