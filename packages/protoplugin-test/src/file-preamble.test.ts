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
import { createTestPluginAndRun } from "./helpers";

describe("file preamble", () => {
  test("contains plugin name and version", async () => {
    const lines = await testGenerate({
      proto: `syntax="proto3";`,
      name: "pi-plugin",
      version: "v3.14159",
    });
    expect(lines).toContain("// @generated by pi-plugin v3.14159");
  });

  test("contains plugin options", async () => {
    const lines = await testGenerate({
      proto: `syntax="proto3";`,
      parameter: "foo=bar,baz",
    });
    expect(lines).toContain(
      `// @generated by test v1 with parameter "foo=bar,baz"`,
    );
  });

  test("elides rewrite_imports plugin option", async () => {
    const lines = await testGenerate({
      proto: `syntax="proto3";`,
      parameter:
        "foo,rewrite_imports=./test/*_pb.js:@buf/test,rewrite_imports=./test/*_web.js:@buf/web,bar",
    });
    expect(lines).toContain(
      `// @generated by test v1 with parameter "foo,bar"`,
    );
  });

  test("contains eslint-disable annotation", async () => {
    const lines = await testGenerate({
      proto: `syntax="proto3";`,
    });
    expect(lines).toContain("/* eslint-disable */");
  });

  test("contains ts-nocheck annotation by default", async () => {
    const lines = await testGenerate({
      proto: `syntax="proto3";`,
    });
    expect(lines).toContain("// @ts-nocheck");
  });

  test("does not contain ts-nocheck annotation when turned off", async () => {
    const lines = await testGenerate({
      proto: `syntax="proto3";`,
      parameter: "ts_nocheck=false",
    });
    expect(lines).not.toContain("// @ts-nocheck");
  });

  test("contains source file info for proto3", async () => {
    const lines = await testGenerate({
      proto: {
        "foo/bar.proto": `syntax="proto3";`,
      },
    });
    expect(lines).toContain(
      "// @generated from file foo/bar.proto (syntax proto3)",
    );
  });

  test("contains source file info for proto2", async () => {
    const lines = await testGenerate({
      proto: {
        "foo/bar.proto": `syntax="proto2";`,
      },
    });
    expect(lines).toContain(
      "// @generated from file foo/bar.proto (syntax proto2)",
    );
  });

  test("contains source file info for edition 2023", async () => {
    const lines = await testGenerate({
      proto: {
        "foo/bar.proto": `edition="2023";`,
      },
    });
    expect(lines).toContain(
      "// @generated from file foo/bar.proto (edition 2023)",
    );
  });

  test("contains syntax comments", async () => {
    const lines = await testGenerate({
      proto: `
           // comment above...
           // ... the syntax declaration
           syntax="proto3";
           `,
    });
    const firstLines = lines.slice(
      0,
      lines.indexOf("// @generated by test v1"),
    );
    expect(firstLines).toStrictEqual([
      "// comment above...",
      "// ... the syntax declaration",
      "",
    ]);
  });

  test("contains syntax comments with edition 2023", async () => {
    const lines = await testGenerate({
      proto: `
                // comment above...
                // ... the syntax declaration
                edition="2023";
           `,
    });
    const firstLines = lines.slice(
      0,
      lines.indexOf("// @generated by test v1"),
    );
    expect(firstLines).toStrictEqual([
      "// comment above...",
      "// ... the syntax declaration",
      "",
    ]);
  });

  test("contains package comments", async () => {
    const lines = await testGenerate({
      proto: `
                syntax="proto3";
                
                // comment above...
                // ... the package declaration
                package foo;
           `,
    });
    const lastLines = lines.slice(lines.indexOf("// @ts-nocheck"));
    expect(lastLines).toStrictEqual([
      "// @ts-nocheck",
      "",
      "// comment above...",
      "// ... the package declaration",
      "",
      "const placeholder = 1; // ensure file is not considered empty",
    ]);
  });

  // test helper to generate just a file with a preamble for each input proto file
  async function testGenerate(opt: {
    proto: string | Record<string, string>;
    parameter?: string;
    name?: string;
    version?: string;
  }) {
    return await createTestPluginAndRun({
      ...opt,
      supportsEditions: true,
      generateAny(f, schema) {
        f.preamble(schema.files[0]);
        f.print(
          "const placeholder = 1; // ensure file is not considered empty",
        );
      },
      parseOption() {
        // accept all options
      },
      returnLinesOfFirstFile: true,
    });
  }
});
