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
 * toPlainMessage returns a new object by striping
 * all methods from a message, leaving only fields and
 * oneof groups. It is recursive, meaning it applies this
 * same logic to all nested message fields as well.
 */
export function toPlainMessage<T extends Message<T>>(
  message: T
): PlainMessage<T> {
  if (typeof structuredClone === "function") {
    return structuredClone(message) as PlainMessage<T>;
  }
  const type = message.getType();
  const source = message as AnyMessage;
  const target = {} as PlainMessage<AnyMessage>;
  for (const member of type.fields.byMember()) {
    const localName = member.localName;
    switch (member.kind) {
      case "scalar":
      case "enum":
        target[localName] = source[localName];
        break;
      case "message":
        if (member.repeated) {
          target[localName] = (source[localName] as any[]).map((val) =>
            toPlainMessage(val)
          );
        } else if (source[localName] !== undefined) {
          target[localName] = toPlainMessage(source[localName]);
        } else {
          target[localName] = undefined;
        }
        break;
      case "oneof":
        const _case = source[localName].case;
        if (_case === undefined) {
          target[localName] = { case: undefined };
          break;
        }
        let value = source[localName].value;
        const sourceField = member.findField(_case);
        if (sourceField !== undefined && sourceField.kind === "message") {
          value = toPlainMessage(value);
        }
        target[localName] = { case: _case, value: value };
        break;
      case "map":
        const plainMap: Record<string, any> = {};
        switch (member.V.kind) {
          case "enum":
          case "scalar":
            Object.assign(plainMap, source[localName]);
            break;
          case "message":
            const msgMap = source[localName];
            for (const k of Object.keys(msgMap)) {
              plainMap[k] = toPlainMessage(msgMap[k]);
            }
            break;
        }
        target[localName] = plainMap;
        break;
    }
  }
  return target as PlainMessage<T>;
}
