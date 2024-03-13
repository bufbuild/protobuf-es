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

import { ScalarType } from "./scalar.js";
import type { Message } from "../types.js";
import type { DescField } from "../../descriptor-set.js";
import { localName } from "./names.js";
import { assert } from "../../private/assert.js";
import { protoInt64 } from "../../proto-int64.js";

export type MapEntryKey = string | number | bigint | boolean;

export interface ReflectMap<K, V> extends ReadonlyMap<K, V> {
  readonly kind: "reflect_map";
  readonly owner: Message;
  readonly field: DescField & { fieldKind: "map" };
}

export function reflectMap<K extends mapKey, V>(
  owner: Message,
  field: DescField & { fieldKind: "map" },
): ReflectMap<K, V> {
  const obj = (owner as unknown as Record<string, Record<string | number, V>>)[
    localName(field)
  ];
  return {
    kind: "reflect_map",
    field,
    owner,
    get(key) {
      return obj[keyToLocal(key)];
    },
    has(key) {
      return Object.prototype.hasOwnProperty.call(obj, keyToLocal(key));
    },
    *keys() {
      for (const objKey of Object.keys(obj)) {
        yield keyToReflect(field, objKey) as K;
      }
    },
    *entries() {
      for (const objEntry of Object.entries(obj)) {
        yield [keyToReflect(field, objEntry[0]) as K, objEntry[1]];
      }
    },
    [Symbol.iterator]() {
      return this.entries();
    },
    get size() {
      return Object.keys(obj).length;
    },
    *values() {
      yield* Object.values(obj);
    },
    forEach(callbackfn, thisArg) {
      for (const mapEntry of this.entries()) {
        callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
      }
    },
  };
}

type mapKey = string | number | bigint | boolean;

// TODO do not throw plain errors here
function keyToReflect(
  field: DescField & { fieldKind: "map" },
  key: string,
): mapKey {
  switch (field.mapKey) {
    case ScalarType.STRING:
      return key;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32: {
      const n = Number.parseInt(key);
      assert(Number.isInteger(n));
      return n;
    }
    case ScalarType.BOOL:
      assert(key == "true" || key == "false");
      return key === "true";
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return protoInt64.uParse(key);
    default:
      // INT64, SFIXED64, SINT64
      return protoInt64.parse(key);
  }
}

function keyToLocal(key: mapKey): string | number {
  if (typeof key == "string" || typeof key == "number") {
    return key;
  }
  return key.toString();
}
