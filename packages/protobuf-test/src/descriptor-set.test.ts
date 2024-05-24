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
  createDescriptorSet,
  Edition,
  FeatureSet,
  FeatureSet_EnumType,
  FeatureSet_FieldPresence,
  FeatureSet_JsonFormat,
  FeatureSet_MessageEncoding,
  FeatureSet_RepeatedFieldEncoding,
  FeatureSet_Utf8Validation,
  FeatureSetDefaults,
  FileDescriptorSet,
  getExtension,
  proto3,
  ScalarType,
} from "@bufbuild/protobuf";
import { JsonNamesMessage } from "./gen/ts/extra/msg-json-names_pb.js";
import { MapsMessage } from "./gen/ts/extra/msg-maps_pb.js";
import { RepeatedScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb.js";
import { MessageWithComments } from "./gen/ts/extra/comments_pb.js";
import { SimpleEnum } from "./gen/ts/extra/enum_pb.js";
import {
  TestAllExtensions,
  TestNestedExtension,
} from "./gen/ts/google/protobuf/unittest_pb.js";
import {
  EnumFeature,
  test as test_ext,
  TestFeatures,
} from "./gen/ts/google/protobuf/unittest_features_pb.js";
import { UpstreamProtobuf } from "upstream-protobuf";
import { join } from "node:path";

const fdsBytes = readFileSync("./descriptorset.binpb");

describe("DescriptorSet", () => {
  describe("file", () => {
    test("proto2 syntax", () => {
      const set = createDescriptorSet(fdsBytes);
      const descFile = set.files.find((f) => f.name == "extra/proto2");
      expect(descFile).toBeDefined();
      expect(descFile?.syntax).toBe("proto2");
      expect(descFile?.edition).toBe(Edition.EDITION_PROTO2);
      expect(descFile?.getFeatures()).toStrictEqual(
        new FeatureSet({
          fieldPresence: FeatureSet_FieldPresence.EXPLICIT,
          enumType: FeatureSet_EnumType.CLOSED,
          repeatedFieldEncoding: FeatureSet_RepeatedFieldEncoding.EXPANDED,
          utf8Validation: FeatureSet_Utf8Validation.NONE,
          messageEncoding: FeatureSet_MessageEncoding.LENGTH_PREFIXED,
          jsonFormat: FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
        }),
      );
    });
    test("proto3 syntax", () => {
      const set = createDescriptorSet(fdsBytes);
      const descFile = set.files.find((f) => f.name == "extra/proto3");
      expect(descFile).toBeDefined();
      expect(descFile?.syntax).toBe("proto3");
      expect(descFile?.edition).toBe(Edition.EDITION_PROTO3);
      expect(descFile?.getFeatures()).toStrictEqual(
        new FeatureSet({
          fieldPresence: FeatureSet_FieldPresence.IMPLICIT,
          enumType: FeatureSet_EnumType.OPEN,
          repeatedFieldEncoding: FeatureSet_RepeatedFieldEncoding.PACKED,
          utf8Validation: FeatureSet_Utf8Validation.VERIFY,
          messageEncoding: FeatureSet_MessageEncoding.LENGTH_PREFIXED,
          jsonFormat: FeatureSet_JsonFormat.ALLOW,
        }),
      );
    });
    test("edition 2023", () => {
      const set = createDescriptorSet(fdsBytes);
      const descFile = set.files.find(
        (f) => f.name == "editions/edition2023-default-features",
      );
      expect(descFile).toBeDefined();
      expect(descFile?.syntax).toBe("editions");
      expect(descFile?.edition).toBe(Edition.EDITION_2023);
      expect(descFile?.getFeatures()).toStrictEqual(
        new FeatureSet({
          fieldPresence: FeatureSet_FieldPresence.EXPLICIT,
          enumType: FeatureSet_EnumType.OPEN,
          repeatedFieldEncoding: FeatureSet_RepeatedFieldEncoding.PACKED,
          utf8Validation: FeatureSet_Utf8Validation.VERIFY,
          messageEncoding: FeatureSet_MessageEncoding.LENGTH_PREFIXED,
          jsonFormat: FeatureSet_JsonFormat.ALLOW,
        }),
      );
    });
    test("dependencies", async () => {
      const fdsBin = await new UpstreamProtobuf().compileToDescriptorSet({
        "a.proto": `syntax="proto3";
          import "b.proto";
          import "c.proto";`,
        "b.proto": `syntax="proto3";`,
        "c.proto": `syntax="proto3";`,
      });
      const set = createDescriptorSet(fdsBin);
      const a = set.files[2];
      expect(a.name).toBe("a");
      expect(a.dependencies.length).toBe(2);
      expect(a.dependencies.map((f) => f.name)).toStrictEqual(["b", "c"]);
    });
  });
  describe("edition feature options", () => {
    test("file options should apply to all elements", async () => {
      const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        edition = "2023";
        option features.field_presence = IMPLICIT;
        option features.enum_type = CLOSED;
        option features.repeated_field_encoding = EXPANDED;
        option features.utf8_validation = NONE;
        option features.message_encoding = DELIMITED;
        option features.json_format = LEGACY_BEST_EFFORT;
        message M {
          message NestedMessage {
            message DeepNestedMessage {}
            enum DeepNestedEnum { A = 0; }
          }
          enum NestedEnum { A = 0; }
        }
        enum E { A = 0; }
        service S {
          rpc A(M) returns (M);
        }`);
      const { files, messages, enums, services } = createDescriptorSet(bin);
      const wantFeatures = new FeatureSet({
        fieldPresence: FeatureSet_FieldPresence.IMPLICIT,
        enumType: FeatureSet_EnumType.CLOSED,
        repeatedFieldEncoding: FeatureSet_RepeatedFieldEncoding.EXPANDED,
        utf8Validation: FeatureSet_Utf8Validation.NONE,
        messageEncoding: FeatureSet_MessageEncoding.DELIMITED,
        jsonFormat: FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
      });
      expect(files[0].getFeatures()).toStrictEqual(wantFeatures);
      expect(messages.get("M")?.getFeatures()).toStrictEqual(wantFeatures);
      expect(messages.get("M.NestedMessage")?.getFeatures()).toStrictEqual(
        wantFeatures,
      );
      expect(
        messages.get("M.NestedMessage.DeepNestedMessage")?.getFeatures(),
      ).toStrictEqual(wantFeatures);
      expect(enums.get("E")?.getFeatures()).toStrictEqual(wantFeatures);
      expect(enums.get("M.NestedEnum")?.getFeatures()).toStrictEqual(
        wantFeatures,
      );
      expect(
        enums.get("M.NestedMessage.DeepNestedEnum")?.getFeatures(),
      ).toStrictEqual(wantFeatures);
      expect(services.get("S")?.getFeatures()).toStrictEqual(wantFeatures);
      expect(services.get("S")?.methods[0].getFeatures()).toStrictEqual(
        wantFeatures,
      );
    });
    test("message options should apply to nested elements", async () => {
      const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        edition="2023";
        enum EnumJsonAllow { A = 0; }
        message MessageJsonAllow {
          int32 f = 1;
          enum EnumJsonAllow { A = 0; }
          message MessageJsonAllow {
            int32 f = 1;
          }
          message MessageJsonLegacy {
            option features.json_format = LEGACY_BEST_EFFORT;
            int32 f = 1;
            enum EnumJsonLegacy { A = 0; }
            message MessageJsonLegacy {
              int32 f = 1;
            }
          }
        }`);
      const { messages, enums } = createDescriptorSet(bin);

      function expectJsonFormat(
        jsonFormat: FeatureSet_JsonFormat,
        desc: AnyDesc | undefined,
      ) {
        expect(desc?.getFeatures().jsonFormat).toBe(jsonFormat);
        if (desc?.kind == "message") {
          for (const field of desc.fields) {
            expect(field.getFeatures().jsonFormat).toBe(jsonFormat);
          }
          for (const oneof of desc.oneofs) {
            expect(oneof.getFeatures().jsonFormat).toBe(jsonFormat);
          }
        }
        if (desc?.kind == "enum") {
          for (const value of desc.values) {
            expect(value.getFeatures().jsonFormat).toBe(jsonFormat);
          }
        }
      }

      expectJsonFormat(FeatureSet_JsonFormat.ALLOW, enums.get("EnumJsonAllow"));
      expectJsonFormat(
        FeatureSet_JsonFormat.ALLOW,
        messages.get("MessageJsonAllow"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.ALLOW,
        enums.get("MessageJsonAllow.EnumJsonAllow"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.ALLOW,
        messages.get("MessageJsonAllow.MessageJsonAllow"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
        messages.get("MessageJsonAllow.MessageJsonLegacy"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
        enums.get("MessageJsonAllow.MessageJsonLegacy.EnumJsonLegacy"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
        messages.get("MessageJsonAllow.MessageJsonLegacy.MessageJsonLegacy"),
      );
    });
  });
  describe("with own feature-set defaults", () => {
    test.each([`syntax="proto3"`, `syntax="proto2"`, `edition="2023"`])(
      "parses %s without error",
      async (syntax) => {
        const upstream = new UpstreamProtobuf();
        const fsdBin = await upstream.getFeatureSetDefaults("PROTO2", "2023");
        const fsd = FeatureSetDefaults.fromBinary(fsdBin);
        const fdsBin = await new UpstreamProtobuf().compileToDescriptorSet(
          syntax + ";",
        );
        const set = createDescriptorSet(fdsBin, {
          featureSetDefaults: fsd,
        });
        expect(set.files.length).toBe(1);
        expect(set.files[0].getFeatures()).toBeDefined();
      },
    );
    test("raises error when parsing unsupported edition from the past", async () => {
      const upstream = new UpstreamProtobuf();
      const featureSetDefaults = FeatureSetDefaults.fromBinary(
        await upstream.getFeatureSetDefaults("PROTO3", "2023"),
      );
      const fileDescriptorSet =
        await new UpstreamProtobuf().compileToDescriptorSet(`syntax="proto2";`);
      expect(() =>
        createDescriptorSet(fileDescriptorSet, {
          featureSetDefaults,
        }),
      ).toThrow(
        /^Edition EDITION_PROTO2 is earlier than the minimum supported edition EDITION_PROTO3$/,
      );
    });
    test("raises error when parsing unsupported edition from the future", async () => {
      const upstream = new UpstreamProtobuf();
      const featureSetDefaults = FeatureSetDefaults.fromBinary(
        await upstream.getFeatureSetDefaults("PROTO2", "2023"),
      );
      const fileDescriptorSet = FileDescriptorSet.fromBinary(
        await new UpstreamProtobuf().compileToDescriptorSet(`edition="2023";`),
      );
      fileDescriptorSet.file[0].edition = Edition.EDITION_99999_TEST_ONLY;
      expect(() =>
        createDescriptorSet(fileDescriptorSet, {
          featureSetDefaults,
        }),
      ).toThrow(
        /^Edition EDITION_99999_TEST_ONLY is later than the maximum supported edition EDITION_2023$/,
      );
    });
  });
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
      const set = createDescriptorSet(bin, { featureSetDefaults });
      const file = set.files.find((f) => f.name === "input");
      expect(file).toBeDefined();
      if (file !== undefined) {
        const tf = getTestFeatures(file);
        expect(tf.fileFeature).toBe(EnumFeature.VALUE3);
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
            option features.(pb.test).file_feature = VALUE8;
            `,
        },
        { includeImports: true },
      );
      const set = createDescriptorSet(bin, { featureSetDefaults });
      const file = set.files.find((f) => f.name === "input");
      expect(file).toBeDefined();
      if (file !== undefined) {
        const tf = getTestFeatures(file);
        expect(tf.fileFeature).toBe(EnumFeature.VALUE8);
      }
    });

    function getTestFeatures(
      desc: AnyDesc,
    ): TestFeatures & Required<TestFeatures> {
      return getExtension(desc.getFeatures(), test_ext) as TestFeatures &
        Required<TestFeatures>;
    }
  });
  describe("repeated field packing", () => {
    test("proto2 is unpacked by default", async () => {
      const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        syntax="proto2";
        message M {
          optional int32 not_packable = 1;
          repeated bytes also_not_packable = 2;
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [packed = true];
          repeated int32 explicitly_expanded = 5 [packed = false];
        }
      `);
      const fields = createDescriptorSet(bin).messages.get("M")?.fields;
      expect(fields?.[0].packedByDefault).toBe(false);
      expect(fields?.[1].packedByDefault).toBe(false);
      expect(fields?.[2].packedByDefault).toBe(false);
      expect(fields?.[0].packed).toBe(false);
      expect(fields?.[1].packed).toBe(false);
      expect(fields?.[2].packed).toBe(false);
      expect(fields?.[3].packed).toBe(true);
      expect(fields?.[4].packed).toBe(false);
    });
    test("proto3 is packed by default", async () => {
      const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        syntax="proto3";
        message M {
          int32 not_packable = 1;
          repeated bytes also_not_packable = 2;
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [packed = true];
          repeated int32 explicitly_expanded = 5 [packed = false];
        }
      `);
      const fields = createDescriptorSet(bin).messages.get("M")?.fields;
      expect(fields?.[0].packedByDefault).toBe(true);
      expect(fields?.[1].packedByDefault).toBe(false);
      expect(fields?.[2].packedByDefault).toBe(true);
      expect(fields?.[0].packed).toBe(true);
      expect(fields?.[1].packed).toBe(false);
      expect(fields?.[2].packed).toBe(true);
      expect(fields?.[3].packed).toBe(true);
      expect(fields?.[4].packed).toBe(false);
    });
    test("edition2023 is packed by default", async () => {
      const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        edition="2023";
        message M {
          int32 not_packable = 1;
          repeated bytes also_not_packable = 2;
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [features.repeated_field_encoding = PACKED];
          repeated int32 explicitly_expanded = 5 [features.repeated_field_encoding = EXPANDED];
        }
      `);
      const fields = createDescriptorSet(bin).messages.get("M")?.fields;
      expect(fields?.[0].packedByDefault).toBe(true);
      expect(fields?.[1].packedByDefault).toBe(false);
      expect(fields?.[2].packedByDefault).toBe(true);
      expect(fields?.[0].packed).toBe(true);
      expect(fields?.[1].packed).toBe(false);
      expect(fields?.[2].packed).toBe(true);
      expect(fields?.[3].packed).toBe(true);
      expect(fields?.[4].packed).toBe(false);
    });
    test("edition2023 with repeated_field_encoding file option", async () => {
      const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        edition="2023";
        option features.repeated_field_encoding = EXPANDED;
        message M {
          int32 not_packable = 1;
          repeated bytes also_not_packable = 2;
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [features.repeated_field_encoding = PACKED];
        }
      `);
      const fields = createDescriptorSet(bin).messages.get("M")?.fields;
      expect(fields?.[0].packedByDefault).toBe(true);
      expect(fields?.[1].packedByDefault).toBe(false);
      expect(fields?.[2].packedByDefault).toBe(true);
      expect(fields?.[0].packed).toBe(false);
      expect(fields?.[1].packed).toBe(false);
      expect(fields?.[2].packed).toBe(false);
      expect(fields?.[3].packed).toBe(true);
    });
  });
  test("knows extension", () => {
    const set = createDescriptorSet(fdsBytes);
    const ext = set.extensions.get(
      "protobuf_unittest.optional_int32_extension",
    );
    expect(ext).toBeDefined();
    expect(ext?.name).toBe("optional_int32_extension");
    expect(ext?.typeName).toBe("protobuf_unittest.optional_int32_extension");
    expect(ext?.extendee.typeName).toBe(TestAllExtensions.typeName);
    expect(ext?.optional).toBe(true);
    expect(ext?.kind).toBe("extension");
    expect(ext?.fieldKind).toBe("scalar");
    expect(ext?.scalar).toBe(ScalarType.INT32);
    expect(ext?.toString()).toBe(
      "extension protobuf_unittest.optional_int32_extension",
    );
    expect(ext?.declarationString()).toBe(
      "optional int32 optional_int32_extension = 1",
    );
  });
  test("knows nested extension", () => {
    const set = createDescriptorSet(fdsBytes);
    const ext = set.extensions.get(
      "protobuf_unittest.TestNestedExtension.nested_string_extension",
    );
    expect(ext).toBeDefined();
    expect(ext?.name).toBe("nested_string_extension");
    expect(ext?.typeName).toBe(
      "protobuf_unittest.TestNestedExtension.nested_string_extension",
    );
    expect(ext?.extendee.typeName).toBe(TestAllExtensions.typeName);
    expect(ext?.scalar).toBe(ScalarType.STRING);
    expect(ext?.toString()).toBe(
      "extension protobuf_unittest.TestNestedExtension.nested_string_extension",
    );
    expect(ext?.declarationString()).toBe(
      "optional string nested_string_extension = 1003",
    );
    const ext2 = set.messages
      .get(TestNestedExtension.typeName)
      ?.nestedExtensions.find((ext) => ext.name === "nested_string_extension");
    expect(ext2).toBe(ext);
  });
  describe("declarationString()", () => {
    test("for field with options", () => {
      const set = createDescriptorSet(fdsBytes);
      const message = set.messages.get(JsonNamesMessage.typeName);
      expect(message).toBeDefined();
      if (message !== undefined) {
        const field = message.fields.find((f) => f.number === 1);
        expect(field?.declarationString()).toBe(
          'string scalar_field = 1 [json_name = "scalarFieldJsonName"]',
        );
      }
    });
    test("for field with labels", () => {
      const set = createDescriptorSet(fdsBytes);
      const message = set.messages.get(RepeatedScalarValuesMessage.typeName);
      expect(message).toBeDefined();
      if (message !== undefined) {
        const field = message.fields.find((f) => f.number === 1);
        expect(field?.declarationString()).toBe(
          "repeated double double_field = 1",
        );
      }
    });
    test("for map field", () => {
      const set = createDescriptorSet(fdsBytes);
      const message = set.messages.get(MapsMessage.typeName);
      const got = message?.fields
        .find((f) => f.name === "int32_msg_field")
        ?.declarationString();
      expect(got).toBe("map<int32, spec.MapsMessage> int32_msg_field = 10");
    });
    test("for enum value", () => {
      const set = createDescriptorSet(fdsBytes);
      const e = set.enums.get(proto3.getEnumType(SimpleEnum).typeName);
      const got = e?.values
        .find((v) => v.name === "SIMPLE_ZERO")
        ?.declarationString();
      expect(got).toBe("SIMPLE_ZERO = 0");
    });
  });
  describe("getComments()", () => {
    describe("for file", () => {
      const set = createDescriptorSet(fdsBytes);
      const file = set.files.find((file) =>
        file.messages.some(
          (message) => message.typeName === MessageWithComments.typeName,
        ),
      );
      test("syntax", () => {
        const comments = file?.getSyntaxComments();
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
        const comments = file?.getPackageComments();
        expect(comments).toBeDefined();
        if (comments) {
          expect(comments.leadingDetached[0]).toBe(" Comment after syntax.\n");
          expect(comments.leading).toBe(" Comment before package.\n");
          expect(comments.trailing).toBe(" Comment next to package.\n");
        }
      });
    });
    test("for message", () => {
      const set = createDescriptorSet(fdsBytes);
      const message = set.messages.get(MessageWithComments.typeName);
      const comments = message?.getComments();
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
      const set = createDescriptorSet(fdsBytes);
      const field = set.messages
        .get(MessageWithComments.typeName)
        ?.fields.find((field) => field.name === "foo");
      const comments = field?.getComments();
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
