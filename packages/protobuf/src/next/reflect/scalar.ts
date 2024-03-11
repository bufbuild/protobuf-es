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

import { protoInt64 } from "../../proto-int64.js";
import { LongType, ScalarType } from "../../scalar.js";

export { ScalarType, LongType } from "../../scalar.js";
export type { ScalarValue } from "../../scalar.js";
export {
  scalarZeroValue,
  isScalarZeroValue,
  scalarEquals,
} from "../../private/scalars.js";

const FLOAT32_MAX = 3.4028234663852886e38,
  FLOAT32_MIN = -3.4028234663852886e38,
  UINT32_MAX = 0xffffffff,
  INT32_MAX = 0x7fffffff,
  INT32_MIN = -0x80000000;

export type InvalidScalarValueErr =
  | false
  | "invalid UTF8"
  | `${string} out of range`;

// TODO this checks UTF-8 validity
export function checkScalarValue(
  value: unknown,
  scalar: ScalarType,
): true | InvalidScalarValueErr {
  switch (scalar) {
    case ScalarType.DOUBLE:
      return typeof value == "number";
    case ScalarType.FLOAT:
      if (typeof value != "number") {
        return false;
      }
      if (value > FLOAT32_MAX || value < FLOAT32_MIN) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      if (typeof value !== "number" || !Number.isInteger(value)) {
        return false;
      }
      if (value > INT32_MAX || value < INT32_MIN) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.UINT32:
      if (typeof value !== "number" || !Number.isInteger(value)) {
        return false;
      }
      if (value > UINT32_MAX || value < 0) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.BOOL:
      return typeof value == "boolean";
    case ScalarType.STRING:
      if (typeof value != "string") {
        return false;
      }
      try {
        encodeURIComponent(value);
        return true;
      } catch (e) {
        return "invalid UTF8";
      }
    case ScalarType.BYTES:
      return value instanceof Uint8Array;

    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      // signed
      if (
        typeof value != "string" &&
        typeof value !== "bigint" &&
        typeof value !== "number"
      ) {
        return false;
      }
      try {
        protoInt64.parse(value);
      } catch (e) {
        return `${value} out of range`;
      }
      return true;

    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      // unsigned
      if (
        typeof value != "string" &&
        typeof value !== "bigint" &&
        typeof value !== "number"
      ) {
        return false;
      }
      try {
        protoInt64.uParse(value);
      } catch (e) {
        return `${value} out of range`;
      }
      return true;
  }
}

export function scalarTypeDescription(scalar: ScalarType): string {
  switch (scalar) {
    case ScalarType.STRING:
      return "string";
    case ScalarType.BOOL:
      return "boolean";
    case ScalarType.INT64:
    case ScalarType.SINT64:
    case ScalarType.SFIXED64:
      return "bigint (int64)";
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return "bigint (uint64)";
    case ScalarType.BYTES:
      return "Uint8Array";
    case ScalarType.DOUBLE:
      return "number (float64)";
    case ScalarType.FLOAT:
      return "number (float32)";
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      return "number (uint32)";
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      return "number (int32)";
  }
}

export function scalarTypeScriptType(
  scalar: ScalarType,
  long: LongType,
):
  | "string"
  | "boolean"
  | "bigint"
  | "bigint | string"
  | "Uint8Array"
  | "number" {
  switch (scalar) {
    case ScalarType.STRING:
      return "string";
    case ScalarType.BOOL:
      return "boolean";
    case ScalarType.UINT64:
    case ScalarType.SFIXED64:
    case ScalarType.FIXED64:
    case ScalarType.SINT64:
    case ScalarType.INT64:
      return long == LongType.STRING ? "string" : "bigint";
    case ScalarType.BYTES:
      return "Uint8Array";
    default:
      return "number";
  }
}
