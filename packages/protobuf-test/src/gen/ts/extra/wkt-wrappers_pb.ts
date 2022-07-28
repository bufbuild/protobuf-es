// Copyright 2021-2022 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v0.0.10 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/wkt-wrappers.proto (package spec, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {BoolValue, BytesValue, DoubleValue, FloatValue, Int32Value, Int64Value, Message, proto3, StringValue, UInt32Value, UInt64Value} from "@bufbuild/protobuf";

/**
 * @generated from message spec.WrappersMessage
 */
export class WrappersMessage extends Message<WrappersMessage> {
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
  } | { case: undefined; value?: undefined } = { case: undefined };

  /**
   * @generated from field: repeated google.protobuf.DoubleValue repeated_double_value_field = 21;
   */
  repeatedDoubleValueField: DoubleValue[] = [];

  /**
   * @generated from field: repeated google.protobuf.BoolValue repeated_bool_value_field = 22;
   */
  repeatedBoolValueField: BoolValue[] = [];

  /**
   * @generated from field: repeated google.protobuf.FloatValue repeated_float_value_field = 23;
   */
  repeatedFloatValueField: FloatValue[] = [];

  /**
   * @generated from field: repeated google.protobuf.Int64Value repeated_int64_value_field = 24;
   */
  repeatedInt64ValueField: Int64Value[] = [];

  /**
   * @generated from field: repeated google.protobuf.UInt64Value repeated_uint64_value_field = 25;
   */
  repeatedUint64ValueField: UInt64Value[] = [];

  /**
   * @generated from field: repeated google.protobuf.Int32Value repeated_int32_value_field = 26;
   */
  repeatedInt32ValueField: Int32Value[] = [];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_uint32_value_field = 27;
   */
  repeatedUint32ValueField: UInt32Value[] = [];

  /**
   * @generated from field: repeated google.protobuf.StringValue repeated_string_value_field = 28;
   */
  repeatedStringValueField: StringValue[] = [];

  /**
   * @generated from field: repeated google.protobuf.BytesValue repeated_bytes_value_field = 29;
   */
  repeatedBytesValueField: BytesValue[] = [];

  constructor(data?: PartialMessage<WrappersMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.WrappersMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "double_value_field", kind: "message", T: DoubleValue },
    { no: 2, name: "bool_value_field", kind: "message", T: BoolValue },
    { no: 3, name: "float_value_field", kind: "message", T: FloatValue },
    { no: 4, name: "int64_value_field", kind: "message", T: Int64Value },
    { no: 5, name: "uint64_value_field", kind: "message", T: UInt64Value },
    { no: 6, name: "int32_value_field", kind: "message", T: Int32Value },
    { no: 7, name: "uint32_value_field", kind: "message", T: UInt32Value },
    { no: 8, name: "string_value_field", kind: "message", T: StringValue },
    { no: 9, name: "bytes_value_field", kind: "message", T: BytesValue },
    { no: 11, name: "oneof_double_value_field", kind: "message", T: DoubleValue, oneof: "oneof_fields" },
    { no: 12, name: "oneof_bool_value_field", kind: "message", T: BoolValue, oneof: "oneof_fields" },
    { no: 13, name: "oneof_float_value_field", kind: "message", T: FloatValue, oneof: "oneof_fields" },
    { no: 14, name: "oneof_int64_value_field", kind: "message", T: Int64Value, oneof: "oneof_fields" },
    { no: 15, name: "oneof_uint64_value_field", kind: "message", T: UInt64Value, oneof: "oneof_fields" },
    { no: 16, name: "oneof_int32_value_field", kind: "message", T: Int32Value, oneof: "oneof_fields" },
    { no: 17, name: "oneof_uint32_value_field", kind: "message", T: UInt32Value, oneof: "oneof_fields" },
    { no: 18, name: "oneof_string_value_field", kind: "message", T: StringValue, oneof: "oneof_fields" },
    { no: 19, name: "oneof_bytes_value_field", kind: "message", T: BytesValue, oneof: "oneof_fields" },
    { no: 21, name: "repeated_double_value_field", kind: "message", T: DoubleValue, repeated: true },
    { no: 22, name: "repeated_bool_value_field", kind: "message", T: BoolValue, repeated: true },
    { no: 23, name: "repeated_float_value_field", kind: "message", T: FloatValue, repeated: true },
    { no: 24, name: "repeated_int64_value_field", kind: "message", T: Int64Value, repeated: true },
    { no: 25, name: "repeated_uint64_value_field", kind: "message", T: UInt64Value, repeated: true },
    { no: 26, name: "repeated_int32_value_field", kind: "message", T: Int32Value, repeated: true },
    { no: 27, name: "repeated_uint32_value_field", kind: "message", T: UInt32Value, repeated: true },
    { no: 28, name: "repeated_string_value_field", kind: "message", T: StringValue, repeated: true },
    { no: 29, name: "repeated_bytes_value_field", kind: "message", T: BytesValue, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WrappersMessage {
    return new WrappersMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WrappersMessage {
    return new WrappersMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WrappersMessage {
    return new WrappersMessage().fromJsonString(jsonString, options);
  }

  static equals(a: WrappersMessage | PlainMessage<WrappersMessage> | undefined, b: WrappersMessage | PlainMessage<WrappersMessage> | undefined): boolean {
    return proto3.util.equals(WrappersMessage, a, b);
  }
}

