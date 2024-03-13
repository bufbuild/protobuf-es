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

/**
 * JavaScript representation of fields with 64 bit integral types (int64, uint64,
 * sint64, fixed64, sfixed64).
 *
 * This is a subset of google.protobuf.FieldOptions.JSType, which defines JS_NORMAL,
 * JS_STRING, and JS_NUMBER. Protobuf-ES uses BigInt by default, but will use
 * String if `[jstype = JS_STRING]` is specified.
 *
 * ```protobuf
 * uint64 field_a = 1; // BigInt
 * uint64 field_b = 2 [jstype = JS_NORMAL]; // BigInt
 * uint64 field_b = 2 [jstype = JS_NUMBER]; // BigInt
 * uint64 field_b = 2 [jstype = JS_STRING]; // String
 * ```
 */
export enum LongType {
  /**
   * Use JavaScript BigInt.
   */
  BIGINT = 0,

  /**
   * Use JavaScript String.
   *
   * Field option `[jstype = JS_STRING]`.
   */
  STRING = 1,
}

// prettier-ignore
/**
 * ScalarValue maps from a scalar field type to a TypeScript value type.
 */
export type ScalarValue<T = ScalarType, L extends LongType = LongType.STRING | LongType.BIGINT> =
    T extends ScalarType.STRING ? string
  : T extends ScalarType.INT32 ? number
  : T extends ScalarType.UINT32 ? number
  : T extends ScalarType.UINT32 ? number
  : T extends ScalarType.SINT32 ? number
  : T extends ScalarType.FIXED32 ? number
  : T extends ScalarType.SFIXED32 ? number
  : T extends ScalarType.FLOAT ? number
  : T extends ScalarType.DOUBLE ? number
  : T extends ScalarType.INT64 ?    (L extends LongType.STRING ? string : bigint)
  : T extends ScalarType.SINT64 ?   (L extends LongType.STRING ? string : bigint)
  : T extends ScalarType.SFIXED64 ? (L extends LongType.STRING ? string : bigint)
  : T extends ScalarType.UINT64 ?   (L extends LongType.STRING ? string : bigint)
  : T extends ScalarType.FIXED64 ?  (L extends LongType.STRING ? string : bigint)
  : T extends ScalarType.BOOL ? boolean
  : T extends ScalarType.BYTES ? Uint8Array
  : never;
