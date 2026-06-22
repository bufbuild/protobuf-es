// Copyright 2021-2026 Buf Technologies, Inc.
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

import { protoInt64 } from "../proto-int64.js";
import { ScalarType } from "../descriptors.js";

/**
 * ScalarValue maps from a scalar field type to a TypeScript value type.
 */
// biome-ignore format: want this to read well
export type ScalarValue<
  T = ScalarType,
  LongAsString extends boolean = false,
> =
    T extends ScalarType.STRING   ? string
  : T extends ScalarType.INT32    ? number
  : T extends ScalarType.UINT32   ? number
  : T extends ScalarType.SINT32   ? number
  : T extends ScalarType.FIXED32  ? number
  : T extends ScalarType.SFIXED32 ? number
  : T extends ScalarType.FLOAT    ? number
  : T extends ScalarType.DOUBLE   ? number
  : T extends ScalarType.INT64    ? LongAsString extends true ? string : bigint
  : T extends ScalarType.SINT64   ? LongAsString extends true ? string : bigint
  : T extends ScalarType.SFIXED64 ? LongAsString extends true ? string : bigint
  : T extends ScalarType.UINT64   ? LongAsString extends true ? string : bigint
  : T extends ScalarType.FIXED64  ? LongAsString extends true ? string : bigint
  : T extends ScalarType.BOOL     ? boolean
  : T extends ScalarType.BYTES    ? Uint8Array
  : never;

/**
 * Returns true if both scalar values are equal.
 *
 * For float and double, values are compared following IEEE semantics: -0
 * equals 0, and NaN does not equal NaN. This is value equality, not identity.
 *
 * It deliberately differs from isScalarZeroValue, which treats -0 as distinct
 * from 0. A value can equal the zero value without being a zero value
 * (scalarEquals(DOUBLE, -0, 0) is true while isScalarZeroValue(DOUBLE, -0) is
 * false) so this function must not be used to derive implicit presence.
 */
export function scalarEquals(
  type: ScalarType,
  a: ScalarValue | undefined,
  b: ScalarValue | undefined,
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

/**
 * Returns the zero value for the given scalar type, the value a field of this
 * type has when unset: 0 for numeric types, "" for strings, false for
 * booleans, and an empty Uint8Array for bytes. For 64-bit integer types, the
 * result is "0" when longAsString is true, otherwise 0n.
 *
 * This is the type's zero value, not a proto2 custom field default. For float
 * and double it is +0; isScalarZeroValue treats only +0, not -0, as this value.
 */
export function scalarZeroValue<
  T extends ScalarType,
  LongAsString extends boolean,
>(type: T, longAsString: LongAsString): ScalarValue<T, LongAsString> {
  switch (type) {
    case ScalarType.STRING:
      return "" as ScalarValue<T, LongAsString>;
    case ScalarType.BOOL:
      return false as ScalarValue<T, LongAsString>;
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0.0 as ScalarValue<T, LongAsString>;
    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.SFIXED64:
    case ScalarType.FIXED64:
    case ScalarType.SINT64:
      return (longAsString ? "0" : protoInt64.zero) as ScalarValue<
        T,
        LongAsString
      >;
    case ScalarType.BYTES:
      return new Uint8Array(0) as ScalarValue<T, LongAsString>;
    default:
      // Handles INT32, UINT32, SINT32, FIXED32, SFIXED32.
      // We do not use individual cases to save a few bytes code size.
      return 0 as ScalarValue<T, LongAsString>;
  }
}

/**
 * Returns true if the value is the zero value for the given scalar type: `0`
 * for numeric types, `false` for booleans, `""` for strings, and an empty
 * Uint8Array for bytes.
 *
 * This is the implicit-presence default check. A singular field with implicit
 * presence is treated as unset, and omitted from the wire, when its value is
 * the zero value. With explicit presence, or in repeated and map fields,
 * presence is structural and this function does not apply.
 *
 * Note that -0 is NOT a zero value for float and double: under implicit
 * presence, +0 is omitted from the wire but -0 is written, following the
 * proto3 specification. As a result this can disagree with scalarEquals, which
 * compares by value and treats -0 as equal to 0.
 */
export function isScalarZeroValue(type: ScalarType, value: unknown): boolean {
  switch (type) {
    case ScalarType.BOOL:
      return value === false;
    case ScalarType.STRING:
      return value === "";
    case ScalarType.BYTES:
      return value instanceof Uint8Array && !value.byteLength;
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      // Object.is distinguishes -0 from 0.
      return Object.is(value, 0);
    default:
      // Loose comparison matches 0n, 0 and "0".
      return value == 0;
  }
}
