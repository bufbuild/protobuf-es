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

// Author: benjy@google.com (Benjy Weinberger)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file used to test the "custom options" feature of google.protobuf.

// @generated by protoc-gen-es v2.6.2 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_custom_options.proto (package proto2_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.

import type { GenEnum, GenExtension, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
import type { Any, EnumOptions, EnumValueOptions, FieldOptions, FileOptions, MessageOptions, MethodOptions, OneofOptions, ServiceOptions } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file google/protobuf/unittest_custom_options.proto.
 */
export declare const file_google_protobuf_unittest_custom_options: GenFile;

/**
 * A test message with custom options at all possible locations (and also some
 * regular options, to make sure they interact nicely).
 *
 * @generated from message proto2_unittest.TestMessageWithCustomOptions
 */
export declare type TestMessageWithCustomOptions = Message<"proto2_unittest.TestMessageWithCustomOptions"> & {
  /**
   * @generated from field: optional string field1 = 1;
   */
  field1: string;

  /**
   * @generated from oneof proto2_unittest.TestMessageWithCustomOptions.AnOneof
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
 * Describes the message proto2_unittest.TestMessageWithCustomOptions.
 * Use `create(TestMessageWithCustomOptionsSchema)` to create a new message.
 */
export declare const TestMessageWithCustomOptionsSchema: GenMessage<TestMessageWithCustomOptions>;

/**
 * @generated from enum proto2_unittest.TestMessageWithCustomOptions.AnEnum
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
 * Describes the enum proto2_unittest.TestMessageWithCustomOptions.AnEnum.
 */
export declare const TestMessageWithCustomOptions_AnEnumSchema: GenEnum<TestMessageWithCustomOptions_AnEnum>;

/**
 * A test RPC service with custom options at all possible locations (and also
 * some regular options, to make sure they interact nicely).
 *
 * @generated from message proto2_unittest.CustomOptionFooRequest
 */
export declare type CustomOptionFooRequest = Message<"proto2_unittest.CustomOptionFooRequest"> & {
};

/**
 * Describes the message proto2_unittest.CustomOptionFooRequest.
 * Use `create(CustomOptionFooRequestSchema)` to create a new message.
 */
export declare const CustomOptionFooRequestSchema: GenMessage<CustomOptionFooRequest>;

/**
 * @generated from message proto2_unittest.CustomOptionFooResponse
 */
export declare type CustomOptionFooResponse = Message<"proto2_unittest.CustomOptionFooResponse"> & {
};

/**
 * Describes the message proto2_unittest.CustomOptionFooResponse.
 * Use `create(CustomOptionFooResponseSchema)` to create a new message.
 */
export declare const CustomOptionFooResponseSchema: GenMessage<CustomOptionFooResponse>;

/**
 * @generated from message proto2_unittest.CustomOptionFooClientMessage
 */
export declare type CustomOptionFooClientMessage = Message<"proto2_unittest.CustomOptionFooClientMessage"> & {
};

/**
 * Describes the message proto2_unittest.CustomOptionFooClientMessage.
 * Use `create(CustomOptionFooClientMessageSchema)` to create a new message.
 */
export declare const CustomOptionFooClientMessageSchema: GenMessage<CustomOptionFooClientMessage>;

/**
 * @generated from message proto2_unittest.CustomOptionFooServerMessage
 */
export declare type CustomOptionFooServerMessage = Message<"proto2_unittest.CustomOptionFooServerMessage"> & {
};

/**
 * Describes the message proto2_unittest.CustomOptionFooServerMessage.
 * Use `create(CustomOptionFooServerMessageSchema)` to create a new message.
 */
export declare const CustomOptionFooServerMessageSchema: GenMessage<CustomOptionFooServerMessage>;

/**
 * @generated from message proto2_unittest.DummyMessageContainingEnum
 */
export declare type DummyMessageContainingEnum = Message<"proto2_unittest.DummyMessageContainingEnum"> & {
};

/**
 * Describes the message proto2_unittest.DummyMessageContainingEnum.
 * Use `create(DummyMessageContainingEnumSchema)` to create a new message.
 */
export declare const DummyMessageContainingEnumSchema: GenMessage<DummyMessageContainingEnum>;

/**
 * @generated from enum proto2_unittest.DummyMessageContainingEnum.TestEnumType
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
 * Describes the enum proto2_unittest.DummyMessageContainingEnum.TestEnumType.
 */
export declare const DummyMessageContainingEnum_TestEnumTypeSchema: GenEnum<DummyMessageContainingEnum_TestEnumType>;

/**
 * @generated from message proto2_unittest.DummyMessageInvalidAsOptionType
 */
export declare type DummyMessageInvalidAsOptionType = Message<"proto2_unittest.DummyMessageInvalidAsOptionType"> & {
};

/**
 * Describes the message proto2_unittest.DummyMessageInvalidAsOptionType.
 * Use `create(DummyMessageInvalidAsOptionTypeSchema)` to create a new message.
 */
export declare const DummyMessageInvalidAsOptionTypeSchema: GenMessage<DummyMessageInvalidAsOptionType>;

/**
 * @generated from message proto2_unittest.CustomOptionMinIntegerValues
 */
export declare type CustomOptionMinIntegerValues = Message<"proto2_unittest.CustomOptionMinIntegerValues"> & {
};

/**
 * Describes the message proto2_unittest.CustomOptionMinIntegerValues.
 * Use `create(CustomOptionMinIntegerValuesSchema)` to create a new message.
 */
export declare const CustomOptionMinIntegerValuesSchema: GenMessage<CustomOptionMinIntegerValues>;

/**
 * @generated from message proto2_unittest.CustomOptionMaxIntegerValues
 */
export declare type CustomOptionMaxIntegerValues = Message<"proto2_unittest.CustomOptionMaxIntegerValues"> & {
};

/**
 * Describes the message proto2_unittest.CustomOptionMaxIntegerValues.
 * Use `create(CustomOptionMaxIntegerValuesSchema)` to create a new message.
 */
export declare const CustomOptionMaxIntegerValuesSchema: GenMessage<CustomOptionMaxIntegerValues>;

/**
 * @generated from message proto2_unittest.CustomOptionOtherValues
 */
export declare type CustomOptionOtherValues = Message<"proto2_unittest.CustomOptionOtherValues"> & {
};

/**
 * Describes the message proto2_unittest.CustomOptionOtherValues.
 * Use `create(CustomOptionOtherValuesSchema)` to create a new message.
 */
export declare const CustomOptionOtherValuesSchema: GenMessage<CustomOptionOtherValues>;

/**
 * @generated from message proto2_unittest.SettingRealsFromPositiveInts
 */
export declare type SettingRealsFromPositiveInts = Message<"proto2_unittest.SettingRealsFromPositiveInts"> & {
};

/**
 * Describes the message proto2_unittest.SettingRealsFromPositiveInts.
 * Use `create(SettingRealsFromPositiveIntsSchema)` to create a new message.
 */
export declare const SettingRealsFromPositiveIntsSchema: GenMessage<SettingRealsFromPositiveInts>;

/**
 * @generated from message proto2_unittest.SettingRealsFromNegativeInts
 */
export declare type SettingRealsFromNegativeInts = Message<"proto2_unittest.SettingRealsFromNegativeInts"> & {
};

/**
 * Describes the message proto2_unittest.SettingRealsFromNegativeInts.
 * Use `create(SettingRealsFromNegativeIntsSchema)` to create a new message.
 */
export declare const SettingRealsFromNegativeIntsSchema: GenMessage<SettingRealsFromNegativeInts>;

/**
 * @generated from message proto2_unittest.SettingRealsFromInf
 */
export declare type SettingRealsFromInf = Message<"proto2_unittest.SettingRealsFromInf"> & {
};

/**
 * Describes the message proto2_unittest.SettingRealsFromInf.
 * Use `create(SettingRealsFromInfSchema)` to create a new message.
 */
export declare const SettingRealsFromInfSchema: GenMessage<SettingRealsFromInf>;

/**
 * @generated from message proto2_unittest.SettingRealsFromNegativeInf
 */
export declare type SettingRealsFromNegativeInf = Message<"proto2_unittest.SettingRealsFromNegativeInf"> & {
};

/**
 * Describes the message proto2_unittest.SettingRealsFromNegativeInf.
 * Use `create(SettingRealsFromNegativeInfSchema)` to create a new message.
 */
export declare const SettingRealsFromNegativeInfSchema: GenMessage<SettingRealsFromNegativeInf>;

/**
 * @generated from message proto2_unittest.SettingRealsFromNan
 */
export declare type SettingRealsFromNan = Message<"proto2_unittest.SettingRealsFromNan"> & {
};

/**
 * Describes the message proto2_unittest.SettingRealsFromNan.
 * Use `create(SettingRealsFromNanSchema)` to create a new message.
 */
export declare const SettingRealsFromNanSchema: GenMessage<SettingRealsFromNan>;

/**
 * @generated from message proto2_unittest.SettingRealsFromNegativeNan
 */
export declare type SettingRealsFromNegativeNan = Message<"proto2_unittest.SettingRealsFromNegativeNan"> & {
};

/**
 * Describes the message proto2_unittest.SettingRealsFromNegativeNan.
 * Use `create(SettingRealsFromNegativeNanSchema)` to create a new message.
 */
export declare const SettingRealsFromNegativeNanSchema: GenMessage<SettingRealsFromNegativeNan>;

/**
 * @generated from message proto2_unittest.ComplexOptionType1
 */
export declare type ComplexOptionType1 = Message<"proto2_unittest.ComplexOptionType1"> & {
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
 * Describes the message proto2_unittest.ComplexOptionType1.
 * Use `create(ComplexOptionType1Schema)` to create a new message.
 */
export declare const ComplexOptionType1Schema: GenMessage<ComplexOptionType1>;

/**
 * @generated from message proto2_unittest.ComplexOptionType2
 */
export declare type ComplexOptionType2 = Message<"proto2_unittest.ComplexOptionType2"> & {
  /**
   * @generated from field: optional proto2_unittest.ComplexOptionType1 bar = 1;
   */
  bar?: ComplexOptionType1;

  /**
   * @generated from field: optional int32 baz = 2;
   */
  baz: number;

  /**
   * @generated from field: optional proto2_unittest.ComplexOptionType2.ComplexOptionType4 fred = 3;
   */
  fred?: ComplexOptionType2_ComplexOptionType4;

  /**
   * @generated from field: repeated proto2_unittest.ComplexOptionType2.ComplexOptionType4 barney = 4;
   */
  barney: ComplexOptionType2_ComplexOptionType4[];
};

/**
 * Describes the message proto2_unittest.ComplexOptionType2.
 * Use `create(ComplexOptionType2Schema)` to create a new message.
 */
export declare const ComplexOptionType2Schema: GenMessage<ComplexOptionType2>;

/**
 * @generated from message proto2_unittest.ComplexOptionType2.ComplexOptionType4
 */
export declare type ComplexOptionType2_ComplexOptionType4 = Message<"proto2_unittest.ComplexOptionType2.ComplexOptionType4"> & {
  /**
   * @generated from field: optional int32 waldo = 1;
   */
  waldo: number;
};

/**
 * Describes the message proto2_unittest.ComplexOptionType2.ComplexOptionType4.
 * Use `create(ComplexOptionType2_ComplexOptionType4Schema)` to create a new message.
 */
export declare const ComplexOptionType2_ComplexOptionType4Schema: GenMessage<ComplexOptionType2_ComplexOptionType4>;

/**
 * @generated from extension: optional proto2_unittest.ComplexOptionType2.ComplexOptionType4 complex_opt4 = 7633546;
 */
export declare const ComplexOptionType2_ComplexOptionType4_complex_opt4: GenExtension<MessageOptions, ComplexOptionType2_ComplexOptionType4>;

/**
 * @generated from message proto2_unittest.ComplexOptionType3
 */
export declare type ComplexOptionType3 = Message<"proto2_unittest.ComplexOptionType3"> & {
  /**
   * @generated from field: optional int32 moo = 1;
   */
  moo: number;

  /**
   * @generated from field: optional proto2_unittest.ComplexOptionType3.ComplexOptionType5 complexoptiontype5 = 2;
   */
  complexoptiontype5?: ComplexOptionType3_ComplexOptionType5;
};

/**
 * Describes the message proto2_unittest.ComplexOptionType3.
 * Use `create(ComplexOptionType3Schema)` to create a new message.
 */
export declare const ComplexOptionType3Schema: GenMessage<ComplexOptionType3>;

/**
 * @generated from message proto2_unittest.ComplexOptionType3.ComplexOptionType5
 */
export declare type ComplexOptionType3_ComplexOptionType5 = Message<"proto2_unittest.ComplexOptionType3.ComplexOptionType5"> & {
  /**
   * @generated from field: optional int32 plugh = 3;
   */
  plugh: number;
};

/**
 * Describes the message proto2_unittest.ComplexOptionType3.ComplexOptionType5.
 * Use `create(ComplexOptionType3_ComplexOptionType5Schema)` to create a new message.
 */
export declare const ComplexOptionType3_ComplexOptionType5Schema: GenMessage<ComplexOptionType3_ComplexOptionType5>;

/**
 * @generated from message proto2_unittest.ComplexOpt6
 */
export declare type ComplexOpt6 = Message<"proto2_unittest.ComplexOpt6"> & {
  /**
   * @generated from field: optional int32 xyzzy = 7593951;
   */
  xyzzy: number;
};

/**
 * Describes the message proto2_unittest.ComplexOpt6.
 * Use `create(ComplexOpt6Schema)` to create a new message.
 */
export declare const ComplexOpt6Schema: GenMessage<ComplexOpt6>;

/**
 * Note that we try various different ways of naming the same extension.
 *
 * @generated from message proto2_unittest.VariousComplexOptions
 */
export declare type VariousComplexOptions = Message<"proto2_unittest.VariousComplexOptions"> & {
};

/**
 * Describes the message proto2_unittest.VariousComplexOptions.
 * Use `create(VariousComplexOptionsSchema)` to create a new message.
 */
export declare const VariousComplexOptionsSchema: GenMessage<VariousComplexOptions>;

/**
 * @generated from message proto2_unittest.AggregateMessageSet
 */
export declare type AggregateMessageSet = Message<"proto2_unittest.AggregateMessageSet"> & {
};

/**
 * Describes the message proto2_unittest.AggregateMessageSet.
 * Use `create(AggregateMessageSetSchema)` to create a new message.
 */
export declare const AggregateMessageSetSchema: GenMessage<AggregateMessageSet>;

/**
 * @generated from message proto2_unittest.AggregateMessageSetElement
 */
export declare type AggregateMessageSetElement = Message<"proto2_unittest.AggregateMessageSetElement"> & {
  /**
   * @generated from field: optional string s = 1;
   */
  s: string;
};

/**
 * Describes the message proto2_unittest.AggregateMessageSetElement.
 * Use `create(AggregateMessageSetElementSchema)` to create a new message.
 */
export declare const AggregateMessageSetElementSchema: GenMessage<AggregateMessageSetElement>;

/**
 * @generated from extension: optional proto2_unittest.AggregateMessageSetElement message_set_extension = 15447542;
 */
export declare const AggregateMessageSetElement_message_set_extension: GenExtension<AggregateMessageSet, AggregateMessageSetElement>;

/**
 * A helper type used to test aggregate option parsing
 *
 * @generated from message proto2_unittest.Aggregate
 */
export declare type Aggregate = Message<"proto2_unittest.Aggregate"> & {
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
   * @generated from field: optional proto2_unittest.Aggregate sub = 3;
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
   * @generated from field: optional proto2_unittest.AggregateMessageSet mset = 5;
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
 * Describes the message proto2_unittest.Aggregate.
 * Use `create(AggregateSchema)` to create a new message.
 */
export declare const AggregateSchema: GenMessage<Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate nested = 15476903;
 */
export declare const Aggregate_nested: GenExtension<FileOptions, Aggregate>;

/**
 * @generated from message proto2_unittest.AggregateMessage
 */
export declare type AggregateMessage = Message<"proto2_unittest.AggregateMessage"> & {
  /**
   * @generated from field: optional int32 fieldname = 1;
   */
  fieldname: number;
};

/**
 * Describes the message proto2_unittest.AggregateMessage.
 * Use `create(AggregateMessageSchema)` to create a new message.
 */
export declare const AggregateMessageSchema: GenMessage<AggregateMessage>;

/**
 * Test custom options for nested type.
 *
 * @generated from message proto2_unittest.NestedOptionType
 */
export declare type NestedOptionType = Message<"proto2_unittest.NestedOptionType"> & {
};

/**
 * Describes the message proto2_unittest.NestedOptionType.
 * Use `create(NestedOptionTypeSchema)` to create a new message.
 */
export declare const NestedOptionTypeSchema: GenMessage<NestedOptionType>;

/**
 * @generated from message proto2_unittest.NestedOptionType.NestedMessage
 */
export declare type NestedOptionType_NestedMessage = Message<"proto2_unittest.NestedOptionType.NestedMessage"> & {
  /**
   * @generated from field: optional int32 nested_field = 1;
   */
  nestedField: number;
};

/**
 * Describes the message proto2_unittest.NestedOptionType.NestedMessage.
 * Use `create(NestedOptionType_NestedMessageSchema)` to create a new message.
 */
export declare const NestedOptionType_NestedMessageSchema: GenMessage<NestedOptionType_NestedMessage>;

/**
 * @generated from enum proto2_unittest.NestedOptionType.NestedEnum
 */
export enum NestedOptionType_NestedEnum {
  /**
   * @generated from enum value: NESTED_ENUM_VALUE = 1;
   */
  VALUE = 1,
}

/**
 * Describes the enum proto2_unittest.NestedOptionType.NestedEnum.
 */
export declare const NestedOptionType_NestedEnumSchema: GenEnum<NestedOptionType_NestedEnum>;

/**
 * @generated from extension: optional int32 nested_extension = 7912573;
 */
export declare const NestedOptionType_nested_extension: GenExtension<FileOptions, number>;

/**
 * Custom message option that has a required enum field.
 * WARNING: this is strongly discouraged!
 *
 * @generated from message proto2_unittest.OldOptionType
 */
export declare type OldOptionType = Message<"proto2_unittest.OldOptionType"> & {
  /**
   * @generated from field: required proto2_unittest.OldOptionType.TestEnum value = 1;
   */
  value: OldOptionType_TestEnum;
};

/**
 * Describes the message proto2_unittest.OldOptionType.
 * Use `create(OldOptionTypeSchema)` to create a new message.
 */
export declare const OldOptionTypeSchema: GenMessage<OldOptionType>;

/**
 * @generated from enum proto2_unittest.OldOptionType.TestEnum
 */
export enum OldOptionType_TestEnum {
  /**
   * @generated from enum value: OLD_VALUE = 0;
   */
  OLD_VALUE = 0,
}

/**
 * Describes the enum proto2_unittest.OldOptionType.TestEnum.
 */
export declare const OldOptionType_TestEnumSchema: GenEnum<OldOptionType_TestEnum>;

/**
 * Updated version of the custom option above.
 *
 * @generated from message proto2_unittest.NewOptionType
 */
export declare type NewOptionType = Message<"proto2_unittest.NewOptionType"> & {
  /**
   * @generated from field: required proto2_unittest.NewOptionType.TestEnum value = 1;
   */
  value: NewOptionType_TestEnum;
};

/**
 * Describes the message proto2_unittest.NewOptionType.
 * Use `create(NewOptionTypeSchema)` to create a new message.
 */
export declare const NewOptionTypeSchema: GenMessage<NewOptionType>;

/**
 * @generated from enum proto2_unittest.NewOptionType.TestEnum
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
 * Describes the enum proto2_unittest.NewOptionType.TestEnum.
 */
export declare const NewOptionType_TestEnumSchema: GenEnum<NewOptionType_TestEnum>;

/**
 * Test message using the "required_enum_opt" option defined above.
 *
 * @generated from message proto2_unittest.TestMessageWithRequiredEnumOption
 */
export declare type TestMessageWithRequiredEnumOption = Message<"proto2_unittest.TestMessageWithRequiredEnumOption"> & {
};

/**
 * Describes the message proto2_unittest.TestMessageWithRequiredEnumOption.
 * Use `create(TestMessageWithRequiredEnumOptionSchema)` to create a new message.
 */
export declare const TestMessageWithRequiredEnumOptionSchema: GenMessage<TestMessageWithRequiredEnumOption>;

/**
 * @generated from enum proto2_unittest.MethodOpt1
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
 * Describes the enum proto2_unittest.MethodOpt1.
 */
export declare const MethodOpt1Schema: GenEnum<MethodOpt1>;

/**
 * @generated from enum proto2_unittest.AggregateEnum
 */
export enum AggregateEnum {
  /**
   * @generated from enum value: VALUE = 1;
   */
  VALUE = 1,
}

/**
 * Describes the enum proto2_unittest.AggregateEnum.
 */
export declare const AggregateEnumSchema: GenEnum<AggregateEnum>;

/**
 * @generated from service proto2_unittest.TestServiceWithCustomOptions
 */
export declare const TestServiceWithCustomOptions: GenService<{
  /**
   * @generated from rpc proto2_unittest.TestServiceWithCustomOptions.Foo
   */
  foo: {
    methodKind: "unary";
    input: typeof CustomOptionFooRequestSchema;
    output: typeof CustomOptionFooResponseSchema;
  },
}>;

/**
 * @generated from service proto2_unittest.AggregateService
 */
export declare const AggregateService: GenService<{
  /**
   * @generated from rpc proto2_unittest.AggregateService.Method
   */
  method: {
    methodKind: "unary";
    input: typeof AggregateMessageSchema;
    output: typeof AggregateMessageSchema;
  },
}>;

/**
 * @generated from extension: optional uint64 file_opt1 = 7736974;
 */
export declare const file_opt1: GenExtension<FileOptions, bigint>;

/**
 * @generated from extension: optional int32 message_opt1 = 7739036;
 */
export declare const message_opt1: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional fixed64 field_opt1 = 7740936;
 */
export declare const field_opt1: GenExtension<FieldOptions, bigint>;

/**
 * This is useful for testing that we correctly register default values for
 * extension options.
 *
 * @generated from extension: optional int32 field_opt2 = 7753913 [default = 42];
 */
export declare const field_opt2: GenExtension<FieldOptions, number>;

/**
 * @generated from extension: optional int32 oneof_opt1 = 7740111;
 */
export declare const oneof_opt1: GenExtension<OneofOptions, number>;

/**
 * @generated from extension: optional sfixed32 enum_opt1 = 7753576;
 */
export declare const enum_opt1: GenExtension<EnumOptions, number>;

/**
 * @generated from extension: optional int32 enum_value_opt1 = 1560678;
 */
export declare const enum_value_opt1: GenExtension<EnumValueOptions, number>;

/**
 * @generated from extension: optional sint64 service_opt1 = 7887650;
 */
export declare const service_opt1: GenExtension<ServiceOptions, bigint>;

/**
 * @generated from extension: optional proto2_unittest.MethodOpt1 method_opt1 = 7890860;
 */
export declare const method_opt1: GenExtension<MethodOptions, MethodOpt1>;

/**
 * @generated from extension: optional bool bool_opt = 7706090;
 */
export declare const bool_opt: GenExtension<MessageOptions, boolean>;

/**
 * @generated from extension: optional int32 int32_opt = 7705709;
 */
export declare const int32_opt: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional int64 int64_opt = 7705542;
 */
export declare const int64_opt: GenExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional uint32 uint32_opt = 7704880;
 */
export declare const uint32_opt: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional uint64 uint64_opt = 7702367;
 */
export declare const uint64_opt: GenExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional sint32 sint32_opt = 7701568;
 */
export declare const sint32_opt: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional sint64 sint64_opt = 7700863;
 */
export declare const sint64_opt: GenExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional fixed32 fixed32_opt = 7700307;
 */
export declare const fixed32_opt: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional fixed64 fixed64_opt = 7700194;
 */
export declare const fixed64_opt: GenExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional sfixed32 sfixed32_opt = 7698645;
 */
export declare const sfixed32_opt: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional sfixed64 sfixed64_opt = 7685475;
 */
export declare const sfixed64_opt: GenExtension<MessageOptions, bigint>;

/**
 * @generated from extension: optional float float_opt = 7675390;
 */
export declare const float_opt: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional double double_opt = 7673293;
 */
export declare const double_opt: GenExtension<MessageOptions, number>;

/**
 * @generated from extension: optional string string_opt = 7673285;
 */
export declare const string_opt: GenExtension<MessageOptions, string>;

/**
 * @generated from extension: optional bytes bytes_opt = 7673238;
 */
export declare const bytes_opt: GenExtension<MessageOptions, Uint8Array>;

/**
 * @generated from extension: optional proto2_unittest.DummyMessageContainingEnum.TestEnumType enum_opt = 7673233;
 */
export declare const enum_opt: GenExtension<MessageOptions, DummyMessageContainingEnum_TestEnumType>;

/**
 * @generated from extension: optional proto2_unittest.DummyMessageInvalidAsOptionType message_type_opt = 7665967;
 */
export declare const message_type_opt: GenExtension<MessageOptions, DummyMessageInvalidAsOptionType>;

/**
 * @generated from extension: optional int32 mooo = 7663707;
 */
export declare const mooo: GenExtension<ComplexOptionType1, number>;

/**
 * @generated from extension: optional proto2_unittest.ComplexOptionType3 corge = 7663442;
 */
export declare const corge: GenExtension<ComplexOptionType1, ComplexOptionType3>;

/**
 * @generated from extension: optional int32 grault = 7650927;
 */
export declare const grault: GenExtension<ComplexOptionType2, number>;

/**
 * @generated from extension: optional proto2_unittest.ComplexOptionType1 garply = 7649992;
 */
export declare const garply: GenExtension<ComplexOptionType2, ComplexOptionType1>;

/**
 * @generated from extension: optional proto2_unittest.ComplexOptionType1 complex_opt1 = 7646756;
 */
export declare const complex_opt1: GenExtension<MessageOptions, ComplexOptionType1>;

/**
 * @generated from extension: optional proto2_unittest.ComplexOptionType2 complex_opt2 = 7636949;
 */
export declare const complex_opt2: GenExtension<MessageOptions, ComplexOptionType2>;

/**
 * @generated from extension: optional proto2_unittest.ComplexOptionType3 complex_opt3 = 7636463;
 */
export declare const complex_opt3: GenExtension<MessageOptions, ComplexOptionType3>;

/**
 * @generated from extension: optional proto2_unittest.ComplexOpt6 complexopt6 = 7595468;
 */
export declare const complexopt6: GenExtension<MessageOptions, ComplexOpt6>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate fileopt = 15478479;
 */
export declare const fileopt: GenExtension<FileOptions, Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate msgopt = 15480088;
 */
export declare const msgopt: GenExtension<MessageOptions, Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate fieldopt = 15481374;
 */
export declare const fieldopt: GenExtension<FieldOptions, Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate enumopt = 15483218;
 */
export declare const enumopt: GenExtension<EnumOptions, Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate enumvalopt = 15486921;
 */
export declare const enumvalopt: GenExtension<EnumValueOptions, Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate serviceopt = 15497145;
 */
export declare const serviceopt: GenExtension<ServiceOptions, Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.Aggregate methodopt = 15512713;
 */
export declare const methodopt: GenExtension<MethodOptions, Aggregate>;

/**
 * @generated from extension: optional proto2_unittest.OldOptionType required_enum_opt = 106161807;
 */
export declare const required_enum_opt: GenExtension<MessageOptions, OldOptionType>;

