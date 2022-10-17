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

import { MethodKind } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import {
  literalString,
  makeJsDoc,
  localName,
} from "@bufbuild/protoplugin/ecmascript";

// prettier-ignore
export function generateTs(schema: Schema) {
  for (const file of schema.files) {
    const f = schema.generateFile(file.name + "_twirp.ts");
    f.preamble(file);
    f.print("import type { JsonValue, Message } from '@bufbuild/protobuf';");
    f.print();
    for (const service of file.services) {
      const localServiceName = localName(service);
      f.print("export class ", localServiceName, "Client {");
      f.print("    private baseUrl: string = '';");
      f.print();
      f.print("    constructor(url: string) {");
      f.print("        this.baseUrl = url;");
      f.print("    }");
      f.print();
      f.print("    async request<T extends Message<T>>(");
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
            f.print(makeJsDoc(method, "    "));
            f.print("    async ", method.name, "(request: ", method.input, "): Promise<", method.output, "> {");
            f.print("        const promise = this.request(");
            f.print("            ", literalString(service.typeName), ", ");
            f.print("            ", literalString(method.name), ",");
            f.print('            "application/json",');
            f.print("            request");
            f.print("        );");
            f.print("        return promise.then(async (data) =>");
            f.print("             ", method.output, ".fromJson(data as JsonValue)");
            f.print("        );");
        }
      }
      f.print("    }");
    }
    f.print("}");
  }
}
