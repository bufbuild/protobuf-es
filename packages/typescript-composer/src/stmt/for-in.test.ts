import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { inline } from "../expr/inline.js";
import { block } from "./block.js";
import { forIn, isForIn } from "./for-in.js";

void suite("isForIn()", () => {
  void test("true", () => {
    const loop = forIn(id("foo"), inline("foo"), block());

    assert(isForIn(loop), "isForIn() must return true for ForIn instance");
  });
  void test("false", () => {
    assert(!isForIn({}), "isForIn() must return false for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const loop = forIn(id("foo"), inline("bar"), block());

    assert.equal(
      loop.toString(),
      "for (const foo in bar) {\n\n}",
      "A barebones ForIn instance must print correctly",
    );
  });
});
