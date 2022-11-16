// Copyright 2021-2022 Buf Technologies, Inc.
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

import { MapsMessage as TS_MapsMessage } from "./gen/ts/extra/msg-maps_pb.js";
import { MapsMessage as JS_MapsMessage } from "./gen/js/extra/msg-maps_pb.js";
import { MessageFieldMessage as TS_MessageFieldMessage } from "./gen/ts/extra/msg-message_pb.js";
import { MessageFieldMessage as JS_MessageFieldMessage } from "./gen/js/extra/msg-message_pb.js";
import { ScalarValuesMessage as TS_ScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb.js";
import { ScalarValuesMessage as JS_ScalarValuesMessage } from "./gen/js/extra/msg-scalar_pb.js";
import { describeMT } from "./helpers.js";

describe("equals", function () {
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
    }
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
    }
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
          })
        )
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
          })
        )
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
          })
        )
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
          })
        )
      ).toBeFalsy();
    });
  });
});
