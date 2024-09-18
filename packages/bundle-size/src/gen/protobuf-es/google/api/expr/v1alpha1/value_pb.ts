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

// @generated by protoc-gen-es v2.1.0 with parameter "target=ts"
// @generated from file google/api/expr/v1alpha1/value.proto (package google.api.expr.v1alpha1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Any, NullValue } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_any, file_google_protobuf_struct } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/expr/v1alpha1/value.proto.
 */
export const file_google_api_expr_v1alpha1_value: GenFile = /*@__PURE__*/
  fileDesc("CiRnb29nbGUvYXBpL2V4cHIvdjFhbHBoYTEvdmFsdWUucHJvdG8SGGdvb2dsZS5hcGkuZXhwci52MWFscGhhMSLAAwoFVmFsdWUSMAoKbnVsbF92YWx1ZRgBIAEoDjIaLmdvb2dsZS5wcm90b2J1Zi5OdWxsVmFsdWVIABIUCgpib29sX3ZhbHVlGAIgASgISAASFQoLaW50NjRfdmFsdWUYAyABKANIABIWCgx1aW50NjRfdmFsdWUYBCABKARIABIWCgxkb3VibGVfdmFsdWUYBSABKAFIABIWCgxzdHJpbmdfdmFsdWUYBiABKAlIABIVCgtieXRlc192YWx1ZRgHIAEoDEgAEjkKCmVudW1fdmFsdWUYCSABKAsyIy5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuRW51bVZhbHVlSAASLAoMb2JqZWN0X3ZhbHVlGAogASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueUgAEjcKCW1hcF92YWx1ZRgLIAEoCzIiLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5NYXBWYWx1ZUgAEjkKCmxpc3RfdmFsdWUYDCABKAsyIy5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuTGlzdFZhbHVlSAASFAoKdHlwZV92YWx1ZRgPIAEoCUgAQgYKBGtpbmQiKAoJRW51bVZhbHVlEgwKBHR5cGUYASABKAkSDQoFdmFsdWUYAiABKAUiPAoJTGlzdFZhbHVlEi8KBnZhbHVlcxgBIAMoCzIfLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5WYWx1ZSKsAQoITWFwVmFsdWUSOQoHZW50cmllcxgBIAMoCzIoLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMS5NYXBWYWx1ZS5FbnRyeRplCgVFbnRyeRIsCgNrZXkYASABKAsyHy5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuVmFsdWUSLgoFdmFsdWUYAiABKAsyHy5nb29nbGUuYXBpLmV4cHIudjFhbHBoYTEuVmFsdWVCbQocY29tLmdvb2dsZS5hcGkuZXhwci52MWFscGhhMUIKVmFsdWVQcm90b1ABWjxnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL2FwaS9leHByL3YxYWxwaGExO2V4cHL4AQFiBnByb3RvMw", [file_google_protobuf_any, file_google_protobuf_struct]);

/**
 * Represents a CEL value.
 *
 * This is similar to `google.protobuf.Value`, but can represent CEL's full
 * range of values.
 *
 * @generated from message google.api.expr.v1alpha1.Value
 */
export type Value = Message<"google.api.expr.v1alpha1.Value"> & {
  /**
   * Required. The valid kinds of values.
   *
   * @generated from oneof google.api.expr.v1alpha1.Value.kind
   */
  kind: {
    /**
     * Null value.
     *
     * @generated from field: google.protobuf.NullValue null_value = 1;
     */
    value: NullValue;
    case: "nullValue";
  } | {
    /**
     * Boolean value.
     *
     * @generated from field: bool bool_value = 2;
     */
    value: boolean;
    case: "boolValue";
  } | {
    /**
     * Signed integer value.
     *
     * @generated from field: int64 int64_value = 3;
     */
    value: bigint;
    case: "int64Value";
  } | {
    /**
     * Unsigned integer value.
     *
     * @generated from field: uint64 uint64_value = 4;
     */
    value: bigint;
    case: "uint64Value";
  } | {
    /**
     * Floating point value.
     *
     * @generated from field: double double_value = 5;
     */
    value: number;
    case: "doubleValue";
  } | {
    /**
     * UTF-8 string value.
     *
     * @generated from field: string string_value = 6;
     */
    value: string;
    case: "stringValue";
  } | {
    /**
     * Byte string value.
     *
     * @generated from field: bytes bytes_value = 7;
     */
    value: Uint8Array;
    case: "bytesValue";
  } | {
    /**
     * An enum value.
     *
     * @generated from field: google.api.expr.v1alpha1.EnumValue enum_value = 9;
     */
    value: EnumValue;
    case: "enumValue";
  } | {
    /**
     * The proto message backing an object value.
     *
     * @generated from field: google.protobuf.Any object_value = 10;
     */
    value: Any;
    case: "objectValue";
  } | {
    /**
     * Map value.
     *
     * @generated from field: google.api.expr.v1alpha1.MapValue map_value = 11;
     */
    value: MapValue;
    case: "mapValue";
  } | {
    /**
     * List value.
     *
     * @generated from field: google.api.expr.v1alpha1.ListValue list_value = 12;
     */
    value: ListValue;
    case: "listValue";
  } | {
    /**
     * Type value.
     *
     * @generated from field: string type_value = 15;
     */
    value: string;
    case: "typeValue";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message google.api.expr.v1alpha1.Value.
 * Use `create(ValueSchema)` to create a new message.
 */
export const ValueSchema: GenMessage<Value> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_value, 0);

/**
 * An enum value.
 *
 * @generated from message google.api.expr.v1alpha1.EnumValue
 */
export type EnumValue = Message<"google.api.expr.v1alpha1.EnumValue"> & {
  /**
   * The fully qualified name of the enum type.
   *
   * @generated from field: string type = 1;
   */
  type: string;

  /**
   * The value of the enum.
   *
   * @generated from field: int32 value = 2;
   */
  value: number;
};

/**
 * Describes the message google.api.expr.v1alpha1.EnumValue.
 * Use `create(EnumValueSchema)` to create a new message.
 */
export const EnumValueSchema: GenMessage<EnumValue> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_value, 1);

/**
 * A list.
 *
 * Wrapped in a message so 'not set' and empty can be differentiated, which is
 * required for use in a 'oneof'.
 *
 * @generated from message google.api.expr.v1alpha1.ListValue
 */
export type ListValue = Message<"google.api.expr.v1alpha1.ListValue"> & {
  /**
   * The ordered values in the list.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.Value values = 1;
   */
  values: Value[];
};

/**
 * Describes the message google.api.expr.v1alpha1.ListValue.
 * Use `create(ListValueSchema)` to create a new message.
 */
export const ListValueSchema: GenMessage<ListValue> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_value, 2);

/**
 * A map.
 *
 * Wrapped in a message so 'not set' and empty can be differentiated, which is
 * required for use in a 'oneof'.
 *
 * @generated from message google.api.expr.v1alpha1.MapValue
 */
export type MapValue = Message<"google.api.expr.v1alpha1.MapValue"> & {
  /**
   * The set of map entries.
   *
   * CEL has fewer restrictions on keys, so a protobuf map represenation
   * cannot be used.
   *
   * @generated from field: repeated google.api.expr.v1alpha1.MapValue.Entry entries = 1;
   */
  entries: MapValue_Entry[];
};

/**
 * Describes the message google.api.expr.v1alpha1.MapValue.
 * Use `create(MapValueSchema)` to create a new message.
 */
export const MapValueSchema: GenMessage<MapValue> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_value, 3);

/**
 * An entry in the map.
 *
 * @generated from message google.api.expr.v1alpha1.MapValue.Entry
 */
export type MapValue_Entry = Message<"google.api.expr.v1alpha1.MapValue.Entry"> & {
  /**
   * The key.
   *
   * Must be unique with in the map.
   * Currently only boolean, int, uint, and string values can be keys.
   *
   * @generated from field: google.api.expr.v1alpha1.Value key = 1;
   */
  key?: Value;

  /**
   * The value.
   *
   * @generated from field: google.api.expr.v1alpha1.Value value = 2;
   */
  value?: Value;
};

/**
 * Describes the message google.api.expr.v1alpha1.MapValue.Entry.
 * Use `create(MapValue_EntrySchema)` to create a new message.
 */
export const MapValue_EntrySchema: GenMessage<MapValue_Entry> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1alpha1_value, 3, 0);

