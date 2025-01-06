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
import type { Printable } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

describe("GeneratedFile.array", () => {
  test("creates an array literal", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      returnLinesOfFirstFile: true,
      generateAny: (f) => {
        const arr: Printable = f.array(["foo", 1, true]);
        f.print(arr);
      },
    });
    expect(lines).toStrictEqual(["[foo, 1, true]"]);
  });
});
