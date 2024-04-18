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
import { clone, create } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";
import { WireType } from "@bufbuild/protobuf/wire";
import { reflect } from "@bufbuild/protobuf/reflect";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";

describe("clone()", () => {
  test("clones unknown fields", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    msg.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const copy = clone(proto3_ts.Proto3MessageDesc, msg);
    expect(copy.$unknown).toStrictEqual(msg.$unknown);
  });
  test("clones unknown fields in message field", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    msg.singularMessageField = create(proto3_ts.Proto3MessageDesc);
    msg.singularMessageField.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const copy = clone(proto3_ts.Proto3MessageDesc, msg);
    expect(copy.singularMessageField?.$unknown).toStrictEqual(
      msg.singularMessageField.$unknown,
    );
    // Make sure it is copy
    expect(copy.singularMessageField?.$unknown).not.toBe(
      msg.singularMessageField.$unknown,
    );
  });
  describe("clones proto3 message", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    let msg: proto3_ts.Proto3Message;
    beforeEach(() => {
      msg = create(desc);
      // singular
      msg.singularStringField = "non-zero";
      msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
      msg.singularInt64Field = protoInt64.parse(123);
      msg.singularInt64JsNumberField = protoInt64.parse(123);
      msg.singularInt64JsStringField = "456";
      msg.singularEnumField = proto3_ts.Proto3Enum.YES;
      msg.singularMessageField = create(desc);
      msg.singularWrappedUint32Field = 456;
      // optional
      msg.optionalStringField = "";
      msg.optionalInt64Field = protoInt64.zero;
      msg.optionalInt64JsNumberField = protoInt64.zero;
      msg.optionalInt64JsStringField = "0";
      msg.optionalEnumField = proto3_ts.Proto3Enum.UNSPECIFIED;
      msg.optionalMessageField = create(desc);
      msg.optionalWrappedUint32Field = 0;
      // repeated
      msg.repeatedStringField = ["abc"];
      msg.repeatedMessageField = [create(desc), create(desc)];
      // map
      msg.mapStringStringField = { foo: "bar" };
      msg.mapInt32MessageField = { 123: create(desc) };
      // oneof
      msg.either = { case: "oneofBoolField", value: false };
    });
    test.each(desc.fields)("$name presence", (field) => {
      const copy = clone(desc, msg);
      const reflectMsg = reflect(desc, msg);
      const reflectCopy = reflect(desc, copy);
      expect(reflectCopy.isSet(field)).toBe(reflectMsg.isSet(field));
    });
    test("singularStringField", () => {
      const copy = clone(desc, msg);
      expect(copy.singularStringField).toBe(msg.singularStringField);
    });
    test("singularBytesField", () => {
      const copy = clone(desc, msg);
      expect(copy.singularBytesField).not.toBe(msg.singularBytesField);
      expect(copy.singularBytesField).toStrictEqual(msg.singularBytesField);
    });
    test("singularMessageField", () => {
      const copy = clone(desc, msg);
      expect(copy.singularMessageField).not.toBe(msg.singularMessageField);
      expect(copy.singularMessageField).toStrictEqual(msg.singularMessageField);
    });
    test("optionalWrappedUint32Field", () => {
      const copy = clone(desc, msg);
      expect(copy.optionalWrappedUint32Field).toBe(
        msg.optionalWrappedUint32Field,
      );
      expect(copy.optionalWrappedUint32Field).toStrictEqual(
        msg.optionalWrappedUint32Field,
      );
    });
    test("repeatedStringField", () => {
      const copy = clone(desc, msg);
      expect(copy.repeatedStringField).not.toBe(msg.repeatedStringField);
      expect(copy.repeatedStringField).toStrictEqual(msg.repeatedStringField);
    });
    test("repeatedMessageField", () => {
      const copy = clone(desc, msg);
      expect(copy.repeatedMessageField).not.toBe(msg.repeatedMessageField);
      expect(copy.repeatedMessageField.length).toBe(2);
      expect(copy.repeatedMessageField[0]).not.toBe(
        msg.repeatedMessageField[0],
      );
      expect(copy.repeatedMessageField[0]).toStrictEqual(
        msg.repeatedMessageField[0],
      );
      expect(copy.repeatedMessageField[1]).not.toBe(
        msg.repeatedMessageField[1],
      );
      expect(copy.repeatedMessageField[1]).toStrictEqual(
        msg.repeatedMessageField[1],
      );
    });
    test("mapStringStringField", () => {
      const copy = clone(desc, msg);
      expect(copy.mapStringStringField).not.toBe(msg.mapStringStringField);
      expect(copy.mapStringStringField).toStrictEqual(msg.mapStringStringField);
    });
    test("mapInt32MessageField", () => {
      const copy = clone(desc, msg);
      expect(copy.mapInt32MessageField).not.toBe(msg.mapInt32MessageField);
      expect(Object.keys(copy)).toStrictEqual(Object.keys(msg));
      expect(copy.mapInt32MessageField[123]).not.toBe(
        msg.mapInt32MessageField[123],
      );
      expect(copy.mapInt32MessageField[123]).toStrictEqual(
        msg.mapInt32MessageField[123],
      );
    });
    test("oneofBoolField", () => {
      const copy = clone(desc, msg);
      expect(copy.either).toStrictEqual(msg.either);
    });
    test("oneofMessageField", () => {
      msg.either = { case: "oneofMessageField", value: create(desc) };
      const copy = clone(desc, msg);
      expect(copy.either.case).toBe(msg.either.case);
      expect(copy.either.value).not.toBe(msg.either.value);
    });
  });
  describe("clones proto2 message", () => {
    const desc = proto2_ts.Proto2MessageDesc;
    let msg: proto2_ts.Proto2Message;
    beforeEach(() => {
      msg = create(desc);
      // required
      msg.requiredStringField = "";
      msg.requiredBytesField = new Uint8Array(0);
      msg.requiredInt32Field = 0;
      msg.requiredInt64Field = protoInt64.parse(123);
      msg.requiredInt64JsNumberField = protoInt64.parse(123);
      msg.requiredInt64JsStringField = "456";
      msg.requiredEnumField = proto2_ts.Proto2Enum.YES;
      msg.requiredMessageField = create(desc);
      msg.requiredgroup = create(proto2_ts.Proto2Message_RequiredGroupDesc);
      msg.requiredWrappedUint32Field = 456;

      // required with default
      msg.requiredDefaultStringField = "";
      msg.requiredDefaultBytesField = new Uint8Array(0);
      msg.requiredDefaultInt32Field = 0;
      msg.requiredDefaultInt64Field = protoInt64.parse(123);
      msg.requiredDefaultInt64JsNumberField = protoInt64.parse(123);
      msg.requiredDefaultInt64JsStringField = "456";
      msg.requiredDefaultEnumField = proto2_ts.Proto2Enum.YES;
      msg.requiredDefaultMessageField = create(desc);
      msg.requireddefaultgroup = create(
        proto2_ts.Proto2Message_RequiredDefaultGroupDesc,
      );
      msg.requiredDefaultWrappedUint32Field = 456;

      // optional
      msg.optionalStringField = "";
      msg.optionalInt64Field = protoInt64.zero;
      msg.optionalInt64JsNumberField = protoInt64.zero;
      msg.optionalInt64JsStringField = "0";
      msg.optionalEnumField = proto2_ts.Proto2Enum.YES;
      msg.optionalMessageField = create(desc);
      msg.optionalWrappedUint32Field = 0;
      msg.optionalgroup = create(proto2_ts.Proto2Message_OptionalGroupDesc);

      // optional with default
      msg.optionalDefaultStringField = "";
      msg.optionalDefaultInt64Field = protoInt64.zero;
      msg.optionalDefaultInt64JsNumberField = protoInt64.zero;
      msg.optionalDefaultInt64JsStringField = "0";
      msg.optionalDefaultEnumField = proto2_ts.Proto2Enum.YES;
      msg.optionalDefaultMessageField = create(desc);
      msg.optionalDefaultWrappedUint32Field = 0;
      msg.optionaldefaultgroup = create(
        proto2_ts.Proto2Message_OptionalDefaultGroupDesc,
      );

      // repeated
      msg.repeatedStringField = ["abc"];
      msg.repeatedMessageField = [create(desc), create(desc)];
      // map
      msg.mapStringStringField = { foo: "bar" };
      msg.mapInt32MessageField = { 123: create(desc) };
      // oneof
      msg.either = { case: "oneofBoolField", value: false };
    });
    test.each(desc.fields)("$name presence", (field) => {
      const copy = clone(desc, msg);
      const reflectMsg = reflect(desc, msg);
      const reflectCopy = reflect(desc, copy);
      expect(reflectCopy.isSet(field)).toBe(reflectMsg.isSet(field));
    });
    test("requiredStringField", () => {
      const copy = clone(desc, msg);
      expect(copy.requiredStringField).toBe(msg.requiredStringField);
    });
    test("requiredBytesField", () => {
      const copy = clone(desc, msg);
      expect(copy.requiredBytesField).not.toBe(msg.requiredBytesField);
      expect(copy.requiredBytesField).toStrictEqual(msg.requiredBytesField);
    });
    test("requiredMessageField", () => {
      const copy = clone(desc, msg);
      expect(copy.requiredMessageField).not.toBe(msg.requiredMessageField);
      expect(copy.requiredMessageField).toStrictEqual(msg.requiredMessageField);
    });
    test("optionalWrappedUint32Field", () => {
      const copy = clone(desc, msg);
      expect(copy.optionalWrappedUint32Field).toBe(
        msg.optionalWrappedUint32Field,
      );
      expect(copy.optionalWrappedUint32Field).toStrictEqual(
        msg.optionalWrappedUint32Field,
      );
    });
    test("repeatedStringField", () => {
      const copy = clone(desc, msg);
      expect(copy.repeatedStringField).not.toBe(msg.repeatedStringField);
      expect(copy.repeatedStringField).toStrictEqual(msg.repeatedStringField);
    });
    test("repeatedMessageField", () => {
      const copy = clone(desc, msg);
      expect(copy.repeatedMessageField).not.toBe(msg.repeatedMessageField);
      expect(copy.repeatedMessageField.length).toBe(2);
      expect(copy.repeatedMessageField[0]).not.toBe(
        msg.repeatedMessageField[0],
      );
      expect(copy.repeatedMessageField[0]).toStrictEqual(
        msg.repeatedMessageField[0],
      );
      expect(copy.repeatedMessageField[1]).not.toBe(
        msg.repeatedMessageField[1],
      );
      expect(copy.repeatedMessageField[1]).toStrictEqual(
        msg.repeatedMessageField[1],
      );
    });
    test("mapStringStringField", () => {
      const copy = clone(desc, msg);
      expect(copy.mapStringStringField).not.toBe(msg.mapStringStringField);
      expect(copy.mapStringStringField).toStrictEqual(msg.mapStringStringField);
    });
    test("mapInt32MessageField", () => {
      const copy = clone(desc, msg);
      expect(copy.mapInt32MessageField).not.toBe(msg.mapInt32MessageField);
      expect(Object.keys(copy).sort()).toStrictEqual(Object.keys(msg).sort());
      expect(copy.mapInt32MessageField[123]).not.toBe(
        msg.mapInt32MessageField[123],
      );
      expect(copy.mapInt32MessageField[123]).toStrictEqual(
        msg.mapInt32MessageField[123],
      );
    });
    test("oneofBoolField", () => {
      const copy = clone(desc, msg);
      expect(copy.either).toStrictEqual(msg.either);
    });
    test("oneofMessageField", () => {
      msg.either = { case: "oneofMessageField", value: create(desc) };
      const copy = clone(desc, msg);
      expect(copy.either.case).toBe(msg.either.case);
      expect(copy.either.value).not.toBe(msg.either.value);
    });
  });
});
