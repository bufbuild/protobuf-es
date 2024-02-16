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
import { createTestPluginAndRun } from "./helpers.js";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import { LongType, ScalarType } from "@bufbuild/protobuf";

describe("file print", () => {
  describe(`"es_proto_int64`, () => {
    test("should honor LongType.STRING", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longType: LongType.STRING,
          value: 123n,
        });
      });
      expect(lines).toStrictEqual([`"123"`]);
    });

    test("should honor LongType.STRING for 0", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longType: LongType.STRING,
          value: 0n,
        });
      });
      expect(lines).toStrictEqual([`"0"`]);
    });

    test("should honor LongType.STRING for string value", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longType: LongType.STRING,
          value: "123",
        });
      });
      expect(lines).toStrictEqual([`"123"`]);
    });

    const signedTypes = [
      ScalarType.INT64,
      ScalarType.SINT64,
      ScalarType.SFIXED64,
    ] as const;
    for (const t of signedTypes) {
      test(`should use protoInt64.zero for ${ScalarType[t]}`, async () => {
        const lines = await testGenerate((f) => {
          f.print({
            kind: "es_proto_int64",
            type: t,
            longType: LongType.BIGINT,
            value: 0n,
          });
        });
        expect(lines).toStrictEqual([
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          ``,
          `protoInt64.zero`,
        ]);
      });
      test(`should use protoInt64.parse for ${ScalarType[t]}`, async () => {
        const lines = await testGenerate((f) => {
          f.print({
            kind: "es_proto_int64",
            type: t,
            longType: LongType.BIGINT,
            value: 123n,
          });
        });
        expect(lines).toStrictEqual([
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          ``,
          `protoInt64.parse("123")`,
        ]);
      });
    }

    const unsignedTypes = [ScalarType.UINT64, ScalarType.FIXED64] as const;
    for (const t of unsignedTypes) {
      test(`should use protoInt64.zero for ${ScalarType[t]}`, async () => {
        const lines = await testGenerate((f) => {
          f.print({
            kind: "es_proto_int64",
            type: t,
            longType: LongType.BIGINT,
            value: 0n,
          });
        });
        expect(lines).toStrictEqual([
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          ``,
          `protoInt64.zero`,
        ]);
      });
      test(`should use protoInt64.uParse for ${ScalarType[t]}`, async () => {
        const lines = await testGenerate((f) => {
          f.print({
            kind: "es_proto_int64",
            type: t,
            longType: LongType.BIGINT,
            value: 123n,
          });
        });
        expect(lines).toStrictEqual([
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          ``,
          `protoInt64.uParse("123")`,
        ]);
      });
    }
  });

  async function testGenerate(opt: (f: GeneratedFile, schema: Schema) => void) {
    return createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny: opt,
      returnLinesOfFirstFile: true,
    });
  }
});
