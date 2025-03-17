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

// @generated by protoc-gen-es v2.2.4 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_proto3.proto (package proto3_unittest, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { ImportMessage } from "./unittest_import_pb.js";
import type { PublicImportMessage } from "./unittest_import_public_pb.js";

/**
 * Describes the file google/protobuf/unittest_proto3.proto.
 */
export declare const file_google_protobuf_unittest_proto3: GenFile;

/**
 * This proto includes every type of field in both singular and repeated
 * forms.
 *
 * @generated from message proto3_unittest.TestAllTypes
 */
export declare type TestAllTypes = Message<"proto3_unittest.TestAllTypes"> & {
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
   * @generated from field: optional proto3_unittest.TestAllTypes.NestedMessage optional_nested_message = 18;
   */
  optionalNestedMessage?: TestAllTypes_NestedMessage;

  /**
   * @generated from field: proto3_unittest.ForeignMessage optional_foreign_message = 19;
   */
  optionalForeignMessage?: ForeignMessage;

  /**
   * @generated from field: proto2_unittest_import.ImportMessage optional_import_message = 20;
   */
  optionalImportMessage?: ImportMessage;

  /**
   * @generated from field: proto3_unittest.TestAllTypes.NestedEnum optional_nested_enum = 21;
   */
  optionalNestedEnum: TestAllTypes_NestedEnum;

  /**
   * @generated from field: proto3_unittest.ForeignEnum optional_foreign_enum = 22;
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
   * @generated from field: proto2_unittest_import.PublicImportMessage optional_public_import_message = 26;
   */
  optionalPublicImportMessage?: PublicImportMessage;

  /**
   * @generated from field: proto3_unittest.TestAllTypes.NestedMessage optional_lazy_message = 27;
   */
  optionalLazyMessage?: TestAllTypes_NestedMessage;

  /**
   * @generated from field: proto3_unittest.TestAllTypes.NestedMessage optional_unverified_lazy_message = 28;
   */
  optionalUnverifiedLazyMessage?: TestAllTypes_NestedMessage;

  /**
   * @generated from field: proto2_unittest_import.ImportMessage optional_lazy_import_message = 115;
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
   * @generated from field: repeated proto3_unittest.TestAllTypes.NestedMessage repeated_nested_message = 48;
   */
  repeatedNestedMessage: TestAllTypes_NestedMessage[];

  /**
   * @generated from field: repeated proto3_unittest.ForeignMessage repeated_foreign_message = 49;
   */
  repeatedForeignMessage: ForeignMessage[];

  /**
   * @generated from field: repeated proto2_unittest_import.ImportMessage repeated_import_message = 50;
   */
  repeatedImportMessage: ImportMessage[];

  /**
   * @generated from field: repeated proto3_unittest.TestAllTypes.NestedEnum repeated_nested_enum = 51;
   */
  repeatedNestedEnum: TestAllTypes_NestedEnum[];

  /**
   * @generated from field: repeated proto3_unittest.ForeignEnum repeated_foreign_enum = 52;
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
   * @generated from field: repeated proto3_unittest.TestAllTypes.NestedMessage repeated_lazy_message = 57;
   */
  repeatedLazyMessage: TestAllTypes_NestedMessage[];

  /**
   * @generated from oneof proto3_unittest.TestAllTypes.oneof_field
   */
  oneofField: {
    /**
     * @generated from field: uint32 oneof_uint32 = 111;
     */
    value: number;
    case: "oneofUint32";
  } | {
    /**
     * @generated from field: proto3_unittest.TestAllTypes.NestedMessage oneof_nested_message = 112;
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
};

/**
 * Describes the message proto3_unittest.TestAllTypes.
 * Use `create(TestAllTypesSchema)` to create a new message.
 */
export declare const TestAllTypesSchema: GenMessage<TestAllTypes>;

/**
 * @generated from message proto3_unittest.TestAllTypes.NestedMessage
 */
export declare type TestAllTypes_NestedMessage = Message<"proto3_unittest.TestAllTypes.NestedMessage"> & {
  /**
   * The field name "b" fails to compile in proto1 because it conflicts with
   * a local variable named "b" in one of the generated methods.  Doh.
   * This file needs to compile in proto1 to test backwards-compatibility.
   *
   * @generated from field: int32 bb = 1;
   */
  bb: number;
};

/**
 * Describes the message proto3_unittest.TestAllTypes.NestedMessage.
 * Use `create(TestAllTypes_NestedMessageSchema)` to create a new message.
 */
export declare const TestAllTypes_NestedMessageSchema: GenMessage<TestAllTypes_NestedMessage>;

/**
 * @generated from enum proto3_unittest.TestAllTypes.NestedEnum
 */
export enum TestAllTypes_NestedEnum {
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
 * Describes the enum proto3_unittest.TestAllTypes.NestedEnum.
 */
export declare const TestAllTypes_NestedEnumSchema: GenEnum<TestAllTypes_NestedEnum>;

/**
 * @generated from message proto3_unittest.TestPackedTypes
 */
export declare type TestPackedTypes = Message<"proto3_unittest.TestPackedTypes"> & {
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
   * @generated from field: repeated proto3_unittest.ForeignEnum packed_enum = 103 [packed = true];
   */
  packedEnum: ForeignEnum[];
};

/**
 * Describes the message proto3_unittest.TestPackedTypes.
 * Use `create(TestPackedTypesSchema)` to create a new message.
 */
export declare const TestPackedTypesSchema: GenMessage<TestPackedTypes>;

/**
 * Explicitly set packed to false
 *
 * @generated from message proto3_unittest.TestUnpackedTypes
 */
export declare type TestUnpackedTypes = Message<"proto3_unittest.TestUnpackedTypes"> & {
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
   * @generated from field: repeated proto3_unittest.TestAllTypes.NestedEnum repeated_nested_enum = 14 [packed = false];
   */
  repeatedNestedEnum: TestAllTypes_NestedEnum[];
};

/**
 * Describes the message proto3_unittest.TestUnpackedTypes.
 * Use `create(TestUnpackedTypesSchema)` to create a new message.
 */
export declare const TestUnpackedTypesSchema: GenMessage<TestUnpackedTypes>;

/**
 * This proto includes a recursively nested message.
 *
 * @generated from message proto3_unittest.NestedTestAllTypes
 */
export declare type NestedTestAllTypes = Message<"proto3_unittest.NestedTestAllTypes"> & {
  /**
   * @generated from field: proto3_unittest.NestedTestAllTypes child = 1;
   */
  child?: NestedTestAllTypes;

  /**
   * @generated from field: proto3_unittest.TestAllTypes payload = 2;
   */
  payload?: TestAllTypes;
};

/**
 * Describes the message proto3_unittest.NestedTestAllTypes.
 * Use `create(NestedTestAllTypesSchema)` to create a new message.
 */
export declare const NestedTestAllTypesSchema: GenMessage<NestedTestAllTypes>;

/**
 * Define these after TestAllTypes to make sure the compiler can handle
 * that.
 *
 * @generated from message proto3_unittest.ForeignMessage
 */
export declare type ForeignMessage = Message<"proto3_unittest.ForeignMessage"> & {
  /**
   * @generated from field: int32 c = 1;
   */
  c: number;
};

/**
 * Describes the message proto3_unittest.ForeignMessage.
 * Use `create(ForeignMessageSchema)` to create a new message.
 */
export declare const ForeignMessageSchema: GenMessage<ForeignMessage>;

/**
 * TestEmptyMessage is used to test behavior of unknown fields.
 *
 * @generated from message proto3_unittest.TestEmptyMessage
 */
export declare type TestEmptyMessage = Message<"proto3_unittest.TestEmptyMessage"> & {
};

/**
 * Describes the message proto3_unittest.TestEmptyMessage.
 * Use `create(TestEmptyMessageSchema)` to create a new message.
 */
export declare const TestEmptyMessageSchema: GenMessage<TestEmptyMessage>;

/**
 * TestMessageWithDummy is also used to test behavior of unknown fields.
 *
 * @generated from message proto3_unittest.TestMessageWithDummy
 */
export declare type TestMessageWithDummy = Message<"proto3_unittest.TestMessageWithDummy"> & {
  /**
   * This field is only here for triggering copy-on-write; it's not intended to
   * be serialized.
   *
   * @generated from field: bool dummy = 536870911;
   */
  dummy: boolean;
};

/**
 * Describes the message proto3_unittest.TestMessageWithDummy.
 * Use `create(TestMessageWithDummySchema)` to create a new message.
 */
export declare const TestMessageWithDummySchema: GenMessage<TestMessageWithDummy>;

/**
 * Same layout as TestOneof2 in unittest.proto to test unknown enum value
 * parsing behavior in oneof.
 *
 * @generated from message proto3_unittest.TestOneof2
 */
export declare type TestOneof2 = Message<"proto3_unittest.TestOneof2"> & {
  /**
   * @generated from oneof proto3_unittest.TestOneof2.foo
   */
  foo: {
    /**
     * @generated from field: proto3_unittest.TestOneof2.NestedEnum foo_enum = 6;
     */
    value: TestOneof2_NestedEnum;
    case: "fooEnum";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message proto3_unittest.TestOneof2.
 * Use `create(TestOneof2Schema)` to create a new message.
 */
export declare const TestOneof2Schema: GenMessage<TestOneof2>;

/**
 * @generated from enum proto3_unittest.TestOneof2.NestedEnum
 */
export enum TestOneof2_NestedEnum {
  /**
   * @generated from enum value: UNKNOWN = 0;
   */
  UNKNOWN = 0,

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
}

/**
 * Describes the enum proto3_unittest.TestOneof2.NestedEnum.
 */
export declare const TestOneof2_NestedEnumSchema: GenEnum<TestOneof2_NestedEnum>;

/**
 * If bool fields are incorrectly assumed to have hasbits, InternalSwap would
 * result in swapping N more 32bit hasbits incorrectly. Considering padding, we
 * need many bool fields to stress this.
 *
 * @generated from message proto3_unittest.TestHasbits
 */
export declare type TestHasbits = Message<"proto3_unittest.TestHasbits"> & {
  /**
   * @generated from field: bool b1 = 1;
   */
  b1: boolean;

  /**
   * @generated from field: bool b2 = 2;
   */
  b2: boolean;

  /**
   * @generated from field: bool b3 = 3;
   */
  b3: boolean;

  /**
   * @generated from field: bool b4 = 4;
   */
  b4: boolean;

  /**
   * @generated from field: bool b5 = 5;
   */
  b5: boolean;

  /**
   * @generated from field: bool b6 = 6;
   */
  b6: boolean;

  /**
   * @generated from field: bool b7 = 7;
   */
  b7: boolean;

  /**
   * @generated from field: bool b8 = 8;
   */
  b8: boolean;

  /**
   * @generated from field: bool b9 = 9;
   */
  b9: boolean;

  /**
   * @generated from field: bool b10 = 10;
   */
  b10: boolean;

  /**
   * @generated from field: bool b11 = 11;
   */
  b11: boolean;

  /**
   * @generated from field: bool b12 = 12;
   */
  b12: boolean;

  /**
   * @generated from field: bool b13 = 13;
   */
  b13: boolean;

  /**
   * @generated from field: bool b14 = 14;
   */
  b14: boolean;

  /**
   * @generated from field: bool b15 = 15;
   */
  b15: boolean;

  /**
   * @generated from field: bool b16 = 16;
   */
  b16: boolean;

  /**
   * @generated from field: bool b17 = 17;
   */
  b17: boolean;

  /**
   * @generated from field: bool b18 = 18;
   */
  b18: boolean;

  /**
   * @generated from field: bool b19 = 19;
   */
  b19: boolean;

  /**
   * @generated from field: bool b20 = 20;
   */
  b20: boolean;

  /**
   * @generated from field: bool b21 = 21;
   */
  b21: boolean;

  /**
   * @generated from field: bool b22 = 22;
   */
  b22: boolean;

  /**
   * @generated from field: bool b23 = 23;
   */
  b23: boolean;

  /**
   * @generated from field: bool b24 = 24;
   */
  b24: boolean;

  /**
   * @generated from field: bool b25 = 25;
   */
  b25: boolean;

  /**
   * @generated from field: bool b26 = 26;
   */
  b26: boolean;

  /**
   * @generated from field: bool b27 = 27;
   */
  b27: boolean;

  /**
   * @generated from field: bool b28 = 28;
   */
  b28: boolean;

  /**
   * @generated from field: bool b29 = 29;
   */
  b29: boolean;

  /**
   * @generated from field: bool b30 = 30;
   */
  b30: boolean;

  /**
   * @generated from field: bool b31 = 31;
   */
  b31: boolean;

  /**
   * @generated from field: bool b32 = 32;
   */
  b32: boolean;

  /**
   * @generated from field: bool b33 = 33;
   */
  b33: boolean;

  /**
   * @generated from field: bool b34 = 34;
   */
  b34: boolean;

  /**
   * @generated from field: bool b35 = 35;
   */
  b35: boolean;

  /**
   * @generated from field: bool b36 = 36;
   */
  b36: boolean;

  /**
   * @generated from field: bool b37 = 37;
   */
  b37: boolean;

  /**
   * @generated from field: bool b38 = 38;
   */
  b38: boolean;

  /**
   * @generated from field: bool b39 = 39;
   */
  b39: boolean;

  /**
   * @generated from field: bool b40 = 40;
   */
  b40: boolean;

  /**
   * @generated from field: bool b41 = 41;
   */
  b41: boolean;

  /**
   * @generated from field: bool b42 = 42;
   */
  b42: boolean;

  /**
   * @generated from field: bool b43 = 43;
   */
  b43: boolean;

  /**
   * @generated from field: bool b44 = 44;
   */
  b44: boolean;

  /**
   * @generated from field: bool b45 = 45;
   */
  b45: boolean;

  /**
   * @generated from field: bool b46 = 46;
   */
  b46: boolean;

  /**
   * @generated from field: bool b47 = 47;
   */
  b47: boolean;

  /**
   * @generated from field: bool b48 = 48;
   */
  b48: boolean;

  /**
   * @generated from field: bool b49 = 49;
   */
  b49: boolean;

  /**
   * @generated from field: bool b50 = 50;
   */
  b50: boolean;

  /**
   * @generated from field: bool b51 = 51;
   */
  b51: boolean;

  /**
   * @generated from field: bool b52 = 52;
   */
  b52: boolean;

  /**
   * @generated from field: bool b53 = 53;
   */
  b53: boolean;

  /**
   * @generated from field: bool b54 = 54;
   */
  b54: boolean;

  /**
   * @generated from field: bool b55 = 55;
   */
  b55: boolean;

  /**
   * @generated from field: bool b56 = 56;
   */
  b56: boolean;

  /**
   * @generated from field: bool b57 = 57;
   */
  b57: boolean;

  /**
   * @generated from field: bool b58 = 58;
   */
  b58: boolean;

  /**
   * @generated from field: bool b59 = 59;
   */
  b59: boolean;

  /**
   * @generated from field: bool b60 = 60;
   */
  b60: boolean;

  /**
   * @generated from field: bool b61 = 61;
   */
  b61: boolean;

  /**
   * @generated from field: bool b62 = 62;
   */
  b62: boolean;

  /**
   * @generated from field: bool b63 = 63;
   */
  b63: boolean;

  /**
   * @generated from field: bool b64 = 64;
   */
  b64: boolean;

  /**
   * @generated from field: bool b65 = 65;
   */
  b65: boolean;

  /**
   * @generated from field: bool b66 = 66;
   */
  b66: boolean;

  /**
   * @generated from field: bool b67 = 67;
   */
  b67: boolean;

  /**
   * @generated from field: bool b68 = 68;
   */
  b68: boolean;

  /**
   * @generated from field: bool b69 = 69;
   */
  b69: boolean;

  /**
   * @generated from field: proto3_unittest.TestAllTypes child = 100;
   */
  child?: TestAllTypes;
};

/**
 * Describes the message proto3_unittest.TestHasbits.
 * Use `create(TestHasbitsSchema)` to create a new message.
 */
export declare const TestHasbitsSchema: GenMessage<TestHasbits>;

/**
 * @generated from enum proto3_unittest.ForeignEnum
 */
export enum ForeignEnum {
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

  /**
   * Large enough to escape the Boxed Integer cache.
   *
   * @generated from enum value: FOREIGN_LARGE = 123456;
   */
  FOREIGN_LARGE = 123456,
}

/**
 * Describes the enum proto3_unittest.ForeignEnum.
 */
export declare const ForeignEnumSchema: GenEnum<ForeignEnum>;

