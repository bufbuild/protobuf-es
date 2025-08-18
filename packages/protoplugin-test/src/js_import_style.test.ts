// Copyright 2021-2025 Buf Technologies, Inc.
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
import type { Schema } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

void suite("js_import_style", () => {
  const linesEsm = [
    `import { third } from "party";`,
    "",
    "const thirdParty = third;",
    "export class MyClass {}",
    `import { hand } from "written";`,
    "hand();",
  ];
  void suite("unset", () => {
    for (const target of ["js", "ts", "dts"]) {
      void test(`uses module with target ${target}`, async () => {
        const lines = await testGenerate(`target=${target}`);
        assert.deepStrictEqual(lines, linesEsm);
      });
    }
  });

  void suite("module", () => {
    for (const target of ["js", "ts", "dts"]) {
      void test(`uses module with target ${target}`, async () => {
        const lines = await testGenerate(
          `js_import_style=module,target=${target}`,
        );
        assert.deepStrictEqual(lines, linesEsm);
      });
    }
  });

  void suite("legacy_commonjs", () => {
    for (const target of ["ts", "dts"]) {
      void test(`uses CommonJs with target ${target}`, async () => {
        const lines = await testGenerate(
          `js_import_style=legacy_commonjs,target=${target}`,
        );
        assert.deepStrictEqual(lines, linesEsm);
      });
    }
    test(`uses CommonJs with target "js"`, async () => {
      const lines = await testGenerate(
        "js_import_style=legacy_commonjs,target=js",
      );
      assert.deepStrictEqual(lines, [
        `"use strict";`,
        `Object.defineProperty(exports, "__esModule", { value: true });`,
        "",
        `const { third } = require("party");`,
        "",
        "const thirdParty = third;",
        "class MyClass {}",
        `const { hand } = require("written");`,
        "hand();",
        "",
        "exports.MyClass = MyClass;",
      ]);
    });
    void test("uses CommonJs with built-in transpile", async () => {
      const lines = await testGenerate(
        "js_import_style=legacy_commonjs,target=js",
        true,
      );
      assert.deepStrictEqual(lines, [
        `"use strict";`,
        `Object.defineProperty(exports, "__esModule", { value: true });`,
        "exports.MyClass = void 0;",
        `const party_1 = require("party");`,
        "const thirdParty = party_1.third;",
        "class MyClass {",
        "}",
        "exports.MyClass = MyClass;",
        `const written_1 = require("written");`,
        "(0, written_1.hand)();",
      ]);
    });
  });

  async function testGenerate(
    parameter: string,
    useBuiltInTranspileFromTsToJs = false,
  ) {
    function generateImportAndExportExamples(
      schema: Schema,
      target: "js" | "ts" | "dts",
    ) {
      const f = schema.generateFile(`test.${target}`);
      f.print("const thirdParty = ", f.import("third", "party"), ";");
      f.print(f.export("class", "MyClass"), " {}");
      switch (f.jsImportStyle) {
        case "module":
          f.print(`import { hand } from "written";`);
          break;
        case "legacy_commonjs":
          f.print(`const { hand } = require("written");`);
          break;
      }
      f.print("hand();");
    }

    return await createTestPluginAndRun({
      parameter,
      proto: `syntax="proto3";`,
      generateTs: generateImportAndExportExamples,
      generateJs: useBuiltInTranspileFromTsToJs
        ? undefined
        : generateImportAndExportExamples,
      generateDts: generateImportAndExportExamples,
      returnLinesOfFirstFile: true,
    });
  }
});
