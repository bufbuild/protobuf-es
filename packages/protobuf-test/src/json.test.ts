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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import {
  type MessageInitShape,
  type DescMessage,
  type JsonValue,
  createRegistry,
  create,
  toJson,
  fromJson,
  fromJsonString,
  setExtension,
  getExtension,
  mergeFromJsonString,
  protoInt64,
} from "@bufbuild/protobuf";
import {
  RepeatedScalarValuesMessageSchema,
  ScalarValuesMessageSchema,
} from "./gen/ts/extra/msg-scalar_pb.js";
import { MapsMessageSchema } from "./gen/ts/extra/msg-maps_pb.js";
import { MessageFieldMessageSchema } from "./gen/ts/extra/msg-message_pb.js";
import { WrappersMessageSchema } from "./gen/ts/extra/wkt-wrappers_pb.js";
import {
  AnySchema,
  anyPack,
  anyUnpack,
  DurationSchema,
  FieldMaskSchema,
  StructSchema,
  TimestampSchema,
  ValueSchema,
  FileOptionsSchema,
} from "@bufbuild/protobuf/wkt";
import * as ext_proto2 from "./gen/ts/extra/extensions-proto2_pb.js";
import * as ext_proto3 from "./gen/ts/extra/extensions-proto3_pb.js";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import { OneofMessageSchema } from "./gen/ts/extra/msg-oneof_pb.js";
import { JsonNamesMessageSchema } from "./gen/ts/extra/msg-json-names_pb.js";
import { JSTypeProto2NormalMessageSchema } from "./gen/ts/extra/jstype-proto2_pb.js";
import { TestAllTypesProto3Schema } from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import { compileMessage } from "./helpers.js";

void suite("JSON serialization", () => {
  testJson(
    ScalarValuesMessageSchema,
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
    RepeatedScalarValuesMessageSchema,
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
    MessageFieldMessageSchema,
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
    MapsMessageSchema,
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
    OneofMessageSchema,
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
    JsonNamesMessageSchema,
    {
      a: "a",
      b: "b",
      c: "c",
    },
    { "@type": "c", "": "b", a: "a" },
  );
  testJson(
    JSTypeProto2NormalMessageSchema,
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
  void suite("wkt", () => {
    void suite("wrappers", () => {
      testJson(
        WrappersMessageSchema,
        {
          doubleValueField: 1.2,
          boolValueField: true,
          floatValueField: 1.3,
          int64ValueField: protoInt64.parse(4),
          uint64ValueField: protoInt64.parse(5),
          int32ValueField: 6,
          uint32ValueField: 7,
          stringValueField: "a",
          bytesValueField: new Uint8Array([
            104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
          ]),
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
          bytesValueField: "aGVsbG8gd29ybGQ=",
        },
      );
    });
    void suite("Any", () => {
      void test("without value encodes to JSON {}", () => {
        const any = create(AnySchema);
        assert.deepStrictEqual(toJson(AnySchema, any), {});
      });
      void test("decodes from JSON {}", () => {
        const jsonString = "{}";
        const a = fromJsonString(AnySchema, jsonString);
        assert.ok(a !== undefined);
        assert.strictEqual(a.typeUrl, "");
        assert.strictEqual(a.value.length, 0);
      });
      test(`encodes ${ValueSchema.typeName} with ${StructSchema.typeName} to JSON`, () => {
        const any = anyPack(
          ValueSchema,
          create(ValueSchema, {
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
        assert.deepStrictEqual(
          toJson(AnySchema, any, {
            registry: createRegistry(ValueSchema, StructSchema),
          }),
          {
            "@type": "type.googleapis.com/google.protobuf.Value",
            value: {
              foo: 1,
            },
          },
        );
      });
      test(`encodes ${StructSchema.typeName} to JSON`, () => {
        const str = anyPack(
          StructSchema,
          create(StructSchema, {
            fields: {
              foo: {
                kind: { case: "numberValue", value: 1 },
              },
            },
          }),
        );
        const got = toJson(AnySchema, str, {
          registry: createRegistry(StructSchema, ValueSchema),
        });
        assert.deepStrictEqual(got, {
          "@type": "type.googleapis.com/google.protobuf.Struct",
          value: { foo: 1 },
        });
      });
      test(`encodes ${ValueSchema.typeName} to JSON`, () => {
        const str = anyPack(
          ValueSchema,
          create(ValueSchema, {
            kind: { case: "numberValue", value: 1 },
          }),
        );
        const got = toJson(AnySchema, str, {
          registry: createRegistry(StructSchema, ValueSchema),
        });
        assert.deepStrictEqual(got, {
          "@type": "type.googleapis.com/google.protobuf.Value",
          value: 1,
        });
      });
      test(`decodes ${ValueSchema.typeName} from JSON`, () => {
        const want = create(ValueSchema, {
          kind: { case: "numberValue", value: 1 },
        });
        const any = fromJson(
          AnySchema,
          {
            "@type": "type.googleapis.com/google.protobuf.Value",
            value: 1,
          },
          { registry: createRegistry(StructSchema, ValueSchema) },
        );
        assert.deepStrictEqual(anyUnpack(any, ValueSchema), want);
      });
      void test("json_name clash with Any.@type is not prevented", () => {
        const any = anyPack(
          JsonNamesMessageSchema,
          create(JsonNamesMessageSchema, { a: "a", b: "b", c: "c" }),
        );
        const got = toJson(AnySchema, any, {
          registry: createRegistry(JsonNamesMessageSchema),
        });
        assert.deepStrictEqual(got, {
          "@type": "type.googleapis.com/spec.JsonNamesMessage",
          "": "b",
          a: "a",
        });
      });
    });
    void suite("Duration", () => {
      const testDurationJson = (
        init: MessageInitShape<typeof DurationSchema>,
        json: string,
      ) => {
        testJson(DurationSchema, init, json);
      };
      void suite("3s", () => {
        testDurationJson(
          {
            seconds: protoInt64.parse(3),
            nanos: 0,
          },
          "3s",
        );
      });
      void suite("3s 1ms", () => {
        testDurationJson(
          {
            seconds: protoInt64.parse(3),
            nanos: 1000,
          },
          "3.000001s",
        );
      });
      void suite("3s 1ns", () => {
        testDurationJson(
          {
            seconds: protoInt64.parse(3),
            nanos: 1,
          },
          "3.000000001s",
        );
      });
      void suite("-3s 1ns", () => {
        testDurationJson(
          {
            seconds: protoInt64.parse(-3),
            nanos: -1,
          },
          "-3.000000001s",
        );
      });
      void suite("0s 5ns", () => {
        testDurationJson(
          {
            seconds: protoInt64.parse(0),
            nanos: 5,
          },
          "0.000000005s",
        );
      });
      void suite("0s -5ns", () => {
        testDurationJson(
          {
            seconds: protoInt64.parse(0),
            nanos: -5,
          },
          "-0.000000005s",
        );
      });
      void suite("toJson errors", () => {
        void test("seconds too large", () => {
          const duration = create(DurationSchema, {
            seconds: protoInt64.parse(315576000000 + 1),
            nanos: 0,
          });
          assert.throws(() => toJson(DurationSchema, duration), {
            message:
              "cannot encode message google.protobuf.Duration to JSON: value out of range",
          });
        });
        void test("seconds too small", () => {
          const duration = create(DurationSchema, {
            seconds: protoInt64.parse(-315576000000 - 1),
            nanos: 0,
          });
          assert.throws(() => toJson(DurationSchema, duration), {
            message:
              "cannot encode message google.protobuf.Duration to JSON: value out of range",
          });
        });
        void test("seconds wrong sign", () => {
          const duration = create(DurationSchema, {
            seconds: protoInt64.parse(-1),
            nanos: 1,
          });
          assert.throws(() => toJson(DurationSchema, duration), {
            message:
              "cannot encode message google.protobuf.Duration to JSON: nanos sign must match seconds sign",
          });
        });
        void test("nanos wrong sign", () => {
          const duration = create(DurationSchema, {
            seconds: protoInt64.parse(1),
            nanos: -1,
          });
          assert.throws(() => toJson(DurationSchema, duration), {
            message:
              "cannot encode message google.protobuf.Duration to JSON: nanos sign must match seconds sign",
          });
        });
        void test("signed zero is disregarded", () => {
          assert.doesNotThrow(() =>
            toJson(
              DurationSchema,
              create(DurationSchema, {
                seconds: protoInt64.parse(-1),
                nanos: 0,
              }),
            ),
          );
          assert.doesNotThrow(() =>
            toJson(
              DurationSchema,
              create(DurationSchema, {
                seconds: protoInt64.parse(-1),
                nanos: -0,
              }),
            ),
          );
        });
      });
    });
    testJson(TimestampSchema, {}, "1970-01-01T00:00:00Z");
    test(`fromJson decodes ${TimestampSchema.typeName}`, () => {
      const decode = (str: string, seconds: number, nanos: number) =>
        assert.deepStrictEqual(fromJson(TimestampSchema, str), {
          $typeName: "google.protobuf.Timestamp",
          seconds: protoInt64.parse(seconds),
          nanos,
        });

      decode("2025-01-27T11:42:15.689823456+01:00", 1737974535, 689823456);
      decode("2025-01-27T11:42:15.6898+01:00", 1737974535, 689800000);
      decode("2025-01-27T11:42:15.6+01:00", 1737974535, 600000000);
      decode("2025-01-27T11:42:15.0+01:00", 1737974535, 0);
      decode("2025-01-27T11:42:15+01:00", 1737974535, 0);
      decode("2025-01-27T11:42:15.689823456Z", 1737978135, 689823456);
      decode("2025-01-27T11:42:15.689800Z", 1737978135, 689800000);
      decode("2025-01-27T11:42:15.6898Z", 1737978135, 689800000);
      decode("2025-01-27T11:42:15.6Z", 1737978135, 600000000);
      decode("2025-01-27T11:42:15.0Z", 1737978135, 0);
      decode("2025-01-27T11:42:15Z", 1737978135, 0);
    });
    void suite("Timestamp", () => {
      void test("toJson errors", () => {
        void test("nanos too large", () => {
          const timestamp = create(TimestampSchema, {
            seconds: protoInt64.parse(5000),
            nanos: 1000000000,
          });
          assert.throws(() => toJson(TimestampSchema, timestamp), {
            message:
              "cannot encode message google.protobuf.Timestamp to JSON: nanos must not be greater than 99999999",
          });
        });
      });
    });
    void suite("FieldMask", () => {
      testJson(
        FieldMaskSchema,
        {
          paths: ["user.display_name", "photo"],
        },
        "user.displayName,photo",
      );
      void test("toJson fails on invalid fieldmask paths", () => {
        const fieldMask = create(FieldMaskSchema, {
          paths: ["user.displayName", "photo"],
        });
        assert.throws(
          () => {
            toJson(FieldMaskSchema, fieldMask);
          },
          {
            message:
              'cannot encode message google.protobuf.FieldMask to JSON: lowerCamelCase of path name "user.displayName" is irreversible',
          },
        );
      });
      void test("fromJson fails on invalid json", () => {
        const json = "user.display_name,photo";
        assert.throws(
          () => {
            fromJson(FieldMaskSchema, json);
          },
          {
            message:
              "cannot decode message google.protobuf.FieldMask from JSON: path names must be lowerCamelCase",
          },
        );
      });
    });
    testJson(
      StructSchema,
      {
        fields: {
          a: { kind: { case: "numberValue", value: 123 } },
          b: { kind: { case: "stringValue", value: "abc" } },
        },
      },
      { a: 123, b: "abc" },
    );
    void suite("Value", () => {
      testJson(
        ValueSchema,
        {
          kind: { case: "boolValue", value: true },
        },
        true,
      );
      void test("encoding unset value to JSON raises error", () => {
        // Absence of any variant indicates an error.
        // See struct.proto
        const value = create(ValueSchema);
        assert.throws(() => toJson(ValueSchema, value), {
          message: "google.protobuf.Value must have a value",
        });
      });
      void test("numberValue must be finite", () => {
        assert.throws(
          () => {
            toJson(
              ValueSchema,
              create(ValueSchema, {
                kind: { case: "numberValue", value: NaN },
              }),
            );
          },
          { message: "google.protobuf.Value cannot be NaN or Infinity" },
        );

        assert.throws(
          () => {
            toJson(
              ValueSchema,
              create(ValueSchema, {
                kind: { case: "numberValue", value: Infinity },
              }),
            );
          },
          { message: "google.protobuf.Value cannot be NaN or Infinity" },
        );

        assert.throws(
          () => {
            toJson(
              ValueSchema,
              create(ValueSchema, {
                kind: { case: "numberValue", value: Number.POSITIVE_INFINITY },
              }),
            );
          },
          { message: "google.protobuf.Value cannot be NaN or Infinity" },
        );

        assert.throws(
          () => {
            toJson(
              ValueSchema,
              create(ValueSchema, {
                kind: { case: "numberValue", value: Number.NEGATIVE_INFINITY },
              }),
            );
          },
          { message: "google.protobuf.Value cannot be NaN or Infinity" },
        );
      });
      void suite("Value with Struct field", () => {
        testJson(
          ValueSchema,
          {
            kind: {
              case: "structValue",
              value: {
                fields: {
                  foo: { kind: { case: "numberValue", value: 1 } },
                },
              },
            },
          },
          { foo: 1 },
        );
      });
    });
  });
});

void suite("extensions in JSON", () => {
  void suite("proto2", () => {
    const extendeeDesc = ext_proto2.Proto2ExtendeeSchema;
    const jsonOpts = {
      registry: createRegistry(ext_proto2.file_extra_extensions_proto2),
    };
    void suite("string_ext", () => {
      const ext = ext_proto2.string_ext;
      const goldenJson = {
        "[proto2ext.string_ext]": "foo",
      };
      const goldenValue = "foo";
      void test("encode", () => {
        const extendee = create(extendeeDesc);
        setExtension(extendee, ext, goldenValue);
        const json = toJson(extendeeDesc, extendee, jsonOpts);
        assert.deepStrictEqual(json, goldenJson);
      });
      void test("decode", () => {
        const extendee = fromJson(extendeeDesc, goldenJson, jsonOpts);
        assert.deepStrictEqual(getExtension(extendee, ext), goldenValue);
      });
    });
    void suite("uint64_ext", () => {
      const ext = ext_proto2.uint64_ext;
      const goldenJson = {
        "[proto2ext.uint64_ext]": "123",
      };
      const goldenValue = protoInt64.parse(123);
      void test("encode", () => {
        const extendee = create(extendeeDesc);
        setExtension(extendee, ext, goldenValue);
        const json = toJson(extendeeDesc, extendee, jsonOpts);
        assert.deepStrictEqual(json, goldenJson);
      });
      void test("decode", () => {
        const extendee = fromJson(extendeeDesc, goldenJson, jsonOpts);
        assert.deepStrictEqual(getExtension(extendee, ext), goldenValue);
      });
    });
    void suite("uint64_ext_js_string", () => {
      const ext = ext_proto2.uint64_ext_js_string;
      const goldenJson = {
        "[proto2ext.uint64_ext_js_string]": "456",
      };
      const goldenValue = "456";
      test("encode", () => {
        const extendee = create(extendeeDesc);
        setExtension(extendee, ext, goldenValue);
        const json = toJson(extendeeDesc, extendee, jsonOpts);
        assert.deepStrictEqual(json, goldenJson);
      });
      test("decode", () => {
        const extendee = fromJson(extendeeDesc, goldenJson, jsonOpts);
        assert.deepStrictEqual(getExtension(extendee, ext), goldenValue);
      });
    });
    void suite("wrapper_ext", () => {
      const ext = ext_proto2.wrapper_ext;
      const goldenJson = {
        "[proto2ext.wrapper_ext]": 789,
      };
      const goldenValue = 789;
      test("encode", () => {
        const extendee = create(extendeeDesc);
        setExtension(extendee, ext, goldenValue);
        const json = toJson(extendeeDesc, extendee, jsonOpts);
        assert.deepStrictEqual(json, goldenJson);
      });
      test("decode", () => {
        const extendee = fromJson(extendeeDesc, goldenJson, jsonOpts);
        assert.deepStrictEqual(getExtension(extendee, ext), goldenValue);
      });
    });
    void suite("message_ext", () => {
      const ext = ext_proto2.message_ext;
      const goldenJson = {
        "[proto2ext.message_ext]": { stringField: "abc" },
      };
      const goldenValue = create(ext_proto2.Proto2ExtMessageSchema, {
        stringField: "abc",
      });
      test("encode", () => {
        const extendee = create(extendeeDesc);
        setExtension(extendee, ext, goldenValue);
        const json = toJson(extendeeDesc, extendee, jsonOpts);
        assert.deepStrictEqual(json, goldenJson);
      });
      test("decode", () => {
        const extendee = fromJson(extendeeDesc, goldenJson, jsonOpts);
        assert.deepStrictEqual(getExtension(extendee, ext), goldenValue);
      });
    });
  });
  void suite("proto3", () => {
    const extendeeDesc = FileOptionsSchema;
    const jsonOpts = {
      registry: createRegistry(ext_proto3.file_extra_extensions_proto3),
    };
    void suite("uint32_ext", () => {
      const ext = ext_proto3.uint32_ext;
      const goldenJson = {
        "[proto3ext.uint32_ext]": 0,
      };
      const goldenValue = 0;
      test("encode", () => {
        const extendee = create(extendeeDesc);
        setExtension(extendee, ext, goldenValue);
        const json = toJson(extendeeDesc, extendee, jsonOpts);
        assert.deepStrictEqual(json, goldenJson);
      });
      test("decode", () => {
        const extendee = fromJson(extendeeDesc, goldenJson, jsonOpts);
        assert.deepStrictEqual(getExtension(extendee, ext), goldenValue);
      });
    });
    void suite("message_ext", () => {
      const ext = ext_proto3.message_ext;
      const goldenJson = {
        "[proto3ext.message_ext]": { stringField: "abc" },
      };
      const goldenValue = create(ext_proto3.Proto3ExtMessageSchema, {
        stringField: "abc",
      });
      test("encode", () => {
        const extendee = create(extendeeDesc);
        setExtension(extendee, ext, goldenValue);
        const json = toJson(extendeeDesc, extendee, jsonOpts);
        assert.deepStrictEqual(json, goldenJson);
      });
      test("decode", () => {
        const extendee = fromJson(extendeeDesc, goldenJson, jsonOpts);
        assert.deepStrictEqual(getExtension(extendee, ext), goldenValue);
      });
    });
  });
});

void suite("JsonReadOptions", () => {
  void suite("ignoreUnknownFields", () => {
    test("throws error when false", () => {
      assert.throws(() =>
        fromJsonString(proto3_ts.Proto3MessageSchema, '{ "unknown": 1 }', {
          ignoreUnknownFields: false,
        }),
      );
    });
    test("does not throw error when true", () => {
      assert.doesNotThrow(() =>
        fromJsonString(proto3_ts.Proto3MessageSchema, '{ "unknown": 1 }', {
          ignoreUnknownFields: true,
        }),
      );
    });
    test("defaults to false", () => {
      assert.throws(() =>
        fromJsonString(proto3_ts.Proto3MessageSchema, '{ "unknown": 1 }'),
      );
    });
  });
});

void suite("JsonWriteOptions", () => {
  void suite("alwaysEmitImplicit", () => {
    test("emits proto3 implicit fields", async () => {
      const descMessage = await compileMessage(`
        syntax="proto3";
        message M {
          int32 int32_field = 1;
          bool bool_field = 2;
          repeated int32 list_field = 3;
          map<int32, int32> map_field = 4;
        }
      `);
      const json = toJson(descMessage, create(descMessage), {
        alwaysEmitImplicit: true,
      });
      assert.deepStrictEqual(json, {
        int32Field: 0,
        boolField: false,
        listField: [],
        mapField: {},
      });
    });
    test("does not emit proto3 explicit fields", async () => {
      const descMessage = await compileMessage(`
        syntax="proto3";
        message M {
          oneof kind {
            int32 int32_field = 1;
          }
          optional int32 optional_field = 2;
        }
      `);
      const json = toJson(descMessage, create(descMessage), {
        alwaysEmitImplicit: true,
      });
      assert.deepStrictEqual(json, {});
    });
    test("emits proto2 implicit fields", async () => {
      const descMessage = await compileMessage(`
        syntax="proto2";
        message M {
          optional int32 optional_field = 1;
          repeated int32 list_field = 2;
          map<int32, int32> map_field = 3;
        }
      `);
      const json = toJson(descMessage, create(descMessage), {
        alwaysEmitImplicit: true,
      });
      assert.deepStrictEqual(json, {
        listField: [],
        mapField: {},
      });
    });
  });
  test("enumAsInteger", () => {
    const msg = create(proto3_ts.Proto3MessageSchema, {
      singularEnumField: proto3_ts.Proto3Enum.YES,
      optionalEnumField: proto3_ts.Proto3Enum.UNSPECIFIED,
      repeatedEnumField: [proto3_ts.Proto3Enum.YES, proto3_ts.Proto3Enum.NO],
      mapInt32EnumField: {
        1: proto3_ts.Proto3Enum.YES,
        2: proto3_ts.Proto3Enum.NO,
      },
      singularMessageField: {
        singularEnumField: proto3_ts.Proto3Enum.YES,
      },
    });
    const json = toJson(proto3_ts.Proto3MessageSchema, msg, {
      enumAsInteger: true,
    });
    assert.deepStrictEqual(json, {
      singularEnumField: 1,
      optionalEnumField: 0,
      repeatedEnumField: [1, 2],
      mapInt32EnumField: {
        1: 1,
        2: 2,
      },
      singularMessageField: {
        singularEnumField: 1,
      },
    });
  });
  void suite("useProtoFieldName", () => {
    test("prefers proto field name", () => {
      const msg = create(proto3_ts.Proto3MessageSchema, {
        singularStringField: "a",
      });
      const json = toJson(proto3_ts.Proto3MessageSchema, msg, {
        useProtoFieldName: true,
      });
      assert.deepStrictEqual(json, {
        singular_string_field: "a",
      });
    });
    test("prefers proto field name over json_name", () => {
      const msg = create(JsonNamesMessageSchema, {
        scalarField: "a",
      });
      const json = toJson(JsonNamesMessageSchema, msg, {
        useProtoFieldName: true,
      });
      assert.deepStrictEqual(json, {
        scalar_field: "a",
      });
    });
  });
});

void suite("parsing funny JSON", () => {
  void suite("duplicate fields", () => {
    // This depends on the ECMA-262-defined JSON.parse() behavior, which is itself
    // specified to choose the last field value for a duplicate field.
    test("chooses last field when duplicated", () => {
      const a = fromJsonString(
        proto3_ts.Proto3MessageSchema,
        '{ "singularStringField": "b", "singularStringField": "a" }',
      );
      const b = fromJsonString(
        proto3_ts.Proto3MessageSchema,
        '{ "singularStringField": "a", "singularStringField": "b" }',
      );

      assert.equal(a.singularStringField, "a");
      assert.equal(b.singularStringField, "b");
    });
    // This depends on the ECMA-262-defined behavior for JSON.parse() and
    // Object.entries() and the internal preservation of object key order.
    test("chooses last field when duplicated, even when fields have different casing", () => {
      const a = fromJsonString(
        proto3_ts.Proto3MessageSchema,
        '{ "singular_string_field": "b", "singularStringField": "a" }',
      );
      const b = fromJsonString(
        proto3_ts.Proto3MessageSchema,
        '{ "singularStringField": "a", "singular_string_field": "b" }',
      );

      assert.equal(a.singularStringField, "a");
      assert.equal(b.singularStringField, "b");
    });
  });
});

// Coverage for JSON parse errors to guard against regressions.
// We do not cover all cases here. Map fields and oneofs are incomplete,
// and bytes, string, and other scalar types are not tested.
// For serialization errors, see serialization-errors.test.ts
void suite("JSON parse errors", () => {
  test("fromJsonString() with invalid JSON", () => {
    assert.throws(() => fromJsonString(TestAllTypesProto3Schema, "}"), {
      message:
        /^cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: Unexpected token .*/,
    });
  });

  test("mergeFromJsonString() with invalid JSON", () => {
    const target = create(TestAllTypesProto3Schema);
    assert.throws(
      () => mergeFromJsonString(TestAllTypesProto3Schema, target, "}"),
      {
        message:
          /^cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: Unexpected token .*/,
      },
    );
  });

  test("unknown field", () => {
    expectJsonParseError(
      { notAKnownField: "abc" },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: key "notAKnownField" is unknown`,
    );
  });

  void suite("Any", () => {
    test("without @type", () => {
      assert.throws(
        () =>
          fromJson(AnySchema, {
            value: 123,
          }),
        {
          message:
            /^cannot decode message google.protobuf.Any from JSON: "@type" is empty/,
        },
      );
    });
    test("with blank @type", () => {
      assert.throws(
        () =>
          fromJson(AnySchema, {
            "@type": "",
          }),
        {
          message:
            /^cannot decode message google.protobuf.Any from JSON: "@type" is empty/,
        },
      );
    });
    test("with invalid type url in @type", () => {
      assert.throws(
        () =>
          fromJson(AnySchema, {
            "@type": "/",
          }),
        {
          message:
            /^cannot decode message google.protobuf.Any from JSON: "@type" is invalid/,
        },
      );
    });
  });

  test("singular scalar", () => {
    expectJsonParseError(
      { optionalDouble: "" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_double from JSON: expected number (float64), got ""`,
    );
    expectJsonParseError(
      { optionalDouble: "-1.89769e+308" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_double from JSON: expected number (float64), got "-1.89769e+308"`,
    );
    expectJsonParseError(
      { optionalDouble: Number.POSITIVE_INFINITY },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_double from JSON: unexpected infinite number`,
    );
    expectJsonParseError(
      { optionalDouble: Number.NaN },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_double from JSON: unexpected NaN number`,
    );
    expectJsonParseError(
      { optionalBytes: "not base 64" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_bytes from JSON: invalid base64 string`,
    );
    expectJsonParseError(
      { optionalInt32: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: expected number (int32), got "abc"`,
    );
    expectJsonParseError(
      { optionalInt32: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: expected number (int32), got true`,
    );
    expectJsonParseError(
      { optionalInt32: {} },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: expected number (int32), got object`,
    );
    expectJsonParseError(
      { optionalInt32: [] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: expected number (int32), got Array(0)`,
    );
  });

  test("repeated scalar", () => {
    expectJsonParseError(
      { repeatedInt32: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: expected Array, got "abc"`,
    );
    expectJsonParseError(
      { repeatedInt32: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: expected Array, got 123`,
    );
    expectJsonParseError(
      { repeatedInt32: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: expected Array, got true`,
    );
    expectJsonParseError(
      { repeatedInt32: { x: 1 } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: expected Array, got object`,
    );
    expectJsonParseError(
      { repeatedInt32: [1, null] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: list item must not be null`,
    );
    expectJsonParseError(
      { repeatedInt32: ["abc"] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: list item #1: expected number (int32), got "abc"`,
    );
    expectJsonParseError(
      { repeatedInt32: [true] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: list item #1: expected number (int32), got true`,
    );
    expectJsonParseError(
      { repeatedInt32: [{}] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: list item #1: expected number (int32), got object`,
    );
    expectJsonParseError(
      { repeatedInt32: [[]] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: list item #1: expected number (int32), got Array(0)`,
    );
  });

  test("singular enum", () => {
    expectJsonParseError(
      { optionalForeignEnum: true },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: true`,
    );
    expectJsonParseError(
      { optionalForeignEnum: "abc" },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: "abc"`,
    );
    expectJsonParseError(
      { optionalForeignEnum: {} },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: object`,
    );
    expectJsonParseError(
      { optionalForeignEnum: [] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: Array(0)`,
    );
  });

  test("repeated enum", () => {
    expectJsonParseError(
      { repeatedForeignEnum: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: expected Array, got "abc"`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: expected Array, got 123`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: expected Array, got true`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: {} },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: expected Array, got object`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [1, null] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: list item must not be null`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [true] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: true`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: ["abc"] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: "abc"`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [{}] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: object`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [[]] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: Array(0)`,
    );
  });

  test("singular message", () => {
    expectJsonParseError(
      { recursiveMessage: "abc" },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: "abc"`,
    );
    expectJsonParseError(
      { recursiveMessage: [] },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: Array(0)`,
    );
    expectJsonParseError(
      { recursiveMessage: true },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: true`,
    );
    expectJsonParseError(
      { recursiveMessage: 123 },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: 123`,
    );
    expectJsonParseError(
      { recursiveMessage: { optionalInt32: "abc" } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: expected number (int32), got "abc"`,
    );
  });

  test("repeated message", () => {
    expectJsonParseError(
      { repeatedNestedMessage: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: expected Array, got "abc"`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: expected Array, got 123`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: [null] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: list item must not be null`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: {} },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: expected Array, got object`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: [{ corecursive: { optionalInt32: "abc" } }] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: expected number (int32), got "abc"`,
    );
  });

  test("map scalar", () => {
    expectJsonParseError(
      { mapInt32Int32: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: expected object, got "abc"`,
    );
    expectJsonParseError(
      { mapInt32Int32: [] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: expected object, got Array(0)`,
    );
    expectJsonParseError(
      { mapInt32Int32: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: expected object, got 123`,
    );
    expectJsonParseError(
      { mapInt32Int32: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: expected object, got true`,
    );
    expectJsonParseError(
      { mapInt32Int32: { 123: null } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: map value must not be null`,
    );
    expectJsonParseError(
      { mapInt32Int32: { "not-an-int32": 123 } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: invalid map key: expected number (int32), got "not-an-int32"`,
    );
    expectJsonParseError(
      { mapInt32Int32: { 123: "not-an-int32" } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: map entry 123: expected number (int32), got "not-an-int32"`,
    );
  });

  test("oneof", () => {
    expectJsonParseError(
      { oneofUint32: 1, oneofString: "a" },
      `cannot decode oneof protobuf_test_messages.proto3.TestAllTypesProto3.oneof_field from JSON: oneof set multiple times by oneof_uint32 and oneof_string`,
    );
  });

  function expectJsonParseError(input: JsonValue, errorMessage: string): void {
    let gotErrorMessage: unknown;
    try {
      fromJson(TestAllTypesProto3Schema, input);
    } catch (e) {
      gotErrorMessage = e instanceof Error ? e.message : e;
    }
    assert.strictEqual(gotErrorMessage, errorMessage);
  }
});

function testJson<Desc extends DescMessage>(
  desc: Desc,
  init: MessageInitShape<Desc>,
  json: JsonValue,
) {
  test(desc.typeName, () => {
    const msg = create(desc, init);
    assert.deepStrictEqual(toJson(desc, msg), json);
    assert.deepStrictEqual(fromJson(desc, json), msg);
  });
}
