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
import { FieldError } from "./error.js";
import { unsafeLocal } from "./unsafe.js";
import type { Message, UnknownField } from "../types.js";
import type { LongType, ScalarValue } from "../../scalar.js";

export interface ReflectList<V = unknown> extends Iterable<V> {
  field(): DescField & { fieldKind: "list" };

  /**
   * The size of the list.
   */
  readonly size: number;

  /**
   * Retrieves the item at the specified index, or undefined if the index
   * is out of range.
   */
  get(index: number): V | undefined;

  /**
   * Adds an item - or several items - at the end of the list.
   * Returns an error if an item is invalid for this list.
   */
  add(...item: V[]): FieldError | undefined;

  /**
   * Replaces the item at the specified index with the specified item.
   * Returns an error if the index is out of range (index < 0 || index >= size).
   * Returns an error if the item is invalid for this list.
   */
  set(index: number, item: V): FieldError | undefined;

  /**
   * Removes all items from the list.
   */
  clear(): void;

  [Symbol.iterator](): IterableIterator<V>;

  entries(): IterableIterator<[number, V]>;

  keys(): IterableIterator<number>;

  values(): IterableIterator<V>;

  [unsafeLocal]: unknown[];
}

export type MapEntryKey = string | number | bigint | boolean;

export interface ReflectMap<K extends MapEntryKey = MapEntryKey, V = unknown>
  extends ReadonlyMap<K, V> {
  field(): DescField & { fieldKind: "map" };

  /**
   * Removes the entry for the specified key.
   * Returns false if the key is unknown.
   */
  delete(key: K): boolean;

  /**
   * Sets or replaces the item at the specified key with the specified value.
   * Returns an error if the key or value is invalid for this map.
   */
  set(key: K, value: V): FieldError | undefined;

  /**
   * Removes all entries from the map.
   */
  clear(): void;

  [unsafeLocal]: Record<string, unknown>;
}

export interface ReflectMessage {
  readonly message: Message;
  readonly desc: DescMessage;
  readonly fields: readonly DescField[];
  readonly sortedFields: readonly DescField[];
  readonly oneofs: readonly DescOneof[];
  readonly members: readonly (DescField | DescOneof)[];

  // TODO findJsonName() is only needed for parsing JSON. We might want to move it to the JSON parser.
  findJsonName(jsonName: string): DescField | undefined;

  findNumber(number: number): DescField | undefined;

  isSet(field: DescField): boolean;

  clear(field: DescField): void;

  oneofCase(oneof: DescOneof): DescField | undefined;

  get<Field extends DescField>(field: Field): ReflectGetValue<Field>;

  set<Field extends DescField>(
    field: Field,
    value: ReflectSetValue<Field>,
  ): FieldError | undefined;

  addListItem<Field extends DescField & { fieldKind: "list" }>(
    field: Field,
    value: NewListItem<Field>,
  ): FieldError | undefined;

  setMapEntry<Field extends DescField & { fieldKind: "map" }>(
    field: Field,
    key: MapEntryKey,
    value: NewMapEntryValue<Field>,
  ): FieldError | undefined;

  getUnknown(): UnknownField[] | undefined;

  setUnknown(value: UnknownField[]): void;

  [unsafeLocal]: Message;
}

// prettier-ignore
type ReflectGetValue<Field extends DescField = DescField> = (
  Field extends { fieldKind: "map" } ? (
    Field extends { mapKind: "message" } ? ReflectMap<MapEntryKey, ReflectMessage> :
    Field extends { mapKind: "enum" } ? ReflectMap<MapEntryKey, enumVal> :
    Field extends { mapKind: "scalar"; scalar: infer T } ? ReflectMap<MapEntryKey, ScalarValue<T, LongType.BIGINT>> :
    never
  ) :
  Field extends { fieldKind: "list" } ? ReflectList :
  Field extends { fieldKind: "enum" } ? number | undefined :
  Field extends { fieldKind: "message" } ? ReflectMessage :
  Field extends { fieldKind: "scalar"; scalar: infer T } ? ScalarValue<T> | undefined:
  never
);

// prettier-ignore
type ReflectSetValue<Field extends DescField = DescField> = (
  Field extends { fieldKind: "map" } ? ReflectMap :
  Field extends { fieldKind: "list" } ? ReflectList :
  Field extends { fieldKind: "enum" } ? number | undefined :
  Field extends { fieldKind: "message" } ? ReflectMessage :
  Field extends { fieldKind: "scalar"; scalar: infer T } ? ScalarValue<T> | undefined:
  never
);

// prettier-ignore
type NewListItem<Field extends DescField & { fieldKind: "list" }> = (
  Field extends { listKind: "scalar"; scalar: infer T } ? ScalarValue<T> :
  Field extends { listKind: "enum" } ? enumVal :
  Field extends { listKind: "message" } ? ReflectMessage :
  never
);

// prettier-ignore
type NewMapEntryValue<Field extends DescField & { fieldKind: "map" }> = (
  Field extends { mapKind: "enum" } ? enumVal :
  Field extends { mapKind: "message" } ? ReflectMessage :
  Field extends { mapKind: "scalar"; scalar: infer T } ? ScalarValue<T, LongType.BIGINT> :
  never
);

type enumVal = number;
