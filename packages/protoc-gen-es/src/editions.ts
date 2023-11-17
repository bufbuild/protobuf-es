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

import type { ImportSymbol, Schema } from "@bufbuild/protoplugin/ecmascript";
import { DescFile } from "@bufbuild/protobuf";

/**
 * Temporary function to retrieve the import symbol for the proto2 or proto3
 * runtime.
 *
 * For syntax "editions", this function raises and error.
 *
 * Once support for "editions" is implemented in the runtime, this function can
 * be removed.
 */
export function getNonEditionRuntime(
  schema: Schema,
  file: DescFile,
): ImportSymbol {
  if (file.syntax === "editions") {
    // TODO support editions
    throw new Error(
      `${file.proto.name ?? ""}: syntax "editions" is not supported yet`,
    );
  }
  return schema.runtime[file.syntax];
}
