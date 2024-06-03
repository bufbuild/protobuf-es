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

// @generated by protoc-gen-es v2.0.0-alpha.3 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/wkt-wrappers.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { BoolValue, BytesValue, DoubleValue, FloatValue, Int32Value, Int64Value, StringValue, UInt32Value, UInt64Value } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/wkt-wrappers.proto.
 * @deprecated
 */
export declare const fileDesc_extra_wkt_wrappers: GenDescFile;

/**
 * @generated from message spec.WrappersMessage
 * @deprecated
 */
export declare type WrappersMessage = Message<"spec.WrappersMessage"> & {
  /**
   * @generated from field: google.protobuf.DoubleValue double_value_field = 1;
   */
  doubleValueField?: number;

  /**
   * @generated from field: google.protobuf.BoolValue bool_value_field = 2;
   */
  boolValueField?: boolean;

  /**
   * @generated from field: google.protobuf.FloatValue float_value_field = 3;
   */
  floatValueField?: number;

  /**
   * @generated from field: google.protobuf.Int64Value int64_value_field = 4;
   */
  int64ValueField?: bigint;

  /**
   * @generated from field: google.protobuf.UInt64Value uint64_value_field = 5;
   */
  uint64ValueField?: bigint;

  /**
   * @generated from field: google.protobuf.Int32Value int32_value_field = 6;
   */
  int32ValueField?: number;

  /**
   * @generated from field: google.protobuf.UInt32Value uint32_value_field = 7;
   */
  uint32ValueField?: number;

  /**
   * @generated from field: google.protobuf.StringValue string_value_field = 8;
   */
  stringValueField?: string;

  /**
   * @generated from field: google.protobuf.BytesValue bytes_value_field = 9;
   */
  bytesValueField?: Uint8Array;

  /**
   * @generated from oneof spec.WrappersMessage.oneof_fields
   * @deprecated
   */
  oneofFields: {
    /**
     * @generated from field: google.protobuf.DoubleValue oneof_double_value_field = 11;
     */
    value: DoubleValue;
    case: "oneofDoubleValueField";
  } | {
    /**
     * @generated from field: google.protobuf.BoolValue oneof_bool_value_field = 12;
     */
    value: BoolValue;
    case: "oneofBoolValueField";
  } | {
    /**
     * @generated from field: google.protobuf.FloatValue oneof_float_value_field = 13;
     */
    value: FloatValue;
    case: "oneofFloatValueField";
  } | {
    /**
     * @generated from field: google.protobuf.Int64Value oneof_int64_value_field = 14;
     */
    value: Int64Value;
    case: "oneofInt64ValueField";
  } | {
    /**
     * @generated from field: google.protobuf.UInt64Value oneof_uint64_value_field = 15;
     */
    value: UInt64Value;
    case: "oneofUint64ValueField";
  } | {
    /**
     * @generated from field: google.protobuf.Int32Value oneof_int32_value_field = 16;
     */
    value: Int32Value;
    case: "oneofInt32ValueField";
  } | {
    /**
     * @generated from field: google.protobuf.UInt32Value oneof_uint32_value_field = 17;
     */
    value: UInt32Value;
    case: "oneofUint32ValueField";
  } | {
    /**
     * @generated from field: google.protobuf.StringValue oneof_string_value_field = 18;
     */
    value: StringValue;
    case: "oneofStringValueField";
  } | {
    /**
     * @generated from field: google.protobuf.BytesValue oneof_bytes_value_field = 19;
     */
    value: BytesValue;
    case: "oneofBytesValueField";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: repeated google.protobuf.DoubleValue repeated_double_value_field = 21;
   */
  repeatedDoubleValueField: DoubleValue[];

  /**
   * @generated from field: repeated google.protobuf.BoolValue repeated_bool_value_field = 22;
   */
  repeatedBoolValueField: BoolValue[];

  /**
   * @generated from field: repeated google.protobuf.FloatValue repeated_float_value_field = 23;
   */
  repeatedFloatValueField: FloatValue[];

  /**
   * @generated from field: repeated google.protobuf.Int64Value repeated_int64_value_field = 24;
   */
  repeatedInt64ValueField: Int64Value[];

  /**
   * @generated from field: repeated google.protobuf.UInt64Value repeated_uint64_value_field = 25;
   */
  repeatedUint64ValueField: UInt64Value[];

  /**
   * @generated from field: repeated google.protobuf.Int32Value repeated_int32_value_field = 26;
   */
  repeatedInt32ValueField: Int32Value[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_uint32_value_field = 27;
   */
  repeatedUint32ValueField: UInt32Value[];

  /**
   * @generated from field: repeated google.protobuf.StringValue repeated_string_value_field = 28;
   */
  repeatedStringValueField: StringValue[];

  /**
   * @generated from field: repeated google.protobuf.BytesValue repeated_bytes_value_field = 29;
   */
  repeatedBytesValueField: BytesValue[];

  /**
   * @generated from field: map<string, google.protobuf.DoubleValue> map_double_value_field = 31;
   */
  mapDoubleValueField: { [key: string]: DoubleValue };

  /**
   * @generated from field: map<string, google.protobuf.BoolValue> map_bool_value_field = 32;
   */
  mapBoolValueField: { [key: string]: BoolValue };

  /**
   * @generated from field: map<string, google.protobuf.FloatValue> map_float_value_field = 33;
   */
  mapFloatValueField: { [key: string]: FloatValue };

  /**
   * @generated from field: map<string, google.protobuf.Int64Value> map_int64_value_field = 34;
   */
  mapInt64ValueField: { [key: string]: Int64Value };

  /**
   * @generated from field: map<string, google.protobuf.UInt64Value> map_uint64_value_field = 35;
   */
  mapUint64ValueField: { [key: string]: UInt64Value };

  /**
   * @generated from field: map<string, google.protobuf.Int32Value> map_int32_value_field = 36;
   */
  mapInt32ValueField: { [key: string]: Int32Value };

  /**
   * @generated from field: map<string, google.protobuf.UInt32Value> map_uint32_value_field = 37;
   */
  mapUint32ValueField: { [key: string]: UInt32Value };

  /**
   * @generated from field: map<string, google.protobuf.StringValue> map_string_value_field = 38;
   */
  mapStringValueField: { [key: string]: StringValue };

  /**
   * @generated from field: map<string, google.protobuf.BytesValue> map_bytes_value_field = 39;
   */
  mapBytesValueField: { [key: string]: BytesValue };
};

/**
 * Describes the message spec.WrappersMessage.
 * Use `create(WrappersMessageDesc)` to create a new message.
 * @deprecated
 */
export declare const WrappersMessageDesc: GenDescMessage<WrappersMessage>;

