// Copyright 2021-2026 Buf Technologies, Inc.
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
import { clone, create, protoInt64 } from "@bufbuild/protobuf";
import { WireType } from "@bufbuild/protobuf/wire";
import { reflect } from "@bufbuild/protobuf/reflect";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";

void suite("clone()", () => {
  void test("clones unknown fields", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    msg.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const copy = clone(proto3_ts.Proto3MessageSchema, msg);
    assert.deepStrictEqual(copy.$unknown, msg.$unknown);
  });
  void test("clones unknown fields in message field", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    msg.singularMessageField = create(proto3_ts.Proto3MessageSchema);
    msg.singularMessageField.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const copy = clone(proto3_ts.Proto3MessageSchema, msg);
    assert.deepStrictEqual(
      copy.singularMessageField?.$unknown,
      msg.singularMessageField.$unknown,
    );
    // Make sure it is copy
    assert.notStrictEqual(
      copy.singularMessageField?.$unknown,
      msg.singularMessageField.$unknown,
    );
  });
  void suite("clones proto3 message", () => {
    const desc = proto3_ts.Proto3MessageSchema;
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
    for (const field of desc.fields) {
      void test(`${field.toString()} presence`, () => {
        const copy = clone(desc, msg);
        const reflectMsg = reflect(desc, msg);
        const reflectCopy = reflect(desc, copy);
        assert.strictEqual(reflectCopy.isSet(field), reflectMsg.isSet(field));
      });
    }
    void test("singularStringField", () => {
      const copy = clone(desc, msg);
      assert.strictEqual(copy.singularStringField, msg.singularStringField);
    });
    void test("singularBytesField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(copy.singularBytesField, msg.singularBytesField);
      assert.deepStrictEqual(copy.singularBytesField, msg.singularBytesField);
    });
    void test("singularMessageField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.singularMessageField,
        msg.singularMessageField,
      );
      assert.deepStrictEqual(
        copy.singularMessageField,
        msg.singularMessageField,
      );
    });
    void test("optionalWrappedUint32Field", () => {
      const copy = clone(desc, msg);
      assert.strictEqual(
        copy.optionalWrappedUint32Field,
        msg.optionalWrappedUint32Field,
      );
      assert.deepStrictEqual(
        copy.optionalWrappedUint32Field,
        msg.optionalWrappedUint32Field,
      );
    });
    void test("repeatedStringField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(copy.repeatedStringField, msg.repeatedStringField);
      assert.deepStrictEqual(copy.repeatedStringField, msg.repeatedStringField);
    });
    void test("repeatedMessageField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.repeatedMessageField,
        msg.repeatedMessageField,
      );
      assert.strictEqual(copy.repeatedMessageField.length, 2);
      assert.notStrictEqual(
        copy.repeatedMessageField[0],
        msg.repeatedMessageField[0],
      );
      assert.deepStrictEqual(
        copy.repeatedMessageField[0],
        msg.repeatedMessageField[0],
      );
      assert.notStrictEqual(
        copy.repeatedMessageField[1],
        msg.repeatedMessageField[1],
      );
      assert.deepStrictEqual(
        copy.repeatedMessageField[1],
        msg.repeatedMessageField[1],
      );
    });
    void test("mapStringStringField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.mapStringStringField,
        msg.mapStringStringField,
      );
      assert.deepStrictEqual(
        copy.mapStringStringField,
        msg.mapStringStringField,
      );
    });
    void test("mapInt32MessageField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.mapInt32MessageField,
        msg.mapInt32MessageField,
      );
      assert.deepStrictEqual(Object.keys(copy), Object.keys(msg));
      assert.notStrictEqual(
        copy.mapInt32MessageField[123],
        msg.mapInt32MessageField[123],
      );
      assert.deepStrictEqual(
        copy.mapInt32MessageField[123],
        msg.mapInt32MessageField[123],
      );
    });
    void test("oneofBoolField", () => {
      const copy = clone(desc, msg);
      assert.deepStrictEqual(copy.either, msg.either);
    });
    void test("oneofMessageField", () => {
      msg.either = { case: "oneofMessageField", value: create(desc) };
      const copy = clone(desc, msg);
      assert.strictEqual(copy.either.case, msg.either.case);
      assert.notStrictEqual(copy.either.value, msg.either.value);
    });
  });
  void suite("clones proto2 message", () => {
    const desc = proto2_ts.Proto2MessageSchema;
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
      msg.requiredgroup = create(proto2_ts.Proto2Message_RequiredGroupSchema);
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
        proto2_ts.Proto2Message_RequiredDefaultGroupSchema,
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
      msg.optionalgroup = create(proto2_ts.Proto2Message_OptionalGroupSchema);

      // optional with default
      msg.optionalDefaultStringField = "";
      msg.optionalDefaultInt64Field = protoInt64.zero;
      msg.optionalDefaultInt64JsNumberField = protoInt64.zero;
      msg.optionalDefaultInt64JsStringField = "0";
      msg.optionalDefaultEnumField = proto2_ts.Proto2Enum.YES;
      msg.optionalDefaultMessageField = create(desc);
      msg.optionalDefaultWrappedUint32Field = 0;
      msg.optionaldefaultgroup = create(
        proto2_ts.Proto2Message_OptionalDefaultGroupSchema,
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
    for (const field of desc.fields) {
      void test(`${field.toString()} presence`, () => {
        const copy = clone(desc, msg);
        const reflectMsg = reflect(desc, msg);
        const reflectCopy = reflect(desc, copy);
        assert.strictEqual(reflectCopy.isSet(field), reflectMsg.isSet(field));
      });
    }
    void test("requiredStringField", () => {
      const copy = clone(desc, msg);
      assert.strictEqual(copy.requiredStringField, msg.requiredStringField);
    });
    void test("requiredBytesField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(copy.requiredBytesField, msg.requiredBytesField);
      assert.deepStrictEqual(copy.requiredBytesField, msg.requiredBytesField);
    });
    void test("requiredMessageField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.requiredMessageField,
        msg.requiredMessageField,
      );
      assert.deepStrictEqual(
        copy.requiredMessageField,
        msg.requiredMessageField,
      );
    });
    void test("optionalWrappedUint32Field", () => {
      const copy = clone(desc, msg);
      assert.strictEqual(
        copy.optionalWrappedUint32Field,
        msg.optionalWrappedUint32Field,
      );
      assert.deepStrictEqual(
        copy.optionalWrappedUint32Field,
        msg.optionalWrappedUint32Field,
      );
    });
    void test("repeatedStringField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(copy.repeatedStringField, msg.repeatedStringField);
      assert.deepStrictEqual(copy.repeatedStringField, msg.repeatedStringField);
    });
    void test("repeatedMessageField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.repeatedMessageField,
        msg.repeatedMessageField,
      );
      assert.strictEqual(copy.repeatedMessageField.length, 2);
      assert.notStrictEqual(
        copy.repeatedMessageField[0],
        msg.repeatedMessageField[0],
      );
      assert.deepStrictEqual(
        copy.repeatedMessageField[0],
        msg.repeatedMessageField[0],
      );
      assert.notStrictEqual(
        copy.repeatedMessageField[1],
        msg.repeatedMessageField[1],
      );
      assert.deepStrictEqual(
        copy.repeatedMessageField[1],
        msg.repeatedMessageField[1],
      );
    });
    void test("mapStringStringField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.mapStringStringField,
        msg.mapStringStringField,
      );
      assert.deepStrictEqual(
        copy.mapStringStringField,
        msg.mapStringStringField,
      );
    });
    void test("mapInt32MessageField", () => {
      const copy = clone(desc, msg);
      assert.notStrictEqual(
        copy.mapInt32MessageField,
        msg.mapInt32MessageField,
      );
      assert.deepStrictEqual(Object.keys(copy).sort(), Object.keys(msg).sort());
      assert.notStrictEqual(
        copy.mapInt32MessageField[123],
        msg.mapInt32MessageField[123],
      );
      assert.deepStrictEqual(
        copy.mapInt32MessageField[123],
        msg.mapInt32MessageField[123],
      );
    });
    void test("oneofBoolField", () => {
      const copy = clone(desc, msg);
      assert.deepStrictEqual(copy.either, msg.either);
    });
    void test("oneofMessageField", () => {
      msg.either = { case: "oneofMessageField", value: create(desc) };
      const copy = clone(desc, msg);
      assert.strictEqual(copy.either.case, msg.either.case);
      assert.notStrictEqual(copy.either.value, msg.either.value);
    });
  });
});
