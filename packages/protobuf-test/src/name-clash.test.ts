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
import * as ts_name_clash from "./gen/ts/extra/name-clash_pb.js";
import * as js_name_clash from "./gen/js/extra/name-clash_pb.js";
import { create } from "@bufbuild/protobuf";

describe("message looking like a oneof ADT", () => {
  test("takes all fields in constructor", () => {
    const m = create(ts_name_clash.NoClashOneofADTSchema, {
      m: {
        case: "value",
        value: "xxx",
      },
    });
    expect(m.m?.case).toBe("value");
    expect(m.m?.value).toBe("xxx");
  });
  test("takes partial input in constructor", () => {
    const m = create(ts_name_clash.NoClashOneofADTSchema, {
      m: {
        case: "value",
      },
    });
    expect(m.m?.case).toBe("value");
    expect(m.m?.value).toBeUndefined();
  });
});

describe("enum values", () => {
  test("reserved property names (generated ts)", () => {
    const e = ts_name_clash.ReservedPropertyNames_EnumBuiltIn;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
  });
  test("reserved property names with prefix (generated ts)", () => {
    const e = ts_name_clash.ReservedPropertyNames_EnumBuiltInPrefixed;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
  });
  test("reserved property names (generated js)", () => {
    const e = js_name_clash.ReservedPropertyNames_EnumBuiltIn;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
  });
  test("reserved property names with prefix (generated js)", () => {
    const e = js_name_clash.ReservedPropertyNames_EnumBuiltInPrefixed;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
  });
});
