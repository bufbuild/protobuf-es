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
  RepeatedScalarValuesMessage as TS_RepeatedScalarValuesMessage,
  ScalarValuesMessage as TS_ScalarValuesMessage,
} from "./gen/ts/extra/msg-scalar_pb.js";
import {
  RepeatedScalarValuesMessage as JS_RepeatedScalarValuesMessage,
  ScalarValuesMessage as JS_ScalarValuesMessage,
} from "./gen/js/extra/msg-scalar_pb.js";
import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { protoInt64, ScalarType } from "@bufbuild/protobuf";
import { describeMT } from "./helpers.js";

describeMT(
  { ts: TS_ScalarValuesMessage, js: JS_ScalarValuesMessage },
  (messageType) => {
    const defaultFields: PlainMessage<
      TS_ScalarValuesMessage | JS_ScalarValuesMessage
    > = {
      doubleField: 0,
      floatField: 0,
      int64Field: protoInt64.parse(0),
      uint64Field: protoInt64.uParse(0),
      int32Field: 0,
      fixed64Field: protoInt64.uParse(0),
      fixed32Field: 0,
      boolField: false,
      stringField: "",
      bytesField: new Uint8Array(0),
      uint32Field: 0,
      sfixed32Field: 0,
      sfixed64Field: protoInt64.parse(0),
      sint32Field: 0,
      sint64Field: protoInt64.parse(0),
    };
    const defaultJson: JsonValue = {};
    const exampleFields: PlainMessage<
      TS_ScalarValuesMessage | JS_ScalarValuesMessage
    > = {
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
    };
    const exampleJson: JsonValue = {
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
    };
    test("has expected defaults", () => {
      const got = { ...new messageType() };
      expect(got).toStrictEqual(defaultFields);
    });
    test("defaults encodes to JSON", () => {
      const got = new messageType().toJson();
      expect(got).toStrictEqual(defaultJson);
    });
    test("defaults decodes from JSON", () => {
      const got = { ...messageType.fromJson(defaultJson) };
      expect(got).toStrictEqual(defaultFields);
    });
    test("example encodes to JSON", () => {
      const got = new messageType(exampleFields).toJson();
      expect(got).toStrictEqual(exampleJson);
    });
    test("example decodes from JSON", () => {
      const got = { ...messageType.fromJson(exampleJson) };
      expect(got).toStrictEqual(exampleFields);
    });
    test("allow number[] for bytes field", () => {
      const bytes = [0xff];
      const got = {
        ...new messageType({
          ...defaultFields,
          bytesField: bytes as any, //eslint-disable-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
        }),
      };
      expect(got).toStrictEqual({
        ...defaultFields,
        bytesField: new Uint8Array(bytes),
      });
    });
    describe("field info", () => {
      test.each(messageType.fields.byNumber())("$name", (field) => {
        expect(typeof field.no).toBe("number");
        expect(typeof field.name).toBe("string");
        expect(typeof field.localName).toBe("string");
        expect(typeof field.jsonName).toBe("string");
        expect(field.repeated).toBe(false);
        expect(field.delimited).toBeFalsy();
        expect(typeof field.packed).toBe("boolean");
        expect(field.oneof).toBeUndefined();
        expect(field.default).toBeUndefined();
        expect(field.opt).toBeFalsy();
        expect(field.kind).toBe("scalar");
        if (field.kind == "scalar") {
          expect(typeof field.T).toBe("number");
          expect(typeof field.L).toBe("number");
        }
      });
    });
  },
);

describeMT(
  { ts: TS_RepeatedScalarValuesMessage, js: JS_RepeatedScalarValuesMessage },
  (messageType) => {
    const defaultFields: PlainMessage<
      TS_RepeatedScalarValuesMessage | JS_RepeatedScalarValuesMessage
    > = {
      doubleField: [],
      floatField: [],
      int64Field: [],
      uint64Field: [],
      int32Field: [],
      fixed64Field: [],
      fixed32Field: [],
      boolField: [],
      stringField: [],
      bytesField: [],
      uint32Field: [],
      sfixed32Field: [],
      sfixed64Field: [],
      sint32Field: [],
      sint64Field: [],
    };
    const defaultJson: JsonValue = {};
    const exampleFields: PlainMessage<
      TS_RepeatedScalarValuesMessage | JS_RepeatedScalarValuesMessage
    > = {
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
    };
    const exampleJson: JsonValue = {
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
    };
    test("has expected defaults", () => {
      const got = { ...new messageType() };
      expect(got).toStrictEqual(defaultFields);
    });
    test("defaults encodes to JSON", () => {
      const got = new messageType().toJson();
      expect(got).toStrictEqual(defaultJson);
    });
    test("defaults decodes from JSON", () => {
      const got = { ...messageType.fromJson(defaultJson) };
      expect(got).toStrictEqual(defaultFields);
    });
    test("example encodes to JSON", () => {
      const got = new messageType(exampleFields).toJson();
      expect(got).toStrictEqual(exampleJson);
    });
    test("example decodes from JSON", () => {
      const got = { ...messageType.fromJson(exampleJson) };
      expect(got).toStrictEqual(exampleFields);
    });
    test("allow number[] for bytes field", () => {
      const bytes = [0xff];
      const got = {
        ...new messageType({
          ...defaultFields,
          bytesField: [bytes] as any, //eslint-disable-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
        }),
      };
      expect(got).toStrictEqual({
        ...defaultFields,
        bytesField: [new Uint8Array(bytes)],
      });
    });
    describe("field info", () => {
      test.each(messageType.fields.byNumber())("$name", (field) => {
        expect(typeof field.no).toBe("number");
        expect(typeof field.name).toBe("string");
        expect(typeof field.localName).toBe("string");
        expect(typeof field.jsonName).toBe("string");
        expect(field.repeated).toBe(true);
        expect(field.delimited).toBeFalsy();
        expect(field.oneof).toBeUndefined();
        expect(field.default).toBeUndefined();
        expect(field.opt).toBeFalsy();
        expect(field.kind).toBe("scalar");
        if (field.kind == "scalar") {
          expect(typeof field.T).toBe("number");
          expect(typeof field.L).toBe("number");
          expect(field.packed).toBe(
            field.T !== ScalarType.STRING && field.T !== ScalarType.BYTES,
          );
        }
      });
    });
  },
);
