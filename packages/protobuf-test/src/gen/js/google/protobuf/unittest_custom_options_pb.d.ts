// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Author: benjy@google.com (Benjy Weinberger)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file used to test the "custom options" feature of google.protobuf.

// @generated by protoc-gen-es v0.5.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_custom_options.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.

import type { Any, BinaryReadOptions, FieldList, FileOptions, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest.MethodOpt1
 */
export declare enum MethodOpt1 {
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
 * @generated from enum protobuf_unittest.AggregateEnum
 */
export declare enum AggregateEnum {
  /**
   * @generated from enum value: VALUE = 1;
   */
  VALUE = 1,
}

/**
 * A test message with custom options at all possible locations (and also some
 * regular options, to make sure they interact nicely).
 *
 * @generated from message protobuf_unittest.TestMessageWithCustomOptions
 */
export declare class TestMessageWithCustomOptions extends Message<TestMessageWithCustomOptions> {
  /**
   * @generated from field: optional string field1 = 1;
   */
  field1?: string;

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

  constructor(data?: PartialMessage<TestMessageWithCustomOptions>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestMessageWithCustomOptions";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageWithCustomOptions;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageWithCustomOptions;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageWithCustomOptions;

  static equals(a: TestMessageWithCustomOptions | PlainMessage<TestMessageWithCustomOptions> | undefined, b: TestMessageWithCustomOptions | PlainMessage<TestMessageWithCustomOptions> | undefined): boolean;
}

/**
 * @generated from enum protobuf_unittest.TestMessageWithCustomOptions.AnEnum
 */
export declare enum TestMessageWithCustomOptions_AnEnum {
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
 * A test RPC service with custom options at all possible locations (and also
 * some regular options, to make sure they interact nicely).
 *
 * @generated from message protobuf_unittest.CustomOptionFooRequest
 */
export declare class CustomOptionFooRequest extends Message<CustomOptionFooRequest> {
  constructor(data?: PartialMessage<CustomOptionFooRequest>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.CustomOptionFooRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomOptionFooRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomOptionFooRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomOptionFooRequest;

  static equals(a: CustomOptionFooRequest | PlainMessage<CustomOptionFooRequest> | undefined, b: CustomOptionFooRequest | PlainMessage<CustomOptionFooRequest> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.CustomOptionFooResponse
 */
export declare class CustomOptionFooResponse extends Message<CustomOptionFooResponse> {
  constructor(data?: PartialMessage<CustomOptionFooResponse>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.CustomOptionFooResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomOptionFooResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomOptionFooResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomOptionFooResponse;

  static equals(a: CustomOptionFooResponse | PlainMessage<CustomOptionFooResponse> | undefined, b: CustomOptionFooResponse | PlainMessage<CustomOptionFooResponse> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.CustomOptionFooClientMessage
 */
export declare class CustomOptionFooClientMessage extends Message<CustomOptionFooClientMessage> {
  constructor(data?: PartialMessage<CustomOptionFooClientMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.CustomOptionFooClientMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomOptionFooClientMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomOptionFooClientMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomOptionFooClientMessage;

  static equals(a: CustomOptionFooClientMessage | PlainMessage<CustomOptionFooClientMessage> | undefined, b: CustomOptionFooClientMessage | PlainMessage<CustomOptionFooClientMessage> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.CustomOptionFooServerMessage
 */
export declare class CustomOptionFooServerMessage extends Message<CustomOptionFooServerMessage> {
  constructor(data?: PartialMessage<CustomOptionFooServerMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.CustomOptionFooServerMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomOptionFooServerMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomOptionFooServerMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomOptionFooServerMessage;

  static equals(a: CustomOptionFooServerMessage | PlainMessage<CustomOptionFooServerMessage> | undefined, b: CustomOptionFooServerMessage | PlainMessage<CustomOptionFooServerMessage> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.DummyMessageContainingEnum
 */
export declare class DummyMessageContainingEnum extends Message<DummyMessageContainingEnum> {
  constructor(data?: PartialMessage<DummyMessageContainingEnum>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.DummyMessageContainingEnum";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DummyMessageContainingEnum;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DummyMessageContainingEnum;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DummyMessageContainingEnum;

  static equals(a: DummyMessageContainingEnum | PlainMessage<DummyMessageContainingEnum> | undefined, b: DummyMessageContainingEnum | PlainMessage<DummyMessageContainingEnum> | undefined): boolean;
}

/**
 * @generated from enum protobuf_unittest.DummyMessageContainingEnum.TestEnumType
 */
export declare enum DummyMessageContainingEnum_TestEnumType {
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
 * @generated from message protobuf_unittest.DummyMessageInvalidAsOptionType
 */
export declare class DummyMessageInvalidAsOptionType extends Message<DummyMessageInvalidAsOptionType> {
  constructor(data?: PartialMessage<DummyMessageInvalidAsOptionType>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.DummyMessageInvalidAsOptionType";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DummyMessageInvalidAsOptionType;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DummyMessageInvalidAsOptionType;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DummyMessageInvalidAsOptionType;

  static equals(a: DummyMessageInvalidAsOptionType | PlainMessage<DummyMessageInvalidAsOptionType> | undefined, b: DummyMessageInvalidAsOptionType | PlainMessage<DummyMessageInvalidAsOptionType> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.CustomOptionMinIntegerValues
 */
export declare class CustomOptionMinIntegerValues extends Message<CustomOptionMinIntegerValues> {
  constructor(data?: PartialMessage<CustomOptionMinIntegerValues>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.CustomOptionMinIntegerValues";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomOptionMinIntegerValues;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomOptionMinIntegerValues;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomOptionMinIntegerValues;

  static equals(a: CustomOptionMinIntegerValues | PlainMessage<CustomOptionMinIntegerValues> | undefined, b: CustomOptionMinIntegerValues | PlainMessage<CustomOptionMinIntegerValues> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.CustomOptionMaxIntegerValues
 */
export declare class CustomOptionMaxIntegerValues extends Message<CustomOptionMaxIntegerValues> {
  constructor(data?: PartialMessage<CustomOptionMaxIntegerValues>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.CustomOptionMaxIntegerValues";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomOptionMaxIntegerValues;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomOptionMaxIntegerValues;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomOptionMaxIntegerValues;

  static equals(a: CustomOptionMaxIntegerValues | PlainMessage<CustomOptionMaxIntegerValues> | undefined, b: CustomOptionMaxIntegerValues | PlainMessage<CustomOptionMaxIntegerValues> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.CustomOptionOtherValues
 */
export declare class CustomOptionOtherValues extends Message<CustomOptionOtherValues> {
  constructor(data?: PartialMessage<CustomOptionOtherValues>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.CustomOptionOtherValues";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CustomOptionOtherValues;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CustomOptionOtherValues;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CustomOptionOtherValues;

  static equals(a: CustomOptionOtherValues | PlainMessage<CustomOptionOtherValues> | undefined, b: CustomOptionOtherValues | PlainMessage<CustomOptionOtherValues> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.SettingRealsFromPositiveInts
 */
export declare class SettingRealsFromPositiveInts extends Message<SettingRealsFromPositiveInts> {
  constructor(data?: PartialMessage<SettingRealsFromPositiveInts>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.SettingRealsFromPositiveInts";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SettingRealsFromPositiveInts;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SettingRealsFromPositiveInts;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SettingRealsFromPositiveInts;

  static equals(a: SettingRealsFromPositiveInts | PlainMessage<SettingRealsFromPositiveInts> | undefined, b: SettingRealsFromPositiveInts | PlainMessage<SettingRealsFromPositiveInts> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.SettingRealsFromNegativeInts
 */
export declare class SettingRealsFromNegativeInts extends Message<SettingRealsFromNegativeInts> {
  constructor(data?: PartialMessage<SettingRealsFromNegativeInts>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.SettingRealsFromNegativeInts";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SettingRealsFromNegativeInts;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SettingRealsFromNegativeInts;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SettingRealsFromNegativeInts;

  static equals(a: SettingRealsFromNegativeInts | PlainMessage<SettingRealsFromNegativeInts> | undefined, b: SettingRealsFromNegativeInts | PlainMessage<SettingRealsFromNegativeInts> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.ComplexOptionType1
 */
export declare class ComplexOptionType1 extends Message<ComplexOptionType1> {
  /**
   * @generated from field: optional int32 foo = 1;
   */
  foo?: number;

  /**
   * @generated from field: optional int32 foo2 = 2;
   */
  foo2?: number;

  /**
   * @generated from field: optional int32 foo3 = 3;
   */
  foo3?: number;

  /**
   * @generated from field: repeated int32 foo4 = 4;
   */
  foo4: number[];

  constructor(data?: PartialMessage<ComplexOptionType1>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.ComplexOptionType1";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ComplexOptionType1;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ComplexOptionType1;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ComplexOptionType1;

  static equals(a: ComplexOptionType1 | PlainMessage<ComplexOptionType1> | undefined, b: ComplexOptionType1 | PlainMessage<ComplexOptionType1> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.ComplexOptionType2
 */
export declare class ComplexOptionType2 extends Message<ComplexOptionType2> {
  /**
   * @generated from field: optional protobuf_unittest.ComplexOptionType1 bar = 1;
   */
  bar?: ComplexOptionType1;

  /**
   * @generated from field: optional int32 baz = 2;
   */
  baz?: number;

  /**
   * @generated from field: optional protobuf_unittest.ComplexOptionType2.ComplexOptionType4 fred = 3;
   */
  fred?: ComplexOptionType2_ComplexOptionType4;

  /**
   * @generated from field: repeated protobuf_unittest.ComplexOptionType2.ComplexOptionType4 barney = 4;
   */
  barney: ComplexOptionType2_ComplexOptionType4[];

  constructor(data?: PartialMessage<ComplexOptionType2>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.ComplexOptionType2";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ComplexOptionType2;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ComplexOptionType2;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ComplexOptionType2;

  static equals(a: ComplexOptionType2 | PlainMessage<ComplexOptionType2> | undefined, b: ComplexOptionType2 | PlainMessage<ComplexOptionType2> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.ComplexOptionType2.ComplexOptionType4
 */
export declare class ComplexOptionType2_ComplexOptionType4 extends Message<ComplexOptionType2_ComplexOptionType4> {
  /**
   * @generated from field: optional int32 waldo = 1;
   */
  waldo?: number;

  constructor(data?: PartialMessage<ComplexOptionType2_ComplexOptionType4>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.ComplexOptionType2.ComplexOptionType4";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ComplexOptionType2_ComplexOptionType4;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ComplexOptionType2_ComplexOptionType4;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ComplexOptionType2_ComplexOptionType4;

  static equals(a: ComplexOptionType2_ComplexOptionType4 | PlainMessage<ComplexOptionType2_ComplexOptionType4> | undefined, b: ComplexOptionType2_ComplexOptionType4 | PlainMessage<ComplexOptionType2_ComplexOptionType4> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.ComplexOptionType3
 */
export declare class ComplexOptionType3 extends Message<ComplexOptionType3> {
  /**
   * @generated from field: optional int32 moo = 1;
   */
  moo?: number;

  /**
   * @generated from field: optional protobuf_unittest.ComplexOptionType3.ComplexOptionType5 complexoptiontype5 = 2;
   */
  complexoptiontype5?: ComplexOptionType3_ComplexOptionType5;

  constructor(data?: PartialMessage<ComplexOptionType3>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.ComplexOptionType3";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ComplexOptionType3;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ComplexOptionType3;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ComplexOptionType3;

  static equals(a: ComplexOptionType3 | PlainMessage<ComplexOptionType3> | undefined, b: ComplexOptionType3 | PlainMessage<ComplexOptionType3> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.ComplexOptionType3.ComplexOptionType5
 */
export declare class ComplexOptionType3_ComplexOptionType5 extends Message<ComplexOptionType3_ComplexOptionType5> {
  /**
   * @generated from field: optional int32 plugh = 3;
   */
  plugh?: number;

  constructor(data?: PartialMessage<ComplexOptionType3_ComplexOptionType5>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.ComplexOptionType3.ComplexOptionType5";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ComplexOptionType3_ComplexOptionType5;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ComplexOptionType3_ComplexOptionType5;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ComplexOptionType3_ComplexOptionType5;

  static equals(a: ComplexOptionType3_ComplexOptionType5 | PlainMessage<ComplexOptionType3_ComplexOptionType5> | undefined, b: ComplexOptionType3_ComplexOptionType5 | PlainMessage<ComplexOptionType3_ComplexOptionType5> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.ComplexOpt6
 */
export declare class ComplexOpt6 extends Message<ComplexOpt6> {
  /**
   * @generated from field: optional int32 xyzzy = 7593951;
   */
  xyzzy?: number;

  constructor(data?: PartialMessage<ComplexOpt6>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.ComplexOpt6";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ComplexOpt6;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ComplexOpt6;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ComplexOpt6;

  static equals(a: ComplexOpt6 | PlainMessage<ComplexOpt6> | undefined, b: ComplexOpt6 | PlainMessage<ComplexOpt6> | undefined): boolean;
}

/**
 * Note that we try various different ways of naming the same extension.
 *
 * @generated from message protobuf_unittest.VariousComplexOptions
 */
export declare class VariousComplexOptions extends Message<VariousComplexOptions> {
  constructor(data?: PartialMessage<VariousComplexOptions>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.VariousComplexOptions";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VariousComplexOptions;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VariousComplexOptions;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VariousComplexOptions;

  static equals(a: VariousComplexOptions | PlainMessage<VariousComplexOptions> | undefined, b: VariousComplexOptions | PlainMessage<VariousComplexOptions> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.AggregateMessageSet
 */
export declare class AggregateMessageSet extends Message<AggregateMessageSet> {
  constructor(data?: PartialMessage<AggregateMessageSet>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.AggregateMessageSet";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AggregateMessageSet;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AggregateMessageSet;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AggregateMessageSet;

  static equals(a: AggregateMessageSet | PlainMessage<AggregateMessageSet> | undefined, b: AggregateMessageSet | PlainMessage<AggregateMessageSet> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.AggregateMessageSetElement
 */
export declare class AggregateMessageSetElement extends Message<AggregateMessageSetElement> {
  /**
   * @generated from field: optional string s = 1;
   */
  s?: string;

  constructor(data?: PartialMessage<AggregateMessageSetElement>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.AggregateMessageSetElement";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AggregateMessageSetElement;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AggregateMessageSetElement;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AggregateMessageSetElement;

  static equals(a: AggregateMessageSetElement | PlainMessage<AggregateMessageSetElement> | undefined, b: AggregateMessageSetElement | PlainMessage<AggregateMessageSetElement> | undefined): boolean;
}

/**
 * A helper type used to test aggregate option parsing
 *
 * @generated from message protobuf_unittest.Aggregate
 */
export declare class Aggregate extends Message<Aggregate> {
  /**
   * @generated from field: optional int32 i = 1;
   */
  i?: number;

  /**
   * @generated from field: optional string s = 2;
   */
  s?: string;

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

  constructor(data?: PartialMessage<Aggregate>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.Aggregate";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Aggregate;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Aggregate;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Aggregate;

  static equals(a: Aggregate | PlainMessage<Aggregate> | undefined, b: Aggregate | PlainMessage<Aggregate> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.AggregateMessage
 */
export declare class AggregateMessage extends Message<AggregateMessage> {
  /**
   * @generated from field: optional int32 fieldname = 1;
   */
  fieldname?: number;

  constructor(data?: PartialMessage<AggregateMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.AggregateMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AggregateMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AggregateMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AggregateMessage;

  static equals(a: AggregateMessage | PlainMessage<AggregateMessage> | undefined, b: AggregateMessage | PlainMessage<AggregateMessage> | undefined): boolean;
}

/**
 * Test custom options for nested type.
 *
 * @generated from message protobuf_unittest.NestedOptionType
 */
export declare class NestedOptionType extends Message<NestedOptionType> {
  constructor(data?: PartialMessage<NestedOptionType>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.NestedOptionType";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NestedOptionType;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NestedOptionType;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NestedOptionType;

  static equals(a: NestedOptionType | PlainMessage<NestedOptionType> | undefined, b: NestedOptionType | PlainMessage<NestedOptionType> | undefined): boolean;
}

/**
 * @generated from enum protobuf_unittest.NestedOptionType.NestedEnum
 */
export declare enum NestedOptionType_NestedEnum {
  /**
   * @generated from enum value: NESTED_ENUM_VALUE = 1;
   */
  VALUE = 1,
}

/**
 * @generated from message protobuf_unittest.NestedOptionType.NestedMessage
 */
export declare class NestedOptionType_NestedMessage extends Message<NestedOptionType_NestedMessage> {
  /**
   * @generated from field: optional int32 nested_field = 1;
   */
  nestedField?: number;

  constructor(data?: PartialMessage<NestedOptionType_NestedMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.NestedOptionType.NestedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NestedOptionType_NestedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NestedOptionType_NestedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NestedOptionType_NestedMessage;

  static equals(a: NestedOptionType_NestedMessage | PlainMessage<NestedOptionType_NestedMessage> | undefined, b: NestedOptionType_NestedMessage | PlainMessage<NestedOptionType_NestedMessage> | undefined): boolean;
}

/**
 * Custom message option that has a required enum field.
 * WARNING: this is strongly discouraged!
 *
 * @generated from message protobuf_unittest.OldOptionType
 */
export declare class OldOptionType extends Message<OldOptionType> {
  /**
   * @generated from field: required protobuf_unittest.OldOptionType.TestEnum value = 1;
   */
  value: OldOptionType_TestEnum;

  constructor(data?: PartialMessage<OldOptionType>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.OldOptionType";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OldOptionType;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OldOptionType;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OldOptionType;

  static equals(a: OldOptionType | PlainMessage<OldOptionType> | undefined, b: OldOptionType | PlainMessage<OldOptionType> | undefined): boolean;
}

/**
 * @generated from enum protobuf_unittest.OldOptionType.TestEnum
 */
export declare enum OldOptionType_TestEnum {
  /**
   * @generated from enum value: OLD_VALUE = 0;
   */
  OLD_VALUE = 0,
}

/**
 * Updated version of the custom option above.
 *
 * @generated from message protobuf_unittest.NewOptionType
 */
export declare class NewOptionType extends Message<NewOptionType> {
  /**
   * @generated from field: required protobuf_unittest.NewOptionType.TestEnum value = 1;
   */
  value: NewOptionType_TestEnum;

  constructor(data?: PartialMessage<NewOptionType>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.NewOptionType";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NewOptionType;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NewOptionType;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NewOptionType;

  static equals(a: NewOptionType | PlainMessage<NewOptionType> | undefined, b: NewOptionType | PlainMessage<NewOptionType> | undefined): boolean;
}

/**
 * @generated from enum protobuf_unittest.NewOptionType.TestEnum
 */
export declare enum NewOptionType_TestEnum {
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
 * Test message using the "required_enum_opt" option defined above.
 *
 * @generated from message protobuf_unittest.TestMessageWithRequiredEnumOption
 */
export declare class TestMessageWithRequiredEnumOption extends Message<TestMessageWithRequiredEnumOption> {
  constructor(data?: PartialMessage<TestMessageWithRequiredEnumOption>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestMessageWithRequiredEnumOption";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageWithRequiredEnumOption;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageWithRequiredEnumOption;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageWithRequiredEnumOption;

  static equals(a: TestMessageWithRequiredEnumOption | PlainMessage<TestMessageWithRequiredEnumOption> | undefined, b: TestMessageWithRequiredEnumOption | PlainMessage<TestMessageWithRequiredEnumOption> | undefined): boolean;
}

