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

import { suite, test, beforeEach } from "node:test";
import * as assert from "node:assert";
import type { DescMessage, Message } from "@bufbuild/protobuf";
import { create, protoInt64 } from "@bufbuild/protobuf";
import type { ReflectMessage } from "@bufbuild/protobuf/reflect";
import {
  isReflectList,
  isReflectMap,
  isReflectMessage,
  reflect,
  reflectList,
  reflectMap,
} from "@bufbuild/protobuf/reflect";
import { catchFieldError, compileMessage } from "../helpers.js";
import { StructSchema, UInt32ValueSchema } from "@bufbuild/protobuf/wkt";
import * as proto3_ts from "../gen/ts/extra/proto3_pb.js";
import * as example_ts from "../gen/ts/extra/example_pb.js";

void suite("reflect()", () => {
  test("accepts generated message shape", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    const r = reflect(proto3_ts.Proto3MessageSchema, msg);
    assert.ok(r !== undefined);
  });
  test("accepts anonymous message", () => {
    const desc: DescMessage = proto3_ts.Proto3MessageSchema;
    const msg: Message = create(desc);
    const r = reflect(desc, msg);
    assert.ok(r !== undefined);
  });
  test("accepts option to disable field check", () => {
    const msg = create(proto3_ts.Proto3MessageSchema);
    const r = reflect(proto3_ts.Proto3MessageSchema, msg, false);
    const field = r.findNumber(3);
    assert.strictEqual(field?.name, "singular_int32_field");
    if (field) {
      r.set(field, "not a int 32");
    }
  });
});

void suite("ReflectMessage", () => {
  void suite("findNumber()", () => {
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
      assert.ok(f !== undefined);
      assert.strictEqual(f?.name, "f2");
      assert.strictEqual(f?.number, 2);
    });
  });
  void suite("sortedFields", () => {
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
      assert.deepStrictEqual(sortedNumbers, [1, 2, 3]);
    });
  });
  void suite("oneofCase()", () => {
    test("returns selected field", () => {
      const msg = create(proto3_ts.Proto3MessageSchema);
      msg.either = {
        case: "oneofInt32Field",
        value: 123,
      };
      const r = reflect(proto3_ts.Proto3MessageSchema, msg);
      assert.ok(r.oneofs[0] !== undefined);
      const selectedField = r.oneofCase(r.oneofs[0]);
      assert.ok(selectedField !== undefined);
      assert.strictEqual(selectedField?.name, "oneof_int32_field");
    });
    test("returns undefined for oneof w/o selected field", () => {
      const msg = create(proto3_ts.Proto3MessageSchema);
      msg.either = {
        case: undefined,
      };
      const r = reflect(proto3_ts.Proto3MessageSchema, msg);
      assert.ok(r.oneofs[0] !== undefined);
      const selectedField = r.oneofCase(r.oneofs[0]);
      assert.strictEqual(selectedField, undefined);
    });
    test("throws error on foreign oneof", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { oneof foo { string str = 1; }}
      `);
      const foreignOneof = foreignMessage.oneofs[0];
      const r = reflect(proto3_ts.Proto3MessageSchema);
      assert.throws(() => r.oneofCase(foreignOneof), {
        message:
          /^cannot use oneof Foreign.foo with message spec.Proto3Message$/,
      });
    });
  });
  void suite("get()", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(desc);
      r = reflect(desc, msg);
    });
    test("gets message", () => {
      const f = desc.field.singularMessageField;
      assert.strictEqual(f.fieldKind, "message");
      msg.singularMessageField = create(proto3_ts.Proto3MessageSchema);
      const v = r.get(f);
      assert.strictEqual(isReflectMessage(v), true);
      if (isReflectMessage(v)) {
        assert.strictEqual(v.message, msg.singularMessageField);
      }
    });
    test("gets enum", () => {
      const f = desc.field.singularEnumField;
      msg.singularEnumField = proto3_ts.Proto3Enum.YES;
      assert.strictEqual(r.get(f), proto3_ts.Proto3Enum.YES);
    });
    test("gets string", () => {
      const f = desc.field.singularStringField;
      msg.singularStringField = "abc";
      assert.strictEqual(r.get(f), "abc");
    });
    test("gets list", () => {
      const f = desc.field.repeatedStringField;
      assert.strictEqual(f.fieldKind, "list");
      const list = r.get(f);
      assert.strictEqual(isReflectList(list), true);
    });
    test("gets map", () => {
      const f = desc.field.mapStringStringField;
      assert.strictEqual(f.fieldKind, "map");
      const map = r.get(f);
      assert.strictEqual(isReflectMap(map), true);
    });
    test("gets wrapped wrapper field", () => {
      const f = desc.field.singularWrappedUint32Field;
      msg.singularWrappedUint32Field = 123;
      const wrapper = r.get(f);
      assert.strictEqual(isReflectMessage(wrapper, UInt32ValueSchema), true);
      if (isReflectMessage(wrapper, UInt32ValueSchema)) {
        const value = wrapper.get(wrapper.fields[0]);
        assert.strictEqual(value, 123);
      }
    });
    test("gets google.protobuf.Struct field", () => {
      msg.singularStructField = {
        shouldBeJson: true,
      };
      msg.repeatedStructField = [{ shouldBeJson: 1 }, { shouldBeJson: 2 }];
      msg.either = {
        case: "oneofStructField",
        value: {
          shouldBeJson: true,
        },
      };
      msg.mapInt32StructField = {
        123: { shouldBeJson: true },
      };
      for (const f of desc.fields) {
        if (f.message?.typeName != StructSchema.typeName) {
          continue;
        }
        // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
        switch (f.fieldKind) {
          case "message":
            assert.strictEqual(isReflectMessage(r.get(f), StructSchema), true);
            break;
          case "list":
            assert.strictEqual(
              isReflectMessage(r.get(f).get(0), StructSchema),
              true,
            );
            break;
          case "map":
            assert.strictEqual(
              isReflectMessage(r.get(f).get(123), StructSchema),
              true,
            );
            break;
        }
      }
    });
    test("gets selected oneof field", () => {
      const f = desc.field.oneofBoolField;
      msg.either = {
        case: "oneofBoolField",
        value: false,
      };
      assert.strictEqual(r.get(f), false);
    });
    void suite("returns zero value for unset", () => {
      test("scalar oneof field", () => {
        const f = desc.field.oneofBoolField;
        assert.strictEqual(r.get(f), false);
      });
      test("optional string field", () => {
        const f = desc.field.optionalStringField;
        assert.strictEqual(r.get(f), "");
      });
      test("optional enum field", () => {
        const f = desc.field.optionalEnumField;
        assert.strictEqual(r.get(f), proto3_ts.Proto3Enum.UNSPECIFIED);
      });
      test("message field", () => {
        const f = desc.field.singularMessageField;
        assert.strictEqual(f.fieldKind, "message");
        const v = r.get(f);
        assert.strictEqual(isReflectMessage(v), true);
        if (isReflectMessage(v)) {
          for (const f of v.fields) {
            assert.strictEqual(v.isSet(f), false);
          }
        }
        assert.strictEqual(r.isSet(f), false);
      });
    });
    test("returns ReflectMessage with zero message for unset message field", () => {
      const f = desc.field.singularMessageField;
      assert.strictEqual(f.fieldKind, "message");
      const v = r.get(f);
      assert.strictEqual(isReflectMessage(v), true);
      if (isReflectMessage(v)) {
        for (const f of v.fields) {
          assert.strictEqual(v.isSet(f), false);
        }
      }
    });
    test("returns bigint for jstype=JS_STRING", () => {
      const f = desc.field.singularInt64JsStringField;
      msg.singularInt64JsStringField = "123";
      assert.strictEqual(r.get(f), protoInt64.parse(123));
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      assert.ok(foreignField.fieldKind == "scalar");
      assert.throws(() => r.get(foreignField), {
        message:
          /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      });
    });
  });
  void suite("set()", () => {
    const desc = proto3_ts.Proto3MessageSchema;
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(desc);
      r = reflect(desc, msg);
    });
    test("sets enum", () => {
      const f = desc.field.singularEnumField;
      r.set(f, proto3_ts.Proto3Enum.YES);
      assert.strictEqual(msg.singularEnumField, proto3_ts.Proto3Enum.YES);
    });
    test("sets string", () => {
      const f = desc.field.singularStringField;
      r.set(f, "abc");
      assert.strictEqual(msg.singularStringField, "abc");
    });
    test("sets ReflectMap", () => {
      const f = desc.field.mapStringStringField;
      assert.strictEqual(f.fieldKind, "map");
      const map = reflectMap(f);
      map.set("foo", "bar");
      r.set(f, map);
      assert.deepStrictEqual(msg.mapStringStringField, { foo: "bar" });
    });
    test("sets ReflectList", () => {
      const f = desc.field.repeatedStringField;
      assert.strictEqual(f.fieldKind, "list");
      const list = reflectList(f);
      list.add("foo");
      r.set(f, list);
      assert.deepStrictEqual(msg.repeatedStringField, ["foo"]);
    });
    test("sets ReflectMessage", () => {
      const f = desc.field.singularMessageField;
      const testMessage = create(proto3_ts.Proto3MessageSchema);
      r.set(f, reflect(proto3_ts.Proto3MessageSchema, testMessage));
      assert.strictEqual(msg.singularMessageField, testMessage);
    });
    test("sets number, string, bigint as bigint for 64-bit integer field", () => {
      const f = desc.field.singularInt64Field;
      r.set(f, protoInt64.parse(123));
      assert.strictEqual(
        msg.singularInt64Field === protoInt64.parse(123),
        true,
      );
      r.set(f, 123);
      assert.strictEqual(
        msg.singularInt64Field === protoInt64.parse(123),
        true,
      );
      r.set(f, "123");
      assert.strictEqual(
        msg.singularInt64Field === protoInt64.parse(123),
        true,
      );
    });
    test("sets number, string, bigint as string for 64-bit integer field with jstype=JS_STRING", () => {
      const f = desc.field.singularInt64JsStringField;
      r.set(f, protoInt64.parse(123));
      assert.strictEqual(msg.singularInt64JsStringField, "123");
      r.set(f, 123);
      assert.strictEqual(msg.singularInt64JsStringField, "123");
      r.set(f, "123");
      assert.strictEqual(msg.singularInt64JsStringField, "123");
    });
    test("sets unwrapped value for wrapper field", () => {
      const f = desc.field.singularWrappedUint32Field;
      const wrapper = create(UInt32ValueSchema, { value: 123 });
      r.set(f, reflect(UInt32ValueSchema, wrapper));
      assert.strictEqual(msg.singularWrappedUint32Field, 123);
    });
    test("sets google.protobuf.Struct field as JsonObject", () => {
      const structMessage = create(StructSchema, {
        fields: {
          shouldBeJson: {
            kind: {
              case: "boolValue",
              value: true,
            },
          },
        },
      });
      const structReflect = reflect(StructSchema, structMessage);
      r.set(desc.field.singularStructField, structReflect);
      assert.deepStrictEqual(msg.singularStructField, {
        shouldBeJson: true,
      });
      r.set(desc.field.oneofStructField, structReflect);
      assert.deepStrictEqual(msg.either, {
        case: "oneofStructField",
        value: { shouldBeJson: true },
      });
    });
    test("sets unknown value for open enum", () => {
      const f = desc.field.singularEnumField;
      r.set(f, 99);
      assert.strictEqual(msg.singularEnumField, 99);
    });
    test("selects oneof field", () => {
      const f = desc.field.oneofInt32Field;
      msg.either = {
        case: "oneofInt32Field",
        value: 123,
      };
      r.set(f, 123);
      assert.deepStrictEqual(msg.either, {
        case: "oneofInt32Field",
        value: 123,
      });
    });
    test("deselects other oneof field", () => {
      const { oneofBoolField, oneofInt32Field } = desc.field;
      msg.either = {
        case: "oneofInt32Field",
        value: 123,
      };
      r.set(oneofBoolField, false);
      assert.deepStrictEqual(msg.either, {
        case: "oneofBoolField",
        value: false,
      });
      assert.strictEqual(r.isSet(oneofInt32Field), false);
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      assert.throws(() => r.set(foreignField, "value"), {
        message:
          /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      });
    });
    test("returns error setting number out of range", () => {
      const f = desc.field.singularInt32Field;
      const err = catchFieldError(() => r.set(f, Number.MAX_SAFE_INTEGER));
      assert.ok(err !== undefined);
      assert.match(
        err.message,
        /^expected number \(int32\): 9007199254740991 out of range$/,
      );
      assert.equal(err.name, "FieldValueInvalidError");
    });
    test("returns error setting float for int", () => {
      const f = desc.field.singularInt32Field;
      const err = catchFieldError(() => r.set(f, 3.14));
      assert.ok(err !== undefined);
      assert.match(err.message, /^expected number \(int32\), got 3.14$/);
      assert.equal(err.name, "FieldValueInvalidError");
    });
    void suite("returns error setting undefined", () => {
      for (const f of desc.fields) {
        void test(`for proto3 field ${f.name}`, () => {
          const err = catchFieldError(() => r.set(f, undefined));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected .*, got undefined/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
    });
    void suite("returns error setting null", () => {
      for (const f of desc.fields) {
        void test(`for proto3 field ${f.name}`, () => {
          const err = catchFieldError(() => r.set(f, null));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected .*, got null/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
    });
    void suite("throws error setting array", () => {
      for (const f of desc.fields) {
        void test(`${f.name}`, () => {
          const err = catchFieldError(() => r.set(f, [1, 2]));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected .*, got Array\(2\)$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
    });
    void suite("throws error setting object", () => {
      for (const f of desc.fields) {
        void test(`${f.name}`, () => {
          const err = catchFieldError(() => r.set(f, new Date()));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected .*, got object$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
    });
    void suite("throws error setting message", () => {
      for (const f of desc.fields) {
        void test(`${f.name}`, () => {
          const err = catchFieldError(() =>
            r.set(f, create(proto3_ts.Proto3MessageSchema)),
          );
          assert.ok(err !== undefined);
          assert.match(
            err.message,
            /^expected .*, got message spec.Proto3Message$/,
          );
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
    });
    void suite("throws error setting scalar value for message field", () => {
      const fields = desc.fields.filter((f) => f.fieldKind == "message");
      for (const f of fields) {
        void test(`set ${f.name} true`, () => {
          const err = catchFieldError(() => r.set(f, true));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected .*, got true$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
      for (const f of fields) {
        void test(`set ${f.name} 'abc'`, () => {
          const err = catchFieldError(() => r.set(f, "abc"));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected .*, got "abc"$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
      for (const f of fields) {
        void test(`set ${f.name} 123`, () => {
          const err = catchFieldError(() => r.set(f, 123));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected .*, got 123$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
    });
    void suite("throws error setting non-integer value for enum field", () => {
      const fields = desc.fields.filter((f) => f.fieldKind == "enum");
      for (const f of fields) {
        void test(`set ${f.name} true`, () => {
          const err = catchFieldError(() => r.set(f, true));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected enum .*, got true$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
      for (const f of fields) {
        void test(`set ${f.name} 'abc'`, () => {
          const err = catchFieldError(() => r.set(f, "abc"));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected enum .*, got "abc"$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
      for (const f of fields) {
        void test(`set ${f.name} 3.14`, () => {
          const err = catchFieldError(() => r.set(f, 3.14));
          assert.ok(err !== undefined);
          assert.match(err.message, /^expected enum .*, got 3.14$/);
          assert.equal(err.name, "FieldValueInvalidError");
        });
      }
    });
    test("throws error setting incompatible ReflectMessage", () => {
      const f = desc.field.singularMessageField;
      const err = catchFieldError(() =>
        r.set(f, reflect(example_ts.UserSchema)),
      );
      assert.ok(err !== undefined);
      assert.match(
        err.message,
        /^expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(example.User\)$/,
      );
      assert.equal(err.name, "FieldValueInvalidError");
    });
    test("throws error setting incompatible ReflectMap", () => {
      const { mapStringStringField, mapInt32Int32Field } = desc.field;
      assert.strictEqual(mapStringStringField.fieldKind, "map");
      assert.strictEqual(mapInt32Int32Field.fieldKind, "map");
      const map = reflectMap(mapStringStringField);
      const err = catchFieldError(() => r.set(mapInt32Int32Field, map));
      assert.ok(err !== undefined);
      assert.match(
        err.message,
        /^expected ReflectMap \(INT32, INT32\), got ReflectMap \(STRING, STRING\)$/,
      );
      assert.equal(err.name, "FieldValueInvalidError");
    });
    test("throws error setting incompatible ReflectList", () => {
      const { repeatedStringField, repeatedInt32Field } = desc.field;
      assert.strictEqual(repeatedStringField.fieldKind, "list");
      assert.strictEqual(repeatedInt32Field.fieldKind, "list");
      const list = reflectList(repeatedStringField);
      const err = catchFieldError(() => r.set(repeatedInt32Field, list));
      assert.ok(err !== undefined);
      assert.match(
        err.message,
        /^expected ReflectList \(INT32\), got ReflectList \(STRING\)$/,
      );
      assert.equal(err.name, "FieldValueInvalidError");
    });
  });
  void suite("isSet()", () => {
    test("returns true for set fields", () => {
      const desc = proto3_ts.Proto3MessageSchema;
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
        create(UInt32ValueSchema),
        create(UInt32ValueSchema),
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
      assert.strictEqual(r.isSet(desc.field.singularStringField), true);
      assert.strictEqual(r.isSet(desc.field.singularBytesField), true);
      assert.strictEqual(r.isSet(desc.field.singularInt32Field), true);
      assert.strictEqual(r.isSet(desc.field.singularInt64Field), true);
      assert.strictEqual(r.isSet(desc.field.singularInt64JsStringField), true);
      assert.strictEqual(r.isSet(desc.field.singularEnumField), true);
      assert.strictEqual(r.isSet(desc.field.singularMessageField), true);
      assert.strictEqual(r.isSet(desc.field.singularWrappedUint32Field), true);
      assert.strictEqual(r.isSet(desc.field.optionalStringField), true);
      assert.strictEqual(r.isSet(desc.field.optionalInt64Field), true);
      assert.strictEqual(r.isSet(desc.field.optionalInt64JsStringField), true);
      assert.strictEqual(r.isSet(desc.field.optionalMessageField), true);
      assert.strictEqual(r.isSet(desc.field.optionalWrappedUint32Field), true);
      assert.strictEqual(r.isSet(desc.field.repeatedStringField), true);
      assert.strictEqual(r.isSet(desc.field.repeatedWrappedUint32Field), true);
      assert.strictEqual(r.isSet(desc.field.repeatedInt64Field), true);
      assert.strictEqual(r.isSet(desc.field.repeatedInt64JsStringField), true);
      assert.strictEqual(r.isSet(desc.field.repeatedMessageField), true);
      assert.strictEqual(r.isSet(desc.field.repeatedEnumField), true);
      assert.strictEqual(r.isSet(desc.field.oneofBoolField), true);
      assert.strictEqual(r.isSet(desc.field.mapStringStringField), true);
    });
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      const r = reflect(proto3_ts.Proto3MessageSchema);
      assert.throws(() => r.isSet(foreignField), {
        message:
          /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      });
    });
  });
  void suite("clear()", () => {
    let msg: proto3_ts.Proto3Message;
    let r: ReflectMessage;
    beforeEach(() => {
      msg = create(proto3_ts.Proto3MessageSchema);
      msg.singularStringField = "non-zero";
      msg.singularBytesField = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
      msg.singularInt32Field = 123;
      msg.singularInt64Field = protoInt64.parse(123);
      msg.singularInt64JsStringField = "789";
      msg.singularEnumField = proto3_ts.Proto3Enum.YES;
      msg.singularMessageField = create(proto3_ts.Proto3MessageSchema);
      msg.singularWrappedUint32Field = 123;
      msg.optionalStringField = "non-zero";
      msg.optionalInt64Field = protoInt64.zero;
      msg.optionalInt64JsStringField = "0";
      msg.optionalMessageField = create(proto3_ts.Proto3MessageSchema);
      msg.optionalWrappedUint32Field = 0;
      msg.repeatedStringField = ["a", "b", "c"];
      msg.repeatedWrappedUint32Field = [
        create(UInt32ValueSchema),
        create(UInt32ValueSchema),
      ];
      msg.repeatedInt64Field = [
        protoInt64.parse(1),
        protoInt64.parse(2),
        protoInt64.parse(3),
      ];
      msg.repeatedInt64JsStringField = ["1", "2", "3"];
      msg.repeatedMessageField = [
        create(proto3_ts.Proto3MessageSchema),
        create(proto3_ts.Proto3MessageSchema),
      ];
      msg.repeatedEnumField = [proto3_ts.Proto3Enum.UNSPECIFIED];
      msg.either = {
        case: "oneofBoolField",
        value: false,
      };
      msg.mapStringStringField = {
        a: "A",
      };
      r = reflect(proto3_ts.Proto3MessageSchema, msg);
    });
    for (const f of proto3_ts.Proto3MessageSchema.fields) {
      void test(`clears proto3 field ${f.name}`, () => {
        r.clear(f);
        assert.strictEqual(r.isSet(f), false);
      });
    }
    test("throws error on foreign field", async () => {
      const foreignMessage = await compileMessage(`
        syntax="proto3";
        message Foreign { repeated string foreign = 1;}
      `);
      const foreignField = foreignMessage.fields[0];
      assert.ok(foreignField.fieldKind == "list");
      assert.throws(() => r.clear(foreignField), {
        message:
          /^cannot use field Foreign.foreign with message spec.Proto3Message$/,
      });
    });
  });
});
