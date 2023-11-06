// Copyright 2021-2023 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.4.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/map_lite_unittest.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";
import type { ForeignMessageLite, TestAllTypesLite } from "./unittest_lite_pb.js";

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumLite
 */
export declare enum Proto2MapEnumLite {
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

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumPlusExtraLite
 */
export declare enum Proto2MapEnumPlusExtraLite {
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

/**
 * @generated from enum protobuf_unittest.MapEnumLite
 */
export declare enum MapEnumLite {
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

/**
 * @generated from message protobuf_unittest.TestMapLite
 */
export declare class TestMapLite extends Message<TestMapLite> {
  /**
   * @generated from field: map<int32, int32> map_int32_int32 = 1;
   */
  mapInt32Int32: { [key: number]: number };

  /**
   * @generated from field: map<int64, int64> map_int64_int64 = 2;
   */
  mapInt64Int64: { [key: string]: bigint };

  /**
   * @generated from field: map<uint32, uint32> map_uint32_uint32 = 3;
   */
  mapUint32Uint32: { [key: number]: number };

  /**
   * @generated from field: map<uint64, uint64> map_uint64_uint64 = 4;
   */
  mapUint64Uint64: { [key: string]: bigint };

  /**
   * @generated from field: map<sint32, sint32> map_sint32_sint32 = 5;
   */
  mapSint32Sint32: { [key: number]: number };

  /**
   * @generated from field: map<sint64, sint64> map_sint64_sint64 = 6;
   */
  mapSint64Sint64: { [key: string]: bigint };

  /**
   * @generated from field: map<fixed32, fixed32> map_fixed32_fixed32 = 7;
   */
  mapFixed32Fixed32: { [key: number]: number };

  /**
   * @generated from field: map<fixed64, fixed64> map_fixed64_fixed64 = 8;
   */
  mapFixed64Fixed64: { [key: string]: bigint };

  /**
   * @generated from field: map<sfixed32, sfixed32> map_sfixed32_sfixed32 = 9;
   */
  mapSfixed32Sfixed32: { [key: number]: number };

  /**
   * @generated from field: map<sfixed64, sfixed64> map_sfixed64_sfixed64 = 10;
   */
  mapSfixed64Sfixed64: { [key: string]: bigint };

  /**
   * @generated from field: map<int32, float> map_int32_float = 11;
   */
  mapInt32Float: { [key: number]: number };

  /**
   * @generated from field: map<int32, double> map_int32_double = 12;
   */
  mapInt32Double: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool = 13;
   */
  mapBoolBool: { [key: string]: boolean };

  /**
   * @generated from field: map<string, string> map_string_string = 14;
   */
  mapStringString: { [key: string]: string };

  /**
   * @generated from field: map<int32, bytes> map_int32_bytes = 15;
   */
  mapInt32Bytes: { [key: number]: Uint8Array };

  /**
   * @generated from field: map<int32, protobuf_unittest.MapEnumLite> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnumLite };

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessageLite> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessageLite };

  /**
   * @generated from field: map<int32, int32> teboring = 18;
   */
  teboring: { [key: number]: number };

  constructor(data?: PartialMessage<TestMapLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestMapLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMapLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMapLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMapLite;

  static equals(a: TestMapLite | PlainMessage<TestMapLite> | undefined, b: TestMapLite | PlainMessage<TestMapLite> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestArenaMapLite
 */
export declare class TestArenaMapLite extends Message<TestArenaMapLite> {
  /**
   * @generated from field: map<int32, int32> map_int32_int32 = 1;
   */
  mapInt32Int32: { [key: number]: number };

  /**
   * @generated from field: map<int64, int64> map_int64_int64 = 2;
   */
  mapInt64Int64: { [key: string]: bigint };

  /**
   * @generated from field: map<uint32, uint32> map_uint32_uint32 = 3;
   */
  mapUint32Uint32: { [key: number]: number };

  /**
   * @generated from field: map<uint64, uint64> map_uint64_uint64 = 4;
   */
  mapUint64Uint64: { [key: string]: bigint };

  /**
   * @generated from field: map<sint32, sint32> map_sint32_sint32 = 5;
   */
  mapSint32Sint32: { [key: number]: number };

  /**
   * @generated from field: map<sint64, sint64> map_sint64_sint64 = 6;
   */
  mapSint64Sint64: { [key: string]: bigint };

  /**
   * @generated from field: map<fixed32, fixed32> map_fixed32_fixed32 = 7;
   */
  mapFixed32Fixed32: { [key: number]: number };

  /**
   * @generated from field: map<fixed64, fixed64> map_fixed64_fixed64 = 8;
   */
  mapFixed64Fixed64: { [key: string]: bigint };

  /**
   * @generated from field: map<sfixed32, sfixed32> map_sfixed32_sfixed32 = 9;
   */
  mapSfixed32Sfixed32: { [key: number]: number };

  /**
   * @generated from field: map<sfixed64, sfixed64> map_sfixed64_sfixed64 = 10;
   */
  mapSfixed64Sfixed64: { [key: string]: bigint };

  /**
   * @generated from field: map<int32, float> map_int32_float = 11;
   */
  mapInt32Float: { [key: number]: number };

  /**
   * @generated from field: map<int32, double> map_int32_double = 12;
   */
  mapInt32Double: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool = 13;
   */
  mapBoolBool: { [key: string]: boolean };

  /**
   * @generated from field: map<string, string> map_string_string = 14;
   */
  mapStringString: { [key: string]: string };

  /**
   * @generated from field: map<int32, bytes> map_int32_bytes = 15;
   */
  mapInt32Bytes: { [key: number]: Uint8Array };

  /**
   * @generated from field: map<int32, protobuf_unittest.MapEnumLite> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnumLite };

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessageArenaLite> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessageArenaLite };

  constructor(data?: PartialMessage<TestArenaMapLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestArenaMapLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestArenaMapLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestArenaMapLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestArenaMapLite;

  static equals(a: TestArenaMapLite | PlainMessage<TestArenaMapLite> | undefined, b: TestArenaMapLite | PlainMessage<TestArenaMapLite> | undefined): boolean;
}

/**
 * Test embedded message with required fields
 *
 * @generated from message protobuf_unittest.TestRequiredMessageMapLite
 */
export declare class TestRequiredMessageMapLite extends Message<TestRequiredMessageMapLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestRequiredLite> map_field = 1;
   */
  mapField: { [key: number]: TestRequiredLite };

  constructor(data?: PartialMessage<TestRequiredMessageMapLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestRequiredMessageMapLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredMessageMapLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredMessageMapLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredMessageMapLite;

  static equals(a: TestRequiredMessageMapLite | PlainMessage<TestRequiredMessageMapLite> | undefined, b: TestRequiredMessageMapLite | PlainMessage<TestRequiredMessageMapLite> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestEnumMapLite
 */
export declare class TestEnumMapLite extends Message<TestEnumMapLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumLite> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnumLite };

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumLite> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnumLite };

  constructor(data?: PartialMessage<TestEnumMapLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestEnumMapLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestEnumMapLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestEnumMapLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestEnumMapLite;

  static equals(a: TestEnumMapLite | PlainMessage<TestEnumMapLite> | undefined, b: TestEnumMapLite | PlainMessage<TestEnumMapLite> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestEnumMapPlusExtraLite
 */
export declare class TestEnumMapPlusExtraLite extends Message<TestEnumMapPlusExtraLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumPlusExtraLite> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnumPlusExtraLite };

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumPlusExtraLite> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnumPlusExtraLite };

  constructor(data?: PartialMessage<TestEnumMapPlusExtraLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestEnumMapPlusExtraLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestEnumMapPlusExtraLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestEnumMapPlusExtraLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestEnumMapPlusExtraLite;

  static equals(a: TestEnumMapPlusExtraLite | PlainMessage<TestEnumMapPlusExtraLite> | undefined, b: TestEnumMapPlusExtraLite | PlainMessage<TestEnumMapPlusExtraLite> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestMessageMapLite
 */
export declare class TestMessageMapLite extends Message<TestMessageMapLite> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestAllTypesLite> map_int32_message = 1;
   */
  mapInt32Message: { [key: number]: TestAllTypesLite };

  constructor(data?: PartialMessage<TestMessageMapLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestMessageMapLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageMapLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageMapLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageMapLite;

  static equals(a: TestMessageMapLite | PlainMessage<TestMessageMapLite> | undefined, b: TestMessageMapLite | PlainMessage<TestMessageMapLite> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestRequiredLite
 */
export declare class TestRequiredLite extends Message<TestRequiredLite> {
  /**
   * @generated from field: required int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: required int32 b = 2;
   */
  b: number;

  /**
   * @generated from field: required int32 c = 3;
   */
  c: number;

  constructor(data?: PartialMessage<TestRequiredLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestRequiredLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredLite;

  static equals(a: TestRequiredLite | PlainMessage<TestRequiredLite> | undefined, b: TestRequiredLite | PlainMessage<TestRequiredLite> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.ForeignMessageArenaLite
 */
export declare class ForeignMessageArenaLite extends Message<ForeignMessageArenaLite> {
  /**
   * @generated from field: optional int32 c = 1;
   */
  c?: number;

  constructor(data?: PartialMessage<ForeignMessageArenaLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.ForeignMessageArenaLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ForeignMessageArenaLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ForeignMessageArenaLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ForeignMessageArenaLite;

  static equals(a: ForeignMessageArenaLite | PlainMessage<ForeignMessageArenaLite> | undefined, b: ForeignMessageArenaLite | PlainMessage<ForeignMessageArenaLite> | undefined): boolean;
}

