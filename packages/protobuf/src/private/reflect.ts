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

import type { FieldInfo } from "../field.js";
import { isScalarZeroValue, scalarZeroValue } from "./scalars.js";

/**
 * Returns true if the field is set.
 */
export function isFieldSet(
  field: FieldInfo,
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
) {
  const localName = field.localName;
  if (field.repeated) {
    return (target[localName] as unknown[]).length > 0;
  }
  if (field.oneof) {
    return target[field.oneof.localName].case === localName; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
  switch (field.kind) {
    case "enum":
    case "scalar":
      if (field.opt || field.req) {
        // explicit presence
        return (
          Object.prototype.hasOwnProperty.call(target, localName) &&
          target[localName] !== undefined
        );
      }
      // implicit presence
      if (field.kind == "enum") {
        return target[localName] !== field.T.values[0].no;
      }
      return !isScalarZeroValue(field.T, target[localName]);
    case "message":
      return target[localName] !== undefined;
    case "map":
      return Object.keys(target[localName]).length > 0; // eslint-disable-line @typescript-eslint/no-unsafe-argument
  }
}

/**
 * Resets the field, so that isFieldSet() will return false.
 */
export function clearField(
  field: FieldInfo,
  target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
) {
  const localName = field.localName;
  const implicitPresence = !field.opt && !field.req;
  if (field.repeated) {
    target[localName] = [];
  } else if (field.oneof) {
    if (
      (target[field.oneof.localName] as { case: string }).case ===
      field.localName
    ) {
      target[field.oneof.localName] = { case: undefined };
    }
  } else {
    switch (field.kind) {
      case "map":
        target[localName] = {};
        break;
      case "enum":
        if (implicitPresence) {
          target[localName] = field.T.values[0].no;
        } else {
          delete target[localName];
        }
        break;
      case "scalar":
        if (implicitPresence) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          target[localName] = scalarZeroValue(field.T, field.L);
        } else {
          delete target[localName];
        }
        break;
      case "message":
        target[localName] = undefined;
        break;
    }
  }
}
