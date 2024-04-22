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

// @generated by protoc-gen-es v1.9.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/jstype.proto (package spec, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message spec.JSTypeOmittedMessage
 */
export class JSTypeOmittedMessage extends Message<JSTypeOmittedMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1;
   */
  fixed64Field = protoInt64.zero;

  /**
   * @generated from field: int64 int64_field = 3;
   */
  int64Field = protoInt64.zero;

  /**
   * @generated from field: sfixed64 sfixed64_field = 4;
   */
  sfixed64Field = protoInt64.zero;

  /**
   * @generated from field: sint64 sint64_field = 5;
   */
  sint64Field = protoInt64.zero;

  /**
   * @generated from field: uint64 uint64_field = 6;
   */
  uint64Field = protoInt64.zero;

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11;
   */
  repeatedFixed64Field: bigint[] = [];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12;
   */
  repeatedInt64Field: bigint[] = [];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13;
   */
  repeatedSfixed64Field: bigint[] = [];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14;
   */
  repeatedSint64Field: bigint[] = [];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15;
   */
  repeatedUint64Field: bigint[] = [];

  constructor(data?: PartialMessage<JSTypeOmittedMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "spec.JSTypeOmittedMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */ },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */ },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */ },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeOmittedMessage {
    return new JSTypeOmittedMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeOmittedMessage {
    return new JSTypeOmittedMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeOmittedMessage {
    return new JSTypeOmittedMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeOmittedMessage | PlainMessage<JSTypeOmittedMessage> | undefined, b: JSTypeOmittedMessage | PlainMessage<JSTypeOmittedMessage> | undefined): boolean {
    return proto3.util.equals(JSTypeOmittedMessage, a, b);
  }
}

/**
 * @generated from message spec.JSTypeNormalMessage
 */
export class JSTypeNormalMessage extends Message<JSTypeNormalMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1 [jstype = JS_NORMAL];
   */
  fixed64Field = protoInt64.zero;

  /**
   * @generated from field: int64 int64_field = 3 [jstype = JS_NORMAL];
   */
  int64Field = protoInt64.zero;

  /**
   * @generated from field: sfixed64 sfixed64_field = 4 [jstype = JS_NORMAL];
   */
  sfixed64Field = protoInt64.zero;

  /**
   * @generated from field: sint64 sint64_field = 5 [jstype = JS_NORMAL];
   */
  sint64Field = protoInt64.zero;

  /**
   * @generated from field: uint64 uint64_field = 6 [jstype = JS_NORMAL];
   */
  uint64Field = protoInt64.zero;

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11 [jstype = JS_NORMAL];
   */
  repeatedFixed64Field: bigint[] = [];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12 [jstype = JS_NORMAL];
   */
  repeatedInt64Field: bigint[] = [];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13 [jstype = JS_NORMAL];
   */
  repeatedSfixed64Field: bigint[] = [];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14 [jstype = JS_NORMAL];
   */
  repeatedSint64Field: bigint[] = [];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15 [jstype = JS_NORMAL];
   */
  repeatedUint64Field: bigint[] = [];

  constructor(data?: PartialMessage<JSTypeNormalMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "spec.JSTypeNormalMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */ },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */ },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */ },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeNormalMessage {
    return new JSTypeNormalMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeNormalMessage {
    return new JSTypeNormalMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeNormalMessage {
    return new JSTypeNormalMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeNormalMessage | PlainMessage<JSTypeNormalMessage> | undefined, b: JSTypeNormalMessage | PlainMessage<JSTypeNormalMessage> | undefined): boolean {
    return proto3.util.equals(JSTypeNormalMessage, a, b);
  }
}

/**
 * @generated from message spec.JSTypeStringMessage
 */
export class JSTypeStringMessage extends Message<JSTypeStringMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1 [jstype = JS_STRING];
   */
  fixed64Field = "0";

  /**
   * @generated from field: int64 int64_field = 3 [jstype = JS_STRING];
   */
  int64Field = "0";

  /**
   * @generated from field: sfixed64 sfixed64_field = 4 [jstype = JS_STRING];
   */
  sfixed64Field = "0";

  /**
   * @generated from field: sint64 sint64_field = 5 [jstype = JS_STRING];
   */
  sint64Field = "0";

  /**
   * @generated from field: uint64 uint64_field = 6 [jstype = JS_STRING];
   */
  uint64Field = "0";

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11 [jstype = JS_STRING];
   */
  repeatedFixed64Field: string[] = [];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12 [jstype = JS_STRING];
   */
  repeatedInt64Field: string[] = [];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13 [jstype = JS_STRING];
   */
  repeatedSfixed64Field: string[] = [];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14 [jstype = JS_STRING];
   */
  repeatedSint64Field: string[] = [];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15 [jstype = JS_STRING];
   */
  repeatedUint64Field: string[] = [];

  constructor(data?: PartialMessage<JSTypeStringMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "spec.JSTypeStringMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, L: 1 /* LongType.STRING */ },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, L: 1 /* LongType.STRING */ },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, L: 1 /* LongType.STRING */ },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, L: 1 /* LongType.STRING */ },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, L: 1 /* LongType.STRING */ },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, L: 1 /* LongType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeStringMessage {
    return new JSTypeStringMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeStringMessage {
    return new JSTypeStringMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeStringMessage {
    return new JSTypeStringMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeStringMessage | PlainMessage<JSTypeStringMessage> | undefined, b: JSTypeStringMessage | PlainMessage<JSTypeStringMessage> | undefined): boolean {
    return proto3.util.equals(JSTypeStringMessage, a, b);
  }
}

/**
 * @generated from message spec.JSTypeNumberMessage
 */
export class JSTypeNumberMessage extends Message<JSTypeNumberMessage> {
  /**
   * @generated from field: fixed64 fixed64_field = 1 [jstype = JS_NUMBER];
   */
  fixed64Field = protoInt64.zero;

  /**
   * @generated from field: int64 int64_field = 3 [jstype = JS_NUMBER];
   */
  int64Field = protoInt64.zero;

  /**
   * @generated from field: sfixed64 sfixed64_field = 4 [jstype = JS_NUMBER];
   */
  sfixed64Field = protoInt64.zero;

  /**
   * @generated from field: sint64 sint64_field = 5 [jstype = JS_NUMBER];
   */
  sint64Field = protoInt64.zero;

  /**
   * @generated from field: uint64 uint64_field = 6 [jstype = JS_NUMBER];
   */
  uint64Field = protoInt64.zero;

  /**
   * @generated from field: repeated fixed64 repeated_fixed64_field = 11 [jstype = JS_NUMBER];
   */
  repeatedFixed64Field: bigint[] = [];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 12 [jstype = JS_NUMBER];
   */
  repeatedInt64Field: bigint[] = [];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64_field = 13 [jstype = JS_NUMBER];
   */
  repeatedSfixed64Field: bigint[] = [];

  /**
   * @generated from field: repeated sint64 repeated_sint64_field = 14 [jstype = JS_NUMBER];
   */
  repeatedSint64Field: bigint[] = [];

  /**
   * @generated from field: repeated uint64 repeated_uint64_field = 15 [jstype = JS_NUMBER];
   */
  repeatedUint64Field: bigint[] = [];

  constructor(data?: PartialMessage<JSTypeNumberMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "spec.JSTypeNumberMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */ },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */ },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */ },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeNumberMessage {
    return new JSTypeNumberMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeNumberMessage {
    return new JSTypeNumberMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeNumberMessage {
    return new JSTypeNumberMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeNumberMessage | PlainMessage<JSTypeNumberMessage> | undefined, b: JSTypeNumberMessage | PlainMessage<JSTypeNumberMessage> | undefined): boolean {
    return proto3.util.equals(JSTypeNumberMessage, a, b);
  }
}

