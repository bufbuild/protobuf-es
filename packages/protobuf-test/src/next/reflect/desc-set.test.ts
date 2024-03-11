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
import assert from "node:assert";
import { UpstreamProtobuf } from "upstream-protobuf";
import type { DescFileSet } from "@bufbuild/protobuf/next/reflect";
import type {
  DescEnum,
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
} from "@bufbuild/protobuf";
import { FileDescriptorSet } from "@bufbuild/protobuf";
import {
  createDescFileSet,
  createDescSet,
} from "@bufbuild/protobuf/next/reflect";

describe("createDescSet()", function () {
  let testSet: DescFileSet;
  let testDescs: {
    message: DescMessage;
    enum: DescEnum;
    service: DescService;
    extension: DescExtension;
  };
  beforeAll(async () => {
    const upstream = new UpstreamProtobuf();
    const fileDescriptorSetBytes = await upstream.compileToDescriptorSet({
      "a.proto": `
        syntax="proto2";
        message Msg { extensions 1 to 2; }
        enum Enu { ENU_UNSPECIFIED=0; }
        service Srv {}
        extend Msg { optional int32 ext = 1; }
      `,
    });
    const fileDescriptorSet = FileDescriptorSet.fromBinary(
      fileDescriptorSetBytes,
    );
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
      const msg: DescExtension | undefined = set.getExtension("ext");
      expect(msg).toBe(testDescs.extension);
    });
  });
  describe("getExtensionFor()", () => {
    test("gets extension", () => {
      const set = createDescSet(testDescs.extension);
      const msg: DescExtension | undefined = set.getExtensionFor(
        testDescs.message,
        1,
      );
      expect(msg).toBe(testDescs.extension);
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
      const fileDescriptorSetBytes =
        await new UpstreamProtobuf().compileToDescriptorSet({
          "b.proto": `
        syntax="proto3";
        message OtherMsg {}
      `,
        });
      const fileDescriptorSet = FileDescriptorSet.fromBinary(
        fileDescriptorSetBytes,
      );
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
      const fileDescriptorSetBytes =
        await new UpstreamProtobuf().compileToDescriptorSet({
          "b.proto": `
        syntax="proto3";
        message Msg {
          FieldMsg f = 1;
        }
        message FieldMsg {}
      `,
        });
      const fileDescriptorSet = FileDescriptorSet.fromBinary(
        fileDescriptorSetBytes,
      );
      const testMessage =
        createDescFileSet(fileDescriptorSet).getMessage("Msg");
      assert(testMessage);
      const set = createDescSet(testMessage);
      expect(set.get("Msg")).toBeDefined();
      expect(set.get("FieldMsg")).toBeUndefined();
    });
    test("does not make nested messages available", async () => {
      const fileDescriptorSetBytes =
        await new UpstreamProtobuf().compileToDescriptorSet({
          "b.proto": `
        syntax="proto3";
        message Msg {
          message Nested {}
        }
      `,
        });
      const testSet = createDescFileSet(
        FileDescriptorSet.fromBinary(fileDescriptorSetBytes),
      );
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
      const fileDescriptorSetBytes =
        await new UpstreamProtobuf().compileToDescriptorSet({
          "b.proto": `
        syntax="proto3";
        message Msg {}
      `,
        });
      const fileDescriptorSet = FileDescriptorSet.fromBinary(
        fileDescriptorSetBytes,
      );
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
      const fileDescriptorSetBytes =
        await new UpstreamProtobuf().compileToDescriptorSet({
          "a.proto": `
        syntax="proto2";
        message Msg2 { extensions 1 to 2; }
        enum Enu2 { ENU_UNSPECIFIED=0; }
        service Srv2 {}
        extend Msg2 { optional int32 ext2 = 1; }
      `,
        });
      const secondSet = createDescFileSet(
        FileDescriptorSet.fromBinary(fileDescriptorSetBytes),
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
      const fileDescriptorSetBytes =
        await new UpstreamProtobuf().compileToDescriptorSet({
          "a.proto": `
        syntax="proto2";
        message Msg {}
        message Msg3 {}
      `,
        });
      const secondSet = createDescFileSet(
        FileDescriptorSet.fromBinary(fileDescriptorSetBytes),
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
  beforeAll(async () => {
    const upstream = new UpstreamProtobuf();
    const fileDescriptorSetBytes = await upstream.compileToDescriptorSet({
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
    testFileDescriptorSet = FileDescriptorSet.fromBinary(
      fileDescriptorSetBytes,
    );
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
        FileDescriptorSet.fromBinary(
          await new UpstreamProtobuf().compileToDescriptorSet({
            "a.proto": `
          syntax="proto2";
          message Msg { extensions 1 to 2; }
          enum Enu { ENU_UNSPECIFIED=0; }
          service Srv {}
          extend Msg { optional int32 ext = 1; }
        `,
          }),
        ),
      );
      const setB = createDescFileSet(
        FileDescriptorSet.fromBinary(
          await new UpstreamProtobuf().compileToDescriptorSet({
            "b.proto": `
          syntax="proto2";
          message Msg2 { extensions 1 to 2; }
          enum Enu2 { ENU_UNSPECIFIED=0; }
          service Srv2 {}
          extend Msg2 { optional int32 ext2 = 1; }
        `,
          }),
        ),
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
        FileDescriptorSet.fromBinary(
          await new UpstreamProtobuf().compileToDescriptorSet({
            "a.proto": `
          syntax="proto2";
          message MsgA {}
        `,
          }),
        ),
      );
      const setB = createDescFileSet(
        FileDescriptorSet.fromBinary(
          await new UpstreamProtobuf().compileToDescriptorSet({
            "a.proto": `
          syntax="proto2";
          message MsgB {}
        `,
          }),
        ),
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
