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
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { Schema } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { assert, getDescriptorSet } from "./helpers";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";

/**
 * Generates a single file using the plugin framework and the given print function,
 * passing the given options to the plugin.
 * Uses descriptorset.bin for the code generator request.
 * The returned string array represents the generated file content created using printFn.
 */
function generate(
  printFn: (f: GeneratedFile, schema: Schema) => void,
  options: string[]
): string[] {
  const req = new CodeGeneratorRequest({
    parameter: `target=ts,${options.join(",")}`,
  });
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

describe("rewrite_imports", function () {
  test("example works as documented", () => {
    const lines = generate(
      (f) => {
        const Bar = f.import("Bar", "./foo/bar_pb.js");
        const Baz = f.import("Baz", "./foo/bar/baz_pb.js");
        f.print`console.log(${Bar}, ${Baz});`;
      },
      ["rewrite_imports=./foo/**/*_pb.js:@scope/pkg"]
    );
    expect(lines).toStrictEqual([
      'import { Bar } from "@scope/pkg/foo/bar_pb.js";',
      'import { Baz } from "@scope/pkg/foo/bar/baz_pb.js";',
      "",
      "console.log(Bar, Baz);",
    ]);
  });
  test("should rewrite runtime import to other package", () => {
    const lines = generate(
      (f, schema) => {
        f.print`${schema.runtime.ScalarType}.INT32`;
      },
      ["rewrite_imports=@bufbuild/protobuf:@scope/pkg"]
    );
    expect(lines).toStrictEqual([
      'import { ScalarType } from "@scope/pkg";',
      "",
      "ScalarType.INT32",
    ]);
  });
  test("should rewrite npm import to other package", () => {
    const lines = generate(
      (f) => {
        const exampleDesc = getDescriptorSet().messages.get("example.Person");
        assert(exampleDesc);
        const Foo = f.import("Foo", "@scope/pkg");
        f.print`${Foo}`;
      },
      ["rewrite_imports=@scope/pkg:@other-scope/other-pkg"]
    );
    expect(lines).toStrictEqual([
      'import { Foo } from "@other-scope/other-pkg";',
      "",
      "Foo",
    ]);
  });
});
