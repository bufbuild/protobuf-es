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
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

void suite("import_extension", () => {
  void test("should default to 'none'", async () => {
    const lines = await testGenerate("target=ts", (f) => {
      const Bar = f.import("Bar", "./foo/bar_pb.js");
      f.print(Bar);
    });
    assert.deepStrictEqual(lines, [
      'import { Bar } from "./foo/bar_pb";',
      "",
      "Bar",
    ]);
  });
  for (const { option, ext } of [
    { option: "js", ext: ".js" },
    { option: ".js", ext: ".js" },
    { option: "ts", ext: ".ts" },
    { option: ".ts", ext: ".ts" },
  ]) {
    void test(`should be replaced with option ${option}`, async () => {
      const lines = await testGenerate(
        `target=ts,import_extension=${option}`,
        (f) => {
          const Bar = f.import("Bar", "./foo/bar_pb.js");
          f.print(Bar);
        },
      );
      assert.deepStrictEqual(lines, [
        `import { Bar } from "./foo/bar_pb${ext}";`,
        "",
        "Bar",
      ]);
    });
  }
  for (const { option, ext } of [
    { option: "none", ext: "" },
    { option: "", ext: "" },
  ]) {
    void test(`should be removed with with option ${option}`, async () => {
      const lines = await testGenerate(
        `target=ts,import_extension=${option}`,
        (f) => {
          const Bar = f.import("Bar", "./foo/bar_pb.js");
          f.print(Bar);
        },
      );
      assert.deepStrictEqual(lines, [
        `import { Bar } from "./foo/bar_pb${ext}";`,
        "",
        "Bar",
      ]);
    });
  }
  void test("throws error for unknown extension", async () => {
    await assert.rejects(
      async () => {
        await testGenerate("target=mjs", (f) => {
          const Bar = f.import("Bar", "./foo/bar_pb.js");
          f.print(Bar);
        });
      },
      {
        name: "PluginOptionError",
        message: `invalid option "target=mjs"`,
      },
    );
  });
  void test("should only touch .js import paths", async () => {
    const lines = await testGenerate("target=ts,import_extension=ts", (f) => {
      const json = f.import("json", "./foo/bar_pb.json");
      f.print(json);
    });
    assert.deepStrictEqual(lines, [
      'import { json } from "./foo/bar_pb.json";',
      "",
      "json",
    ]);
  });
  for (const { option, ext } of [
    { option: "none", ext: "" },
    { option: "js", ext: ".js" },
    { option: "ts", ext: ".ts" },
  ]) {
    void test(`should not touch npm package import with option ${option}`, async () => {
      const lines = await testGenerate(
        `target=ts,import_extension=${option}`,
        (f) => {
          const Foo = f.import("Foo", "foo/foo.js");
          const Local = f.import("Local", "./local_pb.js");
          f.print("console.log(", Foo, ", ", Local, ");");
        },
      );
      // The extension of a published package is fixed. Only the import of
      // generated code is modified.
      assert.deepStrictEqual(lines, [
        'import { Foo } from "foo/foo.js";',
        `import { Local } from "./local_pb${ext}";`,
        "",
        "console.log(Foo, Local);",
      ]);
    });
  }

  async function testGenerate(
    parameter: string,
    gen: (f: GeneratedFile, schema: Schema) => void,
  ) {
    return await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny: gen,
      parameter,
      returnLinesOfFirstFile: true,
    });
  }
});
