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

// @generated by protoc-gen-es v1.4.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/map_proto2_unittest.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In map_test_util.h we do "using namespace unittest = protobuf_unittest".

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";
import { ImportEnumForMap } from "./unittest_import_pb.js";

/**
 * @generated from enum protobuf_unittest.Proto2MapEnum
 */
export enum Proto2MapEnum {
  /**
   * @generated from enum value: PROTO2_MAP_ENUM_FOO = 0;
   */
  FOO = 0,

  /**
   * @generated from enum value: PROTO2_MAP_ENUM_BAR = 1;
   */
  BAR = 1,

  /**
   * @generated from enum value: PROTO2_MAP_ENUM_BAZ = 2;
   */
  BAZ = 2,
}
// Retrieve enum metadata with: proto2.getEnumType(Proto2MapEnum)
proto2.util.setEnumType(Proto2MapEnum, "protobuf_unittest.Proto2MapEnum", [
  { no: 0, name: "PROTO2_MAP_ENUM_FOO" },
  { no: 1, name: "PROTO2_MAP_ENUM_BAR" },
  { no: 2, name: "PROTO2_MAP_ENUM_BAZ" },
]);

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumPlusExtra
 */
export enum Proto2MapEnumPlusExtra {
  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_FOO = 0;
   */
  E_PROTO2_MAP_ENUM_FOO = 0,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_BAR = 1;
   */
  E_PROTO2_MAP_ENUM_BAR = 1,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_BAZ = 2;
   */
  E_PROTO2_MAP_ENUM_BAZ = 2,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_EXTRA = 3;
   */
  E_PROTO2_MAP_ENUM_EXTRA = 3,
}
// Retrieve enum metadata with: proto2.getEnumType(Proto2MapEnumPlusExtra)
proto2.util.setEnumType(Proto2MapEnumPlusExtra, "protobuf_unittest.Proto2MapEnumPlusExtra", [
  { no: 0, name: "E_PROTO2_MAP_ENUM_FOO" },
  { no: 1, name: "E_PROTO2_MAP_ENUM_BAR" },
  { no: 2, name: "E_PROTO2_MAP_ENUM_BAZ" },
  { no: 3, name: "E_PROTO2_MAP_ENUM_EXTRA" },
]);

/**
 * @generated from message protobuf_unittest.TestEnumMap
 */
export class TestEnumMap extends Message<TestEnumMap> {
  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnum> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnum> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnum } = {};

  /**
   * Other maps with all key types to test the unknown entry serialization
   *
   * @generated from field: map<int64, protobuf_unittest.Proto2MapEnum> unknown_map_field_int64 = 200;
   */
  unknownMapFieldInt64: { [key: string]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<uint64, protobuf_unittest.Proto2MapEnum> unknown_map_field_uint64 = 201;
   */
  unknownMapFieldUint64: { [key: string]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnum> unknown_map_field_int32 = 202;
   */
  unknownMapFieldInt32: { [key: number]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<uint32, protobuf_unittest.Proto2MapEnum> unknown_map_field_uint32 = 203;
   */
  unknownMapFieldUint32: { [key: number]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<fixed32, protobuf_unittest.Proto2MapEnum> unknown_map_field_fixed32 = 204;
   */
  unknownMapFieldFixed32: { [key: number]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<fixed64, protobuf_unittest.Proto2MapEnum> unknown_map_field_fixed64 = 205;
   */
  unknownMapFieldFixed64: { [key: string]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<bool, protobuf_unittest.Proto2MapEnum> unknown_map_field_bool = 206;
   */
  unknownMapFieldBool: { [key: string]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<string, protobuf_unittest.Proto2MapEnum> unknown_map_field_string = 207;
   */
  unknownMapFieldString: { [key: string]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<sint32, protobuf_unittest.Proto2MapEnum> unknown_map_field_sint32 = 208;
   */
  unknownMapFieldSint32: { [key: number]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<sint64, protobuf_unittest.Proto2MapEnum> unknown_map_field_sint64 = 209;
   */
  unknownMapFieldSint64: { [key: string]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<sfixed32, protobuf_unittest.Proto2MapEnum> unknown_map_field_sfixed32 = 210;
   */
  unknownMapFieldSfixed32: { [key: number]: Proto2MapEnum } = {};

  /**
   * @generated from field: map<sfixed64, protobuf_unittest.Proto2MapEnum> unknown_map_field_sfixed64 = 211;
   */
  unknownMapFieldSfixed64: { [key: string]: Proto2MapEnum } = {};

  constructor(data?: PartialMessage<TestEnumMap>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestEnumMap";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 101, name: "known_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 102, name: "unknown_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 200, name: "unknown_map_field_int64", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 201, name: "unknown_map_field_uint64", kind: "map", K: 4 /* ScalarType.UINT64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 202, name: "unknown_map_field_int32", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 203, name: "unknown_map_field_uint32", kind: "map", K: 13 /* ScalarType.UINT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 204, name: "unknown_map_field_fixed32", kind: "map", K: 7 /* ScalarType.FIXED32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 205, name: "unknown_map_field_fixed64", kind: "map", K: 6 /* ScalarType.FIXED64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 206, name: "unknown_map_field_bool", kind: "map", K: 8 /* ScalarType.BOOL */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 207, name: "unknown_map_field_string", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 208, name: "unknown_map_field_sint32", kind: "map", K: 17 /* ScalarType.SINT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 209, name: "unknown_map_field_sint64", kind: "map", K: 18 /* ScalarType.SINT64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 210, name: "unknown_map_field_sfixed32", kind: "map", K: 15 /* ScalarType.SFIXED32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
    { no: 211, name: "unknown_map_field_sfixed64", kind: "map", K: 16 /* ScalarType.SFIXED64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnum)} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestEnumMap {
    return new TestEnumMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestEnumMap {
    return new TestEnumMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestEnumMap {
    return new TestEnumMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestEnumMap | PlainMessage<TestEnumMap> | undefined, b: TestEnumMap | PlainMessage<TestEnumMap> | undefined): boolean {
    return proto2.util.equals(TestEnumMap, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestEnumMapPlusExtra
 */
export class TestEnumMapPlusExtra extends Message<TestEnumMapPlusExtra> {
  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumPlusExtra> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnumPlusExtra } = {};

  /**
   * Other maps with all key types to test the unknown entry serialization
   *
   * @generated from field: map<int64, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_int64 = 200;
   */
  unknownMapFieldInt64: { [key: string]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<uint64, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_uint64 = 201;
   */
  unknownMapFieldUint64: { [key: string]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<int32, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_int32 = 202;
   */
  unknownMapFieldInt32: { [key: number]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<uint32, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_uint32 = 203;
   */
  unknownMapFieldUint32: { [key: number]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<fixed32, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_fixed32 = 204;
   */
  unknownMapFieldFixed32: { [key: number]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<fixed64, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_fixed64 = 205;
   */
  unknownMapFieldFixed64: { [key: string]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<bool, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_bool = 206;
   */
  unknownMapFieldBool: { [key: string]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<string, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_string = 207;
   */
  unknownMapFieldString: { [key: string]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<sint32, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sint32 = 208;
   */
  unknownMapFieldSint32: { [key: number]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<sint64, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sint64 = 209;
   */
  unknownMapFieldSint64: { [key: string]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<sfixed32, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sfixed32 = 210;
   */
  unknownMapFieldSfixed32: { [key: number]: Proto2MapEnumPlusExtra } = {};

  /**
   * @generated from field: map<sfixed64, protobuf_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sfixed64 = 211;
   */
  unknownMapFieldSfixed64: { [key: string]: Proto2MapEnumPlusExtra } = {};

  constructor(data?: PartialMessage<TestEnumMapPlusExtra>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestEnumMapPlusExtra";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 101, name: "known_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 102, name: "unknown_map_field", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 200, name: "unknown_map_field_int64", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 201, name: "unknown_map_field_uint64", kind: "map", K: 4 /* ScalarType.UINT64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 202, name: "unknown_map_field_int32", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 203, name: "unknown_map_field_uint32", kind: "map", K: 13 /* ScalarType.UINT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 204, name: "unknown_map_field_fixed32", kind: "map", K: 7 /* ScalarType.FIXED32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 205, name: "unknown_map_field_fixed64", kind: "map", K: 6 /* ScalarType.FIXED64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 206, name: "unknown_map_field_bool", kind: "map", K: 8 /* ScalarType.BOOL */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 207, name: "unknown_map_field_string", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 208, name: "unknown_map_field_sint32", kind: "map", K: 17 /* ScalarType.SINT32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 209, name: "unknown_map_field_sint64", kind: "map", K: 18 /* ScalarType.SINT64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 210, name: "unknown_map_field_sfixed32", kind: "map", K: 15 /* ScalarType.SFIXED32 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
    { no: 211, name: "unknown_map_field_sfixed64", kind: "map", K: 16 /* ScalarType.SFIXED64 */, V: {kind: "enum", T: proto2.getEnumType(Proto2MapEnumPlusExtra)} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestEnumMapPlusExtra {
    return new TestEnumMapPlusExtra().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestEnumMapPlusExtra {
    return new TestEnumMapPlusExtra().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestEnumMapPlusExtra {
    return new TestEnumMapPlusExtra().fromJsonString(jsonString, options);
  }

  static equals(a: TestEnumMapPlusExtra | PlainMessage<TestEnumMapPlusExtra> | undefined, b: TestEnumMapPlusExtra | PlainMessage<TestEnumMapPlusExtra> | undefined): boolean {
    return proto2.util.equals(TestEnumMapPlusExtra, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestImportEnumMap
 */
export class TestImportEnumMap extends Message<TestImportEnumMap> {
  /**
   * @generated from field: map<int32, protobuf_unittest_import.ImportEnumForMap> import_enum_amp = 1;
   */
  importEnumAmp: { [key: number]: ImportEnumForMap } = {};

  constructor(data?: PartialMessage<TestImportEnumMap>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestImportEnumMap";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "import_enum_amp", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "enum", T: proto2.getEnumType(ImportEnumForMap)} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestImportEnumMap {
    return new TestImportEnumMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestImportEnumMap {
    return new TestImportEnumMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestImportEnumMap {
    return new TestImportEnumMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestImportEnumMap | PlainMessage<TestImportEnumMap> | undefined, b: TestImportEnumMap | PlainMessage<TestImportEnumMap> | undefined): boolean {
    return proto2.util.equals(TestImportEnumMap, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestIntIntMap
 */
export class TestIntIntMap extends Message<TestIntIntMap> {
  /**
   * @generated from field: map<int32, int32> m = 1;
   */
  m: { [key: number]: number } = {};

  constructor(data?: PartialMessage<TestIntIntMap>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestIntIntMap";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "m", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestIntIntMap {
    return new TestIntIntMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestIntIntMap {
    return new TestIntIntMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestIntIntMap {
    return new TestIntIntMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestIntIntMap | PlainMessage<TestIntIntMap> | undefined, b: TestIntIntMap | PlainMessage<TestIntIntMap> | undefined): boolean {
    return proto2.util.equals(TestIntIntMap, a, b);
  }
}

/**
 * Test all key types: string, plus the non-floating-point scalars.
 *
 * @generated from message protobuf_unittest.TestMaps
 */
export class TestMaps extends Message<TestMaps> {
  /**
   * @generated from field: map<int32, protobuf_unittest.TestIntIntMap> m_int32 = 1;
   */
  mInt32: { [key: number]: TestIntIntMap } = {};

  /**
   * @generated from field: map<int64, protobuf_unittest.TestIntIntMap> m_int64 = 2;
   */
  mInt64: { [key: string]: TestIntIntMap } = {};

  /**
   * @generated from field: map<uint32, protobuf_unittest.TestIntIntMap> m_uint32 = 3;
   */
  mUint32: { [key: number]: TestIntIntMap } = {};

  /**
   * @generated from field: map<uint64, protobuf_unittest.TestIntIntMap> m_uint64 = 4;
   */
  mUint64: { [key: string]: TestIntIntMap } = {};

  /**
   * @generated from field: map<sint32, protobuf_unittest.TestIntIntMap> m_sint32 = 5;
   */
  mSint32: { [key: number]: TestIntIntMap } = {};

  /**
   * @generated from field: map<sint64, protobuf_unittest.TestIntIntMap> m_sint64 = 6;
   */
  mSint64: { [key: string]: TestIntIntMap } = {};

  /**
   * @generated from field: map<fixed32, protobuf_unittest.TestIntIntMap> m_fixed32 = 7;
   */
  mFixed32: { [key: number]: TestIntIntMap } = {};

  /**
   * @generated from field: map<fixed64, protobuf_unittest.TestIntIntMap> m_fixed64 = 8;
   */
  mFixed64: { [key: string]: TestIntIntMap } = {};

  /**
   * @generated from field: map<sfixed32, protobuf_unittest.TestIntIntMap> m_sfixed32 = 9;
   */
  mSfixed32: { [key: number]: TestIntIntMap } = {};

  /**
   * @generated from field: map<sfixed64, protobuf_unittest.TestIntIntMap> m_sfixed64 = 10;
   */
  mSfixed64: { [key: string]: TestIntIntMap } = {};

  /**
   * @generated from field: map<bool, protobuf_unittest.TestIntIntMap> m_bool = 11;
   */
  mBool: { [key: string]: TestIntIntMap } = {};

  /**
   * @generated from field: map<string, protobuf_unittest.TestIntIntMap> m_string = 12;
   */
  mString: { [key: string]: TestIntIntMap } = {};

  constructor(data?: PartialMessage<TestMaps>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestMaps";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "m_int32", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 2, name: "m_int64", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 3, name: "m_uint32", kind: "map", K: 13 /* ScalarType.UINT32 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 4, name: "m_uint64", kind: "map", K: 4 /* ScalarType.UINT64 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 5, name: "m_sint32", kind: "map", K: 17 /* ScalarType.SINT32 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 6, name: "m_sint64", kind: "map", K: 18 /* ScalarType.SINT64 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 7, name: "m_fixed32", kind: "map", K: 7 /* ScalarType.FIXED32 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 8, name: "m_fixed64", kind: "map", K: 6 /* ScalarType.FIXED64 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 9, name: "m_sfixed32", kind: "map", K: 15 /* ScalarType.SFIXED32 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 10, name: "m_sfixed64", kind: "map", K: 16 /* ScalarType.SFIXED64 */, V: {kind: "message", T: TestIntIntMap} },
    { no: 11, name: "m_bool", kind: "map", K: 8 /* ScalarType.BOOL */, V: {kind: "message", T: TestIntIntMap} },
    { no: 12, name: "m_string", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: TestIntIntMap} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMaps {
    return new TestMaps().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMaps {
    return new TestMaps().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMaps {
    return new TestMaps().fromJsonString(jsonString, options);
  }

  static equals(a: TestMaps | PlainMessage<TestMaps> | undefined, b: TestMaps | PlainMessage<TestMaps> | undefined): boolean {
    return proto2.util.equals(TestMaps, a, b);
  }
}

/**
 * Test maps in submessages.
 *
 * @generated from message protobuf_unittest.TestSubmessageMaps
 */
export class TestSubmessageMaps extends Message<TestSubmessageMaps> {
  /**
   * @generated from field: optional protobuf_unittest.TestMaps m = 1;
   */
  m?: TestMaps;

  constructor(data?: PartialMessage<TestSubmessageMaps>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestSubmessageMaps";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "m", kind: "message", T: TestMaps, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestSubmessageMaps {
    return new TestSubmessageMaps().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestSubmessageMaps {
    return new TestSubmessageMaps().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestSubmessageMaps {
    return new TestSubmessageMaps().fromJsonString(jsonString, options);
  }

  static equals(a: TestSubmessageMaps | PlainMessage<TestSubmessageMaps> | undefined, b: TestSubmessageMaps | PlainMessage<TestSubmessageMaps> | undefined): boolean {
    return proto2.util.equals(TestSubmessageMaps, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestProto2BytesMap
 */
export class TestProto2BytesMap extends Message<TestProto2BytesMap> {
  /**
   * @generated from field: map<int32, bytes> map_bytes = 1;
   */
  mapBytes: { [key: number]: Uint8Array } = {};

  /**
   * @generated from field: map<int32, string> map_string = 2;
   */
  mapString: { [key: number]: string } = {};

  constructor(data?: PartialMessage<TestProto2BytesMap>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestProto2BytesMap";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "map_bytes", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 12 /* ScalarType.BYTES */} },
    { no: 2, name: "map_string", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestProto2BytesMap {
    return new TestProto2BytesMap().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestProto2BytesMap {
    return new TestProto2BytesMap().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestProto2BytesMap {
    return new TestProto2BytesMap().fromJsonString(jsonString, options);
  }

  static equals(a: TestProto2BytesMap | PlainMessage<TestProto2BytesMap> | undefined, b: TestProto2BytesMap | PlainMessage<TestProto2BytesMap> | undefined): boolean {
    return proto2.util.equals(TestProto2BytesMap, a, b);
  }
}

