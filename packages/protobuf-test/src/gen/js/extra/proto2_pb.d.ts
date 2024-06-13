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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { UInt32Value, UInt32ValueJson } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/proto2.proto.
 */
export declare const fileDesc_extra_proto2: GenDescFile;

/**
 * Note: We do not exhaust all field types
 *
 * @generated from message spec.Proto2Message
 */
export declare type Proto2Message = Message<"spec.Proto2Message"> & {
  /**
   * @generated from field: required string required_string_field = 1;
   */
  requiredStringField: string;

  /**
   * @generated from field: required bytes required_bytes_field = 2;
   */
  requiredBytesField: Uint8Array;

  /**
   * @generated from field: required int32 required_int32_field = 3;
   */
  requiredInt32Field: number;

  /**
   * @generated from field: required int64 required_int64_field = 4;
   */
  requiredInt64Field: bigint;

  /**
   * @generated from field: required int64 required_int64_js_number_field = 103 [jstype = JS_NUMBER];
   */
  requiredInt64JsNumberField: bigint;

  /**
   * @generated from field: required int64 required_int64_js_string_field = 102 [jstype = JS_STRING];
   */
  requiredInt64JsStringField: string;

  /**
   * @generated from field: required float required_float_field = 5;
   */
  requiredFloatField: number;

  /**
   * @generated from field: required bool required_bool_field = 6;
   */
  requiredBoolField: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_enum_field = 7;
   */
  requiredEnumField: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2Message required_message_field = 8;
   */
  requiredMessageField?: Proto2Message;

  /**
   * @generated from field: required spec.Proto2Message.RequiredGroup requiredgroup = 9;
   */
  requiredgroup?: Proto2Message_RequiredGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_wrapped_uint32_field = 201;
   */
  requiredWrappedUint32Field?: number;

  /**
   * @generated from field: required string required_default_string_field = 10 [default = "hello \" *\/ "];
   */
  requiredDefaultStringField: string;

  /**
   * @generated from field: required bytes required_default_bytes_field = 11 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  requiredDefaultBytesField: Uint8Array;

  /**
   * @generated from field: required int32 required_default_int32_field = 12 [default = 128];
   */
  requiredDefaultInt32Field: number;

  /**
   * @generated from field: required int64 required_default_int64_field = 13 [default = -256];
   */
  requiredDefaultInt64Field: bigint;

  /**
   * @generated from field: required int64 required_default_int64_js_number_field = 110 [default = -256, jstype = JS_NUMBER];
   */
  requiredDefaultInt64JsNumberField: bigint;

  /**
   * @generated from field: required int64 required_default_int64_js_string_field = 113 [default = -256, jstype = JS_STRING];
   */
  requiredDefaultInt64JsStringField: string;

  /**
   * @generated from field: required float required_default_float_field = 14 [default = -512.13];
   */
  requiredDefaultFloatField: number;

  /**
   * @generated from field: required bool required_default_bool_field = 15 [default = true];
   */
  requiredDefaultBoolField: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_default_enum_field = 16 [default = PROTO2_ENUM_YES];
   */
  requiredDefaultEnumField: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2Message required_default_message_field = 17;
   */
  requiredDefaultMessageField?: Proto2Message;

  /**
   * @generated from field: required spec.Proto2Message.RequiredDefaultGroup requireddefaultgroup = 18;
   */
  requireddefaultgroup?: Proto2Message_RequiredDefaultGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_default_wrapped_uint32_field = 202;
   */
  requiredDefaultWrappedUint32Field?: number;

  /**
   * @generated from field: optional string optional_string_field = 19;
   */
  optionalStringField: string;

  /**
   * @generated from field: optional bytes optional_bytes_field = 20;
   */
  optionalBytesField: Uint8Array;

  /**
   * @generated from field: optional int32 optional_int32_field = 21;
   */
  optionalInt32Field: number;

  /**
   * @generated from field: optional int64 optional_int64_field = 22;
   */
  optionalInt64Field: bigint;

  /**
   * @generated from field: optional int64 optional_int64_js_number_field = 106 [jstype = JS_NUMBER];
   */
  optionalInt64JsNumberField: bigint;

  /**
   * @generated from field: optional int64 optional_int64_js_string_field = 105 [jstype = JS_STRING];
   */
  optionalInt64JsStringField: string;

  /**
   * @generated from field: optional float optional_float_field = 23;
   */
  optionalFloatField: number;

  /**
   * @generated from field: optional bool optional_bool_field = 24;
   */
  optionalBoolField: boolean;

  /**
   * @generated from field: optional spec.Proto2Enum optional_enum_field = 25;
   */
  optionalEnumField: Proto2Enum;

  /**
   * @generated from field: optional spec.Proto2Message optional_message_field = 26;
   */
  optionalMessageField?: Proto2Message;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalGroup optionalgroup = 27;
   */
  optionalgroup?: Proto2Message_OptionalGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_wrapped_uint32_field = 207;
   */
  optionalWrappedUint32Field?: number;

  /**
   * @generated from field: required string optional_default_string_field = 28 [default = "hello \" *\/ "];
   */
  optionalDefaultStringField: string;

  /**
   * @generated from field: required bytes optional_default_bytes_field = 29 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  optionalDefaultBytesField: Uint8Array;

  /**
   * @generated from field: required int32 optional_default_int32_field = 30 [default = 128];
   */
  optionalDefaultInt32Field: number;

  /**
   * @generated from field: required int64 optional_default_int64_field = 31 [default = -256];
   */
  optionalDefaultInt64Field: bigint;

  /**
   * @generated from field: optional int64 optional_default_int64_js_number_field = 120 [default = -256, jstype = JS_NUMBER];
   */
  optionalDefaultInt64JsNumberField: bigint;

  /**
   * @generated from field: optional int64 optional_default_int64_js_string_field = 121 [default = -256, jstype = JS_STRING];
   */
  optionalDefaultInt64JsStringField: string;

  /**
   * @generated from field: required float optional_default_float_field = 32 [default = -512.13];
   */
  optionalDefaultFloatField: number;

  /**
   * @generated from field: required bool optional_default_bool_field = 33 [default = true];
   */
  optionalDefaultBoolField: boolean;

  /**
   * @generated from field: required spec.Proto2Enum optional_default_enum_field = 34 [default = PROTO2_ENUM_YES];
   */
  optionalDefaultEnumField: Proto2Enum;

  /**
   * @generated from field: optional spec.Proto2Message optional_default_message_field = 35;
   */
  optionalDefaultMessageField?: Proto2Message;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalDefaultGroup optionaldefaultgroup = 36;
   */
  optionaldefaultgroup?: Proto2Message_OptionalDefaultGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_default_wrapped_uint32_field = 203;
   */
  optionalDefaultWrappedUint32Field?: number;

  /**
   * @generated from field: repeated string repeated_string_field = 37;
   */
  repeatedStringField: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes_field = 38;
   */
  repeatedBytesField: Uint8Array[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 39;
   */
  repeatedInt32Field: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 40;
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
   * @generated from field: repeated float repeated_float_field = 41;
   */
  repeatedFloatField: number[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 42;
   */
  repeatedBoolField: boolean[];

  /**
   * @generated from field: repeated spec.Proto2Enum repeated_enum_field = 43;
   */
  repeatedEnumField: Proto2Enum[];

  /**
   * @generated from field: repeated spec.Proto2Message repeated_message_field = 44;
   */
  repeatedMessageField: Proto2Message[];

  /**
   * @generated from field: repeated spec.Proto2Message.RepeatedGroup repeatedgroup = 45;
   */
  repeatedgroup: Proto2Message_RepeatedGroup[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_wrapped_uint32_field = 204;
   */
  repeatedWrappedUint32Field: UInt32Value[];

  /**
   * @generated from field: repeated double packed_double_field = 46 [packed = true];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 47 [packed = true];
   */
  packedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 48 [packed = true];
   */
  packedUint64Field: bigint[];

  /**
   * @generated from field: repeated double unpacked_double_field = 49 [packed = false];
   */
  unpackedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 50 [packed = false];
   */
  unpackedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 51 [packed = false];
   */
  unpackedUint64Field: bigint[];

  /**
   * @generated from oneof spec.Proto2Message.either
   */
  either: {
    /**
     * @generated from field: string oneof_string_field = 52;
     */
    value: string;
    case: "oneofStringField";
  } | {
    /**
     * @generated from field: bytes oneof_bytes_field = 53;
     */
    value: Uint8Array;
    case: "oneofBytesField";
  } | {
    /**
     * @generated from field: int32 oneof_int32_field = 54;
     */
    value: number;
    case: "oneofInt32Field";
  } | {
    /**
     * @generated from field: int64 oneof_int64_field = 55;
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
     * @generated from field: float oneof_float_field = 56;
     */
    value: number;
    case: "oneofFloatField";
  } | {
    /**
     * @generated from field: bool oneof_bool_field = 57;
     */
    value: boolean;
    case: "oneofBoolField";
  } | {
    /**
     * @generated from field: spec.Proto2Enum oneof_enum_field = 58;
     */
    value: Proto2Enum;
    case: "oneofEnumField";
  } | {
    /**
     * @generated from field: spec.Proto2Message oneof_message_field = 59;
     */
    value: Proto2Message;
    case: "oneofMessageField";
  } | {
    /**
     * @generated from field: spec.Proto2Message.OneofGroup oneofgroup = 60;
     */
    value: Proto2Message_OneofGroup;
    case: "oneofgroup";
  } | {
    /**
     * @generated from field: google.protobuf.UInt32Value oneof_wrapped_uint32_field = 205;
     */
    value: UInt32Value;
    case: "oneofWrappedUint32Field";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: map<string, string> map_string_string_field = 70;
   */
  mapStringStringField: { [key: string]: string };

  /**
   * @generated from field: map<int32, int32> map_int32_int32_field = 71;
   */
  mapInt32Int32Field: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool_field = 72;
   */
  mapBoolBoolField: { [key: string]: boolean };

  /**
   * @generated from field: map<int64, int64> map_int64_int64_field = 73;
   */
  mapInt64Int64Field: { [key: string]: bigint };

  /**
   * @generated from field: map<int32, spec.Proto2EnumWithZero> map_int32_enum_field = 74;
   */
  mapInt32EnumField: { [key: number]: Proto2EnumWithZero };

  /**
   * @generated from field: map<int32, spec.Proto2Message> map_int32_message_field = 75;
   */
  mapInt32MessageField: { [key: number]: Proto2Message };

  /**
   * @generated from field: map<int32, google.protobuf.UInt32Value> map_int32_wrapped_uint32_field = 209;
   */
  mapInt32WrappedUint32Field: { [key: number]: UInt32Value };
};

/**
 * JSON type for the message spec.Proto2Message.
 */
export declare type Proto2MessageJson = {
  /**
   * @generated from field: required string required_string_field = 1;
   */
  requiredStringField?: string;

  /**
   * @generated from field: required bytes required_bytes_field = 2;
   */
  requiredBytesField?: string;

  /**
   * @generated from field: required int32 required_int32_field = 3;
   */
  requiredInt32Field?: number;

  /**
   * @generated from field: required int64 required_int64_field = 4;
   */
  requiredInt64Field?: string;

  /**
   * @generated from field: required int64 required_int64_js_number_field = 103 [jstype = JS_NUMBER];
   */
  requiredInt64JsNumberField?: string;

  /**
   * @generated from field: required int64 required_int64_js_string_field = 102 [jstype = JS_STRING];
   */
  requiredInt64JsStringField?: string;

  /**
   * @generated from field: required float required_float_field = 5;
   */
  requiredFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: required bool required_bool_field = 6;
   */
  requiredBoolField?: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_enum_field = 7;
   */
  requiredEnumField?: Proto2EnumJson;

  /**
   * @generated from field: required spec.Proto2Message required_message_field = 8;
   */
  requiredMessageField?: Proto2MessageJson;

  /**
   * @generated from field: required spec.Proto2Message.RequiredGroup requiredgroup = 9;
   */
  requiredgroup?: Proto2Message_RequiredGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_wrapped_uint32_field = 201;
   */
  requiredWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: required string required_default_string_field = 10 [default = "hello \" *\/ "];
   */
  requiredDefaultStringField?: string;

  /**
   * @generated from field: required bytes required_default_bytes_field = 11 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  requiredDefaultBytesField?: string;

  /**
   * @generated from field: required int32 required_default_int32_field = 12 [default = 128];
   */
  requiredDefaultInt32Field?: number;

  /**
   * @generated from field: required int64 required_default_int64_field = 13 [default = -256];
   */
  requiredDefaultInt64Field?: string;

  /**
   * @generated from field: required int64 required_default_int64_js_number_field = 110 [default = -256, jstype = JS_NUMBER];
   */
  requiredDefaultInt64JsNumberField?: string;

  /**
   * @generated from field: required int64 required_default_int64_js_string_field = 113 [default = -256, jstype = JS_STRING];
   */
  requiredDefaultInt64JsStringField?: string;

  /**
   * @generated from field: required float required_default_float_field = 14 [default = -512.13];
   */
  requiredDefaultFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: required bool required_default_bool_field = 15 [default = true];
   */
  requiredDefaultBoolField?: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_default_enum_field = 16 [default = PROTO2_ENUM_YES];
   */
  requiredDefaultEnumField?: Proto2EnumJson;

  /**
   * @generated from field: required spec.Proto2Message required_default_message_field = 17;
   */
  requiredDefaultMessageField?: Proto2MessageJson;

  /**
   * @generated from field: required spec.Proto2Message.RequiredDefaultGroup requireddefaultgroup = 18;
   */
  requireddefaultgroup?: Proto2Message_RequiredDefaultGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_default_wrapped_uint32_field = 202;
   */
  requiredDefaultWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: optional string optional_string_field = 19;
   */
  optionalStringField?: string;

  /**
   * @generated from field: optional bytes optional_bytes_field = 20;
   */
  optionalBytesField?: string;

  /**
   * @generated from field: optional int32 optional_int32_field = 21;
   */
  optionalInt32Field?: number;

  /**
   * @generated from field: optional int64 optional_int64_field = 22;
   */
  optionalInt64Field?: string;

  /**
   * @generated from field: optional int64 optional_int64_js_number_field = 106 [jstype = JS_NUMBER];
   */
  optionalInt64JsNumberField?: string;

  /**
   * @generated from field: optional int64 optional_int64_js_string_field = 105 [jstype = JS_STRING];
   */
  optionalInt64JsStringField?: string;

  /**
   * @generated from field: optional float optional_float_field = 23;
   */
  optionalFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: optional bool optional_bool_field = 24;
   */
  optionalBoolField?: boolean;

  /**
   * @generated from field: optional spec.Proto2Enum optional_enum_field = 25;
   */
  optionalEnumField?: Proto2EnumJson;

  /**
   * @generated from field: optional spec.Proto2Message optional_message_field = 26;
   */
  optionalMessageField?: Proto2MessageJson;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalGroup optionalgroup = 27;
   */
  optionalgroup?: Proto2Message_OptionalGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_wrapped_uint32_field = 207;
   */
  optionalWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: required string optional_default_string_field = 28 [default = "hello \" *\/ "];
   */
  optionalDefaultStringField?: string;

  /**
   * @generated from field: required bytes optional_default_bytes_field = 29 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  optionalDefaultBytesField?: string;

  /**
   * @generated from field: required int32 optional_default_int32_field = 30 [default = 128];
   */
  optionalDefaultInt32Field?: number;

  /**
   * @generated from field: required int64 optional_default_int64_field = 31 [default = -256];
   */
  optionalDefaultInt64Field?: string;

  /**
   * @generated from field: optional int64 optional_default_int64_js_number_field = 120 [default = -256, jstype = JS_NUMBER];
   */
  optionalDefaultInt64JsNumberField?: string;

  /**
   * @generated from field: optional int64 optional_default_int64_js_string_field = 121 [default = -256, jstype = JS_STRING];
   */
  optionalDefaultInt64JsStringField?: string;

  /**
   * @generated from field: required float optional_default_float_field = 32 [default = -512.13];
   */
  optionalDefaultFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: required bool optional_default_bool_field = 33 [default = true];
   */
  optionalDefaultBoolField?: boolean;

  /**
   * @generated from field: required spec.Proto2Enum optional_default_enum_field = 34 [default = PROTO2_ENUM_YES];
   */
  optionalDefaultEnumField?: Proto2EnumJson;

  /**
   * @generated from field: optional spec.Proto2Message optional_default_message_field = 35;
   */
  optionalDefaultMessageField?: Proto2MessageJson;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalDefaultGroup optionaldefaultgroup = 36;
   */
  optionaldefaultgroup?: Proto2Message_OptionalDefaultGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_default_wrapped_uint32_field = 203;
   */
  optionalDefaultWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: repeated string repeated_string_field = 37;
   */
  repeatedStringField?: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes_field = 38;
   */
  repeatedBytesField?: string[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 39;
   */
  repeatedInt32Field?: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 40;
   */
  repeatedInt64Field?: string[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_number_field = 109 [jstype = JS_NUMBER];
   */
  repeatedInt64JsNumberField?: string[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_string_field = 108 [jstype = JS_STRING];
   */
  repeatedInt64JsStringField?: string[];

  /**
   * @generated from field: repeated float repeated_float_field = 41;
   */
  repeatedFloatField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 42;
   */
  repeatedBoolField?: boolean[];

  /**
   * @generated from field: repeated spec.Proto2Enum repeated_enum_field = 43;
   */
  repeatedEnumField?: Proto2EnumJson[];

  /**
   * @generated from field: repeated spec.Proto2Message repeated_message_field = 44;
   */
  repeatedMessageField?: Proto2MessageJson[];

  /**
   * @generated from field: repeated spec.Proto2Message.RepeatedGroup repeatedgroup = 45;
   */
  repeatedgroup?: Proto2Message_RepeatedGroupJson[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_wrapped_uint32_field = 204;
   */
  repeatedWrappedUint32Field?: UInt32ValueJson[];

  /**
   * @generated from field: repeated double packed_double_field = 46 [packed = true];
   */
  packedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 47 [packed = true];
   */
  packedUint32Field?: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 48 [packed = true];
   */
  packedUint64Field?: string[];

  /**
   * @generated from field: repeated double unpacked_double_field = 49 [packed = false];
   */
  unpackedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 50 [packed = false];
   */
  unpackedUint32Field?: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 51 [packed = false];
   */
  unpackedUint64Field?: string[];

  /**
   * @generated from field: string oneof_string_field = 52;
   */
  oneofStringField?: string;

  /**
   * @generated from field: bytes oneof_bytes_field = 53;
   */
  oneofBytesField?: string;

  /**
   * @generated from field: int32 oneof_int32_field = 54;
   */
  oneofInt32Field?: number;

  /**
   * @generated from field: int64 oneof_int64_field = 55;
   */
  oneofInt64Field?: string;

  /**
   * @generated from field: int64 oneof_int64_js_number_field = 112 [jstype = JS_NUMBER];
   */
  oneofInt64JsNumberField?: string;

  /**
   * @generated from field: int64 oneof_int64_js_string_field = 111 [jstype = JS_STRING];
   */
  oneofInt64JsStringField?: string;

  /**
   * @generated from field: float oneof_float_field = 56;
   */
  oneofFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bool oneof_bool_field = 57;
   */
  oneofBoolField?: boolean;

  /**
   * @generated from field: spec.Proto2Enum oneof_enum_field = 58;
   */
  oneofEnumField?: Proto2EnumJson;

  /**
   * @generated from field: spec.Proto2Message oneof_message_field = 59;
   */
  oneofMessageField?: Proto2MessageJson;

  /**
   * @generated from field: spec.Proto2Message.OneofGroup oneofgroup = 60;
   */
  oneofgroup?: Proto2Message_OneofGroupJson;

  /**
   * @generated from field: google.protobuf.UInt32Value oneof_wrapped_uint32_field = 205;
   */
  oneofWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: map<string, string> map_string_string_field = 70;
   */
  mapStringStringField?: { [key: string]: string };

  /**
   * @generated from field: map<int32, int32> map_int32_int32_field = 71;
   */
  mapInt32Int32Field?: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool_field = 72;
   */
  mapBoolBoolField?: { [key: string]: boolean };

  /**
   * @generated from field: map<int64, int64> map_int64_int64_field = 73;
   */
  mapInt64Int64Field?: { [key: string]: string };

  /**
   * @generated from field: map<int32, spec.Proto2EnumWithZero> map_int32_enum_field = 74;
   */
  mapInt32EnumField?: { [key: number]: Proto2EnumWithZeroJson };

  /**
   * @generated from field: map<int32, spec.Proto2Message> map_int32_message_field = 75;
   */
  mapInt32MessageField?: { [key: number]: Proto2MessageJson };

  /**
   * @generated from field: map<int32, google.protobuf.UInt32Value> map_int32_wrapped_uint32_field = 209;
   */
  mapInt32WrappedUint32Field?: { [key: number]: UInt32ValueJson };
};

/**
 * Describes the message spec.Proto2Message.
 * Use `create(Proto2MessageDesc)` to create a new message.
 */
export declare const Proto2MessageDesc: GenDescMessage<Proto2Message, Proto2MessageJson>;

/**
 * @generated from message spec.Proto2Message.RequiredGroup
 */
export declare type Proto2Message_RequiredGroup = Message<"spec.Proto2Message.RequiredGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.RequiredGroup.
 */
export declare type Proto2Message_RequiredGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.RequiredGroup.
 * Use `create(Proto2Message_RequiredGroupDesc)` to create a new message.
 */
export declare const Proto2Message_RequiredGroupDesc: GenDescMessage<Proto2Message_RequiredGroup, Proto2Message_RequiredGroupJson>;

/**
 * @generated from message spec.Proto2Message.RequiredDefaultGroup
 */
export declare type Proto2Message_RequiredDefaultGroup = Message<"spec.Proto2Message.RequiredDefaultGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.RequiredDefaultGroup.
 */
export declare type Proto2Message_RequiredDefaultGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.RequiredDefaultGroup.
 * Use `create(Proto2Message_RequiredDefaultGroupDesc)` to create a new message.
 */
export declare const Proto2Message_RequiredDefaultGroupDesc: GenDescMessage<Proto2Message_RequiredDefaultGroup, Proto2Message_RequiredDefaultGroupJson>;

/**
 * @generated from message spec.Proto2Message.OptionalGroup
 */
export declare type Proto2Message_OptionalGroup = Message<"spec.Proto2Message.OptionalGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.OptionalGroup.
 */
export declare type Proto2Message_OptionalGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.OptionalGroup.
 * Use `create(Proto2Message_OptionalGroupDesc)` to create a new message.
 */
export declare const Proto2Message_OptionalGroupDesc: GenDescMessage<Proto2Message_OptionalGroup, Proto2Message_OptionalGroupJson>;

/**
 * @generated from message spec.Proto2Message.OptionalDefaultGroup
 */
export declare type Proto2Message_OptionalDefaultGroup = Message<"spec.Proto2Message.OptionalDefaultGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.OptionalDefaultGroup.
 */
export declare type Proto2Message_OptionalDefaultGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.OptionalDefaultGroup.
 * Use `create(Proto2Message_OptionalDefaultGroupDesc)` to create a new message.
 */
export declare const Proto2Message_OptionalDefaultGroupDesc: GenDescMessage<Proto2Message_OptionalDefaultGroup, Proto2Message_OptionalDefaultGroupJson>;

/**
 * @generated from message spec.Proto2Message.RepeatedGroup
 */
export declare type Proto2Message_RepeatedGroup = Message<"spec.Proto2Message.RepeatedGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.RepeatedGroup.
 */
export declare type Proto2Message_RepeatedGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.RepeatedGroup.
 * Use `create(Proto2Message_RepeatedGroupDesc)` to create a new message.
 */
export declare const Proto2Message_RepeatedGroupDesc: GenDescMessage<Proto2Message_RepeatedGroup, Proto2Message_RepeatedGroupJson>;

/**
 * @generated from message spec.Proto2Message.OneofGroup
 */
export declare type Proto2Message_OneofGroup = Message<"spec.Proto2Message.OneofGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.OneofGroup.
 */
export declare type Proto2Message_OneofGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.OneofGroup.
 * Use `create(Proto2Message_OneofGroupDesc)` to create a new message.
 */
export declare const Proto2Message_OneofGroupDesc: GenDescMessage<Proto2Message_OneofGroup, Proto2Message_OneofGroupJson>;

/**
 * @generated from enum spec.Proto2Enum
 */
export enum Proto2Enum {
  /**
   * @generated from enum value: PROTO2_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PROTO2_ENUM_NO = 2;
   */
  NO = 2,
}

/**
 * JSON type for the enum spec.Proto2Enum.
 */
export declare type Proto2EnumJson = "PROTO2_ENUM_YES" | "PROTO2_ENUM_NO";

/**
 * Describes the enum spec.Proto2Enum.
 */
export declare const Proto2EnumDesc: GenDescEnum<Proto2Enum, Proto2EnumJson>;

/**
 * First enum value must be 0 when used as map value type
 *
 * @generated from enum spec.Proto2EnumWithZero
 */
export enum Proto2EnumWithZero {
  /**
   * @generated from enum value: PROTO2_ENUM_WITH_ZERO_ZERO = 0;
   */
  ZERO = 0,

  /**
   * @generated from enum value: PROTO2_ENUM_WITH_ZERO_ONE = 1;
   */
  ONE = 1,
}

/**
 * JSON type for the enum spec.Proto2EnumWithZero.
 */
export declare type Proto2EnumWithZeroJson = "PROTO2_ENUM_WITH_ZERO_ZERO" | "PROTO2_ENUM_WITH_ZERO_ONE";

/**
 * Describes the enum spec.Proto2EnumWithZero.
 */
export declare const Proto2EnumWithZeroDesc: GenDescEnum<Proto2EnumWithZero, Proto2EnumWithZeroJson>;

