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

/**
 * An import symbol represents an ECMAScript import.
 */
export type ImportSymbol = {
  readonly kind: "es_symbol";

  /**
   * The name to import.
   */
  readonly name: string;

  /**
   * The import path.
   *
   * The path can point to a package, for example `@foo/bar/baz.js`, or
   * to a file, for example `./bar/baz.js`.
   *
   * Note that while paths to a file begin with a `./`, they must be
   * relative to the project root.
   */
  readonly from: string;

  /**
   * Whether this is a type-only import - an import that only exists in
   * TypeScript.
   */
  readonly typeOnly: boolean;

  /**
   * Create a copy of this import, and make it type-only for TypeScript.
   */
  toTypeOnly(): ImportSymbol;

  /**
   * The unique ID based on name and from, disregarding typeOnly.
   */
  readonly id: EsSymbolId;
};

/**
 * Create a new import symbol.
 */
export function createImportSymbol(
  name: string,
  from: string,
  typeOnly?: boolean,
): ImportSymbol {
  const id = `import("${from}").${name}`;
  const s: ImportSymbol = {
    kind: "es_symbol",
    name,
    from,
    typeOnly: false,
    id,
    toTypeOnly() {
      return {
        ...this,
        typeOnly: true,
      };
    },
  };
  return typeOnly === true ? s.toTypeOnly() : s;
}

type EsSymbolId = string;
