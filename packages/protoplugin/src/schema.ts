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
  DescEnum,
  DescExtension,
  DescFile,
  DescMessage,
  DescService,
} from "@bufbuild/protobuf";
import { create, createFileRegistry } from "@bufbuild/protobuf";
import type { CodeGeneratorRequest } from "@bufbuild/protobuf/wkt";
import { Edition, FileDescriptorSetSchema } from "@bufbuild/protobuf/wkt";
import { nestedTypes } from "@bufbuild/protobuf/reflect";
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
import { deriveImportPath, rewriteImportPath } from "./import-path.js";
import type {
  EcmaScriptPluginOptions,
  ParsedParameter,
  Target,
} from "./parameter.js";
import { makeFilePreamble } from "./file-preamble.js";
import {
  generatedDescName,
  generatedShapeName,
  generateFilePath,
  generatedJsonTypeName,
} from "./names.js";
import { createRuntimeImports } from "./runtime-imports.js";

/**
 * Schema describes the files and types that the plugin is requested to
 * generate.
 */
export interface Schema<Options extends object = object> {
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
   * Parsed plugin options. They include the standard options for all
   * plugins, and options parsed by your plugin.
   */
  readonly options: Options & EcmaScriptPluginOptions;

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

interface SchemaController<Options extends object> extends Schema<Options> {
  getFileInfo: () => FileInfo[];
  prepareGenerate(target: Target): void;
}

export function createSchema<T extends object>(
  request: CodeGeneratorRequest,
  parameter: ParsedParameter<T>,
  pluginName: string,
  pluginVersion: string,
  minimumEdition: Edition,
  maximumEdition: Edition,
): SchemaController<T> {
  const { allFiles, filesToGenerate } = getFilesToGenerate(
    request,
    minimumEdition,
    maximumEdition,
  );
  let target: Target | undefined;
  const generatedFiles: GeneratedFileController[] = [];
  const runtime = createRuntimeImports(parameter.parsed.bootstrapWkt);
  const resolveDescImport: ResolveDescImportFn = (desc, typeOnly) =>
    createImportSymbol(
      generatedDescName(desc),
      generateFilePath(
        desc.kind == "file" ? desc : desc.file,
        parameter.parsed.bootstrapWkt,
        filesToGenerate,
      ),
      typeOnly,
    );
  const resolveShapeImport: ResolveShapeImportFn = (desc) =>
    createImportSymbol(
      generatedShapeName(desc),
      generateFilePath(
        desc.file,
        parameter.parsed.bootstrapWkt,
        filesToGenerate,
      ),
      true,
    );
  const resolveJsonImport: ResolveShapeImportFn = (desc) =>
    createImportSymbol(
      generatedJsonTypeName(desc),
      generateFilePath(
        desc.file,
        parameter.parsed.bootstrapWkt,
        filesToGenerate,
      ),
      true,
    );
  const createPreamble: CreatePreambleFn = (descFile) =>
    makeFilePreamble(
      descFile,
      pluginName,
      pluginVersion,
      parameter.sanitized,
      parameter.parsed.tsNocheck,
    );
  const rewriteImport: RewriteImportFn = (importPath) =>
    rewriteImportPath(
      importPath,
      parameter.parsed.rewriteImports,
      parameter.parsed.importExtension,
    );
  return {
    targets: parameter.parsed.targets,
    proto: request,
    files: filesToGenerate,
    allFiles: allFiles,
    options: parameter.parsed,
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
        target === "js" ? parameter.parsed.jsImportStyle : "module", // ts and dts always use import/export, only js may use commonjs
        rewriteImport,
        resolveDescImport,
        resolveShapeImport,
        resolveJsonImport,
        createPreamble,
        runtime,
      );
      generatedFiles.push(genFile);
      return genFile;
    },
    getFileInfo() {
      return generatedFiles
        .map((f) => f.getFileInfo())
        .filter(
          (fi) => parameter.parsed.keepEmptyFiles || fi.content.length > 0,
        );
    },
    prepareGenerate(newTarget) {
      target = newTarget;
    },
  };
}

function getFilesToGenerate(
  request: CodeGeneratorRequest,
  minimumEdition: Edition,
  maximumEdition: Edition,
): { filesToGenerate: DescFile[]; allFiles: DescFile[] } {
  if (minimumEdition > maximumEdition) {
    throw new Error(
      `configured minimumEdition ${editionToString(minimumEdition)} > maximumEdition ${editionToString(maximumEdition)} - please contact plugin author`,
    );
  }
  const missing = request.fileToGenerate.filter(
    (fileToGenerate) =>
      !request.protoFile.find((f) => f.name === fileToGenerate),
  );
  if (missing.length) {
    throw new Error(
      `files_to_generate missing in the request: ${missing.join(", ")}`,
    );
  }
  for (const file of request.protoFile) {
    if (request.fileToGenerate.includes(file.name)) {
      let edition: Edition;
      switch (file.syntax) {
        case "":
        case "proto2":
          edition = Edition.EDITION_PROTO2;
          break;
        case "proto3":
          edition = Edition.EDITION_PROTO3;
          break;
        case "editions":
          edition = file.edition;
          break;
        default:
          edition = Edition.EDITION_UNKNOWN;
          break;
      }
      if (edition < minimumEdition) {
        throw new Error(
          `${file.name}: unsupported edition ${editionToString(edition)} - the earliest supported edition is ${editionToString(minimumEdition)}`,
        );
      }
      if (edition > maximumEdition) {
        throw new Error(
          `${file.name}: unsupported edition ${editionToString(edition)} - the latest supported edition is ${editionToString(maximumEdition)}`,
        );
      }
    }
  }
  // Our goal is to provide options with source retention to plugin authors.
  // CodeGeneratorRequest.proto_file elides options with source retention for
  // files to generate. For these files, we take the file from source_file_descriptors,
  // which does include options with source retention.
  const allProtoWithSourceOptions = request.protoFile.map((protoFile) => {
    const sourceFile = request.sourceFileDescriptors.find(
      (s) => s.name == protoFile.name,
    );
    return sourceFile ?? protoFile;
  });
  const registry = createFileRegistry(
    create(FileDescriptorSetSchema, {
      file: allProtoWithSourceOptions,
    }),
  );
  const allFiles: DescFile[] = [];
  const filesToGenerate: DescFile[] = [];
  for (const file of registry.files) {
    allFiles.push(file);
    if (request.fileToGenerate.includes(file.proto.name)) {
      filesToGenerate.push(file);
    }
  }
  return { allFiles, filesToGenerate };
}

function editionToString(edition: number): string {
  if (edition in Edition) {
    return Edition[edition].replace(/^EDITION_/, "");
  }
  return `unknown (${edition})`;
}
