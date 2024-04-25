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

import { describe, expect, test } from "@jest/globals";
import { getFieldByLocalName } from "../helpers.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pb.js";
import {
  isReflectMap,
  reflectMap,
  reflect,
  isReflectMessage,
} from "@bufbuild/protobuf/reflect";
import { protoInt64 } from "@bufbuild/protobuf";
import { UserDesc } from "../gen/ts/extra/example_pb.js";
import { create } from "@bufbuild/protobuf";

describe("reflectMap()", () => {
  test("creates ReflectMap", () => {
    const mapStringStringField = getFieldByLocalName(
      proto3_ts.Proto3MessageDesc,
      "mapStringStringField",
      "map",
    );
    const map = reflectMap(mapStringStringField);
    expect(typeof map.field).toBe("function");
    expect(isReflectMap(map)).toBe(true);
  });
  test("creates ReflectMap with unsafe input", () => {
    const mapStringStringField = getFieldByLocalName(
      proto3_ts.Proto3MessageDesc,
      "mapStringStringField",
      "map",
    );
    const map = reflectMap(mapStringStringField, { x: 123 });
    expect(typeof map.field).toBe("function");
    expect(isReflectMap(map)).toBe(true);
  });
});

describe("ReflectMap", () => {
  const mapStringStringField = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "mapStringStringField",
    "map",
  );
  const mapInt64Int64Field = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "mapInt64Int64Field",
    "map",
  );
  const mapInt32Int32Field = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "mapInt32Int32Field",
    "map",
  );
  const mapInt32MessageField = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "mapInt32MessageField",
    "map",
  );
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
        a: create(proto3_ts.Proto3MessageDesc),
      });
      const val = map.get("a");
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
      expect(map.set("a", "A")).toBeUndefined();
      expect(local).toStrictEqual({ a: "A" });
    });
    test("converts key", () => {
      const local = {};
      const map = reflectMap(mapInt64Int64Field, local);
      expect(map.set(1, n11)).toBeUndefined();
      expect(map.set(n2, n22)).toBeUndefined();
      expect(map.set("3", n33)).toBeUndefined();
      expect(local).toStrictEqual({
        "1": n11,
        "2": n22,
        "3": n33,
      });
    });
    test("converts long value", () => {
      const local = {};
      const map = reflectMap(mapInt64Int64Field, local);
      expect(map.set(n1, n11)).toBeUndefined();
      expect(map.set(n2, 22)).toBeUndefined();
      expect(map.set(n3, "33")).toBeUndefined();
      expect(local).toStrictEqual({
        "1": n11,
        "2": n22,
        "3": n33,
      });
    });
    test("returns error for invalid key", () => {
      const map = reflectMap(mapInt32Int32Field, {});
      const err = map.set(true, "A");
      expect(err?.message).toMatch(
        /^invalid map key: expected number \(int32\), got true$/,
      );
    });
    test("returns error for invalid scalar value", () => {
      const map = reflectMap(mapStringStringField, {});
      const err = map.set("a", true);
      expect(err?.message).toMatch(
        /^map entry "a": expected string, got true$/,
      );
    });
    test("returns error for wrong message type", () => {
      const map = reflectMap(mapInt32MessageField, {});
      const err = map.set(1, reflect(UserDesc));
      expect(err?.message).toMatch(
        /^map entry 1: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(docs.User\)$/,
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
