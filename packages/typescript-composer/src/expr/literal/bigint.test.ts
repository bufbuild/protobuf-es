import assert from "node:assert";
import { suite, test } from "node:test";
import { bigIntLiteral, isBigIntLiteral } from "./bigint.js";

void suite("isBigIntLiteral()", () => {
  void test("true", () => {
    const literal = bigIntLiteral(1n);

    assert(
      isBigIntLiteral(literal),
      "`isBigIntLiteral()` must return `true` for `BigIntLiteral` instance",
    );
  });
  void test("false", () => {
    assert(
      !isBigIntLiteral({}),
      "`isBigIntLiteral()` must return `false` for empty object",
    );
  });
  void test("false", () => {
    assert(
      !isBigIntLiteral(1n),
      "`isBigIntLiteral()` must return `false` for unwrapped bigint",
    );
  });
});

void suite("bigIntLiteral()", () => {
  void test("identity", () => {
    assert.equal(
      bigIntLiteral(1n),
      bigIntLiteral(1n),
      "if `x === y`, `bigIntLiteral(x) === bigIntLiteral(y)`",
    );
  });
  void test("idempotency", () => {
    const literal = bigIntLiteral(1n);

    assert.equal(
      bigIntLiteral(literal),
      literal,
      "`bigIntLiteral()` must be idempotent",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      bigIntLiteral(1n).toString(),
      "1n",
      "A barebones `BigIntLiteral` instance must print correctly",
    );
  });
});
