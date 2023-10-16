// Copyright 2021-2023 Buf Technologies, Inc.
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
import { Duration as TS_Duration } from "../../gen/ts/google/protobuf/duration_pb.js";
import { Duration as JS_Duration } from "../../gen/js/google/protobuf/duration_pb.js";
import { Duration as PKG_Duration } from "@bufbuild/protobuf";
import { protoInt64 } from "@bufbuild/protobuf";

describe("google.protobuf.Duration", () => {
  describe.each([
    { Duration: TS_Duration, name: `(generated ts)` },
    { Duration: JS_Duration, name: `(generated js)` },
    { Duration: PKG_Duration, name: `(from package)` },
  ])("$name", ({ Duration }) => {
    // json representations
    const json3s = "3s";
    const json3s1ms = "3.000001s";
    const json3s1ns = "3.000000001s";
    const jsonneg3s1ns = "-3.000000001s";
    const json0s5ns = "0.000000005s";
    const jsonneg0s5ns = "-0.000000005s";

    // durations
    const dura3s = new Duration({ seconds: protoInt64.parse(3), nanos: 0 });
    const dura3s1ms = new Duration({
      seconds: protoInt64.parse(3),
      nanos: 1000,
    });
    const dura3s1ns = new Duration({ seconds: protoInt64.parse(3), nanos: 1 });
    const duraneg3s1ns = new Duration({
      seconds: protoInt64.parse(-3),
      nanos: -1,
    });
    const dura0s5ns = new Duration({ seconds: protoInt64.parse(0), nanos: 5 });
    const duraneg0s5ns = new Duration({
      seconds: protoInt64.parse(0),
      nanos: -5,
    });

    test("encodes 3s to JSON", () => {
      expect(dura3s.toJson()).toBe(json3s);
    });
    test("encodes 3s 1ms to JSON", () => {
      expect(dura3s1ms.toJson()).toBe(json3s1ms);
    });
    test("encodes 3s 1ns to JSON", () => {
      expect(dura3s1ns.toJson()).toBe(json3s1ns);
    });
    test("encodes -3s 1ns to JSON", () => {
      expect(duraneg3s1ns.toJson()).toBe(jsonneg3s1ns);
    });
    test("encodes 0s 5ns to JSON", () => {
      expect(dura0s5ns.toJson()).toBe(json0s5ns);
    });
    test("encodes 0s -5ns to JSON", () => {
      expect(duraneg0s5ns.toJson()).toBe(jsonneg0s5ns);
    });

    test("decodes 3s from JSON", () => {
      expect(Duration.fromJson(json3s)).toStrictEqual(dura3s);
    });
    test("decodes 3s 1ms from JSON", () => {
      expect(Duration.fromJson(json3s1ms)).toStrictEqual(dura3s1ms);
    });
    test("decodes 3s 1ns from JSON", () => {
      expect(Duration.fromJson(json3s1ns)).toStrictEqual(dura3s1ns);
    });
    test("decodes -3s 1ns from JSON", () => {
      expect(Duration.fromJson(jsonneg3s1ns)).toStrictEqual(duraneg3s1ns);
    });
    test("decodes 0s 5ns from JSON", () => {
      expect(Duration.fromJson(json0s5ns)).toStrictEqual(dura0s5ns);
    });
    test("decodes 0s -5ns from JSON", () => {
      expect(Duration.fromJson(jsonneg0s5ns)).toStrictEqual(duraneg0s5ns);
    });
  });
});
