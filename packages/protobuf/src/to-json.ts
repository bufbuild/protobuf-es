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

import type {
  DescEnum,
  DescExtension,
  DescField,
  DescMessage,
} from "./desc-types.js";
import type { JsonObject, JsonValue } from "./json-value.js";
import { assert } from "./reflect/assert.js";
import { protoCamelCase } from "./reflect/names.js";
import { reflect } from "./reflect/reflect.js";
import { ScalarType } from "./reflect/scalar.js";
import type { Registry } from "./reflect/registry.js";
import type {
  ReflectList,
  ReflectMap,
  ReflectMessage,
} from "./reflect/reflect-types.js";
import type { Message, MessageShape } from "./types.js";
import type {
  Any,
  Duration,
  FeatureSet_FieldPresence,
  FieldDescriptorProto_Label,
  FieldMask,
  ListValue,
  Struct,
  Timestamp,
  Value,
} from "./wkt/index.js";
import { anyUnpack } from "./wkt/index.js";
import { isWrapperDesc } from "./wkt/wrappers.js";
import { base64Encode } from "./wire/index.js";
import { getExtension } from "./extensions.js";

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name: FeatureSet_FieldPresence.$localName = $number;
const LEGACY_REQUIRED: FeatureSet_FieldPresence.LEGACY_REQUIRED = 3;

// bootstrap-inject google.protobuf.FieldDescriptorProto.Label.LABEL_OPTIONAL: const $name: FieldDescriptorProto_Label.$localName = $number;
const LABEL_OPTIONAL: FieldDescriptorProto_Label.OPTIONAL = 1;

/**
 * Options for serializing to JSON.
 */
export interface JsonWriteOptions {
  /**
   * Emit fields with default values: Fields with default values are omitted
   * by default in proto3 JSON output. This option overrides this behavior
   * and outputs fields with their default values.
   */
  emitDefaultValues: boolean;

  /**
   * Emit enum values as integers instead of strings: The name of an enum
   * value is used by default in JSON output. An option may be provided to
   * use the numeric value of the enum value instead.
   */
  enumAsInteger: boolean;

  /**
   * Use proto field name instead of lowerCamelCase name: By default proto3
   * JSON printer should convert the field name to lowerCamelCase and use
   * that as the JSON name. An implementation may provide an option to use
   * proto field name as the JSON name instead. Proto3 JSON parsers are
   * required to accept both the converted lowerCamelCase name and the proto
   * field name.
   */
  useProtoFieldName: boolean;

  /**
   * This option is required to write `google.protobuf.Any` and extensions
   * to JSON format.
   */
  registry?: Registry;
}

/**
 * Options for serializing to JSON.
 */
export interface JsonWriteStringOptions extends JsonWriteOptions {
  prettySpaces: number;
}

// Default options for serializing to JSON.
const jsonWriteDefaults: Readonly<JsonWriteOptions> = {
  emitDefaultValues: false,
  enumAsInteger: false,
  useProtoFieldName: false,
};

function makeWriteOptions(
  options?: Partial<JsonWriteOptions>,
): Readonly<JsonWriteOptions> {
  return options ? { ...jsonWriteDefaults, ...options } : jsonWriteDefaults;
}

/**
 * Serialize the message to a JSON value, a JavaScript value that can be
 * passed to JSON.stringify().
 */
export function toJson<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  options?: Partial<JsonWriteOptions>,
): JsonValue {
  return reflectToJson(
    reflect(messageDesc, message),
    makeWriteOptions(options),
  );
}

/**
 * Serialize the message to a JSON string.
 */
export function toJsonString<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  options?: Partial<JsonWriteStringOptions>,
): string {
  const jsonValue = toJson(messageDesc, message, options);
  return JSON.stringify(jsonValue, null, options?.prettySpaces ?? 0);
}

function reflectToJson(msg: ReflectMessage, opts: JsonWriteOptions): JsonValue {
  const wktJson = tryWktToJson(msg, opts);
  if (wktJson !== undefined) return wktJson;
  const json: JsonObject = {};
  for (const f of msg.sortedFields) {
    if (!msg.isSet(f)) {
      if (
        f.fieldKind != "map" &&
        f.fieldKind != "list" &&
        f.presence == LEGACY_REQUIRED
      ) {
        throw new Error(
          `cannot encode field ${msg.desc.typeName}.${f.name} to binary: required field not set`,
        );
      }
      if (!opts.emitDefaultValues) {
        continue;
      }
      if (!canEmitFieldDefaultValue(f)) {
        continue;
      }
    }
    const jsonValue = fieldToJson(f, msg.get(f), opts);
    if (jsonValue !== undefined) {
      json[jsonName(f, opts)] = jsonValue;
    }
  }
  if (opts.registry) {
    const tagSeen = new Set<number>();
    for (const uf of msg.getUnknown() ?? []) {
      // Same tag can appear multiple times, so we
      // keep track and skip identical ones.
      if (tagSeen.has(uf.no)) {
        continue;
      }
      const extension = opts.registry.getExtensionFor(msg.desc, uf.no);
      if (!extension) {
        continue;
      }
      const value = getExtension(msg.message, extension);
      const jsonValue = extensionToJson(extension, value, opts);
      if (jsonValue !== undefined) {
        json[extension.jsonName] = jsonValue;
      }
    }
  }
  return json;
}

function fieldToJson(f: DescField, val: unknown, opts: JsonWriteOptions) {
  switch (f.fieldKind) {
    case "scalar":
      return scalarToJson(f.scalar, val);
    case "message":
      return reflectToJson(val as ReflectMessage, opts);
    case "enum":
      return enumToJson(f.enum, val, opts.enumAsInteger);
    case "list":
      return listToJson(val as ReflectList, opts);
    case "map":
      return mapToJson(val as ReflectMap, opts);
  }
}

function extensionToJson(
  f: DescExtension,
  val: unknown,
  opts: JsonWriteOptions,
) {
  switch (f.fieldKind) {
    case "scalar":
      return scalarToJson(f.scalar, val);
    case "enum":
      return enumToJson(f.enum, val, opts.enumAsInteger);
    case "message":
      return reflectToJson(reflect(f.message, val as Message), opts);
    case "list":
      // eslint-disable-next-line no-case-declarations
      const jsonArr: JsonValue[] = [];
      // eslint-disable-next-line no-case-declarations
      const list = val as unknown[];
      switch (f.listKind) {
        case "scalar":
          for (const item of list) {
            jsonArr.push(scalarToJson(f.scalar, item) as JsonValue);
          }
          break;
        case "enum":
          for (const item of list) {
            jsonArr.push(
              enumToJson(f.enum, item, opts.enumAsInteger) as JsonValue,
            );
          }
          break;
        case "message":
          for (const item of list) {
            jsonArr.push(
              reflectToJson(reflect(f.message, item as Message), opts),
            );
          }
          break;
      }
      return opts.emitDefaultValues || jsonArr.length > 0 ? jsonArr : undefined;
  }
}

function mapToJson(map: ReflectMap, opts: JsonWriteOptions) {
  const f = map.field();
  const jsonObj: JsonObject = {};
  switch (f.mapKind) {
    case "scalar":
      for (const [entryKey, entryValue] of map) {
        jsonObj[entryKey.toString()] = scalarToJson(f.scalar, entryValue); // JSON standard allows only (double quoted) string as property key
      }
      break;
    case "message":
      for (const [entryKey, entryValue] of map) {
        // JSON standard allows only (double quoted) string as property key
        jsonObj[entryKey.toString()] = reflectToJson(
          entryValue as ReflectMessage,
          opts,
        );
      }
      break;
    case "enum":
      for (const [entryKey, entryValue] of map) {
        // JSON standard allows only (double quoted) string as property key
        jsonObj[entryKey.toString()] = enumToJson(
          f.enum,
          entryValue,
          opts.enumAsInteger,
        );
      }
      break;
  }
  return opts.emitDefaultValues || map.size > 0 ? jsonObj : undefined;
}

function listToJson(list: ReflectList, opts: JsonWriteOptions) {
  const f = list.field();
  const jsonArr: JsonValue[] = [];
  switch (f.listKind) {
    case "scalar":
      for (const item of list) {
        jsonArr.push(scalarToJson(f.scalar, item) as JsonValue);
      }
      break;
    case "enum":
      for (const item of list) {
        jsonArr.push(enumToJson(f.enum, item, opts.enumAsInteger) as JsonValue);
      }
      break;
    case "message":
      for (const item of list) {
        jsonArr.push(reflectToJson(item as ReflectMessage, opts));
      }
      break;
  }
  return opts.emitDefaultValues || jsonArr.length > 0 ? jsonArr : undefined;
}

function enumToJson(
  desc: DescEnum,
  value: unknown,
  enumAsInteger: boolean,
): string | number | null {
  assert(typeof value == "number");
  if (desc.typeName == "google.protobuf.NullValue") {
    return null;
  }
  if (enumAsInteger) {
    return value;
  }
  const val = desc.values.find((v) => v.number == value);
  return val?.name ?? value; // if we don't know the enum value, just return the number
}

function scalarToJson(
  type: ScalarType,
  value: unknown,
): string | number | boolean {
  switch (type) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      assert(typeof value == "number");
      return value;

    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.FLOAT:
    // assertFloat32(value);
    case ScalarType.DOUBLE: // eslint-disable-line no-fallthrough
      assert(typeof value == "number");
      if (Number.isNaN(value)) return "NaN";
      if (value === Number.POSITIVE_INFINITY) return "Infinity";
      if (value === Number.NEGATIVE_INFINITY) return "-Infinity";
      return value;

    // string:
    case ScalarType.STRING:
      assert(typeof value == "string");
      return value;

    // bool:
    case ScalarType.BOOL:
      assert(typeof value == "boolean");
      return value;

    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      assert(
        typeof value == "bigint" ||
          typeof value == "string" ||
          typeof value == "number",
      );
      return value.toString();

    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      assert(value instanceof Uint8Array);
      return base64Encode(value);
  }
}

// Decide whether an unset field should be emitted with JSON write option `emitDefaultValues`
function canEmitFieldDefaultValue(field: DescField) {
  switch (true) {
    // oneof fields are never emitted
    case field.oneof !== undefined:
    // singular message field are allowed to emit JSON null, but we do not
    // eslint-disable-next-line no-fallthrough
    case field.fieldKind === "message":
    // the field uses explicit presence, so we cannot emit a zero value
    // eslint-disable-next-line no-fallthrough
    case field.proto.label === LABEL_OPTIONAL:
      return false;
    default:
      return true;
  }
}

function jsonName(f: DescField, opts: JsonWriteOptions) {
  return opts.useProtoFieldName ? f.name : f.jsonName;
}

// returns a json value if wkt, otherwise returns undefined.
function tryWktToJson(
  msg: ReflectMessage,
  opts: JsonWriteOptions,
): JsonValue | undefined {
  if (!msg.desc.typeName.startsWith("google.protobuf.")) {
    return undefined;
  }
  switch (msg.desc.typeName) {
    case "google.protobuf.Any":
      return anyToJson(msg.message as Any, opts);
    case "google.protobuf.Timestamp":
      return timestampToJson(msg.message as Timestamp);
    case "google.protobuf.Duration":
      return durationToJson(msg.message as Duration);
    case "google.protobuf.FieldMask":
      return fieldMaskToJson(msg.message as FieldMask);
    case "google.protobuf.Struct":
      return structToJson(msg.message as Struct);
    case "google.protobuf.Value":
      return valueToJson(msg.message as Value);
    case "google.protobuf.ListValue":
      return listValueToJson(msg.message as ListValue);
    default:
      if (isWrapperDesc(msg.desc)) {
        const valueField = msg.desc.fields[0];
        return scalarToJson(valueField.scalar, msg.get(valueField));
      }
      return undefined;
  }
}

function anyToJson(val: Any, opts: JsonWriteOptions): JsonValue {
  if (val.typeUrl === "") {
    return {};
  }
  const { registry } = opts;
  let message: Message | undefined;
  let desc: DescMessage | undefined;
  if (registry) {
    message = anyUnpack(val, registry);
    if (message) {
      desc = registry.getMessage(message.$typeName);
    }
  }
  if (!desc || !message) {
    throw new Error(
      `cannot encode message ${val.$typeName} to JSON: "${val.typeUrl}" is not in the type registry`,
    );
  }
  let json = reflectToJson(reflect(desc, message), opts);
  if (
    desc.typeName.startsWith("google.protobuf.") ||
    json === null ||
    Array.isArray(json) ||
    typeof json !== "object"
  ) {
    json = { value: json };
  }
  json["@type"] = val.typeUrl;
  return json;
}

function durationToJson(val: Duration) {
  if (
    Number(val.seconds) > 315576000000 ||
    Number(val.seconds) < -315576000000
  ) {
    throw new Error(
      `cannot encode ${val.$typeName} to JSON: value out of range`,
    );
  }
  let text = val.seconds.toString();
  if (val.nanos !== 0) {
    let nanosStr = Math.abs(val.nanos).toString();
    nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
    if (nanosStr.substring(3) === "000000") {
      nanosStr = nanosStr.substring(0, 3);
    } else if (nanosStr.substring(6) === "000") {
      nanosStr = nanosStr.substring(0, 6);
    }
    text += "." + nanosStr;
    if (val.nanos < 0 && Number(val.seconds) == 0) {
      text = "-" + text;
    }
  }
  return text + "s";
}

function fieldMaskToJson(val: FieldMask) {
  return val.paths
    .map((p) => {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      if (p.match(/_[0-9]?_/g) || p.match(/[A-Z]/g)) {
        throw new Error(
          `cannot encode ${val.$typeName} to JSON: lowerCamelCase of path name "` +
            p +
            '" is irreversible',
        );
      }
      return protoCamelCase(p);
    })
    .join(",");
}

function structToJson(val: Struct) {
  const json: JsonObject = {};
  for (const [k, v] of Object.entries(val.fields)) {
    json[k] = valueToJson(v);
  }
  return json;
}

function valueToJson(val: Value) {
  switch (val.kind.case) {
    case "nullValue":
      return null;
    case "numberValue":
      if (!Number.isFinite(val.kind.value)) {
        throw new Error(`${val.$typeName} cannot be NaN or Infinity`);
      }
      return val.kind.value;
    case "boolValue":
      return val.kind.value;
    case "stringValue":
      return val.kind.value;
    case "structValue":
      return structToJson(val.kind.value);
    case "listValue":
      return listValueToJson(val.kind.value);
    default:
      throw new Error(`${val.$typeName} must have a value`);
  }
}

function listValueToJson(val: ListValue): JsonValue[] {
  return val.values.map(valueToJson);
}

function timestampToJson(val: Timestamp) {
  const ms = Number(val.seconds) * 1000;
  if (
    ms < Date.parse("0001-01-01T00:00:00Z") ||
    ms > Date.parse("9999-12-31T23:59:59Z")
  ) {
    throw new Error(
      `cannot encode ${val.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`,
    );
  }
  if (val.nanos < 0) {
    throw new Error(
      `cannot encode ${val.$typeName} to JSON: nanos must not be negative`,
    );
  }
  let z = "Z";
  if (val.nanos > 0) {
    const nanosStr = (val.nanos + 1000000000).toString().substring(1);
    if (nanosStr.substring(3) === "000000") {
      z = "." + nanosStr.substring(0, 3) + "Z";
    } else if (nanosStr.substring(6) === "000") {
      z = "." + nanosStr.substring(0, 6) + "Z";
    } else {
      z = "." + nanosStr + "Z";
    }
  }
  return new Date(ms).toISOString().replace(".000Z", z);
}
