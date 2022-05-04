// Copyright 2021-2022 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v0.0.3 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto2} from "@bufbuild/protobuf";

/**
 * @generated from enum spec.Proto2Enum
 */
export declare enum Proto2Enum {
  /**
   * @generated from enum value: PROTO2_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PROTO2_ENUM_NO = 2;
   */
  NO = 2,
}

/**
 * @generated from message spec.Proto2PackedMessage
 */
export declare class Proto2PackedMessage extends Message<Proto2PackedMessage> {
  /**
   * @generated from field: repeated double packed_double_field = 101 [packed = true];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 102 [packed = true];
   */
  packedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 103 [packed = true];
   */
  packedUint64Field: bigint[];

  constructor(data?: PartialMessage<Proto2PackedMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2PackedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2PackedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2PackedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2PackedMessage;

  static equals(a: Proto2PackedMessage | PlainMessage<Proto2PackedMessage> | undefined, b: Proto2PackedMessage | PlainMessage<Proto2PackedMessage> | undefined): boolean;
}

/**
 * @generated from message spec.Proto2UnpackedMessage
 */
export declare class Proto2UnpackedMessage extends Message<Proto2UnpackedMessage> {
  /**
   * @generated from field: repeated double unpacked_double_field = 201 [packed = false];
   */
  unpackedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 202 [packed = false];
   */
  unpackedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 203 [packed = false];
   */
  unpackedUint64Field: bigint[];

  constructor(data?: PartialMessage<Proto2UnpackedMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2UnpackedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2UnpackedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2UnpackedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2UnpackedMessage;

  static equals(a: Proto2UnpackedMessage | PlainMessage<Proto2UnpackedMessage> | undefined, b: Proto2UnpackedMessage | PlainMessage<Proto2UnpackedMessage> | undefined): boolean;
}

/**
 * @generated from message spec.Proto2UnspecifiedPackedMessage
 */
export declare class Proto2UnspecifiedPackedMessage extends Message<Proto2UnspecifiedPackedMessage> {
  /**
   * @generated from field: repeated double double_field = 1;
   */
  doubleField: number[];

  /**
   * @generated from field: repeated uint32 uint32_field = 2;
   */
  uint32Field: number[];

  /**
   * @generated from field: repeated uint64 uint64_field = 3;
   */
  uint64Field: bigint[];

  constructor(data?: PartialMessage<Proto2UnspecifiedPackedMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2UnspecifiedPackedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2UnspecifiedPackedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2UnspecifiedPackedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2UnspecifiedPackedMessage;

  static equals(a: Proto2UnspecifiedPackedMessage | PlainMessage<Proto2UnspecifiedPackedMessage> | undefined, b: Proto2UnspecifiedPackedMessage | PlainMessage<Proto2UnspecifiedPackedMessage> | undefined): boolean;
}

/**
 * @generated from message spec.Proto2OptionalMessage
 */
export declare class Proto2OptionalMessage extends Message<Proto2OptionalMessage> {
  /**
   * @generated from field: optional string string_field = 1;
   */
  stringField?: string;

  /**
   * @generated from field: optional bytes bytes_field = 2;
   */
  bytesField?: Uint8Array;

  /**
   * @generated from field: optional spec.Proto2Enum enum_field = 3;
   */
  enumField?: Proto2Enum;

  /**
   * @generated from field: optional spec.Proto2ChildMessage message_field = 4;
   */
  messageField?: Proto2ChildMessage;

  constructor(data?: PartialMessage<Proto2OptionalMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2OptionalMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2OptionalMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2OptionalMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2OptionalMessage;

  static equals(a: Proto2OptionalMessage | PlainMessage<Proto2OptionalMessage> | undefined, b: Proto2OptionalMessage | PlainMessage<Proto2OptionalMessage> | undefined): boolean;
}

/**
 * @generated from message spec.Proto2RequiredMessage
 */
export declare class Proto2RequiredMessage extends Message<Proto2RequiredMessage> {
  /**
   * @generated from field: required string string_field = 1;
   */
  stringField: string;

  /**
   * @generated from field: required bytes bytes_field = 2;
   */
  bytesField: Uint8Array;

  /**
   * @generated from field: required spec.Proto2Enum enum_field = 3;
   */
  enumField: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2ChildMessage message_field = 4;
   */
  messageField?: Proto2ChildMessage;

  constructor(data?: PartialMessage<Proto2RequiredMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2RequiredMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2RequiredMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2RequiredMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2RequiredMessage;

  static equals(a: Proto2RequiredMessage | PlainMessage<Proto2RequiredMessage> | undefined, b: Proto2RequiredMessage | PlainMessage<Proto2RequiredMessage> | undefined): boolean;
}

/**
 * @generated from message spec.Proto2RequiredDefaultsMessage
 */
export declare class Proto2RequiredDefaultsMessage extends Message<Proto2RequiredDefaultsMessage> {
  /**
   * @generated from field: required string string_field = 1 [default = "hello \" *\/ "];
   */
  stringField: string;

  /**
   * @generated from field: required bytes bytes_field = 2 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  bytesField: Uint8Array;

  /**
   * @generated from field: required spec.Proto2Enum enum_field = 3 [default = PROTO2_ENUM_YES];
   */
  enumField: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2ChildMessage message_field = 4;
   */
  messageField?: Proto2ChildMessage;

  constructor(data?: PartialMessage<Proto2RequiredDefaultsMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2RequiredDefaultsMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2RequiredDefaultsMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2RequiredDefaultsMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2RequiredDefaultsMessage;

  static equals(a: Proto2RequiredDefaultsMessage | PlainMessage<Proto2RequiredDefaultsMessage> | undefined, b: Proto2RequiredDefaultsMessage | PlainMessage<Proto2RequiredDefaultsMessage> | undefined): boolean;
}

/**
 * @generated from message spec.Proto2DefaultsMessage
 */
export declare class Proto2DefaultsMessage extends Message<Proto2DefaultsMessage> {
  /**
   * @generated from field: optional string string_field = 1 [default = "hello \" *\/ "];
   */
  stringField?: string;

  /**
   * @generated from field: optional bytes bytes_field = 2 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  bytesField?: Uint8Array;

  /**
   * @generated from field: optional int32 int32_field = 3 [default = 128];
   */
  int32Field?: number;

  /**
   * @generated from field: optional int64 int46_field = 4 [default = -256];
   */
  int46Field?: bigint;

  /**
   * @generated from field: optional float float_field = 5 [default = -512.13];
   */
  floatField?: number;

  /**
   * @generated from field: optional bool bool_field = 6 [default = true];
   */
  boolField?: boolean;

  /**
   * @generated from field: optional spec.Proto2Enum enum_field = 7 [default = PROTO2_ENUM_YES];
   */
  enumField?: Proto2Enum;

  /**
   * @generated from field: optional spec.Proto2ChildMessage message_field = 8;
   */
  messageField?: Proto2ChildMessage;

  constructor(data?: PartialMessage<Proto2DefaultsMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2DefaultsMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2DefaultsMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2DefaultsMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2DefaultsMessage;

  static equals(a: Proto2DefaultsMessage | PlainMessage<Proto2DefaultsMessage> | undefined, b: Proto2DefaultsMessage | PlainMessage<Proto2DefaultsMessage> | undefined): boolean;
}

/**
 * @generated from message spec.Proto2ChildMessage
 */
export declare class Proto2ChildMessage extends Message<Proto2ChildMessage> {
  /**
   * @generated from field: optional string string_field = 1;
   */
  stringField?: string;

  constructor(data?: PartialMessage<Proto2ChildMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "spec.Proto2ChildMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2ChildMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2ChildMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2ChildMessage;

  static equals(a: Proto2ChildMessage | PlainMessage<Proto2ChildMessage> | undefined, b: Proto2ChildMessage | PlainMessage<Proto2ChildMessage> | undefined): boolean;
}

