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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file extra/extensions-proto3.proto (package proto3ext, syntax proto3)
/* eslint-disable */

import type { GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { FileOptions } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/extensions-proto3.proto.
 */
export const file_extra_extensions_proto3: GenDescFile = /*@__PURE__*/
  fileDesc("Ch1leHRyYS9leHRlbnNpb25zLXByb3RvMy5wcm90bxIJcHJvdG8zZXh0IigKEFByb3RvM0V4dE1lc3NhZ2USFAoMc3RyaW5nX2ZpZWxkGAEgASgJOjwKCnVpbnQzMl9leHQSHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMY6QcgASgNUgl1aW50MzJFeHQ6UAoTb3B0aW9uYWxfdWludDMyX2V4dBIcLmdvb2dsZS5wcm90b2J1Zi5GaWxlT3B0aW9ucxjqByABKA1SEW9wdGlvbmFsVWludDMyRXh0iAEBOkkKEXBhY2tlZF91aW50MzJfZXh0EhwuZ29vZ2xlLnByb3RvYnVmLkZpbGVPcHRpb25zGNs2IAMoDVIPcGFja2VkVWludDMyRXh0OlEKE3VucGFja2VkX3VpbnQzMl9leHQSHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMY3DYgAygNQgIQAFIRdW5wYWNrZWRVaW50MzJFeHQ6WwoLbWVzc2FnZV9leHQSHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMY3TYgASgLMhsucHJvdG8zZXh0LlByb3RvM0V4dE1lc3NhZ2VSCm1lc3NhZ2VFeHRiBnByb3RvMw", [file_google_protobuf_descriptor]);

/**
 * A message used in extensions
 *
 * @generated from message proto3ext.Proto3ExtMessage
 */
export type Proto3ExtMessage = Message<"proto3ext.Proto3ExtMessage"> & {
  /**
   * @generated from field: string string_field = 1;
   */
  stringField: string;
};

/**
 * JSON type for the message proto3ext.Proto3ExtMessage.
 */
export type Proto3ExtMessageJson = {
  /**
   * @generated from field: string string_field = 1;
   */
  stringField?: string;
};

/**
 * Describes the message proto3ext.Proto3ExtMessage.
 * Use `create(Proto3ExtMessageSchema)` to create a new message.
 */
export const Proto3ExtMessageSchema: GenDescMessage<Proto3ExtMessage, Proto3ExtMessageJson> = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto3, 0);

/**
 * @generated from extension: uint32 uint32_ext = 1001;
 */
export const uint32_ext: GenDescExtension<FileOptions, number> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto3, 0);

/**
 * @generated from extension: optional uint32 optional_uint32_ext = 1002;
 */
export const optional_uint32_ext: GenDescExtension<FileOptions, number> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto3, 1);

/**
 * @generated from extension: repeated uint32 packed_uint32_ext = 7003;
 */
export const packed_uint32_ext: GenDescExtension<FileOptions, number[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto3, 2);

/**
 * @generated from extension: repeated uint32 unpacked_uint32_ext = 7004 [packed = false];
 */
export const unpacked_uint32_ext: GenDescExtension<FileOptions, number[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto3, 3);

/**
 * @generated from extension: proto3ext.Proto3ExtMessage message_ext = 7005;
 */
export const message_ext: GenDescExtension<FileOptions, Proto3ExtMessage> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto3, 4);

