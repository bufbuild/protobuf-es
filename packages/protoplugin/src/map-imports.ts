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

/**
 * A configuration for mapping imports of generated code to a package, for
 * example a generated SDK published to a package registry.
 *
 * All plugins based on @bufbuild/protoplugin support the option
 * "map_imports", which is parsed into this type. The option can be given
 * multiple times, in the form of `map_imports=<pattern>:<target>`.
 *
 * The pattern is matched against the path of the Protobuf file, for example
 * `google/rpc/status.proto`, using a reduced subset of glob:
 * - `*` matches zero or more characters except `/`.
 * - `**` matches zero or more characters, including `/`.
 * - `**\/` (escaped for block comment!) matches zero or more path elements,
 *   where an element is one or more characters with a trailing `/`.
 * - A trailing `/` matches every file in the directory and its
 *   subdirectories.
 *
 * The target is typically a npm package name, for example `@scope/pkg`.
 *
 * If a generated file imports from a Protobuf file matching one of the
 * patterns, the import path is derived from the target instead of the local
 * output, by prepending the target to the generated file path. The first
 * matching pattern wins.
 *
 * For example, the option `map_imports=google/rpc/:@scope/pkg` imports
 * `google/rpc/status.proto` from `@scope/pkg/google/rpc/status_pb.js`.
 *
 * Well-known types are always imported from the runtime package, unless they
 * are generated, and are not subject to this option.
 */
export type MapImports = { pattern: string; target: string }[];

const cache = new WeakMap<MapImports, { pattern: RegExp; target: string }[]>();

/**
 * Return the target for the given Protobuf file path, or undefined if none of
 * the patterns match.
 */
export function mapImportTarget(
  protoFileName: string,
  mapImports: MapImports,
): string | undefined {
  let mi = cache.get(mapImports);
  if (mi === undefined) {
    mi = mapImports.map(({ pattern, target }) => {
      return {
        pattern: globToRegExp(pattern),
        target: target.replace(/\/$/, ""),
      };
    });
    cache.set(mapImports, mi);
  }
  for (const { pattern, target } of mi) {
    if (pattern.test(protoFileName)) {
      return target;
    }
  }
  return undefined;
}

function globToRegExp(glob: string): RegExp {
  const r: string[] = ["^"];
  for (let i = 0; i < glob.length; i++) {
    switch (glob[i]) {
      case "*":
        if (glob[i + 1] === "*") {
          if (glob[i + 2] === "/") {
            i += 2;
            r.push("([^\\/]+\\/)*");
            break;
          }
          i += 1;
          r.push(".*");
          break;
        }
        r.push("[^\\/]*");
        break;
      case "/":
        if (i === glob.length - 1) {
          // A trailing slash matches everything in the directory.
          r.push("\\/.*");
          break;
        }
        r.push("\\/");
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
        r.push("\\", glob[i]);
        break;
      default:
        r.push(glob[i]);
        break;
    }
  }
  r.push("$");
  return new RegExp(r.join(""));
}
