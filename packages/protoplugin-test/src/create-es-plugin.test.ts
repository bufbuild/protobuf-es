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
import type { CodeGeneratorRequest } from "@bufbuild/protobuf";
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

function verifyOutFiles(
  plugin: Plugin,
  fixture: OutFixture,
  req?: CodeGeneratorRequest
) {
  const targets = Object.keys(fixture);
  req =
    req ??
    getCodeGeneratorRequest(`target=${targets.join("+")}`, [
      "proto/address_book.proto",
      "proto/person.proto",
    ]);
  const resp = plugin.run(req);

  // The total expected files is the sum of the lengths of the arrays in the
  // given fixture.
  const totalExpectedFiles = Object.values(fixture).reduce(
    (prev, curr) => prev + curr.length,
    0
  );
  expect(resp.file.length).toEqual(totalExpectedFiles);

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
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
      js: ["proto/person_proto.js", "proto/address_book_proto.js"],
      dts: ["proto/person_proto.dts", "proto/address_book_proto.dts"],
    });
  });
  test("ts+js", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
      js: ["proto/person_proto.js", "proto/address_book_proto.js"],
    });
  });
  test("ts+dts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
      dts: ["proto/person_proto.dts", "proto/address_book_proto.dts"],
    });
  });
  test("ts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
    });
  });
  test("js", () => {
    // Note the TS generator was not run because we only specified js+dts
    // and provided a generator for both, so there was no need for TS files
    verifyOutFiles(protocGenEs, {
      js: ["proto/person_proto.js", "proto/address_book_proto.js"],
    });
  });
  test("dts", () => {
    // Note the TS generator was not run because we only specified js+dts
    // and provided a generator for both, so there was no need for TS files
    verifyOutFiles(protocGenEs, {
      dts: ["proto/person_proto.dts", "proto/address_book_proto.dts"],
    });
  });
  test("js+dts", () => {
    // Note the TS generator was not run because we only specified js+dts
    // and provided a generator for both, so there was no need for TS files
    verifyOutFiles(protocGenEs, {
      js: ["proto/person_proto.js", "proto/address_book_proto.js"],
      dts: ["proto/person_proto.dts", "proto/address_book_proto.dts"],
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
  // In all the tests below, we verify that a declaration file was transpiled
  // based on it having an extension of "d.ts", which is what the transpiler
  // generates.  Our custom generateDts above uses 'dts'.  A better approach
  // would be to use a spy and verify which functions are being called, but
  // Jest currently has an issue with importing the Jest object in TypeScript
  test("all targets", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
      js: ["proto/person_proto.js", "proto/address_book_proto.js"],
      dts: ["proto/person_proto.d.ts", "proto/address_book_proto.d.ts"],
    });
  });
  test("ts+js", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
      js: ["proto/person_proto.js", "proto/address_book_proto.js"],
    });
  });
  test("ts+dts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
      dts: ["proto/person_proto.d.ts", "proto/address_book_proto.d.ts"],
    });
  });
  test("ts", () => {
    verifyOutFiles(protocGenEs, {
      ts: ["proto/person_proto.ts", "proto/address_book_proto.ts"],
    });
  });
  test("js+dts", () => {
    // Note that even though we only requested js+dts, the TS generator
    // ran also because we need it to emit the declaration files.  However,
    // there should be no TS files in the generated output since ts was
    // not specified as a target out.
    verifyOutFiles(protocGenEs, {
      js: ["proto/person_proto.js", "proto/address_book_proto.js"],
      dts: ["proto/person_proto.d.ts", "proto/address_book_proto.d.ts"],
    });
  });
});

describe("only request one file to generate with variant target outs", function () {
  test("all targets with all generators", () => {
    const req = getCodeGeneratorRequest("target=ts+js+dts", [
      "proto/address_book.proto",
    ]);
    const protocGenEs = createEcmaScriptPlugin({
      name: "test-plugin",
      version: "v0.1.0",
      generateTs,
      generateJs,
      generateDts,
    });
    verifyOutFiles(
      protocGenEs,
      {
        ts: ["proto/address_book_proto.ts"],
        js: ["proto/address_book_proto.js"],
        dts: ["proto/address_book_proto.dts"],
      },
      req
    );
  });
  test("all targets with no dts generator", () => {
    const req = getCodeGeneratorRequest("target=ts+js+dts", [
      "proto/address_book.proto",
    ]);
    const protocGenEs = createEcmaScriptPlugin({
      name: "test-plugin",
      version: "v0.1.0",
      generateTs,
      generateJs,
    });
    verifyOutFiles(
      protocGenEs,
      {
        ts: ["proto/address_book_proto.ts"],
        js: ["proto/address_book_proto.js"],
        dts: ["proto/address_book_proto.d.ts"],
      },
      req
    );
  });
  test("all targets with no js or dts generator", () => {
    const req = getCodeGeneratorRequest("target=ts+js+dts", [
      "proto/address_book.proto",
    ]);
    const protocGenEs = createEcmaScriptPlugin({
      name: "test-plugin",
      version: "v0.1.0",
      generateTs,
    });
    verifyOutFiles(
      protocGenEs,
      {
        ts: ["proto/address_book_proto.ts"],
        js: ["proto/address_book_proto.js"],
        dts: ["proto/address_book_proto.d.ts"],
      },
      req
    );
  });
});
