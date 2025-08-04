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

import { describe, expect, test } from "@jest/globals";
import { create, toBinary, toJson } from "@bufbuild/protobuf";
import { FieldMaskSchema, ValueSchema } from "@bufbuild/protobuf/wkt";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";
import * as scalar_ts from "./gen/ts/extra/msg-scalar_pb.js";

describe("serialization errors", () => {
  describe("google.protobuf.FieldMask ", () => {
    describe("lowerCamelCase path name irreversible", () => {
      const fieldMask = create(FieldMaskSchema, {
        paths: ["user.displayName", "photo"],
      });
      test("toJson", () => {
        expect(() => {
          toJson(FieldMaskSchema, fieldMask);
        }).toThrow(
          'cannot encode message google.protobuf.FieldMask to JSON: lowerCamelCase of path name "user.displayName" is irreversible',
        );
      });
      test("toBinary", () => {
        expect(() => {
          toBinary(FieldMaskSchema, fieldMask);
        }).not.toThrow();
      });
    });
  });
  describe("google.protobuf.Value", () => {
    describe("unset value", () => {
      // Absence of any variant indicates an error.
      // See struct.proto
      const value = create(ValueSchema);
      test("toJson", () => {
        expect(() => toJson(ValueSchema, value)).toThrow(
          "google.protobuf.Value must have a value",
        );
      });
      test("toBinary", () => {
        expect(() => toBinary(ValueSchema, value)).not.toThrow();
      });
    });
    describe("numberValue NaN", () => {
      const value = create(ValueSchema, {
        kind: { case: "numberValue", value: NaN },
      });
      test("toJson", () => {
        expect(() => toJson(ValueSchema, value)).toThrow(
          "google.protobuf.Value cannot be NaN or Infinity",
        );
      });
      test("toBinary", () => {
        expect(() => toBinary(ValueSchema, value)).not.toThrow();
      });
    });
    describe("numberValue Infinity", () => {
      const value = create(ValueSchema, {
        kind: { case: "numberValue", value: Infinity },
      });
      test("toJson", () => {
        expect(() => toJson(ValueSchema, value)).toThrow(
          "google.protobuf.Value cannot be NaN or Infinity",
        );
      });
      test("toBinary", () => {
        expect(() => toBinary(ValueSchema, value)).not.toThrow();
      });
    });
    describe("numberValue -Infinity", () => {
      const value = create(ValueSchema, {
        kind: { case: "numberValue", value: -Infinity },
      });
      test("toJson", () => {
        expect(() => toJson(ValueSchema, value)).toThrow(
          "google.protobuf.Value cannot be NaN or Infinity",
        );
      });
      test("toBinary", () => {
        expect(() => toBinary(ValueSchema, value)).not.toThrow();
      });
    });
  });
  describe("enum field", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    const msg = create(desc);
    // @ts-expect-error TS2322
    msg.singularEnumField = "abc";
    test("toJson", () => {
      expect(() => toJson(desc, msg)).toThrow(
        /^cannot encode enum spec.Proto3Enum to JSON: expected number, got "abc"$/,
      );
    });
    test("toBinary", () => {
      expect(() => toBinary(desc, msg)).toThrow(
        /^cannot encode field spec.Proto3Message.singular_enum_field to binary: invalid int32: NaN$/,
      );
    });
  });
  describe("repeated enum field", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    const msg = create(desc);
    // @ts-expect-error TS2322
    msg.repeatedEnumField = ["abc"];
    test("toJson", () => {
      expect(() => toJson(desc, msg)).toThrow(
        /^cannot encode enum spec.Proto3Enum to JSON: expected number, got "abc"$/,
      );
    });
    test("toBinary", () => {
      expect(() => toBinary(desc, msg)).toThrow(
        /^cannot encode field spec.Proto3Message.repeated_enum_field to binary: invalid int32: NaN$/,
      );
    });
  });
  describe("required field", () => {
    const desc = proto2_ts.Proto2MessageSchema;
    const msg = create(desc);
    test("toJson", () => {
      expect(() => toJson(desc, msg)).toThrow(
        /^cannot encode field spec.Proto2Message.required_string_field to JSON: required field not set$/,
      );
    });
    test("toBinary", () => {
      expect(() => toBinary(desc, msg)).toThrow(
        /^cannot encode field spec.Proto2Message.required_string_field to binary: required field not set$/,
      );
    });
  });
  type ScalarCase = {
    name: string;
    val(m: scalar_ts.ScalarValuesMessage): void;
    jsonErr: RegExp | null;
    binaryErr: RegExp | null;
  };
  describe.each([
    {
      name: "int32 field string",
      val(m) {
        // @ts-expect-error TS2322
        m.int32Field = "abc";
      },
      jsonErr:
        /^cannot encode field spec.ScalarValuesMessage.int32_field to JSON: expected number \(int32\), got "abc"$/,
      binaryErr:
        /^cannot encode field spec.ScalarValuesMessage.int32_field to binary: invalid int32: NaN$/,
    },
    {
      name: "uint32 field -1",
      val(m) {
        m.uint32Field = -1;
      },
      jsonErr: null,
      binaryErr:
        /^cannot encode field spec.ScalarValuesMessage.uint32_field to binary: invalid uint32: -1$/,
    },
    {
      name: "string field 123",
      val(m) {
        // @ts-expect-error TS2322
        m.stringField = 123;
      },
      jsonErr:
        /^cannot encode field spec.ScalarValuesMessage.string_field to JSON: expected string, got 123$/,
      binaryErr: null,
    },
    {
      name: `bool field "abc"`,
      val(m) {
        // @ts-expect-error TS2322
        m.boolField = "abc";
      },
      jsonErr:
        /^cannot encode field spec.ScalarValuesMessage.bool_field to JSON: expected boolean, got "abc"/,
      binaryErr: null,
    },
    {
      name: "int64 field true",
      val(m) {
        // @ts-expect-error TS2322
        m.int64Field = true;
      },
      jsonErr:
        /^cannot encode field spec.ScalarValuesMessage.int64_field to JSON: expected bigint \(int64\), got true/,
      binaryErr: null,
    },
    {
      name: "uint64 field -1",
      val(m) {
        m.uint64Field = BigInt(-1);
      },
      jsonErr: null,
      binaryErr:
        /^cannot encode field spec.ScalarValuesMessage.uint64_field to binary: invalid uint64: -1$/,
    },
    {
      name: "bytes field true",
      val(m) {
        // @ts-expect-error TS2322
        m.bytesField = true;
      },
      jsonErr:
        /^cannot encode field spec.ScalarValuesMessage.bytes_field to JSON: expected Uint8Array, got true/,
      binaryErr:
        /^cannot encode field spec.ScalarValuesMessage.bytes_field to binary: invalid uint32: undefined$/,
    },
  ] as ScalarCase[])("$name", (kase) => {
    const desc = scalar_ts.ScalarValuesMessageSchema;
    const msg = create(desc);
    kase.val(msg);
    test("toJson", () => {
      if (kase.jsonErr === null) {
        expect(() => toJson(desc, msg)).not.toThrow();
      } else {
        expect(() => toJson(desc, msg)).toThrow(kase.jsonErr);
      }
    });
    test("toBinary", () => {
      if (kase.binaryErr === null) {
        expect(() => toBinary(desc, msg)).not.toThrow();
      } else {
        expect(() => toBinary(desc, msg)).toThrow(kase.binaryErr);
      }
    });
  });
  type RepeatedScalarCase = {
    name: string;
    val(m: scalar_ts.RepeatedScalarValuesMessage): void;
    jsonErr: RegExp | null;
    binaryErr: RegExp | null;
  };
  describe.each([
    {
      name: "repeated uint32 field [-1]",
      val(m) {
        m.uint32Field = [-1];
      },
      jsonErr: null,
      binaryErr:
        /^cannot encode field spec.RepeatedScalarValuesMessage.uint32_field to binary: invalid uint32: -1$/,
    },
    {
      name: `repeated int32 field ["abc"]`,
      val(m) {
        // @ts-expect-error TS2322
        m.int32Field = ["abc"];
      },
      jsonErr:
        /^cannot encode field spec.RepeatedScalarValuesMessage.int32_field to JSON: expected ReflectList \(INT32\), got "abc"$/,
      binaryErr:
        /^cannot encode field spec.RepeatedScalarValuesMessage.int32_field to binary: invalid int32: NaN$/,
    },
  ] as RepeatedScalarCase[])("$name", (kase) => {
    const desc = scalar_ts.RepeatedScalarValuesMessageSchema;
    const msg = create(desc);
    kase.val(msg);
    test("toJson", () => {
      if (kase.jsonErr === null) {
        expect(() => toJson(desc, msg)).not.toThrow();
      } else {
        expect(() => toJson(desc, msg)).toThrow(kase.jsonErr);
      }
    });
    test("toBinary", () => {
      if (kase.binaryErr === null) {
        expect(() => toBinary(desc, msg)).not.toThrow();
      } else {
        expect(() => toBinary(desc, msg)).toThrow(kase.binaryErr);
      }
    });
  });
});
