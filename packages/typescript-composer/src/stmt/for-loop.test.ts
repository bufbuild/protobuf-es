import assert from "node:assert";
import { suite, test } from "node:test";
import { id } from "../expr/id.js";
import { inline } from "../expr/inline.js";
import { varDeclList } from "../expr/var-decl-list.js";
import { varDecl } from "../expr/var-decl.js";
import { block } from "./block.js";
import { forLoop, isForLoop } from "./for-loop.js";

void suite("isForLoop()", () => {
  void test("true", () => {
    const loop = forLoop(
      varDeclList(varDecl(id("foo"))),
      inline(),
      inline(),
      block(),
    );

    assert(
      isForLoop(loop),
      "isForLoop() must return true for ForLoop instance",
    );
  });
  void test("false", () => {
    assert(!isForLoop({}), "isForLoop() must return false for empty object");
  });
});

void suite("print", () => {
  void test("barebones", () => {
    const loop = forLoop(
      varDeclList(varDecl(id("foo"))),
      inline(),
      inline(),
      block(),
    );

    assert.equal(
      loop.toString(),
      "for (let foo; ; ) {\n\n}",
      "A barebones ForLoop instance must print correctly",
    );
  });
});
