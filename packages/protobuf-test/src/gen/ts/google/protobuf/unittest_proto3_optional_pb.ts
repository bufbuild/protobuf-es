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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file google/protobuf/unittest_proto3_optional.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

import type { GenDescEnum, GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { MessageOptions } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_proto3_optional.proto.
 */
export const fileDesc_google_protobuf_unittest_proto3_optional: GenDescFile = /*@__PURE__*/
  fileDesc("Ci5nb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcHJvdG8zX29wdGlvbmFsLnByb3RvEhFwcm90b2J1Zl91bml0dGVzdCKxCgoSVGVzdFByb3RvM09wdGlvbmFsEhsKDm9wdGlvbmFsX2ludDMyGAEgASgFSACIAQESGwoOb3B0aW9uYWxfaW50NjQYAiABKANIAYgBARIcCg9vcHRpb25hbF91aW50MzIYAyABKA1IAogBARIcCg9vcHRpb25hbF91aW50NjQYBCABKARIA4gBARIcCg9vcHRpb25hbF9zaW50MzIYBSABKBFIBIgBARIcCg9vcHRpb25hbF9zaW50NjQYBiABKBJIBYgBARIdChBvcHRpb25hbF9maXhlZDMyGAcgASgHSAaIAQESHQoQb3B0aW9uYWxfZml4ZWQ2NBgIIAEoBkgHiAEBEh4KEW9wdGlvbmFsX3NmaXhlZDMyGAkgASgPSAiIAQESHgoRb3B0aW9uYWxfc2ZpeGVkNjQYCiABKBBICYgBARIbCg5vcHRpb25hbF9mbG9hdBgLIAEoAkgKiAEBEhwKD29wdGlvbmFsX2RvdWJsZRgMIAEoAUgLiAEBEhoKDW9wdGlvbmFsX2Jvb2wYDSABKAhIDIgBARIcCg9vcHRpb25hbF9zdHJpbmcYDiABKAlIDYgBARIbCg5vcHRpb25hbF9ieXRlcxgPIAEoDEgOiAEBEh4KDW9wdGlvbmFsX2NvcmQYECABKAlCAggBSA+IAQESWQoXb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UYEiABKAsyMy5wcm90b2J1Zl91bml0dGVzdC5UZXN0UHJvdG8zT3B0aW9uYWwuTmVzdGVkTWVzc2FnZUgQiAEBElkKE2xhenlfbmVzdGVkX21lc3NhZ2UYEyABKAsyMy5wcm90b2J1Zl91bml0dGVzdC5UZXN0UHJvdG8zT3B0aW9uYWwuTmVzdGVkTWVzc2FnZUICKAFIEYgBARJTChRvcHRpb25hbF9uZXN0ZWRfZW51bRgVIAEoDjIwLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RQcm90bzNPcHRpb25hbC5OZXN0ZWRFbnVtSBKIAQESFgoOc2luZ3VsYXJfaW50MzIYFiABKAUSFgoOc2luZ3VsYXJfaW50NjQYFyABKAMaJwoNTmVzdGVkTWVzc2FnZRIPCgJiYhgBIAEoBUgAiAEBQgUKA19iYiJKCgpOZXN0ZWRFbnVtEg8KC1VOU1BFQ0lGSUVEEAASBwoDRk9PEAESBwoDQkFSEAISBwoDQkFaEAMSEAoDTkVHEP///////////wFCEQoPX29wdGlvbmFsX2ludDMyQhEKD19vcHRpb25hbF9pbnQ2NEISChBfb3B0aW9uYWxfdWludDMyQhIKEF9vcHRpb25hbF91aW50NjRCEgoQX29wdGlvbmFsX3NpbnQzMkISChBfb3B0aW9uYWxfc2ludDY0QhMKEV9vcHRpb25hbF9maXhlZDMyQhMKEV9vcHRpb25hbF9maXhlZDY0QhQKEl9vcHRpb25hbF9zZml4ZWQzMkIUChJfb3B0aW9uYWxfc2ZpeGVkNjRCEQoPX29wdGlvbmFsX2Zsb2F0QhIKEF9vcHRpb25hbF9kb3VibGVCEAoOX29wdGlvbmFsX2Jvb2xCEgoQX29wdGlvbmFsX3N0cmluZ0IRCg9fb3B0aW9uYWxfYnl0ZXNCEAoOX29wdGlvbmFsX2NvcmRCGgoYX29wdGlvbmFsX25lc3RlZF9tZXNzYWdlQhYKFF9sYXp5X25lc3RlZF9tZXNzYWdlQhcKFV9vcHRpb25hbF9uZXN0ZWRfZW51bSKJAgoZVGVzdFByb3RvM09wdGlvbmFsTWVzc2FnZRJSCg5uZXN0ZWRfbWVzc2FnZRgBIAEoCzI6LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RQcm90bzNPcHRpb25hbE1lc3NhZ2UuTmVzdGVkTWVzc2FnZRJgChdvcHRpb25hbF9uZXN0ZWRfbWVzc2FnZRgCIAEoCzI6LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RQcm90bzNPcHRpb25hbE1lc3NhZ2UuTmVzdGVkTWVzc2FnZUgAiAEBGhoKDU5lc3RlZE1lc3NhZ2USCQoBcxgBIAEoCUIaChhfb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UiyQEKGFByb3RvM09wdGlvbmFsRXh0ZW5zaW9uczJLCg9leHRfbm9fb3B0aW9uYWwSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYiM3ZqQEgASgFUg1leHROb09wdGlvbmFsMlIKEWV4dF93aXRoX29wdGlvbmFsEh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGInN2akBIAEoBVIPZXh0V2l0aE9wdGlvbmFsiAEBOgzA6MzNCgjI6MzNChBCOAohY29tLmdvb2dsZS5wcm90b2J1Zi50ZXN0aW5nLnByb3RvUAGqAhBQcm90b2J1ZlVuaXR0ZXN0YgZwcm90bzM", [fileDesc_google_protobuf_descriptor]);

/**
 * @generated from message protobuf_unittest.TestProto3Optional
 */
export type TestProto3Optional = Message<"protobuf_unittest.TestProto3Optional"> & {
  /**
   * Singular
   *
   * @generated from field: optional int32 optional_int32 = 1;
   */
  optionalInt32?: number;

  /**
   * @generated from field: optional int64 optional_int64 = 2;
   */
  optionalInt64?: bigint;

  /**
   * @generated from field: optional uint32 optional_uint32 = 3;
   */
  optionalUint32?: number;

  /**
   * @generated from field: optional uint64 optional_uint64 = 4;
   */
  optionalUint64?: bigint;

  /**
   * @generated from field: optional sint32 optional_sint32 = 5;
   */
  optionalSint32?: number;

  /**
   * @generated from field: optional sint64 optional_sint64 = 6;
   */
  optionalSint64?: bigint;

  /**
   * @generated from field: optional fixed32 optional_fixed32 = 7;
   */
  optionalFixed32?: number;

  /**
   * @generated from field: optional fixed64 optional_fixed64 = 8;
   */
  optionalFixed64?: bigint;

  /**
   * @generated from field: optional sfixed32 optional_sfixed32 = 9;
   */
  optionalSfixed32?: number;

  /**
   * @generated from field: optional sfixed64 optional_sfixed64 = 10;
   */
  optionalSfixed64?: bigint;

  /**
   * @generated from field: optional float optional_float = 11;
   */
  optionalFloat?: number;

  /**
   * @generated from field: optional double optional_double = 12;
   */
  optionalDouble?: number;

  /**
   * @generated from field: optional bool optional_bool = 13;
   */
  optionalBool?: boolean;

  /**
   * @generated from field: optional string optional_string = 14;
   */
  optionalString?: string;

  /**
   * @generated from field: optional bytes optional_bytes = 15;
   */
  optionalBytes?: Uint8Array;

  /**
   * @generated from field: optional string optional_cord = 16;
   */
  optionalCord?: string;

  /**
   * @generated from field: optional protobuf_unittest.TestProto3Optional.NestedMessage optional_nested_message = 18;
   */
  optionalNestedMessage?: TestProto3Optional_NestedMessage;

  /**
   * @generated from field: optional protobuf_unittest.TestProto3Optional.NestedMessage lazy_nested_message = 19;
   */
  lazyNestedMessage?: TestProto3Optional_NestedMessage;

  /**
   * @generated from field: optional protobuf_unittest.TestProto3Optional.NestedEnum optional_nested_enum = 21;
   */
  optionalNestedEnum?: TestProto3Optional_NestedEnum;

  /**
   * Add some non-optional fields to verify we can mix them.
   *
   * @generated from field: int32 singular_int32 = 22;
   */
  singularInt32: number;

  /**
   * @generated from field: int64 singular_int64 = 23;
   */
  singularInt64: bigint;
};

/**
 * Describes the message protobuf_unittest.TestProto3Optional.
 * Use `create(TestProto3OptionalDesc)` to create a new message.
 */
export const TestProto3OptionalDesc: GenDescMessage<TestProto3Optional> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 0);

/**
 * @generated from message protobuf_unittest.TestProto3Optional.NestedMessage
 */
export type TestProto3Optional_NestedMessage = Message<"protobuf_unittest.TestProto3Optional.NestedMessage"> & {
  /**
   * The field name "b" fails to compile in proto1 because it conflicts with
   * a local variable named "b" in one of the generated methods.  Doh.
   * This file needs to compile in proto1 to test backwards-compatibility.
   *
   * @generated from field: optional int32 bb = 1;
   */
  bb?: number;
};

/**
 * Describes the message protobuf_unittest.TestProto3Optional.NestedMessage.
 * Use `create(TestProto3Optional_NestedMessageDesc)` to create a new message.
 */
export const TestProto3Optional_NestedMessageDesc: GenDescMessage<TestProto3Optional_NestedMessage> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 0, 0);

/**
 * @generated from enum protobuf_unittest.TestProto3Optional.NestedEnum
 */
export enum TestProto3Optional_NestedEnum {
  /**
   * @generated from enum value: UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,

  /**
   * @generated from enum value: BAR = 2;
   */
  BAR = 2,

  /**
   * @generated from enum value: BAZ = 3;
   */
  BAZ = 3,

  /**
   * Intentionally negative.
   *
   * @generated from enum value: NEG = -1;
   */
  NEG = -1,
}

/**
 * Describes the enum protobuf_unittest.TestProto3Optional.NestedEnum.
 */
export const TestProto3Optional_NestedEnumDesc: GenDescEnum<TestProto3Optional_NestedEnum> = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_unittest_proto3_optional, 0, 0);

/**
 * @generated from message protobuf_unittest.TestProto3OptionalMessage
 */
export type TestProto3OptionalMessage = Message<"protobuf_unittest.TestProto3OptionalMessage"> & {
  /**
   * @generated from field: protobuf_unittest.TestProto3OptionalMessage.NestedMessage nested_message = 1;
   */
  nestedMessage?: TestProto3OptionalMessage_NestedMessage;

  /**
   * @generated from field: optional protobuf_unittest.TestProto3OptionalMessage.NestedMessage optional_nested_message = 2;
   */
  optionalNestedMessage?: TestProto3OptionalMessage_NestedMessage;
};

/**
 * Describes the message protobuf_unittest.TestProto3OptionalMessage.
 * Use `create(TestProto3OptionalMessageDesc)` to create a new message.
 */
export const TestProto3OptionalMessageDesc: GenDescMessage<TestProto3OptionalMessage> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 1);

/**
 * @generated from message protobuf_unittest.TestProto3OptionalMessage.NestedMessage
 */
export type TestProto3OptionalMessage_NestedMessage = Message<"protobuf_unittest.TestProto3OptionalMessage.NestedMessage"> & {
  /**
   * @generated from field: string s = 1;
   */
  s: string;
};

/**
 * Describes the message protobuf_unittest.TestProto3OptionalMessage.NestedMessage.
 * Use `create(TestProto3OptionalMessage_NestedMessageDesc)` to create a new message.
 */
export const TestProto3OptionalMessage_NestedMessageDesc: GenDescMessage<TestProto3OptionalMessage_NestedMessage> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 1, 0);

/**
 * @generated from message protobuf_unittest.Proto3OptionalExtensions
 */
export type Proto3OptionalExtensions = Message<"protobuf_unittest.Proto3OptionalExtensions"> & {
};

/**
 * Describes the message protobuf_unittest.Proto3OptionalExtensions.
 * Use `create(Proto3OptionalExtensionsDesc)` to create a new message.
 */
export const Proto3OptionalExtensionsDesc: GenDescMessage<Proto3OptionalExtensions> = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 2);

/**
 * @generated from extension: int32 ext_no_optional = 355886728;
 */
export const Proto3OptionalExtensions_ext_no_optional: GenDescExtension<MessageOptions, number> = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_proto3_optional, 2, 0);

/**
 * @generated from extension: optional int32 ext_with_optional = 355886729;
 */
export const Proto3OptionalExtensions_ext_with_optional: GenDescExtension<MessageOptions, number> = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_proto3_optional, 2, 1);

