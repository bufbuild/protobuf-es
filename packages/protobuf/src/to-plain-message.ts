// Copyright 2021-2023 Buf Technologies, Inc.
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

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument,no-case-declarations */

import { Message } from "./message.js";
import type { AnyMessage, PlainMessage } from "./message.js";

/**
 * toPlainMessage returns a new object by stripping
 * all methods from a message, leaving only fields and
 * oneof groups. It is recursive, meaning it applies this
 * same logic to all nested message fields as well.
 *
 * If the argument is already a plain message, it is
 * returned as-is.
 */
export function toPlainMessage<T extends Message<T>>(
  message: T | PlainMessage<T>,
): PlainMessage<T> {
  if (!(message instanceof Message)) {
    return message;
  }

  const type = message.getType();
  const target = {} as AnyMessage;
  for (const member of type.fields.byMember()) {
    const source = (message as AnyMessage)[member.localName];
    let copy: any;
    if (member.repeated) {
      copy = (source as any[]).map((e) => toPlainValue(e));
    } else if (member.kind == "map") {
      copy = {};
      for (const [key, v] of Object.entries(source)) {
        copy[key] = toPlainValue(v);
      }
    } else if (member.kind == "oneof") {
      const f = member.findField(source.case);
      copy = f
        ? { case: source.case, value: toPlainValue(source.value) }
        : { case: undefined };
    } else {
      copy = toPlainValue(source);
    }
    target[member.localName] = copy;
  }
  return target as PlainMessage<T>;
}

function toPlainValue(value: any) {
  if (value === undefined) {
    return value;
  }
  if (value instanceof Message) {
    return toPlainMessage(value);
  }
  if (value instanceof Uint8Array) {
    const c = new Uint8Array(value.byteLength);
    c.set(value);
    return c;
  }
  return value;
}
