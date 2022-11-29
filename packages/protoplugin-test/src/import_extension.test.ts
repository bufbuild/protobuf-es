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

import { createEcmaScriptPlugin, Schema } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";

/**
 * Generates a single file using the plugin framework and the given print function,
 * passing the given options to the plugin.
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

describe("import_extension", function () {
  test("should be replaced with '.ts'", () => {
    const lines = generate(
      (f) => {
        const Bar = f.import("Bar", "./foo/bar_pb.js");
        f.print`${Bar}`;
      },
      ["import_extension=.ts"]
    );
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb.ts";',
      "",
      "Bar",
    ]);
  });
  test("should be removed with ''", () => {
    const lines = generate(
      (f) => {
        const Bar = f.import("Bar", "./foo/bar_pb.js");
        f.print`${Bar}`;
      },
      ["import_extension="]
    );
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb";',
      "",
      "Bar",
    ]);
  });
  test("should only touch .js import paths", () => {
    const lines = generate(
      (f) => {
        const json = f.import("json", "./foo/bar_pb.json");
        f.print`${json}`;
      },
      ["import_extension=.ts"]
    );
    expect(lines).toStrictEqual([
      'import { json } from "./foo/bar_pb.json";',
      "",
      "json",
    ]);
  });
});
