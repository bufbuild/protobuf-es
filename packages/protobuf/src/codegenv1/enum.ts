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

import type { DescFile } from "../descriptors.js";
import type { GenEnum } from "./types.js";
import type { JsonValue } from "../json-value.js";

export { tsEnum } from "../codegenv2/enum.js";

/**
 * Hydrate an enum descriptor.
 *
 * @private
 */
export function enumDesc<
  Shape extends number,
  JsonType extends JsonValue = JsonValue,
>(file: DescFile, path: number, ...paths: number[]): GenEnum<Shape, JsonType> {
  if (paths.length == 0) {
    return file.enums[path] as GenEnum<Shape, JsonType>;
  }
  const e = paths.pop() as number; // we checked length above
  return paths.reduce(
    (acc, cur) => acc.nestedMessages[cur],
    file.messages[path],
  ).nestedEnums[e] as GenEnum<Shape, JsonType>;
}
