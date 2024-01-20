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

import { describe, expect, test } from "@jest/globals";
import type { DescEnum } from "@bufbuild/protobuf";
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import { localName, type GeneratedFile, type Schema } from "@bufbuild/protoplugin/ecmascript";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { UpstreamProtobuf } from "upstream-protobuf";

describe("keep_enum_prefix", () => {
  test.each(["js", "ts", "dts"])(
    "strip out prefix enum %p",
    async (target) => {
      const content = await testGenerate(
        `
          // detached syntax comment
          
          // syntax comment
          syntax="proto3";
          
          // detached package comment
          
          // package comment
          package test;

          message M {}

          enum Country {
            COUNTRY_NONE = 0;
            COUNTRY_VN = 1;
            COUNTRY_JP = 2;
          }
          `,
        `target=${target}`);
      
      expect(content).toEqual(`import { Country } from "./x_pb.js";

export enum Country {
  NONE = 0,
  VN = 1,
  JP = 2,
}
`);
    },
  );

  test.each(["js", "ts", "dts"])(
    "keep enum prefix %p",
    async (target) => {
      const content = await testGenerate(
        `syntax="proto3"; message M {} 
          enum Country {
           COUNTRY_NONE = 0;
           COUNTRY_VN = 1;
           COUNTRY_JP = 2;
          }`,
        `target=${target},keep_enum_prefix=true`,
      );
      expect(content).toEqual(`import { Country } from "./x_pb.js";

export enum Country {
  COUNTRY_NONE = 0,
  COUNTRY_VN = 1,
  COUNTRY_JP = 2,
}
`);
    },
  );
});


function generateAny(schema: Schema, target: "js" | "ts" | "dts") {
  const f = schema.generateFile(`test.${target}`);
  const file = schema.files[0];
  file.enums.map((enumeration) => {
    generateEnum(f, enumeration);
  });
}

async function testGenerate(
    protoSource: string,
    parameter: string,
) {

    const upstream = new UpstreamProtobuf();
    const protoFiles = {
      "x.proto": protoSource,
    };
    const req = CodeGeneratorRequest.fromBinary(
      await upstream.createCodeGeneratorRequest(protoFiles, {
        parameter,
      })
    );

    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs: generateAny,
      generateJs: generateAny,
      generateDts: generateAny,
    });

    const res = plugin.run(req);

    const content: string =res.file[0]?.content ?? "";
    return content
}

function generateEnum(f: GeneratedFile, enumeration: DescEnum) {
  f.print("export enum ", enumeration, " {");
  for (const value of enumeration.values) {
    f.print("  ", localName(value), " = ", value.number, ",");
  }
  f.print("}");
}