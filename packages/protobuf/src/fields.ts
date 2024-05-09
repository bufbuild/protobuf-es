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

import type { Message, MessageShape } from "./types.js";
import { unsafeClear, unsafeIsSet } from "./reflect/unsafe.js";
import type { DescMessage } from "./desc-types.js";

/**
 * Returns true if the field is set.
 *
 * - Scalar and enum fields with implicit presence (proto3):
 *   Set if not a zero value.
 *
 * - Scalar and enum fields with explicit presence (proto2, oneof):
 *   Set if a value was set when creating or parsing the message, or when a
 *   value was assigned to the field's property.
 *
 * - Message fields:
 *   Set if the property is not undefined.
 *
 * - List and map fields:
 *   Set if not empty.
 */
export function isFieldSet<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  fieldName: MessageFieldNames<MessageShape<Desc>>,
): boolean {
  const field = messageDesc.fields.find((f) => f.localName === fieldName);
  if (field) {
    return unsafeIsSet(message, field);
  }
  return false;
}

/**
 * Resets the field, so that isFieldSet() will return false.
 */
export function clearField<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  fieldName: MessageFieldNames<MessageShape<Desc>>,
): void {
  const field = messageDesc.fields.find((f) => f.localName === fieldName);
  if (field) {
    unsafeClear(message, field);
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
      P extends ("$typeName" | "$unknown") ? never
        : T[P] extends Oneof<infer K> ? K
          : P
    ]-?: true;
  }, number | symbol>

type Oneof<K extends string> = {
  case: K | undefined;
  value?: unknown;
};
