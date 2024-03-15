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
import { create, isMessage } from "@bufbuild/protobuf/next";
import { describe, expect, test } from "@jest/globals";
import * as example_ts from "../gen/ts/extra/example_pbv2.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pbv2.js";
import type { Proto3Message } from "../gen/ts/extra/proto3_pbv2.js";
import { Proto3Enum, Proto3MessageDesc } from "../gen/ts/extra/proto3_pbv2.js";
import * as proto2_ts from "../gen/ts/extra/proto2_pbv2.js";
import * as TS from "../gen/ts/extra/proto2_pb.js";
import { reflect } from "@bufbuild/protobuf/next/reflect";
import { Proto2MessageDesc } from "../gen/ts/extra/proto2_pbv2.js";
import { UserDesc } from "../gen/ts/extra/example_pbv2.js";
import type { MessageInitShape } from "@bufbuild/protobuf/next";

/* eslint-disable @typescript-eslint/ban-ts-comment -- to support older TS versions in the TS compat tests, we cannot use ts-expect-error */

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
        expect(msg.requiredDefaultEnumField).toBe(TS.Proto2Enum.YES);
        expect(hasOwn("requiredMessageField")).toBe(false);
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
        expect(msg.optionalDefaultEnumField).toBe(TS.Proto2Enum.YES);
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
    });
  });

  describe("with init argument", () => {
    test("typed message returns same instance of typed message", () => {
      const user1 = create(example_ts.UserDesc);
      const user2 = create(example_ts.UserDesc, user1);
      expect(user2).toBe(user1);
    });
    test("rejects foreign typed message", () => {
      const user = create(example_ts.UserDesc);
      // @ts-expect-error TS2345
      const notAUser = create(proto3_ts.Proto3MessageDesc, user);
      expect(notAUser).toBeDefined();
    });
    test("rejects extra properties in the object literal as a type error", () => {
      const msg = create(Proto3MessageDesc, {
        // @ts-expect-error TS2353
        extraProperty: true,
      });
      expect(msg).toBeDefined();
    });
    describe("skips proto3 zero values", () => {
      const msg = create(Proto3MessageDesc, {
        singularStringField: "",
        singularBytesField: new Uint8Array(0),
        singularInt32Field: 0,
        singularInt64Field: protoInt64.zero,
        singularInt64JsNumberField: protoInt64.zero,
        singularInt64JsStringField: "0",
        singularFloatField: 0,
        singularBoolField: false,
        singularEnumField: Proto3Enum.UNSPECIFIED,
        singularMessageField: undefined,
        singularWrappedUint32Field: undefined,
        repeatedStringField: [],
        repeatedEnumField: [],
        repeatedMessageField: [],
        // TODO support map fields
        // mapStringStringField: {},
      });
      const r = reflect(msg);
      test.each(r.fields)("$name", (f) => {
        expect(r.isSet(f)).toBe(false);
      });
    });
    describe("skips null value", () => {
      const msg = create(Proto3MessageDesc, {
        singularStringField: null,
        singularBytesField: null,
        singularInt32Field: null,
        singularInt64Field: null,
        singularInt64JsNumberField: null,
        singularInt64JsStringField: null,
        singularFloatField: null,
        singularBoolField: null,
        singularEnumField: null,
        singularMessageField: null,
        singularWrappedUint32Field: null,
        repeatedStringField: null,
        repeatedEnumField: null,
        repeatedMessageField: null,
        // TODO support map fields
        // mapStringStringField: null,
      } as unknown as MessageInitShape<typeof Proto3MessageDesc>);
      const r = reflect(msg);
      test.each(r.fields)("$name", (f) => {
        expect(r.isSet(f)).toBe(false);
      });
    });
    describe("skips undefined value", () => {
      const msg = create(Proto3MessageDesc, {
        singularStringField: undefined,
        singularBytesField: undefined,
        singularInt32Field: undefined,
        singularInt64Field: undefined,
        singularInt64JsNumberField: undefined,
        singularInt64JsStringField: undefined,
        singularFloatField: undefined,
        singularBoolField: undefined,
        singularEnumField: undefined,
        singularMessageField: undefined,
        singularWrappedUint32Field: undefined,
        repeatedStringField: undefined,
        repeatedEnumField: undefined,
        repeatedMessageField: undefined,
        // TODO support map fields
        // mapStringStringField: undefined,
      });
      const r = reflect(msg);
      test.each(r.fields)("$name", (f) => {
        expect(r.isSet(f)).toBe(false);
      });
    });
    describe("64-bit integer field", () => {
      function expect64BitFields(msg: Proto3Message) {
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
        expect(msg.singularMessageField?.either).toStrictEqual({
          case: "oneofInt64JsNumberField",
          value: protoInt64.parse(8),
        });
        expect(
          msg.singularMessageField?.singularMessageField?.either,
        ).toStrictEqual({ case: "oneofInt64JsStringField", value: "9" });
        // TODO test map field
      }
      test("accept bigint", () => {
        const msg = create(Proto3MessageDesc, {
          singularInt64Field: protoInt64.parse(1),
          singularInt64JsNumberField: protoInt64.parse(2),
          // @ts-expect-error TS2322
          singularInt64JsStringField: protoInt64.parse(3),
          repeatedInt64Field: [protoInt64.parse(4)],
          repeatedInt64JsNumberField: [protoInt64.parse(5)],
          // @ts-expect-error TS2322
          repeatedInt64JsStringField: [protoInt64.parse(6)],
          either: {
            case: "oneofInt64Field",
            value: protoInt64.parse(7),
          },
          singularMessageField: {
            either: {
              case: "oneofInt64JsNumberField",
              value: protoInt64.parse(8),
            },
            singularMessageField: {
              either: {
                // @ts-ignore -- required for older TS
                case: "oneofInt64JsStringField",
                // @ts-expect-error TS2322
                value: protoInt64.parse(9),
              },
            },
          },
          // TODO support map fields
        });
        expect64BitFields(msg);
      });
      test("accept number", () => {
        const msg = create(Proto3MessageDesc, {
          // @ts-expect-error TS2322
          singularInt64Field: 1,
          // @ts-expect-error TS2322
          singularInt64JsNumberField: 2,
          // @ts-expect-error TS2322
          singularInt64JsStringField: 3,
          // @ts-expect-error TS2322
          repeatedInt64Field: [4],
          // @ts-expect-error TS2322
          repeatedInt64JsNumberField: [5],
          // @ts-expect-error TS2322
          repeatedInt64JsStringField: [6],
          either: {
            // @ts-ignore -- required for older TS
            case: "oneofInt64Field",
            // @ts-expect-error TS2322
            value: 7,
          },
          singularMessageField: {
            either: {
              // @ts-ignore -- required for older TS
              case: "oneofInt64JsNumberField",
              // @ts-expect-error TS2322
              value: 8,
            },
            singularMessageField: {
              either: {
                // @ts-ignore -- required for older TS
                case: "oneofInt64JsStringField",
                // @ts-expect-error TS2322
                value: 9,
              },
            },
          },
          // TODO support map fields
        });
        expect64BitFields(msg);
      });
      test("accept string", () => {
        const msg = create(Proto3MessageDesc, {
          // @ts-expect-error TS2322
          singularInt64Field: "1",
          // @ts-expect-error TS2322
          singularInt64JsNumberField: "2",
          singularInt64JsStringField: "3",
          // @ts-expect-error TS2322
          repeatedInt64Field: ["4"],
          // @ts-expect-error TS2322
          repeatedInt64JsNumberField: ["5"],
          repeatedInt64JsStringField: ["6"],
          either: {
            // @ts-ignore -- required for older TS
            case: "oneofInt64Field",
            // @ts-expect-error TS2322
            value: "7",
          },
          singularMessageField: {
            either: {
              // @ts-ignore -- required for older TS
              case: "oneofInt64JsNumberField",
              // @ts-expect-error TS2322
              value: "8",
            },
            singularMessageField: {
              either: {
                case: "oneofInt64JsStringField",
                value: "9",
              },
            },
          },
          // TODO support map fields
        });
        expect64BitFields(msg);
      });
    });
    describe("message field", () => {
      test("accepts partial message", () => {
        const msg = create(Proto3MessageDesc, {
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
          // TODO support map fields
          // mapInt32MessageField: {
          //   123: {singularStringField: "str"},
          // }
        });
        expect(msg.singularMessageField).toBeDefined();
        expect(msg.singularMessageField?.singularStringField).toBe("str");
        expect(isMessage(msg.singularMessageField, Proto3MessageDesc)).toBe(
          true,
        );

        expect(msg.repeatedMessageField.length).toBe(1);
        expect(msg.repeatedMessageField[0].singularStringField).toBe("str");
        expect(isMessage(msg.repeatedMessageField[0], Proto3MessageDesc)).toBe(
          true,
        );

        expect(msg.either.case).toBe("oneofMessageField");
        expect(msg.either.value).toBeDefined();
        expect(isMessage(msg.either.value, Proto3MessageDesc)).toBe(true);

        // TODO test map fields
      });
      test("accepts full message", () => {
        const testMessageSingular = create(Proto3MessageDesc);
        const testMessageList = create(Proto3MessageDesc);
        const testMessageOneof = create(Proto3MessageDesc);
        const msg = create(Proto3MessageDesc, {
          singularMessageField: testMessageSingular,
          repeatedMessageField: [testMessageList],
          either: {
            case: "oneofMessageField",
            value: testMessageOneof,
          },
          // TODO support map fields
          // mapInt32MessageField: {
          //   123: testMessageMap,
          // }
        });
        expect(msg.singularMessageField === testMessageSingular).toBe(true);
        expect(msg.repeatedMessageField[0] === testMessageList).toBe(true);
        expect(msg.either.value === testMessageOneof).toBe(true);
        // TODO test map fields
      });
      test("rejects wrong message type", () => {
        function singular() {
          return create(Proto3MessageDesc, {
            // @ts-expect-error TS2322
            singularMessageField: create(UserDesc),
          });
        }
        expect(singular).toThrowError(
          /^field spec.Proto3Message.singular_message_field: expected message spec.Proto3Message, got message docs.User$/,
        );
        function list() {
          return create(Proto3MessageDesc, {
            // @ts-expect-error TS2322
            repeatedMessageField: [create(UserDesc)],
          });
        }
        expect(list).toThrowError(
          /^field spec.Proto3Message.repeated_message_field: list item #1: expected message spec.Proto3Message, got message docs.User$/,
        );
        function oneof() {
          return create(Proto3MessageDesc, {
            either: {
              // @ts-ignore -- required for older TS
              case: "oneofMessageField",
              // @ts-expect-error TS2322
              value: create(UserDesc),
            },
          });
        }
        expect(oneof).toThrowError(
          /^field spec.Proto3Message.oneof_message_field: expected message spec.Proto3Message, got message docs.User$/,
        );
        // TODO test map
      });
      test("rejects non-object as partial message", () => {
        function string() {
          return create(Proto3MessageDesc, {
            // @ts-expect-error TS2322
            repeatedMessageField: ["abc"],
          });
        }
        expect(string).toThrow(
          /^field spec.Proto3Message.repeated_message_field: list item #1: expected message spec.Proto3Message, got "abc"$/,
        );
        function array() {
          return create(Proto3MessageDesc, {
            // @ts-expect-error TS2322
            repeatedMessageField: [[123]],
          });
        }
        expect(array).toThrow(
          /^field spec.Proto3Message.repeated_message_field: list item #1: expected message spec.Proto3Message, got Array\(1\)$/,
        );
      });
      test("rejects field error in partial message", () => {
        function singular() {
          return create(Proto3MessageDesc, {
            singularMessageField: {
              // @ts-expect-error TS2322
              singularInt32Field: "not a number",
            },
          });
        }
        expect(singular).toThrow(
          /^field spec.Proto3Message.singular_message_field: singular_int32_field: expected number \(int32\), got "not a number"$/,
        );
        function list() {
          return create(Proto3MessageDesc, {
            repeatedMessageField: [
              {
                // @ts-expect-error TS2322
                singularInt32Field: "not a number",
              },
            ],
          });
        }
        expect(list).toThrowError(
          /^field spec.Proto3Message.repeated_message_field: list item #1: singular_int32_field: expected number \(int32\), got "not a number"$/,
        );
      });
    });
    describe("enum field", () => {
      test("accepts proto3 enum value out of range", () => {
        const msg = create(Proto3MessageDesc, {
          // @ts-ignore -- cannot use ts-expect-error, not an error in older TS
          singularEnumField: 99,
        });
        expect(msg.singularEnumField).toBe(99);
      });
      test("rejects proto2 enum value out of range", () => {
        function t() {
          return create(Proto2MessageDesc, {
            // @ts-ignore -- cannot use ts-expect-error, not an error in older TS
            optionalEnumField: 99,
          });
        }
        expect(t).toThrow(
          /^field spec.Proto2Message.optional_enum_field: expected enum spec.Proto2Enum, got 99$/,
        );
      });
    });
    describe("list field", () => {
      test("rejects non-array", () => {
        function scalar() {
          return create(Proto3MessageDesc, {
            // @ts-expect-error TS2322
            repeatedStringField: {},
          });
        }
        expect(scalar).toThrow(
          /^field spec.Proto3Message.repeated_string_field: expected Array, got object$/,
        );
        function message() {
          return create(Proto3MessageDesc, {
            // @ts-expect-error TS2322
            repeatedMessageField: {},
          });
        }
        expect(message).toThrow(
          /^field spec.Proto3Message.repeated_message_field: expected Array, got object$/,
        );
      });
      test("rejects array element error", () => {
        function nullValue() {
          return create(Proto3MessageDesc, {
            // @ts-expect-error TS2322
            repeatedStringField: [null],
          });
        }
        expect(nullValue).toThrow(
          /^field spec.Proto3Message.repeated_string_field: list item #1: expected string, got null$/,
        );
        function outOfRange() {
          return create(Proto3MessageDesc, {
            repeatedInt32Field: [Number.MAX_SAFE_INTEGER],
          });
        }
        expect(outOfRange).toThrow(
          /^field spec.Proto3Message.repeated_int32_field: list item #1: expected number \(int32\): 9007199254740991 out of range/,
        );
      });
    });
    describe("oneof field", () => {
      test("accepts selected field", () => {
        const msg = create(Proto3MessageDesc, {
          either: {
            case: "oneofBoolField",
            value: false,
          },
        });
        expect(msg.either.case).toBe("oneofBoolField");
        expect(msg.either.value).toBe(false);
      });
      test("rejects invalid oneof ADT", () => {
        function a() {
          return create(Proto3MessageDesc, {
            either: {
              // @ts-ignore -- required for older TS
              case: undefined,
              // @ts-expect-error TS2322
              value: "abc",
            },
          });
        }
        expect(a).toThrow(
          /^oneof spec.Proto3Message.either: invalid oneof ADT$/,
        );
        function b() {
          return create(Proto3MessageDesc, {
            either: {
              // @ts-expect-error TS2322
              case: "abc",
              // @ts-ignore -- required for older TS
              value: undefined,
            },
          });
        }
        expect(b).toThrow(
          /^oneof spec.Proto3Message.either: invalid oneof ADT$/,
        );
      });
      test("rejects invalid oneof case", () => {
        function notAField() {
          return create(Proto3MessageDesc, {
            either: {
              // @ts-expect-error TS2322
              case: "notAField",
              // @ts-ignore -- required for older TS
              value: "abc",
            },
          });
        }
        expect(notAField).toThrow(
          /^oneof spec.Proto3Message.either: invalid oneof ADT: field notAField not found$/,
        );
      });
    });
    describe("wkt wrapper field", () => {
      test("accepts unwrapped value", () => {
        const msg = create(Proto3MessageDesc, {
          singularWrappedUint32Field: 123,
        });
        expect(msg.singularWrappedUint32Field).toBe(123);
      });
    });

    // TODO test map
  });
});