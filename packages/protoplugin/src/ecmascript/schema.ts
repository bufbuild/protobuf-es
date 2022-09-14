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

import type {
  CodeGeneratorRequest,
  DescEnum,
  DescFile,
  DescMessage,
  DescriptorSet,
} from "@bufbuild/protobuf";
import {
  codegenInfo,
  CodeGeneratorResponse,
  CodeGeneratorResponse_Feature,
  createDescriptorSet,
  protoInt64,
} from "@bufbuild/protobuf";
import type {
  GeneratedFile,
  GenerateFileToResponse,
  TSFile,
} from "./generated-file.js";
import { createGeneratedFile } from "./generated-file.js";
import { createRuntimeImports, RuntimeImports } from "./runtime-imports.js";
import { createImportSymbol, ImportSymbol } from "./import-symbol.js";
import type { Target } from "./target.js";
import {
  deriveImportPath,
  RewriteImports,
  makeImportPath,
  rewriteImportPath,
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
  toIntermediateType: () => TSFile[];
  toResponse: (res: CodeGeneratorResponse, tsFiles: TSFile[]) => void;
}

export function createSchema(
  request: CodeGeneratorRequest,
  targets: Target[],
  pluginName: string,
  pluginVersion: string,
  tsNocheck: boolean,
  bootstrapWkt: boolean,
  rewriteImports: RewriteImports
): SchemaController {
  const descriptorSet = createDescriptorSet(request.protoFile);
  const filesToGenerate = findFilesToGenerate(descriptorSet, request);
  const runtime = createRuntimeImports(bootstrapWkt);
  const createTypeImport = (desc: DescMessage | DescEnum): ImportSymbol => {
    const name = codegenInfo.localName(desc);
    const from = rewriteImportPath(
      makeImportPath(desc.file, bootstrapWkt, filesToGenerate),
      rewriteImports
    );
    return createImportSymbol(name, from);
  };
  const generatedFiles: GenerateFileToResponse[] = [];
  const schema: Schema = {
    targets,
    runtime,
    proto: request,
    files: filesToGenerate,
    allFiles: descriptorSet.files,
    generateFile(name) {
      const importPath = rewriteImportPath(
        deriveImportPath(name),
        rewriteImports
      );
      const genFile = createGeneratedFile(
        name,
        importPath,
        createTypeImport,
        runtime,
        {
          pluginName,
          pluginVersion,
          parameter: request.parameter,
          tsNocheck,
        }
      );
      generatedFiles.push(genFile);
      return genFile;
    },
  };
  return {
    schema,
    toIntermediateType() {
      return generatedFiles.map((file) => {
        return file.toIntermediateType();
      });
    },
    toResponse(res: CodeGeneratorResponse, tsFiles: TSFile[]) {
      res.supportedFeatures = protoInt64.parse(
        CodeGeneratorResponse_Feature.PROTO3_OPTIONAL
      );
      for (const genFile of generatedFiles) {
        genFile.toResponse(res);
      }
      for (const tsFile of tsFiles) {
        tsFile.toResponse(res);
      }
    },
  };
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
