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

// @generated by protoc-gen-es v2.2.4 with parameter "target=ts,import_extension=js"
// @generated from file extra/jstype-proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/jstype-proto2.proto.
 */
export const file_extra_jstype_proto2: GenFile = /*@__PURE__*/
  fileDesc("ChlleHRyYS9qc3R5cGUtcHJvdG8yLnByb3RvEgRzcGVjIqkCChpKU1R5cGVQcm90bzJPbWl0dGVkTWVzc2FnZRIVCg1maXhlZDY0X2ZpZWxkGAEgASgGEhMKC2ludDY0X2ZpZWxkGAMgASgDEhYKDnNmaXhlZDY0X2ZpZWxkGAQgASgQEhQKDHNpbnQ2NF9maWVsZBgFIAEoEhIUCgx1aW50NjRfZmllbGQYBiABKAQSHgoWcmVwZWF0ZWRfZml4ZWQ2NF9maWVsZBgLIAMoBhIcChRyZXBlYXRlZF9pbnQ2NF9maWVsZBgMIAMoAxIfChdyZXBlYXRlZF9zZml4ZWQ2NF9maWVsZBgNIAMoEBIdChVyZXBlYXRlZF9zaW50NjRfZmllbGQYDiADKBISHQoVcmVwZWF0ZWRfdWludDY0X2ZpZWxkGA8gAygEItACChlKU1R5cGVQcm90bzJOb3JtYWxNZXNzYWdlEhkKDWZpeGVkNjRfZmllbGQYASABKAZCAjAAEhcKC2ludDY0X2ZpZWxkGAMgASgDQgIwABIaCg5zZml4ZWQ2NF9maWVsZBgEIAEoEEICMAASGAoMc2ludDY0X2ZpZWxkGAUgASgSQgIwABIYCgx1aW50NjRfZmllbGQYBiABKARCAjAAEiIKFnJlcGVhdGVkX2ZpeGVkNjRfZmllbGQYCyADKAZCAjAAEiAKFHJlcGVhdGVkX2ludDY0X2ZpZWxkGAwgAygDQgIwABIjChdyZXBlYXRlZF9zZml4ZWQ2NF9maWVsZBgNIAMoEEICMAASIQoVcmVwZWF0ZWRfc2ludDY0X2ZpZWxkGA4gAygSQgIwABIhChVyZXBlYXRlZF91aW50NjRfZmllbGQYDyADKARCAjAAItACChlKU1R5cGVQcm90bzJTdHJpbmdNZXNzYWdlEhkKDWZpeGVkNjRfZmllbGQYASABKAZCAjABEhcKC2ludDY0X2ZpZWxkGAMgASgDQgIwARIaCg5zZml4ZWQ2NF9maWVsZBgEIAEoEEICMAESGAoMc2ludDY0X2ZpZWxkGAUgASgSQgIwARIYCgx1aW50NjRfZmllbGQYBiABKARCAjABEiIKFnJlcGVhdGVkX2ZpeGVkNjRfZmllbGQYCyADKAZCAjABEiAKFHJlcGVhdGVkX2ludDY0X2ZpZWxkGAwgAygDQgIwARIjChdyZXBlYXRlZF9zZml4ZWQ2NF9maWVsZBgNIAMoEEICMAESIQoVcmVwZWF0ZWRfc2ludDY0X2ZpZWxkGA4gAygSQgIwARIhChVyZXBlYXRlZF91aW50NjRfZmllbGQYDyADKARCAjABItACChlKU1R5cGVQcm90bzJOdW1iZXJNZXNzYWdlEhkKDWZpeGVkNjRfZmllbGQYASABKAZCAjACEhcKC2ludDY0X2ZpZWxkGAMgASgDQgIwAhIaCg5zZml4ZWQ2NF9maWVsZBgEIAEoEEICMAISGAoMc2ludDY0X2ZpZWxkGAUgASgSQgIwAhIYCgx1aW50NjRfZmllbGQYBiABKARCAjACEiIKFnJlcGVhdGVkX2ZpeGVkNjRfZmllbGQYCyADKAZCAjACEiAKFHJlcGVhdGVkX2ludDY0X2ZpZWxkGAwgAygDQgIwAhIjChdyZXBlYXRlZF9zZml4ZWQ2NF9maWVsZBgNIAMoEEICMAISIQoVcmVwZWF0ZWRfc2ludDY0X2ZpZWxkGA4gAygSQgIwAhIhChVyZXBlYXRlZF91aW50NjRfZmllbGQYDyADKARCAjAC");

/**
 * @generated from message spec.JSTypeProto2OmittedMessage
 */
export type JSTypeProto2OmittedMessage = Message<"spec.JSTypeProto2OmittedMessage"> & {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1;
   */
  fixed64Field: bigint;

  /**
   * @generated from field: optional int64 int64_field = 3;
   */
  int64Field: bigint;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4;
   */
  sfixed64Field: bigint;

  /**
   * @generated from field: optional sint64 sint64_field = 5;
   */
  sint64Field: bigint;

  /**
   * @generated from field: optional uint64 uint64_field = 6;
   */
  uint64Field: bigint;

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11;
   */
  repeatedFixed64Field: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12;
   */
  repeatedInt64Field: bigint[];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13;
   */
  repeatedSfixed64Field: bigint[];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14;
   */
  repeatedSint64Field: bigint[];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15;
   */
  repeatedUint64Field: bigint[];
};

/**
 * Describes the message spec.JSTypeProto2OmittedMessage.
 * Use `create(JSTypeProto2OmittedMessageSchema)` to create a new message.
 */
export const JSTypeProto2OmittedMessageSchema: GenMessage<JSTypeProto2OmittedMessage> = /*@__PURE__*/
  messageDesc(file_extra_jstype_proto2, 0);

/**
 * @generated from message spec.JSTypeProto2NormalMessage
 */
export type JSTypeProto2NormalMessage = Message<"spec.JSTypeProto2NormalMessage"> & {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1 [jstype = JS_NORMAL];
   */
  fixed64Field: bigint;

  /**
   * @generated from field: optional int64 int64_field = 3 [jstype = JS_NORMAL];
   */
  int64Field: bigint;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4 [jstype = JS_NORMAL];
   */
  sfixed64Field: bigint;

  /**
   * @generated from field: optional sint64 sint64_field = 5 [jstype = JS_NORMAL];
   */
  sint64Field: bigint;

  /**
   * @generated from field: optional uint64 uint64_field = 6 [jstype = JS_NORMAL];
   */
  uint64Field: bigint;

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11 [jstype = JS_NORMAL];
   */
  repeatedFixed64Field: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12 [jstype = JS_NORMAL];
   */
  repeatedInt64Field: bigint[];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13 [jstype = JS_NORMAL];
   */
  repeatedSfixed64Field: bigint[];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14 [jstype = JS_NORMAL];
   */
  repeatedSint64Field: bigint[];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15 [jstype = JS_NORMAL];
   */
  repeatedUint64Field: bigint[];
};

/**
 * Describes the message spec.JSTypeProto2NormalMessage.
 * Use `create(JSTypeProto2NormalMessageSchema)` to create a new message.
 */
export const JSTypeProto2NormalMessageSchema: GenMessage<JSTypeProto2NormalMessage> = /*@__PURE__*/
  messageDesc(file_extra_jstype_proto2, 1);

/**
 * @generated from message spec.JSTypeProto2StringMessage
 */
export type JSTypeProto2StringMessage = Message<"spec.JSTypeProto2StringMessage"> & {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1 [jstype = JS_STRING];
   */
  fixed64Field: string;

  /**
   * @generated from field: optional int64 int64_field = 3 [jstype = JS_STRING];
   */
  int64Field: string;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4 [jstype = JS_STRING];
   */
  sfixed64Field: string;

  /**
   * @generated from field: optional sint64 sint64_field = 5 [jstype = JS_STRING];
   */
  sint64Field: string;

  /**
   * @generated from field: optional uint64 uint64_field = 6 [jstype = JS_STRING];
   */
  uint64Field: string;

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11 [jstype = JS_STRING];
   */
  repeatedFixed64Field: string[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12 [jstype = JS_STRING];
   */
  repeatedInt64Field: string[];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13 [jstype = JS_STRING];
   */
  repeatedSfixed64Field: string[];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14 [jstype = JS_STRING];
   */
  repeatedSint64Field: string[];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15 [jstype = JS_STRING];
   */
  repeatedUint64Field: string[];
};

/**
 * Describes the message spec.JSTypeProto2StringMessage.
 * Use `create(JSTypeProto2StringMessageSchema)` to create a new message.
 */
export const JSTypeProto2StringMessageSchema: GenMessage<JSTypeProto2StringMessage> = /*@__PURE__*/
  messageDesc(file_extra_jstype_proto2, 2);

/**
 * @generated from message spec.JSTypeProto2NumberMessage
 */
export type JSTypeProto2NumberMessage = Message<"spec.JSTypeProto2NumberMessage"> & {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1 [jstype = JS_NUMBER];
   */
  fixed64Field: bigint;

  /**
   * @generated from field: optional int64 int64_field = 3 [jstype = JS_NUMBER];
   */
  int64Field: bigint;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4 [jstype = JS_NUMBER];
   */
  sfixed64Field: bigint;

  /**
   * @generated from field: optional sint64 sint64_field = 5 [jstype = JS_NUMBER];
   */
  sint64Field: bigint;

  /**
   * @generated from field: optional uint64 uint64_field = 6 [jstype = JS_NUMBER];
   */
  uint64Field: bigint;

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11 [jstype = JS_NUMBER];
   */
  repeatedFixed64Field: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12 [jstype = JS_NUMBER];
   */
  repeatedInt64Field: bigint[];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13 [jstype = JS_NUMBER];
   */
  repeatedSfixed64Field: bigint[];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14 [jstype = JS_NUMBER];
   */
  repeatedSint64Field: bigint[];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15 [jstype = JS_NUMBER];
   */
  repeatedUint64Field: bigint[];
};

/**
 * Describes the message spec.JSTypeProto2NumberMessage.
 * Use `create(JSTypeProto2NumberMessageSchema)` to create a new message.
 */
export const JSTypeProto2NumberMessageSchema: GenMessage<JSTypeProto2NumberMessage> = /*@__PURE__*/
  messageDesc(file_extra_jstype_proto2, 3);

