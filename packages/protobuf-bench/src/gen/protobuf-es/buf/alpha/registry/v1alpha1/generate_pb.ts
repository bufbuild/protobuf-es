// Copyright 2020-2022 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.1.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/alpha/registry/v1alpha1/generate.proto (package buf.alpha.registry.v1alpha1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { CodeGeneratorResponse, Message, proto3 } from "@bufbuild/protobuf";
import { Image } from "../../image/v1/image_pb.js";

/**
 * File defines a file with a path and some content.
 *
 * @generated from message buf.alpha.registry.v1alpha1.File
 */
export class File extends Message<File> {
  /**
   * path is the relative path of the file.
   * Path can only use '/' as the separator character, and includes no ".." components.
   *
   * @generated from field: string path = 1;
   */
  path = "";

  /**
   * content is the content of the file.
   *
   * @generated from field: bytes content = 2;
   */
  content = new Uint8Array(0);

  constructor(data?: PartialMessage<File>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.File";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "path", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): File {
    return new File().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): File {
    return new File().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): File {
    return new File().fromJsonString(jsonString, options);
  }

  static equals(a: File | PlainMessage<File> | undefined, b: File | PlainMessage<File> | undefined): boolean {
    return proto3.util.equals(File, a, b);
  }
}

/**
 * RuntimeLibrary describes a pinned runtime library dependency of the generated code.
 *
 * @generated from message buf.alpha.registry.v1alpha1.RuntimeLibrary
 */
export class RuntimeLibrary extends Message<RuntimeLibrary> {
  /**
   * The name of the runtime library dependency. The format should match the
   * format used for dependencies in the dependency management tooling of the
   * associated language ecosystem. This is set by the user using Dockerfile Labels.
   * For example, for the plugin "protoc-gen-go", this might be "google.golang.org/protobuf".
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * The version of the runtime library dependency associated with the generated
   * code. The format should match the format used for dependency versions in the
   * dependency management tooling of the associated language ecosystem.
   * This is set by the user using Dockerfile Labels.
   * For example, for the plugin "protoc-gen-go", this might be "v1.26.0".
   *
   * @generated from field: string version = 2;
   */
  version = "";

  constructor(data?: PartialMessage<RuntimeLibrary>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.RuntimeLibrary";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RuntimeLibrary {
    return new RuntimeLibrary().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RuntimeLibrary {
    return new RuntimeLibrary().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RuntimeLibrary {
    return new RuntimeLibrary().fromJsonString(jsonString, options);
  }

  static equals(a: RuntimeLibrary | PlainMessage<RuntimeLibrary> | undefined, b: RuntimeLibrary | PlainMessage<RuntimeLibrary> | undefined): boolean {
    return proto3.util.equals(RuntimeLibrary, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.PluginReference
 */
export class PluginReference extends Message<PluginReference> {
  /**
   * The owner of the plugin which identifies the
   * plugins to use with this generation.
   *
   * @generated from field: string owner = 1;
   */
  owner = "";

  /**
   * The name of the plugin which identifies the
   * plugins to use with this generation.
   *
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * The plugin version to use with this generation.
   *
   * @generated from field: string version = 3;
   */
  version = "";

  /**
   * The parameters to pass to the plugin. These will
   * be merged into a single, comma-separated string.
   *
   * @generated from field: repeated string parameters = 4;
   */
  parameters: string[] = [];

  constructor(data?: PartialMessage<PluginReference>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.PluginReference";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "parameters", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PluginReference {
    return new PluginReference().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PluginReference {
    return new PluginReference().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PluginReference {
    return new PluginReference().fromJsonString(jsonString, options);
  }

  static equals(a: PluginReference | PlainMessage<PluginReference> | undefined, b: PluginReference | PlainMessage<PluginReference> | undefined): boolean {
    return proto3.util.equals(PluginReference, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GeneratePluginsRequest
 */
export class GeneratePluginsRequest extends Message<GeneratePluginsRequest> {
  /**
   * The image to run plugins against to generate the desired file outputs.
   *
   * All image files that are not imports and not well-known types will be generated.
   * If you want to filter what files are generated, modify the image.
   * If you want to include imports, set include_imports.
   *
   * @generated from field: buf.alpha.image.v1.Image image = 1;
   */
  image?: Image;

  /**
   * The array of plugins to use.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.PluginReference plugins = 2;
   */
  plugins: PluginReference[] = [];

  /**
   * Include imports from the Image in generation.
   *
   * @generated from field: bool include_imports = 3;
   */
  includeImports = false;

  /**
   * Include Well-Known Types from the Image in generation.
   *
   * include_imports must be set if include_well_known_types is set.
   *
   * @generated from field: bool include_well_known_types = 4;
   */
  includeWellKnownTypes = false;

  constructor(data?: PartialMessage<GeneratePluginsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GeneratePluginsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "image", kind: "message", T: Image },
    { no: 2, name: "plugins", kind: "message", T: PluginReference, repeated: true },
    { no: 3, name: "include_imports", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "include_well_known_types", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GeneratePluginsRequest {
    return new GeneratePluginsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GeneratePluginsRequest {
    return new GeneratePluginsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GeneratePluginsRequest {
    return new GeneratePluginsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GeneratePluginsRequest | PlainMessage<GeneratePluginsRequest> | undefined, b: GeneratePluginsRequest | PlainMessage<GeneratePluginsRequest> | undefined): boolean {
    return proto3.util.equals(GeneratePluginsRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GeneratePluginsResponse
 */
export class GeneratePluginsResponse extends Message<GeneratePluginsResponse> {
  /**
   * Contains all the responses from the generated plugins. The order
   * is defined by the order of the plugins in the request.
   *
   * @generated from field: repeated google.protobuf.compiler.CodeGeneratorResponse responses = 1;
   */
  responses: CodeGeneratorResponse[] = [];

  /**
   * An optional array defining runtime libraries that the generated code
   * requires to run, as specified by the plugin author. This may contain
   * duplicate entries as the generation can be the result of multiple plugins,
   * each of which declares its own runtime library dependencies. The libraries
   * returned are lexicographically ordered by their name, but not deduplicated.
   * How to handle duplicate libraries is left to the user.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RuntimeLibrary runtime_libraries = 2;
   */
  runtimeLibraries: RuntimeLibrary[] = [];

  constructor(data?: PartialMessage<GeneratePluginsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GeneratePluginsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "responses", kind: "message", T: CodeGeneratorResponse, repeated: true },
    { no: 2, name: "runtime_libraries", kind: "message", T: RuntimeLibrary, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GeneratePluginsResponse {
    return new GeneratePluginsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GeneratePluginsResponse {
    return new GeneratePluginsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GeneratePluginsResponse {
    return new GeneratePluginsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GeneratePluginsResponse | PlainMessage<GeneratePluginsResponse> | undefined, b: GeneratePluginsResponse | PlainMessage<GeneratePluginsResponse> | undefined): boolean {
    return proto3.util.equals(GeneratePluginsResponse, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GenerateTemplateRequest
 */
export class GenerateTemplateRequest extends Message<GenerateTemplateRequest> {
  /**
   * The image to run plugins against to generate the desired file outputs.
   *
   * All image files that are not imports and not well-known types will be generated.
   * If you want to filter what files are generated, modify the image.
   * If you want to include imports, set include_imports.
   *
   * @generated from field: buf.alpha.image.v1.Image image = 1;
   */
  image?: Image;

  /**
   * The owner of the template which identifies the
   * plugins to use with this generation.
   *
   * @generated from field: string template_owner = 2;
   */
  templateOwner = "";

  /**
   * The name of the template which identifies the
   * plugins to use with this generation.
   *
   * @generated from field: string template_name = 3;
   */
  templateName = "";

  /**
   * The template version to use to determine the
   * plugin versions in the template.
   *
   * @generated from field: string template_version = 4;
   */
  templateVersion = "";

  /**
   * Include imports from the Image in generation.
   *
   * @generated from field: bool include_imports = 5;
   */
  includeImports = false;

  /**
   * Include Well-Known Types from the Image in generation.
   *
   * include_imports must be set if include_well_known_types is set.
   *
   * @generated from field: bool include_well_known_types = 6;
   */
  includeWellKnownTypes = false;

  constructor(data?: PartialMessage<GenerateTemplateRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GenerateTemplateRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "image", kind: "message", T: Image },
    { no: 2, name: "template_owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "template_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "template_version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "include_imports", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "include_well_known_types", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GenerateTemplateRequest {
    return new GenerateTemplateRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GenerateTemplateRequest {
    return new GenerateTemplateRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GenerateTemplateRequest {
    return new GenerateTemplateRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GenerateTemplateRequest | PlainMessage<GenerateTemplateRequest> | undefined, b: GenerateTemplateRequest | PlainMessage<GenerateTemplateRequest> | undefined): boolean {
    return proto3.util.equals(GenerateTemplateRequest, a, b);
  }
}

/**
 * @generated from message buf.alpha.registry.v1alpha1.GenerateTemplateResponse
 */
export class GenerateTemplateResponse extends Message<GenerateTemplateResponse> {
  /**
   * files contains all the files output by the generation,
   * in lexicographical order.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.File files = 1;
   */
  files: File[] = [];

  /**
   * An optional array defining runtime libraries that the generated code
   * requires to run. This may contain duplicate entries as the generation
   * can be the result of multiple plugins, each of which declares its own
   * runtime library dependencies.
   *
   * @generated from field: repeated buf.alpha.registry.v1alpha1.RuntimeLibrary runtime_libraries = 2;
   */
  runtimeLibraries: RuntimeLibrary[] = [];

  constructor(data?: PartialMessage<GenerateTemplateResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.alpha.registry.v1alpha1.GenerateTemplateResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "files", kind: "message", T: File, repeated: true },
    { no: 2, name: "runtime_libraries", kind: "message", T: RuntimeLibrary, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GenerateTemplateResponse {
    return new GenerateTemplateResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GenerateTemplateResponse {
    return new GenerateTemplateResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GenerateTemplateResponse {
    return new GenerateTemplateResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GenerateTemplateResponse | PlainMessage<GenerateTemplateResponse> | undefined, b: GenerateTemplateResponse | PlainMessage<GenerateTemplateResponse> | undefined): boolean {
    return proto3.util.equals(GenerateTemplateResponse, a, b);
  }
}

