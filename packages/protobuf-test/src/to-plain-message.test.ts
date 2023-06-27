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

import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import { ScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb.js";
import { toPlainMessage, protoInt64 } from "@bufbuild/protobuf";
import type { PlainMessage } from "@bufbuild/protobuf";
import {
  OneofEnum,
  OneofMessage,
  OneofMessageFoo,
} from "./gen/ts/extra/msg-oneof_pb.js";
import { MapsEnum, MapsMessage } from "./gen/ts/extra/msg-maps_pb.js";
import { MessageFieldMessage } from "./gen/ts/extra/msg-message_pb.js";
import { EnumMessage, EnumMessage_NestedEnum } from "./gen/ts/extra/enum_pb.js";

describeToPlainMessage(() => {
  describe("on scalar", () => {
    test("returns unset defaults", () => {
      const defaultValue: PlainMessage<ScalarValuesMessage> = {
        boolField: false,
        bytesField: new Uint8Array(),
        doubleField: 0,
        fixed32Field: 0,
        fixed64Field: protoInt64.zero,
        floatField: 0,
        int32Field: 0,
        int64Field: protoInt64.zero,
        sfixed32Field: 0,
        sfixed64Field: protoInt64.zero,
        sint32Field: 0,
        sint64Field: protoInt64.zero,
        stringField: "",
        uint32Field: 0,
        uint64Field: protoInt64.zero,
      };
      const act = toPlainMessage(new ScalarValuesMessage({}));
      expect(act).toEqual(defaultValue);
      expectPlainObject(act);
    });
    test("returns set fields", () => {
      const exp = {
        boolField: true,
        bytesField: new Uint8Array([1]),
        doubleField: 1.2,
        fixed32Field: 1,
        fixed64Field: protoInt64.parse(1),
        floatField: 1,
        int32Field: 1,
        int64Field: protoInt64.parse(1),
        sfixed32Field: 1,
        sfixed64Field: protoInt64.parse(1),
        sint32Field: 1,
        sint64Field: protoInt64.parse(1),
        stringField: "some",
        uint32Field: 1,
        uint64Field: protoInt64.parse(1),
      };
      const act = toPlainMessage(new ScalarValuesMessage(exp));
      expect(act).toEqual(exp);
      expectPlainObject(act);
    });
  });
  describe("on enums", () => {
    test("returns unset defaults", () => {
      const act = toPlainMessage(new EnumMessage({}));
      expect(act).toEqual({
        enumField: EnumMessage_NestedEnum.NESTED_ZERO,
      });
      expectPlainObject(act);
    });
  });
  describe("on oneof", () => {
    test("when not set", () => {
      const act = toPlainMessage(new OneofMessage({}));
      expect(act).toEqual({
        enum: { case: undefined },
        message: { case: undefined },
        scalar: { case: undefined },
      });
      expectPlainObject(act);
    });
    test("with enums", () => {
      const act = toPlainMessage(
        new OneofMessage({
          enum: {
            case: "e",
            value: OneofEnum.A,
          },
        })
      );
      expect(act).toEqual({
        enum: { case: "e", value: OneofEnum.A },
        message: { case: undefined },
        scalar: { case: undefined },
      });
      expectPlainObject(act);
    });
    test("with messages", () => {
      const act = toPlainMessage(
        new OneofMessage({
          message: {
            case: "foo",
            value: new OneofMessageFoo(),
          },
        })
      );
      expect(act).toEqual({
        message: {
          case: "foo",
          value: {
            name: "",
            toggle: false,
          },
        },
        enum: { case: undefined },
        scalar: { case: undefined },
      });
      expectPlainObject(act);
    });
    test("with scalars", () => {
      const act = toPlainMessage(
        new OneofMessage({
          scalar: {
            case: "value",
            value: 1,
          },
        })
      );
      expect(act).toEqual({
        scalar: { case: "value", value: 1 },
        message: { case: undefined },
        enum: { case: undefined },
      });
      expectPlainObject(act);
    });
  });
  describe("on maps", () => {
    const defaultValue: PlainMessage<MapsMessage> = {
      strStrField: {},
      strInt32Field: {},
      strInt64Field: {},
      strBoolField: {},
      strBytesField: {},
      int32StrField: {},
      int64StrField: {},
      boolStrField: {},
      strMsgField: {},
      int32MsgField: {},
      int64MsgField: {},
      strEnuField: {},
      int32EnuField: {},
      int64EnuField: {},
    };
    test("returns unset defaults", () => {
      const act = toPlainMessage(new MapsMessage({}));
      expect(act).toEqual(defaultValue);
      expectPlainObject(act);
    });
    test("returns set fields", () => {
      const exp = {
        strStrField: { a: "str", b: "xx" },
        strInt32Field: { a: 123, b: 455 },
        strInt64Field: { a: protoInt64.parse(123) },
        strBoolField: { a: true, b: false },
        strBytesField: {
          a: new Uint8Array([
            104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
          ]),
        },
        int32StrField: { 123: "hello" },
        int64StrField: { "9223372036854775807": "hello" },
        boolStrField: { true: "yes", false: "no" },
        strMsgField: {
          a: defaultValue,
        },
        int32MsgField: {
          1: defaultValue,
        },
        int64MsgField: {
          "1": defaultValue,
        },
        strEnuField: { a: MapsEnum.ANY, b: MapsEnum.NO, c: MapsEnum.YES },
        int32EnuField: { 1: MapsEnum.ANY, 2: MapsEnum.NO, 0: MapsEnum.YES },
        int64EnuField: {
          "-1": MapsEnum.ANY,
          "2": MapsEnum.NO,
          "0": MapsEnum.YES,
        },
      };
      const act = toPlainMessage(new MapsMessage(exp));
      expect(act).toEqual(exp);
      expectPlainObject(act);
    });
  });
  describe("on messages", () => {
    test("returns unset defaults", () => {
      const exp: PlainMessage<MessageFieldMessage> = {
        messageField: undefined,
        repeatedMessageField: [],
      };
      const act = toPlainMessage(new MessageFieldMessage(exp));
      expect(act).toEqual(exp);
      expectPlainObject(act);
    });
    test("returns set fields", () => {
      const exp: PlainMessage<MessageFieldMessage> = {
        messageField: { name: "" },
        repeatedMessageField: [{ name: "" }],
      };
      const act = toPlainMessage(new MessageFieldMessage(exp));
      expect(act).toEqual(exp);
      expectPlainObject(act);
    });
  });
});

function describeToPlainMessage(testBlock: () => void) {
  describe("toPlainMessage", () => {
    describe("with structuredClone", () => {
      if (typeof structuredClone !== "function")
        throw new Error("structuredClone is not available");
      testBlock();
    });
    describe("without structuredClone", () => {
      const structuredCloneCopy = global.structuredClone;
      beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
        delete (global as any).structuredClone;
      });
      afterEach(() => {
        global.structuredClone = structuredCloneCopy;
      });
      testBlock();
    });
  });
}

function expectPlainObject(value: unknown) {
  expect(Object.getPrototypeOf(value)).toEqual(Object.prototype);
}
