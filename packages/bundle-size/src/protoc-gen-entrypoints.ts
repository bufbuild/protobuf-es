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
import { DescMessage } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin";
import { files, sizes } from "./constants.js";

runNodeJs(
  createEcmaScriptPlugin({
    name: "protoc-gen-entrypoints",
    version: `v0`,
    generateTs(schema: Schema) {
      const schemaFiles = files.map((want) => {
        const file = schema.files.find((f) => f.proto.name == want.name);
        if (!file) {
          throw new Error(`missing file ${want.name}`);
        }
        const messages: DescMessage[] = [];
        for (const name of want.messages) {
          const message = file.messages.find((m) => m.name === name);
          if (!message) {
            throw new Error(`missing message ${name} in file ${want.name}`);
          }
          messages.push(message);
        }
        return {
          file,
          messages,
        };
      });
      for (const size of sizes) {
        const files = schemaFiles.slice(0, size);
        {
          const f = schema.generateFile(`protobuf-es/entry-${size}.ts`);
          f.print("/* eslint-disable no-console */");
          f.print();
          for (const file of files) {
            f.print("// ", file.file.proto.name);
            for (const message of file.messages) {
              const desc = f.import(
                `${message.name}Desc`,
                `./protobuf-es/${message.file.name}_pb.js`,
              );
              const createCall = [f.runtime.create, "(", desc, ")"];
              const toBinaryCall = [
                f.runtime.toBinary,
                "(",
                desc,
                ", ",
                createCall,
                ")",
              ];
              f.print("console.log(", toBinaryCall, ".length);");
            }
          }
        }
        {
          const f = schema.generateFile(`google-protobuf/entry-${size}.ts`);
          f.print(
            "/* eslint-disable no-console,@typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */",
          );
          f.print();
          for (const file of files) {
            f.print("// ", file.file.proto.name);
            for (const message of file.messages) {
              const ctor = f.import(
                message.name,
                `./google-protobuf/${message.file.name}_pb.js`,
              );
              const serializeBinaryCall = [
                "new ",
                ctor,
                "().serializeBinary()",
              ];
              f.print("console.log(", serializeBinaryCall, ".length);");
            }
          }
        }
      }
    },
  }),
);
