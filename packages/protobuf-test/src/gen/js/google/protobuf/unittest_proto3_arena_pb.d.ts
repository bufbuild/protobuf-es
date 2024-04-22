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

// @generated by protoc-gen-es v1.9.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_proto3_arena.proto (package proto3_arena_unittest, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { ImportMessage } from "./unittest_import_pb.js";
import type { PublicImportMessage } from "./unittest_import_public_pb.js";

/**
 * @generated from enum proto3_arena_unittest.ForeignEnum
 */
export declare enum ForeignEnum {
  /**
   * @generated from enum value: FOREIGN_ZERO = 0;
   */
  FOREIGN_ZERO = 0,

  /**
   * @generated from enum value: FOREIGN_FOO = 4;
   */
  FOREIGN_FOO = 4,

  /**
   * @generated from enum value: FOREIGN_BAR = 5;
   */
  FOREIGN_BAR = 5,

  /**
   * @generated from enum value: FOREIGN_BAZ = 6;
   */
  FOREIGN_BAZ = 6,
}

/**
 * This proto includes every type of field in both singular and repeated
 * forms.
 *
 * @generated from message proto3_arena_unittest.TestAllTypes
 */
export declare class TestAllTypes extends Message<TestAllTypes> {
  /**
   * Singular
   *
   * @generated from field: int32 optional_int32 = 1;
   */
  optionalInt32: number;

  /**
   * @generated from field: int64 optional_int64 = 2;
   */
  optionalInt64: bigint;

  /**
   * @generated from field: uint32 optional_uint32 = 3;
   */
  optionalUint32: number;

  /**
   * @generated from field: uint64 optional_uint64 = 4;
   */
  optionalUint64: bigint;

  /**
   * @generated from field: sint32 optional_sint32 = 5;
   */
  optionalSint32: number;

  /**
   * @generated from field: sint64 optional_sint64 = 6;
   */
  optionalSint64: bigint;

  /**
   * @generated from field: fixed32 optional_fixed32 = 7;
   */
  optionalFixed32: number;

  /**
   * @generated from field: fixed64 optional_fixed64 = 8;
   */
  optionalFixed64: bigint;

  /**
   * @generated from field: sfixed32 optional_sfixed32 = 9;
   */
  optionalSfixed32: number;

  /**
   * @generated from field: sfixed64 optional_sfixed64 = 10;
   */
  optionalSfixed64: bigint;

  /**
   * @generated from field: float optional_float = 11;
   */
  optionalFloat: number;

  /**
   * @generated from field: double optional_double = 12;
   */
  optionalDouble: number;

  /**
   * @generated from field: bool optional_bool = 13;
   */
  optionalBool: boolean;

  /**
   * @generated from field: string optional_string = 14;
   */
  optionalString: string;

  /**
   * @generated from field: bytes optional_bytes = 15;
   */
  optionalBytes: Uint8Array;

  /**
   * @generated from field: proto3_arena_unittest.TestAllTypes.NestedMessage optional_nested_message = 18;
   */
  optionalNestedMessage?: TestAllTypes_NestedMessage;

  /**
   * @generated from field: proto3_arena_unittest.ForeignMessage optional_foreign_message = 19;
   */
  optionalForeignMessage?: ForeignMessage;

  /**
   * @generated from field: protobuf_unittest_import.ImportMessage optional_import_message = 20;
   */
  optionalImportMessage?: ImportMessage;

  /**
   * @generated from field: proto3_arena_unittest.TestAllTypes.NestedEnum optional_nested_enum = 21;
   */
  optionalNestedEnum: TestAllTypes_NestedEnum;

  /**
   * @generated from field: proto3_arena_unittest.ForeignEnum optional_foreign_enum = 22;
   */
  optionalForeignEnum: ForeignEnum;

  /**
   * @generated from field: string optional_string_piece = 24;
   */
  optionalStringPiece: string;

  /**
   * @generated from field: string optional_cord = 25;
   */
  optionalCord: string;

  /**
   * Defined in unittest_import_public.proto
   *
   * @generated from field: protobuf_unittest_import.PublicImportMessage optional_public_import_message = 26;
   */
  optionalPublicImportMessage?: PublicImportMessage;

  /**
   * @generated from field: proto3_arena_unittest.TestAllTypes.NestedMessage optional_lazy_message = 27;
   */
  optionalLazyMessage?: TestAllTypes_NestedMessage;

  /**
   * @generated from field: proto3_arena_unittest.TestAllTypes.NestedMessage optional_unverified_lazy_message = 28;
   */
  optionalUnverifiedLazyMessage?: TestAllTypes_NestedMessage;

  /**
   * @generated from field: protobuf_unittest_import.ImportMessage optional_lazy_import_message = 115;
   */
  optionalLazyImportMessage?: ImportMessage;

  /**
   * Repeated
   *
   * @generated from field: repeated int32 repeated_int32 = 31;
   */
  repeatedInt32: number[];

  /**
   * @generated from field: repeated int64 repeated_int64 = 32;
   */
  repeatedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 repeated_uint32 = 33;
   */
  repeatedUint32: number[];

  /**
   * @generated from field: repeated uint64 repeated_uint64 = 34;
   */
  repeatedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 repeated_sint32 = 35;
   */
  repeatedSint32: number[];

  /**
   * @generated from field: repeated sint64 repeated_sint64 = 36;
   */
  repeatedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 repeated_fixed32 = 37;
   */
  repeatedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 repeated_fixed64 = 38;
   */
  repeatedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 repeated_sfixed32 = 39;
   */
  repeatedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64 = 40;
   */
  repeatedSfixed64: bigint[];

  /**
   * @generated from field: repeated float repeated_float = 41;
   */
  repeatedFloat: number[];

  /**
   * @generated from field: repeated double repeated_double = 42;
   */
  repeatedDouble: number[];

  /**
   * @generated from field: repeated bool repeated_bool = 43;
   */
  repeatedBool: boolean[];

  /**
   * @generated from field: repeated string repeated_string = 44;
   */
  repeatedString: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes = 45;
   */
  repeatedBytes: Uint8Array[];

  /**
   * Optional
   *
   * @generated from field: optional int32 proto3_optional_int32 = 116;
   */
  proto3OptionalInt32?: number;

  /**
   * @generated from field: optional int64 proto3_optional_int64 = 117;
   */
  proto3OptionalInt64?: bigint;

  /**
   * @generated from field: optional uint32 proto3_optional_uint32 = 118;
   */
  proto3OptionalUint32?: number;

  /**
   * @generated from field: optional uint64 proto3_optional_uint64 = 119;
   */
  proto3OptionalUint64?: bigint;

  /**
   * @generated from field: optional sint32 proto3_optional_sint32 = 120;
   */
  proto3OptionalSint32?: number;

  /**
   * @generated from field: optional sint64 proto3_optional_sint64 = 121;
   */
  proto3OptionalSint64?: bigint;

  /**
   * @generated from field: optional fixed32 proto3_optional_fixed32 = 122;
   */
  proto3OptionalFixed32?: number;

  /**
   * @generated from field: optional fixed64 proto3_optional_fixed64 = 123;
   */
  proto3OptionalFixed64?: bigint;

  /**
   * @generated from field: optional sfixed32 proto3_optional_sfixed32 = 124;
   */
  proto3OptionalSfixed32?: number;

  /**
   * @generated from field: optional sfixed64 proto3_optional_sfixed64 = 125;
   */
  proto3OptionalSfixed64?: bigint;

  /**
   * @generated from field: optional float proto3_optional_float = 126;
   */
  proto3OptionalFloat?: number;

  /**
   * @generated from field: optional double proto3_optional_double = 127;
   */
  proto3OptionalDouble?: number;

  /**
   * @generated from field: optional bool proto3_optional_bool = 128;
   */
  proto3OptionalBool?: boolean;

  /**
   * @generated from field: optional string proto3_optional_string = 129;
   */
  proto3OptionalString?: string;

  /**
   * @generated from field: optional bytes proto3_optional_bytes = 130;
   */
  proto3OptionalBytes?: Uint8Array;

  /**
   * @generated from field: repeated proto3_arena_unittest.TestAllTypes.NestedMessage repeated_nested_message = 48;
   */
  repeatedNestedMessage: TestAllTypes_NestedMessage[];

  /**
   * @generated from field: repeated proto3_arena_unittest.ForeignMessage repeated_foreign_message = 49;
   */
  repeatedForeignMessage: ForeignMessage[];

  /**
   * @generated from field: repeated protobuf_unittest_import.ImportMessage repeated_import_message = 50;
   */
  repeatedImportMessage: ImportMessage[];

  /**
   * @generated from field: repeated proto3_arena_unittest.TestAllTypes.NestedEnum repeated_nested_enum = 51;
   */
  repeatedNestedEnum: TestAllTypes_NestedEnum[];

  /**
   * @generated from field: repeated proto3_arena_unittest.ForeignEnum repeated_foreign_enum = 52;
   */
  repeatedForeignEnum: ForeignEnum[];

  /**
   * @generated from field: repeated string repeated_string_piece = 54;
   */
  repeatedStringPiece: string[];

  /**
   * @generated from field: repeated string repeated_cord = 55;
   */
  repeatedCord: string[];

  /**
   * @generated from field: repeated proto3_arena_unittest.TestAllTypes.NestedMessage repeated_lazy_message = 57;
   */
  repeatedLazyMessage: TestAllTypes_NestedMessage[];

  /**
   * @generated from oneof proto3_arena_unittest.TestAllTypes.oneof_field
   */
  oneofField: {
    /**
     * @generated from field: uint32 oneof_uint32 = 111;
     */
    value: number;
    case: "oneofUint32";
  } | {
    /**
     * @generated from field: proto3_arena_unittest.TestAllTypes.NestedMessage oneof_nested_message = 112;
     */
    value: TestAllTypes_NestedMessage;
    case: "oneofNestedMessage";
  } | {
    /**
     * @generated from field: string oneof_string = 113;
     */
    value: string;
    case: "oneofString";
  } | {
    /**
     * @generated from field: bytes oneof_bytes = 114;
     */
    value: Uint8Array;
    case: "oneofBytes";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<TestAllTypes>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestAllTypes";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestAllTypes;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestAllTypes;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestAllTypes;

  static equals(a: TestAllTypes | PlainMessage<TestAllTypes> | undefined, b: TestAllTypes | PlainMessage<TestAllTypes> | undefined): boolean;
}

/**
 * @generated from enum proto3_arena_unittest.TestAllTypes.NestedEnum
 */
export declare enum TestAllTypes_NestedEnum {
  /**
   * @generated from enum value: ZERO = 0;
   */
  ZERO = 0,

  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,

  /**
   * @generated from enum value: BAR = 2;
   */
  BAR = 2,

  /**
   * @generated from enum value: BAZ = 3;
   */
  BAZ = 3,

  /**
   * Intentionally negative.
   *
   * @generated from enum value: NEG = -1;
   */
  NEG = -1,
}

/**
 * @generated from message proto3_arena_unittest.TestAllTypes.NestedMessage
 */
export declare class TestAllTypes_NestedMessage extends Message<TestAllTypes_NestedMessage> {
  /**
   * The field name "b" fails to compile in proto1 because it conflicts with
   * a local variable named "b" in one of the generated methods.  Doh.
   * This file needs to compile in proto1 to test backwards-compatibility.
   *
   * @generated from field: int32 bb = 1;
   */
  bb: number;

  constructor(data?: PartialMessage<TestAllTypes_NestedMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestAllTypes.NestedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestAllTypes_NestedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestAllTypes_NestedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestAllTypes_NestedMessage;

  static equals(a: TestAllTypes_NestedMessage | PlainMessage<TestAllTypes_NestedMessage> | undefined, b: TestAllTypes_NestedMessage | PlainMessage<TestAllTypes_NestedMessage> | undefined): boolean;
}

/**
 * @generated from message proto3_arena_unittest.TestPackedTypes
 */
export declare class TestPackedTypes extends Message<TestPackedTypes> {
  /**
   * @generated from field: repeated int32 packed_int32 = 90 [packed = true];
   */
  packedInt32: number[];

  /**
   * @generated from field: repeated int64 packed_int64 = 91 [packed = true];
   */
  packedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 packed_uint32 = 92 [packed = true];
   */
  packedUint32: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64 = 93 [packed = true];
   */
  packedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 packed_sint32 = 94 [packed = true];
   */
  packedSint32: number[];

  /**
   * @generated from field: repeated sint64 packed_sint64 = 95 [packed = true];
   */
  packedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 packed_fixed32 = 96 [packed = true];
   */
  packedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 packed_fixed64 = 97 [packed = true];
   */
  packedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 packed_sfixed32 = 98 [packed = true];
   */
  packedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 packed_sfixed64 = 99 [packed = true];
   */
  packedSfixed64: bigint[];

  /**
   * @generated from field: repeated float packed_float = 100 [packed = true];
   */
  packedFloat: number[];

  /**
   * @generated from field: repeated double packed_double = 101 [packed = true];
   */
  packedDouble: number[];

  /**
   * @generated from field: repeated bool packed_bool = 102 [packed = true];
   */
  packedBool: boolean[];

  /**
   * @generated from field: repeated proto3_arena_unittest.ForeignEnum packed_enum = 103 [packed = true];
   */
  packedEnum: ForeignEnum[];

  constructor(data?: PartialMessage<TestPackedTypes>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestPackedTypes";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestPackedTypes;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestPackedTypes;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestPackedTypes;

  static equals(a: TestPackedTypes | PlainMessage<TestPackedTypes> | undefined, b: TestPackedTypes | PlainMessage<TestPackedTypes> | undefined): boolean;
}

/**
 * Explicitly set packed to false
 *
 * @generated from message proto3_arena_unittest.TestUnpackedTypes
 */
export declare class TestUnpackedTypes extends Message<TestUnpackedTypes> {
  /**
   * @generated from field: repeated int32 repeated_int32 = 1 [packed = false];
   */
  repeatedInt32: number[];

  /**
   * @generated from field: repeated int64 repeated_int64 = 2 [packed = false];
   */
  repeatedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 repeated_uint32 = 3 [packed = false];
   */
  repeatedUint32: number[];

  /**
   * @generated from field: repeated uint64 repeated_uint64 = 4 [packed = false];
   */
  repeatedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 repeated_sint32 = 5 [packed = false];
   */
  repeatedSint32: number[];

  /**
   * @generated from field: repeated sint64 repeated_sint64 = 6 [packed = false];
   */
  repeatedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 repeated_fixed32 = 7 [packed = false];
   */
  repeatedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 repeated_fixed64 = 8 [packed = false];
   */
  repeatedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 repeated_sfixed32 = 9 [packed = false];
   */
  repeatedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64 = 10 [packed = false];
   */
  repeatedSfixed64: bigint[];

  /**
   * @generated from field: repeated float repeated_float = 11 [packed = false];
   */
  repeatedFloat: number[];

  /**
   * @generated from field: repeated double repeated_double = 12 [packed = false];
   */
  repeatedDouble: number[];

  /**
   * @generated from field: repeated bool repeated_bool = 13 [packed = false];
   */
  repeatedBool: boolean[];

  /**
   * @generated from field: repeated proto3_arena_unittest.TestAllTypes.NestedEnum repeated_nested_enum = 14 [packed = false];
   */
  repeatedNestedEnum: TestAllTypes_NestedEnum[];

  constructor(data?: PartialMessage<TestUnpackedTypes>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestUnpackedTypes";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestUnpackedTypes;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestUnpackedTypes;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestUnpackedTypes;

  static equals(a: TestUnpackedTypes | PlainMessage<TestUnpackedTypes> | undefined, b: TestUnpackedTypes | PlainMessage<TestUnpackedTypes> | undefined): boolean;
}

/**
 * This proto includes a recursively nested message.
 *
 * @generated from message proto3_arena_unittest.NestedTestAllTypes
 */
export declare class NestedTestAllTypes extends Message<NestedTestAllTypes> {
  /**
   * @generated from field: proto3_arena_unittest.NestedTestAllTypes child = 1;
   */
  child?: NestedTestAllTypes;

  /**
   * @generated from field: proto3_arena_unittest.TestAllTypes payload = 2;
   */
  payload?: TestAllTypes;

  /**
   * @generated from field: repeated proto3_arena_unittest.NestedTestAllTypes repeated_child = 3;
   */
  repeatedChild: NestedTestAllTypes[];

  /**
   * @generated from field: proto3_arena_unittest.TestAllTypes lazy_payload = 4;
   */
  lazyPayload?: TestAllTypes;

  constructor(data?: PartialMessage<NestedTestAllTypes>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.NestedTestAllTypes";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NestedTestAllTypes;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NestedTestAllTypes;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NestedTestAllTypes;

  static equals(a: NestedTestAllTypes | PlainMessage<NestedTestAllTypes> | undefined, b: NestedTestAllTypes | PlainMessage<NestedTestAllTypes> | undefined): boolean;
}

/**
 * Define these after TestAllTypes to make sure the compiler can handle
 * that.
 *
 * @generated from message proto3_arena_unittest.ForeignMessage
 */
export declare class ForeignMessage extends Message<ForeignMessage> {
  /**
   * @generated from field: int32 c = 1;
   */
  c: number;

  constructor(data?: PartialMessage<ForeignMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.ForeignMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ForeignMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ForeignMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ForeignMessage;

  static equals(a: ForeignMessage | PlainMessage<ForeignMessage> | undefined, b: ForeignMessage | PlainMessage<ForeignMessage> | undefined): boolean;
}

/**
 * TestEmptyMessage is used to test behavior of unknown fields.
 *
 * @generated from message proto3_arena_unittest.TestEmptyMessage
 */
export declare class TestEmptyMessage extends Message<TestEmptyMessage> {
  constructor(data?: PartialMessage<TestEmptyMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestEmptyMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestEmptyMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestEmptyMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestEmptyMessage;

  static equals(a: TestEmptyMessage | PlainMessage<TestEmptyMessage> | undefined, b: TestEmptyMessage | PlainMessage<TestEmptyMessage> | undefined): boolean;
}

/**
 * Needed for a Python test.
 *
 * @generated from message proto3_arena_unittest.TestPickleNestedMessage
 */
export declare class TestPickleNestedMessage extends Message<TestPickleNestedMessage> {
  constructor(data?: PartialMessage<TestPickleNestedMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestPickleNestedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestPickleNestedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestPickleNestedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestPickleNestedMessage;

  static equals(a: TestPickleNestedMessage | PlainMessage<TestPickleNestedMessage> | undefined, b: TestPickleNestedMessage | PlainMessage<TestPickleNestedMessage> | undefined): boolean;
}

/**
 * @generated from message proto3_arena_unittest.TestPickleNestedMessage.NestedMessage
 */
export declare class TestPickleNestedMessage_NestedMessage extends Message<TestPickleNestedMessage_NestedMessage> {
  /**
   * @generated from field: int32 bb = 1;
   */
  bb: number;

  constructor(data?: PartialMessage<TestPickleNestedMessage_NestedMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestPickleNestedMessage.NestedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestPickleNestedMessage_NestedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestPickleNestedMessage_NestedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestPickleNestedMessage_NestedMessage;

  static equals(a: TestPickleNestedMessage_NestedMessage | PlainMessage<TestPickleNestedMessage_NestedMessage> | undefined, b: TestPickleNestedMessage_NestedMessage | PlainMessage<TestPickleNestedMessage_NestedMessage> | undefined): boolean;
}

/**
 * @generated from message proto3_arena_unittest.TestPickleNestedMessage.NestedMessage.NestedNestedMessage
 */
export declare class TestPickleNestedMessage_NestedMessage_NestedNestedMessage extends Message<TestPickleNestedMessage_NestedMessage_NestedNestedMessage> {
  /**
   * @generated from field: int32 cc = 1;
   */
  cc: number;

  constructor(data?: PartialMessage<TestPickleNestedMessage_NestedMessage_NestedNestedMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "proto3_arena_unittest.TestPickleNestedMessage.NestedMessage.NestedNestedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestPickleNestedMessage_NestedMessage_NestedNestedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestPickleNestedMessage_NestedMessage_NestedNestedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestPickleNestedMessage_NestedMessage_NestedNestedMessage;

  static equals(a: TestPickleNestedMessage_NestedMessage_NestedNestedMessage | PlainMessage<TestPickleNestedMessage_NestedMessage_NestedNestedMessage> | undefined, b: TestPickleNestedMessage_NestedMessage_NestedNestedMessage | PlainMessage<TestPickleNestedMessage_NestedMessage_NestedNestedMessage> | undefined): boolean;
}

