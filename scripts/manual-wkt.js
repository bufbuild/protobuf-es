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

import { fromBinary } from "@bufbuild/protobuf";
import { CodeGeneratorRequestSchema } from "@bufbuild/protobuf/wkt";
import { nestedTypes } from "@bufbuild/protobuf/reflect";
import { UpstreamProtobuf } from "upstream-protobuf";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";

/*

Generates a markdown table and reference links for the well-known types for MANUAL.md

Usage: npx node scripts/manual-wkt.js

*/

const upstream = new UpstreamProtobuf();
const wktFiles = [
  "google/protobuf/any.proto",
  "google/protobuf/duration.proto",
  "google/protobuf/timestamp.proto",
  "google/protobuf/wrappers.proto",
  "google/protobuf/struct.proto",
  "google/protobuf/field_mask.proto",
  "google/protobuf/empty.proto",
  "google/protobuf/api.proto",
  "google/protobuf/type.proto",
  "google/protobuf/source_context.proto",
  "google/protobuf/descriptor.proto",
  "google/protobuf/compiler/plugin.proto",
];
const wktImports = wktFiles.map((f) => `import "${f}";`).join("\n");
const request = fromBinary(
  CodeGeneratorRequestSchema,
  await upstream.createCodeGeneratorRequest(
    `syntax = "proto3"; ${wktImports}`,
    { parameter: "target=ts" },
  ),
);

const md = [""];

createEcmaScriptPlugin({
  generateTs(schema) {
    const files = schema.allFiles.filter((f) =>
      wktFiles.includes(f.proto.name),
    );
    md.push("| Protobuf file | Well-known types |");
    md.push("| -------- | ----- |");
    for (const file of files) {
      const types = [];
      for (const type of nestedTypes(file)) {
        if (type.kind == "message" || type.kind == "enum") {
          const name = schema.generateFile("x").importShape(type).name;
          types.push(`${type.kind} [${name}][src/wkt/${name}]<br>`);
        }
      }
      const vpad = types.map(() => "<br>").join("");
      md.push(`| [${file.proto.name}]${vpad} | ${types.join("")} |`);
    }
    md.push("");
    for (const file of files) {
      // [google/protobuf/any.proto]:
      md.push(
        `[${file.proto.name}]: https://github.com/protocolbuffers/protobuf/blob/v${upstream.version()}/src/${file.proto.name}`,
      );
    }
    for (const file of files) {
      for (const type of nestedTypes(file)) {
        // [src-Any]: ./packages/protobuf/src/wkt/gen/...
        if (type.kind == "message" || type.kind == "enum") {
          const name = schema.generateFile("x").importShape(type).name;
          md.push(
            `[src/wkt/${name}]: ./packages/protobuf/src/wkt/gen/${file.name}_pb.ts`,
          );
        }
      }
    }
  },
}).run(request);

process.stdout.write(md.join("\n"));
