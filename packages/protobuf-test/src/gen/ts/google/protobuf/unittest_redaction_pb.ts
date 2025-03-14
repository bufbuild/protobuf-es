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

// Test proto for redaction

// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/unittest_redaction.proto (package proto2_unittest, edition 2023)
// option features.repeated_field_encoding = EXPANDED;
// option features.utf8_validation = NONE;
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Any, FieldOptions } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_any, file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_redaction.proto.
 */
export const file_google_protobuf_unittest_redaction: GenFile = /*@__PURE__*/
  fileDesc("Cihnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcmVkYWN0aW9uLnByb3RvEg9wcm90bzJfdW5pdHRlc3QiJgoXVGVzdFJlZGFjdGVkTmVzdE1lc3NhZ2USCwoDZm9vGAEgASgJIi4KH1Rlc3RSZXBlYXRlZFJlZGFjdGVkTmVzdE1lc3NhZ2USCwoDYmFyGAEgASgJIk4KD1Rlc3RNZXNzYWdlRW51bRI7Cg9yZWRhY3RhYmxlX2VudW0YASADKA4yIi5wcm90bzJfdW5pdHRlc3QuTWV0YUFubm90YXRlZEVudW0ipQEKFVRlc3ROZXN0ZWRNZXNzYWdlRW51bRI3CgtkaXJlY3RfZW51bRgBIAMoDjIiLnByb3RvMl91bml0dGVzdC5NZXRhQW5ub3RhdGVkRW51bRI1CgtuZXN0ZWRfZW51bRgCIAEoCzIgLnByb3RvMl91bml0dGVzdC5UZXN0TWVzc2FnZUVudW0SHAoPcmVkYWN0ZWRfc3RyaW5nGAMgASgJQgOAAQEi3gMKE1Rlc3RSZWRhY3RlZE1lc3NhZ2USFgoKdGV4dF9maWVsZBgBIAEoCUICGAESHgoObWV0YV9hbm5vdGF0ZWQYCCABKAlCBqjk9fsPARItChdyZXBlYXRlZF9tZXRhX2Fubm90YXRlZBgJIAEoCUIMsOT1+w8CsOT1+w8BEjUKH3VucmVkYWN0ZWRfcmVwZWF0ZWRfYW5ub3RhdGlvbnMYCiABKAlCDLDk9fsPArDk9fsPAxIzCiZ1bnJlcG9ydGVkX25vbl9tZXRhX2RlYnVnX3JlZGFjdF9maWVsZBgRIAEoCUIDgAEBEiwKCWFueV9maWVsZBgSIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BbnlCA4ABARIgChByZWRhY3RhYmxlX2ZhbHNlGBMgASgJQgao5PX7DwQSLAoYdGVzdF9kaXJlY3RfbWVzc2FnZV9lbnVtGBYgASgJQgq65PX7DwQIAggBEi4KGHRlc3RfbmVzdGVkX21lc3NhZ2VfZW51bRgXIAEoCUIMuuT1+w8GEgQIAggBEkYKGnRlc3RfcmVkYWN0ZWRfbWVzc2FnZV9lbnVtGBggASgJQiK65PX7DxwaGnJlZGFjdGVkX2J1dF9kb2VzbnRfcmVkYWN0KogBChFNZXRhQW5ub3RhdGVkRW51bRINCglURVNUX05VTEwQABIXCg9URVNUX1JFREFDVEFCTEUQARoCGAESEgoOVEVTVF9OT19SRURBQ1QQAhIYChRURVNUX05PX1JFREFDVF9BR0FJThADEh0KFVRFU1RfUkVEQUNUQUJMRV9GQUxTRRAEGgIYADp1ChNtZXRhX2Fubm90YXRlZF9lbnVtEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxjF3L7/ASABKA4yIi5wcm90bzJfdW5pdHRlc3QuTWV0YUFubm90YXRlZEVudW1SEW1ldGFBbm5vdGF0ZWRFbnVtOoYBChxyZXBlYXRlZF9tZXRhX2Fubm90YXRlZF9lbnVtEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxjG3L7/ASADKA4yIi5wcm90bzJfdW5pdHRlc3QuTWV0YUFubm90YXRlZEVudW1SGXJlcGVhdGVkTWV0YUFubm90YXRlZEVudW06ggEKGHRlc3RfbmVzdGVkX21lc3NhZ2VfZW51bRIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYx9y+/wEgASgLMiYucHJvdG8yX3VuaXR0ZXN0LlRlc3ROZXN0ZWRNZXNzYWdlRW51bVIVdGVzdE5lc3RlZE1lc3NhZ2VFbnVtQioKEWNvbS5nb29nbGUucHJvdG9zQg5SZWRhY3Rpb25Qcm90b5IDBBgCIANiCGVkaXRpb25zcOgH", [file_google_protobuf_any, file_google_protobuf_descriptor]);

/**
 * @generated from message proto2_unittest.TestRedactedNestMessage
 */
export type TestRedactedNestMessage = Message<"proto2_unittest.TestRedactedNestMessage"> & {
  /**
   * @generated from field: string foo = 1;
   */
  foo: string;
};

/**
 * Describes the message proto2_unittest.TestRedactedNestMessage.
 * Use `create(TestRedactedNestMessageSchema)` to create a new message.
 */
export const TestRedactedNestMessageSchema: GenMessage<TestRedactedNestMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_redaction, 0);

/**
 * @generated from message proto2_unittest.TestRepeatedRedactedNestMessage
 */
export type TestRepeatedRedactedNestMessage = Message<"proto2_unittest.TestRepeatedRedactedNestMessage"> & {
  /**
   * @generated from field: string bar = 1;
   */
  bar: string;
};

/**
 * Describes the message proto2_unittest.TestRepeatedRedactedNestMessage.
 * Use `create(TestRepeatedRedactedNestMessageSchema)` to create a new message.
 */
export const TestRepeatedRedactedNestMessageSchema: GenMessage<TestRepeatedRedactedNestMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_redaction, 1);

/**
 * @generated from message proto2_unittest.TestMessageEnum
 */
export type TestMessageEnum = Message<"proto2_unittest.TestMessageEnum"> & {
  /**
   * @generated from field: repeated proto2_unittest.MetaAnnotatedEnum redactable_enum = 1;
   */
  redactableEnum: MetaAnnotatedEnum[];
};

/**
 * Describes the message proto2_unittest.TestMessageEnum.
 * Use `create(TestMessageEnumSchema)` to create a new message.
 */
export const TestMessageEnumSchema: GenMessage<TestMessageEnum> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_redaction, 2);

/**
 * @generated from message proto2_unittest.TestNestedMessageEnum
 */
export type TestNestedMessageEnum = Message<"proto2_unittest.TestNestedMessageEnum"> & {
  /**
   * @generated from field: repeated proto2_unittest.MetaAnnotatedEnum direct_enum = 1;
   */
  directEnum: MetaAnnotatedEnum[];

  /**
   * @generated from field: proto2_unittest.TestMessageEnum nested_enum = 2;
   */
  nestedEnum?: TestMessageEnum;

  /**
   * @generated from field: string redacted_string = 3;
   */
  redactedString: string;
};

/**
 * Describes the message proto2_unittest.TestNestedMessageEnum.
 * Use `create(TestNestedMessageEnumSchema)` to create a new message.
 */
export const TestNestedMessageEnumSchema: GenMessage<TestNestedMessageEnum> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_redaction, 3);

/**
 * @generated from message proto2_unittest.TestRedactedMessage
 */
export type TestRedactedMessage = Message<"proto2_unittest.TestRedactedMessage"> & {
  /**
   * @generated from field: string text_field = 1 [deprecated = true];
   * @deprecated
   */
  textField: string;

  /**
   * @generated from field: string meta_annotated = 8;
   */
  metaAnnotated: string;

  /**
   * @generated from field: string repeated_meta_annotated = 9;
   */
  repeatedMetaAnnotated: string;

  /**
   * @generated from field: string unredacted_repeated_annotations = 10;
   */
  unredactedRepeatedAnnotations: string;

  /**
   * @generated from field: string unreported_non_meta_debug_redact_field = 17;
   */
  unreportedNonMetaDebugRedactField: string;

  /**
   * @generated from field: google.protobuf.Any any_field = 18;
   */
  anyField?: Any;

  /**
   * @generated from field: string redactable_false = 19;
   */
  redactableFalse: string;

  /**
   * @generated from field: string test_direct_message_enum = 22;
   */
  testDirectMessageEnum: string;

  /**
   * @generated from field: string test_nested_message_enum = 23;
   */
  testNestedMessageEnum: string;

  /**
   * @generated from field: string test_redacted_message_enum = 24;
   */
  testRedactedMessageEnum: string;
};

/**
 * Describes the message proto2_unittest.TestRedactedMessage.
 * Use `create(TestRedactedMessageSchema)` to create a new message.
 */
export const TestRedactedMessageSchema: GenMessage<TestRedactedMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_redaction, 4);

/**
 * @generated from enum proto2_unittest.MetaAnnotatedEnum
 */
export enum MetaAnnotatedEnum {
  /**
   * @generated from enum value: TEST_NULL = 0;
   */
  TEST_NULL = 0,

  /**
   * @generated from enum value: TEST_REDACTABLE = 1;
   */
  TEST_REDACTABLE = 1,

  /**
   * @generated from enum value: TEST_NO_REDACT = 2;
   */
  TEST_NO_REDACT = 2,

  /**
   * @generated from enum value: TEST_NO_REDACT_AGAIN = 3;
   */
  TEST_NO_REDACT_AGAIN = 3,

  /**
   * @generated from enum value: TEST_REDACTABLE_FALSE = 4;
   */
  TEST_REDACTABLE_FALSE = 4,
}

/**
 * Describes the enum proto2_unittest.MetaAnnotatedEnum.
 */
export const MetaAnnotatedEnumSchema: GenEnum<MetaAnnotatedEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_redaction, 0);

/**
 * @generated from extension: proto2_unittest.MetaAnnotatedEnum meta_annotated_enum = 535801413;
 */
export const meta_annotated_enum: GenExtension<FieldOptions, MetaAnnotatedEnum> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_redaction, 0);

/**
 * @generated from extension: repeated proto2_unittest.MetaAnnotatedEnum repeated_meta_annotated_enum = 535801414;
 */
export const repeated_meta_annotated_enum: GenExtension<FieldOptions, MetaAnnotatedEnum[]> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_redaction, 1);

/**
 * @generated from extension: proto2_unittest.TestNestedMessageEnum test_nested_message_enum = 535801415;
 */
export const test_nested_message_enum: GenExtension<FieldOptions, TestNestedMessageEnum> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_redaction, 2);

