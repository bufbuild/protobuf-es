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

import { describe, expect, test } from "@jest/globals";
import {
  create,
  setExtension,
  getExtension,
  toBinary,
  fromBinary,
} from "@bufbuild/protobuf";
import type { MessageInitShape } from "@bufbuild/protobuf";
import {
  RepeatedScalarValuesMessageDesc,
  ScalarValuesMessageDesc,
} from "./gen/ts/extra/msg-scalar_pb.js";
import { protoInt64 } from "@bufbuild/protobuf";
import { MapsMessageDesc } from "./gen/ts/extra/msg-maps_pb.js";
import { MessageFieldMessageDesc } from "./gen/ts/extra/msg-message_pb.js";
import type { DescMessage } from "@bufbuild/protobuf";

import {
  Proto2ExtendeeDesc,
  string_ext,
} from "./gen/ts/extra/extensions-proto2_pb.js";
import { OneofMessageDesc } from "./gen/ts/extra/msg-oneof_pb.js";
import { JsonNamesMessageDesc } from "./gen/ts/extra/msg-json-names_pb.js";
import { JSTypeProto2NormalMessageDesc } from "./gen/ts/extra/jstype-proto2_pb.js";
import { StructDesc, ValueDesc } from "@bufbuild/protobuf/wkt";

describe(`binary serialization`, () => {
  testBinary(ScalarValuesMessageDesc, {
    doubleField: 0.75,
    floatField: -0.75,
    int64Field: protoInt64.parse(-1),
    uint64Field: protoInt64.uParse(1),
    int32Field: -123,
    fixed64Field: protoInt64.uParse(1),
    fixed32Field: 123,
    boolField: true,
    stringField: "hello world",
    bytesField: new Uint8Array([
      104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
    ]),
    uint32Field: 123,
    sfixed32Field: -123,
    sfixed64Field: protoInt64.parse(-1),
    sint32Field: -1,
    sint64Field: protoInt64.parse(-1),
  });
  testBinary(RepeatedScalarValuesMessageDesc, {
    doubleField: [0.75, 0, 1],
    floatField: [0.75, -0.75],
    int64Field: [protoInt64.parse(-1), protoInt64.parse(-2)],
    uint64Field: [protoInt64.uParse(1), protoInt64.uParse(2)],
    int32Field: [-123, 500],
    fixed64Field: [protoInt64.uParse(1), protoInt64.uParse(99)],
    fixed32Field: [123, 999],
    boolField: [true, false, true],
    stringField: ["hello", "world"],
    bytesField: [
      new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
    ],
    uint32Field: [123, 123],
    sfixed32Field: [-123, -123, -123],
    sfixed64Field: [
      protoInt64.parse(-1),
      protoInt64.parse(-2),
      protoInt64.parse(100),
    ],
    sint32Field: [-1, -2, 999],
    sint64Field: [
      protoInt64.parse(-1),
      protoInt64.parse(-99),
      protoInt64.parse(99),
    ],
  });
  testBinary(MessageFieldMessageDesc, {
    messageField: { name: "test" },
    repeatedMessageField: [{ name: "a" }, { name: "b" }],
  });
  testBinary(MapsMessageDesc, {
    strStrField: { a: "str", b: "xx" },
    strInt32Field: { a: 123, b: 455 },
    strInt64Field: { a: protoInt64.parse(123) },
    strBoolField: { a: true, b: false },
    strBytesField: {
      a: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
    },
    int32StrField: { 123: "hello" },
    int64StrField: { "9223372036854775807": "hello" },
    boolStrField: { true: "yes", false: "no" },
    strMsgField: {
      a: {},
    },
    int32MsgField: {
      "32": {},
    },
    int64MsgField: {
      "64": {},
    },
    strEnuField: { a: 0, b: 1, c: 2 },
    int32EnuField: { 1: 0, 2: 1, 0: 2 },
    int64EnuField: { "-1": 0, "2": 1, "0": 2 },
  });
  testBinary(OneofMessageDesc, {
    message: {
      case: "foo",
      value: {
        name: "max",
        toggle: false,
      },
    },
    scalar: { case: undefined },
    enum: { case: undefined },
  });
  testBinary(JsonNamesMessageDesc, {
    a: "a",
    b: "b",
    c: "c",
  });
  testBinary(JSTypeProto2NormalMessageDesc, {
    fixed64Field: protoInt64.uParse(123),
    int64Field: protoInt64.parse(123),
    sfixed64Field: protoInt64.parse(123),
    sint64Field: protoInt64.parse(123),
    uint64Field: protoInt64.uParse(123),
    repeatedFixed64Field: [protoInt64.uParse(123)],
    repeatedInt64Field: [protoInt64.parse(123)],
    repeatedSfixed64Field: [protoInt64.parse(123)],
    repeatedSint64Field: [protoInt64.parse(123)],
    repeatedUint64Field: [protoInt64.uParse(123)],
  });
  testBinary(StructDesc, {
    fields: {
      a: { kind: { case: "numberValue", value: 123 } },
      b: { kind: { case: "stringValue", value: "abc" } },
    },
  });
  describe("Value", () => {
    testBinary(ValueDesc, {
      kind: { case: "boolValue", value: true },
    });
    describe("Value with Struct field", () => {
      testBinary(ValueDesc, {
        kind: {
          case: "structValue",
          value: {
            fields: {
              foo: { kind: { case: "numberValue", value: 1 } },
            },
          },
        },
      });
    });
  });
  describe("extensions", () => {
    test("encode and decode an extension", () => {
      const extendee = create(Proto2ExtendeeDesc);
      setExtension(extendee, string_ext, "foo");
      expect(
        getExtension(
          fromBinary(
            Proto2ExtendeeDesc,
            toBinary(Proto2ExtendeeDesc, extendee),
          ),
          string_ext,
        ),
      ).toEqual("foo");
    });
  });
});

function testBinary<Desc extends DescMessage>(
  desc: Desc,
  init: MessageInitShape<Desc>,
) {
  test(desc.typeName, () => {
    const msg = create(desc, init);
    expect(fromBinary(desc, toBinary(desc, msg))).toStrictEqual(msg);
  });
}
