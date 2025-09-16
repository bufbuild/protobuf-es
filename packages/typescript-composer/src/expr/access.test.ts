import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { access, isAccess } from "./access.js";

void suite("isAccess()", () => {
  void test("true", () => {
    assert(
      isAccess(access(id("foo"), id("bar"))),
      "`isAccess()` must return `true` for `Access` instance",
    );
  });
  void test("false for `{}`", () => {
    assert(!isAccess({}), "`isAccess()` must return `false` for empty object");
  });
});

void suite("access()", () => {
  void test("tuple", () => {
    const expect = access(id("foo"), id("bar"));

    assert.deepEqual(
      access("foo", "bar"),
      expect,
      '`access(["foo", "bar"])` must be interpreted as a tuple of ids',
    );
  });
  void test("n-tuple", () => {
    const expect = access(access(id("foo"), id("bar")), id("baz"));

    assert.deepEqual(
      access("foo", "bar", "baz"),
      expect,
      '`access("foo", "bar", "baz")` must be interpreted as an n-tuple of ids',
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    assert.equal(
      access(id("foo"), id("bar")).toString(),
      "foo.bar",
      "A barebones `Access` instance must print correctly",
    );
  });
});
