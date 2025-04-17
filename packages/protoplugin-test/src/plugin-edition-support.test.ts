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
import { fromBinary, minimumEdition, maximumEdition } from "@bufbuild/protobuf";
import {
  CodeGeneratorRequestSchema,
  CodeGeneratorResponse_Feature,
  Edition,
} from "@bufbuild/protobuf/wkt";
import { createTestPluginAndRun } from "./helpers.js";
import { UpstreamProtobuf } from "upstream-protobuf";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { SupportedEdition } from "@bufbuild/protobuf";

async function runPlugin(
  actualEdition: Edition,
  minimumEdition?: SupportedEdition,
  maximumEdition?: SupportedEdition,
) {
  const upstream = new UpstreamProtobuf();
  const reqBytes = await upstream.createCodeGeneratorRequest(
    {
      "test.proto": `edition="2023";`,
    },
    {
      filesToGenerate: ["test.proto"],
    },
  );
  const req = fromBinary(CodeGeneratorRequestSchema, reqBytes);
  req.protoFile[0].edition = actualEdition;
  const plugin = createEcmaScriptPlugin({
    name: "test",
    version: "v1",
    minimumEdition,
    maximumEdition,
    generateTs: noop,
    generateJs: noop,
    generateDts: noop,
  });
  return plugin.run(req);
}

function noop() {
  //
}

describe("editions support in plugins", () => {
  test("sets SUPPORTS_EDITIONS", async () => {
    const res = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny: noop,
    });
    const supportsEditions =
      (res.supportedFeatures &
        BigInt(CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS)) ===
      BigInt(CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS);
    expect(supportsEditions).toBe(true);
  });
  test("sets supported edition range to @bufbuild/protobuf's supported range", async () => {
    const res = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      generateAny: noop,
    });
    expect(res.minimumEdition).toBe(minimumEdition);
    expect(res.maximumEdition).toBe(maximumEdition);
  });
  test("sets supported edition range to the provided range", async () => {
    const res = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      minimumEdition: Edition.EDITION_PROTO2,
      maximumEdition: Edition.EDITION_PROTO3,
      generateAny: noop,
    });
    expect(res.minimumEdition).toBe(Edition.EDITION_PROTO2);
    expect(res.maximumEdition).toBe(Edition.EDITION_PROTO3);
  });
  test("raises error for minimumEdition > maximumEdition", async () => {
    await expect(async () =>
      runPlugin(
        Edition.EDITION_PROTO3,
        Edition.EDITION_PROTO3,
        Edition.EDITION_PROTO2,
      ),
    ).rejects.toThrow(
      /^configured minimumEdition PROTO3 > maximumEdition PROTO2 - please contact plugin author$/,
    );
  });
  test("raises error on unsupported edition from the past with default range", async () => {
    await expect(async () =>
      runPlugin(Edition.EDITION_1_TEST_ONLY),
    ).rejects.toThrow(
      /^test.proto: unsupported edition 1_TEST_ONLY - the earliest supported edition is PROTO2$/,
    );
  });
  test("raises error on unsupported edition from the future with default range", async () => {
    await expect(async () =>
      runPlugin(Edition.EDITION_99999_TEST_ONLY),
    ).rejects.toThrow(
      /^test.proto: unsupported edition 99999_TEST_ONLY - the latest supported edition is 2023$/,
    );
  });
  test("raises error on unsupported edition from the past with custom range", async () => {
    await expect(async () =>
      runPlugin(
        Edition.EDITION_PROTO2,
        Edition.EDITION_PROTO3,
        Edition.EDITION_PROTO3,
      ),
    ).rejects.toThrow(
      /^test.proto: unsupported edition PROTO2 - the earliest supported edition is PROTO3$/,
    );
  });
  test("raises error on unsupported edition from the future with custom range", async () => {
    await expect(async () =>
      runPlugin(
        Edition.EDITION_2023,
        Edition.EDITION_PROTO3,
        Edition.EDITION_PROTO3,
      ),
    ).rejects.toThrow(
      /^test.proto: unsupported edition 2023 - the latest supported edition is PROTO3$/,
    );
  });
});
