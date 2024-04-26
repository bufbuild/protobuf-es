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

import type {
  AnyDesc,
  DescEnum,
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
} from "../desc-types.js";

/**
 * Iterate over all types - enumerations, extensions, services, messages -
 * and enumerations, extensions and messages nested in messages.
 */
export function* nestedTypes(
  desc: DescFile | DescMessage,
): Iterable<DescMessage | DescEnum | DescExtension | DescService> {
  switch (desc.kind) {
    case "file":
      for (const message of desc.messages) {
        yield message;
        yield* nestedTypes(message);
      }
      yield* desc.enums;
      yield* desc.services;
      yield* desc.extensions;
      break;
    case "message":
      for (const message of desc.nestedMessages) {
        yield message;
        yield* nestedTypes(message);
      }
      yield* desc.nestedEnums;
      yield* desc.nestedExtensions;
      break;
  }
}

/**
 * Returns the ancestors of a given Protobuf element, up to the file.
 */
export function parentTypes(desc: AnyDesc): Parent[] {
  const parents: Parent[] = [];
  while (desc.kind !== "file") {
    const p = parent(desc);
    desc = p;
    parents.push(p);
  }
  return parents;
}

type Parent = DescFile | DescEnum | DescMessage | DescService;

function parent(desc: Exclude<AnyDesc, DescFile>): Parent {
  switch (desc.kind) {
    case "enum_value":
    case "field":
    case "oneof":
    case "rpc":
      return desc.parent;
    case "service":
      return desc.file;
    case "extension":
    case "enum":
    case "message":
      return desc.parent ?? desc.file;
  }
}
