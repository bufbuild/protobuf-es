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

import { ModuleDesc } from "./gen/protobuf-es/buf/alpha/module/v1alpha1/module_pb.js";
import { create, toBinary } from "@bufbuild/protobuf";

const module = create(ModuleDesc, {
  files: [
    {
      path: "foo.proto",
    },
  ],
});

const bytes = toBinary(ModuleDesc, module);

/* eslint-disable no-console,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
// @ts-ignore
console.log(bytes.length);
