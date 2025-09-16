import assert from "node:assert";
import { suite, test } from "node:test";
import { block, isBlock } from "./block.js";

void suite("isBlock()", () => {
  void test("true", () => {
    const statement = block();

    assert(
      isBlock(statement),
      "`isBlock()` must return `true` for `Block` instance",
    );
  });
  void test("false", () => {
    assert(!isBlock({}), "`isBlock()` must return `false` for empty object");
  });
});

void suite("block()", () => {
  void test("identity", () => {
    const statement = block();

    assert.equal(block(statement), statement, "`block()` must be idempotent");
  });
});

void suite("block print", () => {
  void test("barebones", () => {
    const statement = block();

    assert.equal(
      statement.toString(),
      "{\n\n}",
      "A barebones `Block` instance must print correctly",
    );
  });
});
