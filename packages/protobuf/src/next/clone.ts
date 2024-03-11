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

import { isMessage } from "./is-message.js";
import { create } from "./create.js";
import { isFieldSetPrivate } from "./reflect/reflect-private.js";
import type { Message } from "./types.js";
import { localName } from "./reflect/names.js";
import type { ScalarValue } from "./reflect/scalar.js";

// TODO migrate to use reflect
// TODO handle recursion
// TODO add tests
export function clone<T extends Message>(message: T): T {
  const target = create(message.$desc) as Record<keyof T, unknown>;
  for (const member of message.$desc.members) {
    const name = localName(member) as keyof T;
    const sourceProperty = message[name] as unknown;
    if (member.kind == "oneof") {
      const oneof = sourceProperty as {
        case: string | undefined;
        value?: Message | ScalarValue;
      };
      if (oneof.case === undefined) {
        continue;
      }
      target[name] = {
        case: oneof.case,
        value: cloneSingularField(oneof.value),
      };
      continue;
    }
    if (!isFieldSetPrivate(message, member)) {
      continue;
    }
    switch (member.fieldKind) {
      case "list":
        target[name] = (sourceProperty as unknown[]).map(cloneSingularField);
        break;
      case "map":
        for (const [key, v] of Object.entries(sourceProperty as object)) {
          (target[name] as Record<string, unknown>)[key] =
            cloneSingularField(v);
        }
        break;
      default:
        target[name] = cloneSingularField(sourceProperty);
        break;
    }
  }
  return target as T;
}

// clone a single field value - i.e. the element type of repeated fields, the value type of maps
function cloneSingularField(value: unknown): unknown {
  if (value === undefined) {
    return value;
  }
  if (isMessage(value)) {
    return clone(value);
  }
  if (value instanceof Uint8Array) {
    const c = new Uint8Array(value.byteLength);
    c.set(value);
    return c;
  }
  return value;
}
