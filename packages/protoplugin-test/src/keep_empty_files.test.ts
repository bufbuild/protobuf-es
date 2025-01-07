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
import { createTestPluginAndRun } from "./helpers.js";

describe("keep_empty_files", () => {
  describe("unset", () => {
    test.each(["js", "ts", "dts"])(
      "does not generate empty file with target %p",
      async (target) => {
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
        expect(res.file.length).toBe(0);
      },
    );
    test.each(["js", "ts", "dts"])(
      "printing empty line generates a file with target %p",
      async (target) => {
        const lines = await createTestPluginAndRun({
          returnLinesOfFirstFile: true,
          proto: `syntax="proto3"; message M {}`,
          parameter: `target=${target}`,
          generateAny: (f) => {
            f.print();
          },
        });
        expect(lines).toStrictEqual([""]);
      },
    );
  });

  describe("set", () => {
    test.each(["js", "ts", "dts"])(
      "generates empty file with target %p",
      async (target) => {
        const res = await createTestPluginAndRun({
          proto: `syntax="proto3"; message M {}`,
          parameter: `target=${target},keep_empty_files=true`,
          generateAny: (f, schema) => {
            // A preamble does not count as non-empty
            f.preamble(schema.files[0]);
          },
        });
        expect(res.file.length).toBe(1);
      },
    );
  });
});
