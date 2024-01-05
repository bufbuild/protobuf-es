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

import type {
  CodeGeneratorRequest,
  DescEnum,
  DescFile,
  DescMessage,
  DescriptorSet,
} from "@bufbuild/protobuf";
import {
  codegenInfo,
  createDescriptorSet,
  FeatureSetDefaults,
} from "@bufbuild/protobuf";
import type {
  FileInfo,
  GeneratedFile,
  GeneratedFileController,
} from "./generated-file.js";
import { createGeneratedFile } from "./generated-file.js";
import { createRuntimeImports, RuntimeImports } from "./runtime-imports.js";
import { createImportSymbol, ImportSymbol } from "./import-symbol.js";
import type { Target } from "./target.js";
import {
  deriveImportPath,
  makeImportPath,
  rewriteImportPath,
} from "./import-path.js";
import { ParsedParameter } from "./parameter";
import { makeFilePreamble } from "./gencommon";

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
  const runtime = createRuntimeImports(parameter.bootstrapWkt);
  const createTypeImport = (desc: DescMessage | DescEnum): ImportSymbol => {
    const name = codegenInfo.localName(desc);
    const from = makeImportPath(
      desc.file,
      parameter.bootstrapWkt,
      filesToGenerate,
    );
    return createImportSymbol(name, from);
  };
  const createPreamble = (descFile: DescFile) =>
    makeFilePreamble(
      descFile,
      pluginName,
      pluginVersion,
      parameter.sanitizedParameter,
      parameter.tsNocheck,
    );
  let target: Target | undefined;
  const generatedFiles: GeneratedFileController[] = [];
  return {
    targets: parameter.targets,
    runtime,
    proto: request,
    files: filesToGenerate,
    allFiles: descriptorSet.files,
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
        (importPath: string) =>
          rewriteImportPath(
            importPath,
            parameter.rewriteImports,
            parameter.importExtension,
          ),
        createTypeImport,
        runtime,
        createPreamble,
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
