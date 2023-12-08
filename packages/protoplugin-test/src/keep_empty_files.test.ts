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
import type { DescFile } from "@bufbuild/protobuf";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { UpstreamProtobuf } from "upstream-protobuf";

describe("keep_empty_files", () => {
  describe("unset", () => {
    test.each(["js", "ts", "dts"])(
      "does not generate empty file with target %p",
      async (target) => {
        const { fileCount, lines } = await testGenerate(
          `
            // detached syntax comment
            
            // syntax comment
            syntax="proto3";
            
            // detached package comment
            
            // package comment
            package test;
            
            message M {}
            `,
          `target=${target}`,
          (f, descFile) => {
            // A preamble does not count as non-empty
            f.preamble(descFile);
            // An unused import does not count as non-empty
            f.import("foo", "bar");
            // An unused export declaration does not count as non-empty
            f.exportDecl("foo", "bar");
          },
        );
        expect(lines).toBeUndefined();
        expect(fileCount).toBe(0);
      },
    );
    test.each(["js", "ts", "dts"])(
      "printing empty line generates a file with target %p",
      async (target) => {
        const { lines } = await testGenerate(
          `syntax="proto3"; message M {}`,
          `target=${target}`,
          (f) => {
            f.print();
          },
        );
        expect(lines).toStrictEqual([""]);
      },
    );
  });

  describe("set", () => {
    test.each(["js", "ts", "dts"])(
      "generates empty file with target %p",
      async (target) => {
        const { lines } = await testGenerate(
          `syntax="proto3"; message M {}`,
          `target=${target},keep_empty_files=true`,
          (f) => {
            f.print();
          },
        );
        expect(lines).toStrictEqual([""]);
      },
    );
  });

  async function testGenerate(
    protoSource: string,
    parameter: string,
    gen: (f: GeneratedFile, descFile: DescFile) => void,
  ) {
    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs: generateAny,
      generateJs: generateAny,
      generateDts: generateAny,
    });

    function generateAny(schema: Schema, target: "js" | "ts" | "dts") {
      const f = schema.generateFile(`test.${target}`);
      gen(f, schema.files[0]);
    }

    const upstream = new UpstreamProtobuf();
    const protoFiles = {
      "x.proto": protoSource,
    };
    const req = CodeGeneratorRequest.fromBinary(
      await upstream.createCodeGeneratorRequest(protoFiles, {
        parameter,
      }),
    );
    expect(req.fileToGenerate.length).toBe(1);
    const res = plugin.run(req);
    let lines: string[] | undefined;
    if (res.file.length > 0) {
      let content = res.file[0]?.content ?? "";
      if (content.endsWith("\n")) {
        content = content.slice(0, -1); // trim final newline so we don't return an extra line
      }
      lines = content.split("\n");
    }
    return {
      fileCount: res.file.length,
      lines,
    };
  }
});
