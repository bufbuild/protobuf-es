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

import { describe, expect, test } from "@jest/globals";
import { compileFile, compileMessage, compileMethod } from "../helpers.js";
import { nestedTypes, parentTypes } from "@bufbuild/protobuf/reflect";

describe("nestedTypes()", () => {
  test("lists nested types", async () => {
    const file = await compileFile(`
      syntax="proto2";
      message A {
        extensions 1 to 2;
        message B {
          optional int32 f = 1;
        }
        enum E {
          E_UNSPECIFIED = 0;
        }
        extend A {
          optional int32 ext = 2;
        }
      }
      service S {
        rpc X(A) returns (A);
      }
      enum E {
       E_UNSPECIFIED = 0;
      }
      extend A {
        optional int32 ext = 1;
      }
    `);
    const nested = Array.from(nestedTypes(file));
    expect(nested.map((d) => d.toString())).toStrictEqual([
      "message A",
      "message A.B",
      "enum A.E",
      "extension A.ext",
      "enum E",
      "service S",
      "extension ext",
    ]);
  });
});

describe("parentTypes()", () => {
  test("lists parents of field", async () => {
    const message = await compileMessage(`
      syntax="proto3";
      message A {
        message B {
          int32 f = 1;
        }
      }
    `);
    const field = message.nestedMessages[0].fields[0];
    const parents = parentTypes(field);
    expect(parents.map((d) => d.toString())).toStrictEqual([
      "message A.B",
      "message A",
      "file input.proto",
    ]);
  });
  test("lists parents of enum value", async () => {
    const message = await compileMessage(`
      syntax="proto3";
      message A {
        enum B {
          B_UNSPECIFIED = 0;
        }
      }
    `);
    const enumValue = message.nestedEnums[0].values[0];
    const parents = parentTypes(enumValue);
    expect(parents.map((d) => d.toString())).toStrictEqual([
      "enum A.B",
      "message A",
      "file input.proto",
    ]);
  });
  test("lists parents of rpc", async () => {
    const method = await compileMethod(`
      syntax="proto3";
      service A {
        rpc B(M) returns (M);
      }
      message M {}
    `);
    const parents = parentTypes(method);
    expect(parents.map((d) => d.toString())).toStrictEqual([
      "service A",
      "file input.proto",
    ]);
  });
  test("lists parents of extension", async () => {
    const message = await compileMessage(`
      syntax="proto2";
      message A {
        message B {
          extend E {
            optional int32 e = 1;
          }
        }
      }
      message E {
        extensions 1 to 1;
      }
    `);
    const ext = message.nestedMessages[0].nestedExtensions[0];
    const parents = parentTypes(ext);
    expect(parents.map((d) => d.toString())).toStrictEqual([
      "message A.B",
      "message A",
      "file input.proto",
    ]);
  });
});
