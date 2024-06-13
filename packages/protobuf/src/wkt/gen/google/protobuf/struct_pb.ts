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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "bootstrap_wkt=true,target=ts,import_extension=.js"
// @generated from file google/protobuf/struct.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "../../../../codegenv1/types.js";
import { fileDesc } from "../../../../codegenv1/file.js";
import type { Message } from "../../../../types.js";
import type { JsonObject, JsonValue } from "../../../../json-value.js";
import { messageDesc } from "../../../../codegenv1/message.js";
import { enumDesc } from "../../../../codegenv1/enum.js";

/**
 * Describes the file google/protobuf/struct.proto.
 */
export const fileDesc_google_protobuf_struct: GenDescFile = /*@__PURE__*/
  fileDesc("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");

/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 *
 * @generated from message google.protobuf.Struct
 */
export type Struct = Message<"google.protobuf.Struct"> & {
  /**
   * Unordered map of dynamically typed values.
   *
   * @generated from field: map<string, google.protobuf.Value> fields = 1;
   */
  fields: { [key: string]: Value };
};

/**
 * JSON type for the message google.protobuf.Struct.
 */
export type StructJson = JsonObject;

/**
 * Describes the message google.protobuf.Struct.
 * Use `create(StructDesc)` to create a new message.
 */
export const StructDesc: GenDescMessage<Struct, StructJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_struct, 0);

/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 *
 * @generated from message google.protobuf.Value
 */
export type Value = Message<"google.protobuf.Value"> & {
  /**
   * The kind of value.
   *
   * @generated from oneof google.protobuf.Value.kind
   */
  kind: {
    /**
     * Represents a null value.
     *
     * @generated from field: google.protobuf.NullValue null_value = 1;
     */
    value: NullValue;
    case: "nullValue";
  } | {
    /**
     * Represents a double value.
     *
     * @generated from field: double number_value = 2;
     */
    value: number;
    case: "numberValue";
  } | {
    /**
     * Represents a string value.
     *
     * @generated from field: string string_value = 3;
     */
    value: string;
    case: "stringValue";
  } | {
    /**
     * Represents a boolean value.
     *
     * @generated from field: bool bool_value = 4;
     */
    value: boolean;
    case: "boolValue";
  } | {
    /**
     * Represents a structured value.
     *
     * @generated from field: google.protobuf.Struct struct_value = 5;
     */
    value: Struct;
    case: "structValue";
  } | {
    /**
     * Represents a repeated `Value`.
     *
     * @generated from field: google.protobuf.ListValue list_value = 6;
     */
    value: ListValue;
    case: "listValue";
  } | { case: undefined; value?: undefined };
};

/**
 * JSON type for the message google.protobuf.Value.
 */
export type ValueJson = JsonValue;

/**
 * Describes the message google.protobuf.Value.
 * Use `create(ValueDesc)` to create a new message.
 */
export const ValueDesc: GenDescMessage<Value, ValueJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_struct, 1);

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 *
 * @generated from message google.protobuf.ListValue
 */
export type ListValue = Message<"google.protobuf.ListValue"> & {
  /**
   * Repeated field of dynamically typed values.
   *
   * @generated from field: repeated google.protobuf.Value values = 1;
   */
  values: Value[];
};

/**
 * JSON type for the message google.protobuf.ListValue.
 */
export type ListValueJson = JsonValue[];

/**
 * Describes the message google.protobuf.ListValue.
 * Use `create(ListValueDesc)` to create a new message.
 */
export const ListValueDesc: GenDescMessage<ListValue, ListValueJson> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_struct, 2);

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 * The JSON representation for `NullValue` is JSON `null`.
 *
 * @generated from enum google.protobuf.NullValue
 */
export enum NullValue {
  /**
   * Null value.
   *
   * @generated from enum value: NULL_VALUE = 0;
   */
  NULL_VALUE = 0,
}

/**
 * JSON type for the enum google.protobuf.NullValue.
 */
export type NullValueJson = null;

/**
 * Describes the enum google.protobuf.NullValue.
 */
export const NullValueDesc: GenDescEnum<NullValue, NullValueJson> = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_struct, 0);

