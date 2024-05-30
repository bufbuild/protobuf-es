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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/edition2023.proto (package spec, edition 2023)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { UInt32Value, UInt32ValueJson } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/edition2023.proto.
 */
export declare const fileDesc_extra_edition2023: GenDescFile;

/**
 * Note: We do not exhaust all field types
 *
 * @generated from message spec.Edition2023Message
 */
export declare type Edition2023Message = Message<"spec.Edition2023Message"> & {
  /**
   * @generated from field: string explicit_string_field = 301;
   */
  explicitStringField: string;

  /**
   * @generated from field: bytes explicit_bytes_field = 302;
   */
  explicitBytesField: Uint8Array;

  /**
   * @generated from field: int32 explicit_int32_field = 303;
   */
  explicitInt32Field: number;

  /**
   * @generated from field: int64 explicit_int64_field = 304;
   */
  explicitInt64Field: bigint;

  /**
   * @generated from field: int64 explicit_int64_js_number_field = 305 [jstype = JS_NUMBER];
   */
  explicitInt64JsNumberField: bigint;

  /**
   * @generated from field: int64 explicit_int64_js_string_field = 306 [jstype = JS_STRING];
   */
  explicitInt64JsStringField: string;

  /**
   * @generated from field: float explicit_float_field = 307;
   */
  explicitFloatField: number;

  /**
   * @generated from field: bool explicit_bool_field = 308;
   */
  explicitBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen explicit_enum_open_field = 309;
   */
  explicitEnumOpenField: Edition2023EnumOpen;

  /**
   * @generated from field: spec.Edition2023EnumClosed explicit_enum_closed_field = 310;
   */
  explicitEnumClosedField: Edition2023EnumClosed;

  /**
   * @generated from field: spec.Edition2023Message explicit_message_field = 311;
   */
  explicitMessageField?: Edition2023Message;

  /**
   * @generated from field: spec.Edition2023Message explicit_message_delimited_field = 312 [features.message_encoding = DELIMITED];
   */
  explicitMessageDelimitedField?: Edition2023Message;

  /**
   * @generated from field: google.protobuf.UInt32Value explicit_wrapped_uint32_field = 313;
   */
  explicitWrappedUint32Field?: number;

  /**
   * @generated from field: string implicit_string_field = 201 [features.field_presence = IMPLICIT];
   */
  implicitStringField: string;

  /**
   * @generated from field: bytes implicit_bytes_field = 202 [features.field_presence = IMPLICIT];
   */
  implicitBytesField: Uint8Array;

  /**
   * @generated from field: int32 implicit_int32_field = 203 [features.field_presence = IMPLICIT];
   */
  implicitInt32Field: number;

  /**
   * @generated from field: int64 implicit_int64_field = 204 [features.field_presence = IMPLICIT];
   */
  implicitInt64Field: bigint;

  /**
   * @generated from field: int64 implicit_int64_js_number_field = 205 [jstype = JS_NUMBER, features.field_presence = IMPLICIT];
   */
  implicitInt64JsNumberField: bigint;

  /**
   * @generated from field: int64 implicit_int64_js_string_field = 206 [jstype = JS_STRING, features.field_presence = IMPLICIT];
   */
  implicitInt64JsStringField: string;

  /**
   * @generated from field: float implicit_float_field = 207 [features.field_presence = IMPLICIT];
   */
  implicitFloatField: number;

  /**
   * @generated from field: bool implicit_bool_field = 208 [features.field_presence = IMPLICIT];
   */
  implicitBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen implicit_enum_open_field = 209 [features.field_presence = IMPLICIT];
   */
  implicitEnumOpenField: Edition2023EnumOpen;

  /**
   * @generated from field: string required_string_field = 1 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredStringField: string;

  /**
   * @generated from field: bytes required_bytes_field = 2 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredBytesField: Uint8Array;

  /**
   * @generated from field: int32 required_int32_field = 3 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt32Field: number;

  /**
   * @generated from field: int64 required_int64_field = 4 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt64Field: bigint;

  /**
   * @generated from field: int64 required_int64_js_number_field = 5 [jstype = JS_NUMBER, features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt64JsNumberField: bigint;

  /**
   * @generated from field: int64 required_int64_js_string_field = 6 [jstype = JS_STRING, features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt64JsStringField: string;

  /**
   * @generated from field: float required_float_field = 7 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredFloatField: number;

  /**
   * @generated from field: bool required_bool_field = 8 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen required_enum_open_field = 9 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredEnumOpenField: Edition2023EnumOpen;

  /**
   * @generated from field: spec.Edition2023EnumClosed required_enum_closed_field = 10 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredEnumClosedField: Edition2023EnumClosed;

  /**
   * @generated from field: spec.Edition2023Message.Child required_message_field = 11 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredMessageField?: Edition2023Message_Child;

  /**
   * @generated from field: spec.Edition2023Message.Child required_message_delimited_field = 12 [features.field_presence = LEGACY_REQUIRED, features.message_encoding = DELIMITED];
   */
  requiredMessageDelimitedField?: Edition2023Message_Child;

  /**
   * @generated from field: google.protobuf.UInt32Value required_wrapped_uint32_field = 13 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredWrappedUint32Field?: number;

  /**
   * @generated from field: string required_default_string_field = 101 [default = "hello \" *\/ ", features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultStringField: string;

  /**
   * @generated from field: bytes required_default_bytes_field = 102 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013", features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultBytesField: Uint8Array;

  /**
   * @generated from field: int32 required_default_int32_field = 103 [default = 128, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt32Field: number;

  /**
   * @generated from field: int64 required_default_int64_field = 104 [default = -256, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt64Field: bigint;

  /**
   * @generated from field: int64 required_default_int64_js_number_field = 105 [default = -256, jstype = JS_NUMBER, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt64JsNumberField: bigint;

  /**
   * @generated from field: int64 required_default_int64_js_string_field = 106 [default = -256, jstype = JS_STRING, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt64JsStringField: string;

  /**
   * @generated from field: float required_default_float_field = 107 [default = -512.13, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultFloatField: number;

  /**
   * @generated from field: bool required_default_bool_field = 108 [default = true, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen required_default_enum_open_field = 109 [default = EDITION2023_ENUM_OPEN_A, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultEnumOpenField: Edition2023EnumOpen;

  /**
   * @generated from field: spec.Edition2023EnumClosed required_default_enum_closed_field = 110 [default = EDITION2023_ENUM_CLOSED_A, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultEnumClosedField: Edition2023EnumClosed;

  /**
   * @generated from field: repeated string repeated_string_field = 401;
   */
  repeatedStringField: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes_field = 402;
   */
  repeatedBytesField: Uint8Array[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 403;
   */
  repeatedInt32Field: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 404;
   */
  repeatedInt64Field: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_number_field = 405 [jstype = JS_NUMBER];
   */
  repeatedInt64JsNumberField: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_string_field = 406 [jstype = JS_STRING];
   */
  repeatedInt64JsStringField: string[];

  /**
   * @generated from field: repeated float repeated_float_field = 407;
   */
  repeatedFloatField: number[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 408;
   */
  repeatedBoolField: boolean[];

  /**
   * @generated from field: repeated spec.Edition2023EnumOpen repeated_enum_open_field = 409;
   */
  repeatedEnumOpenField: Edition2023EnumOpen[];

  /**
   * @generated from field: repeated spec.Edition2023EnumClosed repeated_enum_closed_field = 410;
   */
  repeatedEnumClosedField: Edition2023EnumClosed[];

  /**
   * @generated from field: repeated spec.Edition2023Message repeated_message_field = 411;
   */
  repeatedMessageField: Edition2023Message[];

  /**
   * @generated from field: repeated spec.Edition2023Message repeated_message_delimited_field = 412 [features.message_encoding = DELIMITED];
   */
  repeatedMessageDelimitedField: Edition2023Message[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_wrapped_uint32_field = 413;
   */
  repeatedWrappedUint32Field: UInt32Value[];

  /**
   * @generated from field: repeated double packed_double_field = 414 [features.repeated_field_encoding = PACKED];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 415 [features.repeated_field_encoding = PACKED];
   */
  packedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 416 [features.repeated_field_encoding = PACKED];
   */
  packedUint64Field: bigint[];

  /**
   * @generated from field: repeated double unpacked_double_field = 417 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 418 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 419 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedUint64Field: bigint[];

  /**
   * @generated from oneof spec.Edition2023Message.either
   */
  either: {
    /**
     * @generated from field: string oneof_string_field = 501;
     */
    value: string;
    case: "oneofStringField";
  } | {
    /**
     * @generated from field: bytes oneof_bytes_field = 502;
     */
    value: Uint8Array;
    case: "oneofBytesField";
  } | {
    /**
     * @generated from field: int32 oneof_int32_field = 503;
     */
    value: number;
    case: "oneofInt32Field";
  } | {
    /**
     * @generated from field: int64 oneof_int64_field = 504;
     */
    value: bigint;
    case: "oneofInt64Field";
  } | {
    /**
     * @generated from field: int64 oneof_int64_js_number_field = 505 [jstype = JS_NUMBER];
     */
    value: bigint;
    case: "oneofInt64JsNumberField";
  } | {
    /**
     * @generated from field: int64 oneof_int64_js_string_field = 506 [jstype = JS_STRING];
     */
    value: string;
    case: "oneofInt64JsStringField";
  } | {
    /**
     * @generated from field: float oneof_float_field = 507;
     */
    value: number;
    case: "oneofFloatField";
  } | {
    /**
     * @generated from field: bool oneof_bool_field = 508;
     */
    value: boolean;
    case: "oneofBoolField";
  } | {
    /**
     * @generated from field: spec.Edition2023EnumOpen oneof_enum_open_field = 509;
     */
    value: Edition2023EnumOpen;
    case: "oneofEnumOpenField";
  } | {
    /**
     * @generated from field: spec.Edition2023EnumClosed oneof_enum_closed_field = 510;
     */
    value: Edition2023EnumClosed;
    case: "oneofEnumClosedField";
  } | {
    /**
     * @generated from field: spec.Edition2023Message oneof_message_field = 511;
     */
    value: Edition2023Message;
    case: "oneofMessageField";
  } | {
    /**
     * @generated from field: spec.Edition2023Message oneof_message_delimited_field = 512 [features.message_encoding = DELIMITED];
     */
    value: Edition2023Message;
    case: "oneofMessageDelimitedField";
  } | {
    /**
     * @generated from field: google.protobuf.UInt32Value oneof_wrapped_uint32_field = 513;
     */
    value: UInt32Value;
    case: "oneofWrappedUint32Field";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: map<string, string> map_string_string_field = 601;
   */
  mapStringStringField: { [key: string]: string };

  /**
   * @generated from field: map<int32, int32> map_int32_int32_field = 602;
   */
  mapInt32Int32Field: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool_field = 603;
   */
  mapBoolBoolField: { [key: string]: boolean };

  /**
   * @generated from field: map<int64, int64> map_int64_int64_field = 604;
   */
  mapInt64Int64Field: { [key: string]: bigint };

  /**
   * @generated from field: map<int32, spec.Edition2023EnumOpen> map_int32_enum_open_field = 605;
   */
  mapInt32EnumOpenField: { [key: number]: Edition2023EnumOpen };

  /**
   * @generated from field: map<int32, spec.Edition2023Message> map_int32_message_field = 607;
   */
  mapInt32MessageField: { [key: number]: Edition2023Message };

  /**
   * @generated from field: map<int32, google.protobuf.UInt32Value> map_int32_wrapped_uint32_field = 608;
   */
  mapInt32WrappedUint32Field: { [key: number]: UInt32Value };
};

/**
 * JSON type for the message spec.Edition2023Message.
 */
export declare type Edition2023MessageJson = {
  /**
   * @generated from field: string explicit_string_field = 301;
   */
  explicitStringField?: string;

  /**
   * @generated from field: bytes explicit_bytes_field = 302;
   */
  explicitBytesField?: string;

  /**
   * @generated from field: int32 explicit_int32_field = 303;
   */
  explicitInt32Field?: number;

  /**
   * @generated from field: int64 explicit_int64_field = 304;
   */
  explicitInt64Field?: string;

  /**
   * @generated from field: int64 explicit_int64_js_number_field = 305 [jstype = JS_NUMBER];
   */
  explicitInt64JsNumberField?: string;

  /**
   * @generated from field: int64 explicit_int64_js_string_field = 306 [jstype = JS_STRING];
   */
  explicitInt64JsStringField?: string;

  /**
   * @generated from field: float explicit_float_field = 307;
   */
  explicitFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bool explicit_bool_field = 308;
   */
  explicitBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen explicit_enum_open_field = 309;
   */
  explicitEnumOpenField?: Edition2023EnumOpenJson;

  /**
   * @generated from field: spec.Edition2023EnumClosed explicit_enum_closed_field = 310;
   */
  explicitEnumClosedField?: Edition2023EnumClosedJson;

  /**
   * @generated from field: spec.Edition2023Message explicit_message_field = 311;
   */
  explicitMessageField?: Edition2023MessageJson;

  /**
   * @generated from field: spec.Edition2023Message explicit_message_delimited_field = 312 [features.message_encoding = DELIMITED];
   */
  explicitMessageDelimitedField?: Edition2023MessageJson;

  /**
   * @generated from field: google.protobuf.UInt32Value explicit_wrapped_uint32_field = 313;
   */
  explicitWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: string implicit_string_field = 201 [features.field_presence = IMPLICIT];
   */
  implicitStringField?: string;

  /**
   * @generated from field: bytes implicit_bytes_field = 202 [features.field_presence = IMPLICIT];
   */
  implicitBytesField?: string;

  /**
   * @generated from field: int32 implicit_int32_field = 203 [features.field_presence = IMPLICIT];
   */
  implicitInt32Field?: number;

  /**
   * @generated from field: int64 implicit_int64_field = 204 [features.field_presence = IMPLICIT];
   */
  implicitInt64Field?: string;

  /**
   * @generated from field: int64 implicit_int64_js_number_field = 205 [jstype = JS_NUMBER, features.field_presence = IMPLICIT];
   */
  implicitInt64JsNumberField?: string;

  /**
   * @generated from field: int64 implicit_int64_js_string_field = 206 [jstype = JS_STRING, features.field_presence = IMPLICIT];
   */
  implicitInt64JsStringField?: string;

  /**
   * @generated from field: float implicit_float_field = 207 [features.field_presence = IMPLICIT];
   */
  implicitFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bool implicit_bool_field = 208 [features.field_presence = IMPLICIT];
   */
  implicitBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen implicit_enum_open_field = 209 [features.field_presence = IMPLICIT];
   */
  implicitEnumOpenField?: Edition2023EnumOpenJson;

  /**
   * @generated from field: string required_string_field = 1 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredStringField?: string;

  /**
   * @generated from field: bytes required_bytes_field = 2 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredBytesField?: string;

  /**
   * @generated from field: int32 required_int32_field = 3 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt32Field?: number;

  /**
   * @generated from field: int64 required_int64_field = 4 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt64Field?: string;

  /**
   * @generated from field: int64 required_int64_js_number_field = 5 [jstype = JS_NUMBER, features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt64JsNumberField?: string;

  /**
   * @generated from field: int64 required_int64_js_string_field = 6 [jstype = JS_STRING, features.field_presence = LEGACY_REQUIRED];
   */
  requiredInt64JsStringField?: string;

  /**
   * @generated from field: float required_float_field = 7 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bool required_bool_field = 8 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen required_enum_open_field = 9 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredEnumOpenField?: Edition2023EnumOpenJson;

  /**
   * @generated from field: spec.Edition2023EnumClosed required_enum_closed_field = 10 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredEnumClosedField?: Edition2023EnumClosedJson;

  /**
   * @generated from field: spec.Edition2023Message.Child required_message_field = 11 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredMessageField?: Edition2023Message_ChildJson;

  /**
   * @generated from field: spec.Edition2023Message.Child required_message_delimited_field = 12 [features.field_presence = LEGACY_REQUIRED, features.message_encoding = DELIMITED];
   */
  requiredMessageDelimitedField?: Edition2023Message_ChildJson;

  /**
   * @generated from field: google.protobuf.UInt32Value required_wrapped_uint32_field = 13 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: string required_default_string_field = 101 [default = "hello \" *\/ ", features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultStringField?: string;

  /**
   * @generated from field: bytes required_default_bytes_field = 102 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013", features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultBytesField?: string;

  /**
   * @generated from field: int32 required_default_int32_field = 103 [default = 128, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt32Field?: number;

  /**
   * @generated from field: int64 required_default_int64_field = 104 [default = -256, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt64Field?: string;

  /**
   * @generated from field: int64 required_default_int64_js_number_field = 105 [default = -256, jstype = JS_NUMBER, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt64JsNumberField?: string;

  /**
   * @generated from field: int64 required_default_int64_js_string_field = 106 [default = -256, jstype = JS_STRING, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultInt64JsStringField?: string;

  /**
   * @generated from field: float required_default_float_field = 107 [default = -512.13, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bool required_default_bool_field = 108 [default = true, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen required_default_enum_open_field = 109 [default = EDITION2023_ENUM_OPEN_A, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultEnumOpenField?: Edition2023EnumOpenJson;

  /**
   * @generated from field: spec.Edition2023EnumClosed required_default_enum_closed_field = 110 [default = EDITION2023_ENUM_CLOSED_A, features.field_presence = LEGACY_REQUIRED];
   */
  requiredDefaultEnumClosedField?: Edition2023EnumClosedJson;

  /**
   * @generated from field: repeated string repeated_string_field = 401;
   */
  repeatedStringField?: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes_field = 402;
   */
  repeatedBytesField?: string[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 403;
   */
  repeatedInt32Field?: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 404;
   */
  repeatedInt64Field?: string[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_number_field = 405 [jstype = JS_NUMBER];
   */
  repeatedInt64JsNumberField?: string[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_string_field = 406 [jstype = JS_STRING];
   */
  repeatedInt64JsStringField?: string[];

  /**
   * @generated from field: repeated float repeated_float_field = 407;
   */
  repeatedFloatField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 408;
   */
  repeatedBoolField?: boolean[];

  /**
   * @generated from field: repeated spec.Edition2023EnumOpen repeated_enum_open_field = 409;
   */
  repeatedEnumOpenField?: Edition2023EnumOpenJson[];

  /**
   * @generated from field: repeated spec.Edition2023EnumClosed repeated_enum_closed_field = 410;
   */
  repeatedEnumClosedField?: Edition2023EnumClosedJson[];

  /**
   * @generated from field: repeated spec.Edition2023Message repeated_message_field = 411;
   */
  repeatedMessageField?: Edition2023MessageJson[];

  /**
   * @generated from field: repeated spec.Edition2023Message repeated_message_delimited_field = 412 [features.message_encoding = DELIMITED];
   */
  repeatedMessageDelimitedField?: Edition2023MessageJson[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_wrapped_uint32_field = 413;
   */
  repeatedWrappedUint32Field?: UInt32ValueJson[];

  /**
   * @generated from field: repeated double packed_double_field = 414 [features.repeated_field_encoding = PACKED];
   */
  packedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 415 [features.repeated_field_encoding = PACKED];
   */
  packedUint32Field?: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 416 [features.repeated_field_encoding = PACKED];
   */
  packedUint64Field?: string[];

  /**
   * @generated from field: repeated double unpacked_double_field = 417 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 418 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedUint32Field?: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 419 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedUint64Field?: string[];

  /**
   * @generated from field: string oneof_string_field = 501;
   */
  oneofStringField?: string;

  /**
   * @generated from field: bytes oneof_bytes_field = 502;
   */
  oneofBytesField?: string;

  /**
   * @generated from field: int32 oneof_int32_field = 503;
   */
  oneofInt32Field?: number;

  /**
   * @generated from field: int64 oneof_int64_field = 504;
   */
  oneofInt64Field?: string;

  /**
   * @generated from field: int64 oneof_int64_js_number_field = 505 [jstype = JS_NUMBER];
   */
  oneofInt64JsNumberField?: string;

  /**
   * @generated from field: int64 oneof_int64_js_string_field = 506 [jstype = JS_STRING];
   */
  oneofInt64JsStringField?: string;

  /**
   * @generated from field: float oneof_float_field = 507;
   */
  oneofFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bool oneof_bool_field = 508;
   */
  oneofBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen oneof_enum_open_field = 509;
   */
  oneofEnumOpenField?: Edition2023EnumOpenJson;

  /**
   * @generated from field: spec.Edition2023EnumClosed oneof_enum_closed_field = 510;
   */
  oneofEnumClosedField?: Edition2023EnumClosedJson;

  /**
   * @generated from field: spec.Edition2023Message oneof_message_field = 511;
   */
  oneofMessageField?: Edition2023MessageJson;

  /**
   * @generated from field: spec.Edition2023Message oneof_message_delimited_field = 512 [features.message_encoding = DELIMITED];
   */
  oneofMessageDelimitedField?: Edition2023MessageJson;

  /**
   * @generated from field: google.protobuf.UInt32Value oneof_wrapped_uint32_field = 513;
   */
  oneofWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: map<string, string> map_string_string_field = 601;
   */
  mapStringStringField?: { [key: string]: string };

  /**
   * @generated from field: map<int32, int32> map_int32_int32_field = 602;
   */
  mapInt32Int32Field?: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool_field = 603;
   */
  mapBoolBoolField?: { [key: string]: boolean };

  /**
   * @generated from field: map<int64, int64> map_int64_int64_field = 604;
   */
  mapInt64Int64Field?: { [key: string]: string };

  /**
   * @generated from field: map<int32, spec.Edition2023EnumOpen> map_int32_enum_open_field = 605;
   */
  mapInt32EnumOpenField?: { [key: number]: Edition2023EnumOpenJson };

  /**
   * @generated from field: map<int32, spec.Edition2023Message> map_int32_message_field = 607;
   */
  mapInt32MessageField?: { [key: number]: Edition2023MessageJson };

  /**
   * @generated from field: map<int32, google.protobuf.UInt32Value> map_int32_wrapped_uint32_field = 608;
   */
  mapInt32WrappedUint32Field?: { [key: number]: UInt32ValueJson };
};

/**
 * Describes the message spec.Edition2023Message.
 * Use `create(Edition2023MessageDesc)` to create a new message.
 */
export declare const Edition2023MessageDesc: GenDescMessage<Edition2023Message, Edition2023MessageJson>;

/**
 * message for use in required fields above to avoid circular reference
 *
 * @generated from message spec.Edition2023Message.Child
 */
export declare type Edition2023Message_Child = Message<"spec.Edition2023Message.Child"> & {
  /**
   * @generated from field: int32 f = 1;
   */
  f: number;
};

/**
 * JSON type for the message spec.Edition2023Message.Child.
 */
export declare type Edition2023Message_ChildJson = {
  /**
   * @generated from field: int32 f = 1;
   */
  f?: number;
};

/**
 * Describes the message spec.Edition2023Message.Child.
 * Use `create(Edition2023Message_ChildDesc)` to create a new message.
 */
export declare const Edition2023Message_ChildDesc: GenDescMessage<Edition2023Message_Child, Edition2023Message_ChildJson>;

/**
 * this is an exact replication of spec.Proto3MessageForEdition2023 in editions
 * see edition-2023-proto2.proto
 *
 * @generated from message spec.Edition2023FromProto2Message
 */
export declare type Edition2023FromProto2Message = Message<"spec.Edition2023FromProto2Message"> & {
  /**
   * @generated from field: bool optional_bool_field = 1;
   */
  optionalBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumClosed optional_closed_enum_field = 2;
   */
  optionalClosedEnumField: Edition2023EnumClosed;

  /**
   * @generated from field: string optional_string_field_with_default = 3 [default = "hello \" *\/ "];
   */
  optionalStringFieldWithDefault: string;

  /**
   * @generated from field: spec.Edition2023FromProto2Message.OptionalGroup optionalgroup = 4 [features.message_encoding = DELIMITED];
   */
  optionalgroup?: Edition2023FromProto2Message_OptionalGroup;

  /**
   * @generated from field: bool required_bool_field = 5 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumClosed required_closed_enum_field = 6 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredClosedEnumField: Edition2023EnumClosed;

  /**
   * @generated from field: string required_string_field_with_default = 7 [default = "", features.field_presence = LEGACY_REQUIRED];
   */
  requiredStringFieldWithDefault: string;

  /**
   * @generated from field: spec.Edition2023FromProto2Message.RequiredGroup requiredgroup = 8 [features.message_encoding = DELIMITED];
   */
  requiredgroup?: Edition2023FromProto2Message_RequiredGroup;

  /**
   * @generated from field: repeated double packed_double_field = 9 [features.repeated_field_encoding = PACKED];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated double unpacked_double_field = 10 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedDoubleField: number[];
};

/**
 * JSON type for the message spec.Edition2023FromProto2Message.
 */
export declare type Edition2023FromProto2MessageJson = {
  /**
   * @generated from field: bool optional_bool_field = 1;
   */
  optionalBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumClosed optional_closed_enum_field = 2;
   */
  optionalClosedEnumField?: Edition2023EnumClosedJson;

  /**
   * @generated from field: string optional_string_field_with_default = 3 [default = "hello \" *\/ "];
   */
  optionalStringFieldWithDefault?: string;

  /**
   * @generated from field: spec.Edition2023FromProto2Message.OptionalGroup optionalgroup = 4 [features.message_encoding = DELIMITED];
   */
  optionalgroup?: Edition2023FromProto2Message_OptionalGroupJson;

  /**
   * @generated from field: bool required_bool_field = 5 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumClosed required_closed_enum_field = 6 [features.field_presence = LEGACY_REQUIRED];
   */
  requiredClosedEnumField?: Edition2023EnumClosedJson;

  /**
   * @generated from field: string required_string_field_with_default = 7 [default = "", features.field_presence = LEGACY_REQUIRED];
   */
  requiredStringFieldWithDefault?: string;

  /**
   * @generated from field: spec.Edition2023FromProto2Message.RequiredGroup requiredgroup = 8 [features.message_encoding = DELIMITED];
   */
  requiredgroup?: Edition2023FromProto2Message_RequiredGroupJson;

  /**
   * @generated from field: repeated double packed_double_field = 9 [features.repeated_field_encoding = PACKED];
   */
  packedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated double unpacked_double_field = 10 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];
};

/**
 * Describes the message spec.Edition2023FromProto2Message.
 * Use `create(Edition2023FromProto2MessageDesc)` to create a new message.
 */
export declare const Edition2023FromProto2MessageDesc: GenDescMessage<Edition2023FromProto2Message, Edition2023FromProto2MessageJson>;

/**
 * @generated from message spec.Edition2023FromProto2Message.OptionalGroup
 */
export declare type Edition2023FromProto2Message_OptionalGroup = Message<"spec.Edition2023FromProto2Message.OptionalGroup"> & {
  /**
   * @generated from field: int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Edition2023FromProto2Message.OptionalGroup.
 */
export declare type Edition2023FromProto2Message_OptionalGroupJson = {
  /**
   * @generated from field: int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Edition2023FromProto2Message.OptionalGroup.
 * Use `create(Edition2023FromProto2Message_OptionalGroupDesc)` to create a new message.
 */
export declare const Edition2023FromProto2Message_OptionalGroupDesc: GenDescMessage<Edition2023FromProto2Message_OptionalGroup, Edition2023FromProto2Message_OptionalGroupJson>;

/**
 * @generated from message spec.Edition2023FromProto2Message.RequiredGroup
 */
export declare type Edition2023FromProto2Message_RequiredGroup = Message<"spec.Edition2023FromProto2Message.RequiredGroup"> & {
  /**
   * @generated from field: int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Edition2023FromProto2Message.RequiredGroup.
 */
export declare type Edition2023FromProto2Message_RequiredGroupJson = {
  /**
   * @generated from field: int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Edition2023FromProto2Message.RequiredGroup.
 * Use `create(Edition2023FromProto2Message_RequiredGroupDesc)` to create a new message.
 */
export declare const Edition2023FromProto2Message_RequiredGroupDesc: GenDescMessage<Edition2023FromProto2Message_RequiredGroup, Edition2023FromProto2Message_RequiredGroupJson>;

/**
 * this is an exact replication of spec.Proto2MessageForEdition2023 in editions
 * see edition-2023-proto3.proto
 *
 * @generated from message spec.Edition2023FromProto3Message
 */
export declare type Edition2023FromProto3Message = Message<"spec.Edition2023FromProto3Message"> & {
  /**
   * @generated from field: bool implicit_bool_field = 1 [features.field_presence = IMPLICIT];
   */
  implicitBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen implicit_open_enum_field = 2 [features.field_presence = IMPLICIT];
   */
  implicitOpenEnumField: Edition2023EnumOpen;

  /**
   * @generated from field: bool explicit_bool_field = 5 [features.field_presence = EXPLICIT];
   */
  explicitBoolField: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen explicit_open_enum_field = 6 [features.field_presence = EXPLICIT];
   */
  explicitOpenEnumField: Edition2023EnumOpen;

  /**
   * @generated from field: repeated double packed_double_field = 9 [features.repeated_field_encoding = PACKED];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated double unpacked_double_field = 10 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedDoubleField: number[];
};

/**
 * JSON type for the message spec.Edition2023FromProto3Message.
 */
export declare type Edition2023FromProto3MessageJson = {
  /**
   * @generated from field: bool implicit_bool_field = 1 [features.field_presence = IMPLICIT];
   */
  implicitBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen implicit_open_enum_field = 2 [features.field_presence = IMPLICIT];
   */
  implicitOpenEnumField?: Edition2023EnumOpenJson;

  /**
   * @generated from field: bool explicit_bool_field = 5 [features.field_presence = EXPLICIT];
   */
  explicitBoolField?: boolean;

  /**
   * @generated from field: spec.Edition2023EnumOpen explicit_open_enum_field = 6 [features.field_presence = EXPLICIT];
   */
  explicitOpenEnumField?: Edition2023EnumOpenJson;

  /**
   * @generated from field: repeated double packed_double_field = 9 [features.repeated_field_encoding = PACKED];
   */
  packedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated double unpacked_double_field = 10 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];
};

/**
 * Describes the message spec.Edition2023FromProto3Message.
 * Use `create(Edition2023FromProto3MessageDesc)` to create a new message.
 */
export declare const Edition2023FromProto3MessageDesc: GenDescMessage<Edition2023FromProto3Message, Edition2023FromProto3MessageJson>;

/**
 * @generated from enum spec.Edition2023EnumOpen
 */
export enum Edition2023EnumOpen {
  /**
   * @generated from enum value: EDITION2023_ENUM_OPEN_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: EDITION2023_ENUM_OPEN_A = 1;
   */
  A = 1,
}

/**
 * JSON type for the enum spec.Edition2023EnumOpen.
 */
export declare type Edition2023EnumOpenJson = "EDITION2023_ENUM_OPEN_UNSPECIFIED" | "EDITION2023_ENUM_OPEN_A";

/**
 * Describes the enum spec.Edition2023EnumOpen.
 */
export declare const Edition2023EnumOpenDesc: GenDescEnum<Edition2023EnumOpen, Edition2023EnumOpenJson>;

/**
 * @generated from enum spec.Edition2023EnumClosed
 * @generated with option features.enum_type = CLOSED
 */
export enum Edition2023EnumClosed {
  /**
   * @generated from enum value: EDITION2023_ENUM_CLOSED_A = 1;
   */
  A = 1,
}

/**
 * JSON type for the enum spec.Edition2023EnumClosed.
 */
export declare type Edition2023EnumClosedJson = "EDITION2023_ENUM_CLOSED_A";

/**
 * Describes the enum spec.Edition2023EnumClosed.
 */
export declare const Edition2023EnumClosedDesc: GenDescEnum<Edition2023EnumClosed, Edition2023EnumClosedJson>;

