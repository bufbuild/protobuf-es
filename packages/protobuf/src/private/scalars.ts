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

import { LongType, ScalarType } from "../field.js";
import type { IBinaryWriter } from "../binary-encoding.js";
import { WireType } from "../binary-encoding.js";
import { protoInt64 } from "../proto-int64.js";

/**
 * Returns true if both scalar values are equal.
 */
export function scalarEquals(
  type: ScalarType,
  a: string | boolean | number | bigint | Uint8Array | undefined,
  b: string | boolean | number | bigint | Uint8Array | undefined,
): boolean {
  if (a === b) {
    // This correctly matches equal values except BYTES and (possibly) 64-bit integers.
    return true;
  }
  // Special case BYTES - we need to compare each byte individually
  if (type == ScalarType.BYTES) {
    if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  // Special case 64-bit integers - we support number, string and bigint representation.
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (type) {
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      // Loose comparison will match between 0n, 0 and "0".
      return a == b;
  }
  // Anything that hasn't been caught by strict comparison or special cased
  // BYTES and 64-bit integers is not equal.
  return false;
}

// prettier-ignore
/**
 * ScalarValue maps from a scalar field type to a TypeScript value type.
 */
export type ScalarValue<T = ScalarType> =
    T extends ScalarType.STRING ? string
  : T extends ScalarType.INT32 ? number
  : T extends ScalarType.UINT32 ? number
  : T extends ScalarType.UINT32 ? number
  : T extends ScalarType.SINT32 ? number
  : T extends ScalarType.FIXED32 ? number
  : T extends ScalarType.SFIXED32 ? number
  : T extends ScalarType.FLOAT ? number
  : T extends ScalarType.DOUBLE ? number
  : T extends ScalarType.INT64 ? bigint | string
  : T extends ScalarType.SINT64 ? bigint | string
  : T extends ScalarType.SFIXED64 ? bigint | string
  : T extends ScalarType.UINT64 ? bigint | string
  : T extends ScalarType.FIXED64 ? bigint | string
  : T extends ScalarType.BOOL ? boolean
  : T extends ScalarType.BYTES ? Uint8Array
  : never;

/**
 * Returns the default value for the given scalar type, following
 * proto3 semantics.
 */
// TODO rename to createScalarZeroValue and return ScalarValue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function scalarDefaultValue(type: ScalarType, longType: LongType): any {
  switch (type) {
    case ScalarType.BOOL:
      return false;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- acceptable since it's covered by tests
      return longType == 0 ? protoInt64.zero : "0";
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0.0;
    case ScalarType.BYTES:
      return new Uint8Array(0);
    case ScalarType.STRING:
      return "";
    default:
      // Handles INT32, UINT32, SINT32, FIXED32, SFIXED32.
      // We do not use individual cases to save a few bytes code size.
      return 0;
  }
}

/**
 * Returns true for a zero-value. For example, an integer has the zero-value `0`,
 * a boolean is `false`, a string is `""`, and bytes is an empty Uint8Array.
 *
 * In proto3, zero-values are not written to the wire, unless the field is
 * optional or repeated.
 */
export function isScalarZeroValue(type: ScalarType, value: unknown) {
  switch (type) {
    case ScalarType.BOOL:
      return value === false;
    case ScalarType.STRING:
      return value === "";
    case ScalarType.BYTES:
      return value instanceof Uint8Array && !value.byteLength;
    default:
      return value == 0; // Loose comparison matches 0n, 0 and "0"
  }
}

/**
 * Get information for writing a scalar value.
 *
 * Returns tuple:
 * [0]: appropriate WireType
 * [1]: name of the appropriate method of IBinaryWriter
 * [2]: whether the given value is a default value for proto3 semantics
 *
 * If argument `value` is omitted, [2] is always false.
 */
// TODO replace call-sites writeScalar() and writePacked(), then remove
export function scalarTypeInfo(
  type: ScalarType,
  value?: unknown,
): [
  WireType,
  Exclude<keyof IBinaryWriter, "tag" | "raw" | "fork" | "join" | "finish">,
  boolean,
] {
  let wireType = WireType.Varint;
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- INT32, UINT32, SINT32 are covered by the defaults
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      wireType = WireType.LengthDelimited;
      break;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      wireType = WireType.Bit64;
      break;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      wireType = WireType.Bit32;
      break;
  }
  const method = ScalarType[type].toLowerCase() as Exclude<
    keyof IBinaryWriter,
    "tag" | "raw" | "fork" | "join" | "finish"
  >;
  return [
    wireType,
    method,
    value === undefined || isScalarZeroValue(type, value),
  ];
}
