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
import { compileFile, compileFileDescriptorSet } from "../helpers.js";
import { embedFileDesc } from "@bufbuild/protobuf/codegenv1";
import { createFileRegistry } from "@bufbuild/protobuf";

void suite("embedFileDesc()", () => {
  test("embeds file descriptor", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message M {
        int32 int32_field = 1;
      }
    `);
    const embedded = embedFileDesc(file.proto);
    assert.strictEqual(embedded.bootable, false);
    assert.strictEqual(typeof embedded.base64(), "string");
  });
  test("embeds google/protobuf.descriptor.proto", async () => {
    const file = createFileRegistry(
      await compileFileDescriptorSet({
        "google/protobuf/descriptor.proto": `
        syntax="proto2"; 
        package google.protobuf;
      `,
      }),
    ).getFile("google/protobuf/descriptor.proto");
    assert.ok(file !== undefined);

    const embedded = embedFileDesc(file.proto);
    assert.ok(embedded !== undefined);
    assert.strictEqual(embedded.bootable, true);
    if (embedded.bootable) {
      const b = embedded.boot();
      assert.ok(b !== undefined);
    }
    assert.strictEqual(typeof embedded.base64(), "string");
  });
});
