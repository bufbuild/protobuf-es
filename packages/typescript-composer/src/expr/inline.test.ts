import assert from "node:assert";
import { suite, test } from "node:test";
import { inline, isInline } from "./inline.js";

void suite("isInline()", () => {
  void test("true", () => {
    assert(
      isInline(inline("")),
      "`isInline()` must return `true` for `Inline` instance",
    );
  });
  void test("false", () => {
    assert(!isInline({}), "`isInline()` must return `false` for empty object");
  });
});

void suite("inline()", () => {
  void test("identity", () => {
    const expr = inline("");

    assert.equal(inline(expr), expr, "`inline()` must be idempotent");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      inline("foo"),
      "foo",
      "A barebones `Inline` instance must print correctly",
    );
  });
});
