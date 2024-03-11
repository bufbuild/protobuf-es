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
import { createTestPluginAndRun } from "../helpers.js";

describe("GeneratedFile.import", () => {
  test("should create import symbol for package", async function () {
    await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        const imp = f.import("Foo", "@scope/pkg");
        expect(imp.name).toBe("Foo");
        expect(imp.from).toBe("@scope/pkg");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for relative import", async function () {
    await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        const imp = f.import("Foo", "./foo_zz.js");
        expect(imp.name).toBe("Foo");
        expect(imp.from).toBe("./foo_zz.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for https import", async function () {
    await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        const imp = f.import("Foo", "https://example.com/foo.js");
        expect(imp.name).toBe("Foo");
        expect(imp.from).toBe("https://example.com/foo.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
});
