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

import type { EnumType } from "./enum.js";
import type { MessageType } from "./message-type.js";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * FieldInfo describes a field of a protobuf message for runtime reflection. We
 * distinguish between the following kinds of fields:
 *
 * - "scalar": string, bool, float, int32, etc. The scalar type is "T".
 * - "enum": The field was declared with an enum type. The enum type is "T".
 * - "message": The field was declared with a message type. The message type is "T".
 * - "map": The field was declared with map<K,V>. The key type is "K", the value type is "V".
 *
 * Every field always has the following properties:
 *
 * - "no": The field number of the protobuf field.
 * - "name": The original name of the protobuf field.
 * - "localName": The name of the field as used in generated code.
 * - "jsonName": The name for JSON serialization / deserialization.
 * - "opt": Whether the field is optional.
 * - "repeated": Whether the field is repeated.
 * - "packed": Whether the repeated field is packed.
 *
 * Additionally, fields may have the following properties:
 *
 * - "oneof": If the field is member of a oneof group.
 * - "default": Only proto2: An explicit default value.
 */
export type FieldInfo =
  | fiRules<fiScalar>
  | fiRules<fiEnum>
  | fiRules<fiMessage>
  | fiRules<fiMap>;

/**
 * Version of `FieldInfo` that allows the following properties
 * to be omitted:
 *
 * - "localName", "jsonName": can be omitted if equal to lowerCamelCase(name)
 * - "opt": Can be omitted if false.
 * - "repeated": Can be omitted if false.
 * - "packed": Can be omitted if equal to the standard packing of the field.
 */
export type PartialFieldInfo =
  | fiPartialRules<fiScalar>
  | fiPartialRules<fiEnum>
  | fiPartialRules<fiMessage>
  | fiPartialRules<fiMap>;

/**
 * Provides convenient access to field information of a oneof.
 */
export interface OneofInfo {
  readonly kind: "oneof";
  readonly name: string;
  readonly localName: string;
  readonly repeated: false;
  readonly packed: false;
  readonly opt: false;
  readonly default: undefined;
  readonly fields: readonly FieldInfo[];

  /**
   * Return field information by local name.
   */
  findField(localName: string): FieldInfo | undefined;
}

interface fiShared {
  /**
   * The field number of the .proto field.
   */
  readonly no: number;

  /**
   * The original name of the .proto field.
   */
  readonly name: string;

  /**
   * The name of the field as used in generated code.
   */
  readonly localName: string;

  /**
   * The name for JSON serialization / deserialization.
   */
  readonly jsonName: string;

  /**
   * The `oneof` group, if this field belongs to one.
   */
  readonly oneof?: OneofInfo | undefined;

  // We do not surface options at this time
  // readonly options: OptionsMap;
}

interface fiScalar extends fiShared {
  readonly kind: "scalar";

  /**
   * Scalar type of the field.
   */
  readonly T: ScalarType;

  /**
   * Is the field repeated?
   */
  readonly repeated: boolean;

  /**
   * Is this repeated field packed?
   * BYTES and STRING can never be packed, since they are length-delimited.
   * Other types can be packed with the field option "packed".
   * For proto3, fields are packed by default.
   */
  readonly packed: boolean;

  /**
   * Is the field optional?
   */
  readonly opt: boolean;

  /**
   * Only proto2: An explicit default value.
   */
  readonly default: number | boolean | string | bigint | Uint8Array | undefined;
}

interface fiMessage extends fiShared {
  readonly kind: "message";

  /**
   * Message handler for the field.
   */
  readonly T: MessageType;

  /**
   * Is the field repeated?
   */
  readonly repeated: boolean;

  /**
   * Is this repeated field packed? Never true for messages.
   */
  readonly packed: false;

  /**
   * An explicit default value (only proto2). Never set for messages.
   */
  readonly default: undefined;
}

interface fiEnum extends fiShared {
  readonly kind: "enum";

  /**
   * Enum type information for the field.
   */
  readonly T: EnumType;

  /**
   * Is the field repeated?
   */
  readonly repeated: boolean;

  /**
   * Is this repeated field packed?
   * Repeated enums can be packed with the field option "packed".
   * For proto3, they are packed by default.
   */
  readonly packed: boolean;

  /**
   * Is the field optional?
   */
  readonly opt: boolean;

  /**
   * Only proto2: An explicit default value.
   */
  readonly default: number | undefined;
}

interface fiMap extends fiShared {
  readonly kind: "map";

  /**
   * Map key type.
   *
   * The key_type can be any integral or string type
   * (so, any scalar type except for floating point
   * types and bytes)
   */
  readonly K: Exclude<
    ScalarType,
    ScalarType.FLOAT | ScalarType.DOUBLE | ScalarType.BYTES
  >;

  /**
   * Map value type. Can be scalar, enum, or message.
   */
  readonly V:
    | { readonly kind: "scalar"; readonly T: ScalarType }
    | { readonly kind: "enum"; readonly T: EnumType }
    | { readonly kind: "message"; readonly T: MessageType };

  /**
   * Is the field repeated? Never true for maps.
   */
  readonly repeated: false;

  /**
   * Is this repeated field packed? Never true for maps.
   */
  readonly packed: false;

  /**
   * An explicit default value (only proto2). Never set for maps.
   */
  readonly default: undefined;
}

// prettier-ignore
type fiRules<T> = Omit<T, "oneof" | "repeat" | "repeated" | "packed" | "opt"> & (
  | { readonly repeated: false, readonly packed: false, readonly opt: false; readonly oneof: undefined; }
  | { readonly repeated: false, readonly packed: false, readonly opt: true; readonly oneof: undefined; }
  | { readonly repeated: boolean, readonly packed: boolean, readonly opt: false; readonly oneof: undefined; }
  | { readonly repeated: false, readonly packed: false, readonly opt: false; readonly oneof: OneofInfo; });

// prettier-ignore
type fiPartialRules<T extends fiScalar|fiMap|fiEnum|fiMessage> = Omit<T, "jsonName" | "localName" | "oneof" | "repeat" | "repeated" | "packed" | "opt" | "default"> & (
  | { readonly jsonName?: string; readonly repeated?: false; readonly packed?: false; readonly opt?: false; readonly oneof?: undefined; default?: T["default"]; }
  | { readonly jsonName?: string; readonly repeated?: false; readonly packed?: false; readonly opt: true; readonly oneof?: undefined; default?: T["default"]; }
  | { readonly jsonName?: string; readonly repeated?: boolean; readonly packed?: boolean; readonly opt?: false; readonly oneof?: undefined; default?: T["default"]; }
  | { readonly jsonName?: string; readonly repeated?: false; readonly packed?: false; readonly opt?: false; readonly oneof: string; default?: T["default"]; });

/**
 * Scalar value types. This is a subset of field types declared by protobuf
 * enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
 * are omitted, but the numerical values are identical.
 */
export enum ScalarType {
  // 0 is reserved for errors.
  // Order is weird for historical reasons.
  DOUBLE = 1,
  FLOAT = 2,
  // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
  // negative values are likely.
  INT64 = 3,
  UINT64 = 4,
  // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
  // negative values are likely.
  INT32 = 5,
  FIXED64 = 6,
  FIXED32 = 7,
  BOOL = 8,
  STRING = 9,
  // Tag-delimited aggregate.
  // Group type is deprecated and not supported in proto3. However, Proto3
  // implementations should still be able to parse the group wire format and
  // treat group fields as unknown fields.
  // TYPE_GROUP = 10,
  // TYPE_MESSAGE = 11,  // Length-delimited aggregate.

  // New in version 2.
  BYTES = 12,
  UINT32 = 13,
  // TYPE_ENUM = 14,
  SFIXED32 = 15,
  SFIXED64 = 16,
  SINT32 = 17, // Uses ZigZag encoding.
  SINT64 = 18, // Uses ZigZag encoding.
}
