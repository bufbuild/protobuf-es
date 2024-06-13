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

import type { MessageShape } from "./types.js";
import { type DescField, type DescMessage, ScalarType } from "./descriptors.js";
import type { ReflectMessage } from "./reflect/reflect-types.js";
import { reflect } from "./reflect/reflect.js";
import { isReflectMessage } from "./reflect/guard.js";

/**
 * Create a deep copy of a message, including extensions and unknown fields.
 */
export function clone<Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
): MessageShape<Desc> {
  return cloneReflect(reflect(schema, message)).message as MessageShape<Desc>;
}

function cloneReflect(i: ReflectMessage): ReflectMessage {
  const o = reflect(i.desc);
  for (const f of i.fields) {
    if (!i.isSet(f)) {
      continue;
    }
    switch (f.fieldKind) {
      default: {
        o.set(f, cloneSingular(f, i.get(f)));
        break;
      }
      case "list":
        // eslint-disable-next-line no-case-declarations
        const list = o.get(f);
        for (const item of i.get(f)) {
          list.add(cloneSingular(f, item));
        }
        break;
      case "map":
        // eslint-disable-next-line no-case-declarations
        const map = o.get(f);
        for (const entry of i.get(f).entries()) {
          map.set(entry[0], cloneSingular(f, entry[1]));
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
