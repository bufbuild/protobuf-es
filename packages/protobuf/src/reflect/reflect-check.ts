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
import type { DescEnum, DescField, DescMessage } from "../desc-types.js";
import { isMessage } from "../is-message.js";
import { FieldError } from "./error.js";
import { isReflectList, isReflectMap, isReflectMessage } from "./guard.js";

export function checkField(
  field: DescField,
  value: unknown,
): FieldError | undefined {
  const check =
    field.fieldKind == "list"
      ? isReflectList(value, field)
      : field.fieldKind == "map"
        ? isReflectMap(value, field)
        : checkSingular(field, value);
  if (check === true) {
    return undefined;
  }
  let reason: string;
  switch (field.fieldKind) {
    case "list":
      reason = `expected ${formatReflectList(field)}, got ${formatVal(value)}`;
      break;
    case "map":
      reason = `expected ${formatReflectMap(field)}, got ${formatVal(value)}`;
      break;
    default: {
      reason = reasonSingular(field, value, check);
    }
  }
  return new FieldError(field, reason);
}

export function checkListItem(
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

export function checkMapEntry(
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

function checkSingular(
  field: DescField,
  value: unknown,
): true | false | InvalidScalarValueErr {
  if (field.scalar !== undefined) {
    return checkScalarValue(value, field.scalar);
  }
  if (field.enum !== undefined) {
    if (field.enum.open) {
      return Number.isInteger(value);
    }
    return field.enum.values.some((v) => v.number === value);
  }
  return isReflectMessage(value, field.message);
}

function reasonSingular(
  field:
    | { scalar: ScalarType; message?: undefined; enum?: undefined }
    | { scalar?: undefined; message: DescMessage; enum?: undefined }
    | { scalar?: undefined; message?: undefined; enum: DescEnum },
  val: unknown,
  details?: string | false,
) {
  details =
    typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`;
  if (field.scalar !== undefined) {
    return `expected ${scalarTypeDescription(field.scalar)}` + details;
  } else if (field.enum !== undefined) {
    return `expected ${field.enum.toString()}` + details;
  }
  return `expected ${formatReflectMessage(field.message)}` + details;
}

export function formatVal(val: unknown): string {
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
      if (isReflectList(val)) {
        return formatReflectList(val.field());
      }
      if (isReflectMap(val)) {
        return formatReflectMap(val.field());
      }
      if (isReflectMessage(val)) {
        return formatReflectMessage(val.desc);
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

function formatReflectMessage(desc: DescMessage) {
  return `ReflectMessage (${desc.typeName})`;
}

function formatReflectList(field: DescField & { fieldKind: "list" }) {
  switch (field.listKind) {
    case "message":
      return `ReflectList (${field.message.toString()})`;
    case "enum":
      return `ReflectList (${field.enum.toString()})`;
    case "scalar":
      return `ReflectList (${ScalarType[field.scalar]})`;
  }
}

function formatReflectMap(field: DescField & { fieldKind: "map" }) {
  switch (field.mapKind) {
    case "message":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${field.message.toString()})`;
    case "enum":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${field.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${ScalarType[field.scalar]})`;
  }
}
