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
  isFieldSet,
  isMessage,
  protoInt64,
  type MessageInitShape,
  type DescMessage,
} from "@bufbuild/protobuf";
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

void suite("create()", () => {
  void suite("with a generated descriptor", () => {
    void test("creates a typed message", () => {
      const user: example_ts.User = create(example_ts.UserSchema);
      assert.ok(user !== undefined);
      assert.strictEqual(user.$typeName, "example.User");
      assert.ok(user.firstName !== undefined);
    });
  });

  void suite("with an anonymous descriptor", () => {
    void test("creates an anonymous message", () => {
      const user = create(example_ts.UserSchema as DescMessage);
      assert.ok(user !== undefined);
      assert.strictEqual(user.$typeName, "example.User");
      // @ts-expect-error property is unknown to the type system, but still there
      assert.ok(user.firstName !== undefined);
    });
  });

  void suite("creates a zero message", () => {
    void suite("from proto3", () => {
      const desc = proto3_ts.Proto3MessageSchema;
      void test("with expected properties", () => {
        const msg = create(desc);
        function hasOwn(prop: keyof typeof msg) {
          return Object.prototype.hasOwnProperty.call(msg, prop);
        }
        // singular
        assert.strictEqual(msg.singularStringField, "");
        assert.strictEqual(hasOwn("singularStringField"), true);
        assert.ok(msg.singularBytesField instanceof Uint8Array);
        assert.strictEqual(msg.singularBytesField.length, 0);
        assert.strictEqual(hasOwn("singularBytesField"), true);
        assert.strictEqual(msg.singularInt32Field, 0);
        assert.strictEqual(hasOwn("singularInt32Field"), true);
        assert.strictEqual(msg.singularInt64Field, protoInt64.zero);
        assert.strictEqual(hasOwn("singularInt64Field"), true);
        assert.strictEqual(msg.singularInt64JsNumberField, protoInt64.zero);
        assert.strictEqual(hasOwn("singularInt64JsNumberField"), true);
        assert.strictEqual(typeof msg.singularInt64JsStringField, "string");
        assert.strictEqual(msg.singularInt64JsStringField, "0");
        assert.strictEqual(hasOwn("singularInt64JsStringField"), true);
        assert.strictEqual(msg.singularFloatField, 0);
        assert.strictEqual(hasOwn("singularFloatField"), true);
        assert.strictEqual(msg.singularBoolField, false);
        assert.strictEqual(hasOwn("singularBoolField"), true);
        assert.strictEqual(
          msg.singularEnumField,
          proto3_ts.Proto3Enum.UNSPECIFIED,
        );
        assert.strictEqual(hasOwn("singularEnumField"), true);
        assert.strictEqual(msg.singularMessageField, undefined);
        assert.strictEqual(hasOwn("singularMessageField"), false);
        assert.strictEqual(msg.singularWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("singularWrappedUint32Field"), false);

        // repeated
        assert.deepStrictEqual(msg.repeatedStringField, []);
        assert.strictEqual(hasOwn("repeatedStringField"), true);
        assert.deepStrictEqual(msg.repeatedBytesField, []);
        assert.strictEqual(hasOwn("repeatedBytesField"), true);
        assert.deepStrictEqual(msg.repeatedInt32Field, []);
        assert.strictEqual(hasOwn("repeatedInt32Field"), true);
        assert.deepStrictEqual(msg.repeatedInt64Field, []);
        assert.strictEqual(hasOwn("repeatedInt64Field"), true);
        assert.deepStrictEqual(msg.repeatedInt64JsNumberField, []);
        assert.strictEqual(hasOwn("repeatedInt64JsNumberField"), true);
        assert.deepStrictEqual(msg.repeatedInt64JsStringField, []);
        assert.strictEqual(hasOwn("repeatedInt64JsStringField"), true);
        assert.deepStrictEqual(msg.repeatedFloatField, []);
        assert.strictEqual(hasOwn("repeatedFloatField"), true);
        assert.deepStrictEqual(msg.repeatedBoolField, []);
        assert.strictEqual(hasOwn("repeatedBoolField"), true);
        assert.deepStrictEqual(msg.repeatedEnumField, []);
        assert.strictEqual(hasOwn("repeatedEnumField"), true);
        assert.deepStrictEqual(msg.repeatedMessageField, []);
        assert.strictEqual(hasOwn("repeatedMessageField"), true);
        assert.deepStrictEqual(msg.repeatedWrappedUint32Field, []);
        assert.strictEqual(hasOwn("repeatedWrappedUint32Field"), true);

        // optional
        assert.strictEqual(msg.optionalStringField, undefined);
        assert.strictEqual(hasOwn("optionalStringField"), false);
        assert.strictEqual(msg.optionalBytesField, undefined);
        assert.strictEqual(hasOwn("optionalBytesField"), false);
        assert.strictEqual(msg.optionalInt32Field, undefined);
        assert.strictEqual(hasOwn("optionalInt32Field"), false);
        assert.strictEqual(msg.optionalInt64Field, undefined);
        assert.strictEqual(hasOwn("optionalInt64Field"), false);
        assert.strictEqual(msg.optionalInt64JsNumberField, undefined);
        assert.strictEqual(hasOwn("optionalInt64JsNumberField"), false);
        assert.strictEqual(msg.optionalInt64JsStringField, undefined);
        assert.strictEqual(hasOwn("optionalInt64JsStringField"), false);
        assert.strictEqual(msg.optionalFloatField, undefined);
        assert.strictEqual(hasOwn("optionalFloatField"), false);
        assert.strictEqual(msg.optionalBoolField, undefined);
        assert.strictEqual(hasOwn("optionalBoolField"), false);
        assert.strictEqual(msg.optionalEnumField, undefined);
        assert.strictEqual(hasOwn("optionalEnumField"), false);
        assert.strictEqual(msg.optionalMessageField, undefined);
        assert.strictEqual(hasOwn("optionalMessageField"), false);
        assert.strictEqual(msg.optionalWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("optionalWrappedUint32Field"), false);

        // oneof
        assert.deepStrictEqual(msg.either, { case: undefined });
        assert.strictEqual(hasOwn("either"), true);

        // map
        assert.deepStrictEqual(msg.mapStringStringField, {});
        assert.strictEqual(hasOwn("mapStringStringField"), true);
        assert.deepStrictEqual(msg.mapInt32Int32Field, {});
        assert.strictEqual(hasOwn("mapInt32Int32Field"), true);
        assert.deepStrictEqual(msg.mapBoolBoolField, {});
        assert.strictEqual(hasOwn("mapBoolBoolField"), true);
        assert.deepStrictEqual(msg.mapInt64Int64Field, {});
        assert.strictEqual(hasOwn("mapInt64Int64Field"), true);
        assert.deepStrictEqual(msg.mapInt32EnumField, {});
        assert.strictEqual(hasOwn("mapInt32EnumField"), true);
        assert.deepStrictEqual(msg.mapInt32MessageField, {});
        assert.strictEqual(hasOwn("mapInt32MessageField"), true);
        assert.deepStrictEqual(msg.mapInt32WrappedUint32Field, {});
        assert.strictEqual(hasOwn("mapInt32WrappedUint32Field"), true);
      });
      void test("without custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        assert.strictEqual(hasCustomPrototype, false);
      });
    });
    void suite("from proto2", () => {
      const desc = proto2_ts.Proto2MessageSchema;
      void test("with expected properties", () => {
        const msg = create(desc);
        function hasOwn(prop: keyof typeof msg) {
          return Object.prototype.hasOwnProperty.call(msg, prop);
        }
        // required
        assert.strictEqual(msg.requiredStringField, "");
        assert.strictEqual(hasOwn("requiredStringField"), false);
        assert.ok(msg.requiredBytesField instanceof Uint8Array);
        assert.strictEqual(msg.requiredBytesField.length, 0);
        assert.strictEqual(hasOwn("requiredBytesField"), false);
        assert.strictEqual(msg.requiredInt32Field, 0);
        assert.strictEqual(hasOwn("requiredInt32Field"), false);
        assert.strictEqual(msg.requiredInt64Field, protoInt64.zero);
        assert.strictEqual(hasOwn("requiredInt64Field"), false);
        assert.strictEqual(msg.requiredInt64JsNumberField, protoInt64.zero);
        assert.strictEqual(hasOwn("requiredInt64JsNumberField"), false);
        assert.strictEqual(typeof msg.requiredInt64JsStringField, "string");
        assert.strictEqual(msg.requiredInt64JsStringField, "0");
        assert.strictEqual(hasOwn("requiredInt64JsStringField"), false);
        assert.strictEqual(msg.requiredFloatField, 0);
        assert.strictEqual(hasOwn("requiredFloatField"), false);
        assert.strictEqual(msg.requiredBoolField, false);
        assert.strictEqual(hasOwn("requiredBoolField"), false);
        assert.strictEqual(msg.requiredEnumField, proto2_ts.Proto2Enum.YES);
        assert.strictEqual(hasOwn("requiredEnumField"), false);
        assert.strictEqual(msg.requiredMessageField, undefined);
        assert.strictEqual(hasOwn("requiredMessageField"), false);
        assert.strictEqual(msg.requireddefaultgroup, undefined);
        assert.strictEqual(hasOwn("requireddefaultgroup"), false);
        assert.strictEqual(msg.requiredWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("requiredWrappedUint32Field"), false);

        // required with default
        assert.strictEqual(msg.requiredDefaultStringField, 'hello " */ ');
        assert.strictEqual(hasOwn("requiredStringField"), false);
        assert.ok(msg.requiredDefaultBytesField instanceof Uint8Array);
        assert.strictEqual(hasOwn("requiredBytesField"), false);
        assert.strictEqual(msg.requiredDefaultBytesField.length, 17);
        assert.strictEqual(hasOwn("requiredInt32Field"), false);
        assert.strictEqual(msg.requiredDefaultInt32Field, 128);
        assert.strictEqual(hasOwn("requiredInt64Field"), false);
        assert.strictEqual(
          msg.requiredDefaultInt64Field,
          protoInt64.parse(-256),
        );
        assert.strictEqual(hasOwn("requiredInt64Field"), false);
        assert.strictEqual(
          msg.requiredDefaultInt64JsNumberField,
          protoInt64.parse(-256),
        );
        assert.strictEqual(hasOwn("requiredDefaultInt64JsNumberField"), false);
        assert.strictEqual(
          typeof msg.requiredDefaultInt64JsStringField,
          "string",
        );
        assert.strictEqual(msg.requiredDefaultInt64JsStringField, "-256");
        assert.strictEqual(hasOwn("requiredDefaultInt64JsStringField"), false);
        assert.strictEqual(hasOwn("requiredFloatField"), false);
        assert.strictEqual(msg.requiredDefaultFloatField, -512.13);
        assert.strictEqual(hasOwn("requiredBoolField"), false);
        assert.strictEqual(msg.requiredDefaultBoolField, true);
        assert.strictEqual(hasOwn("requiredEnumField"), false);
        assert.strictEqual(
          msg.requiredDefaultEnumField,
          proto2_ts.Proto2Enum.YES,
        );
        assert.strictEqual(hasOwn("requiredDefaultEnumField"), false);
        assert.strictEqual(msg.requiredDefaultMessageField, undefined);
        assert.strictEqual(hasOwn("requiredDefaultMessageField"), false);
        assert.strictEqual(msg.requireddefaultgroup, undefined);
        assert.strictEqual(hasOwn("requireddefaultgroup"), false);
        assert.strictEqual(msg.requiredDefaultWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("requiredDefaultWrappedUint32Field"), false);

        // repeated
        assert.deepStrictEqual(msg.repeatedStringField, []);
        assert.strictEqual(hasOwn("repeatedStringField"), true);
        assert.deepStrictEqual(msg.repeatedBytesField, []);
        assert.strictEqual(hasOwn("repeatedBytesField"), true);
        assert.deepStrictEqual(msg.repeatedInt32Field, []);
        assert.strictEqual(hasOwn("repeatedInt32Field"), true);
        assert.deepStrictEqual(msg.repeatedInt64Field, []);
        assert.strictEqual(hasOwn("repeatedInt64Field"), true);
        assert.deepStrictEqual(msg.repeatedInt64JsNumberField, []);
        assert.strictEqual(hasOwn("repeatedInt64JsNumberField"), true);
        assert.deepStrictEqual(msg.repeatedInt64JsStringField, []);
        assert.strictEqual(hasOwn("repeatedInt64JsStringField"), true);
        assert.deepStrictEqual(msg.repeatedFloatField, []);
        assert.strictEqual(hasOwn("repeatedFloatField"), true);
        assert.deepStrictEqual(msg.repeatedBoolField, []);
        assert.strictEqual(hasOwn("repeatedBoolField"), true);
        assert.deepStrictEqual(msg.repeatedEnumField, []);
        assert.strictEqual(hasOwn("repeatedEnumField"), true);
        assert.deepStrictEqual(msg.repeatedMessageField, []);
        assert.strictEqual(hasOwn("repeatedMessageField"), true);
        assert.deepStrictEqual(msg.repeatedWrappedUint32Field, []);
        assert.strictEqual(hasOwn("repeatedWrappedUint32Field"), true);

        // optional
        assert.strictEqual(msg.optionalStringField, "");
        assert.strictEqual(hasOwn("optionalStringField"), false);
        assert.ok(msg.optionalBytesField instanceof Uint8Array);
        assert.strictEqual(msg.optionalBytesField.length, 0);
        assert.strictEqual(hasOwn("optionalBytesField"), false);
        assert.strictEqual(msg.optionalInt32Field, 0);
        assert.strictEqual(hasOwn("optionalInt32Field"), false);
        assert.strictEqual(msg.optionalInt64Field, protoInt64.zero);
        assert.strictEqual(hasOwn("optionalInt64Field"), false);
        assert.strictEqual(msg.optionalInt64JsNumberField, protoInt64.zero);
        assert.strictEqual(hasOwn("optionalInt64JsNumberField"), false);
        assert.strictEqual(typeof msg.optionalInt64JsStringField, "string");
        assert.strictEqual(msg.optionalInt64JsStringField, "0");
        assert.strictEqual(hasOwn("optionalInt64JsStringField"), false);
        assert.strictEqual(msg.optionalFloatField, 0);
        assert.strictEqual(hasOwn("optionalFloatField"), false);
        assert.strictEqual(msg.optionalBoolField, false);
        assert.strictEqual(hasOwn("optionalBoolField"), false);
        assert.strictEqual(msg.optionalEnumField, 1);
        assert.strictEqual(hasOwn("optionalEnumField"), false);
        assert.strictEqual(msg.optionalMessageField, undefined);
        assert.strictEqual(hasOwn("optionalMessageField"), false);
        assert.strictEqual(msg.optionalgroup, undefined);
        assert.strictEqual(hasOwn("optionalgroup"), false);
        assert.strictEqual(msg.optionalWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("optionalWrappedUint32Field"), false);

        // optional with default
        assert.strictEqual(msg.optionalDefaultStringField, 'hello " */ ');
        assert.strictEqual(hasOwn("optionalDefaultStringField"), false);
        assert.ok(msg.optionalDefaultBytesField instanceof Uint8Array);
        assert.strictEqual(hasOwn("optionalDefaultBytesField"), false);
        assert.strictEqual(msg.optionalDefaultBytesField.length, 17);
        assert.strictEqual(hasOwn("optionalDefaultBytesField"), false);
        assert.strictEqual(msg.optionalDefaultInt32Field, 128);
        assert.strictEqual(hasOwn("optionalDefaultInt32Field"), false);
        assert.strictEqual(
          msg.optionalDefaultInt64Field,
          protoInt64.parse(-256),
        );
        assert.strictEqual(hasOwn("optionalDefaultInt64Field"), false);
        assert.strictEqual(
          msg.optionalDefaultInt64JsNumberField,
          protoInt64.parse(-256),
        );
        assert.strictEqual(hasOwn("optionalDefaultInt64JsNumberField"), false);
        assert.strictEqual(msg.optionalDefaultInt64JsStringField, "-256");
        assert.strictEqual(hasOwn("optionalDefaultInt64JsStringField"), false);
        assert.strictEqual(msg.optionalDefaultFloatField, -512.13);
        assert.strictEqual(hasOwn("optionalDefaultFloatField"), false);
        assert.strictEqual(msg.optionalDefaultBoolField, true);
        assert.strictEqual(hasOwn("optionalDefaultBoolField"), false);
        assert.strictEqual(
          msg.optionalDefaultEnumField,
          proto2_ts.Proto2Enum.YES,
        );
        assert.strictEqual(hasOwn("optionalDefaultEnumField"), false);
        assert.strictEqual(msg.optionalDefaultMessageField, undefined);
        assert.strictEqual(hasOwn("optionalDefaultMessageField"), false);
        assert.strictEqual(msg.optionaldefaultgroup, undefined);
        assert.strictEqual(hasOwn("optionaldefaultgroup"), false);
        assert.strictEqual(msg.optionalWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("optionalWrappedUint32Field"), false);

        // oneof
        assert.deepStrictEqual(msg.either, { case: undefined });
        assert.strictEqual(hasOwn("either"), true);

        // map
        assert.deepStrictEqual(msg.mapStringStringField, {});
        assert.strictEqual(hasOwn("mapStringStringField"), true);
        assert.deepStrictEqual(msg.mapInt32Int32Field, {});
        assert.strictEqual(hasOwn("mapInt32Int32Field"), true);
        assert.deepStrictEqual(msg.mapBoolBoolField, {});
        assert.strictEqual(hasOwn("mapBoolBoolField"), true);
        assert.deepStrictEqual(msg.mapInt64Int64Field, {});
        assert.strictEqual(hasOwn("mapInt64Int64Field"), true);
        assert.deepStrictEqual(msg.mapInt32EnumField, {});
        assert.strictEqual(hasOwn("mapInt32EnumField"), true);
        assert.deepStrictEqual(msg.mapInt32MessageField, {});
        assert.strictEqual(hasOwn("mapInt32MessageField"), true);
        assert.deepStrictEqual(msg.mapInt32WrappedUint32Field, {});
        assert.strictEqual(hasOwn("mapInt32WrappedUint32Field"), true);
      });
      void test("with custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        assert.strictEqual(hasCustomPrototype, true);
      });
    });
    void suite("from edition2023", () => {
      const desc = edition2023_ts.Edition2023MessageSchema;
      void test("with expected properties", () => {
        const msg = create(desc);
        function hasOwn(prop: keyof typeof msg) {
          return Object.prototype.hasOwnProperty.call(msg, prop);
        }

        // explicit
        assert.strictEqual(msg.explicitStringField, "");
        assert.strictEqual(hasOwn("explicitStringField"), false);
        assert.ok(msg.explicitBytesField instanceof Uint8Array);
        assert.strictEqual(msg.explicitBytesField.length, 0);
        assert.strictEqual(hasOwn("explicitBytesField"), false);
        assert.strictEqual(msg.explicitInt32Field, 0);
        assert.strictEqual(hasOwn("explicitInt32Field"), false);
        assert.strictEqual(msg.explicitInt64Field, protoInt64.zero);
        assert.strictEqual(hasOwn("explicitInt64Field"), false);
        assert.strictEqual(msg.explicitInt64JsNumberField, protoInt64.zero);
        assert.strictEqual(hasOwn("explicitInt64JsNumberField"), false);
        assert.strictEqual(typeof msg.explicitInt64JsStringField, "string");
        assert.strictEqual(msg.explicitInt64JsStringField, "0");
        assert.strictEqual(hasOwn("explicitInt64JsStringField"), false);
        assert.strictEqual(msg.explicitFloatField, 0);
        assert.strictEqual(hasOwn("explicitFloatField"), false);
        assert.strictEqual(msg.explicitBoolField, false);
        assert.strictEqual(hasOwn("explicitBoolField"), false);
        assert.strictEqual(
          msg.explicitEnumOpenField,
          edition2023_ts.Edition2023EnumOpen.UNSPECIFIED,
        );
        assert.strictEqual(hasOwn("explicitEnumOpenField"), false);
        assert.strictEqual(
          msg.explicitEnumClosedField,
          edition2023_ts.Edition2023EnumClosed.A,
        );
        assert.strictEqual(hasOwn("explicitEnumClosedField"), false);
        assert.strictEqual(msg.explicitMessageField, undefined);
        assert.strictEqual(hasOwn("explicitMessageField"), false);
        assert.strictEqual(msg.explicitMessageDelimitedField, undefined);
        assert.strictEqual(hasOwn("explicitMessageDelimitedField"), false);
        assert.strictEqual(msg.explicitWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("explicitWrappedUint32Field"), false);

        // implicit
        assert.strictEqual(msg.implicitStringField, "");
        assert.strictEqual(hasOwn("implicitStringField"), true);
        assert.ok(msg.implicitBytesField instanceof Uint8Array);
        assert.strictEqual(msg.implicitBytesField.length, 0);
        assert.strictEqual(hasOwn("implicitBytesField"), true);
        assert.strictEqual(msg.implicitInt32Field, 0);
        assert.strictEqual(hasOwn("implicitInt32Field"), true);
        assert.strictEqual(msg.implicitInt64Field, protoInt64.zero);
        assert.strictEqual(hasOwn("implicitInt64Field"), true);
        assert.strictEqual(msg.implicitInt64JsNumberField, protoInt64.zero);
        assert.strictEqual(hasOwn("implicitInt64JsNumberField"), true);
        assert.strictEqual(typeof msg.implicitInt64JsStringField, "string");
        assert.strictEqual(msg.implicitInt64JsStringField, "0");
        assert.strictEqual(hasOwn("implicitInt64JsStringField"), true);
        assert.strictEqual(msg.implicitFloatField, 0);
        assert.strictEqual(hasOwn("implicitFloatField"), true);
        assert.strictEqual(msg.implicitBoolField, false);
        assert.strictEqual(hasOwn("implicitBoolField"), true);
        assert.strictEqual(
          msg.implicitEnumOpenField,
          edition2023_ts.Edition2023EnumOpen.UNSPECIFIED,
        );
        assert.strictEqual(hasOwn("implicitEnumOpenField"), true);

        // required
        assert.strictEqual(msg.requiredStringField, "");
        assert.strictEqual(hasOwn("requiredStringField"), false);
        assert.ok(msg.requiredBytesField instanceof Uint8Array);
        assert.strictEqual(msg.requiredBytesField.length, 0);
        assert.strictEqual(hasOwn("requiredBytesField"), false);
        assert.strictEqual(msg.requiredInt32Field, 0);
        assert.strictEqual(hasOwn("requiredInt32Field"), false);
        assert.strictEqual(msg.requiredInt64Field, protoInt64.zero);
        assert.strictEqual(hasOwn("requiredInt64Field"), false);
        assert.strictEqual(msg.requiredInt64JsNumberField, protoInt64.zero);
        assert.strictEqual(hasOwn("requiredInt64JsNumberField"), false);
        assert.strictEqual(typeof msg.requiredInt64JsStringField, "string");
        assert.strictEqual(msg.requiredInt64JsStringField, "0");
        assert.strictEqual(hasOwn("requiredInt64JsStringField"), false);
        assert.strictEqual(msg.requiredFloatField, 0);
        assert.strictEqual(hasOwn("requiredFloatField"), false);
        assert.strictEqual(msg.requiredBoolField, false);
        assert.strictEqual(hasOwn("requiredBoolField"), false);
        assert.strictEqual(
          msg.requiredEnumOpenField,
          edition2023_ts.Edition2023EnumOpen.UNSPECIFIED,
        );
        assert.strictEqual(hasOwn("requiredEnumOpenField"), false);
        assert.strictEqual(
          msg.requiredEnumClosedField,
          edition2023_ts.Edition2023EnumClosed.A,
        );
        assert.strictEqual(hasOwn("requiredEnumClosedField"), false);
        assert.strictEqual(msg.requiredMessageField, undefined);
        assert.strictEqual(hasOwn("requiredMessageField"), false);
        assert.strictEqual(msg.requiredMessageDelimitedField, undefined);
        assert.strictEqual(hasOwn("requiredMessageDelimitedField"), false);
        assert.strictEqual(msg.requiredWrappedUint32Field, undefined);
        assert.strictEqual(hasOwn("requiredWrappedUint32Field"), false);

        // required with default
        assert.strictEqual(msg.requiredDefaultStringField, 'hello " */ ');
        assert.strictEqual(hasOwn("requiredStringField"), false);
        assert.ok(msg.requiredDefaultBytesField instanceof Uint8Array);
        assert.strictEqual(hasOwn("requiredBytesField"), false);
        assert.strictEqual(msg.requiredDefaultBytesField.length, 17);
        assert.strictEqual(hasOwn("requiredInt32Field"), false);
        assert.strictEqual(msg.requiredDefaultInt32Field, 128);
        assert.strictEqual(hasOwn("requiredInt64Field"), false);
        assert.strictEqual(
          msg.requiredDefaultInt64Field,
          protoInt64.parse(-256),
        );
        assert.strictEqual(hasOwn("requiredInt64Field"), false);
        assert.strictEqual(
          msg.requiredDefaultInt64JsNumberField,
          protoInt64.parse(-256),
        );
        assert.strictEqual(hasOwn("requiredDefaultInt64JsNumberField"), false);
        assert.strictEqual(
          typeof msg.requiredDefaultInt64JsStringField,
          "string",
        );
        assert.strictEqual(msg.requiredDefaultInt64JsStringField, "-256");
        assert.strictEqual(hasOwn("requiredDefaultInt64JsStringField"), false);
        assert.strictEqual(msg.requiredDefaultFloatField, -512.13);
        assert.strictEqual(hasOwn("requiredDefaultFloatField"), false);
        assert.strictEqual(msg.requiredDefaultFloatField, -512.13);
        assert.strictEqual(hasOwn("requiredDefaultFloatField"), false);
        assert.strictEqual(msg.requiredDefaultBoolField, true);
        assert.strictEqual(hasOwn("requiredDefaultBoolField"), false);
        assert.strictEqual(
          msg.requiredDefaultEnumOpenField,
          edition2023_ts.Edition2023EnumOpen.A,
        );
        assert.strictEqual(hasOwn("requiredDefaultEnumOpenField"), false);
        assert.strictEqual(
          msg.requiredDefaultEnumClosedField,
          edition2023_ts.Edition2023EnumClosed.A,
        );

        // repeated
        assert.deepStrictEqual(msg.repeatedStringField, []);
        assert.strictEqual(hasOwn("repeatedStringField"), true);
        assert.deepStrictEqual(msg.repeatedBytesField, []);
        assert.strictEqual(hasOwn("repeatedBytesField"), true);
        assert.deepStrictEqual(msg.repeatedInt32Field, []);
        assert.strictEqual(hasOwn("repeatedInt32Field"), true);
        assert.deepStrictEqual(msg.repeatedInt64Field, []);
        assert.strictEqual(hasOwn("repeatedInt64Field"), true);
        assert.deepStrictEqual(msg.repeatedInt64JsNumberField, []);
        assert.strictEqual(hasOwn("repeatedInt64JsNumberField"), true);
        assert.deepStrictEqual(msg.repeatedInt64JsStringField, []);
        assert.strictEqual(hasOwn("repeatedInt64JsStringField"), true);
        assert.deepStrictEqual(msg.repeatedFloatField, []);
        assert.strictEqual(hasOwn("repeatedFloatField"), true);
        assert.deepStrictEqual(msg.repeatedBoolField, []);
        assert.strictEqual(hasOwn("repeatedBoolField"), true);
        assert.deepStrictEqual(msg.repeatedEnumOpenField, []);
        assert.strictEqual(hasOwn("repeatedEnumOpenField"), true);
        assert.deepStrictEqual(msg.repeatedEnumClosedField, []);
        assert.strictEqual(hasOwn("repeatedEnumClosedField"), true);
        assert.deepStrictEqual(msg.repeatedMessageField, []);
        assert.strictEqual(hasOwn("repeatedMessageField"), true);
        assert.deepStrictEqual(msg.repeatedWrappedUint32Field, []);
        assert.strictEqual(hasOwn("repeatedWrappedUint32Field"), true);

        // oneof
        assert.deepStrictEqual(msg.either, { case: undefined });
        assert.strictEqual(hasOwn("either"), true);

        // map
        assert.deepStrictEqual(msg.mapStringStringField, {});
        assert.strictEqual(hasOwn("mapStringStringField"), true);
        assert.deepStrictEqual(msg.mapInt32Int32Field, {});
        assert.strictEqual(hasOwn("mapInt32Int32Field"), true);
        assert.deepStrictEqual(msg.mapBoolBoolField, {});
        assert.strictEqual(hasOwn("mapBoolBoolField"), true);
        assert.deepStrictEqual(msg.mapInt64Int64Field, {});
        assert.strictEqual(hasOwn("mapInt64Int64Field"), true);
        assert.deepStrictEqual(msg.mapInt32EnumOpenField, {});
        assert.strictEqual(hasOwn("mapInt32EnumOpenField"), true);
        assert.deepStrictEqual(msg.mapInt32MessageField, {});
        assert.strictEqual(hasOwn("mapInt32MessageField"), true);
        assert.deepStrictEqual(msg.mapInt32WrappedUint32Field, {});
        assert.strictEqual(hasOwn("mapInt32WrappedUint32Field"), true);
      });
      void test("with custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        assert.strictEqual(hasCustomPrototype, true);
      });
    });
    void suite("from edition2023 with proto3 features", () => {
      const desc = test_messages_proto3_editions_ts.TestAllTypesProto3Schema;
      test("without custom prototype", () => {
        const msg = create(desc);
        const hasCustomPrototype =
          Object.getPrototypeOf(msg) !== Object.prototype;
        assert.strictEqual(hasCustomPrototype, false);
      });
    });
  });

  void suite("with init argument", () => {
    test("typed message returns same instance of typed message", () => {
      const user1 = create(example_ts.UserSchema);
      const user2 = create(example_ts.UserSchema, user1);
      assert.strictEqual(user2, user1);
    });
    test("rejects foreign typed message as a type error", () => {
      const user = create(example_ts.UserSchema);
      // @ts-expect-error TS2345
      const notAUser = create(proto3_ts.Proto3MessageSchema, user);
      assert.ok(notAUser !== undefined);
    });
    test("rejects foreign typed message with assignable properties as a type error", () => {
      const a = create(ts_types.TsTypeASchema);
      // @ts-expect-error TS2345: Argument of type TsTypeA is not assignable to parameter of type MessageInit<TsTypeB> | undefined
      const b = create(ts_types.TsTypeBSchema, a);
      assert.ok(b !== undefined);
    });
    test("rejects extra properties in the object literal as a type error", () => {
      const msg = create(proto3_ts.Proto3MessageSchema, {
        // @ts-expect-error TS2353
        extraProperty: true,
      });
      assert.ok(msg !== undefined);
    });
    void suite("inits proto2", () => {
      for (const name of fillProto2MessageNames()) {
        void test(`field ${name}`, () => {
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
              assert.deepStrictEqual(created.either, filled.either);
              break;
            default:
              assert.strictEqual(isFieldSet(created, desc.field[name]), true);
              assert.deepStrictEqual(created[name], filled[name]);
          }
        });
      }
    });
    void suite("inits proto3", () => {
      for (const name of fillProto3MessageNames()) {
        void test(`field ${name}`, () => {
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
              assert.deepStrictEqual(created.either, filled.either);
              break;
            default:
              assert.strictEqual(isFieldSet(created, desc.field[name]), true);
              assert.deepStrictEqual(created[name], filled[name]);
          }
        });
      }
    });
    void suite("inits edition2023", () => {
      for (const name of fillEdition2023MessageNames()) {
        void test(`field ${name}`, () => {
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
              assert.deepStrictEqual(created.either, filled.either);
              break;
            default:
              assert.strictEqual(isFieldSet(created, desc.field[name]), true);
              assert.deepStrictEqual(created[name], filled[name]);
          }
        });
      }
    });
    void suite("skips null values", () => {
      for (const desc of [
        proto2_ts.Proto2MessageSchema,
        proto3_ts.Proto3MessageSchema,
        edition2023_ts.Edition2023MessageSchema,
      ]) {
        void suite(`${desc.typeName}`, () => {
          for (const field of desc.fields) {
            void test(`${field.name}`, () => {
              const init: Record<string, unknown> = {};
              for (const f of desc.members) {
                init[f.localName] = null;
              }
              const msg = create(desc, init);
              const r = reflect(desc, msg);
              assert.strictEqual(r.isSet(field), false);
            });
          }
        });
      }
    });
    void suite("skips undefined values", () => {
      for (const desc of [
        proto2_ts.Proto2MessageSchema,
        proto3_ts.Proto3MessageSchema,
        edition2023_ts.Edition2023MessageSchema,
      ]) {
        void suite(`${desc.typeName}`, () => {
          for (const field of desc.fields) {
            void test(`${field.name}`, () => {
              const init: Record<string, unknown> = {};
              for (const f of desc.members) {
                init[f.localName] = undefined;
              }
              const msg = create(desc, init);
              const r = reflect(desc, msg);
              assert.strictEqual(r.isSet(field), false);
            });
          }
        });
      }
    });
    void suite("64-bit integer field", () => {
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
        assert.strictEqual(msg.singularInt64Field, protoInt64.parse(1));
        assert.strictEqual(msg.singularInt64JsNumberField, protoInt64.parse(2));
        assert.strictEqual(msg.singularInt64JsStringField, "3");
        assert.deepStrictEqual(msg.repeatedInt64Field, [protoInt64.parse(4)]);
        assert.deepStrictEqual(msg.repeatedInt64JsNumberField, [
          protoInt64.parse(5),
        ]);
        assert.deepStrictEqual(msg.repeatedInt64JsStringField, ["6"]);
        assert.deepStrictEqual(msg.either, {
          case: "oneofInt64Field",
          value: protoInt64.parse(7),
        });
        assert.deepStrictEqual(msg.mapInt64Int64Field, {
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
        assert.ok(msg !== undefined);
        assert.strictEqual(msg.singularInt64Field, "1");
        assert.strictEqual(msg.singularInt64JsNumberField, "2");
        assert.strictEqual(msg.singularInt64JsStringField, protoInt64.parse(3));
        assert.deepStrictEqual(msg.repeatedInt64Field, [4]);
        assert.deepStrictEqual(msg.repeatedInt64JsNumberField, [5]);
        assert.deepStrictEqual(msg.repeatedInt64JsStringField, [
          protoInt64.parse(6),
        ]);
        assert.deepStrictEqual(msg.either, {
          case: "oneofInt64Field",
          value: 7,
        });
        assert.deepStrictEqual(msg.mapInt64Int64Field, {
          "1": 8,
          "2": 9,
        });
      });
    });
    void suite("bytes", () => {
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
        assert.strictEqual(msg.singularBytesField instanceof Uint8Array, true);
        assert.strictEqual(msg.repeatedBytesField.length, 2);
        assert.strictEqual(
          msg.repeatedBytesField[0] instanceof Uint8Array,
          true,
        );
        assert.strictEqual(
          msg.repeatedBytesField[1] instanceof Uint8Array,
          true,
        );
        assert.strictEqual(msg.either.case, "oneofBytesField");
        assert.strictEqual(msg.either.value instanceof Uint8Array, true);
      });
    });
    void suite("message field", () => {
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
        assert.ok(msg.singularMessageField !== undefined);
        assert.strictEqual(
          msg.singularMessageField?.singularStringField,
          "str",
        );
        assert.ok(
          isMessage(msg.singularMessageField, proto3_ts.Proto3MessageSchema),
        );

        assert.strictEqual(msg.repeatedMessageField.length, 1);
        assert.strictEqual(
          msg.repeatedMessageField[0].singularStringField,
          "str",
        );
        assert.ok(
          isMessage(msg.repeatedMessageField[0], proto3_ts.Proto3MessageSchema),
        );

        assert.strictEqual(msg.either.case, "oneofMessageField");
        assert.ok(msg.either.value !== undefined);
        assert.ok(isMessage(msg.either.value, proto3_ts.Proto3MessageSchema));

        assert.deepStrictEqual(Object.keys(msg.mapInt32MessageField), ["123"]);
        assert.ok(msg.mapInt32MessageField[123] !== undefined);
        assert.ok(
          isMessage(
            msg.mapInt32MessageField[123],
            proto3_ts.Proto3MessageSchema,
          ),
        );
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
        assert.strictEqual(
          msg.singularMessageField === testMessageSingular,
          true,
        );
        assert.strictEqual(
          msg.repeatedMessageField[0] === testMessageList,
          true,
        );
        assert.strictEqual(msg.either.value === testMessageOneof, true);
        assert.strictEqual(
          msg.mapInt32MessageField[123] === testMessageMap,
          true,
        );
      });
    });
    void suite("enum field", () => {
      test("accepts proto3 enum value out of range", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          // @ts-ignore -- required for older TS
          singularEnumField: 99,
        });
        assert.strictEqual(msg.singularEnumField, 99);
      });
    });
    void suite("list field", () => {
      test("accepts array", () => {
        const arr = ["a", "b", "c"];
        const msg = create(proto3_ts.Proto3MessageSchema, {
          repeatedStringField: arr,
        });
        assert.strictEqual(msg.repeatedStringField, arr);
      });
    });
    void suite("map field", () => {
      test("accepts record object", () => {
        const recordObj = {
          a: "A",
          b: "B",
          c: "C",
        };
        const msg = create(proto3_ts.Proto3MessageSchema, {
          mapStringStringField: recordObj,
        });
        assert.strictEqual(msg.mapStringStringField, recordObj);
      });
    });
    void suite("oneof field", () => {
      test("accepts selected field", () => {
        const msg = create(proto3_ts.Proto3MessageSchema, {
          either: {
            case: "oneofBoolField",
            value: false,
          },
        });
        assert.strictEqual(msg.either.case, "oneofBoolField");
        assert.strictEqual(msg.either.value, false);
      });
    });
    void suite("wkt wrapper field", () => {
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
        assert.strictEqual(msg.singularWrappedUint32Field, 123);
        assert.strictEqual(msg.either.case, "oneofWrappedUint32Field");
        if (msg.either.case == "oneofWrappedUint32Field") {
          assert.strictEqual(
            msg.either.value.$typeName,
            "google.protobuf.UInt32Value",
          );
          assert.strictEqual(msg.either.value.value, 123);
        }
        assert.strictEqual(msg.repeatedWrappedUint32Field.length, 1);
        assert.strictEqual(
          msg.repeatedWrappedUint32Field[0].$typeName,
          "google.protobuf.UInt32Value",
        );
        assert.strictEqual(msg.repeatedWrappedUint32Field[0].value, 123);
        assert.strictEqual(
          msg.mapInt32WrappedUint32Field[123].$typeName,
          "google.protobuf.UInt32Value",
        );
        assert.strictEqual(msg.mapInt32WrappedUint32Field[123].value, 123);
      });
    });
    void suite("wkt struct field", () => {
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

        assert.deepStrictEqual(msg.singularStructField, { shouldBeJson: true });
        assert.deepStrictEqual(msg.repeatedStructField, [
          {
            shouldBeJson: 1,
          },
          {
            shouldBeJson: 2,
          },
        ]);
        assert.strictEqual(msg.either.case, "oneofStructField");
        if (msg.either.case == "oneofStructField") {
          assert.deepStrictEqual(msg.either.value, {
            shouldBeJson: true,
          });
        }
        assert.deepStrictEqual(msg.mapInt32StructField[123], {
          shouldBeJson: true,
        });
      });
    });
  });
});
