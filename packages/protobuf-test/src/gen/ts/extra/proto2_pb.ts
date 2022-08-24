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

// @generated by protoc-gen-es v0.1.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto2, protoInt64} from "@bufbuild/protobuf";

/**
 * @generated from enum spec.Proto2Enum
 */
export enum Proto2Enum {
  /**
   * @generated from enum value: PROTO2_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PROTO2_ENUM_NO = 2;
   */
  NO = 2,
}
// Retrieve enum metadata with: proto2.getEnumType(Proto2Enum)
proto2.util.setEnumType(Proto2Enum, "spec.Proto2Enum", [
  { no: 1, name: "PROTO2_ENUM_YES" },
  { no: 2, name: "PROTO2_ENUM_NO" },
]);

/**
 * @generated from message spec.Proto2PackedMessage
 */
export class Proto2PackedMessage extends Message<Proto2PackedMessage> {
  /**
   * @generated from field: repeated double packed_double_field = 101 [packed = true];
   */
  packedDoubleField: number[] = [];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 102 [packed = true];
   */
  packedUint32Field: number[] = [];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 103 [packed = true];
   */
  packedUint64Field: bigint[] = [];

  constructor(data?: PartialMessage<Proto2PackedMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2PackedMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 101, name: "packed_double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true, packed: true },
    { no: 102, name: "packed_uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true, packed: true },
    { no: 103, name: "packed_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true, packed: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2PackedMessage {
    return new Proto2PackedMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2PackedMessage {
    return new Proto2PackedMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2PackedMessage {
    return new Proto2PackedMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2PackedMessage | PlainMessage<Proto2PackedMessage> | undefined, b: Proto2PackedMessage | PlainMessage<Proto2PackedMessage> | undefined): boolean {
    return proto2.util.equals(Proto2PackedMessage, a, b);
  }
}

/**
 * @generated from message spec.Proto2UnpackedMessage
 */
export class Proto2UnpackedMessage extends Message<Proto2UnpackedMessage> {
  /**
   * @generated from field: repeated double unpacked_double_field = 201 [packed = false];
   */
  unpackedDoubleField: number[] = [];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 202 [packed = false];
   */
  unpackedUint32Field: number[] = [];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 203 [packed = false];
   */
  unpackedUint64Field: bigint[] = [];

  constructor(data?: PartialMessage<Proto2UnpackedMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2UnpackedMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 201, name: "unpacked_double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 202, name: "unpacked_uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
    { no: 203, name: "unpacked_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2UnpackedMessage {
    return new Proto2UnpackedMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2UnpackedMessage {
    return new Proto2UnpackedMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2UnpackedMessage {
    return new Proto2UnpackedMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2UnpackedMessage | PlainMessage<Proto2UnpackedMessage> | undefined, b: Proto2UnpackedMessage | PlainMessage<Proto2UnpackedMessage> | undefined): boolean {
    return proto2.util.equals(Proto2UnpackedMessage, a, b);
  }
}

/**
 * @generated from message spec.Proto2UnspecifiedPackedMessage
 */
export class Proto2UnspecifiedPackedMessage extends Message<Proto2UnspecifiedPackedMessage> {
  /**
   * @generated from field: repeated double double_field = 1;
   */
  doubleField: number[] = [];

  /**
   * @generated from field: repeated uint32 uint32_field = 2;
   */
  uint32Field: number[] = [];

  /**
   * @generated from field: repeated uint64 uint64_field = 3;
   */
  uint64Field: bigint[] = [];

  constructor(data?: PartialMessage<Proto2UnspecifiedPackedMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2UnspecifiedPackedMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 2, name: "uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
    { no: 3, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2UnspecifiedPackedMessage {
    return new Proto2UnspecifiedPackedMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2UnspecifiedPackedMessage {
    return new Proto2UnspecifiedPackedMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2UnspecifiedPackedMessage {
    return new Proto2UnspecifiedPackedMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2UnspecifiedPackedMessage | PlainMessage<Proto2UnspecifiedPackedMessage> | undefined, b: Proto2UnspecifiedPackedMessage | PlainMessage<Proto2UnspecifiedPackedMessage> | undefined): boolean {
    return proto2.util.equals(Proto2UnspecifiedPackedMessage, a, b);
  }
}

/**
 * @generated from message spec.Proto2OptionalMessage
 */
export class Proto2OptionalMessage extends Message<Proto2OptionalMessage> {
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

  constructor(data?: PartialMessage<Proto2OptionalMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2OptionalMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true },
    { no: 3, name: "enum_field", kind: "enum", T: proto2.getEnumType(Proto2Enum), opt: true },
    { no: 4, name: "message_field", kind: "message", T: Proto2ChildMessage, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2OptionalMessage {
    return new Proto2OptionalMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2OptionalMessage {
    return new Proto2OptionalMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2OptionalMessage {
    return new Proto2OptionalMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2OptionalMessage | PlainMessage<Proto2OptionalMessage> | undefined, b: Proto2OptionalMessage | PlainMessage<Proto2OptionalMessage> | undefined): boolean {
    return proto2.util.equals(Proto2OptionalMessage, a, b);
  }
}

/**
 * @generated from message spec.Proto2RequiredMessage
 */
export class Proto2RequiredMessage extends Message<Proto2RequiredMessage> {
  /**
   * @generated from field: required string string_field = 1;
   */
  stringField?: string;

  /**
   * @generated from field: required bytes bytes_field = 2;
   */
  bytesField?: Uint8Array;

  /**
   * @generated from field: required spec.Proto2Enum enum_field = 3;
   */
  enumField?: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2ChildMessage message_field = 4;
   */
  messageField?: Proto2ChildMessage;

  constructor(data?: PartialMessage<Proto2RequiredMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2RequiredMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 3, name: "enum_field", kind: "enum", T: proto2.getEnumType(Proto2Enum) },
    { no: 4, name: "message_field", kind: "message", T: Proto2ChildMessage },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2RequiredMessage {
    return new Proto2RequiredMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2RequiredMessage {
    return new Proto2RequiredMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2RequiredMessage {
    return new Proto2RequiredMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2RequiredMessage | PlainMessage<Proto2RequiredMessage> | undefined, b: Proto2RequiredMessage | PlainMessage<Proto2RequiredMessage> | undefined): boolean {
    return proto2.util.equals(Proto2RequiredMessage, a, b);
  }
}

/**
 * @generated from message spec.Proto2RequiredDefaultsMessage
 */
export class Proto2RequiredDefaultsMessage extends Message<Proto2RequiredDefaultsMessage> {
  /**
   * @generated from field: required string string_field = 1 [default = "hello \" *\/ "];
   */
  stringField?: string;

  /**
   * @generated from field: required bytes bytes_field = 2 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  bytesField?: Uint8Array;

  /**
   * @generated from field: required spec.Proto2Enum enum_field = 3 [default = PROTO2_ENUM_YES];
   */
  enumField?: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2ChildMessage message_field = 4;
   */
  messageField?: Proto2ChildMessage;

  constructor(data?: PartialMessage<Proto2RequiredDefaultsMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2RequiredDefaultsMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, default: "hello \" */ " },
    { no: 2, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */, default: new Uint8Array([0x00, 0x78, 0x5C, 0x78, 0x78, 0x41, 0x41, 0x41, 0x41, 0x41, 0x41, 0x08, 0x0C, 0x0A, 0x0D, 0x09, 0x0B]) },
    { no: 3, name: "enum_field", kind: "enum", T: proto2.getEnumType(Proto2Enum), default: Proto2Enum.YES },
    { no: 4, name: "message_field", kind: "message", T: Proto2ChildMessage },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2RequiredDefaultsMessage {
    return new Proto2RequiredDefaultsMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2RequiredDefaultsMessage {
    return new Proto2RequiredDefaultsMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2RequiredDefaultsMessage {
    return new Proto2RequiredDefaultsMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2RequiredDefaultsMessage | PlainMessage<Proto2RequiredDefaultsMessage> | undefined, b: Proto2RequiredDefaultsMessage | PlainMessage<Proto2RequiredDefaultsMessage> | undefined): boolean {
    return proto2.util.equals(Proto2RequiredDefaultsMessage, a, b);
  }
}

/**
 * @generated from message spec.Proto2DefaultsMessage
 */
export class Proto2DefaultsMessage extends Message<Proto2DefaultsMessage> {
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

  constructor(data?: PartialMessage<Proto2DefaultsMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2DefaultsMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true, default: "hello \" */ " },
    { no: 2, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true, default: new Uint8Array([0x00, 0x78, 0x5C, 0x78, 0x78, 0x41, 0x41, 0x41, 0x41, 0x41, 0x41, 0x08, 0x0C, 0x0A, 0x0D, 0x09, 0x0B]) },
    { no: 3, name: "int32_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true, default: 128 },
    { no: 4, name: "int46_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true, default: protoInt64.parse("-256") },
    { no: 5, name: "float_field", kind: "scalar", T: 2 /* ScalarType.FLOAT */, opt: true, default: -512.13 },
    { no: 6, name: "bool_field", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true, default: true },
    { no: 7, name: "enum_field", kind: "enum", T: proto2.getEnumType(Proto2Enum), opt: true, default: Proto2Enum.YES },
    { no: 8, name: "message_field", kind: "message", T: Proto2ChildMessage, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2DefaultsMessage {
    return new Proto2DefaultsMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2DefaultsMessage {
    return new Proto2DefaultsMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2DefaultsMessage {
    return new Proto2DefaultsMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2DefaultsMessage | PlainMessage<Proto2DefaultsMessage> | undefined, b: Proto2DefaultsMessage | PlainMessage<Proto2DefaultsMessage> | undefined): boolean {
    return proto2.util.equals(Proto2DefaultsMessage, a, b);
  }
}

/**
 * @generated from message spec.Proto2ChildMessage
 */
export class Proto2ChildMessage extends Message<Proto2ChildMessage> {
  /**
   * @generated from field: optional string string_field = 1;
   */
  stringField?: string;

  constructor(data?: PartialMessage<Proto2ChildMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "spec.Proto2ChildMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Proto2ChildMessage {
    return new Proto2ChildMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Proto2ChildMessage {
    return new Proto2ChildMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Proto2ChildMessage {
    return new Proto2ChildMessage().fromJsonString(jsonString, options);
  }

  static equals(a: Proto2ChildMessage | PlainMessage<Proto2ChildMessage> | undefined, b: Proto2ChildMessage | PlainMessage<Proto2ChildMessage> | undefined): boolean {
    return proto2.util.equals(Proto2ChildMessage, a, b);
  }
}

