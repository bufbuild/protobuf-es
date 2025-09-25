import assert from "node:assert";
import { suite, test } from "node:test";
import { isRet, ret } from "./ret.js";

void suite("isRet()", () => {
  void test("true", () => {
    const value = ret(5);

    assert(isRet(value), "isRet() must ret true for Ret instance");
  });
  void test("false", () => {
    assert(!isRet({}), "isRet() must ret false for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const value = ret(5);

    assert.equal(
      value.toString(),
      "return 5;",
      "A barebones Ret instance must print correctly",
    );
  });
});
