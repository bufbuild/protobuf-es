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

describe("GeneratedFile.importShape", () => {
  test("should create import symbol for enum descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      enum Foo {
        FOO_UNSPECIFIED = 0;
        FOO_BAR = 1;
      }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importShape(schema.files[0].enums[0]);
        expect(imp.name).toBe("Foo");
        expect(imp.from).toBe("./x_pbv2.js");
        expect(imp.typeOnly).toBe(true);
      },
    });
  });
  test("should create import symbol for message descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Person {}
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importShape(schema.files[0].messages[0]);
        expect(imp.name).toBe("Person");
        expect(imp.from).toBe("./x_pbv2.js");
        expect(imp.typeOnly).toBe(true);
      },
    });
  });
});
