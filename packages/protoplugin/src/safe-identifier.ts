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
 * Names that cannot be used for identifiers, such as class names,
 * but _can_ be used for object properties.
 */
const reservedIdentifiers = new Set([
  // ECMAScript 2015 keywords
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",

  // ECMAScript 2015 future reserved keywords
  "enum",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",

  // Class name cannot be 'Object' when targeting ES5 with module CommonJS
  "Object",

  // TypeScript keywords that cannot be used for types (as opposed to variables)
  "bigint",
  "number",
  "boolean",
  "string",
  "object",

  // Identifiers reserved for the runtime, so we can generate legible code
  "globalThis",
  "Uint8Array",
  "Partial",
]);

/**
 * Escapes reserved words in ECMAScript and TypeScript identifiers, by appending
 * a dollar sign.
 *
 * This function is intended for use with identifiers from Protobuf. The passed
 * string must be a valid identifier (e.g. not start with a digit).
 */
export function safeIdentifier(name: string): string {
  return reservedIdentifiers.has(name) ? name + "$" : name;
}
