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

import { beforeAll, describe, expect, test } from "@jest/globals";
import {
  safeObjectProperty,
  protoCamelCase,
  qualifiedName,
} from "@bufbuild/protobuf/reflect";
import type { DescFile } from "@bufbuild/protobuf";
import { compileField, compileFile } from "../helpers.js";

describe("qualifiedName", () => {
  let testFile: DescFile;
  beforeAll(async () => {
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
  test("https://protobuf.com/docs/language-spec#fully-qualified-names", () => {
    const m0 = testFile.messages[0];
    expect(qualifiedName(m0)).toBe("foo.bar.Message");
    expect(qualifiedName(m0.oneofs[0])).toBe("foo.bar.Message.id");
    expect(qualifiedName(m0.fields[0])).toBe("foo.bar.Message.name");
    expect(qualifiedName(m0.fields[1])).toBe("foo.bar.Message.num");
    expect(qualifiedName(m0.nestedMessages[0])).toBe(
      "foo.bar.Message.NestedMessage",
    );
    expect(qualifiedName(m0.nestedMessages[0].nestedExtensions[0])).toBe(
      "foo.bar.Message.NestedMessage.fizz",
    );
    expect(qualifiedName(m0.nestedMessages[0].nestedEnums[0])).toBe(
      "foo.bar.Message.NestedMessage.Kind",
    );
    expect(qualifiedName(m0.nestedMessages[0].nestedEnums[0].values[0])).toBe(
      "foo.bar.Message.NestedMessage.NULL",
    );
    expect(qualifiedName(m0.nestedMessages[0].nestedEnums[0].values[1])).toBe(
      "foo.bar.Message.NestedMessage.PRIMARY",
    );
    expect(qualifiedName(m0.nestedMessages[0].nestedEnums[0].values[2])).toBe(
      "foo.bar.Message.NestedMessage.SECONDARY",
    );
    expect(qualifiedName(m0.fields[2])).toBe("foo.bar.Message.extra");
    const e0 = testFile.enums[0];
    expect(qualifiedName(e0)).toBe("foo.bar.Unit");
    expect(qualifiedName(e0.values[0])).toBe("foo.bar.VOID");
    const s0 = testFile.services[0];
    expect(qualifiedName(s0)).toBe("foo.bar.FooService");
    expect(qualifiedName(s0.methods[0])).toBe("foo.bar.FooService.Bar");
  });
});

describe("safeObjectProperty", () => {
  test("escapes reserved object property names", () => {
    expect(safeObjectProperty("constructor")).toBe("constructor$");
    expect(safeObjectProperty("toString")).toBe("toString$");
    expect(safeObjectProperty("toJSON")).toBe("toJSON$");
    expect(safeObjectProperty("valueOf")).toBe("valueOf$");
  });
  test("does not modify other inputs which are not reserved object properties", () => {
    expect(safeObjectProperty("break")).toBe("break");
    expect(safeObjectProperty("case")).toBe("case");
    expect(safeObjectProperty("catch")).toBe("catch");
    expect(safeObjectProperty("class")).toBe("class");
    expect(safeObjectProperty("const")).toBe("const");
    expect(safeObjectProperty("continue")).toBe("continue");
    expect(safeObjectProperty("debugger")).toBe("debugger");
    expect(safeObjectProperty("default")).toBe("default");
    expect(safeObjectProperty("delete")).toBe("delete");
  });
});

describe("protoCamelCase", () => {
  test.each([
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
  ])("returns same name as protoc for %s", async (name) => {
    const field = await compileField(`
      syntax="proto3";
      message M { 
        int32 ${name} = 1;
      }
    `);
    const protocJsonName = field.proto.jsonName;
    expect(protoCamelCase(name)).toBe(protocJsonName);
  });
});
