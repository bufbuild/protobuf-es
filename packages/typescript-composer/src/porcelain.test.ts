import assert from "node:assert";
import { suite, test } from "node:test";
import { compose } from "./porcelain.js";
import { block } from "./stmt/block.js";

void suite("print", () => {
  void test("empty block", () => {
    const statement = block();

    assert.equal(
      statement.toString(),
      "{\n\n}",
      "A barebones `Block` instance must print correctly",
    );
  });
});

void suite.skip("marshalling", () => {
  void test("[]", () => {
    assert.deepEqual(
      compose([]),
      block(),
      "A barebones `Block` instance must marshal correctly",
    );
  });
  void test("[]", () => {
    assert.deepEqual(
      compose([]),
      block(),
      "A barebones `Block` instance must marshal correctly",
    );
  });
});
