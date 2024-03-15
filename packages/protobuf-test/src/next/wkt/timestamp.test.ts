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
  timestampNow,
  timestampFromDate,
  timestampDate,
  timestampFromMs,
  timestampMs,
} from "@bufbuild/protobuf/next/wkt";
import { TimestampDesc } from "@bufbuild/protobuf/next/wkt";
import { protoInt64 } from "@bufbuild/protobuf";
import { create } from "@bufbuild/protobuf/next";

describe("timestampNow()", () => {
  test("uses current time", () => {
    const timestamp = timestampNow();
    const wantMs = Date.now();
    const gotMs = timestampMs(timestamp);
    const leewayMs = 50;
    expect(gotMs).toBeGreaterThanOrEqual(wantMs - leewayMs);
    expect(gotMs).toBeLessThanOrEqual(wantMs + leewayMs);
  });
});

describe("timestampMs()", () => {
  test("converts Timestamp to unix timestamp with milliseconds", () => {
    expect(
      timestampMs(
        create(TimestampDesc, {
          seconds: protoInt64.zero,
          nanos: 0,
        }),
      ),
    ).toBe(0);
    expect(
      timestampMs(
        create(TimestampDesc, {
          seconds: protoInt64.parse(818035920),
          nanos: 123456789,
        }),
      ),
    ).toBe(818035920124);
  });
});

describe("timestampFromMs()", () => {
  test("converts unix timestamp with milliseconds to Timestamp", () => {
    const timestampZero = timestampFromMs(0);
    expect(Number(timestampZero.seconds)).toBe(0);
    expect(timestampZero.nanos).toBe(0);
    const timestampWithMs = timestampFromMs(818035920123);
    expect(Number(timestampWithMs.seconds)).toBe(818035920);
    expect(timestampWithMs.nanos).toBe(123000000);
  });
});

describe("timestampFromDate()", () => {
  test("converts Date to Timestamp", () => {
    const timestampZero = timestampFromDate(new Date(0));
    expect(Number(timestampZero.seconds)).toBe(0);
    expect(timestampZero.nanos).toBe(0);
    const timestampWithMs = timestampFromDate(new Date(818035920123));
    expect(Number(timestampWithMs.seconds)).toBe(818035920);
    expect(timestampWithMs.nanos).toBe(123000000);
  });
});

describe("timestampDate()", () => {
  test("converts Timestamp to Date", () => {
    const timestampZero = create(TimestampDesc, {
      seconds: protoInt64.zero,
      nanos: 0,
    });
    expect(timestampDate(timestampZero).getTime()).toBe(0);
    const timestampWithMs = create(TimestampDesc, {
      seconds: protoInt64.parse(818035920),
      nanos: 123000000,
    });
    expect(timestampDate(timestampWithMs).getTime()).toBe(818035920123);
  });
});
