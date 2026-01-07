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
import * as ts_name_clash from "./gen/ts/extra/name-clash_pb.js";
import * as js_name_clash from "./gen/js/extra/name-clash_pb.js";
import { create } from "@bufbuild/protobuf";

void suite("message looking like a oneof ADT", () => {
  void test("takes all fields in constructor", () => {
    const m = create(ts_name_clash.NoClashOneofADTSchema, {
      m: {
        case: "value",
        value: "xxx",
      },
    });
    assert.strictEqual(m.m?.case, "value");
    assert.strictEqual(m.m?.value, "xxx");
  });
  void test("takes partial input in constructor", () => {
    const m = create(ts_name_clash.NoClashOneofADTSchema, {
      m: {
        case: "value",
      },
    });
    assert.strictEqual(m.m?.case, "value");
    assert.strictEqual(m.m?.value, undefined);
  });
});

void suite("enum values", () => {
  void test("reserved property names (generated ts)", () => {
    const e = ts_name_clash.ReservedPropertyNames_EnumBuiltIn;
    assert.strictEqual(e.constructor$, 0);
    assert.strictEqual(e.toString$, 1);
    assert.strictEqual(e.toJSON$, 2);
    assert.strictEqual(e.valueOf$, 3);
  });
  void test("reserved property names with prefix (generated ts)", () => {
    const e = ts_name_clash.ReservedPropertyNames_EnumBuiltInPrefixed;
    assert.strictEqual(e.constructor$, 0);
    assert.strictEqual(e.toString$, 1);
    assert.strictEqual(e.toJSON$, 2);
    assert.strictEqual(e.valueOf$, 3);
  });
  void test("reserved property names (generated js)", () => {
    const e = js_name_clash.ReservedPropertyNames_EnumBuiltIn;
    assert.strictEqual(e.constructor$, 0);
    assert.strictEqual(e.toString$, 1);
    assert.strictEqual(e.toJSON$, 2);
    assert.strictEqual(e.valueOf$, 3);
  });
  void test("reserved property names with prefix (generated js)", () => {
    const e = js_name_clash.ReservedPropertyNames_EnumBuiltInPrefixed;
    assert.strictEqual(e.constructor$, 0);
    assert.strictEqual(e.toString$, 1);
    assert.strictEqual(e.toJSON$, 2);
    assert.strictEqual(e.valueOf$, 3);
  });
});
