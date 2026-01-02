// Copyright 2021-2026 Buf Technologies, Inc.
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

void suite("GeneratedFile.jsDoc", () => {
  void test("creates JSDoc block", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc("hello world"));
      },
      returnLinesOfFirstFile: true,
    });
    assert.deepStrictEqual(lines, ["/**", " * hello world", " */"]);
  });

  void test("creates JSDoc block for message", async () => {
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
    assert.deepStrictEqual(lines, [
      "/**",
      " * @generated from message SomeMessage",
      " */",
    ]);
  });

  void test("creates JSDoc block for message with comments", async () => {
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
    assert.deepStrictEqual(lines, [
      "/**",
      " * comment on message",
      " *",
      " * @generated from message SomeMessage",
      " */",
    ]);
  });

  void test("creates JSDoc block for message with feature options", async () => {
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
    assert.deepStrictEqual(lines, [
      "/**",
      " * @generated from message SomeMessage",
      " * @generated with option features.json_format = ALLOW",
      " */",
    ]);
  });

  void test("creates JSDoc block for enum with feature options", async () => {
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
    assert.deepStrictEqual(lines, [
      "/**",
      " * @generated from enum SomeEnum",
      " * @generated with option features.enum_type = OPEN",
      " */",
    ]);
  });

  void test("indents", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc("multi-line\ncomment", "  "));
      },
      returnLinesOfFirstFile: true,
    });
    assert.deepStrictEqual(lines, [
      "  /**",
      "   * multi-line",
      "   * comment",
      "   */",
    ]);
  });

  void test("escapes */", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc("*/"));
      },
      returnLinesOfFirstFile: true,
    });
    assert.deepStrictEqual(lines, ["/**", " * *\\/", " */"]);
  });

  void test("whitespace is unmodified", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny(f) {
        f.print(f.jsDoc("\na\n b\n  c\t"));
      },
      returnLinesOfFirstFile: true,
    });
    assert.deepStrictEqual(lines, [
      "/**",
      " *",
      " * a",
      " *  b",
      " *   c\t",
      " */",
    ]);
  });
});
