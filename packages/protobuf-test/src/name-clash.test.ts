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
import { NoClashOneofADT as TS_NoClashOneofADT } from "./gen/ts/extra/name-clash_pb.js";

describe("message looking like a oneof ADT", () => {
  test("takes all fields in constructor", () => {
    const m = new TS_NoClashOneofADT({
      m: {
        case: "value",
        value: "xxx",
      },
    });
    expect(m).toBeDefined();
  });
  test("takes partial input in constructor", () => {
    const m = new TS_NoClashOneofADT({
      m: {
        case: "value",
      },
    });
    expect(m).toBeDefined();
  });
});
