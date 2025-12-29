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
import { compileEnum, compileFile } from "../helpers.js";
import { enumDesc, tsEnum } from "@bufbuild/protobuf/codegenv2";

void suite("enumDesc()", () => {
  test("resolves enum", async () => {
    const descFile = await compileFile(`
      syntax="proto3";
      enum E {
        A = 0;
        B = 1;
      }
    `);
    const descEnum = enumDesc(descFile, 0);
    assert.strictEqual(descEnum.name, "E");
  });
});

void suite("tsEnum()", () => {
  test("creates TS enum", async () => {
    const descEnum = await compileEnum(`
      syntax="proto3";
      enum E {
        A = 0;
        B = 1;
      }
    `);
    const e = tsEnum(descEnum);
    assert.strictEqual(e[0], "A");
    assert.strictEqual(e[1], "B");
    assert.strictEqual(e.A, 0);
    assert.strictEqual(e.B, 1);
    assert.deepStrictEqual(e, {
      0: "A",
      1: "B",
      A: 0,
      B: 1,
    });
  });
  test("drops prefix", async () => {
    const descEnum = await compileEnum(`
      syntax="proto3";
      enum PrefixEnum {
        PREFIX_ENUM_ZERO = 0;
        PREFIX_ENUM_ONE = 1;
      }
    `);
    const e = tsEnum(descEnum);
    assert.deepStrictEqual(e, {
      0: "ZERO",
      1: "ONE",
      ZERO: 0,
      ONE: 1,
    });
  });
  test("escapes reserved property names", async () => {
    const descEnum = await compileEnum(`
      syntax="proto3";
      enum EnumBuiltIn {
        constructor = 0;
        toString = 1;
        toJSON = 2;
        valueOf = 3;
      }
    `);
    const e = tsEnum(descEnum);
    assert.deepStrictEqual(e, {
      0: "constructor$",
      1: "toString$",
      2: "toJSON$",
      3: "valueOf$",
      constructor$: 0,
      toString$: 1,
      toJSON$: 2,
      valueOf$: 3,
    });
  });
  test("escapes reserved property names with dropped prefix", async () => {
    const descEnum = await compileEnum(`
      syntax="proto3";
      enum EnumBuiltInPrefixed {
        ENUM_BUILT_IN_PREFIXED_constructor = 0;
        ENUM_BUILT_IN_PREFIXED_toString = 1;
        ENUM_BUILT_IN_PREFIXED_toJSON = 2;
        ENUM_BUILT_IN_PREFIXED_valueOf = 3;
      }
    `);
    const e = tsEnum(descEnum);
    assert.deepStrictEqual(e, {
      0: "constructor$",
      1: "toString$",
      2: "toJSON$",
      3: "valueOf$",
      constructor$: 0,
      toString$: 1,
      toJSON$: 2,
      valueOf$: 3,
    });
  });
});
