import type { TSFile } from "@bufbuild/protoplugin/ecmascript";
import { log } from "@bufbuild/protoplugin";
import * as ts from "typescript";
import {
  createDefaultMapFromNodeModules,
  createSystem,
  createVirtualCompilerHost,
} from "@typescript/vfs";

function createTranspiler(options: ts.CompilerOptions, files: TSFile[]) {
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
  files: TSFile[],
  transpileJs: boolean,
  transpileDts: boolean
): TSFile[] {
  // TODO - Need more options here by default
  const options: ts.CompilerOptions = {
    declaration: transpileDts,
    emitDeclarationOnly: transpileDts && !transpileJs,
  };

  // Create the transpiler (a ts.Program object)
  const program = createTranspiler(options, files);

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
      // TODO - is this needed?
      // const content = file.getHeader() + data;
      results.push({
        name: fileName,
        content: data,
      });
    }
  );
  if (err) {
    throw err;
  }
  return results;
}
