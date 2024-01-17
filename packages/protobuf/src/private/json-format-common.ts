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
import { LongType, ScalarType } from "../field.js";
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

/* eslint-disable no-case-declarations, @typescript-eslint/restrict-plus-operands,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */

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

type JsonFormatWriteFieldFn = (
  field: FieldInfo,
  value: any,
  options: JsonWriteOptions,
) => JsonValue | undefined;

export function makeJsonFormatCommon(
  makeWriteField: (
    writeEnumFn: typeof writeEnum,
    writeScalarFn: typeof writeScalar,
  ) => JsonFormatWriteFieldFn,
): JsonFormat {
  const writeField = makeWriteField(writeEnum, writeScalar);
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
      const findExtension = options.typeRegistry?.findExtension;
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
          readField(message, jsonValue, field, options, type);
        } else {
          let found = false;
          if (
            findExtension &&
            jsonKey.startsWith("[") &&
            jsonKey.endsWith("]")
          ) {
            const ext = findExtension(jsonKey.substring(1, jsonKey.length - 1));
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
        for (const member of type.fields.byMember()) {
          let jsonValue: JsonValue | undefined;
          if (member.kind == "oneof") {
            const oneof = (message as AnyMessage)[member.localName];
            if (oneof.value === undefined) {
              continue;
            }
            field = member.findField(oneof.case);
            if (!field) {
              throw "oneof case not found: " + oneof.case;
            }
            jsonValue = writeField(field, oneof.value, options);
          } else {
            field = member;
            jsonValue = writeField(
              field,
              (message as AnyMessage)[field.localName],
              options,
            );
          }
          if (jsonValue !== undefined) {
            json[options.useProtoFieldName ? field.name : field.jsonName] =
              jsonValue;
          }
        }
        const findExtensionFor = options.typeRegistry?.findExtensionFor;
        if (findExtensionFor !== undefined) {
          for (const uf of type.runtime.bin.listUnknownFields(message)) {
            const ext = findExtensionFor(type.typeName, uf.no);
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
    readScalar,
    writeScalar,
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
// The "type" argument is only used to provide context in errors.
function readField(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  jsonValue: JsonValue,
  field: FieldInfo,
  options: JsonReadOptions,
  type: MessageType | Extension,
) {
  let localName = field.localName;
  if (field.oneof) {
    if (jsonValue === null && field.kind == "scalar") {
      // see conformance test Required.Proto3.JsonInput.OneofFieldNull{First,Second}
      return;
    }
    target = target[field.oneof.localName] = { case: localName };
    localName = "value";
  }
  if (field.repeated) {
    if (jsonValue === null) {
      return;
    }
    if (!Array.isArray(jsonValue)) {
      throw new Error(
        `cannot decode field ${type.typeName}.${
          field.name
        } from JSON: ${debugJsonValue(jsonValue)}`,
      );
    }
    const targetArray = target[localName] as unknown[];
    for (const jsonItem of jsonValue) {
      if (jsonItem === null) {
        throw new Error(
          `cannot decode field ${type.typeName}.${
            field.name
          } from JSON: ${debugJsonValue(jsonItem)}`,
        );
      }
      let val;
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- "map" is invalid for repeated fields
      switch (field.kind) {
        case "message":
          val = field.T.fromJson(jsonItem, options);
          break;
        case "enum":
          val = readEnum(field.T, jsonItem, options.ignoreUnknownFields);
          if (val === undefined) continue;
          break;
        case "scalar":
          try {
            val = readScalar(field.T, jsonItem, field.L);
          } catch (e) {
            let m = `cannot decode field ${type.typeName}.${
              field.name
            } from JSON: ${debugJsonValue(jsonItem)}`;
            if (e instanceof Error && e.message.length > 0) {
              m += `: ${e.message}`;
            }
            throw new Error(m);
          }
          break;
      }
      targetArray.push(val);
    }
  } else if (field.kind == "map") {
    if (jsonValue === null) {
      return;
    }
    if (typeof jsonValue != "object" || Array.isArray(jsonValue)) {
      throw new Error(
        `cannot decode field ${type.typeName}.${
          field.name
        } from JSON: ${debugJsonValue(jsonValue)}`,
      );
    }
    const targetMap = target[localName] as { [k: string]: unknown };
    for (const [jsonMapKey, jsonMapValue] of Object.entries(jsonValue)) {
      if (jsonMapValue === null) {
        throw new Error(
          `cannot decode field ${type.typeName}.${field.name} from JSON: map value null`,
        );
      }
      let val;
      switch (field.V.kind) {
        case "message":
          val = field.V.T.fromJson(jsonMapValue, options);
          break;
        case "enum":
          val = readEnum(field.V.T, jsonMapValue, options.ignoreUnknownFields);
          if (val === undefined) continue;
          break;
        case "scalar":
          try {
            val = readScalar(field.V.T, jsonMapValue, LongType.BIGINT);
          } catch (e) {
            let m = `cannot decode map value for field ${type.typeName}.${
              field.name
            } from JSON: ${debugJsonValue(jsonValue)}`;
            if (e instanceof Error && e.message.length > 0) {
              m += `: ${e.message}`;
            }
            throw new Error(m);
          }
          break;
      }
      try {
        targetMap[
          readScalar(
            field.K,
            field.K == ScalarType.BOOL
              ? jsonMapKey == "true"
                ? true
                : jsonMapKey == "false"
                  ? false
                  : jsonMapKey
              : jsonMapKey,
            LongType.BIGINT,
          ).toString()
        ] = val;
      } catch (e) {
        let m = `cannot decode map key for field ${type.typeName}.${
          field.name
        } from JSON: ${debugJsonValue(jsonValue)}`;
        if (e instanceof Error && e.message.length > 0) {
          m += `: ${e.message}`;
        }
        throw new Error(m);
      }
    }
  } else {
    switch (field.kind) {
      case "message":
        const messageType = field.T;
        if (
          jsonValue === null &&
          messageType.typeName != "google.protobuf.Value"
        ) {
          if (field.oneof) {
            throw new Error(
              `cannot decode field ${type.typeName}.${field.name} from JSON: null is invalid for oneof field`,
            );
          }
          return;
        }
        if (target[localName] instanceof Message) {
          target[localName].fromJson(jsonValue, options);
        } else {
          target[localName] = messageType.fromJson(jsonValue, options);
          if (messageType.fieldWrapper && !field.oneof) {
            target[localName] = messageType.fieldWrapper.unwrapField(
              target[localName],
            );
          }
        }
        break;
      case "enum":
        const enumValue = readEnum(
          field.T,
          jsonValue,
          options.ignoreUnknownFields,
        );
        if (enumValue !== undefined) {
          target[localName] = enumValue;
        }
        break;
      case "scalar":
        try {
          target[localName] = readScalar(field.T, jsonValue, field.L);
        } catch (e) {
          let m = `cannot decode field ${type.typeName}.${
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

// May throw an error. If the error message is non-blank, it should be shown.
// It is up to the caller to provide context.
function readScalar(
  type: ScalarType,
  json: JsonValue,
  longType: LongType,
): any {
  // every valid case in the switch below returns, and every fall
  // through is regarded as a failure.
  switch (type) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === null) return 0.0; // TODO field presence: this should reset the field with explicit presence
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
      if (json === null) return 0; // TODO field presence: this should reset the field with explicit presence
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
      if (json === null) return protoInt64.zero; // TODO field presence: this should reset the field with explicit presence
      if (typeof json != "number" && typeof json != "string") break;
      const long = protoInt64.parse(json);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return longType ? long.toString() : long;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (json === null) return protoInt64.zero; // TODO field presence: this should reset the field with explicit presence
      if (typeof json != "number" && typeof json != "string") break;
      const uLong = protoInt64.uParse(json);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return longType ? uLong.toString() : uLong;

    // bool:
    case ScalarType.BOOL:
      if (json === null) return false; // TODO field presence: this should reset the field with explicit presence
      if (typeof json !== "boolean") break;
      return json;

    // string:
    case ScalarType.STRING:
      if (json === null) return ""; // TODO field presence: this should reset the field with explicit presence
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
      if (json === null || json === "") return new Uint8Array(0); // TODO field presence: this should reset the field with explicit presence
      if (typeof json !== "string") break;
      return protoBase64.dec(json);
  }
  throw new Error();
}

function readEnum(
  type: EnumType,
  json: JsonValue,
  ignoreUnknownFields: boolean,
): number | undefined {
  if (json === null) {
    // proto3 requires 0 to be default value for all enums
    // TODO field presence: this should reset the field with explicit presence
    return 0;
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
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      if (value || ignoreUnknownFields) {
        return value?.no;
      }
      break;
  }
  throw new Error(
    `cannot decode enum ${type.typeName} from JSON: ${debugJsonValue(json)}`,
  );
}

function writeEnum(
  type: EnumType,
  value: number | undefined,
  emitIntrinsicDefault: boolean,
  enumAsInteger: boolean,
): JsonValue | undefined {
  if (value === undefined) {
    return value;
  }
  if (value === 0 && !emitIntrinsicDefault) {
    // proto3 requires 0 to be default value for all enums
    return undefined;
  }
  if (enumAsInteger) {
    return value;
  }
  if (type.typeName == "google.protobuf.NullValue") {
    return null;
  }
  const val = type.findNumber(value);
  return val?.name ?? value; // if we don't know the enum value, just return the number
}

function writeScalar(
  type: ScalarType,
  value: any,
  emitIntrinsicDefault: boolean,
): JsonValue | undefined {
  if (value === undefined) {
    return undefined;
  }
  switch (type) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      assert(typeof value == "number");
      return value != 0 || emitIntrinsicDefault ? value : undefined;

    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.FLOAT:
    // assertFloat32(value);
    case ScalarType.DOUBLE: // eslint-disable-line no-fallthrough
      assert(typeof value == "number");
      if (Number.isNaN(value)) return "NaN";
      if (value === Number.POSITIVE_INFINITY) return "Infinity";
      if (value === Number.NEGATIVE_INFINITY) return "-Infinity";
      return value !== 0 || emitIntrinsicDefault ? value : undefined;

    // string:
    case ScalarType.STRING:
      assert(typeof value == "string");
      return value.length > 0 || emitIntrinsicDefault ? value : undefined;

    // bool:
    case ScalarType.BOOL:
      assert(typeof value == "boolean");
      return value || emitIntrinsicDefault ? value : undefined;

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
      // We use implicit conversion with `value != 0` to catch both 0n and "0"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return emitIntrinsicDefault || value != 0
        ? value.toString(10)
        : undefined;

    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      assert(value instanceof Uint8Array);
      return emitIntrinsicDefault || value.byteLength > 0
        ? protoBase64.enc(value)
        : undefined;
  }
}
