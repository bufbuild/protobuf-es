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

import { describe, expect, test } from "@jest/globals";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { UpstreamProtobuf } from "upstream-protobuf";

describe("file import", () => {
  test("should create import symbol for package", async function () {
    await testGenerate(`syntax="proto3";`, (f) => {
      const imp = f.import("Foo", "@scope/pkg");
      expect(imp.name).toBe("Foo");
      expect(imp.from).toBe("@scope/pkg");
      expect(imp.typeOnly).toBe(false);
    });
  });
  test("should create import symbol for relative import", async function () {
    await testGenerate(`syntax="proto3";`, (f) => {
      const imp = f.import("Foo", "./foo_zz.js");
      expect(imp.name).toBe("Foo");
      expect(imp.from).toBe("./foo_zz.js");
      expect(imp.typeOnly).toBe(false);
    });
  });
  test("should create import symbol for https import", async function () {
    await testGenerate(`syntax="proto3";`, (f) => {
      const imp = f.import("Foo", "https://example.com/foo.js");
      expect(imp.name).toBe("Foo");
      expect(imp.from).toBe("https://example.com/foo.js");
      expect(imp.typeOnly).toBe(false);
    });
  });
  test("should create import symbol for enum descriptor", async function () {
    await testGenerate(
      `syntax="proto3";
      enum Foo {
        FOO_UNSPECIFIED = 0;
        FOO_BAR = 1;
      }
      `,
      (f, schema) => {
        const imp = f.import(schema.files[0].enums[0]);
        expect(imp.name).toBe("Foo");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    );
  });
  test("should create import symbol for message descriptor", async function () {
    await testGenerate(
      `syntax="proto3";
        message Person {}
      `,
      (f, schema) => {
        const imp = f.import(schema.files[0].messages[0]);
        expect(imp.name).toBe("Person");
        expect(imp.from).toBe("./x_pb.js");
        expect(imp.typeOnly).toBe(false);
      },
    );
  });

  async function testGenerate(
    proto: string,
    gen: (f: GeneratedFile, schema: Schema) => void,
  ) {
    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs: generateAny,
      generateJs: generateAny,
      generateDts: generateAny,
    });

    function generateAny(schema: Schema) {
      gen(schema.generateFile("test.ts"), schema);
    }

    const upstream = new UpstreamProtobuf();
    const protoFiles = {
      "x.proto": proto,
    };
    const reqBytes = await upstream.createCodeGeneratorRequest(protoFiles, {
      parameter: "target=ts",
    });
    const req = CodeGeneratorRequest.fromBinary(reqBytes);
    plugin.run(req);
  }
});
