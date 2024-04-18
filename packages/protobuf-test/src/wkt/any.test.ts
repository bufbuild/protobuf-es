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
  AnyDesc,
  anyIs,
  anyPack,
  anyUnpack,
  ValueDesc,
} from "@bufbuild/protobuf/wkt";
import type { Value } from "@bufbuild/protobuf/wkt";
import { create } from "@bufbuild/protobuf";
import { createRegistry } from "@bufbuild/protobuf/reflect";

describe("google.protobuf.Any", () => {
  test(`is correctly identifies by message and type name`, () => {
    const val = create(ValueDesc, {
      kind: { case: "numberValue", value: 1 },
    });
    const any = anyPack(ValueDesc, val);

    expect(anyIs(any, ValueDesc)).toBe(true);
    expect(anyIs(any, ValueDesc.typeName)).toBe(true);

    // The typeUrl set in the Any doesn't have to start with a URL prefix
    expect(anyIs(any, "type.googleapis.com/google.protobuf.Value")).toBe(false);
  });

  test(`matches type name with leading slash`, () => {
    const any = create(AnyDesc, { typeUrl: "/google.protobuf.Value" });
    expect(anyIs(any, ValueDesc)).toBe(true);
  });

  test(`is returns false for an empty Any`, () => {
    const any = create(AnyDesc);

    expect(anyIs(any, ValueDesc)).toBe(false);
    expect(anyIs(any, "google.protobuf.Value")).toBe(false);
    expect(anyIs(any, "")).toBe(false);
  });

  test(`unpack correctly unpacks a message in the registry`, () => {
    const typeRegistry = createRegistry(ValueDesc);
    const val = create(ValueDesc, {
      kind: { case: "numberValue", value: 1 },
    });
    const any = anyPack(ValueDesc, val);

    const unpacked = anyUnpack(any, typeRegistry) as Value;

    expect(unpacked).toBeDefined();
    expect(unpacked.kind.case).toBe("numberValue");
    expect(unpacked.kind.value).toBe(1);
  });

  test(`unpack correctly unpacks a message with a leading slash type url in the registry`, () => {
    const typeRegistry = createRegistry(ValueDesc);
    const val = create(ValueDesc, {
      kind: { case: "numberValue", value: 1 },
    });
    const { value } = anyPack(ValueDesc, val);
    const any = create(AnyDesc, { typeUrl: "/google.protobuf.Value", value });

    const unpacked = anyUnpack(any, typeRegistry) as Value;

    expect(unpacked).toBeDefined();
    expect(unpacked.kind.case).toBe("numberValue");
    expect(unpacked.kind.value).toBe(1);
  });

  test(`unpack returns undefined if message not in the registry`, () => {
    const typeRegistry = createRegistry();
    const val = create(ValueDesc, {
      kind: { case: "numberValue", value: 1 },
    });
    const any = anyPack(ValueDesc, val);
    const unpacked = anyUnpack(any, typeRegistry);
    expect(unpacked).toBeUndefined();
  });

  test(`unpack returns undefined with an empty Any`, () => {
    const typeRegistry = createRegistry(ValueDesc);
    const any = create(AnyDesc);
    const unpacked = anyUnpack(any, typeRegistry);
    expect(unpacked).toBeUndefined();
  });
});
