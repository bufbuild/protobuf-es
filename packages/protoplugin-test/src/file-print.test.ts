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
import { protoInt64, ScalarType } from "@bufbuild/protobuf";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin";
import { createImportSymbol } from "@bufbuild/protoplugin";
import { createTestPluginAndRun } from "./helpers.js";

describe("GeneratedFile.print", () => {
  test("should print bigint literals", async () => {
    const lines = await testGenerate((f) => {
      f.print(0n);
      f.print(-9223372036854775808n); // min signed
      f.print(18446744073709551615n); // max unsigned
    });
    expect(lines).toStrictEqual([
      `import { protoInt64 } from "@bufbuild/protobuf";`,
      ``,
      `protoInt64.zero`,
      `protoInt64.parse("-9223372036854775808")`,
      `protoInt64.uParse("18446744073709551615")`,
    ]);
    expect(
      protoInt64.parse("-9223372036854775808") === -9223372036854775808n,
    ).toBeTruthy();
    expect(
      protoInt64.uParse("18446744073709551615") === 18446744073709551615n,
    ).toBeTruthy();
  });

  test("should print number literals", async () => {
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
    expect(lines).toStrictEqual([
      "123 3.145 globalThis.NaN globalThis.Infinity -globalThis.Infinity",
    ]);
  });

  test("should print boolean literals", async () => {
    const lines = await testGenerate((f) => {
      f.print(true);
      f.print(false);
    });
    expect(lines).toStrictEqual(["true", "false"]);
  });

  test("should print Uint8Array literals", async () => {
    const lines = await testGenerate((f) => {
      f.print(new Uint8Array());
      f.print(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
    });
    expect(lines).toStrictEqual([
      `new Uint8Array(0)`,
      `new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF])`,
    ]);
  });

  test(`should print "es_string" Printable`, async () => {
    const lines = await testGenerate((f) => {
      f.print({
        kind: "es_string",
        value: `ab"c`,
      });
    });
    expect(lines).toStrictEqual([`"ab\\"c"`]);
  });

  describe(`should print "es_proto_int64" Printable`, () => {
    test("should honor longAsString", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longAsString: true,
          value: 123n,
        });
      });
      expect(lines).toStrictEqual([`"123"`]);
    });

    test("should honor longAsString for 0", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longAsString: true,
          value: 0n,
        });
      });
      expect(lines).toStrictEqual([`"0"`]);
    });

    test("should honor longAsString for string value", async () => {
      const lines = await testGenerate((f) => {
        f.print({
          kind: "es_proto_int64",
          type: ScalarType.INT64,
          longAsString: true,
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
            longAsString: false,
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
            longAsString: false,
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
            longAsString: false,
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
            longAsString: false,
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

  test("should print import symbol", async function () {
    const lines = await testGenerate((f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp);
    });
    expect(lines).toStrictEqual(['import { Foo } from "bar";', "", "Foo"]);
  });

  test("should print type-only import symbol", async function () {
    const lines = await testGenerate((f) => {
      const imp = createImportSymbol("Foo", "bar");
      f.print(imp.toTypeOnly());
    });
    expect(lines).toStrictEqual(['import type { Foo } from "bar";', "", "Foo"]);
  });

  test("should print import symbol used as type and value", async function () {
    const lines = await testGenerate((f) => {
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
    const lines = await testGenerate((f) => {
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
    const lines = await testGenerate((f) => {
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
    const lines = await testGenerate((f) => {
      f.print(f.runtime.create, "(FooDesc);");
    });
    expect(lines).toStrictEqual([
      'import { create } from "@bufbuild/protobuf";',
      "",
      "create(FooDesc);",
    ]);
  });

  test("should print empty lines", async () => {
    const lines = await testGenerate((f) => {
      f.print(" ");
      f.print("");
      f.print();
    });
    expect(lines).toStrictEqual([" ", "", ""]);
  });

  test("should print multiple printables", async () => {
    const lines = await testGenerate((f) => {
      f.print("a", "b", "c", 1, " ", createImportSymbol("Foo", "bar"));
    });
    expect(lines).toStrictEqual([`import { Foo } from "bar";`, "", "abc1 Foo"]);
  });

  test("should print nested printables", async () => {
    const lines = await testGenerate((f) => {
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
      const lines = await testGenerate((f) => {
        f.print` `;
        f.print``;
      });
      expect(lines).toStrictEqual([" ", ""]);
    });
    test("should print import symbol", async () => {
      const lines = await testGenerate((f) => {
        const imp = createImportSymbol("Foo", "bar");
        f.print`${imp}`;
      });
      expect(lines).toStrictEqual(['import { Foo } from "bar";', "", "Foo"]);
    });
    test("should print real-world import use case", async () => {
      const lines = await testGenerate((f) => {
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
      const lines = await testGenerate((f) => {
        f.print`${"a"}${"b"}${"c"}${1} ${createImportSymbol("Foo", "bar")}`;
      });
      expect(lines).toStrictEqual([
        `import { Foo } from "bar";`,
        "",
        "abc1 Foo",
      ]);
    });
    test("should print nested printables", async () => {
      const lines = await testGenerate((f) => {
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

  async function testGenerate(opt: (f: GeneratedFile, schema: Schema) => void) {
    return createTestPluginAndRun({
      proto: `syntax="proto3";`,
      parameter: "target=ts",
      generateAny: opt,
      returnLinesOfFirstFile: true,
    });
  }
});
