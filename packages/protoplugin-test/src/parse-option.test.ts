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
import { CodeGeneratorRequestSchema } from "@bufbuild/protobuf/wkt";
import { create, type MessageInitShape } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";

describe("parse custom plugin option", () => {
  interface Options {
    foo?: number;
    bar: boolean;
    baz: string[];
  }
  const runPlugin = (
    onOptions: (options: Options) => void,
    req: MessageInitShape<typeof CodeGeneratorRequestSchema>,
  ) => {
    const generate = ({ options }: Schema<Options>) => onOptions(options);
    createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      parseOptions(options): Options {
        const parsed: Options = { bar: false, baz: [] };
        for (const { key, value } of options) {
          switch (key) {
            case "foo": {
              const foo = parseInt(value);
              if (isNaN(foo)) {
                throw "please provide an integer for foo";
              }
              parsed.foo = foo;
              break;
            }
            case "bar":
              if (value.length > 0) {
                throw "bar does not take a value";
              }
              parsed.bar = true;
              break;
            case "baz":
              if (value.length == 0) {
                throw "please provide a value";
              }
              parsed.baz.push(value);
              break;
            default:
              throw new Error();
          }
        }
        return parsed;
      },
      generateTs: generate,
      generateJs: generate,
      generateDts: generate,
    }).run(create(CodeGeneratorRequestSchema, req));
  };
  test("parse as expected on the happy path", () => {
    runPlugin(
      (options) => {
        expect(options.foo).toBe(123);
        expect(options.bar).toBe(true);
        expect(options.baz).toStrictEqual(["a", "b"]);
      },
      create(CodeGeneratorRequestSchema, {
        parameter: "foo=123,bar,baz=a,baz=b",
      }),
    );
  });
  test("error from parseOption is wrapped", () => {
    expect(() =>
      runPlugin(() => {}, {
        parameter: "foo=abc",
      }),
    ).toThrowError(
      /^invalid option "foo=abc": please provide an integer for foo$/,
    );
  });
  test("unknown option raises an error", () => {
    expect(() =>
      runPlugin(() => {}, {
        parameter: "unknown",
      }),
    ).toThrowError(/^invalid option "unknown"$/);
  });
  test("unknown option with value raises an error", () => {
    expect(() =>
      runPlugin(() => {}, {
        parameter: "unknown=bar",
      }),
    ).toThrowError(/^invalid option "unknown=bar"$/);
  });
});
