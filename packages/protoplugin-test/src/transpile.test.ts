// Copyright 2021-2024 Buf Technologies, Inc.
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

import { describe, expect, test } from "@jest/globals";
import { createTestPluginAndRun } from "./helpers";

describe("built-in transpile", () => {
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

  describe("ECMAScript types", () => {
    test("global Promise type transpiles", async () => {
      const linesDts = await testTranspileToDts([
        `export const p = Promise.resolve(true);`,
      ]);
      expect(linesDts).toStrictEqual([
        `export declare const p: Promise<boolean>;`,
      ]);
    });
  });

  describe("TypeScript built-in types", () => {
    test("global ReturnType transpiles", async () => {
      const linesDts = await testTranspileToDts([
        `export const n: ReturnType<typeof parseInt> = 1;`,
      ]);
      expect(linesDts).toStrictEqual([
        `export declare const n: ReturnType<typeof parseInt>;`,
      ]);
    });
  });

  describe("DOM types", () => {
    test("global Headers transpiles", async () => {
      const linesDts = await testTranspileToDts([
        `export const h = new Headers();`,
      ]);
      expect(linesDts).toStrictEqual([`export declare const h: Headers;`]);
    });
  });

  describe("runtime types", () => {
    test("JsonValue transpiles", async () => {
      const linesDts = await testTranspileToDts([
        `import type { JsonValue } from "@bufbuild/protobuf";`,
        `export const j: JsonValue = 1;`,
      ]);
      expect(linesDts).toStrictEqual([
        `import type { JsonValue } from "@bufbuild/protobuf";`,
        `export declare const j: JsonValue;`,
      ]);
    });
  });

  describe("unknown type", () => {
    test("is not inferred correctly", async () => {
      const linesDts = await testTranspileToDts([
        `import { Foo } from "foo";`,
        ``,
        `export function foo() { return new Foo(); };`,
      ]);
      // The return type is inferred as `any` instead of the expected
      // `Foo`. This is a limitation of the TypeScript compiler.
      expect(linesDts).toStrictEqual([`export declare function foo(): any;`]);
    });
    test("can be typed explicitly", async () => {
      const linesDts = await testTranspileToDts([
        `import { Foo } from "foo";`,
        ``,
        `export function foo(): Foo { return new Foo(); };`,
      ]);
      expect(linesDts).toStrictEqual([
        `import { Foo } from "foo";`,
        `export declare function foo(): Foo;`,
      ]);
    });
  });
});
