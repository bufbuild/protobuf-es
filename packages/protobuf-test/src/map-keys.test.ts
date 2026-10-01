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

import * as assert from "node:assert";
import { suite, test } from "node:test";
import {
  clone,
  create,
  createRegistry,
  fromBinary,
  fromJson,
  fromJsonString,
  merge,
  mergeFromBinary,
  mergeFromJson,
  protoInt64,
  toBinary,
  toJson,
  toJsonString,
} from "@bufbuild/protobuf";
import { reflect, reflectMap } from "@bufbuild/protobuf/reflect";
import { fromText, mergeFromText, toText } from "@bufbuild/protobuf/txtpb";
import {
  AnySchema,
  anyUnpack,
  NullValue,
  StructSchema,
  ValueSchema,
} from "@bufbuild/protobuf/wkt";
import type { JsonValue } from "@bufbuild/protobuf";
import { MapsMessageSchema } from "./gen/ts/extra/msg-maps_pb.js";
import { Proto3MessageSchema } from "./gen/ts/extra/proto3_pb.js";
import { compileMessage } from "./helpers.js";

function assertEntry(record: object, key: string, value: unknown) {
  assert.strictEqual(Object.getPrototypeOf(record), Object.prototype);
  assert.deepStrictEqual(Object.getOwnPropertyDescriptor(record, key), {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

void suite("map property names", () => {
  for (const key of [
    "__proto__",
    "constructor",
    "toString",
    "hasOwnProperty",
    "ordinary",
  ]) {
    void suite(key, () => {
      const init = {
        strStrField: { [key]: "value" },
        strInt32Field: { [key]: 0 },
        strBoolField: { [key]: true },
        strBytesField: { [key]: new Uint8Array([1, 2]) },
        strMsgField: {
          [key]: create(MapsMessageSchema, {
            strStrField: { marker: "value" },
          }),
        },
        strEnuField: { [key]: 1 },
      };
      const expected = { ...create(MapsMessageSchema), ...init };
      const json = {
        strStrField: { [key]: "value" },
        strInt32Field: { [key]: 0 },
        strBoolField: { [key]: true },
        strBytesField: { [key]: "AQI=" },
        strMsgField: { [key]: { strStrField: { marker: "value" } } },
        strEnuField: { [key]: "MAPS_ENUM_YES" },
      };
      const binary = toBinary(MapsMessageSchema, expected);
      const operations = {
        create: () => create(MapsMessageSchema, init),
        fromBinary: () => fromBinary(MapsMessageSchema, binary),
        mergeFromBinary: () =>
          mergeFromBinary(MapsMessageSchema, create(MapsMessageSchema), binary),
        fromJson: () => fromJson(MapsMessageSchema, json),
        fromJsonString: () =>
          fromJsonString(MapsMessageSchema, JSON.stringify(json)),
        mergeFromJson: () =>
          mergeFromJson(MapsMessageSchema, create(MapsMessageSchema), json),
        clone: () => clone(MapsMessageSchema, expected),
        merge: () => {
          const target = create(MapsMessageSchema);
          merge(MapsMessageSchema, target, expected);
          return target;
        },
      };
      for (const [name, run] of Object.entries(operations)) {
        test(name, () => {
          const actual = run();
          for (const field of Object.keys(init) as (keyof typeof init)[]) {
            assertEntry(actual[field], key, init[field][key]);
          }
          assert.deepStrictEqual(actual, expected);
        });
      }
      test("toJson", () => {
        const actual = toJson(MapsMessageSchema, expected);
        assert.deepStrictEqual(actual, json);
        assert.deepStrictEqual(
          JSON.parse(toJsonString(MapsMessageSchema, expected)),
          json,
        );
      });
      test("text round trip", { skip: !protoInt64.supported }, () => {
        const text = toText(MapsMessageSchema, expected);
        assert.deepStrictEqual(fromText(MapsMessageSchema, text), expected);
        assert.deepStrictEqual(
          mergeFromText(MapsMessageSchema, create(MapsMessageSchema), text),
          expected,
        );
      });
      test("reflection set, overwrite, and delete", () => {
        const record = {};
        const field = MapsMessageSchema.field.strStrField;
        assert.strictEqual(field.fieldKind, "map");
        const map = reflectMap(field, record);
        map.set(key, "first");
        assertEntry(record, key, "first");
        map.set(key, "second");
        assertEntry(record, key, "second");
        assert.strictEqual(map.get(key), "second");
        assert.strictEqual(map.size, 1);
        assert.strictEqual(map.delete(key), true);
        assert.deepStrictEqual(record, {});
      });
    });
  }

  test("converts plain message initializers", () => {
    const actual = create(MapsMessageSchema, {
      strMsgField: { ["__proto__"]: { strStrField: { marker: "value" } } },
    });
    assertEntry(
      actual.strMsgField,
      "__proto__",
      create(MapsMessageSchema, { strStrField: { marker: "value" } }),
    );
  });

  test("does not invoke inherited __proto__ setters on supplied maps", () => {
    let calls = 0;
    const prototype = Object.defineProperty({}, "__proto__", {
      set() {
        calls++;
      },
    });
    const record = Object.create(prototype) as Record<string, string>;
    const field = MapsMessageSchema.field.strStrField;
    assert.strictEqual(field.fieldKind, "map");
    const map = reflectMap(field, record);
    map.set("__proto__", "value");
    assert.strictEqual(calls, 0);
    assert.strictEqual(Object.getPrototypeOf(record), prototype);
    assert.deepStrictEqual(
      Object.getOwnPropertyDescriptor(record, "__proto__"),
      {
        value: "value",
        writable: true,
        enumerable: true,
        configurable: true,
      },
    );
  });

  test("replaces own __proto__ accessors without invoking them", () => {
    const record = Object.defineProperty({}, "__proto__", {
      get() {
        assert.fail("getter must not be invoked");
      },
      set() {
        assert.fail("setter must not be invoked");
      },
      configurable: true,
    });
    const field = MapsMessageSchema.field.strStrField;
    assert.strictEqual(field.fieldKind, "map");
    reflectMap(field, record).set("__proto__", "value");
    assertEntry(record, "__proto__", "value");
  });

  test("overwrites ordinary writable non-configurable entries", () => {
    const record = Object.defineProperty({}, "entry", {
      value: "first",
      writable: true,
      enumerable: true,
      configurable: false,
    });
    const field = MapsMessageSchema.field.strStrField;
    assert.strictEqual(field.fieldKind, "map");
    reflectMap(field, record).set("entry", "second");
    assert.deepStrictEqual(Object.getOwnPropertyDescriptor(record, "entry"), {
      value: "second",
      writable: true,
      enumerable: true,
      configurable: false,
    });
  });

  test("does not read inherited properties", () => {
    const field = MapsMessageSchema.field.strMsgField;
    assert.strictEqual(field.fieldKind, "map");
    const map = reflectMap(field, {});
    for (const key of [
      "__proto__",
      "constructor",
      "toString",
      "hasOwnProperty",
    ]) {
      assert.strictEqual(map.has(key), false);
      assert.strictEqual(map.get(key), undefined);
    }
  });

  test("preserves null-prototype maps", () => {
    const record = Object.create(null) as Record<string, string>;
    const field = MapsMessageSchema.field.strStrField;
    assert.strictEqual(field.fieldKind, "map");
    const map = reflectMap(field, record);
    for (const key of ["__proto__", "constructor", "entry"]) {
      map.set(key, "first");
      map.set(key, "second");
      assert.deepStrictEqual(Object.getOwnPropertyDescriptor(record, key), {
        value: "second",
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    assert.strictEqual(Object.getPrototypeOf(record), null);
  });
});

void suite("Struct property names", () => {
  const cases = [
    {
      json: true,
      value: create(ValueSchema, { kind: { case: "boolValue", value: true } }),
    },
    {
      json: null,
      value: create(ValueSchema, {
        kind: { case: "nullValue", value: NullValue.NULL_VALUE },
      }),
    },
    {
      json: { marker: "value" },
      value: create(ValueSchema, {
        kind: {
          case: "structValue",
          value: {
            fields: {
              marker: { kind: { case: "stringValue", value: "value" } },
            },
          },
        },
      }),
    },
    {
      json: [true],
      value: create(ValueSchema, {
        kind: {
          case: "listValue",
          value: { values: [{ kind: { case: "boolValue", value: true } }] },
        },
      }),
    },
  ];
  for (const { json, value } of cases) {
    void suite(JSON.stringify(json), () => {
      const input = { ["__proto__"]: json };
      const expected = {
        ...create(StructSchema),
        fields: { ["__proto__"]: value },
      };
      test("fromJson", () => {
        const actual = fromJson(StructSchema, input);
        assertEntry(actual.fields, "__proto__", value);
        assert.deepStrictEqual(actual, expected);
      });
      test("toJson", () => {
        const actual = toJson(StructSchema, expected);
        assertEntry(actual, "__proto__", json);
        assert.deepStrictEqual(actual, input);
      });
      test("local to reflected Struct", () => {
        const message = create(Proto3MessageSchema, {
          singularStructField: input,
        });
        const field = Proto3MessageSchema.field.singularStructField;
        assert.strictEqual(field.fieldKind, "message");
        const child = reflect(Proto3MessageSchema, message).get(field);
        assert.deepStrictEqual(child.message, expected);
      });
      test("reflected Struct to local", () => {
        const message = create(Proto3MessageSchema);
        reflect(Proto3MessageSchema, message).set(
          Proto3MessageSchema.field.singularStructField,
          reflect(StructSchema, expected),
        );
        assert.deepStrictEqual(message.singularStructField, input);
      });
    });
  }
  test("preserves keys in nested Struct and Value conversions", () => {
    const json = JSON.parse(
      '{"__proto__":{"__proto__":[{"__proto__":null}]}}',
    ) as JsonValue;
    for (const schema of [StructSchema, ValueSchema]) {
      const message = fromJson(schema, json);
      assert.deepStrictEqual(toJson(schema, message), json);
      assert.deepStrictEqual(
        toJson(schema, fromBinary(schema, toBinary(schema, message))),
        json,
      );
    }
  });
});

void suite("JSON field property names", async () => {
  const cases: { declaration: string; json: JsonValue }[] = [
    { declaration: "string value = 1", json: "value" },
    { declaration: "bool value = 1", json: true },
    { declaration: "bytes value = 1", json: "AQI=" },
    { declaration: "int32 value = 1", json: 1 },
    { declaration: "double value = 1", json: 1.5 },
    { declaration: "int64 value = 1", json: "1" },
    { declaration: "Choice value = 1", json: "YES" },
    { declaration: "optional string value = 1", json: "" },
    { declaration: "Child value = 1", json: { marker: "value" } },
    { declaration: "repeated string value = 1", json: ["value"] },
    { declaration: "map<string, string> value = 1", json: { marker: "value" } },
  ];
  for (const { declaration, json } of cases) {
    const schema = await compileMessage(`
      syntax = "proto3";
      message Named {
        ${declaration} [json_name = "__proto__"];
        message Child { string marker = 1; }
        enum Choice { NO = 0; YES = 1; }
      }
    `);
    test(declaration, () => {
      const input = { ["__proto__"]: json };
      const actual = toJson(schema, fromJson(schema, input));
      assertEntry(actual as object, "__proto__", json);
      assert.deepStrictEqual(actual, input);
    });
    test(`Any: ${declaration}`, () => {
      const registry = createRegistry(schema);
      const input = { ["__proto__"]: json };
      const message = fromJson(
        AnySchema,
        {
          "@type": `type.googleapis.com/${schema.typeName}`,
          ["__proto__"]: json,
        },
        { registry },
      );
      assert.deepStrictEqual(
        anyUnpack(message, schema),
        fromJson(schema, input),
      );
    });
  }
  test("oneof field", async () => {
    const schema = await compileMessage(`
      syntax = "proto3";
      message Named {
        oneof selection { string value = 1 [json_name = "__proto__"]; }
      }
    `);
    const input = { ["__proto__"]: "value" };
    assert.deepStrictEqual(toJson(schema, fromJson(schema, input)), input);
  });
  test("original proto field name", async () => {
    const schema = await compileMessage(`
      syntax = "proto3";
      message Named { string __proto__ = 1; }
    `);
    const input = { ["__proto__"]: "value" };
    assert.deepStrictEqual(
      toJson(schema, fromJson(schema, input), { useProtoFieldName: true }),
      input,
    );
  });
  test("field named __proto__ keeps its JSON name Proto", async () => {
    const schema = await compileMessage(`
      syntax = "proto3";
      message Named { string __proto__ = 1; }
    `);
    const input = { Proto: "value" };
    assert.deepStrictEqual(toJson(schema, fromJson(schema, input)), input);
  });
  test("Any does not discard unknown __proto__ fields", () => {
    assert.throws(() =>
      fromJson(
        AnySchema,
        {
          "@type": `type.googleapis.com/${MapsMessageSchema.typeName}`,
          ["__proto__"]: {},
        },
        { registry: createRegistry(MapsMessageSchema) },
      ),
    );
  });
});
