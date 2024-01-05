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
import { Timestamp as TS_Timestamp } from "../../gen/ts/google/protobuf/timestamp_pb.js";
import { Timestamp as JS_Timestamp } from "../../gen/js/google/protobuf/timestamp_pb.js";
import { Timestamp as PKG_Timestamp } from "@bufbuild/protobuf";

describe("google.protobuf.Timestamp", () => {
  describe.each([
    { Timestamp: TS_Timestamp, name: `(generated ts)` },
    { Timestamp: JS_Timestamp, name: `(generated js)` },
    { Timestamp: PKG_Timestamp, name: `(from package)` },
  ])("$name", ({ Timestamp }) => {
    test("now()", () => {
      const ts = Timestamp.now();
      expect(ts.seconds).toBeDefined();
    });
    test("fromDate()", () => {
      const a = new Date();
      const ts = Timestamp.fromDate(a);
      const b = ts.toDate();
      expect(b.getTime()).toBe(a.getTime());
    });
  });
});
