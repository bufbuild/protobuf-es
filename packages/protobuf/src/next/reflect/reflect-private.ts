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

import { Edition } from "../../google/protobuf/descriptor_pb.js";
import type { DescField, DescOneof } from "../../descriptor-set.js";
import {
  isScalarZeroValue,
  LongType,
  ScalarType,
  scalarZeroValue,
} from "./scalar.js";
import type { ScalarValue } from "./scalar.js";
import type { Message } from "../types.js";
import { localName } from "./names.js";
import { protoInt64 } from "../../proto-int64.js";
import { isWktWrapper, isWktWrapperDesc } from "./wkt.js";
import { isMessage } from "../is-message.js";
import { create } from "../create.js";

export function getOneofCasePrivate(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  oneof: DescOneof,
) {
  const c = (target[localName(oneof)] as anyOneof).case;
  if (c === undefined) {
    return c;
  }
  return oneof.fields.find((f) => localName(f) === c);
}

export function isFieldSetPrivate(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  field: DescField,
) {
  const name = localName(field);
  if (field.oneof) {
    return target[localName(field.oneof)].case === name; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
  switch (field.fieldKind) {
    case "enum":
    case "scalar":
      if (field.parent.file.edition == Edition.EDITION_PROTO2) {
        // explicit presence
        return (
          Object.prototype.hasOwnProperty.call(target, name) &&
          target[name] !== undefined
        );
      }
      if (field.optional) {
        return target[name] !== undefined;
      }
      // implicit presence
      if (field.fieldKind == "enum") {
        return target[name] !== field.enum.values[0].number;
      }
      return !isScalarZeroValue(field.scalar, target[name]);
    case "message":
      return target[name] !== undefined;
    case "list":
      return (target[name] as unknown[]).length > 0;
    case "map":
      return Object.keys(target[name]).length > 0; // eslint-disable-line @typescript-eslint/no-unsafe-argument
  }
}

type anyOneof = {
  case: string | undefined;
  value?: Message | ScalarValue;
};

export function convertToReflect(field: DescField, value: unknown): unknown {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (field.fieldKind) {
    case "scalar":
      value = convertInt64ToReflect(field.fieldKind, field.scalar, value);
      break;
    case "message":
      if (
        !field.oneof &&
        value !== undefined &&
        isWktWrapperDesc(field.message)
      ) {
        const wrapper = create(field.message) as unknown as { value: unknown };
        wrapper.value = value;
        value = wrapper;
      }
      break;
    case "list":
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      switch (field.listKind) {
        case "scalar":
          value = convertInt64ToReflect(field.fieldKind, field.scalar, value);
          break;
      }
      break;
  }
  return value;
}

function convertInt64ToReflect(
  fieldKind: "scalar" | "list",
  scalar: ScalarType,
  value: unknown,
) {
  if (value === undefined) {
    return value;
  }
  let fn: (arg: string | bigint | number) => bigint;
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      fn = int64ToReflect;
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      fn = uInt64ToReflect;
      break;
    default:
      return value;
  }
  if (fieldKind == "scalar") {
    return fn(value as string | bigint | number);
  }
  return (value as string[] | bigint[] | number[]).map(fn);
}

function uInt64ToReflect(value: string | bigint | number): bigint {
  if (typeof value != "bigint") {
    return protoInt64.uParse(value);
  }
  return value;
}

function int64ToReflect(value: string | bigint | number): bigint {
  if (typeof value != "bigint") {
    return protoInt64.parse(value);
  }
  return value;
}

export function convertToLocal(field: DescField, value: unknown): unknown {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (field.fieldKind) {
    case "scalar":
      value = convertInt64ToLocal(
        field.fieldKind,
        field.scalar,
        field.longType,
        value,
      );
      break;
    case "message":
      if (!field.oneof && isMessage(value) && isWktWrapper(value)) {
        value = value.value;
      }
      break;
    case "list":
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      switch (field.listKind) {
        case "scalar":
          value = convertInt64ToLocal(
            field.fieldKind,
            field.scalar,
            field.longType,
            value,
          );
          break;
      }
      break;
  }
  return value;
}

function convertInt64ToLocal(
  fieldKind: "scalar" | "list",
  scalar: ScalarType,
  long: LongType,
  value: unknown,
) {
  let fn: (arg: string | bigint | number) => string | bigint;
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      fn = long == LongType.STRING ? String : int64ToLocal;
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      fn = long == LongType.STRING ? String : uInt64ToLocal;
      break;
    default:
      return value;
  }
  if (fieldKind == "scalar") {
    return fn(value as string | bigint | number);
  }
  return (value as string[] | bigint[] | number[]).map(fn);
}

function uInt64ToLocal(value: string | bigint | number): string | bigint {
  if (typeof value != "bigint") {
    return protoInt64.uParse(value);
  }
  return value;
}

function int64ToLocal(value: string | bigint | number): string | bigint {
  if (typeof value != "bigint") {
    return protoInt64.parse(value);
  }
  return value;
}

// TODO map is a Map in reflect
export function getFieldPrivate(
  target: Record<string, unknown>,
  field: DescField,
): unknown {
  const name = localName(field);
  if (field.oneof) {
    const oneof = target[localName(field.oneof)] as anyOneof;
    if (oneof.case === name) {
      return oneof.value;
    }
    return undefined;
  }
  return target[name];
}

// TODO map is a Map in reflect
export function setFieldPrivate(
  target: Record<string, unknown>,
  field: DescField,
  value: unknown,
) {
  const name = localName(field);
  if (field.oneof) {
    target[localName(field.oneof)] = {
      case: name,
      value: value,
    };
  } else {
    target[name] = value;
  }
}

/**
 * Resets the field, so that isFieldSetPrivate() will return false.
 */
export function clearFieldPrivate(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  field: DescField,
) {
  // TODO this can be cleaned up. see createZeroMessage from create.ts

  const name = localName(field);
  if (field.oneof) {
    const oneofLocalName = localName(field.oneof);
    if ((target[oneofLocalName] as anyOneof).case === name) {
      target[oneofLocalName] = { case: undefined };
    }
  } else {
    switch (field.fieldKind) {
      case "map":
        target[name] = {};
        break;
      case "list":
        target[name] = [];
        break;
      case "enum":
        if (
          !field.optional &&
          field.parent.file.edition == Edition.EDITION_PROTO3
        ) {
          target[name] = field.enum.values[0].number;
        } else {
          delete target[name];
        }
        break;
      case "scalar":
        if (
          !field.optional &&
          field.parent.file.edition == Edition.EDITION_PROTO3
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          target[name] = scalarZeroValue(field.scalar, field.longType);
        } else {
          delete target[name];
        }
        break;
      case "message":
        target[name] = undefined;
        break;
    }
  }
}

export function addListItemPrivate(
  target: Record<string, unknown>,
  field: DescField & { fieldKind: "list" },
  value: unknown,
) {
  const name = localName(field);
  (target[name] as unknown[]).push(value);
}

// TODO map is a Map in reflect
export function setMapEntryPrivate(
  target: Record<string, unknown>,
  field: DescField & { fieldKind: "map" },
  key: string | number | bigint | boolean,
  value: unknown,
) {
  const name = localName(field);
  (target[name] as Record<string | number, unknown>)[
    typeof key != "number" && typeof key != "string" ? key.toString() : key
  ] = value;
}
