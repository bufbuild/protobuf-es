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

import { ScalarType, scalarTypeDescription } from "./scalar.js";
import type { InvalidScalarValueErr } from "./scalar.js";
import { checkScalarValue } from "./scalar.js";
import type { DescEnum, DescField, DescMessage } from "../../descriptor-set.js";
import { isMessage } from "../is-message.js";
import { FieldError } from "./error.js";
import { Edition } from "../../google/protobuf/descriptor_pb.js";
import { isWktWrapperDesc } from "./wkt.js";

export function checkReflectValue(
  field: DescField,
  value: unknown,
): FieldError | undefined {
  switch (field.fieldKind) {
    case "list":
      if (!Array.isArray(value)) {
        return new FieldError(field, `expected Array, got ${formatVal(value)}`);
      }
      for (let i = 0; i < value.length; i++) {
        const err = checkNewListItem(field, i, value[i]);
        if (err) {
          return err;
        }
      }
      break;
    case "map":
      if (!(value instanceof Map)) {
        return new FieldError(field, `expected Map, got ${formatVal(value)}`);
      }
      for (const [key, val] of (value as Map<unknown, unknown>).entries()) {
        const err = checkNewMapEntry(field, key, val);
        if (err) {
          return err;
        }
      }
      break;
    // @ts-expect-error TS7029
    case "message":
      if (isWktWrapperDesc(field.message)) {
        const valueType = field.message.fields[0].scalar;
        if (isMessage(value)) {
          if (!isMessage(value, field.message)) {
            return new FieldError(
              field,
              reasonWktWrapper(field.message, valueType, value),
            );
          }
          return undefined;
        } else {
          const check = checkScalarValue(value, valueType);
          if (check !== true) {
            return new FieldError(
              field,
              reasonWktWrapper(field.message, valueType, value, check),
            );
          }
          return undefined;
        }
      }
    // eslint-disable-next-line no-fallthrough
    default: {
      const check = checkSingular(field, value);
      if (check !== true) {
        return new FieldError(field, reasonSingular(field, value, check));
      }
    }
  }
  return undefined;
}

export function checkNewListItem(
  field: DescField & { fieldKind: "list" },
  index: number,
  value: unknown,
): FieldError | undefined {
  const check = checkSingular(field, value);
  if (check !== true) {
    return new FieldError(
      field,
      `list item #${index + 1}: ${reasonSingular(field, value, check)}`,
    );
  }
  return undefined;
}

export function checkNewMapEntry(
  field: DescField & { fieldKind: "map" },
  key: unknown,
  value: unknown,
): FieldError | undefined {
  const checkKey = checkScalarValue(key, field.mapKey);
  if (checkKey !== true) {
    return new FieldError(
      field,
      `invalid map key: ${reasonSingular({ scalar: field.mapKey }, key, checkKey)}`,
    );
  }
  const checkVal = checkSingular(field, value);
  if (checkVal !== true) {
    return new FieldError(
      field,
      `map entry ${formatVal(key)}: ${reasonSingular(field, value, checkVal)}`,
    );
  }
  return undefined;
}

type InvalidSingularErr = false | InvalidScalarValueErr;

function checkSingular(
  field: DescField,
  value: unknown,
): true | InvalidSingularErr {
  if (field.scalar !== undefined) {
    return checkScalarValue(value, field.scalar);
  }
  if (field.enum !== undefined) {
    switch (field.parent.file.edition) {
      case Edition.EDITION_PROTO2:
        // proto2 enums are closed
        return field.enum.values.some((v) => v.number === value);
      case Edition.EDITION_PROTO3:
        // proto2 enums are open
        return Number.isInteger(value);
      default:
        // TODO implement editions
        throw new Error(`unsupported edition`);
    }
  }
  return isMessage(value, field.message);
}

function reasonWktWrapper(
  wrapper: DescMessage,
  valueType: ScalarType,
  val: unknown,
  details?: string | false,
) {
  const reason = `expected ${wrapper.toString()} or ${scalarTypeDescription(valueType)}`;
  return (
    reason +
    (typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`)
  );
}

function reasonSingular(
  field:
    | { scalar: ScalarType; message?: undefined; enum?: undefined }
    | { scalar?: undefined; message: DescMessage; enum?: undefined }
    | { scalar?: undefined; message?: undefined; enum: DescEnum },
  val: unknown,
  details?: string | false,
) {
  let reason: string;
  if (field.scalar !== undefined) {
    reason = `expected ${scalarTypeDescription(field.scalar)}`;
  } else if (field.enum !== undefined) {
    reason = `expected ${field.enum.toString()}`;
  } else {
    reason = `expected ${field.message.toString()}`;
  }
  return (
    reason +
    (typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`)
  );
}

function formatVal(val: unknown): string {
  switch (typeof val) {
    case "object":
      if (val === null) {
        return "null";
      }
      if (val instanceof Uint8Array) {
        return `Uint8Array(${val.length})`;
      }
      if (Array.isArray(val)) {
        return `Array(${val.length})`;
      }
      if (isMessage(val)) {
        return `message ${val.$typeName}`;
      }
      return "object";
    case "string":
      return val.length > 30 ? "string" : `"${val.split('"').join('\\"')}"`;
    case "boolean":
      return String(val);
    case "number":
      return String(val);
    case "bigint":
      return String(val) + "n";
    default:
      // "symbol" | "undefined" | "object" | "function"
      return typeof val;
  }
}
