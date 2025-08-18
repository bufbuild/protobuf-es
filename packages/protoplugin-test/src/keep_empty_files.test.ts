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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import { createTestPluginAndRun } from "./helpers.js";

void suite("keep_empty_files", () => {
  void suite("unset", () => {
    for (const target of ["js", "ts", "dts"]) {
      void test(`does not generate empty file with target ${target}`, async () => {
        const res = await createTestPluginAndRun({
          proto: `
            // detached syntax comment
            
            // syntax comment
            syntax="proto3";
            
            // detached package comment
            
            // package comment
            package test;
            
            message M {}
            `,
          parameter: `target=${target}`,
          generateAny: (f, schema) => {
            // A preamble does not count as non-empty
            f.preamble(schema.files[0]);
            // An unused import does not count as non-empty
            f.import("foo", "bar");
            // An unused export declaration does not count as non-empty
            f.export("foo", "bar");
          },
        });
        assert.strictEqual(res.file.length, 0);
      });
    }
    for (const target of ["js", "ts", "dts"]) {
      void test(`printing empty line generates a file with target ${target}`, async () => {
        const lines = await createTestPluginAndRun({
          returnLinesOfFirstFile: true,
          proto: `syntax="proto3"; message M {}`,
          parameter: `target=${target}`,
          generateAny: (f) => {
            f.print();
          },
        });
        assert.deepStrictEqual(lines, [""]);
      })
    }
  });
  void suite("set", () => {
    for (const target of ["js", "ts", "dts"]) {
      void test(`generates empty file with target ${target}`, async () => {
        const res = await createTestPluginAndRun({
          proto: `syntax="proto3"; message M {}`,
          parameter: `target=${target},keep_empty_files=true`,
          generateAny: (f, schema) => {
            // A preamble does not count as non-empty
            f.preamble(schema.files[0]);
          },
        });
        assert.strictEqual(res.file.length, 1);
      })
    }
  });
});
