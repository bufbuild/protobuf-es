// Copyright 2021-2022 Buf Technologies, Inc.
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

import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import { createEcmaScriptPlugin, Schema } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";

/**
 * Generates a single file using the plugin framework and the given print function.
 * The returned string array represents the generated file content created using printFn.
 */
function generateSingleFile(printFn: (f: GeneratedFile) => void): string[] {
  const req = new CodeGeneratorRequest({
    parameter: `target=ts`,
  });
  const plugin = createEcmaScriptPlugin({
    name: "test-plugin",
    version: "v99.0.0",
    generateTs: (schema: Schema) => {
      const f = schema.generateFile("test.ts");
      printFn(f);
    },
  });
  const res = plugin.run(req);
  if (res.file.length !== 1) {
    throw new Error(`no file generated`);
  }

  const content = res.file[0].content ?? "";
  return content.trim().split("\n");
}

describe("print with tagged template literal", function () {
  test("one line with symbol", () => {
    const lines = generateSingleFile((f) => {
      const Foo = f.import("Foo", "foo");
      f.print`export function foo(): ${Foo} { return new ${Foo}(); };`;
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "foo";',
      "",
      "export function foo(): Foo { return new Foo(); };",
    ]);
  });
  test("multi lines with symbol", () => {
    const lines = generateSingleFile((f) => {
      const Foo = f.import("Foo", "foo");
      f.print`export function foo(): ${Foo} {
  return new ${Foo}();
};`;
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "foo";',
      "",
      "export function foo(): Foo {",
      "  return new Foo();",
      "};",
    ]);
  });
  test("with empty lines", () => {
    const lines = generateSingleFile((f) => {
      const Foo = f.import("Foo", "foo");
      f.print`
export function foo(): ${Foo} {

  return new ${Foo}();
};
`;
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "foo";',
      "",
      "",
      "export function foo(): Foo {",
      "",
      "  return new Foo();",
      "};",
    ]);
  });
  test("empty literal", () => {
    const lines = generateSingleFile((f) => {
      f.print``;
    });
    expect(lines).toStrictEqual([""]);
  });
  test("with only symbol", () => {
    const lines = generateSingleFile((f) => {
      const Foo = f.import("Foo", "foo");
      f.print`${Foo}`;
    });
    expect(lines).toStrictEqual(['import { Foo } from "foo";', "", "Foo"]);
  });
});
