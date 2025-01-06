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
import { create } from "@bufbuild/protobuf";
import {
  isWrapper,
  isWrapperDesc,
  DoubleValueSchema,
  BoolValueSchema,
  BytesValueSchema,
  FloatValueSchema,
  Int32ValueSchema,
  Int64ValueSchema,
  StringValueSchema,
  UInt32ValueSchema,
  UInt64ValueSchema,
} from "@bufbuild/protobuf/wkt";

describe("isWrapper()", () => {
  test("returns true for any of the wrapper messages from wrappers.proto", () => {
    expect(isWrapper(create(DoubleValueSchema))).toBe(true);
    expect(isWrapper(create(FloatValueSchema))).toBe(true);
    expect(isWrapper(create(Int64ValueSchema))).toBe(true);
    expect(isWrapper(create(UInt64ValueSchema))).toBe(true);
    expect(isWrapper(create(Int32ValueSchema))).toBe(true);
    expect(isWrapper(create(UInt32ValueSchema))).toBe(true);
    expect(isWrapper(create(BoolValueSchema))).toBe(true);
    expect(isWrapper(create(StringValueSchema))).toBe(true);
    expect(isWrapper(create(BytesValueSchema))).toBe(true);
  });
});

describe("isWrapperDesc()", () => {
  test("returns true for any of the wrapper messages from wrappers.proto", () => {
    expect(isWrapperDesc(DoubleValueSchema)).toBe(true);
    expect(isWrapperDesc(FloatValueSchema)).toBe(true);
    expect(isWrapperDesc(Int64ValueSchema)).toBe(true);
    expect(isWrapperDesc(UInt64ValueSchema)).toBe(true);
    expect(isWrapperDesc(Int32ValueSchema)).toBe(true);
    expect(isWrapperDesc(UInt32ValueSchema)).toBe(true);
    expect(isWrapperDesc(BoolValueSchema)).toBe(true);
    expect(isWrapperDesc(StringValueSchema)).toBe(true);
    expect(isWrapperDesc(BytesValueSchema)).toBe(true);
  });
});
