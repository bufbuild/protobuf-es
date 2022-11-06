// Copyright 2021-2022 Buf Technologies, Inc.
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

import { transpile } from "./helpers";

describe("print with tagged template literal", function () {
  test("one line with symbol", () => {
    const linesOf = transpile((schema) => {
      const f = schema.generateFile("test.ts");
      const Foo = f.import("Foo", "foo");
      f.print`export function foo(): ${Foo} { return new ${Foo}(); };`;
    });
    expect(linesOf("test.ts")).toStrictEqual([
      'import {Foo} from "foo";',
      "",
      "export function foo(): Foo { return new Foo(); };",
    ]);
  });
  test("multi lines with symbol", () => {
    const linesOf = transpile((schema) => {
      const f = schema.generateFile("test.ts");
      const Foo = f.import("Foo", "foo");
      f.print`export function foo(): ${Foo} {
  return new ${Foo}();
};`;
    });
    expect(linesOf("test.ts")).toStrictEqual([
      'import {Foo} from "foo";',
      "",
      "export function foo(): Foo {",
      "  return new Foo();",
      "};",
    ]);
  });
  test("with empty lines", () => {
    const linesOf = transpile((schema) => {
      const f = schema.generateFile("test.ts");
      const Foo = f.import("Foo", "foo");
      f.print`
export function foo(): ${Foo} {

  return new ${Foo}();
};
`;
    });
    expect(linesOf("test.ts")).toStrictEqual([
      'import {Foo} from "foo";',
      "",
      "",
      "export function foo(): Foo {",
      "",
      "  return new Foo();",
      "};",
    ]);
  });
  test("empty literal", () => {
    const linesOf = transpile((schema) => {
      const f = schema.generateFile("test.ts");
      f.print``;
    });
    expect(linesOf("test.ts")).toStrictEqual([""]);
  });
  test("with only symbol", () => {
    const linesOf = transpile((schema) => {
      const f = schema.generateFile("test.ts");
      const Foo = f.import("Foo", "foo");
      f.print`${Foo}`;
    });
    expect(linesOf("test.ts")).toStrictEqual([
      'import {Foo} from "foo";',
      "",
      "Foo",
    ]);
  });
});
