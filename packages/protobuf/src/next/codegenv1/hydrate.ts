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

import { protoBase64 } from "../../proto-base64";
import type { Message } from "../types";
import { FileDescriptorProto } from "../../google/protobuf/descriptor_pb";
import { createDescriptorSet } from "../../create-descriptor-set";
import type { DescFile, DescMessage } from "../../descriptor-set";
import { protoCamelCase } from "../reflect/names.js";
import type {
  ServiceInfo,
  TypedDescEnum,
  TypedDescExtension,
  TypedDescMessage,
  TypedDescService,
} from "./typed-desc";

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
  const root = FileDescriptorProto.fromBinary(protoBase64.dec(b64));
  const directDeps = imports ?? [];
  root.dependency = directDeps.map((f) => f.proto.name);
  // TODO it's very wasteful to create Desc's for deps - only to throw them away
  const deps = Array.from(new Set(findDeps(directDeps))).map((f) => f.proto);
  const set = createDescriptorSet([...deps, root]);
  const file = set.files[set.files.length - 1];
  file.messages.forEach(restoreRedundantJsonNames);
  return file;
}

function* findDeps(deps: DescFile[]): Iterable<DescFile> {
  for (const d of deps) {
    yield* findDeps(d.dependencies);
    yield d;
  }
}

function restoreRedundantJsonNames(message: DescMessage) {
  for (const f of message.fields) {
    if (f.jsonName === undefined) {
      f.proto.jsonName = protoCamelCase(f.proto.name);
    }
  }
  // TODO avoid recursion
  message.nestedMessages.forEach(restoreRedundantJsonNames);
}
