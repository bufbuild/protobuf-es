import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "./id.js";
import { isRef, ref } from "./ref.js";
import { varDecl } from "./var-decl.js";

void suite("isRef()", () => {
  void test("true", () => {
    assert(
      isRef(ref(varDecl(id("foo")))),
      "`isRef()` must return `true` for `Ref` instance",
    );
  });
  void test("false", () => {
    assert(!isRef({}), "`isRef()` must return `false` for empty object");
  });
});

void suite("ref()", () => {
  void test("idempotency", () => {
    const expr = ref(varDecl(id("foo")));

    assert.equal(ref(expr), expr, "`ref()` must be idempotent");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      ref(varDecl(id("foo"))).toString(),
      "foo",
      "A barebones `Ref` instance must print correctly",
    );
  });
});
