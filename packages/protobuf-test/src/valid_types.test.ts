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
import type {
  VTypes,
  VTypesValid,
} from "./gen/ts,valid_types/extra/valid_types_pb.js";

void suite("Valid types", () => {
  test("Valid type is assignable to regular type", () => {
    function f(vtypes: VTypes, vtypesValid: VTypesValid) {
      vtypes = vtypesValid;
      return vtypes;
    }
    assert.ok(f);
  });
  test("regular type is not assignable to Valid type", () => {
    function f(vtypes: VTypes, vtypesValid: VTypesValid) {
      // @ts-expect-error - TS2322: Type VTypes is not assignable to type VTypesValid - Types of property requiredMsg are incompatible. - Type Message<"spec.VTypes.Other"> | undefined is not assignable to type Message<"spec.VTypes.Other">
      vtypesValid = vtypes;
      return vtypesValid;
    }
    assert.ok(f);
  });
  test("regular type is not assignable to Valid type", () => {
    function f(vtypesValid: VTypesValid) {
      const str: string = vtypesValid.requiredMsg.$typeName;
      return str;
    }
    assert.ok(f);
  });
});
