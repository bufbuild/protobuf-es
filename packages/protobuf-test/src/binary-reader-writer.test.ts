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
import { BinaryReader, BinaryWriter, WireType } from "@bufbuild/protobuf";
import { User } from "./gen/ts/extra/example_pb.js";

describe("BinaryWriter example", () => {
  it("should work as expected", () => {
    const bytes = new BinaryWriter()
      // string first_name = 1
      .tag(1, WireType.LengthDelimited)
      .string("Homer")
      // bool active = 3
      .tag(3, WireType.Varint)
      .bool(true)
      .finish();
    const user = User.fromBinary(bytes);
    expect(user.firstName).toBe("Homer");
    expect(user.active).toBe(true);
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
