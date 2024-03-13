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

// @generated by protoc-gen-es-next v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_proto3_optional.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/next/codegenv1";
import { fileDesc_google_protobuf_descriptor } from "@bufbuild/protobuf/next";

export const fileDesc_google_protobuf_unittest_proto3_optional = fileDesc("Ci5nb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcHJvdG8zX29wdGlvbmFsLnByb3RvEhFwcm90b2J1Zl91bml0dGVzdCKxCgoSVGVzdFByb3RvM09wdGlvbmFsEhsKDm9wdGlvbmFsX2ludDMyGAEgASgFSACIAQESGwoOb3B0aW9uYWxfaW50NjQYAiABKANIAYgBARIcCg9vcHRpb25hbF91aW50MzIYAyABKA1IAogBARIcCg9vcHRpb25hbF91aW50NjQYBCABKARIA4gBARIcCg9vcHRpb25hbF9zaW50MzIYBSABKBFIBIgBARIcCg9vcHRpb25hbF9zaW50NjQYBiABKBJIBYgBARIdChBvcHRpb25hbF9maXhlZDMyGAcgASgHSAaIAQESHQoQb3B0aW9uYWxfZml4ZWQ2NBgIIAEoBkgHiAEBEh4KEW9wdGlvbmFsX3NmaXhlZDMyGAkgASgPSAiIAQESHgoRb3B0aW9uYWxfc2ZpeGVkNjQYCiABKBBICYgBARIbCg5vcHRpb25hbF9mbG9hdBgLIAEoAkgKiAEBEhwKD29wdGlvbmFsX2RvdWJsZRgMIAEoAUgLiAEBEhoKDW9wdGlvbmFsX2Jvb2wYDSABKAhIDIgBARIcCg9vcHRpb25hbF9zdHJpbmcYDiABKAlIDYgBARIbCg5vcHRpb25hbF9ieXRlcxgPIAEoDEgOiAEBEh4KDW9wdGlvbmFsX2NvcmQYECABKAlCAggBSA+IAQESWQoXb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UYEiABKAsyMy5wcm90b2J1Zl91bml0dGVzdC5UZXN0UHJvdG8zT3B0aW9uYWwuTmVzdGVkTWVzc2FnZUgQiAEBElkKE2xhenlfbmVzdGVkX21lc3NhZ2UYEyABKAsyMy5wcm90b2J1Zl91bml0dGVzdC5UZXN0UHJvdG8zT3B0aW9uYWwuTmVzdGVkTWVzc2FnZUICKAFIEYgBARJTChRvcHRpb25hbF9uZXN0ZWRfZW51bRgVIAEoDjIwLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RQcm90bzNPcHRpb25hbC5OZXN0ZWRFbnVtSBKIAQESFgoOc2luZ3VsYXJfaW50MzIYFiABKAUSFgoOc2luZ3VsYXJfaW50NjQYFyABKAMaJwoNTmVzdGVkTWVzc2FnZRIPCgJiYhgBIAEoBUgAiAEBQgUKA19iYiJKCgpOZXN0ZWRFbnVtEg8KC1VOU1BFQ0lGSUVEEAASBwoDRk9PEAESBwoDQkFSEAISBwoDQkFaEAMSEAoDTkVHEP///////////wFCEQoPX29wdGlvbmFsX2ludDMyQhEKD19vcHRpb25hbF9pbnQ2NEISChBfb3B0aW9uYWxfdWludDMyQhIKEF9vcHRpb25hbF91aW50NjRCEgoQX29wdGlvbmFsX3NpbnQzMkISChBfb3B0aW9uYWxfc2ludDY0QhMKEV9vcHRpb25hbF9maXhlZDMyQhMKEV9vcHRpb25hbF9maXhlZDY0QhQKEl9vcHRpb25hbF9zZml4ZWQzMkIUChJfb3B0aW9uYWxfc2ZpeGVkNjRCEQoPX29wdGlvbmFsX2Zsb2F0QhIKEF9vcHRpb25hbF9kb3VibGVCEAoOX29wdGlvbmFsX2Jvb2xCEgoQX29wdGlvbmFsX3N0cmluZ0IRCg9fb3B0aW9uYWxfYnl0ZXNCEAoOX29wdGlvbmFsX2NvcmRCGgoYX29wdGlvbmFsX25lc3RlZF9tZXNzYWdlQhYKFF9sYXp5X25lc3RlZF9tZXNzYWdlQhcKFV9vcHRpb25hbF9uZXN0ZWRfZW51bSKJAgoZVGVzdFByb3RvM09wdGlvbmFsTWVzc2FnZRJSCg5uZXN0ZWRfbWVzc2FnZRgBIAEoCzI6LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RQcm90bzNPcHRpb25hbE1lc3NhZ2UuTmVzdGVkTWVzc2FnZRJgChdvcHRpb25hbF9uZXN0ZWRfbWVzc2FnZRgCIAEoCzI6LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RQcm90bzNPcHRpb25hbE1lc3NhZ2UuTmVzdGVkTWVzc2FnZUgAiAEBGhoKDU5lc3RlZE1lc3NhZ2USCQoBcxgBIAEoCUIaChhfb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UiyQEKGFByb3RvM09wdGlvbmFsRXh0ZW5zaW9uczJLCg9leHRfbm9fb3B0aW9uYWwSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYiM3ZqQEgASgFUg1leHROb09wdGlvbmFsMlIKEWV4dF93aXRoX29wdGlvbmFsEh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGInN2akBIAEoBVIPZXh0V2l0aE9wdGlvbmFsiAEBOgzA6MzNCgjI6MzNChBCOAohY29tLmdvb2dsZS5wcm90b2J1Zi50ZXN0aW5nLnByb3RvUAGqAhBQcm90b2J1ZlVuaXR0ZXN0YgZwcm90bzM", [fileDesc_google_protobuf_descriptor]);

// Describes the message protobuf_unittest.TestProto3Optional. Use `create(TestProto3OptionalDesc)` to create a new TestProto3Optional.
export const TestProto3OptionalDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 0);

// Describes the message protobuf_unittest.TestProto3Optional.NestedMessage. Use `create(TestProto3Optional_NestedMessageDesc)` to create a new TestProto3Optional_NestedMessage.
export const TestProto3Optional_NestedMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 0, 0);

// Describes the enum protobuf_unittest.TestProto3Optional.NestedEnum.
export const TestProto3Optional_NestedEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_proto3_optional, 0, 0);

/**
 * @generated from enum protobuf_unittest.TestProto3Optional.NestedEnum
 */
export const TestProto3Optional_NestedEnum = tsEnum(TestProto3Optional_NestedEnumDesc);

// Describes the message protobuf_unittest.TestProto3OptionalMessage. Use `create(TestProto3OptionalMessageDesc)` to create a new TestProto3OptionalMessage.
export const TestProto3OptionalMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 1);

// Describes the message protobuf_unittest.TestProto3OptionalMessage.NestedMessage. Use `create(TestProto3OptionalMessage_NestedMessageDesc)` to create a new TestProto3OptionalMessage_NestedMessage.
export const TestProto3OptionalMessage_NestedMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 1, 0);

// Describes the message protobuf_unittest.Proto3OptionalExtensions. Use `create(Proto3OptionalExtensionsDesc)` to create a new Proto3OptionalExtensions.
export const Proto3OptionalExtensionsDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_optional, 2);

/**
 * @generated from extension: int32 ext_no_optional = 355886728;
 */
export const Proto3OptionalExtensions_ext_no_optional = extDesc(fileDesc_google_protobuf_unittest_proto3_optional, 2, 0);

/**
 * @generated from extension: optional int32 ext_with_optional = 355886729;
 */
export const Proto3OptionalExtensions_ext_with_optional = extDesc(fileDesc_google_protobuf_unittest_proto3_optional, 2, 1);

