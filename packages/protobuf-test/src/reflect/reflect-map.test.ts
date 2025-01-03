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
import {
  isReflectMap,
  reflectMap,
  reflect,
  isReflectMessage,
} from "@bufbuild/protobuf/reflect";
import { create, protoInt64 } from "@bufbuild/protobuf";
import assert from "node:assert";
import { catchFieldError } from "../helpers.js";
import { StructSchema } from "@bufbuild/protobuf/wkt";
import { UserSchema } from "../gen/ts/extra/example_pb.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pb.js";

describe("reflectMap()", () => {
  test("creates ReflectMap", () => {
    const f = proto3_ts.Proto3MessageSchema.field.mapStringStringField;
    assert(f.fieldKind == "map");
    const map = reflectMap(f);
    expect(typeof map.field).toBe("function");
    expect(isReflectMap(map)).toBe(true);
  });
  test("creates ReflectMap with unsafe input", () => {
    const f = proto3_ts.Proto3MessageSchema.field.mapStringStringField;
    assert(f.fieldKind == "map");
    const map = reflectMap(f, { x: 123 });
    expect(typeof map.field).toBe("function");
    expect(isReflectMap(map)).toBe(true);
  });
});

describe("ReflectMap", () => {
  const {
    mapStringStringField,
    mapInt64Int64Field,
    mapInt32Int32Field,
    mapInt32MessageField,
    mapInt32StructField,
  } = proto3_ts.Proto3MessageSchema.field;
  assert(mapStringStringField.fieldKind == "map");
  assert(mapInt64Int64Field.fieldKind == "map");
  assert(mapInt32Int32Field.fieldKind == "map");
  assert(mapInt32MessageField.fieldKind == "map");
  assert(mapInt32StructField.fieldKind == "map");
  const n1 = protoInt64.parse(1);
  const n2 = protoInt64.parse(2);
  const n3 = protoInt64.parse(3);
  const n11 = protoInt64.parse(11);
  const n22 = protoInt64.parse(22);
  const n33 = protoInt64.parse(33);
  describe("field()", () => {
    test("returns the field", () => {
      const map = reflectMap(mapStringStringField, {});
      expect(map.field()).toBe(mapStringStringField);
    });
  });
  describe("size", () => {
    test("returns size of the map", () => {
      const a = reflectMap(mapStringStringField, {});
      expect(a.size).toBe(0);
      const b = reflectMap(mapStringStringField, { a: "A", b: "B" });
      expect(b.size).toBe(2);
    });
  });
  describe("has()", () => {
    test("returns true for known key, false for unknown", () => {
      const map = reflectMap(mapStringStringField, { a: "A", b: "B" });
      expect(map.has("a")).toBe(true);
      expect(map.has("c")).toBe(false);
    });
    test("converts key", () => {
      const map = reflectMap(mapInt64Int64Field, { "1": n11 });
      expect(map.has(n1)).toBe(true);
      expect(map.has("1")).toBe(true);
    });
  });
  describe("get()", () => {
    test("returns value for key, or undefined", () => {
      const map = reflectMap(mapStringStringField, { a: "A", b: "B" });
      expect(map.get("a")).toBe("A");
      expect(map.get("c")).toBeUndefined();
    });
    test("converts key", () => {
      const map = reflectMap(mapInt64Int64Field, { "1": n11 });
      expect(map.get(n1)).toBeDefined();
    });
    test("returns ReflectMessage for message map", () => {
      const map = reflectMap(mapInt32MessageField, {
        a: create(proto3_ts.Proto3MessageSchema),
      });
      const val = map.get("a");
      expect(isReflectMessage(val)).toBe(true);
    });
    test("returns ReflectMessage for google.protobuf.Struct map", () => {
      const map = reflectMap(mapInt32StructField, {
        123: { shouldBeJson: true },
      });
      const val = map.get(123);
      expect(isReflectMessage(val)).toBe(true);
    });
  });
  describe("keys()", () => {
    test("returns iterable keys", () => {
      const keys = reflectMap(mapStringStringField, { a: "A", b: "B" }).keys();
      expect(Array.from(keys)).toStrictEqual(["a", "b"]);
    });
    test("converts keys", () => {
      const keys = reflectMap(mapInt64Int64Field, {
        "1": n11,
        "2": n22,
      }).keys();
      expect(Array.from(keys)).toStrictEqual([n1, n2]);
    });
  });
  describe("values()", () => {
    test("returns iterable values", () => {
      const values = reflectMap(mapStringStringField, {
        a: "A",
        b: "B",
      }).values();
      expect(Array.from(values)).toStrictEqual(["A", "B"]);
    });
  });
  describe("entries() and iterator", () => {
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
      expect(Array.from(stringMap)).toStrictEqual(want);
      expect(Array.from(stringMap.entries())).toStrictEqual(want);
    });
    test("converts keys", () => {
      const want = [
        [n1, n11],
        [n2, n22],
      ];
      expect(Array.from(longMap)).toStrictEqual(want);
      expect(Array.from(longMap.entries())).toStrictEqual(want);
    });
  });
  describe("forEach()", () => {
    test("returns iterable entries", () => {
      const map = reflectMap(mapStringStringField, { a: "A", b: "B" });
      const seenValues: unknown[] = [];
      const seenKeys: unknown[] = [];
      map.forEach((value, key, map) => {
        expect(map).toBe(map);
        seenValues.push(value);
        seenKeys.push(key);
      });
      expect(seenKeys).toStrictEqual(["a", "b"]);
      expect(seenValues).toStrictEqual(["A", "B"]);
    });
  });
  describe("set()", () => {
    test("sets entry", () => {
      const local = {};
      const map = reflectMap(mapStringStringField, local);
      map.set("a", "A");
      expect(local).toStrictEqual({ a: "A" });
    });
    test("converts key", () => {
      const local = {};
      const map = reflectMap(mapInt64Int64Field, local);
      map.set(1, n11);
      map.set(n2, n22);
      map.set("3", n33);
      expect(local).toStrictEqual({
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
      expect(local).toStrictEqual({
        "1": n11,
        "2": n22,
        "3": n33,
      });
    });
    test("sets google.protobuf.Struct as JsonObject", () => {
      const local = {};
      const map = reflectMap(mapInt32StructField, local);
      map.set(123, reflect(StructSchema));
      expect(local).toStrictEqual({
        123: {},
      });
    });
    test("throws error for invalid key", () => {
      const map = reflectMap(mapInt32Int32Field, {});
      const err = catchFieldError(() => map.set(true, "A"));
      expect(err?.message).toMatch(
        /^invalid map key: expected number \(int32\), got true$/,
      );
    });
    test("throws error for invalid scalar value", () => {
      const map = reflectMap(mapStringStringField, {});
      const err = catchFieldError(() => map.set("a", true));
      expect(err?.message).toMatch(
        /^map entry "a": expected string, got true$/,
      );
    });
    test("throws error for wrong message type", () => {
      const map = reflectMap(mapInt32MessageField, {});
      const err = catchFieldError(() => map.set(1, reflect(UserSchema)));
      expect(err?.message).toMatch(
        /^map entry 1: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(example.User\)$/,
      );
    });
  });
  describe("delete()", () => {
    test("deletes entry", () => {
      const local = { a: "A", b: "B" };
      const map = reflectMap(mapStringStringField, local);
      expect(map.delete("a")).toBe(true);
      expect(local).toStrictEqual({ b: "B" });
    });
    test("returns false for unknown key", () => {
      const map = reflectMap(mapStringStringField, {});
      expect(map.delete("a")).toBe(false);
    });
    test("converts key", () => {
      const map = reflectMap(mapInt64Int64Field, { "1": n11 });
      expect(map.delete(n1)).toBe(true);
    });
  });
  describe("clear()", () => {
    test("removes all entries", () => {
      const local = { a: "A", b: "B" };
      const map = reflectMap(mapStringStringField, local);
      map.clear();
      expect(local).toStrictEqual({});
    });
  });
});
