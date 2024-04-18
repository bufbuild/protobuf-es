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
import {
  safeObjectProperty,
  protoCamelCase,
  localName,
} from "@bufbuild/protobuf/reflect";
import { compileEnum, compileField, compileService } from "../helpers.js";

describe("localName", () => {
  describe("with field", () => {
    test("applies protoCamelCase", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          int32 __proto__ = 1;
        }
      `);
      expect(localName(field)).toBe("Proto");
    });
    test("escapes reserved property name", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          int32 constructor = 1;
        }
      `);
      expect(localName(field)).toBe("constructor$");
    });
  });
  describe("with field in oneof", () => {
    test("applies protoCamelCase", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          oneof kind {
            int32 __proto__ = 1;
          }
        }
      `);
      expect(field.oneof).toBeDefined();
      expect(localName(field)).toBe("Proto");
    });
    test("does not escape reserved property name", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          oneof kind {
            int32 constructor = 1;
          }
        }
      `);
      expect(field.oneof).toBeDefined();
      expect(localName(field)).toBe("constructor");
    });
  });
  describe("with enum value", () => {
    test("does not change case", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum E {
          FooBAR_baz_1 = 0;
        }
      `)
      ).values[0];
      expect(localName(value)).toBe("FooBAR_baz_1");
    });
    test("drops prefix", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum PrefixEnum {
          PREFIX_ENUM_ZERO = 0;
          PREFIX_ENUM_ONE = 1;
        }
      `)
      ).values[0];
      expect(localName(value)).toBe("ZERO");
    });
    test("escapes reserved property name", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum EnumBuiltIn {
          constructor = 0;
        }
      `)
      ).values[0];
      expect(localName(value)).toBe("constructor$");
    });
    test("escapes reserved property name with dropped prefix", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum EnumBuiltInPrefixed {
          ENUM_BUILT_IN_PREFIXED_constructor = 0;
        }
      `)
      ).values[0];
      expect(localName(value)).toBe("constructor$");
    });
  });
  describe("with rpc", () => {
    test("makes first letter lowerCase", async () => {
      const rpc = (
        await compileService(`
        syntax="proto3";
        service Srv {
          rpc Foo_bar_BAZ(E) returns (E);
        }
        message E {}
      `)
      ).methods[0];
      expect(localName(rpc)).toBe("foo_bar_BAZ");
    });
    test("escapes reserved property name", async () => {
      const rpc = (
        await compileService(`
        syntax="proto3";
        service Srv {
          rpc constructor(E) returns (E);
        }
        message E {}
      `)
      ).methods[0];
      expect(localName(rpc)).toBe("constructor$");
    });
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
