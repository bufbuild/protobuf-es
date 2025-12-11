// Copyright 2021-2025 Buf Technologies, Inc.
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

import {
  type DescEnum,
  type DescExtension,
  type DescField,
  type DescMessage,
  type DescOneof,
  ScalarType,
} from "./descriptors.js";
import type { JsonValue } from "./json-value.js";
import { protoInt64 } from "./proto-int64.js";
import { create } from "./create.js";
import type { Registry } from "./registry.js";
import type {
  ReflectList,
  ReflectMap,
  ReflectMessage,
} from "./reflect/reflect-types.js";
import { reflect } from "./reflect/reflect.js";
import { FieldError, isFieldError } from "./reflect/error.js";
import { formatVal } from "./reflect/reflect-check.js";
import { type ScalarValue, scalarZeroValue } from "./reflect/scalar.js";
import type { EnumJsonType, EnumShape, MessageShape } from "./types.js";
import { base64Decode } from "./wire/base64-encoding.js";
import type {
  Any,
  Duration,
  FieldMask,
  ListValue,
  Struct,
  Timestamp,
  Value,
} from "./wkt/index.js";
import {
  isWrapperDesc,
  anyPack,
  ListValueSchema,
  NullValue,
  StructSchema,
  ValueSchema,
} from "./wkt/index.js";
import { createExtensionContainer, setExtension } from "./extensions.js";

/**
 * Options for parsing JSON data.
 */
export interface JsonReadOptions {
  /**
   * Ignore unknown fields: Proto3 JSON parser should reject unknown fields
   * by default. This option ignores unknown fields in parsing, as well as
   * unrecognized enum string representations.
   */
  ignoreUnknownFields: boolean;

  /**
   * This option is required to read `google.protobuf.Any` and extensions
   * from JSON format.
   */
  registry?: Registry;
}

// Default options for parsing JSON.
const jsonReadDefaults: Readonly<JsonReadOptions> = {
  ignoreUnknownFields: false,
};

function makeReadOptions(
  options?: Partial<JsonReadOptions>,
): Readonly<JsonReadOptions> {
  return options ? { ...jsonReadDefaults, ...options } : jsonReadDefaults;
}

/**
 * Parse a message from a JSON string.
 */
export function fromJsonString<Desc extends DescMessage>(
  schema: Desc,
  json: string,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  return fromJson(schema, parseJsonString(json, schema.typeName), options);
}

/**
 * Parse a message from a JSON string, merging fields.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 */
export function mergeFromJsonString<Desc extends DescMessage>(
  schema: Desc,
  target: MessageShape<Desc>,
  json: string,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  return mergeFromJson(
    schema,
    target,
    parseJsonString(json, schema.typeName),
    options,
  );
}

/**
 * Parse a message from a JSON value.
 */
export function fromJson<Desc extends DescMessage>(
  schema: Desc,
  json: JsonValue,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  const msg = reflect(schema);
  try {
    readMessage(msg, json, makeReadOptions(options));
  } catch (e) {
    if (isFieldError(e)) {
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      throw new Error(`cannot decode ${e.field()} from JSON: ${e.message}`, {
        cause: e,
      });
    }
    throw e;
  }
  return msg.message as MessageShape<Desc>;
}

/**
 * Parse a message from a JSON value, merging fields.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 */
export function mergeFromJson<Desc extends DescMessage>(
  schema: Desc,
  target: MessageShape<Desc>,
  json: JsonValue,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  try {
    readMessage(reflect(schema, target), json, makeReadOptions(options));
  } catch (e) {
    if (isFieldError(e)) {
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      throw new Error(`cannot decode ${e.field()} from JSON: ${e.message}`, {
        cause: e,
      });
    }
    throw e;
  }
  return target;
}

/**
 * Parses an enum value from JSON.
 */
export function enumFromJson<Desc extends DescEnum>(
  descEnum: Desc,
  json: EnumJsonType<Desc>,
): EnumShape<Desc> {
  const val = readEnum(descEnum, json, false, false);
  if (val === tokenIgnoredUnknownEnum) {
    throw new Error(`cannot decode ${descEnum} from JSON: ${formatVal(json)}`);
  }
  return val as EnumShape<Desc>;
}

/**
 * Is the given value a JSON enum value?
 */
export function isEnumJson<Desc extends DescEnum>(
  descEnum: Desc,
  value: unknown,
): value is EnumJsonType<Desc> {
  return undefined !== descEnum.values.find((v) => v.name === value);
}

function readMessage(
  msg: ReflectMessage,
  json: JsonValue,
  opts: JsonReadOptions,
) {
  if (tryWktFromJson(msg, json, opts)) {
    return;
  }
  if (json == null || Array.isArray(json) || typeof json != "object") {
    throw new Error(`cannot decode ${msg.desc} from JSON: ${formatVal(json)}`);
  }
  const oneofSeen = new Map<DescOneof, DescField>();
  const jsonNames = new Map<string, DescField>();
  for (const field of msg.desc.fields) {
    jsonNames.set(field.name, field).set(field.jsonName, field);
  }
  for (const [jsonKey, jsonValue] of Object.entries(json)) {
    const field = jsonNames.get(jsonKey);
    if (field) {
      if (field.oneof) {
        if (jsonValue === null && field.fieldKind == "scalar") {
          // see conformance test Required.Proto3.JsonInput.OneofFieldNull{First,Second}
          continue;
        }
        const seen = oneofSeen.get(field.oneof);
        if (seen !== undefined) {
          throw new FieldError(
            field.oneof,
            `oneof set multiple times by ${seen.name} and ${field.name}`,
          );
        }
        oneofSeen.set(field.oneof, field);
      }
      readField(msg, field, jsonValue, opts);
    } else {
      let extension: DescExtension | undefined = undefined;
      if (
        jsonKey.startsWith("[") &&
        jsonKey.endsWith("]") &&
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        (extension = opts.registry?.getExtension(
          jsonKey.substring(1, jsonKey.length - 1),
        )) &&
        extension.extendee.typeName === msg.desc.typeName
      ) {
        const [container, field, get] = createExtensionContainer(extension);
        readField(container, field, jsonValue, opts);
        setExtension(msg.message, extension, get());
      }
      if (!extension && !opts.ignoreUnknownFields) {
        throw new Error(
          `cannot decode ${msg.desc} from JSON: key "${jsonKey}" is unknown`,
        );
      }
    }
  }
}

function readField(
  msg: ReflectMessage,
  field: DescField,
  json: JsonValue,
  opts: JsonReadOptions,
) {
  switch (field.fieldKind) {
    case "scalar":
      readScalarField(msg, field, json);
      break;
    case "enum":
      readEnumField(msg, field, json, opts);
      break;
    case "message":
      readMessageField(msg, field, json, opts);
      break;
    case "list":
      readListField(msg.get(field), json, opts);
      break;
    case "map":
      readMapField(msg.get(field), json, opts);
      break;
  }
}

function readMapField(map: ReflectMap, json: JsonValue, opts: JsonReadOptions) {
  if (json === null) {
    return;
  }
  const field = map.field();
  if (typeof json != "object" || Array.isArray(json)) {
    throw new FieldError(field, "expected object, got " + formatVal(json));
  }
  for (const [jsonMapKey, jsonMapValue] of Object.entries(json)) {
    if (jsonMapValue === null && !isSafeNullValueInListOrMap(field)) {
      throw new FieldError(field, "map value must not be null");
    }
    let value: unknown;
    switch (field.mapKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage(msgValue, jsonMapValue, opts);
        value = msgValue;
        break;
      case "enum":
        value = readEnum(
          field.enum,
          jsonMapValue,
          opts.ignoreUnknownFields,
          true,
        );
        if (value === tokenIgnoredUnknownEnum) {
          return;
        }
        break;
      case "scalar":
        value = scalarFromJson(field, jsonMapValue, true);
        break;
    }
    const key = mapKeyFromJson(field.mapKey, jsonMapKey);
    map.set(key, value);
  }
}

function readListField(
  list: ReflectList,
  json: JsonValue,
  opts: JsonReadOptions,
) {
  if (json === null) {
    return;
  }
  const field = list.field();
  if (!Array.isArray(json)) {
    throw new FieldError(field, "expected Array, got " + formatVal(json));
  }
  for (const jsonItem of json) {
    if (jsonItem === null && !isSafeNullValueInListOrMap(field)) {
      throw new FieldError(field, "list item must not be null");
    }
    switch (field.listKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage(msgValue, jsonItem, opts);
        list.add(msgValue);
        break;
      case "enum":
        const enumValue = readEnum(
          field.enum,
          jsonItem,
          opts.ignoreUnknownFields,
          true,
        );
        if (enumValue !== tokenIgnoredUnknownEnum) {
          list.add(enumValue);
        }
        break;
      case "scalar":
        list.add(scalarFromJson(field, jsonItem, true));
        break;
    }
  }
}

function isSafeNullValueInListOrMap(
  field: DescField & { fieldKind: "map" | "list" },
): boolean {
  return (
    field.message?.typeName == "google.protobuf.Value" ||
    field.enum?.typeName == "google.protobuf.NullValue"
  );
}

function readMessageField(
  msg: ReflectMessage,
  field: DescField & { fieldKind: "message" },
  json: JsonValue,
  opts: JsonReadOptions,
) {
  if (json === null && field.message.typeName != "google.protobuf.Value") {
    msg.clear(field);
    return;
  }
  const msgValue = msg.isSet(field) ? msg.get(field) : reflect(field.message);
  readMessage(msgValue, json, opts);
  msg.set(field, msgValue);
}

function readEnumField(
  msg: ReflectMessage,
  field: DescField & { fieldKind: "enum" },
  json: JsonValue,
  opts: JsonReadOptions,
) {
  const enumValue = readEnum(field.enum, json, opts.ignoreUnknownFields, false);
  if (enumValue === tokenNull) {
    msg.clear(field);
  } else if (enumValue !== tokenIgnoredUnknownEnum) {
    msg.set(field, enumValue);
  }
}

function readScalarField(
  msg: ReflectMessage,
  field: DescField & { fieldKind: "scalar" },
  json: JsonValue,
) {
  const scalarValue = scalarFromJson(field, json, false);
  if (scalarValue === tokenNull) {
    msg.clear(field);
  } else {
    msg.set(field, scalarValue);
  }
}

const tokenIgnoredUnknownEnum = Symbol();

function readEnum(
  desc: DescEnum,
  json: JsonValue,
  ignoreUnknownFields: boolean,
  nullAsZeroValue: false,
): number | typeof tokenIgnoredUnknownEnum | typeof tokenNull;
function readEnum(
  desc: DescEnum,
  json: JsonValue,
  ignoreUnknownFields: boolean,
  nullAsZeroValue: true,
): number | typeof tokenIgnoredUnknownEnum;
function readEnum(
  desc: DescEnum,
  json: JsonValue,
  ignoreUnknownFields: boolean,
  nullAsZeroValue: boolean,
): number | typeof tokenNull | typeof tokenIgnoredUnknownEnum {
  if (json === null) {
    if (desc.typeName == "google.protobuf.NullValue") {
      return 0; // google.protobuf.NullValue.NULL_VALUE = 0
    }
    return nullAsZeroValue ? desc.values[0].number : tokenNull;
  }
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = desc.values.find((ev) => ev.name === json);
      if (value !== undefined) {
        return value.number;
      }
      if (ignoreUnknownFields) {
        return tokenIgnoredUnknownEnum;
      }
      break;
  }
  throw new Error(`cannot decode ${desc} from JSON: ${formatVal(json)}`);
}

const tokenNull = Symbol();

/**
 * Try to parse a JSON value to a scalar value for the reflect API.
 *
 * Returns the input if the JSON value cannot be converted. Raises a FieldError
 * if conversion would be ambiguous.
 *
 * JSON null returns the scalar zero value.
 */
function scalarFromJson(
  field: DescField & { scalar: ScalarType },
  json: JsonValue,
  nullAsZeroValue: true,
): ScalarValue;
/**
 * Try to parse a JSON value to a scalar value for the reflect API.
 *
 * Returns the input if the JSON value cannot be converted. Raises a FieldError
 * if conversion would be ambiguous.
 *
 * JSON null returns the symbol `tokenNull`.
 */
function scalarFromJson(
  field: DescField & { scalar: ScalarType },
  json: JsonValue,
  nullAsZeroValue: false,
): ScalarValue | typeof tokenNull | JsonValue;
function scalarFromJson(
  field: DescField & { scalar: ScalarType },
  json: JsonValue,
  nullAsZeroValue: boolean,
): ScalarValue | typeof tokenNull | JsonValue {
  if (json === null) {
    if (nullAsZeroValue) {
      return scalarZeroValue(field.scalar, false);
    }
    return tokenNull;
  }
  // int64, sfixed64, sint64, fixed64, uint64: Reflect supports string and number.
  // string, bool: Supported by reflect.
  switch (field.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === "NaN") return NaN;
      if (json === "Infinity") return Number.POSITIVE_INFINITY;
      if (json === "-Infinity") return Number.NEGATIVE_INFINITY;
      if (typeof json == "number") {
        if (Number.isNaN(json)) {
          // NaN must be encoded with string constants
          throw new FieldError(field, "unexpected NaN number");
        }
        if (!Number.isFinite(json)) {
          // Infinity must be encoded with string constants
          throw new FieldError(field, "unexpected infinite number");
        }
        break;
      }
      if (typeof json == "string") {
        if (json === "") {
          // empty string is not a number
          break;
        }
        if (json.trim().length !== json.length) {
          // extra whitespace
          break;
        }
        const float = Number(json);
        if (!Number.isFinite(float)) {
          // Infinity and NaN must be encoded with string constants
          break;
        }
        return float;
      }
      break;

    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      return int32FromJson(json);

    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      if (typeof json == "string") {
        if (json === "") {
          return new Uint8Array(0);
        }
        try {
          return base64Decode(json);
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          throw new FieldError(field, message);
        }
      }
      break;
  }
  return json;
}

/**
 * Try to parse a JSON value to a map key for the reflect API.
 *
 * Returns the input if the JSON value cannot be converted.
 */
function mapKeyFromJson(
  type: Exclude<
    ScalarType,
    ScalarType.BYTES | ScalarType.DOUBLE | ScalarType.FLOAT
  >,
  json: JsonValue,
) {
  switch (type) {
    case ScalarType.BOOL:
      switch (json) {
        case "true":
          return true;
        case "false":
          return false;
      }
      return json;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      return int32FromJson(json);
    default:
      return json;
  }
}

/**
 * Try to parse a JSON value to a 32-bit integer for the reflect API.
 *
 * Returns the input if the JSON value cannot be converted.
 */
function int32FromJson(json: JsonValue) {
  if (typeof json == "string") {
    if (json === "") {
      // empty string is not a number
      return json;
    }
    if (json.trim().length !== json.length) {
      // extra whitespace
      return json;
    }
    const num = Number(json);
    if (Number.isNaN(num)) {
      // not a number
      return json;
    }
    return num;
  }
  return json;
}

function parseJsonString(jsonString: string, typeName: string) {
  try {
    return JSON.parse(jsonString) as JsonValue;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(
      `cannot decode message ${typeName} from JSON: ${message}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: e },
    );
  }
}

function tryWktFromJson(
  msg: ReflectMessage,
  jsonValue: JsonValue,
  opts: JsonReadOptions,
): boolean {
  if (!msg.desc.typeName.startsWith("google.protobuf.")) {
    return false;
  }
  switch (msg.desc.typeName) {
    case "google.protobuf.Any":
      anyFromJson(msg.message as Any, jsonValue, opts);
      return true;
    case "google.protobuf.Timestamp":
      timestampFromJson(msg.message as Timestamp, jsonValue);
      return true;
    case "google.protobuf.Duration":
      durationFromJson(msg.message as Duration, jsonValue);
      return true;
    case "google.protobuf.FieldMask":
      fieldMaskFromJson(msg.message as FieldMask, jsonValue);
      return true;
    case "google.protobuf.Struct":
      structFromJson(msg.message as Struct, jsonValue);
      return true;
    case "google.protobuf.Value":
      valueFromJson(msg.message as Value, jsonValue);
      return true;
    case "google.protobuf.ListValue":
      listValueFromJson(msg.message as ListValue, jsonValue);
      return true;
    default:
      if (isWrapperDesc(msg.desc)) {
        const valueField = msg.desc.fields[0];
        if (jsonValue === null) {
          msg.clear(valueField);
        } else {
          msg.set(valueField, scalarFromJson(valueField, jsonValue, true));
        }
        return true;
      }
      return false;
  }
}

function anyFromJson(any: Any, json: JsonValue, opts: JsonReadOptions) {
  if (json === null || Array.isArray(json) || typeof json != "object") {
    throw new Error(
      `cannot decode message ${any.$typeName} from JSON: expected object but got ${formatVal(json)}`,
    );
  }
  if (Object.keys(json).length == 0) {
    return;
  }
  const typeUrl = json["@type"];
  if (typeof typeUrl != "string" || typeUrl == "") {
    throw new Error(
      `cannot decode message ${any.$typeName} from JSON: "@type" is empty`,
    );
  }
  const typeName = typeUrl.includes("/")
    ? typeUrl.substring(typeUrl.lastIndexOf("/") + 1)
    : typeUrl;
  if (!typeName.length) {
    throw new Error(
      `cannot decode message ${any.$typeName} from JSON: "@type" is invalid`,
    );
  }
  const desc = opts.registry?.getMessage(typeName);
  if (!desc) {
    throw new Error(
      `cannot decode message ${any.$typeName} from JSON: ${typeUrl} is not in the type registry`,
    );
  }
  const msg = reflect(desc);
  if (
    typeName.startsWith("google.protobuf.") &&
    Object.prototype.hasOwnProperty.call(json, "value")
  ) {
    const value = json.value;
    readMessage(msg, value, opts);
  } else {
    const copy = Object.assign({}, json);
    // biome-ignore lint/performance/noDelete: <explanation>
    delete copy["@type"];
    readMessage(msg, copy, opts);
  }
  anyPack(msg.desc, msg.message, any);
}

function timestampFromJson(timestamp: Timestamp, json: JsonValue) {
  if (typeof json !== "string") {
    throw new Error(
      `cannot decode message ${timestamp.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  const matches = json.match(
    /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/,
  );
  if (!matches) {
    throw new Error(
      `cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`,
    );
  }
  const ms = Date.parse(
    // biome-ignore format: want this to read well
    matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"),
  );
  if (Number.isNaN(ms)) {
    throw new Error(
      `cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`,
    );
  }
  if (
    ms < Date.parse("0001-01-01T00:00:00Z") ||
    ms > Date.parse("9999-12-31T23:59:59Z")
  ) {
    throw new Error(
      `cannot decode message ${timestamp.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`,
    );
  }
  timestamp.seconds = protoInt64.parse(ms / 1000);
  timestamp.nanos = 0;
  if (matches[7]) {
    timestamp.nanos =
      parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) -
      1000000000;
  }
}

function durationFromJson(duration: Duration, json: JsonValue) {
  if (typeof json !== "string") {
    throw new Error(
      `cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (match === null) {
    throw new Error(
      `cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  const longSeconds = Number(match[1]);
  if (longSeconds > 315576000000 || longSeconds < -315576000000) {
    throw new Error(
      `cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  duration.seconds = protoInt64.parse(longSeconds);
  if (typeof match[2] !== "string") {
    return;
  }
  const nanosStr = match[2] + "0".repeat(9 - match[2].length);
  duration.nanos = parseInt(nanosStr);
  if (longSeconds < 0 || Object.is(longSeconds, -0)) {
    duration.nanos = -duration.nanos;
  }
}

function fieldMaskFromJson(fieldMask: FieldMask, json: JsonValue) {
  if (typeof json !== "string") {
    throw new Error(
      `cannot decode message ${fieldMask.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  if (json === "") {
    return;
  }
  function camelToSnake(str: string) {
    if (str.includes("_")) {
      throw new Error(
        `cannot decode message ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`,
      );
    }
    const sc = str.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());
    return sc[0] === "_" ? sc.substring(1) : sc;
  }
  fieldMask.paths = json.split(",").map(camelToSnake);
}

function structFromJson(struct: Struct, json: JsonValue) {
  if (typeof json != "object" || json == null || Array.isArray(json)) {
    throw new Error(
      `cannot decode message ${struct.$typeName} from JSON ${formatVal(json)}`,
    );
  }
  for (const [k, v] of Object.entries(json)) {
    const parsedV = create(ValueSchema);
    valueFromJson(parsedV, v);
    struct.fields[k] = parsedV;
  }
}

function valueFromJson(value: Value, json: JsonValue) {
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
        value.kind = { case: "nullValue", value: NullValue.NULL_VALUE };
      } else if (Array.isArray(json)) {
        const listValue = create(ListValueSchema);
        listValueFromJson(listValue, json);
        value.kind = { case: "listValue", value: listValue };
      } else {
        const struct = create(StructSchema);
        structFromJson(struct, json);
        value.kind = { case: "structValue", value: struct };
      }
      break;
    default:
      throw new Error(
        `cannot decode message ${value.$typeName} from JSON ${formatVal(json)}`,
      );
  }
  return value;
}

function listValueFromJson(listValue: ListValue, json: JsonValue) {
  if (!Array.isArray(json)) {
    throw new Error(
      `cannot decode message ${listValue.$typeName} from JSON ${formatVal(json)}`,
    );
  }
  for (const e of json) {
    const value = create(ValueSchema);
    valueFromJson(value, e);
    listValue.values.push(value);
  }
}
