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

// @generated by protoc-gen-es v2.0.0-beta.1 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/unittest_custom_options.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.

import type { GenDescEnum, GenDescExtension, GenDescFile, GenDescMessage, GenDescService } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Any, EnumOptions, EnumValueOptions, FieldOptions, FileOptions, MessageOptions, MethodOptions, OneofOptions, ServiceOptions } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file google/protobuf/unittest_custom_options.proto.
 */
export declare const file_google_protobuf_unittest_custom_options: GenDescFile;

/**
 * A test message with custom options at all possible locations (and also some
 * regular options, to make sure they interact nicely).
 *
 * @generated from message protobuf_unittest.TestMessageWithCustomOptions
 */
export declare type TestMessageWithCustomOptions = Message<"protobuf_unittest.TestMessageWithCustomOptions"> & {
  /**
   * @generated from field: optional string field1 = 1;
   */
  field1: string;

  /**
   * @generated from oneof protobuf_unittest.TestMessageWithCustomOptions.AnOneof
   */
  AnOneof: {
    /**
     * @generated from field: int32 oneof_field = 2;
     */
    value: number;
    case: "oneofField";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: map<string, string> map_field = 3;
   */
  mapField: { [key: string]: string };
};

/**
 * Describes the message protobuf_unittest.TestMessageWithCustomOptions.
 * Use `create(TestMessageWithCustomOptionsSchema)` to create a new message.
 */
export declare const TestMessageWithCustomOptionsSchema: GenDescMessage<TestMessageWithCustomOptions>;

/**
 * @generated from enum protobuf_unittest.TestMessageWithCustomOptions.AnEnum
 */
export enum TestMessageWithCustomOptions_AnEnum {
  /**
   * @generated from enum value: ANENUM_VAL1 = 1;
   */
  ANENUM_VAL1 = 1,

  /**
   * @generated from enum value: ANENUM_VAL2 = 2;
   */
  ANENUM_VAL2 = 2,
}

/**
 * Describes the enum protobuf_unittest.TestMessageWithCustomOptions.AnEnum.
 */
export declare const TestMessageWithCustomOptions_AnEnumSchema: GenDescEnum<TestMessageWithCustomOptions_AnEnum>;

/**
 * A test RPC service with custom options at all possible locations (and also
 * some regular options, to make sure they interact nicely).
 *
 * @generated from message protobuf_unittest.CustomOptionFooRequest
 */
export declare type CustomOptionFooRequest = Message<"protobuf_unittest.CustomOptionFooRequest"> & {
};

/**
 * Describes the message protobuf_unittest.CustomOptionFooRequest.
 * Use `create(CustomOptionFooRequestSchema)` to create a new message.
 */
export declare const CustomOptionFooRequestSchema: GenDescMessage<CustomOptionFooRequest>;

/**
 * @generated from message protobuf_unittest.CustomOptionFooResponse
 */
export declare type CustomOptionFooResponse = Message<"protobuf_unittest.CustomOptionFooResponse"> & {
};

/**
 * Describes the message protobuf_unittest.CustomOptionFooResponse.
 * Use `create(CustomOptionFooResponseSchema)` to create a new message.
 */
export declare const CustomOptionFooResponseSchema: GenDescMessage<CustomOptionFooResponse>;

/**
 * @generated from message protobuf_unittest.CustomOptionFooClientMessage
 */
export declare type CustomOptionFooClientMessage = Message<"protobuf_unittest.CustomOptionFooClientMessage"> & {
};

/**
 * Describes the message protobuf_unittest.CustomOptionFooClientMessage.
 * Use `create(CustomOptionFooClientMessageSchema)` to create a new message.
 */
export declare const CustomOptionFooClientMessageSchema: GenDescMessage<CustomOptionFooClientMessage>;

/**
 * @generated from message protobuf_unittest.CustomOptionFooServerMessage
 */
export declare type CustomOptionFooServerMessage = Message<"protobuf_unittest.CustomOptionFooServerMessage"> & {
};

/**
 * Describes the message protobuf_unittest.CustomOptionFooServerMessage.
 * Use `create(CustomOptionFooServerMessageSchema)` to create a new message.
 */
export declare const CustomOptionFooServerMessageSchema: GenDescMessage<CustomOptionFooServerMessage>;

/**
 * @generated from message protobuf_unittest.DummyMessageContainingEnum
 */
export declare type DummyMessageContainingEnum = Message<"protobuf_unittest.DummyMessageContainingEnum"> & {
};

/**
 * Describes the message protobuf_unittest.DummyMessageContainingEnum.
 * Use `create(DummyMessageContainingEnumSchema)` to create a new message.
 */
export declare const DummyMessageContainingEnumSchema: GenDescMessage<DummyMessageContainingEnum>;

/**
 * @generated from enum protobuf_unittest.DummyMessageContainingEnum.TestEnumType
 */
export enum DummyMessageContainingEnum_TestEnumType {
  /**
   * @generated from enum value: TEST_OPTION_ENUM_TYPE1 = 22;
   */
  TEST_OPTION_ENUM_TYPE1 = 22,

  /**
   * @generated from enum value: TEST_OPTION_ENUM_TYPE2 = -23;
   */
  TEST_OPTION_ENUM_TYPE2 = -23,
}

/**
 * Describes the enum protobuf_unittest.DummyMessageContainingEnum.TestEnumType.
 */
export declare const DummyMessageContainingEnum_TestEnumTypeSchema: GenDescEnum<DummyMessageContainingEnum_TestEnumType>;

/**
 * @generated from message protobuf_unittest.DummyMessageInvalidAsOptionType
 */
export declare type DummyMessageInvalidAsOptionType = Message<"protobuf_unittest.DummyMessageInvalidAsOptionType"> & {
};

/**
 * Describes the message protobuf_unittest.DummyMessageInvalidAsOptionType.
 * Use `create(DummyMessageInvalidAsOptionTypeSchema)` to create a new message.
 */
export declare const DummyMessageInvalidAsOptionTypeSchema: GenDescMessage<DummyMessageInvalidAsOptionType>;

/**
 * @generated from message protobuf_unittest.CustomOptionMinIntegerValues
 */
export declare type CustomOptionMinIntegerValues = Message<"protobuf_unittest.CustomOptionMinIntegerValues"> & {
};

/**
 * Describes the message protobuf_unittest.CustomOptionMinIntegerValues.
 * Use `create(CustomOptionMinIntegerValuesSchema)` to create a new message.
 */
export declare const CustomOptionMinIntegerValuesSchema: GenDescMessage<CustomOptionMinIntegerValues>;

/**
 * @generated from message protobuf_unittest.CustomOptionMaxIntegerValues
 */
export declare type CustomOptionMaxIntegerValues = Message<"protobuf_unittest.CustomOptionMaxIntegerValues"> & {
};

/**
 * Describes the message protobuf_unittest.CustomOptionMaxIntegerValues.
 * Use `create(CustomOptionMaxIntegerValuesSchema)` to create a new message.
 */
export declare const CustomOptionMaxIntegerValuesSchema: GenDescMessage<CustomOptionMaxIntegerValues>;

/**
 * @generated from message protobuf_unittest.CustomOptionOtherValues
 */
export declare type CustomOptionOtherValues = Message<"protobuf_unittest.CustomOptionOtherValues"> & {
};

/**
 * Describes the message protobuf_unittest.CustomOptionOtherValues.
 * Use `create(CustomOptionOtherValuesSchema)` to create a new message.
 */
export declare const CustomOptionOtherValuesSchema: GenDescMessage<CustomOptionOtherValues>;

/**
 * @generated from message protobuf_unittest.SettingRealsFromPositiveInts
 */
export declare type SettingRealsFromPositiveInts = Message<"protobuf_unittest.SettingRealsFromPositiveInts"> & {
};

/**
 * Describes the message protobuf_unittest.SettingRealsFromPositiveInts.
 * Use `create(SettingRealsFromPositiveIntsSchema)` to create a new message.
 */
export declare const SettingRealsFromPositiveIntsSchema: GenDescMessage<SettingRealsFromPositiveInts>;

/**
 * @generated from message protobuf_unittest.SettingRealsFromNegativeInts
 */
export declare type SettingRealsFromNegativeInts = Message<"protobuf_unittest.SettingRealsFromNegativeInts"> & {
};

/**
 * Describes the message protobuf_unittest.SettingRealsFromNegativeInts.
 * Use `create(SettingRealsFromNegativeIntsSchema)` to create a new message.
 */
export declare const SettingRealsFromNegativeIntsSchema: GenDescMessage<SettingRealsFromNegativeInts>;

/**
 * @generated from message protobuf_unittest.ComplexOptionType1
 */
export declare type ComplexOptionType1 = Message<"protobuf_unittest.ComplexOptionType1"> & {
  /**
   * @generated from field: optional int32 foo = 1;
   */
  foo: number;

  /**
   * @generated from field: optional int32 foo2 = 2;
   */
  foo2: number;

  /**
   * @generated from field: optional int32 foo3 = 3;
   */
  foo3: number;

  /**
   * @generated from field: repeated int32 foo4 = 4;
   */
  foo4: number[];
};

/**
 * Describes the message protobuf_unittest.ComplexOptionType1.
 * Use `create(ComplexOptionType1Schema)` to create a new message.
 */
export declare const ComplexOptionType1Schema: GenDescMessage<ComplexOptionType1>;

/**
 * @generated from message protobuf_unittest.ComplexOptionType2
 */
export declare type ComplexOptionType2 = Message<"protobuf_unittest.ComplexOptionType2"> & {
  /**
   * @generated from field: optional protobuf_unittest.ComplexOptionType1 bar = 1;
   */
  bar?: ComplexOptionType1;

  /**
   * @generated from field: optional int32 baz = 2;
   */
  baz: number;

  /**
   * @generated from field: optional protobuf_unittest.ComplexOptionType2.ComplexOptionType4 fred = 3;
   */
  fred?: ComplexOptionType2_ComplexOptionType4;

  /**
   * @generated from field: repeated protobuf_unittest.ComplexOptionType2.ComplexOptionType4 barney = 4;
   */
  barney: ComplexOptionType2_ComplexOptionType4[];
};

/**
 * Describes the message protobuf_unittest.ComplexOptionType2.
 * Use `create(ComplexOptionType2Schema)` to create a new message.
 */
export declare const ComplexOptionType2Schema: GenDescMessage<ComplexOptionType2>;

/**
 * @generated from message protobuf_unittest.ComplexOptionType2.ComplexOptionType4
 */
export declare type ComplexOptionType2_ComplexOptionType4 = Message<"protobuf_unittest.ComplexOptionType2.ComplexOptionType4"> & {
  /**
   * @generated from field: optional int32 waldo = 1;
   */
  waldo: number;
};

/**
 * Describes the message protobuf_unittest.ComplexOptionType2.ComplexOptionType4.
 * Use `create(ComplexOptionType2_ComplexOptionType4Schema)` to create a new message.
 */
export declare const ComplexOptionType2_ComplexOptionType4Schema: GenDescMessage<ComplexOptionType2_ComplexOptionType4>;

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType2.ComplexOptionType4 complex_opt4 = 7633546;
 */
export declare const ComplexOptionType2_ComplexOptionType4_complex_opt4: GenDescExtension<MessageOptions, ComplexOptionType2_ComplexOptionType4>;

/**
 * @generated from message protobuf_unittest.ComplexOptionType3
 */
export declare type ComplexOptionType3 = Message<"protobuf_unittest.ComplexOptionType3"> & {
  /**
   * @generated from field: optional int32 moo = 1;
   */
  moo: number;

  /**
   * @generated from field: optional protobuf_unittest.ComplexOptionType3.ComplexOptionType5 complexoptiontype5 = 2;
   */
  complexoptiontype5?: ComplexOptionType3_ComplexOptionType5;
};

/**
 * Describes the message protobuf_unittest.ComplexOptionType3.
 * Use `create(ComplexOptionType3Schema)` to create a new message.
 */
export declare const ComplexOptionType3Schema: GenDescMessage<ComplexOptionType3>;

/**
 * @generated from message protobuf_unittest.ComplexOptionType3.ComplexOptionType5
 */
export declare type ComplexOptionType3_ComplexOptionType5 = Message<"protobuf_unittest.ComplexOptionType3.ComplexOptionType5"> & {
  /**
   * @generated from field: optional int32 plugh = 3;
   */
  plugh: number;
};

/**
 * Describes the message protobuf_unittest.ComplexOptionType3.ComplexOptionType5.
 * Use `create(ComplexOptionType3_ComplexOptionType5Schema)` to create a new message.
 */
export declare const ComplexOptionType3_ComplexOptionType5Schema: GenDescMessage<ComplexOptionType3_ComplexOptionType5>;

/**
 * @generated from message protobuf_unittest.ComplexOpt6
 */
export declare type ComplexOpt6 = Message<"protobuf_unittest.ComplexOpt6"> & {
  /**
   * @generated from field: optional int32 xyzzy = 7593951;
   */
  xyzzy: number;
};

/**
 * Describes the message protobuf_unittest.ComplexOpt6.
 * Use `create(ComplexOpt6Schema)` to create a new message.
 */
export declare const ComplexOpt6Schema: GenDescMessage<ComplexOpt6>;

/**
 * Note that we try various different ways of naming the same extension.
 *
 * @generated from message protobuf_unittest.VariousComplexOptions
 */
export declare type VariousComplexOptions = Message<"protobuf_unittest.VariousComplexOptions"> & {
};

/**
 * Describes the message protobuf_unittest.VariousComplexOptions.
 * Use `create(VariousComplexOptionsSchema)` to create a new message.
 */
export declare const VariousComplexOptionsSchema: GenDescMessage<VariousComplexOptions>;

/**
 * @generated from message protobuf_unittest.AggregateMessageSet
 */
export declare type AggregateMessageSet = Message<"protobuf_unittest.AggregateMessageSet"> & {
};

/**
 * Describes the message protobuf_unittest.AggregateMessageSet.
 * Use `create(AggregateMessageSetSchema)` to create a new message.
 */
export declare const AggregateMessageSetSchema: GenDescMessage<AggregateMessageSet>;

/**
 * @generated from message protobuf_unittest.AggregateMessageSetElement
 */
export declare type AggregateMessageSetElement = Message<"protobuf_unittest.AggregateMessageSetElement"> & {
  /**
   * @generated from field: optional string s = 1;
   */
  s: string;
};

/**
 * Describes the message protobuf_unittest.AggregateMessageSetElement.
 * Use `create(AggregateMessageSetElementSchema)` to create a new message.
 */
export declare const AggregateMessageSetElementSchema: GenDescMessage<AggregateMessageSetElement>;

/**
 * @generated from extension: optional protobuf_unittest.AggregateMessageSetElement message_set_extension = 15447542;
 */
export declare const AggregateMessageSetElement_message_set_extension: GenDescExtension<AggregateMessageSet, AggregateMessageSetElement>;

/**
 * A helper type used to test aggregate option parsing
 *
 * @generated from message protobuf_unittest.Aggregate
 */
export declare type Aggregate = Message<"protobuf_unittest.Aggregate"> & {
  /**
   * @generated from field: optional int32 i = 1;
   */
  i: number;

  /**
   * @generated from field: optional string s = 2;
   */
  s: string;

  /**
   * A nested object
   *
   * @generated from field: optional protobuf_unittest.Aggregate sub = 3;
   */
  sub?: Aggregate;

  /**
   * To test the parsing of extensions inside aggregate values
   *
   * @generated from field: optional google.protobuf.FileOptions file = 4;
   */
  file?: FileOptions;

  /**
   * An embedded message set
   *
   * @generated from field: optional protobuf_unittest.AggregateMessageSet mset = 5;
   */
  mset?: AggregateMessageSet;

  /**
   * An any
   *
   * @generated from field: optional google.protobuf.Any any = 6;
   */
  any?: Any;
};

/**
 * Describes the message protobuf_unittest.Aggregate.
 * Use `create(AggregateSchema)` to create a new message.
 */
export declare const AggregateSchema: GenDescMessage<Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate nested = 15476903;
 */
export declare const Aggregate_nested: GenDescExtension<FileOptions, Aggregate>;

/**
 * @generated from message protobuf_unittest.AggregateMessage
 */
export declare type AggregateMessage = Message<"protobuf_unittest.AggregateMessage"> & {
  /**
   * @generated from field: optional int32 fieldname = 1;
   */
  fieldname: number;
};

/**
 * Describes the message protobuf_unittest.AggregateMessage.
 * Use `create(AggregateMessageSchema)` to create a new message.
 */
export declare const AggregateMessageSchema: GenDescMessage<AggregateMessage>;

/**
 * Test custom options for nested type.
 *
 * @generated from message protobuf_unittest.NestedOptionType
 */
export declare type NestedOptionType = Message<"protobuf_unittest.NestedOptionType"> & {
};

/**
 * Describes the message protobuf_unittest.NestedOptionType.
 * Use `create(NestedOptionTypeSchema)` to create a new message.
 */
export declare const NestedOptionTypeSchema: GenDescMessage<NestedOptionType>;

/**
 * @generated from message protobuf_unittest.NestedOptionType.NestedMessage
 */
export declare type NestedOptionType_NestedMessage = Message<"protobuf_unittest.NestedOptionType.NestedMessage"> & {
  /**
   * @generated from field: optional int32 nested_field = 1;
   */
  nestedField: number;
};

/**
 * Describes the message protobuf_unittest.NestedOptionType.NestedMessage.
 * Use `create(NestedOptionType_NestedMessageSchema)` to create a new message.
 */
export declare const NestedOptionType_NestedMessageSchema: GenDescMessage<NestedOptionType_NestedMessage>;

/**
 * @generated from enum protobuf_unittest.NestedOptionType.NestedEnum
 */
export enum NestedOptionType_NestedEnum {
  /**
   * @generated from enum value: NESTED_ENUM_VALUE = 1;
   */
  VALUE = 1,
}

/**
 * Describes the enum protobuf_unittest.NestedOptionType.NestedEnum.
 */
export declare const NestedOptionType_NestedEnumSchema: GenDescEnum<NestedOptionType_NestedEnum>;

/**
 * @generated from extension: optional int32 nested_extension = 7912573;
 */
export declare const NestedOptionType_nested_extension: GenDescExtension<FileOptions, number>;

/**
 * Custom message option that has a required enum field.
 * WARNING: this is strongly discouraged!
 *
 * @generated from message protobuf_unittest.OldOptionType
 */
export declare type OldOptionType = Message<"protobuf_unittest.OldOptionType"> & {
  /**
   * @generated from field: required protobuf_unittest.OldOptionType.TestEnum value = 1;
   */
  value: OldOptionType_TestEnum;
};

/**
 * Describes the message protobuf_unittest.OldOptionType.
 * Use `create(OldOptionTypeSchema)` to create a new message.
 */
export declare const OldOptionTypeSchema: GenDescMessage<OldOptionType>;

/**
 * @generated from enum protobuf_unittest.OldOptionType.TestEnum
 */
export enum OldOptionType_TestEnum {
  /**
   * @generated from enum value: OLD_VALUE = 0;
   */
  OLD_VALUE = 0,
}

/**
 * Describes the enum protobuf_unittest.OldOptionType.TestEnum.
 */
export declare const OldOptionType_TestEnumSchema: GenDescEnum<OldOptionType_TestEnum>;

/**
 * Updated version of the custom option above.
 *
 * @generated from message protobuf_unittest.NewOptionType
 */
export declare type NewOptionType = Message<"protobuf_unittest.NewOptionType"> & {
  /**
   * @generated from field: required protobuf_unittest.NewOptionType.TestEnum value = 1;
   */
  value: NewOptionType_TestEnum;
};

/**
 * Describes the message protobuf_unittest.NewOptionType.
 * Use `create(NewOptionTypeSchema)` to create a new message.
 */
export declare const NewOptionTypeSchema: GenDescMessage<NewOptionType>;

/**
 * @generated from enum protobuf_unittest.NewOptionType.TestEnum
 */
export enum NewOptionType_TestEnum {
  /**
   * @generated from enum value: OLD_VALUE = 0;
   */
  OLD_VALUE = 0,

  /**
   * @generated from enum value: NEW_VALUE = 1;
   */
  NEW_VALUE = 1,
}

/**
 * Describes the enum protobuf_unittest.NewOptionType.TestEnum.
 */
export declare const NewOptionType_TestEnumSchema: GenDescEnum<NewOptionType_TestEnum>;

/**
 * Test message using the "required_enum_opt" option defined above.
 *
 * @generated from message protobuf_unittest.TestMessageWithRequiredEnumOption
 */
export declare type TestMessageWithRequiredEnumOption = Message<"protobuf_unittest.TestMessageWithRequiredEnumOption"> & {
};

/**
 * Describes the message protobuf_unittest.TestMessageWithRequiredEnumOption.
 * Use `create(TestMessageWithRequiredEnumOptionSchema)` to create a new message.
 */
export declare const TestMessageWithRequiredEnumOptionSchema: GenDescMessage<TestMessageWithRequiredEnumOption>;

/**
 * @generated from enum protobuf_unittest.MethodOpt1
 */
export enum MethodOpt1 {
  /**
   * @generated from enum value: METHODOPT1_VAL1 = 1;
   */
  METHODOPT1_VAL1 = 1,

  /**
   * @generated from enum value: METHODOPT1_VAL2 = 2;
   */
  METHODOPT1_VAL2 = 2,
}

/**
 * Describes the enum protobuf_unittest.MethodOpt1.
 */
export declare const MethodOpt1Schema: GenDescEnum<MethodOpt1>;

/**
 * @generated from enum protobuf_unittest.AggregateEnum
 */
export enum AggregateEnum {
  /**
   * @generated from enum value: VALUE = 1;
   */
  VALUE = 1,
}

/**
 * Describes the enum protobuf_unittest.AggregateEnum.
 */
export declare const AggregateEnumSchema: GenDescEnum<AggregateEnum>;

/**
 * @generated from service protobuf_unittest.TestServiceWithCustomOptions
 */
export declare const TestServiceWithCustomOptions: GenDescService<{
  /**
   * @generated from rpc protobuf_unittest.TestServiceWithCustomOptions.Foo
   */
  foo: {
    methodKind: "unary";
    input: typeof CustomOptionFooRequestSchema;
    output: typeof CustomOptionFooResponseSchema;
  },
}
>;

/**
 * @generated from service protobuf_unittest.AggregateService
 */
export declare const AggregateService: GenDescService<{
  /**
   * @generated from rpc protobuf_unittest.AggregateService.Method
   */
  method: {
    methodKind: "unary";
    input: typeof AggregateMessageSchema;
    output: typeof AggregateMessageSchema;
  },
}
>;

/**
 * @generated from extension: optional uint64 file_opt1 = 7736974;
 */
export declare const file_opt1: GenDescExtension<FileOptions, bigint>;

/**
 * @generated from extension: optional int32 message_opt1 = 7739036;
 */
export declare const message_opt1: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional fixed64 field_opt1 = 7740936;
 */
export declare const field_opt1: GenDescExtension<FieldOptions, bigint>;

/**
 * This is useful for testing that we correctly register default values for
 * extension options.
 *
 * @generated from extension: optional int32 field_opt2 = 7753913 [default = 42];
 */
export declare const field_opt2: GenDescExtension<FieldOptions, number>;

/**
 * @generated from extension: optional int32 oneof_opt1 = 7740111;
 */
export declare const oneof_opt1: GenDescExtension<OneofOptions, number>;

/**
 * @generated from extension: optional sfixed32 enum_opt1 = 7753576;
 */
export declare const enum_opt1: GenDescExtension<EnumOptions, number>;

/**
 * @generated from extension: optional int32 enum_value_opt1 = 1560678;
 */
export declare const enum_value_opt1: GenDescExtension<EnumValueOptions, number>;

/**
 * @generated from extension: optional sint64 service_opt1 = 7887650;
 */
export declare const service_opt1: GenDescExtension<ServiceOptions, bigint>;

/**
 * @generated from extension: optional protobuf_unittest.MethodOpt1 method_opt1 = 7890860;
 */
export declare const method_opt1: GenDescExtension<MethodOptions, MethodOpt1>;

/**
 * @generated from extension: optional bool bool_opt = 7706090;
 */
export declare const bool_opt: GenDescExtension<MessageOptions, boolean>;

/**
 * @generated from extension: optional int32 int32_opt = 7705709;
 */
export declare const int32_opt: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional int64 int64_opt = 7705542;
 */
export declare const int64_opt: GenDescExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional uint32 uint32_opt = 7704880;
 */
export declare const uint32_opt: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional uint64 uint64_opt = 7702367;
 */
export declare const uint64_opt: GenDescExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional sint32 sint32_opt = 7701568;
 */
export declare const sint32_opt: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional sint64 sint64_opt = 7700863;
 */
export declare const sint64_opt: GenDescExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional fixed32 fixed32_opt = 7700307;
 */
export declare const fixed32_opt: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional fixed64 fixed64_opt = 7700194;
 */
export declare const fixed64_opt: GenDescExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional sfixed32 sfixed32_opt = 7698645;
 */
export declare const sfixed32_opt: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional sfixed64 sfixed64_opt = 7685475;
 */
export declare const sfixed64_opt: GenDescExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional float float_opt = 7675390;
 */
export declare const float_opt: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional double double_opt = 7673293;
 */
export declare const double_opt: GenDescExtension<MessageOptions, number>;

/**
 * @generated from extension: optional string string_opt = 7673285;
 */
export declare const string_opt: GenDescExtension<MessageOptions, string>;

/**
 * @generated from extension: optional bytes bytes_opt = 7673238;
 */
export declare const bytes_opt: GenDescExtension<MessageOptions, Uint8Array>;

/**
 * @generated from extension: optional protobuf_unittest.DummyMessageContainingEnum.TestEnumType enum_opt = 7673233;
 */
export declare const enum_opt: GenDescExtension<MessageOptions, DummyMessageContainingEnum_TestEnumType>;

/**
 * @generated from extension: optional protobuf_unittest.DummyMessageInvalidAsOptionType message_type_opt = 7665967;
 */
export declare const message_type_opt: GenDescExtension<MessageOptions, DummyMessageInvalidAsOptionType>;

/**
 * @generated from extension: optional int32 mooo = 7663707;
 */
export declare const mooo: GenDescExtension<ComplexOptionType1, number>;

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType3 corge = 7663442;
 */
export declare const corge: GenDescExtension<ComplexOptionType1, ComplexOptionType3>;

/**
 * @generated from extension: optional int32 grault = 7650927;
 */
export declare const grault: GenDescExtension<ComplexOptionType2, number>;

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType1 garply = 7649992;
 */
export declare const garply: GenDescExtension<ComplexOptionType2, ComplexOptionType1>;

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType1 complex_opt1 = 7646756;
 */
export declare const complex_opt1: GenDescExtension<MessageOptions, ComplexOptionType1>;

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType2 complex_opt2 = 7636949;
 */
export declare const complex_opt2: GenDescExtension<MessageOptions, ComplexOptionType2>;

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType3 complex_opt3 = 7636463;
 */
export declare const complex_opt3: GenDescExtension<MessageOptions, ComplexOptionType3>;

/**
 * @generated from extension: optional protobuf_unittest.ComplexOpt6 complexopt6 = 7595468;
 */
export declare const complexopt6: GenDescExtension<MessageOptions, ComplexOpt6>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate fileopt = 15478479;
 */
export declare const fileopt: GenDescExtension<FileOptions, Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate msgopt = 15480088;
 */
export declare const msgopt: GenDescExtension<MessageOptions, Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate fieldopt = 15481374;
 */
export declare const fieldopt: GenDescExtension<FieldOptions, Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate enumopt = 15483218;
 */
export declare const enumopt: GenDescExtension<EnumOptions, Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate enumvalopt = 15486921;
 */
export declare const enumvalopt: GenDescExtension<EnumValueOptions, Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate serviceopt = 15497145;
 */
export declare const serviceopt: GenDescExtension<ServiceOptions, Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.Aggregate methodopt = 15512713;
 */
export declare const methodopt: GenDescExtension<MethodOptions, Aggregate>;

/**
 * @generated from extension: optional protobuf_unittest.OldOptionType required_enum_opt = 106161807;
 */
export declare const required_enum_opt: GenDescExtension<MessageOptions, OldOptionType>;

