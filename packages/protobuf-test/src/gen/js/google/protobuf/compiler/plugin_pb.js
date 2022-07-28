// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Author: kenton@google.com (Kenton Varda)
//
// WARNING:  The plugin interface is currently EXPERIMENTAL and is subject to
//   change.
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

// @generated by protoc-gen-es v0.0.10 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/compiler/plugin.proto (package google.protobuf.compiler, syntax proto2)
/* eslint-disable */

import {proto2} from "@bufbuild/protobuf";
import {FileDescriptorProto, GeneratedCodeInfo} from "../descriptor_pb.js";

/**
 * The version number of protocol compiler.
 *
 * @generated from message google.protobuf.compiler.Version
 */
export const Version = proto2.makeMessageType(
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
export const CodeGeneratorRequest = proto2.makeMessageType(
  "google.protobuf.compiler.CodeGeneratorRequest",
  () => [
    { no: 1, name: "file_to_generate", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "parameter", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 15, name: "proto_file", kind: "message", T: FileDescriptorProto, repeated: true },
    { no: 3, name: "compiler_version", kind: "message", T: Version, opt: true },
  ],
);

/**
 * The plugin writes an encoded CodeGeneratorResponse to stdout.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorResponse
 */
export const CodeGeneratorResponse = proto2.makeMessageType(
  "google.protobuf.compiler.CodeGeneratorResponse",
  () => [
    { no: 1, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "supported_features", kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
    { no: 15, name: "file", kind: "message", T: CodeGeneratorResponse_File, repeated: true },
  ],
);

/**
 * Sync with code_generator.h.
 *
 * @generated from enum google.protobuf.compiler.CodeGeneratorResponse.Feature
 */
export const CodeGeneratorResponse_Feature = proto2.makeEnum(
  "google.protobuf.compiler.CodeGeneratorResponse.Feature",
  [
    {no: 0, name: "FEATURE_NONE", localName: "NONE"},
    {no: 1, name: "FEATURE_PROTO3_OPTIONAL", localName: "PROTO3_OPTIONAL"},
  ],
);

/**
 * Represents a single generated file.
 *
 * @generated from message google.protobuf.compiler.CodeGeneratorResponse.File
 */
export const CodeGeneratorResponse_File = proto2.makeMessageType(
  "google.protobuf.compiler.CodeGeneratorResponse.File",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "insertion_point", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 15, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 16, name: "generated_code_info", kind: "message", T: GeneratedCodeInfo, opt: true },
  ],
  {localName: "CodeGeneratorResponse_File"},
);

