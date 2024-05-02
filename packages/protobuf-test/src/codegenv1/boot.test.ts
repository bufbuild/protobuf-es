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

import { describe, expect, test } from "@jest/globals";
import type { CompileToDescriptorSetOptions } from "upstream-protobuf";
import { UpstreamProtobuf } from "upstream-protobuf";
import { join as joinPath } from "node:path";
import { readFileSync } from "fs";
import { clearField, equals, fromBinary, toBinary } from "@bufbuild/protobuf";
import type {
  DescriptorProto,
  FileDescriptorProto,
} from "@bufbuild/protobuf/wkt";
import {
  DescriptorProtoDesc,
  FieldDescriptorProtoDesc,
  FileDescriptorProtoDesc,
  FileDescriptorSetDesc,
  FieldOptionsDesc,
} from "@bufbuild/protobuf/wkt";
import assert from "node:assert";
import {
  bootFileDescriptorProto,
  createFileDescriptorProtoBoot,
  embedFileDesc,
} from "@bufbuild/protobuf/codegenv1";
import { boot } from "@bufbuild/protobuf/codegenv1";

describe("boot()", () => {
  test("hydrates google/protobuf/descriptor.proto", async () => {
    const fileDescriptorProto = await compileGoogleProtobufDescriptorProto();
    const embedded = embedFileDesc(fileDescriptorProto);
    assert(embedded.bootable);

    const bootedFileDesc = boot(embedded.boot());
    expect(bootedFileDesc).toBeDefined();
  });
});

describe("createFileDescriptorProtoBoot()", () => {
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
    const fileDescriptorProto = fromBinary(FileDescriptorSetDesc, bytes)
      .file[0];
    expect(() => createFileDescriptorProtoBoot(fileDescriptorProto)).toThrow();
  });
  test("requires unset source_code_info", async () => {
    const fileDescriptorProto = await compileGoogleProtobufDescriptorProto({
      includeSourceInfo: true,
    });
    expect(() => createFileDescriptorProtoBoot(fileDescriptorProto)).toThrow();
  });
});

describe("bootFileDescriptorProto()", () => {
  test("keeps all important bits of google/protobuf/descriptor.proto", async () => {
    const compiled = await compileGoogleProtobufDescriptorProto();
    expect(compiled).toBeDefined();

    const booted = bootFileDescriptorProto(
      createFileDescriptorProtoBoot(compiled),
    );
    stripLikeBoot(compiled);

    const eq = equals(FileDescriptorProtoDesc, compiled, booted);
    expect(eq).toBe(true);

    const compiledBytes = toBinary(FileDescriptorProtoDesc, compiled);
    const bootedBytes = toBinary(FileDescriptorProtoDesc, booted);
    expect(bootedBytes).toStrictEqual(compiledBytes);
  });
  function stripLikeBoot(d: FileDescriptorProto | DescriptorProto): void {
    if (d.$typeName == "google.protobuf.FileDescriptorProto") {
      d.options = undefined;
      d.messageType.forEach(stripLikeBoot);
      return;
    }
    clearField(DescriptorProtoDesc, d, "reservedRange");
    clearField(DescriptorProtoDesc, d, "reservedName");
    for (const f of d.field) {
      clearField(FieldDescriptorProtoDesc, f, "jsonName");
      if (f.options) {
        clearField(FieldOptionsDesc, f.options, "featureSupport");
      }
    }
    for (const n of d.nestedType) {
      stripLikeBoot(n);
    }
  }
});

async function compileGoogleProtobufDescriptorProto(
  opt?: CompileToDescriptorSetOptions,
): Promise<FileDescriptorProto> {
  const path = "google/protobuf/descriptor.proto";
  const upstream = new UpstreamProtobuf();
  const wktInclude = await upstream.getWktProtoInclude();
  const fdsBytes = await upstream.compileToDescriptorSet(
    {
      [path]: readFileSync(joinPath(wktInclude.dir, path), "utf-8"),
    },
    opt,
  );
  const fds = fromBinary(FileDescriptorSetDesc, fdsBytes);
  assert(fds.file.length == 1);
  const file = fds.file[0];
  assert(file.name == path);
  return file;
}
