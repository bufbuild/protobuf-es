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

import { describe, expect, it } from "@jest/globals";
import { fromBinary, toJson } from "@bufbuild/protobuf";
import { BinaryReader, BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import { UserSchema } from "../gen/ts/extra/example_pb.js";
import { MessageSchema } from "../gen/ts/extra/parsemaperror_pb.js";

describe("BinaryWriter", () => {
  it("example should work as expected", () => {
    const bytes = new BinaryWriter()
      // string first_name = 1
      .tag(1, WireType.LengthDelimited)
      .string("Homer")
      // bool active = 3
      .tag(3, WireType.Varint)
      .bool(true)
      .finish();
    const user = fromBinary(UserSchema, bytes);
    expect(user.firstName).toBe("Homer");
    expect(user.active).toBe(true);
  });
  describe("float32()", () => {
    it.each([
      1024,
      3.14,
      -3.14,
      -1024,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NaN,
    ])("should encode %s", (val) => {
      const bytes = new BinaryWriter().float(val).finish();
      expect(bytes.length).toBeGreaterThan(0);
      // @ts-expect-error test string
      const bytesStr = new BinaryWriter().float(val.toString()).finish();
      expect(bytesStr.length).toBeGreaterThan(0);
      expect(bytesStr).toStrictEqual(bytes);
    });
    it.each([
      { val: null, err: "invalid float32: object" },
      { val: new Date(), err: "invalid float32: object" },
      { val: undefined, err: "invalid float32: undefined" },
      { val: true, err: "invalid float32: bool" },
    ])("should error for wrong type $val", ({ val, err }) => {
      // @ts-expect-error test wrong type
      expect(() => new BinaryWriter().float(val)).toThrow(err);
    });
    it.each([Number.MAX_VALUE, -Number.MAX_VALUE])(
      "should error for value out of range %s",
      (val) => {
        expect(() => new BinaryWriter().float(val)).toThrow(
          /^invalid float32: .*/,
        );
        // @ts-expect-error test string
        expect(() => new BinaryWriter().float(val.toString())).toThrow(
          /^invalid float32: .*/,
        );
      },
    );
  });
  // sfixed32, sint32, and int32 are signed 32-bit integers, just with different encoding
  describe.each(["sfixed32", "sint32", "int32"] as const)("%s()", (type) => {
    it.each([-0x80000000, 1024, 0x7fffffff])("should encode %s", (val) => {
      const bytes = new BinaryWriter()[type](val).finish();
      expect(bytes.length).toBeGreaterThan(0);
      // @ts-expect-error test string
      const bytesStr = new BinaryWriter()[type](val.toString()).finish();
      expect(bytesStr.length).toBeGreaterThan(0);
      expect(bytesStr).toStrictEqual(bytes);
    });
    it.each([
      { val: null, err: "invalid int32: object" },
      { val: new Date(), err: "invalid int32: object" },
      { val: undefined, err: "invalid int32: undefined" },
      { val: true, err: "invalid int32: bool" },
    ])("should error for wrong type $val", ({ val, err }) => {
      // @ts-expect-error TS2345
      expect(() => new BinaryWriter()[type](val)).toThrow(err);
    });
    it.each([0x7fffffff + 1, -0x80000000 - 1, 3.14])(
      "should error for value out of range %s",
      (val) => {
        expect(() => new BinaryWriter()[type](val)).toThrow(
          /^invalid int32: .*/,
        );
        // @ts-expect-error test string
        expect(() => new BinaryWriter()[type](val.toString())).toThrow(
          /^invalid int32: .*/,
        );
      },
    );
  });
  // fixed32 and uint32 are unsigned 32-bit integers, just with different encoding
  describe.each(["fixed32", "uint32"] as const)("%s()", (type) => {
    it.each([0, 1024, 0xffffffff])("should encode %s", (val) => {
      const bytes = new BinaryWriter()[type](val).finish();
      expect(bytes.length).toBeGreaterThan(0);
      // @ts-expect-error test string
      const bytesStr = new BinaryWriter()[type](val.toString()).finish();
      expect(bytesStr.length).toBeGreaterThan(0);
      expect(bytesStr).toStrictEqual(bytes);
    });
    it.each([
      { val: null, err: `invalid uint32: object` },
      { val: new Date(), err: `invalid uint32: object` },
      { val: undefined, err: `invalid uint32: undefined` },
      { val: true, err: `invalid uint32: bool` },
    ])("should error for wrong type $val", ({ val, err }) => {
      // @ts-expect-error TS2345
      expect(() => new BinaryWriter()[type](val)).toThrow(err);
    });
    it.each([0xffffffff + 1, -1, 3.14])(
      "should error for value out of range %s",
      (val) => {
        expect(() => new BinaryWriter()[type](val)).toThrow(
          /^invalid uint32: .*/,
        );
        // @ts-expect-error test string
        expect(() => new BinaryWriter()[type](val.toString())).toThrow(
          /^invalid uint32: .*/,
        );
      },
    );
  });
  it("should be completely reset after finish", () => {
    const writer = new BinaryWriter();
    // Make sure we have both a chunk and a buffer
    writer.raw(new Uint8Array([1, 2, 3])).int32(1);
    const bytes = writer.finish();
    // Reuse the same writer to write the same data
    writer.raw(new Uint8Array([1, 2, 3])).int32(1);
    const bytes2 = writer.finish();
    expect(bytes2).toStrictEqual(bytes);
  });
});

describe("BinaryReader", () => {
  describe("skip", () => {
    it("should skip group", () => {
      const reader = new BinaryReader(
        new BinaryWriter()
          .tag(1, WireType.StartGroup)
          .tag(33, WireType.Varint)
          .bool(true)
          .tag(1, WireType.EndGroup)
          .finish(),
      );
      const [fieldNo, wireType] = reader.tag();
      expect(fieldNo).toBe(1);
      expect(wireType).toBe(WireType.StartGroup);
      reader.skip(WireType.StartGroup, 1);
      expect(reader.pos).toBe(reader.len);
    });
    it("should skip nested group", () => {
      const reader = new BinaryReader(
        new BinaryWriter()
          .tag(1, WireType.StartGroup)
          .tag(1, WireType.StartGroup)
          .tag(1, WireType.EndGroup)
          .tag(1, WireType.EndGroup)
          .finish(),
      );
      const [fieldNo, wireType] = reader.tag();
      expect(fieldNo).toBe(1);
      expect(wireType).toBe(WireType.StartGroup);
      reader.skip(WireType.StartGroup, 1);
      expect(reader.pos).toBe(reader.len);
    });
    it("should error on unexpected end group field number", () => {
      const reader = new BinaryReader(
        new BinaryWriter()
          .tag(1, WireType.StartGroup)
          .tag(2, WireType.EndGroup)
          .finish(),
      );
      const [fieldNo, wireType] = reader.tag();
      expect(fieldNo).toBe(1);
      expect(wireType).toBe(WireType.StartGroup);
      expect(() => {
        reader.skip(WireType.StartGroup, 1);
      }).toThrow(/^invalid end group tag$/);
    });
    it("should return skipped group data", () => {
      const reader = new BinaryReader(
        new BinaryWriter()
          .tag(1, WireType.StartGroup)
          .tag(33, WireType.Varint)
          .bool(true)
          .tag(1, WireType.EndGroup)
          .finish(),
      );
      reader.tag();
      const skipped = reader.skip(WireType.StartGroup, 1);
      const sr = new BinaryReader(skipped);
      {
        const [fieldNo, wireType] = sr.tag();
        expect(fieldNo).toBe(33);
        expect(wireType).toBe(WireType.Varint);
        const bool = sr.bool();
        expect(bool).toBe(true);
      }
      {
        const [fieldNo, wireType] = sr.tag();
        expect(fieldNo).toBe(1);
        expect(wireType).toBe(WireType.EndGroup);
        expect(sr.pos).toBe(sr.len);
      }
    });
  });

  it("should correctly parse map field given element delimited by varint larger than one byte", () => {
    const bytes = new Uint8Array([
      10, 128, 1, 10, 124, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97,
      97, 97, 97, 16, 1,
    ]);
    const innerBytes = bytes.slice(-128); // the last 128 bytes are the inner map element

    // sanity check outer message
    {
      const reader = new BinaryReader(bytes);
      const [fieldNo, wireType] = reader.tag();
      expect(fieldNo).toStrictEqual(1);
      expect(wireType).toStrictEqual(WireType.LengthDelimited);
      expect(reader.bytes()).toStrictEqual(innerBytes);
      expect(reader.pos).toStrictEqual(reader.len);
    }

    // sanity check inner message
    {
      const reader = new BinaryReader(innerBytes);
      let [fieldNo, wireType] = reader.tag();
      expect(fieldNo).toStrictEqual(1);
      expect(wireType).toStrictEqual(WireType.LengthDelimited);
      const key = reader.string();
      // the key is 124 'a' characters, and is (synthetic) field 1
      expect(key).toStrictEqual(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      );
      // the value is 1, uint32, and is (synthetic) field 2
      [fieldNo, wireType] = reader.tag();
      expect(fieldNo).toStrictEqual(2);
      expect(wireType).toStrictEqual(WireType.Varint);
      const value = reader.uint32();
      expect(value).toStrictEqual(1);
    }

    // check it actually decodes as a map (this was previously broken)
    {
      const decoded = fromBinary(MessageSchema, bytes);
      expect(toJson(MessageSchema, decoded)).toStrictEqual({
        myMap: {
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa": 1,
        },
      });
    }
  });
});
