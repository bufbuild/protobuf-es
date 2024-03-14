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
  proto3,
} from "@bufbuild/protobuf";
import { JsonNamesMessage } from "./gen/ts/extra/msg-json-names_pb.js";
import { MapsMessage } from "./gen/ts/extra/msg-maps_pb.js";
import { RepeatedScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb.js";
import { MessageWithComments } from "./gen/ts/extra/comments_pb.js";
import { SimpleEnum } from "./gen/ts/extra/enum_pb.js";
import {
  test as test_ext,
  TestFeatures,
} from "./gen/ts/google/protobuf/unittest_features_pb.js";
import { UpstreamProtobuf } from "upstream-protobuf";
import { join } from "node:path";
import { createDescFileSet } from "@bufbuild/protobuf/next/reflect";
import {
  getComments,
  getDeclarationString,
  getPackageComments,
  getSyntaxComments,
} from "@bufbuild/protoplugin/next";

const fileDescriptorSet = FileDescriptorSet.fromBinary(
  readFileSync("./descriptorset.binpb"),
);

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

  describe("declarationString()", () => {
    test("for field with options", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const message = set.getMessage(JsonNamesMessage.typeName);
      expect(message).toBeDefined();
      if (message !== undefined) {
        const field = message.fields.find((f) => f.number === 1);
        expect(field ? getDeclarationString(field) : undefined).toBe(
          'string scalar_field = 1 [json_name = "scalarFieldJsonName"]',
        );
      }
    });
    test("for field with labels", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const message = set.getMessage(RepeatedScalarValuesMessage.typeName);
      expect(message).toBeDefined();
      if (message !== undefined) {
        const field = message.fields.find((f) => f.number === 1);
        expect(field ? getDeclarationString(field) : undefined).toBe(
          "repeated double double_field = 1",
        );
      }
    });
    test("for map field", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const message = set.getMessage(MapsMessage.typeName);
      const field = message?.fields.find((f) => f.name === "int32_msg_field");
      const got = field ? getDeclarationString(field) : undefined;
      expect(got).toBe("map<int32, spec.MapsMessage> int32_msg_field = 10");
    });
    test("for enum value", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const e = set.getEnum(proto3.getEnumType(SimpleEnum).typeName);
      const v = e?.values.find((v) => v.name === "SIMPLE_ZERO");
      const got = v ? getDeclarationString(v) : undefined;
      expect(got).toBe("SIMPLE_ZERO = 0");
    });
  });
  describe("getComments()", () => {
    describe("for file", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const file = set.getMessage(MessageWithComments.typeName)?.file;
      test("syntax", () => {
        const comments = file ? getSyntaxComments(file) : undefined;
        expect(comments).toBeDefined();
        if (comments) {
          expect(comments.leadingDetached[0]).toMatch(
            / Copyright .* Buf Technologies/,
          );
          expect(comments.leading).toBe(" Comment before syntax.\n");
          expect(comments.trailing).toBe(" Comment next to syntax.\n");
        }
      });
      test("package", () => {
        const comments = file ? getPackageComments(file) : undefined;
        expect(comments).toBeDefined();
        if (comments) {
          expect(comments.leadingDetached[0]).toBe(" Comment after syntax.\n");
          expect(comments.leading).toBe(" Comment before package.\n");
          expect(comments.trailing).toBe(" Comment next to package.\n");
        }
      });
    });
    test("for message", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const message = set.getMessage(MessageWithComments.typeName);
      const comments = message ? getComments(message) : undefined;
      expect(comments).toBeDefined();
      if (comments) {
        expect(comments.leadingDetached).toStrictEqual([
          " Comment after package.\n",
          " Comment between package and message.\n",
        ]);
        expect(comments.leading).toBe(" Comment before message.\n");
        expect(comments.trailing).toBeUndefined();
      }
    });
    test("for field", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const field = set
        .getMessage(MessageWithComments.typeName)
        ?.fields.find((field) => field.name === "foo");
      const comments = field ? getComments(field) : undefined;
      expect(comments).toBeDefined();
      if (comments) {
        expect(comments.leadingDetached).toStrictEqual([
          "\n Comment after start of message,\n with funny indentation,\n and empty lines on start and end.\n\n",
        ]);
        expect(comments.leading).toBe(
          " Comment before field with 5 lines:\n line 2, next is empty\n\n line 4, next is empty\n\n",
        );
        expect(comments.trailing).toBe(" Comment next to field.\n");
      }
    });
  });
});
