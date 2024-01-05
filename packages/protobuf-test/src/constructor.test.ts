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

import { describe, expect } from "@jest/globals";
import {
  TestAllTypesProto3 as TS_TestAllTypesProto3,
  TestAllTypesProto3_NestedMessage as TS_TestAllTypesProto3_NestedMessage,
} from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import { TestAllTypesProto3 as JS_TestAllTypesProto3 } from "./gen/js/google/protobuf/test_messages_proto3_pb.js";
import { JSTypeStringMessage as TS_JSTypeStringMessage } from "./gen/ts/extra/jstype_pb.js";
import { JSTypeStringMessage as JS_JSTypeStringMessage } from "./gen/js/extra/jstype_pb.js";
import { testMT } from "./helpers.js";

describe("constructor initializes jstype=JS_STRING with string", function () {
  testMT(
    { ts: TS_JSTypeStringMessage, js: JS_JSTypeStringMessage },
    (messageType) => {
      const m = new messageType({
        fixed64Field: "123",
        repeatedFixed64Field: ["123"],
      });
      expect(m.fixed64Field).toBe("123");
      expect(m.int64Field).toBe("0");
      expect(m.sfixed64Field).toBe("0");
      expect(m.sint64Field).toBe("0");
      expect(m.uint64Field).toBe("0");
      expect(m.repeatedFixed64Field.length).toBe(1);
      expect(m.repeatedFixed64Field).toStrictEqual(["123"]);
      expect(m.repeatedInt64Field.length).toBe(0);
      expect(m.repeatedSfixed64Field.length).toBe(0);
      expect(m.repeatedSint64Field.length).toBe(0);
      expect(m.repeatedUint64Field.length).toBe(0);
    },
  );
});

describe("constructor takes message partial for message field", function () {
  testMT(
    { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
    (messageType) => {
      const m = new messageType({
        recursiveMessage: {
          optionalInt32: 123,
        },
      });
      expect(m.recursiveMessage?.optionalInt32).toBe(123);
    },
  );
});

describe("constructor takes message instance for message field", function () {
  testMT(
    { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
    (messageType) => {
      const m = new messageType({
        recursiveMessage: new messageType({
          optionalInt32: 123,
        }),
      });
      expect(m.recursiveMessage?.optionalInt32).toBe(123);
    },
  );
});

describe("constructor takes partial message for oneof field", function () {
  testMT(
    { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
    (messageType) => {
      const m = new messageType({
        oneofField: {
          case: "oneofNestedMessage",
          value: {
            corecursive: {
              optionalInt32: 123,
            },
          },
        },
      });
      expect(m.oneofField.case).toBe("oneofNestedMessage");
      if (m.oneofField.case === "oneofNestedMessage") {
        expect(m.oneofField.value.a).toBe(0);
        expect(m.oneofField.value.corecursive).not.toBeUndefined();
        expect(m.oneofField.value.corecursive?.optionalInt32).toBe(123);
      }
    },
  );
});

describe("constructor takes partial message for map value", function () {
  testMT(
    { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
    (messageType) => {
      const m = new messageType({
        mapStringNestedMessage: {
          key: {
            corecursive: {
              optionalInt32: 123,
            },
          },
        },
      });
      expect(m.mapStringNestedMessage["key"]).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (m.mapStringNestedMessage["key"] !== undefined) {
        expect(m.mapStringNestedMessage["key"].a).toBe(0);
        expect(m.mapStringNestedMessage["key"].corecursive).not.toBeUndefined();
        expect(m.mapStringNestedMessage["key"].corecursive?.optionalInt32).toBe(
          123,
        );
      }
    },
  );
  testMT(
    { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
    (messageType) => {
      const t = new messageType({
        optionalNestedMessage: {
          a: 123,
          corecursive: {
            optionalNestedMessage: {
              a: 456,
              corecursive: {
                optionalNestedMessage: {},
              },
            },
          },
        },
        repeatedNestedMessage: [
          {
            a: 123,
            corecursive: {
              repeatedNestedMessage: [
                {
                  a: 456,
                  corecursive: {
                    repeatedNestedMessage: [{}],
                  },
                },
              ],
            },
          },
        ],
        mapStringString: {
          a: "A",
        },
        oneofField: {
          case: "oneofNestedMessage",
          value: new TS_TestAllTypesProto3_NestedMessage(),
        },
      });
      expect(t.optionalNestedMessage?.a).toBe(123);
      expect(
        t.optionalNestedMessage?.corecursive?.optionalNestedMessage?.a,
      ).toBe(456);
      expect(
        t.optionalNestedMessage?.corecursive?.optionalNestedMessage?.corecursive
          ?.optionalNestedMessage?.a,
      ).toBe(0);
      expect(t.repeatedNestedMessage.length).toBe(1);
      expect(t.repeatedNestedMessage[0]?.a).toBe(123);
      expect(
        t.repeatedNestedMessage[0]?.corecursive?.repeatedNestedMessage[0]?.a,
      ).toBe(456);
      expect(
        t.repeatedNestedMessage[0]?.corecursive?.repeatedNestedMessage[0]
          ?.corecursive?.repeatedNestedMessage[0]?.a,
      ).toBe(0);
    },
  );
});
