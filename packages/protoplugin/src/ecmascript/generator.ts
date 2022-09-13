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

import type { Schema } from "./schema.js";

export interface Generator {
  generate: (schema: Schema) => void;

  // This could be here and would be invoked if generate is not passed.
  // How can we make TypeScript say 'one of these must be present'
  // transpile?: (generatedFiles: GeneratedFile[]) => void;
}
