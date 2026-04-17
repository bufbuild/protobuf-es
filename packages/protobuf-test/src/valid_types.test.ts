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
  VTypes3,
  VTypes3Valid,
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
  test("required oneof excludes undefined case in Valid type", () => {
    function f(vtypesValid: VTypesValid) {
      // The required oneof must have a case set - case is always a string, never undefined
      const c: "requiredOneofA" | "requiredOneofB" =
        vtypesValid.requiredOneof.case;
      return c;
    }
    assert.ok(f);
  });
  test("optional oneof still includes undefined case in Valid type", () => {
    function f(vtypesValid: VTypesValid) {
      // The optional oneof case can be undefined - verify undefined is in the union
      const c = vtypesValid.optionalOneof.case;
      if (c === undefined) {
        const _u: undefined = c;
        return _u;
      }
      return c;
    }
    assert.ok(f);
  });
  test("regular oneof is not assignable to required oneof in Valid type", () => {
    function f(vtypes: VTypes, vtypesValid: VTypesValid) {
      // @ts-expect-error - regular oneof (with undefined case) is not assignable to required oneof (without undefined case)
      const _o: VTypesValid["requiredOneof"] = vtypes.requiredOneof;
      return _o;
    }
    assert.ok(f);
  });
  test("message with only required oneof generates a valid type", () => {
    function f(vtypes3: VTypes3, vtypes3Valid: VTypes3Valid) {
      // Valid type is assignable to regular type
      vtypes3 = vtypes3Valid;
      // The required oneof must have a case set
      const c: "value1" | "value2" = vtypes3Valid.variant.case;
      return [vtypes3, c];
    }
    assert.ok(f);
  });
  test("message with only required oneof: regular type is not assignable to valid type", () => {
    function f(vtypes3: VTypes3, vtypes3Valid: VTypes3Valid) {
      // @ts-expect-error - VTypes3 is not assignable to VTypes3Valid - Types of property variant are incompatible
      vtypes3Valid = vtypes3;
      return vtypes3Valid;
    }
    assert.ok(f);
  });
});
