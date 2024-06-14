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
import { clearField, create, isFieldSet } from "@bufbuild/protobuf";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pb.js";
import { fillProto2Message, fillProto2MessageNames } from "./helpers-proto2.js";
import { fillProto3Message, fillProto3MessageNames } from "./helpers-proto3.js";
import {
  fillEdition2023Message,
  fillEdition2023MessageNames,
} from "./helpers-edition2023.js";

describe("isFieldSet()", () => {
  test("returns true for set field", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    msg.optionalStringField = "abc";
    const set = isFieldSet(
      msg,
      proto3_ts.Proto3MessageSchema.field.optionalStringField,
    );
    expect(set).toBe(true);
  });
  test("returns true for unset field", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    const set = isFieldSet(
      msg,
      proto3_ts.Proto3MessageSchema.field.optionalStringField,
    );
    expect(set).toBe(false);
  });
  test("returns false for foreign field", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    msg.optionalStringField = "abc";
    const set = isFieldSet(
      msg,
      proto2_ts.Proto2MessageSchema.field.optionalStringField,
    );
    expect(set).toBe(false);
  });
  describe("with proto3", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    test.each(desc.fields)("%s is initially unset", (field) => {
      const msg = create(desc);
      const set = isFieldSet(msg, field);
      expect(set).toBe(false);
    });
    test.each(fillProto3MessageNames())("%s is set", (name) => {
      const msg = create(desc);
      fillProto3Message(msg);
      const set = isFieldSet(msg, desc.field[name]);
      expect(set).toBe(true);
    });
  });
  describe("with proto2", () => {
    const desc = proto2_ts.Proto2MessageSchema;
    test.each(desc.fields)("%s is initially unset", (field) => {
      const msg = create(desc);
      const set = isFieldSet(msg, field);
      expect(set).toBe(false);
    });
    test.each(fillProto2MessageNames())("%s is set", (name) => {
      const msg = create(desc);
      fillProto2Message(msg);
      const set = isFieldSet(msg, desc.field[name]);
      expect(set).toBe(true);
    });
  });
  describe("with edition2023", () => {
    const desc = edition2023_ts.Edition2023MessageSchema;
    test.each(desc.fields)("%s is initially unset", (field) => {
      const msg = create(desc);
      const set = isFieldSet(msg, field);
      expect(set).toBe(false);
    });
    test.each(fillEdition2023MessageNames())("%s is set", (name) => {
      const msg = create(desc);
      fillEdition2023Message(msg);
      const set = isFieldSet(msg, desc.field[name]);
      expect(set).toBe(true);
    });
  });
});

describe("clearField()", () => {
  describe("with proto3", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    let msg: proto3_ts.Proto3Message;
    let zero: proto3_ts.Proto3Message;
    beforeEach(() => {
      zero = create(desc);
      msg = create(desc);
      fillProto3Message(msg);
    });
    test.each(fillProto3MessageNames())("%s", (name) => {
      expect(isFieldSet(msg, desc.field[name])).toBe(true);
      clearField(msg, desc.field[name]);
      expect(isFieldSet(msg, desc.field[name])).toBe(false);
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
    const desc = proto2_ts.Proto2MessageSchema;
    let msg: proto2_ts.Proto2Message;
    let zero: proto2_ts.Proto2Message;
    beforeEach(() => {
      zero = create(desc);
      msg = create(desc);
      fillProto2Message(msg);
    });
    test.each(fillProto2MessageNames())("%s", (name) => {
      expect(isFieldSet(msg, desc.field[name])).toBe(true);
      clearField(msg, desc.field[name]);
      expect(isFieldSet(msg, desc.field[name])).toBe(false);
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
  describe("with edition2023", () => {
    const desc = edition2023_ts.Edition2023MessageSchema;
    let msg: edition2023_ts.Edition2023Message;
    let zero: edition2023_ts.Edition2023Message;
    beforeEach(() => {
      zero = create(desc);
      msg = create(desc);
      fillEdition2023Message(msg);
    });
    test.each(fillEdition2023MessageNames())("%s", (name) => {
      expect(isFieldSet(msg, desc.field[name])).toBe(true);
      clearField(msg, desc.field[name]);
      expect(isFieldSet(msg, desc.field[name])).toBe(false);
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
