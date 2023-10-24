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

// @generated by protoc-gen-es v1.4.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/enum.proto (package spec, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum spec.AnnotatedEnum
 */
export enum AnnotatedEnum {
  /**
   * @generated from enum value: UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(AnnotatedEnum)
proto3.util.setEnumType(AnnotatedEnum, "spec.AnnotatedEnum", [
  { no: 0, name: "UNSPECIFIED" },
  { no: 1, name: "FOO" },
]);

/**
 * @generated from enum spec.SimpleEnum
 */
export enum SimpleEnum {
  /**
   * @generated from enum value: SIMPLE_ZERO = 0;
   */
  SIMPLE_ZERO = 0,

  /**
   * @generated from enum value: SIMPLE_ONE = 1;
   */
  SIMPLE_ONE = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(SimpleEnum)
proto3.util.setEnumType(SimpleEnum, "spec.SimpleEnum", [
  { no: 0, name: "SIMPLE_ZERO" },
  { no: 1, name: "SIMPLE_ONE" },
]);

/**
 * @generated from enum spec.AliasEnum
 */
export enum AliasEnum {
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
// Retrieve enum metadata with: proto3.getEnumType(AliasEnum)
proto3.util.setEnumType(AliasEnum, "spec.AliasEnum", [
  { no: 0, name: "ALIAS_ZERO" },
  { no: 1, name: "ALIAS_ONE" },
  { no: 1, name: "ALIAS_ONE_ALIASED" },
]);

/**
 * The generated enum values should drop the "PREFIX_"
 * part at the top if the target language allows
 * (basically every language except C++).
 *
 * @generated from enum spec.PrefixEnum
 */
export enum PrefixEnum {
  /**
   * @generated from enum value: PREFIX_ENUM_ZERO = 0;
   */
  ZERO = 0,

  /**
   * @generated from enum value: PREFIX_ENUM_ONE = 1;
   */
  ONE = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(PrefixEnum)
proto3.util.setEnumType(PrefixEnum, "spec.PrefixEnum", [
  { no: 0, name: "PREFIX_ENUM_ZERO" },
  { no: 1, name: "PREFIX_ENUM_ONE" },
]);

/**
 * @generated from message spec.EnumMessage
 */
export class EnumMessage extends Message<EnumMessage> {
  /**
   * @generated from field: spec.EnumMessage.NestedEnum enum_field = 1;
   */
  enumField = EnumMessage_NestedEnum.NESTED_ZERO;

  constructor(data?: PartialMessage<EnumMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "spec.EnumMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "enum_field", kind: "enum", T: proto3.getEnumType(EnumMessage_NestedEnum) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EnumMessage {
    return new EnumMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EnumMessage {
    return new EnumMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EnumMessage {
    return new EnumMessage().fromJsonString(jsonString, options);
  }

  static equals(a: EnumMessage | PlainMessage<EnumMessage> | undefined, b: EnumMessage | PlainMessage<EnumMessage> | undefined): boolean {
    return proto3.util.equals(EnumMessage, a, b);
  }
}

/**
 * @generated from enum spec.EnumMessage.NestedEnum
 */
export enum EnumMessage_NestedEnum {
  /**
   * @generated from enum value: NESTED_ZERO = 0;
   */
  NESTED_ZERO = 0,

  /**
   * @generated from enum value: NESTED_ONE = 1;
   */
  NESTED_ONE = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(EnumMessage_NestedEnum)
proto3.util.setEnumType(EnumMessage_NestedEnum, "spec.EnumMessage.NestedEnum", [
  { no: 0, name: "NESTED_ZERO" },
  { no: 1, name: "NESTED_ONE" },
]);

