// Copyright 2021-2023 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.3.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/msg-oneof.proto (package spec, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum spec.OneofEnum
 */
export declare enum OneofEnum {
  /**
   * @generated from enum value: ONEOF_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ONEOF_ENUM_A = 1;
   */
  A = 1,

  /**
   * @generated from enum value: ONEOF_ENUM_B = 2;
   */
  B = 2,
}

/**
 * @generated from message spec.OneofMessage
 */
export declare class OneofMessage extends Message<OneofMessage> {
  /**
   * @generated from oneof spec.OneofMessage.scalar
   */
  scalar: {
    /**
     * @generated from field: int32 value = 1;
     */
    value: number;
    case: "value";
  } | {
    /**
     * @generated from field: string error = 2;
     */
    value: string;
    case: "error";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from oneof spec.OneofMessage.message
   */
  message: {
    /**
     * @generated from field: spec.OneofMessageFoo foo = 11;
     */
    value: OneofMessageFoo;
    case: "foo";
  } | {
    /**
     * @generated from field: spec.OneofMessageBar bar = 12;
     */
    value: OneofMessageBar;
    case: "bar";
  } | {
    /**
     * @generated from field: spec.OneofMessageBar baz = 13;
     */
    value: OneofMessageBar;
    case: "baz";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from oneof spec.OneofMessage.enum
   */
  enum: {
    /**
     * @generated from field: spec.OneofEnum e = 21;
     */
    value: OneofEnum;
    case: "e";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<OneofMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.OneofMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OneofMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OneofMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OneofMessage;

  static equals(a: OneofMessage | PlainMessage<OneofMessage> | undefined, b: OneofMessage | PlainMessage<OneofMessage> | undefined): boolean;
}

/**
 * @generated from message spec.OneofMessageFoo
 */
export declare class OneofMessageFoo extends Message<OneofMessageFoo> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: bool toggle = 2;
   */
  toggle: boolean;

  constructor(data?: PartialMessage<OneofMessageFoo>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.OneofMessageFoo";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OneofMessageFoo;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OneofMessageFoo;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OneofMessageFoo;

  static equals(a: OneofMessageFoo | PlainMessage<OneofMessageFoo> | undefined, b: OneofMessageFoo | PlainMessage<OneofMessageFoo> | undefined): boolean;
}

/**
 * @generated from message spec.OneofMessageBar
 */
export declare class OneofMessageBar extends Message<OneofMessageBar> {
  /**
   * @generated from field: int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: int32 b = 2;
   */
  b: number;

  constructor(data?: PartialMessage<OneofMessageBar>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.OneofMessageBar";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OneofMessageBar;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OneofMessageBar;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OneofMessageBar;

  static equals(a: OneofMessageBar | PlainMessage<OneofMessageBar> | undefined, b: OneofMessageBar | PlainMessage<OneofMessageBar> | undefined): boolean;
}

