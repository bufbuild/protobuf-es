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

import { describe, expect, it, test } from "@jest/globals";
import { createEcmaScriptPlugin, Schema } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { assert, getDescriptorSet } from "./helpers";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";

/**
 * Generates a single file using the plugin framework and the given print function.
 * Uses descriptorset.bin for the code generator request.
 * The returned string array represents the generated file content created using printFn.
 */
function generate(
  printFn: (f: GeneratedFile, schema: Schema) => void
): string[] {
  const req = new CodeGeneratorRequest({ parameter: "target=ts" });
  const plugin = createEcmaScriptPlugin({
    name: "test-plugin",
    version: "v99.0.0",
    generateTs: (schema: Schema) => {
      const f = schema.generateFile("test.ts");
      printFn(f, schema);
    },
  });
  const res = plugin.run(req);
  if (res.file.length !== 1) {
    throw new Error(`no file generated`);
  }

  const content = res.file[0].content ?? "";
  return content.trim().split("\n");
}

describe("generated file", () => {
  it("should print runtime imports", function () {
    const lines = generate((f, schema) => {
      f.print`${schema.runtime.ScalarType}.INT32`;
    });
    expect(lines).toStrictEqual([
      'import { ScalarType } from "@bufbuild/protobuf";',
      "",
      "ScalarType.INT32",
    ]);
  });
  it("should print npm import", function () {
    const lines = generate((f) => {
      const exampleDesc = getDescriptorSet().messages.get("example.Person");
      assert(exampleDesc);
      const Foo = f.import("Foo", "@scope/pkg");
      f.print`${Foo}`;
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "@scope/pkg";',
      "",
      "Foo",
    ]);
  });
  it("should print relative import", function () {
    const lines = generate((f) => {
      const Foo = f.import("Foo", "./foo_zz.js");
      f.print`${Foo}`;
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "./foo_zz.js";',
      "",
      "Foo",
    ]);
  });
  it("should print https import", function () {
    const lines = generate((f) => {
      const Foo = f.import("Foo", "https://example.com/foo.js");
      f.print`${Foo}`;
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "https://example.com/foo.js";',
      "",
      "Foo",
    ]);
  });
  it("should print descriptor imports", function () {
    const lines = generate((f) => {
      const exampleDesc = getDescriptorSet().messages.get("example.Person");
      assert(exampleDesc);
      f.print`${exampleDesc}.typeName`;
    });
    expect(lines).toStrictEqual([
      'import { Person } from "./proto/person_pb.js";',
      "",
      "Person.typeName",
    ]);
  });

  describe("print with tagged template literal", function () {
    test("one line with symbol", () => {
      const lines = generate((f) => {
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
      const lines = generate((f) => {
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
      const lines = generate((f) => {
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
      const lines = generate((f) => {
        f.print``;
      });
      expect(lines).toStrictEqual([""]);
    });
    test("with only symbol", () => {
      const lines = generate((f) => {
        const Foo = f.import("Foo", "foo");
        f.print`${Foo}`;
      });
      expect(lines).toStrictEqual(['import { Foo } from "foo";', "", "Foo"]);
    });
  });
});
