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

import { suite, test, before } from "node:test";
import * as assert from "node:assert";
import {
  safeObjectProperty,
  protoCamelCase,
  protoSnakeCase,
  qualifiedName,
} from "@bufbuild/protobuf/reflect";
import type { DescFile } from "@bufbuild/protobuf";
import { compileField, compileFile } from "../helpers.js";

void suite("qualifiedName", () => {
  let testFile: DescFile;
  before(async () => {
    testFile = await compileFile(`
syntax = "proto3";                            // Fully-qualified name
                                              //----------------------
package foo.bar;                              // foo.bar
                                              //
import "google/protobuf/descriptor.proto";    //
                                              //
message Message {                             // foo.bar.Message
    oneof id {                                // foo.bar.Message.id
      string name = 1;                        // foo.bar.Message.name
      uint64 num = 2;                         // foo.bar.Message.num
    }                                         //
    message NestedMessage {                   // foo.bar.Message.NestedMessage
      extend google.protobuf.MessageOptions { //
        string fizz = 49999;                  // foo.bar.Message.NestedMessage.fizz
      }                                       //
      option (NestedMessage.fizz) = "buzz";   //
      enum Kind {                             // foo.bar.Message.NestedMessage.Kind
        NULL = 0;                             // foo.bar.Message.NestedMessage.NULL
        PRIMARY = 1;                          // foo.bar.Message.NestedMessage.PRIMARY
        SECONDARY = 2;                        // foo.bar.Message.NestedMessage.SECONDARY
      }                                       //
      Kind kind = 1;                          // foo.bar.Message.NestedMessage.kind
    }                                         //
    NestedMessage extra = 3;                  // foo.bar.Message.extra
}                                             //
                                              //
enum Unit {                                   // foo.bar.Unit
  VOID = 0;                                   // foo.bar.VOID
}                                             //
                                              //
service FooService {                          // foo.bar.FooService
  rpc Bar(Message) returns (Message);         // foo.bar.FooService.Bar
}                                             //
`);
  });
  void test("https://protobuf.com/docs/language-spec#fully-qualified-names", () => {
    const m0 = testFile.messages[0];
    assert.strictEqual(qualifiedName(m0), "foo.bar.Message");
    assert.strictEqual(qualifiedName(m0.oneofs[0]), "foo.bar.Message.id");
    assert.strictEqual(qualifiedName(m0.fields[0]), "foo.bar.Message.name");
    assert.strictEqual(qualifiedName(m0.fields[1]), "foo.bar.Message.num");
    assert.strictEqual(
      qualifiedName(m0.nestedMessages[0]),
      "foo.bar.Message.NestedMessage",
    );
    assert.strictEqual(
      qualifiedName(m0.nestedMessages[0].nestedExtensions[0]),
      "foo.bar.Message.NestedMessage.fizz",
    );
    assert.strictEqual(
      qualifiedName(m0.nestedMessages[0].nestedEnums[0]),
      "foo.bar.Message.NestedMessage.Kind",
    );
    assert.strictEqual(
      qualifiedName(m0.nestedMessages[0].nestedEnums[0].values[0]),
      "foo.bar.Message.NestedMessage.NULL",
    );
    assert.strictEqual(
      qualifiedName(m0.nestedMessages[0].nestedEnums[0].values[1]),
      "foo.bar.Message.NestedMessage.PRIMARY",
    );
    assert.strictEqual(
      qualifiedName(m0.nestedMessages[0].nestedEnums[0].values[2]),
      "foo.bar.Message.NestedMessage.SECONDARY",
    );
    assert.strictEqual(qualifiedName(m0.fields[2]), "foo.bar.Message.extra");
    const e0 = testFile.enums[0];
    assert.strictEqual(qualifiedName(e0), "foo.bar.Unit");
    assert.strictEqual(qualifiedName(e0.values[0]), "foo.bar.VOID");
    const s0 = testFile.services[0];
    assert.strictEqual(qualifiedName(s0), "foo.bar.FooService");
    assert.strictEqual(qualifiedName(s0.methods[0]), "foo.bar.FooService.Bar");
  });
});

void suite("safeObjectProperty", () => {
  void test("escapes reserved object property names", () => {
    assert.strictEqual(safeObjectProperty("constructor"), "constructor$");
    assert.strictEqual(safeObjectProperty("toString"), "toString$");
    assert.strictEqual(safeObjectProperty("toJSON"), "toJSON$");
    assert.strictEqual(safeObjectProperty("valueOf"), "valueOf$");
  });
  void test("does not modify other inputs which are not reserved object properties", () => {
    assert.strictEqual(safeObjectProperty("break"), "break");
    assert.strictEqual(safeObjectProperty("case"), "case");
    assert.strictEqual(safeObjectProperty("catch"), "catch");
    assert.strictEqual(safeObjectProperty("class"), "class");
    assert.strictEqual(safeObjectProperty("const"), "const");
    assert.strictEqual(safeObjectProperty("continue"), "continue");
    assert.strictEqual(safeObjectProperty("debugger"), "debugger");
    assert.strictEqual(safeObjectProperty("default"), "default");
    assert.strictEqual(safeObjectProperty("delete"), "delete");
  });
});

void suite("protoCamelCase", () => {
  for (const name of [
    "foo_bar",
    "__proto__",
    "fieldname1",
    "field_name2",
    "_field_name3",
    "field__name4_",
    "field0name5",
    "field_0_name6",
    "fieldName7",
    "FieldName8",
    "field_Name9",
    "Field_Name10",
    "FIELD_NAME11",
    "FIELD_name12",
    "__field_name13",
    "__Field_name14",
    "field__name15",
    "field__Name16",
    "field_name17__",
    "Field_name18__",
  ]) {
    void test(`returns same name as protoc for ${name}`, async () => {
      const field = await compileField(`
      syntax="proto3";
      message M { 
        int32 ${name} = 1;
      }
    `);
      const protocJsonName = field.proto.jsonName;
      assert.strictEqual(protoCamelCase(name), protocJsonName);
    });
  }
  void suite("irreversible", () => {
    testIrreversible("foo_", "foo");
    testIrreversible("foo__", "foo");
    testIrreversible("foo__bar", "fooBar");
    testIrreversible("foo_1", "foo1");
    function testIrreversible(snakeCase: string, expectedCamelCase: string) {
      void test(`"${snakeCase}" is irreversible`, () => {
        assert.strictEqual(protoCamelCase(snakeCase), expectedCamelCase);
        assert.notStrictEqual(protoSnakeCase(expectedCamelCase), snakeCase);
      });
    }
  });
});

void test("protoSnakeCase", () => {
  assert.strictEqual(protoSnakeCase("fooBar"), "foo_bar");
  assert.strictEqual(protoSnakeCase("fooUTF8"), "foo_u_t_f8");
});
