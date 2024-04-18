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
import type { DescMessage } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";
import type { Message } from "@bufbuild/protobuf";
import { UInt32ValueDesc } from "@bufbuild/protobuf/wkt";
import { create } from "@bufbuild/protobuf";
import type { ReflectMessage } from "@bufbuild/protobuf/reflect";
import {
  reflect,
  reflectList,
  reflectMap,
  isReflectMessage,
  isReflectList,
  isReflectMap,
} from "@bufbuild/protobuf/reflect";
import { compileMessage, getFieldByLocalName } from "../helpers.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pbv2.js";
import * as example_ts from "../gen/ts/extra/example_pbv2.js";
import assert from "node:assert";

describe("reflect()", () => {
  test("accepts generated message shape", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    const r = reflect(proto3_ts.Proto3MessageDesc, msg);
    expect(r).toBeDefined();
  });
  test("accepts anonymous message", () => {
    const desc: DescMessage = proto3_ts.Proto3MessageDesc;
    const msg: Message = create(desc);
    const r = reflect(desc, msg);
    expect(r).toBeDefined();
  });
  test("accepts option to disable field check", () => {
    const msg = create(proto3_ts.Proto3MessageDesc);
    const r = reflect(proto3_ts.Proto3MessageDesc, msg, {
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
      const r = reflect(desc);
      const f = r.findNumber(2);
      expect(f).toBeDefined();
      expect(f?.name).toBe("f2");
      expect(f?.number).toBe(2);
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
      const r = reflect(desc);
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
      const r = reflect(proto3_ts.Proto3MessageDesc, msg);
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
      const r = reflect(proto3_ts.Proto3MessageDesc, msg);
      expect(r.oneofs[0]).toBeDefined();
      const selectedField = r.oneofCase(r.oneofs[0]);
      expect(selectedField).toBeUndefined();
    });
    test("throws error on foreign oneof", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { oneof foo { string str = 1; }}
      `);
      const foreignOneof = foreignMessage.oneofs[0];
      const r = reflect(proto3_ts.Proto3MessageDesc);
      expect(() => r.oneofCase(foreignOneof)).toThrow(
        /^cannot use oneof Foreign.foo with message spec.Proto3Message$/,
      );
    });
  });
  describe("get()", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(desc);
      r = reflect(desc, msg);
    });
    test("gets message", () => {
      const f = getFieldByLocalName(desc, "singularMessageField", "message");
      msg.singularMessageField = create(proto3_ts.Proto3MessageDesc);
      const v = r.get(f);
      expect(isReflectMessage(v)).toBe(true);
      if (isReflectMessage(v)) {
        expect(v.message).toBe(msg.singularMessageField);
      }
    });
    test("gets enum", () => {
      const f = getFieldByLocalName(desc, "singularEnumField");
      msg.singularEnumField = proto3_ts.Proto3Enum.YES;
      expect(r.get(f)).toBe(proto3_ts.Proto3Enum.YES);
    });
    test("gets string", () => {
      const f = getFieldByLocalName(desc, "singularStringField");
      msg.singularStringField = "abc";
      expect(r.get(f)).toBe("abc");
    });
    test("gets list", () => {
      const f = getFieldByLocalName(desc, "repeatedStringField", "list");
      const list = r.get(f);
      expect(isReflectList(list)).toBe(true);
    });
    test("gets map", () => {
      const f = getFieldByLocalName(desc, "mapStringStringField", "map");
      const map = r.get(f);
      expect(isReflectMap(map)).toBe(true);
    });
    test("gets wrapped wrapper field", () => {
      const f = getFieldByLocalName(desc, "singularWrappedUint32Field");
      msg.singularWrappedUint32Field = 123;
      const wrapper = r.get(f);
      expect(isReflectMessage(wrapper, UInt32ValueDesc)).toBe(true);
      if (isReflectMessage(wrapper, UInt32ValueDesc)) {
        const value = wrapper.get(wrapper.fields[0]);
        expect(value).toBe(123);
      }
    });
    test("gets selected oneof field", () => {
      const f = getFieldByLocalName(desc, "oneofBoolField");
      msg.either = {
        case: "oneofBoolField",
        value: false,
      };
      expect(r.get(f)).toBe(false);
    });
    test("returns undefined for unselected oneof field", () => {
      const f = getFieldByLocalName(desc, "oneofBoolField");
      expect(r.get(f)).toBeUndefined();
    });
    test("returns ReflectMessage with zero message for unset message field", () => {
      const f = getFieldByLocalName(desc, "singularMessageField", "message");
      const v = r.get(f);
      expect(isReflectMessage(v)).toBe(true);
      if (isReflectMessage(v)) {
        for (const f of v.fields) {
          expect(v.isSet(f)).toBe(false);
        }
      }
    });
    test("returns undefined for unset optional string field", () => {
      const f = getFieldByLocalName(desc, "optionalStringField");
      expect(r.get(f)).toBeUndefined();
    });
    test("returns bigint for jstype=JS_STRING", () => {
      const f = getFieldByLocalName(desc, "singularInt64JsStringField");
      msg.singularInt64JsStringField = "123";
      expect(r.get(f)).toBe(protoInt64.parse(123));
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      assert(foreignField.fieldKind == "scalar");
      expect(() => r.get(foreignField)).toThrow(
        /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      );
    });
  });
  describe("set()", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(desc);
      r = reflect(desc, msg);
    });
    test("sets enum", () => {
      const singularEnumField = getFieldByLocalName(desc, "singularEnumField");
      const err = r.set(singularEnumField, proto3_ts.Proto3Enum.YES);
      expect(err).toBeUndefined();
      expect(msg.singularEnumField).toBe(proto3_ts.Proto3Enum.YES);
    });
    test("sets string", () => {
      const f = getFieldByLocalName(desc, "singularStringField");
      const err = r.set(f, "abc");
      expect(err).toBeUndefined();
      expect(msg.singularStringField).toBe("abc");
    });
    test("sets ReflectMap", () => {
      const f = getFieldByLocalName(desc, "mapStringStringField", "map");
      const map = reflectMap(f);
      expect(map.set("foo", "bar")).toBeUndefined();
      const err = r.set(f, map);
      expect(err).toBeUndefined();
      expect(msg.mapStringStringField).toStrictEqual({ foo: "bar" });
    });
    test("sets ReflectList", () => {
      const f = getFieldByLocalName(desc, "repeatedStringField", "list");
      const list = reflectList(f);
      expect(list.add("foo")).toBeUndefined();
      const err = r.set(f, list);
      expect(err).toBeUndefined();
      expect(msg.repeatedStringField).toStrictEqual(["foo"]);
    });
    test("sets ReflectMessage", () => {
      const f = getFieldByLocalName(desc, "singularMessageField");
      const testMessage = create(proto3_ts.Proto3MessageDesc);
      const err = r.set(f, reflect(proto3_ts.Proto3MessageDesc, testMessage));
      expect(err).toBeUndefined();
      expect(msg.singularMessageField).toBe(testMessage);
    });
    test("sets number, string, bigint as bigint for 64-bit integer field", () => {
      const singularInt64Field = getFieldByLocalName(
        desc,
        "singularInt64Field",
      );
      expect(r.set(singularInt64Field, protoInt64.parse(123))).toBeUndefined();
      expect(msg.singularInt64Field === protoInt64.parse(123)).toBe(true);
      expect(r.set(singularInt64Field, 123)).toBeUndefined();
      expect(msg.singularInt64Field === protoInt64.parse(123)).toBe(true);
      expect(r.set(singularInt64Field, "123")).toBeUndefined();
      expect(msg.singularInt64Field === protoInt64.parse(123)).toBe(true);
    });
    test("sets number, string, bigint as string for 64-bit integer field with jstype=JS_STRING", () => {
      const singularInt64JsStringField = getFieldByLocalName(
        desc,
        "singularInt64JsStringField",
      );
      expect(
        r.set(singularInt64JsStringField, protoInt64.parse(123)),
      ).toBeUndefined();
      expect(msg.singularInt64JsStringField).toBe("123");
      expect(r.set(singularInt64JsStringField, 123)).toBeUndefined();
      expect(msg.singularInt64JsStringField).toBe("123");
      expect(r.set(singularInt64JsStringField, "123")).toBeUndefined();
      expect(msg.singularInt64JsStringField).toBe("123");
    });
    test("sets unwrapped value for wrapper field", () => {
      const singularWrappedUint32Field = getFieldByLocalName(
        desc,
        "singularWrappedUint32Field",
      );
      const wrapper = create(UInt32ValueDesc, { value: 123 });
      const err = r.set(
        singularWrappedUint32Field,
        reflect(UInt32ValueDesc, wrapper),
      );
      expect(err).toBeUndefined();
      expect(msg.singularWrappedUint32Field).toBe(123);
    });
    test("sets unknown value for open enum", () => {
      const singularEnumField = getFieldByLocalName(desc, "singularEnumField");
      const err = r.set(singularEnumField, 99);
      expect(err).toBeUndefined();
      expect(msg.singularEnumField).toBe(99);
    });
    test("selects oneof field", () => {
      const oneofInt32Field = getFieldByLocalName(desc, "oneofInt32Field");
      msg.either = {
        case: "oneofInt32Field",
        value: 123,
      };
      r.set(oneofInt32Field, 123);
      expect(msg.either).toStrictEqual({
        case: "oneofInt32Field",
        value: 123,
      });
    });
    test("deselects other oneof field", () => {
      const oneofBoolField = getFieldByLocalName(desc, "oneofBoolField");
      const oneofInt32Field = getFieldByLocalName(desc, "oneofInt32Field");
      msg.either = {
        case: "oneofInt32Field",
        value: 123,
      };
      r.set(oneofBoolField, false);
      expect(msg.either).toStrictEqual({
        case: "oneofBoolField",
        value: false,
      });
      expect(r.isSet(oneofInt32Field)).toBe(false);
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      expect(() => r.set(foreignField, "value")).toThrow(
        /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      );
    });
    test("returns error setting number out of range", () => {
      const f = getFieldByLocalName(r.desc, "singularInt32Field");
      const err = r.set(f, Number.MAX_SAFE_INTEGER);
      expect(err?.message).toMatch(
        /^expected number \(int32\): 9007199254740991 out of range$/,
      );
      expect(err?.name).toMatch("FieldValueInvalidError");
    });
    test("returns error setting float for int", () => {
      const f = getFieldByLocalName(r.desc, "singularInt32Field");
      const err = r.set(f, 3.142);
      expect(err?.message).toMatch(/^expected number \(int32\), got 3.142$/);
      expect(err?.name).toMatch("FieldValueInvalidError");
    });
    describe("returns error setting undefined", () => {
      test.each(desc.fields)("for proto3 field $name", (f) => {
        const err = r.set(f, undefined);
        expect(err).toBeDefined();
        expect(err?.message).toMatch(/^expected .*, got undefined/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    describe("returns error setting null", () => {
      test.each(desc.fields)("for proto3 field $name", (f) => {
        // @ts-expect-error ignore to test runtime behavior
        const err = r.set(f, null);
        expect(err).toBeDefined();
        expect(err?.message).toMatch(/^expected .*, got null/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    describe("returns error setting array", () => {
      test.each(desc.fields)("$name", (f) => {
        // @ts-expect-error testing
        const err = r.set(f, [1, 2]);
        expect(err?.message).toMatch(/^expected .*, got Array\(2\)$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    describe("returns error setting object", () => {
      test.each(desc.fields)("$name", (f) => {
        // @ts-expect-error ignore for test
        const err = r.set(f, new Date());
        expect(err?.message).toMatch(/^expected .*, got object$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    describe("returns error setting message", () => {
      test.each(desc.fields)("$name", (f) => {
        // @ts-expect-error ignore to test runtime behavior
        const err = r.set(f, create(proto3_ts.Proto3MessageDesc));
        expect(err?.message).toMatch(
          /^expected .*, got message spec.Proto3Message$/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    describe("returns error setting scalar value for message field", () => {
      const fields = desc.fields.filter((f) => f.fieldKind == "message");
      test.each(fields)("set $name true", (f) => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(/^expected .*, got true$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test.each(fields)("set $name 'abc'", (f) => {
        const err = r.set(f, "abc");
        expect(err?.message).toMatch(/^expected .*, got "abc"$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test.each(fields)("set $name 123", (f) => {
        const err = r.set(f, 123);
        expect(err?.message).toMatch(/^expected .*, got 123$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    describe("returns error setting non-integer value for enum field", () => {
      const fields = desc.fields.filter((f) => f.fieldKind == "enum");
      test.each(fields)("set $name true", (f) => {
        const err = r.set(f, true);
        expect(err?.message).toMatch(/^expected enum .*, got true$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test.each(fields)("set $name 'abc'", (f) => {
        const err = r.set(f, "abc");
        expect(err?.message).toMatch(/^expected enum .*, got "abc"$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test.each(fields)("set $name 3.142", (f) => {
        const err = r.set(f, 3.142);
        expect(err?.message).toMatch(/^expected enum .*, got 3.142$/);
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    test("returns error setting incompatible ReflectMessage", () => {
      const f = getFieldByLocalName(r.desc, "singularMessageField");
      const err = r.set(f, reflect(example_ts.UserDesc));
      expect(err?.message).toMatch(
        /^expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(docs.User\)$/,
      );
      expect(err?.name).toMatch("FieldValueInvalidError");
    });
    test("returns error setting incompatible ReflectMap", () => {
      const mapStringStringField = getFieldByLocalName(
        desc,
        "mapStringStringField",
        "map",
      );
      const mapInt32Int32Field = getFieldByLocalName(
        desc,
        "mapInt32Int32Field",
        "map",
      );
      const map = reflectMap(mapStringStringField);
      const err = r.set(mapInt32Int32Field, map);
      expect(err?.message).toMatch(
        /^expected ReflectMap \(INT32, INT32\), got ReflectMap \(STRING, STRING\)$/,
      );
      expect(err?.name).toMatch("FieldValueInvalidError");
    });
    test("returns error setting incompatible ReflectList", () => {
      const repeatedStringField = getFieldByLocalName(
        desc,
        "repeatedStringField",
        "list",
      );
      const repeatedInt32Field = getFieldByLocalName(
        desc,
        "repeatedInt32Field",
        "list",
      );
      const list = reflectList(repeatedStringField);
      const err = r.set(repeatedInt32Field, list);
      expect(err?.message).toMatch(
        /^expected ReflectList \(INT32\), got ReflectList \(STRING\)$/,
      );
      expect(err?.name).toMatch("FieldValueInvalidError");
    });
  });
  describe("isSet()", () => {
    test("returns true for set fields", () => {
      const desc = proto3_ts.Proto3MessageDesc;
      const msg = create(desc);
      msg.singularStringField = "non-zero";
      msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
      msg.singularInt32Field = 123;
      msg.singularInt64Field = protoInt64.parse(123);
      msg.singularInt64JsStringField = "789";
      msg.singularEnumField = proto3_ts.Proto3Enum.YES;
      msg.singularMessageField = create(desc);
      msg.singularWrappedUint32Field = 123;
      msg.optionalStringField = "non-zero";
      msg.optionalInt64Field = protoInt64.zero;
      msg.optionalInt64JsStringField = "0";
      msg.optionalMessageField = create(desc);
      msg.optionalWrappedUint32Field = 0;
      msg.repeatedStringField = ["a", "b", "c"];
      msg.repeatedWrappedUint32Field = [
        create(UInt32ValueDesc),
        create(UInt32ValueDesc),
      ];
      msg.repeatedInt64Field = [
        protoInt64.parse(1),
        protoInt64.parse(2),
        protoInt64.parse(3),
      ];
      msg.repeatedInt64JsStringField = ["1", "2", "3"];
      msg.repeatedMessageField = [create(desc), create(desc)];
      msg.repeatedEnumField = [proto3_ts.Proto3Enum.UNSPECIFIED];
      msg.either = {
        case: "oneofBoolField",
        value: false,
      };
      msg.mapStringStringField = {
        a: "A",
      };
      const r = reflect(desc, msg);
      expect(r.isSet(getFieldByLocalName(desc, "singularStringField"))).toBe(
        true,
      );
      expect(r.isSet(getFieldByLocalName(desc, "singularBytesField"))).toBe(
        true,
      );
      expect(r.isSet(getFieldByLocalName(desc, "singularInt32Field"))).toBe(
        true,
      );
      expect(r.isSet(getFieldByLocalName(desc, "singularInt64Field"))).toBe(
        true,
      );
      expect(
        r.isSet(getFieldByLocalName(desc, "singularInt64JsStringField")),
      ).toBe(true);
      expect(r.isSet(getFieldByLocalName(desc, "singularEnumField"))).toBe(
        true,
      );
      expect(r.isSet(getFieldByLocalName(desc, "singularMessageField"))).toBe(
        true,
      );
      expect(
        r.isSet(getFieldByLocalName(desc, "singularWrappedUint32Field")),
      ).toBe(true);
      expect(r.isSet(getFieldByLocalName(desc, "optionalStringField"))).toBe(
        true,
      );
      expect(r.isSet(getFieldByLocalName(desc, "optionalInt64Field"))).toBe(
        true,
      );
      expect(
        r.isSet(getFieldByLocalName(desc, "optionalInt64JsStringField")),
      ).toBe(true);
      expect(r.isSet(getFieldByLocalName(desc, "optionalMessageField"))).toBe(
        true,
      );
      expect(
        r.isSet(getFieldByLocalName(desc, "optionalWrappedUint32Field")),
      ).toBe(true);
      expect(r.isSet(getFieldByLocalName(desc, "repeatedStringField"))).toBe(
        true,
      );
      expect(
        r.isSet(getFieldByLocalName(desc, "repeatedWrappedUint32Field")),
      ).toBe(true);
      expect(r.isSet(getFieldByLocalName(desc, "repeatedInt64Field"))).toBe(
        true,
      );
      expect(
        r.isSet(getFieldByLocalName(desc, "repeatedInt64JsStringField")),
      ).toBe(true);
      expect(r.isSet(getFieldByLocalName(desc, "repeatedMessageField"))).toBe(
        true,
      );
      expect(r.isSet(getFieldByLocalName(desc, "repeatedEnumField"))).toBe(
        true,
      );
      expect(r.isSet(getFieldByLocalName(desc, "oneofBoolField"))).toBe(true);
      expect(r.isSet(getFieldByLocalName(desc, "mapStringStringField"))).toBe(
        true,
      );
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      const r = reflect(proto3_ts.Proto3MessageDesc);
      expect(() => r.isSet(foreignField)).toThrow(
        /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      );
    });
  });
  describe("clear()", () => {
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(proto3_ts.Proto3MessageDesc);
      msg.singularStringField = "non-zero";
      msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
      msg.singularInt32Field = 123;
      msg.singularInt64Field = protoInt64.parse(123);
      msg.singularInt64JsStringField = "789";
      msg.singularEnumField = proto3_ts.Proto3Enum.YES;
      msg.singularMessageField = create(proto3_ts.Proto3MessageDesc);
      msg.singularWrappedUint32Field = 123;
      msg.optionalStringField = "non-zero";
      msg.optionalInt64Field = protoInt64.zero;
      msg.optionalInt64JsStringField = "0";
      msg.optionalMessageField = create(proto3_ts.Proto3MessageDesc);
      msg.optionalWrappedUint32Field = 0;
      msg.repeatedStringField = ["a", "b", "c"];
      msg.repeatedWrappedUint32Field = [
        create(UInt32ValueDesc),
        create(UInt32ValueDesc),
      ];
      msg.repeatedInt64Field = [
        protoInt64.parse(1),
        protoInt64.parse(2),
        protoInt64.parse(3),
      ];
      msg.repeatedInt64JsStringField = ["1", "2", "3"];
      msg.repeatedMessageField = [
        create(proto3_ts.Proto3MessageDesc),
        create(proto3_ts.Proto3MessageDesc),
      ];
      msg.repeatedEnumField = [proto3_ts.Proto3Enum.UNSPECIFIED];
      msg.either = {
        case: "oneofBoolField",
        value: false,
      };
      msg.mapStringStringField = {
        a: "A",
      };
      r = reflect(proto3_ts.Proto3MessageDesc, msg);
    });
    test.each(proto3_ts.Proto3MessageDesc.fields)(
      "clears proto3 field $name",
      (f) => {
        r.clear(f);
        expect(r.isSet(f)).toBe(false);
      },
    );
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { repeated string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      assert(foreignField.fieldKind == "list");
      expect(() => r.clear(foreignField)).toThrow(
        /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      );
    });
  });
  describe("addListItem()", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(desc);
      r = reflect(desc, msg);
    });
    test("adds valid item to repeatedStringField", () => {
      const f = getFieldByLocalName(desc, "repeatedStringField", "list");
      const err = r.addListItem(f, "abc");
      expect(err).toBeUndefined();
      expect(msg.repeatedStringField).toStrictEqual(["abc"]);
    });
    test("adds unknown value for open enum", () => {
      const f = getFieldByLocalName(desc, "repeatedEnumField", "list");
      const err = r.addListItem(f, 99);
      expect(err).toBeUndefined();
      expect(msg.repeatedEnumField).toStrictEqual([99]);
    });
    test("adds bigint, number, and string as bigint", () => {
      const f = getFieldByLocalName(desc, "repeatedInt64Field", "list");
      r.addListItem(f, protoInt64.parse(1));
      r.addListItem(f, 2);
      r.addListItem(f, "3");
      expect(msg.repeatedInt64Field).toStrictEqual([
        protoInt64.parse(1),
        protoInt64.parse(2),
        protoInt64.parse(3),
      ]);
    });
    test("adds bigint, number, and string as string for jstype=JS_STRING", () => {
      const f = getFieldByLocalName(desc, "repeatedInt64JsStringField", "list");
      r.addListItem(f, protoInt64.parse(1));
      r.addListItem(f, 2);
      r.addListItem(f, "3");
      expect(msg.repeatedInt64JsStringField).toStrictEqual(["1", "2", "3"]);
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { repeated string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      assert(foreignField.fieldKind == "list");
      expect(() => r.addListItem(foreignField, "value")).toThrow(
        /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      );
    });
    describe("returns error on invalid item", () => {
      test("bool for repeatedStringField", () => {
        const f = getFieldByLocalName(desc, "repeatedStringField", "list");
        const err = r.addListItem(f, true);
        expect(err?.message).toMatch(
          /^list item #1: expected string, got true$/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("number out of range for repeatedInt32Field", () => {
        const f = getFieldByLocalName(desc, "repeatedInt32Field", "list");
        const err = r.addListItem(f, Number.MAX_SAFE_INTEGER);
        expect(err?.message).toMatch(
          /^list item #1: expected number \(int32\): 9007199254740991 out of range/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("message for repeatedMessageField", () => {
        const f = getFieldByLocalName(desc, "repeatedMessageField", "list");
        // @ts-expect-error ignore to test runtime behavior
        const err = r.addListItem(f, create(example_ts.UserDesc));
        expect(err?.message).toMatch(
          /^list item #1: expected ReflectMessage \(spec.Proto3Message\), got message docs.User/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("wrong ReflectMessage for repeatedMessageField", () => {
        const f = getFieldByLocalName(desc, "repeatedMessageField", "list");
        const testMessage = reflect(example_ts.UserDesc);
        const err = r.addListItem(f, testMessage);
        expect(err?.message).toMatch(
          /^list item #1: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(docs.User\)/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("true for repeatedMessageField", () => {
        const f = getFieldByLocalName(desc, "repeatedMessageField", "list");
        const err = r.addListItem(f, true);
        expect(err?.message).toMatch(
          /^list item #1: expected ReflectMessage \(spec.Proto3Message\), got true/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
  });
  describe("setMapEntry()", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(desc);
      r = reflect(desc, msg);
    });
    test("adds valid entry to mapStringStringField", () => {
      const f = getFieldByLocalName(desc, "mapStringStringField", "map");
      const err = r.setMapEntry(f, "key", "value");
      expect(err).toBeUndefined();
      expect(msg.mapStringStringField).toStrictEqual({ key: "value" });
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { map<string, string> foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      if (foreignField.fieldKind != "map") {
        throw new Error();
      }
      expect(() => r.setMapEntry(foreignField, "key", "value")).toThrow(
        /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      );
    });
    test("adds bigint, number, and string value as bigint", () => {
      const f = getFieldByLocalName(desc, "mapInt64Int64Field", "map");
      expect(
        r.setMapEntry(f, protoInt64.parse(1), protoInt64.parse(1)),
      ).toBeUndefined();
      expect(r.setMapEntry(f, protoInt64.parse(2), 2)).toBeUndefined();
      expect(r.setMapEntry(f, protoInt64.parse(3), "3")).toBeUndefined();
      expect(Object.values(msg.mapInt64Int64Field)).toStrictEqual([
        protoInt64.parse(1),
        protoInt64.parse(2),
        protoInt64.parse(3),
      ]);
    });
    test("adds bigint, number, and string key as string", () => {
      const f = getFieldByLocalName(desc, "mapInt64Int64Field", "map");
      expect(
        r.setMapEntry(f, protoInt64.parse(1), protoInt64.parse(1)),
      ).toBeUndefined();
      expect(r.setMapEntry(f, 2, protoInt64.parse(1))).toBeUndefined();
      expect(r.setMapEntry(f, "3", protoInt64.parse(1))).toBeUndefined();
      expect(Object.keys(msg.mapInt64Int64Field)).toStrictEqual([
        "1",
        "2",
        "3",
      ]);
    });
    test("adds bool key as string", () => {
      const f = getFieldByLocalName(desc, "mapBoolBoolField", "map");
      expect(r.setMapEntry(f, true, true)).toBeUndefined();
      expect(r.setMapEntry(f, false, false)).toBeUndefined();
      expect(Object.keys(msg.mapBoolBoolField)).toStrictEqual([
        "true",
        "false",
      ]);
    });
    describe("returns error on invalid value", () => {
      test("wrong message", () => {
        const f = getFieldByLocalName(desc, "mapInt32MessageField", "map");
        const err = r.setMapEntry(f, 123, reflect(example_ts.UserDesc));
        expect(err?.message).toMatch(
          /^map entry 123: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(docs.User\)/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
      test("number out of range", () => {
        const f = getFieldByLocalName(desc, "mapInt32Int32Field", "map");
        const err = r.setMapEntry(f, 123, Number.MAX_SAFE_INTEGER);
        expect(err?.message).toMatch(
          /^map entry 123: expected number \(int32\): 9007199254740991 out of range/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
    describe("returns error on invalid key", () => {
      test("number out of range", () => {
        const f = getFieldByLocalName(desc, "mapInt32Int32Field", "map");
        const err = r.setMapEntry(f, Number.MAX_SAFE_INTEGER, 123);
        expect(err?.message).toMatch(
          /^invalid map key: expected number \(int32\): 9007199254740991 out of range/,
        );
        expect(err?.name).toMatch("FieldValueInvalidError");
      });
    });
  });
});
