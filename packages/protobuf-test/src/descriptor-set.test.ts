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

import { beforeAll, describe, expect, test } from "@jest/globals";
import { readFileSync } from "fs";
import type { AnyDesc } from "@bufbuild/protobuf";
import {
  FeatureSetDefaults,
  FileDescriptorSet,
  getExtension,
} from "@bufbuild/protobuf";
import {
  test as test_ext,
  TestFeatures,
} from "./gen/ts/google/protobuf/unittest_features_pb.js";
import { UpstreamProtobuf } from "upstream-protobuf";
import { join } from "node:path";
import { createDescFileSet } from "@bufbuild/protobuf/next/reflect";

describe("DescriptorSet", () => {
  // TODO move over to desc-set.test.ts once getExtension() supports DescExtension, so that we don't need generated code for this test
  describe("edition custom features", () => {
    const upstream = new UpstreamProtobuf();
    let testProto: Record<"google/protobuf/unittest_features.proto", string>;
    let featureSetDefaults: FeatureSetDefaults;
    beforeAll(async () => {
      const { dir } = await upstream.getTestProtoInclude();
      const content = readFileSync(
        join(dir, "google/protobuf/unittest_features.proto"),
        "utf-8",
      );
      testProto = {
        "google/protobuf/unittest_features.proto": content,
      };
      const bin = await upstream.getFeatureSetDefaults(
        "PROTO2",
        "2023",
        testProto,
      );
      featureSetDefaults = FeatureSetDefaults.fromBinary(bin);
    });
    test("default values can be read from unknown fields of getFeatures()", async () => {
      const bin = await upstream.compileToDescriptorSet(
        {
          ...testProto,
          "input.proto": `
            edition = "2023";
            package protobuf_unittest;
            `,
        },
        { includeImports: true },
      );
      const set = createDescFileSet(FileDescriptorSet.fromBinary(bin), {
        featureSetDefaults,
      });
      const file = set.getFile("input.proto");
      expect(file).toBeDefined();
      if (file !== undefined) {
        const tf = getTestFeatures(file);
        expect(tf.intFileFeature).toBe(1);
      }
    });
    test("overrides can be read from unknown fields of getFeatures()", async () => {
      const bin = await upstream.compileToDescriptorSet(
        {
          ...testProto,
          "input.proto": `
            edition = "2023";
            package protobuf_unittest;
            import "google/protobuf/unittest_features.proto";
            option features.(pb.test).int_file_feature = 8;
            `,
        },
        { includeImports: true },
      );
      const set = createDescFileSet(FileDescriptorSet.fromBinary(bin), {
        featureSetDefaults,
      });
      const file = set.getFile("input.proto");
      expect(file).toBeDefined();
      if (file !== undefined) {
        const tf = getTestFeatures(file);
        expect(tf.intFileFeature).toBe(8);
      }
    });

    function getTestFeatures(
      desc: AnyDesc,
    ): TestFeatures & Required<TestFeatures> {
      return getExtension(desc.getFeatures(), test_ext) as TestFeatures &
        Required<TestFeatures>;
    }
  });
});
