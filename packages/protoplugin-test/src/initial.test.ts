// Copyright 2021-2022 Buf Technologies, Inc.
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

import { getCodeGeneratorRequest } from "./helpers.js";
import { createEcmaScriptPlugin, Plugin } from "@bufbuild/protoplugin";
import type { Schema, Target } from "@bufbuild/protoplugin/ecmascript";
import { makeJsDoc } from "@bufbuild/protoplugin/ecmascript";

type OutFixture = {
  [key in Target as string]: string[];
};

function generateFile(schema: Schema, extension: string) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + extension);
    f.preamble(file);
    for (const enumeration of file.enums) {
      f.print(makeJsDoc(enumeration));
    }
    f.print('const test = "test"');
  }
}

function generateTs(schema: Schema) {
  generateFile(schema, "_proto.ts");
}

function generateJs(schema: Schema) {
  generateFile(schema, "_proto.js");
}

function generateDts(schema: Schema) {
  generateFile(schema, "_proto.dts");
}

function verifyOutFiles(plugin: Plugin, fixture: OutFixture) {
  const targets = Object.keys(fixture);
  const req = getCodeGeneratorRequest(`target=${targets.join("+")}`);
  const resp = plugin.run(req);

  expect(resp.file.length).toEqual(targets.length);
  targets.forEach((target) => {
    const expectedFiles = fixture[target];
    expectedFiles.forEach((file) => {
      expect(resp.file.findIndex((e) => e.name === file)).toBeGreaterThan(-1);
    });
  });
}

describe("all generators with variant target outs", function () {
  let protocGenEs: Plugin;
  beforeEach(() => {
    protocGenEs = createEcmaScriptPlugin({
      name: "test-plugin",
      version: "v0.1.0",
      generateTs,
      generateJs,
      generateDts,
    });
  });
  test("all targets", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
      js: ["proto/test_proto.js"],
      dts: ["proto/test_proto.dts"],
    });
  });
  test("ts+js", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
      js: ["proto/test_proto.js"],
    });
  });
  test("ts+dts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
      dts: ["proto/test_proto.dts"],
    });
  });
  test("ts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
    });
  });
  test("js+dts", () => {
    verifyOutFiles(protocGenEs, {
      js: ["proto/test_proto.js"],
      dts: ["proto/test_proto.dts"],
    });
  });
});

describe("no declaration generator with variant target outs", function () {
  let protocGenEs: Plugin;
  beforeEach(() => {
    protocGenEs = createEcmaScriptPlugin({
      name: "test-plugin",
      version: "v0.1.0",
      generateTs,
      generateJs,
    });
  });
  test("all targets", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
      js: ["proto/test_proto.js"],
      dts: ["proto/test_proto.d.ts"],
    });
  });
  test("ts+js", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
      js: ["proto/test_proto.js"],
    });
  });
  test("ts+dts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
      dts: ["proto/test_proto.d.ts"],
    });
  });
  test("ts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
    });
  });
  test("js+dts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/test_proto.ts"],
      js: ["proto/test_proto.js"],
      dts: ["proto/test_proto.d.ts"],
    });
  });
});
