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

// TODO remove me or deduplicate
describe("redirectImport()", () => {
  test("redirects", () => {
    expect(
      redirectImport("./foo/bar_pb.js", [
        { pattern: "./foo/**/*_pb.js", target: "@scope/pkg" },
      ])
    ).toBe("@scope/pkg/foo/bar_pb.js");
    expect(
      redirectImport("./foo/bar/baz_pb.js", [
        { pattern: "./foo/**/*_pb.js", target: "@scope/pkg" },
      ])
    ).toBe("@scope/pkg/foo/bar/baz_pb.js");
    expect(
      redirectImport("./x/y_pb.js", [
        { pattern: "./**/*_pb.js", target: "@scope/pkg" },
      ])
    ).toBe("@scope/pkg/x/y_pb.js");
    expect(
      redirectImport("./x/y_pb.js", [
        { pattern: "./**/*_pb.js", target: "pkg" },
      ])
    ).toBe("pkg/x/y_pb.js");
    expect(
      redirectImport("./x/y_pb.js", [{ pattern: "./*/*_pb.js", target: "pkg" }])
    ).toBe("pkg/x/y_pb.js");
    expect(
      redirectImport("./y_pb.js", [{ pattern: "./**/*_pb.js", target: "pkg" }])
    ).toBe("pkg/y_pb.js");
    expect(
      redirectImport("./y_pb.js", [
        { pattern: "./**/*_pb.js", target: "../foo/" },
      ])
    ).toBe("../foo/y_pb.js");
    expect(
      redirectImport("./x/y_pb.js", [
        { pattern: "./**/*_pb.js", target: "../foo" },
      ])
    ).toBe("../foo/x/y_pb.js");
  });
  test("does not redirect", () => {
    expect(
      redirectImport("./bar_pb.js", [
        { pattern: "./foo/**/*_pb.js", target: "pkg" },
      ])
    ).toBe("./bar_pb.js");
    expect(
      redirectImport("./foo/bar_zz.txt", [
        { pattern: "./foo/**/*_pb.js", target: "pkg" },
      ])
    ).toBe("./foo/bar_zz.txt");
    expect(
      redirectImport("./y_pb.js", [{ pattern: "./*/*_pb.js", target: "pkg" }])
    ).toBe("./y_pb.js");
    expect(
      redirectImport("./y_pb.js", [{ pattern: "./foo*_pb.js", target: "pkg" }])
    ).toBe("./y_pb.js");
    expect(
      redirectImport("./y_pb.js", [{ pattern: "y_pb.js", target: "pkg" }])
    ).toBe("./y_pb.js");
  });
});

// ---

export const relativePathRE = /^\.{1,2}\//;

/**
 * A configuration of import path redirections, a feature mainly used for
 * remote code generation in the BSR npm registry, which makes it possible
 * to serve the output of a BSR module and a plugin in an individual package.
 *
 * All plugins based on @bufbuild/protoplugin support the option
 * "redirect_imports", which is parsed into this type. The option can be given
 * multiple times, in the form of `redirect_imports=<pattern>:<target>`.
 * If any generated file imports from a path matching a pattern, the import
 * path is redirected to the corresponding target. The first matching pattern
 * wins. As a result, the target is prepended to the import path, stripping
 * any leading ./ or ../ from the import path first.
 *
 * The pattern is a very reduced subset of glob:
 * - `*` matches zero or more characters except `/`.
 * - `**` matches zero or more path elements, where an element is one or more
 *   characters with a trailing `/`.
 *
 * For example, the pattern `./foo/**\/*_pb.js` matches:
 * - ./foo/bar_pb.js
 * - ./foo/bar/baz_pb.js
 *
 * But neither of:
 * - ./bar_pb.js
 * - ./foo/bar_pb.js
 *
 * With the target `@scope/pkg`, the import path `./foo/bar_pb.js` is
 * transformed to `@scope/pkg/foo/bar_pb.js`.
 */
export type ImportRedirections = { pattern: string; target: string }[];

const cache = new WeakMap<
  ImportRedirections,
  { pattern: RegExp; target: string }[]
>();

/**
 * Apply import redirection to the given path.
 */
export function redirectImport(
  importPath: string,
  redirectedImports: ImportRedirections
): string {
  let ri = cache.get(redirectedImports);
  if (ri === undefined) {
    ri = redirectedImports.map(({ pattern, target }) => {
      return {
        pattern: starToRegExp(pattern),
        target,
      };
    });
    cache.set(redirectedImports, ri);
  }
  for (const { pattern, target } of ri) {
    if (pattern.test(importPath)) {
      return (
        target.replace(/\/$/, "") + importPath.replace(relativePathRE, "/")
      );
    }
  }
  return importPath;
}

function starToRegExp(star: string): RegExp {
  const r: string[] = ["^"];
  for (let i = 0; i < star.length; i++) {
    switch (star[i]) {
      case "*":
        if (star[i + 1] === "*" && star[i + 2] === "/") {
          i += 2;
          r.push("([^\\/]+\\/)*");
          break;
        }
        r.push("[^\\/]*");
        break;
      case ".":
      case "+":
      case "?":
      case "^":
      case "$":
      case "{":
      case "}":
      case "(":
      case ")":
      case "|":
      case "[":
      case "]":
      case "\\":
        r.push("\\", star[i]);
        break;
      default:
        r.push(star[i]);
        break;
    }
  }
  r.push("$");
  return new RegExp(r.join(""));
}
