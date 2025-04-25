#!/usr/bin/env -S npx tsx

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

import {
  createEcmaScriptPlugin,
  runNodeJs,
  type Schema,
  safeIdentifier,
} from "@bufbuild/protoplugin";
import { getOption, hasOption } from "@bufbuild/protobuf";
import { default_host } from "./gen/customoptions/default_host_pb.js";
import { version } from "../package.json";

const protocGenTwirpEs = createEcmaScriptPlugin({
  name: "protoc-gen-twirp-es",
  version: `v${String(version)}`,
  generateTs,
  parseOptions,
});

// biome-ignore format: want this to read well
function generateTs(schema: Schema<PluginOptions>) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_twirp.ts");
    f.preamble(file);
    for (const service of file.services) {
      f.print(f.jsDoc(service));
      f.print(f.export("class", safeIdentifier(service.name + "Client")), " {");

      // To support the custom option we defined in customoptions/default_host.proto,
      // we need to generate code for this proto file first. This will generate the
      // file customoptions/default_host_pb.ts, which contains the generated option
      // extension `default_host`.
      // Then we use the functions hasOption() and getOption() to see whether the
      // option is set, and set the value as the default for the constructor argument.
      if (hasOption(service, default_host)) {
        const defaultHost = getOption(service, default_host);
        f.print("  constructor(private readonly baseUrl = ", f.string(defaultHost), ") {}");
      } else {
        f.print("  constructor(private readonly baseUrl: string) {}");
      }
      f.print();
      for (const method of service.methods) {
        if (method.methodKind != "unary") {
          // Fetch only supports unary RPCs
          continue;
        }
        f.print(f.jsDoc(method, "  "));
        const inputType = f.importShape(method.input);
        const inputDesc = f.importSchema(method.input);
        const outputType = f.importShape(method.output);
        const outputDesc = f.importSchema(method.output);
        f.print("  async ", method.localName, "(request: ", inputType, "): Promise<", outputType, "> {");
        f.print('    const method = "POST";');
        f.print('    const url = `${this.baseUrl}/', service.typeName, '/', method.name, '`;');
        f.print('    const headers = new Headers({');
        f.print('      "Content-Type": "application/json",');
        f.print('    });');
        f.print('    const body = ', f.runtime.toJsonString, '(', inputDesc, ', request);');
        if (schema.options.logRequests) {
          f.print("    console.log(`${method} ${url}`, request);");
        }
        f.print("    const response = await fetch(url, { method, headers, body });");
        f.print("    if (response.status !== 200) {");
        f.print("      throw Error(`HTTP ${response.status} ${response.statusText}`);");
        f.print("    }");
        f.print("    return ", f.runtime.fromJson, "(", outputDesc, ", await response.json());");
        f.print("  }");
      }
      f.print("}");
    }
  }
}

interface PluginOptions {
  logRequests: boolean;
}

// Our example plugin supports the option "log_requests". We parse it here.
function parseOptions(
  options: {
    key: string;
    value: string;
  }[],
): PluginOptions {
  let logRequests = false;
  for (const { key, value } of options) {
    switch (key) {
      case "log_requests": {
        if (!["true", "false"].includes(value)) {
          throw "please provide true or false";
        }
        logRequests = value === "true";
        break;
      }
      default:
        throw new Error();
    }
  }
  return { logRequests };
}

runNodeJs(protocGenTwirpEs);
