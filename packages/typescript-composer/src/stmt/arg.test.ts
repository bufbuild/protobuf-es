import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { stringLiteral } from "../expr/literal/string.js";
import { typeExpr } from "../type/type-expr.js";
import { arg, isArg } from "./arg.js";

void suite("isArg()", () => {
  void test("true", () => {
    const statement = arg(id("foo"));

    assert(isArg(statement), "`isArg()` must return `true` for `Arg` instance");
  });
  void test("false", () => {
    assert(!isArg({}), "`isArg()` must return `false` for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const statement = arg(id("foo"));

    assert.equal(
      statement.toString(),
      "foo",
      "A barebones `Arg` instance must print correctly",
    );
  });
  void test("with type", () => {
    const statement = arg(id("foo"), typeExpr(id("Foo")));

    assert.equal(
      statement.toString(),
      "foo: Foo",
      "A barebones `Arg` instance must print correctly",
    );
  });
  void test("with value", () => {
    const statement = arg(id("foo"), stringLiteral("bar"));

    assert.equal(
      statement.toString(),
      'foo = "bar"',
      "A barebones `Arg` instance must print correctly",
    );
  });
  void test("with type and value", () => {
    const statement = arg(id("foo"), typeExpr(id("Foo")), stringLiteral("bar"));

    assert.equal(
      statement.toString(),
      'foo: Foo = "bar"',
      "A barebones `Arg` instance must print correctly",
    );
  });
});
