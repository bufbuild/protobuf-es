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
import type {
  EnumType,
  Extension,
  FieldInfo,
  Message,
  MessageType,
} from "@bufbuild/protobuf";
import { createRegistryFromDescriptors } from "@bufbuild/protobuf";
import { readFileSync } from "fs";

export function describeExt() {}

/**
 * Runs a describe.each() with three test cases:
 * 1. the TS generated MessageType
 * 2. the JS generated MessageType
 * 3. a dynamic version of the MessageType
 */
export function describeMT<T extends Message<T>>(
  opt: {
    ts: MessageType<T>;
    js: MessageType<T>;
  },
  fn: (type: MessageType<T>) => void,
) {
  const tsDynType = makeMessageTypeDynamic(opt.ts);
  type testCase = { name: string; messageType: MessageType<T> };
  describe.each<testCase>([
    { name: opt.ts.typeName + " (generated ts)", messageType: opt.ts },
    { name: opt.js.typeName + " (generated js)", messageType: opt.js },
    { name: tsDynType.typeName + " (dynamic)", messageType: tsDynType },
  ])("$name", function (testCase: testCase) {
    fn(testCase.messageType);
  });
}

/**
 * Runs a test.each() with three test cases:
 * 1. the TS generated MessageType
 * 2. the JS generated MessageType
 * 3. a dynamic version of the MessageType
 */
export function testMT<T extends Message<T>>(
  opt: {
    ts: MessageType<T>;
    js: MessageType<T>;
  },
  fn: (type: MessageType<T>) => void,
) {
  const tsDynType = makeMessageTypeDynamic(opt.ts);
  type testCase = { name: string; messageType: MessageType<T> };
  test.each<testCase>([
    { name: opt.ts.typeName + " (generated ts)", messageType: opt.ts },
    { name: opt.js.typeName + " (generated js)", messageType: opt.js },
    { name: tsDynType.typeName + " (dynamic)", messageType: tsDynType },
  ])("$name", function (testCase: testCase) {
    fn(testCase.messageType);
  });
}

const dr = createRegistryFromDescriptors(readFileSync("./descriptorset.bin"));

function makeMessageTypeDynamic<T extends Message<T>>(
  type: MessageType<T>,
): MessageType<T> {
  const dyn = dr.findMessage(type.typeName);
  if (!dyn) {
    throw new Error();
  }
  return dyn as MessageType<T>;
}

export function assertExtensionEquals(a: Extension, b: Extension): void {
  expect(a.typeName).toBe(b.typeName);
  expect(a.runtime).toBe(b.runtime);
  assertMessageTypeEquals(a.extendee, b.extendee);
  assertFieldInfoEquals(a.field, b.field);
}

export function assertMessageTypeEquals(a: MessageType, b: MessageType): void {
  expect(a.name).toBe(b.name);
  expect(a.typeName).toBe(b.typeName);
  // We do not surface options at this time
  // expect(a.options).toStrictEqual(b.options);
  expect(!!a.fieldWrapper).toBe(!!b.fieldWrapper);
  expect(a.runtime.syntax).toBe(b.runtime.syntax);
  expect(a.fields.list().length).toBe(b.fields.list().length);
  if (a.fields.list().length > 0 && b.fields.list().length > 0) {
    for (let i = 0; i < a.fields.list().length; i++) {
      const fa = a.fields.list()[i];
      const fb = b.fields.list()[i];
      assertFieldInfoEquals(fa, fb);
    }
  }
}

export function assertEnumTypeEquals(a: EnumType, b: EnumType): void {
  expect(a.typeName).toBe(b.typeName);
  // We do not surface options at this time
  // expect(a.options).toStrictEqual(b.options);
  expect(a.values).toStrictEqual(b.values);
}

export function assertFieldInfoEquals(a: FieldInfo, b: FieldInfo): void {
  expect(a.no).toBe(b.no);
  expect(a.name).toBe(b.name);
  expect(a.localName).toBe(b.localName);
  expect(a.jsonName).toBe(b.jsonName);
  expect(a.repeated).toBe(b.repeated);
  expect(a.packed).toBe(b.packed);
  expect(a.default).toStrictEqual(b.default);
  expect(a.opt).toBe(b.opt);
  // We do not surface options at this time
  // expect(a.options).toStrictEqual(b.options);
  expect(a.kind).toStrictEqual(b.kind);
  if (a.kind === "scalar" && b.kind === "scalar") {
    expect(a.T).toBe(b.T);
  }
  if (a.kind === "message" && b.kind === "message") {
    assertMessageTypeEquals(a.T, b.T);
  }
  if (a.kind === "enum" && b.kind === "enum") {
    assertEnumTypeEquals(a.T, b.T);
  }
  if (a.kind === "map" && b.kind === "map") {
    expect(a.K).toBe(b.K);
    expect(a.V.kind).toBe(b.V.kind);
    if (a.V.kind === "scalar" && b.V.kind === "scalar") {
      expect(a.V.T).toBe(b.V.T);
    }
    if (a.V.kind === "enum" && b.V.kind === "enum") {
      assertEnumTypeEquals(a.V.T, b.V.T);
    }
    if (a.V.kind === "message" && b.V.kind === "message") {
      assertMessageTypeEquals(a.V.T, b.V.T);
    }
  }
}
