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

import type { Message } from "./types.js";
import { localName } from "./reflect/names.js";
import {
  clearFieldPrivate,
  isFieldSetPrivate,
} from "./reflect/reflect-private.js";

/**
 * Returns true if the field is set.
 */
export function isFieldSet<T extends Message>(
  message: T,
  fieldName: MessageFieldNames<T>,
): boolean {
  const field = message.$desc.fields.find((f) => localName(f) === fieldName);
  if (field) {
    return isFieldSetPrivate(message, field);
  }
  return false;
}

/**
 * Resets the field, so that isFieldSet() will return false.
 */
export function clearField<T extends Message>(
  message: T,
  fieldName: MessageFieldNames<T>,
): void {
  const field = message.$desc.fields.find((f) => localName(f) === fieldName);
  if (field) {
    clearFieldPrivate(message, field);
  }
}

/**
 * Union of the property names of all fields, including oneof members.
 * For an anonymous message (no generated message shape), it's simply a string.
 */
// prettier-ignore
type MessageFieldNames<T extends Message> = Message extends T ? string :
  Exclude<keyof {
  [P in keyof T as
     P extends ("$desc" | "$typeName" | "$unknown") ? never
    : T[P] extends Oneof<infer K> ? K
    : P
  ]-?: true;
}, number | symbol>

type Oneof<K extends string> = {
  case: K | undefined;
  value?: unknown;
};
