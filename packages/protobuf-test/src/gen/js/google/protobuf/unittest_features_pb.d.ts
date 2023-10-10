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

// @generated by protoc-gen-es v1.3.3 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_features.proto (package pb, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message pb.TestMessage
 */
export declare class TestMessage extends Message<TestMessage> {
  constructor(data?: PartialMessage<TestMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "pb.TestMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessage;

  static equals(a: TestMessage | PlainMessage<TestMessage> | undefined, b: TestMessage | PlainMessage<TestMessage> | undefined): boolean;
}

/**
 * @generated from message pb.TestMessage.Nested
 */
export declare class TestMessage_Nested extends Message<TestMessage_Nested> {
  constructor(data?: PartialMessage<TestMessage_Nested>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "pb.TestMessage.Nested";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessage_Nested;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessage_Nested;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessage_Nested;

  static equals(a: TestMessage_Nested | PlainMessage<TestMessage_Nested> | undefined, b: TestMessage_Nested | PlainMessage<TestMessage_Nested> | undefined): boolean;
}

/**
 * @generated from message pb.TestFeatures
 */
export declare class TestFeatures extends Message<TestFeatures> {
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

  constructor(data?: PartialMessage<TestFeatures>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "pb.TestFeatures";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestFeatures;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestFeatures;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestFeatures;

  static equals(a: TestFeatures | PlainMessage<TestFeatures> | undefined, b: TestFeatures | PlainMessage<TestFeatures> | undefined): boolean;
}

/**
 * @generated from enum pb.TestFeatures.EnumFeature
 */
export declare enum TestFeatures_EnumFeature {
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

/**
 * @generated from message pb.TestFeatures.MessageFeature
 */
export declare class TestFeatures_MessageFeature extends Message<TestFeatures_MessageFeature> {
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

  constructor(data?: PartialMessage<TestFeatures_MessageFeature>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "pb.TestFeatures.MessageFeature";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestFeatures_MessageFeature;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestFeatures_MessageFeature;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestFeatures_MessageFeature;

  static equals(a: TestFeatures_MessageFeature | PlainMessage<TestFeatures_MessageFeature> | undefined, b: TestFeatures_MessageFeature | PlainMessage<TestFeatures_MessageFeature> | undefined): boolean;
}

