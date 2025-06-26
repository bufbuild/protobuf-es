// Copyright 2021-2025 Buf Technologies, Inc.
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
import type { DescMessage } from "./descriptors.js";
import { reflect } from "./reflect/reflect.js";
import type { ReflectMessage } from "./reflect/reflect-types.js";

/**
 * Merge message `source` into message `target`, following Protobuf semantics.
 *
 * This is the same as serializing the source message, then deserializing it
 * into the target message via `mergeFromBinary()`, with one difference:
 * While serialization will create a copy of all values, `merge()` will copy
 * the reference for `bytes` and messages.
 *
 * Also see https://protobuf.com/docs/language-spec#merging-protobuf-messages
 */
export function merge<Desc extends DescMessage>(
  schema: Desc,
  target: MessageShape<Desc>,
  source: MessageShape<Desc>,
): void {
  reflectMerge(reflect(schema, target), reflect(schema, source));
}

function reflectMerge(target: ReflectMessage, source: ReflectMessage): void {
  const sourceUnknown = source.message.$unknown;
  if (sourceUnknown !== undefined && sourceUnknown.length > 0) {
    target.message.$unknown ??= [];
    target.message.$unknown.push(...sourceUnknown);
  }
  for (const f of target.fields) {
    if (!source.isSet(f)) {
      continue;
    }
    switch (f.fieldKind) {
      case "scalar":
      case "enum":
        target.set(f, source.get(f));
        break;
      case "message":
        if (target.isSet(f)) {
          reflectMerge(target.get(f), source.get(f));
        } else {
          target.set(f, source.get(f));
        }
        break;
      case "list":
        const list = target.get(f);
        for (const e of source.get(f)) {
          list.add(e);
        }
        break;
      case "map":
        const map = target.get(f);
        for (const [k, v] of source.get(f)) {
          map.set(k, v);
        }
        break;
    }
  }
}
