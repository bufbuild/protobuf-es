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

import { beforeEach, describe, expect, test } from "@jest/globals";
import type { DescField, DescOneof } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";
import { isMessage } from "@bufbuild/protobuf/next";
import type { Message } from "@bufbuild/protobuf/next";
import { DoubleValueDesc, UInt32ValueDesc } from "@bufbuild/protobuf/next/wkt";
import { create } from "@bufbuild/protobuf/next";
import type { ReflectMessage } from "@bufbuild/protobuf/next/reflect";
import { localName, reflect } from "@bufbuild/protobuf/next/reflect";
import { compileMessage } from "../helpers.js";
import * as proto3_ts from "../../gen/ts/extra/proto3_pbv2.js";
import * as example_ts from "../../gen/ts/extra/example_pbv2.js";
import assert from "node:assert";

describe("reflect()", () => {
  test("accepts generated message shape", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    const r = reflect(msg);
    expect(r).toBeDefined();
  });
  test("accepts anonymous message", () => {
    const msg: Message = create(proto3_ts.Proto3MessageDesc);
    const r = reflect(msg);
    expect(r).toBeDefined();
  });
  test("accepts option to disable field check", () => {
    const msg: Message = create(proto3_ts.Proto3MessageDesc);
    const r = reflect(msg, {
      disableFieldValueCheck: true,
    });
    const field = r.findNumber(3);
    expect(field?.name).toBe("singular_int32_field");
    if (field) {
      const err = r.set(field, "not a int 32");
      expect(err).toBeUndefined();
    }
  });
});

// TODO cover map fields
// TODO cover proto2 (presence)
// TODO cover type narrowing with fields and ReflectMessage's accessors

describe("ReflectMessage", () => {
  describe("findNumber()", () => {
    test("finds field by field number", async () => {
      const desc = await compileMessage(`
        syntax="proto3";
        message M {
          int32 f1 = 1;
          int32 f2 = 2;
          int32 f3 = 3;
        }
      `);
      const r = reflect(create(desc));
      const f = r.findNumber(2);
      expect(f).toBeDefined();
      expect(f?.name).toBe("f2");
      expect(f?.number).toBe(2);
    });
  });
  describe("findJsonName()", () => {
    test("finds field by proto name", async () => {
      const desc = await compileMessage(`
        syntax="proto3";
        message M {
          int32 field_one = 1;
        }
      `);
      const r = reflect(create(desc));
      const f = r.findJsonName("field_one");
      expect(f).toBeDefined();
      expect(f?.number).toBe(1);
    });
    test("finds field by default JSON name", async () => {
      const desc = await compileMessage(`
        syntax="proto3";
        message M {
          int32 field_one = 1;
        }
      `);
      const r = reflect(create(desc));
      const f = r.findJsonName("fieldOne");
      expect(f).toBeDefined();
      expect(f?.number).toBe(1);
    });
    test("finds field by custom JSON name", async () => {
      const desc = await compileMessage(`
        syntax="proto3";
        message M {
          int32 field_one = 1 [json_name = "fuzz"];
        }
      `);
      const r = reflect(create(desc));
      const f = r.findJsonName("fuzz");
      expect(f).toBeDefined();
      expect(f?.number).toBe(1);
    });
    test("does not find local property name", async () => {
      const desc = await compileMessage(`
        syntax="proto3";
        message M {
          int32 constructor = 1;
        }
      `);
      const r = reflect(create(desc));
      expect(r.findJsonName("constructor$")).toBeUndefined();
      expect(r.fields.length).toBe(1);
      expect(r.fields[0].name).toBe("constructor");
      expect(localName(r.fields[0])).toBe("constructor$");
    });
  });
  describe("sortedFields", () => {
    test("returns fields sorted by field number ascending", async () => {
      const desc = await compileMessage(`
        syntax="proto3";
        message M {
          int32 f2 = 2;
          int32 f1 = 1;
          int32 f3 = 3;
        }
      `);
      const r = reflect(create(desc));
      const sortedNumbers = r.sortedFields.map((f) => f.number);
      expect(sortedNumbers).toStrictEqual([1, 2, 3]);
    });
  });
  describe("oneofCase()", () => {
    test("returns selected field", () => {
      const msg = create(proto3_ts.Proto3MessageDesc);
      msg.either = {
        case: "oneofInt32Field",
        value: 123,
      };
      const r = reflect(msg);
      expect(r.oneofs[0]).toBeDefined();
      const selectedField = r.oneofCase(r.oneofs[0]);
      expect(selectedField).toBeDefined();
      expect(selectedField?.name).toBe("oneof_int32_field");
    });
    test("returns undefined for oneof w/o selected field", () => {
      const msg = create(proto3_ts.Proto3MessageDesc);
      msg.either = {
        case: undefined,
      };
      const r = reflect(msg);
      expect(r.oneofs[0]).toBeDefined();
      const selectedField = r.oneofCase(r.oneofs[0]);
      expect(selectedField).toBeUndefined();
    });
  });
  describe("with fields that do not belong to the reflected message", () => {
    let r: ReflectMessage;
    let foreignField: DescField;
    let foreignOneof: DescOneof;
    beforeEach(() => {
      r = reflect(create(example_ts.UserDesc));
      foreignField = proto3_ts.Proto3MessageDesc.fields[0];
      foreignOneof = proto3_ts.Proto3MessageDesc.oneofs[0];
      assert(foreignField);
      assert(foreignOneof);
    });
    test("get() throws", () => {
      expect(() => r.get(foreignField)).toThrow(
        /^cannot use field spec.Proto3Message.singular_string_field with message docs.User$/,
      );
    });
    test("oneofCase() throws", () => {
      expect(() => r.oneofCase(foreignOneof)).toThrow(
        /^cannot use oneof spec.Proto3Message.either with message docs.User$/,
      );
    });
    test("isSet() throws", () => {
      expect(() => r.isSet(foreignField)).toThrow(
        /^cannot use field spec.Proto3Message.singular_string_field with message docs.User$/,
      );
    });
    test("clear() throws", () => {
      expect(() => r.clear(foreignField)).toThrow(
        /^cannot use field spec.Proto3Message.singular_string_field with message docs.User$/,
      );
    });
    test("set() throws", () => {
      expect(() => r.set(foreignField, "value")).toThrow(
        /^cannot use field spec.Proto3Message.singular_string_field with message docs.User$/,
      );
    });
    // TODO cover addListItem, setListItem, setMapEntry, and their try-* versions
  });
  describe("accessing proto3 fields", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    function getFieldByLocalName<T extends string>(name: T): DescField {
      const field = desc.fields.find((f) => localName(f) === name);
      assert(field, `getFieldsByLocalName: ${name} not found`);
      return field;
    }
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(desc);
      r = reflect(msg);
    });
    describe("singularStringField", () => {
      const f = getFieldByLocalName("singularStringField");
      test("get()", () => {
        expect(r.get(f)).toBe("");
        msg.singularStringField = "non-zero";
        expect(r.get(f)).toBe("non-zero");
      });
      test("set()", () => {
        const err = r.set(f, "non-zero");
        expect(err).toBeUndefined();
        expect(msg.singularStringField).toBe("non-zero");
      });
      test("set() unexpected number", () => {
        const errNumber = r.set(f, 123);
        expect(errNumber?.message).toMatch("expected string, got 123");
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected null", () => {
        const errNumber = r.set(f, null as unknown as string);
        expect(errNumber?.message).toMatch("expected string, got null");
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected undefined", () => {
        const errNumber = r.set(f, undefined as unknown as string);
        expect(errNumber?.message).toMatch("expected string, got undefined");
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected bool", () => {
        const errBool = r.set(f, true);
        expect(errBool?.message).toMatch("expected string, got true");
        expect(errBool?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected object", () => {
        const errObject = r.set(f, new Date() as unknown as string);
        expect(errObject?.message).toMatch("expected string, got object");
        expect(errObject?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected array", () => {
        const errObject = r.set(f, [123] as unknown as string);
        expect(errObject?.message).toMatch("expected string, got Array(1)");
        expect(errObject?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected Uint8Array", () => {
        const errObject = r.set(f, new Uint8Array([1, 2]) as unknown as string);
        expect(errObject?.message).toMatch(
          "expected string, got Uint8Array(2)",
        );
        expect(errObject?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularStringField = "non-zero";
        r.clear(f);
        expect(msg.singularStringField).toBe("");
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBe("");
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularStringField = "non-zero";
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("singularBytesField", () => {
      const f = getFieldByLocalName("singularBytesField");
      test("get()", () => {
        expect(r.get(f)).toStrictEqual(new Uint8Array(0));
        msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
        expect(r.get(f)).toStrictEqual(
          new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        );
      });
      test("set()", () => {
        const err = r.set(f, new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
        expect(err).toBeUndefined();
        expect(msg.singularBytesField).toStrictEqual(
          new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        );
      });
      test("set() unexpected number", () => {
        const errNumber = r.set(f, 123);
        expect(errNumber?.message).toMatch("expected Uint8Array, got 123");
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected null", () => {
        const errNumber = r.set(f, null as unknown as Uint8Array);
        expect(errNumber?.message).toMatch("expected Uint8Array, got null");
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected undefined", () => {
        const errNumber = r.set(f, undefined as unknown as Uint8Array);
        expect(errNumber?.message).toMatch(
          "expected Uint8Array, got undefined",
        );
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected bool", () => {
        const errBool = r.set(f, true);
        expect(errBool?.message).toMatch("expected Uint8Array, got true");
        expect(errBool?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected object", () => {
        const errObject = r.set(f, new Date() as unknown as Uint8Array);
        expect(errObject?.message).toMatch("expected Uint8Array, got object");
        expect(errObject?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected array", () => {
        const errObject = r.set(f, [123] as unknown as Uint8Array);
        expect(errObject?.message).toMatch("expected Uint8Array, got Array(1)");
        expect(errObject?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
        r.clear(f);
        expect(msg.singularBytesField.byteLength).toBe(0);
        expect(r.isSet(f)).toBe(false);
        expect(msg.singularBytesField).toStrictEqual(new Uint8Array(0));
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
        expect(msg.singularBytesField).toStrictEqual(
          new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        );
      });
    });
    describe("singularInt32Field", () => {
      const f = getFieldByLocalName("singularInt32Field");
      test("get()", () => {
        expect(r.get(f)).toBe(0);
        msg.singularInt32Field = 123;
        expect(r.get(f)).toBe(123);
      });
      test("set()", () => {
        const err = r.set(f, 123);
        expect(err).toBeUndefined();
        expect(msg.singularInt32Field).toBe(123);
      });
      test("set() unexpected float", () => {
        const err = r.set(f, 3.14);
        expect(err?.message).toMatch(/^expected number \(int32\), got 3.14$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() too large", () => {
        const err = r.set(f, Number.MAX_SAFE_INTEGER);
        expect(err?.message).toMatch(
          /^expected number \(int32\): 9007199254740991 out of range/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularInt32Field = 123;
        r.clear(f);
        expect(msg.singularInt32Field).toBe(0);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBe(0);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularInt32Field = 123;
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("singularInt64Field", () => {
      const f = getFieldByLocalName("singularInt64Field");
      test("get()", () => {
        expect(r.get(f)).toBe(protoInt64.zero);
        msg.singularInt64Field = protoInt64.parse(123);
        expect(r.get(f)).toBe(protoInt64.parse(123));
      });
      test("set() bigint", () => {
        const err = r.set(f, protoInt64.parse(123));
        expect(err).toBeUndefined();
        expect(msg.singularInt64Field).toBe(protoInt64.parse(123));
      });
      test("set() number", () => {
        const err = r.set(f, 123);
        expect(err).toBeUndefined();
        expect(msg.singularInt64Field).toBe(protoInt64.parse(123));
      });
      test("set() string", () => {
        const err = r.set(f, "123");
        expect(err).toBeUndefined();
        expect(msg.singularInt64Field).toBe(protoInt64.parse("123"));
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(/^expected bigint \(int64\), got true$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularInt64Field = protoInt64.parse(123);
        r.clear(f);
        expect(msg.singularInt64Field).toBe(protoInt64.zero);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBe(protoInt64.zero);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularInt64Field = protoInt64.parse(123);
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("singularInt64JsStringField", () => {
      const f = getFieldByLocalName("singularInt64JsStringField");
      test("get()", () => {
        expect(r.get(f)).toBe(protoInt64.zero);
        msg.singularInt64JsStringField = "789";
        expect(r.get(f)).toBe(protoInt64.parse(789));
      });
      test("set() bigint", () => {
        const err = r.set(f, protoInt64.parse(123));
        expect(err).toBeUndefined();
        expect(msg.singularInt64JsStringField).toBe("123");
      });
      test("set() number", () => {
        const err = r.set(f, 123);
        expect(err).toBeUndefined();
        expect(msg.singularInt64JsStringField).toBe("123");
      });
      test("set() string", () => {
        const err = r.set(f, "123");
        expect(err).toBeUndefined();
        expect(msg.singularInt64JsStringField).toBe("123");
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch("expected bigint (int64), got true");
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularInt64JsStringField = "789";
        r.clear(f);
        expect(msg.singularInt64JsStringField).toBe("0");
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBe(protoInt64.zero);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularInt64JsStringField = "789";
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("singularEnumField", () => {
      const f = getFieldByLocalName("singularEnumField");
      test("get()", () => {
        expect(r.get(f)).toBe(proto3_ts.Proto3Enum.UNSPECIFIED);
        msg.singularEnumField = proto3_ts.Proto3Enum.YES;
        expect(r.get(f)).toBe(proto3_ts.Proto3Enum.YES);
      });
      test("set()", () => {
        const err = r.set(f, proto3_ts.Proto3Enum.YES);
        expect(err).toBeUndefined();
        expect(msg.singularEnumField).toBe(proto3_ts.Proto3Enum.YES);
      });
      test("set() zero value", () => {
        const err = r.set(f, proto3_ts.Proto3Enum.UNSPECIFIED);
        expect(err).toBeUndefined();
        expect(msg.singularEnumField).toBe(proto3_ts.Proto3Enum.UNSPECIFIED);
      });
      test("set() unknown enum value", () => {
        const err = r.set(f, 99);
        expect(err).toBeUndefined(); // proto3 enums are open
        expect(msg.singularEnumField).toBe(99);
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(
          /^expected enum spec.Proto3Enum, got true$/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularEnumField = proto3_ts.Proto3Enum.YES;
        r.clear(f);
        expect(msg.singularEnumField).toBe(proto3_ts.Proto3Enum.UNSPECIFIED);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBe(proto3_ts.Proto3Enum.UNSPECIFIED);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularEnumField = proto3_ts.Proto3Enum.YES;
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("singularMessageField", () => {
      const f = getFieldByLocalName("singularMessageField");
      const testMessage = create(proto3_ts.Proto3MessageDesc);
      test("get()", () => {
        expect(r.get(f)).toBeUndefined();
        msg.singularMessageField = testMessage;
        expect(r.get(f)).toBe(testMessage);
      });
      test("set()", () => {
        const err = r.set(f, testMessage);
        expect(err).toBeUndefined();
        expect(msg.singularMessageField).toBe(testMessage);
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(
          /^expected message spec.Proto3Message, got true/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected message", () => {
        const err = r.set(f, create(example_ts.UserDesc));
        expect(err?.message).toMatch(
          /^expected message spec.Proto3Message, got message docs.User/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularMessageField = testMessage;
        r.clear(f);
        expect(msg.singularStringField).toBe("");
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularMessageField = testMessage;
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("singularWrappedUint32Field", () => {
      const f = getFieldByLocalName("singularWrappedUint32Field");
      test("get()", () => {
        expect(r.get(f)).toBeUndefined();
        msg.singularWrappedUint32Field = 123;
        const wrapper = r.get(f);
        expect(isMessage(wrapper, UInt32ValueDesc)).toBe(true);
        if (isMessage(wrapper, UInt32ValueDesc)) {
          expect(wrapper.value).toBe(123);
        }
      });
      test("set() wrapper message", () => {
        const uint32Value = create(UInt32ValueDesc);
        uint32Value.value = 123;
        const err = r.set(f, uint32Value);
        expect(err).toBeUndefined();
        expect(msg.singularWrappedUint32Field).toBe(123);
      });
      test("set() unwrapped value", () => {
        const err = r.set(f, 123);
        expect(err).toBeUndefined();
        expect(msg.singularWrappedUint32Field).toBe(123);
      });
      test("set() unexpected wrapper message", () => {
        const doubleValue = create(DoubleValueDesc);
        doubleValue.value = 77;
        const err = r.set(f, doubleValue);
        expect(err?.message).toMatch(
          /^expected message google.protobuf.UInt32Value or number \(uint32\), got message google.protobuf.DoubleValue/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected foreign message", () => {
        const err = r.set(f, msg);
        expect(err?.message).toMatch(
          /^expected message google.protobuf.UInt32Value or number \(uint32\), got message spec.Proto3Message/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() out of range", () => {
        const err = r.set(f, -1);
        expect(err?.message).toMatch(
          /^expected message google.protobuf.UInt32Value or number \(uint32\): -1 out of range/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() float", () => {
        const err = r.set(f, 3.142);
        expect(err?.message).toMatch(
          /^expected message google.protobuf.UInt32Value or number \(uint32\), got 3.142/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(
          /^expected message google.protobuf.UInt32Value or number \(uint32\), got true/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.singularWrappedUint32Field = 123;
        r.clear(f);
        expect(msg.singularWrappedUint32Field).toBeUndefined();
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.singularWrappedUint32Field = 123;
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("optionalStringField", () => {
      const f = getFieldByLocalName("optionalStringField");
      test("get()", () => {
        expect(r.get(f)).toBeUndefined();
        msg.optionalStringField = "non-zero";
        expect(r.get(f)).toBe("non-zero");
      });
      test("set()", () => {
        const err = r.set(f, "non-zero");
        expect(err).toBeUndefined();
        expect(msg.optionalStringField).toBe("non-zero");
      });
      test("set() unexpected null", () => {
        const errNumber = r.set(f, null as unknown as string);
        expect(errNumber?.message).toMatch("expected string, got null");
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected undefined", () => {
        const errNumber = r.set(f, undefined as unknown as string);
        expect(errNumber?.message).toMatch("expected string, got undefined");
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.optionalStringField = "non-zero";
        r.clear(f);
        expect(msg.optionalStringField).toBeUndefined();
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.optionalStringField = "non-zero";
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("optionalInt64Field", () => {
      const f = getFieldByLocalName("optionalInt64Field");
      test("get()", () => {
        expect(r.get(f)).toBeUndefined();
        msg.optionalInt64Field = protoInt64.zero;
        expect(r.get(f)).toBe(protoInt64.zero);
      });
      test("set()", () => {
        const err = r.set(f, protoInt64.zero);
        expect(err).toBeUndefined();
        expect(msg.optionalInt64Field).toBe(protoInt64.zero);
      });
      test("set() bigint", () => {
        const err = r.set(f, protoInt64.parse(123));
        expect(err).toBeUndefined();
        expect(msg.optionalInt64Field).toBe(protoInt64.parse(123));
      });
      test("set() number", () => {
        const err = r.set(f, 123);
        expect(err).toBeUndefined();
        expect(msg.optionalInt64Field).toBe(protoInt64.parse(123));
      });
      test("set() string", () => {
        const err = r.set(f, "123");
        expect(err).toBeUndefined();
        expect(msg.optionalInt64Field).toBe(protoInt64.parse("123"));
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(/^expected bigint \(int64\), got true$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.optionalInt64Field = protoInt64.zero;
        r.clear(f);
        expect(msg.optionalInt64Field).toBeUndefined();
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.optionalInt64Field = protoInt64.zero;
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("optionalInt64JsStringField", () => {
      const f = getFieldByLocalName("optionalInt64JsStringField");
      test("get()", () => {
        expect(r.get(f)).toBeUndefined();
        msg.optionalInt64JsStringField = "0";
        expect(r.get(f)).toBe(protoInt64.zero);
      });
      test("set() bigint", () => {
        const err = r.set(f, protoInt64.parse(123));
        expect(err).toBeUndefined();
        expect(msg.optionalInt64JsStringField).toBe("123");
      });
      test("set() number", () => {
        const err = r.set(f, 123);
        expect(err).toBeUndefined();
        expect(msg.optionalInt64JsStringField).toBe("123");
      });
      test("set() string", () => {
        const err = r.set(f, "123");
        expect(err).toBeUndefined();
        expect(msg.optionalInt64JsStringField).toBe("123");
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch("expected bigint (int64), got true");
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.optionalInt64JsStringField = "0";
        r.clear(f);
        expect(msg.optionalInt64JsStringField).toBeUndefined();
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.optionalInt64JsStringField = "0";
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("optionalMessageField", () => {
      const f = getFieldByLocalName("optionalMessageField");
      const testMessage = create(proto3_ts.Proto3MessageDesc);
      test("get()", () => {
        expect(r.get(f)).toBeUndefined();
        msg.optionalMessageField = testMessage;
        expect(r.get(f)).toBe(testMessage);
      });
      test("set()", () => {
        const err = r.set(f, testMessage);
        expect(err).toBeUndefined();
        expect(msg.optionalMessageField).toBe(testMessage);
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(
          /^expected message spec.Proto3Message, got true/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected message", () => {
        const err = r.set(f, create(example_ts.UserDesc));
        expect(err?.message).toMatch(
          /^expected message spec.Proto3Message, got message docs.User/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.optionalMessageField = testMessage;
        r.clear(f);
        expect(msg.optionalMessageField).toBeUndefined();
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.optionalMessageField = testMessage;
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("optionalWrappedUint32Field", () => {
      const f = getFieldByLocalName("optionalWrappedUint32Field");
      test("get()", () => {
        expect(r.get(f)).toBeUndefined();
        msg.optionalWrappedUint32Field = 0;
        const wrapper = r.get(f);
        expect(isMessage(wrapper, UInt32ValueDesc)).toBe(true);
        if (isMessage(wrapper, UInt32ValueDesc)) {
          expect(wrapper.value).toBe(0);
        }
      });
      test("set() wrapper message", () => {
        const uint32Value = create(UInt32ValueDesc);
        uint32Value.value = 123;
        const err = r.set(f, uint32Value);
        expect(err).toBeUndefined();
        expect(msg.optionalWrappedUint32Field).toBe(123);
      });
      test("set() unwrapped value", () => {
        const err = r.set(f, 123);
        expect(err).toBeUndefined();
        expect(msg.optionalWrappedUint32Field).toBe(123);
      });
      test("set() unexpected null", () => {
        const errNumber = r.set(f, null as unknown as string);
        expect(errNumber?.message).toMatch(
          "expected message google.protobuf.UInt32Value or number (uint32), got null",
        );
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected undefined", () => {
        const errNumber = r.set(f, undefined as unknown as string);
        expect(errNumber?.message).toMatch(
          "expected message google.protobuf.UInt32Value or number (uint32), got undefined",
        );
        expect(errNumber?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.optionalWrappedUint32Field = 0;
        r.clear(f);
        expect(msg.optionalWrappedUint32Field).toBeUndefined();
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.optionalWrappedUint32Field = 0;
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("repeatedStringField", () => {
      const f = getFieldByLocalName("repeatedStringField");
      test("get()", () => {
        expect(r.get(f)).toStrictEqual([]);
        msg.repeatedStringField = ["a", "b", "c"];
        expect(r.get(f)).toStrictEqual(["a", "b", "c"]);
      });
      test("set()", () => {
        const err = r.set(f, ["a", "b", "c"]);
        expect(err).toBeUndefined();
        expect(r.get(f)).toStrictEqual(["a", "b", "c"]);
      });
      test("set() unexpected", () => {
        const err = r.set(f, ["a", true, "c"] as string[]);
        expect(err?.message).toMatch(
          /^list item #2: expected string, got true$/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.repeatedStringField = ["a", "b", "c"];
        r.clear(f);
        expect(msg.repeatedStringField).toStrictEqual([]);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toStrictEqual([]);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.repeatedStringField = ["a", "b", "c"];
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("repeatedWrappedUint32Field", () => {
      const f = getFieldByLocalName("repeatedWrappedUint32Field");
      const a = create(UInt32ValueDesc);
      a.value = 1;
      const b = create(UInt32ValueDesc);
      b.value = 1;
      const c = create(UInt32ValueDesc);
      c.value = 1;
      test("get()", () => {
        expect(r.get(f)).toStrictEqual([]);
        msg.repeatedWrappedUint32Field = [a, b, c];
        expect(r.get(f)).toStrictEqual([a, b, c]);
      });
      test("set()", () => {
        const err = r.set(f, [a, b, c]);
        expect(err).toBeUndefined();
        expect(r.get(f)).toStrictEqual([a, b, c]);
      });
      test("clear()", () => {
        msg.repeatedWrappedUint32Field = [a, b, c];
        r.clear(f);
        expect(msg.repeatedWrappedUint32Field).toStrictEqual([]);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toStrictEqual([]);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.repeatedWrappedUint32Field = [a, b, c];
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("repeatedInt64Field", () => {
      const f = getFieldByLocalName("repeatedInt64Field");
      test("get()", () => {
        expect(r.get(f)).toStrictEqual([]);
        msg.repeatedInt64Field = [
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ];
        expect(r.get(f)).toStrictEqual([
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ]);
      });
      test("set()", () => {
        const err = r.set(f, [
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ]);
        expect(err).toBeUndefined();
        expect(msg.repeatedInt64Field).toStrictEqual([
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ]);
      });
      test("set() mixed bigint, number, string", () => {
        const err = r.set(f, [protoInt64.parse(1), 2, "3"] as bigint[]);
        expect(err).toBeUndefined();
        expect(msg.repeatedInt64Field).toStrictEqual([
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ]);
      });
      test("clear()", () => {
        msg.repeatedInt64Field = [
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ];
        r.clear(f);
        expect(msg.repeatedInt64Field).toStrictEqual([]);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toStrictEqual([]);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.repeatedInt64Field = [
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ];
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("repeatedInt64JsStringField", () => {
      const f = getFieldByLocalName("repeatedInt64JsStringField");
      test("get()", () => {
        expect(r.get(f)).toStrictEqual([]);
        msg.repeatedInt64JsStringField = ["1", "2", "3"];
        expect(r.get(f)).toStrictEqual([
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ]);
      });
      test("set()", () => {
        const err = r.set(f, [
          protoInt64.parse(1),
          protoInt64.parse(2),
          protoInt64.parse(3),
        ]);
        expect(err).toBeUndefined();
        expect(msg.repeatedInt64JsStringField).toStrictEqual(["1", "2", "3"]);
      });
      test("set() mixed bigint, number, string", () => {
        const err = r.set(f, [protoInt64.parse(1), 2, "3"] as bigint[]);
        expect(err).toBeUndefined();
        expect(msg.repeatedInt64JsStringField).toStrictEqual(["1", "2", "3"]);
      });
      test("clear()", () => {
        msg.repeatedInt64JsStringField = ["1", "2", "3"];
        r.clear(f);
        expect(msg.repeatedInt64JsStringField).toStrictEqual([]);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toStrictEqual([]);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.repeatedInt64JsStringField = ["1", "2", "3"];
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("repeatedMessageField", () => {
      const f = getFieldByLocalName("repeatedMessageField");
      const testMessage1 = create(proto3_ts.Proto3MessageDesc);
      const testMessage2 = create(proto3_ts.Proto3MessageDesc);
      test("get()", () => {
        expect(r.get(f)).toStrictEqual([]);
        msg.repeatedMessageField = [testMessage1, testMessage2];
        expect(r.get(f)).toStrictEqual([testMessage1, testMessage2]);
      });
      test("set()", () => {
        const err = r.set(f, [testMessage1, testMessage2]);
        expect(err).toBeUndefined();
        expect(r.get(f)).toStrictEqual([testMessage1, testMessage2]);
      });
      test("set() unexpected non-message", () => {
        const err = r.set(f, [testMessage1, true] as Message[]);
        expect(err?.message).toMatch(
          /^list item #2: expected message spec.Proto3Message, got true$/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("set() unexpected message", () => {
        const err = r.set(f, [create(example_ts.UserDesc)] as Message[]);
        expect(err?.message).toMatch(
          /^list item #1: expected message spec.Proto3Message, got message docs.User$/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.repeatedMessageField = [testMessage1, testMessage2];
        r.clear(f);
        expect(msg.repeatedMessageField).toStrictEqual([]);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toStrictEqual([]);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.repeatedMessageField = [testMessage1, testMessage2];
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("repeatedEnumField", () => {
      const f = getFieldByLocalName("repeatedEnumField");
      test("get()", () => {
        expect(r.get(f)).toStrictEqual([]);
        msg.repeatedEnumField = [
          proto3_ts.Proto3Enum.UNSPECIFIED,
          proto3_ts.Proto3Enum.YES,
          proto3_ts.Proto3Enum.NO,
        ];
        expect(r.get(f)).toStrictEqual([
          proto3_ts.Proto3Enum.UNSPECIFIED,
          proto3_ts.Proto3Enum.YES,
          proto3_ts.Proto3Enum.NO,
        ]);
      });
      test("set()", () => {
        const err = r.set(f, [proto3_ts.Proto3Enum.UNSPECIFIED]);
        expect(err).toBeUndefined();
        expect(r.get(f)).toStrictEqual([proto3_ts.Proto3Enum.UNSPECIFIED]);
      });
      test("set() unknown enum value", () => {
        const err = r.set(f, [proto3_ts.Proto3Enum.UNSPECIFIED, 99]);
        expect(err).toBeUndefined(); // proto3 enums are open
      });
      test("set() unexpected bool", () => {
        const err = r.set(f, [
          proto3_ts.Proto3Enum.UNSPECIFIED,
          true,
        ] as proto3_ts.Proto3Enum[]);
        expect(err?.message).toMatch(
          /^list item #2: expected enum spec.Proto3Enum, got true$/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("clear()", () => {
        msg.repeatedEnumField = [proto3_ts.Proto3Enum.UNSPECIFIED];
        r.clear(f);
        expect(msg.repeatedEnumField).toStrictEqual([]);
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toStrictEqual([]);
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.repeatedEnumField = [proto3_ts.Proto3Enum.UNSPECIFIED];
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("oneofBoolField", () => {
      const f = getFieldByLocalName("oneofBoolField");
      test("get()", () => {
        expect(msg.either).toStrictEqual({ case: undefined });
        msg.either = {
          case: "oneofBoolField",
          value: false,
        };
        expect(r.get(f)).toBe(false);
      });
      test("set()", () => {
        expect(r.set(f, false)).toBeUndefined();
        expect(r.get(f)).toStrictEqual(false);
      });
      test("set() deselects other oneof field", () => {
        expect(r.set(f, true)).toBeUndefined();
        expect(r.isSet(f)).toBe(true);
        const oneofStringField = getFieldByLocalName("oneofStringField");
        expect(r.set(oneofStringField, "foo")).toBeUndefined();
        expect(r.isSet(oneofStringField)).toBe(true);
        expect(r.isSet(f)).toBe(false);
      });
      test("clear()", () => {
        msg.either = {
          case: "oneofBoolField",
          value: false,
        };
        r.clear(f);
        expect(msg.either).toStrictEqual({ case: undefined });
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.either = {
          case: "oneofBoolField",
          value: false,
        };
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("oneofMessageField", () => {
      const f = getFieldByLocalName("oneofMessageField");
      const testMessage = create(proto3_ts.Proto3MessageDesc);
      test("get()", () => {
        expect(msg.either).toStrictEqual({ case: undefined });
        msg.either = {
          case: "oneofMessageField",
          value: testMessage,
        };
        expect(r.get(f)).toBe(testMessage);
      });
      test("set()", () => {
        expect(r.set(f, testMessage)).toBeUndefined();
        expect(r.get(f)).toBe(testMessage);
      });
      test("set() deselects other oneof field", () => {
        expect(r.set(f, testMessage)).toBeUndefined();
        expect(r.isSet(f)).toBe(true);
        const oneofStringField = getFieldByLocalName("oneofStringField");
        expect(r.set(oneofStringField, "foo")).toBeUndefined();
        expect(r.isSet(oneofStringField)).toBe(true);
        expect(r.isSet(f)).toBe(false);
      });
      test("clear()", () => {
        msg.either = {
          case: "oneofMessageField",
          value: testMessage,
        };
        r.clear(f);
        expect(msg.either).toStrictEqual({ case: undefined });
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.either = {
          case: "oneofMessageField",
          value: testMessage,
        };
        expect(r.isSet(f)).toBe(true);
      });
    });
    describe("oneofWrappedUint32Field", () => {
      const f = getFieldByLocalName("oneofWrappedUint32Field");
      const testValue = create(UInt32ValueDesc);
      testValue.value = 1;
      test("get()", () => {
        expect(msg.either).toStrictEqual({ case: undefined });
        msg.either = {
          case: "oneofWrappedUint32Field",
          value: testValue,
        };
        expect(r.get(f)).toBe(testValue);
      });
      test("set()", () => {
        expect(r.set(f, testValue)).toBeUndefined();
        expect(r.get(f)).toBe(testValue);
      });
      test("set() deselects other oneof field", () => {
        expect(r.set(f, testValue)).toBeUndefined();
        expect(r.isSet(f)).toBe(true);
        const oneofStringField = getFieldByLocalName("oneofStringField");
        expect(r.set(oneofStringField, "foo")).toBeUndefined();
        expect(r.isSet(oneofStringField)).toBe(true);
        expect(r.isSet(f)).toBe(false);
      });
      test("clear()", () => {
        msg.either = {
          case: "oneofWrappedUint32Field",
          value: testValue,
        };
        r.clear(f);
        expect(msg.either).toStrictEqual({ case: undefined });
        expect(r.isSet(f)).toBe(false);
        expect(r.get(f)).toBeUndefined();
      });
      test("isSet()", () => {
        expect(r.isSet(f)).toBe(false);
        msg.either = {
          case: "oneofWrappedUint32Field",
          value: testValue,
        };
        expect(r.isSet(f)).toBe(true);
      });
    });
  });
});
