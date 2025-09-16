import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { func, isFunc } from "./func.js";

void suite("isFunc()", () => {
  void test("true", () => {
    const statement = func(id("foo"), [], () => []);

    assert(
      isFunc(statement),
      "`isFunc()` must return `true` for `Func` instance",
    );
  });
  void test("false", () => {
    assert(!isFunc({}), "`isFunc()` must return `false` for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      func(id("foo"), [], () => []).toString(),
      "function foo() {\n\n}",
      "A barebones `Func` instance must print correctly",
    );
  });
});
