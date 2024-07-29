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

import type {
  CodeGeneratorResponse,
  FileDescriptorSet,
} from "@bufbuild/protobuf/wkt";
import {
  CodeGeneratorRequestSchema,
  FileDescriptorSetSchema,
} from "@bufbuild/protobuf/wkt";
import { fromBinary, createFileRegistry } from "@bufbuild/protobuf";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type {
  GeneratedFile,
  Schema,
  Target,
  Plugin,
} from "@bufbuild/protoplugin";
import { UpstreamProtobuf } from "upstream-protobuf";
import { expect } from "@jest/globals";
import assert from "node:assert";

let upstreamProtobuf: UpstreamProtobuf | undefined;

type PluginInit = Parameters<
  typeof createEcmaScriptPlugin<Record<string, never>>
>[0];

// prettier-ignore
type CreateTestPluginAndRunOptions<ReturnLinesOfFirstFile extends boolean | undefined> =
  {
    returnLinesOfFirstFile?: ReturnLinesOfFirstFile;
  }
  &
  {
    proto: string | Record<string, string>;
    filesToGenerate?: string[];
    parameter?: string;
    name?: PluginInit["name"];
    version?: PluginInit["version"];
    parseOptions?: PluginInit["parseOptions"];
    minimumEdition?: PluginInit["minimumEdition"];
    maximumEdition?: PluginInit["maximumEdition"];
  }
  &
  (
    {
      generateTs: PluginInit["generateTs"];
      generateJs?: PluginInit["generateJs"];
      generateDts?: PluginInit["generateDts"];
      transpile?: PluginInit["transpile"];
    }
    |
    { generateAny: (f: GeneratedFile, schema: Schema, target: Target) => void; }
  );

export async function createTestPluginAndRun(
  opt: CreateTestPluginAndRunOptions<false | undefined>,
): Promise<CodeGeneratorResponse>;
export async function createTestPluginAndRun(
  opt: CreateTestPluginAndRunOptions<true>,
): Promise<string[]>;
export async function createTestPluginAndRun(
  opt: CreateTestPluginAndRunOptions<boolean | undefined>,
) {
  upstreamProtobuf = upstreamProtobuf ?? new UpstreamProtobuf();
  const protoFiles =
    typeof opt.proto == "string" ? { "x.proto": opt.proto } : opt.proto;
  const reqBytes = await upstreamProtobuf.createCodeGeneratorRequest(
    protoFiles,
    opt,
  );
  const req = fromBinary(CodeGeneratorRequestSchema, reqBytes);
  let plugin: Plugin;
  const defaultPluginInit = {
    name: "test",
    version: "v1",
  };
  if ("generateAny" in opt) {
    plugin = createEcmaScriptPlugin({
      ...defaultPluginInit,
      ...opt,
      generateTs: (schema: Schema, target: "ts") => {
        const f = schema.generateFile("test.ts");
        opt.generateAny(f, schema, target);
      },
      generateJs: (schema: Schema, target: "js") => {
        const f = schema.generateFile("test.js");
        opt.generateAny(f, schema, target);
      },
      generateDts: (schema: Schema, target: "dts") => {
        const f = schema.generateFile("test.d.ts");
        opt.generateAny(f, schema, target);
      },
    });
  } else {
    plugin = createEcmaScriptPlugin({
      ...defaultPluginInit,
      ...opt,
    });
  }
  const res = plugin.run(req);
  if (opt.returnLinesOfFirstFile === true) {
    expect(res.file.length).toBeGreaterThanOrEqual(1);
    let content = res.file[0]?.content ?? "";
    if (content.endsWith("\n")) {
      content = content.slice(0, -1); // trim final newline so we don't return an extra line
    }
    return content.split("\n");
  }
  return res;
}

export async function compileFileDescriptorSet(
  files: Record<string, string>,
): Promise<FileDescriptorSet> {
  upstreamProtobuf = upstreamProtobuf ?? new UpstreamProtobuf();
  const bytes = await upstreamProtobuf.compileToDescriptorSet(files, {
    includeImports: true,
  });
  return fromBinary(FileDescriptorSetSchema, bytes);
}

export async function compileFile(proto: string) {
  upstreamProtobuf = upstreamProtobuf ?? new UpstreamProtobuf();
  const bytes = await upstreamProtobuf.compileToDescriptorSet(
    {
      "input.proto": proto,
    },
    {
      includeImports: true,
      retainOptions: true,
      includeSourceInfo: true,
    },
  );
  const fds = fromBinary(FileDescriptorSetSchema, bytes);
  const reg = createFileRegistry(fds);
  const file = reg.getFile("input.proto");
  assert(file);
  return file;
}

export async function compileEnum(proto: string) {
  const file = await compileFile(proto);
  if (file.enums.length != 1) {
    throw new Error(`expected 1 enum, got ${file.enums.length}`);
  }
  return file.enums[0];
}

export async function compileMessage(proto: string) {
  const file = await compileFile(proto);
  if (file.messages.length == 0) {
    throw new Error("missing message");
  }
  return file.messages[0];
}

export async function compileField(proto: string) {
  const message = await compileMessage(proto);
  if (message.fields.length == 0) {
    throw new Error("missing field");
  }
  return message.fields[0];
}
