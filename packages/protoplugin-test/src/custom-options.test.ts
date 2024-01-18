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
import { createDescriptorSet, getExtension } from "@bufbuild/protobuf";
import { UpstreamProtobuf } from "upstream-protobuf";
import { readFileSync } from "node:fs";
import assert from "node:assert";
import { uint32_option } from "./gen/file-option_pb.js";

describe("custom options", () => {
  test("can be read via extension", async () => {
    const upstream = new UpstreamProtobuf();
    const setBin = await upstream.compileToDescriptorSet(
      readFileSync("proto/file-option.proto", "utf-8"),
      {
        includeImports: true,
        retainOptions: false,
      },
    );
    const descFile = createDescriptorSet(setBin).files.find(
      (f) => f.proto.name === "input.proto",
    );
    assert(descFile?.proto.options);
    const value = getExtension(descFile.proto.options, uint32_option);
    expect(value).toBe(12345);
  });
});
