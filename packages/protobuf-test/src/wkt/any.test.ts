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
  AnySchema,
  anyIs,
  anyPack,
  anyUnpack,
  ValueSchema,
} from "@bufbuild/protobuf/wkt";
import type { Value } from "@bufbuild/protobuf/wkt";
import { create, createRegistry } from "@bufbuild/protobuf";

describe("google.protobuf.Any", () => {
  test(`is correctly identifies by message and type name`, () => {
    const val = create(ValueSchema, {
      kind: { case: "numberValue", value: 1 },
    });
    const any = anyPack(ValueSchema, val);

    expect(anyIs(any, ValueSchema)).toBe(true);
    expect(anyIs(any, ValueSchema.typeName)).toBe(true);

    // The typeUrl set in the Any doesn't have to start with a URL prefix
    expect(anyIs(any, "type.googleapis.com/google.protobuf.Value")).toBe(false);
  });

  test(`matches type name with leading slash`, () => {
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value" });
    expect(anyIs(any, ValueSchema)).toBe(true);
  });

  test(`is returns false for an empty Any`, () => {
    const any = create(AnySchema);

    expect(anyIs(any, ValueSchema)).toBe(false);
    expect(anyIs(any, "google.protobuf.Value")).toBe(false);
    expect(anyIs(any, "")).toBe(false);
  });

  test(`unpack correctly unpacks a message in the registry`, () => {
    const typeRegistry = createRegistry(ValueSchema);
    const val = create(ValueSchema, {
      kind: { case: "numberValue", value: 1 },
    });
    const any = anyPack(ValueSchema, val);

    const unpacked = anyUnpack(any, typeRegistry) as Value;

    expect(unpacked).toBeDefined();
    expect(unpacked.kind.case).toBe("numberValue");
    expect(unpacked.kind.value).toBe(1);
  });

  test(`unpack correctly unpacks a message with a leading slash type url in the registry`, () => {
    const typeRegistry = createRegistry(ValueSchema);
    const val = create(ValueSchema, {
      kind: { case: "numberValue", value: 1 },
    });
    const { value } = anyPack(ValueSchema, val);
    const any = create(AnySchema, { typeUrl: "/google.protobuf.Value", value });

    const unpacked = anyUnpack(any, typeRegistry) as Value;

    expect(unpacked).toBeDefined();
    expect(unpacked.kind.case).toBe("numberValue");
    expect(unpacked.kind.value).toBe(1);
  });

  test(`unpack returns undefined if message not in the registry`, () => {
    const typeRegistry = createRegistry();
    const val = create(ValueSchema, {
      kind: { case: "numberValue", value: 1 },
    });
    const any = anyPack(ValueSchema, val);
    const unpacked = anyUnpack(any, typeRegistry);
    expect(unpacked).toBeUndefined();
  });

  test(`unpack returns undefined with an empty Any`, () => {
    const typeRegistry = createRegistry(ValueSchema);
    const any = create(AnySchema);
    const unpacked = anyUnpack(any, typeRegistry);
    expect(unpacked).toBeUndefined();
  });
});
