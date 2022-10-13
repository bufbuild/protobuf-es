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
const ecmascript_1 = require("@bufbuild/protoplugin/ecmascript");
function generateTs(schema) {
    for (const file of schema.files) {
        const f = schema.generateFile(file.name + "_twirp.ts");
        f.preamble(file);
        f.print("import type { JsonValue } from '@bufbuild/protobuf';");
        f.print("import { TwirpClient, TransportOptions } from 'protoc-gen-twirp-es/src/client.js';");
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
                f.print("        const promise = this.request(");
                f.print("            ", (0, ecmascript_1.literalString)(service.typeName), ", ");
                f.print("            ", (0, ecmascript_1.literalString)(method.name), ",");
                f.print('            "application/json",');
                f.print("            request");
                f.print("        );");
                f.print("        return promise.then(async (data) =>");
                f.print("             ", method.output, ".fromJson(data as JsonValue)");
                f.print("        );");
                f.print("    };");
                f.print();
            }
            f.print("}");
        }
    }
}
exports.generateTs = generateTs;
