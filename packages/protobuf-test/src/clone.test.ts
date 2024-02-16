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

import { describe, test, expect } from "@jest/globals";
import { describeMT, testMT } from "./helpers.js";
import { BoolValue, isFieldSet, protoInt64 } from "@bufbuild/protobuf";
import { Proto2Enum } from "./gen/ts/extra/proto2_pb.js";
import { Proto3Enum } from "./gen/ts/extra/proto3_pb.js";
import { MessageFieldMessage as TS_MessageFieldMessage } from "./gen/ts/extra/msg-message_pb.js";
import { MessageFieldMessage as JS_MessageFieldMessage } from "./gen/js/extra/msg-message_pb.js";
import {
  RepeatedScalarValuesMessage as TS_RepeatedScalarValuesMessage,
  ScalarValuesMessage as TS_ScalarValuesMessage,
} from "./gen/ts/extra/msg-scalar_pb.js";
import {
  RepeatedScalarValuesMessage as JS_RepeatedScalarValuesMessage,
  ScalarValuesMessage as JS_ScalarValuesMessage,
} from "./gen/js/extra/msg-scalar_pb.js";
import { WrappersMessage as TS_WrappersMessage } from "./gen/ts/extra/wkt-wrappers_pb.js";
import { WrappersMessage as JS_WrappersMessage } from "./gen/js/extra/wkt-wrappers_pb.js";
import { Proto2OptionalMessage as TS_Proto2OptionalMessage } from "./gen/ts/extra/proto2_pb.js";
import { Proto2OptionalMessage as JS_Proto2OptionalMessage } from "./gen/js/extra/proto2_pb.js";
import { Proto3UnlabelledMessage as TS_Proto3UnlabelledMessage } from "./gen/ts/extra/proto3_pb.js";
import { Proto3UnlabelledMessage as JS_Proto3UnlabelledMessage } from "./gen/js/extra/proto3_pb.js";
import { Proto3OptionalMessage as TS_Proto3OptionalMessage } from "./gen/ts/extra/proto3_pb.js";
import { Proto3OptionalMessage as JS_Proto3OptionalMessage } from "./gen/js/extra/proto3_pb.js";

/* eslint-disable @typescript-eslint/ban-ts-comment */

describe("clone", function () {
  testMT(
    { ts: TS_MessageFieldMessage, js: JS_MessageFieldMessage },
    (messageType) => {
      const a = new messageType({
        messageField: { name: "test" },
        repeatedMessageField: [{ name: "a" }, { name: "b" }],
      });
      const b = a.clone();
      expect(b).toStrictEqual(a);
      expect(b.messageField).toBeDefined();
      if (b.messageField !== undefined) {
        b.messageField.name = "123";
      }
      expect(b.messageField?.name).not.toBe(a.messageField?.name);
    },
  );

  testMT(
    { ts: TS_ScalarValuesMessage, js: JS_ScalarValuesMessage },
    (messageType) => {
      const a = new messageType({
        doubleField: 0.75,
        floatField: -0.75,
        // @ts-expect-error TS2737
        int64Field: -1n,
        // @ts-expect-error TS2737
        uint64Field: 1n,
        int32Field: -123,
        // @ts-expect-error TS2737
        fixed64Field: 1n,
        fixed32Field: 123,
        boolField: true,
        stringField: "hello world",
        bytesField: new Uint8Array([
          104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
        ]),
        uint32Field: 123,
        sfixed32Field: -123,
        // @ts-expect-error TS2737
        sfixed64Field: -1n,
        sint32Field: -1,
        // @ts-expect-error TS2737
        sint64Field: -1n,
      });
      const b = a.clone();
      expect(b).toStrictEqual(a);
      a.stringField = "123";
      expect(b.stringField).not.toBe(a.stringField);
      const c = a.clone();
      c.bytesField.set([0, 1], 0);
      expect(c.bytesField).not.toStrictEqual(a.bytesField);
    },
  );

  testMT(
    { ts: TS_RepeatedScalarValuesMessage, js: JS_RepeatedScalarValuesMessage },
    (messageType) => {
      const a = new messageType({
        doubleField: [0.75, 0, 1],
        floatField: [0.75, -0.75],
        // @ts-expect-error TS2737
        int64Field: [-1n, -2n],
        // @ts-expect-error TS2737
        uint64Field: [1n, 2n],
        int32Field: [-123, 500],
        // @ts-expect-error TS2737
        fixed64Field: [1n, 99n],
        fixed32Field: [123, 999],
        boolField: [true, false, true],
        stringField: ["hello", "world"],
        bytesField: [
          new Uint8Array([
            104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
          ]),
        ],
        uint32Field: [123, 123],
        sfixed32Field: [-123, -123, -123],
        // @ts-expect-error TS2737
        sfixed64Field: [-1n, -2n, 100n],
        sint32Field: [-1, -2, 999],
        // @ts-expect-error TS2737
        sint64Field: [-1n, -99n, 99n],
      });
      const b = a.clone();
      expect(b).toStrictEqual(a);
      a.doubleField.push(1.2);
      expect(b.doubleField).not.toBe(a.doubleField);
    },
  );

  testMT({ ts: TS_WrappersMessage, js: JS_WrappersMessage }, (messageType) => {
    const a = new messageType({
      doubleValueField: 1.2,
      boolValueField: true,
      floatValueField: 1.3,
      int64ValueField: protoInt64.parse(4),
      uint64ValueField: protoInt64.parse(5),
      int32ValueField: 6,
      uint32ValueField: 7,
      stringValueField: "a",
      bytesValueField: new Uint8Array([0xff]),
      repeatedBoolValueField: [
        new BoolValue({ value: true }),
        new BoolValue({ value: false }),
      ],
      mapBoolValueField: {
        foo: new BoolValue({ value: true }),
        bar: new BoolValue({ value: false }),
      },
    });
    const b = a.clone();
    expect(b).toStrictEqual(a);
    a.doubleValueField = 0.1;
    expect(b.doubleValueField).not.toBe(a.doubleValueField);
  });

  describe("field presence", () => {
    describeMT(
      { ts: TS_Proto2OptionalMessage, js: JS_Proto2OptionalMessage },
      (messageType) => {
        test.each(messageType.fields.byNumber())(
          "cloning set field $name retains presence",
          (field) => {
            const msg = new messageType({
              stringField: "",
              bytesField: new Uint8Array(),
              int32Field: 0,
              int64Field: protoInt64.zero,
              floatField: 0,
              boolField: false,
              enumField: Proto2Enum.YES,
              messageField: {},
            });
            expect(isFieldSet(msg, field)).toBe(true);
            const clone = msg.clone();
            expect(isFieldSet(clone, field)).toBe(true);
          },
        );
        test.each(messageType.fields.byNumber())(
          "cloning unset field $name retains presence",
          (field) => {
            const msg = new messageType();
            expect(isFieldSet(msg, field)).toBe(false);
            const clone = msg.clone();
            expect(isFieldSet(clone, field)).toBe(false);
          },
        );
      },
    );
  });
  describeMT(
    { ts: TS_Proto3OptionalMessage, js: JS_Proto3OptionalMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())(
        "cloning set field $name retains presence",
        (field) => {
          const msg = new messageType({
            stringField: "test",
            bytesField: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            int32Field: 1236,
            int64Field: protoInt64.parse("123456"),
            floatField: 3.13,
            boolField: true,
            enumField: Proto3Enum.YES,
            messageField: {},
          });
          expect(isFieldSet(msg, field)).toBe(true);
          const clone = msg.clone();
          expect(isFieldSet(clone, field)).toBe(true);
        },
      );
      test.each(messageType.fields.byNumber())(
        "cloning unset field $name retains presence",
        (field) => {
          const msg = new messageType();
          expect(isFieldSet(msg, field)).toBe(false);
          const clone = msg.clone();
          expect(isFieldSet(clone, field)).toBe(false);
        },
      );
    },
  );
  describeMT(
    { ts: TS_Proto3UnlabelledMessage, js: JS_Proto3UnlabelledMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())(
        "cloning set field $name retains presence",
        (field) => {
          const msg = new messageType({
            stringField: "test",
            bytesField: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            int32Field: 1236,
            int64Field: protoInt64.parse("123456"),
            floatField: 3.13,
            boolField: true,
            enumField: Proto3Enum.YES,
            messageField: {},
          });
          expect(isFieldSet(msg, field)).toBe(true);
          const clone = msg.clone();
          expect(isFieldSet(clone, field)).toBe(true);
        },
      );
      test.each(messageType.fields.byNumber())(
        "cloning unset field $name retains presence",
        (field) => {
          const msg = new messageType();
          expect(isFieldSet(msg, field)).toBe(false);
          const clone = msg.clone();
          expect(isFieldSet(clone, field)).toBe(false);
        },
      );
    },
  );
});
