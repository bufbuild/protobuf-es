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
import { safeIdentifier } from "@bufbuild/protoplugin";
import assert from "node:assert";

void suite("safeIdentifier", () => {
  void test("sanitized reserved identifiers", () => {
    assert.equal(safeIdentifier("break"), "break$");
    assert.equal(safeIdentifier("case"), "case$");
    assert.equal(safeIdentifier("catch"), "catch$");
    assert.equal(safeIdentifier("class"), "class$");
    assert.equal(safeIdentifier("const"), "const$");
    assert.equal(safeIdentifier("continue"), "continue$");
    assert.equal(safeIdentifier("debugger"), "debugger$");
    assert.equal(safeIdentifier("default"), "default$");
    assert.equal(safeIdentifier("delete"), "delete$");
  });

  void test("does not modify other inputs which are not reserved identifiers", () => {
    assert.equal(safeIdentifier("constructor"), "constructor");
    assert.equal(safeIdentifier("toString"), "toString");
    assert.equal(safeIdentifier("toJSON"), "toJSON");
    assert.equal(safeIdentifier("valueOf"), "valueOf");
  });
});
