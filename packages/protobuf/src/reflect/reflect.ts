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

import {
  type DescField,
  type DescMessage,
  type DescOneof,
  LongType,
  ScalarType,
} from "../descriptors.js";
import type { Message, MessageShape, UnknownField } from "../types.js";
import { checkField, checkListItem, checkMapEntry } from "./reflect-check.js";
import { FieldError } from "./error.js";
import type {
  MapEntryKey,
  ReflectAddListItemValue,
  ReflectSetMapEntryValue,
  ReflectGetValue,
  ReflectList,
  ReflectMap,
  ReflectMessage,
  ReflectSetValue,
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
import { isWrapper, isWrapperDesc } from "../wkt/wrappers.js";
import { scalarZeroValue } from "./scalar.js";
import { protoInt64 } from "../proto-int64.js";
import { isReflectList, isReflectMap, isReflectMessage } from "./guard.js";

/**
 * Create a ReflectMessage.
 */
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
  return new ReflectMessageImpl<Desc>(
    messageDesc,
    message,
    opt?.disableFieldValueCheck !== true,
  );
}

class ReflectMessageImpl<Desc extends DescMessage> implements ReflectMessage {
  readonly desc: DescMessage;
  readonly fields: readonly DescField[];
  get sortedFields() {
    return (
      this._sortedFields ??
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

  constructor(
    messageDesc: Desc,
    message?: MessageShape<Desc>,
    // TODO either remove this option, or support it in reflect-list and reflect-map as well
    check = true,
  ) {
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

  get<Field extends DescField>(field: Field): ReflectGetValue<Field> {
    assertOwn(this.message, field);
    let value = unsafeGet(this.message, field);
    switch (field.fieldKind) {
      case "list":
        return new ReflectListImpl(
          field,
          value as unknown[],
          this.check,
        ) as ReflectGetValue<Field>;
      case "map":
        // TODO fix types
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return reflectMap(
          field,
          value as Record<string, unknown>,
          this.check,
        ) as any; // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
      case "message":
        if (
          value !== undefined &&
          !field.oneof &&
          isWrapperDesc(field.message)
        ) {
          value = {
            $typeName: field.message.typeName,
            value: longToReflect(field.message.fields[0], value),
          } satisfies Message & { value: unknown };
        }
        return new ReflectMessageImpl(
          field.message,
          value as Message | undefined,
          this.check,
        ) as ReflectGetValue<Field>;
      case "scalar":
        return (
          value === undefined
            ? scalarZeroValue(field.scalar, LongType.BIGINT)
            : longToReflect(field, value)
        ) as ReflectGetValue<Field>;
      case "enum":
        return (value ?? field.enum.values[0].number) as ReflectGetValue<Field>;
    }
  }

  set<Field extends DescField>(
    field: Field,
    value: ReflectSetValue<Field>,
  ): FieldError | undefined {
    assertOwn(this.message, field);
    if (this.check) {
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
      local = !field.oneof && isWrapper(msg) ? msg.value : msg;
    } else {
      local = longToLocal(field, value);
    }
    unsafeSet(this.message, field, local);
    return undefined;
  }

  addListItem<
    Field extends DescField & {
      fieldKind: "list";
    },
  >(
    field: Field,
    value: ReflectAddListItemValue<Field>,
  ): FieldError | undefined {
    assertOwn(this.message, field);
    assertKind(field, "list");
    if (this.check) {
      if (checkListItem(field, 0, value)) {
        const arr = unsafeGet(this.message, field) as unknown[];
        return checkListItem(field, arr.length, value);
      }
    }
    unsafeAddListItem(this.message, field, listItemToLocal(field, value));
    return undefined;
  }

  setMapEntry<
    Field extends DescField & {
      fieldKind: "map";
    },
  >(
    field: Field,
    key: MapEntryKey,
    value: ReflectSetMapEntryValue<Field>,
  ): FieldError | undefined {
    assertOwn(this.message, field);
    assertKind(field, "map");
    if (this.check) {
      const err = checkMapEntry(field, key, value);
      if (err) {
        return err;
      }
    }
    unsafeSetMapEntry(
      this.message,
      field,
      mapKeyToLocal(key),
      mapValueToLocal(field, value),
    );
    return undefined;
  }

  getUnknown(): UnknownField[] | undefined {
    return this.message.$unknown;
  }

  setUnknown(value: UnknownField[]): void {
    this.message.$unknown = value;
  }
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

/**
 * Create a ReflectList.
 */
export function reflectList<V>(
  field: DescField & { fieldKind: "list" },
  unsafeInput?: unknown[],
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
      return new FieldError(
        this._field,
        `list item #${index + 1}: out of range`,
      );
    }
    if (this.check) {
      const err = checkListItem(this._field, index, item);
      if (err) {
        return err;
      }
    }
    this._arr[index] = listItemToLocal(this._field, item);
    return undefined;
  }
  add(...items: V[]) {
    if (this.check) {
      for (let i = 0; i < items.length; i++) {
        const err = checkListItem(this._field, this._arr.length + i, items[i]);
        if (err) {
          return err;
        }
      }
    }
    for (const item of items) {
      this._arr.push(listItemToLocal(this._field, item));
    }
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
export function reflectMap<K extends MapEntryKey, V>(
  field: DescField & { fieldKind: "map" },
  unsafeInput?: Record<string, unknown>,
  check = true,
): ReflectMap<K, V> {
  return new ReflectMapImpl(field, unsafeInput, check);
}

class ReflectMapImpl<K extends MapEntryKey, V> implements ReflectMap<K, V> {
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
        return err;
      }
    }
    this.obj[mapKeyToLocal(key)] = mapValueToLocal(this._field, value);
    return undefined;
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
  *keys() {
    for (const objKey of Object.keys(this.obj)) {
      yield mapKeyToReflect(objKey, this._field.mapKey) as K;
    }
  }
  *entries(): IterableIterator<[K, V]> {
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
  *values() {
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
  check: boolean,
): unknown {
  if (field.listKind == "message") {
    return new ReflectMessageImpl(field.message, value as Message, check);
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
  check: boolean,
): unknown {
  if (field.mapKind == "message") {
    return new ReflectMessageImpl(field.message, value as Message, check);
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
  return value;
}

function longToLocal(field: DescField, value: unknown) {
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
  return value;
}
