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

// @generated by protoc-gen-es v1.5.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/map_unittest.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In map_test_util.h we do "using namespace unittest = protobuf_unittest".

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { ForeignMessage, TestAllTypes, TestRequired } from "./unittest_pb.js";

/**
 * @generated from enum protobuf_unittest.MapEnum
 */
export enum MapEnum {
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
// Retrieve enum metadata with: proto3.getEnumType(MapEnum)
proto3.util.setEnumType(MapEnum, "protobuf_unittest.MapEnum", [
  { no: 0, name: "MAP_ENUM_FOO" },
  { no: 1, name: "MAP_ENUM_BAR" },
  { no: 2, name: "MAP_ENUM_BAZ" },
]);

/**
 * Tests maps.
 *
 * @generated from message protobuf_unittest.TestMap
 */
export class TestMap extends Message<TestMap> {
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
   * @generated from field: map<int32, protobuf_unittest.MapEnum> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnum } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessage> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessage } = {};

  /**
   * @generated from field: map<string, protobuf_unittest.ForeignMessage> map_string_foreign_message = 18;
   */
  mapStringForeignMessage: { [key: string]: ForeignMessage } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.TestAllTypes> map_int32_all_types = 19;
   */
  mapInt32AllTypes: { [key: number]: TestAllTypes } = {};

  constructor(data?: PartialMessage<TestMap>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.TestMap";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
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
    { no: 16, name: "map_int32_enum", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto3.getEnumType(MapEnum)} },
    { no: 17, name: "map_int32_foreign_message", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: ForeignMessage} },
    { no: 18, name: "map_string_foreign_message", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: ForeignMessage} },
    { no: 19, name: "map_int32_all_types", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: TestAllTypes} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMap {
    return new TestMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMap {
    return new TestMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMap {
    return new TestMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestMap | PlainMessage<TestMap> | undefined, b: TestMap | PlainMessage<TestMap> | undefined): boolean {
    return proto3.util.equals(TestMap, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestMapSubmessage
 */
export class TestMapSubmessage extends Message<TestMapSubmessage> {
  /**
   * @generated from field: protobuf_unittest.TestMap test_map = 1;
   */
  testMap?: TestMap;

  constructor(data?: PartialMessage<TestMapSubmessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.TestMapSubmessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "test_map", kind: "message", T: TestMap },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMapSubmessage {
    return new TestMapSubmessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMapSubmessage {
    return new TestMapSubmessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMapSubmessage {
    return new TestMapSubmessage().fromJsonString(jsonString, options);
  }

  static equals(a: TestMapSubmessage | PlainMessage<TestMapSubmessage> | undefined, b: TestMapSubmessage | PlainMessage<TestMapSubmessage> | undefined): boolean {
    return proto3.util.equals(TestMapSubmessage, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestMessageMap
 */
export class TestMessageMap extends Message<TestMessageMap> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestAllTypes> map_int32_message = 1;
   */
  mapInt32Message: { [key: number]: TestAllTypes } = {};

  constructor(data?: PartialMessage<TestMessageMap>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.TestMessageMap";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "map_int32_message", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: TestAllTypes} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageMap {
    return new TestMessageMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageMap {
    return new TestMessageMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageMap {
    return new TestMessageMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageMap | PlainMessage<TestMessageMap> | undefined, b: TestMessageMap | PlainMessage<TestMessageMap> | undefined): boolean {
    return proto3.util.equals(TestMessageMap, a, b);
  }
}

/**
 * Two map fields share the same entry default instance.
 *
 * @generated from message protobuf_unittest.TestSameTypeMap
 */
export class TestSameTypeMap extends Message<TestSameTypeMap> {
  /**
   * @generated from field: map<int32, int32> map1 = 1;
   */
  map1: { [key: number]: number } = {};

  /**
   * @generated from field: map<int32, int32> map2 = 2;
   */
  map2: { [key: number]: number } = {};

  constructor(data?: PartialMessage<TestSameTypeMap>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.TestSameTypeMap";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "map1", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
    { no: 2, name: "map2", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestSameTypeMap {
    return new TestSameTypeMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestSameTypeMap {
    return new TestSameTypeMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestSameTypeMap {
    return new TestSameTypeMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestSameTypeMap | PlainMessage<TestSameTypeMap> | undefined, b: TestSameTypeMap | PlainMessage<TestSameTypeMap> | undefined): boolean {
    return proto3.util.equals(TestSameTypeMap, a, b);
  }
}

/**
 * Test embedded message with required fields
 *
 * @generated from message protobuf_unittest.TestRequiredMessageMap
 */
export class TestRequiredMessageMap extends Message<TestRequiredMessageMap> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestRequired> map_field = 1;
   */
  mapField: { [key: number]: TestRequired } = {};

  constructor(data?: PartialMessage<TestRequiredMessageMap>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.TestRequiredMessageMap";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: TestRequired} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredMessageMap {
    return new TestRequiredMessageMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredMessageMap {
    return new TestRequiredMessageMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredMessageMap {
    return new TestRequiredMessageMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestRequiredMessageMap | PlainMessage<TestRequiredMessageMap> | undefined, b: TestRequiredMessageMap | PlainMessage<TestRequiredMessageMap> | undefined): boolean {
    return proto3.util.equals(TestRequiredMessageMap, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestArenaMap
 */
export class TestArenaMap extends Message<TestArenaMap> {
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
   * @generated from field: map<int32, protobuf_unittest.MapEnum> map_int32_enum = 16;
   */
  mapInt32Enum: { [key: number]: MapEnum } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.ForeignMessage> map_int32_foreign_message = 17;
   */
  mapInt32ForeignMessage: { [key: number]: ForeignMessage } = {};

  constructor(data?: PartialMessage<TestArenaMap>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.TestArenaMap";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
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
    { no: 16, name: "map_int32_enum", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto3.getEnumType(MapEnum)} },
    { no: 17, name: "map_int32_foreign_message", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: ForeignMessage} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestArenaMap {
    return new TestArenaMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestArenaMap {
    return new TestArenaMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestArenaMap {
    return new TestArenaMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestArenaMap | PlainMessage<TestArenaMap> | undefined, b: TestArenaMap | PlainMessage<TestArenaMap> | undefined): boolean {
    return proto3.util.equals(TestArenaMap, a, b);
  }
}

/**
 * Previously, message containing enum called Type cannot be used as value of
 * map field.
 *
 * @generated from message protobuf_unittest.MessageContainingEnumCalledType
 */
export class MessageContainingEnumCalledType extends Message<MessageContainingEnumCalledType> {
  /**
   * @generated from field: map<string, protobuf_unittest.MessageContainingEnumCalledType> type = 1;
   */
  type: { [key: string]: MessageContainingEnumCalledType } = {};

  constructor(data?: PartialMessage<MessageContainingEnumCalledType>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.MessageContainingEnumCalledType";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: MessageContainingEnumCalledType} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageContainingEnumCalledType {
    return new MessageContainingEnumCalledType().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageContainingEnumCalledType {
    return new MessageContainingEnumCalledType().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageContainingEnumCalledType {
    return new MessageContainingEnumCalledType().fromJsonString(jsonString, options);
  }

  static equals(a: MessageContainingEnumCalledType | PlainMessage<MessageContainingEnumCalledType> | undefined, b: MessageContainingEnumCalledType | PlainMessage<MessageContainingEnumCalledType> | undefined): boolean {
    return proto3.util.equals(MessageContainingEnumCalledType, a, b);
  }
}

/**
 * @generated from enum protobuf_unittest.MessageContainingEnumCalledType.Type
 */
export enum MessageContainingEnumCalledType_Type {
  /**
   * @generated from enum value: TYPE_FOO = 0;
   */
  FOO = 0,
}
// Retrieve enum metadata with: proto3.getEnumType(MessageContainingEnumCalledType_Type)
proto3.util.setEnumType(MessageContainingEnumCalledType_Type, "protobuf_unittest.MessageContainingEnumCalledType.Type", [
  { no: 0, name: "TYPE_FOO" },
]);

/**
 * Previously, message cannot contain map field called "entry".
 *
 * @generated from message protobuf_unittest.MessageContainingMapCalledEntry
 */
export class MessageContainingMapCalledEntry extends Message<MessageContainingMapCalledEntry> {
  /**
   * @generated from field: map<int32, int32> entry = 1;
   */
  entry: { [key: number]: number } = {};

  constructor(data?: PartialMessage<MessageContainingMapCalledEntry>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.MessageContainingMapCalledEntry";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "entry", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageContainingMapCalledEntry {
    return new MessageContainingMapCalledEntry().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageContainingMapCalledEntry {
    return new MessageContainingMapCalledEntry().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageContainingMapCalledEntry {
    return new MessageContainingMapCalledEntry().fromJsonString(jsonString, options);
  }

  static equals(a: MessageContainingMapCalledEntry | PlainMessage<MessageContainingMapCalledEntry> | undefined, b: MessageContainingMapCalledEntry | PlainMessage<MessageContainingMapCalledEntry> | undefined): boolean {
    return proto3.util.equals(MessageContainingMapCalledEntry, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestRecursiveMapMessage
 */
export class TestRecursiveMapMessage extends Message<TestRecursiveMapMessage> {
  /**
   * @generated from field: map<string, protobuf_unittest.TestRecursiveMapMessage> a = 1;
   */
  a: { [key: string]: TestRecursiveMapMessage } = {};

  constructor(data?: PartialMessage<TestRecursiveMapMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protobuf_unittest.TestRecursiveMapMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "a", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: TestRecursiveMapMessage} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRecursiveMapMessage {
    return new TestRecursiveMapMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRecursiveMapMessage {
    return new TestRecursiveMapMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRecursiveMapMessage {
    return new TestRecursiveMapMessage().fromJsonString(jsonString, options);
  }

  static equals(a: TestRecursiveMapMessage | PlainMessage<TestRecursiveMapMessage> | undefined, b: TestRecursiveMapMessage | PlainMessage<TestRecursiveMapMessage> | undefined): boolean {
    return proto3.util.equals(TestRecursiveMapMessage, a, b);
  }
}

