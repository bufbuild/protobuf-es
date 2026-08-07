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

import type { DescField, DescMessage } from "../descriptors.js";
import type { JsonObject, JsonValue } from "../json-value.js";
import { create } from "../create.js";
import { isObject } from "./guard.js";
import { isWrapperDesc } from "../wkt/wrappers.js";
import type {
  ListValue,
  Struct,
  Value,
} from "../wkt/gen/google/protobuf/struct_pb.js";

// google.protobuf.NullValue.NULL_VALUE;
const NULL_VALUE = 0;

/**
 * Mapper between the local representation of a message field value
 * and the message it represents. For most fields, the local value is the
 * message itself. Types from google/protobuf/wrappers.proto are unwrapped
 * to the wrapped scalar value when used in a singular field that is not
 * part of a oneof group, and google.protobuf.Struct is represented with
 * JsonObject when used in a field, except when used in
 * google.protobuf.Value.
 *
 * @private
 */
export interface LocalMessageMapper {
  /**
   * Wrap a local value in the message it represents. For undefined - an
   * unset field - a new message is created. Like the reflect API, wrapping
   * an existing Struct field value creates a normalized copy, so that
   * merging does not mutate the previous value in place.
   */
  toMessage(local: unknown): Record<string, unknown>;

  /**
   * Convert a message to the local representation of the field value.
   */
  toLocal(message: Record<string, unknown>): unknown;
}

/**
 * Return the conversions between the local representation of the field
 * value and the message it represents.
 *
 * @private
 */
export function localMessageMapper(
  field: DescField & { message: DescMessage },
): LocalMessageMapper {
  // google.protobuf.Struct fields are stored as JsonObject.
  if (usesJsonRepresentation(field)) {
    return {
      toMessage: (local) =>
        wktStructToReflect(local as JsonValue) as unknown as Record<
          string,
          unknown
        >,
      toLocal: (message) => wktStructToLocal(message as unknown as Struct),
    };
  }
  // Singular wrapper fields outside a oneof are unwrapped to the scalar value.
  if (
    field.fieldKind == "message" &&
    !field.oneof &&
    isWrapperDesc(field.message)
  ) {
    const wrapperDesc = field.message;
    const valueLocalName = wrapperDesc.fields[0].localName;
    return {
      toMessage: (local) => {
        const message = create(wrapperDesc) as unknown as Record<
          string,
          unknown
        >;
        if (local !== undefined) {
          message[valueLocalName] = local;
        }
        return message;
      },
      toLocal: (message) => message[valueLocalName],
    };
  }
  // For all other fields, the local value is the message itself.
  const childDesc = field.message;
  return {
    toMessage: (local) =>
      (local === undefined ? create(childDesc) : local) as Record<
        string,
        unknown
      >,
    toLocal: (message) => message,
  };
}

/**
 * Returns true if values of this field are stored as JsonValue instead of
 * a message: google.protobuf.Struct is represented with JsonObject when
 * used in a field, except when used in google.protobuf.Value.
 */
function usesJsonRepresentation(
  field: DescField & { message: DescMessage },
): boolean {
  return (
    field.message.typeName == "google.protobuf.Struct" &&
    field.parent.typeName != "google.protobuf.Value"
  );
}

/**
 * Convert the JsonValue representation of a google.protobuf.Struct to the
 * message representation.
 *
 * @private
 */
export function wktStructToReflect(json: JsonValue): Struct {
  const struct: Struct = {
    $typeName: "google.protobuf.Struct",
    fields: {},
  };
  if (isObject(json)) {
    for (const k of Object.keys(json)) {
      struct.fields[k] = wktValueToReflect(json[k]);
    }
  }
  return struct;
}

/**
 * Convert a google.protobuf.Struct message to its JsonValue representation.
 *
 * @private
 */
export function wktStructToLocal(val: Struct): JsonObject {
  const json: JsonObject = {};
  for (const k of Object.keys(val.fields)) {
    json[k] = wktValueToLocal(val.fields[k]);
  }
  return json;
}

function wktValueToLocal(val: Value): JsonValue {
  switch (val.kind.case) {
    case "structValue":
      return wktStructToLocal(val.kind.value);
    case "listValue":
      return val.kind.value.values.map(wktValueToLocal);
    case "nullValue":
    case undefined:
      return null;
    default:
      return val.kind.value;
  }
}

function wktValueToReflect(json: JsonValue): Value {
  const value: Value = {
    $typeName: "google.protobuf.Value",
    kind: { case: undefined },
  };
  switch (typeof json) {
    case "number":
      value.kind = { case: "numberValue", value: json };
      break;
    case "string":
      value.kind = { case: "stringValue", value: json };
      break;
    case "boolean":
      value.kind = { case: "boolValue", value: json };
      break;
    case "object":
      if (json === null) {
        value.kind = { case: "nullValue", value: NULL_VALUE };
      } else if (Array.isArray(json)) {
        const listValue: ListValue = {
          $typeName: "google.protobuf.ListValue",
          values: [],
        };
        if (Array.isArray(json)) {
          for (const e of json) {
            listValue.values.push(wktValueToReflect(e));
          }
        }
        value.kind = {
          case: "listValue",
          value: listValue,
        };
      } else {
        value.kind = {
          case: "structValue",
          value: wktStructToReflect(json),
        };
      }
      break;
  }
  return value;
}
