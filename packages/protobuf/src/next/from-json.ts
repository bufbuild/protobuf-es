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

/* eslint-disable no-case-declarations */

import type {
  DescEnum,
  DescExtension,
  DescField,
  DescMessage,
  DescOneof,
} from "../descriptor-set.js";
import type { JsonValue } from "../json-format.js";
import { assertFloat32, assertInt32, assertUInt32 } from "../private/assert.js";
import { protoInt64 } from "../proto-int64.js";
import { create } from "./create.js";
import type { DescSet } from "./reflect/desc-set.js";
import { protoCamelCase } from "./reflect/index.js";
import type { ReflectMessage, MapEntryKey } from "./reflect/reflect-types.js";
import { reflect } from "./reflect/reflect.js";
import { formatVal } from "./reflect/reflect-check.js";
import {
  scalarZeroValue,
  LongType,
  ScalarType,
  type ScalarValue,
} from "./reflect/scalar.js";
import type { MessageShape } from "./types.js";
import { base64Decode } from "./wire/base64-encoding.js";
import { getTextEncoding } from "./wire/text-encoding.js";
import {
  ListValueDesc,
  NullValue,
  StructDesc,
  ValueDesc,
  anyPack,
} from "./wkt/index.js";
import type {
  Any,
  Timestamp,
  Duration,
  Struct,
  Value,
  FieldMask,
  ListValue,
} from "./wkt/index.js";
import { isWrapperDesc } from "./wkt/wrappers.js";
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
  descSet?: DescSet;
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
  messageDesc: Desc,
  json: string,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  return fromJson(
    messageDesc,
    parseJsonString(json, messageDesc.typeName),
    options,
  );
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
  messageDesc: Desc,
  target: MessageShape<Desc>,
  json: string,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  return mergeFromJson(
    messageDesc,
    target,
    parseJsonString(json, messageDesc.typeName),
    options,
  );
}

/**
 * Parse a message from a JSON value.
 */
export function fromJson<Desc extends DescMessage>(
  messageDesc: Desc,
  json: JsonValue,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  const msg = reflect(messageDesc);
  readMessage(msg, json, makeReadOptions(options));
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
  messageDesc: Desc,
  target: MessageShape<Desc>,
  json: JsonValue,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  readMessage(reflect(messageDesc, target), json, makeReadOptions(options));
  return target;
}

function readMessage(
  msg: ReflectMessage,
  json: JsonValue,
  opts: JsonReadOptions,
) {
  if (json == null) {
    throw new Error(
      `cannot decode message ${msg.desc.typeName} from JSON: ${formatVal(
        json,
      )}`,
    );
  }
  if (tryWktFromJson(msg, json, opts)) {
    return;
  }
  if (Array.isArray(json) || typeof json != "object") {
    throw new Error(
      `cannot decode message ${msg.desc.typeName} from JSON: ${formatVal(
        json,
      )}`,
    );
  }
  const oneofSeen = new Map<DescOneof, string>();
  const jsonNames = new Map<string, DescField>();
  for (const field of msg.desc.fields) {
    jsonNames
      .set(field.name, field)
      .set(field.jsonName ?? protoCamelCase(field.name), field);
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
          throw new Error(
            `cannot decode message ${msg.desc.typeName} from JSON: multiple keys for oneof "${field.oneof.name}" present: "${seen}", "${jsonKey}"`,
          );
        }
        oneofSeen.set(field.oneof, jsonKey);
      }
      readField(msg, field, jsonValue, opts);
    } else {
      let extension: DescExtension | undefined = undefined;
      if (
        jsonKey.startsWith("[") &&
        jsonKey.endsWith("]") &&
        (extension = opts.descSet?.getExtension(
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
          `cannot decode message ${msg.desc.typeName} from JSON: key "${jsonKey}" is unknown`,
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
      readListField(msg, field, json, opts);
      break;
    case "map":
      readMapField(msg, field, json, opts);
      break;
  }
}

function readMapField(
  msg: ReflectMessage,
  field: DescField & { fieldKind: "map" },
  json: JsonValue,
  opts: JsonReadOptions,
) {
  if (json === null) {
    return;
  }
  if (typeof json != "object" || Array.isArray(json)) {
    throw new Error(
      `cannot decode field ${msg.desc.typeName}.${field.name} from JSON: ${formatVal(json)}`,
    );
  }
  for (const [jsonMapKey, jsonMapValue] of Object.entries(json)) {
    if (jsonMapValue === null) {
      throw new Error(
        `cannot decode field ${msg.desc.typeName}.${field.name} from JSON: map value null`,
      );
    }
    let key: MapEntryKey;
    try {
      key = readMapKey(field.mapKey, jsonMapKey);
    } catch (e) {
      let m = `cannot decode map key for field ${msg.desc.typeName}.${field.name} from JSON: ${formatVal(jsonMapKey)}`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    switch (field.mapKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage(msgValue, jsonMapValue, opts);
        msg.setMapEntry(field, key, msgValue);
        break;
      case "enum":
        const enumValue = readEnum(
          field.enum,
          jsonMapValue,
          opts.ignoreUnknownFields,
          true,
        );
        if (enumValue !== tokenIgnoredUnknownEnum) {
          msg.setMapEntry(field, key, enumValue);
        }
        break;
      case "scalar":
        try {
          msg.setMapEntry(
            field,
            key,
            readScalar(field.scalar, jsonMapValue, LongType.BIGINT, true),
          );
        } catch (e) {
          let m = `cannot decode map value for field ${msg.desc.typeName}.${field.name} from JSON: ${formatVal(jsonMapValue)}`;
          if (e instanceof Error && e.message.length > 0) {
            m += `: ${e.message}`;
          }
          throw new Error(m);
        }
        break;
    }
  }
}

function readListField(
  msg: ReflectMessage,
  field: DescField & { fieldKind: "list" },
  json: JsonValue,
  opts: JsonReadOptions,
) {
  if (json === null) {
    return;
  }
  if (!Array.isArray(json)) {
    throw new Error(
      `cannot decode field ${msg.desc.typeName}.${field.name} from JSON: ${formatVal(json)}`,
    );
  }
  for (const jsonItem of json) {
    if (jsonItem === null) {
      throw new Error(
        `cannot decode field ${msg.desc.typeName}.${field.name} from JSON: ${formatVal(jsonItem)}`,
      );
    }
    switch (field.listKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage(msgValue, jsonItem, opts);
        msg.addListItem(field, msgValue);
        break;
      case "enum":
        const enumValue = readEnum(
          field.enum,
          jsonItem,
          opts.ignoreUnknownFields,
          true,
        );
        if (enumValue !== tokenIgnoredUnknownEnum) {
          msg.addListItem(field, enumValue);
        }
        break;
      case "scalar":
        try {
          msg.addListItem(
            field,
            readScalar(field.scalar, jsonItem, field.longType, true),
          );
        } catch (e) {
          let m = `cannot decode field ${msg.desc.typeName}.${field.name} from JSON: ${formatVal(jsonItem)}`;
          if (e instanceof Error && e.message.length > 0) {
            m += `: ${e.message}`;
          }
          throw new Error(m);
        }
        break;
    }
  }
}

function readMessageField(
  msg: ReflectMessage,
  field: DescField & { fieldKind: "message" },
  json: JsonValue,
  opts: JsonReadOptions,
) {
  if (json === null) {
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
  try {
    const scalarValue = readScalar(field.scalar, json, field.longType, false);
    if (scalarValue === tokenNull) {
      msg.clear(field);
    } else {
      msg.set(field, scalarValue);
    }
  } catch (e) {
    let m = `cannot decode field ${msg.desc.typeName}.${field.name} from JSON: ${formatVal(json)}`;
    if (e instanceof Error && e.message.length > 0) {
      m += `: ${e.message}`;
    }
    throw new Error(m);
  }
}

function readMapKey(type: ScalarType, json: JsonValue) {
  if (type === ScalarType.BOOL) {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (json) {
      case "true":
        json = true;
        break;
      case "false":
        json = false;
        break;
    }
  }
  return readScalar(type, json, LongType.BIGINT, true) as ScalarValue<
    Exclude<ScalarType, ScalarType.BYTES | ScalarType.DOUBLE | ScalarType.FLOAT>
  >;
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
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
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
  throw new Error(
    `cannot decode enum ${desc.typeName} from JSON: ${formatVal(json)}`,
  );
}

const tokenNull = Symbol();

function readScalar(
  type: ScalarType,
  json: JsonValue,
  longType: LongType,
  nullAsZeroValue: true,
): ScalarValue;
function readScalar(
  type: ScalarType,
  json: JsonValue,
  longType: LongType,
  nullAsZeroValue: false,
): ScalarValue | typeof tokenNull;
function readScalar(
  type: ScalarType,
  json: JsonValue,
  longType: LongType,
  nullAsZeroValue: boolean,
): ScalarValue | typeof tokenNull {
  if (json === null) {
    if (nullAsZeroValue) {
      return scalarZeroValue(type, longType);
    }
    return tokenNull;
  }
  // every valid case in the switch below returns, and every fall
  // through is regarded as a failure.
  switch (type) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === "NaN") return Number.NaN;
      if (json === "Infinity") return Number.POSITIVE_INFINITY;
      if (json === "-Infinity") return Number.NEGATIVE_INFINITY;
      if (json === "") {
        // empty string is not a number
        break;
      }
      if (typeof json == "string" && json.trim().length !== json.length) {
        // extra whitespace
        break;
      }
      if (typeof json != "string" && typeof json != "number") {
        break;
      }
      const float = Number(json);
      if (Number.isNaN(float)) {
        // not a number
        break;
      }
      if (!Number.isFinite(float)) {
        // infinity and -infinity are handled by string representation above, so this is an error
        break;
      }
      if (type == ScalarType.FLOAT) assertFloat32(float);
      return float;

    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      let int32: number | undefined;
      if (typeof json == "number") int32 = json;
      else if (typeof json == "string" && json.length > 0) {
        if (json.trim().length === json.length) int32 = Number(json);
      }
      if (int32 === undefined) break;
      if (type == ScalarType.UINT32 || type == ScalarType.FIXED32)
        assertUInt32(int32);
      else assertInt32(int32);
      return int32;

    // int64, fixed64, uint64: JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof json != "number" && typeof json != "string") break;
      const long = protoInt64.parse(json);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return longType ? long.toString() : long;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (typeof json != "number" && typeof json != "string") break;
      const uLong = protoInt64.uParse(json);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return longType ? uLong.toString() : uLong;

    // bool:
    case ScalarType.BOOL:
      if (typeof json !== "boolean") break;
      return json;

    // string:
    case ScalarType.STRING:
      if (typeof json !== "string") {
        break;
      }
      // A string must always contain UTF-8 encoded or 7-bit ASCII.
      if (!getTextEncoding().checkUtf8(json)) {
        throw new Error("invalid UTF8");
      }
      return json;

    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      if (json === "") return new Uint8Array(0);
      if (typeof json !== "string") break;
      return base64Decode(json);
  }
  throw new Error();
}

function parseJsonString(jsonString: string, typeName: string) {
  try {
    return JSON.parse(jsonString) as JsonValue;
  } catch (e) {
    throw new Error(
      `cannot decode ${typeName} from JSON: ${
        e instanceof Error ? e.message : String(e)
      }`,
    );
  }
}

function tryWktFromJson(
  msg: ReflectMessage,
  jsonValue: JsonValue & NonNullable<unknown>,
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
        msg.set(
          valueField,
          readScalar(valueField.scalar, jsonValue, valueField.longType, true),
        );
        return true;
      }
      return false;
  }
}

function anyFromJson(any: Any, json: JsonValue, opts: JsonReadOptions) {
  if (json === null || Array.isArray(json) || typeof json != "object") {
    throw new Error(
      `cannot decode message ${any.$typeName} from JSON: expected object but got ${json === null ? "null" : Array.isArray(json) ? "array" : typeof json}`,
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
  const typeName = typeUrlToName(typeUrl),
    desc = opts.descSet?.getMessage(typeName);
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
    const value = json["value"];
    readMessage(msg, value, opts);
  } else {
    const copy = Object.assign({}, json);
    delete copy["@type"];
    readMessage(msg, copy, opts);
  }
  anyPack(msg.desc, msg.message, any);
}

function timestampFromJson(timestamp: Timestamp, json: JsonValue) {
  if (typeof json !== "string") {
    throw new Error(
      `cannot decode ${timestamp.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  const matches = json.match(
    /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/,
  );
  if (!matches) {
    throw new Error(
      `cannot decode ${timestamp.$typeName} from JSON: invalid RFC 3339 string`,
    );
  }
  const ms = Date.parse(
    //prettier-ignore
    matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"),
  );
  if (Number.isNaN(ms)) {
    throw new Error(
      `cannot decode ${timestamp.$typeName} from JSON: invalid RFC 3339 string`,
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
      `cannot decode ${duration.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (match === null) {
    throw new Error(
      `cannot decode ${duration.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  const longSeconds = Number(match[1]);
  if (longSeconds > 315576000000 || longSeconds < -315576000000) {
    throw new Error(
      `cannot decode ${duration.$typeName} from JSON: ${formatVal(json)}`,
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
      `cannot decode ${fieldMask.$typeName} from JSON: ${formatVal(json)}`,
    );
  }
  if (json === "") {
    return;
  }
  function camelToSnake(str: string) {
    if (str.includes("_")) {
      throw new Error(
        `cannot decode ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`,
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
      `cannot decode ${struct.$typeName} from JSON ${formatVal(json)}`,
    );
  }
  for (const [k, v] of Object.entries(json)) {
    const parsedV = create(ValueDesc);
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
        const listValue = create(ListValueDesc);
        listValueFromJson(listValue, json);
        value.kind = { case: "listValue", value: listValue };
      } else {
        const struct = create(StructDesc);
        structFromJson(struct, json);
        value.kind = { case: "structValue", value: struct };
      }
      break;
    default:
      throw new Error(
        `cannot decode ${value.$typeName} from JSON ${formatVal(json)}`,
      );
  }
  return value;
}

function listValueFromJson(listValue: ListValue, json: JsonValue) {
  if (!Array.isArray(json)) {
    throw new Error(
      `cannot decode ${listValue.$typeName} from JSON ${formatVal(json)}`,
    );
  }
  for (const e of json) {
    const value = create(ValueDesc);
    valueFromJson(value, e);
    listValue.values.push(value);
  }
}

function typeUrlToName(url: string): string {
  if (!url.length) {
    throw new Error(`invalid type url: ${url}`);
  }
  const slash = url.lastIndexOf("/");
  const name = slash >= 0 ? url.substring(slash + 1) : url;
  if (!name.length) {
    throw new Error(`invalid type url: ${url}`);
  }
  return name;
}
