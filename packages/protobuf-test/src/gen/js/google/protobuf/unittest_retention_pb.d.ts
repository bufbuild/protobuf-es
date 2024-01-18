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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_retention.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, Extension, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { EnumOptions, EnumValueOptions, ExtensionRangeOptions, FieldOptions, FileOptions, Message, MessageOptions, MethodOptions, OneofOptions, proto2, ServiceOptions } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest.TopLevelEnum
 */
export declare enum TopLevelEnum {
  /**
   * @generated from enum value: TOP_LEVEL_UNKNOWN = 0;
   */
  TOP_LEVEL_UNKNOWN = 0,
}

/**
 * Retention attributes set on fields nested within a message
 *
 * @generated from message protobuf_unittest.OptionsMessage
 */
export declare class OptionsMessage extends Message<OptionsMessage> {
  /**
   * @generated from field: optional int32 plain_field = 1;
   */
  plainField?: number;

  /**
   * @generated from field: optional int32 runtime_retention_field = 2;
   */
  runtimeRetentionField?: number;

  /**
   * @generated from field: optional int32 source_retention_field = 3;
   */
  sourceRetentionField?: number;

  constructor(data?: PartialMessage<OptionsMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.OptionsMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OptionsMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OptionsMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OptionsMessage;

  static equals(a: OptionsMessage | PlainMessage<OptionsMessage> | undefined, b: OptionsMessage | PlainMessage<OptionsMessage> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.Extendee
 */
export declare class Extendee extends Message<Extendee> {
  constructor(data?: PartialMessage<Extendee>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.Extendee";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Extendee;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Extendee;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Extendee;

  static equals(a: Extendee | PlainMessage<Extendee> | undefined, b: Extendee | PlainMessage<Extendee> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TopLevelMessage
 */
export declare class TopLevelMessage extends Message<TopLevelMessage> {
  /**
   * @generated from field: optional float f = 1;
   */
  f?: number;

  /**
   * @generated from oneof protobuf_unittest.TopLevelMessage.o
   */
  o: {
    /**
     * @generated from field: int64 i = 2;
     */
    value: bigint;
    case: "i";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<TopLevelMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TopLevelMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TopLevelMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TopLevelMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TopLevelMessage;

  static equals(a: TopLevelMessage | PlainMessage<TopLevelMessage> | undefined, b: TopLevelMessage | PlainMessage<TopLevelMessage> | undefined): boolean;
}

/**
 * @generated from enum protobuf_unittest.TopLevelMessage.NestedEnum
 */
export declare enum TopLevelMessage_NestedEnum {
  /**
   * @generated from enum value: NESTED_UNKNOWN = 0;
   */
  NESTED_UNKNOWN = 0,
}

/**
 * @generated from message protobuf_unittest.TopLevelMessage.NestedMessage
 */
export declare class TopLevelMessage_NestedMessage extends Message<TopLevelMessage_NestedMessage> {
  constructor(data?: PartialMessage<TopLevelMessage_NestedMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TopLevelMessage.NestedMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TopLevelMessage_NestedMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TopLevelMessage_NestedMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TopLevelMessage_NestedMessage;

  static equals(a: TopLevelMessage_NestedMessage | PlainMessage<TopLevelMessage_NestedMessage> | undefined, b: TopLevelMessage_NestedMessage | PlainMessage<TopLevelMessage_NestedMessage> | undefined): boolean;
}

/**
 * @generated from extension: optional string s = 2;
 */
export declare const TopLevelMessage_s: Extension<Extendee, string>;

/**
 * @generated from extension: optional int32 plain_option = 505092806;
 */
export declare const plain_option: Extension<FileOptions, number>;

/**
 * @generated from extension: optional int32 runtime_retention_option = 505039132;
 */
export declare const runtime_retention_option: Extension<FileOptions, number>;

/**
 * @generated from extension: optional int32 source_retention_option = 504878676;
 */
export declare const source_retention_option: Extension<FileOptions, number>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage file_option = 504871168;
 */
export declare const file_option: Extension<FileOptions, OptionsMessage>;

/**
 * @generated from extension: repeated protobuf_unittest.OptionsMessage repeated_options = 504823570;
 */
export declare const repeated_options: Extension<FileOptions, OptionsMessage[]>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage extension_range_option = 504822148;
 */
export declare const extension_range_option: Extension<ExtensionRangeOptions, OptionsMessage>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage message_option = 504820819;
 */
export declare const message_option: Extension<MessageOptions, OptionsMessage>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage field_option = 504589219;
 */
export declare const field_option: Extension<FieldOptions, OptionsMessage>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage oneof_option = 504479153;
 */
export declare const oneof_option: Extension<OneofOptions, OptionsMessage>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage enum_option = 504451567;
 */
export declare const enum_option: Extension<EnumOptions, OptionsMessage>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage enum_entry_option = 504450522;
 */
export declare const enum_entry_option: Extension<EnumValueOptions, OptionsMessage>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage service_option = 504387709;
 */
export declare const service_option: Extension<ServiceOptions, OptionsMessage>;

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage method_option = 504349420;
 */
export declare const method_option: Extension<MethodOptions, OptionsMessage>;

/**
 * @generated from extension: optional int32 i = 1;
 */
export declare const i: Extension<Extendee, number>;

