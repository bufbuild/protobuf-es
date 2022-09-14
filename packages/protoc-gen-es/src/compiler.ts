import * as ts from "typescript";
import * as path from "path";
import type { TSFile } from "@bufbuild/protoplugin/ecmascript";

export function createCompiler(options: ts.CompilerOptions, files: TSFile[]) {
  const original = ts.createCompilerHost(options, true);
  return new VirtualCompilerHost(original, files);
}

export class VirtualCompilerHost implements ts.CompilerHost {
  private readonly _sourceFiles = new Map<TSFile, ts.SourceFile>();
  private readonly _files = new Map<string, TSFile>();
  private readonly _dirs = new Set<string>();

  constructor(
    private readonly wrapped: ts.CompilerHost,
    files: readonly TSFile[]
  ) {
    for (let vf of files) {
      // create map from path to file
      if (this._files.has(vf.name)) {
        throw new Error("Duplicate file paths in virtual files: " + vf.name);
      }
      this._files.set(vf.name, vf);
      // create set of directory paths
      let path = vf.name.split("/");
      while (path.length > 1) {
        path.pop();
        this._dirs.add(path.join("/"));
      }
    }
  }

  lookupVirtualFile(fileName: string): TSFile | undefined {
    let vf = this._files.get(fileName);
    if (vf) return vf;
    let cwd = process.cwd();
    if (fileName.startsWith(cwd)) {
      let relativePath = path.relative(cwd, fileName);
      vf = this._files.get(relativePath);
      if (vf) return vf;
      if (!relativePath.endsWith(".ts")) {
        relativePath = relativePath += ".ts";
        vf = this._files.get(relativePath);
        if (vf) return vf;
      }
    }
    return undefined;
  }

  getSourceFile(
    fileName: string,
    languageVersion: ts.ScriptTarget,
    onError?: (message: string) => void,
    shouldCreateNewSourceFile?: boolean
  ): ts.SourceFile | undefined {
    const vf = this.lookupVirtualFile(fileName);
    if (vf) {
      let sf = this._sourceFiles.get(vf);
      if (!sf) {
        this._sourceFiles.set(
          vf,
          (sf = ts.createSourceFile(
            vf.name,
            vf.content,
            ts.ScriptTarget.Latest
          ))
        );
      }
      return sf;
    }
    return this.wrapped.getSourceFile(
      fileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile
    );
  }

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return this.wrapped.getDefaultLibFileName(options);
  }

  getNewLine(): string {
    return this.wrapped.getNewLine();
  }

  fileExists(fileName: string): boolean {
    return (
      !!this.lookupVirtualFile(fileName) || this.wrapped.fileExists(fileName)
    );
  }

  readFile(fileName: string): string | undefined {
    return "";
  }

  useCaseSensitiveFileNames(): boolean {
    return this.wrapped.useCaseSensitiveFileNames();
  }

  writeFile(
    fileName: string,
    data: string,
    writeByteOrderMark: boolean,
    onError?: (message: string) => void,
    sourceFiles?: readonly ts.SourceFile[]
  ): void {
    // this.wrapped.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
  }

  getCanonicalFileName(fileName: string): string {
    return this.wrapped.getCanonicalFileName(fileName);
  }

  getCurrentDirectory(): string {
    return this.wrapped.getCurrentDirectory();
  }
}
