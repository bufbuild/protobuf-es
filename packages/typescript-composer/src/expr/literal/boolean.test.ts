import assert from "node:assert";
import { suite, test } from "node:test";
import { booleanLiteral, isBooleanLiteral } from "./boolean.js";

void suite("isBooleanLiteral()", () => {
  void test("true", () => {
    const literal = booleanLiteral(true);

    assert(
      isBooleanLiteral(literal),
      "`isBooleanLiteral()` must return `true` for `BooleanLiteral` instance",
    );
  });
  void test("false for `{}`", () => {
    assert(
      !isBooleanLiteral({}),
      "`isBooleanLiteral()` must return `false` for empty object",
    );
  });
  void test("false for `true`", () => {
    assert(
      !isBooleanLiteral(true),
      "`isBooleanLiteral()` must return `false` for unwrapped `true`",
    );
  });
  void test("false for `false`", () => {
    assert(
      !isBooleanLiteral(false),
      "`isBooleanLiteral()` must return `false` for unwrapped `true`",
    );
  });
});

void suite("booleanLiteral()", () => {
  void test("identity", () => {
    assert.equal(
      booleanLiteral(true),
      booleanLiteral(true),
      "`booleanLiteral(true)` strictly equals `booleanLiteral(true)`",
    );
    assert.equal(
      booleanLiteral(false),
      booleanLiteral(false),
      "`booleanLiteral(false)` strictly equals `booleanLiteral(false)`",
    );
  });
  void test("idempotency", () => {
    const literal = booleanLiteral(true);

    assert.equal(
      booleanLiteral(literal),
      literal,
      "`booleanLiteral()` must be idempotent",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      booleanLiteral(true).toString(),
      "true",
      "A barebones `BooleanLiteral` instance must print correctly",
    );
  });
});
