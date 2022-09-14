import { createCompiler } from "./compiler.js";
import type { TSFile } from "@bufbuild/protoplugin/ecmascript";
import { createTSFile } from "@bufbuild/protoplugin/ecmascript";
import * as ts from "typescript";

export function transpile(
  files: TSFile[],
  transpileJs: boolean,
  transpileDts: boolean
): TSFile[] {
  const options: ts.CompilerOptions = {
    declaration: transpileDts,
    emitDeclarationOnly: transpileDts && !transpileJs,
  };
  const fileNames = files.map((file) => {
    return file.name;
  });

  const virtual = createCompiler(options, files);

  let program = ts.createProgram(fileNames, options, virtual);

  const results: TSFile[] = [];
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
      //             // is not part of the AST. So we find the TypeScript file we generated for each
      //                         // emitted file and add the header to each output ourselves.
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
      // const content = file.getHeader() + data;
      results.push(createTSFile(fileName, data));
    }
  );
  if (err) {
    throw err;
  }
  return results;
}
