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

import { beforeAll, beforeEach, describe, expect, test } from "@jest/globals";
import assert from "node:assert";
import type { DescFileSet } from "@bufbuild/protobuf/next/reflect";
import {
  createDescFileSet,
  createDescSet,
  LongType,
  protoCamelCase,
  ScalarType,
} from "@bufbuild/protobuf/next/reflect";
import type {
  DescEnum,
  DescExtension,
  DescField,
  DescFile,
  DescMessage,
  DescOneof,
  DescService,
} from "@bufbuild/protobuf";
import type { FileDescriptorSet } from "@bufbuild/protobuf/next/wkt";
import {
  Edition,
  FeatureSet_FieldPresence,
  MethodOptions_IdempotencyLevel,
} from "@bufbuild/protobuf/next/wkt";
import {
  compileEnum,
  compileField,
  compileFileDescriptorSet,
  compileMessage,
  compileMethod,
  compileService,
} from "../helpers.js";

describe("createDescSet()", function () {
  let testSet: DescFileSet;
  let testDescs: {
    message: DescMessage;
    enum: DescEnum;
    service: DescService;
    extension: DescExtension;
  };
  beforeAll(async () => {
    const fileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `
        syntax="proto2";
        message Msg { extensions 1 to 2; }
        enum Enu { ENU_UNSPECIFIED=0; }
        service Srv {}
        extend Msg { optional int32 ext = 1; }
      `,
    });
    testSet = createDescFileSet(fileDescriptorSet);
    const descMsg = testSet.get("Msg");
    assert(descMsg);
    assert(descMsg.kind == "message");
    const descEnu = testSet.get("Enu");
    assert(descEnu);
    assert(descEnu.kind == "enum");
    const descSrv = testSet.get("Srv");
    assert(descSrv);
    assert(descSrv.kind == "service");
    const descExt = testSet.get("ext");
    assert(descExt);
    assert(descExt.kind == "extension");
    testDescs = {
      message: descMsg,
      enum: descEnu,
      service: descSrv,
      extension: descExt,
    };
  });
  describe("get()", () => {
    test("gets message", () => {
      const set = createDescSet(testDescs.message);
      expect(set.get("Msg")).toBe(testDescs.message);
    });
    test("gets enum", () => {
      const set = createDescSet(testDescs.enum);
      expect(set.get("Enu")).toBe(testDescs.enum);
    });
    test("gets service", () => {
      const set = createDescSet(testDescs.service);
      expect(set.get("Srv")).toBe(testDescs.service);
    });
    test("gets extension", () => {
      const set = createDescSet(testDescs.extension);
      expect(set.get("ext")).toBe(testDescs.extension);
    });
  });
  describe("getMessage()", () => {
    test("gets message", () => {
      const set = createDescSet(testDescs.message);
      const msg: DescMessage | undefined = set.getMessage("Msg");
      expect(msg).toBe(testDescs.message);
    });
  });
  describe("getEnum()", () => {
    test("gets enum", () => {
      const set = createDescSet(testDescs.enum);
      const msg: DescEnum | undefined = set.getEnum("Enu");
      expect(msg).toBe(testDescs.enum);
    });
  });
  describe("getService()", () => {
    test("gets service", () => {
      const set = createDescSet(testDescs.service);
      const msg: DescService | undefined = set.getService("Srv");
      expect(msg).toBe(testDescs.service);
    });
  });
  describe("getExtension()", () => {
    test("gets extension", () => {
      const set = createDescSet(testDescs.extension);
      const ext: DescExtension | undefined = set.getExtension("ext");
      expect(ext).toBe(testDescs.extension);
    });
  });
  describe("getExtensionFor()", () => {
    test("gets extension", () => {
      const set = createDescSet(testDescs.extension);
      const ext: DescExtension | undefined = set.getExtensionFor(
        testDescs.message,
        1,
      );
      expect(ext).toBe(testDescs.extension);
    });
    test("returns undefined on unknown extension field number", () => {
      const set = createDescSet(testDescs.extension);
      const msg: DescExtension | undefined = set.getExtensionFor(
        testDescs.message,
        2,
      );
      expect(msg).toBeUndefined();
    });
    test("returns undefined on unknown extendee", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "b.proto": `
        syntax="proto3";
        message OtherMsg {}
      `,
      });
      const otherMessageDesc =
        createDescFileSet(fileDescriptorSet).getMessage("OtherMsg");
      assert(otherMessageDesc);
      const set = createDescSet(testDescs.extension);
      const msg: DescExtension | undefined = set.getExtensionFor(
        otherMessageDesc,
        2,
      );
      expect(msg).toBeUndefined();
    });
  });
  describe("iterator", () => {
    test("gets registered types", () => {
      const set = createDescSet(
        testDescs.message,
        testDescs.enum,
        testDescs.service,
        testDescs.extension,
      );
      const actual = Array.from(set)
        .map((t) => t.typeName)
        .sort();
      const want = ["Msg", "Enu", "Srv", "ext"].sort();
      expect(actual).toStrictEqual(want);
    });
  });
  describe("from DescMessage", () => {
    test("does not make message fields available", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "b.proto": `
        syntax="proto3";
        message Msg {
          FieldMsg f = 1;
        }
        message FieldMsg {}
      `,
      });
      const testMessage =
        createDescFileSet(fileDescriptorSet).getMessage("Msg");
      assert(testMessage);
      const set = createDescSet(testMessage);
      expect(set.get("Msg")).toBeDefined();
      expect(set.get("FieldMsg")).toBeUndefined();
    });
    test("does not make nested messages available", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "b.proto": `
        syntax="proto3";
        message Msg {
          message Nested {}
        }
      `,
      });
      const testSet = createDescFileSet(fileDescriptorSet);
      const testMessage = testSet.getMessage("Msg");
      assert(testMessage);
      const nestedTestMessage = testSet.getMessage("Msg.Nested");
      assert(nestedTestMessage);
      const set = createDescSet(testMessage);
      expect(set.get("Msg")).toBeDefined();
      expect(set.get("Msg.Nested")).toBeUndefined();
      expect(Array.from(set).length).toBe(1);
    });
    test("later duplicate type overwrites former type", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "b.proto": `
        syntax="proto3";
        message Msg {}
      `,
      });
      const duplicateMessage =
        createDescFileSet(fileDescriptorSet).getMessage("Msg");
      assert(duplicateMessage);
      assert(duplicateMessage.typeName === testDescs.message.typeName);
      const set = createDescSet(duplicateMessage, testDescs.message);
      expect(set.getMessage("Msg")).toBe(testDescs.message);
    });
  });
  describe("from DescFile", () => {
    test("provides all types from the file", () => {
      const testFile = testSet.getFile("a.proto");
      assert(testFile);
      const set = createDescSet(testFile);
      const setTypeNames = Array.from(set)
        .map((t) => t.typeName)
        .sort();
      expect(setTypeNames).toStrictEqual(["Msg", "Enu", "Srv", "ext"].sort());
    });
  });
  describe("from DescSet", () => {
    test("creates a copy of the given DescSet", () => {
      const testSetTypeNames = Array.from(testSet)
        .map((t) => t.typeName)
        .sort();
      assert(testSetTypeNames.length > 0);
      const set = createDescSet(testSet);
      const setTypeNames = Array.from(set)
        .map((t) => t.typeName)
        .sort();
      expect(setTypeNames).toStrictEqual(testSetTypeNames);
    });
    test("merges two DescSets", async () => {
      const secondSet = createDescFileSet(
        await compileFileDescriptorSet({
          "a.proto": `
        syntax="proto2";
        message Msg2 { extensions 1 to 2; }
        enum Enu2 { ENU_UNSPECIFIED=0; }
        service Srv2 {}
        extend Msg2 { optional int32 ext2 = 1; }
      `,
        }),
      );
      const set = createDescSet(testSet, secondSet);
      const setTypeNames = Array.from(set)
        .map((t) => t.typeName)
        .sort();
      expect(setTypeNames).toStrictEqual(
        ["Msg", "Enu", "Srv", "ext", "Msg2", "Enu2", "Srv2", "ext2"].sort(),
      );
    });
    test("later duplicate type overwrites former type", async () => {
      const secondSet = createDescFileSet(
        await compileFileDescriptorSet({
          "a.proto": `
        syntax="proto2";
        message Msg {}
        message Msg3 {}
      `,
        }),
      );
      const set = createDescSet(testSet, secondSet);
      const setTypeNames = Array.from(set)
        .map((t) => t.typeName)
        .sort();
      expect(setTypeNames).toStrictEqual(
        ["Msg", "Enu", "Srv", "ext", "Msg3"].sort(),
      );
      expect(set.get("Msg")).toBe(secondSet.get("Msg"));
      expect(set.get("Msg")).not.toBe(testSet.get("Msg"));
    });
  });
});

describe("createDescFileSet()", function () {
  let testFileDescriptorSet: FileDescriptorSet;
  beforeEach(async () => {
    testFileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `
        syntax="proto3";
        import "b.proto";
        import "c.proto";
        message A {}
      `,
      "b.proto": `
        syntax="proto3";
        import "d.proto";
        message B {}
      `,
      "c.proto": `
        syntax="proto3";
        import "d.proto";
        message C {}
      `,
      "d.proto": `
        syntax="proto3";
        message D {}
      `,
    });
  });
  describe("from FileDescriptorSet", function () {
    test("provides files through getFile()", () => {
      const fileSet = createDescFileSet(testFileDescriptorSet);
      const a = fileSet.getFile("a.proto");
      const b = fileSet.getFile("b.proto");
      const c = fileSet.getFile("c.proto");
      const d = fileSet.getFile("d.proto");
      expect(a).toBeDefined();
      expect(b).toBeDefined();
      expect(c).toBeDefined();
      expect(d).toBeDefined();
      expect(a?.dependencies).toStrictEqual([b, c]);
      expect(b?.dependencies).toStrictEqual([d]);
      expect(c?.dependencies).toStrictEqual([d]);
      expect(d?.dependencies).toStrictEqual([]);
    });
    test("provides files through file iterable", () => {
      const fileSet = createDescFileSet(testFileDescriptorSet);
      expect(Array.from(fileSet.files).map((f) => f.name)).toStrictEqual([
        "d",
        "b",
        "c",
        "a",
      ]);
    });
  });
  describe("from FileDescriptorProto", function () {
    let descFileA: DescFile;
    let testFileSet: DescFileSet;
    beforeAll(() => {
      testFileSet = createDescFileSet(testFileDescriptorSet);
      const a = testFileSet.getFile("a.proto");
      assert(a);
      assert(a.proto);
      descFileA = a;
    });
    test("resolves all dependencies as FileDescriptorProto", function () {
      const set = createDescFileSet(descFileA.proto, (protoFileName) =>
        testFileSet.getFile(protoFileName),
      );
      expect(set.getFile("a.proto")).toBeDefined();
      expect(set.getFile("b.proto")).toBeDefined();
      expect(set.getFile("c.proto")).toBeDefined();
      expect(set.getFile("d.proto")).toBeDefined();
      expect(set.getMessage("A")).toBeDefined();
      expect(set.getMessage("B")).toBeDefined();
      expect(set.getMessage("C")).toBeDefined();
      expect(set.getMessage("D")).toBeDefined();
    });
    test("resolves all dependencies as DescFile", function () {
      const set = createDescFileSet(descFileA.proto, (protoFileName) =>
        testFileSet.getFile(protoFileName),
      );
      expect(set.getFile("a.proto")).toBeDefined();
      expect(set.getFile("b.proto")).toBeDefined();
      expect(set.getFile("c.proto")).toBeDefined();
      expect(set.getFile("d.proto")).toBeDefined();
      expect(set.getMessage("A")).toBeDefined();
      expect(set.getMessage("B")).toBeDefined();
      expect(set.getMessage("C")).toBeDefined();
      expect(set.getMessage("D")).toBeDefined();
    });
    test("raises error on unresolvable dependency", function () {
      function t() {
        createDescFileSet(descFileA.proto, (protoFileName) => {
          if (protoFileName === "c.proto") {
            return undefined;
          }
          return testFileSet.getFile(protoFileName);
        });
      }
      expect(t).toThrow(/^Unable to resolve c.proto, imported by a.proto$/);
    });
  });
  test("raises error on unsupported edition from the past", function () {
    testFileDescriptorSet.file[0].syntax = "editions";
    testFileDescriptorSet.file[0].edition = Edition.EDITION_1_TEST_ONLY;
    function t() {
      createDescFileSet(testFileDescriptorSet);
    }
    expect(t).toThrow(/^d.proto: unsupported edition$/);
  });
  test("raises error on unsupported edition from the future", function () {
    testFileDescriptorSet.file[0].syntax = "editions";
    testFileDescriptorSet.file[0].edition = Edition.EDITION_99999_TEST_ONLY;
    function t() {
      createDescFileSet(testFileDescriptorSet);
    }
    expect(t).toThrow(/^d.proto: unsupported edition$/);
  });
  describe("from DescFileSet", function () {
    test("creates a copy of the given DescFileSet", () => {
      const testSet = createDescFileSet(testFileDescriptorSet);
      const testSetFileNames = Array.from(testSet.files)
        .map((f) => f.name)
        .sort();
      const testSetTypeNames = Array.from(testSet)
        .map((t) => t.typeName)
        .sort();
      assert(testSetTypeNames.length > 0);

      const set = createDescFileSet(testSet);
      const setFileNames = Array.from(set.files)
        .map((f) => f.name)
        .sort();
      expect(setFileNames).toStrictEqual(testSetFileNames);
      const setTypeNames = Array.from(set)
        .map((t) => t.typeName)
        .sort();
      expect(setTypeNames).toStrictEqual(testSetTypeNames);
    });
    test("merges two DescFileSets", async () => {
      const setA = createDescFileSet(
        await compileFileDescriptorSet({
          "a.proto": `
          syntax="proto2";
          message Msg { extensions 1 to 2; }
          enum Enu { ENU_UNSPECIFIED=0; }
          service Srv {}
          extend Msg { optional int32 ext = 1; }
        `,
        }),
      );
      const setB = createDescFileSet(
        await compileFileDescriptorSet({
          "b.proto": `
          syntax="proto2";
          message Msg2 { extensions 1 to 2; }
          enum Enu2 { ENU_UNSPECIFIED=0; }
          service Srv2 {}
          extend Msg2 { optional int32 ext2 = 1; }
        `,
        }),
      );
      const set = createDescFileSet(setA, setB);
      expect(
        Array.from(set)
          .map((t) => t.typeName)
          .sort(),
      ).toStrictEqual(
        ["Msg", "Enu", "Srv", "ext", "Msg2", "Enu2", "Srv2", "ext2"].sort(),
      );
      expect(
        Array.from(set.files)
          .map((f) => f.name)
          .sort(),
      ).toStrictEqual(["a", "b"].sort());
    });
    test("later duplicate file overwrites former file", async () => {
      const setA = createDescFileSet(
        await compileFileDescriptorSet({
          "a.proto": `
          syntax="proto2";
          message MsgA {}
        `,
        }),
      );
      const setB = createDescFileSet(
        await compileFileDescriptorSet({
          "a.proto": `
          syntax="proto2";
          message MsgB {}
        `,
        }),
      );
      const set = createDescFileSet(setA, setB);
      expect(Array.from(set.files).map((f) => f.name)).toStrictEqual(["a"]);
      expect(
        Array.from(set)
          .map((t) => t.typeName)
          .sort(),
      ).toStrictEqual(["MsgA", "MsgB"].sort());
    });
  });
});

describe("DescFile", () => {
  test("proto2 syntax", async () => {
    const fileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `syntax="proto2";`,
    });
    const set = createDescFileSet(fileDescriptorSet);
    const descFile = set.getFile("a.proto");
    expect(descFile).toBeDefined();
    expect(descFile?.edition).toBe(Edition.EDITION_PROTO2);
  });
  test("proto3 syntax", async () => {
    const fileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `syntax="proto3";`,
    });
    const set = createDescFileSet(fileDescriptorSet);
    const descFile = set.getFile("a.proto");
    expect(descFile).toBeDefined();
    expect(descFile?.edition).toBe(Edition.EDITION_PROTO3);
  });
  test("edition 2023", async () => {
    const fileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `edition = "2023";`,
    });
    const set = createDescFileSet(fileDescriptorSet);
    const descFile = set.getFile("a.proto");
    expect(descFile).toBeDefined();
    expect(descFile?.edition).toBe(Edition.EDITION_2023);
  });
  test("dependencies", async () => {
    const fileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `syntax="proto3";
          import "b.proto";
          import "c.proto";`,
      "b.proto": `syntax="proto3";`,
      "c.proto": `syntax="proto3";`,
    });
    const set = createDescFileSet(fileDescriptorSet);
    const a = set.getFile("a.proto");
    expect(a?.name).toBe("a");
    expect(a?.dependencies.length).toBe(2);
    expect(a?.dependencies.map((f) => f.name)).toStrictEqual(["b", "c"]);
  });
});

describe("DescEnum", () => {
  describe("open", () => {
    test("proto3 enum is open", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum E {
          A = 0;
        }
      `);
      expect(descEnum.open).toBe(true);
    });
    test("proto2 enum is closed", async () => {
      const descEnum = await compileEnum(`
        syntax="proto2";
        enum E {
          A = 1;
        }
      `);
      expect(descEnum.open).toBe(false);
    });
    test("edition 2023 enum is open by default", async () => {
      const descEnum = await compileEnum(`
        edition="2023";
        enum E {
          A = 0;
        }
      `);
      expect(descEnum.open).toBe(true);
    });
    test("edition 2023 enum is closed by file feature", async () => {
      const descEnum = await compileEnum(`
        edition="2023";
        option features.enum_type = CLOSED;
        enum E {
          A = 1;
        }
      `);
      expect(descEnum.open).toBe(false);
    });
    test("edition 2023 enum is closed by enum feature", async () => {
      const descEnum = await compileEnum(`
        edition="2023";
        enum E {
          option features.enum_type = CLOSED;
          A = 1;
        }
      `);
      expect(descEnum.open).toBe(false);
    });
  });
  describe("sharedPrefix", () => {
    test("is shared prefix", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_A = 0; 
          MY_ENUM_B = 1;
        }
      `);
      expect(descEnum.sharedPrefix).toBe("my_enum_");
    });
    test("is shared prefix regardless of casing", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_A = 0; 
          my_enum_B = 1;
        }
      `);
      expect(descEnum.sharedPrefix).toBe("my_enum_");
    });
    test("is undefined without shared prefix", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_UNSPECIFIED = 0; 
          B = 1;
        }
      `);
      expect(descEnum.sharedPrefix).toBeUndefined();
    });
    test("is undefined if any short name starts with a number", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_A = 0; 
          MY_ENUM_23_B = 1; 
        }
      `);
      expect(descEnum.sharedPrefix).toBeUndefined();
    });
  });
});

describe("DescField", () => {
  describe("presence", () => {
    function getPresence(field: DescField) {
      return field.fieldKind == "scalar" ||
        field.fieldKind == "message" ||
        field.fieldKind == "enum"
        ? field.presence
        : undefined;
    }
    test("proto2 optional is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional int32 f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto2 optional message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional M f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto2 required is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          required int32 f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.LEGACY_REQUIRED);
    });
    test("proto2 required message is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          required M f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.LEGACY_REQUIRED);
    });
    test("proto2 oneof is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          oneof kind {
            int32 f = 1;
          }
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          int32 f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto3 optional is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          optional int32 f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 oneof is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          oneof kind {
            int32 f = 1;
          }
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          M f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 optional message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          optional M f = 1;
        }
      `);
      expect(getPresence(field)).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
  });
  describe("delimitedEncoding", () => {
    test("true for proto2 group", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional group GroupField = 2 {}
        }
      `);
      expect(
        field.fieldKind == "message" ? field.delimitedEncoding : undefined,
      ).toBe(true);
    });
    test("true for field with features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          M f = 1 [features.message_encoding = DELIMITED];
        }
      `);
      expect(
        field.fieldKind == "message" ? field.delimitedEncoding : undefined,
      ).toBe(true);
    });
    test("true for list field with features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          repeated M f = 1 [features.message_encoding = DELIMITED];
        }
      `);
      expect(
        field.fieldKind == "list" && field.listKind == "message"
          ? field.delimitedEncoding
          : undefined,
      ).toBe(true);
    });
    test("true for file with features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        option features.message_encoding = DELIMITED;
        message M { 
          M f = 1;
        }
      `);
      expect(
        field.fieldKind == "message" ? field.delimitedEncoding : undefined,
      ).toBe(true);
    });
    test("false for map field with inherited features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        option features.message_encoding = DELIMITED;
        message M { 
          map <int32, string> f = 1;
        }
      `);
      expect(
        field.fieldKind == "map" ? field.delimitedEncoding : undefined,
      ).toBe(false);
    });
  });
  describe("optional", () => {
    test("false for proto2 required scalar", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { required int32 f1 = 1; }
      `);
      expect(
        field.fieldKind == "scalar" ||
          field.fieldKind == "message" ||
          field.fieldKind == "enum"
          ? field.optional
          : undefined,
      ).toBe(false);
    });
    test("true for proto2 optional scalar", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { required int32 f1 = 1; }
      `);
      expect(
        field.fieldKind == "scalar" ||
          field.fieldKind == "message" ||
          field.fieldKind == "enum"
          ? field.optional
          : undefined,
      ).toBe(false);
    });
    test("true for proto3 optional scalar", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { optional int32 f1 = 1; }
      `);
      expect(
        field.fieldKind == "scalar" ||
          field.fieldKind == "message" ||
          field.fieldKind == "enum"
          ? field.optional
          : undefined,
      ).toBe(true);
    });
    test("false for features.field_presence = EXPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        message M { int32 f1 = 1 [features.field_presence = EXPLICIT]; }
      `);
      expect(
        field.fieldKind == "scalar" ||
          field.fieldKind == "message" ||
          field.fieldKind == "enum"
          ? field.optional
          : undefined,
      ).toBe(false);
    });
    test("false for features.field_presence = IMPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        message M { int32 f1 = 1 [features.field_presence = IMPLICIT]; }
      `);
      expect(
        field.fieldKind == "scalar" ||
          field.fieldKind == "message" ||
          field.fieldKind == "enum"
          ? field.optional
          : undefined,
      ).toBe(false);
    });
  });
  describe("longType", () => {
    test("returns default LongType.BIGINT for option omitted", async () => {
      const { fields } = await compileMessage(`
        syntax="proto3";
        message M {
          fixed64 fixed64_field = 1;
          int64 int64_field = 3;
          sfixed64 sfixed64_field = 4;
          sint64 sint64_field = 5;
          uint64 uint64_field = 6;
          repeated fixed64 repeated_fixed64_field = 11;
          repeated int64 repeated_int64_field = 12;
          repeated sfixed64 repeated_sfixed64_field = 13;
          repeated sint64 repeated_sint64_field = 14;
          repeated uint64 repeated_uint64_field = 15;
        }
      `);
      expect(fields.length > 0).toBeTruthy();
      for (const field of fields) {
        expect(
          field.fieldKind == "scalar" ||
            (field.fieldKind == "list" && field.listKind == "scalar"),
        ).toBeTruthy();
        if (
          field.fieldKind == "scalar" ||
          (field.fieldKind == "list" && field.listKind == "scalar")
        ) {
          expect(field.longType).toBe(LongType.BIGINT);
        }
      }
    });
    test.each([
      { jstype: "JS_NORMAL", longType: "BIGINT" },
      { jstype: "JS_NUMBER", longType: "BIGINT" },
      { jstype: "JS_STRING", longType: "STRING" },
    ] as const)(
      "returns default LongType.$longType for jstype=$jstype",
      async ({ jstype, longType }) => {
        const { fields } = await compileMessage(`
        syntax="proto3";
        message M {
          fixed64 fixed64_field = 1 [jstype = ${jstype}];
          int64 int64_field = 3 [jstype = ${jstype}];
          sfixed64 sfixed64_field = 4 [jstype = ${jstype}];
          sint64 sint64_field = 5 [jstype = ${jstype}];
          uint64 uint64_field = 6 [jstype = ${jstype}];
          repeated fixed64 repeated_fixed64_field = 11 [jstype = ${jstype}];
          repeated int64 repeated_int64_field = 12 [jstype = ${jstype}];
          repeated sfixed64 repeated_sfixed64_field = 13 [jstype = ${jstype}];
          repeated sint64 repeated_sint64_field = 14 [jstype = ${jstype}];
          repeated uint64 repeated_uint64_field = 15 [jstype = ${jstype}];
        }
      `);
        expect(fields.length > 0).toBeTruthy();
        for (const field of fields) {
          expect(
            field.fieldKind == "scalar" ||
              (field.fieldKind == "list" && field.listKind == "scalar"),
          ).toBeTruthy();
          if (
            field.fieldKind == "scalar" ||
            (field.fieldKind == "list" && field.listKind == "scalar")
          ) {
            expect(field.longType).toBe(LongType[longType]);
          }
        }
      },
    );
  });
  describe("jsonName", () => {
    test.each(["field", "foo_bar", "__proto__", "constructor"])(
      "returns compiler-provided json_name for %s",
      async (name) => {
        const field = await compileField(`
        syntax="proto3";
        message M {
          int32 ${name} = 1;
        }
      `);
        expect(field.jsonName).toBe(protoCamelCase(name));
        expect(field.jsonName).toBe(field.proto.jsonName);
      },
    );
    test.each(["foo", "foo_bar", "", "@type"])(
      "returns custom json_name for %s",
      async (name) => {
        const field = await compileField(`
        syntax="proto3";
        message M {
          int32 f = 1 [json_name = "${name}"];
        }
      `);
        expect(field.jsonName).toBe(name);
      },
    );
  });
  describe("repeated field packing", () => {
    test("proto2 is unpacked by default", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "a.proto": `
        syntax="proto2";
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [packed = true];
          repeated int32 explicitly_expanded = 5 [packed = false];
        }
        `,
      });
      const fields =
        createDescFileSet(fileDescriptorSet).getMessage("M")?.fields;
      assert(fields);
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(false);
      }
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(true);
      }
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(false);
      }
    });
    test("proto3 is packed by default", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "a.proto": `
        syntax="proto3";
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [packed = true];
          repeated int32 explicitly_expanded = 5 [packed = false];
        }
        `,
      });
      const fields =
        createDescFileSet(fileDescriptorSet).getMessage("M")?.fields;
      assert(fields);
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(true);
      }
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(true);
      }
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(false);
      }
    });
    test("edition2023 is packed by default", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "a.proto": `
        edition="2023";
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [features.repeated_field_encoding = PACKED];
          repeated int32 explicitly_expanded = 5 [features.repeated_field_encoding = EXPANDED];
        }
        `,
      });
      const fields =
        createDescFileSet(fileDescriptorSet).getMessage("M")?.fields;
      assert(fields);
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(true);
      }
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(true);
      }
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(false);
      }
    });
    test("edition2023 with repeated_field_encoding file option", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "a.proto": `
        edition="2023";
        option features.repeated_field_encoding = EXPANDED;
        message M {
          repeated int32 default = 3;
          repeated int32 explicitly_packed = 4 [features.repeated_field_encoding = PACKED];
        }
        `,
      });
      const fields =
        createDescFileSet(fileDescriptorSet).getMessage("M")?.fields;
      assert(fields);
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(false);
      }
      {
        const f = fields.shift();
        assert(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        expect(f.packed).toBe(true);
      }
    });
  });
  test("property visibility", async () => {
    const fileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `
          syntax="proto2";
          message M {
            optional int32 f = 1;
          }
        `,
    });
    const field =
      createDescFileSet(fileDescriptorSet).getMessage("M")?.fields[0];
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

        // exclusive to singular
        field.optional;
        const def: string | number | bigint | boolean | Uint8Array | undefined =
          field.getDefaultValue();

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
          [mapKeyFloat, mapKeyDouble, mapKeyBytes, mapKeyOk, oneof].length > 0,
        );
        break;
      }
    }
  });
});

describe("DescService", () => {
  test("typeName", async () => {
    const service = await compileService(`
      syntax="proto3";
      package test;
      service Foo {}
    `);
    expect(service.typeName).toBe("test.Foo");
  });
  test("methods", async () => {
    const service = await compileService(`
      syntax="proto3";
      service Foo { 
        rpc Bar(I) returns(O);
        rpc Baz(I) returns(O);
      }
      message I {}
      message O {}
    `);
    expect(service.methods.length).toBe(2);
    expect(service.deprecated).toBe(false);
  });
  describe("deprecated", () => {
    test("is false by default", async () => {
      const service = await compileService(`
        syntax="proto3";
        service Foo {}
      `);
      expect(service.deprecated).toBe(false);
    });
    test("is true with option", async () => {
      const service = await compileService(`
        syntax="proto3";
        service Foo {
          option deprecated = true;
        }
      `);
      expect(service.deprecated).toBe(true);
    });
  });
});

describe("DescMethod", () => {
  describe("methodKind", () => {
    test("unary", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {}
        }
        message I {}
        message O {}
      `);
      expect(method.methodKind).toBe("unary");
    });
    test("server-streaming", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(stream O) {}
        }
        message I {}
        message O {}
      `);
      expect(method.methodKind).toBe("server_streaming");
    });
    test("client-streaming", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(stream I) returns(O) {}
        }
        message I {}
        message O {}
      `);
      expect(method.methodKind).toBe("client_streaming");
    });
    test("bidi-streaming", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(stream I) returns(stream O) {}
        }
        message I {}
        message O {}
      `);
      expect(method.methodKind).toBe("bidi_streaming");
    });
  });
  describe("idempotency", () => {
    test("is IDEMPOTENCY_UNKNOWN if unset", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {}
        }
        message I {}
        message O {}
      `);
      expect(method.idempotency).toBe(
        MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN,
      );
    });
    test("is IDEMPOTENCY_UNKNOWN if set", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {
            option idempotency_level = IDEMPOTENCY_UNKNOWN;
          }
        }
        message I {}
        message O {}
      `);
      expect(method.idempotency).toBe(
        MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN,
      );
    });
    test("is NO_SIDE_EFFECTS if set", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {
            option idempotency_level = NO_SIDE_EFFECTS;
          }
        }
        message I {}
        message O {}
      `);
      expect(method.idempotency).toBe(
        MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS,
      );
    });
    test("is IDEMPOTENT if set", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {
            option idempotency_level = IDEMPOTENT;
          }
        }
        message I {}
        message O {}
      `);
      expect(method.idempotency).toBe(
        MethodOptions_IdempotencyLevel.IDEMPOTENT,
      );
    });
  });
  describe("deprecated", () => {
    test("is false by default", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O);
        }
        message I {}
        message O {}
      `);
      expect(method.deprecated).toBe(false);
    });
    test("is true with option", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {
            option deprecated = true;
          }
        }
        message I {}
        message O {}
      `);
      expect(method.deprecated).toBe(true);
    });
  });
});
