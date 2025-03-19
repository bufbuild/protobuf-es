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

// @generated by protoc-gen-es v2.2.5 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/map_proto2_unittest.proto (package proto2_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In map_test_util.h we do "using namespace unittest = proto2_unittest".

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { ImportEnumForMap } from "./unittest_import_pb.js";

/**
 * Describes the file google/protobuf/map_proto2_unittest.proto.
 */
export declare const file_google_protobuf_map_proto2_unittest: GenFile;

/**
 * @generated from message proto2_unittest.TestEnumMap
 */
export declare type TestEnumMap = Message<"proto2_unittest.TestEnumMap"> & {
  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnum> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnum> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnum };

  /**
   * Other maps with all key types to test the unknown entry serialization
   *
   * @generated from field: map<int64, proto2_unittest.Proto2MapEnum> unknown_map_field_int64 = 200;
   */
  unknownMapFieldInt64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<uint64, proto2_unittest.Proto2MapEnum> unknown_map_field_uint64 = 201;
   */
  unknownMapFieldUint64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnum> unknown_map_field_int32 = 202;
   */
  unknownMapFieldInt32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<uint32, proto2_unittest.Proto2MapEnum> unknown_map_field_uint32 = 203;
   */
  unknownMapFieldUint32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<fixed32, proto2_unittest.Proto2MapEnum> unknown_map_field_fixed32 = 204;
   */
  unknownMapFieldFixed32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<fixed64, proto2_unittest.Proto2MapEnum> unknown_map_field_fixed64 = 205;
   */
  unknownMapFieldFixed64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<bool, proto2_unittest.Proto2MapEnum> unknown_map_field_bool = 206;
   */
  unknownMapFieldBool: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<string, proto2_unittest.Proto2MapEnum> unknown_map_field_string = 207;
   */
  unknownMapFieldString: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<sint32, proto2_unittest.Proto2MapEnum> unknown_map_field_sint32 = 208;
   */
  unknownMapFieldSint32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<sint64, proto2_unittest.Proto2MapEnum> unknown_map_field_sint64 = 209;
   */
  unknownMapFieldSint64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<sfixed32, proto2_unittest.Proto2MapEnum> unknown_map_field_sfixed32 = 210;
   */
  unknownMapFieldSfixed32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<sfixed64, proto2_unittest.Proto2MapEnum> unknown_map_field_sfixed64 = 211;
   */
  unknownMapFieldSfixed64: { [key: string]: Proto2MapEnum };
};

/**
 * Describes the message proto2_unittest.TestEnumMap.
 * Use `create(TestEnumMapSchema)` to create a new message.
 */
export declare const TestEnumMapSchema: GenMessage<TestEnumMap>;

/**
 * @generated from message proto2_unittest.TestEnumMapPlusExtra
 */
export declare type TestEnumMapPlusExtra = Message<"proto2_unittest.TestEnumMapPlusExtra"> & {
  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnumPlusExtra> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * Other maps with all key types to test the unknown entry serialization
   *
   * @generated from field: map<int64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_int64 = 200;
   */
  unknownMapFieldInt64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<uint64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_uint64 = 201;
   */
  unknownMapFieldUint64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_int32 = 202;
   */
  unknownMapFieldInt32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<uint32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_uint32 = 203;
   */
  unknownMapFieldUint32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<fixed32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_fixed32 = 204;
   */
  unknownMapFieldFixed32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<fixed64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_fixed64 = 205;
   */
  unknownMapFieldFixed64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<bool, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_bool = 206;
   */
  unknownMapFieldBool: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<string, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_string = 207;
   */
  unknownMapFieldString: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sint32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sint32 = 208;
   */
  unknownMapFieldSint32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sint64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sint64 = 209;
   */
  unknownMapFieldSint64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sfixed32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sfixed32 = 210;
   */
  unknownMapFieldSfixed32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sfixed64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sfixed64 = 211;
   */
  unknownMapFieldSfixed64: { [key: string]: Proto2MapEnumPlusExtra };
};

/**
 * Describes the message proto2_unittest.TestEnumMapPlusExtra.
 * Use `create(TestEnumMapPlusExtraSchema)` to create a new message.
 */
export declare const TestEnumMapPlusExtraSchema: GenMessage<TestEnumMapPlusExtra>;

/**
 * @generated from message proto2_unittest.TestImportEnumMap
 */
export declare type TestImportEnumMap = Message<"proto2_unittest.TestImportEnumMap"> & {
  /**
   * @generated from field: map<int32, proto2_unittest_import.ImportEnumForMap> import_enum_amp = 1;
   */
  importEnumAmp: { [key: number]: ImportEnumForMap };
};

/**
 * Describes the message proto2_unittest.TestImportEnumMap.
 * Use `create(TestImportEnumMapSchema)` to create a new message.
 */
export declare const TestImportEnumMapSchema: GenMessage<TestImportEnumMap>;

/**
 * @generated from message proto2_unittest.TestIntIntMap
 */
export declare type TestIntIntMap = Message<"proto2_unittest.TestIntIntMap"> & {
  /**
   * @generated from field: map<int32, int32> m = 1;
   */
  m: { [key: number]: number };
};

/**
 * Describes the message proto2_unittest.TestIntIntMap.
 * Use `create(TestIntIntMapSchema)` to create a new message.
 */
export declare const TestIntIntMapSchema: GenMessage<TestIntIntMap>;

/**
 * Test all key types: string, plus the non-floating-point scalars.
 *
 * @generated from message proto2_unittest.TestMaps
 */
export declare type TestMaps = Message<"proto2_unittest.TestMaps"> & {
  /**
   * @generated from field: map<int32, proto2_unittest.TestIntIntMap> m_int32 = 1;
   */
  mInt32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<int64, proto2_unittest.TestIntIntMap> m_int64 = 2;
   */
  mInt64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<uint32, proto2_unittest.TestIntIntMap> m_uint32 = 3;
   */
  mUint32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<uint64, proto2_unittest.TestIntIntMap> m_uint64 = 4;
   */
  mUint64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<sint32, proto2_unittest.TestIntIntMap> m_sint32 = 5;
   */
  mSint32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<sint64, proto2_unittest.TestIntIntMap> m_sint64 = 6;
   */
  mSint64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<fixed32, proto2_unittest.TestIntIntMap> m_fixed32 = 7;
   */
  mFixed32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<fixed64, proto2_unittest.TestIntIntMap> m_fixed64 = 8;
   */
  mFixed64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<sfixed32, proto2_unittest.TestIntIntMap> m_sfixed32 = 9;
   */
  mSfixed32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<sfixed64, proto2_unittest.TestIntIntMap> m_sfixed64 = 10;
   */
  mSfixed64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<bool, proto2_unittest.TestIntIntMap> m_bool = 11;
   */
  mBool: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<string, proto2_unittest.TestIntIntMap> m_string = 12;
   */
  mString: { [key: string]: TestIntIntMap };
};

/**
 * Describes the message proto2_unittest.TestMaps.
 * Use `create(TestMapsSchema)` to create a new message.
 */
export declare const TestMapsSchema: GenMessage<TestMaps>;

/**
 * Test maps in submessages.
 *
 * @generated from message proto2_unittest.TestSubmessageMaps
 */
export declare type TestSubmessageMaps = Message<"proto2_unittest.TestSubmessageMaps"> & {
  /**
   * @generated from field: optional proto2_unittest.TestMaps m = 1;
   */
  m?: TestMaps;
};

/**
 * Describes the message proto2_unittest.TestSubmessageMaps.
 * Use `create(TestSubmessageMapsSchema)` to create a new message.
 */
export declare const TestSubmessageMapsSchema: GenMessage<TestSubmessageMaps>;

/**
 * @generated from message proto2_unittest.TestProto2BytesMap
 */
export declare type TestProto2BytesMap = Message<"proto2_unittest.TestProto2BytesMap"> & {
  /**
   * @generated from field: map<int32, bytes> map_bytes = 1;
   */
  mapBytes: { [key: number]: Uint8Array };

  /**
   * @generated from field: map<int32, string> map_string = 2;
   */
  mapString: { [key: number]: string };
};

/**
 * Describes the message proto2_unittest.TestProto2BytesMap.
 * Use `create(TestProto2BytesMapSchema)` to create a new message.
 */
export declare const TestProto2BytesMapSchema: GenMessage<TestProto2BytesMap>;

/**
 * @generated from enum proto2_unittest.Proto2MapEnum
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

/**
 * Describes the enum proto2_unittest.Proto2MapEnum.
 */
export declare const Proto2MapEnumSchema: GenEnum<Proto2MapEnum>;

/**
 * @generated from enum proto2_unittest.Proto2MapEnumPlusExtra
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

/**
 * Describes the enum proto2_unittest.Proto2MapEnumPlusExtra.
 */
export declare const Proto2MapEnumPlusExtraSchema: GenEnum<Proto2MapEnumPlusExtra>;

