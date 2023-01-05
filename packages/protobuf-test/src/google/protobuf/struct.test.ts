// Copyright 2021-2023 Buf Technologies, Inc.
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
import type { JsonObject } from "@bufbuild/protobuf";
import * as TS from "../../gen/ts/google/protobuf/struct_pb.js";
import * as JS from "../../gen/js/google/protobuf/struct_pb.js";

describe("google.protobuf.Struct", () => {
  describe.each([
    { Struct: TS.Struct, name: `(generated ts)` },
    { Struct: JS.Struct, name: `(generated js)` },
  ])("$name", ({ Struct }) => {
    let json: JsonObject;
    let struct: TS.Struct;
    beforeEach(() => {
      json = {
        a: 123,
        b: "abc",
      };
      struct = new Struct({
        fields: {
          a: {
            kind: { case: "numberValue", value: 123 },
          },
          b: {
            kind: { case: "stringValue", value: "abc" },
          },
        },
      });
    });
    test("encodes to JSON", () => {
      const got = struct.toJson();
      expect(got).toStrictEqual(json);
    });
    test("decodes from JSON", () => {
      const got = Struct.fromJson(json);
      expect(Object.keys(got.fields).length).toBe(
        Object.keys(struct.fields).length
      );
      expect(got.fields["a"].kind.case).toBe(struct.fields["a"].kind.case);
      expect(got.fields["a"].kind.value).toBe(struct.fields["a"].kind.value);
      expect(got.fields["b"].kind.case).toBe(struct.fields["b"].kind.case);
      expect(got.fields["b"].kind.value).toBe(struct.fields["b"].kind.value);
    });
    test("survives binary round trip", () => {
      const got = Struct.fromBinary(struct.toBinary());
      expect(got).toStrictEqual(struct);
    });
  });
});

describe("google.protobuf.Value", () => {
  describe.each([
    { Value: TS.Value, name: `(generated ts)` },
    { Value: JS.Value, name: `(generated js)` },
  ])("$name", ({ Value }) => {
    test("encodes to JSON", () => {
      const value = new Value({
        kind: { case: "boolValue", value: true },
      });
      expect(value.toJsonString()).toBe("true");
    });
    test("encoding unset value to JSON raises error", () => {
      // Absence of any variant indicates an error.
      // See struct.proto
      const value = new Value();
      expect(() => value.toJson()).toThrowError(
        "google.protobuf.Value must have a value"
      );
    });
    test("decodes from JSON", () => {
      const value = Value.fromJsonString("true");
      expect(value.kind.case).toBe("boolValue");
      expect(value.kind.value).toBe(true);
    });
    test("survives binary round trip", () => {
      const want = new Value({
        kind: { case: "boolValue", value: true },
      });
      const got = Value.fromBinary(want.toBinary());
      expect(got).toStrictEqual(want);
    });
  });
});

describe("google.protobuf.Value with Struct field", () => {
  describe.each([
    { Value: TS.Value, Struct: TS.Struct, name: `(generated ts)` },
    { Value: JS.Value, Struct: JS.Struct, name: `(generated js)` },
  ])("$name", ({ Value, Struct }) => {
    let json: JsonObject;
    let value: TS.Value;
    beforeEach(() => {
      json = {
        foo: 1,
      };
      value = new Value({
        kind: {
          case: "structValue",
          value: new Struct({
            fields: {
              foo: { kind: { case: "numberValue", value: 1 } },
            },
          }),
        },
      });
    });
    test("encodes to JSON", () => {
      expect(value.toJson()).toStrictEqual(json);
    });
    test("decodes from JSON", () => {
      expect(Value.fromJson(json)).toStrictEqual(value);
    });
    test("survives binary round trip", () => {
      const got = Value.fromBinary(value.toBinary());
      expect(got).toStrictEqual(value);
    });
  });
});
