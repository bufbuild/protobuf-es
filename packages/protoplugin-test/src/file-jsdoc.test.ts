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

describe("GeneratedFile.jsDoc", () => {
  test("creates JSDoc block", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc(`hello world`));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual(["/**", " * hello world", " */"]);
  });

  test("creates JSDoc block for message", async () => {
    const lines = await createTestPluginAndRun({
      proto: `
        syntax="proto3";
        message SomeMessage {};
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        f.print(f.jsDoc(schema.files[0].messages[0]));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual([
      "/**",
      " * @generated from message SomeMessage",
      " */",
    ]);
  });

  test("creates JSDoc block for message with comments", async () => {
    const lines = await createTestPluginAndRun({
      proto: `
        syntax="proto3";
        
        // discarded detached comment
        
        // comment on message
        message SomeMessage {};
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        f.print(f.jsDoc(schema.files[0].messages[0]));
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

  test("creates JSDoc block for message with feature options", async () => {
    const lines = await createTestPluginAndRun({
      proto: `
        edition="2023";
        message SomeMessage {
          option features.json_format = ALLOW;
        }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        f.print(f.jsDoc(schema.files[0].messages[0]));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual([
      "/**",
      " * @generated from message SomeMessage",
      " * @generated with option features.json_format = ALLOW",
      " */",
    ]);
  });

  test("creates JSDoc block for enum with feature options", async () => {
    const lines = await createTestPluginAndRun({
      proto: `
        edition="2023";
        enum SomeEnum {
          option features.enum_type = OPEN;
          SOME_ENUM_UNSPECIFIED = 0;
        }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        f.print(f.jsDoc(schema.files[0].enums[0]));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual([
      "/**",
      " * @generated from enum SomeEnum",
      " * @generated with option features.enum_type = OPEN",
      " */",
    ]);
  });

  test("indents", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc(`multi-line\ncomment`, "  "));
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
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc(`*/`));
      },
      returnLinesOfFirstFile: true,
    });
    expect(lines).toStrictEqual(["/**", " * *\\/", " */"]);
  });

  test("whitespace is unmodified", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc(`\na\n b\n  c\t`));
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
