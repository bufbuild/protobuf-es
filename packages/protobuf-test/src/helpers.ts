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

import { UpstreamProtobuf } from "upstream-protobuf";
import { fromBinary, createFileRegistry } from "@bufbuild/protobuf";
import type { FileDescriptorSet } from "@bufbuild/protobuf/wkt";
import { FileDescriptorSetDesc } from "@bufbuild/protobuf/wkt";
import assert from "node:assert";

let upstreamProtobuf: UpstreamProtobuf | undefined;

export async function compileFileDescriptorSet(
  files: Record<string, string>,
): Promise<FileDescriptorSet> {
  upstreamProtobuf = upstreamProtobuf ?? new UpstreamProtobuf();
  const bytes = await upstreamProtobuf.compileToDescriptorSet(files, {
    includeImports: true,
    retainOptions: true,
  });
  return fromBinary(FileDescriptorSetDesc, bytes);
}

export async function compileFile(proto: string, name = "input.proto") {
  upstreamProtobuf = upstreamProtobuf ?? new UpstreamProtobuf();
  const bytes = await upstreamProtobuf.compileToDescriptorSet(
    {
      [name]: proto,
    },
    {
      includeImports: true,
      retainOptions: true,
      includeSourceInfo: true,
    },
  );
  const fds = fromBinary(FileDescriptorSetDesc, bytes);
  const reg = createFileRegistry(fds);
  const file = reg.getFile(name);
  assert(file);
  return file;
}

export async function compileEnum(proto: string) {
  const file = await compileFile(proto);
  const firstEnum = file.enums[0];
  assert(firstEnum);
  return firstEnum;
}

export async function compileMessage(proto: string) {
  const file = await compileFile(proto);
  const firstMessage = file.messages[0];
  assert(firstMessage);
  return firstMessage;
}

export async function compileField(proto: string) {
  const message = await compileMessage(proto);
  const firstField = message.fields[0];
  assert(firstField);
  return firstField;
}

export async function compileExtension(proto: string) {
  const file = await compileFile(proto);
  const firstExt = file.extensions[0];
  assert(firstExt);
  return firstExt;
}

export async function compileService(proto: string) {
  const file = await compileFile(proto);
  const firstService = file.services[0];
  assert(firstService);
  return firstService;
}

export async function compileMethod(proto: string) {
  const service = await compileService(proto);
  const firstMethod = service.methods[0];
  assert(firstMethod);
  return firstMethod;
}
