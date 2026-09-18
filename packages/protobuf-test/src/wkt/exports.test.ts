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

import { test } from "node:test";
import * as assert from "node:assert";
import { UpstreamProtobuf } from "upstream-protobuf";

void test("barrel exports for wkt", async () => {
  // Up to v2.15.0, all well-known types were exported from the barrel @bufbuild/protobuf/wkt.
  // To maintain backwards compatibility, verify they are still exported from the barrel.
  const wkt = await import("@bufbuild/protobuf/wkt");
  const exportedFileDescriptors = Object.keys(wkt)
    .filter((name) => name.startsWith("file_"))
    .sort();
  const expectedFileDescriptors = [
    "file_google_protobuf_any",
    "file_google_protobuf_api",
    "file_google_protobuf_compiler_plugin",
    "file_google_protobuf_cpp_features",
    "file_google_protobuf_descriptor",
    "file_google_protobuf_duration",
    "file_google_protobuf_empty",
    "file_google_protobuf_field_mask",
    "file_google_protobuf_go_features",
    "file_google_protobuf_java_features",
    "file_google_protobuf_source_context",
    "file_google_protobuf_struct",
    "file_google_protobuf_timestamp",
    "file_google_protobuf_type",
    "file_google_protobuf_wrappers",
  ].sort();
  assert.deepStrictEqual(exportedFileDescriptors, expectedFileDescriptors);
});

void test("full name exports for wkt", async () => {
  // All well-known types are exported from full subpaths from @bufbuild/protobuf/wkt.
  const wktProtoInclude = await new UpstreamProtobuf().getWktProtoInclude();
  for (const protoFile of wktProtoInclude.files) {
    // For example, google/protobuf/timestamp.proto is @bufbuild/protobuf/wkt/google/protobuf/timestamp_pb.js
    const exportedFile =
      "@bufbuild/protobuf/wkt/" + protoFile.replace(/\.proto$/, "_pb.js");
    const imported = await import(exportedFile);
    assert.ok(!!imported);
  }
});
