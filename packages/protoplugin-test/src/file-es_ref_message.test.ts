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
import { createTestPluginAndRun } from "./helpers.js";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";

describe("file print", () => {
  test(`should print "es_ref_message" Printable`, async () => {
    const lines = await testGenerate((f, schema) => {
      f.print({
        kind: "es_ref_message",
        type: schema.files[0].messages[0],
        typeOnly: false,
      });
    });
    expect(lines).toStrictEqual([
      `import { Person } from "./x_pb.js";`,
      ``,
      `Person`,
    ]);
  });
  test(`should print "es_ref_message" Printable type-only`, async () => {
    const lines = await testGenerate((f, schema) => {
      f.print({
        kind: "es_ref_message",
        type: schema.files[0].messages[0],
        typeOnly: true,
      });
    });
    expect(lines).toStrictEqual([
      `import type { Person } from "./x_pb.js";`,
      ``,
      `Person`,
    ]);
  });

  async function testGenerate(opt: (f: GeneratedFile, schema: Schema) => void) {
    return createTestPluginAndRun({
      proto: `
          syntax="proto3";
          message Person {}
          `,
      parameter: "target=ts",
      generateAny: opt,
      returnLinesOfFirstFile: true,
    });
  }
});
