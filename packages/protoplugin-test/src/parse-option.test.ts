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

import { beforeEach, describe, expect, test } from "@jest/globals";
import { CodeGeneratorRequestDesc } from "@bufbuild/protobuf/next/wkt";
import { create } from "@bufbuild/protobuf/next";
import type { Plugin } from "@bufbuild/protoplugin";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";

describe("parse custom plugin option", () => {
  let foo: number | undefined;
  let bar = false;
  let baz: string[] = [];
  let plugin: Plugin;
  beforeEach(() => {
    foo = undefined;
    bar = false;
    baz = [];
    const noop = () => {
      //
    };
    plugin = createEcmaScriptPlugin({
      name: "test",
      version: "v1",
      parseOption(key, value) {
        switch (key) {
          case "foo":
            foo = parseInt(value);
            if (isNaN(foo)) {
              throw "please provide an integer for foo";
            }
            break;
          case "bar":
            if (value.length > 0) {
              throw "bar does not take a value";
            }
            bar = true;
            break;
          case "baz":
            if (value.length == 0) {
              throw "please provide a value";
            }
            baz.push(value);
            break;
          default:
            throw new Error();
        }
      },
      generateTs: noop,
      generateJs: noop,
      generateDts: noop,
    });
  });
  test("parse as expected on the happy path", () => {
    plugin.run(
      create(CodeGeneratorRequestDesc, {
        parameter: "foo=123,bar,baz=a,baz=b",
      }),
    );
    expect(foo).toBe(123);
    expect(bar).toBe(true);
    expect(baz).toStrictEqual(["a", "b"]);
  });
  test("error from parseOption is wrapped", () => {
    const req = create(CodeGeneratorRequestDesc, {
      parameter: "foo=abc",
    });
    expect(() => plugin.run(req)).toThrowError(
      /^invalid option "foo=abc": please provide an integer for foo$/,
    );
  });
  test("unknown option raises an error", () => {
    const req = create(CodeGeneratorRequestDesc, {
      parameter: "unknown",
    });
    expect(() => plugin.run(req)).toThrowError(/^invalid option "unknown"$/);
  });
  test("unknown option with value raises an error", () => {
    const req = create(CodeGeneratorRequestDesc, {
      parameter: "unknown=bar",
    });
    expect(() => plugin.run(req)).toThrowError(
      /^invalid option "unknown=bar"$/,
    );
  });
});
