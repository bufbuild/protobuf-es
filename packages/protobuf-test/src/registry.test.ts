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

import { beforeAll, beforeEach, describe, expect, test } from "@jest/globals";
import assert from "node:assert";
import {
  type FileRegistry,
  createFileRegistry,
  createRegistry,
  type DescEnum,
  type DescExtension,
  type DescFile,
  type DescMessage,
  type DescOneof,
  type DescService,
  ScalarType,
  createMutableRegistry,
} from "@bufbuild/protobuf";
import { protoCamelCase } from "@bufbuild/protobuf/reflect";
import {
  type FileDescriptorSet,
  Edition,
  FeatureSet_FieldPresence,
  MethodOptions_IdempotencyLevel,
} from "@bufbuild/protobuf/wkt";
import {
  compileEnum,
  compileExtension,
  compileField,
  compileFile,
  compileFileDescriptorSet,
  compileMessage,
  compileMethod,
  compileService,
} from "./helpers.js";

describe("createRegistry()", function () {
  let testReg: FileRegistry;
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
    testReg = createFileRegistry(fileDescriptorSet);
    const descMsg = testReg.get("Msg");
    assert(descMsg);
    assert(descMsg.kind == "message");
    const descEnu = testReg.get("Enu");
    assert(descEnu);
    assert(descEnu.kind == "enum");
    const descSrv = testReg.get("Srv");
    assert(descSrv);
    assert(descSrv.kind == "service");
    const descExt = testReg.get("ext");
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
      const reg = createRegistry(testDescs.message);
      expect(reg.get("Msg")).toBe(testDescs.message);
    });
    test("gets enum", () => {
      const reg = createRegistry(testDescs.enum);
      expect(reg.get("Enu")).toBe(testDescs.enum);
    });
    test("gets service", () => {
      const reg = createRegistry(testDescs.service);
      expect(reg.get("Srv")).toBe(testDescs.service);
    });
    test("gets extension", () => {
      const reg = createRegistry(testDescs.extension);
      expect(reg.get("ext")).toBe(testDescs.extension);
    });
  });
  describe("getMessage()", () => {
    test("gets message", () => {
      const reg = createRegistry(testDescs.message);
      const msg: DescMessage | undefined = reg.getMessage("Msg");
      expect(msg).toBe(testDescs.message);
    });
  });
  describe("getEnum()", () => {
    test("gets enum", () => {
      const reg = createRegistry(testDescs.enum);
      const msg: DescEnum | undefined = reg.getEnum("Enu");
      expect(msg).toBe(testDescs.enum);
    });
  });
  describe("getService()", () => {
    test("gets service", () => {
      const reg = createRegistry(testDescs.service);
      const msg: DescService | undefined = reg.getService("Srv");
      expect(msg).toBe(testDescs.service);
    });
  });
  describe("getExtension()", () => {
    test("gets extension", () => {
      const reg = createRegistry(testDescs.extension);
      const ext: DescExtension | undefined = reg.getExtension("ext");
      expect(ext).toBe(testDescs.extension);
    });
  });
  describe("getExtensionFor()", () => {
    test("gets extension", () => {
      const reg = createRegistry(testDescs.extension);
      const ext: DescExtension | undefined = reg.getExtensionFor(
        testDescs.message,
        1,
      );
      expect(ext).toBe(testDescs.extension);
    });
    test("returns undefined on unknown extension field number", () => {
      const reg = createRegistry(testDescs.extension);
      const msg: DescExtension | undefined = reg.getExtensionFor(
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
        createFileRegistry(fileDescriptorSet).getMessage("OtherMsg");
      assert(otherMessageDesc);
      const reg = createRegistry(testDescs.extension);
      const msg: DescExtension | undefined = reg.getExtensionFor(
        otherMessageDesc,
        2,
      );
      expect(msg).toBeUndefined();
    });
  });
  describe("iterator", () => {
    test("gets registered types", () => {
      const reg = createRegistry(
        testDescs.message,
        testDescs.enum,
        testDescs.service,
        testDescs.extension,
      );
      const actual = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      const want = ["Msg", "Enu", "Srv", "ext"].sort();
      expect(actual).toStrictEqual(want);
    });
  });
  describe("from DescMessage", () => {
    test("provides message", () => {
      const reg = createRegistry(testDescs.message);
      expect(reg.get("Msg")).toBeDefined();
    });
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
        createFileRegistry(fileDescriptorSet).getMessage("Msg");
      assert(testMessage);
      const reg = createRegistry(testMessage);
      expect(reg.get("Msg")).toBeDefined();
      expect(reg.get("FieldMsg")).toBeUndefined();
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
      const testReg = createFileRegistry(fileDescriptorSet);
      const testMessage = testReg.getMessage("Msg");
      assert(testMessage);
      const nestedTestMessage = testReg.getMessage("Msg.Nested");
      assert(nestedTestMessage);
      const reg = createRegistry(testMessage);
      expect(reg.get("Msg")).toBeDefined();
      expect(reg.get("Msg.Nested")).toBeUndefined();
      expect(Array.from(reg).length).toBe(1);
    });
    test("later duplicate type overwrites former type", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "b.proto": `
        syntax="proto3";
        message Msg {}
      `,
      });
      const duplicateMessage =
        createFileRegistry(fileDescriptorSet).getMessage("Msg");
      assert(duplicateMessage);
      assert(duplicateMessage.typeName === testDescs.message.typeName);
      const reg = createRegistry(duplicateMessage, testDescs.message);
      expect(reg.getMessage("Msg")).toBe(testDescs.message);
    });
  });
  describe("from DescFile", () => {
    test("provides all types from the file", () => {
      const testFile = testReg.getFile("a.proto");
      assert(testFile);
      const reg = createRegistry(testFile);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      expect(regTypeNames).toStrictEqual(["Msg", "Enu", "Srv", "ext"].sort());
    });
  });
  describe("from Registry", () => {
    test("creates a copy of the given Registry", () => {
      const testSetTypeNames = Array.from(testReg)
        .map((t) => t.typeName)
        .sort();
      assert(testSetTypeNames.length > 0);
      const reg = createRegistry(testReg);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      expect(regTypeNames).toStrictEqual(testSetTypeNames);
    });
    test("merges two Registries", async () => {
      const secondReg = createFileRegistry(
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
      const reg = createRegistry(testReg, secondReg);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      expect(regTypeNames).toStrictEqual(
        ["Msg", "Enu", "Srv", "ext", "Msg2", "Enu2", "Srv2", "ext2"].sort(),
      );
    });
    test("later duplicate type overwrites former type", async () => {
      const secondReg = createFileRegistry(
        await compileFileDescriptorSet({
          "a.proto": `
        syntax="proto2";
        message Msg {}
        message Msg3 {}
      `,
        }),
      );
      const reg = createRegistry(testReg, secondReg);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      expect(regTypeNames).toStrictEqual(
        ["Msg", "Enu", "Srv", "ext", "Msg3"].sort(),
      );
      expect(reg.get("Msg")).toBe(secondReg.get("Msg"));
      expect(reg.get("Msg")).not.toBe(testReg.get("Msg"));
    });
  });
});

describe("createMutableRegistry()", () => {
  test("from DescMessage", async () => {
    const desc = await compileMessage(`
      syntax = "proto3";
      message A {}
    `);
    const reg = createMutableRegistry(desc);
    expect(reg.getMessage("A")).toBeDefined();
  });
  test("add() adds DescMessage", async () => {
    const desc = await compileMessage(`
      syntax = "proto3";
      message A {}
    `);
    const reg = createMutableRegistry();
    reg.add(desc);
    expect(reg.getMessage("A")).toBeDefined();
  });
  test("remove() removes DescMessage", async () => {
    const desc = await compileMessage(`
      syntax = "proto3";
      message A {}
    `);
    const reg = createMutableRegistry(desc);
    reg.remove(desc);
    expect(reg.getMessage("A")).toBeUndefined();
  });
});

describe("createFileRegistry()", function () {
  let testFileDescriptorSet: FileDescriptorSet;
  beforeEach(async () => {
    testFileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `
        syntax="proto3";
        import "b.proto";
        import "c.proto";
        message A {
          B b = 1;
          C c = 2;
        }
      `,
      "b.proto": `
        syntax="proto3";
        import "d.proto";
        message B {
          D d = 1;
        }
      `,
      "c.proto": `
        syntax="proto3";
        import "d.proto";
        message C {
          D d = 1;
        }
      `,
      "d.proto": `
        syntax="proto3";
        message D {}
      `,
    });
  });
  describe("from FileDescriptorSet", function () {
    test("provides files through getFile()", () => {
      const fileReg = createFileRegistry(testFileDescriptorSet);
      const a = fileReg.getFile("a.proto");
      const b = fileReg.getFile("b.proto");
      const c = fileReg.getFile("c.proto");
      const d = fileReg.getFile("d.proto");
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
      const fileReg = createFileRegistry(testFileDescriptorSet);
      expect(Array.from(fileReg.files).map((f) => f.name)).toStrictEqual([
        "d",
        "b",
        "c",
        "a",
      ]);
    });
  });
  describe("from FileDescriptorProto", function () {
    let descFileA: DescFile;
    let testFileReg: FileRegistry;
    beforeAll(() => {
      testFileReg = createFileRegistry(testFileDescriptorSet);
      const a = testFileReg.getFile("a.proto");
      assert(a !== undefined);
      descFileA = a;
    });
    test("resolves all dependencies as FileDescriptorProto", function () {
      const reg = createFileRegistry(descFileA.proto, (protoFileName) =>
        testFileReg.getFile(protoFileName),
      );
      expect(reg.getFile("a.proto")).toBeDefined();
      expect(reg.getFile("b.proto")).toBeDefined();
      expect(reg.getFile("c.proto")).toBeDefined();
      expect(reg.getFile("d.proto")).toBeDefined();
      expect(reg.getMessage("A")).toBeDefined();
      expect(reg.getMessage("B")).toBeDefined();
      expect(reg.getMessage("C")).toBeDefined();
      expect(reg.getMessage("D")).toBeDefined();
    });
    test("resolves all dependencies as DescFile", function () {
      const reg = createFileRegistry(descFileA.proto, (protoFileName) =>
        testFileReg.getFile(protoFileName),
      );
      expect(reg.getFile("a.proto")).toBeDefined();
      expect(reg.getFile("b.proto")).toBeDefined();
      expect(reg.getFile("c.proto")).toBeDefined();
      expect(reg.getFile("d.proto")).toBeDefined();
      expect(reg.getMessage("A")).toBeDefined();
      expect(reg.getMessage("B")).toBeDefined();
      expect(reg.getMessage("C")).toBeDefined();
      expect(reg.getMessage("D")).toBeDefined();
    });
    test("raises error on unresolvable dependency", function () {
      function t() {
        createFileRegistry(descFileA.proto, (protoFileName) => {
          if (protoFileName === "c.proto") {
            return undefined;
          }
          return testFileReg.getFile(protoFileName);
        });
      }
      expect(t).toThrow(/^Unable to resolve c.proto, imported by a.proto$/);
    });
  });
  test("accepts empty arguments", function () {
    const registry = createFileRegistry();
    const types = Array.from(registry);
    const files = Array.from(registry.files);
    expect(types.length).toBe(0);
    expect(files.length).toBe(0);
  });
  test("raises error on unsupported edition from the past", function () {
    testFileDescriptorSet.file[0].syntax = "editions";
    testFileDescriptorSet.file[0].edition = Edition.EDITION_1_TEST_ONLY;
    function t() {
      createFileRegistry(testFileDescriptorSet);
    }
    expect(t).toThrow(/^d.proto: unsupported edition$/);
  });
  test("raises error on unsupported edition from the future", function () {
    testFileDescriptorSet.file[0].syntax = "editions";
    testFileDescriptorSet.file[0].edition = Edition.EDITION_99999_TEST_ONLY;
    function t() {
      createFileRegistry(testFileDescriptorSet);
    }
    expect(t).toThrow(/^d.proto: unsupported edition$/);
  });
  describe("from FileRegistry", function () {
    test("creates a copy of the given FileRegistry", () => {
      const testReg = createFileRegistry(testFileDescriptorSet);
      const testRegFileNames = Array.from(testReg.files)
        .map((f) => f.name)
        .sort();
      const testRegTypeNames = Array.from(testReg)
        .map((t) => t.typeName)
        .sort();
      assert(testRegTypeNames.length > 0);

      const reg = createFileRegistry(testReg);
      const regFileNames = Array.from(reg.files)
        .map((f) => f.name)
        .sort();
      expect(regFileNames).toStrictEqual(testRegFileNames);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      expect(regTypeNames).toStrictEqual(testRegTypeNames);
    });
    test("merges two FileRegistries", async () => {
      const regA = createFileRegistry(
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
      const regB = createFileRegistry(
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
      const reg = createFileRegistry(regA, regB);
      expect(
        Array.from(reg)
          .map((t) => t.typeName)
          .sort(),
      ).toStrictEqual(
        ["Msg", "Enu", "Srv", "ext", "Msg2", "Enu2", "Srv2", "ext2"].sort(),
      );
      expect(
        Array.from(reg.files)
          .map((f) => f.name)
          .sort(),
      ).toStrictEqual(["a", "b"].sort());
    });
    test("later duplicate file overwrites former file", async () => {
      const regA = createFileRegistry(
        await compileFileDescriptorSet({
          "a.proto": `
          syntax="proto2";
          message MsgA {}
        `,
        }),
      );
      const regB = createFileRegistry(
        await compileFileDescriptorSet({
          "a.proto": `
          syntax="proto2";
          message MsgB {}
        `,
        }),
      );
      const reg = createFileRegistry(regA, regB);
      expect(Array.from(reg.files).map((f) => f.name)).toStrictEqual(["a"]);
      expect(
        Array.from(reg)
          .map((t) => t.typeName)
          .sort(),
      ).toStrictEqual(["MsgA", "MsgB"].sort());
    });
  });
});

describe("DescFile", () => {
  test("proto2 syntax", async () => {
    const file = await compileFile(`syntax="proto2";`);
    expect(file.edition).toBe(Edition.EDITION_PROTO2);
  });
  test("proto3 syntax", async () => {
    const file = await compileFile(`syntax="proto3";`);
    expect(file.edition).toBe(Edition.EDITION_PROTO3);
  });
  test("edition 2023", async () => {
    const file = await compileFile(`edition = "2023";`);
    expect(file.edition).toBe(Edition.EDITION_2023);
  });
  test("dependencies", async () => {
    const fileDescriptorSet = await compileFileDescriptorSet({
      "a.proto": `
        syntax="proto3";
        import "b.proto";
        import "c.proto";
        message A {
          B b = 1;
          C c = 2;
        }
      `,
      "b.proto": `
        syntax="proto3";
        message B {}
      `,
      "c.proto": `
        syntax="proto3";
        message C {}
      `,
    });
    const reg = createFileRegistry(fileDescriptorSet);
    const a = reg.getFile("a.proto");
    expect(a?.name).toBe("a");
    expect(a?.dependencies.length).toBe(2);
    expect(a?.dependencies.map((f) => f.name)).toStrictEqual(["b", "c"]);
  });
  describe("name", () => {
    test("is proto file name without .proto suffix", async () => {
      const file = await compileFile(`syntax="proto3";`, "foo/bar/baz.proto");
      expect(file.name).toBe("foo/bar/baz");
    });
    test("strips only last .proto", async () => {
      const file = await compileFile(
        `syntax="proto3";`,
        "foo.proto/baz.proto.proto",
      );
      expect(file.name).toBe("foo.proto/baz.proto");
    });
  });
});

describe("DescMessage", () => {
  describe("deprecated", () => {
    test("is false by default", async () => {
      const descMessage = await compileMessage(`
        syntax="proto3";
        option deprecated = true;
        message Foo {}
      `);
      expect(descMessage.deprecated).toBe(false);
    });
    test("is true with option", async () => {
      const descMessage = await compileMessage(`
        syntax="proto3";
        message Foo {
          option deprecated = true;
        }
      `);
      expect(descMessage.deprecated).toBe(true);
    });
  });
  describe("field", () => {
    test("contains field by localName", async () => {
      const descMessage = await compileMessage(`
        syntax="proto3";
        message Foo {
          int32 foo_bar = 1;
          oneof kind {
            int32 oneof_field = 2;
          }
        }
      `);
      expect(Object.keys(descMessage.field).sort()).toStrictEqual([
        "fooBar",
        "oneofField",
      ]);
    });
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

describe("DescEnumValue", () => {
  describe("name", () => {
    test.each(["MY_ENUM_A", "foo", "__proto__"])(
      "is proto name %s",
      async (name) => {
        const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          ${name} = 0; 
        }
      `);
        expect(descEnum.values[0].name).toBe(name);
      },
    );
  });
  describe("localName", () => {
    test("does not change case", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum E {
          FooBAR_baz_1 = 0;
        }
      `)
      ).values[0];
      expect(value.localName).toBe("FooBAR_baz_1");
    });
    test("drops shared prefix", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum PrefixEnum {
          PREFIX_ENUM_ZERO = 0;
          PREFIX_ENUM_ONE = 1;
        }
      `)
      ).values[0];
      expect(value.localName).toBe("ZERO");
    });
    test("escapes reserved property name", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum EnumBuiltIn {
          constructor = 0;
        }
      `)
      ).values[0];
      expect(value.localName).toBe("constructor$");
    });
    test("escapes reserved property name with dropped prefix", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum EnumBuiltInPrefixed {
          ENUM_BUILT_IN_PREFIXED_constructor = 0;
        }
      `)
      ).values[0];
      expect(value.localName).toBe("constructor$");
    });
  });
});

describe("DescField", () => {
  describe("presence", () => {
    test("proto2 optional is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto2 optional message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional M f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto2 required is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          required int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.LEGACY_REQUIRED);
    });
    test("proto2 required message is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          required M f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.LEGACY_REQUIRED);
    });
    test("proto2 list is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          repeated int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto2 map is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          map <int32, int32> f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.IMPLICIT);
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
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto3 optional is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          optional int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 list is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          repeated int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto3 map is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          map <int32, int32> f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.IMPLICIT);
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
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          M f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 optional message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          optional M f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("edition2023 scalar is EXPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("edition2023 inherited features.field_presence is IMPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        option features.field_presence = IMPLICIT;
        message M { 
          int32 f = 1;
        }
      `);
      expect(field.presence).toBe(FeatureSet_FieldPresence.IMPLICIT);
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
  describe("longAsString", () => {
    test("returns default false for option omitted", async () => {
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
          expect(field.longAsString).toBe(false);
        }
      }
    });
    test.each([
      { jstype: "JS_NORMAL", longAsString: false },
      { jstype: "JS_NUMBER", longAsString: false },
      { jstype: "JS_STRING", longAsString: true },
    ] as const)(
      "returns default LongType.$longType for jstype=$jstype",
      async ({ jstype, longAsString }) => {
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
            expect(field.longAsString).toBe(longAsString);
          }
        }
      },
    );
  });
  describe("localName", () => {
    test("applies protoCamelCase", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          int32 __proto__ = 1;
        }
      `);
      expect(field.localName).toBe("Proto");
    });
    test("escapes reserved property name", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          int32 constructor = 1;
        }
      `);
      expect(field.localName).toBe("constructor$");
    });
    describe("with field in oneof", () => {
      test("applies protoCamelCase", async () => {
        const field = await compileField(`
        syntax="proto3";
        message M {
          oneof kind {
            int32 __proto__ = 1;
          }
        }
      `);
        expect(field.oneof).toBeDefined();
        expect(field.localName).toBe("Proto");
      });
      test("does not escape reserved property name", async () => {
        const field = await compileField(`
        syntax="proto3";
        message M {
          oneof kind {
            int32 constructor = 1;
          }
        }
      `);
        expect(field.oneof).toBeDefined();
        expect(field.localName).toBe("constructor");
      });
    });
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
        createFileRegistry(fileDescriptorSet).getMessage("M")?.fields;
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
        createFileRegistry(fileDescriptorSet).getMessage("M")?.fields;
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
        createFileRegistry(fileDescriptorSet).getMessage("M")?.fields;
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
        createFileRegistry(fileDescriptorSet).getMessage("M")?.fields;
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
      createFileRegistry(fileDescriptorSet).getMessage("M")?.fields[0];
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
        field.longAsString;

        // exclusive to list
        // @ts-expect-error TS2339
        field.packed;

        // exclusive to singular
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
            field.longAsString;
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

describe("DescOneof", () => {
  describe("localName", () => {
    test("applies protoCamelCase", async () => {
      const oneof = (
        await compileMessage(`
        syntax="proto3";
        message M {
          oneof __proto__ {
            bool placeholder = 1;
          }
        }
      `)
      ).oneofs[0];
      expect(oneof.localName).toBe("Proto");
    });
    test("escapes reserved property name", async () => {
      const oneof = (
        await compileMessage(`
        syntax="proto3";
        message M {
          oneof constructor {
            bool placeholder = 1;
          }
        }
      `)
      ).oneofs[0];
      expect(oneof.localName).toBe("constructor$");
    });
  });
  describe("fields", () => {
    test("has member fields", async () => {
      const oneof = (
        await compileMessage(`
        syntax="proto3";
        message M {
          oneof tst {
            bool a = 1;
            bool b = 2;
          }
        }
      `)
      ).oneofs[0];
      expect(oneof.fields.length).toBe(2);
    });
  });
});

describe("DescExtension", () => {
  test("typeName", async () => {
    const ext = await compileExtension(`
      syntax="proto2";
      extend M {
        optional int32 ext = 1;
      }
      message M { extensions 1; }
    `);
    expect(ext.typeName).toBe("ext");
  });
  test("typeName with package", async () => {
    const ext = await compileExtension(`
      syntax="proto2";
      package test;
      extend M {
        optional int32 ext = 1;
      }
      message M { extensions 1; }
    `);
    expect(ext.typeName).toBe("test.ext");
  });
  test("typeName for nested package", async () => {
    const message = await compileMessage(`
      syntax="proto2";
      package test;
      message C {
        extend M {
          optional int32 ext = 1;
        }
      }
      message M { extensions 1; }
    `);
    const ext = message.nestedExtensions[0];
    expect(ext.typeName).toBe("test.C.ext");
  });
  test("jsonName", async () => {
    const message = await compileMessage(`
      syntax="proto2";
      package test;
      message C {
        extend M {
          optional int32 ext = 1;
        }
      }
      message M { extensions 1; }
    `);
    const ext = message.nestedExtensions[0];
    expect(ext.jsonName).toBe("[test.C.ext]");
  });
  test("extendee", async () => {
    const file = await compileFile(`
      syntax="proto2";
      package test;
      extend M {
        optional int32 ext = 1;
      }
      message M { extensions 1; }
    `);
    const ext = file.extensions[0];
    const M = file.messages[0];
    expect(ext.extendee).toBe(M);
  });
  test("parent", async () => {
    const message = await compileMessage(`
      syntax="proto2";
      package test;
      message C {
        extend M {
          optional int32 ext = 1;
        }
      }
      message M { extensions 1; }
    `);
    const ext = message.nestedExtensions[0];
    expect(ext.parent).toBe(message);
  });
  describe("presence", () => {
    test("proto3 implicit field is EXPLICIT", async () => {
      const ext = await compileExtension(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        extend google.protobuf.FieldOptions {
          int32 ext = 1001;
        }
      `);
      expect(ext.presence).toBe(FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 list is IMPLICIT", async () => {
      const ext = await compileExtension(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        extend google.protobuf.FieldOptions {
          repeated int32 ext = 1001;
        }
      `);
      expect(ext.presence).toBe(FeatureSet_FieldPresence.IMPLICIT);
    });
  });
  describe("delimitedEncoding", () => {
    test("true for proto2 group", async () => {
      const ext = await compileExtension(`
        syntax="proto2";
        extend M {
          optional group GroupExt = 1 {}
        }
        message M { extensions 1; }
      `);
      expect(
        ext.fieldKind == "message" ? ext.delimitedEncoding : undefined,
      ).toBe(true);
    });
    test("true for field with features.message_encoding = DELIMITED", async () => {
      const ext = await compileExtension(`
        edition="2023";
        extend M {
          M f = 1 [features.message_encoding = DELIMITED];
        }
        message M { extensions 1; }
      `);
      expect(
        ext.fieldKind == "message" ? ext.delimitedEncoding : undefined,
      ).toBe(true);
    });
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
  describe("localName", () => {
    test("makes first letter lowerCase", async () => {
      const rpc = (
        await compileService(`
        syntax="proto3";
        service Srv {
          rpc Foo_bar_BAZ(E) returns (E);
        }
        message E {}
      `)
      ).methods[0];
      expect(rpc.localName).toBe("foo_bar_BAZ");
    });
    test("escapes reserved property name", async () => {
      const rpc = (
        await compileService(`
        syntax="proto3";
        service Srv {
          rpc constructor(E) returns (E);
        }
        message E {}
      `)
      ).methods[0];
      expect(rpc.localName).toBe("constructor$");
    });
  });
});
