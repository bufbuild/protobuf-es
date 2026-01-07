// Copyright 2021-2026 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { suite, test } from "node:test";
import * as assert from "node:assert";
import { createTestPluginAndRun } from "./helpers.js";

void suite("built-in transpile", () => {
  async function testTranspileToDts(linesTs: string[]) {
    return await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=dts",
      returnLinesOfFirstFile: true,
      generateTs: (schema) => {
        const f = schema.generateFile("test.ts");
        for (const line of linesTs) {
          f.print(line);
        }
      },
    });
  }

  void suite("ECMAScript types", () => {
    void test("global Promise type transpiles", async () => {
      const linesDts = await testTranspileToDts([
        "export const p = Promise.resolve(true);",
      ]);
      assert.deepStrictEqual(linesDts, [
        "export declare const p: Promise<boolean>;",
      ]);
    });
  });

  void suite("TypeScript built-in types", () => {
    void test("global ReturnType transpiles", async () => {
      const linesDts = await testTranspileToDts([
        "export const n: ReturnType<typeof parseInt> = 1;",
      ]);
      assert.deepStrictEqual(linesDts, [
        "export declare const n: ReturnType<typeof parseInt>;",
      ]);
    });
  });

  void suite("DOM types", () => {
    void test("global Headers transpiles", async () => {
      const linesDts = await testTranspileToDts([
        "export const h = new Headers();",
      ]);
      assert.deepStrictEqual(linesDts, ["export declare const h: Headers;"]);
    });
  });

  void suite("runtime types", () => {
    void test("JsonValue transpiles", async () => {
      const linesDts = await testTranspileToDts([
        `import type { JsonValue } from "@bufbuild/protobuf";`,
        "export const j: JsonValue = 1;",
      ]);
      assert.deepStrictEqual(linesDts, [
        `import type { JsonValue } from "@bufbuild/protobuf";`,
        "export declare const j: JsonValue;",
      ]);
    });
  });

  void suite("unknown type", () => {
    void test("is not inferred correctly", async () => {
      const linesDts = await testTranspileToDts([
        `import { Foo } from "foo";`,
        "",
        "export function foo() { return new Foo(); };",
      ]);
      // The return type is inferred as `any` instead of the expected
      // `Foo`. This is a limitation of the TypeScript compiler.
      assert.deepStrictEqual(linesDts, ["export declare function foo(): any;"]);
    });
    void test("can be typed explicitly", async () => {
      const linesDts = await testTranspileToDts([
        `import { Foo } from "foo";`,
        "",
        "export function foo(): Foo { return new Foo(); };",
      ]);
      assert.deepStrictEqual(linesDts, [
        `import { Foo } from "foo";`,
        "export declare function foo(): Foo;",
      ]);
    });
  });

  void suite("failing to emit", () => {
    void test("raises error with helpful message", async () => {
      await assert.rejects(
        async () =>
          testTranspileToDts([
            "export interface Foo {",
            "  p: {",
            "    [K in keyof P]: string;",
            "  },",
            "}",
          ]),
        {
          name: "Error",
          message:
            /^A problem occurred during transpilation and files were not generated\. {2}Contact the plugin author for support\.\n/,
        },
      );
    });
    void test("raises error with diagnostics", async () => {
      await assert.rejects(
        async () =>
          testTranspileToDts([
            "export interface Foo {",
            "  p: {",
            "    [K in keyof P]: string;",
            "  },",
            "}",
          ]),
        /test\.ts\(3,17\): error TS4033: Property 'p' of exported interface has or is using private name 'P'\.$/,
      );
    });
    void test("raises error with 3 diagnostics, and elides the rest", async () => {
      await assert.rejects(
        async () =>
          testTranspileToDts([
            "export interface Foo1 {",
            "  p: {",
            "    [K in keyof P]: string;",
            "  },",
            "}",
            "export interface Foo2 {",
            "  p: {",
            "    [K in keyof P]: string;",
            "  },",
            "}",
            "export interface Foo3 {",
            "  p: {",
            "    [K in keyof P]: string;",
            "  },",
            "}",
            "export interface Foo4 {",
            "  p: {",
            "    [K in keyof P]: string;",
            "  },",
            "}",
            "export interface Foo5 {",
            "  p: {",
            "    [K in keyof P]: string;",
            "  },",
            "}",
          ]),
        /(?:test\.ts\(\d+,\d+\): .+\n){3}2 more diagnostics elided/,
      );
    });
  });
});
