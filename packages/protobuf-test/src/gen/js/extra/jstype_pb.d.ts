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

// @generated by protoc-gen-es v1.7.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/jstype.proto (package spec, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message spec.JSTypeOmittedMessage
 */
export declare class JSTypeOmittedMessage extends Message<JSTypeOmittedMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1;
   */
  fixed64Field: bigint;

  /**
   * @generated from field: int64 int64_field = 3;
   */
  int64Field: bigint;

  /**
   * @generated from field: sfixed64 sfixed64_field = 4;
   */
  sfixed64Field: bigint;

  /**
   * @generated from field: sint64 sint64_field = 5;
   */
  sint64Field: bigint;

  /**
   * @generated from field: uint64 uint64_field = 6;
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

  constructor(data?: PartialMessage<JSTypeOmittedMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.JSTypeOmittedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeOmittedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeOmittedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeOmittedMessage;

  static equals(a: JSTypeOmittedMessage | PlainMessage<JSTypeOmittedMessage> | undefined, b: JSTypeOmittedMessage | PlainMessage<JSTypeOmittedMessage> | undefined): boolean;
}

/**
 * @generated from message spec.JSTypeNormalMessage
 */
export declare class JSTypeNormalMessage extends Message<JSTypeNormalMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1 [jstype = JS_NORMAL];
   */
  fixed64Field: bigint;

  /**
   * @generated from field: int64 int64_field = 3 [jstype = JS_NORMAL];
   */
  int64Field: bigint;

  /**
   * @generated from field: sfixed64 sfixed64_field = 4 [jstype = JS_NORMAL];
   */
  sfixed64Field: bigint;

  /**
   * @generated from field: sint64 sint64_field = 5 [jstype = JS_NORMAL];
   */
  sint64Field: bigint;

  /**
   * @generated from field: uint64 uint64_field = 6 [jstype = JS_NORMAL];
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

  constructor(data?: PartialMessage<JSTypeNormalMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.JSTypeNormalMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeNormalMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeNormalMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeNormalMessage;

  static equals(a: JSTypeNormalMessage | PlainMessage<JSTypeNormalMessage> | undefined, b: JSTypeNormalMessage | PlainMessage<JSTypeNormalMessage> | undefined): boolean;
}

/**
 * @generated from message spec.JSTypeStringMessage
 */
export declare class JSTypeStringMessage extends Message<JSTypeStringMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1 [jstype = JS_STRING];
   */
  fixed64Field: string;

  /**
   * @generated from field: int64 int64_field = 3 [jstype = JS_STRING];
   */
  int64Field: string;

  /**
   * @generated from field: sfixed64 sfixed64_field = 4 [jstype = JS_STRING];
   */
  sfixed64Field: string;

  /**
   * @generated from field: sint64 sint64_field = 5 [jstype = JS_STRING];
   */
  sint64Field: string;

  /**
   * @generated from field: uint64 uint64_field = 6 [jstype = JS_STRING];
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

  constructor(data?: PartialMessage<JSTypeStringMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.JSTypeStringMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeStringMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeStringMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeStringMessage;

  static equals(a: JSTypeStringMessage | PlainMessage<JSTypeStringMessage> | undefined, b: JSTypeStringMessage | PlainMessage<JSTypeStringMessage> | undefined): boolean;
}

/**
 * @generated from message spec.JSTypeNumberMessage
 */
export declare class JSTypeNumberMessage extends Message<JSTypeNumberMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1 [jstype = JS_NUMBER];
   */
  fixed64Field: bigint;

  /**
   * @generated from field: int64 int64_field = 3 [jstype = JS_NUMBER];
   */
  int64Field: bigint;

  /**
   * @generated from field: sfixed64 sfixed64_field = 4 [jstype = JS_NUMBER];
   */
  sfixed64Field: bigint;

  /**
   * @generated from field: sint64 sint64_field = 5 [jstype = JS_NUMBER];
   */
  sint64Field: bigint;

  /**
   * @generated from field: uint64 uint64_field = 6 [jstype = JS_NUMBER];
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

  constructor(data?: PartialMessage<JSTypeNumberMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.JSTypeNumberMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeNumberMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeNumberMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeNumberMessage;

  static equals(a: JSTypeNumberMessage | PlainMessage<JSTypeNumberMessage> | undefined, b: JSTypeNumberMessage | PlainMessage<JSTypeNumberMessage> | undefined): boolean;
}

