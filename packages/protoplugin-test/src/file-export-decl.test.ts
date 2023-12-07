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
import { UpstreamProtobuf } from "upstream-protobuf";
import type { DescEnum, DescMessage } from "@bufbuild/protobuf";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";

describe("file exportDecl", () => {
  test("works as documented", async () => {
    const lines = await testGenerate((f) => {
      const name = "foo";
      f.print(f.exportDecl("const", name), " = 123;");
    });
    expect(lines).toStrictEqual(["export const foo = 123;"]);
  });

  test("declaration can be empty string", async () => {
    const lines = await testGenerate((f) => {
      f.print("const foo = 123;");
      f.print(f.exportDecl("", "foo"), ";");
    });
    expect(lines).toStrictEqual(["const foo = 123;", "export foo;"]);
  });

  test("accepts DescMessage as name", async () => {
    const lines = await testGenerate((f, descMessage) => {
      f.print(f.exportDecl("const", descMessage), " = 123;");
    });
    expect(lines).toStrictEqual(["export const SomeMessage = 123;"]);
  });

  test("accepts DescEnum as name", async () => {
    const lines = await testGenerate((f, _, descEnum) => {
      f.print(f.exportDecl("const", descEnum), " = 123;");
    });
    expect(lines).toStrictEqual(["export const SomeEnum = 123;"]);
  });

  async function testGenerate(
    gen: (
      f: GeneratedFile,
      descMessage: DescMessage,
      descEnum: DescEnum,
    ) => void,
  ) {
    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs: generateAny,
      generateJs: generateAny,
      generateDts: generateAny,
    });

    function generateAny(schema: Schema) {
      gen(
        schema.generateFile("test.ts"),
        schema.files[0].messages[0],
        schema.files[0].enums[0],
      );
    }

    const upstream = new UpstreamProtobuf();
    const protoFiles = {
      "x.proto": `
      syntax="proto3";
      message SomeMessage {}
      enum SomeEnum {
        SOME_ENUM_UNRECOGNIZED = 0;
        SOME_ENUM_A = 1;
      }
      `,
    };
    const req = CodeGeneratorRequest.fromBinary(
      await upstream.createCodeGeneratorRequest(protoFiles, {
        parameter: "target=ts",
      }),
    );
    expect(req.protoFile.length).toBe(1);
    expect(req.protoFile[0]?.messageType.length).toBe(1);
    expect(req.protoFile[0]?.enumType.length).toBe(1);
    const res = plugin.run(req);
    expect(res.file.length).toBeGreaterThanOrEqual(1);
    const content = res.file[0]?.content ?? "";
    return content.trim().split("\n");
  }
});
