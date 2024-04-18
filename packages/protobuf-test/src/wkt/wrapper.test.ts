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
import { create } from "@bufbuild/protobuf";
import { isWrapper, isWrapperDesc } from "@bufbuild/protobuf/wkt";
import {
  DoubleValueDesc,
  BoolValueDesc,
  BytesValueDesc,
  FloatValueDesc,
  Int32ValueDesc,
  Int64ValueDesc,
  StringValueDesc,
  UInt32ValueDesc,
  UInt64ValueDesc,
} from "@bufbuild/protobuf/wkt";

describe("isWrapper()", () => {
  test("returns true for any of the wrapper messages from wrappers.proto", () => {
    expect(isWrapper(create(DoubleValueDesc))).toBe(true);
    expect(isWrapper(create(FloatValueDesc))).toBe(true);
    expect(isWrapper(create(Int64ValueDesc))).toBe(true);
    expect(isWrapper(create(UInt64ValueDesc))).toBe(true);
    expect(isWrapper(create(Int32ValueDesc))).toBe(true);
    expect(isWrapper(create(UInt32ValueDesc))).toBe(true);
    expect(isWrapper(create(BoolValueDesc))).toBe(true);
    expect(isWrapper(create(StringValueDesc))).toBe(true);
    expect(isWrapper(create(BytesValueDesc))).toBe(true);
  });
});

describe("isWrapperDesc()", () => {
  test("returns true for any of the wrapper messages from wrappers.proto", () => {
    expect(isWrapperDesc(DoubleValueDesc)).toBe(true);
    expect(isWrapperDesc(FloatValueDesc)).toBe(true);
    expect(isWrapperDesc(Int64ValueDesc)).toBe(true);
    expect(isWrapperDesc(UInt64ValueDesc)).toBe(true);
    expect(isWrapperDesc(Int32ValueDesc)).toBe(true);
    expect(isWrapperDesc(UInt32ValueDesc)).toBe(true);
    expect(isWrapperDesc(BoolValueDesc)).toBe(true);
    expect(isWrapperDesc(StringValueDesc)).toBe(true);
    expect(isWrapperDesc(BytesValueDesc)).toBe(true);
  });
});
