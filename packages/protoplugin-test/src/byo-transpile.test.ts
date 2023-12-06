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
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { FileInfo } from "@bufbuild/protoplugin/ecmascript";

describe("bring your own transpile", () => {
  test("does not transpile target=ts", () => {
    const lines = testGenerate("target=ts");
    expect(lines).toStrictEqual(["fake typescript source"]);
  });

  test("transpiles to target js", () => {
    const lines = testGenerate("target=js");
    expect(lines).toStrictEqual(["fake transpiled to js"]);
  });

  test("transpiles to target dts", () => {
    const lines = testGenerate("target=dts");
    expect(lines).toStrictEqual(["fake transpiled to dts"]);
  });

  function testGenerate(parameter: string): string[] {
    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
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
    const req = new CodeGeneratorRequest({
      parameter,
    });
    const res = plugin.run(req);
    expect(res.file.length).toBeGreaterThanOrEqual(1);
    const content = res.file[0]?.content ?? "";
    return content.trim().split("\n");
  }
});
