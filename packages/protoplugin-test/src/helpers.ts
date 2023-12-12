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

import {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
} from "@bufbuild/protobuf";
import type { Plugin } from "@bufbuild/protoplugin";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import type {
  GeneratedFile,
  Schema,
  Target,
} from "@bufbuild/protoplugin/ecmascript";
import { UpstreamProtobuf } from "upstream-protobuf";
import { expect } from "@jest/globals";

const upstream = new UpstreamProtobuf();

type PluginInit = Parameters<typeof createEcmaScriptPlugin>[0];

// prettier-ignore
type CreateTestPluginAndRunOptions<ReturnLinesOfFirstFile extends boolean | undefined> =
  {
    returnLinesOfFirstFile?: ReturnLinesOfFirstFile;
  }
  &
    {
      proto: string | Record<string, string>;
      parameter?: string;
      name?: PluginInit["name"];
      version?: PluginInit["version"];
      parseOption?: PluginInit["parseOption"];
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
  const protoFiles =
    typeof opt.proto == "string" ? { "x.proto": opt.proto } : opt.proto;
  const reqBytes = await upstream.createCodeGeneratorRequest(protoFiles, {
    parameter: opt.parameter,
  });
  const req = CodeGeneratorRequest.fromBinary(reqBytes);
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
