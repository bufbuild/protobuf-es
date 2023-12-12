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
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { createTestPluginAndRun } from "./helpers";

describe("file string", () => {
  test("surrounds string in quotes", async () => {
    const lines = await testGenerate((f) => {
      f.print("const s = ", f.string("abc"), ";");
    });
    expect(lines).toStrictEqual([`const s = "abc";`]);
  });

  test("surrounds string in quotes", async () => {
    const lines = await testGenerate((f) => {
      f.print(f.string("abc"));
    });
    expect(lines).toStrictEqual([`"abc"`]);
  });

  test("escapes quote", async () => {
    const lines = await testGenerate((f) => {
      f.print(f.string(`ab"c`));
    });
    expect(lines).toStrictEqual([`"ab\\"c"`]);
  });

  test("escapes backslash", async () => {
    const lines = await testGenerate((f) => {
      f.print(f.string("ab\\c"));
    });
    expect(lines).toStrictEqual([`"ab\\\\c"`]);
  });

  test("escapes line breaks", async () => {
    const lines = await testGenerate((f) => {
      f.print(f.string("ab\r\nc"));
    });
    expect(lines).toStrictEqual([`"ab\\r\\nc"`]);
  });

  async function testGenerate(gen: (f: GeneratedFile) => void) {
    return await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny: gen,
      parameter: "target=ts",
      returnLinesOfFirstFile: true,
    });
  }
});
