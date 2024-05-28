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
import type { FileInfo } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

describe("bring your own transpile", () => {
  test("does not transpile target=ts", async () => {
    const lines = await testGenerate("target=ts");
    expect(lines).toStrictEqual(["fake typescript source"]);
  });

  test("transpiles to target js", async () => {
    const lines = await testGenerate("target=js");
    expect(lines).toStrictEqual(["fake transpiled to js"]);
  });

  test("transpiles to target dts", async () => {
    const lines = await testGenerate("target=dts");
    expect(lines).toStrictEqual(["fake transpiled to dts"]);
  });

  async function testGenerate(parameter: string) {
    return await createTestPluginAndRun({
      returnLinesOfFirstFile: true,
      proto: `syntax="proto3";`,
      parameter,
      generateTs: (schema) => {
        const f = schema.generateFile("test.ts");
        f.print("fake typescript source");
      },
      transpile: (files, transpileJs, transpileDts) => {
        const out: FileInfo[] = [];
        for (const file of files) {
          if (transpileJs) {
            switch (file.content) {
              case "fake typescript source\n":
                out.push({
                  name: "test.js",
                  preamble: file.preamble,
                  content: "fake transpiled to js\n",
                });
                break;
              default:
                out.push({
                  name: "test.js",
                  preamble: file.preamble,
                  content: "failed to transpile to js\n",
                });
                break;
            }
          }
          if (transpileDts) {
            switch (file.content) {
              case "fake typescript source\n":
                out.push({
                  name: "test.d.ts",
                  preamble: file.preamble,
                  content: "fake transpiled to dts\n",
                });
                break;
              default:
                out.push({
                  name: "test.js",
                  preamble: file.preamble,
                  content: "failed to transpile to js\n",
                });
                break;
            }
          }
        }
        return out;
      },
    });
  }
});
