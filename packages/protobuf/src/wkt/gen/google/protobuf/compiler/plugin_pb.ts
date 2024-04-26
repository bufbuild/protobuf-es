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

// Author: kenton@google.com (Kenton Varda)
//
// protoc (aka the Protocol Compiler) can be extended via plugins.  A plugin is
// just a program that reads a CodeGeneratorRequest from stdin and writes a
// CodeGeneratorResponse to stdout.
//
// Plugins written using C++ can use google/protobuf/compiler/plugin.h instead
// of dealing with the raw protocol defined here.
//
// A plugin executable needs only to be placed somewhere in the path.  The
// plugin should be named "protoc-gen-$NAME", and will then be used when the
// flag "--${NAME}_out" is passed to protoc.

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "bootstrap_wkt=true,target=ts"
// @generated from file google/protobuf/compiler/plugin.proto (package google.protobuf.compiler, syntax proto2)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "../../../../../codegenv1/types.js";
import { fileDesc } from "../../../../../codegenv1/file.js";
import type { FileDescriptorProto, GeneratedCodeInfo } from "../descriptor_pb.js";
import { fileDesc_google_protobuf_descriptor } from "../descriptor_pb.js";
import type { Message } from "../../../../../types.js";
import { messageDesc } from "../../../../../codegenv1/message.js";
import { enumDesc } from "../../../../../codegenv1/enum.js";

/**
 * Describes the file google/protobuf/compiler/plugin.proto.
 */
export const fileDesc_google_protobuf_compiler_plugin: GenDescFile = /*@__PURE__*/
  fileDesc("CiVnb29nbGUvcHJvdG9idWYvY29tcGlsZXIvcGx1Z2luLnByb3RvEhhnb29nbGUucHJvdG9idWYuY29tcGlsZXIiRgoHVmVyc2lvbhINCgVtYWpvchgBIAEoBRINCgVtaW5vchgCIAEoBRINCgVwYXRjaBgDIAEoBRIOCgZzdWZmaXgYBCABKAkigQIKFENvZGVHZW5lcmF0b3JSZXF1ZXN0EhgKEGZpbGVfdG9fZ2VuZXJhdGUYASADKAkSEQoJcGFyYW1ldGVyGAIgASgJEjgKCnByb3RvX2ZpbGUYDyADKAsyJC5nb29nbGUucHJvdG9idWYuRmlsZURlc2NyaXB0b3JQcm90bxJFChdzb3VyY2VfZmlsZV9kZXNjcmlwdG9ycxgRIAMoCzIkLmdvb2dsZS5wcm90b2J1Zi5GaWxlRGVzY3JpcHRvclByb3RvEjsKEGNvbXBpbGVyX3ZlcnNpb24YAyABKAsyIS5nb29nbGUucHJvdG9idWYuY29tcGlsZXIuVmVyc2lvbiKSAwoVQ29kZUdlbmVyYXRvclJlc3BvbnNlEg0KBWVycm9yGAEgASgJEhoKEnN1cHBvcnRlZF9mZWF0dXJlcxgCIAEoBBIXCg9taW5pbXVtX2VkaXRpb24YAyABKAUSFwoPbWF4aW11bV9lZGl0aW9uGAQgASgFEkIKBGZpbGUYDyADKAsyNC5nb29nbGUucHJvdG9idWYuY29tcGlsZXIuQ29kZUdlbmVyYXRvclJlc3BvbnNlLkZpbGUafwoERmlsZRIMCgRuYW1lGAEgASgJEhcKD2luc2VydGlvbl9wb2ludBgCIAEoCRIPCgdjb250ZW50GA8gASgJEj8KE2dlbmVyYXRlZF9jb2RlX2luZm8YECABKAsyIi5nb29nbGUucHJvdG9idWYuR2VuZXJhdGVkQ29kZUluZm8iVwoHRmVhdHVyZRIQCgxGRUFUVVJFX05PTkUQABIbChdGRUFUVVJFX1BST1RPM19PUFRJT05BTBABEh0KGUZFQVRVUkVfU1VQUE9SVFNfRURJVElPTlMQAkJyChxjb20uZ29vZ2xlLnByb3RvYnVmLmNvbXBpbGVyQgxQbHVnaW5Qcm90b3NaKWdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL3BsdWdpbnBiqgIYR29vZ2xlLlByb3RvYnVmLkNvbXBpbGVy", [fileDesc_google_protobuf_descriptor]);

/**
 * The version number of protocol compiler.
 *
 * @generated from message google.protobuf.compiler.Version
 */
export type Version = Message<"google.protobuf.compiler.Version"> & {
  /**
   * @generated from field: optional int32 major = 1;
   */
  major: number;

  /**
   * @generated from field: optional int32 minor = 2;
   */
  minor: number;

  /**
   * @generated from field: optional int32 patch = 3;
   */
  patch: number;

  /**
   * A suffix for alpha, beta or rc release, e.g., "alpha-1", "rc2". It should
   * be empty for mainline stable releases.
   *
   * @generated from field: optional string suffix = 4;
   */
  suffix: string;
};

/**
 * Describes the message google.protobuf.compiler.Version.
 * Use `create(VersionDesc)` to create a new message.
 */
export const VersionDesc: GenDescMessage<Version> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_compiler_plugin, 0);

/**
 * An encoded CodeGeneratorRequest is written to the plugin's stdin.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorRequest
 */
export type CodeGeneratorRequest = Message<"google.protobuf.compiler.CodeGeneratorRequest"> & {
  /**
   * The .proto files that were explicitly listed on the command-line.  The
   * code generator should generate code only for these files.  Each file's
   * descriptor will be included in proto_file, below.
   *
   * @generated from field: repeated string file_to_generate = 1;
   */
  fileToGenerate: string[];

  /**
   * The generator parameter passed on the command-line.
   *
   * @generated from field: optional string parameter = 2;
   */
  parameter: string;

  /**
   * FileDescriptorProtos for all files in files_to_generate and everything
   * they import.  The files will appear in topological order, so each file
   * appears before any file that imports it.
   *
   * Note: the files listed in files_to_generate will include runtime-retention
   * options only, but all other files will include source-retention options.
   * The source_file_descriptors field below is available in case you need
   * source-retention options for files_to_generate.
   *
   * protoc guarantees that all proto_files will be written after
   * the fields above, even though this is not technically guaranteed by the
   * protobuf wire format.  This theoretically could allow a plugin to stream
   * in the FileDescriptorProtos and handle them one by one rather than read
   * the entire set into memory at once.  However, as of this writing, this
   * is not similarly optimized on protoc's end -- it will store all fields in
   * memory at once before sending them to the plugin.
   *
   * Type names of fields and extensions in the FileDescriptorProto are always
   * fully qualified.
   *
   * @generated from field: repeated google.protobuf.FileDescriptorProto proto_file = 15;
   */
  protoFile: FileDescriptorProto[];

  /**
   * File descriptors with all options, including source-retention options.
   * These descriptors are only provided for the files listed in
   * files_to_generate.
   *
   * @generated from field: repeated google.protobuf.FileDescriptorProto source_file_descriptors = 17;
   */
  sourceFileDescriptors: FileDescriptorProto[];

  /**
   * The version number of protocol compiler.
   *
   * @generated from field: optional google.protobuf.compiler.Version compiler_version = 3;
   */
  compilerVersion?: Version;
};

/**
 * Describes the message google.protobuf.compiler.CodeGeneratorRequest.
 * Use `create(CodeGeneratorRequestDesc)` to create a new message.
 */
export const CodeGeneratorRequestDesc: GenDescMessage<CodeGeneratorRequest> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_compiler_plugin, 1);

/**
 * The plugin writes an encoded CodeGeneratorResponse to stdout.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorResponse
 */
export type CodeGeneratorResponse = Message<"google.protobuf.compiler.CodeGeneratorResponse"> & {
  /**
   * Error message.  If non-empty, code generation failed.  The plugin process
   * should exit with status code zero even if it reports an error in this way.
   *
   * This should be used to indicate errors in .proto files which prevent the
   * code generator from generating correct code.  Errors which indicate a
   * problem in protoc itself -- such as the input CodeGeneratorRequest being
   * unparseable -- should be reported by writing a message to stderr and
   * exiting with a non-zero status code.
   *
   * @generated from field: optional string error = 1;
   */
  error: string;

  /**
   * A bitmask of supported features that the code generator supports.
   * This is a bitwise "or" of values from the Feature enum.
   *
   * @generated from field: optional uint64 supported_features = 2;
   */
  supportedFeatures: bigint;

  /**
   * The minimum edition this plugin supports.  This will be treated as an
   * Edition enum, but we want to allow unknown values.  It should be specified
   * according the edition enum value, *not* the edition number.  Only takes
   * effect for plugins that have FEATURE_SUPPORTS_EDITIONS set.
   *
   * @generated from field: optional int32 minimum_edition = 3;
   */
  minimumEdition: number;

  /**
   * The maximum edition this plugin supports.  This will be treated as an
   * Edition enum, but we want to allow unknown values.  It should be specified
   * according the edition enum value, *not* the edition number.  Only takes
   * effect for plugins that have FEATURE_SUPPORTS_EDITIONS set.
   *
   * @generated from field: optional int32 maximum_edition = 4;
   */
  maximumEdition: number;

  /**
   * @generated from field: repeated google.protobuf.compiler.CodeGeneratorResponse.File file = 15;
   */
  file: CodeGeneratorResponse_File[];
};

/**
 * Describes the message google.protobuf.compiler.CodeGeneratorResponse.
 * Use `create(CodeGeneratorResponseDesc)` to create a new message.
 */
export const CodeGeneratorResponseDesc: GenDescMessage<CodeGeneratorResponse> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_compiler_plugin, 2);

/**
 * Represents a single generated file.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorResponse.File
 */
export type CodeGeneratorResponse_File = Message<"google.protobuf.compiler.CodeGeneratorResponse.File"> & {
  /**
   * The file name, relative to the output directory.  The name must not
   * contain "." or ".." components and must be relative, not be absolute (so,
   * the file cannot lie outside the output directory).  "/" must be used as
   * the path separator, not "\".
   *
   * If the name is omitted, the content will be appended to the previous
   * file.  This allows the generator to break large files into small chunks,
   * and allows the generated text to be streamed back to protoc so that large
   * files need not reside completely in memory at one time.  Note that as of
   * this writing protoc does not optimize for this -- it will read the entire
   * CodeGeneratorResponse before writing files to disk.
   *
   * @generated from field: optional string name = 1;
   */
  name: string;

  /**
   * If non-empty, indicates that the named file should already exist, and the
   * content here is to be inserted into that file at a defined insertion
   * point.  This feature allows a code generator to extend the output
   * produced by another code generator.  The original generator may provide
   * insertion points by placing special annotations in the file that look
   * like:
   *   @@protoc_insertion_point(NAME)
   * The annotation can have arbitrary text before and after it on the line,
   * which allows it to be placed in a comment.  NAME should be replaced with
   * an identifier naming the point -- this is what other generators will use
   * as the insertion_point.  Code inserted at this point will be placed
   * immediately above the line containing the insertion point (thus multiple
   * insertions to the same point will come out in the order they were added).
   * The double-@ is intended to make it unlikely that the generated code
   * could contain things that look like insertion points by accident.
   *
   * For example, the C++ code generator places the following line in the
   * .pb.h files that it generates:
   *   // @@protoc_insertion_point(namespace_scope)
   * This line appears within the scope of the file's package namespace, but
   * outside of any particular class.  Another plugin can then specify the
   * insertion_point "namespace_scope" to generate additional classes or
   * other declarations that should be placed in this scope.
   *
   * Note that if the line containing the insertion point begins with
   * whitespace, the same whitespace will be added to every line of the
   * inserted text.  This is useful for languages like Python, where
   * indentation matters.  In these languages, the insertion point comment
   * should be indented the same amount as any inserted code will need to be
   * in order to work correctly in that context.
   *
   * The code generator that generates the initial file and the one which
   * inserts into it must both run as part of a single invocation of protoc.
   * Code generators are executed in the order in which they appear on the
   * command line.
   *
   * If |insertion_point| is present, |name| must also be present.
   *
   * @generated from field: optional string insertion_point = 2;
   */
  insertionPoint: string;

  /**
   * The file contents.
   *
   * @generated from field: optional string content = 15;
   */
  content: string;

  /**
   * Information describing the file content being inserted. If an insertion
   * point is used, this information will be appropriately offset and inserted
   * into the code generation metadata for the generated files.
   *
   * @generated from field: optional google.protobuf.GeneratedCodeInfo generated_code_info = 16;
   */
  generatedCodeInfo?: GeneratedCodeInfo;
};

/**
 * Describes the message google.protobuf.compiler.CodeGeneratorResponse.File.
 * Use `create(CodeGeneratorResponse_FileDesc)` to create a new message.
 */
export const CodeGeneratorResponse_FileDesc: GenDescMessage<CodeGeneratorResponse_File> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_compiler_plugin, 2, 0);

/**
 * Sync with code_generator.h.
 *
 * @generated from enum google.protobuf.compiler.CodeGeneratorResponse.Feature
 */
export enum CodeGeneratorResponse_Feature {
  /**
   * @generated from enum value: FEATURE_NONE = 0;
   */
  NONE = 0,

  /**
   * @generated from enum value: FEATURE_PROTO3_OPTIONAL = 1;
   */
  PROTO3_OPTIONAL = 1,

  /**
   * @generated from enum value: FEATURE_SUPPORTS_EDITIONS = 2;
   */
  SUPPORTS_EDITIONS = 2,
}

/**
 * Describes the enum google.protobuf.compiler.CodeGeneratorResponse.Feature.
 */
export const CodeGeneratorResponse_FeatureDesc: GenDescEnum<CodeGeneratorResponse_Feature> = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_compiler_plugin, 2, 0);

