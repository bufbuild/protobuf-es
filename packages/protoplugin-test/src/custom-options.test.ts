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
import {
  findCustomEnumOption,
  findCustomMessageOption,
  findCustomScalarOption,
} from "@bufbuild/protoplugin/ecmascript";
import type { DescFile } from "@bufbuild/protobuf";
import { createDescriptorSet, ScalarType } from "@bufbuild/protobuf";
import { UpstreamProtobuf } from "upstream-protobuf";
import { readFileSync } from "node:fs";
import { OptionEnum } from "./gen/option-enum_pb.js";
import { OptionMessage } from "./gen/option-message_pb.js";

describe("custom options", () => {
  describe("findCustomScalarOption on file descriptor", () => {
    test("finds DOUBLE", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        package test;
        extend google.protobuf.FileOptions {
          optional double option = 60123;
        }
        option (test.option) = 3.142;
      `);
      const value = findCustomScalarOption(descFile, 60123, ScalarType.DOUBLE);
      expect(value).toBe(3.142);
    });
    test("finds UINT64", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        package test;
        extend google.protobuf.FileOptions {
          optional uint64 option = 60123;
        }
        option (test.option) = 123456789;
      `);
      const value = findCustomScalarOption(descFile, 60123, ScalarType.UINT64);
      expect(value).toBe(123456789n);
    });
    test("finds STRING", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        package test;
        extend google.protobuf.FileOptions {
          optional string option = 60123;
        }
        option (test.option) = "foo";
      `);
      const value = findCustomScalarOption(descFile, 60123, ScalarType.STRING);
      expect(value).toBe("foo");
    });
    test("finds BOOL", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        package test;
        extend google.protobuf.FileOptions {
          optional bool option = 60123;
        }
        option (test.option) = true;
      `);
      const value = findCustomScalarOption(descFile, 60123, ScalarType.BOOL);
      expect(value).toBe(true);
    });
  });
  describe("findCustomEnumOption on file descriptor", () => {
    test("finds enum", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        import "option-enum.proto";
        package test;
        extend google.protobuf.FileOptions {
          optional test.OptionEnum option = 60123;
        }
        option (test.option) = OPTION_ENUM_A;
      `);
      const value = findCustomEnumOption(descFile, 60123);
      expect(value).toBe(OptionEnum.A);
    });
    test("returns undefined if not set", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        package test;
      `);
      const value = findCustomEnumOption(descFile, 60123);
      expect(value).toBeUndefined();
    });
  });
  describe("findCustomMessageOption on file descriptor", () => {
    test("finds message", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        import "google/protobuf/descriptor.proto";
        import "option-message.proto";
        package test;
        extend google.protobuf.FileOptions {
          optional test.OptionMessage option = 60123;
        }
        option (test.option) = {
          foo: 567,
          bar: "Some string",
          many: ["a", "b", "c"],
        };
      `);
      const value = findCustomMessageOption(descFile, 60123, OptionMessage);
      expect(value).toBeDefined();
      expect(value?.foo).toBe(567);
      expect(value?.bar).toBe("Some string");
      expect(value?.many).toStrictEqual(["a", "b", "c"]);
    });
    test("returns undefined if not set", async () => {
      const descFile = await compileToSet(`
        syntax="proto3";
        package test;
      `);
      const value = findCustomMessageOption(descFile, 60123, OptionMessage);
      expect(value).toBeUndefined();
    });
  });

  async function compileToSet(proto: string): Promise<DescFile> {
    const upstream = new UpstreamProtobuf();
    const setBin = await upstream.compileToDescriptorSet(
      {
        "input.proto": proto,
        "option-enum.proto": readFileSync("proto/option-enum.proto", "utf-8"),
        "option-message.proto": readFileSync(
          "proto/option-message.proto",
          "utf-8",
        ),
      },
      {
        includeImports: true,
        retainOptions: true,
      },
    );
    const set = createDescriptorSet(setBin);
    const file = set.files.find((f) => f.proto.name === "input.proto");
    if (file === undefined) {
      throw new Error("missing file descriptor");
    }
    return file;
  }
});
