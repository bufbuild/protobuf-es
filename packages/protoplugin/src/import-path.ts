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

import type { ImportExtension } from "./parameter.js";

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
 * Apply import rewrites to the given import path, and change all .js extensions
 * to the given import extension.
 */
export function rewriteImportPath(
  importPath: string,
  rewriteImports: RewriteImports,
  importExtension: ImportExtension,
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
      if (relativePathRE.test(importPath)) {
        importPath =
          target.replace(/\/$/, "") + importPath.replace(relativePathRE, "/");
      } else {
        importPath = target;
      }
      break;
    }
  }
  if (importPath.endsWith(".js")) {
    switch (importExtension) {
      case "none":
        return importPath.substring(0, importPath.length - 3);
      case "ts":
      case "js":
        return importPath.substring(0, importPath.length - 2) + importExtension;
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

export const relativePathRE = /^\.{1,2}\//;

/**
 * Derives an ECMAScript module import path from a file path. For example,
 * the path `foo/bar.ts` is transformed into `./foo/bar.js`.
 */
export function deriveImportPath(filename: string): string {
  let importPath = filename.replace(/\.(js|ts|d.ts)$/, ".js");
  if (!relativePathRE.test(importPath)) {
    importPath = "./" + importPath;
  }
  return importPath;
}

/**
 * Makes an import path relative to the file importing it. For example,
 * consider the following files:
 * - foo/foo.js
 * - baz.js
 * If foo.js wants to import baz.js, we return ../baz.js
 */
export function makeImportPathRelative(
  importer: string,
  importPath: string,
): string {
  if (!relativePathRE.test(importPath)) {
    // We don't touch absolute imports, like @bufbuild/protobuf
    return importPath;
  }
  let a = importer
    .replace(/^\.\//, "")
    .split("/")
    .filter((p) => p.length > 0)
    .slice(0, -1);
  let b = importPath
    .replace(/^\.\//, "")
    .split("/")
    .filter((p) => p.length > 0);
  let matchingPartCount = 0;
  for (
    let l = Math.min(a.length, b.length);
    matchingPartCount < l;
    matchingPartCount++
  ) {
    if (a[matchingPartCount] !== b[matchingPartCount]) {
      break;
    }
  }
  a = a.slice(matchingPartCount);
  b = b.slice(matchingPartCount);
  const c = a
    .map(() => "..")
    .concat(b)
    .join("/");
  return relativePathRE.test(c) ? c : "./" + c;
}
