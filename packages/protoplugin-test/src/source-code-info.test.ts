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

import {
  getComments,
  getDeclarationString,
  getPackageComments,
  getSyntaxComments,
} from "@bufbuild/protoplugin";
import { describe, expect, test } from "@jest/globals";
import {
  compileEnum,
  compileField,
  compileFile,
  compileMessage,
} from "./helpers.js";

describe("getComments()", () => {
  test("for syntax", async () => {
    const file = await compileFile(`
      // Copyright ACME, Inc.
      //
      //      http://www.apache.org/licenses/LICENSE-2.0
      //
      // WITHOUT WARRANTIES
      
      // Comment before syntax.
      syntax = "proto3"; // Comment next to syntax.
      // Comment after syntax.
      
      // Comment before package.
      package testcomments;
    `);
    const comments = getSyntaxComments(file);
    expect(comments.leadingDetached).toStrictEqual([
      [
        " Copyright ACME, Inc.",
        "",
        "      http://www.apache.org/licenses/LICENSE-2.0",
        "",
        " WITHOUT WARRANTIES",
        "",
      ].join("\n"),
    ]);
    expect(comments.leading).toBe(" Comment before syntax.\n");
    expect(comments.trailing).toBe(" Comment next to syntax.\n");
  });
  test("for package", async () => {
    const file = await compileFile(`
      // Comment before syntax.
      syntax = "proto3"; // Comment next to syntax.
      // Comment after syntax.
      
      // Comment before package.
      package testcomments; // Comment next to package.
      // Comment after package.
      
      // Comment between package and message.
      
      // Comment before message.
      message MessageWithComments {}
    `);
    const comments = getPackageComments(file);
    expect(comments.leadingDetached[0]).toBe(" Comment after syntax.\n");
    expect(comments.leading).toBe(" Comment before package.\n");
    expect(comments.trailing).toBe(" Comment next to package.\n");
  });
  test("for messages", async () => {
    const message = await compileMessage(`
      syntax="proto3";
      package testcomments; // Comment next to package.
      // Comment after package.
      
      // Comment between package and message.
      
      // Comment before message.
      message MessageWithComments {}
    `);
    const comments = getComments(message);
    expect(comments.leadingDetached).toStrictEqual([
      " Comment after package.\n",
      " Comment between package and message.\n",
    ]);
    expect(comments.leading).toBe(" Comment before message.\n");
    expect(comments.trailing).toBeUndefined();
  });
  test("for fields", async () => {
    const field = await compileField(`
      syntax="proto3";
      message MessageWithComments {
    
        //
        // Comment after start of message,
            // with funny indentation,
        // and empty lines on start and end.
        //
    
        // Comment before field with 5 lines:
        // line 2, next is empty
        //
        // line 4, next is empty
        //
        string foo = 1; // Comment next to field.
        // Comment after field.
      }
    `);
    const comments = getComments(field);
    expect(comments.leadingDetached).toStrictEqual([
      "\n Comment after start of message,\n with funny indentation,\n and empty lines on start and end.\n\n",
    ]);
    expect(comments.leading).toBe(
      " Comment before field with 5 lines:\n line 2, next is empty\n\n line 4, next is empty\n\n",
    );
    expect(comments.trailing).toBe(" Comment next to field.\n");
  });
});

describe("getDeclarationString()", () => {
  test("for field with json_name option", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        string scalar_field = 1 [json_name = "scalarFieldJsonName"];
      }
    `);
    expect(getDeclarationString(field)).toBe(
      'string scalar_field = 1 [json_name = "scalarFieldJsonName"]',
    );
  });
  test("for field with jstype option", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        string scalar_field = 1 [jstype = JS_NORMAL];
      }
    `);
    expect(getDeclarationString(field)).toBe(
      "string scalar_field = 1 [jstype = JS_NORMAL]",
    );
  });
  test("for field with edition feature", async () => {
    const field = await compileField(`
      edition="2023";
      message M {
        string scalar_field = 1 [features.field_presence = EXPLICIT];
      }
    `);
    expect(getDeclarationString(field)).toBe(
      "string scalar_field = 1 [features.field_presence = EXPLICIT]",
    );
  });
  test("for repeated field", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        repeated double double_field = 1;
      }
    `);
    expect(getDeclarationString(field)).toBe(
      "repeated double double_field = 1",
    );
  });
  test("for proto2 optional field", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        optional double double_field = 1;
      }
    `);
    expect(getDeclarationString(field)).toBe(
      "optional double double_field = 1",
    );
  });
  test("for proto2 required field", async () => {
    const field = await compileField(`
      syntax="proto2";
      message M {
        required double double_field = 1;
      }
    `);
    expect(getDeclarationString(field)).toBe(
      "required double double_field = 1",
    );
  });
  test("for map field", async () => {
    const field = await compileField(`
      syntax="proto3";
      package foo;
      message M {
        map<int32, M> int32_msg_field = 10;
      }
    `);
    expect(getDeclarationString(field)).toBe(
      "map<int32, foo.M> int32_msg_field = 10",
    );
  });
  test("for enum value", async () => {
    const e = await compileEnum(`
      syntax="proto3";
      enum SimpleEnum {
        SIMPLE_ZERO = 0;
        SIMPLE_ONE = 1;
      }
    `);
    expect(getDeclarationString(e.values[0])).toBe("SIMPLE_ZERO = 0");
  });
});
