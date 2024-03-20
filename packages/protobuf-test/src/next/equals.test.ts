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

import { beforeEach, describe, expect, test } from "@jest/globals";
import assert from "node:assert";
import { create, equals } from "@bufbuild/protobuf/next";
import type { Message } from "@bufbuild/protobuf/next";
import { reflect } from "@bufbuild/protobuf/next/reflect";
import type { Proto3Message } from "../gen/ts/extra/proto3_pbv2.js";
import { Proto3MessageDesc, Proto3Enum } from "../gen/ts/extra/proto3_pbv2.js";
import type { DescMessage } from "@bufbuild/protobuf";
import { WireType } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";
import { UserDesc } from "../gen/ts/extra/example_pbv2.js";

describe("equals()", () => {
  test("same messages are equal", () => {
    const a = create(Proto3MessageDesc);
    const b = create(Proto3MessageDesc);
    expect(equals(a, b)).toBe(true);
  });
  test("equal messages are equal", () => {
    const a = fill(create(Proto3MessageDesc));
    const b = fill(create(Proto3MessageDesc));
    expect(equals(a, b)).toBe(true);
  });
  test("different message types are not equal", () => {
    const a = create(Proto3MessageDesc);
    const b = create(UserDesc);
    expect(equals(a, b)).toBe(false);
  });
  test("accepts anonymous messages", () => {
    const a: Message = create(Proto3MessageDesc as DescMessage);
    const b: Message = create(Proto3MessageDesc as DescMessage);
    expect(equals(a, b)).toBe(true);
  });
  test("extensions and unknown fields are disregarded", () => {
    const a = create(Proto3MessageDesc);
    a.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const b = create(Proto3MessageDesc);
    expect(equals(a, b)).toBe(true);
  });
  describe("set field is not equal unset field", () => {
    const a = fill(create(Proto3MessageDesc));
    let b: Proto3Message;
    beforeEach(() => {
      b = fill(create(Proto3MessageDesc));
    });
    test.each(Proto3MessageDesc.fields.filter((f) => reflect(a).isSet(f)))(
      "$name",
      (f) => {
        reflect(b).clear(f);
        expect(reflect(b).isSet(f)).toBe(false);
        expect(reflect(a).isSet(f)).toBe(true);
        expect(equals(a, b)).toBe(false);
      },
    );
  });
  describe("modified", () => {
    let a: Proto3Message;
    let b: Proto3Message;
    beforeEach(() => {
      a = fill(create(Proto3MessageDesc));
      b = fill(create(Proto3MessageDesc));
    });
    test("singularStringField is not equal", () => {
      b.singularStringField = "modified";
      expect(equals(a, b)).toBe(false);
    });
    test("singularBytesField is not equal", () => {
      b.singularBytesField[0] = 0x01;
      expect(equals(a, b)).toBe(false);
    });
    test("optionalStringField is not equal", () => {
      b.optionalStringField = "modified";
      expect(equals(a, b)).toBe(false);
    });
    test("repeatedStringField is not equal", () => {
      b.repeatedStringField.push("modified");
      expect(equals(a, b)).toBe(false);
    });
    test("oneof is not equal", () => {
      b.either = { case: "oneofInt32Field", value: 123 };
      expect(equals(a, b)).toBe(false);
    });
    test("singularMessageField is not equal", () => {
      assert(b.singularMessageField);
      b.singularMessageField.singularStringField = "modified";
      expect(equals(a, b)).toBe(false);
    });
    test("mapStringStringField is not equal", () => {
      b.mapStringStringField["modified"] = "modified";
      expect(equals(a, b)).toBe(false);
    });
    test("mapStringStringField is not equal", () => {
      b.mapInt32MessageField[123].singularStringField = "modified";
      expect(equals(a, b)).toBe(false);
    });
  });
});

function fill(msg: Proto3Message): Proto3Message {
  // singular
  msg.singularStringField = "non-zero";
  msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
  msg.singularInt64Field = protoInt64.parse(123);
  msg.singularInt64JsNumberField = protoInt64.parse(123);
  msg.singularInt64JsStringField = "456";
  msg.singularEnumField = Proto3Enum.YES;
  msg.singularWrappedUint32Field = 456;
  const smf = (msg.singularMessageField = create(Proto3MessageDesc));
  smf.either = {
    case: "oneofMessageField",
    value: create(Proto3MessageDesc),
  };
  // optional
  msg.optionalStringField = "";
  msg.optionalInt64Field = protoInt64.zero;
  msg.optionalInt64JsNumberField = protoInt64.zero;
  msg.optionalInt64JsStringField = "0";
  msg.optionalEnumField = Proto3Enum.UNSPECIFIED;
  msg.optionalMessageField = create(Proto3MessageDesc);
  msg.optionalWrappedUint32Field = 0;
  // repeated
  msg.repeatedStringField = ["abc"];
  msg.repeatedMessageField = [
    create(Proto3MessageDesc),
    create(Proto3MessageDesc),
  ];
  // map
  msg.mapStringStringField = { foo: "bar" };
  msg.mapInt32MessageField = { 123: create(Proto3MessageDesc) };
  // oneof
  msg.either = { case: "oneofBoolField", value: false };
  return msg;
}
