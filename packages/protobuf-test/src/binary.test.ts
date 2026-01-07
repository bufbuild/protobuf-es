// Copyright 2021-2026 Buf Technologies, Inc.
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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import {
  create,
  setExtension,
  getExtension,
  toBinary,
  fromBinary,
} from "@bufbuild/protobuf";
import {
  type MessageInitShape,
  type DescMessage,
  protoInt64,
} from "@bufbuild/protobuf";
import { StructSchema, ValueSchema } from "@bufbuild/protobuf/wkt";
import {
  RepeatedScalarValuesMessageSchema,
  ScalarValuesMessageSchema,
} from "./gen/ts/extra/msg-scalar_pb.js";
import {
  MapsMessageBug1183Schema,
  MapsMessageSchema,
} from "./gen/ts/extra/msg-maps_pb.js";
import { MessageFieldMessageSchema } from "./gen/ts/extra/msg-message_pb.js";
import {
  Proto2ExtendeeSchema,
  string_ext,
} from "./gen/ts/extra/extensions-proto2_pb.js";
import { OneofMessageSchema } from "./gen/ts/extra/msg-oneof_pb.js";
import { JsonNamesMessageSchema } from "./gen/ts/extra/msg-json-names_pb.js";
import { JSTypeProto2NormalMessageSchema } from "./gen/ts/extra/jstype-proto2_pb.js";

void suite(`binary serialization`, () => {
  testBinary(ScalarValuesMessageSchema, {
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
  testBinary(RepeatedScalarValuesMessageSchema, {
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
  testBinary(MessageFieldMessageSchema, {
    messageField: { name: "test" },
    repeatedMessageField: [{ name: "a" }, { name: "b" }],
  });
  testBinary(MapsMessageSchema, {
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
  void test(MapsMessageBug1183Schema.typeName, () => {
    const str128bytes = "x".repeat(128);
    const msg = create(MapsMessageBug1183Schema, {
      map: {
        [str128bytes]: 1,
      },
    });
    const bytes = toBinary(MapsMessageBug1183Schema, msg);
    const msg2 = fromBinary(MapsMessageBug1183Schema, bytes);
    assert.deepStrictEqual(msg2.map, {
      [str128bytes]: 1,
    });
    assert.strictEqual(msg2.$unknown, undefined);
  });
  testBinary(OneofMessageSchema, {
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
  testBinary(JsonNamesMessageSchema, {
    a: "a",
    b: "b",
    c: "c",
  });
  testBinary(JSTypeProto2NormalMessageSchema, {
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
  testBinary(StructSchema, {
    fields: {
      a: { kind: { case: "numberValue", value: 123 } },
      b: { kind: { case: "stringValue", value: "abc" } },
    },
  });
  void suite("Value", () => {
    testBinary(ValueSchema, {
      kind: { case: "boolValue", value: true },
    });
    void suite("Value with Struct field", () => {
      testBinary(ValueSchema, {
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
  void suite("extensions", () => {
    void test("encode and decode an extension", () => {
      const extendee = create(Proto2ExtendeeSchema);
      setExtension(extendee, string_ext, "foo");
      assert.strictEqual(
        getExtension(
          fromBinary(
            Proto2ExtendeeSchema,
            toBinary(Proto2ExtendeeSchema, extendee),
          ),
          string_ext,
        ),
        "foo",
      );
    });
  });
  void test("error for invalid data", () => {
    const msg = create(ScalarValuesMessageSchema, {
      uint32Field: -1, // -1 is invalid for a uint
    });
    assert.throws(() => toBinary(ScalarValuesMessageSchema, msg), {
      name: "Error",
      message:
        "cannot encode field spec.ScalarValuesMessage.uint32_field to binary: invalid uint32: -1",
    });
  });
});

function testBinary<Desc extends DescMessage>(
  desc: Desc,
  init: MessageInitShape<Desc>,
) {
  void test(desc.typeName, () => {
    const msg = create(desc, init);
    assert.deepStrictEqual(fromBinary(desc, toBinary(desc, msg)), msg);
  });
}
