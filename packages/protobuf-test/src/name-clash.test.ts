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
import * as ts_name_clash from "./gen/ts/extra/name-clash_pb.js";
import * as js_name_clash from "./gen/js/extra/name-clash_pb.js";
import { proto3 } from "@bufbuild/protobuf";

describe("message looking like a oneof ADT", () => {
  test("takes all fields in constructor", () => {
    const m = new ts_name_clash.NoClashOneofADT({
      m: {
        case: "value",
        value: "xxx",
      },
    });
    expect(m).toBeDefined();
  });
  test("takes partial input in constructor", () => {
    const m = new ts_name_clash.NoClashOneofADT({
      m: {
        case: "value",
      },
    });
    expect(m).toBeDefined();
  });
});

describe("enum values", () => {
  test("reserved property names (generated ts)", () => {
    const e = ts_name_clash.ReservedPropertyNames_EnumBuiltIn;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
    const localNames = proto3.getEnumType(e).values.map((v) => v.localName);
    expect(localNames).toStrictEqual([
      "constructor$",
      "toString$",
      "toJSON$",
      "valueOf$",
    ]);
  });
  test("reserved property names with prefix (generated ts)", () => {
    const e = ts_name_clash.ReservedPropertyNames_EnumBuiltInPrefixed;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
    const localNames = proto3.getEnumType(e).values.map((v) => v.localName);
    expect(localNames).toStrictEqual([
      "constructor$",
      "toString$",
      "toJSON$",
      "valueOf$",
    ]);
  });
  test("reserved property names (generated js)", () => {
    const e = js_name_clash.ReservedPropertyNames_EnumBuiltIn;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
    const localNames = proto3.getEnumType(e).values.map((v) => v.localName);
    expect(localNames).toStrictEqual([
      "constructor$",
      "toString$",
      "toJSON$",
      "valueOf$",
    ]);
  });
  test("reserved property names with prefix (generated js)", () => {
    const e = js_name_clash.ReservedPropertyNames_EnumBuiltInPrefixed;
    expect(e.constructor$).toBe(0);
    expect(e.toString$).toBe(1);
    expect(e.toJSON$).toBe(2);
    expect(e.valueOf$).toBe(3);
    const localNames = proto3.getEnumType(e).values.map((v) => v.localName);
    expect(localNames).toStrictEqual([
      "constructor$",
      "toString$",
      "toJSON$",
      "valueOf$",
    ]);
  });
});
