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

import { beforeEach, describe, expect, test } from "@jest/globals";
import { createTestPluginAndRun, getFeatureSetDefaults } from "./helpers.js";
import {
  BinaryReader,
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature,
  FeatureSet,
  FeatureSetDefaults,
} from "@bufbuild/protobuf";
import { readFileSync } from "node:fs";
import assert from "node:assert";
import { TestFeatures } from "./gen/edition-custom-features_pb.js";

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

  describe("with explicit opt-in to editions", () => {
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
        const res = await createTestPluginAndRun({
          proto: syntax + ";",
          supportsEditions: true,
          featureSetDefaults: await getFeatureSetDefaults("PROTO2", "2023"),
          generateAny: (f) => f.print("// placeholder"),
        });
        expect(res.file.length).toBeGreaterThanOrEqual(1);
      },
    );
    test("raises error for unsupported edition", async () => {
      const resPromise = createTestPluginAndRun({
        proto: `syntax="proto2";`,
        supportsEditions: true,
        featureSetDefaults: await getFeatureSetDefaults("PROTO3", "2023"),
        generateAny() {},
      });
      await expect(resPromise).rejects.toThrow(
        /^Edition EDITION_PROTO2 is earlier than the minimum supported edition EDITION_PROTO3$/,
      );
    });
  });

  describe("with custom features", () => {
    let featureSetDefaults: FeatureSetDefaults;
    let testProto: Record<string, string>;
    beforeEach(async () => {
      testProto = {
        "edition-custom-features.proto": readFileSync(
          "proto/edition-custom-features.proto",
          "utf-8",
        ),
      };
      featureSetDefaults = await getFeatureSetDefaults(
        "PROTO2",
        "2023",
        testProto,
      );
    });

    test("provides custom feature defaults", async () => {
      const res = await createTestPluginAndRun({
        proto: {
          "input.proto": `edition="2023";`,
        },
        supportsEditions: true,
        featureSetDefaults,
        generateAny(f, schema) {
          expect(schema.files[0].name).toBe("input");
          const file = schema.files.find((f) => f.name == "input");
          expect(file).toBeDefined();
          if (file !== undefined) {
            const testFeatures = getTestFeatures(file.getFeatures());
            expect(testFeatures).toBeDefined();
            expect(testFeatures.intFileFeature).toBe(1);
          }
          f.print("// placeholder");
        },
      });
      expect(res.file.length).toBeGreaterThanOrEqual(1);
    });

    // test helper to read a message field extension to google.protobuf.FeatureSet
    function getTestFeatures(
      features: FeatureSet,
    ): TestFeatures & Required<TestFeatures> {
      const uf = TestFeatures.runtime.bin
        .listUnknownFields(features)
        .filter((f) => f.no === 9999);
      assert(uf.length >= 0);
      const tf = new TestFeatures();
      for (const { data } of uf) {
        const bytes = new BinaryReader(data).bytes();
        tf.fromBinary(bytes, { readUnknownFields: false });
      }
      return tf as TestFeatures & Required<TestFeatures>;
    }
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
