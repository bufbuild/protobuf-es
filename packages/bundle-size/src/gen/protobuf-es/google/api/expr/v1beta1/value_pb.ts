// Copyright 2021-2025 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts"
// @generated from file google/api/expr/v1beta1/value.proto (package google.api.expr.v1beta1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Any, NullValue } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_any, file_google_protobuf_struct } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/api/expr/v1beta1/value.proto.
 */
export const file_google_api_expr_v1beta1_value: GenFile = /*@__PURE__*/
  fileDesc("CiNnb29nbGUvYXBpL2V4cHIvdjFiZXRhMS92YWx1ZS5wcm90bxIXZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEivQMKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFAoKYm9vbF92YWx1ZRgCIAEoCEgAEhUKC2ludDY0X3ZhbHVlGAMgASgDSAASFgoMdWludDY0X3ZhbHVlGAQgASgESAASFgoMZG91YmxlX3ZhbHVlGAUgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAYgASgJSAASFQoLYnl0ZXNfdmFsdWUYByABKAxIABI4CgplbnVtX3ZhbHVlGAkgASgLMiIuZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuRW51bVZhbHVlSAASLAoMb2JqZWN0X3ZhbHVlGAogASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueUgAEjYKCW1hcF92YWx1ZRgLIAEoCzIhLmdvb2dsZS5hcGkuZXhwci52MWJldGExLk1hcFZhbHVlSAASOAoKbGlzdF92YWx1ZRgMIAEoCzIiLmdvb2dsZS5hcGkuZXhwci52MWJldGExLkxpc3RWYWx1ZUgAEhQKCnR5cGVfdmFsdWUYDyABKAlIAEIGCgRraW5kIigKCUVudW1WYWx1ZRIMCgR0eXBlGAEgASgJEg0KBXZhbHVlGAIgASgFIjsKCUxpc3RWYWx1ZRIuCgZ2YWx1ZXMYASADKAsyHi5nb29nbGUuYXBpLmV4cHIudjFiZXRhMS5WYWx1ZSKpAQoITWFwVmFsdWUSOAoHZW50cmllcxgBIAMoCzInLmdvb2dsZS5hcGkuZXhwci52MWJldGExLk1hcFZhbHVlLkVudHJ5GmMKBUVudHJ5EisKA2tleRgBIAEoCzIeLmdvb2dsZS5hcGkuZXhwci52MWJldGExLlZhbHVlEi0KBXZhbHVlGAIgASgLMh4uZ29vZ2xlLmFwaS5leHByLnYxYmV0YTEuVmFsdWVCawobY29tLmdvb2dsZS5hcGkuZXhwci52MWJldGExQgpWYWx1ZVByb3RvUAFaO2dvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvYXBpL2V4cHIvdjFiZXRhMTtleHBy+AEBYgZwcm90bzM", [file_google_protobuf_any, file_google_protobuf_struct]);

/**
 * Represents a CEL value.
 *
 * This is similar to `google.protobuf.Value`, but can represent CEL's full
 * range of values.
 *
 * @generated from message google.api.expr.v1beta1.Value
 */
export type Value = Message<"google.api.expr.v1beta1.Value"> & {
  /**
   * Required. The valid kinds of values.
   *
   * @generated from oneof google.api.expr.v1beta1.Value.kind
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
     * @generated from field: google.api.expr.v1beta1.EnumValue enum_value = 9;
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
     * @generated from field: google.api.expr.v1beta1.MapValue map_value = 11;
     */
    value: MapValue;
    case: "mapValue";
  } | {
    /**
     * List value.
     *
     * @generated from field: google.api.expr.v1beta1.ListValue list_value = 12;
     */
    value: ListValue;
    case: "listValue";
  } | {
    /**
     * A Type value represented by the fully qualified name of the type.
     *
     * @generated from field: string type_value = 15;
     */
    value: string;
    case: "typeValue";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message google.api.expr.v1beta1.Value.
 * Use `create(ValueSchema)` to create a new message.
 */
export const ValueSchema: GenMessage<Value> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_value, 0);

/**
 * An enum value.
 *
 * @generated from message google.api.expr.v1beta1.EnumValue
 */
export type EnumValue = Message<"google.api.expr.v1beta1.EnumValue"> & {
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
 * Describes the message google.api.expr.v1beta1.EnumValue.
 * Use `create(EnumValueSchema)` to create a new message.
 */
export const EnumValueSchema: GenMessage<EnumValue> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_value, 1);

/**
 * A list.
 *
 * Wrapped in a message so 'not set' and empty can be differentiated, which is
 * required for use in a 'oneof'.
 *
 * @generated from message google.api.expr.v1beta1.ListValue
 */
export type ListValue = Message<"google.api.expr.v1beta1.ListValue"> & {
  /**
   * The ordered values in the list.
   *
   * @generated from field: repeated google.api.expr.v1beta1.Value values = 1;
   */
  values: Value[];
};

/**
 * Describes the message google.api.expr.v1beta1.ListValue.
 * Use `create(ListValueSchema)` to create a new message.
 */
export const ListValueSchema: GenMessage<ListValue> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_value, 2);

/**
 * A map.
 *
 * Wrapped in a message so 'not set' and empty can be differentiated, which is
 * required for use in a 'oneof'.
 *
 * @generated from message google.api.expr.v1beta1.MapValue
 */
export type MapValue = Message<"google.api.expr.v1beta1.MapValue"> & {
  /**
   * The set of map entries.
   *
   * CEL has fewer restrictions on keys, so a protobuf map represenation
   * cannot be used.
   *
   * @generated from field: repeated google.api.expr.v1beta1.MapValue.Entry entries = 1;
   */
  entries: MapValue_Entry[];
};

/**
 * Describes the message google.api.expr.v1beta1.MapValue.
 * Use `create(MapValueSchema)` to create a new message.
 */
export const MapValueSchema: GenMessage<MapValue> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_value, 3);

/**
 * An entry in the map.
 *
 * @generated from message google.api.expr.v1beta1.MapValue.Entry
 */
export type MapValue_Entry = Message<"google.api.expr.v1beta1.MapValue.Entry"> & {
  /**
   * The key.
   *
   * Must be unique with in the map.
   * Currently only boolean, int, uint, and string values can be keys.
   *
   * @generated from field: google.api.expr.v1beta1.Value key = 1;
   */
  key?: Value;

  /**
   * The value.
   *
   * @generated from field: google.api.expr.v1beta1.Value value = 2;
   */
  value?: Value;
};

/**
 * Describes the message google.api.expr.v1beta1.MapValue.Entry.
 * Use `create(MapValue_EntrySchema)` to create a new message.
 */
export const MapValue_EntrySchema: GenMessage<MapValue_Entry> = /*@__PURE__*/
  messageDesc(file_google_api_expr_v1beta1_value, 3, 0);

