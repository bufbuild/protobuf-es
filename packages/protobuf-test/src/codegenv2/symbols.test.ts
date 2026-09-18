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
import { UpstreamProtobuf } from "upstream-protobuf";
import { wktPublicImportPaths } from "@bufbuild/protobuf/codegenv2";

void suite("wktPublicImportPaths", () => {
  void test("must list all well-known files", async () => {
    // Verify that each well-known file is in wktPublicImportPaths.
    // The record is consulted when generating imports, which must
    // point to @bufbuild/protobuf/wkt or a subpath.
    // This test makes sure that we don't miss a new well-known file
    // added upstream.
    const wktProtoInclude = await new UpstreamProtobuf().getWktProtoInclude();
    for (const protoFile of wktProtoInclude.files) {
      assert.ok(wktPublicImportPaths[protoFile] !== undefined);
    }
  });
});
