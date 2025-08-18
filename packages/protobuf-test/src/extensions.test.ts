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

import { suite, test, beforeEach } from "node:test";
import * as assert from "node:assert";
import {
  create,
  getExtension,
  toBinary,
  isMessage,
  equals,
  hasExtension,
  clearExtension,
  type Message,
  protoInt64,
  setExtension,
  type DescExtension,
  type DescMessage,
} from "@bufbuild/protobuf";
import { UserSchema } from "./gen/ts/extra/example_pb.js";
import type { Proto2Extendee } from "./gen/ts/extra/extensions-proto2_pb.js";
import {
  GroupExtSchema,
  Proto2ExtContainer_Child_uint32_ext,
  Proto2ExtContainer_uint32_ext,
  Proto2ExtEnum,
  Proto2ExtMessageSchema,
  Proto2ExtendeeSchema,
  RepeatedGroupExtSchema,
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
  repeated_uint64_ext_js_string,
  repeatedgroupext,
  string_ext,
  string_ext_with_default,
  uint32_ext,
  uint32_ext_with_default,
  uint64_ext,
  uint64_ext_js_string,
  unpacked_uint32_ext,
  wrapper_ext,
  struct_ext,
  repeated_struct_ext,
} from "./gen/ts/extra/extensions-proto2_pb.js";
import { BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import { UInt32ValueSchema, FileOptionsSchema } from "@bufbuild/protobuf/wkt";
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
    val: create(Proto2ExtMessageSchema, { stringField: "abc" }),
  },
  { ext: message_ext_proto3, val: create(UserSchema, { firstName: "John" }) },
  {
    ext: repeated_message_ext,
    val: [create(Proto2ExtMessageSchema, { stringField: "abc" })],
  },
  { ext: repeated_enum_ext, val: [Proto2ExtEnum.YES, Proto2ExtEnum.NO] },
  { ext: repeated_string_ext, val: ["a", "b", "c"] },
  { ext: packed_uint32_ext, val: [1, 2, 3] },
  { ext: unpacked_uint32_ext, val: [4, 5, 6] },
  { ext: repeated_uint64_ext_js_string, val: ["1", "2", "3"] },
  { ext: repeated_struct_ext, val: [{ shouldBeJson: 1 }, { shouldBeJson: 2 }] },
  { ext: wrapper_ext, val: 123 },
  { ext: struct_ext, val: { shouldBeJson: true } },
  { ext: groupext, val: create(GroupExtSchema, { a: 123 }) },
  {
    ext: repeatedgroupext,
    val: [
      create(RepeatedGroupExtSchema, { a: 123 }),
      create(RepeatedGroupExtSchema, { a: 456 }),
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
  { ext: message_ext, val: create(Proto2ExtMessageSchema) },
  { ext: message_ext_proto3, val: create(UserSchema) },
  { ext: repeated_message_ext, val: [] },
  { ext: repeated_enum_ext, val: [] },
  { ext: repeated_string_ext, val: [] },
  { ext: packed_uint32_ext, val: [] },
  { ext: unpacked_uint32_ext, val: [] },
  { ext: repeated_uint64_ext_js_string, val: [] },
  { ext: repeated_struct_ext, val: [] },
  { ext: wrapper_ext, val: 0 },
  { ext: struct_ext, val: {} },
  { ext: groupext, val: create(GroupExtSchema) },
  { ext: repeatedgroupext, val: [] },
  { ext: Proto2ExtContainer_uint32_ext, val: 0 },
  { ext: Proto2ExtContainer_Child_uint32_ext, val: 0 },
];

void suite("getExtension()", () => {
  void test("should throw error if extendee does not match", () => {
    const msg = create(UserSchema);
    assert.throws(() =>
      getExtension(msg as unknown as Proto2Extendee, uint32_ext),
      {
        message: /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
      }
    );
  });
  void suite("for scalar", () => {
    void test("should parse from unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      msg.$unknown = [
        {
          no: uint32_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(123).finish(),
        },
      ];
      assert.strictEqual(getExtension(msg, uint32_ext), 123);
    });
    void test("should parse last value from unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
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
      assert.strictEqual(getExtension(msg, uint32_ext), 456);
    });
    void test("should return zero value if unset", () => {
      assert.strictEqual(getExtension(create(Proto2ExtendeeSchema), string_ext), "");
      assert.strictEqual(getExtension(create(Proto2ExtendeeSchema), uint32_ext), 0);
    });
    void test("should return default value if unset", () => {
      assert.strictEqual(
        getExtension(create(Proto2ExtendeeSchema), string_ext_with_default),
      `hello " */ `);
      assert.strictEqual(
        getExtension(create(Proto2ExtendeeSchema), uint32_ext_with_default),
      999);
    });
  });
  void suite("for repeated scalar", () => {
    void test("should parse from unpacked unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
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
      assert.deepStrictEqual(getExtension(msg, unpacked_uint32_ext), [123, 456]);
    });
    void test("should parse from packed unknown field", () => {
      const msg = create(Proto2ExtendeeSchema);
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
      assert.deepStrictEqual(getExtension(msg, packed_uint32_ext), [123, 456]);
    });
    void test("should parse from string unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
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
      assert.deepStrictEqual(getExtension(msg, repeated_string_ext), ["a", "b"]);
    });
    void test("should return zero value if unset", () => {
      assert.deepStrictEqual(
        getExtension(create(Proto2ExtendeeSchema), unpacked_uint32_ext)
      , []);
    });
  });
  void suite("for enum", () => {
    void test("should parse from unknown fields", () => {
      const message = create(Proto2ExtendeeSchema);
      message.$unknown = [
        {
          no: enum_ext.number,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(Proto2ExtEnum.NO).finish(),
        },
      ];
      assert.strictEqual(getExtension(message, enum_ext), Proto2ExtEnum.NO);
    });
    void test("should parse last value from unknown fields", () => {
      const message = create(Proto2ExtendeeSchema);
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
      assert.strictEqual(getExtension(message, enum_ext), Proto2ExtEnum.NO);
    });
    void test("should return zero value if unset", () => {
      assert.strictEqual(getExtension(create(Proto2ExtendeeSchema), enum_ext),
        Proto2ExtEnum.YES,
      );
    });
    void test("should return default value if unset", () => {
      assert.strictEqual(
        getExtension(create(Proto2ExtendeeSchema), enum_ext_with_default)
      , Proto2ExtEnum.NO);
    });
  });
  void suite("for repeated enum", () => {
    void test("should parse from unknown fields", () => {
      const message = create(Proto2ExtendeeSchema);
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
      assert.deepStrictEqual(getExtension(message, repeated_enum_ext), [1, 2]);
    });
    void test("should parse from packed unknown field", () => {
      const message = create(Proto2ExtendeeSchema);
      message.$unknown = [
        {
          no: repeated_enum_ext.number,
          wireType: WireType.LengthDelimited,
          data: new BinaryWriter().fork().uint32(1).uint32(2).join().finish(),
        },
      ];
      assert.deepStrictEqual(getExtension(message, repeated_enum_ext), [1, 2]);
    });
    void test("should return zero value if unset", () => {
      assert.deepStrictEqual(
        getExtension(create(Proto2ExtendeeSchema), repeated_enum_ext)
      , []);
    });
  });
  void suite("for message", () => {
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
    void test("should read unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      const wantValue = create(Proto2ExtMessageSchema, {
        stringField: "John",
      });
      wantValue.$unknown = [
        {
          no: 900,
          wireType: WireType.Varint,
          data: new BinaryWriter().uint32(123).finish(),
        },
      ];
      addUnknownMessageField(
        msg,
        message_ext.number,
        Proto2ExtMessageSchema,
        wantValue,
      );
      const gotValue = getExtension(msg, message_ext);
      assert.strictEqual(gotValue.stringField, "John");
      assert.deepStrictEqual(gotValue.$unknown, wantValue.$unknown);
    });
    void test("should return value parsed from unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      addUnknownMessageField(
        msg,
        message_ext_proto3.number,
        UserSchema,
        create(UserSchema, {
          firstName: "John",
        }),
      );
      const value = getExtension(msg, message_ext_proto3);
      assert.ok(isMessage(value, UserSchema));
      assert.strictEqual(value.firstName, "John");
    });
    void test("should return merged value parsed from multiple unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      addUnknownMessageField(
        msg,
        message_ext_proto3.number,
        UserSchema,
        create(UserSchema, {
          firstName: "John",
        }),
      );
      addUnknownMessageField(
        msg,
        message_ext_proto3.number,
        UserSchema,
        create(UserSchema, {
          lastName: "Doe",
        }),
      );
      const value = getExtension(msg, message_ext_proto3);
      assert.ok(isMessage(value, UserSchema));
      assert.strictEqual(value.firstName, "John");
      assert.strictEqual(value.lastName, "Doe");
    });
    void test("should return empty proto3 message if unset", () => {
      const msg = create(Proto2ExtendeeSchema);
      const value = getExtension(msg, message_ext_proto3);
      assert.ok(isMessage(value, UserSchema));
      assert.ok(equals(UserSchema, value, create(UserSchema)));
    });
    void test("should return empty proto2 message if unset", () => {
      const msg = create(Proto2ExtendeeSchema);
      const value = getExtension(msg, message_ext);
      assert.ok(isMessage(value, Proto2ExtMessageSchema));
      assert.ok(
        equals(Proto2ExtMessageSchema, value, create(Proto2ExtMessageSchema)),
      );
    });
    void suite("with WKT wrapper", () => {
      void test("should return unwrapped default value if unset", () => {
        const msg = create(Proto2ExtendeeSchema);
        const value = getExtension(msg, wrapper_ext);
        assert.strictEqual(value, 0);
      });
      void test("should return unwrapped value if set", () => {
        const msg = create(Proto2ExtendeeSchema);
        addUnknownMessageField(
          msg,
          wrapper_ext.number,
          UInt32ValueSchema,
          create(UInt32ValueSchema, {
            value: 123,
          }),
        );
        const value = getExtension(msg, wrapper_ext);
        assert.strictEqual(typeof value, "number");
        assert.strictEqual(value, 123);
      });
    });
  });
  void suite("for repeated message", () => {
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

    void test("should parse from unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      addUnknownMessageField(
        msg,
        repeated_message_ext.number,
        Proto2ExtMessageSchema,
        create(Proto2ExtMessageSchema, {
          stringField: "a",
        }),
      );
      addUnknownMessageField(
        msg,
        repeated_message_ext.number,
        Proto2ExtMessageSchema,
        create(Proto2ExtMessageSchema, {
          stringField: "b",
        }),
      );
      const arr = getExtension(msg, repeated_message_ext);
      assert.strictEqual(arr.length, 2);
      assert.strictEqual(arr[0].stringField, "a");
      assert.strictEqual(arr[1].stringField, "b");
    });
    void test("should return zero value if unset", () => {
      const msg = create(Proto2ExtendeeSchema);
      assert.deepStrictEqual(getExtension(msg, repeated_message_ext), []);
    });
  });
  void suite("for group", () => {
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

    void test("should return value parsed from unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      addUnknownGroupField(
        msg,
        groupext.number,
        GroupExtSchema,
        create(GroupExtSchema, {
          a: 123,
        }),
      );
      const value = getExtension(msg, groupext);
      assert.ok(isMessage(value, GroupExtSchema));
      assert.strictEqual(value.a, 123);
    });
    void test("should return merged value parsed from multiple unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      addUnknownGroupField(
        msg,
        groupext.number,
        GroupExtSchema,
        create(GroupExtSchema, {
          a: 123,
        }),
      );
      addUnknownGroupField(
        msg,
        groupext.number,
        GroupExtSchema,
        create(GroupExtSchema, {
          b: 456,
        }),
      );
      const value = getExtension(msg, groupext);
      assert.ok(isMessage(value, GroupExtSchema));
      assert.strictEqual(value.a, 123);
      assert.strictEqual(value.b, 456);
    });
    void test("should return empty group if unset", () => {
      const msg = create(Proto2ExtendeeSchema);
      const value = getExtension(msg, groupext);
      assert.ok(isMessage(value, GroupExtSchema));
      assert.ok(
        equals(GroupExtSchema, value, create(GroupExtSchema)),
      );
    });
  });
  void suite("for repeated group", () => {
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

    void test("should parse from unknown fields", () => {
      const msg = create(Proto2ExtendeeSchema);
      addUnknownGroupField(
        msg,
        repeatedgroupext.number,
        RepeatedGroupExtSchema,
        create(RepeatedGroupExtSchema, {
          a: 123,
        }),
      );
      addUnknownGroupField(
        msg,
        repeatedgroupext.number,
        RepeatedGroupExtSchema,
        create(RepeatedGroupExtSchema, {
          a: 456,
        }),
      );
      const arr = getExtension(msg, repeatedgroupext);
      assert.strictEqual(arr.length, 2);
      assert.strictEqual(arr[0].a, 123);
      assert.strictEqual(arr[1].a, 456);
    });
    void test("should return zero value if unset", () => {
      const msg = create(Proto2ExtendeeSchema);
      assert.deepStrictEqual(getExtension(msg, repeatedgroupext), []);
    });
  });
});

void suite("hasExtension()", () => {
  let msg: Proto2Extendee;
  let ext: DescExtension;
  beforeEach(() => {
    msg = create(Proto2ExtendeeSchema);
    msg.$unknown = [
      {
        no: 1001,
        wireType: WireType.Varint,
        data: new Uint8Array(),
      },
    ];
    ext = { ...uint32_ext, number: 1001 };
  });
  void test("should return true if extendee and field number match", () => {
    assert.ok(hasExtension(msg, ext));
  });
  void test("should return false if field number does not match", () => {
    ext = { ...ext, number: ext.number + 1 };
    assert.strictEqual(hasExtension(msg, ext), false);
  });
  void test("should return false if extendee does not match", () => {
    ext = { ...ext, extendee: UserSchema };
    assert.strictEqual(hasExtension(msg, ext), false);
  });
  void test("does not honor extension range", () => {
    const extensionNumberOutOfRange = 77; // extensions-proto2.proto: 1000 to 9999
    ext = { ...ext, number: extensionNumberOutOfRange };
    msg.$unknown = [
      {
        no: extensionNumberOutOfRange,
        wireType: WireType.Varint,
        data: new Uint8Array(),
      },
    ];
    assert.ok(hasExtension(msg, ext));
  });
});

void suite("clearExtension()", () => {
  const listUnknownFieldNumbers = (message: Message) =>
    (message.$unknown ?? []).map((uf) => uf.no);
  let msg: Proto2Extendee;
  beforeEach(() => {
    msg = create(Proto2ExtendeeSchema);
    msg.$unknown = [];
    for (const no of [500, 1001, 1001, 1500]) {
      msg.$unknown.push({
        no,
        wireType: WireType.Varint,
        data: new Uint8Array(),
      });
    }
  });
  void test("should clear unknown fields with extension number and leave others untouched", () => {
    assert.deepStrictEqual(listUnknownFieldNumbers(msg), [500, 1001, 1001, 1500]);
    clearExtension(msg, uint32_ext);
    assert.deepStrictEqual(listUnknownFieldNumbers(msg), [500, 1500]);
    clearExtension(msg, uint32_ext);
    assert.deepStrictEqual(listUnknownFieldNumbers(msg), [500, 1500]);
  });
  void test("should throw error if extendee does not match", () => {
    const msg = create(UserSchema);
    assert.throws(() =>
      clearExtension(msg as unknown as Proto2Extendee, uint32_ext), {
      message: /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    });
  });
});

void suite("setExtension()", () => {
  void test("should throw error if extendee does not match", () => {
    const msg = create(UserSchema);
    assert.throws(() =>
      setExtension(msg as unknown as Proto2Extendee, uint32_ext, 123), {
      message: /^extension proto2ext.uint32_ext can only be applied to message proto2ext.Proto2Extendee$/,
    });
  });
  for (const {ext, val} of goldenValues) {
    void test(`should set ${ext.typeName} as expected`, () => {
      const msg = create(Proto2ExtendeeSchema);
      assert.strictEqual(hasExtension(msg, ext), false);
      setExtension(msg, ext, val);
      assert.ok(hasExtension(msg, ext));
      assert.deepStrictEqual(getExtension(msg, ext), val);
    });
  }
  for (const {ext, val} of goldenValuesZero) {
    void test(`should set zero ${ext.typeName} as expected`, () => {
      const msg = create(Proto2ExtendeeSchema);
      assert.strictEqual(hasExtension(msg, ext), false);
      setExtension(msg, ext, val);
      if (ext.fieldKind === "list") {
        assert.strictEqual(hasExtension(msg, ext), false);
      } else {
        assert.ok(hasExtension(msg, ext));
      }
      assert.deepStrictEqual(getExtension(msg, ext), val);
    });
  }
  void test("should write unknown fields", () => {
    const msg = create(Proto2ExtendeeSchema);
    const wantValue = create(Proto2ExtMessageSchema, {
      stringField: "John",
    });
    wantValue.$unknown = [
      {
        no: 900,
        wireType: WireType.Varint,
        data: new BinaryWriter().uint32(123).finish(),
      },
    ];
    setExtension(msg, message_ext, wantValue);
    const gotValue = getExtension(msg, message_ext);
    assert.strictEqual(gotValue.stringField, "John");
    assert.deepStrictEqual(gotValue.$unknown, wantValue.$unknown);
  });
  void suite("setting repeated extension twice", () => {
    void test("should not merge", () => {
      const msg = create(Proto2ExtendeeSchema);
      setExtension(msg, repeated_string_ext, ["a"]);
      setExtension(msg, repeated_string_ext, ["b"]);
      assert.deepStrictEqual(getExtension(msg, repeated_string_ext), ["b"]);
    });
  });
  void suite("proto3", () => {
    void suite("singular scalar", () => {
      const ext = proto3_uint32_ext;
      void test("should set non-zero value as expected", () => {
        const msg = create(FileOptionsSchema);
        setExtension(msg, ext, 123);
        assert.ok(hasExtension(msg, ext));
        assert.deepStrictEqual(getExtension(msg, ext), 123);
      });
      void test("should set zero value, even without optional keyword", () => {
        // Implicit presence does not apply to extensions, see https://github.com/protocolbuffers/protobuf/issues/8234
        const msg = create(FileOptionsSchema);
        setExtension(msg, ext, 0);
        assert.ok(hasExtension(msg, ext));
        assert.deepStrictEqual(getExtension(msg, ext), 0);
      });
    });
    void suite("optional scalar", () => {
      const ext = proto3_optional_uint32_ext;
      void test("should set non-zero value as expected", () => {
        const msg = create(FileOptionsSchema);
        setExtension(msg, ext, 123);
        assert.ok(hasExtension(msg, ext));
        assert.deepStrictEqual(getExtension(msg, ext), 123);
      });
      void test("should set zero value", () => {
        const msg = create(FileOptionsSchema);
        setExtension(msg, ext, 0);
        assert.ok(hasExtension(msg, ext));
        assert.deepStrictEqual(getExtension(msg, ext), 0);
      });
    });
    void suite("packed repeated extension", () => {
      void test("should set expected unknown fields", () => {
        const msg = create(FileOptionsSchema);
        setExtension(msg, proto3_packed_uint32_ext, [1, 2, 3]);
        const unknownFields = (msg.$unknown ?? []).filter(
          (uf) => uf.no === packed_uint32_ext.number,
        );
        assert.strictEqual(unknownFields.length, 1);
        const allLengthDelimited = unknownFields.every(
          (uf) => uf.wireType === WireType.LengthDelimited,
        );
        assert.ok(allLengthDelimited);
      });
    });
    void suite("unpacked repeated extension", () => {
      void test("should set expected unknown fields", () => {
        const msg = create(FileOptionsSchema);
        setExtension(msg, proto3_unpacked_uint32_ext, [1, 2, 3]);
        const unknownFields = (msg.$unknown ?? []).filter(
          (uf) => uf.no === unpacked_uint32_ext.number,
        );
        assert.strictEqual(unknownFields.length, 3);
        const noneLengthDelimited = unknownFields.every(
          (uf) => uf.wireType !== WireType.LengthDelimited,
        );
        assert.ok(noneLengthDelimited);
      });
    });
  });
});
