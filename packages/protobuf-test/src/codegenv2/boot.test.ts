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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import type { CompileToDescriptorSetOptions } from "upstream-protobuf";
import { UpstreamProtobuf } from "upstream-protobuf";
import { join as joinPath } from "node:path";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { clearField, equals, fromBinary, toBinary } from "@bufbuild/protobuf";
import {
  type DescriptorProto,
  type FileDescriptorProto,
  type EnumDescriptorProto,
  DescriptorProtoSchema,
  FileDescriptorProtoSchema,
  FileDescriptorSetSchema,
  FieldDescriptorProtoSchema,
  FieldOptionsSchema,
  EnumDescriptorProtoSchema,
} from "@bufbuild/protobuf/wkt";
import {
  boot,
  bootFileDescriptorProto,
  createFileDescriptorProtoBoot,
  embedFileDesc,
} from "@bufbuild/protobuf/codegenv2";

void suite("boot()", () => {
  test("hydrates google/protobuf/descriptor.proto", async () => {
    const fileDescriptorProto = await compileGoogleProtobufDescriptorProto();
    const embedded = embedFileDesc(fileDescriptorProto);
    assert.ok(embedded.bootable);

    const bootedFileDesc = boot(embedded.boot());
    assert.ok(bootedFileDesc !== undefined);
  });
});

void suite("createFileDescriptorProtoBoot()", () => {
  test("only accepts google/protobuf/descriptor.proto", async () => {
    const upstreamProtobuf = new UpstreamProtobuf();
    const bytes = await upstreamProtobuf.compileToDescriptorSet(
      {
        "foo.proto": `syntax="proto2";`,
      },
      {
        includeImports: true,
        retainOptions: true,
      },
    );
    const fileDescriptorProto = fromBinary(FileDescriptorSetSchema, bytes)
      .file[0];
    assert.throws(() => createFileDescriptorProtoBoot(fileDescriptorProto));
  });
  test("requires unset source_code_info", async () => {
    const fileDescriptorProto = await compileGoogleProtobufDescriptorProto({
      includeSourceInfo: true,
    });
    assert.throws(() => createFileDescriptorProtoBoot(fileDescriptorProto));
  });
});

void suite("bootFileDescriptorProto()", () => {
  test("keeps all important bits of google/protobuf/descriptor.proto", async () => {
    const compiled = await compileGoogleProtobufDescriptorProto();
    assert.ok(compiled !== undefined);

    const booted = bootFileDescriptorProto(
      createFileDescriptorProtoBoot(compiled),
    );
    stripLikeBoot(compiled);

    const eq = equals(FileDescriptorProtoSchema, compiled, booted);
    assert.strictEqual(eq, true);

    const compiledBytes = toBinary(FileDescriptorProtoSchema, compiled);
    const bootedBytes = toBinary(FileDescriptorProtoSchema, booted);
    assert.deepStrictEqual(bootedBytes, compiledBytes);
  });
  function stripLikeBoot(
    d: FileDescriptorProto | DescriptorProto | EnumDescriptorProto,
  ): void {
    switch (d.$typeName) {
      case "google.protobuf.FileDescriptorProto":
        d.options = undefined;
        d.optionDependency = [];
        d.messageType.forEach(stripLikeBoot);
        d.enumType.forEach(stripLikeBoot);
        break;
      case "google.protobuf.EnumDescriptorProto":
        clearField(d, EnumDescriptorProtoSchema.field.visibility);
        clearField(d, EnumDescriptorProtoSchema.field.reservedRange);
        clearField(d, EnumDescriptorProtoSchema.field.reservedName);
        break;
      case "google.protobuf.DescriptorProto":
        clearField(d, DescriptorProtoSchema.field.visibility);
        clearField(d, DescriptorProtoSchema.field.reservedRange);
        clearField(d, DescriptorProtoSchema.field.reservedName);
        for (const f of d.field) {
          clearField(f, FieldDescriptorProtoSchema.field.jsonName);
          if (f.options) {
            clearField(f.options, FieldOptionsSchema.field.featureSupport);
          }
        }
        for (const e of d.enumType) {
          stripLikeBoot(e);
        }
        for (const n of d.nestedType) {
          stripLikeBoot(n);
        }
        break;
    }
  }
});

async function compileGoogleProtobufDescriptorProto(
  opt?: Pick<CompileToDescriptorSetOptions, "includeSourceInfo">,
) {
  const tempDir = mkdtempSync(".compile-descriptor-set-");
  try {
    const outPath = joinPath(tempDir, "desc.binpb");
    const args = [
      "--descriptor_set_out",
      outPath,
      "--proto_path",
      tempDir,
      "google/protobuf/descriptor.proto",
    ];
    if (opt?.includeSourceInfo) {
      args.unshift("--include_source_info");
    }
    execFileSync("protoc", args, {
      shell: false,
    });
    const fdsBytes = readFileSync(outPath);
    const fds = fromBinary(FileDescriptorSetSchema, fdsBytes);
    assert.ok(fds.file.length == 1);
    return fds.file[0];
  } finally {
    rmSync(tempDir, { recursive: true });
  }
}
