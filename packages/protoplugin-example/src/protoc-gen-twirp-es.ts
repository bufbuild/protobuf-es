#!/usr/bin/env -S npx tsx

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

import { createEcmaScriptPlugin, runNodeJs } from "@bufbuild/protoplugin";
import { type Schema, safeIdentifier } from "@bufbuild/protoplugin/ecmascript";
import { MethodKind } from "@bufbuild/protobuf";
import { localName } from "@bufbuild/protobuf/next/reflect";
import { default_host } from "./gen/customoptions/default_host_pbv2.js";
import { version } from "../package.json";
import { getExtension, hasExtension } from "@bufbuild/protobuf/next";

const protocGenTwirpEs = createEcmaScriptPlugin({
  name: "protoc-gen-twirp-es",
  version: `v${String(version)}`,
  generateTs,
});

// prettier-ignore
function generateTs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_twirp.ts");
    f.preamble(file);
    for (const service of file.services) {
      f.print(f.jsDoc(service));
      f.print(f.exportDecl("class", safeIdentifier(service.name) + "Client"), " {");
      f.print();

      // To support the custom option we defined in customoptions/default_host.proto,
      // we need to generate code for this proto file first. This will generate the
      // file customoptions/default_host_pb.ts, which contains the generated extension
      // `default_host`.
      // Then we use the functions hasExtension() and getExtension() to see whether
      // the option is set, and set the value as the default for the constructor argument.
      if (service.proto.options && hasExtension(service.proto.options, default_host)) {
        const defaultHost = getExtension(service.proto.options, default_host);
        f.print("    constructor(private readonly baseUrl = ", f.string(defaultHost), ") {");
        f.print("    }");
      } else {
        f.print("    constructor(private readonly baseUrl: string) {");
        f.print("    }");
      }
      f.print();
      for (const method of service.methods) {
        if (method.methodKind === MethodKind.Unary) {
          f.print(f.jsDoc(method, "    "));
          const inputType = f.importShape(method.input);
          const inputDesc = f.importDesc(method.input);
          const outputType = f.importShape(method.output);
          const outputDesc = f.importDesc(method.output);
          f.print("    async ", localName(method), "(request: ", inputType, "): Promise<", outputType, "> {");
          f.print("        const headers = new Headers([]);");
          f.print("        headers.set('content-type', 'application/json');");
          f.print("        const fetchResponse = await fetch(");
          f.print("            `${this.baseUrl}/", service.typeName, "/", method.name, "`,");
          f.print("            {");
          f.print("                method: 'POST',");
          f.print("                headers,");
          f.print("                body: ", f.runtime.toJsonString, "(", inputDesc, ", request),");
          f.print("            }");
          f.print("        );");
          f.print("        if (fetchResponse.status !== 200) {");
          f.print("          throw Error(`HTTP ${fetchResponse.status} ${fetchResponse.statusText}`)");
          f.print("        }");
          f.print("        const json = await fetchResponse.json() as ", f.runtime.legacy.JsonValue, ";");
          f.print("        return ", f.runtime.fromJson, "(", outputDesc, ", json);");
          f.print("    }");
        }
      }
      f.print("}");
    }
  }
}

runNodeJs(protocGenTwirpEs);
