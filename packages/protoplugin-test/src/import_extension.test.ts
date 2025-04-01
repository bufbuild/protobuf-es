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

import { describe, expect, test } from "@jest/globals";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

describe("import_extension", function () {
  test("should default to 'none'", async () => {
    const lines = await testGenerate("target=ts", (f) => {
      const Bar = f.import("Bar", "./foo/bar_pb.js");
      f.print(Bar);
    });
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb";',
      "",
      "Bar",
    ]);
  });
  test.each([
    { option: "js", ext: ".js" },
    { option: ".js", ext: ".js" },
    { option: "ts", ext: ".ts" },
    { option: ".ts", ext: ".ts" },
  ])("should be replaced with option '$option'", async ({ option, ext }) => {
    const lines = await testGenerate(
      `target=ts,import_extension=${option}`,
      (f) => {
        const Bar = f.import("Bar", "./foo/bar_pb.js");
        f.print(Bar);
      },
    );
    expect(lines).toStrictEqual([
      `import { Bar } from "./foo/bar_pb${ext}";`,
      "",
      "Bar",
    ]);
  });
  test.each([
    { option: "none", ext: "" },
    { option: "", ext: "" },
  ])(
    "should be removed with with option '$option'",
    async ({ option, ext }) => {
      const lines = await testGenerate(
        `target=ts,import_extension=${option}`,
        (f) => {
          const Bar = f.import("Bar", "./foo/bar_pb.js");
          f.print(Bar);
        },
      );
      expect(lines).toStrictEqual([
        `import { Bar } from "./foo/bar_pb${ext}";`,
        "",
        "Bar",
      ]);
    },
  );
  test("throws error for unknown extension", async () => {
    await expect(async () => {
      await testGenerate("target=mjs", (f) => {
        const Bar = f.import("Bar", "./foo/bar_pb.js");
        f.print(Bar);
      });
    }).rejects.toThrow(`invalid option "target=mjs"`);
  });
  test("should only touch .js import paths", async () => {
    const lines = await testGenerate("target=ts,import_extension=ts", (f) => {
      const json = f.import("json", "./foo/bar_pb.json");
      f.print(json);
    });
    expect(lines).toStrictEqual([
      'import { json } from "./foo/bar_pb.json";',
      "",
      "json",
    ]);
  });

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
