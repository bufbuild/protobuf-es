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

import * as assert from "node:assert";
import { suite, test } from "node:test";
import { Color } from "./gen/ts,erasable/extra/erasable_syntax_pb.js";

void suite("erasable_syntax", () => {
  test("generates an object and a type", () => {
    assert.deepStrictEqual(Color, {
      UNSPECIFIED: 0,
      RED: 1,
      GREEN: 2,
      BLUE: 3,
    });
    const val: 1 = Color.RED;
    assert.strictEqual(val, Color.RED);
  });

  test("Only values in range assign", () => {
    function f(): Color {
      let t: Color;
      // Enum value assigns
      t = Color.RED;
      // Known literals assign
      t = 1;
      // @ts-expect-error - out-of-range literal rejects
      t = 4;
      // @ts-expect-error - number value rejects
      t = 4 as number;
      return t;
    }
    assert.ok(f);
  });

  test("does not support reverse lookup", () => {
    // @ts-expect-error
    const name = Color[Color.BLUE];
    assert.strictEqual(name, undefined);
  });

  test("allows exhaustive switch", () => {
    function f(c: Color) {
      switch (c) {
        case Color.UNSPECIFIED:
          return true;
        case Color.RED:
          return true;
        case Color.GREEN:
          return true;
        case Color.BLUE:
          return true;
        default:
          return c satisfies never;
      }
    }
    assert.ok(f);
  });
});
