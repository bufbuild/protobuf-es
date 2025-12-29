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

void suite("GeneratedFile.import", () => {
  void test("should create import symbol for package", async () => {
    await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        const imp = f.import("Foo", "@scope/pkg");
        assert.strictEqual(imp.name, "Foo");
        assert.strictEqual(imp.from, "@scope/pkg");
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
  void test("should create import symbol for relative import", async () => {
    await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        const imp = f.import("Foo", "./foo_zz.js");
        assert.strictEqual(imp.name, "Foo");
        assert.strictEqual(imp.from, "./foo_zz.js");
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
  void test("should create import symbol for https import", async () => {
    await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        const imp = f.import("Foo", "https://example.com/foo.js");
        assert.strictEqual(imp.name, "Foo");
        assert.strictEqual(imp.from, "https://example.com/foo.js");
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
  void test("should honor typeOnly argument", async () => {
    await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        const imp = f.import("Foo", "@scope/pkg", true);
        assert.strictEqual(imp.typeOnly, true);
      },
    });
  });
});
