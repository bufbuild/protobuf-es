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
import type {
  AnyDesc,
  DescEnum,
  DescMessage,
  DescOneof,
} from "@bufbuild/protobuf";
import {
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
  test as test_ext,
  TestFeatures,
} from "./gen/ts/google/protobuf/unittest_features_pb.js";
import { UpstreamProtobuf } from "upstream-protobuf";
import { join } from "node:path";
import assert from "node:assert";
import { createDescFileSet } from "@bufbuild/protobuf/next/reflect";

const fileDescriptorSet = FileDescriptorSet.fromBinary(
  readFileSync("./descriptorset.binpb"),
);

describe("DescriptorSet", () => {
  describe("file", () => {
    test("proto2 syntax", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const descFile = set.getFile("extra/proto2.proto");
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
      const set = createDescFileSet(fileDescriptorSet);
      const descFile = set.getFile("extra/proto3.proto");
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
      const set = createDescFileSet(fileDescriptorSet);
      const descFile = set.getFile(
        "editions/edition2023-default-features.proto",
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
      const set = createDescFileSet(FileDescriptorSet.fromBinary(fdsBin));
      const a = set.getFile("a.proto");
      expect(a?.name).toBe("a");
      expect(a?.dependencies.length).toBe(2);
      expect(a?.dependencies.map((f) => f.name)).toStrictEqual(["b", "c"]);
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
      const set = createDescFileSet(FileDescriptorSet.fromBinary(bin));
      const wantFeatures = new FeatureSet({
        fieldPresence: FeatureSet_FieldPresence.IMPLICIT,
        enumType: FeatureSet_EnumType.CLOSED,
        repeatedFieldEncoding: FeatureSet_RepeatedFieldEncoding.EXPANDED,
        utf8Validation: FeatureSet_Utf8Validation.NONE,
        messageEncoding: FeatureSet_MessageEncoding.DELIMITED,
        jsonFormat: FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
      });
      expect(set.getFile("input.proto")?.getFeatures()).toStrictEqual(
        wantFeatures,
      );
      expect(set.getMessage("M")?.getFeatures()).toStrictEqual(wantFeatures);
      expect(set.getMessage("M.NestedMessage")?.getFeatures()).toStrictEqual(
        wantFeatures,
      );
      expect(
        set.getMessage("M.NestedMessage.DeepNestedMessage")?.getFeatures(),
      ).toStrictEqual(wantFeatures);
      expect(set.getEnum("E")?.getFeatures()).toStrictEqual(wantFeatures);
      expect(set.getEnum("M.NestedEnum")?.getFeatures()).toStrictEqual(
        wantFeatures,
      );
      expect(
        set.getEnum("M.NestedMessage.DeepNestedEnum")?.getFeatures(),
      ).toStrictEqual(wantFeatures);
      expect(set.getService("S")?.getFeatures()).toStrictEqual(wantFeatures);
      expect(set.getService("S")?.methods[0].getFeatures()).toStrictEqual(
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
      const set = createDescFileSet(FileDescriptorSet.fromBinary(bin));

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

      expectJsonFormat(
        FeatureSet_JsonFormat.ALLOW,
        set.getEnum("EnumJsonAllow"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.ALLOW,
        set.getMessage("MessageJsonAllow"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.ALLOW,
        set.getEnum("MessageJsonAllow.EnumJsonAllow"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.ALLOW,
        set.getMessage("MessageJsonAllow.MessageJsonAllow"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
        set.getMessage("MessageJsonAllow.MessageJsonLegacy"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
        set.getEnum("MessageJsonAllow.MessageJsonLegacy.EnumJsonLegacy"),
      );
      expectJsonFormat(
        FeatureSet_JsonFormat.LEGACY_BEST_EFFORT,
        set.getMessage("MessageJsonAllow.MessageJsonLegacy.MessageJsonLegacy"),
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
        const set = createDescFileSet(FileDescriptorSet.fromBinary(fdsBin), {
          featureSetDefaults: fsd,
        });
        expect(Array.from(set.files).length).toBe(1);
        expect(Array.from(set.files)[0].getFeatures()).toBeDefined();
      },
    );
    test("raises error when parsing unsupported edition from the past", async () => {
      const upstream = new UpstreamProtobuf();
      const featureSetDefaults = FeatureSetDefaults.fromBinary(
        await upstream.getFeatureSetDefaults("PROTO3", "2023"),
      );
      const fileDescriptorSet = FileDescriptorSet.fromBinary(
        await new UpstreamProtobuf().compileToDescriptorSet(`syntax="proto2";`),
      );
      expect(() =>
        createDescFileSet(fileDescriptorSet, {
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
        createDescFileSet(fileDescriptorSet, {
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
  describe("field", () => {
    describe("repeated field packing", () => {
      test("proto2 is unpacked by default", async () => {
        const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        syntax="proto2";
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [packed = true];
          repeated int32 explicitly_expanded = 5 [packed = false];
        }
      `);
        const fields = createDescFileSet(
          FileDescriptorSet.fromBinary(bin),
        ).getMessage("M")?.fields;
        assert(fields);
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(false);
          expect(f.packed).toBe(false);
        }
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(false);
          expect(f.packed).toBe(true);
        }
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(false);
          expect(f.packed).toBe(false);
        }
      });
      test("proto3 is packed by default", async () => {
        const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        syntax="proto3";
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [packed = true];
          repeated int32 explicitly_expanded = 5 [packed = false];
        }
      `);
        const fields = createDescFileSet(
          FileDescriptorSet.fromBinary(bin),
        ).getMessage("M")?.fields;
        assert(fields);
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(true);
        }
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(true);
        }
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(false);
        }
      });
      test("edition2023 is packed by default", async () => {
        const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        edition="2023";
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [features.repeated_field_encoding = PACKED];
          repeated int32 explicitly_expanded = 5 [features.repeated_field_encoding = EXPANDED];
        }
      `);
        const fields = createDescFileSet(
          FileDescriptorSet.fromBinary(bin),
        ).getMessage("M")?.fields;
        assert(fields);
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(true);
        }
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(true);
        }
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(false);
        }
      });
      test("edition2023 with repeated_field_encoding file option", async () => {
        const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
        edition="2023";
        option features.repeated_field_encoding = EXPANDED;
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [features.repeated_field_encoding = PACKED];
        }
      `);
        const fields = createDescFileSet(
          FileDescriptorSet.fromBinary(bin),
        ).getMessage("M")?.fields;
        assert(fields);
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(false);
        }
        {
          const f = fields.shift();
          assert(
            f?.fieldKind == "list" &&
              (f.listKind == "scalar" || f.listKind == "enum"),
          );
          expect(f.packedByDefault).toBe(true);
          expect(f.packed).toBe(true);
        }
      });
    });
    test("property visibility", async () => {
      const bin = await new UpstreamProtobuf().compileToDescriptorSet(`
          syntax="proto2";
          message M {
            optional int32 f = 1;
          }
        `);
      const field = createDescFileSet(
        FileDescriptorSet.fromBinary(bin),
      ).getMessage("M")?.fields[0];
      assert(field);

      // always available
      field.kind;
      field.fieldKind;
      field.name;
      field.number;
      field.jsonName;
      field.deprecated;
      field.scalar;
      field.enum;
      field.message;
      field.oneof; // only applicable to singular fields, but kept here for symmetry with DescMessage.oneofs

      // exclusive to scalar (list and singular)
      // @ts-expect-error TS2339
      field.longType;

      // exclusive to list
      // @ts-expect-error TS2339
      field.packed;
      // @ts-expect-error TS2339
      field.packedByDefault;

      // exclusive to singular
      // @ts-expect-error TS2339
      field.optional;
      // @ts-expect-error TS2339
      field.getDefaultValue;

      // exclusive to map
      // @ts-expect-error TS2339
      field.mapKey;
      // @ts-expect-error TS2339
      field.mapKind;

      switch (field.fieldKind) {
        case "message": {
          // exclusive to scalar (list and singular)
          // @ts-expect-error TS2339
          field.longType;

          // exclusive to list
          // @ts-expect-error TS2339
          field.packed;
          // @ts-expect-error TS2339
          field.packedByDefault;

          // exclusive to singular
          field.optional;
          const def: undefined = field.getDefaultValue();

          // exclusive to map
          // @ts-expect-error TS2339
          field.mapKey;
          // @ts-expect-error TS2339
          field.mapKind;

          const oneof: DescOneof | undefined = field.oneof;

          assert([def, oneof].length > 0);
          break;
        }
        case "scalar": {
          // exclusive to scalar (list and singular)
          field.longType;

          // exclusive to list
          // @ts-expect-error TS2339
          field.packed;
          // @ts-expect-error TS2339
          field.packedByDefault;

          // exclusive to singular
          field.optional;
          const def:
            | string
            | number
            | bigint
            | boolean
            | Uint8Array
            | undefined = field.getDefaultValue();

          switch (field.scalar) {
            case ScalarType.BOOL: {
              const defBool: boolean | undefined = field.getDefaultValue();
              assert([defBool].length > 0);
              break;
            }
            default:
              break;
          }

          // exclusive to map
          // @ts-expect-error TS2339
          field.mapKey;
          // @ts-expect-error TS2339
          field.mapKind;

          const oneof: DescOneof | undefined = field.oneof;

          assert([def, oneof].length > 0);
          break;
        }
        case "enum": {
          // exclusive to scalar (list and singular)
          // @ts-expect-error TS2339
          field.longType;

          // exclusive to list
          // @ts-expect-error TS2339
          field.packed;
          // @ts-expect-error TS2339
          field.packedByDefault;

          // exclusive to singular
          field.optional;
          const def: number | undefined = field.getDefaultValue();

          // exclusive to map
          // @ts-expect-error TS2339
          field.mapKey;
          // @ts-expect-error TS2339
          field.mapKind;

          const oneof: DescOneof | undefined = field.oneof;

          assert([def, oneof].length > 0);
          break;
        }
        case "list": {
          /// exclusive to scalar (list and singular)
          // @ts-expect-error TS2339
          field.longType;

          // exclusive to list
          field.packed;
          field.packedByDefault;

          switch (field.listKind) {
            case "scalar": {
              field.longType;
              const scalar: ScalarType = field.scalar;
              const message: undefined = field.message;
              const enumeration: undefined = field.enum;
              assert([scalar, message, enumeration].length > 0);
              break;
            }
            case "enum": {
              // @ts-expect-error TS2339
              field.longType;
              const scalar: undefined = field.scalar;
              const message: undefined = field.message;
              const enumeration: DescEnum = field.enum;
              assert([scalar, message, enumeration].length > 0);
              break;
            }
            case "message": {
              // @ts-expect-error TS2339
              field.longType;
              const scalar: undefined = field.scalar;
              const message: DescMessage = field.message;
              const enumeration: undefined = field.enum;
              assert([scalar, message, enumeration].length > 0);
              break;
            }
          }

          // exclusive to singular
          // @ts-expect-error TS2339
          field.optional;
          // @ts-expect-error TS2339
          field.getDefaultValue;

          // exclusive to map
          // @ts-expect-error TS2339
          field.mapKey;
          // @ts-expect-error TS2339
          field.mapKind;

          const oneof: undefined = field.oneof;

          assert([oneof].length > 0);
          break;
        }
        case "map": {
          // exclusive to scalar (list and singular)
          // @ts-expect-error TS2339
          field.longType;

          // exclusive to list
          // @ts-expect-error TS2339
          field.packed;
          // @ts-expect-error TS2339
          field.packedByDefault;

          // exclusive to singular
          // @ts-expect-error TS2339
          field.optional;
          // @ts-expect-error TS2339
          field.getDefaultValue;

          // exclusive to map
          // @ts-expect-error TS2339
          const mapKeyFloat: ScalarType.FLOAT = field.mapKey;
          // @ts-expect-error TS2339
          const mapKeyDouble: ScalarType.DOUBLE = field.mapKey;
          // @ts-expect-error TS2339
          const mapKeyBytes: ScalarType.BYTES = field.mapKey;

          const mapKeyOk: ScalarType = field.mapKey;

          switch (field.mapKind) {
            case "scalar": {
              const scalar: ScalarType = field.scalar;
              const message: undefined = field.message;
              const enumeration: undefined = field.enum;
              assert([scalar, message, enumeration].length > 0);
              break;
            }
            case "enum": {
              const scalar: undefined = field.scalar;
              const message: undefined = field.message;
              const enumeration: DescEnum = field.enum;
              assert([scalar, message, enumeration].length > 0);
              break;
            }
            case "message": {
              const scalar: undefined = field.scalar;
              const message: DescMessage = field.message;
              const enumeration: undefined = field.enum;
              assert([scalar, message, enumeration].length > 0);
              break;
            }
          }

          const oneof: undefined = field.oneof;

          assert(
            [mapKeyFloat, mapKeyDouble, mapKeyBytes, mapKeyOk, oneof].length >
              0,
          );
          break;
        }
      }
    });
  });
  test("knows extension", () => {
    const set = createDescFileSet(fileDescriptorSet);
    const ext = set.getExtension("protobuf_unittest.optional_int32_extension");
    expect(ext).toBeDefined();
    expect(ext?.name).toBe("optional_int32_extension");
    expect(ext?.typeName).toBe("protobuf_unittest.optional_int32_extension");
    expect(ext?.extendee.typeName).toBe(TestAllExtensions.typeName);
    expect(ext?.fieldKind).toBe("scalar");
    if (ext?.fieldKind == "scalar") {
      expect(ext.optional).toBe(true);
    }
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
    const set = createDescFileSet(fileDescriptorSet);
    const ext = set.getExtension(
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
    const ext2 = set
      .getMessage(TestNestedExtension.typeName)
      ?.nestedExtensions.find((ext) => ext.name === "nested_string_extension");
    expect(ext2).toBe(ext);
  });
  describe("declarationString()", () => {
    test("for field with options", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const message = set.getMessage(JsonNamesMessage.typeName);
      expect(message).toBeDefined();
      if (message !== undefined) {
        const field = message.fields.find((f) => f.number === 1);
        expect(field?.declarationString()).toBe(
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
        expect(field?.declarationString()).toBe(
          "repeated double double_field = 1",
        );
      }
    });
    test("for map field", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const message = set.getMessage(MapsMessage.typeName);
      const got = message?.fields
        .find((f) => f.name === "int32_msg_field")
        ?.declarationString();
      expect(got).toBe("map<int32, spec.MapsMessage> int32_msg_field = 10");
    });
    test("for enum value", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const e = set.getEnum(proto3.getEnumType(SimpleEnum).typeName);
      const got = e?.values
        .find((v) => v.name === "SIMPLE_ZERO")
        ?.declarationString();
      expect(got).toBe("SIMPLE_ZERO = 0");
    });
  });
  describe("getComments()", () => {
    describe("for file", () => {
      const set = createDescFileSet(fileDescriptorSet);
      const file = set.getMessage(MessageWithComments.typeName)?.file;
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
      const set = createDescFileSet(fileDescriptorSet);
      const message = set.getMessage(MessageWithComments.typeName);
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
      const set = createDescFileSet(fileDescriptorSet);
      const field = set
        .getMessage(MessageWithComments.typeName)
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
