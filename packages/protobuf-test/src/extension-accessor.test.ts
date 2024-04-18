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

import {
  create,
  getExtension,
  toBinary,
  isMessage,
  equals,
  hasExtension,
  clearExtension,
} from "@bufbuild/protobuf";
import type { Message } from "@bufbuild/protobuf";
import { describe, expect, it, beforeEach } from "@jest/globals";
import { UserDesc } from "./gen/ts/extra/example_pb.js";
import type { Proto2Extendee } from "./gen/ts/extra/extensions-proto2_pb.js";
import {
  GroupExtDesc,
  Proto2ExtContainer_Child_uint32_ext,
  Proto2ExtContainer_uint32_ext,
  Proto2ExtEnum,
  Proto2ExtMessageDesc,
  Proto2ExtendeeDesc,
  RepeatedGroupExtDesc,
  bytes_ext,
  bytes_ext_with_default,
  enum_ext,
  enum_ext_with_default,
  groupext,
  message_ext,
  message_ext_proto3,
  packed_uint32_ext,
  repeated_enum_ext,
  repeated_message_ext,
  repeated_string_ext,
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
import { BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import type { DescExtension, DescMessage } from "@bufbuild/protobuf";
import { UInt32ValueDesc, FileOptionsDesc } from "@bufbuild/protobuf/wkt";
import { setExtension } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";
import {
  optional_uint32_ext as proto3_optional_uint32_ext,
  packed_uint32_ext as proto3_packed_uint32_ext,
  uint32_ext as proto3_uint32_ext,
  unpacked_uint32_ext as proto3_unpacked_uint32_ext,
} from "./gen/ts/extra/extensions-proto3_pb.js";

// test cases for extensions
type extensionWithValueCollection = ReadonlyArray<{
  ext: DescExtension;
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
  {
    ext: message_ext,
    val: create(Proto2ExtMessageDesc, { stringField: "abc" }),
  },
  { ext: message_ext_proto3, val: create(UserDesc, { firstName: "John" }) },
  {
    ext: repeated_message_ext,
    val: [create(Proto2ExtMessageDesc, { stringField: "abc" })],
  },
  { ext: repeated_enum_ext, val: [Proto2ExtEnum.YES, Proto2ExtEnum.NO] },
  { ext: repeated_string_ext, val: ["a", "b", "c"] },
  { ext: packed_uint32_ext, val: [1, 2, 3] },
  { ext: unpacked_uint32_ext, val: [4, 5, 6] },
  { ext: wrapper_ext, val: 123 },
  { ext: groupext, val: create(GroupExtDesc, { a: 123 }) },
  {
    ext: repeatedgroupext,
    val: [
      create(RepeatedGroupExtDesc, { a: 123 }),
      create(RepeatedGroupExtDesc, { a: 456 }),
    ],
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
  { ext: message_ext, val: create(Proto2ExtMessageDesc) },
  { ext: message_ext_proto3, val: create(UserDesc) },
  { ext: repeated_message_ext, val: [] },
  { ext: repeated_enum_ext, val: [] },
  { ext: repeated_string_ext, val: [] },
  { ext: packed_uint32_ext, val: [] },
  { ext: unpacked_uint32_ext, val: [] },
  { ext: wrapper_ext, val: 0 },
  { ext: groupext, val: create(GroupExtDesc) },
  { ext: repeatedgroupext, val: [] },
  { ext: Proto2ExtContainer_uint32_ext, val: 0 },
  { ext: Proto2ExtContainer_Child_uint32_ext, val: 0 },
];

describe("getExtension()", () => {
  it("should throw error if extendee does not match", () => {
    const msg = create(UserDesc);
    expect(() =>
      getExtension(msg as unknown as Proto2Extendee, uint32_ext),
    ).toThrow(
      /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    );
  });
  describe("for scalar", () => {
    it("should parse from unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      msg.$unknown = [
        {
          no: uint32_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(123).finish(),
        },
      ];
      expect(getExtension(msg, uint32_ext)).toBe(123);
    });
    it("should parse last value from unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      msg.$unknown = [
        {
          no: uint32_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(123).finish(),
        },
        {
          no: uint32_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(456).finish(),
        },
      ];
      expect(getExtension(msg, uint32_ext)).toBe(456);
    });
    it("should return zero value if unset", () => {
      expect(getExtension(create(Proto2ExtendeeDesc), string_ext)).toBe("");
      expect(getExtension(create(Proto2ExtendeeDesc), uint32_ext)).toBe(0);
    });
    it("should return default value if unset", () => {
      expect(
        getExtension(create(Proto2ExtendeeDesc), string_ext_with_default),
      ).toBe(`hello " */ `);
      expect(
        getExtension(create(Proto2ExtendeeDesc), uint32_ext_with_default),
      ).toBe(999);
    });
  });
  describe("for repeated scalar", () => {
    it("should parse from unpacked unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      msg.$unknown = [
        {
          no: unpacked_uint32_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(123).finish(),
        },
        {
          no: unpacked_uint32_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(456).finish(),
        },
      ];
      expect(getExtension(msg, unpacked_uint32_ext)).toStrictEqual([123, 456]);
    });
    it("should parse from packed unknown field", () => {
      const msg = create(Proto2ExtendeeDesc);
      msg.$unknown = [
        {
          no: packed_uint32_ext.number,
          wireType: WireType.LengthDelimited,
          data: new BinaryWriter()
            .fork()
            .uint32(123)
            .uint32(456)
            .join()
            .finish(),
        },
      ];
      expect(getExtension(msg, packed_uint32_ext)).toStrictEqual([123, 456]);
    });
    it("should parse from string unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      msg.$unknown = [
        {
          no: repeated_string_ext.number,
          wireType: WireType.LengthDelimited,
          data: new BinaryWriter().string("a").finish(),
        },
        {
          no: repeated_string_ext.number,
          wireType: WireType.LengthDelimited,
          data: new BinaryWriter().string("b").finish(),
        },
      ];
      expect(getExtension(msg, repeated_string_ext)).toStrictEqual(["a", "b"]);
    });
    it("should return zero value if unset", () => {
      expect(
        getExtension(create(Proto2ExtendeeDesc), unpacked_uint32_ext),
      ).toStrictEqual([]);
    });
  });
  describe("for enum", () => {
    it("should parse from unknown fields", () => {
      const message = create(Proto2ExtendeeDesc);
      message.$unknown = [
        {
          no: enum_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(Proto2ExtEnum.NO).finish(),
        },
      ];
      expect(getExtension(message, enum_ext)).toBe(Proto2ExtEnum.NO);
    });
    it("should parse last value from unknown fields", () => {
      const message = create(Proto2ExtendeeDesc);
      message.$unknown = [
        {
          no: enum_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(Proto2ExtEnum.YES).finish(),
        },
        {
          no: enum_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(Proto2ExtEnum.NO).finish(),
        },
      ];
      expect(getExtension(message, enum_ext)).toBe(Proto2ExtEnum.NO);
    });
    it("should return zero value if unset", () => {
      expect(getExtension(create(Proto2ExtendeeDesc), enum_ext)).toBe(
        Proto2ExtEnum.YES,
      );
    });
    it("should return default value if unset", () => {
      expect(
        getExtension(create(Proto2ExtendeeDesc), enum_ext_with_default),
      ).toBe(Proto2ExtEnum.NO);
    });
  });
  describe("for repeated enum", () => {
    it("should parse from unknown fields", () => {
      const message = create(Proto2ExtendeeDesc);
      message.$unknown = [
        {
          no: repeated_enum_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(1).finish(),
        },
        {
          no: repeated_enum_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(2).finish(),
        },
      ];
      expect(getExtension(message, repeated_enum_ext)).toStrictEqual([1, 2]);
    });
    it("should parse from packed unknown field", () => {
      const message = create(Proto2ExtendeeDesc);
      message.$unknown = [
        {
          no: repeated_enum_ext.number,
          wireType: WireType.LengthDelimited,
          data: new BinaryWriter().fork().uint32(1).uint32(2).join().finish(),
        },
      ];
      expect(getExtension(message, repeated_enum_ext)).toStrictEqual([1, 2]);
    });
    it("should return zero value if unset", () => {
      expect(
        getExtension(create(Proto2ExtendeeDesc), repeated_enum_ext),
      ).toStrictEqual([]);
    });
  });
  describe("for message", () => {
    function addUnknownMessageField(
      message: Proto2Extendee,
      fieldNo: number,
      fieldDesc: DescMessage,
      field: Message,
    ) {
      message.$unknown = [
        ...(message.$unknown ?? []),
        {
          no: fieldNo,
          wireType: WireType.LengthDelimited,
          data: new BinaryWriter().bytes(toBinary(fieldDesc, field)).finish(),
        },
      ];
    }

    it("should return value parsed from unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      addUnknownMessageField(
        msg,
        message_ext_proto3.number,
        UserDesc,
        create(UserDesc, {
          firstName: "John",
        }),
      );
      const value = getExtension(msg, message_ext_proto3);
      expect(isMessage(value, UserDesc)).toBeTruthy();
      expect(value.firstName).toBe("John");
    });
    it("should return merged value parsed from multiple unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      addUnknownMessageField(
        msg,
        message_ext_proto3.number,
        UserDesc,
        create(UserDesc, {
          firstName: "John",
        }),
      );
      addUnknownMessageField(
        msg,
        message_ext_proto3.number,
        UserDesc,
        create(UserDesc, {
          lastName: "Doe",
        }),
      );
      const value = getExtension(msg, message_ext_proto3);
      expect(isMessage(value, UserDesc)).toBeTruthy();
      expect(value.firstName).toBe("John");
      expect(value.lastName).toBe("Doe");
    });
    it("should return empty proto3 message if unset", () => {
      const msg = create(Proto2ExtendeeDesc);
      const value = getExtension(msg, message_ext_proto3);
      expect(isMessage(value, UserDesc)).toBeTruthy();
      expect(equals(UserDesc, value, create(UserDesc))).toBeTruthy();
    });
    it("should return empty proto2 message if unset", () => {
      const msg = create(Proto2ExtendeeDesc);
      const value = getExtension(msg, message_ext);
      expect(isMessage(value, Proto2ExtMessageDesc)).toBeTruthy();
      expect(
        equals(Proto2ExtMessageDesc, value, create(Proto2ExtMessageDesc)),
      ).toBeTruthy();
    });
    describe("with WKT wrapper", () => {
      it("should return unwrapped default value if unset", () => {
        const msg = create(Proto2ExtendeeDesc);
        const value = getExtension(msg, wrapper_ext);
        expect(value).toBe(0);
      });
      it("should return unwrapped value if set", () => {
        const msg = create(Proto2ExtendeeDesc);
        addUnknownMessageField(
          msg,
          wrapper_ext.number,
          UInt32ValueDesc,
          create(UInt32ValueDesc, {
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
      fieldDesc: DescMessage,
      field: Message,
    ) {
      message.$unknown = [
        ...(message.$unknown ?? []),
        {
          no: fieldNo,
          wireType: WireType.LengthDelimited,
          data: new BinaryWriter().bytes(toBinary(fieldDesc, field)).finish(),
        },
      ];
    }

    it("should parse from unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      addUnknownMessageField(
        msg,
        repeated_message_ext.number,
        Proto2ExtMessageDesc,
        create(Proto2ExtMessageDesc, {
          stringField: "a",
        }),
      );
      addUnknownMessageField(
        msg,
        repeated_message_ext.number,
        Proto2ExtMessageDesc,
        create(Proto2ExtMessageDesc, {
          stringField: "b",
        }),
      );
      const arr = getExtension(msg, repeated_message_ext);
      expect(arr.length).toBe(2);
      expect(arr[0].stringField).toBe("a");
      expect(arr[1].stringField).toBe("b");
    });
    it("should return zero value if unset", () => {
      const msg = create(Proto2ExtendeeDesc);
      expect(getExtension(msg, repeated_message_ext)).toStrictEqual([]);
    });
  });
  describe("for group", () => {
    function addUnknownGroupField(
      message: Proto2Extendee,
      fieldNo: number,
      desc: DescMessage,
      value: Message,
    ) {
      message.$unknown = [
        ...(message.$unknown ?? []),
        {
          no: fieldNo,
          wireType: WireType.StartGroup,
          data: new BinaryWriter()
            .raw(toBinary(desc, value))
            .tag(fieldNo, WireType.EndGroup)
            .finish(),
        },
      ];
    }

    it("should return value parsed from unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      addUnknownGroupField(
        msg,
        groupext.number,
        GroupExtDesc,
        create(GroupExtDesc, {
          a: 123,
        }),
      );
      const value = getExtension(msg, groupext);
      expect(isMessage(value, GroupExtDesc)).toBeTruthy();
      expect(value.a).toBe(123);
    });
    it("should return merged value parsed from multiple unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      addUnknownGroupField(
        msg,
        groupext.number,
        GroupExtDesc,
        create(GroupExtDesc, {
          a: 123,
        }),
      );
      addUnknownGroupField(
        msg,
        groupext.number,
        GroupExtDesc,
        create(GroupExtDesc, {
          b: 456,
        }),
      );
      const value = getExtension(msg, groupext);
      expect(isMessage(value, GroupExtDesc)).toBeTruthy();
      expect(value.a).toBe(123);
      expect(value.b).toBe(456);
    });
    it("should return empty group if unset", () => {
      const msg = create(Proto2ExtendeeDesc);
      const value = getExtension(msg, groupext);
      expect(isMessage(value, GroupExtDesc)).toBeTruthy();
      expect(equals(GroupExtDesc, value, create(GroupExtDesc))).toBeTruthy();
    });
  });
  describe("for repeated group", () => {
    function addUnknownGroupField(
      message: Proto2Extendee,
      fieldNo: number,
      desc: DescMessage,
      value: Message,
    ) {
      message.$unknown = [
        ...(message.$unknown ?? []),
        {
          no: fieldNo,
          wireType: WireType.StartGroup,
          data: new BinaryWriter()
            .raw(toBinary(desc, value))
            .tag(fieldNo, WireType.EndGroup)
            .finish(),
        },
      ];
    }

    it("should parse from unknown fields", () => {
      const msg = create(Proto2ExtendeeDesc);
      addUnknownGroupField(
        msg,
        repeatedgroupext.number,
        RepeatedGroupExtDesc,
        create(RepeatedGroupExtDesc, {
          a: 123,
        }),
      );
      addUnknownGroupField(
        msg,
        repeatedgroupext.number,
        RepeatedGroupExtDesc,
        create(RepeatedGroupExtDesc, {
          a: 456,
        }),
      );
      const arr = getExtension(msg, repeatedgroupext);
      expect(arr.length).toBe(2);
      expect(arr[0].a).toBe(123);
      expect(arr[1].a).toBe(456);
    });
    it("should return zero value if unset", () => {
      const msg = create(Proto2ExtendeeDesc);
      expect(getExtension(msg, repeatedgroupext)).toStrictEqual([]);
    });
  });
});

describe("hasExtension()", () => {
  let msg: Proto2Extendee;
  let ext: DescExtension;
  beforeEach(() => {
    msg = create(Proto2ExtendeeDesc);
    msg.$unknown = [
      {
        no: 1001,
        wireType: WireType.Varint,
        data: new Uint8Array(),
      },
    ];
    ext = { ...uint32_ext, number: 1001 };
  });
  it("should return true if extendee and field number match", () => {
    expect(hasExtension(msg, ext)).toBeTruthy();
  });
  it("should return false if field number does not match", () => {
    ext = { ...ext, number: ext.number + 1 };
    expect(hasExtension(msg, ext)).toBeFalsy();
  });
  it("should return false if extendee does not match", () => {
    ext = { ...ext, extendee: UserDesc };
    expect(hasExtension(msg, ext)).toBeFalsy();
  });
  it("does not honor extension range", () => {
    const extensionNumberOutOfRange = 77; // extensions-proto2.proto: 1000 to 9999
    ext = { ...ext, number: extensionNumberOutOfRange };
    msg.$unknown = [
      {
        no: extensionNumberOutOfRange,
        wireType: WireType.Varint,
        data: new Uint8Array(),
      },
    ];
    expect(hasExtension(msg, ext)).toBeTruthy();
  });
});

describe("clearExtension()", () => {
  const listUnknownFieldNumbers = (message: Message) =>
    (message.$unknown ?? []).map((uf) => uf.no);
  let msg: Proto2Extendee;
  beforeEach(() => {
    msg = create(Proto2ExtendeeDesc);
    msg.$unknown = [];
    for (const no of [500, 1001, 1001, 1500]) {
      msg.$unknown.push({
        no,
        wireType: WireType.Varint,
        data: new Uint8Array(),
      });
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
    const msg = create(UserDesc);
    expect(() =>
      clearExtension(msg as unknown as Proto2Extendee, uint32_ext),
    ).toThrow(
      /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    );
  });
});

describe("setExtension()", () => {
  it("should throw error if extendee does not match", () => {
    const msg = create(UserDesc);
    expect(() =>
      setExtension(msg as unknown as Proto2Extendee, uint32_ext, 123),
    ).toThrow(
      /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    );
  });
  it.each(goldenValues)(
    "should set $ext.typeName as expected",
    ({ ext, val }) => {
      const msg = create(Proto2ExtendeeDesc);
      expect(hasExtension(msg, ext)).toBeFalsy();
      setExtension(msg, ext, val);
      expect(hasExtension(msg, ext)).toBeTruthy();
      expect(getExtension(msg, ext)).toStrictEqual(val);
    },
  );
  it.each(goldenValuesZero)(
    "should set zero $ext.typeName as expected",
    ({ ext, val }) => {
      const msg = create(Proto2ExtendeeDesc);
      expect(hasExtension(msg, ext)).toBeFalsy();
      setExtension(msg, ext, val);
      if (ext.fieldKind === "list") {
        expect(hasExtension(msg, ext)).toBeFalsy();
      } else {
        expect(hasExtension(msg, ext)).toBeTruthy();
      }
      expect(getExtension(msg, ext)).toStrictEqual(val);
    },
  );
  describe("setting repeated extension twice", () => {
    it("should not merge", () => {
      const msg = create(Proto2ExtendeeDesc);
      setExtension(msg, repeated_string_ext, ["a"]);
      setExtension(msg, repeated_string_ext, ["b"]);
      expect(getExtension(msg, repeated_string_ext)).toStrictEqual(["b"]);
    });
  });
  describe("proto3", () => {
    describe("singular scalar", () => {
      const ext = proto3_uint32_ext;
      it("should set non-zero value as expected", () => {
        const msg = create(FileOptionsDesc);
        setExtension(msg, ext, 123);
        expect(hasExtension(msg, ext)).toBeTruthy();
        expect(getExtension(msg, ext)).toStrictEqual(123);
      });
      it("should set zero value, even without optional keyword", () => {
        // Implicit presence does not apply to extensions, see https://github.com/protocolbuffers/protobuf/issues/8234
        const msg = create(FileOptionsDesc);
        setExtension(msg, ext, 0);
        expect(hasExtension(msg, ext)).toBeTruthy();
        expect(getExtension(msg, ext)).toStrictEqual(0);
      });
    });
    describe("optional scalar", () => {
      const ext = proto3_optional_uint32_ext;
      it("should set non-zero value as expected", () => {
        const msg = create(FileOptionsDesc);
        setExtension(msg, ext, 123);
        expect(hasExtension(msg, ext)).toBeTruthy();
        expect(getExtension(msg, ext)).toStrictEqual(123);
      });
      it("should set zero value", () => {
        const msg = create(FileOptionsDesc);
        setExtension(msg, ext, 0);
        expect(hasExtension(msg, ext)).toBeTruthy();
        expect(getExtension(msg, ext)).toStrictEqual(0);
      });
    });
    describe("packed repeated extension", () => {
      it("should set expected unknown fields", () => {
        const msg = create(FileOptionsDesc);
        setExtension(msg, proto3_packed_uint32_ext, [1, 2, 3]);
        const unknownFields = (msg.$unknown ?? []).filter(
          (uf) => uf.no === packed_uint32_ext.number,
        );
        expect(unknownFields.length).toBe(1);
        const allLengthDelimited = unknownFields.every(
          (uf) => uf.wireType === WireType.LengthDelimited,
        );
        expect(allLengthDelimited).toBeTruthy();
      });
    });
    describe("unpacked repeated extension", () => {
      it("should set expected unknown fields", () => {
        const msg = create(FileOptionsDesc);
        setExtension(msg, proto3_unpacked_uint32_ext, [1, 2, 3]);
        const unknownFields = (msg.$unknown ?? []).filter(
          (uf) => uf.no === unpacked_uint32_ext.number,
        );
        expect(unknownFields.length).toBe(3);
        const noneLengthDelimited = unknownFields.every(
          (uf) => uf.wireType !== WireType.LengthDelimited,
        );
        expect(noneLengthDelimited).toBeTruthy();
      });
    });
  });
});
