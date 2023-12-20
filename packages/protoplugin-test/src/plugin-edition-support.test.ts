// Copyright 2021-2023 Buf Technologies, Inc.
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
  FeatureSetDefaults,
} from "@bufbuild/protobuf";
import { UpstreamProtobuf } from "upstream-protobuf";
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

  describe("with own feature-set defaults", () => {
    test.each([`syntax="proto3"`, `syntax="proto2"`, `edition="2023"`])(
      "generates %s",
      async (syntax) => {
        const upstream = new UpstreamProtobuf();
        const featureSetDefaults = FeatureSetDefaults.fromBinary(
          await upstream.getFeatureSetDefaults("PROTO2", "2023"),
        );
        const res = await createTestPluginAndRun({
          proto: syntax + ";",
          supportsEditions: true,
          featureSetDefaults,
          generateAny: (f) => f.print("// placeholder"),
        });
        expect(res.file.length).toBeGreaterThanOrEqual(1);
      },
    );
    test("raises error for unsupported edition from the past", async () => {
      const upstream = new UpstreamProtobuf();
      const featureSetDefaults = FeatureSetDefaults.fromBinary(
        await upstream.getFeatureSetDefaults("PROTO3", "2023"),
      );
      const resPromise = createTestPluginAndRun({
        proto: `syntax="proto2";`,
        supportsEditions: true,
        featureSetDefaults,
        generateAny() {},
      });
      await expect(resPromise).rejects.toThrow(
        /^Edition EDITION_PROTO2 is earlier than the minimum supported edition EDITION_PROTO3$/,
      );
    });
    test("raises error for unsupported edition from the future", async () => {
      const upstream = new UpstreamProtobuf();
      const reqBytes = await upstream.createCodeGeneratorRequest(
        `edition="2023";`, // we're going to modify this
      );
      const req = CodeGeneratorRequest.fromBinary(reqBytes);
      req.parameter = "target=ts";
      expect(req.protoFile.length).toBe(1);
      req.protoFile[0].edition = Edition.EDITION_99999_TEST_ONLY;
      const plugin = createEcmaScriptPlugin({
        name: "test",
        version: "v1",
        generateTs() {},
      });
      expect(() => plugin.run(req)).toThrow(
        /^Edition EDITION_99999_TEST_ONLY is later than the maximum supported edition EDITION_2023$/,
      );
    });
  });

  describe("with own feature-set defaults but without opt-in to editions", () => {
    test("does not set SUPPORTS_EDITIONS", async () => {
      const res = await createTestPluginAndRun({
        proto: `syntax="proto3";`,
        generateAny() {},
      });
      expect(supportsEditions(res)).toBe(false);
    });
  });

  function supportsEditions(res: CodeGeneratorResponse): boolean {
    const f = res.supportedFeatures ?? 0n;
    return (
      (f & BigInt(CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS)) ===
      BigInt(CodeGeneratorResponse_Feature.SUPPORTS_EDITIONS)
    );
  }
});
