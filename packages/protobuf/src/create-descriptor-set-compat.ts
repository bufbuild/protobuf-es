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
  FileDescriptorProto as V1FileDescriptorProto,
  FileDescriptorSet as V1FileDescriptorSet,
} from "./google/protobuf/descriptor_pb.js";
import type { FileDescriptorSet } from "./next/wkt/gen/google/protobuf/descriptor_pbv2.js";
import {
  FileDescriptorProtoDesc,
  FileDescriptorSetDesc,
} from "./next/wkt/gen/google/protobuf/descriptor_pbv2.js";
import { create } from "./next/create.js";
import { fromBinary } from "./next/from-binary.js";

// TODO remove, along with createDescriptorSet once we no longer need it for tests
export function createV2FileDescriptorSetFromV1Input(
  input: V1FileDescriptorProto[] | V1FileDescriptorSet | Uint8Array,
): FileDescriptorSet {
  let v2Set: FileDescriptorSet;
  if (input instanceof Uint8Array) {
    v2Set = fromBinary(FileDescriptorSetDesc, input);
  } else {
    const v1Files = Array.isArray(input) ? input : input.file;
    v2Set = create(FileDescriptorSetDesc, {
      file: v1Files.map((v1File) =>
        fromBinary(FileDescriptorProtoDesc, v1File.toBinary()),
      ),
    });
  }
  return v2Set;
}
