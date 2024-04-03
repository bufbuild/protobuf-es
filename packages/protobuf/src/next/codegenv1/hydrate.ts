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

import { base64Decode } from "../wire/index.js";
import type { Message } from "../types.js";
import {
  DescriptorProto,
  FileDescriptorProto,
} from "../../google/protobuf/descriptor_pb.js";
import type { DescFile } from "../../descriptor-set.js";
import { protoCamelCase } from "../reflect/names.js";
import type {
  ServiceInfo,
  TypedDescEnum,
  TypedDescExtension,
  TypedDescMessage,
  TypedDescService,
} from "./typed-desc.js";
import { createDescFileSet } from "../reflect/desc-set.js";
import { assert } from "../../private/assert.js";
import { isFieldSet } from "../../field-accessor.js";

export function messageDesc<Shape extends Message>(
  file: DescFile,
  path: number,
  ...paths: number[]
): TypedDescMessage<Shape> {
  return paths.reduce(
    (acc, cur) => acc.nestedMessages[cur],
    file.messages[path],
  ) as TypedDescMessage<Shape>;
}

export function enumDesc<Shape>(
  file: DescFile,
  path: number,
  ...paths: number[]
): TypedDescEnum<Shape> {
  if (paths.length == 0) {
    return file.enums[path] as TypedDescEnum<Shape>;
  }
  const e = paths.pop() as number; // we checked length above
  return paths.reduce(
    (acc, cur) => acc.nestedMessages[cur],
    file.messages[path],
  ).nestedEnums[e] as TypedDescEnum<Shape>;
}

export function extDesc<Extendee extends Message, Value>(
  file: DescFile,
  path: number,
  ...paths: number[]
): TypedDescExtension<Extendee, Value> {
  if (paths.length == 0) {
    return file.extensions[path] as TypedDescExtension<Extendee, Value>;
  }
  const e = paths.pop() as number; // we checked length above
  return paths.reduce(
    (acc, cur) => acc.nestedMessages[cur],
    file.messages[path],
  ).nestedExtensions[e] as TypedDescExtension<Extendee, Value>;
}

export function serviceDesc<T extends ServiceInfo>(
  file: DescFile,
  path: number,
  ...paths: number[]
): TypedDescService<T> {
  if (paths.length > 0) {
    throw new Error();
  }
  return file.services[path] as TypedDescService<T>;
}

export function fileDesc(b64: string, imports?: DescFile[]): DescFile {
  const root = FileDescriptorProto.fromBinary(base64Decode(b64));
  root.messageType.forEach(restoreRedundantJsonNames);
  root.dependency = imports?.map((f) => f.proto.name) ?? [];
  const set = createDescFileSet(root, (protoFileName) =>
    imports?.find((f) => f.proto.name === protoFileName),
  );
  const file = set.getFile(root.name);
  assert(file);
  return file;
}

function restoreRedundantJsonNames(message: DescriptorProto) {
  for (const f of message.field) {
    if (!isFieldSet(f, "jsonName")) {
      f.jsonName = protoCamelCase(f.name);
    }
  }
  message.nestedType.forEach(restoreRedundantJsonNames);
}
