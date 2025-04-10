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

export declare class UpstreamProtobuf {
  constructor(temp?: string, version?: string);

  version(): string;

  getProtocPath(): Promise<string>;

  getFeatureSetDefaults(
    minimumEdition?: string,
    maximumEdition?: string,
    filesOrContent?: string | Record<string, string>,
  ): Promise<Uint8Array>;

  compileToDescriptorSet(
    fileContent: string,
    opt?: CompileToDescriptorSetOptions,
  ): Promise<Uint8Array>;
  compileToDescriptorSet(
    files: Record<string, string>,
    opt?: CompileToDescriptorSetOptions,
  ): Promise<Uint8Array>;

  createCodeGeneratorRequest(
    fileContent: string,
    opt?: CreateCodeGeneratorRequestOptions,
  ): Promise<Uint8Array>;
  createCodeGeneratorRequest(
    files: Record<string, string>,
    opt?: CreateCodeGeneratorRequestOptions,
  ): Promise<Uint8Array>;

  getTestProtoInclude(): Promise<{
    dir: string;
    files: string[];
  }>;

  getWktProtoInclude(): Promise<{
    dir: string;
    files: string[];
  }>;
}

interface CreateCodeGeneratorRequestOptions {
  filesToGenerate?: string[];
  parameter?: string;
}

interface CompileToDescriptorSetOptions {
  /**
   * Also include all dependencies of the input files in the set, so that the set is self-contained.
   */
  includeImports?: boolean;
  /**
   * Do not strip SourceCodeInfo from the FileDescriptorProto.
   */
  includeSourceInfo?: boolean;
  /**
   * Do not strip any options from the FileDescriptorProto.
   */
  retainOptions?: boolean;
  /**
   * Enable compiling unreleased editions in protoc (undocumented flag `--experimental_editions`).
   */
  experimentalEditions?: boolean;
}
