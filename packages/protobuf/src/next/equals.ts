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
import { scalarEquals } from "./reflect/scalar.js";
import { reflect } from "./reflect/reflect.js";
import type { ReflectMessage } from "./reflect/reflect.js";
import type { MapEntryKey } from "./reflect/reflect-map.js";
import type { DescField } from "../descriptor-set.js";

/**
 * Compare two messages of the same type.
 * Note that this function disregards extensions and unknown fields.
 */
export function equals(a: Message, b: Message): boolean {
  if (a === b) {
    return true;
  }
  if (a.$typeName != b.$typeName) {
    return false;
  }
  const ra = reflect(a);
  const rb = reflect(b);
  for (const f of ra.fields) {
    if (ra.isSet(f) !== rb.isSet(f)) {
      return false;
    }
    if (!fieldEquals(f, ra, rb)) {
      return false;
    }
  }
  return true;
}

function fieldEquals(
  f: DescField,
  a: ReflectMessage,
  b: ReflectMessage,
): boolean {
  switch (f.fieldKind) {
    case "scalar":
      return scalarEquals(f.scalar, a.get(f), b.get(f));
    case "enum":
      return a.get(f) === b.get(f);
    case "message":
      // TODO fix type error
      // @ts-expect-error TODO
      return equals(a.get(f), b.get(f));
    case "map": {
      const ma = a.get(f);
      const mb = b.get(f);
      const keysA: MapEntryKey[] = [];
      for (const k of ma.keys()) {
        if (!mb.has(k)) {
          return false;
        }
        keysA.push(k);
      }
      for (const k of mb.keys()) {
        if (!ma.has(k)) {
          return false;
        }
      }
      for (const key of keysA) {
        const va = ma.get(key);
        const vb = mb.get(key);
        if (va === vb) {
          continue;
        }
        switch (f.mapKind) {
          case "enum":
            return false;
          case "message":
            // TODO fix type error
            // @ts-expect-error TODO
            if (!equals(va, vb)) {
              return false;
            }
            break;
          case "scalar":
            // TODO fix type error
            // @ts-expect-error TODO
            if (!scalarEquals(f.scalar, va, vb)) {
              return false;
            }
            break;
        }
      }
      break;
    }
    case "list": {
      const la = a.get(f);
      const lb = b.get(f);
      if (la.length != lb.length) {
        return false;
      }
      for (let i = 0; i < la.length; i++) {
        if (la[i] === lb[i]) {
          continue;
        }
        switch (f.listKind) {
          case "enum":
            return false;
          case "message":
            // TODO fix type error
            // @ts-expect-error TODO
            if (!equals(la[i], lb[i])) {
              return false;
            }
            break;
          case "scalar":
            // TODO fix type error
            // @ts-expect-error TODO
            if (!scalarEquals(f.scalar, la[i], lb[i])) {
              return false;
            }
            break;
        }
      }
      break;
    }
  }
  return true;
}
