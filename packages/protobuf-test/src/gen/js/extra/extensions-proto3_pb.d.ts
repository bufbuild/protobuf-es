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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/extensions-proto3.proto (package proto3ext, syntax proto3)
/* eslint-disable */

import type { GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { FileOptions } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/extensions-proto3.proto.
 */
export declare const file_extra_extensions_proto3: GenDescFile;

/**
 * A message used in extensions
 *
 * @generated from message proto3ext.Proto3ExtMessage
 */
export declare type Proto3ExtMessage = Message<"proto3ext.Proto3ExtMessage"> & {
  /**
   * @generated from field: string string_field = 1;
   */
  stringField: string;
};

/**
 * Describes the message proto3ext.Proto3ExtMessage.
 * Use `create(Proto3ExtMessageSchema)` to create a new message.
 */
export declare const Proto3ExtMessageSchema: GenDescMessage<Proto3ExtMessage>;

/**
 * @generated from extension: uint32 uint32_ext = 1001;
 */
export declare const uint32_ext: GenDescExtension<FileOptions, number>;

/**
 * @generated from extension: optional uint32 optional_uint32_ext = 1002;
 */
export declare const optional_uint32_ext: GenDescExtension<FileOptions, number>;

/**
 * @generated from extension: repeated uint32 packed_uint32_ext = 7003;
 */
export declare const packed_uint32_ext: GenDescExtension<FileOptions, number[]>;

/**
 * @generated from extension: repeated uint32 unpacked_uint32_ext = 7004 [packed = false];
 */
export declare const unpacked_uint32_ext: GenDescExtension<FileOptions, number[]>;

/**
 * @generated from extension: proto3ext.Proto3ExtMessage message_ext = 7005;
 */
export declare const message_ext: GenDescExtension<FileOptions, Proto3ExtMessage>;

