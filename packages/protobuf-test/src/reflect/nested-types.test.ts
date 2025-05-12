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
import {
  nestedTypes,
  usedTypes,
  parentTypes,
} from "@bufbuild/protobuf/reflect";

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

describe("usedTypes()", () => {
  test("example", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message Example {
        Msg singular = 1;
        repeated Level list = 2;
      }
      message Msg {}
      enum Level {
        LEVEL_UNSPECIFIED = 0;
      }
    `);
    const message = file.messages[0];
    const used = Array.from(usedTypes(message)).map((desc) => desc.toString());
    expect(used).toStrictEqual(["message Msg", "enum Level"]);
  });
  test("supports message singular, list, map", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message Example {
        Singular singular = 1;
        repeated List list = 2;
        map<int32, Map> map = 3;
      }
      message Singular {}
      message List {}
      message Map {}
    `);
    const message = file.messages[0];
    const used = Array.from(usedTypes(message)).map((desc) => desc.toString());
    expect(used).toStrictEqual([
      "message Singular",
      "message List",
      "message Map",
    ]);
  });
  test("supports enum singular, list, map", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message Example {
        Singular singular = 1;
        repeated List list = 2;
        map<int32, Map> map = 3;
      }
      enum Singular {
        SINGULAR_UNSPECIFIED = 0;
      }
      enum List {
        LIST_UNSPECIFIED = 0;
      }
      enum Map {
        MAP_UNSPECIFIED = 0;
      }
    `);
    const message = file.messages[0];
    const used = Array.from(usedTypes(message)).map((desc) => desc.toString());
    expect(used).toStrictEqual(["enum Singular", "enum List", "enum Map"]);
  });
  test("supports singular, list, map", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message Example {
        MsgSingular singular = 1;
        repeated MsgList list = 2;
        map<int32, MsgMap> map = 3;
      }
      message MsgSingular {}
      message MsgList {}
      message MsgMap {}
    `);
    const message = file.messages[0];
    const used = Array.from(usedTypes(message)).map((desc) => desc.toString());
    expect(used).toStrictEqual([
      "message MsgSingular",
      "message MsgList",
      "message MsgMap",
    ]);
  });
  test("yields a type only once", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message Example {
        Msg singular = 1;
        repeated Msg list = 2;
      }
      message Msg {}
    `);
    const message = file.messages[0];
    const used = Array.from(usedTypes(message)).map((desc) => desc.toString());
    expect(used).toStrictEqual(["message Msg"]);
  });
  test("recurses into messages", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message Example {
        A a = 1;
      }
      message A {
        B b = 1;
      }
      message B {
        C c = 1;
      }
      enum C {
        C_UNSPECIFIED = 0;
      }
    `);
    const message = file.messages[0];
    const used = Array.from(usedTypes(message)).map((desc) => desc.toString());
    expect(used).toStrictEqual(["message A", "message B", "enum C"]);
  });
  test("yields itself", async () => {
    const file = await compileFile(`
      syntax="proto3";
      message Example {
        Example example = 1;
      }
    `);
    const message = file.messages[0];
    const used = Array.from(usedTypes(message)).map((desc) => desc.toString());
    expect(used).toStrictEqual(["message Example"]);
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
    const parents = parentTypes(field).map((desc) => desc.toString());
    expect(parents).toStrictEqual([
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
    const parents = parentTypes(enumValue).map((desc) => desc.toString());
    expect(parents).toStrictEqual([
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
    const parents = parentTypes(method).map((desc) => desc.toString());
    expect(parents).toStrictEqual(["service A", "file input.proto"]);
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
    const parents = parentTypes(ext).map((desc) => desc.toString());
    expect(parents).toStrictEqual([
      "message A.B",
      "message A",
      "file input.proto",
    ]);
  });
});
