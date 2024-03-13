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
  JsonFormat,
  JsonObject,
  JsonReadOptions,
  JsonValue,
  JsonWriteOptions,
  JsonWriteStringOptions,
} from "../json-format.js";
import type { AnyMessage } from "../message.js";
import { Message } from "../message.js";
import type { MessageType } from "../message-type.js";
import type { FieldInfo, OneofInfo } from "../field.js";
import { assert, assertFloat32, assertInt32, assertUInt32 } from "./assert.js";
import { protoInt64 } from "../proto-int64.js";
import { protoBase64 } from "../proto-base64.js";
import type { EnumType } from "../enum.js";
import type { Extension } from "../extension.js";
import { createExtensionContainer } from "./extensions.js";
import {
  getExtension,
  hasExtension,
  setExtension,
} from "../extension-accessor.js";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
} from "../binary-format.js";
import { clearField, isFieldSet } from "./reflect.js";
import { wrapField } from "./field-wrapper.js";
import { scalarZeroValue } from "./scalars.js";
import { isScalarZeroValue } from "./scalars.js";
import type { ScalarValue } from "../scalar.js";
import { LongType, ScalarType } from "../scalar.js";
import { isMessage } from "../is-message.js";

/* eslint-disable no-case-declarations,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */

// Default options for parsing JSON.
const jsonReadDefaults: Readonly<JsonReadOptions> = {
  ignoreUnknownFields: false,
};

// Default options for serializing to JSON.
const jsonWriteDefaults: Readonly<JsonWriteStringOptions> = {
  emitDefaultValues: false,
  enumAsInteger: false,
  useProtoFieldName: false,
  prettySpaces: 0,
};

function makeReadOptions(
  options?: Partial<JsonReadOptions>,
): Readonly<JsonReadOptions> {
  return options ? { ...jsonReadDefaults, ...options } : jsonReadDefaults;
}

function makeWriteOptions(
  options?: Partial<JsonWriteStringOptions>,
): Readonly<JsonWriteStringOptions> {
  return options ? { ...jsonWriteDefaults, ...options } : jsonWriteDefaults;
}

const tokenNull = Symbol();
const tokenIgnoredUnknownEnum = Symbol();

export function makeJsonFormat(): JsonFormat {
  return {
    makeReadOptions,
    makeWriteOptions,
    readMessage<T extends Message<T>>(
      type: MessageType<T>,
      json: JsonValue,
      options: JsonReadOptions,
      message?: T,
    ): T {
      if (json == null || Array.isArray(json) || typeof json != "object") {
        throw new Error(
          `cannot decode message ${type.typeName} from JSON: ${debugJsonValue(
            json,
          )}`,
        );
      }
      message = message ?? new type();
      const oneofSeen = new Map<OneofInfo, string>();
      const registry = options.typeRegistry;
      for (const [jsonKey, jsonValue] of Object.entries(json)) {
        const field = type.fields.findJsonName(jsonKey);
        if (field) {
          if (field.oneof) {
            if (jsonValue === null && field.kind == "scalar") {
              // see conformance test Required.Proto3.JsonInput.OneofFieldNull{First,Second}
              continue;
            }
            const seen = oneofSeen.get(field.oneof);
            if (seen !== undefined) {
              throw new Error(
                `cannot decode message ${type.typeName} from JSON: multiple keys for oneof "${field.oneof.name}" present: "${seen}", "${jsonKey}"`,
              );
            }
            oneofSeen.set(field.oneof, jsonKey);
          }
          readField(
            message as Record<string, unknown>,
            jsonValue,
            field,
            options,
            type,
          );
        } else {
          let found = false;
          if (
            registry?.findExtension &&
            jsonKey.startsWith("[") &&
            jsonKey.endsWith("]")
          ) {
            const ext = registry.findExtension(
              jsonKey.substring(1, jsonKey.length - 1),
            );
            if (ext && ext.extendee.typeName == type.typeName) {
              found = true;
              const [container, get] = createExtensionContainer(ext);
              readField(container, jsonValue, ext.field, options, ext);
              // We pass on the options as BinaryReadOptions/BinaryWriteOptions,
              // so that users can bring their own binary reader and writer factories
              // if necessary.
              setExtension(
                message,
                ext as Extension<T>,
                get(),
                options as Partial<BinaryReadOptions & BinaryWriteOptions>,
              );
            }
          }
          if (!found && !options.ignoreUnknownFields) {
            throw new Error(
              `cannot decode message ${type.typeName} from JSON: key "${jsonKey}" is unknown`,
            );
          }
        }
      }
      return message;
    },
    writeMessage(message: Message, options: JsonWriteOptions): JsonValue {
      const type = message.getType();
      const json: JsonObject = {};
      let field: FieldInfo | undefined;
      try {
        for (field of type.fields.byNumber()) {
          if (!isFieldSet(field, message)) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (field.req) {
              throw `required field not set`;
            }
            if (!options.emitDefaultValues) {
              continue;
            }
            if (!canEmitFieldDefaultValue(field)) {
              continue;
            }
          }
          const value = field.oneof
            ? (message as AnyMessage)[field.oneof.localName].value
            : (message as AnyMessage)[field.localName];
          const jsonValue = writeField(field, value, options);
          if (jsonValue !== undefined) {
            json[options.useProtoFieldName ? field.name : field.jsonName] =
              jsonValue;
          }
        }
        const registry = options.typeRegistry;
        if (registry?.findExtensionFor) {
          for (const uf of type.runtime.bin.listUnknownFields(message)) {
            const ext = registry.findExtensionFor(type.typeName, uf.no);
            if (ext && hasExtension(message, ext)) {
              // We pass on the options as BinaryReadOptions, so that users can bring their own
              // binary reader factory if necessary.
              const value = getExtension(
                message,
                ext,
                options as Partial<BinaryReadOptions>,
              );
              const jsonValue = writeField(ext.field, value, options);
              if (jsonValue !== undefined) {
                json[ext.field.jsonName] = jsonValue;
              }
            }
          }
        }
      } catch (e) {
        const m = field
          ? `cannot encode field ${type.typeName}.${field.name} to JSON`
          : `cannot encode message ${type.typeName} to JSON`;
        const r = e instanceof Error ? e.message : String(e);
        throw new Error(m + (r.length > 0 ? `: ${r}` : ""));
      }
      return json;
    },
    readScalar(type, json, longType) {
      // The signature of our internal function has changed. For backwards-
      // compatibility, we support the old form that is part of the public API
      // through the interface JsonFormat.
      return readScalar(type, json, longType ?? LongType.BIGINT, true);
    },
    writeScalar(type, value, emitDefaultValues) {
      // The signature of our internal function has changed. For backwards-
      // compatibility, we support the old form that is part of the public API
      // through the interface JsonFormat.
      if (value === undefined) {
        return undefined;
      }
      if (emitDefaultValues || isScalarZeroValue(type, value)) {
        return writeScalar(type, value);
      }
      return undefined;
    },
    debug: debugJsonValue,
  };
}

function debugJsonValue(json: unknown): string {
  if (json === null) {
    return "null";
  }
  switch (typeof json) {
    case "object":
      return Array.isArray(json) ? "array" : "object";
    case "string":
      return json.length > 100 ? "string" : `"${json.split('"').join('\\"')}"`;
    default:
      return String(json);
  }
}

// Read a JSON value for a field.
// The "parentType" argument is only used to provide context in errors.
function readField(
  target: Record<string, unknown>,
  jsonValue: JsonValue,
  field: FieldInfo,
  options: JsonReadOptions,
  parentType: MessageType | Extension,
) {
  let localName = field.localName;
  if (field.repeated) {
    assert(field.kind != "map");
    if (jsonValue === null) {
      return;
    }
    if (!Array.isArray(jsonValue)) {
      throw new Error(
        `cannot decode field ${parentType.typeName}.${
          field.name
        } from JSON: ${debugJsonValue(jsonValue)}`,
      );
    }
    const targetArray = target[localName] as unknown[];
    for (const jsonItem of jsonValue) {
      if (jsonItem === null) {
        throw new Error(
          `cannot decode field ${parentType.typeName}.${
            field.name
          } from JSON: ${debugJsonValue(jsonItem)}`,
        );
      }
      switch (field.kind) {
        case "message":
          targetArray.push(field.T.fromJson(jsonItem, options));
          break;
        case "enum":
          const enumValue = readEnum(
            field.T,
            jsonItem,
            options.ignoreUnknownFields,
            true,
          );
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetArray.push(enumValue);
          }
          break;
        case "scalar":
          try {
            targetArray.push(readScalar(field.T, jsonItem, field.L, true));
          } catch (e) {
            let m = `cannot decode field ${parentType.typeName}.${
              field.name
            } from JSON: ${debugJsonValue(jsonItem)}`;
            if (e instanceof Error && e.message.length > 0) {
              m += `: ${e.message}`;
            }
            throw new Error(m);
          }
          break;
      }
    }
  } else if (field.kind == "map") {
    if (jsonValue === null) {
      return;
    }
    if (typeof jsonValue != "object" || Array.isArray(jsonValue)) {
      throw new Error(
        `cannot decode field ${parentType.typeName}.${
          field.name
        } from JSON: ${debugJsonValue(jsonValue)}`,
      );
    }
    const targetMap = target[localName] as Record<string, unknown>;
    for (const [jsonMapKey, jsonMapValue] of Object.entries(jsonValue)) {
      if (jsonMapValue === null) {
        throw new Error(
          `cannot decode field ${parentType.typeName}.${field.name} from JSON: map value null`,
        );
      }
      let key: string;
      try {
        key = readMapKey(field.K, jsonMapKey);
      } catch (e) {
        let m = `cannot decode map key for field ${parentType.typeName}.${
          field.name
        } from JSON: ${debugJsonValue(jsonValue)}`;
        if (e instanceof Error && e.message.length > 0) {
          m += `: ${e.message}`;
        }
        throw new Error(m);
      }
      switch (field.V.kind) {
        case "message":
          targetMap[key] = field.V.T.fromJson(jsonMapValue, options);
          break;
        case "enum":
          const enumValue = readEnum(
            field.V.T,
            jsonMapValue,
            options.ignoreUnknownFields,
            true,
          );
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetMap[key] = enumValue;
          }
          break;
        case "scalar":
          try {
            targetMap[key] = readScalar(
              field.V.T,
              jsonMapValue,
              LongType.BIGINT,
              true,
            );
          } catch (e) {
            let m = `cannot decode map value for field ${parentType.typeName}.${
              field.name
            } from JSON: ${debugJsonValue(jsonValue)}`;
            if (e instanceof Error && e.message.length > 0) {
              m += `: ${e.message}`;
            }
            throw new Error(m);
          }
          break;
      }
    }
  } else {
    if (field.oneof) {
      target = target[field.oneof.localName] = { case: localName };
      localName = "value";
    }
    switch (field.kind) {
      case "message":
        const messageType = field.T;
        if (
          jsonValue === null &&
          messageType.typeName != "google.protobuf.Value"
        ) {
          return;
        }
        let currentValue = target[localName] as Message | undefined;
        if (isMessage(currentValue)) {
          currentValue.fromJson(jsonValue, options);
        } else {
          target[localName] = currentValue = messageType.fromJson(
            jsonValue,
            options,
          );
          if (messageType.fieldWrapper && !field.oneof) {
            target[localName] =
              messageType.fieldWrapper.unwrapField(currentValue);
          }
        }
        break;
      case "enum":
        const enumValue = readEnum(
          field.T,
          jsonValue,
          options.ignoreUnknownFields,
          false,
        );
        switch (enumValue) {
          case tokenNull:
            clearField(field, target);
            break;
          case tokenIgnoredUnknownEnum:
            break;
          default:
            target[localName] = enumValue;
            break;
        }
        break;
      case "scalar":
        try {
          const scalarValue = readScalar(field.T, jsonValue, field.L, false);
          switch (scalarValue) {
            case tokenNull:
              clearField(field, target);
              break;
            default:
              target[localName] = scalarValue;
              break;
          }
        } catch (e) {
          let m = `cannot decode field ${parentType.typeName}.${
            field.name
          } from JSON: ${debugJsonValue(jsonValue)}`;
          if (e instanceof Error && e.message.length > 0) {
            m += `: ${e.message}`;
          }
          throw new Error(m);
        }
        break;
    }
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
  return readScalar(type, json, LongType.BIGINT, true).toString();
}

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
      if (type == ScalarType.UINT32) assertUInt32(int32);
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
      // We validate with encodeURIComponent, which appears to be the fastest widely available option.
      try {
        encodeURIComponent(json);
      } catch (e) {
        throw new Error("invalid UTF8");
      }
      return json;

    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      if (json === "") return new Uint8Array(0);
      if (typeof json !== "string") break;
      return protoBase64.dec(json);
  }
  throw new Error();
}

function readEnum(
  type: EnumType,
  json: JsonValue,
  ignoreUnknownFields: boolean,
  nullAsZeroValue: false,
): number | typeof tokenIgnoredUnknownEnum | typeof tokenNull;
function readEnum(
  type: EnumType,
  json: JsonValue,
  ignoreUnknownFields: boolean,
  nullAsZeroValue: true,
): number | typeof tokenIgnoredUnknownEnum;
function readEnum(
  type: EnumType,
  json: JsonValue,
  ignoreUnknownFields: boolean,
  nullAsZeroValue: boolean,
): number | typeof tokenNull | typeof tokenIgnoredUnknownEnum {
  if (json === null) {
    if (type.typeName == "google.protobuf.NullValue") {
      return 0; // google.protobuf.NullValue.NULL_VALUE = 0
    }
    return nullAsZeroValue ? type.values[0].no : tokenNull;
  }
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = type.findName(json);
      if (value !== undefined) {
        return value.no;
      }
      if (ignoreUnknownFields) {
        return tokenIgnoredUnknownEnum;
      }
      break;
  }
  throw new Error(
    `cannot decode enum ${type.typeName} from JSON: ${debugJsonValue(json)}`,
  );
}

// Decide whether an unset field should be emitted with JSON write option `emitDefaultValues`
function canEmitFieldDefaultValue(field: FieldInfo) {
  if (field.repeated || field.kind == "map") {
    // maps are {}, repeated fields are []
    return true;
  }
  if (field.oneof) {
    // oneof fields are never emitted
    return false;
  }
  if (field.kind == "message") {
    // singular message field are allowed to emit JSON null, but we do not
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (field.opt || field.req) {
    // the field uses explicit presence, so we cannot emit a zero value
    return false;
  }
  return true;
}

function writeField(
  field: FieldInfo,
  value: unknown,
  options: JsonWriteOptions,
): JsonValue | undefined {
  if (field.kind == "map") {
    assert(typeof value == "object" && value != null);
    const jsonObj: JsonObject = {};
    const entries = Object.entries(value);
    switch (field.V.kind) {
      case "scalar":
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = writeScalar(field.V.T, entryValue); // JSON standard allows only (double quoted) string as property key
        }
        break;
      case "message":
        for (const [entryKey, entryValue] of entries) {
          // JSON standard allows only (double quoted) string as property key
          jsonObj[entryKey.toString()] = (entryValue as Message).toJson(
            options,
          );
        }
        break;
      case "enum":
        const enumType = field.V.T;
        for (const [entryKey, entryValue] of entries) {
          // JSON standard allows only (double quoted) string as property key
          jsonObj[entryKey.toString()] = writeEnum(
            enumType,
            entryValue,
            options.enumAsInteger,
          );
        }
        break;
    }
    return options.emitDefaultValues || entries.length > 0
      ? jsonObj
      : undefined;
  }
  if (field.repeated) {
    assert(Array.isArray(value));
    const jsonArr: JsonValue[] = [];
    switch (field.kind) {
      case "scalar":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(writeScalar(field.T, value[i]) as JsonValue);
        }
        break;
      case "enum":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(
            writeEnum(field.T, value[i], options.enumAsInteger) as JsonValue,
          );
        }
        break;
      case "message":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(value[i].toJson(options));
        }
        break;
    }
    return options.emitDefaultValues || jsonArr.length > 0
      ? jsonArr
      : undefined;
  }
  switch (field.kind) {
    case "scalar":
      return writeScalar(field.T, value);
    case "enum":
      return writeEnum(field.T, value, options.enumAsInteger);
    case "message":
      return wrapField(field.T, value).toJson(options);
  }
}

function writeEnum(
  type: EnumType,
  value: unknown,
  enumAsInteger: boolean,
): string | number | null {
  assert(typeof value == "number");
  if (type.typeName == "google.protobuf.NullValue") {
    return null;
  }
  if (enumAsInteger) {
    return value;
  }
  const val = type.findNumber(value);
  return val?.name ?? value; // if we don't know the enum value, just return the number
}

function writeScalar(
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
      return protoBase64.enc(value);
  }
}
