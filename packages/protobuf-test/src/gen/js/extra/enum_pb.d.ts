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

// @generated by protoc-gen-es v0.1.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/enum.proto (package spec, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum spec.AnnotatedEnum
 */
export declare enum AnnotatedEnum {
  /**
   * @generated from enum value: UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,
}

/**
 * @generated from enum spec.SimpleEnum
 */
export declare enum SimpleEnum {
  /**
   * @generated from enum value: SIMPLE_ZERO = 0;
   */
  SIMPLE_ZERO = 0,

  /**
   * @generated from enum value: SIMPLE_ONE = 1;
   */
  SIMPLE_ONE = 1,
}

/**
 * @generated from enum spec.AliasEnum
 */
export declare enum AliasEnum {
  /**
   * @generated from enum value: ALIAS_ZERO = 0;
   */
  ALIAS_ZERO = 0,

  /**
   * @generated from enum value: ALIAS_ONE = 1;
   */
  ALIAS_ONE = 1,

  /**
   * @generated from enum value: ALIAS_ONE_ALIASED = 1;
   */
  ALIAS_ONE_ALIASED = 1,
}

/**
 * The generated enum values should drop the "PREFIX_"
 * part at the top if the target language allows
 * (basically every language except C++).
 *
 * @generated from enum spec.PrefixEnum
 */
export declare enum PrefixEnum {
  /**
   * @generated from enum value: PREFIX_ENUM_ZERO = 0;
   */
  ZERO = 0,

  /**
   * @generated from enum value: PREFIX_ENUM_ONE = 1;
   */
  ONE = 1,
}

/**
 * @generated from message spec.EnumMessage
 */
export declare class EnumMessage extends Message<EnumMessage> {
  constructor(data?: PartialMessage<EnumMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.EnumMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EnumMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EnumMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EnumMessage;

  static equals(a: EnumMessage | PlainMessage<EnumMessage> | undefined, b: EnumMessage | PlainMessage<EnumMessage> | undefined): boolean;
}

/**
 * @generated from enum spec.EnumMessage.NestedEnum
 */
export declare enum EnumMessage_NestedEnum {
  /**
   * @generated from enum value: NESTED_ZERO = 0;
   */
  NESTED_ZERO = 0,

  /**
   * @generated from enum value: NESTED_ONE = 1;
   */
  NESTED_ONE = 1,
}

