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

// @generated by protoc-gen-es-next v1.7.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/proto3.proto (package spec, syntax proto3)
/* eslint-disable */

import type { DescFile } from "@bufbuild/protobuf";
import type { TypedDescEnum, TypedDescMessage } from "@bufbuild/protobuf/next/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/next/codegenv1";
import type { Message, UInt32Value } from "@bufbuild/protobuf/next";
import { fileDesc_google_protobuf_wrappers } from "@bufbuild/protobuf/next";

export const fileDesc_extra_proto3: DescFile = fileDesc("ChJleHRyYS9wcm90bzMucHJvdG8SBHNwZWMirRoKDVByb3RvM01lc3NhZ2USHQoVc2luZ3VsYXJfc3RyaW5nX2ZpZWxkGAEgASgJEhwKFHNpbmd1bGFyX2J5dGVzX2ZpZWxkGAIgASgMEhwKFHNpbmd1bGFyX2ludDMyX2ZpZWxkGAMgASgFEhwKFHNpbmd1bGFyX2ludDY0X2ZpZWxkGAQgASgDEioKHnNpbmd1bGFyX2ludDY0X2pzX251bWJlcl9maWVsZBhnIAEoA0ICMAISKgoec2luZ3VsYXJfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGYgASgDQgIwARIcChRzaW5ndWxhcl9mbG9hdF9maWVsZBgFIAEoAhIbChNzaW5ndWxhcl9ib29sX2ZpZWxkGAYgASgIEi0KE3Npbmd1bGFyX2VudW1fZmllbGQYByABKA4yEC5zcGVjLlByb3RvM0VudW0SMwoWc2luZ3VsYXJfbWVzc2FnZV9maWVsZBgIIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZRJECh1zaW5ndWxhcl93cmFwcGVkX3VpbnQzMl9maWVsZBjTASABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSIgoVb3B0aW9uYWxfc3RyaW5nX2ZpZWxkGAkgASgJSAGIAQESIQoUb3B0aW9uYWxfYnl0ZXNfZmllbGQYCiABKAxIAogBARIhChRvcHRpb25hbF9pbnQzMl9maWVsZBgLIAEoBUgDiAEBEiEKFG9wdGlvbmFsX2ludDY0X2ZpZWxkGAwgASgDSASIAQESLwoeb3B0aW9uYWxfaW50NjRfanNfbnVtYmVyX2ZpZWxkGGogASgDQgIwAkgFiAEBEi8KHm9wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZBhpIAEoA0ICMAFIBogBARIhChRvcHRpb25hbF9mbG9hdF9maWVsZBgNIAEoAkgHiAEBEiAKE29wdGlvbmFsX2Jvb2xfZmllbGQYDiABKAhICIgBARIyChNvcHRpb25hbF9lbnVtX2ZpZWxkGA8gASgOMhAuc3BlYy5Qcm90bzNFbnVtSAmIAQESOAoWb3B0aW9uYWxfbWVzc2FnZV9maWVsZBgQIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZUgKiAEBEkkKHW9wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkGNQBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZUgLiAEBEh0KFXJlcGVhdGVkX3N0cmluZ19maWVsZBgRIAMoCRIcChRyZXBlYXRlZF9ieXRlc19maWVsZBgSIAMoDBIcChRyZXBlYXRlZF9pbnQzMl9maWVsZBgTIAMoBRIcChRyZXBlYXRlZF9pbnQ2NF9maWVsZBgUIAMoAxIqCh5yZXBlYXRlZF9pbnQ2NF9qc19udW1iZXJfZmllbGQYbSADKANCAjACEioKHnJlcGVhdGVkX2ludDY0X2pzX3N0cmluZ19maWVsZBhsIAMoA0ICMAESHAoUcmVwZWF0ZWRfZmxvYXRfZmllbGQYFSADKAISGwoTcmVwZWF0ZWRfYm9vbF9maWVsZBgWIAMoCBItChNyZXBlYXRlZF9lbnVtX2ZpZWxkGBcgAygOMhAuc3BlYy5Qcm90bzNFbnVtEjMKFnJlcGVhdGVkX21lc3NhZ2VfZmllbGQYGCADKAsyEy5zcGVjLlByb3RvM01lc3NhZ2USRAodcmVwZWF0ZWRfd3JhcHBlZF91aW50MzJfZmllbGQY1QEgAygLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEh8KE3BhY2tlZF9kb3VibGVfZmllbGQYGSADKAFCAhABEh8KE3BhY2tlZF91aW50MzJfZmllbGQYGiADKA1CAhABEh8KE3BhY2tlZF91aW50NjRfZmllbGQYGyADKARCAhABEiEKFXVucGFja2VkX2RvdWJsZV9maWVsZBgcIAMoAUICEAASIQoVdW5wYWNrZWRfdWludDMyX2ZpZWxkGB0gAygNQgIQABIhChV1bnBhY2tlZF91aW50NjRfZmllbGQYHiADKARCAhAAEhwKEm9uZW9mX3N0cmluZ19maWVsZBgfIAEoCUgAEhsKEW9uZW9mX2J5dGVzX2ZpZWxkGCAgASgMSAASGwoRb25lb2ZfaW50MzJfZmllbGQYISABKAVIABIbChFvbmVvZl9pbnQ2NF9maWVsZBgiIAEoA0gAEikKG29uZW9mX2ludDY0X2pzX251bWJlcl9maWVsZBhwIAEoA0ICMAJIABIpChtvbmVvZl9pbnQ2NF9qc19zdHJpbmdfZmllbGQYbyABKANCAjABSAASGwoRb25lb2ZfZmxvYXRfZmllbGQYIyABKAJIABIaChBvbmVvZl9ib29sX2ZpZWxkGCQgASgISAASLAoQb25lb2ZfZW51bV9maWVsZBglIAEoDjIQLnNwZWMuUHJvdG8zRW51bUgAEjIKE29uZW9mX21lc3NhZ2VfZmllbGQYJiABKAsyEy5zcGVjLlByb3RvM01lc3NhZ2VIABJDChpvbmVvZl93cmFwcGVkX3VpbnQzMl9maWVsZBjMASABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWVIABJOChdtYXBfc3RyaW5nX3N0cmluZ19maWVsZBgnIAMoCzItLnNwZWMuUHJvdG8zTWVzc2FnZS5NYXBTdHJpbmdTdHJpbmdGaWVsZEVudHJ5EkoKFW1hcF9pbnQzMl9pbnQzMl9maWVsZBgoIAMoCzIrLnNwZWMuUHJvdG8zTWVzc2FnZS5NYXBJbnQzMkludDMyRmllbGRFbnRyeRJGChNtYXBfYm9vbF9ib29sX2ZpZWxkGCkgAygLMikuc3BlYy5Qcm90bzNNZXNzYWdlLk1hcEJvb2xCb29sRmllbGRFbnRyeRJKChVtYXBfaW50NjRfaW50NjRfZmllbGQYKiADKAsyKy5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50NjRJbnQ2NEZpZWxkRW50cnkSSAoUbWFwX2ludDMyX2VudW1fZmllbGQYKyADKAsyKi5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJFbnVtRmllbGRFbnRyeRJOChdtYXBfaW50MzJfbWVzc2FnZV9maWVsZBgsIAMoCzItLnNwZWMuUHJvdG8zTWVzc2FnZS5NYXBJbnQzMk1lc3NhZ2VGaWVsZEVudHJ5ElwKHm1hcF9pbnQzMl93cmFwcGVkX3VpbnQzMl9maWVsZBjNASADKAsyMy5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJXcmFwcGVkVWludDMyRmllbGRFbnRyeRo7ChlNYXBTdHJpbmdTdHJpbmdGaWVsZEVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEaOQoXTWFwSW50MzJJbnQzMkZpZWxkRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ARo3ChVNYXBCb29sQm9vbEZpZWxkRW50cnkSCwoDa2V5GAEgASgIEg0KBXZhbHVlGAIgASgIOgI4ARo5ChdNYXBJbnQ2NEludDY0RmllbGRFbnRyeRILCgNrZXkYASABKAMSDQoFdmFsdWUYAiABKAM6AjgBGkoKFk1hcEludDMyRW51bUZpZWxkRW50cnkSCwoDa2V5GAEgASgFEh8KBXZhbHVlGAIgASgOMhAuc3BlYy5Qcm90bzNFbnVtOgI4ARpQChlNYXBJbnQzMk1lc3NhZ2VGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIiCgV2YWx1ZRgCIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZToCOAEaXwofTWFwSW50MzJXcmFwcGVkVWludDMyRmllbGRFbnRyeRILCgNrZXkYASABKAUSKwoFdmFsdWUYAiABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWU6AjgBQggKBmVpdGhlckIYChZfb3B0aW9uYWxfc3RyaW5nX2ZpZWxkQhcKFV9vcHRpb25hbF9ieXRlc19maWVsZEIXChVfb3B0aW9uYWxfaW50MzJfZmllbGRCFwoVX29wdGlvbmFsX2ludDY0X2ZpZWxkQiEKH19vcHRpb25hbF9pbnQ2NF9qc19udW1iZXJfZmllbGRCIQofX29wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZEIXChVfb3B0aW9uYWxfZmxvYXRfZmllbGRCFgoUX29wdGlvbmFsX2Jvb2xfZmllbGRCFgoUX29wdGlvbmFsX2VudW1fZmllbGRCGQoXX29wdGlvbmFsX21lc3NhZ2VfZmllbGRCIAoeX29wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkIvMBChVQcm90bzNSZXBlYXRlZE1lc3NhZ2USFAoMc3RyaW5nX2ZpZWxkGAEgAygJEhMKC2J5dGVzX2ZpZWxkGAIgAygMEhMKC2ludDMyX2ZpZWxkGAMgAygFEhMKC2ludDY0X2ZpZWxkGAQgAygDEhMKC2Zsb2F0X2ZpZWxkGAUgAygCEhIKCmJvb2xfZmllbGQYBiADKAgSJAoKZW51bV9maWVsZBgHIAMoDjIQLnNwZWMuUHJvdG8zRW51bRIyCg1tZXNzYWdlX2ZpZWxkGAggAygLMhsuc3BlYy5Qcm90bzNPcHRpb25hbE1lc3NhZ2U6AhgBInwKE1Byb3RvM1BhY2tlZE1lc3NhZ2USHwoTcGFja2VkX2RvdWJsZV9maWVsZBhlIAMoAUICEAESHwoTcGFja2VkX3VpbnQzMl9maWVsZBhmIAMoDUICEAESHwoTcGFja2VkX3VpbnQ2NF9maWVsZBhnIAMoBEICEAE6AhgBIocBChVQcm90bzNVbnBhY2tlZE1lc3NhZ2USIgoVdW5wYWNrZWRfZG91YmxlX2ZpZWxkGMkBIAMoAUICEAASIgoVdW5wYWNrZWRfdWludDMyX2ZpZWxkGMoBIAMoDUICEAASIgoVdW5wYWNrZWRfdWludDY0X2ZpZWxkGMsBIAMoBEICEAA6AhgBImYKHlByb3RvM1Vuc3BlY2lmaWVkUGFja2VkTWVzc2FnZRIUCgxkb3VibGVfZmllbGQYASADKAESFAoMdWludDMyX2ZpZWxkGAIgAygNEhQKDHVpbnQ2NF9maWVsZBgDIAMoBDoCGAEi9QEKF1Byb3RvM1VubGFiZWxsZWRNZXNzYWdlEhQKDHN0cmluZ19maWVsZBgBIAEoCRITCgtieXRlc19maWVsZBgCIAEoDBITCgtpbnQzMl9maWVsZBgDIAEoBRITCgtpbnQ2NF9maWVsZBgEIAEoAxITCgtmbG9hdF9maWVsZBgFIAEoAhISCgpib29sX2ZpZWxkGAYgASgIEiQKCmVudW1fZmllbGQYByABKA4yEC5zcGVjLlByb3RvM0VudW0SMgoNbWVzc2FnZV9maWVsZBgIIAEoCzIbLnNwZWMuUHJvdG8zT3B0aW9uYWxNZXNzYWdlOgIYASKcAwoVUHJvdG8zT3B0aW9uYWxNZXNzYWdlEhkKDHN0cmluZ19maWVsZBgBIAEoCUgAiAEBEhgKC2J5dGVzX2ZpZWxkGAIgASgMSAGIAQESGAoLaW50MzJfZmllbGQYAyABKAVIAogBARIYCgtpbnQ2NF9maWVsZBgEIAEoA0gDiAEBEhgKC2Zsb2F0X2ZpZWxkGAUgASgCSASIAQESFwoKYm9vbF9maWVsZBgGIAEoCEgFiAEBEikKCmVudW1fZmllbGQYByABKA4yEC5zcGVjLlByb3RvM0VudW1IBogBARI3Cg1tZXNzYWdlX2ZpZWxkGAggASgLMhsuc3BlYy5Qcm90bzNPcHRpb25hbE1lc3NhZ2VIB4gBAToCGAFCDwoNX3N0cmluZ19maWVsZEIOCgxfYnl0ZXNfZmllbGRCDgoMX2ludDMyX2ZpZWxkQg4KDF9pbnQ2NF9maWVsZEIOCgxfZmxvYXRfZmllbGRCDQoLX2Jvb2xfZmllbGRCDQoLX2VudW1fZmllbGRCEAoOX21lc3NhZ2VfZmllbGQqUgoKUHJvdG8zRW51bRIbChdQUk9UTzNfRU5VTV9VTlNQRUNJRklFRBAAEhMKD1BST1RPM19FTlVNX1lFUxABEhIKDlBST1RPM19FTlVNX05PEAJCIVofZ2l0aHViLmNvbS9idWZidWlsZC9wcm90b2J1Zi1lc2IGcHJvdG8z", [fileDesc_google_protobuf_wrappers]);

/**
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
};

// Describes the message spec.Proto3Message.
// Use `create(Proto3MessageDesc)` to create a new Proto3Message.
export const Proto3MessageDesc: TypedDescMessage<Proto3Message> = messageDesc(fileDesc_extra_proto3, 0);

/**
 * @generated from message spec.Proto3RepeatedMessage
 * @deprecated
 */
export type Proto3RepeatedMessage = Message<"spec.Proto3RepeatedMessage"> & {
  /**
   * @generated from field: repeated string string_field = 1;
   */
  stringField: string[];

  /**
   * @generated from field: repeated bytes bytes_field = 2;
   */
  bytesField: Uint8Array[];

  /**
   * @generated from field: repeated int32 int32_field = 3;
   */
  int32Field: number[];

  /**
   * @generated from field: repeated int64 int64_field = 4;
   */
  int64Field: bigint[];

  /**
   * @generated from field: repeated float float_field = 5;
   */
  floatField: number[];

  /**
   * @generated from field: repeated bool bool_field = 6;
   */
  boolField: boolean[];

  /**
   * @generated from field: repeated spec.Proto3Enum enum_field = 7;
   */
  enumField: Proto3Enum[];

  /**
   * @generated from field: repeated spec.Proto3OptionalMessage message_field = 8;
   */
  messageField: Proto3OptionalMessage[];
};

// Describes the message spec.Proto3RepeatedMessage.
// Use `create(Proto3RepeatedMessageDesc)` to create a new Proto3RepeatedMessage.
export const Proto3RepeatedMessageDesc: TypedDescMessage<Proto3RepeatedMessage> = messageDesc(fileDesc_extra_proto3, 1);

/**
 * @generated from message spec.Proto3PackedMessage
 * @deprecated
 */
export type Proto3PackedMessage = Message<"spec.Proto3PackedMessage"> & {
  /**
   * @generated from field: repeated double packed_double_field = 101 [packed = true];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 102 [packed = true];
   */
  packedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 103 [packed = true];
   */
  packedUint64Field: bigint[];
};

// Describes the message spec.Proto3PackedMessage.
// Use `create(Proto3PackedMessageDesc)` to create a new Proto3PackedMessage.
export const Proto3PackedMessageDesc: TypedDescMessage<Proto3PackedMessage> = messageDesc(fileDesc_extra_proto3, 2);

/**
 * @generated from message spec.Proto3UnpackedMessage
 * @deprecated
 */
export type Proto3UnpackedMessage = Message<"spec.Proto3UnpackedMessage"> & {
  /**
   * @generated from field: repeated double unpacked_double_field = 201 [packed = false];
   */
  unpackedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 202 [packed = false];
   */
  unpackedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 203 [packed = false];
   */
  unpackedUint64Field: bigint[];
};

// Describes the message spec.Proto3UnpackedMessage.
// Use `create(Proto3UnpackedMessageDesc)` to create a new Proto3UnpackedMessage.
export const Proto3UnpackedMessageDesc: TypedDescMessage<Proto3UnpackedMessage> = messageDesc(fileDesc_extra_proto3, 3);

/**
 * @generated from message spec.Proto3UnspecifiedPackedMessage
 * @deprecated
 */
export type Proto3UnspecifiedPackedMessage = Message<"spec.Proto3UnspecifiedPackedMessage"> & {
  /**
   * @generated from field: repeated double double_field = 1;
   */
  doubleField: number[];

  /**
   * @generated from field: repeated uint32 uint32_field = 2;
   */
  uint32Field: number[];

  /**
   * @generated from field: repeated uint64 uint64_field = 3;
   */
  uint64Field: bigint[];
};

// Describes the message spec.Proto3UnspecifiedPackedMessage.
// Use `create(Proto3UnspecifiedPackedMessageDesc)` to create a new Proto3UnspecifiedPackedMessage.
export const Proto3UnspecifiedPackedMessageDesc: TypedDescMessage<Proto3UnspecifiedPackedMessage> = messageDesc(fileDesc_extra_proto3, 4);

/**
 * @generated from message spec.Proto3UnlabelledMessage
 * @deprecated
 */
export type Proto3UnlabelledMessage = Message<"spec.Proto3UnlabelledMessage"> & {
  /**
   * @generated from field: string string_field = 1;
   */
  stringField: string;

  /**
   * @generated from field: bytes bytes_field = 2;
   */
  bytesField: Uint8Array;

  /**
   * @generated from field: int32 int32_field = 3;
   */
  int32Field: number;

  /**
   * @generated from field: int64 int64_field = 4;
   */
  int64Field: bigint;

  /**
   * @generated from field: float float_field = 5;
   */
  floatField: number;

  /**
   * @generated from field: bool bool_field = 6;
   */
  boolField: boolean;

  /**
   * @generated from field: spec.Proto3Enum enum_field = 7;
   */
  enumField: Proto3Enum;

  /**
   * @generated from field: spec.Proto3OptionalMessage message_field = 8;
   */
  messageField?: Proto3OptionalMessage;
};

// Describes the message spec.Proto3UnlabelledMessage.
// Use `create(Proto3UnlabelledMessageDesc)` to create a new Proto3UnlabelledMessage.
export const Proto3UnlabelledMessageDesc: TypedDescMessage<Proto3UnlabelledMessage> = messageDesc(fileDesc_extra_proto3, 5);

/**
 * @generated from message spec.Proto3OptionalMessage
 * @deprecated
 */
export type Proto3OptionalMessage = Message<"spec.Proto3OptionalMessage"> & {
  /**
   * @generated from field: optional string string_field = 1;
   */
  stringField?: string;

  /**
   * @generated from field: optional bytes bytes_field = 2;
   */
  bytesField?: Uint8Array;

  /**
   * @generated from field: optional int32 int32_field = 3;
   */
  int32Field?: number;

  /**
   * @generated from field: optional int64 int64_field = 4;
   */
  int64Field?: bigint;

  /**
   * @generated from field: optional float float_field = 5;
   */
  floatField?: number;

  /**
   * @generated from field: optional bool bool_field = 6;
   */
  boolField?: boolean;

  /**
   * @generated from field: optional spec.Proto3Enum enum_field = 7;
   */
  enumField?: Proto3Enum;

  /**
   * @generated from field: optional spec.Proto3OptionalMessage message_field = 8;
   */
  messageField?: Proto3OptionalMessage;
};

// Describes the message spec.Proto3OptionalMessage.
// Use `create(Proto3OptionalMessageDesc)` to create a new Proto3OptionalMessage.
export const Proto3OptionalMessageDesc: TypedDescMessage<Proto3OptionalMessage> = messageDesc(fileDesc_extra_proto3, 6);

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

// Describes the enum spec.Proto3Enum.
export const Proto3EnumDesc: TypedDescEnum<Proto3Enum> = enumDesc(fileDesc_extra_proto3, 0);

