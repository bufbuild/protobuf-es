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

import { describe, expect, test } from "@jest/globals";
import { createTestPluginAndRun } from "./helpers.js";

describe("GeneratedFile.importDesc", () => {
  test("should create import symbol for enum descriptor", async function () {
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
        const imp = f.importDesc(schema.files[0].enums[0]);
        expect(imp.name).toBe("FooDesc");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for message descriptor", async function () {
    await createTestPluginAndRun({
      proto: `
      syntax="proto3";
      message Person {}
      `,
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importDesc(schema.files[0].messages[0]);
        expect(imp.name).toBe("PersonDesc");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for service descriptor", async function () {
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
        const imp = f.importDesc(schema.files[0].services[0]);
        expect(imp.name).toBe("Serv");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for extension descriptor", async function () {
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
        const imp = f.importDesc(schema.files[0].extensions[0]);
        expect(imp.name).toBe("ext");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
  test("should create import symbol for file descriptor", async function () {
    await createTestPluginAndRun({
      proto: {
        "my-proto-files/23/dir:/joe's files/x.proto": `syntax="proto3";`,
      },
      parameter: "target=ts",
      generateAny(f, schema) {
        const imp = f.importDesc(schema.files[0]);
        expect(imp.name).toBe("fileDesc_my_proto_files_23_dir_joe_s_files_x");
        expect(imp.from).toBe("./my-proto-files/23/dir:/joe's files/x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    });
  });
});
