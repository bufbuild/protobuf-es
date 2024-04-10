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
import * as proto2_ts from "../gen/ts/extra/proto2_pbv2.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pbv2.js";
import type { DescMessage } from "@bufbuild/protobuf";
import { WireType } from "@bufbuild/protobuf/next/wire";
import { protoInt64 } from "@bufbuild/protobuf";
import { UserDesc } from "../gen/ts/extra/example_pbv2.js";

describe("equals()", () => {
  test("same messages are equal", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    const b = a;
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(true);
  });
  test("equal proto3 zero messages are equal", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    const b = create(proto3_ts.Proto3MessageDesc);
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(true);
  });
  test("equal proto2 zero messages are equal", () => {
    const a = create(proto2_ts.Proto2MessageDesc);
    const b = create(proto2_ts.Proto2MessageDesc);
    expect(equals(proto2_ts.Proto2MessageDesc, a, b)).toBe(true);
  });
  test("equal proto3 zero messages are equal", () => {
    const a = fill(create(proto3_ts.Proto3MessageDesc));
    const b = fill(create(proto3_ts.Proto3MessageDesc));
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(true);
  });
  test("different message types are not equal", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    const b = create(UserDesc);
    expect(equals(proto3_ts.Proto3MessageDesc as DescMessage, a, b)).toBe(
      false,
    );
    expect(equals(proto3_ts.Proto3MessageDesc as DescMessage, b, b)).toBe(
      false,
    );
  });
  test("accepts anonymous messages", () => {
    const desc: DescMessage = proto3_ts.Proto3MessageDesc;
    const a: Message = create(proto3_ts.Proto3MessageDesc);
    const b: Message = create(proto3_ts.Proto3MessageDesc);
    expect(equals(desc, a, b)).toBe(true);
  });
  test("NaN does not equal NaN", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    a.singularFloatField = Number.NaN;
    const b = create(proto3_ts.Proto3MessageDesc);
    b.singularFloatField = Number.NaN;
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
  });
  test("extensions and unknown fields are disregarded", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    a.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const b = create(proto3_ts.Proto3MessageDesc);
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(true);
  });
  test("set proto2 field is not equal unset field", () => {
    const a = create(proto2_ts.Proto2MessageDesc);
    const b = create(proto2_ts.Proto2MessageDesc);
    b.optionalStringField = "";
    expect(equals(proto2_ts.Proto2MessageDesc, a, b)).toBe(false);
  });
  describe("set proto3 field is not equal unset field", () => {
    const a = fill(create(proto3_ts.Proto3MessageDesc));
    let b: proto3_ts.Proto3Message;
    beforeEach(() => {
      b = fill(create(proto3_ts.Proto3MessageDesc));
    });
    test.each(
      proto3_ts.Proto3MessageDesc.fields.filter((f) =>
        reflect(proto3_ts.Proto3MessageDesc, a).isSet(f),
      ),
    )("$name", (f) => {
      reflect(proto3_ts.Proto3MessageDesc, b).clear(f);
      expect(reflect(proto3_ts.Proto3MessageDesc, b).isSet(f)).toBe(false);
      expect(reflect(proto3_ts.Proto3MessageDesc, a).isSet(f)).toBe(true);
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
  });
  describe("modified", () => {
    let a: proto3_ts.Proto3Message;
    let b: proto3_ts.Proto3Message;
    beforeEach(() => {
      a = fill(create(proto3_ts.Proto3MessageDesc));
      b = fill(create(proto3_ts.Proto3MessageDesc));
    });
    test("singularStringField is not equal", () => {
      b.singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("singularBytesField is not equal", () => {
      b.singularBytesField[0] = 0x01;
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("optionalStringField is not equal", () => {
      b.optionalStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("repeatedStringField is not equal", () => {
      b.repeatedStringField.push("modified");
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("oneof is not equal", () => {
      b.either = { case: "oneofInt32Field", value: 123 };
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("singularMessageField is not equal", () => {
      assert(b.singularMessageField);
      b.singularMessageField.singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("mapStringStringField is not equal", () => {
      b.mapStringStringField["modified"] = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("mapStringStringField is not equal", () => {
      b.mapInt32MessageField[123].singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
  });
});

function fill(msg: proto3_ts.Proto3Message): proto3_ts.Proto3Message {
  // singular
  msg.singularStringField = "non-zero";
  msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
  msg.singularInt64Field = protoInt64.parse(123);
  msg.singularInt64JsNumberField = protoInt64.parse(123);
  msg.singularInt64JsStringField = "456";
  msg.singularEnumField = proto3_ts.Proto3Enum.YES;
  msg.singularWrappedUint32Field = 456;
  const smf = (msg.singularMessageField = create(proto3_ts.Proto3MessageDesc));
  smf.either = {
    case: "oneofMessageField",
    value: create(proto3_ts.Proto3MessageDesc),
  };
  // optional
  msg.optionalStringField = "";
  msg.optionalInt64Field = protoInt64.zero;
  msg.optionalInt64JsNumberField = protoInt64.zero;
  msg.optionalInt64JsStringField = "0";
  msg.optionalEnumField = proto3_ts.Proto3Enum.UNSPECIFIED;
  msg.optionalMessageField = create(proto3_ts.Proto3MessageDesc);
  msg.optionalWrappedUint32Field = 0;
  // repeated
  msg.repeatedStringField = ["abc"];
  msg.repeatedMessageField = [
    create(proto3_ts.Proto3MessageDesc),
    create(proto3_ts.Proto3MessageDesc),
  ];
  // map
  msg.mapStringStringField = { foo: "bar" };
  msg.mapInt32MessageField = { 123: create(proto3_ts.Proto3MessageDesc) };
  // oneof
  msg.either = { case: "oneofBoolField", value: false };
  return msg;
}
