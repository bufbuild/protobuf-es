// Copyright 2021-2026 Buf Technologies, Inc.
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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import { compileFile } from "../helpers.js";
import { serviceDesc } from "@bufbuild/protobuf/codegenv1";

void suite("serviceDesc()", () => {
  test("resolves service", async () => {
    const descFile = await compileFile(`
      syntax="proto3";
      service Foo {
        rpc Bar(E) returns (E);
      }
      message E {}
    `);
    const descService = serviceDesc(descFile, 0);
    assert.strictEqual(descService.typeName, "Foo");
  });
});
