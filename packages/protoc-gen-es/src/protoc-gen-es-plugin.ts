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
import { typescript } from "./typescript.js";
import { javascript } from "./javascript.js";
import { declaration } from "./declaration.js";
// import { transpile } from "./transpile.js";
import { version } from "../package.json";

export const protocGenEs = createEcmaScriptPlugin({
  name: "protoc-gen-es",
  version: `v${String(version)}`,
  generateTs: typescript.generate,
  generateJs: javascript.generate,
  generateDts: declaration.generate,
  // transpile,
});
