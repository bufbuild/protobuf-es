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

import type { DescField, DescOneof } from "../../descriptor-set.js";
import { localName } from "./names.js";
import type { OneofADT } from "./guard.js";
import { Edition } from "../../google/protobuf/descriptor_pb.js";
import { isScalarZeroValue, scalarZeroValue } from "../../private/scalars.js";

export const unsafeLocal = Symbol.for("reflect unsafe local");

export function unsafeOneofCase(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  oneof: DescOneof,
) {
  const c = (target[localName(oneof)] as OneofADT).case;
  if (c === undefined) {
    return c;
  }
  return oneof.fields.find((f) => localName(f) === c);
}

export function unsafeIsSet(
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

export function unsafeGet(
  target: Record<string, unknown>,
  field: DescField,
): unknown {
  const name = localName(field);
  if (field.oneof) {
    const oneof = target[localName(field.oneof)] as OneofADT;
    if (oneof.case === name) {
      return oneof.value;
    }
    return undefined;
  }
  return target[name];
}

export function unsafeSet(
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
export function unsafeClear(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  field: DescField,
) {
  // TODO this can be cleaned up. see createZeroMessage from create.ts

  const name = localName(field);
  if (field.oneof) {
    const oneofLocalName = localName(field.oneof);
    if ((target[oneofLocalName] as OneofADT).case === name) {
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

export function unsafeAddListItem(
  target: Record<string, unknown>,
  field: DescField & { fieldKind: "list" },
  value: unknown,
) {
  const name = localName(field);
  (target[name] as unknown[]).push(value);
}

export function unsafeSetMapEntry(
  target: Record<string, unknown>,
  field: DescField & { fieldKind: "map" },
  key: string | number,
  value: unknown,
) {
  const name = localName(field);
  (target[name] as Record<string | number, unknown>)[key] = value;
}
