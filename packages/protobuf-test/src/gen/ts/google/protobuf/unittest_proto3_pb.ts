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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file google/protobuf/unittest_proto3.proto (package proto3_unittest, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { ImportMessage } from "./unittest_import_pb.js";
import { file_google_protobuf_unittest_import } from "./unittest_import_pb.js";
import type { Message } from "@bufbuild/protobuf";
import type { PublicImportMessage } from "./unittest_import_public_pb.js";

/**
 * Describes the file google/protobuf/unittest_proto3.proto.
 */
export const file_google_protobuf_unittest_proto3: GenDescFile = /*@__PURE__*/
  fileDesc("CiVnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcHJvdG8zLnByb3RvEg9wcm90bzNfdW5pdHRlc3Qi/xEKDFRlc3RBbGxUeXBlcxIWCg5vcHRpb25hbF9pbnQzMhgBIAEoBRIWCg5vcHRpb25hbF9pbnQ2NBgCIAEoAxIXCg9vcHRpb25hbF91aW50MzIYAyABKA0SFwoPb3B0aW9uYWxfdWludDY0GAQgASgEEhcKD29wdGlvbmFsX3NpbnQzMhgFIAEoERIXCg9vcHRpb25hbF9zaW50NjQYBiABKBISGAoQb3B0aW9uYWxfZml4ZWQzMhgHIAEoBxIYChBvcHRpb25hbF9maXhlZDY0GAggASgGEhkKEW9wdGlvbmFsX3NmaXhlZDMyGAkgASgPEhkKEW9wdGlvbmFsX3NmaXhlZDY0GAogASgQEhYKDm9wdGlvbmFsX2Zsb2F0GAsgASgCEhcKD29wdGlvbmFsX2RvdWJsZRgMIAEoARIVCg1vcHRpb25hbF9ib29sGA0gASgIEhcKD29wdGlvbmFsX3N0cmluZxgOIAEoCRIWCg5vcHRpb25hbF9ieXRlcxgPIAEoDBJRChdvcHRpb25hbF9uZXN0ZWRfbWVzc2FnZRgSIAEoCzIrLnByb3RvM191bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZUgBiAEBEkEKGG9wdGlvbmFsX2ZvcmVpZ25fbWVzc2FnZRgTIAEoCzIfLnByb3RvM191bml0dGVzdC5Gb3JlaWduTWVzc2FnZRJIChdvcHRpb25hbF9pbXBvcnRfbWVzc2FnZRgUIAEoCzInLnByb3RvYnVmX3VuaXR0ZXN0X2ltcG9ydC5JbXBvcnRNZXNzYWdlEkYKFG9wdGlvbmFsX25lc3RlZF9lbnVtGBUgASgOMigucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRFbnVtEjsKFW9wdGlvbmFsX2ZvcmVpZ25fZW51bRgWIAEoDjIcLnByb3RvM191bml0dGVzdC5Gb3JlaWduRW51bRIhChVvcHRpb25hbF9zdHJpbmdfcGllY2UYGCABKAlCAggCEhkKDW9wdGlvbmFsX2NvcmQYGSABKAlCAggBElUKHm9wdGlvbmFsX3B1YmxpY19pbXBvcnRfbWVzc2FnZRgaIAEoCzItLnByb3RvYnVmX3VuaXR0ZXN0X2ltcG9ydC5QdWJsaWNJbXBvcnRNZXNzYWdlEk4KFW9wdGlvbmFsX2xhenlfbWVzc2FnZRgbIAEoCzIrLnByb3RvM191bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZUICKAESWQogb3B0aW9uYWxfdW52ZXJpZmllZF9sYXp5X21lc3NhZ2UYHCABKAsyKy5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZE1lc3NhZ2VCAngBElEKHG9wdGlvbmFsX2xhenlfaW1wb3J0X21lc3NhZ2UYcyABKAsyJy5wcm90b2J1Zl91bml0dGVzdF9pbXBvcnQuSW1wb3J0TWVzc2FnZUICKAESFgoOcmVwZWF0ZWRfaW50MzIYHyADKAUSFgoOcmVwZWF0ZWRfaW50NjQYICADKAMSFwoPcmVwZWF0ZWRfdWludDMyGCEgAygNEhcKD3JlcGVhdGVkX3VpbnQ2NBgiIAMoBBIXCg9yZXBlYXRlZF9zaW50MzIYIyADKBESFwoPcmVwZWF0ZWRfc2ludDY0GCQgAygSEhgKEHJlcGVhdGVkX2ZpeGVkMzIYJSADKAcSGAoQcmVwZWF0ZWRfZml4ZWQ2NBgmIAMoBhIZChFyZXBlYXRlZF9zZml4ZWQzMhgnIAMoDxIZChFyZXBlYXRlZF9zZml4ZWQ2NBgoIAMoEBIWCg5yZXBlYXRlZF9mbG9hdBgpIAMoAhIXCg9yZXBlYXRlZF9kb3VibGUYKiADKAESFQoNcmVwZWF0ZWRfYm9vbBgrIAMoCBIXCg9yZXBlYXRlZF9zdHJpbmcYLCADKAkSFgoOcmVwZWF0ZWRfYnl0ZXMYLSADKAwSTAoXcmVwZWF0ZWRfbmVzdGVkX21lc3NhZ2UYMCADKAsyKy5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZE1lc3NhZ2USQQoYcmVwZWF0ZWRfZm9yZWlnbl9tZXNzYWdlGDEgAygLMh8ucHJvdG8zX3VuaXR0ZXN0LkZvcmVpZ25NZXNzYWdlEkgKF3JlcGVhdGVkX2ltcG9ydF9tZXNzYWdlGDIgAygLMicucHJvdG9idWZfdW5pdHRlc3RfaW1wb3J0LkltcG9ydE1lc3NhZ2USRgoUcmVwZWF0ZWRfbmVzdGVkX2VudW0YMyADKA4yKC5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZEVudW0SOwoVcmVwZWF0ZWRfZm9yZWlnbl9lbnVtGDQgAygOMhwucHJvdG8zX3VuaXR0ZXN0LkZvcmVpZ25FbnVtEiEKFXJlcGVhdGVkX3N0cmluZ19waWVjZRg2IAMoCUICCAISGQoNcmVwZWF0ZWRfY29yZBg3IAMoCUICCAESSgoVcmVwZWF0ZWRfbGF6eV9tZXNzYWdlGDkgAygLMisucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRNZXNzYWdlEhYKDG9uZW9mX3VpbnQzMhhvIAEoDUgAEksKFG9uZW9mX25lc3RlZF9tZXNzYWdlGHAgASgLMisucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRNZXNzYWdlSAASFgoMb25lb2Zfc3RyaW5nGHEgASgJSAASFQoLb25lb2ZfYnl0ZXMYciABKAxIABobCg1OZXN0ZWRNZXNzYWdlEgoKAmJiGAEgASgFIkMKCk5lc3RlZEVudW0SCAoEWkVSTxAAEgcKA0ZPTxABEgcKA0JBUhACEgcKA0JBWhADEhAKA05FRxD///////////8BQg0KC29uZW9mX2ZpZWxkQhoKGF9vcHRpb25hbF9uZXN0ZWRfbWVzc2FnZSKoAwoPVGVzdFBhY2tlZFR5cGVzEhgKDHBhY2tlZF9pbnQzMhhaIAMoBUICEAESGAoMcGFja2VkX2ludDY0GFsgAygDQgIQARIZCg1wYWNrZWRfdWludDMyGFwgAygNQgIQARIZCg1wYWNrZWRfdWludDY0GF0gAygEQgIQARIZCg1wYWNrZWRfc2ludDMyGF4gAygRQgIQARIZCg1wYWNrZWRfc2ludDY0GF8gAygSQgIQARIaCg5wYWNrZWRfZml4ZWQzMhhgIAMoB0ICEAESGgoOcGFja2VkX2ZpeGVkNjQYYSADKAZCAhABEhsKD3BhY2tlZF9zZml4ZWQzMhhiIAMoD0ICEAESGwoPcGFja2VkX3NmaXhlZDY0GGMgAygQQgIQARIYCgxwYWNrZWRfZmxvYXQYZCADKAJCAhABEhkKDXBhY2tlZF9kb3VibGUYZSADKAFCAhABEhcKC3BhY2tlZF9ib29sGGYgAygIQgIQARI1CgtwYWNrZWRfZW51bRhnIAMoDjIcLnByb3RvM191bml0dGVzdC5Gb3JlaWduRW51bUICEAEi2QMKEVRlc3RVbnBhY2tlZFR5cGVzEhoKDnJlcGVhdGVkX2ludDMyGAEgAygFQgIQABIaCg5yZXBlYXRlZF9pbnQ2NBgCIAMoA0ICEAASGwoPcmVwZWF0ZWRfdWludDMyGAMgAygNQgIQABIbCg9yZXBlYXRlZF91aW50NjQYBCADKARCAhAAEhsKD3JlcGVhdGVkX3NpbnQzMhgFIAMoEUICEAASGwoPcmVwZWF0ZWRfc2ludDY0GAYgAygSQgIQABIcChByZXBlYXRlZF9maXhlZDMyGAcgAygHQgIQABIcChByZXBlYXRlZF9maXhlZDY0GAggAygGQgIQABIdChFyZXBlYXRlZF9zZml4ZWQzMhgJIAMoD0ICEAASHQoRcmVwZWF0ZWRfc2ZpeGVkNjQYCiADKBBCAhAAEhoKDnJlcGVhdGVkX2Zsb2F0GAsgAygCQgIQABIbCg9yZXBlYXRlZF9kb3VibGUYDCADKAFCAhAAEhkKDXJlcGVhdGVkX2Jvb2wYDSADKAhCAhAAEkoKFHJlcGVhdGVkX25lc3RlZF9lbnVtGA4gAygOMigucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRFbnVtQgIQACJ4ChJOZXN0ZWRUZXN0QWxsVHlwZXMSMgoFY2hpbGQYASABKAsyIy5wcm90bzNfdW5pdHRlc3QuTmVzdGVkVGVzdEFsbFR5cGVzEi4KB3BheWxvYWQYAiABKAsyHS5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzIhsKDkZvcmVpZ25NZXNzYWdlEgkKAWMYASABKAUiEgoQVGVzdEVtcHR5TWVzc2FnZSIpChRUZXN0TWVzc2FnZVdpdGhEdW1teRIRCgVkdW1teRj/////ASABKAgihQEKClRlc3RPbmVvZjISOgoIZm9vX2VudW0YBiABKA4yJi5wcm90bzNfdW5pdHRlc3QuVGVzdE9uZW9mMi5OZXN0ZWRFbnVtSAAiNAoKTmVzdGVkRW51bRILCgdVTktOT1dOEAASBwoDRk9PEAESBwoDQkFSEAISBwoDQkFaEANCBQoDZm9vKlIKC0ZvcmVpZ25FbnVtEhAKDEZPUkVJR05fWkVSTxAAEg8KC0ZPUkVJR05fRk9PEAQSDwoLRk9SRUlHTl9CQVIQBRIPCgtGT1JFSUdOX0JBWhAGQgJIAWIGcHJvdG8z", [file_google_protobuf_unittest_import]);

/**
 * This proto includes every type of field in both singular and repeated
 * forms.
 *
 * @generated from message proto3_unittest.TestAllTypes
 */
export type TestAllTypes = Message<"proto3_unittest.TestAllTypes"> & {
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
   * @generated from field: protobuf_unittest_import.ImportMessage optional_import_message = 20;
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
   * @generated from field: protobuf_unittest_import.PublicImportMessage optional_public_import_message = 26;
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
   * @generated from field: repeated proto3_unittest.TestAllTypes.NestedMessage repeated_nested_message = 48;
   */
  repeatedNestedMessage: TestAllTypes_NestedMessage[];

  /**
   * @generated from field: repeated proto3_unittest.ForeignMessage repeated_foreign_message = 49;
   */
  repeatedForeignMessage: ForeignMessage[];

  /**
   * @generated from field: repeated protobuf_unittest_import.ImportMessage repeated_import_message = 50;
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
export const TestAllTypesSchema: GenDescMessage<TestAllTypes> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 0);

/**
 * @generated from message proto3_unittest.TestAllTypes.NestedMessage
 */
export type TestAllTypes_NestedMessage = Message<"proto3_unittest.TestAllTypes.NestedMessage"> & {
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
export const TestAllTypes_NestedMessageSchema: GenDescMessage<TestAllTypes_NestedMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 0, 0);

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
export const TestAllTypes_NestedEnumSchema: GenDescEnum<TestAllTypes_NestedEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3, 0, 0);

/**
 * @generated from message proto3_unittest.TestPackedTypes
 */
export type TestPackedTypes = Message<"proto3_unittest.TestPackedTypes"> & {
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
export const TestPackedTypesSchema: GenDescMessage<TestPackedTypes> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 1);

/**
 * Explicitly set packed to false
 *
 * @generated from message proto3_unittest.TestUnpackedTypes
 */
export type TestUnpackedTypes = Message<"proto3_unittest.TestUnpackedTypes"> & {
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
export const TestUnpackedTypesSchema: GenDescMessage<TestUnpackedTypes> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 2);

/**
 * This proto includes a recursively nested message.
 *
 * @generated from message proto3_unittest.NestedTestAllTypes
 */
export type NestedTestAllTypes = Message<"proto3_unittest.NestedTestAllTypes"> & {
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
export const NestedTestAllTypesSchema: GenDescMessage<NestedTestAllTypes> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 3);

/**
 * Define these after TestAllTypes to make sure the compiler can handle
 * that.
 *
 * @generated from message proto3_unittest.ForeignMessage
 */
export type ForeignMessage = Message<"proto3_unittest.ForeignMessage"> & {
  /**
   * @generated from field: int32 c = 1;
   */
  c: number;
};

/**
 * Describes the message proto3_unittest.ForeignMessage.
 * Use `create(ForeignMessageSchema)` to create a new message.
 */
export const ForeignMessageSchema: GenDescMessage<ForeignMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 4);

/**
 * TestEmptyMessage is used to test behavior of unknown fields.
 *
 * @generated from message proto3_unittest.TestEmptyMessage
 */
export type TestEmptyMessage = Message<"proto3_unittest.TestEmptyMessage"> & {
};

/**
 * Describes the message proto3_unittest.TestEmptyMessage.
 * Use `create(TestEmptyMessageSchema)` to create a new message.
 */
export const TestEmptyMessageSchema: GenDescMessage<TestEmptyMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 5);

/**
 * TestMessageWithDummy is also used to test behavior of unknown fields.
 *
 * @generated from message proto3_unittest.TestMessageWithDummy
 */
export type TestMessageWithDummy = Message<"proto3_unittest.TestMessageWithDummy"> & {
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
export const TestMessageWithDummySchema: GenDescMessage<TestMessageWithDummy> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 6);

/**
 * Same layout as TestOneof2 in unittest.proto to test unknown enum value
 * parsing behavior in oneof.
 *
 * @generated from message proto3_unittest.TestOneof2
 */
export type TestOneof2 = Message<"proto3_unittest.TestOneof2"> & {
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
export const TestOneof2Schema: GenDescMessage<TestOneof2> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 7);

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
export const TestOneof2_NestedEnumSchema: GenDescEnum<TestOneof2_NestedEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3, 7, 0);

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
}

/**
 * Describes the enum proto3_unittest.ForeignEnum.
 */
export const ForeignEnumSchema: GenDescEnum<ForeignEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3, 0);

