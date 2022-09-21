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

import type { FileInfo } from "./generated-file.js";
import ts from "typescript";
import {
  createDefaultMapFromNodeModules,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";

/* eslint-disable import/no-named-as-default-member */

function createTranspiler(options: ts.CompilerOptions, files: FileInfo[]) {
  const fsMap = createDefaultMapFromNodeModules({
    target: ts.ScriptTarget.ES2015,
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
  transpileDts: boolean
): FileInfo[] {
  // TODO - Need more options here by default
  const options: ts.CompilerOptions = {
    declaration: transpileDts,
    emitDeclarationOnly: transpileDts && !transpileJs,
  };

  // Create the transpiler (a ts.Program object)
  const program = createTranspiler(options, files);

  const results: FileInfo[] = [];
  let err: Error | undefined;

  program.emit(
    undefined,
    (
      fileName: string,
      data: string,
      writeByteOrderMark: boolean,
      onError?: (message: string) => void,
      sourceFiles?: readonly ts.SourceFile[]
    ) => {
      // We have to go through some hoops here because the header we add to each file
      // is not part of the AST. So we find the TypeScript file we generated for each
      // emitted file and add the header to each output ourselves.
      if (!sourceFiles) {
        err = new Error(
          `unable to map emitted file "${fileName}" to a source file: missing source files`
        );
        return;
      }
      if (sourceFiles.length !== 1) {
        err = new Error(
          `unable to map emitted file "${fileName}" to a source file: expected 1 source file, got ${sourceFiles.length}`
        );
        return;
      }
      const file = files.find((x) => sourceFiles[0].fileName === x.name);
      if (!file) {
        err = new Error(
          `unable to map emitted file "${fileName}" to a source file: not found`
        );
        return;
      }
      results.push({
        name: fileName,
        preamble: file.preamble,
        content: data,
      });
    }
  );
  if (err) {
    throw err;
  }
  return results;
}
