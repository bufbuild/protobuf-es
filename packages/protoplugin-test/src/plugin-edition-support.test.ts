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
import { createTestPluginAndRun } from "./helpers.js";
import {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature,
  Edition,
} from "@bufbuild/protobuf";
import { UpstreamProtobuf } from "upstream-protobuf";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";

describe("editions support in plugins", () => {
  describe("with default setup", () => {
    test("does not set SUPPORTS_EDITIONS", async () => {
      const res = await createTestPluginAndRun({
        proto: `syntax="proto3";`,
        generateAny() {},
      });
      expect(supportsEditions(res)).toBe(false);
    });
  });

  describe("with opt-in to editions", () => {
    test("does set SUPPORTS_EDITIONS", async () => {
      const res = await createTestPluginAndRun({
        proto: `syntax="proto3";`,
        supportsEditions: true,
        generateAny() {},
      });
      expect(supportsEditions(res)).toBe(true);
    });
    test("generates edition 2023", async () => {
      const res = await createTestPluginAndRun({
        proto: `edition="2023";`,
        supportsEditions: true,
        generateAny: (f) => f.print("// placeholder"),
      });
      expect(res.file.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("with unsupported edition", () => {
    async function createCodeGeneratorRequest() {
      const upstream = new UpstreamProtobuf();
      const reqBytes = await upstream.createCodeGeneratorRequest(
        {
          "test.proto": `edition="2023";`,
        },
        {
          filesToGenerate: ["test.proto"],
        },
      );
      return CodeGeneratorRequest.fromBinary(reqBytes);
    }
    function createTestPlugin() {
      return createEcmaScriptPlugin({
        name: "test",
        version: "v1",
        generateTs: (schema: Schema) => {
          const f = schema.generateFile("test.ts");
          f.print("// ts");
        },
        generateJs: (schema: Schema) => {
          const f = schema.generateFile("test.js");
          f.print("// js");
        },
        generateDts: (schema: Schema) => {
          const f = schema.generateFile("test.d.ts");
          f.print("// dts");
        },
      });
    }
    test("from the future", async () => {
      const req = await createCodeGeneratorRequest();
      req.protoFile[0].edition = Edition.EDITION_99997_TEST_ONLY;
      const plugin = createTestPlugin();
      expect(() => plugin.run(req)).toThrow(
        /^unsupported edition in test.proto: the latest supported edition is 2023$/,
      );
    });
    test("from the past", async () => {
      const req = await createCodeGeneratorRequest();
      req.protoFile[0].edition = Edition.EDITION_1_TEST_ONLY;
      const plugin = createTestPlugin();
      expect(() => plugin.run(req)).toThrow(
        /^unsupported edition in test.proto: the latest supported edition is 2023$/,
      );
    });
  });

  function supportsEditions(res: CodeGeneratorResponse): boolean {
    return (
      (res.supportedFeatures &
        BigInt(CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS)) ===
      BigInt(CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS)
    );
  }
});
