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
  isReflectMessage,
} from "@bufbuild/protobuf/reflect";
import * as proto3_ts from "../gen/ts/extra/proto3_pb.js";
import { create, protoInt64 } from "@bufbuild/protobuf";
import { UserSchema } from "../gen/ts/extra/example_pb.js";
import assert from "node:assert";
import { catchFieldError } from "../helpers.js";

describe("reflectList()", () => {
  test("creates ReflectList", () => {
    const f = proto3_ts.Proto3MessageSchema.field.repeatedStringField;
    assert(f.fieldKind == "list");
    const list = reflectList(f);
    expect(typeof list.field).toBe("function");
    expect(isReflectList(list)).toBe(true);
  });
  test("creates ReflectList with unsafe input", () => {
    const f = proto3_ts.Proto3MessageSchema.field.repeatedStringField;
    assert(f.fieldKind == "list");
    const list = reflectList(f, [1, 2, 3]);
    expect(isReflectList(list)).toBe(true);
  });
});

describe("ReflectList", () => {
  const {
    repeatedStringField,
    repeatedInt64Field,
    repeatedInt64JsStringField,
    repeatedMessageField,
  } = proto3_ts.Proto3MessageSchema.field;
  assert(repeatedStringField.fieldKind == "list");
  assert(repeatedInt64Field.fieldKind == "list");
  assert(repeatedInt64JsStringField.fieldKind == "list");
  assert(repeatedMessageField.fieldKind == "list");
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
    test("returns ReflectMessage for message list", () => {
      const list = reflectList(repeatedMessageField, [
        create(proto3_ts.Proto3MessageSchema),
      ]);
      const val = list.get(0);
      expect(isReflectMessage(val)).toBe(true);
    });
  });
  describe("add()", () => {
    test("adds item", () => {
      const local: unknown[] = ["a"];
      const list = reflectList(repeatedStringField, local);
      list.add("b");
      list.add("c");
      expect(local).toStrictEqual(["a", "b", "c"]);
    });
    test("converts number, string, bigint to bigint for 64-bit integer field", () => {
      const local: unknown[] = [];
      const list = reflectList(repeatedInt64Field, local);
      list.add(1);
      list.add("2");
      list.add(n3);
      expect(local).toStrictEqual([n1, n2, n3]);
    });
    test("converts number, string, bigint to string for 64-bit integer field with jstype=JS_STRING", () => {
      const local: unknown[] = [];
      const list = reflectList(repeatedInt64JsStringField, local);
      list.add(1);
      list.add("2");
      list.add(n3);
      expect(local).toStrictEqual(["1", "2", "3"]);
    });
    test("throws error for wrong message type", () => {
      const list = reflectList(repeatedMessageField, []);
      const err = catchFieldError(() => list.add(reflect(UserSchema)));
      expect(err?.message).toMatch(
        /^list item #1: expected ReflectMessage \(spec.Proto3Message\), got ReflectMessage \(docs.User\)$/,
      );
    });
    test("throws error for invalid scalar", () => {
      const list = reflectList(repeatedStringField, []);
      const err = catchFieldError(() => list.add(true));
      expect(err?.message).toMatch(/^list item #1: expected string, got true$/);
    });
  });
  describe("set()", () => {
    test("replaces item at index", () => {
      const local: unknown[] = ["a", "b"];
      const list = reflectList(repeatedStringField, local);
      list.set(0, "c");
      expect(local).toStrictEqual(["c", "b"]);
    });
    test("converts number, string, bigint to bigint for 64-bit integer field", () => {
      const local: unknown[] = [n0, n0, n0];
      const list = reflectList(repeatedInt64Field, local);
      list.set(0, 1);
      list.set(1, "2");
      list.set(2, n3);
      expect(local).toStrictEqual([n1, n2, n3]);
    });
    test("converts number, string, bigint to string for 64-bit integer field with jstype=JS_STRING", () => {
      const local: unknown[] = ["0", "0", "0"];
      const list = reflectList(repeatedInt64JsStringField, local);
      list.set(0, 1);
      list.set(1, "2");
      list.set(2, n3);
      expect(local).toStrictEqual(["1", "2", "3"]);
    });
    test("throws error if out of range", () => {
      const list = reflectList(repeatedStringField, []);
      const err = catchFieldError(() => list.set(0, "abc"));
      expect(err?.message).toMatch(/^list item #1: out of range$/);
    });
    test("throws error for invalid scalar", () => {
      const list = reflectList(repeatedStringField, [null]);
      const err = catchFieldError(() => list.set(0, true));
      expect(err?.message).toMatch(/^list item #1: expected string, got true$/);
    });
    test("throws error for wrong message type", () => {
      const list = reflectList(repeatedMessageField, [null]);
      const err = catchFieldError(() => list.set(0, reflect(UserSchema)));
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
