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

// @generated by protoc-gen-es v0.2.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/deprecation-explicit.proto (package spec, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * The entire enum is deprecated
 *
 * @generated from enum spec.DeprecatedEnum
 * @deprecated
 */
export enum DeprecatedEnum {
  /**
   * @generated from enum value: DEPRECATED_ENUM_A = 0;
   */
  A = 0,

  /**
   * @generated from enum value: DEPRECATED_ENUM_B = 1;
   */
  B = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(DeprecatedEnum)
proto3.util.setEnumType(DeprecatedEnum, "spec.DeprecatedEnum", [
  { no: 0, name: "DEPRECATED_ENUM_A" },
  { no: 1, name: "DEPRECATED_ENUM_B" },
]);

/**
 * Only a single enum value is deprecated
 *
 * @generated from enum spec.DeprecatedValueEnum
 */
export enum DeprecatedValueEnum {
  /**
   * @generated from enum value: DEPRECATED_VALUE_ENUM_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: DEPRECATED_VALUE_ENUM_DEPRECATED_VALUE = 1 [deprecated = true];
   * @deprecated
   */
  DEPRECATED_VALUE = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(DeprecatedValueEnum)
proto3.util.setEnumType(DeprecatedValueEnum, "spec.DeprecatedValueEnum", [
  { no: 0, name: "DEPRECATED_VALUE_ENUM_UNSPECIFIED" },
  { no: 1, name: "DEPRECATED_VALUE_ENUM_DEPRECATED_VALUE" },
]);

/**
 * The entire message is deprecated
 *
 * @generated from message spec.DeprecatedMessage
 * @deprecated
 */
export class DeprecatedMessage extends Message<DeprecatedMessage> {
  /**
   * @generated from field: string field = 1;
   */
  field = "";

  constructor(data?: PartialMessage<DeprecatedMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.DeprecatedMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeprecatedMessage {
    return new DeprecatedMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeprecatedMessage {
    return new DeprecatedMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeprecatedMessage {
    return new DeprecatedMessage().fromJsonString(jsonString, options);
  }

  static equals(a: DeprecatedMessage | PlainMessage<DeprecatedMessage> | undefined, b: DeprecatedMessage | PlainMessage<DeprecatedMessage> | undefined): boolean {
    return proto3.util.equals(DeprecatedMessage, a, b);
  }
}

/**
 * A single field of this message is deprecated
 *
 * @generated from message spec.DeprecatedFieldMessage
 */
export class DeprecatedFieldMessage extends Message<DeprecatedFieldMessage> {
  /**
   * This field is deprecated
   *
   * @generated from field: string deprecated_field = 1 [deprecated = true];
   * @deprecated
   */
  deprecatedField = "";

  /**
   * This field is not deprecated
   *
   * @generated from field: string current_field = 2;
   */
  currentField = "";

  constructor(data?: PartialMessage<DeprecatedFieldMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.DeprecatedFieldMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "deprecated_field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "current_field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeprecatedFieldMessage {
    return new DeprecatedFieldMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeprecatedFieldMessage {
    return new DeprecatedFieldMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeprecatedFieldMessage {
    return new DeprecatedFieldMessage().fromJsonString(jsonString, options);
  }

  static equals(a: DeprecatedFieldMessage | PlainMessage<DeprecatedFieldMessage> | undefined, b: DeprecatedFieldMessage | PlainMessage<DeprecatedFieldMessage> | undefined): boolean {
    return proto3.util.equals(DeprecatedFieldMessage, a, b);
  }
}

