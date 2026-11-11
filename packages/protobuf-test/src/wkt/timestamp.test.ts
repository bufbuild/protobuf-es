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
  timestampNow,
  timestampFromDate,
  timestampDate,
  timestampFromMs,
  timestampMs,
  TimestampSchema,
} from "@bufbuild/protobuf/wkt";
import { create, fromJson, toJson, protoInt64 } from "@bufbuild/protobuf";

void suite("timestampNow()", () => {
  void test("uses current time", () => {
    const timestamp = timestampNow();
    const wantMs = Date.now();
    const gotMs = timestampMs(timestamp);
    const leewayMs = 50;
    assert.ok(gotMs >= wantMs - leewayMs);
    assert.ok(gotMs <= wantMs + leewayMs);
  });
});

void suite("timestampMs()", () => {
  void test("converts Timestamp to unix timestamp with milliseconds", () => {
    assert.strictEqual(
      timestampMs(
        create(TimestampSchema, {
          seconds: protoInt64.zero,
          nanos: 0,
        }),
      ),
      0,
    );
    assert.strictEqual(
      timestampMs(
        create(TimestampSchema, {
          seconds: protoInt64.parse(818035920),
          nanos: 123456789,
        }),
      ),
      818035920123,
    );
  });
});

void suite("timestampFromMs()", () => {
  void test("converts unix timestamp with milliseconds to Timestamp", () => {
    const timestampZero = timestampFromMs(0);
    assert.strictEqual(Number(timestampZero.seconds), 0);
    assert.strictEqual(timestampZero.nanos, 0);
    const timestampWithMs = timestampFromMs(818035920123);
    assert.strictEqual(Number(timestampWithMs.seconds), 818035920);
    assert.strictEqual(timestampWithMs.nanos, 123000000);
  });
  void test("1000 ms", () => {
    const ts = timestampFromMs(1000);
    assert.strictEqual(Number(ts.seconds), 1);
    assert.strictEqual(ts.nanos, 0);
  });
  void test("1020 ms", () => {
    const ts = timestampFromMs(1020);
    assert.strictEqual(Number(ts.seconds), 1);
    assert.strictEqual(ts.nanos, 20 * 1000000);
  });
  void test("-1070 ms", () => {
    const ts = timestampFromMs(-1070);
    assert.strictEqual(Number(ts.seconds), -2);
    assert.strictEqual(ts.nanos, 930 * 1000000);
  });
  void test("-1000 ms", () => {
    const ts = timestampFromMs(-1000);
    assert.strictEqual(Number(ts.seconds), -1);
    assert.strictEqual(ts.nanos, 0);
  });
});

void suite("timestampFromDate()", () => {
  void test("converts Date to Timestamp", () => {
    const timestampZero = timestampFromDate(new Date(0));
    assert.strictEqual(Number(timestampZero.seconds), 0);
    assert.strictEqual(timestampZero.nanos, 0);
    const timestampWithMs = timestampFromDate(new Date(818035920123));
    assert.strictEqual(Number(timestampWithMs.seconds), 818035920);
    assert.strictEqual(timestampWithMs.nanos, 123000000);
  });
});

void suite("timestampDate()", () => {
  void test("converts Timestamp to Date", () => {
    const timestampZero = create(TimestampSchema, {
      seconds: protoInt64.zero,
      nanos: 0,
    });
    assert.strictEqual(timestampDate(timestampZero).getTime(), 0);
    const timestampWithMs = create(TimestampSchema, {
      seconds: protoInt64.parse(818035920),
      nanos: 123000000,
    });
    assert.strictEqual(timestampDate(timestampWithMs).getTime(), 818035920123);
  });
});

void suite("Timestamp JSON calendar validation", () => {
  for (const input of [
    "2001-02-29T00:00:00Z",
    "2001-02-31T00:00:00Z",
    "1900-02-29T00:00:00Z",
    "2001-04-31T12:00:00Z",
    "2001-06-31T12:00:00+01:00",
    "2001-09-31T12:00:00-01:00",
    "2001-11-31T12:00:00Z",
    "1970-01-01T24:00:00Z",
    "1970-01-01T24:00:00.000000001+01:00",
  ]) {
    void test(`rejects ${input}`, () => {
      assert.throws(() => fromJson(TimestampSchema, input), {
        message:
          "cannot decode message google.protobuf.Timestamp from JSON: invalid RFC 3339 string",
      });
    });
  }
  for (const [input, expected] of [
    ["2000-02-29T00:00:00Z", "2000-02-29T00:00:00Z"],
    ["2004-02-29T23:59:59.123456789Z", "2004-02-29T23:59:59.123456789Z"],
    ["2001-04-30T23:30:00-01:00", "2001-05-01T00:30:00Z"],
    ["2001-03-01T00:30:00+01:00", "2001-02-28T23:30:00Z"],
    ["0001-01-01T00:00:00Z", "0001-01-01T00:00:00Z"],
    ["9999-12-31T23:59:59Z", "9999-12-31T23:59:59Z"],
  ]) {
    void test(`accepts ${input}`, () => {
      assert.strictEqual(
        toJson(TimestampSchema, fromJson(TimestampSchema, input)),
        expected,
      );
    });
  }
});
