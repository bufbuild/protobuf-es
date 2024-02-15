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

import type { Message } from "./message.js";
import type { FieldInfo } from "./field.js";
import {
  isFieldSet as privateIsFieldSet,
  clearField as privateClearField,
} from "./private/reflect.js";

/**
 * Returns true if the field is set.
 */
export function isFieldSet<T extends Message<T>>(
  target: T,
  field: MessageFieldNames<T>,
): boolean;
export function isFieldSet(target: Message, field: FieldInfo): boolean;
export function isFieldSet<T extends Message<T>>(
  target: T,
  field: MessageFieldNames<T> | FieldInfo,
): boolean {
  const fi = getFieldInfo(target, field);
  if (fi) {
    return privateIsFieldSet(fi, target);
  }
  return false;
}

/**
 * Resets the field, so that isFieldSet() will return false.
 */
export function clearField<T extends Message<T>>(
  target: T,
  field: MessageFieldNames<T>,
): void;
export function clearField(target: Message, field: FieldInfo): void;
export function clearField<T extends Message<T>>(
  target: T,
  field: MessageFieldNames<T> | FieldInfo,
): void {
  const fi = getFieldInfo(target, field);
  if (fi) {
    privateClearField(fi, target);
  }
}

function getFieldInfo(
  message: Message,
  field: string | FieldInfo,
): FieldInfo | undefined {
  if (typeof field == "string") {
    return message
      .getType()
      .fields.list()
      .find((fi) => fi.localName === field);
  }
  return field;
}

// prettier-ignore
type MessageFieldNames<T extends Message<T>> = Exclude<keyof {
  [P in keyof T as
    T[P] extends Function ? never // eslint-disable-line @typescript-eslint/ban-types
    : T[P] extends Message ? P
    : T[P] extends Oneof<infer K> ? K
    : P
  ]-?: true;
}, number | symbol>

type Oneof<K extends string> = {
  case: K | undefined;
  value?: unknown;
};
