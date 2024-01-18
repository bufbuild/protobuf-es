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
import { version } from "../package.json";
import { localName, type Schema } from "@bufbuild/protoplugin/ecmascript";
import { getExtension, hasExtension, MethodKind } from "@bufbuild/protobuf";
import { default_host } from "./gen/customoptions/default_host_pb.js";

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
    const {
      Message,
      JsonValue
    } = schema.runtime;
    for (const service of file.services) {
      f.print(f.jsDoc(service));
      f.print(f.exportDecl("class", localName(service) + "Client"), " {");
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
      f.print("    async request<T extends ", Message.toTypeOnly(), "<T>>(");
      f.print("        service: string,");
      f.print("        method: string,");
      f.print("        contentType: string,");
      f.print("        data: T");
      f.print("    ) {");
      f.print("        const headers = new Headers([]);");
      f.print("        headers.set('content-type', contentType);");
      f.print("        const response = await fetch(");
      f.print("            `${this.baseUrl}/${service}/${method}`,");
      f.print("            {");
      f.print("                method: 'POST',");
      f.print("                headers,");
      f.print("                body: data.toJsonString(),");
      f.print("            }");
      f.print("        );");
      f.print("        if (response.status === 200) {");
      f.print("            if (contentType === 'application/json') {");
      f.print("                return await response.json();");
      f.print("            }");
      f.print("            return new Uint8Array(await response.arrayBuffer());");
      f.print("        }");
      f.print("        throw Error(`HTTP ${response.status} ${response.statusText}`)");
      f.print("    }");
      for (const method of service.methods) {
        if (method.methodKind === MethodKind.Unary) {
          f.print();
          f.print(f.jsDoc(method, "    "));
          f.print("    async ", localName(method), "(request: ", method.input, "): Promise<", method.output, "> {");
          f.print("        const promise = this.request(");
          f.print("            ", f.string(service.typeName), ",");
          f.print("            ", f.string(method.name), ",");
          f.print('            "application/json",');
          f.print("            request");
          f.print("        );");
          f.print("        return promise.then(async (data) =>");
          f.print("             ", method.output, ".fromJson(data as ", JsonValue, ")");
          f.print("        );");
          f.print("    }");
        }
      }
      f.print("}");
    }
  }
}

runNodeJs(protocGenTwirpEs);
