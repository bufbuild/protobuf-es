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

import {
  create,
  isFieldSet,
  isMessage,
  protoInt64,
  type MessageInitShape,
  type DescMessage,
} from "@bufbuild/protobuf";
import { describe, expect, test } from "@jest/globals";
import { reflect } from "@bufbuild/protobuf/reflect";
import * as example_ts from "./gen/ts/extra/example_pb.js";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pb.js";
import * as test_messages_proto3_editions_ts from "./gen/ts/editions/golden/test_messages_proto3_editions_pb.js";
import * as ts_types from "./gen/ts/extra/ts-types-proto2_pb.js";
import { fillProto3Message, fillProto3MessageNames } from "./helpers-proto3.js";
import {
  fillEdition2023Message,
  fillEdition2023MessageNames,
} from "./helpers-edition2023.js";
import { fillProto2Message, fillProto2MessageNames } from "./helpers-proto2.js";

/* eslint-disable @typescript-eslint/ban-ts-comment -- to support older TS versions in the TS compat tests, we cannot use ts-expect-error */

describe("create()", () => {
  describe("with a generated descriptor", () => {
    test("creates a typed message", () => {
      const user: example_ts.User = create(example_ts.UserSchema);
      expect(user).toBeDefined();
      expect(user.$typeName).toBe("example.User");
      expect(user.firstName).toBeDefined();
    });
  });

  describe("with an anonymous descriptor", () => {
    test("creates an anonymous message", () => {
      const user = create(example_ts.UserSchema as DescMessage);
      expect(user).toBeDefined();
      expect(user.$typeName).toBe("example.User");
      // @ts-expect-error property is unknown to the type system, but still there
      expect(user.firstName).toBeDefined();
    });
  });

  describe("creates a zero message", () => {
    describe("from proto3", () => {
      const desc = proto3_ts.Proto3MessageSchema;
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
      test("without custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        expect(hasCustomPrototype).toBe(false);
      });
    });
    describe("from proto2", () => {
      const desc = proto2_ts.Proto2MessageSchema;
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
        expect(msg.requiredWrappedUint32Field).toBeUndefined();
        expect(hasOwn("requiredWrappedUint32Field")).toBe(false);

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
        expect(msg.requiredDefaultEnumField).toBe(proto2_ts.Proto2Enum.YES);
        expect(hasOwn("requiredDefaultEnumField")).toBe(false);
        expect(msg.requiredDefaultMessageField).toBeUndefined();
        expect(hasOwn("requiredDefaultMessageField")).toBe(false);
        expect(msg.requireddefaultgroup).toBeUndefined();
        expect(hasOwn("requireddefaultgroup")).toBe(false);
        expect(msg.requiredDefaultWrappedUint32Field).toBeUndefined();
        expect(hasOwn("requiredDefaultWrappedUint32Field")).toBe(false);

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
        expect(msg.optionalWrappedUint32Field).toBeUndefined();
        expect(hasOwn("optionalWrappedUint32Field")).toBe(false);

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
        expect(msg.optionalDefaultEnumField).toBe(proto2_ts.Proto2Enum.YES);
        expect(hasOwn("optionalDefaultEnumField")).toBe(false);
        expect(msg.optionalDefaultMessageField).toBeUndefined();
        expect(hasOwn("optionalDefaultMessageField")).toBe(false);
        expect(msg.optionaldefaultgroup).toBeUndefined();
        expect(hasOwn("optionaldefaultgroup")).toBe(false);
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
      test("with custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        expect(hasCustomPrototype).toBe(true);
      });
    });
    describe("from edition2023", () => {
      const desc = edition2023_ts.Edition2023MessageSchema;
      test("with expected properties", () => {
        const msg = create(desc);
        function hasOwn(prop: keyof typeof msg) {
          return Object.prototype.hasOwnProperty.call(msg, prop);
        }

        // explicit
        expect(msg.explicitStringField).toBe("");
        expect(hasOwn("explicitStringField")).toBe(false);
        expect(msg.explicitBytesField).toBeInstanceOf(Uint8Array);
        expect(msg.explicitBytesField.length).toBe(0);
        expect(hasOwn("explicitBytesField")).toBe(false);
        expect(msg.explicitInt32Field).toBe(0);
        expect(hasOwn("explicitInt32Field")).toBe(false);
        expect(msg.explicitInt64Field).toBe(protoInt64.zero);
        expect(hasOwn("explicitInt64Field")).toBe(false);
        expect(msg.explicitInt64JsNumberField).toBe(protoInt64.zero);
        expect(hasOwn("explicitInt64JsNumberField")).toBe(false);
        expect(typeof msg.explicitInt64JsStringField).toBe("string");
        expect(msg.explicitInt64JsStringField).toBe("0");
        expect(hasOwn("explicitInt64JsStringField")).toBe(false);
        expect(msg.explicitFloatField).toBe(0);
        expect(hasOwn("explicitFloatField")).toBe(false);
        expect(msg.explicitBoolField).toBe(false);
        expect(hasOwn("explicitBoolField")).toBe(false);
        expect(msg.explicitEnumOpenField).toBe(
          edition2023_ts.Edition2023EnumOpen.UNSPECIFIED,
        );
        expect(hasOwn("explicitEnumOpenField")).toBe(false);
        expect(msg.explicitEnumClosedField).toBe(
          edition2023_ts.Edition2023EnumClosed.A,
        );
        expect(hasOwn("explicitEnumClosedField")).toBe(false);
        expect(msg.explicitMessageField).toBeUndefined();
        expect(hasOwn("explicitMessageField")).toBe(false);
        expect(msg.explicitMessageDelimitedField).toBeUndefined();
        expect(hasOwn("explicitMessageDelimitedField")).toBe(false);
        expect(msg.explicitWrappedUint32Field).toBeUndefined();
        expect(hasOwn("explicitWrappedUint32Field")).toBe(false);

        // implicit
        expect(msg.implicitStringField).toBe("");
        expect(hasOwn("implicitStringField")).toBe(true);
        expect(msg.implicitBytesField).toBeInstanceOf(Uint8Array);
        expect(msg.implicitBytesField.length).toBe(0);
        expect(hasOwn("implicitBytesField")).toBe(true);
        expect(msg.implicitInt32Field).toBe(0);
        expect(hasOwn("implicitInt32Field")).toBe(true);
        expect(msg.implicitInt64Field).toBe(protoInt64.zero);
        expect(hasOwn("implicitInt64Field")).toBe(true);
        expect(msg.implicitInt64JsNumberField).toBe(protoInt64.zero);
        expect(hasOwn("implicitInt64JsNumberField")).toBe(true);
        expect(typeof msg.implicitInt64JsStringField).toBe("string");
        expect(msg.implicitInt64JsStringField).toBe("0");
        expect(hasOwn("implicitInt64JsStringField")).toBe(true);
        expect(msg.implicitFloatField).toBe(0);
        expect(hasOwn("implicitFloatField")).toBe(true);
        expect(msg.implicitBoolField).toBe(false);
        expect(hasOwn("implicitBoolField")).toBe(true);
        expect(msg.implicitEnumOpenField).toBe(
          edition2023_ts.Edition2023EnumOpen.UNSPECIFIED,
        );
        expect(hasOwn("implicitEnumOpenField")).toBe(true);

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
        expect(msg.requiredEnumOpenField).toBe(
          edition2023_ts.Edition2023EnumOpen.UNSPECIFIED,
        );
        expect(hasOwn("requiredEnumOpenField")).toBe(false);
        expect(msg.requiredEnumClosedField).toBe(
          edition2023_ts.Edition2023EnumClosed.A,
        );
        expect(hasOwn("requiredEnumClosedField")).toBe(false);
        expect(msg.requiredMessageField).toBeUndefined();
        expect(hasOwn("requiredMessageField")).toBe(false);
        expect(msg.requiredMessageDelimitedField).toBeUndefined();
        expect(hasOwn("requiredMessageDelimitedField")).toBe(false);
        expect(msg.requiredWrappedUint32Field).toBeUndefined();
        expect(hasOwn("requiredWrappedUint32Field")).toBe(false);

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
        expect(msg.requiredDefaultFloatField).toBe(-512.13);
        expect(hasOwn("requiredDefaultFloatField")).toBe(false);
        expect(msg.requiredDefaultFloatField).toBe(-512.13);
        expect(hasOwn("requiredDefaultFloatField")).toBe(false);
        expect(msg.requiredDefaultBoolField).toBe(true);
        expect(hasOwn("requiredDefaultBoolField")).toBe(false);
        expect(msg.requiredDefaultEnumOpenField).toBe(
          edition2023_ts.Edition2023EnumOpen.A,
        );
        expect(hasOwn("requiredDefaultEnumOpenField")).toBe(false);
        expect(msg.requiredDefaultEnumClosedField).toBe(
          edition2023_ts.Edition2023EnumClosed.A,
        );

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
        expect(msg.repeatedEnumOpenField).toStrictEqual([]);
        expect(hasOwn("repeatedEnumOpenField")).toBe(true);
        expect(msg.repeatedEnumClosedField).toStrictEqual([]);
        expect(hasOwn("repeatedEnumClosedField")).toBe(true);
        expect(msg.repeatedMessageField).toStrictEqual([]);
        expect(hasOwn("repeatedMessageField")).toBe(true);
        expect(msg.repeatedWrappedUint32Field).toStrictEqual([]);
        expect(hasOwn("repeatedWrappedUint32Field")).toBe(true);

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
        expect(msg.mapInt32EnumOpenField).toStrictEqual({});
        expect(hasOwn("mapInt32EnumOpenField")).toBe(true);
        expect(msg.mapInt32MessageField).toStrictEqual({});
        expect(hasOwn("mapInt32MessageField")).toBe(true);
        expect(msg.mapInt32WrappedUint32Field).toStrictEqual({});
        expect(hasOwn("mapInt32WrappedUint32Field")).toBe(true);
      });
      test("with custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        expect(hasCustomPrototype).toBe(true);
      });
    });
    describe("from edition2023 with proto3 features", () => {
      const desc = test_messages_proto3_editions_ts.TestAllTypesProto3Schema;
      test("without custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        expect(hasCustomPrototype).toBe(false);
      });
    });
  });

  describe("with init argument", () => {
    test("typed message returns same instance of typed message", () => {
      const user1 = create(example_ts.UserSchema);
      const user2 = create(example_ts.UserSchema, user1);
      expect(user2).toBe(user1);
    });
    test("rejects foreign typed message as a type error", () => {
      const user = create(example_ts.UserSchema);
      // @ts-expect-error TS2345
      const notAUser = create(proto3_ts.Proto3MessageSchema, user);
      expect(notAUser).toBeDefined();
    });
    test("rejects foreign typed message with assignable properties as a type error", () => {
      const a = create(ts_types.TsTypeASchema);
      // @ts-expect-error TS2345: Argument of type TsTypeA is not assignable to parameter of type MessageInit<TsTypeB> | undefined
      const b = create(ts_types.TsTypeBSchema, a);
      expect(b).toBeDefined();
    });
    test("rejects extra properties in the object literal as a type error", () => {
      const msg = create(proto3_ts.Proto3MessageSchema, {
        // @ts-expect-error TS2353
        extraProperty: true,
      });
      expect(msg).toBeDefined();
    });
    describe("inits proto2", () => {
      test.each(fillProto2MessageNames())("field %s", (name) => {
        const desc = proto2_ts.Proto2MessageSchema;
        const filled = fillProto2Message(create(desc));
        const init: MessageInitShape<typeof desc> = {};
        for (const k in filled) {
          (init as Record<string, unknown>)[k] = (
            filled as Record<string, unknown>
          )[k];
        }
        const created = create(desc, init);
        switch (name) {
          case "oneofBoolField":
            expect(created.either).toStrictEqual(filled.either);
            break;
          default:
            expect(isFieldSet(created, desc.field[name])).toBe(true);
            expect(created[name]).toStrictEqual(filled[name]);
        }
      });
    });
    describe("inits proto3", () => {
      test.each(fillProto3MessageNames())("field %s", (name) => {
        const desc = proto3_ts.Proto3MessageSchema;
        const filled = fillProto3Message(create(desc));
        const init: MessageInitShape<typeof desc> = {};
        for (const k in filled) {
          (init as Record<string, unknown>)[k] = (
            filled as Record<string, unknown>
          )[k];
        }
        const created = create(desc, init);
        switch (name) {
          case "oneofBoolField":
            expect(created.either).toStrictEqual(filled.either);
            break;
          default:
            expect(isFieldSet(created, desc.field[name])).toBe(true);
            expect(created[name]).toStrictEqual(filled[name]);
        }
      });
    });
    describe("inits edition2023", () => {
      test.each(fillEdition2023MessageNames())("field %s", (name) => {
        const desc = edition2023_ts.Edition2023MessageSchema;
        const filled = fillEdition2023Message(create(desc));
        const init: MessageInitShape<typeof desc> = {};
        for (const k in filled) {
          (init as Record<string, unknown>)[k] = (
            filled as Record<string, unknown>
          )[k];
        }
        const created = create(desc, init);
        switch (name) {
          case "oneofBoolField":
            expect(created.either).toStrictEqual(filled.either);
            break;
          default:
            expect(isFieldSet(created, desc.field[name])).toBe(true);
            expect(created[name]).toStrictEqual(filled[name]);
        }
      });
    });
    describe("skips null values", () => {
      describe.each([
        proto2_ts.Proto2MessageSchema,
        proto3_ts.Proto3MessageSchema,
        edition2023_ts.Edition2023MessageSchema,
      ])("$typeName", (desc) => {
        test.each(desc.fields)("$name", (f) => {
          const init: Record<string, unknown> = {};
          for (const f of desc.members) {
            init[f.localName] = null;
          }
          const msg = create(desc, init);
          const r = reflect(desc, msg);
          expect(r.isSet(f)).toBe(false);
        });
      });
    });
    describe("skips undefined values", () => {
      describe.each([
        proto2_ts.Proto2MessageSchema,
        proto3_ts.Proto3MessageSchema,
        edition2023_ts.Edition2023MessageSchema,
      ])("$typeName", (desc) => {
        test.each(desc.fields)("$name", (f) => {
          const init: Record<string, unknown> = {};
          for (const f of desc.members) {
            init[f.localName] = undefined;
          }
          const msg = create(desc, init);
          const r = reflect(desc, msg);
          expect(r.isSet(f)).toBe(false);
        });
      });
    });
    describe("64-bit integer field", () => {
      test("accepts generated types", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          singularInt64Field: protoInt64.parse(1),
          singularInt64JsNumberField: protoInt64.parse(2),
          singularInt64JsStringField: "3",
          repeatedInt64Field: [protoInt64.parse(4)],
          repeatedInt64JsNumberField: [protoInt64.parse(5)],
          repeatedInt64JsStringField: ["6"],
          either: {
            case: "oneofInt64Field",
            value: protoInt64.parse(7),
          },
          mapInt64Int64Field: {
            "1": protoInt64.parse(8),
            "2": protoInt64.parse(9),
          },
        });
        expect(msg.singularInt64Field).toBe(protoInt64.parse(1));
        expect(msg.singularInt64JsNumberField).toBe(protoInt64.parse(2));
        expect(msg.singularInt64JsStringField).toBe("3");
        expect(msg.repeatedInt64Field).toStrictEqual([protoInt64.parse(4)]);
        expect(msg.repeatedInt64JsNumberField).toStrictEqual([
          protoInt64.parse(5),
        ]);
        expect(msg.repeatedInt64JsStringField).toStrictEqual(["6"]);
        expect(msg.either).toStrictEqual({
          case: "oneofInt64Field",
          value: protoInt64.parse(7),
        });
        expect(msg.mapInt64Int64Field).toStrictEqual({
          "1": protoInt64.parse(8),
          "2": protoInt64.parse(9),
        });
      });
      test("rejects other forms as type error but does not raise runtime error", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          // @ts-expect-error expected type error
          singularInt64Field: "1",
          // @ts-expect-error expected type error
          singularInt64JsNumberField: "2",
          // @ts-expect-error expected type error
          singularInt64JsStringField: protoInt64.parse(3),
          // @ts-expect-error expected type error
          repeatedInt64Field: [4],
          // @ts-expect-error expected type error
          repeatedInt64JsNumberField: [5],
          // @ts-expect-error expected type error
          repeatedInt64JsStringField: [protoInt64.parse(6)],
          either: {
            case: "oneofInt64Field",
            // @ts-expect-error expected type error
            value: 7,
          },
          mapInt64Int64Field: {
            // @ts-expect-error expected type error
            "1": 8,
            // @ts-expect-error expected type error
            "2": 9,
          },
        });
        expect(msg).toBeDefined();
        expect(msg.singularInt64Field).toBe("1");
        expect(msg.singularInt64JsNumberField).toBe("2");
        expect(msg.singularInt64JsStringField).toBe(protoInt64.parse(3));
        expect(msg.repeatedInt64Field).toStrictEqual([4]);
        expect(msg.repeatedInt64JsNumberField).toStrictEqual([5]);
        expect(msg.repeatedInt64JsStringField).toStrictEqual([
          protoInt64.parse(6),
        ]);
        expect(msg.either).toStrictEqual({
          case: "oneofInt64Field",
          value: 7,
        });
        expect(msg.mapInt64Int64Field).toStrictEqual({
          "1": 8,
          "2": 9,
        });
      });
    });
    describe("bytes", () => {
      test("converts number array to Uint8Array", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          // @ts-expect-error number array is still a type error
          singularBytesField: [0xde, 0xad, 0xbe, 0xef],
          repeatedBytesField: [
            // @ts-expect-error number array is still a type error
            [0xde, 0xad, 0xbe, 0xef],
            // @ts-expect-error number array is still a type error
            [0xde, 0xad, 0xbe, 0xef],
          ],
          either: {
            case: "oneofBytesField",
            // @ts-expect-error -- number array is still a type error
            value: [0xde, 0xad, 0xbe, 0xef],
          },
        });
        expect(msg.singularBytesField instanceof Uint8Array).toBe(true);
        expect(msg.repeatedBytesField.length).toBe(2);
        expect(msg.repeatedBytesField[0] instanceof Uint8Array).toBe(true);
        expect(msg.repeatedBytesField[1] instanceof Uint8Array).toBe(true);
        expect(msg.either.case).toBe("oneofBytesField");
        expect(msg.either.value instanceof Uint8Array).toBe(true);
      });
    });
    describe("message field", () => {
      test("accepts partial message", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          singularMessageField: {
            singularStringField: "str",
          },
          repeatedMessageField: [
            {
              singularStringField: "str",
            },
          ],
          either: {
            case: "oneofMessageField",
            value: {
              singularStringField: "str",
            },
          },
          mapInt32MessageField: {
            123: { singularStringField: "str" },
          },
        });
        expect(msg.singularMessageField).toBeDefined();
        expect(msg.singularMessageField?.singularStringField).toBe("str");
        expect(
          isMessage(msg.singularMessageField, proto3_ts.Proto3MessageSchema),
        ).toBe(true);

        expect(msg.repeatedMessageField.length).toBe(1);
        expect(msg.repeatedMessageField[0].singularStringField).toBe("str");
        expect(
          isMessage(msg.repeatedMessageField[0], proto3_ts.Proto3MessageSchema),
        ).toBe(true);

        expect(msg.either.case).toBe("oneofMessageField");
        expect(msg.either.value).toBeDefined();
        expect(isMessage(msg.either.value, proto3_ts.Proto3MessageSchema)).toBe(
          true,
        );

        expect(Object.keys(msg.mapInt32MessageField)).toStrictEqual(["123"]);
        expect(msg.mapInt32MessageField[123]).toBeDefined();
        expect(
          isMessage(
            msg.mapInt32MessageField[123],
            proto3_ts.Proto3MessageSchema,
          ),
        ).toBe(true);
      });
      test("accepts full message", () => {
        const testMessageSingular = create(proto3_ts.Proto3MessageSchema);
        const testMessageList = create(proto3_ts.Proto3MessageSchema);
        const testMessageOneof = create(proto3_ts.Proto3MessageSchema);
        const testMessageMap = create(proto3_ts.Proto3MessageSchema);
        const msg = create(proto3_ts.Proto3MessageSchema, {
          singularMessageField: testMessageSingular,
          repeatedMessageField: [testMessageList],
          either: {
            case: "oneofMessageField",
            value: testMessageOneof,
          },
          mapInt32MessageField: {
            123: testMessageMap,
          },
        });
        expect(msg.singularMessageField === testMessageSingular).toBe(true);
        expect(msg.repeatedMessageField[0] === testMessageList).toBe(true);
        expect(msg.either.value === testMessageOneof).toBe(true);
        expect(msg.mapInt32MessageField[123] === testMessageMap).toBe(true);
      });
    });
    describe("enum field", () => {
      test("accepts proto3 enum value out of range", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          // @ts-ignore -- required for older TS
          singularEnumField: 99,
        });
        expect(msg.singularEnumField).toBe(99);
      });
    });
    describe("list field", () => {
      test("accepts array", () => {
        const arr = ["a", "b", "c"];
        const msg = create(proto3_ts.Proto3MessageSchema, {
          repeatedStringField: arr,
        });
        expect(msg.repeatedStringField).toBe(arr);
      });
    });
    describe("map field", () => {
      test("accepts record object", () => {
        const recordObj = {
          a: "A",
          b: "B",
          c: "C",
        };
        const msg = create(proto3_ts.Proto3MessageSchema, {
          mapStringStringField: recordObj,
        });
        expect(msg.mapStringStringField).toBe(recordObj);
      });
    });
    describe("oneof field", () => {
      test("accepts selected field", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          either: {
            case: "oneofBoolField",
            value: false,
          },
        });
        expect(msg.either.case).toBe("oneofBoolField");
        expect(msg.either.value).toBe(false);
      });
    });
    describe("wkt wrapper field", () => {
      test("accepts unwrapped value only for singular field", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          singularWrappedUint32Field: 123,
          either: {
            case: "oneofWrappedUint32Field",
            value: {
              value: 123,
            },
          },
          repeatedWrappedUint32Field: [{ value: 123 }],
          mapInt32WrappedUint32Field: {
            123: {
              value: 123,
            },
          },
        });
        expect(msg.singularWrappedUint32Field).toBe(123);
        expect(msg.either.case).toBe("oneofWrappedUint32Field");
        if (msg.either.case == "oneofWrappedUint32Field") {
          expect(msg.either.value.$typeName).toBe(
            "google.protobuf.UInt32Value",
          );
          expect(msg.either.value.value).toBe(123);
        }
        expect(msg.repeatedWrappedUint32Field.length).toBe(1);
        expect(msg.repeatedWrappedUint32Field[0].$typeName).toBe(
          "google.protobuf.UInt32Value",
        );
        expect(msg.repeatedWrappedUint32Field[0].value).toBe(123);
        expect(msg.mapInt32WrappedUint32Field[123].$typeName).toBe(
          "google.protobuf.UInt32Value",
        );
        expect(msg.mapInt32WrappedUint32Field[123].value).toBe(123);
      });
    });
    describe("wkt struct field", () => {
      test("accepts JsonObject", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          singularStructField: {
            shouldBeJson: true,
          },
          repeatedStructField: [
            {
              shouldBeJson: 1,
            },
            {
              shouldBeJson: 2,
            },
          ],
          either: {
            case: "oneofStructField",
            value: {
              shouldBeJson: true,
            },
          },
          mapInt32StructField: {
            123: {
              shouldBeJson: true,
            },
          },
        });

        expect(msg.singularStructField).toStrictEqual({ shouldBeJson: true });
        expect(msg.repeatedStructField).toStrictEqual([
          {
            shouldBeJson: 1,
          },
          {
            shouldBeJson: 2,
          },
        ]);
        expect(msg.either.case).toBe("oneofStructField");
        if (msg.either.case == "oneofStructField") {
          expect(msg.either.value).toStrictEqual({
            shouldBeJson: true,
          });
        }
        expect(msg.mapInt32StructField[123]).toStrictEqual({
          shouldBeJson: true,
        });
      });
    });
  });
});
