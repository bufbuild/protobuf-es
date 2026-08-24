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
import { isUnknownEnum, type UnknownEnum } from "@bufbuild/protobuf";
import { Proto3Enum } from "./gen/js/extra/proto3_pb.js";
import { Proto3EnumSchema } from "./gen/ts/extra/proto3_pb.js";

void suite("isUnknownEnum", () => {
  test("returns true for value not defined by the enum", () => {
    assert.strictEqual(isUnknownEnum(Proto3EnumSchema, 99 as number), true);
    assert.strictEqual(isUnknownEnum(Proto3EnumSchema, -1 as number), true);
  });
  test("returns false for defined values", () => {
    assert.strictEqual(isUnknownEnum(Proto3EnumSchema, Proto3Enum.YES), false);
    assert.strictEqual(isUnknownEnum(Proto3EnumSchema, Proto3Enum.NO), false);
  });
  test("narrows down to UnknownEnum", () => {
    function f(v: Proto3Enum): UnknownEnum {
      if (isUnknownEnum(Proto3EnumSchema, v)) {
        return v;
      }
      throw false;
    }
    assert.ok(f);
  });
});
