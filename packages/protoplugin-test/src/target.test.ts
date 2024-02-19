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

import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import type { FileInfo, Schema } from "@bufbuild/protoplugin/ecmascript";
import { createTestPluginAndRun } from "./helpers.js";
import type { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { CodeGeneratorResponse } from "@bufbuild/protobuf";

describe("target", () => {
  type PluginInit = Parameters<typeof createEcmaScriptPlugin>[0];
  let generateTs: jest.Mock<PluginInit["generateTs"]>;
  let generateJs: jest.Mock<Required<PluginInit>["generateJs"]>;
  let generateDts: jest.Mock<Required<PluginInit>["generateDts"]>;
  let transpile: jest.Mock<Required<PluginInit>["transpile"]>;

  beforeEach(() => {
    generateTs = jest.fn((schema: Schema) =>
      schema.generateFile("test.ts").print(`const foo = "ts";`),
    );
    generateJs = jest.fn((schema: Schema) =>
      schema.generateFile("test.js").print(`const foo = "js";`),
    );
    generateDts = jest.fn((schema: Schema) =>
      schema.generateFile("test.d.ts").print(`declare const foo = "dts";`),
    );
    transpile = jest.fn(
      (
        files: FileInfo[],
        transpileJs: boolean,
        transpileDts: boolean,
        jsImportStyle: "module" | "legacy_commonjs",
      ) => {
        const out: FileInfo[] = [];
        for (const f of files) {
          expect(f.name.endsWith(".ts")).toBeTruthy();
          expect(f.name.endsWith(".d.ts")).toBeFalsy();
          if (transpileJs) {
            out.push({
              name: "test.js",
              preamble: f.preamble,
              content: `const foo = "js transpiled from ts"; // ${jsImportStyle}`,
            });
          }
          if (transpileDts) {
            out.push({
              name: "test.d.ts",
              preamble: f.preamble,
              content: `declare const foo = "dts transpiled from ts";`,
            });
          }
        }
        return out;
      },
    );
  });

  describe("unset", () => {
    test("should generate .js and .d.ts files", async () => {
      const res = await createTestPluginAndRun({
        proto: `syntax="proto3";`,
        parameter: "",
        generateTs,
        generateJs,
        generateDts,
        transpile,
      });
      const gotFiles = res.file.map((f) => f.name).sort();
      expect(gotFiles).toStrictEqual(["test.js", "test.d.ts"].sort());
    });
    test("should call generateJs and generateDts", async () => {
      await createTestPluginAndRun({
        proto: `syntax="proto3";`,
        parameter: "",
        generateTs,
        generateJs,
        generateDts,
        transpile,
      });
      expect(generateTs).toBeCalledTimes(0);
      expect(generateJs).toBeCalledTimes(1);
      expect(generateDts).toBeCalledTimes(1);
      expect(transpile).toBeCalledTimes(0);
    });
  });

  const targetCases = [
    "js",
    "ts",
    "dts",
    "js+ts+dts",
    "js+ts",
    "js+dts",
    "ts+dts",
  ];
  describe.each(targetCases)("targets %s", (targetsJoined) => {
    const targets = targetsJoined.split("+");
    test("should generate expected files", async () => {
      const res = await createTestPluginAndRun({
        proto: `syntax="proto3";`,
        parameter: `target=${targetsJoined}`,
        generateTs,
        generateJs,
        generateDts,
        transpile,
      });
      const gotFiles = res.file.map((f) => f.name).sort();
      const wantFiles = targets
        .map((t) => (t == "dts" ? "test.d.ts" : `test.${t}`))
        .sort();
      expect(gotFiles).toStrictEqual(wantFiles);
    });
    test("should call expected generator functions", async () => {
      await createTestPluginAndRun({
        proto: `syntax="proto3";`,
        parameter: `target=${targetsJoined}`,
        generateTs,
        generateJs,
        generateDts,
        transpile,
      });
      expect(generateTs).toBeCalledTimes(targets.includes("ts") ? 1 : 0);
      expect(generateJs).toBeCalledTimes(targets.includes("js") ? 1 : 0);
      expect(generateDts).toBeCalledTimes(targets.includes("dts") ? 1 : 0);
      expect(transpile).toBeCalledTimes(0);
    });
  });

  const transpileCases = [
    {
      name: "target js+dts but only generateTs defined",
      parameter: "target=js+dts",
      definedGenerators: ["ts"],
      calledGenerators: ["ts"],
      transpileTo: ["js", "dts"],
      expectedFiles: ["test.d.ts", "test.js"],
    },
    {
      name: "target js but only generateTs defined",
      parameter: "target=js",
      definedGenerators: ["ts"],
      calledGenerators: ["ts"],
      transpileTo: ["js"],
      expectedFiles: ["test.js"],
    },
    {
      name: "target dts but only generateTs defined",
      parameter: "target=dts",
      definedGenerators: ["ts"],
      calledGenerators: ["ts"],
      transpileTo: ["dts"],
      expectedFiles: ["test.d.ts"],
    },
    {
      name: "target js+dts but only generateTs and generateJs defined",
      parameter: "target=js+dts",
      definedGenerators: ["ts", "js"],
      calledGenerators: ["ts", "js"],
      transpileTo: ["dts"],
      expectedFiles: ["test.d.ts", "test.js"],
    },
    {
      name: "target js+dts but only generateTs and generateDts defined",
      parameter: "target=js+dts",
      definedGenerators: ["ts", "dts"],
      calledGenerators: ["ts", "dts"],
      transpileTo: ["js"],
      expectedFiles: ["test.d.ts", "test.js"],
    },
  ];
  describe.each(transpileCases)(
    "$name",
    ({
      parameter,
      definedGenerators,
      calledGenerators,
      transpileTo,
      expectedFiles,
    }) => {
      let res: CodeGeneratorResponse;
      beforeEach(
        async () =>
          (res = await createTestPluginAndRun({
            proto: `syntax="proto3";`,
            parameter,
            generateTs,
            generateJs: definedGenerators.includes("js") ? generateJs : undefined, // prettier-ignore
            generateDts: definedGenerators.includes("dts") ? generateDts : undefined, // prettier-ignore
            transpile,
          })),
      );

      test("should call expected generator functions", () => {
        expect(generateTs).toBeCalledTimes(
          calledGenerators.includes("ts") ? 1 : 0,
        );
        expect(generateJs).toBeCalledTimes(calledGenerators.includes("js") ? 1 : 0); // prettier-ignore
        expect(generateDts).toBeCalledTimes(calledGenerators.includes("dts") ? 1 : 0); // prettier-ignore
      });

      test("should call transpile function", () => {
        expect(transpile).toBeCalledTimes(1);
        expect(transpile).toBeCalledWith(
          [
            {
              name: "test.ts",
              content: `const foo = "ts";\n`,
              preamble: undefined,
            },
          ],
          transpileTo.includes("js"), // transpileJs
          transpileTo.includes("dts"), // transpileDts
          "module", // jsImportStyle
        );
      });

      test("should generate expected files", () => {
        const gotFiles = res.file.map((f) => f.name).sort();
        expect(gotFiles).toStrictEqual(expectedFiles);
      });
    },
  );
});
