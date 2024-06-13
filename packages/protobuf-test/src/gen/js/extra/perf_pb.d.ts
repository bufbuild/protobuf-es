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
// @generated from file extra/perf.proto (package perf.v1, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/perf.proto.
 */
export declare const fileDesc_extra_perf: GenDescFile;

/**
 * @generated from message perf.v1.PerfMessage
 */
export declare type PerfMessage = Message<"perf.v1.PerfMessage"> & {
  /**
   * @generated from field: double double_field = 1;
   */
  doubleField: number;

  /**
   * @generated from field: int32 int32_field = 2;
   */
  int32Field: number;

  /**
   * @generated from field: uint32 uint32_field = 3333;
   */
  uint32Field: number;

  /**
   * @generated from field: optional int64 int64_field = 3;
   */
  int64Field?: bigint;

  /**
   * @generated from field: optional bool bool_field = 4;
   */
  boolField?: boolean;

  /**
   * @generated from field: string string_field = 5;
   */
  stringField: string;

  /**
   * @generated from field: bytes bytes_field = 6;
   */
  bytesField: Uint8Array;

  /**
   * @generated from field: perf.v1.PerfEnum enum_field = 7;
   */
  enumField: PerfEnum;

  /**
   * @generated from field: perf.v1.PerfMessage small_message_field = 8;
   */
  smallMessageField?: PerfMessage;

  /**
   * @generated from field: int32 unused_field_1 = 9;
   */
  unusedField1: number;

  /**
   * @generated from field: int32 unused_field_2 = 10;
   */
  unusedField2: number;

  /**
   * @generated from field: int32 unused_field_3 = 11;
   */
  unusedField3: number;

  /**
   * @generated from field: int32 unused_field_4 = 12;
   */
  unusedField4: number;

  /**
   * @generated from field: int32 unused_field_5 = 13;
   */
  unusedField5: number;

  /**
   * @generated from field: int32 unused_field_6 = 14;
   */
  unusedField6: number;

  /**
   * @generated from field: int32 unused_field_7 = 15;
   */
  unusedField7: number;

  /**
   * @generated from field: int32 unused_field_8 = 16;
   */
  unusedField8: number;

  /**
   * @generated from field: int32 unused_field_9 = 17;
   */
  unusedField9: number;

  /**
   * @generated from field: int32 unused_field_10 = 18;
   */
  unusedField10: number;

  /**
   * @generated from field: repeated double repeated_double_field = 19;
   */
  repeatedDoubleField: number[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 20;
   */
  repeatedInt32Field: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 41;
   */
  repeatedInt64Field: bigint[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 22;
   */
  repeatedBoolField: boolean[];

  /**
   * @generated from field: repeated string repeated_short_string_field = 23;
   */
  repeatedShortStringField: string[];

  /**
   * @generated from field: repeated string repeated_long_string_field = 24;
   */
  repeatedLongStringField: string[];

  /**
   * @generated from field: repeated bytes repeated_short_bytes_field = 25;
   */
  repeatedShortBytesField: Uint8Array[];

  /**
   * @generated from field: repeated bytes repeated_long_bytes_field = 26;
   */
  repeatedLongBytesField: Uint8Array[];

  /**
   * @generated from field: repeated perf.v1.PerfEnum repeated_enum_field = 27;
   */
  repeatedEnumField: PerfEnum[];

  /**
   * @generated from field: repeated perf.v1.PerfMessage repeated_small_message_field = 28;
   */
  repeatedSmallMessageField: PerfMessage[];

  /**
   * @generated from field: map<int32, int32> map_int32_int32 = 30;
   */
  mapInt32Int32: { [key: number]: number };

  /**
   * @generated from field: map<int64, int64> map_int64_int64 = 31;
   */
  mapInt64Int64: { [key: string]: bigint };

  /**
   * @generated from field: map<string, perf.v1.PerfMessage> map_string_message = 32;
   */
  mapStringMessage: { [key: string]: PerfMessage };

  /**
   * @generated from field: map<string, perf.v1.PerfEnum> map_string_enum = 33;
   */
  mapStringEnum: { [key: string]: PerfEnum };

  /**
   * @generated from oneof perf.v1.PerfMessage.oneof_enum
   */
  oneofEnum: {
    /**
     * @generated from field: perf.v1.PerfEnum oneof_enum_verified = 34;
     */
    value: PerfEnum;
    case: "oneofEnumVerified";
  } | {
    /**
     * @generated from field: perf.v1.PerfEnum oneof_enum_cromulent = 35;
     */
    value: PerfEnum;
    case: "oneofEnumCromulent";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from oneof perf.v1.PerfMessage.oneof_message
   */
  oneofMessage: {
    /**
     * @generated from field: perf.v1.PerfMessage oneof_message_field = 36;
     */
    value: PerfMessage;
    case: "oneofMessageField";
  } | {
    /**
     * @generated from field: perf.v1.PerfMessage oneof_small_message_field = 37;
     */
    value: PerfMessage;
    case: "oneofSmallMessageField";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from oneof perf.v1.PerfMessage.oneof_scalar
   */
  oneofScalar: {
    /**
     * @generated from field: int32 oneof_int32_field = 38;
     */
    value: number;
    case: "oneofInt32Field";
  } | {
    /**
     * @generated from field: bool oneof_bool_field = 39;
     */
    value: boolean;
    case: "oneofBoolField";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: uint32 id = 40;
   */
  id: number;
};

/**
 * JSON type for the message perf.v1.PerfMessage.
 */
export declare type PerfMessageJson = {
  /**
   * @generated from field: double double_field = 1;
   */
  doubleField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: int32 int32_field = 2;
   */
  int32Field?: number;

  /**
   * @generated from field: uint32 uint32_field = 3333;
   */
  uint32Field?: number;

  /**
   * @generated from field: optional int64 int64_field = 3;
   */
  int64Field?: string;

  /**
   * @generated from field: optional bool bool_field = 4;
   */
  boolField?: boolean;

  /**
   * @generated from field: string string_field = 5;
   */
  stringField?: string;

  /**
   * @generated from field: bytes bytes_field = 6;
   */
  bytesField?: string;

  /**
   * @generated from field: perf.v1.PerfEnum enum_field = 7;
   */
  enumField?: PerfEnumJson;

  /**
   * @generated from field: perf.v1.PerfMessage small_message_field = 8;
   */
  smallMessageField?: PerfMessageJson;

  /**
   * @generated from field: int32 unused_field_1 = 9;
   */
  unusedField1?: number;

  /**
   * @generated from field: int32 unused_field_2 = 10;
   */
  unusedField2?: number;

  /**
   * @generated from field: int32 unused_field_3 = 11;
   */
  unusedField3?: number;

  /**
   * @generated from field: int32 unused_field_4 = 12;
   */
  unusedField4?: number;

  /**
   * @generated from field: int32 unused_field_5 = 13;
   */
  unusedField5?: number;

  /**
   * @generated from field: int32 unused_field_6 = 14;
   */
  unusedField6?: number;

  /**
   * @generated from field: int32 unused_field_7 = 15;
   */
  unusedField7?: number;

  /**
   * @generated from field: int32 unused_field_8 = 16;
   */
  unusedField8?: number;

  /**
   * @generated from field: int32 unused_field_9 = 17;
   */
  unusedField9?: number;

  /**
   * @generated from field: int32 unused_field_10 = 18;
   */
  unusedField10?: number;

  /**
   * @generated from field: repeated double repeated_double_field = 19;
   */
  repeatedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 20;
   */
  repeatedInt32Field?: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 41;
   */
  repeatedInt64Field?: string[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 22;
   */
  repeatedBoolField?: boolean[];

  /**
   * @generated from field: repeated string repeated_short_string_field = 23;
   */
  repeatedShortStringField?: string[];

  /**
   * @generated from field: repeated string repeated_long_string_field = 24;
   */
  repeatedLongStringField?: string[];

  /**
   * @generated from field: repeated bytes repeated_short_bytes_field = 25;
   */
  repeatedShortBytesField?: string[];

  /**
   * @generated from field: repeated bytes repeated_long_bytes_field = 26;
   */
  repeatedLongBytesField?: string[];

  /**
   * @generated from field: repeated perf.v1.PerfEnum repeated_enum_field = 27;
   */
  repeatedEnumField?: PerfEnumJson[];

  /**
   * @generated from field: repeated perf.v1.PerfMessage repeated_small_message_field = 28;
   */
  repeatedSmallMessageField?: PerfMessageJson[];

  /**
   * @generated from field: map<int32, int32> map_int32_int32 = 30;
   */
  mapInt32Int32?: { [key: number]: number };

  /**
   * @generated from field: map<int64, int64> map_int64_int64 = 31;
   */
  mapInt64Int64?: { [key: string]: string };

  /**
   * @generated from field: map<string, perf.v1.PerfMessage> map_string_message = 32;
   */
  mapStringMessage?: { [key: string]: PerfMessageJson };

  /**
   * @generated from field: map<string, perf.v1.PerfEnum> map_string_enum = 33;
   */
  mapStringEnum?: { [key: string]: PerfEnumJson };

  /**
   * @generated from field: perf.v1.PerfEnum oneof_enum_verified = 34;
   */
  oneofEnumVerified?: PerfEnumJson;

  /**
   * @generated from field: perf.v1.PerfEnum oneof_enum_cromulent = 35;
   */
  oneofEnumCromulent?: PerfEnumJson;

  /**
   * @generated from field: perf.v1.PerfMessage oneof_message_field = 36;
   */
  oneofMessageField?: PerfMessageJson;

  /**
   * @generated from field: perf.v1.PerfMessage oneof_small_message_field = 37;
   */
  oneofSmallMessageField?: PerfMessageJson;

  /**
   * @generated from field: int32 oneof_int32_field = 38;
   */
  oneofInt32Field?: number;

  /**
   * @generated from field: bool oneof_bool_field = 39;
   */
  oneofBoolField?: boolean;

  /**
   * @generated from field: uint32 id = 40;
   */
  id?: number;
};

/**
 * Describes the message perf.v1.PerfMessage.
 * Use `create(PerfMessageDesc)` to create a new message.
 */
export declare const PerfMessageDesc: GenDescMessage<PerfMessage, PerfMessageJson>;

/**
 * @generated from enum perf.v1.PerfEnum
 */
export enum PerfEnum {
  /**
   * @generated from enum value: PERF_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PERF_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PERF_ENUM_NO = 2;
   */
  NO = 2,
}

/**
 * JSON type for the enum perf.v1.PerfEnum.
 */
export declare type PerfEnumJson = "PERF_ENUM_UNSPECIFIED" | "PERF_ENUM_YES" | "PERF_ENUM_NO";

/**
 * Describes the enum perf.v1.PerfEnum.
 */
export declare const PerfEnumDesc: GenDescEnum<PerfEnum, PerfEnumJson>;

