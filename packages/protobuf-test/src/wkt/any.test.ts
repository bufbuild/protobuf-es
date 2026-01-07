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

import { suite, test } from "node:test";
import * as assert from "node:assert";
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

void suite("anyIs", () => {
  void test(`matches standard type URL`, () => {
    const any = create(AnySchema, {
      typeUrl: "type.googleapis.com/google.protobuf.Value",
    });
    assert.strictEqual(anyIs(any, ValueSchema), true);
  });
  void test(`matches short type URL`, () => {
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value" });
    assert.strictEqual(anyIs(any, ValueSchema), true);
  });
  void test(`matches custom type URL`, () => {
    const any = create(AnySchema, {
      typeUrl: "example.com/google.protobuf.Value",
    });
    assert.strictEqual(anyIs(any, ValueSchema), true);
  });
  void test("accepts type name string", () => {
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value" });
    assert.strictEqual(anyIs(any, "google.protobuf.Value"), true);
    assert.strictEqual(anyIs(any, "google.protobuf.Duration"), false);
  });
  void test("accepts empty type name string", () => {
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value" });
    assert.strictEqual(anyIs(any, ""), false);
    assert.strictEqual(anyIs(create(AnySchema), ""), false);
  });
  void test("returns false for an empty Any", () => {
    const any = create(AnySchema);
    assert.strictEqual(anyIs(any, ValueSchema), false);
    assert.strictEqual(anyIs(any, "google.protobuf.Value"), false);
    assert.strictEqual(anyIs(any, ""), false);
  });
  void test("returns false for different type", () => {
    const any = create(AnySchema, {
      typeUrl: "type.googleapis.com/google.protobuf.Value",
    });
    assert.strictEqual(anyIs(any, DurationSchema), false);
    assert.strictEqual(anyIs(any, "google.protobuf.Duration"), false);
  });
});

void suite("anyUnpack()", () => {
  void suite("with a schema", () => {
    void test("returns undefined if the Any is empty", () => {
      const any = create(AnySchema, {
        typeUrl: "",
        value: new Uint8Array(),
      });
      const unpacked: FieldMask | undefined = anyUnpack(any, FieldMaskSchema);
      assert.strictEqual(unpacked, undefined);
    });
    void test("returns undefined if the Any contains a different type", () => {
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
      assert.strictEqual(unpacked, undefined);
    });
    void test("returns unpacked", () => {
      const val = create(FieldMaskSchema, {
        paths: ["foo"],
      });
      const any = create(AnySchema, {
        typeUrl: "type.googleapis.com/google.protobuf.FieldMask",
        value: toBinary(FieldMaskSchema, val),
      });
      const unpacked: FieldMask | undefined = anyUnpack(any, FieldMaskSchema);
      assert.ok(unpacked !== undefined);
      assert.deepStrictEqual(unpacked?.paths, ["foo"]);
    });
  });
  void suite("with a registry", () => {
    void test("returns undefined if the Any is empty", () => {
      const any = create(AnySchema);
      const unpacked: Message | undefined = anyUnpack(any, createRegistry());
      assert.strictEqual(unpacked, undefined);
    });
    void test(`returns undefined if message not in the registry`, () => {
      const registry = createRegistry();
      const val = create(ValueSchema, {
        kind: { case: "numberValue", value: 1 },
      });
      const any = anyPack(ValueSchema, val);
      const unpacked = anyUnpack(any, registry);
      assert.strictEqual(unpacked, undefined);
    });
    void test(`returns unpacked`, () => {
      const typeRegistry = createRegistry(ValueSchema);
      const val = create(ValueSchema, {
        kind: { case: "numberValue", value: 1 },
      });
      const any = anyPack(ValueSchema, val);
      const unpacked: Message | undefined = anyUnpack(any, typeRegistry);
      assert.deepStrictEqual(unpacked, val);
    });
  });
});

void suite("anyUnpackTo()", () => {
  void test("returns undefined if the Any is empty", () => {
    const any = create(AnySchema);
    const unpacked: FieldMask | undefined = anyUnpackTo(
      any,
      FieldMaskSchema,
      create(FieldMaskSchema),
    );
    assert.strictEqual(unpacked, undefined);
  });
  void test("returns undefined if the Any contains a different type", () => {
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
    assert.strictEqual(unpacked, undefined);
  });
  void test("returns unpacked", () => {
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
    assert.ok(unpacked !== undefined);
    assert.deepStrictEqual(unpacked?.paths, ["foo"]);
  });
  void test("merges into target", () => {
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
    assert.ok(unpacked !== undefined);
    assert.deepStrictEqual(unpacked?.paths, ["bar", "foo"]);
    assert.deepStrictEqual(target.paths, ["bar", "foo"]);
  });
});
