// Protocol Buffers - Google's data interchange format
// Copyright 2023 Google Inc.  All rights reserved.
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

// @generated by protoc-gen-es v1.3.3 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_features.proto (package pb, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message pb.TestMessage
 */
export class TestMessage extends Message<TestMessage> {
  constructor(data?: PartialMessage<TestMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "pb.TestMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessage {
    return new TestMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessage {
    return new TestMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessage {
    return new TestMessage().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessage | PlainMessage<TestMessage> | undefined, b: TestMessage | PlainMessage<TestMessage> | undefined): boolean {
    return proto2.util.equals(TestMessage, a, b);
  }
}

/**
 * @generated from message pb.TestMessage.Nested
 */
export class TestMessage_Nested extends Message<TestMessage_Nested> {
  constructor(data?: PartialMessage<TestMessage_Nested>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "pb.TestMessage.Nested";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessage_Nested {
    return new TestMessage_Nested().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessage_Nested {
    return new TestMessage_Nested().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessage_Nested {
    return new TestMessage_Nested().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessage_Nested | PlainMessage<TestMessage_Nested> | undefined, b: TestMessage_Nested | PlainMessage<TestMessage_Nested> | undefined): boolean {
    return proto2.util.equals(TestMessage_Nested, a, b);
  }
}

/**
 * @generated from message pb.TestFeatures
 */
export class TestFeatures extends Message<TestFeatures> {
  /**
   * @generated from field: optional int32 int_file_feature = 1;
   */
  intFileFeature?: number;

  /**
   * @generated from field: optional int32 int_extension_range_feature = 2;
   */
  intExtensionRangeFeature?: number;

  /**
   * @generated from field: optional int32 int_message_feature = 3;
   */
  intMessageFeature?: number;

  /**
   * @generated from field: optional int32 int_field_feature = 4;
   */
  intFieldFeature?: number;

  /**
   * @generated from field: optional int32 int_oneof_feature = 5;
   */
  intOneofFeature?: number;

  /**
   * @generated from field: optional int32 int_enum_feature = 6;
   */
  intEnumFeature?: number;

  /**
   * @generated from field: optional int32 int_enum_entry_feature = 7;
   */
  intEnumEntryFeature?: number;

  /**
   * @generated from field: optional int32 int_service_feature = 8;
   */
  intServiceFeature?: number;

  /**
   * @generated from field: optional int32 int_method_feature = 9;
   */
  intMethodFeature?: number;

  /**
   * @generated from field: optional int32 int_multiple_feature = 10;
   */
  intMultipleFeature?: number;

  /**
   * @generated from field: optional bool bool_field_feature = 11;
   */
  boolFieldFeature?: boolean;

  /**
   * @generated from field: optional float float_field_feature = 12;
   */
  floatFieldFeature?: number;

  /**
   * @generated from field: optional pb.TestFeatures.MessageFeature message_field_feature = 13;
   */
  messageFieldFeature?: TestFeatures_MessageFeature;

  /**
   * @generated from field: optional pb.TestFeatures.EnumFeature enum_field_feature = 14;
   */
  enumFieldFeature?: TestFeatures_EnumFeature;

  /**
   * @generated from field: optional int32 int_source_feature = 15;
   */
  intSourceFeature?: number;

  /**
   * @generated from field: optional string string_source_feature = 16;
   */
  stringSourceFeature?: string;

  constructor(data?: PartialMessage<TestFeatures>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "pb.TestFeatures";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "int_file_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "int_extension_range_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 3, name: "int_message_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 4, name: "int_field_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 5, name: "int_oneof_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 6, name: "int_enum_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 7, name: "int_enum_entry_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 8, name: "int_service_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 9, name: "int_method_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 10, name: "int_multiple_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 11, name: "bool_field_feature", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 12, name: "float_field_feature", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 13, name: "message_field_feature", kind: "message", T: TestFeatures_MessageFeature, opt: true },
    { no: 14, name: "enum_field_feature", kind: "enum", T: proto2.getEnumType(TestFeatures_EnumFeature), opt: true },
    { no: 15, name: "int_source_feature", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 16, name: "string_source_feature", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestFeatures {
    return new TestFeatures().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestFeatures {
    return new TestFeatures().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestFeatures {
    return new TestFeatures().fromJsonString(jsonString, options);
  }

  static equals(a: TestFeatures | PlainMessage<TestFeatures> | undefined, b: TestFeatures | PlainMessage<TestFeatures> | undefined): boolean {
    return proto2.util.equals(TestFeatures, a, b);
  }
}

/**
 * @generated from enum pb.TestFeatures.EnumFeature
 */
export enum TestFeatures_EnumFeature {
  /**
   * @generated from enum value: TEST_ENUM_FEATURE_UNKNOWN = 0;
   */
  TEST_ENUM_FEATURE_UNKNOWN = 0,

  /**
   * @generated from enum value: ENUM_VALUE1 = 1;
   */
  ENUM_VALUE1 = 1,

  /**
   * @generated from enum value: ENUM_VALUE2 = 2;
   */
  ENUM_VALUE2 = 2,

  /**
   * @generated from enum value: ENUM_VALUE3 = 3;
   */
  ENUM_VALUE3 = 3,

  /**
   * @generated from enum value: ENUM_VALUE4 = 4;
   */
  ENUM_VALUE4 = 4,

  /**
   * @generated from enum value: ENUM_VALUE5 = 5;
   */
  ENUM_VALUE5 = 5,
}
// Retrieve enum metadata with: proto2.getEnumType(TestFeatures_EnumFeature)
proto2.util.setEnumType(TestFeatures_EnumFeature, "pb.TestFeatures.EnumFeature", [
  { no: 0, name: "TEST_ENUM_FEATURE_UNKNOWN" },
  { no: 1, name: "ENUM_VALUE1" },
  { no: 2, name: "ENUM_VALUE2" },
  { no: 3, name: "ENUM_VALUE3" },
  { no: 4, name: "ENUM_VALUE4" },
  { no: 5, name: "ENUM_VALUE5" },
]);

/**
 * @generated from message pb.TestFeatures.MessageFeature
 */
export class TestFeatures_MessageFeature extends Message<TestFeatures_MessageFeature> {
  /**
   * @generated from field: optional bool bool_field = 1;
   */
  boolField?: boolean;

  /**
   * @generated from field: optional int32 int_field = 2;
   */
  intField?: number;

  /**
   * @generated from field: optional float float_field = 3;
   */
  floatField?: number;

  /**
   * @generated from field: optional string string_field = 4;
   */
  stringField?: string;

  constructor(data?: PartialMessage<TestFeatures_MessageFeature>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "pb.TestFeatures.MessageFeature";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "bool_field", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 2, name: "int_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 3, name: "float_field", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true },
    { no: 4, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestFeatures_MessageFeature {
    return new TestFeatures_MessageFeature().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestFeatures_MessageFeature {
    return new TestFeatures_MessageFeature().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestFeatures_MessageFeature {
    return new TestFeatures_MessageFeature().fromJsonString(jsonString, options);
  }

  static equals(a: TestFeatures_MessageFeature | PlainMessage<TestFeatures_MessageFeature> | undefined, b: TestFeatures_MessageFeature | PlainMessage<TestFeatures_MessageFeature> | undefined): boolean {
    return proto2.util.equals(TestFeatures_MessageFeature, a, b);
  }
}

