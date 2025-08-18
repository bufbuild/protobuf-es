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

import { suite, test, beforeEach } from "node:test";
import * as assert from "node:assert";
import {
  type DescExtension,
  fromBinary,
  hasExtension,
  getExtension,
  hasOption,
  getOption,
} from "@bufbuild/protobuf";
import {
  type CodeGeneratorRequest,
  CodeGeneratorRequestSchema,
} from "@bufbuild/protobuf/wkt";
import type { Schema } from "@bufbuild/protoplugin";
import { UpstreamProtobuf } from "upstream-protobuf";
import { compileFile, createTestPluginAndRun } from "./helpers.js";

void suite("custom options", () => {
  const proto = `
    syntax = "proto3";
    import "google/protobuf/descriptor.proto";
    option (opt) = 123;
    extend google.protobuf.FileOptions {
      optional uint32 opt = 60123;
    }
  `;
  void test("can be read via extension", async () => {
    const opt = (await compileFile(proto)).extensions[0];
    let value: unknown;
    await createTestPluginAndRun({
      proto: {
        "input.proto": proto,
      },
      generateAny(_, schema) {
        const file = schema.files.find((f) => f.proto.name == "input.proto");
        if (file?.proto.options) {
          value = getExtension(file.proto.options, opt);
        }
      },
    });
    assert.strictEqual(value, 123);
  });
  void test("can be read via getOptions", async () => {
    const opt = (await compileFile(proto)).extensions[0];
    let has = false;
    let value: unknown;
    await createTestPluginAndRun({
      proto: {
        "input.proto": proto,
      },
      generateAny(_, schema) {
        const file = schema.files.find((f) => f.proto.name == "input.proto");
        if (file) {
          has = hasOption(file, opt);
          value = getOption(file, opt);
        }
      },
    });
    assert.strictEqual(has, true);
    assert.strictEqual(value, 123);
  });
});

void suite("option retention", () => {
  const proto = {
    "a.proto": `
      syntax = "proto3";
      import "options.proto";
      import "b.proto";
      option (file_option_retention_unknown) = "a option";
      option (file_option_retention_runtime) = "a runtime option";
      option (file_option_retention_source)  = "a source option";
    `,
    "b.proto": `
      syntax = "proto3";
      import "options.proto";
      option (file_option_retention_unknown) = "b option";
      option (file_option_retention_runtime) = "b runtime option";
      option (file_option_retention_source)  = "b source option";
    `,
    "options.proto": `
      syntax = "proto3";
      import "google/protobuf/descriptor.proto";
      extend google.protobuf.FileOptions {
        optional string file_option_retention_unknown = 70101;
        optional string file_option_retention_runtime = 70102 [retention = RETENTION_RUNTIME];
        optional string file_option_retention_source = 70103 [retention = RETENTION_SOURCE];
      }
    `,
  };
  void suite("CodeGeneratorRequest", () => {
    let req: CodeGeneratorRequest;
    let opt_unknown: DescExtension,
      opt_source: DescExtension,
      opt_runtime: DescExtension;
    beforeEach(async () => {
      const reqBytes = await new UpstreamProtobuf().createCodeGeneratorRequest(
        proto,
        {
          filesToGenerate: ["a.proto"],
        },
      );
      req = fromBinary(CodeGeneratorRequestSchema, reqBytes);
      [opt_unknown, opt_source, opt_runtime] = (
        await compileFile(proto["options.proto"])
      ).extensions;
    });
    void test("includes expected files", () => {
      assert.deepStrictEqual(req.fileToGenerate, ["a.proto"]);
      assert.deepStrictEqual(
        req.protoFile.map((f) => f.name),
        [
          "google/protobuf/descriptor.proto",
          "options.proto",
          "b.proto",
          "a.proto",
        ],
      );
      assert.deepStrictEqual(
        req.sourceFileDescriptors.map((f) => f.name),
        ["a.proto"],
      );
    });
    void test("proto_file elides source retention options for file_to_generate", () => {
      const fileA = req.protoFile.find((f) => f.name == "a.proto");
      assert.ok(fileA?.options);
      assert.strictEqual(hasExtension(fileA.options, opt_unknown), true);
      assert.strictEqual(hasExtension(fileA.options, opt_source), true);
      assert.strictEqual(hasExtension(fileA.options, opt_runtime), false);
    });
    void test("proto_file includes source retention options for files not in file_to_generate", () => {
      const fileB = req.protoFile.find((f) => f.name == "b.proto");
      assert.ok(fileB?.options);
      assert.strictEqual(hasExtension(fileB.options, opt_unknown), true);
      assert.strictEqual(hasExtension(fileB.options, opt_source), true);
      assert.strictEqual(hasExtension(fileB.options, opt_runtime), true);
    });
    void test("source_file_descriptors include source retention options for file_to_generate", () => {
      const fileA = req.sourceFileDescriptors.find((f) => f.name == "a.proto");
      assert.ok(fileA?.options);
      assert.strictEqual(hasExtension(fileA.options, opt_unknown), true);
      assert.strictEqual(hasExtension(fileA.options, opt_source), true);
      assert.strictEqual(hasExtension(fileA.options, opt_runtime), true);
    });
  });
  void suite("protoplugin's Schema", () => {
    let schema: Schema;
    let opt_unknown: DescExtension,
      opt_runtime: DescExtension,
      opt_source: DescExtension;
    beforeEach(async () => {
      await createTestPluginAndRun({
        proto,
        generateAny(_, pluginSchema) {
          schema = pluginSchema;
        },
        filesToGenerate: ["a.proto"],
      });
      [opt_unknown, opt_runtime, opt_source] = (
        await compileFile(proto["options.proto"])
      ).extensions;
    });
    void test("includes expected files", () => {
      assert.deepStrictEqual(
        schema.files.map((f) => f.proto.name),
        ["a.proto"],
      );
      assert.deepStrictEqual(
        schema.allFiles.map((f) => f.proto.name),
        [
          "google/protobuf/descriptor.proto",
          "options.proto",
          "b.proto",
          "a.proto",
        ],
      );
    });
    void test("files include source retention options", () => {
      const file = schema.files.find((f) => f.proto.name == "a.proto");
      assert.ok(file?.proto.options);
      assert.strictEqual(hasExtension(file.proto.options, opt_unknown), true);
      assert.strictEqual(hasExtension(file.proto.options, opt_runtime), true);
      assert.strictEqual(hasExtension(file.proto.options, opt_source), true);
    });
    void test("allFiles include source retention options", () => {
      const file = schema.allFiles.find((f) => f.proto.name == "b.proto");
      assert.ok(file?.proto.options);
      assert.strictEqual(hasExtension(file.proto.options, opt_unknown), true);
      assert.strictEqual(hasExtension(file.proto.options, opt_runtime), true);
      assert.strictEqual(hasExtension(file.proto.options, opt_source), true);
    });
  });
});
