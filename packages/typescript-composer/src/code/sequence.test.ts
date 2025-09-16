import assert from "node:assert";
import { suite, test } from "node:test";
import { codeSequence, isCodeSequence } from "./sequence.js";

void suite("isCodeSequence()", () => {
  void test("true", () => {
    const code = codeSequence([""]);

    assert(
      isCodeSequence(code),
      "`isCodeSequence()` must return `true` for `CodeSequence` instance",
    );
  });
  void test("false", () => {
    assert(
      !isCodeSequence({}),
      "`isCodeSequence()` must return `false` for empty object",
    );
  });
});

void suite("codeSequence()", () => {
  void test("identity", () => {
    const code = codeSequence([""]);

    assert.equal(
      codeSequence(code),
      code,
      "`codeSequence()` must be idempotent",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const code = codeSequence(["foo"]);

    assert.equal(
      code.toString(),
      "foo",
      "A barebones `CodeSequence` instance must print correctly",
    );
  });
});
