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
// @generated from file extra/jstype-proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message spec.JSTypeProto2OmittedMessage
 */
export class JSTypeProto2OmittedMessage extends Message<JSTypeProto2OmittedMessage> {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1;
   */
  fixed64Field?: bigint;

  /**
   * @generated from field: optional int64 int64_field = 3;
   */
  int64Field?: bigint;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4;
   */
  sfixed64Field?: bigint;

  /**
   * @generated from field: optional sint64 sint64_field = 5;
   */
  sint64Field?: bigint;

  /**
   * @generated from field: optional uint64 uint64_field = 6;
   */
  uint64Field?: bigint;

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

  constructor(data?: PartialMessage<JSTypeProto2OmittedMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "spec.JSTypeProto2OmittedMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, opt: true },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, opt: true },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, opt: true },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeProto2OmittedMessage {
    return new JSTypeProto2OmittedMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeProto2OmittedMessage {
    return new JSTypeProto2OmittedMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeProto2OmittedMessage {
    return new JSTypeProto2OmittedMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeProto2OmittedMessage | PlainMessage<JSTypeProto2OmittedMessage> | undefined, b: JSTypeProto2OmittedMessage | PlainMessage<JSTypeProto2OmittedMessage> | undefined): boolean {
    return proto2.util.equals(JSTypeProto2OmittedMessage, a, b);
  }
}

/**
 * @generated from message spec.JSTypeProto2NormalMessage
 */
export class JSTypeProto2NormalMessage extends Message<JSTypeProto2NormalMessage> {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1 [jstype = JS_NORMAL];
   */
  fixed64Field?: bigint;

  /**
   * @generated from field: optional int64 int64_field = 3 [jstype = JS_NORMAL];
   */
  int64Field?: bigint;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4 [jstype = JS_NORMAL];
   */
  sfixed64Field?: bigint;

  /**
   * @generated from field: optional sint64 sint64_field = 5 [jstype = JS_NORMAL];
   */
  sint64Field?: bigint;

  /**
   * @generated from field: optional uint64 uint64_field = 6 [jstype = JS_NORMAL];
   */
  uint64Field?: bigint;

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

  constructor(data?: PartialMessage<JSTypeProto2NormalMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "spec.JSTypeProto2NormalMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, opt: true },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, opt: true },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, opt: true },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeProto2NormalMessage {
    return new JSTypeProto2NormalMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeProto2NormalMessage {
    return new JSTypeProto2NormalMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeProto2NormalMessage {
    return new JSTypeProto2NormalMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeProto2NormalMessage | PlainMessage<JSTypeProto2NormalMessage> | undefined, b: JSTypeProto2NormalMessage | PlainMessage<JSTypeProto2NormalMessage> | undefined): boolean {
    return proto2.util.equals(JSTypeProto2NormalMessage, a, b);
  }
}

/**
 * @generated from message spec.JSTypeProto2StringMessage
 */
export class JSTypeProto2StringMessage extends Message<JSTypeProto2StringMessage> {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1 [jstype = JS_STRING];
   */
  fixed64Field?: string;

  /**
   * @generated from field: optional int64 int64_field = 3 [jstype = JS_STRING];
   */
  int64Field?: string;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4 [jstype = JS_STRING];
   */
  sfixed64Field?: string;

  /**
   * @generated from field: optional sint64 sint64_field = 5 [jstype = JS_STRING];
   */
  sint64Field?: string;

  /**
   * @generated from field: optional uint64 uint64_field = 6 [jstype = JS_STRING];
   */
  uint64Field?: string;

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

  constructor(data?: PartialMessage<JSTypeProto2StringMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "spec.JSTypeProto2StringMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, L: 1 /* LongType.STRING */, opt: true },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, L: 1 /* LongType.STRING */, opt: true },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, L: 1 /* LongType.STRING */, opt: true },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, L: 1 /* LongType.STRING */, opt: true },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, L: 1 /* LongType.STRING */, opt: true },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, L: 1 /* LongType.STRING */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, L: 1 /* LongType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeProto2StringMessage {
    return new JSTypeProto2StringMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeProto2StringMessage {
    return new JSTypeProto2StringMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeProto2StringMessage {
    return new JSTypeProto2StringMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeProto2StringMessage | PlainMessage<JSTypeProto2StringMessage> | undefined, b: JSTypeProto2StringMessage | PlainMessage<JSTypeProto2StringMessage> | undefined): boolean {
    return proto2.util.equals(JSTypeProto2StringMessage, a, b);
  }
}

/**
 * @generated from message spec.JSTypeProto2NumberMessage
 */
export class JSTypeProto2NumberMessage extends Message<JSTypeProto2NumberMessage> {
  /**
   * @generated from field: optional fixed64 fixed64_field = 1 [jstype = JS_NUMBER];
   */
  fixed64Field?: bigint;

  /**
   * @generated from field: optional int64 int64_field = 3 [jstype = JS_NUMBER];
   */
  int64Field?: bigint;

  /**
   * @generated from field: optional sfixed64 sfixed64_field = 4 [jstype = JS_NUMBER];
   */
  sfixed64Field?: bigint;

  /**
   * @generated from field: optional sint64 sint64_field = 5 [jstype = JS_NUMBER];
   */
  sint64Field?: bigint;

  /**
   * @generated from field: optional uint64 uint64_field = 6 [jstype = JS_NUMBER];
   */
  uint64Field?: bigint;

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

  constructor(data?: PartialMessage<JSTypeProto2NumberMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "spec.JSTypeProto2NumberMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, opt: true },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
    { no: 4, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, opt: true },
    { no: 5, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, opt: true },
    { no: 6, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
    { no: 11, name: "repeated_fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 12, name: "repeated_int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 13, name: "repeated_sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 14, name: "repeated_sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 15, name: "repeated_uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JSTypeProto2NumberMessage {
    return new JSTypeProto2NumberMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JSTypeProto2NumberMessage {
    return new JSTypeProto2NumberMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JSTypeProto2NumberMessage {
    return new JSTypeProto2NumberMessage().fromJsonString(jsonString, options);
  }

  static equals(a: JSTypeProto2NumberMessage | PlainMessage<JSTypeProto2NumberMessage> | undefined, b: JSTypeProto2NumberMessage | PlainMessage<JSTypeProto2NumberMessage> | undefined): boolean {
    return proto2.util.equals(JSTypeProto2NumberMessage, a, b);
  }
}

