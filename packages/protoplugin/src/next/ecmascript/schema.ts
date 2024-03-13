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

import {
  CodeGeneratorRequest,
  DescEnum,
  DescExtension,
  DescFile,
  DescMessage,
  DescriptorSet,
  DescService,
} from "@bufbuild/protobuf";
import { createDescriptorSet, FeatureSetDefaults } from "@bufbuild/protobuf";
import { nestedTypes } from "@bufbuild/protobuf/next/reflect";
import type {
  CreatePreambleFn,
  FileInfo,
  GeneratedFile,
  GeneratedFileController,
  ResolveDescImportFn,
  ResolveShapeImportFn,
  RewriteImportFn,
} from "./generated-file.js";
import { createGeneratedFile } from "./generated-file.js";
import { createImportSymbol } from "./import-symbol.js";
import type { Target } from "./target.js";
import { deriveImportPath, rewriteImportPath } from "./import-path.js";
import { ParsedParameter } from "./parameter.js";
import { makeFilePreamble } from "./file-preamble.js";
import { localDescName, localShapeName, generateFilePath } from "./names.js";
import { createRuntimeImports } from "./runtime-imports.js";

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
   * Generate a new file with the given name.
   */
  generateFile(name: string): GeneratedFile;

  /**
   * List all types in a file (including messages, enumerations, and extensions
   * nested in messages).
   */
  typesInFile(
    file: DescFile,
  ): Iterable<DescMessage | DescEnum | DescExtension | DescService>;

  /**
   * The original google.protobuf.compiler.CodeGeneratorRequest.
   */
  readonly proto: CodeGeneratorRequest;
}

interface SchemaController extends Schema {
  getFileInfo: () => FileInfo[];
  prepareGenerate(target: Target): void;
}

export function createSchema(
  request: CodeGeneratorRequest,
  parameter: ParsedParameter,
  pluginName: string,
  pluginVersion: string,
  featureSetDefaults: FeatureSetDefaults | undefined,
): SchemaController {
  const descriptorSet = createDescriptorSet(request.protoFile, {
    featureSetDefaults,
  });
  const filesToGenerate = findFilesToGenerate(descriptorSet, request);
  let target: Target | undefined;
  const generatedFiles: GeneratedFileController[] = [];
  const runtime = createRuntimeImports(parameter.bootstrapWkt);
  const resolveDescImport: ResolveDescImportFn = (desc, typeOnly) =>
    createImportSymbol(
      localDescName(desc),
      generateFilePath(
        desc.kind == "file" ? desc : desc.file,
        parameter.bootstrapWkt,
        filesToGenerate,
      ),
      typeOnly,
    );
  const resolveShapeImport: ResolveShapeImportFn = (desc) =>
    createImportSymbol(
      localShapeName(desc),
      generateFilePath(desc.file, parameter.bootstrapWkt, filesToGenerate),
      true,
    );
  const createPreamble: CreatePreambleFn = (descFile) =>
    makeFilePreamble(
      descFile,
      pluginName,
      pluginVersion,
      parameter.sanitizedParameter,
      parameter.tsNocheck,
    );
  const rewriteImport: RewriteImportFn = (importPath) =>
    rewriteImportPath(
      importPath,
      parameter.rewriteImports,
      parameter.importExtension,
    );
  return {
    targets: parameter.targets,
    proto: request,
    files: filesToGenerate,
    allFiles: descriptorSet.files,
    typesInFile: nestedTypes,
    generateFile(name) {
      if (target === undefined) {
        throw new Error(
          "prepareGenerate() must be called before generateFile()",
        );
      }
      const genFile = createGeneratedFile(
        name,
        deriveImportPath(name),
        target === "js" ? parameter.jsImportStyle : "module", // ts and dts always use import/export, only js may use commonjs
        rewriteImport,
        resolveDescImport,
        resolveShapeImport,
        createPreamble,
        runtime,
      );
      generatedFiles.push(genFile);
      return genFile;
    },
    getFileInfo() {
      return generatedFiles
        .map((f) => f.getFileInfo())
        .filter((fi) => parameter.keepEmptyFiles || fi.content.length > 0);
    },
    prepareGenerate(newTarget) {
      target = newTarget;
    },
  };
}

function findFilesToGenerate(
  descriptorSet: DescriptorSet,
  request: CodeGeneratorRequest,
) {
  const missing = request.fileToGenerate.filter((fileToGenerate) =>
    descriptorSet.files.every(
      (file) => fileToGenerate !== file.name + ".proto",
    ),
  );
  if (missing.length) {
    throw `files_to_generate missing in the request: ${missing.join(", ")}`;
  }
  return descriptorSet.files.filter((file) =>
    request.fileToGenerate.includes(file.name + ".proto"),
  );
}
