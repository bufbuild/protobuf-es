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
import {
  create,
  createRegistry,
  toJson,
  type MessageJsonType,
  type EnumJsonType,
  type JsonObject,
  type JsonValue,
  enumToJson,
  type DescEnum,
  enumFromJson,
  isEnumJson,
} from "@bufbuild/protobuf";
import {
  type AnyJson,
  type AnySchema,
  type DoubleValueJson,
  type DoubleValueSchema,
  type DurationJson,
  type DurationSchema,
  type EmptyJson,
  type EmptySchema,
  type FieldMaskJson,
  type FieldMaskSchema,
  type FloatValueJson,
  type FloatValueSchema,
  type Int64ValueJson,
  type Int64ValueSchema,
  type ListValueJson,
  type ListValueSchema,
  type NullValueJson,
  NullValueSchema,
  type StructJson,
  type StructSchema,
  type TimestampJson,
  type TimestampSchema,
  type ValueJson,
  type ValueSchema,
  type UInt64ValueJson,
  type UInt64ValueSchema,
  type Int32ValueJson,
  type Int32ValueSchema,
  type UInt32ValueJson,
  type UInt32ValueSchema,
  type BoolValueJson,
  type BoolValueSchema,
  type BytesValueJson,
  type BytesValueSchema,
  type StringValueJson,
  type StringValueSchema,
  NullValue,
} from "@bufbuild/protobuf/wkt";
import * as json_types_ts_json from "./gen/ts,json_types/extra/json_types_pb.js";
import type * as json_types_ts_nojson from "./gen/ts/extra/json_types_pb.js";

describe("JSON types", () => {
  describe("MessageJsonType", () => {
    test("should resolve generated type", () => {
      function f(
        pickedFromDesc: MessageJsonType<
          typeof json_types_ts_json.JsonTypesMessageSchema
        >,
        generatedType: json_types_ts_json.JsonTypesMessageJson,
      ) {
        generatedType = pickedFromDesc;
        return generatedType;
      }
      expect(f).toBeDefined();
    });
    test("should resolve JsonValue without generated type", () => {
      function f(
        pickedFromDesc: MessageJsonType<
          typeof json_types_ts_nojson.JsonTypesMessageSchema
        >,
        genericJsonValue: JsonValue,
      ) {
        pickedFromDesc = genericJsonValue;
        return pickedFromDesc;
      }
      expect(f).toBeDefined();
    });
  });
  describe("EnumJsonType", () => {
    test("should resolve generated type", () => {
      function f(
        pickedFromDesc: EnumJsonType<
          typeof json_types_ts_json.JsonTypeEnumSchema
        >,
        generatedType: json_types_ts_json.JsonTypeEnumJson,
      ) {
        generatedType = pickedFromDesc;
        return generatedType;
      }
      expect(f).toBeDefined();
    });
    test("should resolve string without generated type", () => {
      function f(
        pickedFromDesc: EnumJsonType<
          typeof json_types_ts_nojson.JsonTypeEnumSchema
        >,
        stringOrNull: string | null,
      ) {
        pickedFromDesc = stringOrNull;
        return pickedFromDesc;
      }
      expect(f).toBeDefined();
    });
  });
  test("toJson() returns JSON type for standard options", () => {
    const msg = create(json_types_ts_json.JsonTypesMessageSchema);
    let json: json_types_ts_json.JsonTypesMessageJson;
    json = toJson(json_types_ts_json.JsonTypesMessageSchema, msg);
    json = toJson(json_types_ts_json.JsonTypesMessageSchema, msg, {});
    json = toJson(json_types_ts_json.JsonTypesMessageSchema, msg, {
      alwaysEmitImplicit: false,
      enumAsInteger: false,
      useProtoFieldName: false,
      registry: createRegistry(json_types_ts_json.JsonTypesMessageSchema),
    });
    expect(json).toBeDefined();
  });
  test("toJson() returns JsonValue for non-standard options", () => {
    const msg = create(json_types_ts_json.JsonTypesMessageSchema);
    {
      const json = toJson(json_types_ts_json.JsonTypesMessageSchema, msg, {
        alwaysEmitImplicit: true,
      });
      // @ts-expect-error TS2322: Type JsonValue is not assignable to type JsonTypesMessageJson
      const typed: json_types_ts_json.JsonTypesMessageJson = json;
      expect(typed).toBeDefined();
    }
    {
      const json = toJson(json_types_ts_json.JsonTypesMessageSchema, msg, {
        enumAsInteger: true,
      });
      // @ts-expect-error TS2322: Type JsonValue is not assignable to type JsonTypesMessageJson
      const typed: json_types_ts_json.JsonTypesMessageJson = json;
      expect(typed).toBeDefined();
    }
    {
      const json = toJson(json_types_ts_json.JsonTypesMessageSchema, msg, {
        useProtoFieldName: true,
      });
      // @ts-expect-error TS2322: Type JsonValue is not assignable to type JsonTypesMessageJson
      const typed: json_types_ts_json.JsonTypesMessageJson = json;
      expect(typed).toBeDefined();
    }
  });
  describe("well-known types", () => {
    test("google.protobuf.Any should have JSON type", () => {
      function f(a: MessageJsonType<typeof AnySchema>, b: AnyJson) {
        a = b;
        b = a;
        return b;
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.Duration should have JSON type", () => {
      function f(a: MessageJsonType<typeof DurationSchema>, b: DurationJson) {
        a = b;
        b = a;
        const val: string = a;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.Empty should have JSON type", () => {
      function f(a: MessageJsonType<typeof EmptySchema>, b: EmptyJson) {
        a = b;
        b = a;
        const val: Record<string, never> = a;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.FieldMask should have JSON type", () => {
      function f(a: MessageJsonType<typeof FieldMaskSchema>, b: FieldMaskJson) {
        a = b;
        b = a;
        const val: string = a;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.Struct should have JSON type", () => {
      function f(a: MessageJsonType<typeof StructSchema>, b: StructJson) {
        a = b;
        b = a;
        const val: JsonObject = { foo: 123 };
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.Value should have JSON type", () => {
      function f(a: MessageJsonType<typeof ValueSchema>, b: ValueJson) {
        a = b;
        b = a;
        const val: JsonValue = 123;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.ListValue should have JSON type", () => {
      function f(a: MessageJsonType<typeof ListValueSchema>, b: ListValueJson) {
        a = b;
        b = a;
        const val: JsonValue[] = [123];
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.NullValue should have JSON type", () => {
      function f(a: EnumJsonType<typeof NullValueSchema>, b: NullValueJson) {
        a = b;
        b = a;
        const val: null = null;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.Timestamp should have JSON type", () => {
      function f(a: MessageJsonType<typeof TimestampSchema>, b: TimestampJson) {
        a = b;
        b = a;
        const string: string = a;
        a = string;
        return [b, string];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.DoubleValue should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof DoubleValueSchema>,
        b: DoubleValueJson,
      ) {
        a = b;
        b = a;
        const val: number | "NaN" | "Infinity" | "-Infinity" = "NaN";
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.FloatValue should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof FloatValueSchema>,
        b: FloatValueJson,
      ) {
        a = b;
        b = a;
        const val: number | "NaN" | "Infinity" | "-Infinity" = "NaN";
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.Int64Value should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof Int64ValueSchema>,
        b: Int64ValueJson,
      ) {
        a = b;
        b = a;
        const val: string = "123";
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.UInt64Value should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof UInt64ValueSchema>,
        b: UInt64ValueJson,
      ) {
        a = b;
        b = a;
        const val: string = "123";
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.Int32Value should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof Int32ValueSchema>,
        b: Int32ValueJson,
      ) {
        a = b;
        b = a;
        const val: number = 123;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.UInt32Value should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof UInt32ValueSchema>,
        b: UInt32ValueJson,
      ) {
        a = b;
        b = a;
        const val: number = 123;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.BoolValue should have JSON type", () => {
      function f(a: MessageJsonType<typeof BoolValueSchema>, b: BoolValueJson) {
        a = b;
        b = a;
        const val: boolean = true;
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.StringValue should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof StringValueSchema>,
        b: StringValueJson,
      ) {
        a = b;
        b = a;
        const val: string = "abc";
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
    describe("google.protobuf.BytesValue should have JSON type", () => {
      function f(
        a: MessageJsonType<typeof BytesValueSchema>,
        b: BytesValueJson,
      ) {
        a = b;
        b = a;
        const val: string = "aGVsbG8gd29ybGQ=";
        a = val;
        return [b, val];
      }
      expect(f).toBeDefined();
    });
  });
  describe("enumToJson()", () => {
    test("returns proto name", () => {
      const json:
        | "JSON_TYPE_ENUM_YES"
        | "JSON_TYPE_ENUM_NO"
        | "JSON_TYPE_ENUM_UNSPECIFIED" = enumToJson(
        json_types_ts_json.JsonTypeEnumSchema,
        json_types_ts_json.JsonTypeEnum.YES,
      );
      expect(json).toBe("JSON_TYPE_ENUM_YES");
    });
    test("returns null for google.protobuf.NullValue", () => {
      const json: null = enumToJson(NullValueSchema, NullValue.NULL_VALUE);
      expect(json).toBe(null);
    });
    test("returns string|null for anonymous descriptor", () => {
      const json: string | null = enumToJson(
        json_types_ts_json.JsonTypeEnumSchema as DescEnum,
        json_types_ts_json.JsonTypeEnum.YES,
      );
      expect(json).toBe("JSON_TYPE_ENUM_YES");
    });
  });
  describe("enumFromJson()", () => {
    test("parses known string", () => {
      const e: json_types_ts_json.JsonTypeEnum = enumFromJson(
        json_types_ts_json.JsonTypeEnumSchema,
        "JSON_TYPE_ENUM_YES",
      );
      expect(e).toBe(json_types_ts_json.JsonTypeEnum.YES);
    });
    test("parses number for anonymous descriptor", () => {
      const e: number = enumFromJson(
        json_types_ts_json.JsonTypeEnumSchema as DescEnum,
        "JSON_TYPE_ENUM_YES",
      );
      expect(e).toBe(json_types_ts_json.JsonTypeEnum.YES);
    });
    test("parses null for google.protobuf.NullValue", () => {
      const e: NullValue = enumFromJson(NullValueSchema, null);
      expect(e).toBe(NullValue.NULL_VALUE);
    });
    test("raises error on unknown string", () => {
      expect(() => {
        // @ts-expect-error TS2345
        enumFromJson(json_types_ts_json.JsonTypeEnumSchema, "FOO");
      }).toThrow(/cannot decode enum spec.JsonTypeEnum from JSON: "FOO"/);
    });
  });
  describe("isEnumJson()", () => {
    test("narrows type", () => {
      const str: string = "FOO";
      if (isEnumJson(json_types_ts_json.JsonTypeEnumSchema, str)) {
        const yes:
          | "JSON_TYPE_ENUM_YES"
          | "JSON_TYPE_ENUM_NO"
          | "JSON_TYPE_ENUM_UNSPECIFIED" = str;
        expect(yes).toBeDefined();
      }
    });
    test("returns true for known value", () => {
      const ok = isEnumJson(
        json_types_ts_json.JsonTypeEnumSchema,
        "JSON_TYPE_ENUM_YES",
      );
      expect(ok).toBe(true);
    });
    test("returns false for unknown value", () => {
      const ok = isEnumJson(json_types_ts_json.JsonTypeEnumSchema, "FOO");
      expect(ok).toBe(false);
    });
  });
});
