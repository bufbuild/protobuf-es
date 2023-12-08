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
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { createJsDocBlock, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";

describe("deprecated makeJsDoc() and createJsDocBlock()", () => {
  test("creates JSDoc comment block", async () => {
    const lines = await testGenerate(`syntax="proto3";`, (f) => {
      f.print(createJsDocBlock(`hello world`));
    });
    expect(lines).toStrictEqual(["/**", " * hello world", " */"]);
  });

  test("creates JSDoc comment block for message descriptor", async () => {
    const lines = await testGenerate(
      `
        syntax="proto3";
        message SomeMessage {};
      `,
      (f, schema) => {
        f.print(makeJsDoc(schema.files[0].messages[0]));
      },
    );
    expect(lines).toStrictEqual([
      "/**",
      " * @generated from message SomeMessage",
      " */",
    ]);
  });

  test("creates JSDoc comment block for message descriptor with comments", async () => {
    const lines = await testGenerate(
      `
        syntax="proto3";
        
        // discarded detached comment
        
        // comment on message
        message SomeMessage {};
      `,
      (f, schema) => {
        f.print(makeJsDoc(schema.files[0].messages[0]));
      },
    );
    expect(lines).toStrictEqual([
      "/**",
      " * comment on message",
      " *",
      " * @generated from message SomeMessage",
      " */",
    ]);
  });

  test("indents", async () => {
    const lines = await testGenerate(`syntax="proto3";`, (f) => {
      f.print(createJsDocBlock(`multi-line\ncomment`, "  "));
    });
    expect(lines).toStrictEqual([
      "  /**",
      "   * multi-line",
      "   * comment",
      "   */",
    ]);
  });

  test("escapes */", async () => {
    const lines = await testGenerate(`syntax="proto3";`, (f) => {
      f.print(createJsDocBlock(`*/`));
    });
    expect(lines).toStrictEqual(["/**", " * *\\/", " */"]);
  });

  test("whitespace is unmodified", async () => {
    const lines = await testGenerate(`syntax="proto3";`, (f) => {
      f.print(createJsDocBlock(`\na\n b\n  c\t`));
    });
    expect(lines).toStrictEqual([
      "/**",
      " *",
      " * a",
      " *  b",
      " *   c\t",
      " */",
    ]);
  });

  async function testGenerate(
    protoContent: string,
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
      "x.proto": protoContent,
    };
    const req = CodeGeneratorRequest.fromBinary(
      await upstream.createCodeGeneratorRequest(protoFiles, {
        parameter: "target=ts",
      }),
    );
    expect(req.protoFile.length).toBe(1);
    const res = plugin.run(req);
    expect(res.file.length).toBeGreaterThanOrEqual(1);
    let content = res.file[0]?.content ?? "";
    if (content.endsWith("\n")) {
      content = content.slice(0, -1); // trim final newline so we don't return an extra line
    }
    return content.split("\n");
  }
});
