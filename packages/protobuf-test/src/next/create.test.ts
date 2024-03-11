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

import type { DescMessage } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";
import { create } from "@bufbuild/protobuf/next";
import { describe, expect, test } from "@jest/globals";
import * as example_ts from "../gen/ts/extra/example_pbv2.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pbv2.js";
import * as proto2_ts from "../gen/ts/extra/proto2_pbv2.js";
import * as TS from "../gen/ts/extra/proto2_pb";

describe("create()", () => {
  describe("with a generated descriptor", () => {
    test("creates a typed message", () => {
      const user: example_ts.User = create(example_ts.UserDesc);
      expect(user).toBeDefined();
      expect(user.$desc).toBe(example_ts.UserDesc);
      expect(user.$typeName).toBe("docs.User");
      expect(user.firstName).toBeDefined();
    });
  });

  describe("with an anonymous descriptor", () => {
    test("creates an anonymous message", () => {
      const user = create(example_ts.UserDesc as DescMessage);
      expect(user).toBeDefined();
      expect(user.$desc).toBe(example_ts.UserDesc);
      expect(user.$typeName).toBe("docs.User");
      // @ts-expect-error TS2339
      expect(user.firstName).toBeDefined();
    });
  });

  describe("creates a zero message", () => {
    describe("from proto3", () => {
      const desc = proto3_ts.Proto3MessageDesc;
      test("with expected properties", () => {
        const msg = create(desc);
        function hasOwn(prop: keyof typeof msg) {
          return Object.prototype.hasOwnProperty.call(msg, prop);
        }
        // singular
        expect(msg.singularStringField).toBe("");
        expect(hasOwn("singularStringField")).toBe(true);
        expect(msg.singularBytesField).toBeInstanceOf(Uint8Array);
        expect(msg.singularBytesField.length).toBe(0);
        expect(hasOwn("singularBytesField")).toBe(true);
        expect(msg.singularInt32Field).toBe(0);
        expect(hasOwn("singularInt32Field")).toBe(true);
        expect(msg.singularInt64Field).toBe(protoInt64.zero);
        expect(hasOwn("singularInt64Field")).toBe(true);
        expect(msg.singularInt64JsNumberField).toBe(protoInt64.zero);
        expect(hasOwn("singularInt64JsNumberField")).toBe(true);
        expect(typeof msg.singularInt64JsStringField).toBe("string");
        expect(msg.singularInt64JsStringField).toBe("0");
        expect(hasOwn("singularInt64JsStringField")).toBe(true);
        expect(msg.singularFloatField).toBe(0);
        expect(hasOwn("singularFloatField")).toBe(true);
        expect(msg.singularBoolField).toBe(false);
        expect(hasOwn("singularBoolField")).toBe(true);
        expect(msg.singularEnumField).toBe(proto3_ts.Proto3Enum.UNSPECIFIED);
        expect(hasOwn("singularEnumField")).toBe(true);
        expect(msg.singularMessageField).toBeUndefined();
        expect(hasOwn("singularMessageField")).toBe(false);
        expect(msg.singularWrappedUint32Field).toBeUndefined();
        expect(hasOwn("singularWrappedUint32Field")).toBe(false);

        // repeated
        expect(msg.repeatedStringField).toStrictEqual([]);
        expect(hasOwn("repeatedStringField")).toBe(true);
        expect(msg.repeatedBytesField).toStrictEqual([]);
        expect(hasOwn("repeatedBytesField")).toBe(true);
        expect(msg.repeatedInt32Field).toStrictEqual([]);
        expect(hasOwn("repeatedInt32Field")).toBe(true);
        expect(msg.repeatedInt64Field).toStrictEqual([]);
        expect(hasOwn("repeatedInt64Field")).toBe(true);
        expect(msg.repeatedInt64JsNumberField).toStrictEqual([]);
        expect(hasOwn("repeatedInt64JsNumberField")).toBe(true);
        expect(msg.repeatedInt64JsStringField).toStrictEqual([]);
        expect(hasOwn("repeatedInt64JsStringField")).toBe(true);
        expect(msg.repeatedFloatField).toStrictEqual([]);
        expect(hasOwn("repeatedFloatField")).toBe(true);
        expect(msg.repeatedBoolField).toStrictEqual([]);
        expect(hasOwn("repeatedBoolField")).toBe(true);
        expect(msg.repeatedEnumField).toStrictEqual([]);
        expect(hasOwn("repeatedEnumField")).toBe(true);
        expect(msg.repeatedMessageField).toStrictEqual([]);
        expect(hasOwn("repeatedMessageField")).toBe(true);
        expect(msg.repeatedWrappedUint32Field).toStrictEqual([]);
        expect(hasOwn("repeatedWrappedUint32Field")).toBe(true);

        // optional
        expect(msg.optionalStringField).toBeUndefined();
        expect(hasOwn("optionalStringField")).toBe(false);
        expect(msg.optionalBytesField).toBeUndefined();
        expect(hasOwn("optionalBytesField")).toBe(false);
        expect(msg.optionalInt32Field).toBeUndefined();
        expect(hasOwn("optionalInt32Field")).toBe(false);
        expect(msg.optionalInt64Field).toBeUndefined();
        expect(hasOwn("optionalInt64Field")).toBe(false);
        expect(msg.optionalInt64JsNumberField).toBeUndefined();
        expect(hasOwn("optionalInt64JsNumberField")).toBe(false);
        expect(msg.optionalInt64JsStringField).toBeUndefined();
        expect(hasOwn("optionalInt64JsStringField")).toBe(false);
        expect(msg.optionalFloatField).toBeUndefined();
        expect(hasOwn("optionalFloatField")).toBe(false);
        expect(msg.optionalBoolField).toBeUndefined();
        expect(hasOwn("optionalBoolField")).toBe(false);
        expect(msg.optionalEnumField).toBeUndefined();
        expect(hasOwn("optionalEnumField")).toBe(false);
        expect(msg.optionalMessageField).toBeUndefined();
        expect(hasOwn("optionalMessageField")).toBe(false);
        expect(msg.optionalWrappedUint32Field).toBeUndefined();
        expect(hasOwn("optionalWrappedUint32Field")).toBe(false);

        // oneof
        expect(msg.either).toStrictEqual({ case: undefined });
        expect(hasOwn("either")).toBe(true);

        // map
        expect(msg.mapStringStringField).toStrictEqual({});
        expect(hasOwn("mapStringStringField")).toBe(true);
        expect(msg.mapInt32Int32Field).toStrictEqual({});
        expect(hasOwn("mapInt32Int32Field")).toBe(true);
        expect(msg.mapBoolBoolField).toStrictEqual({});
        expect(hasOwn("mapBoolBoolField")).toBe(true);
        expect(msg.mapInt64Int64Field).toStrictEqual({});
        expect(hasOwn("mapInt64Int64Field")).toBe(true);
        expect(msg.mapInt32EnumField).toStrictEqual({});
        expect(hasOwn("mapInt32EnumField")).toBe(true);
        expect(msg.mapInt32MessageField).toStrictEqual({});
        expect(hasOwn("mapInt32MessageField")).toBe(true);
        expect(msg.mapInt32WrappedUint32Field).toStrictEqual({});
        expect(hasOwn("mapInt32WrappedUint32Field")).toBe(true);
      });
    });
    describe("from proto2", () => {
      const desc = proto2_ts.Proto2MessageDesc;
      test("with expected properties", () => {
        const msg = create(desc);
        function hasOwn(prop: keyof typeof msg) {
          return Object.prototype.hasOwnProperty.call(msg, prop);
        }
        // required
        expect(msg.requiredStringField).toBe("");
        expect(hasOwn("requiredStringField")).toBe(false);
        expect(msg.requiredBytesField).toBeInstanceOf(Uint8Array);
        expect(msg.requiredBytesField.length).toBe(0);
        expect(hasOwn("requiredBytesField")).toBe(false);
        expect(msg.requiredInt32Field).toBe(0);
        expect(hasOwn("requiredInt32Field")).toBe(false);
        expect(msg.requiredInt64Field).toBe(protoInt64.zero);
        expect(hasOwn("requiredInt64Field")).toBe(false);
        expect(msg.requiredInt64JsNumberField).toBe(protoInt64.zero);
        expect(hasOwn("requiredInt64JsNumberField")).toBe(false);
        expect(typeof msg.requiredInt64JsStringField).toBe("string");
        expect(msg.requiredInt64JsStringField).toBe("0");
        expect(hasOwn("requiredInt64JsStringField")).toBe(false);
        expect(msg.requiredFloatField).toBe(0);
        expect(hasOwn("requiredFloatField")).toBe(false);
        expect(msg.requiredBoolField).toBe(false);
        expect(hasOwn("requiredBoolField")).toBe(false);
        expect(msg.requiredEnumField).toBe(proto2_ts.Proto2Enum.YES);
        expect(hasOwn("requiredEnumField")).toBe(false);
        expect(msg.requiredMessageField).toBeUndefined();
        expect(hasOwn("requiredMessageField")).toBe(false);
        expect(msg.requireddefaultgroup).toBeUndefined();
        expect(hasOwn("requireddefaultgroup")).toBe(false);
        expect(msg.requiredWrappedDoubleField).toBeUndefined();
        expect(hasOwn("requiredWrappedDoubleField")).toBe(false);

        // required with default
        expect(msg.requiredDefaultStringField).toBe('hello " */ ');
        expect(hasOwn("requiredStringField")).toBe(false);
        expect(msg.requiredDefaultBytesField).toBeInstanceOf(Uint8Array);
        expect(hasOwn("requiredBytesField")).toBe(false);
        expect(msg.requiredDefaultBytesField.length).toBe(17);
        expect(hasOwn("requiredInt32Field")).toBe(false);
        expect(msg.requiredDefaultInt32Field).toBe(128);
        expect(hasOwn("requiredInt64Field")).toBe(false);
        expect(msg.requiredDefaultInt64Field).toBe(protoInt64.parse(-256));
        expect(hasOwn("requiredInt64Field")).toBe(false);
        expect(msg.requiredDefaultInt64JsNumberField).toBe(
          protoInt64.parse(-256),
        );
        expect(hasOwn("requiredDefaultInt64JsNumberField")).toBe(false);
        expect(typeof msg.requiredDefaultInt64JsStringField).toBe("string");
        expect(msg.requiredDefaultInt64JsStringField).toBe("-256");
        expect(hasOwn("requiredDefaultInt64JsStringField")).toBe(false);
        expect(hasOwn("requiredFloatField")).toBe(false);
        expect(msg.requiredDefaultFloatField).toBe(-512.13);
        expect(hasOwn("requiredBoolField")).toBe(false);
        expect(msg.requiredDefaultBoolField).toBe(true);
        expect(hasOwn("requiredEnumField")).toBe(false);
        expect(msg.requiredDefaultEnumField).toBe(TS.Proto2Enum.YES);
        expect(hasOwn("requiredMessageField")).toBe(false);
        expect(msg.requiredDefaultMessageField).toBeUndefined();
        expect(hasOwn("requiredDefaultMessageField")).toBe(false);
        expect(msg.requireddefaultgroup).toBeUndefined();
        expect(hasOwn("requireddefaultgroup")).toBe(false);
        expect(msg.requiredDefaultWrappedDoubleField).toBeUndefined();
        expect(hasOwn("requiredDefaultWrappedDoubleField")).toBe(false);

        // repeated
        expect(msg.repeatedStringField).toStrictEqual([]);
        expect(hasOwn("repeatedStringField")).toBe(true);
        expect(msg.repeatedBytesField).toStrictEqual([]);
        expect(hasOwn("repeatedBytesField")).toBe(true);
        expect(msg.repeatedInt32Field).toStrictEqual([]);
        expect(hasOwn("repeatedInt32Field")).toBe(true);
        expect(msg.repeatedInt64Field).toStrictEqual([]);
        expect(hasOwn("repeatedInt64Field")).toBe(true);
        expect(msg.repeatedInt64JsNumberField).toStrictEqual([]);
        expect(hasOwn("repeatedInt64JsNumberField")).toBe(true);
        expect(msg.repeatedInt64JsStringField).toStrictEqual([]);
        expect(hasOwn("repeatedInt64JsStringField")).toBe(true);
        expect(msg.repeatedFloatField).toStrictEqual([]);
        expect(hasOwn("repeatedFloatField")).toBe(true);
        expect(msg.repeatedBoolField).toStrictEqual([]);
        expect(hasOwn("repeatedBoolField")).toBe(true);
        expect(msg.repeatedEnumField).toStrictEqual([]);
        expect(hasOwn("repeatedEnumField")).toBe(true);
        expect(msg.repeatedMessageField).toStrictEqual([]);
        expect(hasOwn("repeatedMessageField")).toBe(true);
        expect(msg.repeatedWrappedDoubleField).toStrictEqual([]);
        expect(hasOwn("repeatedWrappedDoubleField")).toBe(true);

        // optional
        expect(msg.optionalStringField).toBe("");
        expect(hasOwn("optionalStringField")).toBe(false);
        expect(msg.optionalBytesField).toBeInstanceOf(Uint8Array);
        expect(msg.optionalBytesField.length).toBe(0);
        expect(hasOwn("optionalBytesField")).toBe(false);
        expect(msg.optionalInt32Field).toBe(0);
        expect(hasOwn("optionalInt32Field")).toBe(false);
        expect(msg.optionalInt64Field).toBe(protoInt64.zero);
        expect(hasOwn("optionalInt64Field")).toBe(false);
        expect(msg.optionalInt64JsNumberField).toBe(protoInt64.zero);
        expect(hasOwn("optionalInt64JsNumberField")).toBe(false);
        expect(typeof msg.optionalInt64JsStringField).toBe("string");
        expect(msg.optionalInt64JsStringField).toBe("0");
        expect(hasOwn("optionalInt64JsStringField")).toBe(false);
        expect(msg.optionalFloatField).toBe(0);
        expect(hasOwn("optionalFloatField")).toBe(false);
        expect(msg.optionalBoolField).toBe(false);
        expect(hasOwn("optionalBoolField")).toBe(false);
        expect(msg.optionalEnumField).toBe(1);
        expect(hasOwn("optionalEnumField")).toBe(false);
        expect(msg.optionalMessageField).toBeUndefined();
        expect(hasOwn("optionalMessageField")).toBe(false);
        expect(msg.optionalgroup).toBeUndefined();
        expect(hasOwn("optionalgroup")).toBe(false);
        expect(msg.optionalWrappedDoubleField).toBeUndefined();
        expect(hasOwn("optionalWrappedDoubleField")).toBe(false);

        // optional with default
        expect(msg.optionalDefaultStringField).toBe('hello " */ ');
        expect(hasOwn("optionalDefaultStringField")).toBe(false);
        expect(msg.optionalDefaultBytesField).toBeInstanceOf(Uint8Array);
        expect(hasOwn("optionalDefaultBytesField")).toBe(false);
        expect(msg.optionalDefaultBytesField.length).toBe(17);
        expect(hasOwn("optionalDefaultBytesField")).toBe(false);
        expect(msg.optionalDefaultInt32Field).toBe(128);
        expect(hasOwn("optionalDefaultInt32Field")).toBe(false);
        expect(msg.optionalDefaultInt64Field).toBe(protoInt64.parse(-256));
        expect(hasOwn("optionalDefaultInt64Field")).toBe(false);
        expect(msg.optionalDefaultInt64JsNumberField).toBe(
          protoInt64.parse(-256),
        );
        expect(hasOwn("optionalDefaultInt64JsNumberField")).toBe(false);
        expect(msg.optionalDefaultInt64JsStringField).toBe("-256");
        expect(hasOwn("optionalDefaultInt64JsStringField")).toBe(false);
        expect(msg.optionalDefaultFloatField).toBe(-512.13);
        expect(hasOwn("optionalDefaultFloatField")).toBe(false);
        expect(msg.optionalDefaultBoolField).toBe(true);
        expect(hasOwn("optionalDefaultBoolField")).toBe(false);
        expect(msg.optionalDefaultEnumField).toBe(TS.Proto2Enum.YES);
        expect(hasOwn("optionalDefaultEnumField")).toBe(false);
        expect(msg.optionalDefaultMessageField).toBeUndefined();
        expect(hasOwn("optionalDefaultMessageField")).toBe(false);
        expect(msg.optionaldefaultgroup).toBeUndefined();
        expect(hasOwn("optionaldefaultgroup")).toBe(false);
        expect(msg.optionalWrappedDoubleField).toBeUndefined();
        expect(hasOwn("optionalWrappedDoubleField")).toBe(false);

        // oneof
        expect(msg.either).toStrictEqual({ case: undefined });
        expect(hasOwn("either")).toBe(true);

        // map
        expect(msg.mapStringStringField).toStrictEqual({});
        expect(hasOwn("mapStringStringField")).toBe(true);
        expect(msg.mapInt32Int32Field).toStrictEqual({});
        expect(hasOwn("mapInt32Int32Field")).toBe(true);
        expect(msg.mapBoolBoolField).toStrictEqual({});
        expect(hasOwn("mapBoolBoolField")).toBe(true);
        expect(msg.mapInt64Int64Field).toStrictEqual({});
        expect(hasOwn("mapInt64Int64Field")).toBe(true);
        expect(msg.mapInt32EnumField).toStrictEqual({});
        expect(hasOwn("mapInt32EnumField")).toBe(true);
        expect(msg.mapInt32MessageField).toStrictEqual({});
        expect(hasOwn("mapInt32MessageField")).toBe(true);
        expect(msg.mapInt32WrappedDoubleField).toStrictEqual({});
        expect(hasOwn("mapInt32WrappedDoubleField")).toBe(true);
      });
    });
  });

  describe("with init argument", () => {
    test("typed message returns same instance of typed message", () => {
      const user1 = create(example_ts.UserDesc);
      const user2 = create(example_ts.UserDesc, user1);
      expect(user2).toBe(user1);
    });
    describe("foreign typed message", () => {
      test("is a type error", () => {
        const user = create(example_ts.UserDesc);
        // @ts-expect-error TS2345
        const notAUser = create(proto3_ts.Proto3UnlabelledMessageDesc, user);
        expect(notAUser).toBeDefined();
      });
    });
    // TODO test partial init. see constructor.test.ts for example, but use proto2.proto and proto3 messages.
  });
});
