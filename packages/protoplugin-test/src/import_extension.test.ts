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
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import { createTestPluginAndRun } from "./helpers.js";

describe("import_extension", function () {
  test("should default to 'none'", async () => {
    const lines = await testGenerate("target=ts", (f) => {
      const Bar = f.import("Bar", "./foo/bar_pb.js");
      f.print`${Bar}`;
    });
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb";',
      "",
      "Bar",
    ]);
  });
  test("should be replaced with '.js'", async () => {
    const lines = await testGenerate("target=ts,import_extension=.js", (f) => {
      const Bar = f.import("Bar", "./foo/bar_pb.js");
      f.print`${Bar}`;
    });
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb.js";',
      "",
      "Bar",
    ]);
  });
  test("should be replaced with '.ts'", async () => {
    const lines = await testGenerate("target=ts,import_extension=.ts", (f) => {
      const Bar = f.import("Bar", "./foo/bar_pb.js");
      f.print`${Bar}`;
    });
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb.ts";',
      "",
      "Bar",
    ]);
  });
  test("should be removed with 'none'", async () => {
    const lines = await testGenerate("target=ts,import_extension=none", (f) => {
      const Bar = f.import("Bar", "./foo/bar_pb.js");
      f.print`${Bar}`;
    });
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb";',
      "",
      "Bar",
    ]);
  });
  test("should be removed with ''", async () => {
    const lines = await testGenerate("target=ts,import_extension=", (f) => {
      const Bar = f.import("Bar", "./foo/bar_pb.js");
      f.print`${Bar}`;
    });
    expect(lines).toStrictEqual([
      'import { Bar } from "./foo/bar_pb";',
      "",
      "Bar",
    ]);
  });
  test("should only touch .js import paths", async () => {
    const lines = await testGenerate("target=ts,import_extension=.ts", (f) => {
      const json = f.import("json", "./foo/bar_pb.json");
      f.print`${json}`;
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
