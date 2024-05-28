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

import { describe, expect, it } from "@jest/globals";
import { fromBinary } from "@bufbuild/protobuf";
import { BinaryReader, BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import { UserDesc } from "../gen/ts/extra/example_pb.js";

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
    const user = fromBinary(UserDesc, bytes);
    expect(user.firstName).toBe("Homer");
    expect(user.active).toBe(true);
  });
  describe("float32", () => {
    it.each([
      1024,
      3.142,
      -3.142,
      -1024,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NaN,
    ])("should encode %s", (val) => {
      expect(new BinaryWriter().float(val).finish().length).toBeGreaterThan(0);
    });
    it.each([
      { val: "123", err: /^invalid float32: string/ },
      { val: true, err: /^invalid float32: bool/ },
    ])("should error for wrong type $val", ({ val, err }) => {
      // @ts-expect-error TS2345
      expect(() => new BinaryWriter().float(val)).toThrow(err);
    });
    it.each([Number.MAX_VALUE, -Number.MAX_VALUE])(
      "should error for value out of range %s",
      (val) => {
        expect(() => new BinaryWriter().float(val)).toThrow(
          /^invalid float32: .*/,
        );
      },
    );
  });
  describe("int32", () => {
    it.each([-0x80000000, 1024, 0x7fffffff])("should encode %s", (val) => {
      expect(new BinaryWriter().int32(val).finish().length).toBeGreaterThan(0);
    });
    it.each([
      { val: "123", err: /^invalid int32: string/ },
      { val: true, err: /^invalid int32: bool/ },
    ])("should error for wrong type $val", ({ val, err }) => {
      // @ts-expect-error TS2345
      expect(() => new BinaryWriter().int32(val)).toThrow(err);
    });
    it.each([0x7fffffff + 1, -0x80000000 - 1])(
      "should error for value out of range %s",
      (val) => {
        expect(() => new BinaryWriter().int32(val)).toThrow(
          /^invalid int32: .*/,
        );
      },
    );
  });
  describe("uint32", () => {
    it.each([0, 1024, 0xffffffff])("should encode %s", (val) => {
      expect(new BinaryWriter().uint32(val).finish().length).toBeGreaterThan(0);
    });
    it.each([
      { val: "123", err: /^invalid uint32: string/ },
      { val: true, err: /^invalid uint32: bool/ },
    ])("should error for wrong type$val", ({ val, err }) => {
      // @ts-expect-error TS2345
      expect(() => new BinaryWriter().uint32(val)).toThrow(err);
    });
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
});
