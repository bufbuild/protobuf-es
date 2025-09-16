import assert from "node:assert";
import { suite, test } from "node:test";
import { isNumberLiteral, numberLiteral } from "./number.js";

void suite("isNumberLiteral()", () => {
  void test("true", () => {
    const literal = numberLiteral(1);

    assert(
      isNumberLiteral(literal),
      "`isNumberLiteral()` must return `true` for `NumberLiteral` instance",
    );
  });
  void test("false", () => {
    assert(
      !isNumberLiteral({}),
      "`isNumberLiteral()` must return `false` for empty object",
    );
  });
});

void suite("numberLiteral()", () => {
  void test("identity", () => {
    assert.equal(
      numberLiteral(1),
      numberLiteral(1),
      "if `x === y`, `numberLiteral(x) === numberLiteral(y)`",
    );
  });
  void test("idempotency", () => {
    const number = numberLiteral(1);

    assert.equal(
      numberLiteral(number),
      number,
      "`numberLiteral()` must be idempotent",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      numberLiteral(1).toString(),
      "1",
      "A barebones `NumberLiteral` instance must print correctly",
    );
  });
});
