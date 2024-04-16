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
import { isScalarZeroValue, scalarZeroValue } from "./scalar.js";
import type { FeatureSet_FieldPresence } from "../wkt/gen/google/protobuf/descriptor_pbv2.js";

// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
const IMPLICIT: FeatureSet_FieldPresence.IMPLICIT = 2;

export const unsafeLocal = Symbol.for("reflect unsafe local");

/**
 * Return the selected field of a oneof group.
 *
 * @private
 */
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

/**
 * Returns true if the field is set.
 *
 * @private
 */
export function unsafeIsSet(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  field: DescField,
) {
  const name = localName(field);
  if (field.oneof) {
    return target[localName(field.oneof)].case === name; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
  switch (field.fieldKind) {
    case "message":
      return target[name] !== undefined;
    case "list":
      return (target[name] as unknown[]).length > 0;
    case "map":
      return Object.keys(target[name]).length > 0; // eslint-disable-line @typescript-eslint/no-unsafe-argument
    default:
      if (field.presence == IMPLICIT) {
        if (field.fieldKind == "enum") {
          return target[name] !== field.enum.values[0].number;
        }
        return !isScalarZeroValue(field.scalar, target[name]);
      }
      // EXPLICIT and LEGACY_REQUIRED
      return (
        target[name] !== undefined &&
        Object.prototype.hasOwnProperty.call(target, name)
      );
  }
}

/**
 * Returns true if the field is set, but only for singular fields with explicit
 * presence (proto2).
 *
 * @private
 */
export function unsafeIsSetExplicit(target: object, localName: string) {
  return (
    Object.prototype.hasOwnProperty.call(target, localName) &&
    (target as Record<string, unknown>)[localName] !== undefined
  );
}

/**
 * Return a field value, respecting oneof groups.
 *
 * @private
 */
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

/**
 * Set a field value, respecting oneof groups.
 *
 * @private
 */
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
 * Resets the field, so that unsafeIsSet() will return false.
 *
 * @private
 */
export function unsafeClear(
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
  field: DescField,
) {
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
      case "message":
        delete target[name];
        break;
      default:
        if (field.presence == IMPLICIT) {
          target[name] =
            field.fieldKind == "enum"
              ? field.enum.values[0].number
              : scalarZeroValue(field.scalar, field.longType);
        } else {
          delete target[name];
        }
    }
  }
}

/**
 * Add an item to a list field.
 *
 * @private
 */
export function unsafeAddListItem(
  target: Record<string, unknown>,
  field: DescField & { fieldKind: "list" },
  value: unknown,
) {
  const name = localName(field);
  (target[name] as unknown[]).push(value);
}

/**
 * Set a map entry.
 *
 * @private
 */
export function unsafeSetMapEntry(
  target: Record<string, unknown>,
  field: DescField & { fieldKind: "map" },
  key: string | number,
  value: unknown,
) {
  const name = localName(field);
  (target[name] as Record<string | number, unknown>)[key] = value;
}
