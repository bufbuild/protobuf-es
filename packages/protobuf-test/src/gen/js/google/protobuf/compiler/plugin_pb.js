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

// @generated by protoc-gen-es v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/compiler/plugin.proto (package google.protobuf.compiler, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";
import { FileDescriptorProto, GeneratedCodeInfo } from "../descriptor_pb.js";

/**
 * The version number of protocol compiler.
 *
 * @generated from message google.protobuf.compiler.Version
 */
export const Version = /*@__PURE__*/ proto2.makeMessageType(
  "google.protobuf.compiler.Version",
  () => [
    { no: 1, name: "major", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "minor", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 3, name: "patch", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 4, name: "suffix", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

/**
 * An encoded CodeGeneratorRequest is written to the plugin's stdin.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorRequest
 */
export const CodeGeneratorRequest = /*@__PURE__*/ proto2.makeMessageType(
  "google.protobuf.compiler.CodeGeneratorRequest",
  () => [
    { no: 1, name: "file_to_generate", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "parameter", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 15, name: "proto_file", kind: "message", T: FileDescriptorProto, repeated: true },
    { no: 17, name: "source_file_descriptors", kind: "message", T: FileDescriptorProto, repeated: true },
    { no: 3, name: "compiler_version", kind: "message", T: Version, opt: true },
  ],
);

/**
 * The plugin writes an encoded CodeGeneratorResponse to stdout.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorResponse
 */
export const CodeGeneratorResponse = /*@__PURE__*/ proto2.makeMessageType(
  "google.protobuf.compiler.CodeGeneratorResponse",
  () => [
    { no: 1, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "supported_features", kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
    { no: 3, name: "minimum_edition", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 4, name: "maximum_edition", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 15, name: "file", kind: "message", T: CodeGeneratorResponse_File, repeated: true },
  ],
);

/**
 * Sync with code_generator.h.
 *
 * @generated from enum google.protobuf.compiler.CodeGeneratorResponse.Feature
 */
export const CodeGeneratorResponse_Feature = /*@__PURE__*/ proto2.makeEnum(
  "google.protobuf.compiler.CodeGeneratorResponse.Feature",
  [
    {no: 0, name: "FEATURE_NONE", localName: "NONE"},
    {no: 1, name: "FEATURE_PROTO3_OPTIONAL", localName: "PROTO3_OPTIONAL"},
    {no: 2, name: "FEATURE_SUPPORTS_EDITIONS", localName: "SUPPORTS_EDITIONS"},
  ],
);

/**
 * Represents a single generated file.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorResponse.File
 */
export const CodeGeneratorResponse_File = /*@__PURE__*/ proto2.makeMessageType(
  "google.protobuf.compiler.CodeGeneratorResponse.File",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "insertion_point", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 15, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 16, name: "generated_code_info", kind: "message", T: GeneratedCodeInfo, opt: true },
  ],
  {localName: "CodeGeneratorResponse_File"},
);

