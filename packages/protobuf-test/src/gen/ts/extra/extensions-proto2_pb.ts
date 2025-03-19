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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts,import_extension=js"
// @generated from file extra/extensions-proto2.proto (package proto2ext, syntax proto2)
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { User } from "./example_pb.js";
import { file_extra_example } from "./example_pb.js";
import { file_google_protobuf_struct, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/extensions-proto2.proto.
 */
export const file_extra_extensions_proto2: GenFile = /*@__PURE__*/
  fileDesc("Ch1leHRyYS9leHRlbnNpb25zLXByb3RvMi5wcm90bxIJcHJvdG8yZXh0IisKDlByb3RvMkV4dGVuZGVlEhEKCW93bl9maWVsZBgBIAEoBSoGCOgHEJBOIjAKEFByb3RvMkV4dE1lc3NhZ2USFAoMc3RyaW5nX2ZpZWxkGAEgASgJKgYIhAcQhQciIAoIR3JvdXBFeHQSCQoBYRgBIAEoBRIJCgFiGAIgASgFIigKEFJlcGVhdGVkR3JvdXBFeHQSCQoBYRgBIAEoBRIJCgFiGAIgASgFIpMBChJQcm90bzJFeHRDb250YWluZXIaQgoFQ2hpbGQyOQoKdWludDMyX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRiyRiABKA1SCXVpbnQzMkV4dDI5Cgp1aW50MzJfZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGKlGIAEoDVIJdWludDMyRXh0KkAKDVByb3RvMkV4dEVudW0SFwoTUFJPVE8yX0VYVF9FTlVNX1lFUxABEhYKElBST1RPMl9FWFRfRU5VTV9OTxACOjkKCnVpbnQzMl9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY6QcgASgNUgl1aW50MzJFeHQ6VgoXdWludDMyX2V4dF93aXRoX2RlZmF1bHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY6gcgASgNOgM5OTlSFHVpbnQzMkV4dFdpdGhEZWZhdWx0OjkKCnN0cmluZ19leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY0Q8gASgJUglzdHJpbmdFeHQ6XgoXc3RyaW5nX2V4dF93aXRoX2RlZmF1bHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY0g8gASgJOgtoZWxsbyAiICovIFIUc3RyaW5nRXh0V2l0aERlZmF1bHQ6OQoKdWludDY0X2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRi5FyABKARSCXVpbnQ2NEV4dDpPChR1aW50NjRfZXh0X2pzX3N0cmluZxIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRi6FyABKARCAjABUhF1aW50NjRFeHRKc1N0cmluZzo3CglieXRlc19leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYoR8gASgMUghieXRlc0V4dDp2ChZieXRlc19leHRfd2l0aF9kZWZhdWx0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGKIfIAEoDDolXDAwMHhcXHhcInhcJ0FBQUFBQVwwMTBcMDE0XG5cclx0XDAxM1ITYnl0ZXNFeHRXaXRoRGVmYXVsdDpPCghlbnVtX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRiJJyABKA4yGC5wcm90bzJleHQuUHJvdG8yRXh0RW51bVIHZW51bUV4dDp7ChVlbnVtX2V4dF93aXRoX2RlZmF1bHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYiicgASgOMhgucHJvdG8yZXh0LlByb3RvMkV4dEVudW06ElBST1RPMl9FWFRfRU5VTV9OT1ISZW51bUV4dFdpdGhEZWZhdWx0OlgKC21lc3NhZ2VfZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGPEuIAEoCzIbLnByb3RvMmV4dC5Qcm90bzJFeHRNZXNzYWdlUgptZXNzYWdlRXh0OlcKEm1lc3NhZ2VfZXh0X3Byb3RvMxIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjyLiABKAsyDS5leGFtcGxlLlVzZXJSEG1lc3NhZ2VFeHRQcm90bzM6aQoUcmVwZWF0ZWRfbWVzc2FnZV9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY2TYgAygLMhsucHJvdG8yZXh0LlByb3RvMkV4dE1lc3NhZ2VSEnJlcGVhdGVkTWVzc2FnZUV4dDpgChFyZXBlYXRlZF9lbnVtX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjdNiADKA4yGC5wcm90bzJleHQuUHJvdG8yRXh0RW51bVIPcmVwZWF0ZWRFbnVtRXh0OkoKE3JlcGVhdGVkX3N0cmluZ19leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY2jYgAygJUhFyZXBlYXRlZFN0cmluZ0V4dDpKChFwYWNrZWRfdWludDMyX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjbNiADKA1CAhABUg9wYWNrZWRVaW50MzJFeHQ6SgoTdW5wYWNrZWRfdWludDMyX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjcNiADKA1SEXVucGFja2VkVWludDMyRXh0OmAKHXJlcGVhdGVkX3VpbnQ2NF9leHRfanNfc3RyaW5nEhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGN42IAMoBEICMAFSGXJlcGVhdGVkVWludDY0RXh0SnNTdHJpbmc6YwoTcmVwZWF0ZWRfc3RydWN0X2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjfNiADKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0UhFyZXBlYXRlZFN0cnVjdEV4dDpZCgt3cmFwcGVyX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjBPiABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWVSCndyYXBwZXJFeHQ6UgoKc3RydWN0X2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjCPiABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0UglzdHJ1Y3RFeHQ6SwoIZ3JvdXBleHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYpD8gASgKMhMucHJvdG8yZXh0Lkdyb3VwRXh0Ughncm91cGV4dDpjChByZXBlYXRlZGdyb3VwZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGKU/IAMoCjIbLnByb3RvMmV4dC5SZXBlYXRlZEdyb3VwRXh0UhByZXBlYXRlZGdyb3VwZXh0", [file_extra_example, file_google_protobuf_wrappers, file_google_protobuf_struct]);

/**
 * The message we're going to extend
 *
 * @generated from message proto2ext.Proto2Extendee
 */
export type Proto2Extendee = Message<"proto2ext.Proto2Extendee"> & {
  /**
   * @generated from field: optional int32 own_field = 1;
   */
  ownField: number;
};

/**
 * Describes the message proto2ext.Proto2Extendee.
 * Use `create(Proto2ExtendeeSchema)` to create a new message.
 */
export const Proto2ExtendeeSchema: GenMessage<Proto2Extendee> = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 0);

/**
 * A message used in extensions
 *
 * @generated from message proto2ext.Proto2ExtMessage
 */
export type Proto2ExtMessage = Message<"proto2ext.Proto2ExtMessage"> & {
  /**
   * @generated from field: optional string string_field = 1;
   */
  stringField: string;
};

/**
 * Describes the message proto2ext.Proto2ExtMessage.
 * Use `create(Proto2ExtMessageSchema)` to create a new message.
 */
export const Proto2ExtMessageSchema: GenMessage<Proto2ExtMessage> = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 1);

/**
 * @generated from message proto2ext.GroupExt
 */
export type GroupExt = Message<"proto2ext.GroupExt"> & {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: optional int32 b = 2;
   */
  b: number;
};

/**
 * Describes the message proto2ext.GroupExt.
 * Use `create(GroupExtSchema)` to create a new message.
 */
export const GroupExtSchema: GenMessage<GroupExt> = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 2);

/**
 * @generated from message proto2ext.RepeatedGroupExt
 */
export type RepeatedGroupExt = Message<"proto2ext.RepeatedGroupExt"> & {
  /**
   * @generated from field: optional int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: optional int32 b = 2;
   */
  b: number;
};

/**
 * Describes the message proto2ext.RepeatedGroupExt.
 * Use `create(RepeatedGroupExtSchema)` to create a new message.
 */
export const RepeatedGroupExtSchema: GenMessage<RepeatedGroupExt> = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 3);

/**
 * A container for nested extensions
 *
 * @generated from message proto2ext.Proto2ExtContainer
 */
export type Proto2ExtContainer = Message<"proto2ext.Proto2ExtContainer"> & {
};

/**
 * Describes the message proto2ext.Proto2ExtContainer.
 * Use `create(Proto2ExtContainerSchema)` to create a new message.
 */
export const Proto2ExtContainerSchema: GenMessage<Proto2ExtContainer> = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 4);

/**
 * @generated from message proto2ext.Proto2ExtContainer.Child
 */
export type Proto2ExtContainer_Child = Message<"proto2ext.Proto2ExtContainer.Child"> & {
};

/**
 * Describes the message proto2ext.Proto2ExtContainer.Child.
 * Use `create(Proto2ExtContainer_ChildSchema)` to create a new message.
 */
export const Proto2ExtContainer_ChildSchema: GenMessage<Proto2ExtContainer_Child> = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 4, 0);

/**
 * @generated from extension: optional uint32 uint32_ext = 9010;
 */
export const Proto2ExtContainer_Child_uint32_ext: GenExtension<Proto2Extendee, number> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 4, 0, 0);

/**
 * @generated from extension: optional uint32 uint32_ext = 9001;
 */
export const Proto2ExtContainer_uint32_ext: GenExtension<Proto2Extendee, number> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 4, 0);

/**
 * An enumeration used in extensions
 *
 * @generated from enum proto2ext.Proto2ExtEnum
 */
export enum Proto2ExtEnum {
  /**
   * @generated from enum value: PROTO2_EXT_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PROTO2_EXT_ENUM_NO = 2;
   */
  NO = 2,
}

/**
 * Describes the enum proto2ext.Proto2ExtEnum.
 */
export const Proto2ExtEnumSchema: GenEnum<Proto2ExtEnum> = /*@__PURE__*/
  enumDesc(file_extra_extensions_proto2, 0);

/**
 * @generated from extension: optional uint32 uint32_ext = 1001;
 */
export const uint32_ext: GenExtension<Proto2Extendee, number> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 0);

/**
 * @generated from extension: optional uint32 uint32_ext_with_default = 1002 [default = 999];
 */
export const uint32_ext_with_default: GenExtension<Proto2Extendee, number> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 1);

/**
 * @generated from extension: optional string string_ext = 2001;
 */
export const string_ext: GenExtension<Proto2Extendee, string> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 2);

/**
 * @generated from extension: optional string string_ext_with_default = 2002 [default = "hello \" *\/ "];
 */
export const string_ext_with_default: GenExtension<Proto2Extendee, string> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 3);

/**
 * @generated from extension: optional uint64 uint64_ext = 3001;
 */
export const uint64_ext: GenExtension<Proto2Extendee, bigint> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 4);

/**
 * @generated from extension: optional uint64 uint64_ext_js_string = 3002 [jstype = JS_STRING];
 */
export const uint64_ext_js_string: GenExtension<Proto2Extendee, string> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 5);

/**
 * @generated from extension: optional bytes bytes_ext = 4001;
 */
export const bytes_ext: GenExtension<Proto2Extendee, Uint8Array> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 6);

/**
 * @generated from extension: optional bytes bytes_ext_with_default = 4002 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
 */
export const bytes_ext_with_default: GenExtension<Proto2Extendee, Uint8Array> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 7);

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext = 5001;
 */
export const enum_ext: GenExtension<Proto2Extendee, Proto2ExtEnum> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 8);

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext_with_default = 5002 [default = PROTO2_EXT_ENUM_NO];
 */
export const enum_ext_with_default: GenExtension<Proto2Extendee, Proto2ExtEnum> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 9);

/**
 * @generated from extension: optional proto2ext.Proto2ExtMessage message_ext = 6001;
 */
export const message_ext: GenExtension<Proto2Extendee, Proto2ExtMessage> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 10);

/**
 * @generated from extension: optional example.User message_ext_proto3 = 6002;
 */
export const message_ext_proto3: GenExtension<Proto2Extendee, User> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 11);

/**
 * @generated from extension: repeated proto2ext.Proto2ExtMessage repeated_message_ext = 7001;
 */
export const repeated_message_ext: GenExtension<Proto2Extendee, Proto2ExtMessage[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 12);

/**
 * @generated from extension: repeated proto2ext.Proto2ExtEnum repeated_enum_ext = 7005;
 */
export const repeated_enum_ext: GenExtension<Proto2Extendee, Proto2ExtEnum[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 13);

/**
 * @generated from extension: repeated string repeated_string_ext = 7002;
 */
export const repeated_string_ext: GenExtension<Proto2Extendee, string[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 14);

/**
 * @generated from extension: repeated uint32 packed_uint32_ext = 7003 [packed = true];
 */
export const packed_uint32_ext: GenExtension<Proto2Extendee, number[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 15);

/**
 * unpacked by default in proto2
 *
 * @generated from extension: repeated uint32 unpacked_uint32_ext = 7004;
 */
export const unpacked_uint32_ext: GenExtension<Proto2Extendee, number[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 16);

/**
 * @generated from extension: repeated uint64 repeated_uint64_ext_js_string = 7006 [jstype = JS_STRING];
 */
export const repeated_uint64_ext_js_string: GenExtension<Proto2Extendee, string[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 17);

/**
 * @generated from extension: repeated google.protobuf.Struct repeated_struct_ext = 7007;
 */
export const repeated_struct_ext: GenExtension<Proto2Extendee, JsonObject[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 18);

/**
 * @generated from extension: optional google.protobuf.UInt32Value wrapper_ext = 8001;
 */
export const wrapper_ext: GenExtension<Proto2Extendee, number> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 19);

/**
 * @generated from extension: optional google.protobuf.Struct struct_ext = 8002;
 */
export const struct_ext: GenExtension<Proto2Extendee, JsonObject> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 20);

/**
 * @generated from extension: optional proto2ext.GroupExt groupext = 8100;
 */
export const groupext: GenExtension<Proto2Extendee, GroupExt> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 21);

/**
 * @generated from extension: repeated proto2ext.RepeatedGroupExt repeatedgroupext = 8101;
 */
export const repeatedgroupext: GenExtension<Proto2Extendee, RepeatedGroupExt[]> = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 22);

