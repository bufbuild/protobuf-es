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
  create,
  createRegistry,
  type Message,
  toBinary,
} from "@bufbuild/protobuf";
import {
  AnySchema,
  anyIs,
  anyPack,
  anyUnpack,
  ValueSchema,
  type FieldMask,
  anyUnpackTo,
  FieldMaskSchema,
  DurationSchema,
} from "@bufbuild/protobuf/wkt";

describe("anyIs", () => {
  test(`matches standard type URL`, () => {
    const any = create(AnySchema, {
      typeUrl: "type.googleapis.com/google.protobuf.Value",
    });
    expect(anyIs(any, ValueSchema)).toBe(true);
  });
  test(`matches short type URL`, () => {
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value" });
    expect(anyIs(any, ValueSchema)).toBe(true);
  });
  test(`matches custom type URL`, () => {
    const any = create(AnySchema, {
      typeUrl: "example.com/google.protobuf.Value",
    });
    expect(anyIs(any, ValueSchema)).toBe(true);
  });
  test("accepts type name string", () => {
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value" });
    expect(anyIs(any, "google.protobuf.Value")).toBe(true);
    expect(anyIs(any, "google.protobuf.Duration")).toBe(false);
  });
  test("accepts empty type name string", () => {
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value" });
    expect(anyIs(any, "")).toBe(false);
    expect(anyIs(create(AnySchema), "")).toBe(false);
  });
  test("returns false for an empty Any", () => {
    const any = create(AnySchema);
    expect(anyIs(any, ValueSchema)).toBe(false);
    expect(anyIs(any, "google.protobuf.Value")).toBe(false);
    expect(anyIs(any, "")).toBe(false);
  });
  test("returns false for different type", () => {
    const any = create(AnySchema, {
      typeUrl: "type.googleapis.com/google.protobuf.Value",
    });
    expect(anyIs(any, DurationSchema)).toBe(false);
    expect(anyIs(any, "google.protobuf.Duration")).toBe(false);
  });
});

describe("anyUnpack()", () => {
  describe("with a schema", () => {
    test("returns undefined if the Any is empty", () => {
      const any = create(AnySchema, {
        typeUrl: "",
        value: new Uint8Array(),
      });
      const unpacked: FieldMask | undefined = anyUnpack(any, FieldMaskSchema);
      expect(unpacked).toBeUndefined();
    });
    test("returns undefined if the Any contains a different type", () => {
      const any = create(AnySchema, {
        typeUrl: "type.googleapis.com/google.protobuf.Duration",
        value: toBinary(
          DurationSchema,
          create(DurationSchema, {
            seconds: BigInt(100),
          }),
        ),
      });
      const unpacked: FieldMask | undefined = anyUnpack(any, FieldMaskSchema);
      expect(unpacked).toBeUndefined();
    });
    test("returns unpacked", () => {
      const val = create(FieldMaskSchema, {
        paths: ["foo"],
      });
      const any = create(AnySchema, {
        typeUrl: "type.googleapis.com/google.protobuf.FieldMask",
        value: toBinary(FieldMaskSchema, val),
      });
      const unpacked: FieldMask | undefined = anyUnpack(any, FieldMaskSchema);
      expect(unpacked).toBeDefined();
      expect(unpacked?.paths).toStrictEqual(["foo"]);
    });
  });
  describe("with a registry", () => {
    test("returns undefined if the Any is empty", () => {
      const any = create(AnySchema);
      const unpacked: Message | undefined = anyUnpack(any, createRegistry());
      expect(unpacked).toBeUndefined();
    });
    test(`returns undefined if message not in the registry`, () => {
      const registry = createRegistry();
      const val = create(ValueSchema, {
        kind: { case: "numberValue", value: 1 },
      });
      const any = anyPack(ValueSchema, val);
      const unpacked = anyUnpack(any, registry);
      expect(unpacked).toBeUndefined();
    });
    test(`returns unpacked`, () => {
      const typeRegistry = createRegistry(ValueSchema);
      const val = create(ValueSchema, {
        kind: { case: "numberValue", value: 1 },
      });
      const any = anyPack(ValueSchema, val);
      const unpacked: Message | undefined = anyUnpack(any, typeRegistry);
      expect(unpacked).toStrictEqual(val);
    });
  });
});

describe("anyUnpackTo()", () => {
  test("returns undefined if the Any is empty", () => {
    const any = create(AnySchema);
    const unpacked: FieldMask | undefined = anyUnpackTo(
      any,
      FieldMaskSchema,
      create(FieldMaskSchema),
    );
    expect(unpacked).toBeUndefined();
  });
  test("returns undefined if the Any contains a different type", () => {
    const any = create(AnySchema, {
      typeUrl: "type.googleapis.com/google.protobuf.Duration",
      value: toBinary(
        DurationSchema,
        create(DurationSchema, {
          seconds: BigInt(100),
        }),
      ),
    });
    const unpacked: FieldMask | undefined = anyUnpackTo(
      any,
      FieldMaskSchema,
      create(FieldMaskSchema),
    );
    expect(unpacked).toBeUndefined();
  });
  test("returns unpacked", () => {
    const val = create(FieldMaskSchema, {
      paths: ["foo"],
    });
    const any = create(AnySchema, {
      typeUrl: "type.googleapis.com/google.protobuf.FieldMask",
      value: toBinary(FieldMaskSchema, val),
    });
    const unpacked: FieldMask | undefined = anyUnpackTo(
      any,
      FieldMaskSchema,
      create(FieldMaskSchema),
    );
    expect(unpacked).toBeDefined();
    expect(unpacked?.paths).toStrictEqual(["foo"]);
  });
  test("merges into target", () => {
    const val = create(FieldMaskSchema, {
      paths: ["foo"],
    });
    const any = create(AnySchema, {
      typeUrl: "type.googleapis.com/google.protobuf.FieldMask",
      value: toBinary(FieldMaskSchema, val),
    });
    const target = create(FieldMaskSchema, {
      paths: ["bar"],
    });
    const unpacked: FieldMask | undefined = anyUnpackTo(
      any,
      FieldMaskSchema,
      target,
    );
    expect(unpacked).toBeDefined();
    expect(unpacked?.paths).toStrictEqual(["bar", "foo"]);
    expect(target.paths).toStrictEqual(["bar", "foo"]);
  });
});
