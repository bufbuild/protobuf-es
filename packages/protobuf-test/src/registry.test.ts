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

import { suite, test, beforeEach, before } from "node:test";
import * as assert from "node:assert";
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

void suite("createRegistry()", () => {
  let testReg: FileRegistry;
  let testDescs: {
    message: DescMessage;
    enum: DescEnum;
    service: DescService;
    extension: DescExtension;
  };
  before(async () => {
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
    assert.ok(descMsg);
    assert.ok(descMsg.kind == "message");
    const descEnu = testReg.get("Enu");
    assert.ok(descEnu);
    assert.ok(descEnu.kind == "enum");
    const descSrv = testReg.get("Srv");
    assert.ok(descSrv);
    assert.ok(descSrv.kind == "service");
    const descExt = testReg.get("ext");
    assert.ok(descExt);
    assert.ok(descExt.kind == "extension");
    testDescs = {
      message: descMsg,
      enum: descEnu,
      service: descSrv,
      extension: descExt,
    };
  });
  void suite("get()", () => {
    void test("gets message", () => {
      const reg = createRegistry(testDescs.message);
      assert.strictEqual(reg.get("Msg"), testDescs.message);
    });
    void test("gets enum", () => {
      const reg = createRegistry(testDescs.enum);
      assert.strictEqual(reg.get("Enu"), testDescs.enum);
    });
    void test("gets service", () => {
      const reg = createRegistry(testDescs.service);
      assert.strictEqual(reg.get("Srv"), testDescs.service);
    });
    void test("gets extension", () => {
      const reg = createRegistry(testDescs.extension);
      assert.strictEqual(reg.get("ext"), testDescs.extension);
    });
  });
  void suite("getMessage()", () => {
    void test("gets message", () => {
      const reg = createRegistry(testDescs.message);
      const msg: DescMessage | undefined = reg.getMessage("Msg");
      assert.strictEqual(msg, testDescs.message);
    });
  });
  void suite("getEnum()", () => {
    void test("gets enum", () => {
      const reg = createRegistry(testDescs.enum);
      const msg: DescEnum | undefined = reg.getEnum("Enu");
      assert.strictEqual(msg, testDescs.enum);
    });
  });
  void suite("getService()", () => {
    void test("gets service", () => {
      const reg = createRegistry(testDescs.service);
      const msg: DescService | undefined = reg.getService("Srv");
      assert.strictEqual(msg, testDescs.service);
    });
  });
  void suite("getExtension()", () => {
    void test("gets extension", () => {
      const reg = createRegistry(testDescs.extension);
      const ext: DescExtension | undefined = reg.getExtension("ext");
      assert.strictEqual(ext, testDescs.extension);
    });
  });
  void suite("getExtensionFor()", () => {
    void test("gets extension", () => {
      const reg = createRegistry(testDescs.extension);
      const ext: DescExtension | undefined = reg.getExtensionFor(
        testDescs.message,
        1,
      );
      assert.strictEqual(ext, testDescs.extension);
    });
    void test("returns undefined on unknown extension field number", () => {
      const reg = createRegistry(testDescs.extension);
      const msg: DescExtension | undefined = reg.getExtensionFor(
        testDescs.message,
        2,
      );
      assert.strictEqual(msg, undefined);
    });
    void test("returns undefined on unknown extendee", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "b.proto": `
        syntax="proto3";
        message OtherMsg {}
      `,
      });
      const otherMessageDesc =
        createFileRegistry(fileDescriptorSet).getMessage("OtherMsg");
      assert.ok(otherMessageDesc);
      const reg = createRegistry(testDescs.extension);
      const msg: DescExtension | undefined = reg.getExtensionFor(
        otherMessageDesc,
        2,
      );
      assert.strictEqual(msg, undefined);
    });
  });
  void suite("iterator", () => {
    void test("gets registered types", () => {
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
      assert.deepStrictEqual(actual, want);
    });
  });
  void suite("from DescMessage", () => {
    void test("provides message", () => {
      const reg = createRegistry(testDescs.message);
      assert.ok(reg.get("Msg") !== undefined);
    });
    void test("does not make message fields available", async () => {
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
      assert.ok(testMessage);
      const reg = createRegistry(testMessage);
      assert.ok(reg.get("Msg") !== undefined);
      assert.strictEqual(reg.get("FieldMsg"), undefined);
    });
    void test("does not make nested messages available", async () => {
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
      assert.ok(testMessage);
      const nestedTestMessage = testReg.getMessage("Msg.Nested");
      assert.ok(nestedTestMessage);
      const reg = createRegistry(testMessage);
      assert.ok(reg.get("Msg") !== undefined);
      assert.strictEqual(reg.get("Msg.Nested"), undefined);
      assert.strictEqual(Array.from(reg).length, 1);
    });
    void test("later duplicate type overwrites former type", async () => {
      const fileDescriptorSet = await compileFileDescriptorSet({
        "b.proto": `
        syntax="proto3";
        message Msg {}
      `,
      });
      const duplicateMessage =
        createFileRegistry(fileDescriptorSet).getMessage("Msg");
      assert.ok(duplicateMessage);
      assert.ok(duplicateMessage.typeName === testDescs.message.typeName);
      const reg = createRegistry(duplicateMessage, testDescs.message);
      assert.strictEqual(reg.getMessage("Msg"), testDescs.message);
    });
  });
  void suite("from DescFile", () => {
    void test("provides all types from the file", () => {
      const testFile = testReg.getFile("a.proto");
      assert.ok(testFile);
      const reg = createRegistry(testFile);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      assert.deepStrictEqual(regTypeNames, ["Msg", "Enu", "Srv", "ext"].sort());
    });
  });
  void suite("from Registry", () => {
    void test("creates a copy of the given Registry", () => {
      const testSetTypeNames = Array.from(testReg)
        .map((t) => t.typeName)
        .sort();
      assert.ok(testSetTypeNames.length > 0);
      const reg = createRegistry(testReg);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      assert.deepStrictEqual(regTypeNames, testSetTypeNames);
    });
    void test("merges two Registries", async () => {
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
      assert.deepStrictEqual(
        regTypeNames,
        ["Msg", "Enu", "Srv", "ext", "Msg2", "Enu2", "Srv2", "ext2"].sort(),
      );
    });
    void test("later duplicate type overwrites former type", async () => {
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
      assert.deepStrictEqual(
        regTypeNames,
        ["Msg", "Enu", "Srv", "ext", "Msg3"].sort(),
      );
      assert.strictEqual(reg.get("Msg"), secondReg.get("Msg"));
      assert.notStrictEqual(reg.get("Msg"), testReg.get("Msg"));
    });
  });
});

void suite("createMutableRegistry()", () => {
  void test("from DescMessage", async () => {
    const desc = await compileMessage(`
      syntax = "proto3";
      message A {}
    `);
    const reg = createMutableRegistry(desc);
    assert.ok(reg.getMessage("A") !== undefined);
  });
  void test("add() adds DescMessage", async () => {
    const desc = await compileMessage(`
      syntax = "proto3";
      message A {}
    `);
    const reg = createMutableRegistry();
    reg.add(desc);
    assert.ok(reg.getMessage("A") !== undefined);
  });
  void test("remove() removes DescMessage", async () => {
    const desc = await compileMessage(`
      syntax = "proto3";
      message A {}
    `);
    const reg = createMutableRegistry(desc);
    reg.remove(desc);
    assert.strictEqual(reg.getMessage("A"), undefined);
  });
});

void suite("createFileRegistry()", () => {
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
  void suite("from FileDescriptorSet", () => {
    void test("provides files through getFile()", () => {
      const fileReg = createFileRegistry(testFileDescriptorSet);
      const a = fileReg.getFile("a.proto");
      const b = fileReg.getFile("b.proto");
      const c = fileReg.getFile("c.proto");
      const d = fileReg.getFile("d.proto");
      assert.ok(a !== undefined);
      assert.ok(b !== undefined);
      assert.ok(c !== undefined);
      assert.deepStrictEqual(a?.dependencies, [b, c]);
      assert.deepStrictEqual(b?.dependencies, [d]);
      assert.deepStrictEqual(c?.dependencies, [d]);
      assert.deepStrictEqual(d?.dependencies, []);
    });
    test("provides files through file iterable", () => {
      const fileReg = createFileRegistry(testFileDescriptorSet);
      assert.deepStrictEqual(
        Array.from(fileReg.files).map((f) => f.name),
        ["d", "b", "c", "a"],
      );
    });
  });
  void suite("from FileDescriptorProto", () => {
    let descFileA: DescFile;
    let testFileReg: FileRegistry;
    before(() => {
      testFileReg = createFileRegistry(testFileDescriptorSet);
      const a = testFileReg.getFile("a.proto");
      assert.ok(a !== undefined);
      descFileA = a;
    });
    test("resolves all dependencies as FileDescriptorProto", () => {
      const reg = createFileRegistry(descFileA.proto, (protoFileName) =>
        testFileReg.getFile(protoFileName),
      );
      assert.ok(reg.getFile("a.proto") !== undefined);
      assert.ok(reg.getFile("b.proto") !== undefined);
      assert.ok(reg.getFile("c.proto") !== undefined);
      assert.ok(reg.getFile("d.proto") !== undefined);
      assert.ok(reg.getMessage("A") !== undefined);
      assert.ok(reg.getMessage("B") !== undefined);
      assert.ok(reg.getMessage("C") !== undefined);
      assert.ok(reg.getMessage("D") !== undefined);
    });
    test("resolves all dependencies as DescFile", () => {
      const reg = createFileRegistry(descFileA.proto, (protoFileName) =>
        testFileReg.getFile(protoFileName),
      );
      assert.ok(reg.getFile("a.proto") !== undefined);
      assert.ok(reg.getFile("b.proto") !== undefined);
      assert.ok(reg.getFile("c.proto") !== undefined);
      assert.ok(reg.getFile("d.proto") !== undefined);
      assert.ok(reg.getMessage("A") !== undefined);
      assert.ok(reg.getMessage("B") !== undefined);
      assert.ok(reg.getMessage("C") !== undefined);
      assert.ok(reg.getMessage("D") !== undefined);
    });
    test("raises error on unresolvable dependency", () => {
      function t() {
        createFileRegistry(descFileA.proto, (protoFileName) => {
          if (protoFileName === "c.proto") {
            return undefined;
          }
          return testFileReg.getFile(protoFileName);
        });
      }
      assert.throws(t, {
        message: /^Unable to resolve c.proto, imported by a.proto$/,
      });
    });
  });
  test("accepts empty arguments", () => {
    const registry = createFileRegistry();
    const types = Array.from(registry);
    const files = Array.from(registry.files);
    assert.strictEqual(types.length, 0);
    assert.strictEqual(files.length, 0);
  });
  test("raises error on unsupported edition from the past", () => {
    testFileDescriptorSet.file[0].syntax = "editions";
    testFileDescriptorSet.file[0].edition = Edition.EDITION_1_TEST_ONLY;
    function t() {
      createFileRegistry(testFileDescriptorSet);
    }
    assert.throws(t, { message: /^d.proto: unsupported edition$/ });
  });
  test("raises error on unsupported edition from the future", () => {
    testFileDescriptorSet.file[0].syntax = "editions";
    testFileDescriptorSet.file[0].edition = Edition.EDITION_99999_TEST_ONLY;
    function t() {
      createFileRegistry(testFileDescriptorSet);
    }
    assert.throws(t, { message: /^d.proto: unsupported edition$/ });
  });
  void suite("from FileRegistry", () => {
    test("creates a copy of the given FileRegistry", () => {
      const testReg = createFileRegistry(testFileDescriptorSet);
      const testRegFileNames = Array.from(testReg.files)
        .map((f) => f.name)
        .sort();
      const testRegTypeNames = Array.from(testReg)
        .map((t) => t.typeName)
        .sort();
      assert.ok(testRegTypeNames.length > 0);

      const reg = createFileRegistry(testReg);
      const regFileNames = Array.from(reg.files)
        .map((f) => f.name)
        .sort();
      assert.deepStrictEqual(regFileNames, testRegFileNames);
      const regTypeNames = Array.from(reg)
        .map((t) => t.typeName)
        .sort();
      assert.deepStrictEqual(regTypeNames, testRegTypeNames);
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
      assert.deepStrictEqual(
        Array.from(reg)
          .map((t) => t.typeName)
          .sort(),
        ["Msg", "Enu", "Srv", "ext", "Msg2", "Enu2", "Srv2", "ext2"].sort(),
      );
      assert.deepStrictEqual(
        Array.from(reg.files)
          .map((f) => f.name)
          .sort(),
        ["a", "b"].sort(),
      );
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
      assert.deepStrictEqual(
        Array.from(reg.files).map((f) => f.name),
        ["a"],
      );
      assert.deepStrictEqual(
        Array.from(reg)
          .map((t) => t.typeName)
          .sort(),
        ["MsgA", "MsgB"].sort(),
      );
    });
  });
});

void suite("DescFile", () => {
  test("proto2 syntax", async () => {
    const file = await compileFile(`syntax="proto2";`);
    assert.strictEqual(file.edition, Edition.EDITION_PROTO2);
  });
  test("proto3 syntax", async () => {
    const file = await compileFile(`syntax="proto3";`);
    assert.strictEqual(file.edition, Edition.EDITION_PROTO3);
  });
  test("edition 2023", async () => {
    const file = await compileFile(`edition = "2023";`);
    assert.strictEqual(file.edition, Edition.EDITION_2023);
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
    assert.strictEqual(a?.name, "a");
    assert.strictEqual(a?.dependencies.length, 2);
    assert.deepStrictEqual(
      a?.dependencies.map((f) => f.name),
      ["b", "c"],
    );
  });
  void suite("name", () => {
    test("is proto file name without .proto suffix", async () => {
      const file = await compileFile(`syntax="proto3";`, "foo/bar/baz.proto");
      assert.strictEqual(file.name, "foo/bar/baz");
    });
    test("strips only last .proto", async () => {
      const file = await compileFile(
        `syntax="proto3";`,
        "foo.proto/baz.proto.proto",
      );
      assert.strictEqual(file.name, "foo.proto/baz.proto");
    });
  });
});

void suite("DescMessage", () => {
  void suite("deprecated", () => {
    test("is false by default", async () => {
      const descMessage = await compileMessage(`
        syntax="proto3";
        option deprecated = true;
        message Foo {}
      `);
      assert.strictEqual(descMessage.deprecated, false);
    });
    test("is true with option", async () => {
      const descMessage = await compileMessage(`
        syntax="proto3";
        message Foo {
          option deprecated = true;
        }
      `);
      assert.strictEqual(descMessage.deprecated, true);
    });
  });
  void suite("field", () => {
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
      assert.deepStrictEqual(Object.keys(descMessage.field).sort(), [
        "fooBar",
        "oneofField",
      ]);
    });
  });
});

void suite("DescEnum", () => {
  void suite("open", () => {
    test("proto3 enum is open", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum E {
          A = 0;
        }
      `);
      assert.strictEqual(descEnum.open, true);
    });
    test("proto2 enum is closed", async () => {
      const descEnum = await compileEnum(`
        syntax="proto2";
        enum E {
          A = 1;
        }
      `);
      assert.strictEqual(descEnum.open, false);
    });
    test("edition 2023 enum is open by default", async () => {
      const descEnum = await compileEnum(`
        edition="2023";
        enum E {
          A = 0;
        }
      `);
      assert.strictEqual(descEnum.open, true);
    });
    test("edition 2023 enum is closed by file feature", async () => {
      const descEnum = await compileEnum(`
        edition="2023";
        option features.enum_type = CLOSED;
        enum E {
          A = 1;
        }
      `);
      assert.strictEqual(descEnum.open, false);
    });
    test("edition 2023 enum is closed by enum feature", async () => {
      const descEnum = await compileEnum(`
        edition="2023";
        enum E {
          option features.enum_type = CLOSED;
          A = 1;
        }
      `);
      assert.strictEqual(descEnum.open, false);
    });
  });
  void suite("sharedPrefix", () => {
    test("is shared prefix", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_A = 0; 
          MY_ENUM_B = 1;
        }
      `);
      assert.strictEqual(descEnum.sharedPrefix, "my_enum_");
    });
    test("is shared prefix regardless of casing", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_A = 0; 
          my_enum_B = 1;
        }
      `);
      assert.strictEqual(descEnum.sharedPrefix, "my_enum_");
    });
    test("is undefined without shared prefix", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_UNSPECIFIED = 0; 
          B = 1;
        }
      `);
      assert.strictEqual(descEnum.sharedPrefix, undefined);
    });
    test("is undefined if any short name starts with a number", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum MyEnum {
          MY_ENUM_A = 0; 
          MY_ENUM_23_B = 1; 
        }
      `);
      assert.strictEqual(descEnum.sharedPrefix, undefined);
    });
  });
  void suite("deprecated", () => {
    test("not deprecated by default", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum E {
          A = 0;
        }
      `);
      assert.strictEqual(descEnum.deprecated, false);
    });
    test("deprecated is deprecated", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        enum E {
          option deprecated = true;
          A = 0;
        }
      `);
      assert.strictEqual(descEnum.deprecated, true);
    });
    test("deprecated file is not deprecated", async () => {
      const descEnum = await compileEnum(`
        syntax="proto3";
        option deprecated = true;
        enum E {
          A = 0;
        }
      `);
      assert.strictEqual(descEnum.deprecated, false);
    });
  });
});

void suite("DescEnumValue", () => {
  void suite("name", () => {
    for (const name of ["MY_ENUM_A", "foo", "__proto__"]) {
      void test(`is proto name ${name}`, async () => {
        const descEnum = await compileEnum(`
          syntax="proto3";
          enum MyEnum {
            ${name} = 0; 
          }
        `);
        assert.strictEqual(descEnum.values[0].name, name);
      });
    }
  });
  void suite("localName", () => {
    test("does not change case", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum E {
          FooBAR_baz_1 = 0;
        }
      `)
      ).values[0];
      assert.strictEqual(value.localName, "FooBAR_baz_1");
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
      assert.strictEqual(value.localName, "ZERO");
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
      assert.strictEqual(value.localName, "constructor$");
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
      assert.strictEqual(value.localName, "constructor$");
    });
  });
  void suite("deprecated", () => {
    test("not deprecated by default", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum E {
          A = 0;
        }
      `)
      ).values[0];
      assert.strictEqual(value.deprecated, false);
    });
    test("deprecated is deprecated", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum E {
          A = 0 [deprecated = true];
        }
      `)
      ).values[0];
      assert.strictEqual(value.deprecated, true);
    });
    test("deprecated enum is not deprecated", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        enum E {
        option deprecated = true;
          A = 0;
        }
      `)
      ).values[0];
      assert.strictEqual(value.deprecated, false);
    });
    test("deprecated file is not deprecated", async () => {
      const value = (
        await compileEnum(`
        syntax="proto3";
        option deprecated = true;
        enum E {
          A = 0;
        }
      `)
      ).values[0];
      assert.strictEqual(value.deprecated, false);
    });
  });
});

void suite("DescField", () => {
  void suite("presence", () => {
    test("proto2 optional scalar is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto2 optional message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto2 required scalar is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          required int32 f = 1;
        }
      `);
      assert.strictEqual(
        field.presence,
        FeatureSet_FieldPresence.LEGACY_REQUIRED,
      );
    });
    test("proto2 required message is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          required M f = 1;
        }
      `);
      assert.strictEqual(
        field.presence,
        FeatureSet_FieldPresence.LEGACY_REQUIRED,
      );
    });
    test("proto2 scalar list is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          repeated int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto2 message list is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          repeated M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto2 scalar map is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          map <int32, int32> f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto2 message map is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          map <int32, M> f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
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
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 scalar is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto3 optional scalar is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          optional int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 scalar list is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          repeated int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto3 message list is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          repeated M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto3 scalar map is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          map <int32, int32> f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("proto3 message map is IMPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          map <int32, M> f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
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
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 optional message is EXPLICIT", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M { 
          optional M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("edition2023 scalar is EXPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("edition2023 scalar inherits IMPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        option features.field_presence = IMPLICIT;
        message M { 
          int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("edition2023 message is EXPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        option features.field_presence = IMPLICIT;
        message M { 
          M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("edition2023 message does not inherit IMPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        option features.field_presence = IMPLICIT;
        message M { 
          M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("edition2023 scalar list is IMPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          repeated int32 f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("edition2023 message list is IMPLICIT", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          repeated M f = 1;
        }
      `);
      assert.strictEqual(field.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
    test("edition2023 scalar with LEGACY_REQUIRED is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          int32 f = 1 [features.field_presence = LEGACY_REQUIRED];
        }
      `);
      assert.strictEqual(
        field.presence,
        FeatureSet_FieldPresence.LEGACY_REQUIRED,
      );
    });
    test("edition2023 message with LEGACY_REQUIRED is LEGACY_REQUIRED", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          M f = 1 [features.field_presence = LEGACY_REQUIRED];
        }
      `);
      assert.strictEqual(
        field.presence,
        FeatureSet_FieldPresence.LEGACY_REQUIRED,
      );
    });
  });
  void suite("delimitedEncoding", () => {
    test("true for proto2 group", async () => {
      const field = await compileField(`
        syntax="proto2";
        message M { 
          optional group GroupField = 2 {}
        }
      `);
      assert.strictEqual(
        field.fieldKind == "message" ? field.delimitedEncoding : undefined,
        true,
      );
    });
    test("true for field with features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          M f = 1 [features.message_encoding = DELIMITED];
        }
      `);
      assert.strictEqual(
        field.fieldKind == "message" ? field.delimitedEncoding : undefined,
        true,
      );
    });
    test("true for list field with features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        message M { 
          repeated M f = 1 [features.message_encoding = DELIMITED];
        }
      `);
      assert.strictEqual(
        field.fieldKind == "list" && field.listKind == "message"
          ? field.delimitedEncoding
          : undefined,
        true,
      );
    });
    test("true for file with features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        option features.message_encoding = DELIMITED;
        message M { 
          M f = 1;
        }
      `);
      assert.strictEqual(
        field.fieldKind == "message" ? field.delimitedEncoding : undefined,
        true,
      );
    });
    test("false for map field with inherited features.message_encoding = DELIMITED", async () => {
      const field = await compileField(`
        edition="2023";
        option features.message_encoding = DELIMITED;
        message M { 
          map <int32, string> f = 1;
        }
      `);
      assert.strictEqual(
        field.fieldKind == "map" ? field.delimitedEncoding : undefined,
        false,
      );
    });
  });
  void suite("longAsString", () => {
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
      assert.ok(fields.length > 0);
      for (const field of fields) {
        assert.ok(
          field.fieldKind == "scalar" ||
            (field.fieldKind == "list" && field.listKind == "scalar"),
        );
        if (
          field.fieldKind == "scalar" ||
          (field.fieldKind == "list" && field.listKind == "scalar")
        ) {
          assert.strictEqual(field.longAsString, false);
        }
      }
    });
    for (const { jstype, longAsString } of [
      { jstype: "JS_NORMAL", longAsString: false },
      { jstype: "JS_NUMBER", longAsString: false },
      { jstype: "JS_STRING", longAsString: true },
    ] as const) {
      void test(`returns longAsString=${longAsString} for jstype=${jstype}`, async () => {
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
        assert.ok(fields.length > 0);
        for (const field of fields) {
          assert.ok(
            field.fieldKind == "scalar" ||
              (field.fieldKind == "list" && field.listKind == "scalar"),
          );
          if (
            field.fieldKind == "scalar" ||
            (field.fieldKind == "list" && field.listKind == "scalar")
          ) {
            assert.strictEqual(field.longAsString, longAsString);
          }
        }
      });
    }
  });
  void suite("localName", () => {
    test("applies protoCamelCase", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          int32 __proto__ = 1;
        }
      `);
      assert.strictEqual(field.localName, "Proto");
    });
    test("escapes reserved property name", async () => {
      const field = await compileField(`
        syntax="proto3";
        message M {
          int32 constructor = 1;
        }
      `);
      assert.strictEqual(field.localName, "constructor$");
    });
    void suite("with field in oneof", () => {
      test("applies protoCamelCase", async () => {
        const field = await compileField(`
        syntax="proto3";
        message M {
          oneof kind {
            int32 __proto__ = 1;
          }
        }
      `);
        assert.ok(field.oneof !== undefined);
        assert.strictEqual(field.localName, "Proto");
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
        assert.ok(field.oneof !== undefined);
        assert.strictEqual(field.localName, "constructor");
      });
    });
  });
  void suite("jsonName", () => {
    for (const name of ["field", "foo_bar", "__proto__", "constructor"]) {
      void test(`returns compiler-provided json_name for ${name}`, async () => {
        const field = await compileField(`
          syntax="proto3";
          message M {
            int32 ${name} = 1;
          }
        `);
        assert.strictEqual(field.jsonName, protoCamelCase(name));
        assert.strictEqual(field.jsonName, field.proto.jsonName);
      });
    }
    for (const name of ["foo", "foo_bar", "", "@type"]) {
      void test(`returns custom json_name for ${name}`, async () => {
        const field = await compileField(`
          syntax="proto3";
          message M {
            int32 f = 1 [json_name = "${name}"];
          }
        `);
        assert.strictEqual(field.jsonName, name);
      });
    }
  });
  void suite("repeated field packing", () => {
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
      assert.ok(fields);
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, false);
      }
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, true);
      }
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, false);
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
      assert.ok(fields);
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, true);
      }
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, true);
      }
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, false);
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
      assert.ok(fields);
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, true);
      }
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, true);
      }
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, false);
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
      assert.ok(fields);
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, false);
      }
      {
        const f = fields.shift();
        assert.ok(
          f?.fieldKind == "list" &&
            (f.listKind == "scalar" || f.listKind == "enum"),
        );
        assert.strictEqual(f.packed, true);
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
    assert.ok(field);

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

        assert.ok([def, oneof].length > 0);
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
            assert.ok([defBool].length > 0);
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

        assert.ok([def, oneof].length > 0);
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

        assert.ok([def, oneof].length > 0);
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
            assert.ok([scalar, message, enumeration].length > 0);
            break;
          }
          case "enum": {
            // @ts-expect-error TS2339
            field.longType;
            const scalar: undefined = field.scalar;
            const message: undefined = field.message;
            const enumeration: DescEnum = field.enum;
            assert.ok([scalar, message, enumeration].length > 0);
            break;
          }
          case "message": {
            // @ts-expect-error TS2339
            field.longType;
            const scalar: undefined = field.scalar;
            const message: DescMessage = field.message;
            const enumeration: undefined = field.enum;
            assert.ok([scalar, message, enumeration].length > 0);
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

        assert.ok([oneof].length > 0);
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
            assert.ok([scalar, message, enumeration].length > 0);
            break;
          }
          case "enum": {
            const scalar: undefined = field.scalar;
            const message: undefined = field.message;
            const enumeration: DescEnum = field.enum;
            assert.ok([scalar, message, enumeration].length > 0);
            break;
          }
          case "message": {
            const scalar: undefined = field.scalar;
            const message: DescMessage = field.message;
            const enumeration: undefined = field.enum;
            assert.ok([scalar, message, enumeration].length > 0);
            break;
          }
        }

        const oneof: undefined = field.oneof;

        assert.ok(
          [mapKeyFloat, mapKeyDouble, mapKeyBytes, mapKeyOk, oneof].length > 0,
        );
        break;
      }
    }
  });
});

void suite("DescOneof", () => {
  void suite("localName", () => {
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
      assert.strictEqual(oneof.localName, "Proto");
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
      assert.strictEqual(oneof.localName, "constructor$");
    });
  });
  void suite("fields", () => {
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
      assert.strictEqual(oneof.fields.length, 2);
    });
  });
});

void suite("DescExtension", () => {
  test("typeName", async () => {
    const ext = await compileExtension(`
      syntax="proto2";
      extend M {
        optional int32 ext = 1;
      }
      message M { extensions 1; }
    `);
    assert.strictEqual(ext.typeName, "ext");
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
    assert.strictEqual(ext.typeName, "test.ext");
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
    assert.strictEqual(ext.typeName, "test.C.ext");
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
    assert.strictEqual(ext.jsonName, "[test.C.ext]");
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
    assert.strictEqual(ext.extendee, M);
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
    assert.strictEqual(ext.parent, message);
  });
  void suite("presence", () => {
    test("proto3 implicit field is EXPLICIT", async () => {
      const ext = await compileExtension(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        extend google.protobuf.FieldOptions {
          int32 ext = 1001;
        }
      `);
      assert.strictEqual(ext.presence, FeatureSet_FieldPresence.EXPLICIT);
    });
    test("proto3 list is IMPLICIT", async () => {
      const ext = await compileExtension(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        extend google.protobuf.FieldOptions {
          repeated int32 ext = 1001;
        }
      `);
      assert.strictEqual(ext.presence, FeatureSet_FieldPresence.IMPLICIT);
    });
  });
  void suite("delimitedEncoding", () => {
    test("true for proto2 group", async () => {
      const ext = await compileExtension(`
        syntax="proto2";
        extend M {
          optional group GroupExt = 1 {}
        }
        message M { extensions 1; }
      `);
      assert.strictEqual(
        ext.fieldKind == "message" ? ext.delimitedEncoding : undefined,
        true,
      );
    });
    test("true for field with features.message_encoding = DELIMITED", async () => {
      const ext = await compileExtension(`
        edition="2023";
        extend M {
          M f = 1 [features.message_encoding = DELIMITED];
        }
        message M { extensions 1; }
      `);
      assert.strictEqual(
        ext.fieldKind == "message" ? ext.delimitedEncoding : undefined,
        true,
      );
    });
  });
});

void suite("DescService", () => {
  test("typeName", async () => {
    const service = await compileService(`
      syntax="proto3";
      package test;
      service Foo {}
    `);
    assert.strictEqual(service.typeName, "test.Foo");
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
    assert.strictEqual(service.methods.length, 2);
    assert.strictEqual(service.deprecated, false);
  });
  void suite("deprecated", () => {
    test("is false by default", async () => {
      const service = await compileService(`
        syntax="proto3";
        service Foo {}
      `);
      assert.strictEqual(service.deprecated, false);
    });
    test("is true with option", async () => {
      const service = await compileService(`
        syntax="proto3";
        service Foo {
          option deprecated = true;
        }
      `);
      assert.strictEqual(service.deprecated, true);
    });
  });
});

void suite("DescMethod", () => {
  void suite("methodKind", () => {
    test("unary", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {}
        }
        message I {}
        message O {}
      `);
      assert.strictEqual(method.methodKind, "unary");
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
      assert.strictEqual(method.methodKind, "server_streaming");
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
      assert.strictEqual(method.methodKind, "client_streaming");
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
      assert.strictEqual(method.methodKind, "bidi_streaming");
    });
  });
  void suite("idempotency", () => {
    test("is IDEMPOTENCY_UNKNOWN if unset", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O) {}
        }
        message I {}
        message O {}
      `);
      assert.strictEqual(
        method.idempotency,
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
      assert.strictEqual(
        method.idempotency,
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
      assert.strictEqual(
        method.idempotency,
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
      assert.strictEqual(
        method.idempotency,
        MethodOptions_IdempotencyLevel.IDEMPOTENT,
      );
    });
  });
  void suite("deprecated", () => {
    test("is false by default", async () => {
      const method = await compileMethod(`
        syntax="proto3";
        service Foo { 
          rpc Bar(I) returns(O);
        }
        message I {}
        message O {}
      `);
      assert.strictEqual(method.deprecated, false);
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
      assert.strictEqual(method.deprecated, true);
    });
  });
  void suite("localName", () => {
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
      assert.strictEqual(rpc.localName, "foo_bar_BAZ");
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
      assert.strictEqual(rpc.localName, "constructor$");
    });
  });
});
