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

import { describe, expect, test } from "@jest/globals";
import assert from "node:assert";
import { getExtension } from "@bufbuild/protobuf";
import { compileFile } from "./helpers.js";
import { createTestPluginAndRun } from "./helpers.js";

describe("custom options", () => {
  const proto = `
      syntax = "proto3";
      import "google/protobuf/descriptor.proto";
      package testcustomoptions;
      option (testcustomoptions.uint32_option) = 12345;
      extend google.protobuf.FileOptions {
        optional uint32 uint32_option = 60123;
      }
    `;
  test("can be read via extension", async () => {
    const ext = (await compileFile(proto)).extensions[0];
    assert(ext);
    let readOptionValue: unknown;
    await createTestPluginAndRun({
      proto: {
        "input.proto": proto,
      },
      generateAny(_, schema) {
        const file = schema.files.find((f) => f.proto.name == "input.proto");
        if (file?.proto.options) {
          readOptionValue = getExtension(file.proto.options, ext);
        }
      },
    });
    expect(readOptionValue).toBe(12345);
  });
  test("can be read via extension directly from the descriptor", async () => {
    const file = await compileFile(proto);
    const ext = file.extensions[0];
    assert(ext);
    assert(file.proto.options);
    const value = getExtension(file.proto.options, ext);
    expect(value).toBe(12345);
  });
});
