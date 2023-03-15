// Copyright 2021-2023 Buf Technologies, Inc.
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

import { codegenInfo } from "@bufbuild/protobuf";
import { describe, expect, test } from "@jest/globals";

describe("safeIdentifier", () => {
  const { safeIdentifier } = codegenInfo;

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

describe("safeObjectProperty", () => {
  const { safeObjectProperty } = codegenInfo;

  test("sanitizes reserved object property names", () => {
    expect(safeObjectProperty("constructor")).toBe("constructor$");
    expect(safeObjectProperty("toString")).toBe("toString$");
    expect(safeObjectProperty("toJSON")).toBe("toJSON$");
    expect(safeObjectProperty("valueOf")).toBe("valueOf$");
  });

  test("does not modify other inputs which are not reserved object properties", () => {
    expect(safeObjectProperty("break")).toBe("break");
    expect(safeObjectProperty("case")).toBe("case");
    expect(safeObjectProperty("catch")).toBe("catch");
    expect(safeObjectProperty("class")).toBe("class");
    expect(safeObjectProperty("const")).toBe("const");
    expect(safeObjectProperty("continue")).toBe("continue");
    expect(safeObjectProperty("debugger")).toBe("debugger");
    expect(safeObjectProperty("default")).toBe("default");
    expect(safeObjectProperty("delete")).toBe("delete");
  });
});
