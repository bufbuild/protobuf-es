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
import { createTestPluginAndRun } from "./helpers.js";

void suite("GeneratedFile.importSchema", () => {
  void test("should create import symbol for enum descriptor", async () => {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      enum Foo {
        FOO_UNSPECIFIED = 0;
        FOO_BAR = 1;
      }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].enums[0]);
        assert.strictEqual(imp.name, "FooSchema");
        assert.strictEqual(imp.from, "./x_pb.js");
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
  void test("should create import symbol for message descriptor", async () => {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Person {}
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].messages[0]);
        assert.strictEqual(imp.name, "PersonSchema");
        assert.strictEqual(imp.from, "./x_pb.js");
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
  void test("should create import symbol for service descriptor", async () => {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Msg {}
      service Serv {
        rpc Act(Msg) returns (Msg);
      }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].services[0]);
        assert.strictEqual(imp.name, "Serv");
        assert.strictEqual(imp.from, "./x_pb.js");
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
  void test("should create import symbol for extension descriptor", async () => {
    await createTestPluginAndRun({
      proto: `
      syntax="proto2";
      message Msg {
        extensions 10 to 10;
      }
      extend Msg {
        optional int32 ext = 10;
      }
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0].extensions[0]);
        assert.strictEqual(imp.name, "ext");
        assert.strictEqual(imp.from, "./x_pb.js");
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
  void test("should create import symbol for file descriptor", async () => {
    await createTestPluginAndRun({
      proto: {
        "my-proto-files/23/dir:/joe's files/x.proto": `syntax="proto3";`,
      },
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importSchema(schema.files[0]);
        assert.strictEqual(
          imp.name,
          "file_my_proto_files_23_dir_joe_s_files_x",
        );
        assert.strictEqual(
          imp.from,
          "./my-proto-files/23/dir:/joe's files/x_pb.js",
        );
        assert.strictEqual(imp.typeOnly, false);
      },
    });
  });
});
