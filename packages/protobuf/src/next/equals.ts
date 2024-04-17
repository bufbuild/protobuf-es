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
import { scalarEquals } from "./reflect/scalar.js";
import { reflect } from "./reflect/reflect.js";
import type { DescField, DescMessage } from "../desc-types.js";
import type { MapEntryKey, ReflectMessage } from "./reflect/index.js";

/**
 * Compare two messages of the same type.
 *
 * Note that this function disregards extensions and unknown fields, and that
 * NaN is not equal NaN, following the IEEE standard.
 */
export function equals<Desc extends DescMessage>(
  messageDesc: Desc,
  a: MessageShape<Desc>,
  b: MessageShape<Desc>,
): boolean {
  if (
    a.$typeName != messageDesc.typeName ||
    b.$typeName != messageDesc.typeName
  ) {
    return false;
  }
  if (a === b) {
    return true;
  }
  return reflectEquals(reflect(messageDesc, a), reflect(messageDesc, b));
}

function reflectEquals(a: ReflectMessage, b: ReflectMessage): boolean {
  for (const f of a.fields) {
    if (!fieldEquals(f, a, b)) {
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
  if (!a.isSet(f) && !b.isSet(f)) {
    return true;
  }
  if (!a.isSet(f) || !b.isSet(f)) {
    return false;
  }
  switch (f.fieldKind) {
    case "scalar":
      return scalarEquals(f.scalar, a.get(f), b.get(f));
    case "enum":
      return a.get(f) === b.get(f);
    case "message":
      return reflectEquals(a.get(f), b.get(f));
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
            if (!reflectEquals(va, vb)) {
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
      if (la.size != lb.size) {
        return false;
      }
      for (let i = 0; i < la.size; i++) {
        if (la.get(i) === lb.get(i)) {
          continue;
        }
        switch (f.listKind) {
          case "enum":
            return false;
          case "message":
            // TODO fix type error
            // @ts-expect-error TODO
            if (!reflectEquals(la.get(i), lb.get(i))) {
              return false;
            }
            break;
          case "scalar":
            // TODO fix type error
            // @ts-expect-error TODO
            if (!scalarEquals(f.scalar, la.get(i), lb.get(i))) {
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
