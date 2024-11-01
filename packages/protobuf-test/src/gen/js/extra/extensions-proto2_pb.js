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

// @generated by protoc-gen-es v2.2.2 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/extensions-proto2.proto (package proto2ext, syntax proto2)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_extra_example } from "./example_pb.js";
import { file_google_protobuf_struct, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/extensions-proto2.proto.
 */
export const file_extra_extensions_proto2 = /*@__PURE__*/
  fileDesc("Ch1leHRyYS9leHRlbnNpb25zLXByb3RvMi5wcm90bxIJcHJvdG8yZXh0IisKDlByb3RvMkV4dGVuZGVlEhEKCW93bl9maWVsZBgBIAEoBSoGCOgHEJBOIigKEFByb3RvMkV4dE1lc3NhZ2USFAoMc3RyaW5nX2ZpZWxkGAEgASgJIiAKCEdyb3VwRXh0EgkKAWEYASABKAUSCQoBYhgCIAEoBSIoChBSZXBlYXRlZEdyb3VwRXh0EgkKAWEYASABKAUSCQoBYhgCIAEoBSKTAQoSUHJvdG8yRXh0Q29udGFpbmVyGkIKBUNoaWxkMjkKCnVpbnQzMl9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYskYgASgNUgl1aW50MzJFeHQyOQoKdWludDMyX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRipRiABKA1SCXVpbnQzMkV4dCpACg1Qcm90bzJFeHRFbnVtEhcKE1BST1RPMl9FWFRfRU5VTV9ZRVMQARIWChJQUk9UTzJfRVhUX0VOVU1fTk8QAjo5Cgp1aW50MzJfZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGOkHIAEoDVIJdWludDMyRXh0OlYKF3VpbnQzMl9leHRfd2l0aF9kZWZhdWx0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGOoHIAEoDToDOTk5UhR1aW50MzJFeHRXaXRoRGVmYXVsdDo5CgpzdHJpbmdfZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGNEPIAEoCVIJc3RyaW5nRXh0Ol4KF3N0cmluZ19leHRfd2l0aF9kZWZhdWx0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGNIPIAEoCToLaGVsbG8gIiAqLyBSFHN0cmluZ0V4dFdpdGhEZWZhdWx0OjkKCnVpbnQ2NF9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYuRcgASgEUgl1aW50NjRFeHQ6TwoUdWludDY0X2V4dF9qc19zdHJpbmcSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYuhcgASgEQgIwAVIRdWludDY0RXh0SnNTdHJpbmc6NwoJYnl0ZXNfZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGKEfIAEoDFIIYnl0ZXNFeHQ6dgoWYnl0ZXNfZXh0X3dpdGhfZGVmYXVsdBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRiiHyABKAw6JVwwMDB4XFx4XCJ4XCdBQUFBQUFcMDEwXDAxNFxuXHJcdFwwMTNSE2J5dGVzRXh0V2l0aERlZmF1bHQ6TwoIZW51bV9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYiScgASgOMhgucHJvdG8yZXh0LlByb3RvMkV4dEVudW1SB2VudW1FeHQ6ewoVZW51bV9leHRfd2l0aF9kZWZhdWx0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGIonIAEoDjIYLnByb3RvMmV4dC5Qcm90bzJFeHRFbnVtOhJQUk9UTzJfRVhUX0VOVU1fTk9SEmVudW1FeHRXaXRoRGVmYXVsdDpYCgttZXNzYWdlX2V4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjxLiABKAsyGy5wcm90bzJleHQuUHJvdG8yRXh0TWVzc2FnZVIKbWVzc2FnZUV4dDpXChJtZXNzYWdlX2V4dF9wcm90bzMSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY8i4gASgLMg0uZXhhbXBsZS5Vc2VyUhBtZXNzYWdlRXh0UHJvdG8zOmkKFHJlcGVhdGVkX21lc3NhZ2VfZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGNk2IAMoCzIbLnByb3RvMmV4dC5Qcm90bzJFeHRNZXNzYWdlUhJyZXBlYXRlZE1lc3NhZ2VFeHQ6YAoRcmVwZWF0ZWRfZW51bV9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY3TYgAygOMhgucHJvdG8yZXh0LlByb3RvMkV4dEVudW1SD3JlcGVhdGVkRW51bUV4dDpKChNyZXBlYXRlZF9zdHJpbmdfZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGNo2IAMoCVIRcmVwZWF0ZWRTdHJpbmdFeHQ6SgoRcGFja2VkX3VpbnQzMl9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY2zYgAygNQgIQAVIPcGFja2VkVWludDMyRXh0OkoKE3VucGFja2VkX3VpbnQzMl9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY3DYgAygNUhF1bnBhY2tlZFVpbnQzMkV4dDpgCh1yZXBlYXRlZF91aW50NjRfZXh0X2pzX3N0cmluZxIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRjeNiADKARCAjABUhlyZXBlYXRlZFVpbnQ2NEV4dEpzU3RyaW5nOmMKE3JlcGVhdGVkX3N0cnVjdF9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUY3zYgAygLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdFIRcmVwZWF0ZWRTdHJ1Y3RFeHQ6WQoLd3JhcHBlcl9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYwT4gASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlUgp3cmFwcGVyRXh0OlIKCnN0cnVjdF9leHQSGS5wcm90bzJleHQuUHJvdG8yRXh0ZW5kZWUYwj4gASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdFIJc3RydWN0RXh0OksKCGdyb3VwZXh0EhkucHJvdG8yZXh0LlByb3RvMkV4dGVuZGVlGKQ/IAEoCjITLnByb3RvMmV4dC5Hcm91cEV4dFIIZ3JvdXBleHQ6YwoQcmVwZWF0ZWRncm91cGV4dBIZLnByb3RvMmV4dC5Qcm90bzJFeHRlbmRlZRilPyADKAoyGy5wcm90bzJleHQuUmVwZWF0ZWRHcm91cEV4dFIQcmVwZWF0ZWRncm91cGV4dA", [file_extra_example, file_google_protobuf_wrappers, file_google_protobuf_struct]);

/**
 * Describes the message proto2ext.Proto2Extendee.
 * Use `create(Proto2ExtendeeSchema)` to create a new message.
 */
export const Proto2ExtendeeSchema = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 0);

/**
 * Describes the message proto2ext.Proto2ExtMessage.
 * Use `create(Proto2ExtMessageSchema)` to create a new message.
 */
export const Proto2ExtMessageSchema = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 1);

/**
 * Describes the message proto2ext.GroupExt.
 * Use `create(GroupExtSchema)` to create a new message.
 */
export const GroupExtSchema = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 2);

/**
 * Describes the message proto2ext.RepeatedGroupExt.
 * Use `create(RepeatedGroupExtSchema)` to create a new message.
 */
export const RepeatedGroupExtSchema = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 3);

/**
 * Describes the message proto2ext.Proto2ExtContainer.
 * Use `create(Proto2ExtContainerSchema)` to create a new message.
 */
export const Proto2ExtContainerSchema = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 4);

/**
 * Describes the message proto2ext.Proto2ExtContainer.Child.
 * Use `create(Proto2ExtContainer_ChildSchema)` to create a new message.
 */
export const Proto2ExtContainer_ChildSchema = /*@__PURE__*/
  messageDesc(file_extra_extensions_proto2, 4, 0);

/**
 * @generated from extension: optional uint32 uint32_ext = 9010;
 */
export const Proto2ExtContainer_Child_uint32_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 4, 0, 0);

/**
 * @generated from extension: optional uint32 uint32_ext = 9001;
 */
export const Proto2ExtContainer_uint32_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 4, 0);

/**
 * Describes the enum proto2ext.Proto2ExtEnum.
 */
export const Proto2ExtEnumSchema = /*@__PURE__*/
  enumDesc(file_extra_extensions_proto2, 0);

/**
 * An enumeration used in extensions
 *
 * @generated from enum proto2ext.Proto2ExtEnum
 */
export const Proto2ExtEnum = /*@__PURE__*/
  tsEnum(Proto2ExtEnumSchema);

/**
 * @generated from extension: optional uint32 uint32_ext = 1001;
 */
export const uint32_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 0);

/**
 * @generated from extension: optional uint32 uint32_ext_with_default = 1002 [default = 999];
 */
export const uint32_ext_with_default = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 1);

/**
 * @generated from extension: optional string string_ext = 2001;
 */
export const string_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 2);

/**
 * @generated from extension: optional string string_ext_with_default = 2002 [default = "hello \" *\/ "];
 */
export const string_ext_with_default = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 3);

/**
 * @generated from extension: optional uint64 uint64_ext = 3001;
 */
export const uint64_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 4);

/**
 * @generated from extension: optional uint64 uint64_ext_js_string = 3002 [jstype = JS_STRING];
 */
export const uint64_ext_js_string = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 5);

/**
 * @generated from extension: optional bytes bytes_ext = 4001;
 */
export const bytes_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 6);

/**
 * @generated from extension: optional bytes bytes_ext_with_default = 4002 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
 */
export const bytes_ext_with_default = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 7);

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext = 5001;
 */
export const enum_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 8);

/**
 * @generated from extension: optional proto2ext.Proto2ExtEnum enum_ext_with_default = 5002 [default = PROTO2_EXT_ENUM_NO];
 */
export const enum_ext_with_default = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 9);

/**
 * @generated from extension: optional proto2ext.Proto2ExtMessage message_ext = 6001;
 */
export const message_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 10);

/**
 * @generated from extension: optional example.User message_ext_proto3 = 6002;
 */
export const message_ext_proto3 = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 11);

/**
 * @generated from extension: repeated proto2ext.Proto2ExtMessage repeated_message_ext = 7001;
 */
export const repeated_message_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 12);

/**
 * @generated from extension: repeated proto2ext.Proto2ExtEnum repeated_enum_ext = 7005;
 */
export const repeated_enum_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 13);

/**
 * @generated from extension: repeated string repeated_string_ext = 7002;
 */
export const repeated_string_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 14);

/**
 * @generated from extension: repeated uint32 packed_uint32_ext = 7003 [packed = true];
 */
export const packed_uint32_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 15);

/**
 * unpacked by default in proto2
 *
 * @generated from extension: repeated uint32 unpacked_uint32_ext = 7004;
 */
export const unpacked_uint32_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 16);

/**
 * @generated from extension: repeated uint64 repeated_uint64_ext_js_string = 7006 [jstype = JS_STRING];
 */
export const repeated_uint64_ext_js_string = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 17);

/**
 * @generated from extension: repeated google.protobuf.Struct repeated_struct_ext = 7007;
 */
export const repeated_struct_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 18);

/**
 * @generated from extension: optional google.protobuf.UInt32Value wrapper_ext = 8001;
 */
export const wrapper_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 19);

/**
 * @generated from extension: optional google.protobuf.Struct struct_ext = 8002;
 */
export const struct_ext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 20);

/**
 * @generated from extension: optional proto2ext.GroupExt groupext = 8100;
 */
export const groupext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 21);

/**
 * @generated from extension: repeated proto2ext.RepeatedGroupExt repeatedgroupext = 8101;
 */
export const repeatedgroupext = /*@__PURE__*/
  extDesc(file_extra_extensions_proto2, 22);

