import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { inline } from "../expr/inline.js";
import { block } from "./block.js";
import { forOf, isForOf } from "./for-of.js";

void suite("isForOf()", () => {
  void test("true", () => {
    const loop = forOf(id("foo"), inline("foo"), block());

    assert(isForOf(loop), "isForOf() must return true for ForOf instance");
  });
  void test("false", () => {
    assert(!isForOf({}), "isForOf() must return false for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const loop = forOf(id("foo"), inline("bar"), block());

    assert.equal(
      loop.toString(),
      "for (const foo of bar) {\n\n}",
      "A barebones ForOf instance must print correctly",
    );
  });
});
