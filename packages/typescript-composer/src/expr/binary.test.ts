import assert from "node:assert";
import { suite, test } from "node:test";
import { binary, isBinary } from "./binary.js";
import { numberLiteral } from "./literal/number.js";

void suite("isBinary()", () => {
  void test("true", () => {
    assert(
      isBinary(binary(numberLiteral(1), "===", numberLiteral(1))),
      "`isBinary()` must return `true` for `Binary` instance",
    );
  });
  void test("false for `{}`", () => {
    assert(!isBinary({}), "`isBinary()` must return `false` for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      binary(numberLiteral(1), "===", numberLiteral(1)).toString(),
      "1 === 1",
      "A barebones `Binary` instance must print correctly",
    );
  });
});
