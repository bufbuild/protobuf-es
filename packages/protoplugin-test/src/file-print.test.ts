// Copyright 2021-2023 Buf Technologies, Inc.
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
import { CodeGeneratorRequest } from "@bufbuild/protobuf";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import { createImportSymbol } from "@bufbuild/protoplugin/ecmascript";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { UpstreamProtobuf } from "upstream-protobuf";

describe("file print", () => {
  test("should print bigint literals", async () => {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      f.print(BigInt(123));
      f.print(456n);
    });
    expect(lines).toStrictEqual([
      'import { protoInt64 } from "@bufbuild/protobuf";',
      "",
      `protoInt64.parse("123")`,
      `protoInt64.parse("456")`,
    ]);
  });

  test("should print number literals", async () => {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      f.print(123);
    });
    expect(lines).toStrictEqual(["123"]);
  });

  test("should print boolean literals", async () => {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      f.print(true);
      f.print(false);
    });
    expect(lines).toStrictEqual(["true", "false"]);
  });

  test("should print Uint8Array literals", async () => {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      f.print(new Uint8Array());
      f.print(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
    });
    expect(lines).toStrictEqual([
      `new Uint8Array(0)`,
      `new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF])`,
    ]);
  });

  test("should print import symbol", async function () {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp);
    });
    expect(lines).toStrictEqual(['import { Foo } from "bar";', "", "Foo"]);
  });

  test("should print type-only import symbol", async function () {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp.toTypeOnly());
    });
    expect(lines).toStrictEqual(['import type { Foo } from "bar";', "", "Foo"]);
  });

  test("should print import symbol used as type and value", async function () {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp);
      f.print(imp.toTypeOnly());
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "bar";',
      "",
      "Foo",
      "Foo",
    ]);
  });

  test("should print only one import for the same symbol", async function () {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      const imp = createImportSymbol("Foo", "bar");
      const imp2 = createImportSymbol("Foo", "bar");
      f.print(imp);
      f.print(imp2);
    });
    expect(lines).toStrictEqual([
      'import { Foo } from "bar";',
      "",
      "Foo",
      "Foo",
    ]);
  });

  test("should escape clashing import symbols", async function () {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      const imp = createImportSymbol("Foo", "a");
      const imp2 = createImportSymbol("Foo", "b");
      f.print(imp);
      f.print(imp2);
    });
    expect(lines).toStrictEqual([
      `import { Foo } from "a";`,
      `import { Foo as Foo$1 } from "b";`,
      "",
      "Foo",
      "Foo$1",
    ]);
  });

  test("should escape clashing import symbols with commonjs", async function () {
    const lines = await testGenerate(
      `syntax="proto3";`,
      "target=js,js_import_style=legacy_commonjs",
      (f) => {
        const imp = createImportSymbol("Foo", "a");
        const imp2 = createImportSymbol("Foo", "b");
        f.print(imp);
        f.print(imp2);
      },
    );
    expect(lines).toStrictEqual([
      `"use strict";`,
      `Object.defineProperty(exports, "__esModule", { value: true });`,
      ``,
      `const { Foo } = require("a");`,
      `const { Foo: Foo$1 } = require("b");`,
      ``,
      `Foo`,
      `Foo$1`,
    ]);
  });

  test("should print runtime imports", async () => {
    const lines = await testGenerate(
      `syntax="proto3";`,
      "target=ts",
      (f, schema) => {
        f.print(schema.runtime.ScalarType, ".INT32");
      },
    );
    expect(lines).toStrictEqual([
      'import { ScalarType } from "@bufbuild/protobuf";',
      "",
      "ScalarType.INT32",
    ]);
  });

  test("should print descriptor", async function () {
    const lines = await testGenerate(
      `syntax="proto3";
            message Person {}
            `,
      "target=ts",
      (f, schema) => {
        f.print(schema.files[0].messages[0], ".typeName");
      },
    );
    expect(lines).toStrictEqual([
      'import { Person } from "./x_pb.js";',
      "",
      "Person.typeName",
    ]);
  });

  test("should print empty lines", async () => {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      f.print(" ");
      f.print("");
      f.print();
    });
    expect(lines).toStrictEqual([" ", "", ""]);
  });

  test("should print multiple printables", async () => {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      f.print("a", "b", "c", 1, " ", createImportSymbol("Foo", "bar"));
    });
    expect(lines).toStrictEqual([`import { Foo } from "bar";`, "", "abc1 Foo"]);
  });

  test("should print nested printables", async () => {
    const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
      // prettier-ignore
      f.print("a", ["b", ["c", "d", [1, " ", createImportSymbol("Foo", "bar")]]]);
    });
    expect(lines).toStrictEqual([
      `import { Foo } from "bar";`,
      "",
      "abcd1 Foo",
    ]);
  });

  describe("with tagged template literals", () => {
    test("should print empty lines", async () => {
      const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
        f.print` `;
        f.print``;
      });
      expect(lines).toStrictEqual([" ", ""]);
    });
    test("should print import symbol", async () => {
      const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
        const imp = createImportSymbol("Foo", "bar");
        f.print`${imp}`;
      });
      expect(lines).toStrictEqual(['import { Foo } from "bar";', "", "Foo"]);
    });
    test("should print real-world import use case", async () => {
      const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
        const Foo = createImportSymbol("Foo", "bar");
        f.print`export function foo(): ${Foo.toTypeOnly()} {
  return new ${Foo}();
};`;
      });
      expect(lines).toStrictEqual([
        'import { Foo } from "bar";',
        "",
        "export function foo(): Foo {",
        "  return new Foo();",
        "};",
      ]);
    });
    test("should print multiple printables", async () => {
      const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
        f.print`${"a"}${"b"}${"c"}${1} ${createImportSymbol("Foo", "bar")}`;
      });
      expect(lines).toStrictEqual([
        `import { Foo } from "bar";`,
        "",
        "abc1 Foo",
      ]);
    });
    test("should print nested printables", async () => {
      const lines = await testGenerate(`syntax="proto3";`, "target=ts", (f) => {
        // prettier-ignore
        f.print`${"a"}${["b", ["c", "d", [1, " ", createImportSymbol("Foo", "bar")]]]}`;
      });
      expect(lines).toStrictEqual([
        `import { Foo } from "bar";`,
        "",
        "abcd1 Foo",
      ]);
    });
  });

  async function testGenerate(
    proto: string,
    parameter: string,
    gen: (f: GeneratedFile, schema: Schema) => void,
  ) {
    const plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      generateTs: generateAny,
      generateJs: generateAny,
      generateDts: generateAny,
    });

    function generateAny(schema: Schema) {
      gen(schema.generateFile("test.ts"), schema);
    }

    const upstream = new UpstreamProtobuf();
    const protoFiles = {
      "x.proto": proto,
    };
    const reqBytes = await upstream.createCodeGeneratorRequest(protoFiles, {
      parameter,
    });
    const req = CodeGeneratorRequest.fromBinary(reqBytes);
    const res = plugin.run(req);
    expect(res.file.length).toBeGreaterThanOrEqual(1);
    let content = res.file[0]?.content ?? "";
    if (content.endsWith("\n")) {
      content = content.slice(0, -1); // trim final newline so we don't return an extra line
    }
    return content.split("\n");
  }
});
