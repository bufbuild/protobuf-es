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
  isScalarZeroValue,
  scalarEquals,
  scalarZeroValue,
  type ScalarValue,
} from "@bufbuild/protobuf/reflect";
import { protoInt64, ScalarType } from "@bufbuild/protobuf";

void suite("isScalarZeroValue()", () => {
  const cases: { type: ScalarType; value: unknown; want: boolean }[] = [
    // Scalars with a single zero value
    { type: ScalarType.BOOL, value: false, want: true },
    { type: ScalarType.BOOL, value: true, want: false },
    { type: ScalarType.STRING, value: "", want: true },
    { type: ScalarType.STRING, value: "a", want: false },
    { type: ScalarType.BYTES, value: new Uint8Array(0), want: true },
    { type: ScalarType.BYTES, value: new Uint8Array([0]), want: false },
    { type: ScalarType.INT32, value: 0, want: true },
    { type: ScalarType.INT32, value: 1, want: false },
    // -0 is distinct from 0 for float and double, but not for integers
    { type: ScalarType.DOUBLE, value: 0, want: true },
    { type: ScalarType.DOUBLE, value: -0, want: false },
    { type: ScalarType.FLOAT, value: -0, want: false },
    { type: ScalarType.INT32, value: -0, want: true },
    { type: ScalarType.INT64, value: -0, want: true },
    // NaN is never a zero value
    { type: ScalarType.DOUBLE, value: NaN, want: false },
    // 64-bit integers accept number, string, and bigint representations
    { type: ScalarType.INT64, value: BigInt(0), want: true },
    { type: ScalarType.INT64, value: "0", want: true },
    { type: ScalarType.UINT64, value: BigInt(0), want: true },
  ];
  for (const { type, value, want } of cases) {
    test(`${ScalarType[type]} ${repr(value)} -> ${want}`, () => {
      assert.strictEqual(isScalarZeroValue(type, value), want);
    });
  }
});

void suite("scalarEquals()", () => {
  const cases: {
    type: ScalarType;
    a: ScalarValue;
    b: ScalarValue;
    want: boolean;
  }[] = [
    // float and double follow IEEE value semantics
    { type: ScalarType.DOUBLE, a: 1, b: 1, want: true },
    { type: ScalarType.DOUBLE, a: 1, b: 2, want: false },
    // -0 equals 0 here, even though isScalarZeroValue treats them differently
    { type: ScalarType.DOUBLE, a: -0, b: 0, want: true },
    // NaN never equals NaN
    { type: ScalarType.DOUBLE, a: NaN, b: NaN, want: false },
    // bytes are compared element-wise, including length
    {
      type: ScalarType.BYTES,
      a: new Uint8Array([1, 2]),
      b: new Uint8Array([1, 2]),
      want: true,
    },
    {
      type: ScalarType.BYTES,
      a: new Uint8Array([1, 2]),
      b: new Uint8Array([1, 3]),
      want: false,
    },
    {
      type: ScalarType.BYTES,
      a: new Uint8Array([1]),
      b: new Uint8Array([1, 2]),
      want: false,
    },
    // 64-bit integers compare number, string, and bigint representations loosely
    { type: ScalarType.INT64, a: BigInt(0), b: "0", want: true },
    { type: ScalarType.INT64, a: BigInt(1), b: "1", want: true },
    { type: ScalarType.INT64, a: BigInt(1), b: "2", want: false },
    // other scalars use strict comparison
    { type: ScalarType.STRING, a: "a", b: "a", want: true },
    { type: ScalarType.STRING, a: "a", b: "b", want: false },
    { type: ScalarType.BOOL, a: true, b: true, want: true },
    { type: ScalarType.BOOL, a: true, b: false, want: false },
  ];
  for (const { type, a, b, want } of cases) {
    test(`${ScalarType[type]} ${repr(a)} == ${repr(b)} -> ${want}`, () => {
      assert.strictEqual(scalarEquals(type, a, b), want);
    });
  }
});

void test("scalarZeroValue()", () => {
  assert.ok(Object.is(scalarZeroValue(ScalarType.DOUBLE, false), 0));
  assert.ok(Object.is(scalarZeroValue(ScalarType.FLOAT, false), 0));
  assert.ok(
    Object.is(scalarZeroValue(ScalarType.INT64, false), protoInt64.zero),
  );
  assert.ok(Object.is(scalarZeroValue(ScalarType.INT64, true), "0"));
});

// Renders a scalar value for use in a subtest name. Distinguishes -0 from 0,
// quotes strings, and marks bigint with an "n" suffix.
function repr(value: unknown): string {
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "string") return JSON.stringify(value);
  if (value instanceof Uint8Array) return `[${Array.from(value).join(",")}]`;
  if (Object.is(value, -0)) return "-0";
  return String(value);
}
