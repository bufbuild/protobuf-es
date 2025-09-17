import assert from "node:assert";
import { suite, test } from "node:test";
import { access } from "./access.js";
import { call } from "./call.js";
import { id } from "./id.js";

void suite("dynamic expression access", () => {
  void test("dynamic expression property access", () => {
    const base = id("foo");
    const expect = access(base, "bar");

    assert.deepEqual(
      base.$bar,
      expect,
      '`x.$y` must be equivalent to `access(x, "y")`',
    );
  });
  void test("dynamic expression calling", () => {
    const base = id("foo");
    const expect = call(base, "bar");

    assert.deepEqual(
      base.$("bar"),
      expect,
      "`x(y)` must be equivalent to `call(x, y)`",
    );
  });
});
