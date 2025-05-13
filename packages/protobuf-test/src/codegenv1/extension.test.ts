// Copyright 2021-2025 Buf Technologies, Inc.
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

import { describe, expect, test } from "@jest/globals";
import { compileFile } from "../helpers.js";
import { extDesc } from "@bufbuild/protobuf/codegenv1";

describe("extDesc()", () => {
  test("resolves extension", async () => {
    const descFile = await compileFile(`
      syntax="proto3";
      import "google/protobuf/descriptor.proto";
      extend google.protobuf.MethodOptions {
        bool http = 72295729;
      }
    `);
    const descExtension = extDesc(descFile, 0);
    expect(descExtension.typeName).toBe("http");
  });
});
