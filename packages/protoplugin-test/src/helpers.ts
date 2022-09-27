// Copyright 2021-2022 Buf Technologies, Inc.
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

import { FileDescriptorSet, CodeGeneratorRequest } from "@bufbuild/protobuf";
import { readFileSync } from "fs";

// If no files are passed, default to generating all files.
const defaultFiles = ["proto/address_book.proto", "proto/person.proto"];

export function getCodeGeneratorRequest(
  parameter = "",
  fileToGenerate = defaultFiles
) {
  const fdsBytes = readFileSync("./descriptorset.bin");
  const fds = FileDescriptorSet.fromBinary(fdsBytes);
  return new CodeGeneratorRequest({
    parameter,
    fileToGenerate, // tells the plugin which files from the set to generate
    protoFile: fds.file,
  });
}
