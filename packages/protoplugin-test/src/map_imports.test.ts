// Copyright 2021-2026 Buf Technologies, Inc.
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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

void suite("map_imports", () => {
  void test("example works as documented", async () => {
    const lines = await testGenerate(
      "target=ts,map_imports=google/rpc/:@scope/pkg",
      (f, schema) => {
        const Status = f.importShape(dep(schema).messages[0]);
        const StatusSchema = f.importSchema(dep(schema).messages[0]);
        f.print("export const s: ", Status, " = ", StatusSchema, ";");
      },
    );
    assert.deepStrictEqual(lines, [
      'import type { Status } from "@scope/pkg/google/rpc/status_pb.js";',
      'import { StatusSchema } from "@scope/pkg/google/rpc/status_pb.js";',
      "",
      "export const s: Status = StatusSchema;",
    ]);
  });
  for (const { pattern, matches } of [
    { pattern: "google/rpc/status.proto", matches: true },
    { pattern: "google/rpc/", matches: true },
    { pattern: "google/", matches: true },
    { pattern: "google/rpc/*", matches: true },
    { pattern: "google/rpc/*.proto", matches: true },
    { pattern: "google/rpc/**", matches: true },
    { pattern: "google/**", matches: true },
    { pattern: "**", matches: true },
    { pattern: "**/status.proto", matches: true },
    { pattern: "google/**/status.proto", matches: true },
    { pattern: "**/*.proto", matches: true },
    { pattern: "google/rpc", matches: false },
    { pattern: "google/*", matches: false },
    { pattern: "google/*.proto", matches: false },
    { pattern: "google/rpc/status", matches: false },
    { pattern: "google/rpc/s.atus.proto", matches: false },
    { pattern: "rpc/", matches: false },
    { pattern: "google/rpc/status.proto/", matches: false },
  ]) {
    void test(`pattern "${pattern}" ${matches ? "matches" : "does not match"} google/rpc/status.proto`, async () => {
      const lines = await testGenerate(
        `target=ts,map_imports=${pattern}:@scope/pkg`,
        (f, schema) => {
          f.print(f.importSchema(dep(schema).messages[0]));
        },
      );
      assert.strictEqual(
        lines[0],
        matches
          ? 'import { StatusSchema } from "@scope/pkg/google/rpc/status_pb.js";'
          : 'import { StatusSchema } from "./google/rpc/status_pb";',
      );
    });
  }
  void test("first matching pattern wins", async () => {
    const lines = await testGenerate(
      "target=ts,map_imports=google/rpc/:@first/pkg,map_imports=google/:@second/pkg",
      (f, schema) => {
        f.print(f.importSchema(dep(schema).messages[0]));
      },
    );
    assert.strictEqual(
      lines[0],
      'import { StatusSchema } from "@first/pkg/google/rpc/status_pb.js";',
    );
  });
  void test("maps file descriptor import", async () => {
    const lines = await testGenerate(
      "target=ts,map_imports=google/rpc/:@scope/pkg",
      (f, schema) => {
        f.print(f.importSchema(dep(schema)));
      },
    );
    assert.strictEqual(
      lines[0],
      'import { file_google_rpc_status } from "@scope/pkg/google/rpc/status_pb.js";',
    );
  });
  void test("accepts target with colons", async () => {
    const lines = await testGenerate(
      "target=ts,map_imports=google/rpc/:npm:@scope/pkg",
      (f, schema) => {
        f.print(f.importSchema(dep(schema).messages[0]));
      },
    );
    assert.strictEqual(
      lines[0],
      'import { StatusSchema } from "npm:@scope/pkg/google/rpc/status_pb.js";',
    );
  });
  void test("strips trailing slash from target", async () => {
    const lines = await testGenerate(
      "target=ts,map_imports=google/rpc/:@scope/pkg/",
      (f, schema) => {
        f.print(f.importSchema(dep(schema).messages[0]));
      },
    );
    assert.strictEqual(
      lines[0],
      'import { StatusSchema } from "@scope/pkg/google/rpc/status_pb.js";',
    );
  });
  for (const { option, ext } of [
    { option: "none", ext: "" },
    { option: "js", ext: ".js" },
    { option: "ts", ext: ".ts" },
  ]) {
    void test(`should not apply import_extension=${option} to mapped path`, async () => {
      const lines = await testGenerate(
        `target=ts,import_extension=${option},map_imports=google/rpc/:@scope/pkg`,
        (f, schema) => {
          f.print(f.importSchema(dep(schema).messages[0]));
          f.print(f.importSchema(schema.files[0].messages[0]));
        },
      );
      // The dependency is mapped and keeps the .js extension, because the
      // exports of @scope/pkg are fixed when it is published. The local
      // import gets the extension as usual.
      assert.deepStrictEqual(lines, [
        'import { StatusSchema } from "@scope/pkg/google/rpc/status_pb.js";',
        `import { XSchema } from "./x_pb${ext}";`,
        "",
        "StatusSchema",
        "XSchema",
      ]);
    });
  }
  void test("maps files being generated", async () => {
    // Whether a file is part of the current invocation depends on how the
    // compiler splits work across plugin invocations, so it must not affect
    // the result. Patterns are expected to not match files being generated.
    const lines = await testGenerate(
      "target=ts,map_imports=**:@scope/pkg",
      (f, schema) => {
        f.print(f.importSchema(dep(schema).messages[0]));
        f.print(f.importSchema(schema.files[0].messages[0]));
      },
    );
    assert.deepStrictEqual(lines, [
      'import { StatusSchema } from "@scope/pkg/google/rpc/status_pb.js";',
      'import { XSchema } from "@scope/pkg/x_pb.js";',
      "",
      "StatusSchema",
      "XSchema",
    ]);
  });
  void test("does not map well-known types", async () => {
    const lines = await createTestPluginAndRun({
      proto: {
        "x.proto": `
        syntax="proto3";
        import "google/protobuf/timestamp.proto";
        message X { google.protobuf.Timestamp t = 1; }
        `,
      },
      parameter: "target=ts,map_imports=google/:@scope/pkg",
      generateAny(f, schema) {
        const t = schema.files[0].messages[0].fields[0];
        assert.ok(t.fieldKind === "message");
        f.print(f.importSchema(t.message));
      },
      returnLinesOfFirstFile: true,
    });
    assert.strictEqual(
      lines[0],
      'import { TimestampSchema } from "@bufbuild/protobuf/wkt";',
    );
  });
  void test("does not apply to import paths given as a string", async () => {
    const lines = await testGenerate(
      "target=ts,map_imports=google/rpc/:@scope/pkg",
      (f) => {
        f.print(f.import("StatusSchema", "./google/rpc/status_pb.js"));
      },
    );
    assert.strictEqual(
      lines[0],
      'import { StatusSchema } from "./google/rpc/status_pb";',
    );
  });
  void test("applies before rewrite_imports", async () => {
    const lines = await testGenerate(
      "target=ts,map_imports=google/rpc/:@scope/pkg,rewrite_imports=@scope/pkg/google/rpc/status_pb.js:@other/pkg",
      (f, schema) => {
        f.print(f.importSchema(dep(schema).messages[0]));
      },
    );
    assert.strictEqual(lines[0], 'import { StatusSchema } from "@other/pkg";');
  });
  for (const value of ["google/rpc/", ":@scope/pkg", "google/rpc/:"]) {
    void test(`throws error for "${value}"`, async () => {
      await assert.rejects(
        async () => {
          await testGenerate(`target=ts,map_imports=${value}`, (f) => {
            f.print("x");
          });
        },
        {
          name: "PluginOptionError",
          message: `invalid option "map_imports=${value}": must be in the form of <pattern>:<target>`,
        },
      );
    });
  }
  void test("is available in options", async () => {
    await testGenerate(
      "target=ts,map_imports=google/rpc/:@scope/pkg,map_imports=foo/:@foo/pkg",
      (f, schema) => {
        assert.deepStrictEqual(schema.options.mapImports, [
          { pattern: "google/rpc/", target: "@scope/pkg" },
          { pattern: "foo/", target: "@foo/pkg" },
        ]);
        f.print("x");
      },
    );
  });

  function dep(schema: Schema) {
    const file = schema.allFiles.find(
      (f) => f.proto.name === "google/rpc/status.proto",
    );
    assert.ok(file !== undefined);
    return file;
  }

  async function testGenerate(
    parameter: string,
    gen: (f: GeneratedFile, schema: Schema) => void,
  ) {
    return await createTestPluginAndRun({
      parameter,
      proto: {
        "x.proto": `
        syntax="proto3";
        import "google/rpc/status.proto";
        message X { google.rpc.Status s = 1; }
        `,
        "google/rpc/status.proto": `
        syntax="proto3";
        package google.rpc;
        message Status {}
        `,
      },
      filesToGenerate: ["x.proto"],
      generateAny: gen,
      returnLinesOfFirstFile: true,
    });
  }
});
