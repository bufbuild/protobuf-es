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
  DescField,
  DescMessage,
  DescOneof,
} from "../../descriptor-set.js";
import type { Message, MessageShape } from "../types.js";
import { checkField, checkListItem, checkMapEntry } from "./reflect-check.js";
import { FieldError } from "./error.js";
import type {
  MapEntryKey,
  ReflectList,
  ReflectMap,
  ReflectMessage,
} from "./reflect-types.js";
import {
  unsafeAddListItem,
  unsafeClear,
  unsafeGet,
  unsafeIsSet,
  unsafeLocal,
  unsafeOneofCase,
  unsafeSet,
  unsafeSetMapEntry,
} from "./unsafe.js";
import { create } from "../create.js";
import { isWktWrapper, isWktWrapperDesc } from "./wkt.js";
import { LongType, ScalarType } from "../../scalar.js";
import { protoInt64 } from "../../proto-int64.js";
import { isReflectList, isReflectMap, isReflectMessage } from "./guard.js";

export function reflect<Desc extends DescMessage>(
  messageDesc: Desc,
  message?: MessageShape<Desc>,
  // TODO either remove this option, or support it in reflect-list and reflect-map as well
  opt?: {
    /**
     * By default, field values are validated when setting them. For example,
     * a value for an uint32 field must be a ECMAScript Number >= 0.
     *
     * Note that setting a message field validates the type of the message,
     * but does not check its fields.
     *
     * In some contexts, field values are trusted, and performance can be
     * improved by disabling validation by setting disableFieldValueCheck to
     * `false`.
     */
    disableFieldValueCheck?: boolean;
  },
): ReflectMessage {
  message ??= create(messageDesc);
  const check = opt?.disableFieldValueCheck !== true;
  let jsonNames: Map<string, DescField> | undefined;
  let fieldsByNumber: Map<number, DescField> | undefined;
  let sortedFields: DescField[] | undefined;
  return {
    message,
    [unsafeLocal]: message,
    desc: messageDesc,
    fields: messageDesc.fields,
    oneofs: messageDesc.oneofs,
    members: messageDesc.members,

    get sortedFields() {
      return (
        sortedFields ??
        (sortedFields = messageDesc.fields
          .concat()
          .sort((a, b) => a.number - b.number))
      );
    },

    findJsonName(jsonName) {
      if (!jsonNames) {
        jsonNames = new Map<string, DescField>();
        for (const f of messageDesc.fields) {
          jsonNames.set(f.jsonName ?? f.proto.jsonName, f).set(f.name, f);
        }
      }
      return jsonNames.get(jsonName);
    },

    findNumber(number) {
      if (!fieldsByNumber) {
        fieldsByNumber = new Map<number, DescField>(
          messageDesc.fields.map((f) => [f.number, f]),
        );
      }
      return fieldsByNumber.get(number);
    },

    oneofCase(oneof) {
      assertOwn(message, oneof);
      return unsafeOneofCase(message, oneof);
    },

    isSet(field) {
      assertOwn(message, field);
      return unsafeIsSet(message, field);
    },

    clear(field: DescField) {
      assertOwn(message, field);
      unsafeClear(message, field);
    },

    get(field) {
      assertOwn(message, field);
      let value = unsafeGet(message, field);
      switch (field.fieldKind) {
        case "list":
          return reflectList(field, value as unknown[]);
        case "map":
          // TODO fix types
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return reflectMap(field, value as Record<string, unknown>) as any; // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
        case "message":
          if (
            value !== undefined &&
            !field.oneof &&
            isWktWrapperDesc(field.message)
          ) {
            value = {
              $typeName: field.message.typeName,
              value: longToReflect(field.message.fields[0], value),
            } satisfies Message & { value: unknown };
          }
          return reflect(field.message, value as Message);
        case "scalar":
          return longToReflect(field, value);
        case "enum":
          return value;
      }
    },

    set(field, value) {
      assertOwn(message, field);
      if (check) {
        const err = checkField(field, value);
        if (err) {
          return err;
        }
      }
      let local: unknown = value;
      if (isReflectMap(value) || isReflectList(value)) {
        local = value[unsafeLocal];
      } else if (isReflectMessage(value)) {
        const msg = value.message;
        local = !field.oneof && isWktWrapper(msg) ? msg.value : msg;
      } else {
        local = longToLocal(field, value);
      }
      unsafeSet(message, field, local);
      return undefined;
    },

    addListItem(field, value) {
      assertOwn(message, field);
      assertKind(field, "list");
      if (check) {
        if (checkListItem(field, 0, value)) {
          const arr = unsafeGet(message, field) as unknown[];
          return checkListItem(field, arr.length, value);
        }
      }
      unsafeAddListItem(message, field, listItemToLocal(field, value));
      return undefined;
    },

    setMapEntry(field, key, value) {
      assertOwn(message, field);
      assertKind(field, "map");
      if (check) {
        const err = checkMapEntry(field, key, value);
        if (err) {
          return err;
        }
      }
      unsafeSetMapEntry(
        message,
        field,
        mapKeyToLocal(key),
        mapValueToLocal(field, value),
      );
      return undefined;
    },

    getUnknown() {
      return message.$unknown;
    },

    setUnknown(value) {
      message.$unknown = value;
    },
  };
}

function assertKind(field: DescField, kind: DescField["fieldKind"]) {
  if (field.fieldKind != kind) {
    throw new FieldError(
      field,
      `${field.toString()} is ${field.fieldKind}`,
      "ForeignFieldError",
    );
  }
}

function assertOwn(owner: Message, member: DescField | DescOneof) {
  if (member.parent.typeName !== owner.$typeName) {
    throw new FieldError(
      member,
      `cannot use ${member.toString()} with message ${owner.$typeName}`,
      "ForeignFieldError",
    );
  }
}

export function reflectList<V>(
  field: DescField & { fieldKind: "list" },
  unsafeInput?: unknown[],
): ReflectList<V> {
  const arr = unsafeInput ?? [];
  return {
    [unsafeLocal]: arr,
    field() {
      return field;
    },
    get size() {
      return arr.length;
    },
    get(index) {
      const item = arr[index];
      return item === undefined
        ? undefined
        : (listItemToReflect(field, item) as V);
    },
    set(index, item) {
      if (index < 0 || index >= arr.length) {
        return new FieldError(field, `list item #${index + 1}: out of range`);
      }
      const err = checkListItem(field, index, item);
      if (!err) {
        arr[index] = listItemToLocal(field, item);
      }
      return err;
    },
    add(...items) {
      let err: FieldError | undefined;
      for (let i = 0; i < items.length && !err; i++) {
        err = checkListItem(field, arr.length + i, items[i]);
      }
      if (!err) {
        for (const item of items) {
          arr.push(listItemToLocal(field, item));
        }
      }
      return err;
    },
    clear() {
      arr.splice(0, arr.length);
    },
    [Symbol.iterator]() {
      return this.values();
    },
    keys() {
      return arr.keys();
    },
    *values() {
      for (const item of arr) {
        yield listItemToReflect(field, item) as V;
      }
    },
    *entries() {
      for (let i = 0; i < arr.length; i++) {
        yield [i, listItemToReflect(field, arr[i]) as V];
      }
    },
  };
}

export function reflectMap<K extends MapEntryKey, V>(
  field: DescField & { fieldKind: "map" },
  unsafeInput?: Record<string, unknown>,
): ReflectMap<K, V> {
  const obj = unsafeInput ?? {};
  return {
    [unsafeLocal]: obj,
    field() {
      return field;
    },
    set(key, value) {
      const err = checkMapEntry(field, key, value);
      if (!err) {
        obj[mapKeyToLocal(key)] = mapValueToLocal(field, value);
      }
      return err;
    },
    delete(key) {
      const k = mapKeyToLocal(key);
      const has = Object.prototype.hasOwnProperty.call(obj, k);
      if (has) {
        delete obj[k];
      }
      return has;
    },
    clear() {
      for (const key of Object.keys(obj)) {
        delete obj[key];
      }
    },
    get(key) {
      let val = obj[mapKeyToLocal(key)];
      if (val !== undefined) {
        val = mapValueToReflect(field, val);
      }
      return val as V | undefined;
    },
    has(key) {
      return Object.prototype.hasOwnProperty.call(obj, mapKeyToLocal(key));
    },
    *keys() {
      for (const objKey of Object.keys(obj)) {
        yield mapKeyToReflect(objKey, field.mapKey) as K;
      }
    },
    *entries() {
      for (const objEntry of Object.entries(obj)) {
        yield [
          mapKeyToReflect(objEntry[0], field.mapKey) as K,
          mapValueToReflect(field, objEntry[1]) as V,
        ];
      }
    },
    [Symbol.iterator]() {
      return this.entries();
    },
    get size() {
      return Object.keys(obj).length;
    },
    *values() {
      for (const val of Object.values(obj)) {
        yield mapValueToReflect(field, val) as V;
      }
    },
    forEach(callbackfn, thisArg) {
      for (const mapEntry of this.entries()) {
        callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
      }
    },
  };
}

function listItemToLocal(
  field: DescField & { fieldKind: "list" },
  value: unknown,
): unknown {
  if (isReflectMessage(value)) {
    return value.message;
  }
  return longToLocal(field, value);
}

function listItemToReflect(
  field: DescField & { fieldKind: "list" },
  value: unknown,
): unknown {
  if (field.listKind == "message") {
    return reflect(field.message, value as Message);
  }
  return longToReflect(field, value);
}

function mapValueToLocal(
  field: DescField & { fieldKind: "map" },
  value: unknown,
) {
  if (isReflectMessage(value)) {
    return value.message;
  }
  return longToLocal(field, value);
}

function mapValueToReflect(
  field: DescField & { fieldKind: "map" },
  value: unknown,
): unknown {
  if (field.mapKind == "message") {
    return reflect(field.message, value as Message);
  }
  return value;
}

function mapKeyToLocal(key: unknown): string | number {
  return typeof key == "string" || typeof key == "number" ? key : String(key);
}

/**
 * Converts a map key (any scalar value except float, double, or bytes) from its
 * representation in a message (string or number, the only possible object key
 * types) to the closest possible type in ECMAScript.
 */
function mapKeyToReflect(
  key: string,
  type: Exclude<
    ScalarType,
    ScalarType.FLOAT | ScalarType.DOUBLE | ScalarType.BYTES
  >,
) {
  switch (type) {
    case ScalarType.STRING:
      return key;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32: {
      const n = Number.parseInt(key);
      if (Number.isFinite(n)) {
        return n;
      }
      break;
    }
    case ScalarType.BOOL:
      switch (key) {
        case "true":
          return true;
        case "false":
          return false;
      }
      break;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      try {
        return protoInt64.uParse(key);
      } catch {
        //
      }
      break;
    default:
      // INT64, SFIXED64, SINT64
      try {
        return protoInt64.parse(key);
      } catch {
        //
      }
      break;
  }
  return key;
}

function longToReflect(field: DescField, value: unknown): unknown {
  if (field.scalar !== undefined) {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (field.scalar) {
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        if (
          "longType" in field &&
          field.longType == LongType.STRING &&
          typeof value == "string"
        ) {
          value = protoInt64.parse(value);
        }
        break;
      case ScalarType.FIXED64:
      case ScalarType.UINT64:
        if (
          "longType" in field &&
          field.longType == LongType.STRING &&
          typeof value == "string"
        ) {
          value = protoInt64.uParse(value);
        }
        break;
    }
  }
  return value;
}

function longToLocal(field: DescField, value: unknown) {
  if (field.scalar !== undefined) {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (field.scalar) {
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        if ("longType" in field && field.longType == LongType.STRING) {
          value = String(value);
        } else if (typeof value == "string" || typeof value == "number") {
          value = protoInt64.parse(value);
        }
        break;
      case ScalarType.FIXED64:
      case ScalarType.UINT64:
        if ("longType" in field && field.longType == LongType.STRING) {
          value = String(value);
        } else if (typeof value == "string" || typeof value == "number") {
          value = protoInt64.uParse(value);
        }
        break;
    }
  }
  return value;
}
