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

import { suite, test } from "node:test";
import * as assert from "node:assert";
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

void suite("isWrapper()", () => {
  void test("returns true for any of the wrapper messages from wrappers.proto", () => {
    assert.strictEqual(isWrapper(create(DoubleValueSchema)), true);
    assert.strictEqual(isWrapper(create(FloatValueSchema)), true);
    assert.strictEqual(isWrapper(create(Int64ValueSchema)), true);
    assert.strictEqual(isWrapper(create(UInt64ValueSchema)), true);
    assert.strictEqual(isWrapper(create(Int32ValueSchema)), true);
    assert.strictEqual(isWrapper(create(UInt32ValueSchema)), true);
    assert.strictEqual(isWrapper(create(BoolValueSchema)), true);
    assert.strictEqual(isWrapper(create(StringValueSchema)), true);
    assert.strictEqual(isWrapper(create(BytesValueSchema)), true);
  });
});

void suite("isWrapperDesc()", () => {
  void test("returns true for any of the wrapper messages from wrappers.proto", () => {
    assert.strictEqual(isWrapperDesc(DoubleValueSchema), true);
    assert.strictEqual(isWrapperDesc(FloatValueSchema), true);
    assert.strictEqual(isWrapperDesc(Int64ValueSchema), true);
    assert.strictEqual(isWrapperDesc(UInt64ValueSchema), true);
    assert.strictEqual(isWrapperDesc(Int32ValueSchema), true);
    assert.strictEqual(isWrapperDesc(UInt32ValueSchema), true);
    assert.strictEqual(isWrapperDesc(BoolValueSchema), true);
    assert.strictEqual(isWrapperDesc(StringValueSchema), true);
    assert.strictEqual(isWrapperDesc(BytesValueSchema), true);
  });
});
