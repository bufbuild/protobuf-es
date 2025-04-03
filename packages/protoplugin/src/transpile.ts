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

import type { FileInfo } from "./generated-file.js";
import ts from "typescript";
import {
  createDefaultMapFromNodeModules,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";

/* eslint-disable import/no-named-as-default-member */

// The default options used to auto-transpile if needed.
const defaultOptions: ts.CompilerOptions = {
  // Type checking
  strict: false,

  // modules
  module: ts.ModuleKind.ES2020,
  moduleResolution: ts.ModuleResolutionKind.Node10,
  noResolve: true,
  resolveJsonModule: false,

  // emit
  emitBOM: false,
  importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Preserve,
  newLine: ts.NewLineKind.LineFeed,
  preserveValueImports: false,

  // JavaScript Support
  allowJs: true,
  checkJs: false,

  // Language and Environment
  lib: [],
  moduleDetection: ts.ModuleDetectionKind.Force,
  target: ts.ScriptTarget.ES2017,

  // Completeness
  skipLibCheck: true,
  skipDefaultLibCheck: false,
};

/**
 * Create a transpiler using the given compiler options, which will compile the
 * content provided in the files array.
 *
 * Note:  this library intentionally transpiles with a pinned older version of
 * TypeScript for stability.  This version is denoted in this workspace's
 * package.json.  For the default set of compiler options, we use a lenient
 * set of options because the general goal is to emit code as best as we can.
 * For a list of the options used, see `defaultOptions` above.
 *
 * If this is not desirable for plugin authors, they are free to provide their
 * own transpile function as part of the plugin initialization.  If one is
 * provided, it will be invoked instead and the framework's auto-transpilation
 * will be bypassed.
 *
 * In addition, note that there is a dependency on @typescript/vfs in the
 * top-level package as well as this package.  This is to avoid npm hoisting
 * @typescript/vfs to the top-level node_modules directory, which then causes
 * type mismatches when trying to use it with this package's version of
 * TypeScript.  Ideally we would use something like Yarn's nohoist here, but
 * npm does not support that yet.
 */
function createTranspiler(options: ts.CompilerOptions, files: FileInfo[]) {
  const fsMap = createDefaultMapFromNodeModules({
    target: options.target,
  });

  files.forEach((file) => {
    fsMap.set(file.name, file.content);
  });

  const system = createSystem(fsMap);
  const host = createVirtualCompilerHost(system, options, ts);

  return ts.createProgram({
    rootNames: [...fsMap.keys()],
    options,
    host: host.compilerHost,
  });
}

export function transpile(
  files: FileInfo[],
  transpileJs: boolean,
  transpileDts: boolean,
  jsImportStyle: "module" | "legacy_commonjs",
): FileInfo[] {
  const options: ts.CompilerOptions = {
    ...defaultOptions,
    declaration: transpileDts,
    emitDeclarationOnly: transpileDts && !transpileJs,
  };

  if (jsImportStyle == "legacy_commonjs") {
    options.module = ts.ModuleKind.CommonJS;
  }

  // Create the transpiler (a ts.Program object)
  const program = createTranspiler(options, files);

  const results: FileInfo[] = [];
  let err: Error | undefined;

  const result = program.emit(
    undefined,
    (
      fileName: string,
      data: string,
      _writeByteOrderMark: boolean,
      _onError?: (message: string) => void,
      sourceFiles?: readonly ts.SourceFile[],
    ) => {
      // We have to go through some hoops here because the header we add to each
      // file is not part of the AST. So we find the TypeScript file we
      // generated for each emitted file and add the header to each output ourselves.
      if (!sourceFiles) {
        err = new Error(
          `unable to map emitted file "${fileName}" to a source file: missing source files`,
        );
        return;
      }
      if (sourceFiles.length !== 1) {
        err = new Error(
          `unable to map emitted file "${fileName}" to a source file: expected 1 source file, got ${sourceFiles.length}`,
        );
        return;
      }
      const file = files.find((x) => sourceFiles[0].fileName === x.name);
      if (!file) {
        err = new Error(
          `unable to map emitted file "${fileName}" to a source file: not found`,
        );
        return;
      }
      results.push({
        name: fileName,
        preamble: file.preamble,
        content: data,
      });
    },
  );
  if (err) {
    throw err;
  }
  if (result.emitSkipped) {
    // When compilation fails, this error message is printed to stderr.
    const diagnostics = formatDiagnostics(result.diagnostics);
    throw Error(
      `A problem occurred during transpilation and files were not generated.  Contact the plugin author for support.\n\n${diagnostics}`,
    );
  }
  return results;
}

function formatDiagnostics(diagnostics: readonly ts.Diagnostic[]): string {
  const sorted = ts.sortAndDeduplicateDiagnostics(diagnostics);
  if (sorted.length == 0) {
    return "";
  }
  const first = sorted.slice(0, 3);
  const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName(fileName: string): string {
      return fileName;
    },
    getCurrentDirectory(): string {
      return ".";
    },
    getNewLine(): string {
      return "\n";
    },
  };
  let out = ts.formatDiagnostics(first, formatHost).trim();
  if (first.length < sorted.length) {
    out += `\n${sorted.length - first.length} more diagnostics elided`;
  }
  return out;
}
