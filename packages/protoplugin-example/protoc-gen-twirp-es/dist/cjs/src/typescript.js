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

"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTs = void 0;
const protobuf_1 = require("@bufbuild/protobuf");
const ecmascript_1 = require("@bufbuild/protoplugin/ecmascript");
// prettier-ignore
function generateTs(schema) {
    for (const file of schema.files) {
        const f = schema.generateFile(file.name + "_twirp.ts");
        f.preamble(file);
        f.print("import type { JsonValue, Message } from '@bufbuild/protobuf';");
        f.print();
        f.print("export interface TransportOptions {");
        f.print("    baseUrl: string;");
        f.print("    headers?: HeadersInit;");
        f.print("}");
        f.print();
        f.print("class TwirpClient {");
        f.print("    private readonly options: TransportOptions = {");
        f.print("        baseUrl: '',");
        f.print("    };");
        f.print();
        f.print("    constructor(opts: TransportOptions) {");
        f.print("        this.options = opts;");
        f.print("    }");
        f.print();
        f.print("    async request<T extends Message<T>>(");
        f.print("        service: string,");
        f.print("        method: string,");
        f.print("        contentType: string,");
        f.print("        data: T");
        f.print("    ) {");
        f.print("        const headers = new Headers(this.options.headers ?? []);");
        f.print("        headers.set('content-type', contentType);");
        f.print("        const response = await fetch(");
        f.print("            `${this.options.baseUrl}/${service}/${method}`,");
        f.print("            {");
        f.print("                ...this.options,");
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
        f.print("        throw Error(await response.json());");
        f.print("    }");
        f.print("}");
        f.print();
        for (const service of file.services) {
            const localServiceName = (0, ecmascript_1.localName)(service);
            f.print("export function create", localServiceName, "Client(opts: TransportOptions): ", localServiceName, " {");
            f.print("    return new ", localServiceName, "Client(opts);");
            f.print("}");
            f.print();
            f.print("export interface ", localServiceName, " {");
            for (const method of service.methods) {
                f.print((0, ecmascript_1.makeJsDoc)(method, "    "));
                f.print("    ", method.name, "(request: ", method.input, "): Promise<", method.output, ">;");
            }
            f.print("}");
            f.print();
            f.print("export class ", localServiceName, "Client extends TwirpClient {");
            f.print("    constructor(opts: TransportOptions) {");
            f.print("        super(opts);");
            f.print("    }");
            f.print();
            for (const method of service.methods) {
                f.print("    async ", method.name, "(request: ", method.input, "): Promise<", method.output, "> {");
                if (method.methodKind === protobuf_1.MethodKind.Unary) {
                    f.print("        const promise = this.request(");
                    f.print("            ", (0, ecmascript_1.literalString)(service.typeName), ", ");
                    f.print("            ", (0, ecmascript_1.literalString)(method.name), ",");
                    f.print('            "application/json",');
                    f.print("            request");
                    f.print("        );");
                    f.print("        return promise.then(async (data) =>");
                    f.print("             ", method.output, ".fromJson(data as JsonValue)");
                    f.print("        );");
                }
                else {
                    f.print("        throw new Error('", protobuf_1.MethodKind[method.methodKind], " is not supported');");
                }
                f.print("    };");
                f.print();
            }
            f.print("}");
        }
    }
}
exports.generateTs = generateTs;
