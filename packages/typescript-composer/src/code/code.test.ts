import assert from "node:assert";
import { suite, test } from "node:test";
import { code, isCode } from "./code.js";

void suite("isCode()", () => {
  void test("true", () => {
    const set = code([]);

    assert(isCode(set), "`isCode()` must return `true` for `Code` instance");
  });
  void test("false", () => {
    assert(!isCode({}), "`isCode()` must return `false` for empty object");
  });
});

void suite.skip("code()", () => {
  void test("identity", () => {
    const set = code([]);

    assert.equal(code(set), set, "`code()` must be idempotent");
  });
});

void suite.skip("print", () => {
  void test("empty", () => {
    const set = code([]);

    assert.equal(
      set.toString(),
      "",
      "An empty `Code` instance must print correctly",
    );
  });
});
