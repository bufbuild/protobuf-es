// Copyright 2021-2026 Buf Technologies, Inc.
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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import { protoInt64, ScalarType } from "@bufbuild/protobuf";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin";
import { createImportSymbol } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

void suite("GeneratedFile.print", () => {
  void test("should print bigint literals", async () => {
    const lines = await testGenerate((f) => {
      f.print(0n);
      f.print(-9223372036854775808n); // min signed
      f.print(18446744073709551615n); // max unsigned
    });
    assert.deepStrictEqual(lines, [
      `import { protoInt64 } from "@bufbuild/protobuf";`,
      "",
      "protoInt64.zero",
      `protoInt64.parse("-9223372036854775808")`,
      `protoInt64.uParse("18446744073709551615")`,
    ]);
    assert.ok(
      protoInt64.parse("-9223372036854775808") === -9223372036854775808n,
    );
    assert.ok(
      protoInt64.uParse("18446744073709551615") === 18446744073709551615n,
    );
  });

  void test("should print number literals", async () => {
    const lines = await testGenerate((f) => {
      f.print(
        123,
        " ",
        3.145,
        " ",
        Number.NaN,
        " ",
        Number.POSITIVE_INFINITY,
        " ",
        Number.NEGATIVE_INFINITY,
      );
    });
    assert.deepStrictEqual(lines, [
      "123 3.145 globalThis.NaN globalThis.Infinity -globalThis.Infinity",
    ]);
  });

  void test("should print boolean literals", async () => {
    const lines = await testGenerate((f) => {
      f.print(true);
      f.print(false);
    });
    assert.deepStrictEqual(lines, ["true", "false"]);
  });

  void test("should print Uint8Array literals", async () => {
    const lines = await testGenerate((f) => {
      f.print(new Uint8Array());
      f.print(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
    });
    assert.deepStrictEqual(lines, [
      "new Uint8Array(0)",
      "new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF])",
    ]);
  });

  test(`should print "es_string" Printable`, async () => {
    const lines = await testGenerate((f) => {
      f.print({
        kind: "es_string",
        value: `ab"c`,
      });
    });
    assert.deepStrictEqual(lines, [`"ab\\"c"`]);
  });

  void suite(`should print "es_proto_int64" Printable`, () => {
    void test("should honor longAsString", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longAsString: true,
          value: 123n,
        });
      });
      assert.deepStrictEqual(lines, [`"123"`]);
    });

    void test("should honor longAsString for 0", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longAsString: true,
          value: 0n,
        });
      });
      assert.deepStrictEqual(lines, [`"0"`]);
    });

    void test("should honor longAsString for string value", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longAsString: true,
          value: "123",
        });
      });
      assert.deepStrictEqual(lines, [`"123"`]);
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
            longAsString: false,
            value: 0n,
          });
        });
        assert.deepStrictEqual(lines, [
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          "",
          "protoInt64.zero",
        ]);
      });
      test(`should use protoInt64.parse for ${ScalarType[t]}`, async () => {
        const lines = await testGenerate((f) => {
          f.print({
            kind: "es_proto_int64",
            type: t,
            longAsString: false,
            value: 123n,
          });
        });
        assert.deepStrictEqual(lines, [
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          "",
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
            longAsString: false,
            value: 0n,
          });
        });
        assert.deepStrictEqual(lines, [
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          "",
          "protoInt64.zero",
        ]);
      });
      test(`should use protoInt64.uParse for ${ScalarType[t]}`, async () => {
        const lines = await testGenerate((f) => {
          f.print({
            kind: "es_proto_int64",
            type: t,
            longAsString: false,
            value: 123n,
          });
        });
        assert.deepStrictEqual(lines, [
          `import { protoInt64 } from "@bufbuild/protobuf";`,
          "",
          `protoInt64.uParse("123")`,
        ]);
      });
    }
  });

  void test("should print import symbol", async () => {
    const lines = await testGenerate((f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp);
    });
    assert.deepStrictEqual(lines, ['import { Foo } from "bar";', "", "Foo"]);
  });

  void test("should print type-only import symbol", async () => {
    const lines = await testGenerate((f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp.toTypeOnly());
    });
    assert.deepStrictEqual(lines, [
      'import type { Foo } from "bar";',
      "",
      "Foo",
    ]);
  });

  void test("should print import symbol used as type and value", async () => {
    const lines = await testGenerate((f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp);
      f.print(imp.toTypeOnly());
    });
    assert.deepStrictEqual(lines, [
      'import { Foo } from "bar";',
      "",
      "Foo",
      "Foo",
    ]);
  });

  void test("should print only one import for the same symbol", async () => {
    const lines = await testGenerate((f) => {
      const imp = createImportSymbol("Foo", "bar");
      const imp2 = createImportSymbol("Foo", "bar");
      f.print(imp);
      f.print(imp2);
    });
    assert.deepStrictEqual(lines, [
      'import { Foo } from "bar";',
      "",
      "Foo",
      "Foo",
    ]);
  });

  void test("should escape clashing import symbols", async () => {
    const lines = await testGenerate((f) => {
      const imp = createImportSymbol("Foo", "a");
      const imp2 = createImportSymbol("Foo", "b");
      f.print(imp);
      f.print(imp2);
    });
    assert.deepStrictEqual(lines, [
      `import { Foo } from "a";`,
      `import { Foo as Foo$1 } from "b";`,
      "",
      "Foo",
      "Foo$1",
    ]);
  });

  void test("should escape clashing import symbols with commonjs", async () => {
    const lines = await createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=js,js_import_style=legacy_commonjs",
      generateAny(f) {
        const imp = createImportSymbol("Foo", "a");
        const imp2 = createImportSymbol("Foo", "b");
        f.print(imp);
        f.print(imp2);
      },
      returnLinesOfFirstFile: true,
    });
    assert.deepStrictEqual(lines, [
      `"use strict";`,
      `Object.defineProperty(exports, "__esModule", { value: true });`,
      "",
      `const { Foo } = require("a");`,
      `const { Foo: Foo$1 } = require("b");`,
      "",
      "Foo",
      "Foo$1",
    ]);
  });

  void test("should print runtime imports", async () => {
    const lines = await testGenerate((f) => {
      f.print(f.runtime.create, "(FooDesc);");
    });
    assert.deepStrictEqual(lines, [
      'import { create } from "@bufbuild/protobuf";',
      "",
      "create(FooDesc);",
    ]);
  });

  void test("should print empty lines", async () => {
    const lines = await testGenerate((f) => {
      f.print(" ");
      f.print("");
      f.print();
    });
    assert.deepStrictEqual(lines, [" ", "", ""]);
  });

  void test("should print multiple printables", async () => {
    const lines = await testGenerate((f) => {
      f.print("a", "b", "c", 1, " ", createImportSymbol("Foo", "bar"));
    });
    assert.deepStrictEqual(lines, [
      `import { Foo } from "bar";`,
      "",
      "abc1 Foo",
    ]);
  });

  void test("should print nested printables", async () => {
    const lines = await testGenerate((f) => {
      // biome-ignore format: want this to read well
      f.print("a", ["b", ["c", "d", [1, " ", createImportSymbol("Foo", "bar")]]]);
    });
    assert.deepStrictEqual(lines, [
      `import { Foo } from "bar";`,
      "",
      "abcd1 Foo",
    ]);
  });

  void suite("with tagged template literals", () => {
    void test("should print empty lines", async () => {
      const lines = await testGenerate((f) => {
        f.print` `;
        f.print``;
      });
      assert.deepStrictEqual(lines, [" ", ""]);
    });
    void test("should print import symbol", async () => {
      const lines = await testGenerate((f) => {
        const imp = createImportSymbol("Foo", "bar");
        f.print`${imp}`;
      });
      assert.deepStrictEqual(lines, ['import { Foo } from "bar";', "", "Foo"]);
    });
    void test("should print real-world import use case", async () => {
      const lines = await testGenerate((f) => {
        const Foo = createImportSymbol("Foo", "bar");
        f.print`export function foo(): ${Foo.toTypeOnly()} {
  return new ${Foo}();
};`;
      });
      assert.deepStrictEqual(lines, [
        'import { Foo } from "bar";',
        "",
        "export function foo(): Foo {",
        "  return new Foo();",
        "};",
      ]);
    });
    void test("should print multiple printables", async () => {
      const lines = await testGenerate((f) => {
        f.print`${"a"}${"b"}${"c"}${1} ${createImportSymbol("Foo", "bar")}`;
      });
      assert.deepStrictEqual(lines, [
        `import { Foo } from "bar";`,
        "",
        "abc1 Foo",
      ]);
    });
    void test("should print nested printables", async () => {
      const lines = await testGenerate((f) => {
        // biome-ignore format: want this to read well
        f.print`${"a"}${["b", ["c", "d", [1, " ", createImportSymbol("Foo", "bar")]]]}`;
      });
      assert.deepStrictEqual(lines, [
        `import { Foo } from "bar";`,
        "",
        "abcd1 Foo",
      ]);
    });
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
