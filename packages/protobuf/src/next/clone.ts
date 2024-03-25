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
import {
  isReflectMessage,
  reflect,
  reflectMessage,
  type ReflectMessage,
  ScalarType,
} from "./reflect/index.js";
import type { DescField } from "../descriptor-set.js";

/**
 * Create a deep copy of a message, including extensions and unknown fields.
 */
export function clone<T extends Message>(message: T): T {
  return cloneReflect(reflect(message)).message as T;
}

function cloneReflect(i: ReflectMessage): ReflectMessage {
  const o = reflectMessage(i.desc);
  for (const f of i.fields) {
    if (!i.isSet(f)) {
      continue;
    }
    switch (f.fieldKind) {
      default: {
        const err = o.set(f, cloneSingular(f, i.get(f)));
        if (err) {
          throw err;
        }
        break;
      }
      case "list":
        for (const item of i.get(f)) {
          // TODO fix type error
          // @ts-expect-error TODO
          const err = o.addListItem(f, cloneSingular(f, item));
          if (err) {
            throw err;
          }
        }
        break;
      case "map":
        for (const entry of i.get(f).entries()) {
          const err = o.setMapEntry(f, entry[0], cloneSingular(f, entry[1]));
          if (err) {
            throw err;
          }
        }
        break;
    }
  }
  const unknown = i.getUnknown();
  if (unknown && unknown.length > 0) {
    o.setUnknown([...unknown]);
  }
  return o;
}

function cloneSingular<T>(field: DescField, value: T): T {
  if (field.message !== undefined && isReflectMessage(value)) {
    return cloneReflect(value) as T;
  }
  if (field.scalar == ScalarType.BYTES && value instanceof Uint8Array) {
    // @ts-expect-error T cannot extend Uint8Array in practice
    return value.slice();
  }
  return value;
}
