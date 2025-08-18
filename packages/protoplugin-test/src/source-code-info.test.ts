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
import {
  getComments,
  getDeclarationString,
  getPackageComments,
  getSyntaxComments,
} from "@bufbuild/protoplugin";
import {
  compileEnum,
  compileField,
  compileFile,
  compileMessage,
} from "./helpers.js";

void suite("getComments()", () => {
  void test("for syntax", async () => {
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
    assert.deepStrictEqual(comments.leadingDetached, [
      [
        " Copyright ACME, Inc.",
        "",
        "      http://www.apache.org/licenses/LICENSE-2.0",
        "",
        " WITHOUT WARRANTIES",
        "",
      ].join("\n"),
    ]);
    assert.equal(comments.leading, " Comment before syntax.\n");
    assert.equal(comments.trailing, " Comment next to syntax.\n");
  });
  void test("for package", async () => {
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
    assert.equal(comments.leadingDetached[0], " Comment after syntax.\n");
    assert.equal(comments.leading, " Comment before package.\n");
    assert.equal(comments.trailing, " Comment next to package.\n");
  });
  void test("for messages", async () => {
    const message = await compileMessage(`
      syntax="proto3";
      package testcomments; // Comment next to package.
      // Comment after package.
      
      // Comment between package and message.
      
      // Comment before message.
      message MessageWithComments {}
    `);
    const comments = getComments(message);
    assert.deepStrictEqual(comments.leadingDetached, [
      " Comment after package.\n",
      " Comment between package and message.\n",
    ]);
    assert.equal(comments.leading, " Comment before message.\n");
    assert.strictEqual(comments.trailing, undefined);
  });
  void test("for fields", async () => {
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
    assert.deepStrictEqual(comments.leadingDetached, [
      "\n Comment after start of message,\n with funny indentation,\n and empty lines on start and end.\n\n",
    ]);
    assert.equal(
      comments.leading,
      " Comment before field with 5 lines:\n line 2, next is empty\n\n line 4, next is empty\n\n",
    );
    assert.equal(comments.trailing, " Comment next to field.\n");
  });
});

void suite("getDeclarationString()", () => {
  void test("for field with json_name option", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        string scalar_field = 1 [json_name = "scalarFieldJsonName"];
      }
    `);
    assert.equal(
      getDeclarationString(field),
      'string scalar_field = 1 [json_name = "scalarFieldJsonName"]',
    );
  });
  void test("for field with jstype option", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        string scalar_field = 1 [jstype = JS_NORMAL];
      }
    `);
    assert.equal(
      getDeclarationString(field),
      "string scalar_field = 1 [jstype = JS_NORMAL]",
    );
  });
  void test("for field with edition feature", async () => {
    const field = await compileField(`
      edition="2023";
      message M {
        string scalar_field = 1 [features.field_presence = EXPLICIT];
      }
    `);
    assert.equal(
      getDeclarationString(field),
      "string scalar_field = 1 [features.field_presence = EXPLICIT]",
    );
  });
  void test("for repeated field", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        repeated double double_field = 1;
      }
    `);
    assert.equal(
      getDeclarationString(field),
      "repeated double double_field = 1",
    );
  });
  void test("for proto2 optional field", async () => {
    const field = await compileField(`
      syntax="proto3";
      message M {
        optional double double_field = 1;
      }
    `);
    assert.equal(
      getDeclarationString(field),
      "optional double double_field = 1",
    );
  });
  void test("for proto2 required field", async () => {
    const field = await compileField(`
      syntax="proto2";
      message M {
        required double double_field = 1;
      }
    `);
    assert.equal(
      getDeclarationString(field),
      "required double double_field = 1",
    );
  });
  void test("for map field", async () => {
    const field = await compileField(`
      syntax="proto3";
      package foo;
      message M {
        map<int32, M> int32_msg_field = 10;
      }
    `);
    assert.equal(
      getDeclarationString(field),
      "map<int32, foo.M> int32_msg_field = 10",
    );
  });
  void test("for enum value", async () => {
    const e = await compileEnum(`
      syntax="proto3";
      enum SimpleEnum {
        SIMPLE_ZERO = 0;
        SIMPLE_ONE = 1;
      }
    `);
    assert.equal(getDeclarationString(e.values[0]), "SIMPLE_ZERO = 0");
  });
});
