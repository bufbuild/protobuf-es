// Copyright 2021-2023 Buf Technologies, Inc.
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
  createDescriptorSet,
  FileDescriptorSet,
  CodeGeneratorRequest,
} from "@bufbuild/protobuf";
import { readFileSync } from "fs";

/**
 * Assert that condition is truthy or throw error (with message)
 */
export function assert(condition: unknown, msg?: string): asserts condition {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- we want the implicit conversion to boolean
  if (!condition) {
    throw new Error(msg);
  }
}

/**
 * Returns a constructed CodeGeneratorRequest using a pre-built Buf image for testing
 */
export function getCodeGeneratorRequest(
  parameter = "",
  fileToGenerate: string[],
) {
  const fds = getFileDescriptorSet();
  return new CodeGeneratorRequest({
    parameter,
    fileToGenerate, // tells the plugin which files from the set to generate
    protoFile: fds.file,
  });
}

/**
 * Returns a DescriptorSet from a pre-built Buf image
 */
export function getDescriptorSet() {
  const fds = getFileDescriptorSet();
  return createDescriptorSet(fds.file);
}

/**
 * Returns a FileDescriptorSet from a pre-built Buf image
 */
function getFileDescriptorSet() {
  const fdsBytes = readFileSync("./descriptorset.bin");
  return FileDescriptorSet.fromBinary(fdsBytes);
}
