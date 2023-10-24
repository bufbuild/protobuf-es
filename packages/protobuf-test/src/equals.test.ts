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

import { beforeEach, describe, expect, test } from "@jest/globals";
import { MapsMessage as TS_MapsMessage } from "./gen/ts/extra/msg-maps_pb.js";
import { MapsMessage as JS_MapsMessage } from "./gen/js/extra/msg-maps_pb.js";
import { MessageFieldMessage as TS_MessageFieldMessage } from "./gen/ts/extra/msg-message_pb.js";
import { MessageFieldMessage as JS_MessageFieldMessage } from "./gen/js/extra/msg-message_pb.js";
import { ScalarValuesMessage as TS_ScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb.js";
import { ScalarValuesMessage as JS_ScalarValuesMessage } from "./gen/js/extra/msg-scalar_pb.js";
import { OneofMessage as TS_OneofMessage } from "./gen/ts/extra/msg-oneof_pb.js";
import { OneofMessage as JS_OneofMessage } from "./gen/js/extra/msg-oneof_pb.js";
import { JSTypeStringMessage as TS_JSTypeStringMessage } from "./gen/ts/extra/jstype_pb.js";
import { JSTypeStringMessage as JS_JSTypeStringMessage } from "./gen/js/extra/jstype_pb.js";
import { JSTypeProto2StringMessage as TS_JSTypeProto2StringMessage } from "./gen/ts/extra/jstype-proto2_pb.js";
import { JSTypeProto2StringMessage as JS_JSTypeProto2StringMessage } from "./gen/js/extra/jstype-proto2_pb.js";
import { describeMT } from "./helpers.js";

describe("equals", function () {
  describeMT(
    { ts: TS_JSTypeProto2StringMessage, js: JS_JSTypeProto2StringMessage },
    (messageType) => {
      let a: TS_JSTypeProto2StringMessage | JS_JSTypeProto2StringMessage,
        b: TS_JSTypeProto2StringMessage | JS_JSTypeProto2StringMessage;
      beforeEach(() => {
        a = new messageType({
          fixed64Field: "123",
          int64Field: "123",
          sfixed64Field: "123",
          sint64Field: "123",
          uint64Field: "123",
          repeatedFixed64Field: ["123"],
          repeatedInt64Field: ["123"],
          repeatedSfixed64Field: ["123"],
          repeatedSint64Field: ["123"],
          repeatedUint64Field: ["123"],
        });
        b = new messageType({
          fixed64Field: "123",
          int64Field: "123",
          sfixed64Field: "123",
          sint64Field: "123",
          uint64Field: "123",
          repeatedFixed64Field: ["123"],
          repeatedInt64Field: ["123"],
          repeatedSfixed64Field: ["123"],
          repeatedSint64Field: ["123"],
          repeatedUint64Field: ["123"],
        });
      });
      test("same are equal", () => {
        expect(a).toStrictEqual(b);
        expect(a.equals(b)).toBeTruthy();
      });
      test("changed are not equal", () => {
        a.int64Field = undefined;
        expect(a).not.toStrictEqual(b);
        expect(a.equals(b)).toBeFalsy();
      });
    },
  );

  describeMT(
    { ts: TS_JSTypeStringMessage, js: JS_JSTypeStringMessage },
    (messageType) => {
      let a: TS_JSTypeStringMessage | JS_JSTypeStringMessage,
        b: TS_JSTypeStringMessage | JS_JSTypeStringMessage;
      beforeEach(() => {
        a = new messageType({
          fixed64Field: "123",
          int64Field: "123",
          sfixed64Field: "123",
          sint64Field: "123",
          uint64Field: "123",
          repeatedFixed64Field: ["123"],
          repeatedInt64Field: ["123"],
          repeatedSfixed64Field: ["123"],
          repeatedSint64Field: ["123"],
          repeatedUint64Field: ["123"],
        });
        b = new messageType({
          fixed64Field: "123",
          int64Field: "123",
          sfixed64Field: "123",
          sint64Field: "123",
          uint64Field: "123",
          repeatedFixed64Field: ["123"],
          repeatedInt64Field: ["123"],
          repeatedSfixed64Field: ["123"],
          repeatedSint64Field: ["123"],
          repeatedUint64Field: ["123"],
        });
      });
      test("same are equal", () => {
        expect(a).toStrictEqual(b);
        expect(a.equals(b)).toBeTruthy();
      });
      test("changed are not equal", () => {
        a.int64Field = "456";
        expect(a).not.toStrictEqual(b);
        expect(a.equals(b)).toBeFalsy();
      });
    },
  );

  describeMT({ ts: TS_OneofMessage, js: JS_OneofMessage }, (messageType) => {
    test("oneof scalars are equal", () => {
      const a = new messageType({ scalar: { case: "value", value: 1 } });
      const b = new messageType({ scalar: { case: "value", value: 1 } });
      expect(a).toStrictEqual(b);
      expect(a.equals(b)).toBeTruthy();
    });

    test("oneof scalars are not equal", () => {
      const a = new messageType({ scalar: { case: "value", value: 1 } });
      const b = new messageType({ scalar: { case: "value", value: 2 } });
      expect(a).not.toStrictEqual(b);
      expect(a.equals(b)).toBeFalsy();
    });

    test("oneof messages are equal", () => {
      const a = new messageType({
        message: { case: "foo", value: { name: "a" } },
      });
      const b = new messageType({
        message: { case: "foo", value: { name: "a" } },
      });
      expect(a).toStrictEqual(b);
      expect(a.equals(b)).toBeTruthy();
    });

    test("oneof messages are not equal", () => {
      const a = new messageType({
        message: { case: "foo", value: { name: "a" } },
      });
      const b = new messageType({
        message: { case: "foo", value: { name: "b" } },
      });
      expect(a).not.toStrictEqual(b);
      expect(a.equals(b)).toBeFalsy();
    });

    test("oneof messages are different", () => {
      const a = new messageType({
        message: { case: "foo", value: { name: "a" } },
      });
      const b = new messageType({
        message: { case: "bar", value: { a: 1 } },
      });
      expect(a).not.toStrictEqual(b);
      expect(a.equals(b)).toBeFalsy();
    });

    test("oneof enums are equal", () => {
      const a = new messageType({ enum: { case: "e", value: 1 } });
      const b = new messageType({ enum: { case: "e", value: 1 } });
      expect(a).toStrictEqual(b);
      expect(a.equals(b)).toBeTruthy();
    });

    test("oneof enums are not equal", () => {
      const a = new messageType({ enum: { case: "e", value: 1 } });
      const b = new messageType({ enum: { case: "e", value: 2 } });
      expect(a).not.toStrictEqual(b);
      expect(a.equals(b)).toBeFalsy();
    });
  });
  describeMT(
    { ts: TS_MessageFieldMessage, js: JS_MessageFieldMessage },
    (messageType) => {
      let a: TS_MessageFieldMessage | JS_MessageFieldMessage,
        b: TS_MessageFieldMessage | JS_MessageFieldMessage;
      beforeEach(() => {
        a = new messageType({
          messageField: { name: "test" },
          repeatedMessageField: [{ name: "a" }, { name: "b" }],
        });
        b = new messageType({
          messageField: { name: "test" },
          repeatedMessageField: [{ name: "a" }, { name: "b" }],
        });
      });
      test("static nullish equals nullish", () => {
        expect(messageType.equals(undefined, undefined)).toBeTruthy();
        expect(messageType.equals(null, null)).toBeTruthy();
      });
      test("same are equal", () => {
        expect(a).toStrictEqual(b);
        expect(a.equals(b)).toBeTruthy();
      });
      test("changed message field field is not equal", () => {
        expect(a.messageField).toBeDefined();
        if (a.messageField !== undefined) {
          a.messageField.name = "changed";
          expect(a).not.toStrictEqual(b);
          expect(a.equals(b)).toBeFalsy();
        }
      });
      test("changed repeated message field field is not equal", () => {
        a.repeatedMessageField[0].name = "changed";
        expect(a.equals(b)).toBeFalsy();
      });
    },
  );

  describeMT(
    { ts: TS_ScalarValuesMessage, js: JS_ScalarValuesMessage },
    (messageType) => {
      let a: TS_ScalarValuesMessage | JS_ScalarValuesMessage,
        b: TS_ScalarValuesMessage | JS_ScalarValuesMessage;
      beforeEach(() => {
        a = new messageType({
          doubleField: 0.75,
          boolField: true,
          stringField: "hello world",
          bytesField: new Uint8Array([
            104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
          ]),
        });
        b = new messageType({
          doubleField: 0.75,
          boolField: true,
          stringField: "hello world",
          bytesField: new Uint8Array([
            104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
          ]),
        });
      });
      test("same are equal", () => {
        expect(a).toStrictEqual(b);
        expect(a.equals(b)).toBeTruthy();
      });
      test("changed string field is not equal", () => {
        a.stringField = "changed";
        expect(a).not.toStrictEqual(b);
        expect(a.equals(b)).toBeFalsy();
      });
      test("changed bytes field is not equal", () => {
        a.bytesField.set([0, 1], 0);
        expect(a).not.toStrictEqual(b);
        expect(a.equals(b)).toBeFalsy();
      });
    },
  );

  describeMT({ ts: TS_MapsMessage, js: JS_MapsMessage }, (messageType) => {
    test("different order are equal", () => {
      expect(
        new messageType({
          strMsgField: {
            a: { strStrField: { c: "d", e: "f" } },
          },
        }).equals(
          new messageType({
            strMsgField: {
              a: { strStrField: { e: "f", c: "d" } },
            },
          }),
        ),
      ).toBeTruthy();
    });
    test("added key not equal", () => {
      expect(
        new messageType({
          strMsgField: {
            a: {},
          },
        }).equals(
          new messageType({
            strMsgField: {
              a: {},
              b: {},
            },
          }),
        ),
      ).toBeFalsy();
    });
    test("removed key not equal", () => {
      expect(
        new messageType({
          strMsgField: {
            a: { strStrField: { c: "d", e: "f" } },
          },
        }).equals(
          new messageType({
            strMsgField: {
              a: { strStrField: { c: "d" } },
            },
          }),
        ),
      ).toBeFalsy();
    });
    test("changed value not equal", () => {
      expect(
        new messageType({
          strMsgField: {
            a: { strStrField: { c: "d" } },
          },
        }).equals(
          new messageType({
            strMsgField: {
              a: { strStrField: { c: "e" } },
            },
          }),
        ),
      ).toBeFalsy();
    });
  });
});
