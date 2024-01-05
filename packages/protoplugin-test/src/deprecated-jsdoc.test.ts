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
import { createJsDocBlock, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";
import { createTestPluginAndRun } from "./helpers";

describe("deprecated makeJsDoc() and createJsDocBlock()", () => {
  test("creates JSDoc comment block", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny(f) {
        f.print(createJsDocBlock(`hello world`));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual(["/**", " * hello world", " */"]);
  });

  test("creates JSDoc comment block for message descriptor", async () => {
    const lines = await createTestPluginAndRun({
      proto: `
        syntax="proto3";
        message SomeMessage {};
       `,
      generateAny(f, schema) {
        f.print(makeJsDoc(schema.files[0].messages[0]));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual([
      "/**",
      " * @generated from message SomeMessage",
      " */",
    ]);
  });

  test("creates JSDoc comment block for message descriptor with comments", async () => {
    const lines = await createTestPluginAndRun({
      proto: `
        syntax="proto3";
        
        // discarded detached comment
        
        // comment on message
        message SomeMessage {};
       `,
      generateAny(f, schema) {
        f.print(makeJsDoc(schema.files[0].messages[0]));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual([
      "/**",
      " * comment on message",
      " *",
      " * @generated from message SomeMessage",
      " */",
    ]);
  });

  test("indents", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny(f) {
        f.print(createJsDocBlock(`multi-line\ncomment`, "  "));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual([
      "  /**",
      "   * multi-line",
      "   * comment",
      "   */",
    ]);
  });

  test("escapes */", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny(f) {
        f.print(createJsDocBlock(`*/`));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual(["/**", " * *\\/", " */"]);
  });

  test("whitespace is unmodified", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny(f) {
        f.print(createJsDocBlock(`\na\n b\n  c\t`));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual([
      "/**",
      " *",
      " * a",
      " *  b",
      " *   c\t",
      " */",
    ]);
  });
});
