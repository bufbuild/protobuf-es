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
import { createTestPluginAndRun } from "./helpers";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";

describe("file print", () => {
  test(`should print "es_string" Printable`, async () => {
    const lines = await testGenerate((f) => {
      f.print({
        kind: "es_string",
        value: `ab"c`,
      });
    });
    expect(lines).toStrictEqual([`"ab\\"c"`]);
  });

  async function testGenerate(opt: (f: GeneratedFile, schema: Schema) => void) {
    return createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny: opt,
      returnLinesOfFirstFile: true,
    });
  }
});
