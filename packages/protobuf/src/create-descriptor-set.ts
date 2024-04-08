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

import {
  FileDescriptorProto,
  FileDescriptorSet,
} from "./google/protobuf/descriptor_pb.js";
import type {
  DescEnum,
  DescExtension,
  DescMessage,
  DescriptorSet,
  DescService,
} from "./descriptor-set.js";
import { createDescFileSet } from "./next/reflect/desc-set.js";

/**
 * Create a DescriptorSet, a convenient interface for working with a set of
 * google.protobuf.FileDescriptorProto.
 *
 * Note that files must be given in topological order, so each file appears
 * before any file that imports it. Protocol buffer compilers always produce
 * files in topological order.
 */
export function createDescriptorSet(
  input: FileDescriptorProto[] | FileDescriptorSet | Uint8Array,
): DescriptorSet {
  if (input instanceof Uint8Array) {
    input = FileDescriptorSet.fromBinary(input);
  } else if (Array.isArray(input)) {
    input = new FileDescriptorSet({ file: input });
  }
  const set = createDescFileSet(input);
  const enums = new Map<string, DescEnum>();
  const messages = new Map<string, DescMessage>();
  const services = new Map<string, DescService>();
  const extensions = new Map<string, DescExtension>();
  for (const type of set) {
    switch (type.kind) {
      case "service":
        services.set(type.typeName, type);
        break;
      case "message":
        messages.set(type.typeName, type);
        break;
      case "enum":
        enums.set(type.typeName, type);
        break;
      case "extension":
        extensions.set(type.typeName, type);
        break;
    }
  }
  return {
    files: Array.from(set.files),
    enums,
    messages,
    services,
    extensions,
  };
}
