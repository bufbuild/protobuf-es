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
import type { Schema } from "@bufbuild/protoplugin";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";

describe("file string", () => {
  test("surrounds string in quotes", () => {
    const lines = testGenerate((f) => {
      f.print("const s = ", f.string("abc"), ";");
    });
    expect(lines).toStrictEqual([`const s = "abc";`]);
  });

  test("surrounds string in quotes", () => {
    const lines = testGenerate((f) => {
      f.print(f.string("abc"));
    });
    expect(lines).toStrictEqual([`"abc"`]);
  });

  test("escapes quote", () => {
    const lines = testGenerate((f) => {
      f.print(f.string(`ab"c`));
    });
    expect(lines).toStrictEqual([`"ab\\"c"`]);
  });

  test("escapes backslash", () => {
    const lines = testGenerate((f) => {
      f.print(f.string("ab\\c"));
    });
    expect(lines).toStrictEqual([`"ab\\\\c"`]);
  });

  test("escapes line breaks", () => {
    const lines = testGenerate((f) => {
      f.print(f.string("ab\r\nc"));
    });
    expect(lines).toStrictEqual([`"ab\\r\\nc"`]);
  });

  function testGenerate(gen: (f: GeneratedFile) => void) {
    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs: generateAny,
      generateJs: generateAny,
      generateDts: generateAny,
    });

    function generateAny(schema: Schema) {
      gen(schema.generateFile("test.ts"));
    }

    const req = new CodeGeneratorRequest({
      parameter: "target=js",
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
