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
import type { DescEnum, DescMessage } from "@bufbuild/protobuf";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { createTestPluginAndRun } from "./helpers.js";

describe("file exportDecl", () => {
  test("works as documented", async () => {
    const lines = await testGenerate((f) => {
      const name = "foo";
      f.print(f.exportDecl("const", name), " = 123;");
    });
    expect(lines).toStrictEqual(["export const foo = 123;"]);
  });

  test("declaration can be empty string", async () => {
    const lines = await testGenerate((f) => {
      f.print("const foo = 123;");
      f.print(f.exportDecl("", "foo"), ";");
    });
    expect(lines).toStrictEqual(["const foo = 123;", "export foo;"]);
  });

  test("accepts DescMessage as name", async () => {
    const lines = await testGenerate((f, descMessage) => {
      f.print(f.exportDecl("const", descMessage), " = 123;");
    });
    expect(lines).toStrictEqual(["export const SomeMessage = 123;"]);
  });

  test("accepts DescEnum as name", async () => {
    const lines = await testGenerate((f, _, descEnum) => {
      f.print(f.exportDecl("const", descEnum), " = 123;");
    });
    expect(lines).toStrictEqual(["export const SomeEnum = 123;"]);
  });

  test("forces import with same name to be aliased", async () => {
    const lines = await testGenerate((f) => {
      f.print(f.import("Foo", "pkg"));
      f.print(f.exportDecl("const", "Foo"), " = 123;");
    });
    expect(lines).toStrictEqual([
      `import { Foo as Foo$1 } from "pkg";`,
      ``,
      `Foo$1`,
      `export const Foo = 123;`,
    ]);
  });

  async function testGenerate(
    gen: (
      f: GeneratedFile,
      descMessage: DescMessage,
      descEnum: DescEnum,
    ) => void,
  ) {
    return await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message SomeMessage {}
      enum SomeEnum {
        SOME_ENUM_UNRECOGNIZED = 0;
        SOME_ENUM_A = 1;
      }`,
      parameter: "target=ts",
      generateAny(f, schema) {
        gen(f, schema.files[0].messages[0], schema.files[0].enums[0]);
      },
      returnLinesOfFirstFile: true,
    });
  }
});
