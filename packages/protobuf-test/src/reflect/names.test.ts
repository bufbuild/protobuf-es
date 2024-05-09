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
import { safeObjectProperty, protoCamelCase } from "@bufbuild/protobuf/reflect";
import { compileField } from "../helpers.js";

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
