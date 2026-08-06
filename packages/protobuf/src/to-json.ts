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

import {
  type DescEnum,
  type DescEnumValue,
  type DescField,
  type DescMessage,
  ScalarType,
} from "./descriptors.js";
import type { JsonObject, JsonValue } from "./json-value.js";
import { protoCamelCase, protoSnakeCase } from "./reflect/names.js";
import type { Registry } from "./registry.js";
import type {
  EnumJsonType,
  EnumShape,
  Message,
  MessageJsonType,
  MessageShape,
  UnknownField,
} from "./types.js";
import type {
  Any,
  Duration,
  FieldMask,
  ListValue,
  Struct,
  Timestamp,
  Value,
} from "./wkt/index.js";
import { anyUnpack } from "./wkt/index.js";
import { hasCustomJsonRepresentation, isWrapperDesc } from "./wkt/wrappers.js";
import {
  durationSecondsMax,
  durationSecondsMin,
  timestampMsMax,
  timestampMsMin,
} from "./wkt/json.js";
import { base64Encode } from "./wire/index.js";
import { createExtensionContainer, getExtension } from "./extensions.js";
import { checkField, formatVal } from "./reflect/reflect-check.js";
import { FieldError } from "./reflect/error.js";
import { unsafeLocal } from "./reflect/unsafe.js";
import { scalarZeroValue } from "./reflect/scalar.js";
import { localMessageMapper } from "./reflect/message.js";

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.LEGACY_REQUIRED: const $name = $number;
const LEGACY_REQUIRED = 3;

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name = $number;
const IMPLICIT = 2;

/**
 * Options for serializing to JSON.
 */
export interface JsonWriteOptions {
  /**
   * By default, fields with implicit presence are not serialized if they are
   * unset. For example, an empty list field or a proto3 int32 field with 0 is
   * not serialized. With this option enabled, such fields are included in the
   * output.
   */
  alwaysEmitImplicit: boolean;

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
  registry?: Registry | undefined;
}

/**
 * Options for serializing to JSON.
 */
export interface JsonWriteStringOptions extends JsonWriteOptions {
  /**
   * Format JSON with indentation. Indicates the number of space characters to
   * be used as indentation.
   *
   * This option is passed to JSON.stringify as `space`.
   */
  prettySpaces: number;
}

// Default options for serializing to JSON.
const jsonWriteDefaults: Readonly<JsonWriteOptions> = {
  alwaysEmitImplicit: false,
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
export function toJson<
  Desc extends DescMessage,
  Opts extends Partial<JsonWriteOptions> | undefined = undefined,
>(
  schema: Desc,
  message: MessageShape<Desc>,
  options?: Opts,
): ToJson<Desc, Opts> {
  return compiledWriter(schema)(
    makeWriteOptions(options),
    message as Record<string, unknown>,
  ) as ToJson<Desc, Opts>;
}

// For standard JSON write options, return the JSON type if available.
// Otherwise, return a generic JSON value.
type ToJson<
  Desc extends DescMessage,
  Opts extends undefined | Partial<JsonWriteOptions>,
> = Opts extends
  | undefined
  | {
      alwaysEmitImplicit?: false;
      enumAsInteger?: false;
      useProtoFieldName?: false;
    }
  ? MessageJsonType<Desc>
  : JsonValue;

/**
 * Serialize the message to a JSON string.
 */
export function toJsonString<Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
  options?: Partial<JsonWriteStringOptions>,
): string {
  const jsonValue = toJson(schema, message, options);
  return JSON.stringify(jsonValue, null, options?.prettySpaces ?? 0);
}

/**
 * Serialize a single enum value to JSON.
 */
export function enumToJson<Desc extends DescEnum>(
  descEnum: Desc,
  value: EnumShape<Desc>,
): EnumJsonType<Desc> {
  if (descEnum.typeName == "google.protobuf.NullValue") {
    return null as EnumJsonType<Desc>;
  }
  const name = (descEnum.value[value] as DescEnumValue | undefined)?.name;
  if (name === undefined) {
    throw new Error(`${value} is not a value in ${descEnum}`);
  }
  return name as EnumJsonType<Desc>;
}

/**
 * A message encoder, compiled from a descriptor ahead of time.
 */
type CompiledJsonWriter = (
  opts: JsonWriteOptions,
  message: Record<string, unknown>,
) => JsonValue;

/**
 * An encoder for a field: checks presence and writes the value to the JSON
 * object under the field's JSON name.
 */
type CompiledFieldJsonWriter = (
  opts: JsonWriteOptions,
  message: Record<string, unknown>,
  json: JsonObject,
) => void;

/**
 * An encoder for a value. Always produces a JSON value.
 */
type CompiledValueJsonWriter = (
  opts: JsonWriteOptions,
  value: unknown,
) => JsonValue;

/**
 * An encoder for the value of a field of any kind. Returns undefined when
 * the value is omitted from JSON output (empty list and map fields).
 */
type CompiledFieldValueJsonWriter = (
  opts: JsonWriteOptions,
  value: unknown,
) => JsonValue | undefined;

const compiledWriters = new WeakMap<DescMessage, CompiledJsonWriter>();

/**
 * Return the compiled encoder for a message, compiling it on first use.
 */
function compiledWriter(desc: DescMessage): CompiledJsonWriter {
  let compiled = compiledWriters.get(desc);
  if (compiled === undefined) {
    compiled = compileMessage(desc);
  }
  return compiled;
}

function compileMessage(desc: DescMessage): CompiledJsonWriter {
  const typeName = desc.typeName;
  const writeWkt = compileWkt(desc);
  if (writeWkt !== undefined) {
    // The field reported in ForeignFieldError. All well-known types with a
    // custom JSON representation have at least one field.
    const foreignField: DescField | undefined = desc.fields[0];
    const compiledWriter: CompiledJsonWriter = (opts, message) => {
      if (message.$typeName !== typeName && foreignField !== undefined) {
        throw new FieldError(
          foreignField,
          `cannot use ${foreignField} with message ${message.$typeName}`,
          "ForeignFieldError",
        );
      }
      return writeWkt(opts, message);
    };
    compiledWriters.set(desc, compiledWriter);
    return compiledWriter;
  }
  const sortedFields = desc.fields.concat().sort((a, b) => a.number - b.number);
  // The field reported in ForeignFieldError.
  const foreignField: DescField | undefined = sortedFields[0];
  const fieldWriters: CompiledFieldJsonWriter[] = [];
  const compiledWriter: CompiledJsonWriter = (opts, message) => {
    if (message.$typeName !== typeName && foreignField !== undefined) {
      throw new FieldError(
        foreignField,
        `cannot use ${foreignField} with message ${message.$typeName}`,
        "ForeignFieldError",
      );
    }
    const json: JsonObject = {};
    for (let i = 0; i < fieldWriters.length; i++) {
      fieldWriters[i](opts, message, json);
    }
    if (opts.registry) {
      writeExtensions(json, opts, opts.registry, message, desc);
    }
    return json;
  };
  // Register before compiling fields, so that recursive message types
  // resolve to this instance instead of compiling endlessly.
  compiledWriters.set(desc, compiledWriter);
  for (const field of sortedFields) {
    fieldWriters.push(compileField(field));
  }
  return compiledWriter;
}

/**
 * Compile an encoder for a well-known type with a custom JSON representation,
 * or return undefined for other messages.
 */
function compileWkt(desc: DescMessage): CompiledJsonWriter | undefined {
  if (!desc.typeName.startsWith("google.protobuf.")) {
    return undefined;
  }
  switch (desc.typeName) {
    case "google.protobuf.Any":
      return (opts, message) => anyToJson(message as unknown as Any, opts);
    case "google.protobuf.Timestamp":
      return (opts, message) =>
        timestampToJson(message as unknown as Timestamp);
    case "google.protobuf.Duration":
      return (opts, message) => durationToJson(message as unknown as Duration);
    case "google.protobuf.FieldMask":
      return (opts, message) =>
        fieldMaskToJson(message as unknown as FieldMask);
    case "google.protobuf.Struct":
      return (opts, message) => structToJson(message as unknown as Struct);
    case "google.protobuf.Value":
      return (opts, message) => valueToJson(message as unknown as Value);
    case "google.protobuf.ListValue":
      return (opts, message) =>
        listValueToJson(message as unknown as ListValue);
    default:
      if (isWrapperDesc(desc)) {
        const valueField = desc.fields[0];
        const localName = valueField.localName;
        const zero = scalarZeroValue(valueField.scalar, false);
        const writeScalar = compileScalarValue(valueField);
        return (opts, message) => {
          const value = message[localName];
          return writeScalar(opts, value === undefined ? zero : value);
        };
      }
      return undefined;
  }
}

function compileField(field: DescField): CompiledFieldJsonWriter {
  switch (field.fieldKind) {
    case "scalar":
    case "enum":
    case "message":
      return compileSingularField(field);
    case "list":
    case "map": {
      const writeValue =
        field.fieldKind == "list"
          ? compileListValue(field)
          : compileMapValue(field);
      const protoName = field.name;
      const jsonKey = field.jsonName;
      const localName = field.localName;
      return (opts, message, json) => {
        const value = writeValue(opts, message[localName]);
        if (value !== undefined) {
          json[opts.useProtoFieldName ? protoName : jsonKey] = value;
        }
      };
    }
  }
}

type DescFieldSingular = DescField &
  ({ fieldKind: "scalar" } | { fieldKind: "enum" } | { fieldKind: "message" });

/**
 * Compile an encoder for a singular field: the presence check, and the
 * value encoder.
 */
function compileSingularField(
  field: DescFieldSingular,
): CompiledFieldJsonWriter {
  const writeValue = compileSingularValue(field);
  const protoName = field.name;
  const jsonKey = field.jsonName;
  const localName = field.localName;
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    return (opts, message, json) => {
      const oneof = message[oneofLocalName] as {
        case: string | undefined;
        value?: unknown;
      };
      if (oneof.case === localName) {
        json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
          opts,
          oneof.value,
        );
      }
    };
  }
  if (field.presence != IMPLICIT) {
    const requiredError =
      field.presence == LEGACY_REQUIRED
        ? `cannot encode ${field} to JSON: required field not set`
        : undefined;
    return (opts, message, json) => {
      const value = message[localName];
      // Fields with explicit presence have properties on the prototype
      // chain for default / zero values (except for proto3).
      if (
        value !== undefined &&
        Object.prototype.hasOwnProperty.call(message, localName)
      ) {
        json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
          opts,
          value,
        );
      } else if (requiredError !== undefined) {
        throw new Error(requiredError);
      }
    };
  }
  // Implicit presence: the field is emitted when the value is not the zero
  // value, or when alwaysEmitImplicit is enabled. The zero check is inlined
  // per type, see isScalarZeroValue.
  if (field.fieldKind == "enum") {
    const zero = field.enum.values[0].number;
    return (opts, message, json) => {
      const value = message[localName];
      if (value !== zero || opts.alwaysEmitImplicit) {
        json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
          opts,
          value,
        );
      }
    };
  }
  switch (field.scalar) {
    case ScalarType.BOOL:
      return (opts, message, json) => {
        const value = message[localName];
        if (value !== false || opts.alwaysEmitImplicit) {
          json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
            opts,
            value,
          );
        }
      };
    case ScalarType.STRING:
      return (opts, message, json) => {
        const value = message[localName];
        if (value !== "" || opts.alwaysEmitImplicit) {
          json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
            opts,
            value,
          );
        }
      };
    case ScalarType.BYTES:
      return (opts, message, json) => {
        const value = message[localName];
        if (
          !(value instanceof Uint8Array) ||
          value.byteLength > 0 ||
          opts.alwaysEmitImplicit
        ) {
          json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
            opts,
            value,
          );
        }
      };
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return (opts, message, json) => {
        const value = message[localName];
        // Object.is distinguishes -0 from 0.
        if (!Object.is(value, 0) || opts.alwaysEmitImplicit) {
          json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
            opts,
            value,
          );
        }
      };
    default:
      return (opts, message, json) => {
        const value = message[localName];
        // Loose comparison matches 0n, 0 and "0".
        if (value != 0 || opts.alwaysEmitImplicit) {
          json[opts.useProtoFieldName ? protoName : jsonKey] = writeValue(
            opts,
            value,
          );
        }
      };
  }
}

/**
 * Compile an encoder for the value of a field of any kind. Used for
 * extension values.
 */
function compileFieldValue(field: DescField): CompiledFieldValueJsonWriter {
  switch (field.fieldKind) {
    case "scalar":
    case "enum":
    case "message":
      return compileSingularValue(field);
    case "list":
      return compileListValue(field);
    case "map":
      return compileMapValue(field);
  }
}

/**
 * Compile an encoder for the value of a singular field.
 */
function compileSingularValue(
  field: DescFieldSingular,
): CompiledValueJsonWriter {
  switch (field.fieldKind) {
    case "scalar":
      return compileScalarValue(field);
    case "enum":
      return compileEnumValue(field);
    case "message":
      return compileMessageValue(field);
  }
}

/**
 * Compile an encoder for the value of a message field.
 */
function compileMessageValue(
  field: DescField & { message: DescMessage },
): CompiledValueJsonWriter {
  const { toMessage } = localMessageMapper(field);
  const writeMessage = compiledWriter(field.message);
  return (opts, value) => writeMessage(opts, toMessage(value));
}

/**
 * Compile an encoder for a list field value. Returns undefined for an empty
 * list, unless alwaysEmitImplicit is enabled.
 */
function compileListValue(
  field: DescField & { fieldKind: "list" },
): CompiledFieldValueJsonWriter {
  const writeItem = compileListItemValue(field);
  return (opts, value) => {
    const items = value as unknown[];
    if (items.length == 0 && !opts.alwaysEmitImplicit) {
      return undefined;
    }
    const jsonArray: JsonValue[] = [];
    for (let i = 0; i < items.length; i++) {
      jsonArray.push(writeItem(opts, items[i]));
    }
    return jsonArray;
  };
}

function compileListItemValue(
  field: DescField & { fieldKind: "list" },
): CompiledValueJsonWriter {
  switch (field.listKind) {
    case "scalar":
      return compileScalarValue(field);
    case "enum":
      return compileEnumValue(field);
    case "message":
      return compileMessageValue(field);
  }
}

/**
 * Compile an encoder for a map field value. Returns undefined for an empty
 * map, unless alwaysEmitImplicit is enabled. Map keys are stored as object
 * keys and are used as JSON keys as-is.
 */
function compileMapValue(
  field: DescField & { fieldKind: "map" },
): CompiledFieldValueJsonWriter {
  const writeMapValue = compileMapEntryValue(field);
  return (opts, value) => {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record);
    if (keys.length == 0 && !opts.alwaysEmitImplicit) {
      return undefined;
    }
    const jsonObject: JsonObject = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      jsonObject[key] = writeMapValue(opts, record[key]);
    }
    return jsonObject;
  };
}

function compileMapEntryValue(
  field: DescField & { fieldKind: "map" },
): CompiledValueJsonWriter {
  switch (field.mapKind) {
    case "scalar":
      return compileScalarValue(field);
    case "enum":
      return compileEnumValue(field);
    case "message":
      return compileMessageValue(field);
  }
}

/**
 * Compile an encoder for an enum value.
 */
function compileEnumValue(
  field: DescField & { enum: DescEnum },
): CompiledValueJsonWriter {
  const desc = field.enum;
  if (desc.typeName == "google.protobuf.NullValue") {
    return (opts, value) => {
      if (typeof value != "number") {
        throw errorEnumValue(desc, value);
      }
      return null;
    };
  }
  return (opts, value) => {
    if (typeof value != "number") {
      throw errorEnumValue(desc, value);
    }
    if (opts.enumAsInteger) {
      return value;
    }
    // If we don't know the enum value, just return the number.
    return (desc.value[value] as DescEnumValue | undefined)?.name ?? value;
  };
}

function errorEnumValue(desc: DescEnum, value: unknown): Error {
  return new Error(
    `cannot encode ${desc} to JSON: expected number, got ${formatVal(value)}`,
  );
}

/**
 * Compile an encoder for a scalar value. Errors report the original field
 * descriptor, which may be a list or map field for items of those fields.
 */
function compileScalarValue(
  field: DescField & { scalar: ScalarType },
): CompiledValueJsonWriter {
  switch (field.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      return (opts, value) => {
        if (typeof value != "number") {
          throw errorScalarValue(field, value);
        }
        return value;
      };

    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.FLOAT:
    case ScalarType.DOUBLE:
      return (opts, value) => {
        if (typeof value != "number") {
          throw errorScalarValue(field, value);
        }
        if (Number.isNaN(value)) return "NaN";
        if (value === Number.POSITIVE_INFINITY) return "Infinity";
        if (value === Number.NEGATIVE_INFINITY) return "-Infinity";
        return value;
      };

    // string:
    case ScalarType.STRING:
      return (opts, value) => {
        if (typeof value != "string") {
          throw errorScalarValue(field, value);
        }
        return value;
      };

    // bool:
    case ScalarType.BOOL:
      return (opts, value) => {
        if (typeof value != "boolean") {
          throw errorScalarValue(field, value);
        }
        return value;
      };

    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return (opts, value) => {
        if (
          typeof value == "bigint" ||
          typeof value == "string" ||
          (typeof value == "number" && Number.isInteger(value))
        ) {
          return value.toString();
        }
        throw errorScalarValue(field, value);
      };

    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      return (opts, value) => {
        if (value instanceof Uint8Array) {
          return base64Encode(value);
        }
        throw errorScalarValue(field, value);
      };
  }
}

function errorScalarValue(field: DescField, value: unknown): Error {
  return new Error(
    `cannot encode ${field} to JSON: ${checkField(field, value)?.message}`,
  );
}

/**
 * Write extensions for unknown fields that are found in the registry.
 */
function writeExtensions(
  json: JsonObject,
  opts: JsonWriteOptions,
  registry: Registry,
  message: Record<string, unknown>,
  desc: DescMessage,
): void {
  const unknown = message.$unknown as UnknownField[] | undefined;
  if (unknown === undefined) {
    return;
  }
  const tagSeen = new Set<number>();
  for (let i = 0; i < unknown.length; i++) {
    const { no } = unknown[i];
    // Same tag can appear multiple times, so we
    // keep track and skip identical ones.
    if (!tagSeen.has(no)) {
      tagSeen.add(no);
      const extension = registry.getExtensionFor(desc, no);
      if (!extension) {
        continue;
      }
      const value = getExtension(message as unknown as Message, extension);
      const [container, field] = createExtensionContainer(extension, value);
      const local = container[unsafeLocal] as unknown as Record<
        string,
        unknown
      >;
      const jsonValue = compileFieldValue(field)(opts, local[field.localName]);
      if (jsonValue !== undefined) {
        json[extension.jsonName] = jsonValue;
      }
    }
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
  const json: JsonObject = hasCustomJsonRepresentation(desc)
    ? {
        value: compiledWriter(desc)(
          opts,
          message as unknown as Record<string, unknown>,
        ),
      }
    : (compiledWriter(desc)(
        opts,
        message as unknown as Record<string, unknown>,
      ) as JsonObject);
  json["@type"] = val.typeUrl;
  return json;
}

function durationToJson(val: Duration) {
  const seconds = Number(val.seconds);
  const nanos = val.nanos;
  if (seconds > durationSecondsMax || seconds < durationSecondsMin) {
    throw new Error(
      `cannot encode message ${val.$typeName} to JSON: value out of range`,
    );
  }
  if ((seconds > 0 && nanos < 0) || (seconds < 0 && nanos > 0)) {
    throw new Error(
      `cannot encode message ${val.$typeName} to JSON: nanos sign must match seconds sign`,
    );
  }
  let text = val.seconds.toString();
  if (nanos !== 0) {
    let nanosStr = Math.abs(nanos).toString();
    nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
    if (nanosStr.substring(3) === "000000") {
      nanosStr = nanosStr.substring(0, 3);
    } else if (nanosStr.substring(6) === "000") {
      nanosStr = nanosStr.substring(0, 6);
    }
    text += "." + nanosStr;
    if (nanos < 0 && seconds == 0) {
      text = "-" + text;
    }
  }
  return text + "s";
}

function fieldMaskToJson(val: FieldMask) {
  return val.paths
    .map((p) => {
      if (protoSnakeCase(protoCamelCase(p)) !== p) {
        throw new Error(
          `cannot encode message ${val.$typeName} to JSON: lowerCamelCase of path name "${p}" is irreversible`,
        );
      }
      return protoCamelCase(p);
    })
    .join(",");
}

function structToJson(val: Struct) {
  const json: JsonObject = {};
  const keys = Object.keys(val.fields);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    json[key] = valueToJson(val.fields[key]);
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
  if (ms < timestampMsMin || ms > timestampMsMax) {
    throw new Error(
      `cannot encode message ${val.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`,
    );
  }
  if (val.nanos < 0) {
    throw new Error(
      `cannot encode message ${val.$typeName} to JSON: nanos must not be negative`,
    );
  }
  if (val.nanos > 999999999) {
    throw new Error(
      `cannot encode message ${val.$typeName} to JSON: nanos must not be greater than 99999999`,
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
