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
import { FileDescriptorProtoDesc } from "../wkt/gen/google/protobuf/descriptor_pb.js";
import type { DescFile } from "../desc-types.js";
import { createFileRegistry } from "../reflect/registry.js";
import { assert } from "../reflect/assert.js";
import { restoreJsonNames } from "./restore-json-names.js";
import { fromBinary } from "../from-binary.js";

/**
 * Hydrate a file descriptor.
 *
 * @private
 */
export function fileDesc(b64: string, imports?: DescFile[]): DescFile {
  const root = fromBinary(FileDescriptorProtoDesc, base64Decode(b64));
  root.messageType.forEach(restoreJsonNames);
  root.dependency = imports?.map((f) => f.proto.name) ?? [];
  const reg = createFileRegistry(root, (protoFileName) =>
    imports?.find((f) => f.proto.name === protoFileName),
  );
  const file = reg.getFile(root.name);
  assert(file);
  return file;
}
