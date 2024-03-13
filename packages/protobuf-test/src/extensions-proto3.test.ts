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
  FileOptions,
  getExtension,
  hasExtension,
  proto3,
  ScalarType,
  setExtension,
  WireType,
} from "@bufbuild/protobuf";
import { describe, expect, it } from "@jest/globals";
import {
  optional_uint32_ext,
  packed_uint32_ext,
  uint32_ext,
  unpacked_uint32_ext,
} from "./gen/ts/extra/extensions-proto3_pb.js";

describe("proto3.makeExtension()", () => {
  it("should use proto3 field info normalization", () => {
    const ext = proto3.makeExtension<FileOptions, string>(
      "foo.bar.ext_foo",
      FileOptions,
      () => ({
        no: 1001,
        kind: "scalar",
        T: ScalarType.UINT32,
        repeated: true,
      }),
    );
    expect(ext.field.name).toBe("ext_foo");
    expect(ext.field.packed).toBe(true);
  });
});

describe("setExtension() proto3", () => {
  describe("singular scalar", () => {
    const ext = uint32_ext;
    it("should set non-zero value as expected", () => {
      const msg = new FileOptions();
      setExtension(msg, ext, 123);
      expect(hasExtension(msg, ext)).toBeTruthy();
      expect(getExtension(msg, ext)).toStrictEqual(123);
    });
    it("should set zero value, even without optional keyword", () => {
      // Implicit presence does not apply to extensions, see https://github.com/protocolbuffers/protobuf/issues/8234
      const msg = new FileOptions();
      setExtension(msg, ext, 0);
      expect(hasExtension(msg, ext)).toBeTruthy();
      expect(getExtension(msg, ext)).toStrictEqual(0);
    });
  });
  describe("optional scalar", () => {
    const ext = optional_uint32_ext;
    it("should set non-zero value as expected", () => {
      const msg = new FileOptions();
      setExtension(msg, ext, 123);
      expect(hasExtension(msg, ext)).toBeTruthy();
      expect(getExtension(msg, ext)).toStrictEqual(123);
    });
    it("should set zero value", () => {
      const msg = new FileOptions();
      setExtension(msg, ext, 0);
      expect(hasExtension(msg, ext)).toBeTruthy();
      expect(getExtension(msg, ext)).toStrictEqual(0);
    });
  });
  describe("packed repeated extension", () => {
    it("should set expected unknown fields", () => {
      const msg = new FileOptions();
      setExtension(msg, packed_uint32_ext, [1, 2, 3]);
      const unknownFields = msg
        .getType()
        .runtime.bin.listUnknownFields(msg)
        .filter((uf) => uf.no === packed_uint32_ext.field.no);
      expect(unknownFields.length).toBe(1);
      const allLengthDelimited = unknownFields.every(
        (uf) => uf.wireType === WireType.LengthDelimited,
      );
      expect(allLengthDelimited).toBeTruthy();
    });
  });
  describe("unpacked repeated extension", () => {
    it("should set expected unknown fields", () => {
      const msg = new FileOptions();
      setExtension(msg, unpacked_uint32_ext, [1, 2, 3]);
      const unknownFields = msg
        .getType()
        .runtime.bin.listUnknownFields(msg)
        .filter((uf) => uf.no === unpacked_uint32_ext.field.no);
      expect(unknownFields.length).toBe(3);
      const noneLengthDelimited = unknownFields.every(
        (uf) => uf.wireType !== WireType.LengthDelimited,
      );
      expect(noneLengthDelimited).toBeTruthy();
    });
  });
});
