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

import type { DescEnum, DescFile } from "../descriptors.js";
import type { GenDescEnum } from "./types.js";
import type { JsonValue } from "../json-value.js";

// TODO make JsonType parameter mandatory?
/**
 * Hydrate an enum descriptor.
 *
 * @private
 */
export function enumDesc<Shape, JsonType extends JsonValue = JsonValue>(
  file: DescFile,
  path: number,
  ...paths: number[]
): GenDescEnum<Shape, JsonType> {
  if (paths.length == 0) {
    return file.enums[path] as GenDescEnum<Shape, JsonType>;
  }
  const e = paths.pop() as number; // we checked length above
  return paths.reduce(
    (acc, cur) => acc.nestedMessages[cur],
    file.messages[path],
  ).nestedEnums[e] as GenDescEnum<Shape, JsonType>;
}

/**
 * Construct a TypeScript enum object at runtime from a descriptor.
 */
export function tsEnum(desc: DescEnum) {
  const enumObject = {} as enumObject;
  for (const value of desc.values) {
    enumObject[value.localName] = value.number;
    enumObject[value.number] = value.localName;
  }
  return enumObject;
}

type enumObject = {
  [key: number]: string;
  [k: string]: number | string;
};
