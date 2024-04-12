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
  toJson,
  fromJson,
  setExtension,
  getExtension,
} from "@bufbuild/protobuf/next";
import type { MessageInitShape } from "@bufbuild/protobuf/next";
import {
  RepeatedScalarValuesMessageDesc,
  ScalarValuesMessageDesc,
} from "../gen/ts/extra/msg-scalar_pbv2.js";
import { protoInt64 } from "@bufbuild/protobuf";
import { MapsMessageDesc } from "../gen/ts/extra/msg-maps_pbv2.js";
import { MessageFieldMessageDesc } from "../gen/ts/extra/msg-message_pbv2.js";
import { WrappersMessageDesc } from "../gen/ts/extra/wkt-wrappers_pbv2.js";
import {
  AnyDesc,
  StructDesc,
  ValueDesc,
  anyPack,
} from "@bufbuild/protobuf/next/wkt";
import type { DescMessage, JsonValue } from "@bufbuild/protobuf";
import { createDescSet } from "@bufbuild/protobuf/next/reflect";

import {
  Proto2ExtendeeDesc,
  string_ext,
} from "../gen/ts/extra/extensions-proto2_pbv2.js";
import { OneofMessageDesc } from "../gen/ts/extra/msg-oneof_pbv2.js";
import { JsonNamesMessageDesc } from "../gen/ts/extra/msg-json-names_pbv2.js";
import { JSTypeProto2NormalMessageDesc } from "../gen/ts/extra/jstype-proto2_pbv2.js";

describe(`json serialization`, () => {
  testJson(
    ScalarValuesMessageDesc,
    {
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
    },
    {
      doubleField: 0.75,
      floatField: -0.75,
      int64Field: "-1",
      uint64Field: "1",
      int32Field: -123,
      fixed64Field: "1",
      fixed32Field: 123,
      boolField: true,
      stringField: "hello world",
      bytesField: "aGVsbG8gd29ybGQ=",
      uint32Field: 123,
      sfixed32Field: -123,
      sfixed64Field: "-1",
      sint32Field: -1,
      sint64Field: "-1",
    },
  );
  testJson(
    RepeatedScalarValuesMessageDesc,
    {
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
    },
    {
      doubleField: [0.75, 0, 1],
      floatField: [0.75, -0.75],
      int64Field: ["-1", "-2"],
      uint64Field: ["1", "2"],
      int32Field: [-123, 500],
      fixed64Field: ["1", "99"],
      fixed32Field: [123, 999],
      boolField: [true, false, true],
      stringField: ["hello", "world"],
      bytesField: ["aGVsbG8gd29ybGQ="],
      uint32Field: [123, 123],
      sfixed32Field: [-123, -123, -123],
      sfixed64Field: ["-1", "-2", "100"],
      sint32Field: [-1, -2, 999],
      sint64Field: ["-1", "-99", "99"],
    },
  );
  testJson(
    MessageFieldMessageDesc,
    {
      messageField: { name: "test" },
      repeatedMessageField: [{ name: "a" }, { name: "b" }],
    },
    {
      messageField: { name: "test" },
      repeatedMessageField: [{ name: "a" }, { name: "b" }],
    },
  );
  testJson(
    MapsMessageDesc,
    {
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
    },
    {
      strStrField: { a: "str", b: "xx" },
      strInt32Field: { a: 123, b: 455 },
      strInt64Field: { a: "123" },
      strBoolField: { a: true, b: false },
      strBytesField: { a: "aGVsbG8gd29ybGQ=" },
      int32StrField: { "123": "hello" },
      int64StrField: { "9223372036854775807": "hello" },
      boolStrField: { true: "yes", false: "no" },
      strMsgField: { a: {} },
      int32MsgField: { "32": {} },
      int64MsgField: { "64": {} },
      strEnuField: {
        a: "MAPS_ENUM_ANY",
        b: "MAPS_ENUM_YES",
        c: "MAPS_ENUM_NO",
      },
      int32EnuField: {
        "0": "MAPS_ENUM_NO",
        "1": "MAPS_ENUM_ANY",
        "2": "MAPS_ENUM_YES",
      },
      int64EnuField: {
        "0": "MAPS_ENUM_NO",
        "2": "MAPS_ENUM_YES",
        "-1": "MAPS_ENUM_ANY",
      },
    },
  );
  testJson(
    OneofMessageDesc,
    {
      message: {
        case: "foo",
        value: {
          name: "max",
          toggle: false,
        },
      },
      scalar: { case: undefined },
      enum: { case: undefined },
    },
    {
      foo: { name: "max" },
    },
  );
  testJson(
    JsonNamesMessageDesc,
    {
      a: "a",
      b: "b",
      c: "c",
    },
    { "@type": "c", "": "b", a: "a" },
  );
  testJson(
    JSTypeProto2NormalMessageDesc,
    {
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
    },
    {
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
    },
  );
  describe("wkt", () => {
    testJson(
      WrappersMessageDesc,
      {
        doubleValueField: 1.2,
        boolValueField: true,
        floatValueField: 1.3,
        int64ValueField: protoInt64.parse(4),
        uint64ValueField: protoInt64.parse(5),
        int32ValueField: 6,
        uint32ValueField: 7,
        stringValueField: "a",
        // TODO: uncomment this once it is fixed.
        // bytesValueField: new Uint8Array([
        //   104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
        // ]),
      },
      {
        doubleValueField: 1.2,
        boolValueField: true,
        floatValueField: 1.3,
        int64ValueField: "4",
        uint64ValueField: "5",
        int32ValueField: 6,
        uint32ValueField: 7,
        stringValueField: "a",
        // TODO: uncomment this once it is fixed.
        // bytesField: "aGVsbG8gd29ybGQ=",
      },
    );
    describe("Any", () => {
      test("without value encodes to JSON {}", () => {
        const any = create(AnyDesc);
        expect(toJson(AnyDesc, any)).toStrictEqual({});
      });
      test(`encodes ${ValueDesc.typeName} with ${StructDesc.typeName} to JSON`, () => {
        const any = anyPack(
          ValueDesc,
          create(ValueDesc, {
            kind: {
              case: "structValue",
              value: {
                fields: {
                  foo: { kind: { case: "numberValue", value: 1 } },
                },
              },
            },
          }),
        );
        expect(
          toJson(AnyDesc, any, {
            descSet: createDescSet(ValueDesc, StructDesc),
          }),
        ).toStrictEqual({
          "@type": "type.googleapis.com/google.protobuf.Value",
          value: {
            foo: 1,
          },
        });
      });
      test("json_name clash with Any.@type is not prevented", () => {
        const any = anyPack(
          JsonNamesMessageDesc,
          create(JsonNamesMessageDesc, { a: "a", b: "b", c: "c" }),
        );
        const got = toJson(AnyDesc, any, {
          descSet: createDescSet(JsonNamesMessageDesc),
        });
        expect(got).toStrictEqual({
          "@type": "type.googleapis.com/spec.JsonNamesMessage",
          "": "b",
          a: "a",
        });
      });
    });
  });
  // TODO: Add tests for remaining WKT.
  describe("extensions", () => {
    test("encode and decode an extension", () => {
      const extendee = create(Proto2ExtendeeDesc);
      setExtension(extendee, string_ext, "foo");
      const jsonOpts = { descSet: createDescSet(string_ext) };
      expect(
        getExtension(
          fromJson(
            Proto2ExtendeeDesc,
            toJson(Proto2ExtendeeDesc, extendee, jsonOpts),
            jsonOpts,
          ),
          string_ext,
        ),
      ).toEqual("foo");
    });
  });
});

function testJson<Desc extends DescMessage>(
  desc: DescMessage,
  init: MessageInitShape<Desc>,
  json: JsonValue,
) {
  test(`should work for ${desc.typeName}`, () => {
    const msg = create(desc, init);
    expect(toJson(desc, msg)).toStrictEqual(json);
    expect(fromJson(desc, json)).toStrictEqual(msg);
  });
}
