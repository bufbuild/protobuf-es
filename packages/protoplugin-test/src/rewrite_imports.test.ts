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
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import { createTestPluginAndRun } from "./helpers";

describe("rewrite_imports", function () {
  test("example works as documented", async () => {
    const lines = await testGenerate(
      "target=ts,rewrite_imports=./foo/**/*_pb.js:@scope/pkg",
      (f) => {
        const Bar = f.import("Bar", "./foo/bar_pb.js");
        const Baz = f.import("Baz", "./foo/bar/baz_pb.js");
        f.print`console.log(${Bar}, ${Baz});`;
      },
    );
    expect(lines).toStrictEqual([
      'import { Bar } from "@scope/pkg/foo/bar_pb.js";',
      'import { Baz } from "@scope/pkg/foo/bar/baz_pb.js";',
      "",
      "console.log(Bar, Baz);",
    ]);
  });
  test("should rewrite runtime import to other package", async () => {
    const lines = await testGenerate(
      "target=ts,rewrite_imports=@bufbuild/protobuf:@scope/pkg",
      (f, schema) => {
        f.print`${schema.runtime.ScalarType}.INT32`;
      },
    );
    expect(lines).toStrictEqual([
      'import { ScalarType } from "@scope/pkg";',
      "",
      "ScalarType.INT32",
    ]);
  });
  test("should rewrite npm import to other package", async () => {
    const lines = await testGenerate(
      "target=ts,rewrite_imports=@scope/pkg:@other-scope/other-pkg",
      (f) => {
        const Foo = f.import("Foo", "@scope/pkg");
        f.print`${Foo}`;
      },
    );
    expect(lines).toStrictEqual([
      'import { Foo } from "@other-scope/other-pkg";',
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
