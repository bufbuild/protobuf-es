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

// @generated by protoc-gen-es v1.7.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/map_unittest.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In map_test_util.h we do "using namespace unittest = protobuf_unittest".

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { ForeignMessage, TestAllTypes, TestRequired } from "./unittest_pb.js";

/**
 * @generated from enum protobuf_unittest.MapEnum
 */
export declare enum MapEnum {
  /**
   * @generated from enum value: MAP_ENUM_FOO = 0;
   */
  FOO = 0,

  /**
   * @generated from enum value: MAP_ENUM_BAR = 1;
   */
  BAR = 1,

  /**
   * @generated from enum value: MAP_ENUM_BAZ = 2;
   */
  BAZ = 2,
}

/**
 * Tests maps.
 *
 * @generated from message protobuf_unittest.TestMap
 */
export declare class TestMap extends Message<TestMap> {
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
   * @generated from field: map<int32, protobuf_unittest.MapEnum> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnum };

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessage> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessage };

  /**
   * @generated from field: map<string, protobuf_unittest.ForeignMessage> map_string_foreign_message = 18;
   */
  mapStringForeignMessage: { [key: string]: ForeignMessage };

  /**
   * @generated from field: map<int32, protobuf_unittest.TestAllTypes> map_int32_all_types = 19;
   */
  mapInt32AllTypes: { [key: number]: TestAllTypes };

  constructor(data?: PartialMessage<TestMap>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.TestMap";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMap;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMap;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMap;

  static equals(a: TestMap | PlainMessage<TestMap> | undefined, b: TestMap | PlainMessage<TestMap> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestMapSubmessage
 */
export declare class TestMapSubmessage extends Message<TestMapSubmessage> {
  /**
   * @generated from field: protobuf_unittest.TestMap test_map = 1;
   */
  testMap?: TestMap;

  constructor(data?: PartialMessage<TestMapSubmessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.TestMapSubmessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMapSubmessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMapSubmessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMapSubmessage;

  static equals(a: TestMapSubmessage | PlainMessage<TestMapSubmessage> | undefined, b: TestMapSubmessage | PlainMessage<TestMapSubmessage> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestMessageMap
 */
export declare class TestMessageMap extends Message<TestMessageMap> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestAllTypes> map_int32_message = 1;
   */
  mapInt32Message: { [key: number]: TestAllTypes };

  constructor(data?: PartialMessage<TestMessageMap>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.TestMessageMap";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageMap;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageMap;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageMap;

  static equals(a: TestMessageMap | PlainMessage<TestMessageMap> | undefined, b: TestMessageMap | PlainMessage<TestMessageMap> | undefined): boolean;
}

/**
 * Two map fields share the same entry default instance.
 *
 * @generated from message protobuf_unittest.TestSameTypeMap
 */
export declare class TestSameTypeMap extends Message<TestSameTypeMap> {
  /**
   * @generated from field: map<int32, int32> map1 = 1;
   */
  map1: { [key: number]: number };

  /**
   * @generated from field: map<int32, int32> map2 = 2;
   */
  map2: { [key: number]: number };

  constructor(data?: PartialMessage<TestSameTypeMap>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.TestSameTypeMap";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestSameTypeMap;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestSameTypeMap;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestSameTypeMap;

  static equals(a: TestSameTypeMap | PlainMessage<TestSameTypeMap> | undefined, b: TestSameTypeMap | PlainMessage<TestSameTypeMap> | undefined): boolean;
}

/**
 * Test embedded message with required fields
 *
 * @generated from message protobuf_unittest.TestRequiredMessageMap
 */
export declare class TestRequiredMessageMap extends Message<TestRequiredMessageMap> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestRequired> map_field = 1;
   */
  mapField: { [key: number]: TestRequired };

  constructor(data?: PartialMessage<TestRequiredMessageMap>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.TestRequiredMessageMap";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredMessageMap;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredMessageMap;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredMessageMap;

  static equals(a: TestRequiredMessageMap | PlainMessage<TestRequiredMessageMap> | undefined, b: TestRequiredMessageMap | PlainMessage<TestRequiredMessageMap> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestArenaMap
 */
export declare class TestArenaMap extends Message<TestArenaMap> {
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
   * @generated from field: map<int32, protobuf_unittest.MapEnum> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnum };

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessage> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessage };

  constructor(data?: PartialMessage<TestArenaMap>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.TestArenaMap";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestArenaMap;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestArenaMap;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestArenaMap;

  static equals(a: TestArenaMap | PlainMessage<TestArenaMap> | undefined, b: TestArenaMap | PlainMessage<TestArenaMap> | undefined): boolean;
}

/**
 * Previously, message containing enum called Type cannot be used as value of
 * map field.
 *
 * @generated from message protobuf_unittest.MessageContainingEnumCalledType
 */
export declare class MessageContainingEnumCalledType extends Message<MessageContainingEnumCalledType> {
  /**
   * @generated from field: map<string, protobuf_unittest.MessageContainingEnumCalledType> type = 1;
   */
  type: { [key: string]: MessageContainingEnumCalledType };

  constructor(data?: PartialMessage<MessageContainingEnumCalledType>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.MessageContainingEnumCalledType";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageContainingEnumCalledType;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageContainingEnumCalledType;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageContainingEnumCalledType;

  static equals(a: MessageContainingEnumCalledType | PlainMessage<MessageContainingEnumCalledType> | undefined, b: MessageContainingEnumCalledType | PlainMessage<MessageContainingEnumCalledType> | undefined): boolean;
}

/**
 * @generated from enum protobuf_unittest.MessageContainingEnumCalledType.Type
 */
export declare enum MessageContainingEnumCalledType_Type {
  /**
   * @generated from enum value: TYPE_FOO = 0;
   */
  FOO = 0,
}

/**
 * Previously, message cannot contain map field called "entry".
 *
 * @generated from message protobuf_unittest.MessageContainingMapCalledEntry
 */
export declare class MessageContainingMapCalledEntry extends Message<MessageContainingMapCalledEntry> {
  /**
   * @generated from field: map<int32, int32> entry = 1;
   */
  entry: { [key: number]: number };

  constructor(data?: PartialMessage<MessageContainingMapCalledEntry>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.MessageContainingMapCalledEntry";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageContainingMapCalledEntry;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageContainingMapCalledEntry;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageContainingMapCalledEntry;

  static equals(a: MessageContainingMapCalledEntry | PlainMessage<MessageContainingMapCalledEntry> | undefined, b: MessageContainingMapCalledEntry | PlainMessage<MessageContainingMapCalledEntry> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestRecursiveMapMessage
 */
export declare class TestRecursiveMapMessage extends Message<TestRecursiveMapMessage> {
  /**
   * @generated from field: map<string, protobuf_unittest.TestRecursiveMapMessage> a = 1;
   */
  a: { [key: string]: TestRecursiveMapMessage };

  constructor(data?: PartialMessage<TestRecursiveMapMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "protobuf_unittest.TestRecursiveMapMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRecursiveMapMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRecursiveMapMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRecursiveMapMessage;

  static equals(a: TestRecursiveMapMessage | PlainMessage<TestRecursiveMapMessage> | undefined, b: TestRecursiveMapMessage | PlainMessage<TestRecursiveMapMessage> | undefined): boolean;
}

