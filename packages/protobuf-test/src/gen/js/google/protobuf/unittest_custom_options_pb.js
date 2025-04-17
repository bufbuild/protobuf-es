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

// Author: benjy@google.com (Benjy Weinberger)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file used to test the "custom options" feature of google.protobuf.

// @generated by protoc-gen-es v1.10.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_custom_options.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.

import { Any, EnumOptions, EnumValueOptions, FieldOptions, FileOptions, MessageOptions, MethodOptions, OneofOptions, proto2, ServiceOptions } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest.MethodOpt1
 */
export const MethodOpt1 = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.MethodOpt1",
  [
    {no: 1, name: "METHODOPT1_VAL1"},
    {no: 2, name: "METHODOPT1_VAL2"},
  ],
);

/**
 * @generated from enum protobuf_unittest.AggregateEnum
 */
export const AggregateEnum = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.AggregateEnum",
  [
    {no: 1, name: "VALUE"},
  ],
);

/**
 * A test message with custom options at all possible locations (and also some
 * regular options, to make sure they interact nicely).
 *
 * @generated from message protobuf_unittest.TestMessageWithCustomOptions
 */
export const TestMessageWithCustomOptions = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.TestMessageWithCustomOptions",
  () => [
    { no: 1, name: "field1", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "oneof_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "AnOneof" },
    { no: 3, name: "map_field", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ],
);

/**
 * @generated from enum protobuf_unittest.TestMessageWithCustomOptions.AnEnum
 */
export const TestMessageWithCustomOptions_AnEnum = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.TestMessageWithCustomOptions.AnEnum",
  [
    {no: 1, name: "ANENUM_VAL1"},
    {no: 2, name: "ANENUM_VAL2"},
  ],
);

/**
 * A test RPC service with custom options at all possible locations (and also
 * some regular options, to make sure they interact nicely).
 *
 * @generated from message protobuf_unittest.CustomOptionFooRequest
 */
export const CustomOptionFooRequest = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.CustomOptionFooRequest",
  [],
);

/**
 * @generated from message protobuf_unittest.CustomOptionFooResponse
 */
export const CustomOptionFooResponse = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.CustomOptionFooResponse",
  [],
);

/**
 * @generated from message protobuf_unittest.CustomOptionFooClientMessage
 */
export const CustomOptionFooClientMessage = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.CustomOptionFooClientMessage",
  [],
);

/**
 * @generated from message protobuf_unittest.CustomOptionFooServerMessage
 */
export const CustomOptionFooServerMessage = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.CustomOptionFooServerMessage",
  [],
);

/**
 * @generated from message protobuf_unittest.DummyMessageContainingEnum
 */
export const DummyMessageContainingEnum = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.DummyMessageContainingEnum",
  [],
);

/**
 * @generated from enum protobuf_unittest.DummyMessageContainingEnum.TestEnumType
 */
export const DummyMessageContainingEnum_TestEnumType = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.DummyMessageContainingEnum.TestEnumType",
  [
    {no: 22, name: "TEST_OPTION_ENUM_TYPE1"},
    {no: -23, name: "TEST_OPTION_ENUM_TYPE2"},
  ],
);

/**
 * @generated from message protobuf_unittest.DummyMessageInvalidAsOptionType
 */
export const DummyMessageInvalidAsOptionType = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.DummyMessageInvalidAsOptionType",
  [],
);

/**
 * @generated from message protobuf_unittest.CustomOptionMinIntegerValues
 */
export const CustomOptionMinIntegerValues = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.CustomOptionMinIntegerValues",
  [],
);

/**
 * @generated from message protobuf_unittest.CustomOptionMaxIntegerValues
 */
export const CustomOptionMaxIntegerValues = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.CustomOptionMaxIntegerValues",
  [],
);

/**
 * @generated from message protobuf_unittest.CustomOptionOtherValues
 */
export const CustomOptionOtherValues = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.CustomOptionOtherValues",
  [],
);

/**
 * @generated from message protobuf_unittest.SettingRealsFromPositiveInts
 */
export const SettingRealsFromPositiveInts = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.SettingRealsFromPositiveInts",
  [],
);

/**
 * @generated from message protobuf_unittest.SettingRealsFromNegativeInts
 */
export const SettingRealsFromNegativeInts = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.SettingRealsFromNegativeInts",
  [],
);

/**
 * @generated from message protobuf_unittest.ComplexOptionType1
 */
export const ComplexOptionType1 = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.ComplexOptionType1",
  () => [
    { no: 1, name: "foo", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "foo2", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 3, name: "foo3", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 4, name: "foo4", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ],
);

/**
 * @generated from message protobuf_unittest.ComplexOptionType2
 */
export const ComplexOptionType2 = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.ComplexOptionType2",
  () => [
    { no: 1, name: "bar", kind: "message", T: ComplexOptionType1, opt: true },
    { no: 2, name: "baz", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 3, name: "fred", kind: "message", T: ComplexOptionType2_ComplexOptionType4, opt: true },
    { no: 4, name: "barney", kind: "message", T: ComplexOptionType2_ComplexOptionType4, repeated: true },
  ],
);

/**
 * @generated from message protobuf_unittest.ComplexOptionType2.ComplexOptionType4
 */
export const ComplexOptionType2_ComplexOptionType4 = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.ComplexOptionType2.ComplexOptionType4",
  () => [
    { no: 1, name: "waldo", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
  {localName: "ComplexOptionType2_ComplexOptionType4"},
);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType2.ComplexOptionType4 complex_opt4 = 7633546;
 */
export const ComplexOptionType2_ComplexOptionType4_complex_opt4 = proto2.makeExtension(
  "protobuf_unittest.ComplexOptionType2.ComplexOptionType4.complex_opt4", 
  MessageOptions, 
  () => ({ no: 7633546, kind: "message", T: ComplexOptionType2_ComplexOptionType4, opt: true }),
);

/**
 * @generated from message protobuf_unittest.ComplexOptionType3
 */
export const ComplexOptionType3 = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.ComplexOptionType3",
  () => [
    { no: 1, name: "moo", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "complexoptiontype5", kind: "message", T: ComplexOptionType3_ComplexOptionType5, delimited: true, opt: true },
  ],
);

/**
 * @generated from message protobuf_unittest.ComplexOptionType3.ComplexOptionType5
 */
export const ComplexOptionType3_ComplexOptionType5 = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.ComplexOptionType3.ComplexOptionType5",
  () => [
    { no: 3, name: "plugh", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
  {localName: "ComplexOptionType3_ComplexOptionType5"},
);

/**
 * @generated from message protobuf_unittest.ComplexOpt6
 */
export const ComplexOpt6 = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.ComplexOpt6",
  () => [
    { no: 7593951, name: "xyzzy", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
);

/**
 * Note that we try various different ways of naming the same extension.
 *
 * @generated from message protobuf_unittest.VariousComplexOptions
 */
export const VariousComplexOptions = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.VariousComplexOptions",
  [],
);

/**
 * @generated from message protobuf_unittest.AggregateMessageSet
 */
export const AggregateMessageSet = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.AggregateMessageSet",
  [],
);

/**
 * @generated from message protobuf_unittest.AggregateMessageSetElement
 */
export const AggregateMessageSetElement = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.AggregateMessageSetElement",
  () => [
    { no: 1, name: "s", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

/**
 * @generated from extension: optional protobuf_unittest.AggregateMessageSetElement message_set_extension = 15447542;
 */
export const AggregateMessageSetElement_message_set_extension = proto2.makeExtension(
  "protobuf_unittest.AggregateMessageSetElement.message_set_extension", 
  AggregateMessageSet, 
  () => ({ no: 15447542, kind: "message", T: AggregateMessageSetElement, opt: true }),
);

/**
 * A helper type used to test aggregate option parsing
 *
 * @generated from message protobuf_unittest.Aggregate
 */
export const Aggregate = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.Aggregate",
  () => [
    { no: 1, name: "i", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "s", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "sub", kind: "message", T: Aggregate, opt: true },
    { no: 4, name: "file", kind: "message", T: FileOptions, opt: true },
    { no: 5, name: "mset", kind: "message", T: AggregateMessageSet, opt: true },
    { no: 6, name: "any", kind: "message", T: Any, opt: true },
  ],
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate nested = 15476903;
 */
export const Aggregate_nested = proto2.makeExtension(
  "protobuf_unittest.Aggregate.nested", 
  FileOptions, 
  () => ({ no: 15476903, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from message protobuf_unittest.AggregateMessage
 */
export const AggregateMessage = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.AggregateMessage",
  () => [
    { no: 1, name: "fieldname", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
);

/**
 * Test custom options for nested type.
 *
 * @generated from message protobuf_unittest.NestedOptionType
 */
export const NestedOptionType = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.NestedOptionType",
  [],
);

/**
 * @generated from enum protobuf_unittest.NestedOptionType.NestedEnum
 */
export const NestedOptionType_NestedEnum = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.NestedOptionType.NestedEnum",
  [
    {no: 1, name: "NESTED_ENUM_VALUE", localName: "VALUE"},
  ],
);

/**
 * @generated from message protobuf_unittest.NestedOptionType.NestedMessage
 */
export const NestedOptionType_NestedMessage = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.NestedOptionType.NestedMessage",
  () => [
    { no: 1, name: "nested_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
  {localName: "NestedOptionType_NestedMessage"},
);

/**
 * @generated from extension: optional int32 nested_extension = 7912573;
 */
export const NestedOptionType_nested_extension = proto2.makeExtension(
  "protobuf_unittest.NestedOptionType.nested_extension", 
  FileOptions, 
  { no: 7912573, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * Custom message option that has a required enum field.
 * WARNING: this is strongly discouraged!
 *
 * @generated from message protobuf_unittest.OldOptionType
 */
export const OldOptionType = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.OldOptionType",
  () => [
    { no: 1, name: "value", kind: "enum", T: proto2.getEnumType(OldOptionType_TestEnum), req: true },
  ],
);

/**
 * @generated from enum protobuf_unittest.OldOptionType.TestEnum
 */
export const OldOptionType_TestEnum = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.OldOptionType.TestEnum",
  [
    {no: 0, name: "OLD_VALUE"},
  ],
);

/**
 * Updated version of the custom option above.
 *
 * @generated from message protobuf_unittest.NewOptionType
 */
export const NewOptionType = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.NewOptionType",
  () => [
    { no: 1, name: "value", kind: "enum", T: proto2.getEnumType(NewOptionType_TestEnum), req: true },
  ],
);

/**
 * @generated from enum protobuf_unittest.NewOptionType.TestEnum
 */
export const NewOptionType_TestEnum = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.NewOptionType.TestEnum",
  [
    {no: 0, name: "OLD_VALUE"},
    {no: 1, name: "NEW_VALUE"},
  ],
);

/**
 * Test message using the "required_enum_opt" option defined above.
 *
 * @generated from message protobuf_unittest.TestMessageWithRequiredEnumOption
 */
export const TestMessageWithRequiredEnumOption = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.TestMessageWithRequiredEnumOption",
  [],
);

/**
 * @generated from extension: optional uint64 file_opt1 = 7736974;
 */
export const file_opt1 = proto2.makeExtension(
  "protobuf_unittest.file_opt1", 
  FileOptions, 
  { no: 7736974, kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
);

/**
 * @generated from extension: optional int32 message_opt1 = 7739036;
 */
export const message_opt1 = proto2.makeExtension(
  "protobuf_unittest.message_opt1", 
  MessageOptions, 
  { no: 7739036, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional fixed64 field_opt1 = 7740936;
 */
export const field_opt1 = proto2.makeExtension(
  "protobuf_unittest.field_opt1", 
  FieldOptions, 
  { no: 7740936, kind: "scalar", T: 6 /* ScalarType.FIXED64 */, opt: true },
);

/**
 * This is useful for testing that we correctly register default values for
 * extension options.
 *
 * @generated from extension: optional int32 field_opt2 = 7753913 [default = 42];
 */
export const field_opt2 = proto2.makeExtension(
  "protobuf_unittest.field_opt2", 
  FieldOptions, 
  { no: 7753913, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true, default: 42 },
);

/**
 * @generated from extension: optional int32 oneof_opt1 = 7740111;
 */
export const oneof_opt1 = proto2.makeExtension(
  "protobuf_unittest.oneof_opt1", 
  OneofOptions, 
  { no: 7740111, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional sfixed32 enum_opt1 = 7753576;
 */
export const enum_opt1 = proto2.makeExtension(
  "protobuf_unittest.enum_opt1", 
  EnumOptions, 
  { no: 7753576, kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, opt: true },
);

/**
 * @generated from extension: optional int32 enum_value_opt1 = 1560678;
 */
export const enum_value_opt1 = proto2.makeExtension(
  "protobuf_unittest.enum_value_opt1", 
  EnumValueOptions, 
  { no: 1560678, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional sint64 service_opt1 = 7887650;
 */
export const service_opt1 = proto2.makeExtension(
  "protobuf_unittest.service_opt1", 
  ServiceOptions, 
  { no: 7887650, kind: "scalar", T: 18 /* ScalarType.SINT64 */, opt: true },
);

/**
 * @generated from extension: optional protobuf_unittest.MethodOpt1 method_opt1 = 7890860;
 */
export const method_opt1 = proto2.makeExtension(
  "protobuf_unittest.method_opt1", 
  MethodOptions, 
  () => ({ no: 7890860, kind: "enum", T: proto2.getEnumType(MethodOpt1), opt: true }),
);

/**
 * @generated from extension: optional bool bool_opt = 7706090;
 */
export const bool_opt = proto2.makeExtension(
  "protobuf_unittest.bool_opt", 
  MessageOptions, 
  { no: 7706090, kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
);

/**
 * @generated from extension: optional int32 int32_opt = 7705709;
 */
export const int32_opt = proto2.makeExtension(
  "protobuf_unittest.int32_opt", 
  MessageOptions, 
  { no: 7705709, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional int64 int64_opt = 7705542;
 */
export const int64_opt = proto2.makeExtension(
  "protobuf_unittest.int64_opt", 
  MessageOptions, 
  { no: 7705542, kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
);

/**
 * @generated from extension: optional uint32 uint32_opt = 7704880;
 */
export const uint32_opt = proto2.makeExtension(
  "protobuf_unittest.uint32_opt", 
  MessageOptions, 
  { no: 7704880, kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
);

/**
 * @generated from extension: optional uint64 uint64_opt = 7702367;
 */
export const uint64_opt = proto2.makeExtension(
  "protobuf_unittest.uint64_opt", 
  MessageOptions, 
  { no: 7702367, kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
);

/**
 * @generated from extension: optional sint32 sint32_opt = 7701568;
 */
export const sint32_opt = proto2.makeExtension(
  "protobuf_unittest.sint32_opt", 
  MessageOptions, 
  { no: 7701568, kind: "scalar", T: 17 /* ScalarType.SINT32 */, opt: true },
);

/**
 * @generated from extension: optional sint64 sint64_opt = 7700863;
 */
export const sint64_opt = proto2.makeExtension(
  "protobuf_unittest.sint64_opt", 
  MessageOptions, 
  { no: 7700863, kind: "scalar", T: 18 /* ScalarType.SINT64 */, opt: true },
);

/**
 * @generated from extension: optional fixed32 fixed32_opt = 7700307;
 */
export const fixed32_opt = proto2.makeExtension(
  "protobuf_unittest.fixed32_opt", 
  MessageOptions, 
  { no: 7700307, kind: "scalar", T: 7 /* ScalarType.FIXED32 */, opt: true },
);

/**
 * @generated from extension: optional fixed64 fixed64_opt = 7700194;
 */
export const fixed64_opt = proto2.makeExtension(
  "protobuf_unittest.fixed64_opt", 
  MessageOptions, 
  { no: 7700194, kind: "scalar", T: 6 /* ScalarType.FIXED64 */, opt: true },
);

/**
 * @generated from extension: optional sfixed32 sfixed32_opt = 7698645;
 */
export const sfixed32_opt = proto2.makeExtension(
  "protobuf_unittest.sfixed32_opt", 
  MessageOptions, 
  { no: 7698645, kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, opt: true },
);

/**
 * @generated from extension: optional sfixed64 sfixed64_opt = 7685475;
 */
export const sfixed64_opt = proto2.makeExtension(
  "protobuf_unittest.sfixed64_opt", 
  MessageOptions, 
  { no: 7685475, kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, opt: true },
);

/**
 * @generated from extension: optional float float_opt = 7675390;
 */
export const float_opt = proto2.makeExtension(
  "protobuf_unittest.float_opt", 
  MessageOptions, 
  { no: 7675390, kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
);

/**
 * @generated from extension: optional double double_opt = 7673293;
 */
export const double_opt = proto2.makeExtension(
  "protobuf_unittest.double_opt", 
  MessageOptions, 
  { no: 7673293, kind: "scalar", T: 1 /* ScalarType.DOUBLE */, opt: true },
);

/**
 * @generated from extension: optional string string_opt = 7673285;
 */
export const string_opt = proto2.makeExtension(
  "protobuf_unittest.string_opt", 
  MessageOptions, 
  { no: 7673285, kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
);

/**
 * @generated from extension: optional bytes bytes_opt = 7673238;
 */
export const bytes_opt = proto2.makeExtension(
  "protobuf_unittest.bytes_opt", 
  MessageOptions, 
  { no: 7673238, kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true },
);

/**
 * @generated from extension: optional protobuf_unittest.DummyMessageContainingEnum.TestEnumType enum_opt = 7673233;
 */
export const enum_opt = proto2.makeExtension(
  "protobuf_unittest.enum_opt", 
  MessageOptions, 
  () => ({ no: 7673233, kind: "enum", T: proto2.getEnumType(DummyMessageContainingEnum_TestEnumType), opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.DummyMessageInvalidAsOptionType message_type_opt = 7665967;
 */
export const message_type_opt = proto2.makeExtension(
  "protobuf_unittest.message_type_opt", 
  MessageOptions, 
  () => ({ no: 7665967, kind: "message", T: DummyMessageInvalidAsOptionType, opt: true }),
);

/**
 * @generated from extension: optional int32 mooo = 7663707;
 */
export const mooo = proto2.makeExtension(
  "protobuf_unittest.mooo", 
  ComplexOptionType1, 
  { no: 7663707, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType3 corge = 7663442;
 */
export const corge = proto2.makeExtension(
  "protobuf_unittest.corge", 
  ComplexOptionType1, 
  () => ({ no: 7663442, kind: "message", T: ComplexOptionType3, opt: true }),
);

/**
 * @generated from extension: optional int32 grault = 7650927;
 */
export const grault = proto2.makeExtension(
  "protobuf_unittest.grault", 
  ComplexOptionType2, 
  { no: 7650927, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType1 garply = 7649992;
 */
export const garply = proto2.makeExtension(
  "protobuf_unittest.garply", 
  ComplexOptionType2, 
  () => ({ no: 7649992, kind: "message", T: ComplexOptionType1, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType1 complex_opt1 = 7646756;
 */
export const complex_opt1 = proto2.makeExtension(
  "protobuf_unittest.complex_opt1", 
  MessageOptions, 
  () => ({ no: 7646756, kind: "message", T: ComplexOptionType1, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType2 complex_opt2 = 7636949;
 */
export const complex_opt2 = proto2.makeExtension(
  "protobuf_unittest.complex_opt2", 
  MessageOptions, 
  () => ({ no: 7636949, kind: "message", T: ComplexOptionType2, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType3 complex_opt3 = 7636463;
 */
export const complex_opt3 = proto2.makeExtension(
  "protobuf_unittest.complex_opt3", 
  MessageOptions, 
  () => ({ no: 7636463, kind: "message", T: ComplexOptionType3, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOpt6 complexopt6 = 7595468;
 */
export const complexopt6 = proto2.makeExtension(
  "protobuf_unittest.complexopt6", 
  MessageOptions, 
  () => ({ no: 7595468, kind: "message", T: ComplexOpt6, delimited: true, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate fileopt = 15478479;
 */
export const fileopt = proto2.makeExtension(
  "protobuf_unittest.fileopt", 
  FileOptions, 
  () => ({ no: 15478479, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate msgopt = 15480088;
 */
export const msgopt = proto2.makeExtension(
  "protobuf_unittest.msgopt", 
  MessageOptions, 
  () => ({ no: 15480088, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate fieldopt = 15481374;
 */
export const fieldopt = proto2.makeExtension(
  "protobuf_unittest.fieldopt", 
  FieldOptions, 
  () => ({ no: 15481374, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate enumopt = 15483218;
 */
export const enumopt = proto2.makeExtension(
  "protobuf_unittest.enumopt", 
  EnumOptions, 
  () => ({ no: 15483218, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate enumvalopt = 15486921;
 */
export const enumvalopt = proto2.makeExtension(
  "protobuf_unittest.enumvalopt", 
  EnumValueOptions, 
  () => ({ no: 15486921, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate serviceopt = 15497145;
 */
export const serviceopt = proto2.makeExtension(
  "protobuf_unittest.serviceopt", 
  ServiceOptions, 
  () => ({ no: 15497145, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate methodopt = 15512713;
 */
export const methodopt = proto2.makeExtension(
  "protobuf_unittest.methodopt", 
  MethodOptions, 
  () => ({ no: 15512713, kind: "message", T: Aggregate, opt: true }),
);

/**
 * @generated from extension: optional protobuf_unittest.OldOptionType required_enum_opt = 106161807;
 */
export const required_enum_opt = proto2.makeExtension(
  "protobuf_unittest.required_enum_opt", 
  MessageOptions, 
  () => ({ no: 106161807, kind: "message", T: OldOptionType, opt: true }),
);

