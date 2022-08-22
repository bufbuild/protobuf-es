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
      rewriteImportPath("./foo/bar_pb.js", [
        { pattern: "./foo/**/*_pb.js", target: "@scope/pkg" },
      ])
    ).toBe("@scope/pkg/foo/bar_pb.js");
    expect(
      rewriteImportPath("./foo/bar/baz_pb.js", [
        { pattern: "./foo/**/*_pb.js", target: "@scope/pkg" },
      ])
    ).toBe("@scope/pkg/foo/bar/baz_pb.js");
    expect(
      rewriteImportPath("./x/y_pb.js", [
        { pattern: "./**/*_pb.js", target: "@scope/pkg" },
      ])
    ).toBe("@scope/pkg/x/y_pb.js");
    expect(
      rewriteImportPath("./x/y_pb.js", [
        { pattern: "./**/*_pb.js", target: "pkg" },
      ])
    ).toBe("pkg/x/y_pb.js");
    expect(
      rewriteImportPath("./x/y_pb.js", [
        { pattern: "./*/*_pb.js", target: "pkg" },
      ])
    ).toBe("pkg/x/y_pb.js");
    expect(
      rewriteImportPath("./y_pb.js", [
        { pattern: "./**/*_pb.js", target: "pkg" },
      ])
    ).toBe("pkg/y_pb.js");
    expect(
      rewriteImportPath("./y_pb.js", [
        { pattern: "./**/*_pb.js", target: "../foo/" },
      ])
    ).toBe("../foo/y_pb.js");
    expect(
      rewriteImportPath("./x/y_pb.js", [
        { pattern: "./**/*_pb.js", target: "../foo" },
      ])
    ).toBe("../foo/x/y_pb.js");
  });
  test("does not redirect", () => {
    expect(
      rewriteImportPath("./bar_pb.js", [
        { pattern: "./foo/**/*_pb.js", target: "pkg" },
      ])
    ).toBe("./bar_pb.js");
    expect(
      rewriteImportPath("./foo/bar_zz.txt", [
        { pattern: "./foo/**/*_pb.js", target: "pkg" },
      ])
    ).toBe("./foo/bar_zz.txt");
    expect(
      rewriteImportPath("./y_pb.js", [
        { pattern: "./*/*_pb.js", target: "pkg" },
      ])
    ).toBe("./y_pb.js");
    expect(
      rewriteImportPath("./y_pb.js", [
        { pattern: "./foo*_pb.js", target: "pkg" },
      ])
    ).toBe("./y_pb.js");
    expect(
      rewriteImportPath("./y_pb.js", [{ pattern: "y_pb.js", target: "pkg" }])
    ).toBe("./y_pb.js");
  });
});

// ---

export const relativePathRE = /^\.{1,2}\//;

/**
 * A configuration for rewriting import paths, a feature mainly used for
 * remote code generation in the BSR npm registry, which makes it possible
 * to serve the output of a BSR module and a plugin in an individual package.
 *
 * All plugins based on @bufbuild/protoplugin support the option
 * "rewrite_imports", which is parsed into this type. The option can be given
 * multiple times, in the form of `rewrite_imports=<pattern>:<target>`.
 *
 * The pattern is a very reduced subset of glob:
 * - `*` matches zero or more characters except `/`.
 * - `**` matches zero or more path elements, where an element is one or more
 *   characters with a trailing `/`.
 *
 * The target is typically a npm package name, for example `@scope/pkg`.
 *
 * If any generated file imports from a path matching one of the patterns, the
 * import path is rewritten to the corresponding target, by prepending the
 * target to the import path (after replacing any leading ./ or ../ from the
 * import path with / first).
 *
 * Note that the pattern is matched against the import path before it is made
 * relative to the file importing it. The first matching pattern wins.
 *
 * For example, the pattern `./foo/**\/*_pb.js` (escaped for block comment!)
 * matches:
 * - ./foo/bar_pb.js
 * - ./foo/bar/baz_pb.js
 *
 * But neither of:
 * - ./bar_pb.js
 * - ./foo/bar_xx.js
 *
 * With the target `@scope/pkg`, the import path `./foo/bar_pb.js` is
 * transformed to `@scope/pkg/foo/bar_pb.js`.
 */
export type RewriteImports = { pattern: string; target: string }[];

const cache = new WeakMap<
  RewriteImports,
  { pattern: RegExp; target: string }[]
>();

/**
 * Apply import redirection to the given path.
 */
export function rewriteImportPath(
  importPath: string,
  rewriteImports: RewriteImports
): string {
  let ri = cache.get(rewriteImports);
  if (ri === undefined) {
    ri = rewriteImports.map(({ pattern, target }) => {
      return {
        pattern: starToRegExp(pattern),
        target,
      };
    });
    cache.set(rewriteImports, ri);
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
