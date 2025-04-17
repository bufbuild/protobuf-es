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
  type DescField,
  type DescMessage,
  type DescOneof,
  ScalarType,
} from "../descriptors.js";
import type { Message, MessageShape, UnknownField } from "../types.js";
import { checkField, checkListItem, checkMapEntry } from "./reflect-check.js";
import { FieldError } from "./error.js";
import type {
  ReflectMessageGet,
  ReflectList,
  ReflectMap,
  ReflectMessage,
} from "./reflect-types.js";
import {
  unsafeClear,
  unsafeGet,
  unsafeIsSet,
  unsafeLocal,
  unsafeOneofCase,
  unsafeSet,
} from "./unsafe.js";
import { create } from "../create.js";
import { isWrapper, isWrapperDesc } from "../wkt/wrappers.js";
import { scalarZeroValue } from "./scalar.js";
import { protoInt64 } from "../proto-int64.js";
import {
  isObject,
  isReflectList,
  isReflectMap,
  isReflectMessage,
} from "./guard.js";
import type {
  ListValue,
  NullValue,
  Struct,
  Value,
} from "../wkt/gen/google/protobuf/struct_pb.js";
import type { JsonObject, JsonValue } from "../json-value.js";

/**
 * Create a ReflectMessage.
 */
export function reflect<Desc extends DescMessage>(
  messageDesc: Desc,
  message?: MessageShape<Desc>,
  /**
   * By default, field values are validated when setting them. For example,
   * a value for an uint32 field must be a ECMAScript Number >= 0.
   *
   * When field values are trusted, performance can be improved by disabling
   * checks.
   */
  check = true,
): ReflectMessage {
  return new ReflectMessageImpl(messageDesc, message, check);
}

class ReflectMessageImpl implements ReflectMessage {
  readonly desc: DescMessage;
  readonly fields: readonly DescField[];
  get sortedFields() {
    return (
      this._sortedFields ??
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      (this._sortedFields = this.desc.fields
        .concat()
        .sort((a, b) => a.number - b.number))
    );
  }
  readonly members: readonly (DescField | DescOneof)[];
  readonly message: Message;
  readonly oneofs: readonly DescOneof[];
  readonly [unsafeLocal]: Message;
  private readonly check: boolean;
  private _fieldsByNumber: Map<number, DescField> | undefined;
  private _sortedFields: DescField[] | undefined;
  private lists = new Map<DescField, ReflectList>();
  private maps = new Map<DescField, ReflectMap>();

  constructor(messageDesc: DescMessage, message?: Message, check = true) {
    this.check = check;
    this.desc = messageDesc;
    this.message = this[unsafeLocal] = message ?? create(messageDesc);
    this.fields = messageDesc.fields;
    this.oneofs = messageDesc.oneofs;
    this.members = messageDesc.members;
  }

  findNumber(number: number): DescField | undefined {
    if (!this._fieldsByNumber) {
      this._fieldsByNumber = new Map<number, DescField>(
        this.desc.fields.map((f) => [f.number, f]),
      );
    }
    return this._fieldsByNumber.get(number);
  }

  oneofCase(oneof: DescOneof): DescField | undefined {
    assertOwn(this.message, oneof);
    return unsafeOneofCase(this.message, oneof);
  }

  isSet(field: DescField): boolean {
    assertOwn(this.message, field);
    return unsafeIsSet(this.message, field);
  }

  clear(field: DescField): void {
    assertOwn(this.message, field);
    unsafeClear(this.message, field);
  }

  get<Field extends DescField>(field: Field): ReflectMessageGet<Field> {
    assertOwn(this.message, field);
    const value = unsafeGet(this.message, field);
    switch (field.fieldKind) {
      case "list":
        // eslint-disable-next-line no-case-declarations
        let list = this.lists.get(field);
        if (!list || list[unsafeLocal] !== value) {
          this.lists.set(
            field,
            // biome-ignore lint/suspicious/noAssignInExpressions: no
            (list = new ReflectListImpl(field, value as unknown[], this.check)),
          );
        }
        return list as ReflectMessageGet<Field>;
      case "map":
        let map = this.maps.get(field);
        if (!map || map[unsafeLocal] !== value) {
          this.maps.set(
            field,
            // biome-ignore lint/suspicious/noAssignInExpressions: no
            (map = new ReflectMapImpl(
              field,
              value as Record<string, unknown>,
              this.check,
            )),
          );
        }
        return map as ReflectMessageGet<Field>;
      case "message":
        return messageToReflect(
          field,
          value,
          this.check,
        ) as ReflectMessageGet<Field>;
      case "scalar":
        return (
          value === undefined
            ? scalarZeroValue(field.scalar, false)
            : longToReflect(field, value)
        ) as ReflectMessageGet<Field>;
      case "enum":
        return (value ??
          field.enum.values[0].number) as ReflectMessageGet<Field>;
    }
  }

  set<Field extends DescField>(field: Field, value: unknown): void {
    assertOwn(this.message, field);
    if (this.check) {
      const err = checkField(field, value);
      if (err) {
        throw err;
      }
    }
    let local: unknown;
    if (field.fieldKind == "message") {
      local = messageToLocal(field, value);
    } else if (isReflectMap(value) || isReflectList(value)) {
      local = value[unsafeLocal];
    } else {
      local = longToLocal(field, value);
    }
    unsafeSet(this.message, field, local);
  }

  getUnknown(): UnknownField[] | undefined {
    return this.message.$unknown;
  }

  setUnknown(value: UnknownField[]): void {
    this.message.$unknown = value;
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

/**
 * Create a ReflectList.
 */
export function reflectList<V>(
  field: DescField & { fieldKind: "list" },
  unsafeInput?: unknown[],
  /**
   * By default, field values are validated when setting them. For example,
   * a value for an uint32 field must be a ECMAScript Number >= 0.
   *
   * When field values are trusted, performance can be improved by disabling
   * checks.
   */
  check = true,
): ReflectList<V> {
  return new ReflectListImpl<V>(field, unsafeInput ?? [], check);
}

class ReflectListImpl<V> implements ReflectList<V> {
  field(): DescField & { fieldKind: "list" } {
    return this._field;
  }
  get size(): number {
    return this._arr.length;
  }
  [unsafeLocal]: unknown[];
  private _arr: unknown[];
  private _field: DescField & { fieldKind: "list" };
  private check: boolean;

  constructor(
    field: DescField & { fieldKind: "list" },
    unsafeInput: unknown[],
    check: boolean,
  ) {
    this._field = field;
    this._arr = this[unsafeLocal] = unsafeInput;
    this.check = check;
  }

  get(index: number) {
    const item = this._arr[index];
    return item === undefined
      ? undefined
      : (listItemToReflect(this._field, item, this.check) as V);
  }
  set(index: number, item: V) {
    if (index < 0 || index >= this._arr.length) {
      throw new FieldError(
        this._field,
        `list item #${index + 1}: out of range`,
      );
    }
    if (this.check) {
      const err = checkListItem(this._field, index, item);
      if (err) {
        throw err;
      }
    }
    this._arr[index] = listItemToLocal(this._field, item);
  }
  add(item: V) {
    if (this.check) {
      const err = checkListItem(this._field, this._arr.length, item);
      if (err) {
        throw err;
      }
    }
    this._arr.push(listItemToLocal(this._field, item));
    return undefined;
  }
  clear() {
    this._arr.splice(0, this._arr.length);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  keys() {
    return this._arr.keys();
  }
  *values() {
    for (const item of this._arr) {
      yield listItemToReflect(this._field, item, this.check) as V;
    }
  }
  *entries(): IterableIterator<[number, V]> {
    for (let i = 0; i < this._arr.length; i++) {
      yield [i, listItemToReflect(this._field, this._arr[i], this.check) as V];
    }
  }
}

/**
 * Create a ReflectMap.
 */
export function reflectMap<K = unknown, V = unknown>(
  field: DescField & { fieldKind: "map" },
  unsafeInput?: Record<string, unknown>,
  /**
   * By default, field values are validated when setting them. For example,
   * a value for an uint32 field must be a ECMAScript Number >= 0.
   *
   * When field values are trusted, performance can be improved by disabling
   * checks.
   */
  check = true,
): ReflectMap<K, V> {
  return new ReflectMapImpl(field, unsafeInput, check);
}

class ReflectMapImpl<K, V> implements ReflectMap<K, V> {
  private readonly check: boolean;
  private readonly _field: DescField & { fieldKind: "map" };
  [unsafeLocal]: Record<string, unknown>;
  private readonly obj: Record<string, unknown>;

  constructor(
    field: DescField & { fieldKind: "map" },
    unsafeInput?: Record<string, unknown>,
    check = true,
  ) {
    this.obj = this[unsafeLocal] = unsafeInput ?? {};
    this.check = check;
    this._field = field;
  }
  field() {
    return this._field;
  }
  set(key: K, value: V) {
    if (this.check) {
      const err = checkMapEntry(this._field, key, value);
      if (err) {
        throw err;
      }
    }
    this.obj[mapKeyToLocal(key)] = mapValueToLocal(this._field, value);
    return this;
  }
  delete(key: K) {
    const k = mapKeyToLocal(key);
    const has = Object.prototype.hasOwnProperty.call(this.obj, k);
    if (has) {
      delete this.obj[k];
    }
    return has;
  }
  clear() {
    for (const key of Object.keys(this.obj)) {
      delete this.obj[key];
    }
  }
  get(key: K) {
    let val = this.obj[mapKeyToLocal(key)];
    if (val !== undefined) {
      val = mapValueToReflect(this._field, val, this.check);
    }
    return val as V | undefined;
  }
  has(key: K) {
    return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal(key));
  }
  *keys(): MapIterator<K> {
    for (const objKey of Object.keys(this.obj)) {
      yield mapKeyToReflect(objKey, this._field.mapKey) as K;
    }
  }
  *entries(): MapIterator<[K, V]> {
    for (const objEntry of Object.entries(this.obj)) {
      yield [
        mapKeyToReflect(objEntry[0], this._field.mapKey) as K,
        mapValueToReflect(this._field, objEntry[1], this.check) as V,
      ];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values(): MapIterator<V> {
    for (const val of Object.values(this.obj)) {
      yield mapValueToReflect(this._field, val, this.check) as V;
    }
  }
  forEach(
    callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void,
    thisArg?: unknown,
  ) {
    for (const mapEntry of this.entries()) {
      callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
    }
  }
}

function messageToLocal(
  field: DescField & { message: DescMessage },
  value: unknown,
) {
  if (!isReflectMessage(value)) {
    return value;
  }
  if (
    isWrapper(value.message) &&
    !field.oneof &&
    field.fieldKind == "message"
  ) {
    // Types from google/protobuf/wrappers.proto are unwrapped when used in
    // a singular field that is not part of a oneof group.
    return value.message.value;
  }
  if (
    value.desc.typeName == "google.protobuf.Struct" &&
    field.parent.typeName != "google.protobuf.Value"
  ) {
    // google.protobuf.Struct is represented with JsonObject when used in a
    // field, except when used in google.protobuf.Value.
    return wktStructToLocal(value.message as Struct);
  }
  return value.message;
}

function messageToReflect(
  field: DescField & { message: DescMessage },
  value: unknown,
  check: boolean,
) {
  if (value !== undefined) {
    if (
      isWrapperDesc(field.message) &&
      !field.oneof &&
      field.fieldKind == "message"
    ) {
      // Types from google/protobuf/wrappers.proto are unwrapped when used in
      // a singular field that is not part of a oneof group.
      value = {
        $typeName: field.message.typeName,
        value: longToReflect(field.message.fields[0], value),
      } satisfies Message & { value: unknown };
    } else if (
      field.message.typeName == "google.protobuf.Struct" &&
      field.parent.typeName != "google.protobuf.Value" &&
      isObject(value)
    ) {
      // google.protobuf.Struct is represented with JsonObject when used in a
      // field, except when used in google.protobuf.Value.
      value = wktStructToReflect(value as JsonObject);
    }
  }
  return new ReflectMessageImpl(
    field.message,
    value as Message | undefined,
    check,
  );
}

function listItemToLocal(
  field: DescField & { fieldKind: "list" },
  value: unknown,
): unknown {
  if (field.listKind == "message") {
    return messageToLocal(field, value);
  }
  return longToLocal(field, value);
}

function listItemToReflect(
  field: DescField & { fieldKind: "list" },
  value: unknown,
  check: boolean,
): unknown {
  if (field.listKind == "message") {
    return messageToReflect(field, value, check);
  }
  return longToReflect(field, value);
}

function mapValueToLocal(
  field: DescField & { fieldKind: "map" },
  value: unknown,
) {
  if (field.mapKind == "message") {
    return messageToLocal(field, value);
  }
  return longToLocal(field, value);
}

function mapValueToReflect(
  field: DescField & { fieldKind: "map" },
  value: unknown,
  check: boolean,
): unknown {
  if (field.mapKind == "message") {
    return messageToReflect(field, value, check);
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
  switch (field.scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (
        "longAsString" in field &&
        field.longAsString &&
        typeof value == "string"
      ) {
        value = protoInt64.parse(value);
      }
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (
        "longAsString" in field &&
        field.longAsString &&
        typeof value == "string"
      ) {
        value = protoInt64.uParse(value);
      }
      break;
  }
  return value;
}

function longToLocal(field: DescField, value: unknown) {
  switch (field.scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if ("longAsString" in field && field.longAsString) {
        value = String(value);
      } else if (typeof value == "string" || typeof value == "number") {
        value = protoInt64.parse(value);
      }
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if ("longAsString" in field && field.longAsString) {
        value = String(value);
      } else if (typeof value == "string" || typeof value == "number") {
        value = protoInt64.uParse(value);
      }
      break;
  }
  return value;
}

function wktStructToReflect(json: JsonValue): Struct {
  const struct: Struct = {
    $typeName: "google.protobuf.Struct",
    fields: {},
  };
  if (isObject(json)) {
    for (const [k, v] of Object.entries(json)) {
      struct.fields[k] = wktValueToReflect(v);
    }
  }
  return struct;
}

function wktStructToLocal(val: Struct) {
  const json: JsonObject = {};
  for (const [k, v] of Object.entries(val.fields)) {
    json[k] = wktValueToLocal(v);
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
        const nullValue: NullValue.NULL_VALUE = 0;
        value.kind = { case: "nullValue", value: nullValue };
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
