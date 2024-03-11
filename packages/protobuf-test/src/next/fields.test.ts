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
import { protoInt64 } from "@bufbuild/protobuf";
import { clearField, create, isFieldSet } from "@bufbuild/protobuf/next";
import type { Message } from "@bufbuild/protobuf/next";
import { localName } from "@bufbuild/protobuf/next/reflect";
import * as proto3_ts from "../gen/ts/extra/proto3_pbv2.js";
import * as proto2_ts from "../gen/ts/extra/proto2_pbv2.js";

describe("isFieldSet()", () => {
  test("accepts field names", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    isFieldSet(msg, "singularStringField");
    isFieldSet(msg, "optionalStringField");
    isFieldSet(msg, "repeatedStringField");
    isFieldSet(msg, "mapStringStringField");
    isFieldSet(msg, "oneofBoolField");
  });
  test("rejects unknown field names", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    // @ts-expect-error TS2345
    isFieldSet(msg, "not a field name");
  });
  test("rejects oneof names", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    // @ts-expect-error TS2345
    isFieldSet(msg, "either");
  });
  test("accepts string for anonymous message", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    const set = isFieldSet(msg as Message, "not a field name");
    expect(set).toBe(false);
  });
  describe("with proto3", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    test.each(desc.fields)("%s is initially unset", (field) => {
      const msg = create(desc);
      const set = isFieldSet(msg as Message, localName(field));
      expect(set).toBe(false);
    });
  });
  describe("with proto2", () => {
    const desc = proto2_ts.Proto2MessageDesc;
    test.each(desc.fields)("%s is initially unset", (field) => {
      const msg = create(desc);
      const set = isFieldSet(msg as Message, localName(field));
      expect(set).toBe(false);
    });
  });
});

describe("clearField()", () => {
  describe("with proto3", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    let msg: proto3_ts.Proto3Message;
    let zero: proto3_ts.Proto3Message;
    beforeEach(() => {
      msg = create(desc);
      zero = create(desc);
      // singular
      msg.singularStringField = "non-zero";
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
      // map
      msg.mapStringStringField = { foo: "bar" };
      // oneof
      msg.either = { case: "oneofBoolField", value: false };
    });
    const names = [
      // singular
      "singularStringField",
      "singularInt64Field",
      "singularInt64JsNumberField",
      "singularInt64JsStringField",
      "singularEnumField",
      "singularMessageField",
      "singularWrappedUint32Field",
      // optional
      "optionalStringField",
      "optionalInt64Field",
      "optionalInt64JsNumberField",
      "optionalInt64JsStringField",
      "optionalEnumField",
      "optionalMessageField",
      "optionalWrappedUint32Field",
      // repeated
      "repeatedStringField",
      // map
      "mapStringStringField",
      // oneof
      "oneofBoolField",
    ] as const;
    test.each(names)("%s", (name) => {
      expect(isFieldSet(msg, name)).toBe(true);
      clearField(msg, name);
      expect(isFieldSet(msg, name)).toBe(false);
      switch (name) {
        case "oneofBoolField":
          expect(msg.either).toStrictEqual(zero.either);
          break;
        case "repeatedStringField":
        case "mapStringStringField":
          expect(msg[name]).toStrictEqual(zero[name]);
          break;
        default:
          expect(msg[name]).toBe(zero[name]);
          break;
      }
    });
  });
  describe("with proto2", () => {
    const desc = proto2_ts.Proto2MessageDesc;
    let msg: proto2_ts.Proto2Message;
    let zero: proto2_ts.Proto2Message;
    beforeEach(() => {
      msg = create(desc);
      zero = create(desc);
      // required
      msg.requiredStringField = "non-zero";
      msg.requiredInt64Field = protoInt64.parse(123);
      msg.requiredInt64JsNumberField = protoInt64.parse(123);
      msg.requiredInt64JsStringField = "456";
      msg.requiredEnumField = proto2_ts.Proto2Enum.YES;
      msg.requiredMessageField = create(desc);
      msg.requiredgroup = create(proto2_ts.Proto2Message_RequiredGroupDesc);
      msg.requiredWrappedDoubleField = 3.142;
      // required with default
      msg.requiredDefaultStringField = "non-zero";
      msg.requiredDefaultInt64Field = protoInt64.parse(123);
      msg.requiredDefaultInt64JsNumberField = protoInt64.parse(123);
      msg.requiredDefaultInt64JsStringField = "456";
      msg.requiredDefaultEnumField = proto2_ts.Proto2Enum.YES;
      msg.requiredDefaultMessageField = create(desc);
      msg.requireddefaultgroup = create(
        proto2_ts.Proto2Message_RequiredDefaultGroupDesc,
      );
      msg.requiredDefaultWrappedDoubleField = 3.142;
      // optional
      msg.optionalStringField = "";
      msg.optionalInt64Field = protoInt64.zero;
      msg.optionalInt64JsNumberField = protoInt64.zero;
      msg.optionalInt64JsStringField = "0";
      msg.optionalEnumField = proto2_ts.Proto2Enum.YES;
      msg.optionalMessageField = create(desc);
      msg.optionalgroup = create(proto2_ts.Proto2Message_OptionalGroupDesc);
      msg.optionalWrappedDoubleField = 0;
      // optional with default
      msg.optionalDefaultStringField = "";
      msg.optionalDefaultInt64Field = protoInt64.zero;
      msg.optionalDefaultInt64JsNumberField = protoInt64.zero;
      msg.optionalDefaultInt64JsStringField = "0";
      msg.optionalDefaultEnumField = proto2_ts.Proto2Enum.YES;
      msg.optionalDefaultMessageField = create(desc);
      msg.optionaldefaultgroup = create(
        proto2_ts.Proto2Message_OptionalDefaultGroupDesc,
      );
      msg.optionalDefaultWrappedDoubleField = 0;
      // repeated
      msg.repeatedStringField = ["abc"];
      // map
      msg.mapStringStringField = { foo: "bar" };
      // oneof
      msg.either = { case: "oneofBoolField", value: false };
    });
    const names = [
      // required
      "requiredStringField",
      "requiredInt64Field",
      "requiredInt64JsNumberField",
      "requiredInt64JsStringField",
      "requiredEnumField",
      "requiredMessageField",
      "requiredgroup",
      "requiredWrappedDoubleField",
      // required with default
      "requiredDefaultStringField",
      "requiredDefaultInt64Field",
      "requiredDefaultInt64JsNumberField",
      "requiredDefaultInt64JsStringField",
      "requiredDefaultEnumField",
      "requiredDefaultMessageField",
      "requireddefaultgroup",
      "requiredDefaultWrappedDoubleField",
      // optional
      "optionalStringField",
      "optionalInt64Field",
      "optionalInt64JsNumberField",
      "optionalInt64JsStringField",
      "optionalEnumField",
      "optionalMessageField",
      "optionalgroup",
      "optionalWrappedDoubleField",
      // optional with default
      "optionalDefaultStringField",
      "optionalDefaultInt64Field",
      "optionalDefaultInt64JsNumberField",
      "optionalDefaultInt64JsStringField",
      "optionalDefaultEnumField",
      "optionalDefaultMessageField",
      "optionaldefaultgroup",
      "optionalDefaultWrappedDoubleField",
      // repeated
      "repeatedStringField",
      // map
      "mapStringStringField",
      // oneof
      "oneofBoolField",
    ] as const;
    test.each(names)("%s", (name) => {
      expect(isFieldSet(msg, name)).toBe(true);
      clearField(msg, name);
      expect(isFieldSet(msg, name)).toBe(false);
      switch (name) {
        case "oneofBoolField":
          expect(msg.either).toStrictEqual(zero.either);
          break;
        case "repeatedStringField":
        case "mapStringStringField":
          expect(msg[name]).toStrictEqual(zero[name]);
          break;
        default:
          expect(msg[name]).toBe(zero[name]);
          break;
      }
    });
  });
});
