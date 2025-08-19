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
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

void suite("rewrite_imports", () => {
  void test("example works as documented", async () => {
    const lines = await testGenerate(
      "target=ts,rewrite_imports=./foo/**/*_pb.js:@scope/pkg",
      (f) => {
        const Bar = f.import("Bar", "./foo/bar_pb.js");
        const Baz = f.import("Baz", "./foo/bar/baz_pb.js");
        f.print("console.log(", Bar, ", ", Baz, ");");
      },
    );
    assert.deepStrictEqual(lines, [
      'import { Bar } from "@scope/pkg/foo/bar_pb";',
      'import { Baz } from "@scope/pkg/foo/bar/baz_pb";',
      "",
      "console.log(Bar, Baz);",
    ]);
  });
  void test("should rewrite npm import to other package", async () => {
    const lines = await testGenerate(
      "target=ts,rewrite_imports=@scope/pkg:@other-scope/other-pkg",
      (f) => {
        const Foo = f.import("Foo", "@scope/pkg");
        f.print(Foo);
      },
    );
    assert.deepStrictEqual(lines, [
      'import { Foo } from "@other-scope/other-pkg";',
      "",
      "Foo",
    ]);
  });
  void test("should rewrite to target with package prefix", async () => {
    const lines = await testGenerate(
      "target=ts,rewrite_imports=@scope/pkg:npm:@scope/pkg",
      (f) => {
        const Foo = f.import("Foo", "@scope/pkg");
        f.print(Foo);
      },
    );
    assert.deepStrictEqual(lines, [
      'import { Foo } from "npm:@scope/pkg";',
      "",
      "Foo",
    ]);
  });
  void test("should rewrite to target with package prefix and subpath", async () => {
    const lines = await testGenerate(
      "target=ts,rewrite_imports=@scope/pkg/subpath:npm:@scope/pkg/subpath",
      (f) => {
        const Foo = f.import("Foo", "@scope/pkg/subpath");
        f.print(Foo);
      },
    );
    assert.deepStrictEqual(lines, [
      'import { Foo } from "npm:@scope/pkg/subpath";',
      "",
      "Foo",
    ]);
  });

  async function testGenerate(
    parameter: string,
    gen: (f: GeneratedFile, schema: Schema) => void,
  ) {
    return await createTestPluginAndRun({
      parameter,
      proto: `syntax="proto3";`,
      generateAny: gen,
      returnLinesOfFirstFile: true,
    });
  }
});
