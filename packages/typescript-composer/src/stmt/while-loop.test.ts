import assert from "node:assert";
import { suite, test } from "node:test";
import { inline } from "../expr/inline.js";
import { block } from "./block.js";
import { isWhileLoop, whileLoop } from "./while-loop.js";

void suite("isWhileLoop()", () => {
  void test("true", () => {
    const loop = whileLoop(inline(), block());

    assert(
      isWhileLoop(loop),
      "isWhileLoop() must return true for WhileLoop instance",
    );
  });
  void test("false", () => {
    assert(
      !isWhileLoop({}),
      "isWhileLoop() must return false for empty object",
    );
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const loop = whileLoop(inline(), block());

    assert.equal(
      loop.toString(),
      "while () {\n\n}",
      "A barebones WhileLoop instance must print correctly",
    );
  });
});
