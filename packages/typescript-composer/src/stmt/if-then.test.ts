import assert from "node:assert";
import { suite, test } from "node:test";
import { inline } from "../expr/inline.js";
import { block } from "./block.js";
import { ifThen, isIfThen } from "./if-then.js";

void suite("isIfThen()", () => {
  void test("true", () => {
    const statement = ifThen(inline("true"), block());

    assert(
      isIfThen(statement),
      "`isIfThen()` must return `true` for `IfThen` instance",
    );
  });
  void test("false", () => {
    assert(!isIfThen({}), "`isIfThen()` must return `false` for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const statement = ifThen(inline("true"), block());

    assert.equal(
      statement.toString(),
      "if (true) {\n\n}",
      "A barebones `IfThen` instance must print correctly",
    );
  });
});
