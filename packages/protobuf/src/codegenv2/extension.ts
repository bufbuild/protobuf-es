// Copyright 2021-2026 Buf Technologies, Inc.
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

import type { Message } from "../types.js";
import type { DescFile } from "../descriptors.js";
import type { GenExtension } from "./types.js";

/**
 * Hydrate an extension descriptor.
 *
 * @private
 */
export function extDesc<Extendee extends Message, Value>(
  file: DescFile,
  path: number,
  ...paths: number[]
): GenExtension<Extendee, Value> {
  if (paths.length == 0) {
    return file.extensions[path] as GenExtension<Extendee, Value>;
  }
  const e = paths.pop() as number; // we checked length above
  return paths.reduce(
    (acc, cur) => acc.nestedMessages[cur],
    file.messages[path],
  ).nestedExtensions[e] as GenExtension<Extendee, Value>;
}
