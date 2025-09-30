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
import {
  durationFromMs,
  durationMs,
  DurationSchema,
} from "@bufbuild/protobuf/wkt";
import { create, protoInt64 } from "@bufbuild/protobuf";

void suite("durationMs()", () => {
  void test("converts Duration to milliseconds", () => {
    assert.strictEqual(
      durationMs(
        create(DurationSchema, {
          seconds: protoInt64.zero,
          nanos: 0,
        }),
      ),
      0,
    );
    assert.strictEqual(
      durationMs(
        create(DurationSchema, {
          seconds: protoInt64.parse(818035920),
          nanos: 123456789,
        }),
      ),
      818035920123,
    );
  });
});

void suite("durationFromMs()", () => {
  void test("creates Duration from milliseconds", () => {
    const durationZero = durationFromMs(0);
    assert.strictEqual(Number(durationZero.seconds), 0);
    assert.strictEqual(durationZero.nanos, 0);
    const durationWithMs = durationFromMs(818035920123);
    assert.strictEqual(Number(durationWithMs.seconds), 818035920);
    assert.strictEqual(durationWithMs.nanos, 123000000);
  });
  void test("1000 ms", () => {
    const ts = durationFromMs(1000);
    assert.strictEqual(Number(ts.seconds), 1);
    assert.strictEqual(ts.nanos, 0);
  });
  void test("1020 ms", () => {
    const ts = durationFromMs(1020);
    assert.strictEqual(Number(ts.seconds), 1);
    assert.strictEqual(ts.nanos, 20 * 1000000);
  });
  void test("-1070 ms", () => {
    const ts = durationFromMs(-1070);
    assert.strictEqual(Number(ts.seconds), -2);
    assert.strictEqual(ts.nanos, 930 * 1000000);
  });
  void test("-1000 ms", () => {
    const ts = durationFromMs(-1000);
    assert.strictEqual(Number(ts.seconds), -1);
    assert.strictEqual(ts.nanos, 0);
  });
});
