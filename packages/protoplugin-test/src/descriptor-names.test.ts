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
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fromBinary, toBinary } from "@bufbuild/protobuf";
import {
  type CodeGeneratorRequest,
  CodeGeneratorRequestSchema,
  type FileDescriptorProto,
} from "@bufbuild/protobuf/wkt";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { UpstreamProtobuf } from "upstream-protobuf";

void suite("descriptor names in the request", () => {
  // Compilers only produce identifiers, but a CodeGeneratorRequest can be
  // crafted by hand, and plugins print these names in generated code.
  const proto = `
    syntax = "proto3";
    package demo;
    message Msg {
      int32 field = 1;
      oneof kind { int32 choice = 2; }
      message Nested {}
      enum NestedEnum { NESTED_ZERO = 0; }
    }
    enum Enum { ZERO = 0; }
    service Svc { rpc Method(Msg) returns (Msg); }
  `;
  const proto2 = `
    syntax = "proto2";
    package demo;
    message Ext { extensions 1 to 10; }
    extend Ext { optional int32 ext = 1; }
  `;
  const invalid = `X = 1; globalThis["injected"] = 1; export const Y`;

  const cases: [
    label: string,
    kind: string,
    source: string,
    rename: (f: FileDescriptorProto) => void,
  ][] = [
    [
      "message",
      "message",
      proto,
      (f) => {
        f.messageType[0].name = invalid;
      },
    ],
    [
      "nested message",
      "message",
      proto,
      (f) => {
        f.messageType[0].nestedType[0].name = invalid;
      },
    ],
    [
      "field",
      "field",
      proto,
      (f) => {
        f.messageType[0].field[0].name = invalid;
      },
    ],
    [
      "oneof",
      "oneof",
      proto,
      (f) => {
        f.messageType[0].oneofDecl[0].name = invalid;
      },
    ],
    [
      "enum",
      "enum",
      proto,
      (f) => {
        f.enumType[0].name = invalid;
      },
    ],
    [
      "nested enum",
      "enum",
      proto,
      (f) => {
        f.messageType[0].enumType[0].name = invalid;
      },
    ],
    [
      "enum value",
      "enum value",
      proto,
      (f) => {
        f.enumType[0].value[0].name = invalid;
      },
    ],
    [
      "service",
      "service",
      proto,
      (f) => {
        f.service[0].name = invalid;
      },
    ],
    [
      "method",
      "method",
      proto,
      (f) => {
        f.service[0].method[0].name = invalid;
      },
    ],
    [
      "extension",
      "extension",
      proto2,
      (f) => {
        f.extension[0].name = invalid;
      },
    ],
  ];
  for (const [label, kind, source, rename] of cases) {
    void test(`rejects an invalid ${label} name`, async () => {
      const req = await createRequest(source);
      for (const f of [...req.protoFile, ...req.sourceFileDescriptors]) {
        rename(f);
      }
      assert.throws(
        () => runPlugin(req),
        new RegExp(`^Error: x\\.proto: invalid ${kind} name "X = 1;`),
      );
    });
  }

  void test("rejects an invalid nested extension name", async () => {
    const req = await createRequest(`
      syntax = "proto2";
      message Ext { extensions 1 to 10; }
      message Scope { extend Ext { optional int32 ext = 1; } }
    `);
    for (const f of [...req.protoFile, ...req.sourceFileDescriptors]) {
      f.messageType[1].extension[0].name = invalid;
    }
    assert.throws(() => runPlugin(req), /invalid extension name/);
  });

  void test("rejects invalid names in dependencies", async () => {
    const upstream = new UpstreamProtobuf();
    const req = fromBinary(
      CodeGeneratorRequestSchema,
      await upstream.createCodeGeneratorRequest(
        {
          "dep.proto": `syntax = "proto3"; message Dep {}`,
          "x.proto": `syntax = "proto3"; import "dep.proto"; message M { Dep d = 1; }`,
        },
        { parameter: "target=ts", filesToGenerate: ["x.proto"] },
      ),
    );
    const dep = req.protoFile.find((f) => f.name === "dep.proto");
    assert.ok(dep !== undefined);
    dep.messageType[0].name = invalid;
    assert.throws(() => runPlugin(req), /dep\.proto: invalid message name/);
  });

  // Code is generated from source_file_descriptors, but protoc-gen-es embeds
  // the proto_file copy of the same file, so both copies must be valid.
  void test("rejects invalid names in proto_file that source_file_descriptors replaces", async () => {
    const req = await createRequest(proto);
    assert.strictEqual(req.sourceFileDescriptors.length, 1);
    req.protoFile[0].messageType[0].name = invalid;
    assert.throws(() => runPlugin(req), /x\.proto: invalid message name/);
  });

  void test("rejects invalid names in source_file_descriptors", async () => {
    const req = await createRequest(proto);
    req.sourceFileDescriptors[0].messageType[0].name = invalid;
    assert.throws(() => runPlugin(req), /x\.proto: invalid message name/);
  });

  void test("accepts names produced by a compiler", async () => {
    const req = await createRequest(`
      syntax = "proto2";
      package _a.b_1;
      message _Msg {
        optional group Group = 1 { optional int32 a = 2; }
        map<string, int32> map_field = 3;
        oneof _kind { int32 x_1 = 4; }
        extensions 100 to 200;
      }
      extend _Msg { optional int32 ext = 100; }
      enum E { E_ZERO = 0; }
      service S { rpc M(_Msg) returns (_Msg); }
    `);
    assert.doesNotThrow(() => runPlugin(req));
  });

  // The language spec forbids a leading digit, but protoc's descriptor check
  // allows it, so only a hand-crafted request contains such a name.
  void test("accepts a name with a leading digit", async () => {
    const req = await createRequest(`syntax = "proto3"; message Msg {}`);
    for (const f of [...req.protoFile, ...req.sourceFileDescriptors]) {
      f.messageType[0].name = "1Msg";
    }
    assert.doesNotThrow(() => runPlugin(req));
  });

  void suite("protoc-gen-es", () => {
    const protocGenEsBin = createRequire(import.meta.url).resolve(
      "@bufbuild/protoc-gen-es/bin/protoc-gen-es",
    );

    function runProtocGenEs(req: CodeGeneratorRequest) {
      return execFileSync(protocGenEsBin, {
        input: toBinary(CodeGeneratorRequestSchema, req),
        stdio: "pipe",
      });
    }

    void test("protoc rejects a service name that is not an identifier", async () => {
      await assert.rejects(
        createRequest(`syntax = "proto3"; service "A=1;B" {}`),
      );
    });

    void test("rejects code injected through a service name", async () => {
      const req = await createRequest(
        `syntax = "proto3"; package demo; service Svc {}`,
      );
      for (const f of [...req.protoFile, ...req.sourceFileDescriptors]) {
        // Dots are replaced with underscores, so the payload avoids them.
        f.service[0].name = `Svc = 1; globalThis["PWNED_F8"] = 1; export const Svc2`;
      }
      assert.throws(
        () => runProtocGenEs(req),
        /x\.proto: invalid service name/,
      );
    });

    void test("rejects code injected through a message name", async () => {
      const req = await createRequest(
        `syntax = "proto3"; package demo; message Msg {}`,
      );
      for (const f of [...req.protoFile, ...req.sourceFileDescriptors]) {
        f.messageType[0].name = `M = 1; globalThis["PWNED_F8_MSG"] = 1; export const N`;
      }
      assert.throws(
        () => runProtocGenEs(req),
        /x\.proto: invalid message name/,
      );
    });
  });

  async function createRequest(source: string): Promise<CodeGeneratorRequest> {
    const bytes = await new UpstreamProtobuf().createCodeGeneratorRequest(
      { "x.proto": source },
      { parameter: "target=ts" },
    );
    return fromBinary(CodeGeneratorRequestSchema, bytes);
  }

  function runPlugin(req: CodeGeneratorRequest) {
    return createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs(schema) {
        for (const file of schema.files) {
          schema.generateFile(file.name + "_pb.ts").print("export {};");
        }
      },
    }).run(req);
  }
});
