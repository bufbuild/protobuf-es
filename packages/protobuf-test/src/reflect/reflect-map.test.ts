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
  isReflectMap,
  reflectMap,
  reflect,
  isReflectMessage,
} from "@bufbuild/protobuf/reflect";
import { create, protoInt64 } from "@bufbuild/protobuf";
import { catchFieldError } from "../helpers.js";
import { StructSchema } from "@bufbuild/protobuf/wkt";
import { UserSchema } from "../gen/ts/extra/example_pb.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pb.js";

void suite("reflectMap()", () => {
  test("creates ReflectMap", () => {
    const f = proto3_ts.Proto3MessageSchema.field.mapStringStringField;
    assert.strictEqual(f.fieldKind, "map");
    const map = reflectMap(f);
    assert.strictEqual(typeof map.field, "function");
    assert.strictEqual(isReflectMap(map), true);
  });
  test("creates ReflectMap with unsafe input", () => {
    const f = proto3_ts.Proto3MessageSchema.field.mapStringStringField;
    assert.strictEqual(f.fieldKind, "map");
    const map = reflectMap(f, { x: 123 });
    assert.strictEqual(typeof map.field, "function");
    assert.strictEqual(isReflectMap(map), true);
  });
});

void suite("ReflectMap", () => {
  const {
    mapStringStringField,
    mapInt64Int64Field,
    mapInt32Int32Field,
    mapInt32MessageField,
    mapInt32StructField,
  } = proto3_ts.Proto3MessageSchema.field;
  assert.strictEqual(mapStringStringField.fieldKind, "map");
  assert.strictEqual(mapInt64Int64Field.fieldKind, "map");
  assert.strictEqual(mapInt32Int32Field.fieldKind, "map");
  assert.strictEqual(mapInt32MessageField.fieldKind, "map");
  assert.strictEqual(mapInt32StructField.fieldKind, "map");
  const n1 = protoInt64.parse(1);
  const n2 = protoInt64.parse(2);
  const n3 = protoInt64.parse(3);
  const n11 = protoInt64.parse(11);
  const n22 = protoInt64.parse(22);
  const n33 = protoInt64.parse(33);
  void suite("field()", () => {
    test("returns the field", () => {
      const map = reflectMap(mapStringStringField, {});
      assert.strictEqual(map.field(), mapStringStringField);
    });
  });
  void suite("size", () => {
    test("returns size of the map", () => {
      const a = reflectMap(mapStringStringField, {});
      assert.strictEqual(a.size, 0);
      const b = reflectMap(mapStringStringField, { a: "A", b: "B" });
      assert.strictEqual(b.size, 2);
    });
  });
  void suite("has()", () => {
    test("returns true for known key, false for unknown", () => {
      const map = reflectMap(mapStringStringField, { a: "A", b: "B" });
      assert.strictEqual(map.has("a"), true);
      assert.strictEqual(map.has("c"), false);
    });
    test("converts key", () => {
      const map = reflectMap(mapInt64Int64Field, { "1": n11 });
      assert.strictEqual(map.has(n1), true);
      assert.strictEqual(map.has("1"), true);
    });
  });
  void suite("get()", () => {
    test("returns value for key, or undefined", () => {
      const map = reflectMap(mapStringStringField, { a: "A", b: "B" });
      assert.strictEqual(map.get("a"), "A");
      assert.strictEqual(map.get("c"), undefined);
    });
    test("converts key", () => {
      const map = reflectMap(mapInt64Int64Field, { "1": n11 });
      assert.ok(map.get(n1) !== undefined);
    });
    test("returns ReflectMessage for message map", () => {
      const map = reflectMap(mapInt32MessageField, {
        a: create(proto3_ts.Proto3MessageSchema),
      });
      const val = map.get("a");
      assert.strictEqual(isReflectMessage(val), true);
    });
    test("returns ReflectMessage for google.protobuf.Struct map", () => {
      const map = reflectMap(mapInt32StructField, {
        123: { shouldBeJson: true },
      });
      const val = map.get(123);
      assert.strictEqual(isReflectMessage(val), true);
    });
  });
  void suite("keys()", () => {
    test("returns iterable keys", () => {
      const keys = reflectMap(mapStringStringField, { a: "A", b: "B" }).keys();
      assert.deepStrictEqual(Array.from(keys), ["a", "b"]);
    });
    test("converts keys", () => {
      const keys = reflectMap(mapInt64Int64Field, {
        "1": n11,
        "2": n22,
      }).keys();
      assert.deepStrictEqual(Array.from(keys), [n1, n2]);
    });
  });
  void suite("values()", () => {
    test("returns iterable values", () => {
      const values = reflectMap(mapStringStringField, {
        a: "A",
        b: "B",
      }).values();
      assert.deepStrictEqual(Array.from(values), ["A", "B"]);
    });
  });
  void suite("entries() and iterator", () => {
    const stringMap = reflectMap(mapStringStringField, { a: "A", b: "B" });
    const longMap = reflectMap(mapInt64Int64Field, {
      "1": n11,
      "2": n22,
    });
    test("returns iterable entries", () => {
      const want = [
        ["a", "A"],
        ["b", "B"],
      ];
      assert.deepStrictEqual(Array.from(stringMap), want);
      assert.deepStrictEqual(Array.from(stringMap.entries()), want);
    });
    test("converts keys", () => {
      const want = [
        [n1, n11],
        [n2, n22],
      ];
      assert.deepStrictEqual(Array.from(longMap), want);
      assert.deepStrictEqual(Array.from(longMap.entries()), want);
    });
  });
  void suite("forEach()", () => {
    test("returns iterable entries", () => {
      const map = reflectMap(mapStringStringField, { a: "A", b: "B" });
      const seenValues: unknown[] = [];
      const seenKeys: unknown[] = [];
      map.forEach((value, key, map) => {
        assert.strictEqual(map, map);
        seenValues.push(value);
        seenKeys.push(key);
      });
      assert.deepStrictEqual(seenKeys, ["a", "b"]);
      assert.deepStrictEqual(seenValues, ["A", "B"]);
    });
  });
  void suite("set()", () => {
    test("sets entry", () => {
      const local = {};
      const map = reflectMap(mapStringStringField, local);
      map.set("a", "A");
      assert.deepStrictEqual(local, { a: "A" });
    });
    test("converts key", () => {
      const local = {};
      const map = reflectMap(mapInt64Int64Field, local);
      map.set(1, n11);
      map.set(n2, n22);
      map.set("3", n33);
      assert.deepStrictEqual(local, {
        "1": n11,
        "2": n22,
        "3": n33,
      });
    });
    test("converts long value", () => {
      const local = {};
      const map = reflectMap(mapInt64Int64Field, local);
      map.set(n1, n11);
      map.set(n2, n22);
      map.set(n3, n33);
      assert.deepStrictEqual(local, {
        "1": n11,
        "2": n22,
        "3": n33,
      });
    });
    test("sets google.protobuf.Struct as JsonObject", () => {
      const local = {};
      const map = reflectMap(mapInt32StructField, local);
      map.set(123, reflect(StructSchema));
      assert.deepStrictEqual(local, {
        123: {},
      });
    });
    test("throws error for invalid key", () => {
      const map = reflectMap(mapInt32Int32Field, {});
      const err = catchFieldError(() => map.set(true, "A"));
      assert.ok(err !== undefined);
      assert.match(
        err.message,
        /^invalid map key: expected number \(int32\), got true$/,
      );
    });
    test("throws error for invalid scalar value", () => {
      const map = reflectMap(mapStringStringField, {});
      const err = catchFieldError(() => map.set("a", true));
      assert.ok(err !== undefined);
      assert.match(err.message, /^map entry "a": expected string, got true$/);
    });
    test("throws error for wrong message type", () => {
      const map = reflectMap(mapInt32MessageField, {});
      const err = catchFieldError(() => map.set(1, reflect(UserSchema)));
      assert.ok(err !== undefined);
      assert.match(
        err.message,
        /^map entry 1: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(example.User\)$/,
      );
    });
  });
  void suite("delete()", () => {
    test("deletes entry", () => {
      const local = { a: "A", b: "B" };
      const map = reflectMap(mapStringStringField, local);
      assert.strictEqual(map.delete("a"), true);
      assert.deepStrictEqual(local, { b: "B" });
    });
    test("returns false for unknown key", () => {
      const map = reflectMap(mapStringStringField, {});
      assert.strictEqual(map.delete("a"), false);
    });
    test("converts key", () => {
      const map = reflectMap(mapInt64Int64Field, { "1": n11 });
      assert.strictEqual(map.delete(n1), true);
    });
  });
  void suite("clear()", () => {
    test("removes all entries", () => {
      const local = { a: "A", b: "B" };
      const map = reflectMap(mapStringStringField, local);
      map.clear();
      assert.deepStrictEqual(local, {});
    });
  });
});
