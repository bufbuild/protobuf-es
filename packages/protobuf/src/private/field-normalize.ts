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

import type { FieldListSource } from "./field-list.js";
import type { FieldInfo } from "../field.js";
import { InternalOneofInfo } from "./field.js";
import { fieldJsonName, localFieldName } from "./names.js";
import { LongType, ScalarType } from "../scalar.js";

/**
 * Convert a collection of field info to an array of normalized FieldInfo.
 *
 * The argument `packedByDefault` specifies whether fields that do not specify
 * `packed` should be packed (proto3) or unpacked (proto2).
 */
export function normalizeFieldInfos(
  fieldInfos: FieldListSource,
  packedByDefault: boolean,
): FieldInfo[] {
  const r: FieldInfo[] = [];
  let o: InternalOneofInfo | undefined;
  for (const field of typeof fieldInfos == "function"
    ? fieldInfos()
    : fieldInfos) {
    const f = field as Record<string, unknown>;
    f.localName = localFieldName(field.name, field.oneof !== undefined);
    f.jsonName = field.jsonName ?? fieldJsonName(field.name);
    f.repeated = field.repeated ?? false;
    if (field.kind == "scalar") {
      f.L = field.L ?? LongType.BIGINT;
    }
    f.delimited = field.delimited ?? false;
    f.req = field.req ?? false;
    f.opt = field.opt ?? false;
    if (field.packed === undefined) {
      if (packedByDefault) {
        f.packed =
          field.kind == "enum" ||
          (field.kind == "scalar" &&
            field.T != ScalarType.BYTES &&
            field.T != ScalarType.STRING);
      } else {
        f.packed = false;
      }
    }
    // We do not surface options at this time
    // f.options = field.options ?? emptyReadonlyObject;
    if (field.oneof !== undefined) {
      const ooname =
        typeof field.oneof == "string" ? field.oneof : field.oneof.name;
      if (!o || o.name != ooname) {
        o = new InternalOneofInfo(ooname);
      }
      f.oneof = o;
      o.addField(f as FieldInfo);
    }
    r.push(f as FieldInfo);
  }
  return r;
}
