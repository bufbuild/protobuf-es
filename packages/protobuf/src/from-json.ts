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
  type DescField,
  type DescMessage,
  type DescOneof,
  ScalarType,
} from "./descriptors.js";
import type { JsonValue } from "./json-value.js";
import { protoInt64 } from "./proto-int64.js";
import { create } from "./create.js";
import type { Registry } from "./registry.js";
import { FieldError, isFieldError } from "./reflect/error.js";
import {
  formatVal,
  reasonSingular,
  checkScalarValue,
} from "./reflect/reflect-check.js";
import { protoSnakeCase } from "./reflect/names.js";
import { scalarZeroValue } from "./reflect/scalar.js";
import { unsafeLocal } from "./reflect/unsafe.js";
import { localMessageMapper } from "./reflect/message.js";
import type {
  EnumJsonType,
  EnumShape,
  Message,
  MessageShape,
} from "./types.js";
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
  hasCustomJsonRepresentation,
  isWrapperDesc,
  anyPack,
  ListValueSchema,
  NullValue,
  StructSchema,
  ValueSchema,
} from "./wkt/index.js";
import { createExtensionContainer, setExtension } from "./extensions.js";
import {
  durationSecondsMax,
  durationSecondsMin,
  timestampMsMax,
  timestampMsMin,
} from "./wkt/json.js";

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name = $number;
const IMPLICIT = 2;

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
  registry?: Registry | undefined;

  /**
   * The maximum depth of nested messages to parse. If a message nests deeper
   * than this limit, parsing fails with an error instead of exhausting the
   * call stack. Defaults to 100.
   */
  recursionLimit: number;
}

interface JsonReadContext extends JsonReadOptions {
  // Recursion depth, guarded by recursionLimit.
  depth: number;
}

function makeReadContext(options?: Partial<JsonReadOptions>): JsonReadContext {
  return {
    ignoreUnknownFields: false,
    recursionLimit: 100,
    ...options,
    depth: 0,
  };
}

/**
 * Parse a message from a JSON string.
 *
 * Duplicate keys are rejected.
 */
export function fromJsonString<Desc extends DescMessage>(
  schema: Desc,
  json: string,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  return fromJson(schema, parseJsonString(json, schema.typeName), options);
}

/**
 * Parse a message from a JSON string, merging fields into the target.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 *
 * Duplicate keys in the JSON are rejected, as in `fromJsonString`.
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
 *
 * Duplicate keys are rejected, but a value parsed by JSON.parse has already
 * dropped duplicates (the last one wins). Use `fromJsonString` for strict
 * duplicate-key checking.
 */
export function fromJson<Desc extends DescMessage>(
  schema: Desc,
  json: JsonValue,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  const message = create(schema);
  readMessage(schema, message, json, options);
  return message;
}

/**
 * Parse a message from a JSON value, merging fields into the target.
 *
 * Repeated fields are appended. Map entries are added, overwriting
 * existing keys.
 *
 * If a message field is already present, it will be merged with the
 * new data.
 *
 * Duplicate keys are rejected as in `fromJson`; use `mergeFromJsonString`
 * for strict checking.
 */
export function mergeFromJson<Desc extends DescMessage>(
  schema: Desc,
  target: MessageShape<Desc>,
  json: JsonValue,
  options?: Partial<JsonReadOptions>,
): MessageShape<Desc> {
  if (
    (target as Message).$typeName !== schema.typeName &&
    schema.fields.length > 0
  ) {
    throw new FieldError(
      schema.fields[0],
      `cannot use ${schema.fields[0]} with message ${(target as Message).$typeName}`,
      "ForeignFieldError",
    );
  }
  readMessage(schema, target, json, options);
  return target;
}

/**
 * Run the compiled decoder for the message, wrapping FieldErrors with the
 * standard error message.
 */
function readMessage(
  schema: DescMessage,
  message: MessageShape<DescMessage>,
  json: JsonValue,
  options: Partial<JsonReadOptions> | undefined,
): void {
  try {
    compiledReader(schema)(
      message as Record<string, unknown>,
      json,
      makeReadContext(options),
    );
  } catch (e) {
    if (isFieldError(e)) {
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      throw new Error(`cannot decode ${e.field()} from JSON: ${e.message}`, {
        cause: e,
      });
    }
    throw e;
  }
}

/**
 * Parses an enum value from JSON.
 */
export function enumFromJson<Desc extends DescEnum>(
  descEnum: Desc,
  json: EnumJsonType<Desc>,
): EnumShape<Desc> {
  // With ignoreUnknownFields false, the converter never returns the token
  // for ignored unknown enum values.
  return compileEnumConverter(descEnum)(json, false) as EnumShape<Desc>;
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

/**
 * A message or field decoder, compiled from a descriptor ahead of time so
 * that decoding does not interpret the descriptor for every message.
 */
type CompiledJsonReader = (
  message: Record<string, unknown>,
  json: JsonValue,
  ctx: JsonReadContext,
) => void;

const compiledReaders = new WeakMap<DescMessage, CompiledJsonReader>();

/**
 * Return the compiled decoder for a message, compiling it on first use.
 */
function compiledReader(desc: DescMessage): CompiledJsonReader {
  let compiled = compiledReaders.get(desc);
  if (compiled === undefined) {
    compiled = compileMessage(desc);
  }
  return compiled;
}

interface CompiledFieldEntry {
  read: CompiledJsonReader;
  field: DescField;
  oneof: DescOneof | undefined;
  // A oneof member that is a scalar field skips JSON null, see conformance
  // test Required.Proto3.JsonInput.OneofFieldNull{First,Second}.
  oneofScalarNullSkip: boolean;
}

function compileMessage(desc: DescMessage): CompiledJsonReader {
  const descString = String(desc);
  const readWkt = compileWkt(desc);
  if (readWkt !== undefined) {
    // All message decoders count against the recursion limit, including
    // well-known types with a custom JSON representation.
    const compiled: CompiledJsonReader = (message, json, ctx) => {
      if (++ctx.depth > ctx.recursionLimit) {
        throw new Error(
          `cannot decode ${descString} from JSON: maximum recursion depth of ${ctx.recursionLimit} reached`,
        );
      }
      readWkt(message, json, ctx);
      ctx.depth--;
    };
    compiledReaders.set(desc, compiled);
    return compiled;
  }
  const typeName = desc.typeName;
  // Fields are looked up by their proto name and their JSON name.
  const fieldsByJsonKey = new Map<string, CompiledFieldEntry>();
  const compiled: CompiledJsonReader = (message, json, ctx) => {
    if (++ctx.depth > ctx.recursionLimit) {
      throw new Error(
        `cannot decode ${descString} from JSON: maximum recursion depth of ${ctx.recursionLimit} reached`,
      );
    }
    if (json == null || Array.isArray(json) || typeof json != "object") {
      throw new Error(
        `cannot decode ${descString} from JSON: ${formatVal(json)}`,
      );
    }
    const oneofSeen = new Map<DescOneof, DescField>();
    const fieldSeen = new Set<DescField>();
    const jsonKeys = Object.keys(json);
    for (let i = 0; i < jsonKeys.length; i++) {
      const jsonKey = jsonKeys[i];
      const jsonValue = json[jsonKey];
      const entry = fieldsByJsonKey.get(jsonKey);
      if (entry !== undefined) {
        const field = entry.field;
        if (fieldSeen.has(field)) {
          // The same field may be set by its proto name and its JSON name, or by
          // a duplicate or unicode-escaped key that JSON.parse already collapsed.
          // Checked before the null-skip below so that a null entry still counts.
          throw new FieldError(field, "set multiple times");
        }
        fieldSeen.add(field);
        if (entry.oneofScalarNullSkip && jsonValue === null) {
          continue;
        }
        if (entry.oneof) {
          const seen = oneofSeen.get(entry.oneof);
          if (seen !== undefined) {
            throw new FieldError(
              entry.oneof,
              `oneof set multiple times by ${seen.name} and ${field.name}`,
            );
          }
          oneofSeen.set(entry.oneof, field);
        }
        entry.read(message, jsonValue, ctx);
      } else {
        const extension =
          jsonKey.startsWith("[") && jsonKey.endsWith("]")
            ? ctx.registry?.getExtension(
                jsonKey.substring(1, jsonKey.length - 1),
              )
            : undefined;
        if (extension?.extendee.typeName == typeName) {
          const [container, field, get] = createExtensionContainer(extension);
          compileFieldReader(field)(
            container[unsafeLocal] as unknown as Record<string, unknown>,
            jsonValue,
            ctx,
          );
          setExtension(message as unknown as Message, extension, get());
        }
        if (extension === undefined && !ctx.ignoreUnknownFields) {
          throw new Error(
            `cannot decode ${descString} from JSON: key "${jsonKey}" is unknown`,
          );
        }
      }
    }
    ctx.depth--;
  };
  // Register before compiling fields, so that recursive message types
  // resolve to this instance instead of compiling endlessly.
  compiledReaders.set(desc, compiled);
  for (const field of desc.fields) {
    const entry: CompiledFieldEntry = {
      read: compileFieldReader(field),
      field,
      oneof: field.oneof,
      oneofScalarNullSkip:
        field.oneof !== undefined && field.fieldKind == "scalar",
    };
    fieldsByJsonKey.set(field.name, entry).set(field.jsonName, entry);
  }
  return compiled;
}

/**
 * Compile a decoder for a well-known type with a custom JSON representation,
 * or return undefined for other messages. The recursion limit is enforced by
 * the caller.
 */
function compileWkt(desc: DescMessage): CompiledJsonReader | undefined {
  if (!desc.typeName.startsWith("google.protobuf.")) {
    return undefined;
  }
  switch (desc.typeName) {
    case "google.protobuf.Any":
      return (message, json, ctx) =>
        anyFromJson(message as unknown as Any, json, ctx);
    case "google.protobuf.Timestamp":
      return (message, json) =>
        timestampFromJson(message as unknown as Timestamp, json);
    case "google.protobuf.Duration":
      return (message, json) =>
        durationFromJson(message as unknown as Duration, json);
    case "google.protobuf.FieldMask":
      return (message, json) =>
        fieldMaskFromJson(message as unknown as FieldMask, json);
    case "google.protobuf.Struct":
      return (message, json, ctx) =>
        structFromJson(message as unknown as Struct, json, ctx);
    case "google.protobuf.Value":
      return (message, json, ctx) =>
        valueFromJson(message as unknown as Value, json, ctx);
    case "google.protobuf.ListValue":
      return (message, json, ctx) =>
        listValueFromJson(message as unknown as ListValue, json, ctx);
    default:
      if (isWrapperDesc(desc)) {
        const valueField = desc.fields[0];
        const localName = valueField.localName;
        const scalar = valueField.scalar;
        const longAsString = valueField.longAsString;
        const readScalar = compileScalarConverter(valueField);
        return (message, json) => {
          if (json === null) {
            message[localName] = scalarZeroValue(scalar, longAsString);
          } else {
            message[localName] = readScalar(json);
          }
        };
      }
      return undefined;
  }
}

function compileFieldReader(field: DescField): CompiledJsonReader {
  switch (field.fieldKind) {
    case "scalar":
      return compileScalarFieldReader(field);
    case "enum":
      return compileEnumFieldReader(field);
    case "message":
      return compileMessageFieldReader(field);
    case "list":
      return compileListFieldReader(field);
    case "map":
      return compileMapFieldReader(field);
  }
}

function compileScalarFieldReader(
  field: DescField & { fieldKind: "scalar" },
): CompiledJsonReader {
  const readScalar = compileScalarConverter(field);
  const localName = field.localName;
  if (field.oneof) {
    // JSON null for a oneof scalar member is skipped by the message decoder.
    const oneofLocalName = field.oneof.localName;
    return (message, json) => {
      message[oneofLocalName] = {
        case: localName,
        value: readScalar(json as NonNullable<JsonValue>),
      };
    };
  }
  const clear = compileClear(field);
  return (message, json) => {
    if (json === null) {
      clear(message);
    } else {
      message[localName] = readScalar(json);
    }
  };
}

/**
 * Compile a function that resets the field to unset, mirroring the clear
 * operation of the reflect API for fields that are not part of a oneof.
 */
function compileClear(
  field: DescField & ({ fieldKind: "scalar" } | { fieldKind: "enum" }),
): (message: Record<string, unknown>) => void {
  const localName = field.localName;
  if (field.presence != IMPLICIT) {
    // Fields with explicit presence have properties on the prototype chain
    // for default / zero values (except for proto3). By deleting their own
    // property, the field is reset.
    return (message) => {
      delete message[localName];
    };
  }
  if (field.fieldKind == "enum") {
    const zero = field.enum.values[0].number;
    return (message) => {
      message[localName] = zero;
    };
  }
  const scalar = field.scalar;
  const longAsString = field.longAsString;
  return (message) => {
    message[localName] = scalarZeroValue(scalar, longAsString);
  };
}

function compileEnumFieldReader(
  field: DescField & { fieldKind: "enum" },
): CompiledJsonReader {
  const readEnumValue = compileEnumConverter(field.enum);
  const checkEnum = compileEnumCheck(field.enum);
  const localName = field.localName;
  // Fields with enum google.protobuf.NullValue permit a Protobuf-serializable
  // null; for all other enums, JSON null resets the field.
  const nullResets = field.enum.typeName != "google.protobuf.NullValue";
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    return (message, json, ctx) => {
      if (json === null && nullResets) {
        const oneof = message[oneofLocalName] as { case: string | undefined };
        if (oneof.case === localName) {
          message[oneofLocalName] = { case: undefined };
        }
        return;
      }
      const value = readEnumValue(json, ctx.ignoreUnknownFields);
      if (value === tokenIgnoredUnknownEnum) {
        return;
      }
      const check = checkEnum(value);
      if (check !== true) {
        throw new FieldError(field, reasonSingular(field, value, check));
      }
      message[oneofLocalName] = { case: localName, value };
    };
  }
  const clear = compileClear(field);
  return (message, json, ctx) => {
    if (json === null && nullResets) {
      clear(message);
      return;
    }
    const value = readEnumValue(json, ctx.ignoreUnknownFields);
    if (value === tokenIgnoredUnknownEnum) {
      return;
    }
    const check = checkEnum(value);
    if (check !== true) {
      throw new FieldError(field, reasonSingular(field, value, check));
    }
    message[localName] = value;
  };
}

function compileMessageFieldReader(
  field: DescField & { fieldKind: "message" },
): CompiledJsonReader {
  const localName = field.localName;
  const { toMessage, toLocal } = localMessageMapper(field);
  const readChild = compiledReader(field.message);
  // Fields with message google.protobuf.Value permit a Protobuf-serializable
  // null; for all other messages, JSON null resets the field.
  const nullResets = field.message.typeName != "google.protobuf.Value";
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    return (message, json, ctx) => {
      const oneof = message[oneofLocalName] as {
        case: string | undefined;
        value?: unknown;
      };
      if (json === null && nullResets) {
        if (oneof.case === localName) {
          message[oneofLocalName] = { case: undefined };
        }
        return;
      }
      const child = toMessage(
        oneof.case === localName ? oneof.value : undefined,
      );
      readChild(child, json, ctx);
      message[oneofLocalName] = { case: localName, value: toLocal(child) };
    };
  }
  return (message, json, ctx) => {
    if (json === null && nullResets) {
      delete message[localName];
      return;
    }
    const child = toMessage(message[localName]);
    readChild(child, json, ctx);
    message[localName] = toLocal(child);
  };
}

function compileListFieldReader(
  field: DescField & { fieldKind: "list" },
): CompiledJsonReader {
  const localName = field.localName;
  const readItem = compileListItemReader(field);
  return (message, json, ctx) => {
    if (json === null) {
      return;
    }
    if (!Array.isArray(json)) {
      throw new FieldError(field, "expected Array, got " + formatVal(json));
    }
    const items = message[localName] as unknown[];
    for (let i = 0; i < json.length; i++) {
      const value = readItem(json[i], ctx, items.length);
      if (value !== tokenIgnoredUnknownEnum) {
        items.push(value);
      }
    }
  };
}

/**
 * Compile a decoder for a list item. The index is only used in errors, and
 * accounts for previously merged items.
 */
function compileListItemReader(
  field: DescField & { fieldKind: "list" },
): (json: JsonValue, ctx: JsonReadContext, index: number) => unknown {
  switch (field.listKind) {
    case "scalar": {
      const parseScalar = compileScalarParse(field);
      const checkValue = checkScalarValue(field.scalar);
      const toLocal = compileScalarToLocal(field);
      return (json, ctx, index) => {
        if (json === null) {
          throw new FieldError(field, "list item must not be null");
        }
        const value = parseScalar(json);
        const check = checkValue(value);
        if (check !== true) {
          throw new FieldError(
            field,
            `list item #${index + 1}: ${reasonSingular(field, value, check)}`,
          );
        }
        return toLocal(value);
      };
    }
    case "enum": {
      const readEnumValue = compileEnumConverter(field.enum);
      const checkEnum = compileEnumCheck(field.enum);
      const nullResets = field.enum.typeName != "google.protobuf.NullValue";
      return (json, ctx, index) => {
        if (json === null && nullResets) {
          throw new FieldError(field, "list item must not be null");
        }
        const value = readEnumValue(json, ctx.ignoreUnknownFields);
        if (value === tokenIgnoredUnknownEnum) {
          return value;
        }
        const check = checkEnum(value);
        if (check !== true) {
          throw new FieldError(
            field,
            `list item #${index + 1}: ${reasonSingular(field, value, check)}`,
          );
        }
        return value;
      };
    }
    case "message": {
      const { toMessage, toLocal } = localMessageMapper(field);
      const readChild = compiledReader(field.message);
      const nullResets = field.message.typeName != "google.protobuf.Value";
      return (json, ctx) => {
        if (json === null && nullResets) {
          throw new FieldError(field, "list item must not be null");
        }
        const child = toMessage(undefined);
        readChild(child, json, ctx);
        return toLocal(child);
      };
    }
  }
}

function compileMapFieldReader(
  field: DescField & { fieldKind: "map" },
): CompiledJsonReader {
  const localName = field.localName;
  const mapKey = field.mapKey;
  const parseMapKey = compileMapKeyParse(mapKey);
  const checkMapKey = checkScalarValue(mapKey);
  let parseValue: (
    json: NonNullable<JsonValue>,
    ctx: JsonReadContext,
  ) => unknown;
  // Additional validation for scalar and enum values, matching the checks
  // of the reflect API. Message values need no validation.
  let checkValue: ((value: unknown) => true | string | false) | undefined;
  let toLocalValue: (value: unknown) => unknown = (value) => value;
  // Fields with google.protobuf.Value or google.protobuf.NullValue values
  // permit a Protobuf-serializable null.
  let nullResets = true;
  switch (field.mapKind) {
    case "scalar": {
      parseValue = compileScalarParse(field);
      checkValue = checkScalarValue(field.scalar);
      toLocalValue = compileScalarToLocal(field);
      break;
    }
    case "enum": {
      const readEnumValue = compileEnumConverter(field.enum);
      parseValue = (json, ctx) => readEnumValue(json, ctx.ignoreUnknownFields);
      checkValue = compileEnumCheck(field.enum);
      nullResets = field.enum.typeName != "google.protobuf.NullValue";
      break;
    }
    case "message": {
      const { toMessage, toLocal } = localMessageMapper(field);
      const readChild = compiledReader(field.message);
      nullResets = field.message.typeName != "google.protobuf.Value";
      parseValue = (json, ctx) => {
        const child = toMessage(undefined);
        readChild(child, json, ctx);
        return toLocal(child);
      };
      break;
    }
  }
  return (message, json, ctx) => {
    if (json === null) {
      return;
    }
    if (typeof json != "object" || Array.isArray(json)) {
      throw new FieldError(field, "expected object, got " + formatVal(json));
    }
    const record = message[localName] as Record<string, unknown>;
    const seen = new Set<unknown>();
    const jsonMapKeys = Object.keys(json);
    for (let i = 0; i < jsonMapKeys.length; i++) {
      const jsonMapKey = jsonMapKeys[i];
      const jsonMapValue = json[jsonMapKey];
      const key = parseMapKey(jsonMapKey);
      if (seen.has(key)) {
        throw new FieldError(field, `duplicate map key "${jsonMapKey}"`);
      }
      seen.add(key);
      if (jsonMapValue === null && nullResets) {
        throw new FieldError(field, "map value must not be null");
      }
      const value = parseValue(jsonMapValue as NonNullable<JsonValue>, ctx);
      if (value === tokenIgnoredUnknownEnum) {
        continue;
      }
      const checkKey = checkMapKey(key);
      if (checkKey !== true) {
        throw new FieldError(
          field,
          `invalid map key: ${reasonSingular({ scalar: mapKey }, key, checkKey)}`,
        );
      }
      if (checkValue !== undefined) {
        const check = checkValue(value);
        if (check !== true) {
          throw new FieldError(
            field,
            `map entry ${formatVal(key)}: ${reasonSingular(field, value, check)}`,
          );
        }
      }
      record[key as string] = toLocalValue(value);
    }
  };
}

const tokenIgnoredUnknownEnum = Symbol();

/**
 * Compile a converter from a JSON value to an enum value. JSON null returns
 * the enum's first value. With ignoreUnknownFields false, unknown string
 * values raise an error; with true, they return tokenIgnoredUnknownEnum.
 * The value is not checked against the enum's values, see compileEnumCheck.
 */
function compileEnumConverter(
  desc: DescEnum,
): (
  json: JsonValue,
  ignoreUnknownFields: boolean,
) => number | typeof tokenIgnoredUnknownEnum {
  const zero = desc.values[0].number;
  const values = desc.values;
  return (json, ignoreUnknownFields) => {
    if (json === null) {
      return zero;
    }
    switch (typeof json) {
      case "number":
        if (Number.isInteger(json)) {
          return json;
        }
        break;
      case "string": {
        const value = values.find((ev) => ev.name === json);
        if (value !== undefined) {
          return value.number;
        }
        if (ignoreUnknownFields) {
          return tokenIgnoredUnknownEnum;
        }
        break;
      }
    }
    throw new Error(`cannot decode ${desc} from JSON: ${formatVal(json)}`);
  };
}

/**
 * Compile the check that the reflect API performs for enum values: open
 * enums accept any int32 value, closed enums accept only declared values.
 */
function compileEnumCheck(
  desc: DescEnum,
): (value: unknown) => true | string | false {
  if (desc.open) {
    return checkScalarValue(ScalarType.INT32);
  }
  const values = desc.values;
  return (value) => values.some((v) => v.number === value);
}

/**
 * Compile a converter from a JSON value to the local representation of a
 * scalar, fusing JSON parsing, the validation of the reflect API, and the
 * conversion to the local 64-bit integer representation.
 */
function compileScalarConverter(
  field: DescField & { scalar: ScalarType },
): (json: NonNullable<JsonValue>) => unknown {
  const parseScalar = compileScalarParse(field);
  const checkValue = checkScalarValue(field.scalar);
  const toLocal = compileScalarToLocal(field);
  return (json) => {
    const value = parseScalar(json);
    const check = checkValue(value);
    if (check !== true) {
      throw new FieldError(field, reasonSingular(field, value, check));
    }
    return toLocal(value);
  };
}

/**
 * Compile the JSON-specific parsing step for a scalar value: the special
 * string values of float and double, string-encoded numbers, and base64
 * bytes. Returns the input unchanged if the JSON value cannot be converted;
 * the validation step raises an error for it.
 */
function compileScalarParse(
  field: DescField & { scalar: ScalarType },
): (json: NonNullable<JsonValue>) => unknown {
  switch (field.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return (json) => {
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
          return json;
        }
        if (typeof json == "string") {
          if (json === "") {
            // empty string is not a number
            return json;
          }
          if (json.trim().length !== json.length) {
            // extra whitespace
            return json;
          }
          const float = Number(json);
          if (!Number.isFinite(float)) {
            // Infinity and NaN must be encoded with string constants
            return json;
          }
          return float;
        }
        return json;
      };

    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      return int32FromJson;

    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      return (json) => {
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
        return json;
      };

    // int64, sfixed64, sint64, fixed64, uint64: The validation step accepts
    // string and number. string, bool: no conversion.
    default:
      return (json) => json;
  }
}

/**
 * Compile the conversion of a validated scalar value to its local
 * representation: 64-bit integers become bigint, or string with the
 * longAsString option.
 */
function compileScalarToLocal(
  field: DescField & { scalar: ScalarType },
): (value: unknown) => unknown {
  const longAsString = field.fieldKind !== "map" && field.longAsString;
  switch (field.scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (longAsString) {
        return (value) => String(value);
      }
      return (value) =>
        typeof value == "string" || typeof value == "number"
          ? protoInt64.parse(value)
          : value;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (longAsString) {
        return (value) => String(value);
      }
      return (value) =>
        typeof value == "string" || typeof value == "number"
          ? protoInt64.uParse(value)
          : value;
    default:
      return (value) => value;
  }
}

/**
 * Return a parser from a JSON value to a map key for the given key type.
 * Canonicalizes 64-bit integers given as string, so that "01" and "1" are
 * one key, and duplicates can raise an error.
 * The parser returns the input if the JSON value cannot be converted.
 */
function compileMapKeyParse(
  type: Exclude<
    ScalarType,
    ScalarType.BYTES | ScalarType.DOUBLE | ScalarType.FLOAT
  >,
): (jsonString: string) => unknown {
  switch (type) {
    case ScalarType.BOOL:
      return (jsonString) => {
        switch (jsonString) {
          case "true":
            return true;
          case "false":
            return false;
        }
        return jsonString;
      };
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      return int32FromJson;
    case ScalarType.INT64:
    case ScalarType.SINT64:
    case ScalarType.SFIXED64:
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return (jsonString) =>
        /^-?0+$/.test(jsonString)
          ? "0"
          : jsonString.replace(/^(-?)0+(?=\d)/, "$1");
    default:
      // ScalarType.STRING
      return (jsonString) => jsonString;
  }
}

/**
 * Try to parse a JSON value to a 32-bit integer for the reflect API.
 *
 * Returns the input if the JSON value cannot be converted.
 */
function int32FromJson(json: NonNullable<JsonValue>) {
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

/**
 * Parse a JSON string, rejecting duplicate object keys (which JSON.parse would
 * otherwise silently merge).
 */
function parseJsonString(jsonString: string, typeName: string) {
  let json: JsonValue;
  try {
    json = JSON.parse(jsonString) as JsonValue;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(
      `cannot decode message ${typeName} from JSON: ${message}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: e },
    );
  }
  checkDuplicateKeys(jsonString, typeName);
  return json;
}

/**
 * Scan a JSON string for duplicate object member names at any depth, throwing
 * if any are found. JSON.parse() silently keeps the last of duplicate keys, so
 * this raw-string scan is the only way to reject them. It must only be called
 * with a string that JSON.parse() has already accepted, so it can assume the
 * input is well-formed.
 */
function checkDuplicateKeys(jsonString: string, typeName: string): void {
  // One Set of seen member names for each open object; arrays push null.
  const stack: (Set<string> | null)[] = [];
  // Whether the next string token is an object member name.
  let expectKey = false;
  let i = 0;
  while (i < jsonString.length) {
    switch (jsonString[i]) {
      case "{":
        stack.push(new Set());
        expectKey = true;
        i++;
        break;
      case "[":
        stack.push(null);
        expectKey = false;
        i++;
        break;
      case "}":
      case "]":
        stack.pop();
        expectKey = false;
        i++;
        break;
      case ",":
        expectKey = stack[stack.length - 1] != null;
        i++;
        break;
      case ":":
        expectKey = false;
        i++;
        break;
      case '"': {
        const open = i++;
        let escaped = false;
        while (i < jsonString.length) {
          if (jsonString[i] == "\\") {
            escaped = true;
            i += 2; // skip the backslash and the character it escapes
            continue;
          }
          if (jsonString[i] == '"') {
            break;
          }
          i++;
        }
        const close = i++;
        const seen = stack[stack.length - 1];
        if (expectKey && seen) {
          // Decode escapes (rare) so that, for example, a key written with a
          // unicode escape collides with the same key written literally.
          const name = escaped
            ? (JSON.parse(jsonString.substring(open, close + 1)) as string)
            : jsonString.substring(open + 1, close);
          if (seen.has(name)) {
            throw new Error(
              `cannot decode message ${typeName} from JSON: duplicate object key "${name}"`,
            );
          }
          seen.add(name);
        }
        expectKey = false;
        break;
      }
      default:
        i++;
        break;
    }
  }
}

function anyFromJson(any: Any, json: JsonValue, ctx: JsonReadContext) {
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
  const desc = ctx.registry?.getMessage(typeName);
  if (!desc) {
    throw new Error(
      `cannot decode message ${any.$typeName} from JSON: ${typeUrl} is not in the type registry`,
    );
  }
  const message = create(desc) as Record<string, unknown>;
  if (
    hasCustomJsonRepresentation(desc) &&
    Object.prototype.hasOwnProperty.call(json, "value")
  ) {
    compiledReader(desc)(message, json.value, ctx);
  } else {
    const copy = Object.assign({}, json);
    // biome-ignore lint/performance/noDelete: <explanation>
    delete copy["@type"];
    compiledReader(desc)(message, copy, ctx);
  }
  anyPack(desc, message as unknown as Message, any);
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
  if (ms < timestampMsMin || ms > timestampMsMax) {
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
  if (longSeconds > durationSecondsMax || longSeconds < durationSecondsMin) {
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
  fieldMask.paths = json.split(",").map((path) => {
    if (path.includes("_")) {
      throw new Error(
        `cannot decode message ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`,
      );
    }
    return protoSnakeCase(path);
  });
}

function structFromJson(struct: Struct, json: JsonValue, ctx: JsonReadContext) {
  if (typeof json != "object" || json == null || Array.isArray(json)) {
    throw new Error(
      `cannot decode message ${struct.$typeName} from JSON ${formatVal(json)}`,
    );
  }
  const keys = Object.keys(json);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const parsedValue = create(ValueSchema);
    valueFromJson(parsedValue, json[key], ctx);
    struct.fields[key] = parsedValue;
  }
}

function valueFromJson(value: Value, json: JsonValue, ctx: JsonReadContext) {
  if (++ctx.depth > ctx.recursionLimit) {
    throw new Error(
      `cannot decode ${value.$typeName} from JSON: maximum recursion depth of ${ctx.recursionLimit} reached`,
    );
  }
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
        listValueFromJson(listValue, json, ctx);
        value.kind = { case: "listValue", value: listValue };
      } else {
        const struct = create(StructSchema);
        structFromJson(struct, json, ctx);
        value.kind = { case: "structValue", value: struct };
      }
      break;
    default:
      throw new Error(
        `cannot decode message ${value.$typeName} from JSON ${formatVal(json)}`,
      );
  }
  ctx.depth--;
  return value;
}

function listValueFromJson(
  listValue: ListValue,
  json: JsonValue,
  ctx: JsonReadContext,
) {
  if (!Array.isArray(json)) {
    throw new Error(
      `cannot decode message ${listValue.$typeName} from JSON ${formatVal(json)}`,
    );
  }
  for (let i = 0; i < json.length; i++) {
    const value = create(ValueSchema);
    valueFromJson(value, json[i], ctx);
    listValue.values.push(value);
  }
}
