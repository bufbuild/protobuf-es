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

import { UpstreamProtobuf } from "upstream-protobuf";
import { fromBinary, createFileRegistry } from "@bufbuild/protobuf";
import type { FileDescriptorSet } from "@bufbuild/protobuf/wkt";
import { FileDescriptorSetSchema } from "@bufbuild/protobuf/wkt";
import { FieldError } from "@bufbuild/protobuf/reflect";
import assert from "node:assert";

export function catchFieldError(fn: () => unknown): FieldError | undefined {
  try {
    fn();
  } catch (e) {
    if (e instanceof FieldError) {
      return e;
    }
  }
  return undefined;
}

let upstreamProtobuf: UpstreamProtobuf | undefined;

export async function compileFileDescriptorSet(
  files: Record<string, string>,
): Promise<FileDescriptorSet> {
  upstreamProtobuf = upstreamProtobuf ?? new UpstreamProtobuf();
  const bytes = await upstreamProtobuf.compileToDescriptorSet(files, {
    includeImports: true,
    retainOptions: true,
  });
  return fromBinary(FileDescriptorSetSchema, bytes);
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
  const fds = fromBinary(FileDescriptorSetSchema, bytes);
  const reg = createFileRegistry(fds);
  const file = reg.getFile(name);
  assert(file);
  return file;
}

export async function compileEnum(proto: string) {
  const file = await compileFile(proto);
  if (file.enums.length != 1) {
    throw new Error(`expected 1 enum, got ${file.enums.length}`);
  }
  return file.enums[0];
}

export async function compileMessage(proto: string) {
  const file = await compileFile(proto);
  if (file.messages.length == 0) {
    throw new Error("missing message");
  }
  return file.messages[0];
}

export async function compileField(proto: string) {
  const message = await compileMessage(proto);
  if (message.fields.length == 0) {
    throw new Error("missing field");
  }
  return message.fields[0];
}

export async function compileExtension(proto: string) {
  const file = await compileFile(proto);
  if (file.extensions.length == 0) {
    throw new Error("missing extension");
  }
  return file.extensions[0];
}

export async function compileService(proto: string) {
  const file = await compileFile(proto);
  if (file.services.length == 0) {
    throw new Error("missing service");
  }
  return file.services[0];
}

export async function compileMethod(proto: string) {
  const service = await compileService(proto);
  if (service.methods.length == 0) {
    throw new Error("missing method");
  }
  return service.methods[0];
}
