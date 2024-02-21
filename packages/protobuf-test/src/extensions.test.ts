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

import type { Extension, JsonValue } from "@bufbuild/protobuf";
import {
  BinaryReader,
  BinaryWriter,
  clearExtension,
  createRegistry,
  createRegistryFromDescriptors,
  FileDescriptorProto,
  getExtension,
  hasExtension,
  Message,
  proto2,
  protoInt64,
  ScalarType,
  setExtension,
  Struct,
  UInt32Value,
  WireType,
} from "@bufbuild/protobuf";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
  bytes_ext,
  bytes_ext_with_default,
  enum_ext,
  enum_ext_with_default,
  GroupExt,
  groupext,
  message_ext,
  message_ext_proto3,
  packed_uint32_ext,
  Proto2ExtContainer_Child_uint32_ext,
  Proto2ExtContainer_uint32_ext,
  Proto2Extendee,
  Proto2ExtEnum,
  Proto2ExtMessage,
  repeated_enum_ext,
  repeated_message_ext,
  repeated_string_ext,
  RepeatedGroupExt,
  repeatedgroupext,
  string_ext,
  string_ext_with_default,
  uint32_ext,
  uint32_ext_with_default,
  uint64_ext,
  uint64_ext_js_string,
  unpacked_uint32_ext,
  wrapper_ext,
} from "./gen/ts/extra/extensions-proto2_pb.js";
import { User } from "./gen/ts/extra/example_pb.js";
import { getTestFileDescriptorSetBytes } from "./helpers.js";

// test cases for extensions
type extensionWithValueCollection = ReadonlyArray<{
  ext: Extension<Proto2Extendee>;
  val: unknown;
}>;

const goldenValues: extensionWithValueCollection = [
  { ext: uint32_ext, val: 123 },
  { ext: uint32_ext_with_default, val: 456 },
  { ext: string_ext, val: "abc" },
  { ext: string_ext_with_default, val: "def" },
  { ext: uint64_ext, val: protoInt64.parse(777) },
  { ext: uint64_ext_js_string, val: "888" },
  { ext: bytes_ext, val: new Uint8Array([0xde, 0xad, 0xbe, 0xef]) },
  {
    ext: bytes_ext_with_default,
    val: new Uint8Array([0xef, 0xbe, 0xad, 0xde]),
  },
  { ext: enum_ext, val: Proto2ExtEnum.NO },
  { ext: enum_ext_with_default, val: Proto2ExtEnum.NO },
  { ext: message_ext, val: new Proto2ExtMessage({ stringField: "abc" }) },
  { ext: message_ext_proto3, val: new User({ firstName: "John" }) },
  {
    ext: repeated_message_ext,
    val: [new Proto2ExtMessage({ stringField: "abc" })],
  },
  { ext: repeated_enum_ext, val: [Proto2ExtEnum.YES, Proto2ExtEnum.NO] },
  { ext: repeated_string_ext, val: ["a", "b", "c"] },
  { ext: packed_uint32_ext, val: [1, 2, 3] },
  { ext: unpacked_uint32_ext, val: [4, 5, 6] },
  { ext: wrapper_ext, val: 123 },
  { ext: groupext, val: new GroupExt({ a: 123 }) },
  {
    ext: repeatedgroupext,
    val: [new RepeatedGroupExt({ a: 123 }), new RepeatedGroupExt({ a: 456 })],
  },
  { ext: Proto2ExtContainer_uint32_ext, val: 1234 },
  { ext: Proto2ExtContainer_Child_uint32_ext, val: 12345 },
];

const goldenValuesZero: extensionWithValueCollection = [
  { ext: uint32_ext, val: 0 },
  { ext: uint32_ext_with_default, val: 0 },
  { ext: string_ext, val: "" },
  { ext: string_ext_with_default, val: "" },
  { ext: uint64_ext, val: protoInt64.parse(0) },
  { ext: uint64_ext_js_string, val: "0" },
  { ext: bytes_ext, val: new Uint8Array([]) },
  { ext: bytes_ext_with_default, val: new Uint8Array([]) },
  { ext: enum_ext, val: Proto2ExtEnum.YES },
  { ext: enum_ext_with_default, val: Proto2ExtEnum.YES },
  { ext: message_ext, val: new Proto2ExtMessage() },
  { ext: message_ext_proto3, val: new User() },
  { ext: repeated_message_ext, val: [] },
  { ext: repeated_enum_ext, val: [] },
  { ext: repeated_string_ext, val: [] },
  { ext: packed_uint32_ext, val: [] },
  { ext: unpacked_uint32_ext, val: [] },
  { ext: wrapper_ext, val: 0 },
  { ext: groupext, val: new GroupExt() },
  { ext: repeatedgroupext, val: [] },
  { ext: Proto2ExtContainer_uint32_ext, val: 0 },
  { ext: Proto2ExtContainer_Child_uint32_ext, val: 0 },
];

describe("proto2.makeExtension()", () => {
  it("should derive names from typeName", () => {
    const ext = proto2.makeExtension<Proto2Extendee, string>(
      "foo.bar.ext_foo",
      Proto2Extendee,
      () => ({
        no: 1001,
        kind: "scalar",
        T: ScalarType.STRING,
        opt: true,
      }),
    );
    expect(ext.typeName).toBe("foo.bar.ext_foo");
    expect(ext.field.name).toBe("ext_foo");
    expect(ext.field.localName).toBe("extFoo");
    expect(ext.field.jsonName).toBe("[foo.bar.ext_foo]");
  });
  it("should initialize lazily to avoid hoisting issues", () => {
    const ext = proto2.makeExtension<Proto2Extendee, Struct>(
      "ext",
      Proto2Extendee,
      () => ({
        no: 1001,
        kind: "message",
        T: Str,
        opt: true,
      }),
    );
    const Str = proto2.makeMessageType<Struct>(
      Struct.typeName,
      Struct.fields.list(),
    );
    const m = new Proto2Extendee();
    expect(hasExtension(m, ext)).toBeFalsy();
    expect(getExtension(m, ext)).toBeDefined();
  });
  it("should use proto2 field info normalization", () => {
    const ext = proto2.makeExtension<Proto2Extendee, string>(
      "foo.bar.ext_foo",
      Proto2Extendee,
      () => ({
        no: 1001,
        kind: "scalar",
        T: ScalarType.UINT32,
        repeated: true,
      }),
    );
    expect(ext.field.packed).toBe(false);
  });
});

describe("getExtension()", () => {
  it("should throw error if extendee does not match", () => {
    const msg = new User();
    expect(() =>
      getExtension(msg as unknown as Proto2Extendee, uint32_ext),
    ).toThrow(
      /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    );
  });
  describe("for scalar", () => {
    it("should parse from unknown fields", () => {
      const msg = new Proto2Extendee();
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          uint32_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(123).finish(),
        );
      expect(getExtension(msg, uint32_ext)).toBe(123);
    });
    it("should parse last value from unknown fields", () => {
      const msg = new Proto2Extendee();
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          uint32_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(123).finish(),
        );
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          uint32_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(456).finish(),
        );
      expect(getExtension(msg, uint32_ext)).toBe(456);
    });
    it("should return zero value if unset", () => {
      expect(getExtension(new Proto2Extendee(), string_ext)).toBe("");
      expect(getExtension(new Proto2Extendee(), uint32_ext)).toBe(0);
    });
    it("should return default value if unset", () => {
      expect(getExtension(new Proto2Extendee(), string_ext_with_default)).toBe(
        `hello " */ `,
      );
      expect(getExtension(new Proto2Extendee(), uint32_ext_with_default)).toBe(
        999,
      );
    });
  });
  describe("for repeated scalar", () => {
    it("should parse from unpacked unknown fields", () => {
      const msg = new Proto2Extendee();
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          unpacked_uint32_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(123).finish(),
        );
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          unpacked_uint32_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(456).finish(),
        );
      expect(getExtension(msg, unpacked_uint32_ext)).toStrictEqual([123, 456]);
    });
    it("should parse from packed unknown field", () => {
      const msg = new Proto2Extendee();
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          packed_uint32_ext.field.no,
          WireType.LengthDelimited,
          new BinaryWriter().fork().uint32(123).uint32(456).join().finish(),
        );
      expect(getExtension(msg, packed_uint32_ext)).toStrictEqual([123, 456]);
    });
    it("should parse from string unknown fields", () => {
      const msg = new Proto2Extendee();
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          repeated_string_ext.field.no,
          WireType.LengthDelimited,
          new BinaryWriter().string("a").finish(),
        );
      msg
        .getType()
        .runtime.bin.onUnknownField(
          msg,
          repeated_string_ext.field.no,
          WireType.LengthDelimited,
          new BinaryWriter().string("b").finish(),
        );
      expect(getExtension(msg, repeated_string_ext)).toStrictEqual(["a", "b"]);
    });
    it("should return zero value if unset", () => {
      expect(
        getExtension(new Proto2Extendee(), unpacked_uint32_ext),
      ).toStrictEqual([]);
    });
  });
  describe("for enum", () => {
    it("should parse from unknown fields", () => {
      const message = new Proto2Extendee();
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          enum_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(Proto2ExtEnum.NO).finish(),
        );
      expect(getExtension(message, enum_ext)).toBe(Proto2ExtEnum.NO);
    });
    it("should parse last value from unknown fields", () => {
      const message = new Proto2Extendee();
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          enum_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(Proto2ExtEnum.YES).finish(),
        );
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          enum_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(Proto2ExtEnum.NO).finish(),
        );
      expect(getExtension(message, enum_ext)).toBe(Proto2ExtEnum.NO);
    });
    it("should return zero value if unset", () => {
      expect(getExtension(new Proto2Extendee(), enum_ext)).toBe(
        Proto2ExtEnum.YES,
      );
    });
    it("should return default value if unset", () => {
      expect(getExtension(new Proto2Extendee(), enum_ext_with_default)).toBe(
        Proto2ExtEnum.NO,
      );
    });
  });
  describe("for repeated enum", () => {
    it("should parse from unknown fields", () => {
      const message = new Proto2Extendee();
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          repeated_enum_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(1).finish(),
        );
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          repeated_enum_ext.field.no,
          WireType.Varint,
          new BinaryWriter().uint32(2).finish(),
        );
      expect(getExtension(message, repeated_enum_ext)).toStrictEqual([1, 2]);
    });
    it("should parse from packed unknown field", () => {
      const message = new Proto2Extendee();
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          repeated_enum_ext.field.no,
          WireType.LengthDelimited,
          new BinaryWriter().fork().uint32(1).uint32(2).join().finish(),
        );
      expect(getExtension(message, repeated_enum_ext)).toStrictEqual([1, 2]);
    });
    it("should return zero value if unset", () => {
      expect(
        getExtension(new Proto2Extendee(), repeated_enum_ext),
      ).toStrictEqual([]);
    });
  });
  describe("for message", () => {
    function addUnknownMessageField(
      message: Proto2Extendee,
      fieldNo: number,
      field: Message,
    ) {
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          fieldNo,
          WireType.LengthDelimited,
          field
            .getType()
            .runtime.bin.makeWriteOptions()
            .writerFactory()
            .bytes(field.toBinary())
            .finish(),
        );
    }

    it("should return value parsed from unknown fields", () => {
      const msg = new Proto2Extendee();
      addUnknownMessageField(
        msg,
        message_ext_proto3.field.no,
        new User({
          firstName: "John",
        }),
      );
      const value = getExtension(msg, message_ext_proto3);
      expect(value).toBeInstanceOf(User);
      expect(value.firstName).toBe("John");
    });
    it("should return merged value parsed from multiple unknown fields", () => {
      const msg = new Proto2Extendee();
      addUnknownMessageField(
        msg,
        message_ext_proto3.field.no,
        new User({
          firstName: "John",
        }),
      );
      addUnknownMessageField(
        msg,
        message_ext_proto3.field.no,
        new User({
          lastName: "Doe",
        }),
      );
      const value = getExtension(msg, message_ext_proto3);
      expect(value).toBeInstanceOf(User);
      expect(value.firstName).toBe("John");
      expect(value.lastName).toBe("Doe");
    });
    it("should return empty proto3 message if unset", () => {
      const msg = new Proto2Extendee();
      const value = getExtension(msg, message_ext_proto3);
      expect(value).toBeInstanceOf(User);
      expect(new User().equals(value)).toBeTruthy();
    });
    it("should return empty proto2 message if unset", () => {
      const msg = new Proto2Extendee();
      const value = getExtension(msg, message_ext);
      expect(value).toBeInstanceOf(Proto2ExtMessage);
      expect(new Proto2ExtMessage().equals(value)).toBeTruthy();
    });
    describe("with WKT wrapper", () => {
      it("should return unwrapped default value if unset", () => {
        const msg = new Proto2Extendee();
        const value = getExtension(msg, wrapper_ext);
        expect(value).toBe(0);
      });
      it("should return unwrapped value if set", () => {
        const msg = new Proto2Extendee();
        addUnknownMessageField(
          msg,
          wrapper_ext.field.no,
          new UInt32Value({
            value: 123,
          }),
        );
        const value = getExtension(msg, wrapper_ext);
        expect(typeof value).toBe("number");
        expect(value).toBe(123);
      });
    });
  });
  describe("for repeated message", () => {
    function addUnknownMessageField(
      message: Proto2Extendee,
      fieldNo: number,
      field: Message,
    ) {
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          fieldNo,
          WireType.LengthDelimited,
          field
            .getType()
            .runtime.bin.makeWriteOptions()
            .writerFactory()
            .bytes(field.toBinary())
            .finish(),
        );
    }

    it("should parse from unknown fields", () => {
      const msg = new Proto2Extendee();
      addUnknownMessageField(
        msg,
        repeated_message_ext.field.no,
        new Proto2ExtMessage({
          stringField: "a",
        }),
      );
      addUnknownMessageField(
        msg,
        repeated_message_ext.field.no,
        new Proto2ExtMessage({
          stringField: "b",
        }),
      );
      const arr = getExtension(msg, repeated_message_ext);
      expect(arr.length).toBe(2);
      expect(arr[0].stringField).toBe("a");
      expect(arr[1].stringField).toBe("b");
    });
    it("should return zero value if unset", () => {
      const msg = new Proto2Extendee();
      expect(getExtension(msg, repeated_message_ext)).toStrictEqual([]);
    });
  });
  describe("for group", () => {
    function addUnknownGroupField(
      message: Proto2Extendee,
      fieldNo: number,
      value: Message,
    ) {
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          fieldNo,
          WireType.StartGroup,
          value
            .getType()
            .runtime.bin.makeWriteOptions()
            .writerFactory()
            .raw(value.toBinary())
            .tag(fieldNo, WireType.EndGroup)
            .finish(),
        );
    }

    it("should return value parsed from unknown fields", () => {
      const msg = new Proto2Extendee();
      addUnknownGroupField(
        msg,
        groupext.field.no,
        new GroupExt({
          a: 123,
        }),
      );
      const value = getExtension(msg, groupext);
      expect(value).toBeInstanceOf(GroupExt);
      expect(value.a).toBe(123);
    });
    it("should return merged value parsed from multiple unknown fields", () => {
      const msg = new Proto2Extendee();
      addUnknownGroupField(
        msg,
        groupext.field.no,
        new GroupExt({
          a: 123,
        }),
      );
      addUnknownGroupField(
        msg,
        groupext.field.no,
        new GroupExt({
          b: 456,
        }),
      );
      const value = getExtension(msg, groupext);
      expect(value).toBeInstanceOf(GroupExt);
      expect(value.a).toBe(123);
      expect(value.b).toBe(456);
    });
    it("should return empty group if unset", () => {
      const msg = new Proto2Extendee();
      const value = getExtension(msg, groupext);
      expect(value).toBeInstanceOf(GroupExt);
      expect(new GroupExt().equals(value)).toBeTruthy();
    });
  });
  describe("for repeated group", () => {
    function addUnknownGroupField(
      message: Proto2Extendee,
      fieldNo: number,
      value: Message,
    ) {
      message
        .getType()
        .runtime.bin.onUnknownField(
          message,
          fieldNo,
          WireType.StartGroup,
          value
            .getType()
            .runtime.bin.makeWriteOptions()
            .writerFactory()
            .raw(value.toBinary())
            .tag(fieldNo, WireType.EndGroup)
            .finish(),
        );
    }

    it("should parse from unknown fields", () => {
      const msg = new Proto2Extendee();
      addUnknownGroupField(
        msg,
        repeatedgroupext.field.no,
        new RepeatedGroupExt({
          a: 123,
        }),
      );
      addUnknownGroupField(
        msg,
        repeatedgroupext.field.no,
        new RepeatedGroupExt({
          a: 456,
        }),
      );
      const arr = getExtension(msg, repeatedgroupext);
      expect(arr.length).toBe(2);
      expect(arr[0].a).toBe(123);
      expect(arr[1].a).toBe(456);
    });
    it("should return zero value if unset", () => {
      const msg = new Proto2Extendee();
      expect(getExtension(msg, repeatedgroupext)).toStrictEqual([]);
    });
  });
});

describe("hasExtension()", () => {
  let msg: Proto2Extendee;
  let ext: Extension<Proto2Extendee>;
  beforeEach(() => {
    msg = new Proto2Extendee();
    Proto2Extendee.runtime.bin.onUnknownField(
      msg,
      1001,
      WireType.Varint,
      new Uint8Array(),
    );
    ext = proto2.makeExtension("foo.bar.ext_foo", Proto2Extendee, () => ({
      no: 1001,
      kind: "scalar",
      T: ScalarType.UINT32,
      opt: true,
    }));
  });
  it("should return true if extendee and field number match", () => {
    expect(hasExtension(msg, ext)).toBeTruthy();
  });
  it("should return false if field number does not match", () => {
    (ext.field as unknown as { no: number }).no = ext.field.no + 1;
    expect(hasExtension(msg, ext)).toBeFalsy();
  });
  it("should return false if extendee does not match", () => {
    (ext as unknown as { extendee: unknown }).extendee = FileDescriptorProto;
    expect(hasExtension(msg, ext)).toBeFalsy();
  });
  it("does not honor extension range", () => {
    const extensionNumberOutOfRange = 77; // extensions-proto2.proto: 1000 to 9999
    (ext.field as unknown as { no: number }).no = extensionNumberOutOfRange;
    msg.getType().runtime.bin.discardUnknownFields(msg);
    msg
      .getType()
      .runtime.bin.onUnknownField(
        msg,
        extensionNumberOutOfRange,
        WireType.Varint,
        new Uint8Array(),
      );
    expect(hasExtension(msg, ext)).toBeTruthy();
  });
});

describe("clearExtension()", () => {
  const listUnknownFieldNumbers = (message: Message) =>
    message
      .getType()
      .runtime.bin.listUnknownFields(message)
      .map((uf) => uf.no);
  let msg: Proto2Extendee;
  beforeEach(() => {
    msg = new Proto2Extendee();
    for (const no of [500, 1001, 1001, 1500]) {
      Proto2Extendee.runtime.bin.onUnknownField(
        msg,
        no,
        WireType.Varint,
        new Uint8Array(),
      );
    }
  });
  it("should clear unknown fields with extension number and leave others untouched", () => {
    expect(listUnknownFieldNumbers(msg)).toStrictEqual([500, 1001, 1001, 1500]);
    clearExtension(msg, uint32_ext);
    expect(listUnknownFieldNumbers(msg)).toStrictEqual([500, 1500]);
    clearExtension(msg, uint32_ext);
    expect(listUnknownFieldNumbers(msg)).toStrictEqual([500, 1500]);
  });
  it("should throw error if extendee does not match", () => {
    const msg = new User();
    expect(() =>
      clearExtension(msg as unknown as Proto2Extendee, uint32_ext),
    ).toThrow(
      /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    );
  });
});

describe("setExtension()", () => {
  it("should throw error if extendee does not match", () => {
    const msg = new User();
    expect(() =>
      setExtension(msg as unknown as Proto2Extendee, uint32_ext, 123),
    ).toThrow(
      /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    );
  });
  it.each(goldenValues)(
    "should set $ext.typeName as expected",
    ({ ext, val }) => {
      const msg = new Proto2Extendee();
      expect(hasExtension(msg, ext)).toBeFalsy();
      setExtension(msg, ext, val);
      expect(hasExtension(msg, ext)).toBeTruthy();
      expect(getExtension(msg, ext)).toStrictEqual(val);
    },
  );
  it.each(goldenValuesZero)(
    "should set zero $ext.typeName as expected",
    ({ ext, val }) => {
      const msg = new Proto2Extendee();
      expect(hasExtension(msg, ext)).toBeFalsy();
      setExtension(msg, ext, val);
      if (ext.field.repeated) {
        expect(hasExtension(msg, ext)).toBeFalsy();
      } else {
        expect(hasExtension(msg, ext)).toBeTruthy();
      }
      expect(getExtension(msg, ext)).toStrictEqual(val);
    },
  );
  describe("setting repeated extension twice", () => {
    it("should not merge", () => {
      const msg = new Proto2Extendee();
      setExtension(msg, repeated_string_ext, ["a"]);
      setExtension(msg, repeated_string_ext, ["b"]);
      expect(getExtension(msg, repeated_string_ext)).toStrictEqual(["b"]);
    });
  });
});

describe("binary options for extensions with JSON", () => {
  it("should pick up binary reader/writer factory from JSON options when parsing extensions from JSON", () => {
    const jsonInput: JsonValue = {
      "[proto2ext.string_ext]": "abc",
    };
    const options = {
      typeRegistry: createRegistry(string_ext),
      readerFactory: (bytes: Uint8Array) => new BinaryReader(bytes),
      writerFactory: () => new BinaryWriter(),
    };
    const readerFactorySpy = jest.spyOn(options, "readerFactory");
    const writerFactorySpy = jest.spyOn(options, "writerFactory");
    const msg = Proto2Extendee.fromJson(jsonInput, options);
    expect(readerFactorySpy).toHaveBeenCalled();
    expect(writerFactorySpy).toHaveBeenCalled();
    expect(hasExtension(msg, string_ext)).toBeTruthy();
  });
  it("should pick up binary reader factory from JSON options when serializing extensions to JSON", () => {
    const msg = new Proto2Extendee();
    setExtension(msg, string_ext, "abc");
    const options = {
      typeRegistry: createRegistry(string_ext),
      readerFactory: (bytes: Uint8Array) => new BinaryReader(bytes),
      writerFactory: () => new BinaryWriter(),
    };
    const readerFactorySpy = jest.spyOn(options, "readerFactory");
    const writerFactorySpy = jest.spyOn(options, "writerFactory");
    const jsonOutput = msg.toJson(options);
    expect(readerFactorySpy).toHaveBeenCalled();
    expect(writerFactorySpy).not.toHaveBeenCalled();
    expect(jsonOutput).toStrictEqual({
      "[proto2ext.string_ext]": "abc",
    });
  });
});

describe("extensions with JSON", () => {
  describe("parsing with a type registry", () => {
    it("should look up the extension in the registry", () => {
      const typeRegistry = createRegistry(string_ext);
      const findExtension = jest.spyOn(typeRegistry, "findExtension");
      const findExtensionFor = jest.spyOn(typeRegistry, "findExtensionFor");
      const jsonInput: JsonValue = {
        "[proto2ext.string_ext]": "abc",
      };
      const msg = Proto2Extendee.fromJson(jsonInput, { typeRegistry });
      expect(findExtensionFor).not.toBeCalled();
      expect(findExtension).toBeCalledTimes(1);
      expect(findExtension).toBeCalledWith(string_ext.typeName);
      expect(hasExtension(msg, string_ext)).toBeTruthy();
    });
    it("should error if the extension is not in the registry", () => {
      const typeRegistry = createRegistry();
      const jsonInput: JsonValue = {
        "[proto2ext.string_ext]": "abc",
      };
      expect(() => {
        Proto2Extendee.fromJson(jsonInput, { typeRegistry });
      }).toThrowError(
        /^cannot decode message proto2ext.Proto2Extendee from JSON: key "\[proto2ext.string_ext]" is unknown$/,
      );
    });
    it("should not error if the extension is not in the registry and ignoreUnknownFields: true", () => {
      const typeRegistry = createRegistry();
      const jsonInput: JsonValue = {
        "[proto2ext.string_ext]": "abc",
      };
      const msg = Proto2Extendee.fromJson(jsonInput, {
        typeRegistry,
        ignoreUnknownFields: true,
      });
      expect(hasExtension(msg, string_ext)).toBeFalsy();
    });
    it("should error if the extension is for a different extendee", () => {
      const typeRegistry = createRegistry(string_ext);
      const jsonInput: JsonValue = {
        "[proto2ext.string_ext]": "abc",
      };
      expect(() => {
        User.fromJson(jsonInput, { typeRegistry });
      }).toThrowError(
        /^cannot decode message docs.User from JSON: key "\[proto2ext.string_ext]" is unknown$/,
      );
    });
  });

  const goldenJson = {
    "[proto2ext.uint32_ext]": 123,
    "[proto2ext.uint32_ext_with_default]": 456,
    "[proto2ext.string_ext]": "abc",
    "[proto2ext.string_ext_with_default]": "def",
    "[proto2ext.uint64_ext]": "777",
    "[proto2ext.uint64_ext_js_string]": "888",
    "[proto2ext.bytes_ext]": "3q2+7w==",
    "[proto2ext.bytes_ext_with_default]": "776t3g==",
    "[proto2ext.enum_ext]": "PROTO2_EXT_ENUM_NO",
    "[proto2ext.enum_ext_with_default]": "PROTO2_EXT_ENUM_NO",
    "[proto2ext.message_ext]": {
      stringField: "abc",
    },
    "[proto2ext.message_ext_proto3]": {
      firstName: "John",
    },
    "[proto2ext.repeated_message_ext]": [
      {
        stringField: "abc",
      },
    ],
    "[proto2ext.repeated_enum_ext]": [
      "PROTO2_EXT_ENUM_YES",
      "PROTO2_EXT_ENUM_NO",
    ],
    "[proto2ext.packed_uint32_ext]": [1, 2, 3],
    "[proto2ext.repeated_string_ext]": ["a", "b", "c"],
    "[proto2ext.unpacked_uint32_ext]": [4, 5, 6],
    "[proto2ext.wrapper_ext]": 123,
    "[proto2ext.groupext]": { a: 123 },
    "[proto2ext.repeatedgroupext]": [{ a: 123 }, { a: 456 }],
    "[proto2ext.Proto2ExtContainer.uint32_ext]": 1234,
    "[proto2ext.Proto2ExtContainer.Child.uint32_ext]": 12345,
  };
  const goldenJsonZero = {
    "[proto2ext.uint32_ext]": 0,
    "[proto2ext.uint32_ext_with_default]": 0,
    "[proto2ext.string_ext]": "",
    "[proto2ext.string_ext_with_default]": "",
    "[proto2ext.uint64_ext]": "0",
    "[proto2ext.uint64_ext_js_string]": "0",
    "[proto2ext.bytes_ext]": "",
    "[proto2ext.bytes_ext_with_default]": "",
    "[proto2ext.enum_ext]": "PROTO2_EXT_ENUM_YES",
    "[proto2ext.enum_ext_with_default]": "PROTO2_EXT_ENUM_YES",
    "[proto2ext.message_ext]": {},
    "[proto2ext.message_ext_proto3]": {},
    "[proto2ext.wrapper_ext]": 0,
    "[proto2ext.groupext]": {},
    "[proto2ext.Proto2ExtContainer.uint32_ext]": 0,
    "[proto2ext.Proto2ExtContainer.Child.uint32_ext]": 0,
  };

  describe.each([
    {
      typeRegistry: createRegistryFromDescriptors(
        getTestFileDescriptorSetBytes(),
      ),
      name: "with a registry from descriptors",
    },
    {
      typeRegistry: createRegistry(...goldenValues.map(({ ext }) => ext)),
      reg: "with a registry from generated code",
    },
  ])("$name", ({ typeRegistry }) => {
    it.each(goldenValues)(
      "should parse $ext.typeName as expected",
      ({ ext, val }) => {
        const msg = Proto2Extendee.fromJson(goldenJson, { typeRegistry });
        expect(hasExtension(msg, ext)).toBeTruthy();
        expect(getExtension(msg, ext)).toStrictEqual(val);
      },
    );
    it.each(goldenValuesZero)(
      "should parse zero $ext.typeName as expected",
      ({ ext, val }) => {
        const msg = Proto2Extendee.fromJson(goldenJsonZero, { typeRegistry });
        if (ext.field.repeated) {
          expect(hasExtension(msg, ext)).toBeFalsy();
        } else {
          expect(hasExtension(msg, ext)).toBeTruthy();
        }
        expect(getExtension(msg, ext)).toStrictEqual(val);
      },
    );
    it("should serialize as expected", () => {
      const msg = new Proto2Extendee();
      for (const { ext, val } of goldenValues) {
        setExtension(msg, ext, val);
      }
      expect(msg.toJson({ typeRegistry })).toStrictEqual(goldenJson);
    });
    it("should serialize zero values as expected", () => {
      const msg = new Proto2Extendee();
      for (const { ext, val } of goldenValuesZero) {
        setExtension(msg, ext, val);
      }
      expect(msg.toJson({ typeRegistry })).toStrictEqual(goldenJsonZero);
    });
  });
});
