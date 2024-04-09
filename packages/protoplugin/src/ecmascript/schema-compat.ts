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

import { FileDescriptorProto as V1FileDescriptorProto } from "@bufbuild/protobuf";
import { fromBinary } from "@bufbuild/protobuf/next";
import type { FileDescriptorProto } from "@bufbuild/protobuf/next/wkt";
import { FileDescriptorProtoDesc } from "@bufbuild/protobuf/next/wkt";

// TODO remove, along with protoplugin v1
export function v1FileDescriptorProtoToV2(
  proto: V1FileDescriptorProto,
): FileDescriptorProto {
  const bytes = proto.toBinary();
  return fromBinary(FileDescriptorProtoDesc, bytes);
}
