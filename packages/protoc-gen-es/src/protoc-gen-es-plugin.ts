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

import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import { typescript } from "./typescript.js";
import { version } from "../package.json";

export const protocGenEs = createEcmaScriptPlugin(
  {
    name: "protoc-gen-es",
    version: `v${String(version)}`,
  },
  (schema: Schema) => {
      for (const file of schema.files) {
        const f = schema.generateFile(file.name + typescript.extension);
        f.preamble(file);
        for (const enumeration of file.enums) {
          typescript.generateEnum(schema, f, enumeration);
        }
        for (const message of file.messages) {
          typescript.generateMessage(schema, f, message);
        }
        // We do not generate anything for services, and we do not support extensions at this time
      }
  }
);
