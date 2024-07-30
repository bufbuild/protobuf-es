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

import { safeIdentifier } from "@bufbuild/protoplugin";
import { describe, expect, test } from "@jest/globals";

describe("safeIdentifier", () => {
  test("sanitized reserved identifiers", () => {
    expect(safeIdentifier("break")).toBe("break$");
    expect(safeIdentifier("case")).toBe("case$");
    expect(safeIdentifier("catch")).toBe("catch$");
    expect(safeIdentifier("class")).toBe("class$");
    expect(safeIdentifier("const")).toBe("const$");
    expect(safeIdentifier("continue")).toBe("continue$");
    expect(safeIdentifier("debugger")).toBe("debugger$");
    expect(safeIdentifier("default")).toBe("default$");
    expect(safeIdentifier("delete")).toBe("delete$");
  });

  test("does not modify other inputs which are not reserved identifiers", () => {
    expect(safeIdentifier("constructor")).toBe("constructor");
    expect(safeIdentifier("toString")).toBe("toString");
    expect(safeIdentifier("toJSON")).toBe("toJSON");
    expect(safeIdentifier("valueOf")).toBe("valueOf");
  });
});
