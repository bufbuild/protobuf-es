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

// @generated by protoc-gen-es v2.2.2 with parameter "target=ts,import_extension=js"
// @generated from file extra/proto3.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { UInt32Value } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_struct, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/proto3.proto.
 */
export const file_extra_proto3: GenFile = /*@__PURE__*/
  fileDesc("ChJleHRyYS9wcm90bzMucHJvdG8SBHNwZWMi0x0KDVByb3RvM01lc3NhZ2USHQoVc2luZ3VsYXJfc3RyaW5nX2ZpZWxkGAEgASgJEhwKFHNpbmd1bGFyX2J5dGVzX2ZpZWxkGAIgASgMEhwKFHNpbmd1bGFyX2ludDMyX2ZpZWxkGAMgASgFEhwKFHNpbmd1bGFyX2ludDY0X2ZpZWxkGAQgASgDEioKHnNpbmd1bGFyX2ludDY0X2pzX251bWJlcl9maWVsZBhnIAEoA0ICMAISKgoec2luZ3VsYXJfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGYgASgDQgIwARIcChRzaW5ndWxhcl9mbG9hdF9maWVsZBgFIAEoAhIbChNzaW5ndWxhcl9ib29sX2ZpZWxkGAYgASgIEi0KE3Npbmd1bGFyX2VudW1fZmllbGQYByABKA4yEC5zcGVjLlByb3RvM0VudW0SMwoWc2luZ3VsYXJfbWVzc2FnZV9maWVsZBgIIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZRJECh1zaW5ndWxhcl93cmFwcGVkX3VpbnQzMl9maWVsZBjTASABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSNwoVc2luZ3VsYXJfc3RydWN0X2ZpZWxkGNYBIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSIgoVb3B0aW9uYWxfc3RyaW5nX2ZpZWxkGAkgASgJSAGIAQESIQoUb3B0aW9uYWxfYnl0ZXNfZmllbGQYCiABKAxIAogBARIhChRvcHRpb25hbF9pbnQzMl9maWVsZBgLIAEoBUgDiAEBEiEKFG9wdGlvbmFsX2ludDY0X2ZpZWxkGAwgASgDSASIAQESLwoeb3B0aW9uYWxfaW50NjRfanNfbnVtYmVyX2ZpZWxkGGogASgDQgIwAkgFiAEBEi8KHm9wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZBhpIAEoA0ICMAFIBogBARIhChRvcHRpb25hbF9mbG9hdF9maWVsZBgNIAEoAkgHiAEBEiAKE29wdGlvbmFsX2Jvb2xfZmllbGQYDiABKAhICIgBARIyChNvcHRpb25hbF9lbnVtX2ZpZWxkGA8gASgOMhAuc3BlYy5Qcm90bzNFbnVtSAmIAQESOAoWb3B0aW9uYWxfbWVzc2FnZV9maWVsZBgQIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZUgKiAEBEkkKHW9wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkGNQBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZUgLiAEBEjwKFW9wdGlvbmFsX3N0cnVjdF9maWVsZBjXASABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0SAyIAQESHQoVcmVwZWF0ZWRfc3RyaW5nX2ZpZWxkGBEgAygJEhwKFHJlcGVhdGVkX2J5dGVzX2ZpZWxkGBIgAygMEhwKFHJlcGVhdGVkX2ludDMyX2ZpZWxkGBMgAygFEhwKFHJlcGVhdGVkX2ludDY0X2ZpZWxkGBQgAygDEioKHnJlcGVhdGVkX2ludDY0X2pzX251bWJlcl9maWVsZBhtIAMoA0ICMAISKgoecmVwZWF0ZWRfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGwgAygDQgIwARIcChRyZXBlYXRlZF9mbG9hdF9maWVsZBgVIAMoAhIbChNyZXBlYXRlZF9ib29sX2ZpZWxkGBYgAygIEi0KE3JlcGVhdGVkX2VudW1fZmllbGQYFyADKA4yEC5zcGVjLlByb3RvM0VudW0SMwoWcmVwZWF0ZWRfbWVzc2FnZV9maWVsZBgYIAMoCzITLnNwZWMuUHJvdG8zTWVzc2FnZRJECh1yZXBlYXRlZF93cmFwcGVkX3VpbnQzMl9maWVsZBjVASADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSNwoVcmVwZWF0ZWRfc3RydWN0X2ZpZWxkGNgBIAMoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSHwoTcGFja2VkX2RvdWJsZV9maWVsZBgZIAMoAUICEAESHwoTcGFja2VkX3VpbnQzMl9maWVsZBgaIAMoDUICEAESHwoTcGFja2VkX3VpbnQ2NF9maWVsZBgbIAMoBEICEAESIQoVdW5wYWNrZWRfZG91YmxlX2ZpZWxkGBwgAygBQgIQABIhChV1bnBhY2tlZF91aW50MzJfZmllbGQYHSADKA1CAhAAEiEKFXVucGFja2VkX3VpbnQ2NF9maWVsZBgeIAMoBEICEAASHAoSb25lb2Zfc3RyaW5nX2ZpZWxkGB8gASgJSAASGwoRb25lb2ZfYnl0ZXNfZmllbGQYICABKAxIABIbChFvbmVvZl9pbnQzMl9maWVsZBghIAEoBUgAEhsKEW9uZW9mX2ludDY0X2ZpZWxkGCIgASgDSAASKQobb25lb2ZfaW50NjRfanNfbnVtYmVyX2ZpZWxkGHAgASgDQgIwAkgAEikKG29uZW9mX2ludDY0X2pzX3N0cmluZ19maWVsZBhvIAEoA0ICMAFIABIbChFvbmVvZl9mbG9hdF9maWVsZBgjIAEoAkgAEhoKEG9uZW9mX2Jvb2xfZmllbGQYJCABKAhIABIsChBvbmVvZl9lbnVtX2ZpZWxkGCUgASgOMhAuc3BlYy5Qcm90bzNFbnVtSAASMgoTb25lb2ZfbWVzc2FnZV9maWVsZBgmIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZUgAEkMKGm9uZW9mX3dyYXBwZWRfdWludDMyX2ZpZWxkGMwBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZUgAEjYKEm9uZW9mX3N0cnVjdF9maWVsZBjZASABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0SAASTgoXbWFwX3N0cmluZ19zdHJpbmdfZmllbGQYJyADKAsyLS5zcGVjLlByb3RvM01lc3NhZ2UuTWFwU3RyaW5nU3RyaW5nRmllbGRFbnRyeRJKChVtYXBfaW50MzJfaW50MzJfZmllbGQYKCADKAsyKy5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJJbnQzMkZpZWxkRW50cnkSRgoTbWFwX2Jvb2xfYm9vbF9maWVsZBgpIAMoCzIpLnNwZWMuUHJvdG8zTWVzc2FnZS5NYXBCb29sQm9vbEZpZWxkRW50cnkSSgoVbWFwX2ludDY0X2ludDY0X2ZpZWxkGCogAygLMisuc3BlYy5Qcm90bzNNZXNzYWdlLk1hcEludDY0SW50NjRGaWVsZEVudHJ5EkgKFG1hcF9pbnQzMl9lbnVtX2ZpZWxkGCsgAygLMiouc3BlYy5Qcm90bzNNZXNzYWdlLk1hcEludDMyRW51bUZpZWxkRW50cnkSTgoXbWFwX2ludDMyX21lc3NhZ2VfZmllbGQYLCADKAsyLS5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJNZXNzYWdlRmllbGRFbnRyeRJcCh5tYXBfaW50MzJfd3JhcHBlZF91aW50MzJfZmllbGQYzQEgAygLMjMuc3BlYy5Qcm90bzNNZXNzYWdlLk1hcEludDMyV3JhcHBlZFVpbnQzMkZpZWxkRW50cnkSTQoWbWFwX2ludDMyX3N0cnVjdF9maWVsZBjaASADKAsyLC5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJTdHJ1Y3RGaWVsZEVudHJ5GjsKGU1hcFN0cmluZ1N0cmluZ0ZpZWxkRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARo5ChdNYXBJbnQzMkludDMyRmllbGRFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAU6AjgBGjcKFU1hcEJvb2xCb29sRmllbGRFbnRyeRILCgNrZXkYASABKAgSDQoFdmFsdWUYAiABKAg6AjgBGjkKF01hcEludDY0SW50NjRGaWVsZEVudHJ5EgsKA2tleRgBIAEoAxINCgV2YWx1ZRgCIAEoAzoCOAEaSgoWTWFwSW50MzJFbnVtRmllbGRFbnRyeRILCgNrZXkYASABKAUSHwoFdmFsdWUYAiABKA4yEC5zcGVjLlByb3RvM0VudW06AjgBGlAKGU1hcEludDMyTWVzc2FnZUZpZWxkRW50cnkSCwoDa2V5GAEgASgFEiIKBXZhbHVlGAIgASgLMhMuc3BlYy5Qcm90bzNNZXNzYWdlOgI4ARpfCh9NYXBJbnQzMldyYXBwZWRVaW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIrCgV2YWx1ZRgCIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZToCOAEaUwoYTWFwSW50MzJTdHJ1Y3RGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRImCgV2YWx1ZRgCIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3Q6AjgBQggKBmVpdGhlckIYChZfb3B0aW9uYWxfc3RyaW5nX2ZpZWxkQhcKFV9vcHRpb25hbF9ieXRlc19maWVsZEIXChVfb3B0aW9uYWxfaW50MzJfZmllbGRCFwoVX29wdGlvbmFsX2ludDY0X2ZpZWxkQiEKH19vcHRpb25hbF9pbnQ2NF9qc19udW1iZXJfZmllbGRCIQofX29wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZEIXChVfb3B0aW9uYWxfZmxvYXRfZmllbGRCFgoUX29wdGlvbmFsX2Jvb2xfZmllbGRCFgoUX29wdGlvbmFsX2VudW1fZmllbGRCGQoXX29wdGlvbmFsX21lc3NhZ2VfZmllbGRCIAoeX29wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkQhgKFl9vcHRpb25hbF9zdHJ1Y3RfZmllbGQqUgoKUHJvdG8zRW51bRIbChdQUk9UTzNfRU5VTV9VTlNQRUNJRklFRBAAEhMKD1BST1RPM19FTlVNX1lFUxABEhIKDlBST1RPM19FTlVNX05PEAJCIVofZ2l0aHViLmNvbS9idWZidWlsZC9wcm90b2J1Zi1lc2IGcHJvdG8z", [file_google_protobuf_wrappers, file_google_protobuf_struct]);

/**
 * Note: We do not exhaust all field types
 *
 * @generated from message spec.Proto3Message
 */
export type Proto3Message = Message<"spec.Proto3Message"> & {
  /**
   * @generated from field: string singular_string_field = 1;
   */
  singularStringField: string;

  /**
   * @generated from field: bytes singular_bytes_field = 2;
   */
  singularBytesField: Uint8Array;

  /**
   * @generated from field: int32 singular_int32_field = 3;
   */
  singularInt32Field: number;

  /**
   * @generated from field: int64 singular_int64_field = 4;
   */
  singularInt64Field: bigint;

  /**
   * @generated from field: int64 singular_int64_js_number_field = 103 [jstype = JS_NUMBER];
   */
  singularInt64JsNumberField: bigint;

  /**
   * @generated from field: int64 singular_int64_js_string_field = 102 [jstype = JS_STRING];
   */
  singularInt64JsStringField: string;

  /**
   * @generated from field: float singular_float_field = 5;
   */
  singularFloatField: number;

  /**
   * @generated from field: bool singular_bool_field = 6;
   */
  singularBoolField: boolean;

  /**
   * @generated from field: spec.Proto3Enum singular_enum_field = 7;
   */
  singularEnumField: Proto3Enum;

  /**
   * @generated from field: spec.Proto3Message singular_message_field = 8;
   */
  singularMessageField?: Proto3Message;

  /**
   * @generated from field: google.protobuf.UInt32Value singular_wrapped_uint32_field = 211;
   */
  singularWrappedUint32Field?: number;

  /**
   * @generated from field: google.protobuf.Struct singular_struct_field = 214;
   */
  singularStructField?: JsonObject;

  /**
   * @generated from field: optional string optional_string_field = 9;
   */
  optionalStringField?: string;

  /**
   * @generated from field: optional bytes optional_bytes_field = 10;
   */
  optionalBytesField?: Uint8Array;

  /**
   * @generated from field: optional int32 optional_int32_field = 11;
   */
  optionalInt32Field?: number;

  /**
   * @generated from field: optional int64 optional_int64_field = 12;
   */
  optionalInt64Field?: bigint;

  /**
   * @generated from field: optional int64 optional_int64_js_number_field = 106 [jstype = JS_NUMBER];
   */
  optionalInt64JsNumberField?: bigint;

  /**
   * @generated from field: optional int64 optional_int64_js_string_field = 105 [jstype = JS_STRING];
   */
  optionalInt64JsStringField?: string;

  /**
   * @generated from field: optional float optional_float_field = 13;
   */
  optionalFloatField?: number;

  /**
   * @generated from field: optional bool optional_bool_field = 14;
   */
  optionalBoolField?: boolean;

  /**
   * @generated from field: optional spec.Proto3Enum optional_enum_field = 15;
   */
  optionalEnumField?: Proto3Enum;

  /**
   * @generated from field: optional spec.Proto3Message optional_message_field = 16;
   */
  optionalMessageField?: Proto3Message;

  /**
   * @generated from field: optional google.protobuf.UInt32Value optional_wrapped_uint32_field = 212;
   */
  optionalWrappedUint32Field?: number;

  /**
   * @generated from field: optional google.protobuf.Struct optional_struct_field = 215;
   */
  optionalStructField?: JsonObject;

  /**
   * @generated from field: repeated string repeated_string_field = 17;
   */
  repeatedStringField: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes_field = 18;
   */
  repeatedBytesField: Uint8Array[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 19;
   */
  repeatedInt32Field: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 20;
   */
  repeatedInt64Field: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_number_field = 109 [jstype = JS_NUMBER];
   */
  repeatedInt64JsNumberField: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_string_field = 108 [jstype = JS_STRING];
   */
  repeatedInt64JsStringField: string[];

  /**
   * @generated from field: repeated float repeated_float_field = 21;
   */
  repeatedFloatField: number[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 22;
   */
  repeatedBoolField: boolean[];

  /**
   * @generated from field: repeated spec.Proto3Enum repeated_enum_field = 23;
   */
  repeatedEnumField: Proto3Enum[];

  /**
   * @generated from field: repeated spec.Proto3Message repeated_message_field = 24;
   */
  repeatedMessageField: Proto3Message[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_wrapped_uint32_field = 213;
   */
  repeatedWrappedUint32Field: UInt32Value[];

  /**
   * @generated from field: repeated google.protobuf.Struct repeated_struct_field = 216;
   */
  repeatedStructField: JsonObject[];

  /**
   * @generated from field: repeated double packed_double_field = 25 [packed = true];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 26 [packed = true];
   */
  packedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 27 [packed = true];
   */
  packedUint64Field: bigint[];

  /**
   * @generated from field: repeated double unpacked_double_field = 28 [packed = false];
   */
  unpackedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 29 [packed = false];
   */
  unpackedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 30 [packed = false];
   */
  unpackedUint64Field: bigint[];

  /**
   * @generated from oneof spec.Proto3Message.either
   */
  either: {
    /**
     * @generated from field: string oneof_string_field = 31;
     */
    value: string;
    case: "oneofStringField";
  } | {
    /**
     * @generated from field: bytes oneof_bytes_field = 32;
     */
    value: Uint8Array;
    case: "oneofBytesField";
  } | {
    /**
     * @generated from field: int32 oneof_int32_field = 33;
     */
    value: number;
    case: "oneofInt32Field";
  } | {
    /**
     * @generated from field: int64 oneof_int64_field = 34;
     */
    value: bigint;
    case: "oneofInt64Field";
  } | {
    /**
     * @generated from field: int64 oneof_int64_js_number_field = 112 [jstype = JS_NUMBER];
     */
    value: bigint;
    case: "oneofInt64JsNumberField";
  } | {
    /**
     * @generated from field: int64 oneof_int64_js_string_field = 111 [jstype = JS_STRING];
     */
    value: string;
    case: "oneofInt64JsStringField";
  } | {
    /**
     * @generated from field: float oneof_float_field = 35;
     */
    value: number;
    case: "oneofFloatField";
  } | {
    /**
     * @generated from field: bool oneof_bool_field = 36;
     */
    value: boolean;
    case: "oneofBoolField";
  } | {
    /**
     * @generated from field: spec.Proto3Enum oneof_enum_field = 37;
     */
    value: Proto3Enum;
    case: "oneofEnumField";
  } | {
    /**
     * @generated from field: spec.Proto3Message oneof_message_field = 38;
     */
    value: Proto3Message;
    case: "oneofMessageField";
  } | {
    /**
     * @generated from field: google.protobuf.UInt32Value oneof_wrapped_uint32_field = 204;
     */
    value: UInt32Value;
    case: "oneofWrappedUint32Field";
  } | {
    /**
     * @generated from field: google.protobuf.Struct oneof_struct_field = 217;
     */
    value: JsonObject;
    case: "oneofStructField";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: map<string, string> map_string_string_field = 39;
   */
  mapStringStringField: { [key: string]: string };

  /**
   * @generated from field: map<int32, int32> map_int32_int32_field = 40;
   */
  mapInt32Int32Field: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool_field = 41;
   */
  mapBoolBoolField: { [key: string]: boolean };

  /**
   * @generated from field: map<int64, int64> map_int64_int64_field = 42;
   */
  mapInt64Int64Field: { [key: string]: bigint };

  /**
   * @generated from field: map<int32, spec.Proto3Enum> map_int32_enum_field = 43;
   */
  mapInt32EnumField: { [key: number]: Proto3Enum };

  /**
   * @generated from field: map<int32, spec.Proto3Message> map_int32_message_field = 44;
   */
  mapInt32MessageField: { [key: number]: Proto3Message };

  /**
   * @generated from field: map<int32, google.protobuf.UInt32Value> map_int32_wrapped_uint32_field = 205;
   */
  mapInt32WrappedUint32Field: { [key: number]: UInt32Value };

  /**
   * @generated from field: map<int32, google.protobuf.Struct> map_int32_struct_field = 218;
   */
  mapInt32StructField: { [key: number]: JsonObject };
};

/**
 * Describes the message spec.Proto3Message.
 * Use `create(Proto3MessageSchema)` to create a new message.
 */
export const Proto3MessageSchema: GenMessage<Proto3Message> = /*@__PURE__*/
  messageDesc(file_extra_proto3, 0);

/**
 * @generated from enum spec.Proto3Enum
 */
export enum Proto3Enum {
  /**
   * @generated from enum value: PROTO3_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PROTO3_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PROTO3_ENUM_NO = 2;
   */
  NO = 2,
}

/**
 * Describes the enum spec.Proto3Enum.
 */
export const Proto3EnumSchema: GenEnum<Proto3Enum> = /*@__PURE__*/
  enumDesc(file_extra_proto3, 0);

