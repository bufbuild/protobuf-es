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

// @generated by protoc-gen-es v1.9.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/map_lite_unittest.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";
import { ForeignMessageLite, TestAllExtensionsLite, TestAllTypesLite } from "./unittest_lite_pb.js";

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumLite
 */
export enum Proto2MapEnumLite {
  /**
   * @generated from enum value: PROTO2_MAP_ENUM_FOO_LITE = 0;
   */
  PROTO2_MAP_ENUM_FOO_LITE = 0,

  /**
   * @generated from enum value: PROTO2_MAP_ENUM_BAR_LITE = 1;
   */
  PROTO2_MAP_ENUM_BAR_LITE = 1,

  /**
   * @generated from enum value: PROTO2_MAP_ENUM_BAZ_LITE = 2;
   */
  PROTO2_MAP_ENUM_BAZ_LITE = 2,
}
// Retrieve enum metadata with: proto2.getEnumType(Proto2MapEnumLite)
proto2.util.setEnumType(Proto2MapEnumLite, "protobuf_unittest.Proto2MapEnumLite", [
  { no: 0, name: "PROTO2_MAP_ENUM_FOO_LITE" },
  { no: 1, name: "PROTO2_MAP_ENUM_BAR_LITE" },
  { no: 2, name: "PROTO2_MAP_ENUM_BAZ_LITE" },
]);

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumPlusExtraLite
 */
export enum Proto2MapEnumPlusExtraLite {
  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_FOO_LITE = 0;
   */
  E_PROTO2_MAP_ENUM_FOO_LITE = 0,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_BAR_LITE = 1;
   */
  E_PROTO2_MAP_ENUM_BAR_LITE = 1,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_BAZ_LITE = 2;
   */
  E_PROTO2_MAP_ENUM_BAZ_LITE = 2,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_EXTRA_LITE = 3;
   */
  E_PROTO2_MAP_ENUM_EXTRA_LITE = 3,
}
// Retrieve enum metadata with: proto2.getEnumType(Proto2MapEnumPlusExtraLite)
proto2.util.setEnumType(Proto2MapEnumPlusExtraLite, "protobuf_unittest.Proto2MapEnumPlusExtraLite", [
  { no: 0, name: "E_PROTO2_MAP_ENUM_FOO_LITE" },
  { no: 1, name: "E_PROTO2_MAP_ENUM_BAR_LITE" },
  { no: 2, name: "E_PROTO2_MAP_ENUM_BAZ_LITE" },
  { no: 3, name: "E_PROTO2_MAP_ENUM_EXTRA_LITE" },
]);

/**
 * @generated from enum protobuf_unittest.MapEnumLite
 */
export enum MapEnumLite {
  /**
   * @generated from enum value: MAP_ENUM_FOO_LITE = 0;
   */
  MAP_ENUM_FOO_LITE = 0,

  /**
   * @generated from enum value: MAP_ENUM_BAR_LITE = 1;
   */
  MAP_ENUM_BAR_LITE = 1,

  /**
   * @generated from enum value: MAP_ENUM_BAZ_LITE = 2;
   */
  MAP_ENUM_BAZ_LITE = 2,
}
// Retrieve enum metadata with: proto2.getEnumType(MapEnumLite)
proto2.util.setEnumType(MapEnumLite, "protobuf_unittest.MapEnumLite", [
  { no: 0, name: "MAP_ENUM_FOO_LITE" },
  { no: 1, name: "MAP_ENUM_BAR_LITE" },
  { no: 2, name: "MAP_ENUM_BAZ_LITE" },
]);

/**
 * @generated from message protobuf_unittest.TestMapLite
 */
export class TestMapLite extends Message<TestMapLite> {
  /**
   * @generated from field: map<int32, int32> map_int32_int32 = 1;
   */
  mapInt32Int32: { [key: number]: number } = {};

  /**
   * @generated from field: map<int64, int64> map_int64_int64 = 2;
   */
  mapInt64Int64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<uint32, uint32> map_uint32_uint32 = 3;
   */
  mapUint32Uint32: { [key: number]: number } = {};

  /**
   * @generated from field: map<uint64, uint64> map_uint64_uint64 = 4;
   */
  mapUint64Uint64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<sint32, sint32> map_sint32_sint32 = 5;
   */
  mapSint32Sint32: { [key: number]: number } = {};

  /**
   * @generated from field: map<sint64, sint64> map_sint64_sint64 = 6;
   */
  mapSint64Sint64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<fixed32, fixed32> map_fixed32_fixed32 = 7;
   */
  mapFixed32Fixed32: { [key: number]: number } = {};

  /**
   * @generated from field: map<fixed64, fixed64> map_fixed64_fixed64 = 8;
   */
  mapFixed64Fixed64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<sfixed32, sfixed32> map_sfixed32_sfixed32 = 9;
   */
  mapSfixed32Sfixed32: { [key: number]: number } = {};

  /**
   * @generated from field: map<sfixed64, sfixed64> map_sfixed64_sfixed64 = 10;
   */
  mapSfixed64Sfixed64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<int32, float> map_int32_float = 11;
   */
  mapInt32Float: { [key: number]: number } = {};

  /**
   * @generated from field: map<int32, double> map_int32_double = 12;
   */
  mapInt32Double: { [key: number]: number } = {};

  /**
   * @generated from field: map<bool, bool> map_bool_bool = 13;
   */
  mapBoolBool: { [key: string]: boolean } = {};

  /**
   * @generated from field: map<string, string> map_string_string = 14;
   */
  mapStringString: { [key: string]: string } = {};

  /**
   * @generated from field: map<int32, bytes> map_int32_bytes = 15;
   */
  mapInt32Bytes: { [key: number]: Uint8Array } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.MapEnumLite> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnumLite } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessageLite> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessageLite } = {};

  /**
   * @generated from field: map<int32, int32> teboring = 18;
   */
  teboring: { [key: number]: number } = {};

  constructor(data?: PartialMessage<TestMapLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestMapLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "map_int32_int32", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
    { no: 2, name: "map_int64_int64", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "scalar", T: 3 /* ScalarType.INT64 */} },
    { no: 3, name: "map_uint32_uint32", kind: "map", K: 13 /* ScalarType.UINT32 */, V: {kind: "scalar", T: 13 /* ScalarType.UINT32 */} },
    { no: 4, name: "map_uint64_uint64", kind: "map", K: 4 /* ScalarType.UINT64 */, V: {kind: "scalar", T: 4 /* ScalarType.UINT64 */} },
    { no: 5, name: "map_sint32_sint32", kind: "map", K: 17 /* ScalarType.SINT32 */, V: {kind: "scalar", T: 17 /* ScalarType.SINT32 */} },
    { no: 6, name: "map_sint64_sint64", kind: "map", K: 18 /* ScalarType.SINT64 */, V: {kind: "scalar", T: 18 /* ScalarType.SINT64 */} },
    { no: 7, name: "map_fixed32_fixed32", kind: "map", K: 7 /* ScalarType.FIXED32 */, V: {kind: "scalar", T: 7 /* ScalarType.FIXED32 */} },
    { no: 8, name: "map_fixed64_fixed64", kind: "map", K: 6 /* ScalarType.FIXED64 */, V: {kind: "scalar", T: 6 /* ScalarType.FIXED64 */} },
    { no: 9, name: "map_sfixed32_sfixed32", kind: "map", K: 15 /* ScalarType.SFIXED32 */, V: {kind: "scalar", T: 15 /* ScalarType.SFIXED32 */} },
    { no: 10, name: "map_sfixed64_sfixed64", kind: "map", K: 16 /* ScalarType.SFIXED64 */, V: {kind: "scalar", T: 16 /* ScalarType.SFIXED64 */} },
    { no: 11, name: "map_int32_float", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 2 /* ScalarType.FLOAT */} },
    { no: 12, name: "map_int32_double", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 1 /* ScalarType.DOUBLE */} },
    { no: 13, name: "map_bool_bool", kind: "map", K: 8 /* ScalarType.BOOL */, V: {kind: "scalar", T: 8 /* ScalarType.BOOL */} },
    { no: 14, name: "map_string_string", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 15, name: "map_int32_bytes", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 12 /* ScalarType.BYTES */} },
    { no: 16, name: "map_int32_enum", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(MapEnumLite)} },
    { no: 17, name: "map_int32_foreign_message", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: ForeignMessageLite} },
    { no: 18, name: "teboring", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMapLite {
    return new TestMapLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMapLite {
    return new TestMapLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMapLite {
    return new TestMapLite().fromJsonString(jsonString, options);
  }

  static equals(a: TestMapLite | PlainMessage<TestMapLite> | undefined, b: TestMapLite | PlainMessage<TestMapLite> | undefined): boolean {
    return proto2.util.equals(TestMapLite, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestArenaMapLite
 */
export class TestArenaMapLite extends Message<TestArenaMapLite> {
  /**
   * @generated from field: map<int32, int32> map_int32_int32 = 1;
   */
  mapInt32Int32: { [key: number]: number } = {};

  /**
   * @generated from field: map<int64, int64> map_int64_int64 = 2;
   */
  mapInt64Int64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<uint32, uint32> map_uint32_uint32 = 3;
   */
  mapUint32Uint32: { [key: number]: number } = {};

  /**
   * @generated from field: map<uint64, uint64> map_uint64_uint64 = 4;
   */
  mapUint64Uint64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<sint32, sint32> map_sint32_sint32 = 5;
   */
  mapSint32Sint32: { [key: number]: number } = {};

  /**
   * @generated from field: map<sint64, sint64> map_sint64_sint64 = 6;
   */
  mapSint64Sint64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<fixed32, fixed32> map_fixed32_fixed32 = 7;
   */
  mapFixed32Fixed32: { [key: number]: number } = {};

  /**
   * @generated from field: map<fixed64, fixed64> map_fixed64_fixed64 = 8;
   */
  mapFixed64Fixed64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<sfixed32, sfixed32> map_sfixed32_sfixed32 = 9;
   */
  mapSfixed32Sfixed32: { [key: number]: number } = {};

  /**
   * @generated from field: map<sfixed64, sfixed64> map_sfixed64_sfixed64 = 10;
   */
  mapSfixed64Sfixed64: { [key: string]: bigint } = {};

  /**
   * @generated from field: map<int32, float> map_int32_float = 11;
   */
  mapInt32Float: { [key: number]: number } = {};

  /**
   * @generated from field: map<int32, double> map_int32_double = 12;
   */
  mapInt32Double: { [key: number]: number } = {};

  /**
   * @generated from field: map<bool, bool> map_bool_bool = 13;
   */
  mapBoolBool: { [key: string]: boolean } = {};

  /**
   * @generated from field: map<string, string> map_string_string = 14;
   */
  mapStringString: { [key: string]: string } = {};

  /**
   * @generated from field: map<int32, bytes> map_int32_bytes = 15;
   */
  mapInt32Bytes: { [key: number]: Uint8Array } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.MapEnumLite> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnumLite } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessageArenaLite> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessageArenaLite } = {};

  constructor(data?: PartialMessage<TestArenaMapLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestArenaMapLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "map_int32_int32", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
    { no: 2, name: "map_int64_int64", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "scalar", T: 3 /* ScalarType.INT64 */} },
    { no: 3, name: "map_uint32_uint32", kind: "map", K: 13 /* ScalarType.UINT32 */, V: {kind: "scalar", T: 13 /* ScalarType.UINT32 */} },
    { no: 4, name: "map_uint64_uint64", kind: "map", K: 4 /* ScalarType.UINT64 */, V: {kind: "scalar", T: 4 /* ScalarType.UINT64 */} },
    { no: 5, name: "map_sint32_sint32", kind: "map", K: 17 /* ScalarType.SINT32 */, V: {kind: "scalar", T: 17 /* ScalarType.SINT32 */} },
    { no: 6, name: "map_sint64_sint64", kind: "map", K: 18 /* ScalarType.SINT64 */, V: {kind: "scalar", T: 18 /* ScalarType.SINT64 */} },
    { no: 7, name: "map_fixed32_fixed32", kind: "map", K: 7 /* ScalarType.FIXED32 */, V: {kind: "scalar", T: 7 /* ScalarType.FIXED32 */} },
    { no: 8, name: "map_fixed64_fixed64", kind: "map", K: 6 /* ScalarType.FIXED64 */, V: {kind: "scalar", T: 6 /* ScalarType.FIXED64 */} },
    { no: 9, name: "map_sfixed32_sfixed32", kind: "map", K: 15 /* ScalarType.SFIXED32 */, V: {kind: "scalar", T: 15 /* ScalarType.SFIXED32 */} },
    { no: 10, name: "map_sfixed64_sfixed64", kind: "map", K: 16 /* ScalarType.SFIXED64 */, V: {kind: "scalar", T: 16 /* ScalarType.SFIXED64 */} },
    { no: 11, name: "map_int32_float", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 2 /* ScalarType.FLOAT */} },
    { no: 12, name: "map_int32_double", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 1 /* ScalarType.DOUBLE */} },
    { no: 13, name: "map_bool_bool", kind: "map", K: 8 /* ScalarType.BOOL */, V: {kind: "scalar", T: 8 /* ScalarType.BOOL */} },
    { no: 14, name: "map_string_string", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 15, name: "map_int32_bytes", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 12 /* ScalarType.BYTES */} },
    { no: 16, name: "map_int32_enum", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(MapEnumLite)} },
    { no: 17, name: "map_int32_foreign_message", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: ForeignMessageArenaLite} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestArenaMapLite {
    return new TestArenaMapLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestArenaMapLite {
    return new TestArenaMapLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestArenaMapLite {
    return new TestArenaMapLite().fromJsonString(jsonString, options);
  }

  static equals(a: TestArenaMapLite | PlainMessage<TestArenaMapLite> | undefined, b: TestArenaMapLite | PlainMessage<TestArenaMapLite> | undefined): boolean {
    return proto2.util.equals(TestArenaMapLite, a, b);
  }
}

/**
 * Test embedded message with required fields
 *
 * @generated from message protobuf_unittest.TestRequiredMessageMapLite
 */
export class TestRequiredMessageMapLite extends Message<TestRequiredMessageMapLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestRequiredLite> map_field = 1;
   */
  mapField: { [key: number]: TestRequiredLite } = {};

  constructor(data?: PartialMessage<TestRequiredMessageMapLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestRequiredMessageMapLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: TestRequiredLite} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredMessageMapLite {
    return new TestRequiredMessageMapLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredMessageMapLite {
    return new TestRequiredMessageMapLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredMessageMapLite {
    return new TestRequiredMessageMapLite().fromJsonString(jsonString, options);
  }

  static equals(a: TestRequiredMessageMapLite | PlainMessage<TestRequiredMessageMapLite> | undefined, b: TestRequiredMessageMapLite | PlainMessage<TestRequiredMessageMapLite> | undefined): boolean {
    return proto2.util.equals(TestRequiredMessageMapLite, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestEnumMapLite
 */
export class TestEnumMapLite extends Message<TestEnumMapLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumLite> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnumLite } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumLite> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnumLite } = {};

  constructor(data?: PartialMessage<TestEnumMapLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestEnumMapLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 101, name: "known_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumLite)} },
    { no: 102, name: "unknown_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumLite)} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestEnumMapLite {
    return new TestEnumMapLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestEnumMapLite {
    return new TestEnumMapLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestEnumMapLite {
    return new TestEnumMapLite().fromJsonString(jsonString, options);
  }

  static equals(a: TestEnumMapLite | PlainMessage<TestEnumMapLite> | undefined, b: TestEnumMapLite | PlainMessage<TestEnumMapLite> | undefined): boolean {
    return proto2.util.equals(TestEnumMapLite, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestEnumMapPlusExtraLite
 */
export class TestEnumMapPlusExtraLite extends Message<TestEnumMapPlusExtraLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumPlusExtraLite> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnumPlusExtraLite } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumPlusExtraLite> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnumPlusExtraLite } = {};

  constructor(data?: PartialMessage<TestEnumMapPlusExtraLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestEnumMapPlusExtraLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 101, name: "known_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtraLite)} },
    { no: 102, name: "unknown_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtraLite)} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestEnumMapPlusExtraLite {
    return new TestEnumMapPlusExtraLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestEnumMapPlusExtraLite {
    return new TestEnumMapPlusExtraLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestEnumMapPlusExtraLite {
    return new TestEnumMapPlusExtraLite().fromJsonString(jsonString, options);
  }

  static equals(a: TestEnumMapPlusExtraLite | PlainMessage<TestEnumMapPlusExtraLite> | undefined, b: TestEnumMapPlusExtraLite | PlainMessage<TestEnumMapPlusExtraLite> | undefined): boolean {
    return proto2.util.equals(TestEnumMapPlusExtraLite, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestMessageMapLite
 */
export class TestMessageMapLite extends Message<TestMessageMapLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestAllTypesLite> map_int32_message = 1;
   */
  mapInt32Message: { [key: number]: TestAllTypesLite } = {};

  constructor(data?: PartialMessage<TestMessageMapLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestMessageMapLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "map_int32_message", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: TestAllTypesLite} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageMapLite {
    return new TestMessageMapLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageMapLite {
    return new TestMessageMapLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageMapLite {
    return new TestMessageMapLite().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageMapLite | PlainMessage<TestMessageMapLite> | undefined, b: TestMessageMapLite | PlainMessage<TestMessageMapLite> | undefined): boolean {
    return proto2.util.equals(TestMessageMapLite, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestRequiredLite
 */
export class TestRequiredLite extends Message<TestRequiredLite> {
  /**
   * @generated from field: required int32 a = 1;
   */
  a?: number;

  /**
   * @generated from field: required int32 b = 2;
   */
  b?: number;

  /**
   * @generated from field: required int32 c = 3;
   */
  c?: number;

  constructor(data?: PartialMessage<TestRequiredLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestRequiredLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "a", kind: "scalar", T: 5 /* ScalarType.INT32 */, req: true },
    { no: 2, name: "b", kind: "scalar", T: 5 /* ScalarType.INT32 */, req: true },
    { no: 3, name: "c", kind: "scalar", T: 5 /* ScalarType.INT32 */, req: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredLite {
    return new TestRequiredLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredLite {
    return new TestRequiredLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredLite {
    return new TestRequiredLite().fromJsonString(jsonString, options);
  }

  static equals(a: TestRequiredLite | PlainMessage<TestRequiredLite> | undefined, b: TestRequiredLite | PlainMessage<TestRequiredLite> | undefined): boolean {
    return proto2.util.equals(TestRequiredLite, a, b);
  }
}

/**
 * @generated from extension: optional protobuf_unittest.TestRequiredLite single = 1000;
 */
export const TestRequiredLite_single = proto2.makeExtension<TestAllExtensionsLite, TestRequiredLite>(
  "protobuf_unittest.TestRequiredLite.single", 
  TestAllExtensionsLite, 
  () => ({ no: 1000, kind: "message", T: TestRequiredLite, opt: true }),
);

/**
 * @generated from message protobuf_unittest.ForeignMessageArenaLite
 */
export class ForeignMessageArenaLite extends Message<ForeignMessageArenaLite> {
  /**
   * @generated from field: optional int32 c = 1;
   */
  c?: number;

  constructor(data?: PartialMessage<ForeignMessageArenaLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.ForeignMessageArenaLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "c", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ForeignMessageArenaLite {
    return new ForeignMessageArenaLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ForeignMessageArenaLite {
    return new ForeignMessageArenaLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ForeignMessageArenaLite {
    return new ForeignMessageArenaLite().fromJsonString(jsonString, options);
  }

  static equals(a: ForeignMessageArenaLite | PlainMessage<ForeignMessageArenaLite> | undefined, b: ForeignMessageArenaLite | PlainMessage<ForeignMessageArenaLite> | undefined): boolean {
    return proto2.util.equals(ForeignMessageArenaLite, a, b);
  }
}

