// Copyright 2021-2023 Buf Technologies, Inc.
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

import { describe, expect, test } from "@jest/globals";
import * as JS from "../../gen/js/google/protobuf/wrappers_pb.js";
import * as TS from "../../gen/js/google/protobuf/wrappers_pb.js";
import { protoInt64 } from "@bufbuild/protobuf";

describe("google.protobuf.DoubleValue", () => {
  describe.each([
    { DoubleValue: TS.DoubleValue, name: `(generated ts)` },
    { DoubleValue: JS.DoubleValue, name: `(generated js)` },
  ])("$name", ({ DoubleValue }) => {
    const primitive = 12.3;
    test("wraps", () => {
      const got = DoubleValue.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(DoubleValue);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = DoubleValue.fieldWrapper.unwrapField(
        new DoubleValue({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.FloatValue", () => {
  describe.each([
    { FloatValue: TS.FloatValue, name: `(generated ts)` },
    { FloatValue: JS.FloatValue, name: `(generated js)` },
  ])("$name", ({ FloatValue }) => {
    const primitive = 12.3;
    test("wraps", () => {
      const got = FloatValue.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(FloatValue);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = FloatValue.fieldWrapper.unwrapField(
        new FloatValue({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.Int64Value", () => {
  describe.each([
    { Int64Value: TS.Int64Value, name: `(generated ts)` },
    { Int64Value: JS.Int64Value, name: `(generated js)` },
  ])("$name", ({ Int64Value }) => {
    const primitive = protoInt64.parse("-5100100100");
    test("wraps", () => {
      const got = Int64Value.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(Int64Value);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = Int64Value.fieldWrapper.unwrapField(
        new Int64Value({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.UInt64Value", () => {
  describe.each([
    { UInt64Value: TS.UInt64Value, name: `(generated ts)` },
    { UInt64Value: JS.UInt64Value, name: `(generated js)` },
  ])("$name", ({ UInt64Value }) => {
    const primitive = protoInt64.uParse("5100100100");
    test("wraps", () => {
      const got = UInt64Value.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(UInt64Value);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = UInt64Value.fieldWrapper.unwrapField(
        new UInt64Value({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.Int32Value", () => {
  describe.each([
    { Int32Value: TS.Int32Value, name: `(generated ts)` },
    { Int32Value: JS.Int32Value, name: `(generated js)` },
  ])("$name", ({ Int32Value }) => {
    const primitive = -123;
    test("wraps", () => {
      const got = Int32Value.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(Int32Value);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = Int32Value.fieldWrapper.unwrapField(
        new Int32Value({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.UInt32Value", () => {
  describe.each([
    { UInt32Value: TS.UInt32Value, name: `(generated ts)` },
    { UInt32Value: JS.UInt32Value, name: `(generated js)` },
  ])("$name", ({ UInt32Value }) => {
    const primitive = 123;
    test("wraps", () => {
      const got = UInt32Value.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(UInt32Value);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = UInt32Value.fieldWrapper.unwrapField(
        new UInt32Value({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.BoolValue", () => {
  describe.each([
    { BoolValue: TS.BoolValue, name: `(generated ts)`, primitive: true },
    { BoolValue: TS.BoolValue, name: `(generated ts)`, primitive: false },
    { BoolValue: JS.BoolValue, name: `(generated js)`, primitive: true },
    { BoolValue: JS.BoolValue, name: `(generated js)`, primitive: false },
  ])("$name", ({ BoolValue, primitive }) => {
    test("wraps", () => {
      const got = BoolValue.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(BoolValue);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = BoolValue.fieldWrapper.unwrapField(
        new BoolValue({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.StringValue", () => {
  describe.each([
    { StringValue: TS.StringValue, name: `(generated ts)` },
    { StringValue: JS.StringValue, name: `(generated js)` },
  ])("$name", ({ StringValue }) => {
    const primitive = "hello world";
    test("wraps", () => {
      const got = StringValue.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(StringValue);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = StringValue.fieldWrapper.unwrapField(
        new StringValue({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});

describe("google.protobuf.BytesValue", () => {
  describe.each([
    { BytesValue: TS.BytesValue, name: `(generated ts)` },
    { BytesValue: JS.BytesValue, name: `(generated js)` },
  ])("$name", ({ BytesValue }) => {
    const primitive = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    test("wraps", () => {
      const got = BytesValue.fieldWrapper.wrapField(primitive);
      expect(got).toBeInstanceOf(BytesValue);
      expect(got.value).toBe(primitive);
    });
    test("unwraps", () => {
      const got = BytesValue.fieldWrapper.unwrapField(
        new BytesValue({ value: primitive }),
      );
      expect(got).toBe(primitive);
    });
  });
});
