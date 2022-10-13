// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import {
  literalString,
  makeJsDoc,
  localName,
} from "@bufbuild/protoplugin/ecmascript";

export function generateTs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_twirp.ts");
    f.preamble(file);
    f.print("export interface TransportOptions {");
    f.print("    baseUrl: string;");
    f.print("    headers: HeadersInit;");
    f.print("};");
    f.print();
    for (const service of file.services) {
      const localServiceName = localName(service);
      f.print(
        "export function create",
        localServiceName,
        "Client(opts: TransportOptions): ",
        localServiceName,
        "Client {"
      );
      f.print("    return new ", localServiceName, "Client(opts);");
      f.print("}");
      f.print();
      f.print("export interface ", localServiceName, " {");
      for (const method of service.methods) {
        f.print(makeJsDoc(method, "    "));
        f.print(
          "    ",
          method.name,
          "(request: ",
          method.input,
          "): ",
          method.output,
          ";"
        );
      }
      f.print("}");
      f.print();
      f.print("export class TwirpClient {");
      f.print(
        "    private readonly options: TransportOptions | undefined = undefined;"
      );
      f.print();
      f.print("    constructor(opts: TransportOptions) {");
      f.print("        this.options = opts;");
      f.print("    }");
      f.print();
      f.print(
        "    async request(service: string, method: string, contentType: string, data) {"
      );
      f.print("        const headers = new Headers(this.options.headers)");
      f.print('        headers.set("content-type", contentType);');
      f.print(
        "        const response = await fetch(`${this.options.baseUrl}/${service}/${method}`, {"
      );
      f.print("            ...this.options,");
      f.print('            method: "POST",');
      f.print("            headers,");
      f.print("            body: data.toJsonString(),");
      f.print("        });");

      f.print("        if (response.status === 200) {");
      f.print("            if (contentType === 'application/json') {");
      f.print("                return await response.json();");
      f.print("            }");
      f.print(
        "            return new Uint8Array(await response.arrayBuffer());"
      );
      f.print("        }");
      f.print();
      f.print("        throw Error(await response.json());");
      f.print("    }");
      f.print("}");
      f.print();
      f.print(
        "export class ",
        localServiceName,
        "Client extends TwirpClient {"
      );
      f.print("    constructor(opts: TransportOptions) {");
      f.print("        super(opts);");
      f.print("    }");
      f.print();
      for (const method of service.methods) {
        f.print(
          "    ",
          method.name,
          "(request: ",
          method.input,
          "): ",
          method.output,
          "{"
        );
        f.print("        const promise = this.request(");
        f.print("            ", literalString(service.typeName), ", ");
        f.print("            ", literalString(method.name), ",");
        f.print('            "application/json",');
        f.print("            request");
        f.print("        );");
        f.print("        return new ", method.output, "();");
        f.print("    };");
      }
      f.print("}");
    }
  }
}
