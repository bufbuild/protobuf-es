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
import {
  isReflectList,
  reflectList,
  reflect,
} from "@bufbuild/protobuf/reflect";
import { getFieldByLocalName } from "../helpers.js";
import * as proto3_ts from "../gen/ts/extra/proto3_pb.js";
import { protoInt64 } from "@bufbuild/protobuf";
import { UserDesc } from "../gen/ts/extra/example_pb.js";

describe("reflectList()", () => {
  test("creates ReflectList", () => {
    const f = getFieldByLocalName(
      proto3_ts.Proto3MessageDesc,
      "repeatedStringField",
      "list",
    );
    const list = reflectList(f);
    expect(typeof list.field).toBe("function");
    expect(isReflectList(list)).toBe(true);
  });
  test("creates ReflectList with unsafe input", () => {
    const f = getFieldByLocalName(
      proto3_ts.Proto3MessageDesc,
      "repeatedStringField",
      "list",
    );
    const list = reflectList(f, [1, 2, 3]);
    expect(isReflectList(list)).toBe(true);
  });
});

describe("ReflectList", () => {
  const repeatedStringField = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "repeatedStringField",
    "list",
  );
  const repeatedInt64Field = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "repeatedInt64Field",
    "list",
  );
  const repeatedInt64JsStringField = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "repeatedInt64JsStringField",
    "list",
  );
  const repeatedMessageField = getFieldByLocalName(
    proto3_ts.Proto3MessageDesc,
    "repeatedMessageField",
    "list",
  );
  const n0 = protoInt64.zero;
  const n1 = protoInt64.parse(1);
  const n2 = protoInt64.parse(2);
  const n3 = protoInt64.parse(3);
  describe("field()", () => {
    test("returns the field", () => {
      const list = reflectList(repeatedStringField, []);
      expect(list.field()).toBe(repeatedStringField);
    });
  });
  describe("size", () => {
    test("returns size of the list", () => {
      const a = reflectList(repeatedStringField, []);
      expect(a.size).toBe(0);
      const b = reflectList(repeatedStringField, ["a", "b"]);
      expect(b.size).toBe(2);
    });
  });
  describe("get()", () => {
    test("returns item at index", () => {
      const list = reflectList(repeatedStringField, ["a", "b"]);
      expect(list.get(1)).toBe("b");
    });
    test("returns undefined if out of range", () => {
      const list = reflectList(repeatedStringField, []);
      expect(list.get(0)).toBeUndefined();
    });
    test("converts jstype=JS_STRING to bigint", () => {
      const local: unknown[] = ["1"];
      const list = reflectList(repeatedInt64JsStringField, local);
      expect(list.get(0)).toBe(n1);
    });
  });
  describe("add()", () => {
    test("adds item", () => {
      const local: unknown[] = ["a"];
      const list = reflectList(repeatedStringField, local);
      expect(list.add("b")).toBeUndefined();
      expect(list.add("c")).toBeUndefined();
      expect(local).toStrictEqual(["a", "b", "c"]);
    });
    test("adds items", () => {
      const local: unknown[] = [];
      const list = reflectList(repeatedStringField, local);
      expect(list.add("a", "b", "c")).toBeUndefined();
      expect(local).toStrictEqual(["a", "b", "c"]);
    });
    test("does not add any item if one of several items is invalid", () => {
      const local: unknown[] = [];
      const list = reflectList(repeatedStringField, local);
      expect(list.add("a", "b", true)).toBeDefined();
      expect(local).toStrictEqual([]);
    });
    test("converts number, string, bigint to bigint for 64-bit integer field", () => {
      const local: unknown[] = [];
      const list = reflectList(repeatedInt64Field, local);
      expect(list.add(1)).toBeUndefined();
      expect(list.add("2")).toBeUndefined();
      expect(list.add(n3)).toBeUndefined();
      expect(local).toStrictEqual([n1, n2, n3]);
    });
    test("converts number, string, bigint to string for 64-bit integer field with jstype=JS_STRING", () => {
      const local: unknown[] = [];
      const list = reflectList(repeatedInt64JsStringField, local);
      expect(list.add(1)).toBeUndefined();
      expect(list.add("2")).toBeUndefined();
      expect(list.add(n3)).toBeUndefined();
      expect(local).toStrictEqual(["1", "2", "3"]);
    });
    test("returns error for wrong message type", () => {
      const list = reflectList(repeatedMessageField, []);
      const err = list.add(reflect(UserDesc));
      expect(err?.message).toMatch(
        /^list item #1: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(docs.User\)$/,
      );
    });
    test("returns error for invalid scalar", () => {
      const list = reflectList(repeatedStringField, []);
      const err = list.add(true);
      expect(err?.message).toMatch(/^list item #1: expected string, got true$/);
    });
  });
  describe("set()", () => {
    test("replaces item at index", () => {
      const local: unknown[] = ["a", "b"];
      const list = reflectList(repeatedStringField, local);
      expect(list.set(0, "c")).toBeUndefined();
      expect(local).toStrictEqual(["c", "b"]);
    });
    test("converts number, string, bigint to bigint for 64-bit integer field", () => {
      const local: unknown[] = [n0, n0, n0];
      const list = reflectList(repeatedInt64Field, local);
      expect(list.set(0, 1)).toBeUndefined();
      expect(list.set(1, "2")).toBeUndefined();
      expect(list.set(2, n3)).toBeUndefined();
      expect(local).toStrictEqual([n1, n2, n3]);
    });
    test("converts number, string, bigint to string for 64-bit integer field with jstype=JS_STRING", () => {
      const local: unknown[] = ["0", "0", "0"];
      const list = reflectList(repeatedInt64JsStringField, local);
      expect(list.set(0, 1)).toBeUndefined();
      expect(list.set(1, "2")).toBeUndefined();
      expect(list.set(2, n3)).toBeUndefined();
      expect(local).toStrictEqual(["1", "2", "3"]);
    });
    test("returns error if out of range", () => {
      const list = reflectList(repeatedStringField, []);
      const err = list.set(0, "abc");
      expect(err?.message).toMatch(/^list item #1: out of range$/);
    });
    test("returns error for invalid scalar", () => {
      const list = reflectList(repeatedStringField, [null]);
      const err = list.set(0, true);
      expect(err?.message).toMatch(/^list item #1: expected string, got true$/);
    });
    test("returns error for wrong message type", () => {
      const list = reflectList(repeatedMessageField, [null]);
      const err = list.set(0, reflect(UserDesc));
      expect(err?.message).toMatch(
        /^list item #1: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(docs.User\)$/,
      );
    });
  });
  describe("clear()", () => {
    test("removes all items", () => {
      const local: unknown[] = ["a", "b"];
      const list = reflectList(repeatedStringField, local);
      list.clear();
      expect(local).toStrictEqual([]);
    });
  });
  describe("values()", () => {
    test("returns iterable items", () => {
      const local: unknown[] = ["a", "b"];
      const values = reflectList(repeatedStringField, local).values();
      expect(Array.from(values)).toStrictEqual(["a", "b"]);
    });
  });
  describe("iterator", () => {
    test("returns iterable items", () => {
      const local: unknown[] = ["a", "b"];
      const list = reflectList(repeatedStringField, local);
      expect(Array.from(list)).toStrictEqual(["a", "b"]);
    });
  });
  describe("entries()", () => {
    test("returns iterable tuples", () => {
      const local: unknown[] = ["a", "b"];
      const entries = reflectList(repeatedStringField, local).entries();
      expect(Array.from(entries)).toStrictEqual([
        [0, "a"],
        [1, "b"],
      ]);
    });
  });
  describe("keys()", () => {
    test("returns iterable indices", () => {
      const local: unknown[] = ["a", "b"];
      const keys = reflectList(repeatedStringField, local).keys();
      expect(Array.from(keys)).toStrictEqual([0, 1]);
    });
  });
});
