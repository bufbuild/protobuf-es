// Copyright 2021-2023 Buf Technologies, Inc.
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
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";

describe("js_import_style", () => {
  const linesEsm = [
    `import { third } from "party";`,
    ``,
    `const thirdParty = third;`,
    `export class MyClass {}`,
    `import { hand } from "written";`,
    `hand();`,
  ];
  describe("unset", () => {
    test.each(["js", "ts", "dts"])("uses module with target %p", (target) => {
      const lines = testGenerate(`target=${target}`);
      expect(lines).toStrictEqual(linesEsm);
    });
  });

  describe("module", () => {
    test.each(["js", "ts", "dts"])("uses module with target %p", (target) => {
      const lines = testGenerate(`js_import_style=module,target=${target}`);
      expect(lines).toStrictEqual(linesEsm);
    });
  });

  describe("legacy_commonjs", () => {
    test.each(["ts", "dts"])("uses CommonJs with target %p", (target) => {
      const lines = testGenerate(
        `js_import_style=legacy_commonjs,target=${target}`,
      );
      expect(lines).toStrictEqual(linesEsm);
    });
    test(`uses CommonJs with target "js"`, () => {
      const lines = testGenerate(`js_import_style=legacy_commonjs,target=js`);
      expect(lines).toStrictEqual([
        `"use strict";`,
        `Object.defineProperty(exports, "__esModule", { value: true });`,
        ``,
        `const { third } = require("party");`,
        ``,
        "const thirdParty = third;",
        `class MyClass {}`,
        `const { hand } = require("written");`,
        `hand();`,
        ``,
        `exports.MyClass = MyClass;`,
      ]);
    });
    test(`uses CommonJs with built-in transpile`, () => {
      const lines = testGenerate(
        `js_import_style=legacy_commonjs,target=js`,
        true,
      );
      expect(lines).toStrictEqual([
        `"use strict";`,
        `Object.defineProperty(exports, "__esModule", { value: true });`,
        `exports.MyClass = void 0;`,
        `const party_1 = require("party");`,
        `const thirdParty = party_1.third;`,
        `class MyClass {`,
        `}`,
        `exports.MyClass = MyClass;`,
        `const written_1 = require("written");`,
        `(0, written_1.hand)();`,
      ]);
    });
  });

  function testGenerate(
    parameter: string,
    useBuiltInTranspileFromTsToJs = false,
  ) {
    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs: generateImportAndExportExamples,
      generateJs: useBuiltInTranspileFromTsToJs
        ? undefined
        : generateImportAndExportExamples,
      generateDts: generateImportAndExportExamples,
    });

    function generateImportAndExportExamples(
      schema: Schema,
      target: "js" | "ts" | "dts",
    ) {
      const f = schema.generateFile(`test.${target}`);
      f.print("const thirdParty = ", f.import("third", "party"), ";");
      f.print(f.exportDecl("class", "MyClass"), " {}");
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
    const req = new CodeGeneratorRequest({
      parameter,
    });
    const res = plugin.run(req);
    expect(res.file.length).toBeGreaterThanOrEqual(1);
    let content = res.file[0]?.content ?? "";
    if (content.endsWith("\n")) {
      content = content.slice(0, -1); // trim final newline so we don't return an extra line
    }
    return content.split("\n");
  }
});
