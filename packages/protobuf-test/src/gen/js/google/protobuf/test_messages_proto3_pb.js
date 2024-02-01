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

// @generated by protoc-gen-es v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/test_messages_proto3.proto (package protobuf_test_messages.proto3, syntax proto3)
/* eslint-disable */

import { Any, BoolValue, BytesValue, DoubleValue, Duration, FieldMask, FloatValue, Int32Value, Int64Value, ListValue, NullValue, proto3, StringValue, Struct, Timestamp, UInt32Value, UInt64Value, Value } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_test_messages.proto3.ForeignEnum
 */
export const ForeignEnum = proto3.makeEnum(
  "protobuf_test_messages.proto3.ForeignEnum",
  [
    {no: 0, name: "FOREIGN_FOO"},
    {no: 1, name: "FOREIGN_BAR"},
    {no: 2, name: "FOREIGN_BAZ"},
  ],
);

/**
 * This proto includes every type of field in both singular and repeated
 * forms.
 *
 * Also, crucially, all messages and enums in this file are eventually
 * submessages of this message.  So for example, a fuzz test of TestAllTypes
 * could trigger bugs that occur in any message type in this file.  We verify
 * this stays true in a unit test.
 *
 * @generated from message protobuf_test_messages.proto3.TestAllTypesProto3
 */
export const TestAllTypesProto3 = proto3.makeMessageType(
  "protobuf_test_messages.proto3.TestAllTypesProto3",
  () => [
    { no: 1, name: "optional_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "optional_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "optional_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "optional_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "optional_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */ },
    { no: 6, name: "optional_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */ },
    { no: 7, name: "optional_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */ },
    { no: 8, name: "optional_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */ },
    { no: 9, name: "optional_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */ },
    { no: 10, name: "optional_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */ },
    { no: 11, name: "optional_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 12, name: "optional_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 13, name: "optional_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 14, name: "optional_string", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 15, name: "optional_bytes", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 18, name: "optional_nested_message", kind: "message", T: TestAllTypesProto3_NestedMessage },
    { no: 19, name: "optional_foreign_message", kind: "message", T: ForeignMessage },
    { no: 21, name: "optional_nested_enum", kind: "enum", T: proto3.getEnumType(TestAllTypesProto3_NestedEnum) },
    { no: 22, name: "optional_foreign_enum", kind: "enum", T: proto3.getEnumType(ForeignEnum) },
    { no: 23, name: "optional_aliased_enum", kind: "enum", T: proto3.getEnumType(TestAllTypesProto3_AliasedEnum) },
    { no: 24, name: "optional_string_piece", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 25, name: "optional_cord", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 27, name: "recursive_message", kind: "message", T: TestAllTypesProto3 },
    { no: 31, name: "repeated_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 32, name: "repeated_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 33, name: "repeated_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
    { no: 34, name: "repeated_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 35, name: "repeated_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true },
    { no: 36, name: "repeated_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 37, name: "repeated_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true },
    { no: 38, name: "repeated_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 39, name: "repeated_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true },
    { no: 40, name: "repeated_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 41, name: "repeated_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true },
    { no: 42, name: "repeated_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 43, name: "repeated_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true },
    { no: 44, name: "repeated_string", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 45, name: "repeated_bytes", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
    { no: 48, name: "repeated_nested_message", kind: "message", T: TestAllTypesProto3_NestedMessage, repeated: true },
    { no: 49, name: "repeated_foreign_message", kind: "message", T: ForeignMessage, repeated: true },
    { no: 51, name: "repeated_nested_enum", kind: "enum", T: proto3.getEnumType(TestAllTypesProto3_NestedEnum), repeated: true },
    { no: 52, name: "repeated_foreign_enum", kind: "enum", T: proto3.getEnumType(ForeignEnum), repeated: true },
    { no: 54, name: "repeated_string_piece", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 55, name: "repeated_cord", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 75, name: "packed_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 76, name: "packed_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 77, name: "packed_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
    { no: 78, name: "packed_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 79, name: "packed_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true },
    { no: 80, name: "packed_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 81, name: "packed_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true },
    { no: 82, name: "packed_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 83, name: "packed_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true },
    { no: 84, name: "packed_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 85, name: "packed_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true },
    { no: 86, name: "packed_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 87, name: "packed_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true },
    { no: 88, name: "packed_nested_enum", kind: "enum", T: proto3.getEnumType(TestAllTypesProto3_NestedEnum), repeated: true },
    { no: 89, name: "unpacked_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true, packed: false },
    { no: 90, name: "unpacked_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true, packed: false },
    { no: 91, name: "unpacked_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true, packed: false },
    { no: 92, name: "unpacked_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true, packed: false },
    { no: 93, name: "unpacked_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true, packed: false },
    { no: 94, name: "unpacked_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true, packed: false },
    { no: 95, name: "unpacked_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true, packed: false },
    { no: 96, name: "unpacked_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true, packed: false },
    { no: 97, name: "unpacked_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true, packed: false },
    { no: 98, name: "unpacked_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true, packed: false },
    { no: 99, name: "unpacked_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true, packed: false },
    { no: 100, name: "unpacked_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true, packed: false },
    { no: 101, name: "unpacked_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true, packed: false },
    { no: 102, name: "unpacked_nested_enum", kind: "enum", T: proto3.getEnumType(TestAllTypesProto3_NestedEnum), repeated: true, packed: false },
    { no: 56, name: "map_int32_int32", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 5 /* ScalarType.INT32 */} },
    { no: 57, name: "map_int64_int64", kind: "map", K: 3 /* ScalarType.INT64 */, V: {kind: "scalar", T: 3 /* ScalarType.INT64 */} },
    { no: 58, name: "map_uint32_uint32", kind: "map", K: 13 /* ScalarType.UINT32 */, V: {kind: "scalar", T: 13 /* ScalarType.UINT32 */} },
    { no: 59, name: "map_uint64_uint64", kind: "map", K: 4 /* ScalarType.UINT64 */, V: {kind: "scalar", T: 4 /* ScalarType.UINT64 */} },
    { no: 60, name: "map_sint32_sint32", kind: "map", K: 17 /* ScalarType.SINT32 */, V: {kind: "scalar", T: 17 /* ScalarType.SINT32 */} },
    { no: 61, name: "map_sint64_sint64", kind: "map", K: 18 /* ScalarType.SINT64 */, V: {kind: "scalar", T: 18 /* ScalarType.SINT64 */} },
    { no: 62, name: "map_fixed32_fixed32", kind: "map", K: 7 /* ScalarType.FIXED32 */, V: {kind: "scalar", T: 7 /* ScalarType.FIXED32 */} },
    { no: 63, name: "map_fixed64_fixed64", kind: "map", K: 6 /* ScalarType.FIXED64 */, V: {kind: "scalar", T: 6 /* ScalarType.FIXED64 */} },
    { no: 64, name: "map_sfixed32_sfixed32", kind: "map", K: 15 /* ScalarType.SFIXED32 */, V: {kind: "scalar", T: 15 /* ScalarType.SFIXED32 */} },
    { no: 65, name: "map_sfixed64_sfixed64", kind: "map", K: 16 /* ScalarType.SFIXED64 */, V: {kind: "scalar", T: 16 /* ScalarType.SFIXED64 */} },
    { no: 66, name: "map_int32_float", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 2 /* ScalarType.FLOAT */} },
    { no: 67, name: "map_int32_double", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "scalar", T: 1 /* ScalarType.DOUBLE */} },
    { no: 68, name: "map_bool_bool", kind: "map", K: 8 /* ScalarType.BOOL */, V: {kind: "scalar", T: 8 /* ScalarType.BOOL */} },
    { no: 69, name: "map_string_string", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 70, name: "map_string_bytes", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 12 /* ScalarType.BYTES */} },
    { no: 71, name: "map_string_nested_message", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: TestAllTypesProto3_NestedMessage} },
    { no: 72, name: "map_string_foreign_message", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: ForeignMessage} },
    { no: 73, name: "map_string_nested_enum", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "enum", T: proto3.getEnumType(TestAllTypesProto3_NestedEnum)} },
    { no: 74, name: "map_string_foreign_enum", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "enum", T: proto3.getEnumType(ForeignEnum)} },
    { no: 111, name: "oneof_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, oneof: "oneof_field" },
    { no: 112, name: "oneof_nested_message", kind: "message", T: TestAllTypesProto3_NestedMessage, oneof: "oneof_field" },
    { no: 113, name: "oneof_string", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "oneof_field" },
    { no: 114, name: "oneof_bytes", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "oneof_field" },
    { no: 115, name: "oneof_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */, oneof: "oneof_field" },
    { no: 116, name: "oneof_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */, oneof: "oneof_field" },
    { no: 117, name: "oneof_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */, oneof: "oneof_field" },
    { no: 118, name: "oneof_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, oneof: "oneof_field" },
    { no: 119, name: "oneof_enum", kind: "enum", T: proto3.getEnumType(TestAllTypesProto3_NestedEnum), oneof: "oneof_field" },
    { no: 120, name: "oneof_null_value", kind: "enum", T: proto3.getEnumType(NullValue), oneof: "oneof_field" },
    { no: 201, name: "optional_bool_wrapper", kind: "message", T: BoolValue },
    { no: 202, name: "optional_int32_wrapper", kind: "message", T: Int32Value },
    { no: 203, name: "optional_int64_wrapper", kind: "message", T: Int64Value },
    { no: 204, name: "optional_uint32_wrapper", kind: "message", T: UInt32Value },
    { no: 205, name: "optional_uint64_wrapper", kind: "message", T: UInt64Value },
    { no: 206, name: "optional_float_wrapper", kind: "message", T: FloatValue },
    { no: 207, name: "optional_double_wrapper", kind: "message", T: DoubleValue },
    { no: 208, name: "optional_string_wrapper", kind: "message", T: StringValue },
    { no: 209, name: "optional_bytes_wrapper", kind: "message", T: BytesValue },
    { no: 211, name: "repeated_bool_wrapper", kind: "message", T: BoolValue, repeated: true },
    { no: 212, name: "repeated_int32_wrapper", kind: "message", T: Int32Value, repeated: true },
    { no: 213, name: "repeated_int64_wrapper", kind: "message", T: Int64Value, repeated: true },
    { no: 214, name: "repeated_uint32_wrapper", kind: "message", T: UInt32Value, repeated: true },
    { no: 215, name: "repeated_uint64_wrapper", kind: "message", T: UInt64Value, repeated: true },
    { no: 216, name: "repeated_float_wrapper", kind: "message", T: FloatValue, repeated: true },
    { no: 217, name: "repeated_double_wrapper", kind: "message", T: DoubleValue, repeated: true },
    { no: 218, name: "repeated_string_wrapper", kind: "message", T: StringValue, repeated: true },
    { no: 219, name: "repeated_bytes_wrapper", kind: "message", T: BytesValue, repeated: true },
    { no: 301, name: "optional_duration", kind: "message", T: Duration },
    { no: 302, name: "optional_timestamp", kind: "message", T: Timestamp },
    { no: 303, name: "optional_field_mask", kind: "message", T: FieldMask },
    { no: 304, name: "optional_struct", kind: "message", T: Struct },
    { no: 305, name: "optional_any", kind: "message", T: Any },
    { no: 306, name: "optional_value", kind: "message", T: Value },
    { no: 307, name: "optional_null_value", kind: "enum", T: proto3.getEnumType(NullValue) },
    { no: 311, name: "repeated_duration", kind: "message", T: Duration, repeated: true },
    { no: 312, name: "repeated_timestamp", kind: "message", T: Timestamp, repeated: true },
    { no: 313, name: "repeated_fieldmask", kind: "message", T: FieldMask, repeated: true },
    { no: 324, name: "repeated_struct", kind: "message", T: Struct, repeated: true },
    { no: 315, name: "repeated_any", kind: "message", T: Any, repeated: true },
    { no: 316, name: "repeated_value", kind: "message", T: Value, repeated: true },
    { no: 317, name: "repeated_list_value", kind: "message", T: ListValue, repeated: true },
    { no: 401, name: "fieldname1", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 402, name: "field_name2", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 403, name: "_field_name3", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 404, name: "field__name4_", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 405, name: "field0name5", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 406, name: "field_0_name6", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 407, name: "fieldName7", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 408, name: "FieldName8", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 409, name: "field_Name9", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 410, name: "Field_Name10", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 411, name: "FIELD_NAME11", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 412, name: "FIELD_name12", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 413, name: "__field_name13", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 414, name: "__Field_name14", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 415, name: "field__name15", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 416, name: "field__Name16", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 417, name: "field_name17__", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 418, name: "Field_name18__", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from enum protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum
 */
export const TestAllTypesProto3_NestedEnum = proto3.makeEnum(
  "protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum",
  [
    {no: 0, name: "FOO"},
    {no: 1, name: "BAR"},
    {no: 2, name: "BAZ"},
    {no: -1, name: "NEG"},
  ],
);

/**
 * @generated from enum protobuf_test_messages.proto3.TestAllTypesProto3.AliasedEnum
 */
export const TestAllTypesProto3_AliasedEnum = proto3.makeEnum(
  "protobuf_test_messages.proto3.TestAllTypesProto3.AliasedEnum",
  [
    {no: 0, name: "ALIAS_FOO"},
    {no: 1, name: "ALIAS_BAR"},
    {no: 2, name: "ALIAS_BAZ"},
    {no: 2, name: "MOO"},
    {no: 2, name: "moo"},
    {no: 2, name: "bAz"},
  ],
);

/**
 * @generated from message protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage
 */
export const TestAllTypesProto3_NestedMessage = proto3.makeMessageType(
  "protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage",
  () => [
    { no: 1, name: "a", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "corecursive", kind: "message", T: TestAllTypesProto3 },
  ],
  {localName: "TestAllTypesProto3_NestedMessage"},
);

/**
 * @generated from message protobuf_test_messages.proto3.ForeignMessage
 */
export const ForeignMessage = proto3.makeMessageType(
  "protobuf_test_messages.proto3.ForeignMessage",
  () => [
    { no: 1, name: "c", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from message protobuf_test_messages.proto3.NullHypothesisProto3
 */
export const NullHypothesisProto3 = proto3.makeMessageType(
  "protobuf_test_messages.proto3.NullHypothesisProto3",
  [],
);

/**
 * @generated from message protobuf_test_messages.proto3.EnumOnlyProto3
 */
export const EnumOnlyProto3 = proto3.makeMessageType(
  "protobuf_test_messages.proto3.EnumOnlyProto3",
  [],
);

/**
 * @generated from enum protobuf_test_messages.proto3.EnumOnlyProto3.Bool
 */
export const EnumOnlyProto3_Bool = proto3.makeEnum(
  "protobuf_test_messages.proto3.EnumOnlyProto3.Bool",
  [
    {no: 0, name: "kFalse"},
    {no: 1, name: "kTrue"},
  ],
);

