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
import type { DescMessage } from "@bufbuild/protobuf";
import { clearField, create, isFieldSet } from "@bufbuild/protobuf/next";
import { localName } from "@bufbuild/protobuf/next/reflect";
import * as proto3_ts from "../gen/ts/extra/proto3_pbv2.js";
import * as proto2_ts from "../gen/ts/extra/proto2_pbv2.js";
import { fillProto2Message, fillProto2MessageNames } from "./helpers-proto2.js";
import { fillProto3Message, fillProto3MessageNames } from "./helpers-proto3.js";

describe("isFieldSet()", () => {
  test("accepts field names", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    isFieldSet(proto3_ts.Proto3MessageDesc, msg, "singularStringField");
    isFieldSet(proto3_ts.Proto3MessageDesc, msg, "optionalStringField");
    isFieldSet(proto3_ts.Proto3MessageDesc, msg, "repeatedStringField");
    isFieldSet(proto3_ts.Proto3MessageDesc, msg, "mapStringStringField");
    isFieldSet(proto3_ts.Proto3MessageDesc, msg, "oneofBoolField");
  });
  test("rejects unknown field names", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    // @ts-expect-error TS2345
    isFieldSet(proto3_ts.Proto3MessageDesc, msg, "not a field name");
  });
  test("rejects oneof names", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    // @ts-expect-error TS2345
    isFieldSet(proto3_ts.Proto3MessageDesc, msg, "either");
  });
  test("accepts string for anonymous message", () => {
    const desc: DescMessage = proto3_ts.Proto3MessageDesc;
    const msg = create(desc);
    const set = isFieldSet(desc, msg, "not a field name");
    expect(set).toBe(false);
  });
  describe("with proto3", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    test.each(desc.fields)("%s is initially unset", (field) => {
      const msg = create(desc);
      const set = isFieldSet(desc as DescMessage, msg, localName(field));
      expect(set).toBe(false);
    });
    test.each(fillProto3MessageNames())("%s is set", (name) => {
      const msg = create(desc);
      fillProto3Message(msg);
      const set = isFieldSet(desc, msg, name);
      expect(set).toBe(true);
    });
  });
  describe("with proto2", () => {
    const desc = proto2_ts.Proto2MessageDesc;
    test.each(desc.fields)("%s is initially unset", (field) => {
      const msg = create(desc);
      const set = isFieldSet(desc as DescMessage, msg, localName(field));
      expect(set).toBe(false);
    });
    test.each(fillProto2MessageNames())("%s is set", (name) => {
      const msg = create(desc);
      fillProto2Message(msg);
      const set = isFieldSet(desc, msg, name);
      expect(set).toBe(true);
    });
  });
});

describe("clearField()", () => {
  describe("with proto3", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    let msg: proto3_ts.Proto3Message;
    let zero: proto3_ts.Proto3Message;
    beforeEach(() => {
      zero = create(desc);
      msg = create(desc);
      fillProto3Message(msg);
    });
    test.each(fillProto3MessageNames())("%s", (name) => {
      expect(isFieldSet(desc, msg, name)).toBe(true);
      clearField(desc, msg, name);
      expect(isFieldSet(desc, msg, name)).toBe(false);
      switch (name) {
        case "oneofBoolField":
          expect(msg.either).toStrictEqual(zero.either);
          break;
        case "singularBytesField":
        case "repeatedMessageField":
        case "repeatedStringField":
        case "mapStringStringField":
        case "mapInt32MessageField":
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
      zero = create(desc);
      msg = create(desc);
      fillProto2Message(msg);
    });
    test.each(fillProto2MessageNames())("%s", (name) => {
      expect(isFieldSet(desc, msg, name)).toBe(true);
      clearField(desc, msg, name);
      expect(isFieldSet(desc, msg, name)).toBe(false);
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
