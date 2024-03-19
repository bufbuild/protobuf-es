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
import type { ScalarValue, LongType } from "./scalar.js";
import type { Message } from "../types.js";
import {
  addListItemPrivate,
  clearFieldPrivate,
  convertToLocal,
  convertToReflect,
  getFieldPrivate,
  getOneofCasePrivate,
  isFieldSetPrivate,
  setFieldPrivate,
  setMapEntryPrivate,
} from "./reflect-private.js";
import {
  checkNewListItem,
  checkNewMapEntry,
  checkReflectValue,
} from "./reflect-check.js";
import { FieldError } from "./error.js";
import type { MapEntryKey, ReflectMap } from "./reflect-map.js";
import { reflectMap } from "./reflect-map.js";
import type { WireType } from "../../binary-encoding.js";

export interface ReflectMessage {
  readonly kind: "reflect_message";
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

  get<Field extends DescField>(field: Field): ReflectValue<Field>;

  set<Field extends DescField>(
    field: Field,
    value: ReflectValue<Field>,
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

  getUnknown():
    | { no: number; wireType: WireType; data: Uint8Array }[]
    | undefined;

  setUnknown(
    value: { no: number; wireType: WireType; data: Uint8Array }[],
  ): void;
}

// prettier-ignore
type ReflectValue<Field extends DescField = DescField> = (
  Field extends { fieldKind: "map"}      ? (
    Field extends { mapKind: "message" } ? ReflectMap<MapEntryKey, Message> :
    Field extends { mapKind: "enum"}     ? ReflectMap<MapEntryKey, enumVal> :
    Field extends { mapKind: "scalar"; scalar: infer T } ? ReflectMap<MapEntryKey, ScalarValue<T, LongType.BIGINT>> :
    never
  ) :
  Field extends { fieldKind: "list" } ? (
    Field extends { listKind: "message"; } ? ReadonlyArray<Message> :
    Field extends { listKind: "enum"; }    ? ReadonlyArray<number> :
    Field extends { listKind: "scalar"; scalar: infer T } ? ReadonlyArray<ScalarValue<T>> :
    never
  ) :
  Field extends { fieldKind: "enum"}    ? number | undefined :
  Field extends { fieldKind: "message"} ? Message | undefined :
  Field extends { fieldKind: "scalar"; scalar: infer T } ? ScalarValue<T> :
  never
);

// prettier-ignore
type NewListItem<Field extends DescField & { fieldKind: "list" }> = (
  Field extends { scalar: infer T } ? ScalarValue<T> :
  Field extends { listKind: "enum" } ? enumVal :
  Field extends { listKind: "message" } ? Message :
  never
);

// prettier-ignore
type NewMapEntryValue<Field extends DescField & { fieldKind: "map" }> = (
  Field extends { mapKind: "enum" } ? enumVal :
  Field extends { mapKind: "message" } ? Message :
  Field extends { scalar: infer T } ? ScalarValue<T, LongType.BIGINT> :
  never
);

type enumVal = number;

export function reflect(
  message: Message,
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
  const desc = message.$desc;
  const check = opt?.disableFieldValueCheck !== true;
  let jsonNames: Map<string, DescField> | undefined;
  let fieldsByNumber: Map<number, DescField> | undefined;
  let sortedFields: DescField[] | undefined;
  return {
    kind: "reflect_message",
    message,
    desc: desc,
    fields: desc.fields,
    oneofs: desc.oneofs,
    members: desc.members,

    get sortedFields() {
      return (
        sortedFields ??
        (sortedFields = desc.fields
          .concat()
          .sort((a, b) => a.number - b.number))
      );
    },

    findJsonName(jsonName) {
      if (!jsonNames) {
        jsonNames = new Map<string, DescField>();
        for (const f of desc.fields) {
          jsonNames.set(f.jsonName ?? f.proto.jsonName, f).set(f.name, f);
        }
      }
      return jsonNames.get(jsonName);
    },

    findNumber(number) {
      if (!fieldsByNumber) {
        fieldsByNumber = new Map<number, DescField>(
          desc.fields.map((f) => [f.number, f]),
        );
      }
      return fieldsByNumber.get(number);
    },

    oneofCase(oneof) {
      assertOwn(message, oneof);
      return getOneofCasePrivate(message, oneof);
    },

    isSet(field) {
      assertOwn(message, field);
      return isFieldSetPrivate(message, field);
    },

    clear(field: DescField) {
      assertOwn(message, field);
      clearFieldPrivate(message, field);
    },

    get(field) {
      assertOwn(message, field);
      switch (field.fieldKind) {
        case "map":
          // TODO map fields
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
          return reflectMap(message, field) as any;
        default:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return convertToReflect(
            field,
            getFieldPrivate(message, field),
          ) as any; // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
      }
    },

    set(field, value) {
      // TODO map fields
      assertOwn(message, field);
      if (check) {
        const err = checkReflectValue(field, value);
        if (err) {
          return err;
        }
      }
      setFieldPrivate(message, field, convertToLocal(field, value));
      return undefined;
    },

    addListItem(field, value) {
      assertOwn(message, field);
      // TODO assert that field is fieldKind: "list"
      // TODO convert 64-bit integers
      if (check) {
        const list = getFieldPrivate(message, field) as unknown[];
        const err = checkNewListItem(field, list.length, value);
        if (err) {
          return err;
        }
      }
      addListItemPrivate(message, field, value);
      return undefined;
    },

    setMapEntry(field, key, value) {
      assertOwn(message, field);
      // TODO assert that field is fieldKind: "map"
      // TODO convert map key
      if (check) {
        const err = checkNewMapEntry(field, key, value);
        if (err) {
          return err;
        }
      }
      setMapEntryPrivate(message, field, key, value);
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

function assertOwn(owner: Message, member: DescField | DescOneof) {
  if (member.parent.typeName !== owner.$typeName) {
    throw new FieldError(
      member,
      `cannot use ${member.toString()} with message ${owner.$typeName}`,
      "ForeignFieldError",
    );
  }
}
