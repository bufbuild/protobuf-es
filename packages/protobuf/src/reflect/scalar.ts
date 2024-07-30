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

import { protoInt64 } from "../proto-int64.js";
import { ScalarType } from "../descriptors.js";

/**
 * ScalarValue maps from a scalar field type to a TypeScript value type.
 */
// prettier-ignore
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

/**
 * Returns the zero value for the given scalar type.
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
    default:
      // Handles INT32, UINT32, SINT32, FIXED32, SFIXED32.
      // We do not use individual cases to save a few bytes code size.
      return 0 as ScalarValue<T, LongAsString>;
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
  }
}

/**
 * Returns true for a zero-value. For example, an integer has the zero-value `0`,
 * a boolean is `false`, a string is `""`, and bytes is an empty Uint8Array.
 *
 * In proto3, zero-values are not written to the wire, unless the field is
 * optional or repeated.
 */
export function isScalarZeroValue(type: ScalarType, value: unknown): boolean {
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
