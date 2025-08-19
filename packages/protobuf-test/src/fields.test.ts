// Copyright 2021-2025 Buf Technologies, Inc.
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

import { beforeEach, suite, test } from "node:test";
import * as assert from "node:assert";
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

void suite("isFieldSet()", () => {
  void test("returns true for set field", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    msg.optionalStringField = "abc";
    const set = isFieldSet(
      msg,
      proto3_ts.Proto3MessageSchema.field.optionalStringField,
    );
    assert.strictEqual(set, true);
  });
  void test("returns true for unset field", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    const set = isFieldSet(
      msg,
      proto3_ts.Proto3MessageSchema.field.optionalStringField,
    );
    assert.strictEqual(set, false);
  });
  void test("returns false for foreign field", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    msg.optionalStringField = "abc";
    const set = isFieldSet(
      msg,
      proto2_ts.Proto2MessageSchema.field.optionalStringField,
    );
    assert.strictEqual(set, false);
  });
  void suite("with proto3", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    for (const field of desc.fields) {
      void test(`${field.toString()} is initially unset`, () => {
        const msg = create(desc);
        const set = isFieldSet(msg, field);
        assert.strictEqual(set, false);
      });
    }
    for (const name of fillProto3MessageNames()) {
      void test(`${name} is set`, () => {
        const msg = create(desc);
        fillProto3Message(msg);
        const set = isFieldSet(msg, desc.field[name]);
        assert.strictEqual(set, true);
      });
    }
  });
  void suite("with proto2", () => {
    const desc = proto2_ts.Proto2MessageSchema;
    for (const field of desc.fields) {
      void test(`${field.toString()} is initially unset`, () => {
        const msg = create(desc);
        const set = isFieldSet(msg, field);
        assert.strictEqual(set, false);
      });
    }
    for (const name of fillProto2MessageNames()) {
      void test(`${name} is set`, () => {
        const msg = create(desc);
        fillProto2Message(msg);
        const set = isFieldSet(msg, desc.field[name]);
        assert.strictEqual(set, true);
      });
    }
  });
  void suite("with edition2023", () => {
    const desc = edition2023_ts.Edition2023MessageSchema;
    for (const field of desc.fields) {
      void test(`${field.toString()} is initially unset`, () => {
        const msg = create(desc);
        const set = isFieldSet(msg, field);
        assert.strictEqual(set, false);
      });
    }
    for (const name of fillEdition2023MessageNames()) {
      void test(`${name} is set`, () => {
        const msg = create(desc);
        fillEdition2023Message(msg);
        const set = isFieldSet(msg, desc.field[name]);
        assert.strictEqual(set, true);
      });
    }
  });
});

void suite("clearField()", () => {
  void suite("with proto3", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    let msg: proto3_ts.Proto3Message;
    let zero: proto3_ts.Proto3Message;
    beforeEach(() => {
      zero = create(desc);
      msg = create(desc);
      fillProto3Message(msg);
    });
    for (const name of fillProto3MessageNames()) {
      void test(`${name}`, () => {
        assert.strictEqual(isFieldSet(msg, desc.field[name]), true);
        clearField(msg, desc.field[name]);
        assert.strictEqual(isFieldSet(msg, desc.field[name]), false);
        switch (name) {
          case "oneofBoolField":
            assert.deepStrictEqual(msg.either, zero.either);
            break;
          case "singularBytesField":
          case "repeatedMessageField":
          case "repeatedStringField":
          case "mapStringStringField":
          case "mapInt32MessageField":
            assert.deepStrictEqual(msg[name], zero[name]);
            break;
          default:
            assert.strictEqual(msg[name], zero[name]);
            break;
        }
      });
    }
  });
  void suite("with proto2", () => {
    const desc = proto2_ts.Proto2MessageSchema;
    let msg: proto2_ts.Proto2Message;
    let zero: proto2_ts.Proto2Message;
    beforeEach(() => {
      zero = create(desc);
      msg = create(desc);
      fillProto2Message(msg);
    });
    for (const name of fillProto2MessageNames()) {
      void test(`${name}`, () => {
        assert.strictEqual(isFieldSet(msg, desc.field[name]), true);
        clearField(msg, desc.field[name]);
        assert.strictEqual(isFieldSet(msg, desc.field[name]), false);
        switch (name) {
          case "oneofBoolField":
            assert.deepStrictEqual(msg.either, zero.either);
            break;
          case "repeatedStringField":
          case "mapStringStringField":
            assert.deepStrictEqual(msg[name], zero[name]);
            break;
          default:
            assert.strictEqual(msg[name], zero[name]);
            break;
        }
      });
    }
  });
  void suite("with edition2023", () => {
    const desc = edition2023_ts.Edition2023MessageSchema;
    let msg: edition2023_ts.Edition2023Message;
    let zero: edition2023_ts.Edition2023Message;
    beforeEach(() => {
      zero = create(desc);
      msg = create(desc);
      fillEdition2023Message(msg);
    });
    for (const name of fillEdition2023MessageNames()) {
      void test(`${name}`, () => {
        assert.strictEqual(isFieldSet(msg, desc.field[name]), true);
        clearField(msg, desc.field[name]);
        assert.strictEqual(isFieldSet(msg, desc.field[name]), false);
        switch (name) {
          case "oneofBoolField":
            assert.deepStrictEqual(msg.either, zero.either);
            break;
          case "repeatedStringField":
          case "mapStringStringField":
            assert.deepStrictEqual(msg[name], zero[name]);
            break;
          default:
            assert.strictEqual(msg[name], zero[name]);
            break;
        }
      });
    }
  });
});
