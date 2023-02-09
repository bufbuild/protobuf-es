// Copyright 2021-2023 Buf Technologies, Inc.
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

import type {
  CodeGeneratorRequest,
  DescEnum,
  DescFile,
  DescMessage,
  DescriptorSet,
} from "@bufbuild/protobuf";
import {
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature,
  codegenInfo,
  createDescriptorSet,
  protoInt64,
} from "@bufbuild/protobuf";
import type {
  FileInfo,
  GeneratedFile,
  GenerateFileToFileInfo,
} from "./generated-file.js";
import { createGeneratedFile } from "./generated-file.js";
import { createRuntimeImports, RuntimeImports } from "./runtime-imports.js";
import { createImportSymbol, ImportSymbol } from "./import-symbol.js";
import type { Target } from "./target.js";
import {
  deriveImportPath,
  makeImportPath,
  rewriteImportPath,
  RewriteImports,
} from "./import-path.js";

/**
 * Schema describes the files and types that the plugin is requested to
 * generate.
 */
export interface Schema {
  /**
   * The files we are asked to generate.
   */
  readonly files: readonly DescFile[];

  /**
   * All files contained in the code generator request.
   */
  readonly allFiles: readonly DescFile[];

  /**
   * The plugin option `target`. A code generator should support all targets.
   */
  readonly targets: readonly Target[];

  /**
   * Provides some symbols from the runtime library @bufbuild/protobuf.
   */
  readonly runtime: RuntimeImports;

  /**
   * Generate a new file with the given name.
   */
  generateFile(name: string): GeneratedFile;

  /**
   * The original google.protobuf.compiler.CodeGeneratorRequest.
   */
  readonly proto: CodeGeneratorRequest;
}

interface SchemaController {
  schema: Schema;
  getFileInfo: () => FileInfo[];
}

export function createSchema(
  request: CodeGeneratorRequest,
  targets: Target[],
  tsNocheck: boolean,
  bootstrapWkt: boolean,
  rewriteImports: RewriteImports,
  importExtension: string,
  keepEmptyFiles: boolean,
  pluginName: string,
  pluginVersion: string,
  pluginParameter: string
): SchemaController {
  const descriptorSet = createDescriptorSet(request.protoFile);
  const filesToGenerate = findFilesToGenerate(descriptorSet, request);
  const runtime = createRuntimeImports(bootstrapWkt);
  const createTypeImport = (desc: DescMessage | DescEnum): ImportSymbol => {
    const name = codegenInfo.localName(desc);
    const from = makeImportPath(desc.file, bootstrapWkt, filesToGenerate);
    return createImportSymbol(name, from);
  };
  const generatedFiles: GenerateFileToFileInfo[] = [];
  const schema: Schema = {
    targets,
    runtime,
    proto: request,
    files: filesToGenerate,
    allFiles: descriptorSet.files,
    generateFile(name) {
      const genFile = createGeneratedFile(
        name,
        deriveImportPath(name),
        (importPath: string) =>
          rewriteImportPath(importPath, rewriteImports, importExtension),
        createTypeImport,
        runtime,
        {
          pluginName,
          pluginVersion,
          pluginParameter,
          tsNocheck,
        },
        keepEmptyFiles
      );
      generatedFiles.push(genFile);
      return genFile;
    },
  };
  return {
    schema,
    getFileInfo() {
      return generatedFiles.flatMap((file) => {
        const fileInfo = file.getFileInfo();
        // undefined is returned if the file has no content
        if (!fileInfo) {
          return [];
        }
        return [fileInfo];
      });
    },
  };
}

export function toResponse(files: FileInfo[]): CodeGeneratorResponse {
  return new CodeGeneratorResponse({
    supportedFeatures: protoInt64.parse(
      CodeGeneratorResponse_Feature.PROTO3_OPTIONAL
    ),
    file: files.map((f) => {
      if (f.preamble !== undefined) {
        f.content = f.preamble + "\n" + f.content;
      }
      return f;
    }),
  });
}

function findFilesToGenerate(
  descriptorSet: DescriptorSet,
  request: CodeGeneratorRequest
) {
  const missing = request.fileToGenerate.filter((fileToGenerate) =>
    descriptorSet.files.every((file) => fileToGenerate !== file.name + ".proto")
  );
  if (missing.length) {
    throw `files_to_generate missing in the request: ${missing.join(", ")}`;
  }
  return descriptorSet.files.filter((file) =>
    request.fileToGenerate.includes(file.name + ".proto")
  );
}
