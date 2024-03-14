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

// @generated by protoc-gen-es-next v1.8.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_proto3_arena_lite.proto (package proto3_arena_lite_unittest, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/next/codegenv1";
import { fileDesc_google_protobuf_unittest_import } from "./unittest_import_pbv2.js";

export const fileDesc_google_protobuf_unittest_proto3_arena_lite = fileDesc("CjBnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcHJvdG8zX2FyZW5hX2xpdGUucHJvdG8SGnByb3RvM19hcmVuYV9saXRlX3VuaXR0ZXN0Iq0RCgxUZXN0QWxsVHlwZXMSFgoOb3B0aW9uYWxfaW50MzIYASABKAUSFgoOb3B0aW9uYWxfaW50NjQYAiABKAMSFwoPb3B0aW9uYWxfdWludDMyGAMgASgNEhcKD29wdGlvbmFsX3VpbnQ2NBgEIAEoBBIXCg9vcHRpb25hbF9zaW50MzIYBSABKBESFwoPb3B0aW9uYWxfc2ludDY0GAYgASgSEhgKEG9wdGlvbmFsX2ZpeGVkMzIYByABKAcSGAoQb3B0aW9uYWxfZml4ZWQ2NBgIIAEoBhIZChFvcHRpb25hbF9zZml4ZWQzMhgJIAEoDxIZChFvcHRpb25hbF9zZml4ZWQ2NBgKIAEoEBIWCg5vcHRpb25hbF9mbG9hdBgLIAEoAhIXCg9vcHRpb25hbF9kb3VibGUYDCABKAESFQoNb3B0aW9uYWxfYm9vbBgNIAEoCBIXCg9vcHRpb25hbF9zdHJpbmcYDiABKAkSFgoOb3B0aW9uYWxfYnl0ZXMYDyABKAwSVwoXb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UYEiABKAsyNi5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZRJMChhvcHRpb25hbF9mb3JlaWduX21lc3NhZ2UYEyABKAsyKi5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5Gb3JlaWduTWVzc2FnZRJIChdvcHRpb25hbF9pbXBvcnRfbWVzc2FnZRgUIAEoCzInLnByb3RvYnVmX3VuaXR0ZXN0X2ltcG9ydC5JbXBvcnRNZXNzYWdlElEKFG9wdGlvbmFsX25lc3RlZF9lbnVtGBUgASgOMjMucHJvdG8zX2FyZW5hX2xpdGVfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZEVudW0SRgoVb3B0aW9uYWxfZm9yZWlnbl9lbnVtGBYgASgOMicucHJvdG8zX2FyZW5hX2xpdGVfdW5pdHRlc3QuRm9yZWlnbkVudW0SIQoVb3B0aW9uYWxfc3RyaW5nX3BpZWNlGBggASgJQgIIAhIZCg1vcHRpb25hbF9jb3JkGBkgASgJQgIIARJVCh5vcHRpb25hbF9wdWJsaWNfaW1wb3J0X21lc3NhZ2UYGiABKAsyLS5wcm90b2J1Zl91bml0dGVzdF9pbXBvcnQuUHVibGljSW1wb3J0TWVzc2FnZRJZChVvcHRpb25hbF9sYXp5X21lc3NhZ2UYGyABKAsyNi5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZUICKAESFgoOcmVwZWF0ZWRfaW50MzIYHyADKAUSFgoOcmVwZWF0ZWRfaW50NjQYICADKAMSFwoPcmVwZWF0ZWRfdWludDMyGCEgAygNEhcKD3JlcGVhdGVkX3VpbnQ2NBgiIAMoBBIXCg9yZXBlYXRlZF9zaW50MzIYIyADKBESFwoPcmVwZWF0ZWRfc2ludDY0GCQgAygSEhgKEHJlcGVhdGVkX2ZpeGVkMzIYJSADKAcSGAoQcmVwZWF0ZWRfZml4ZWQ2NBgmIAMoBhIZChFyZXBlYXRlZF9zZml4ZWQzMhgnIAMoDxIZChFyZXBlYXRlZF9zZml4ZWQ2NBgoIAMoEBIWCg5yZXBlYXRlZF9mbG9hdBgpIAMoAhIXCg9yZXBlYXRlZF9kb3VibGUYKiADKAESFQoNcmVwZWF0ZWRfYm9vbBgrIAMoCBIXCg9yZXBlYXRlZF9zdHJpbmcYLCADKAkSFgoOcmVwZWF0ZWRfYnl0ZXMYLSADKAwSVwoXcmVwZWF0ZWRfbmVzdGVkX21lc3NhZ2UYMCADKAsyNi5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZRJMChhyZXBlYXRlZF9mb3JlaWduX21lc3NhZ2UYMSADKAsyKi5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5Gb3JlaWduTWVzc2FnZRJIChdyZXBlYXRlZF9pbXBvcnRfbWVzc2FnZRgyIAMoCzInLnByb3RvYnVmX3VuaXR0ZXN0X2ltcG9ydC5JbXBvcnRNZXNzYWdlElEKFHJlcGVhdGVkX25lc3RlZF9lbnVtGDMgAygOMjMucHJvdG8zX2FyZW5hX2xpdGVfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZEVudW0SRgoVcmVwZWF0ZWRfZm9yZWlnbl9lbnVtGDQgAygOMicucHJvdG8zX2FyZW5hX2xpdGVfdW5pdHRlc3QuRm9yZWlnbkVudW0SIQoVcmVwZWF0ZWRfc3RyaW5nX3BpZWNlGDYgAygJQgIIAhIZCg1yZXBlYXRlZF9jb3JkGDcgAygJQgIIARJZChVyZXBlYXRlZF9sYXp5X21lc3NhZ2UYOSADKAsyNi5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZUICKAESFgoMb25lb2ZfdWludDMyGG8gASgNSAASVgoUb25lb2ZfbmVzdGVkX21lc3NhZ2UYcCABKAsyNi5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZUgAEhYKDG9uZW9mX3N0cmluZxhxIAEoCUgAEhUKC29uZW9mX2J5dGVzGHIgASgMSAAaGwoNTmVzdGVkTWVzc2FnZRIKCgJiYhgBIAEoBSJDCgpOZXN0ZWRFbnVtEggKBFpFUk8QABIHCgNGT08QARIHCgNCQVIQAhIHCgNCQVoQAxIQCgNORUcQ////////////AUINCgtvbmVvZl9maWVsZCKzAwoPVGVzdFBhY2tlZFR5cGVzEhgKDHBhY2tlZF9pbnQzMhhaIAMoBUICEAESGAoMcGFja2VkX2ludDY0GFsgAygDQgIQARIZCg1wYWNrZWRfdWludDMyGFwgAygNQgIQARIZCg1wYWNrZWRfdWludDY0GF0gAygEQgIQARIZCg1wYWNrZWRfc2ludDMyGF4gAygRQgIQARIZCg1wYWNrZWRfc2ludDY0GF8gAygSQgIQARIaCg5wYWNrZWRfZml4ZWQzMhhgIAMoB0ICEAESGgoOcGFja2VkX2ZpeGVkNjQYYSADKAZCAhABEhsKD3BhY2tlZF9zZml4ZWQzMhhiIAMoD0ICEAESGwoPcGFja2VkX3NmaXhlZDY0GGMgAygQQgIQARIYCgxwYWNrZWRfZmxvYXQYZCADKAJCAhABEhkKDXBhY2tlZF9kb3VibGUYZSADKAFCAhABEhcKC3BhY2tlZF9ib29sGGYgAygIQgIQARJACgtwYWNrZWRfZW51bRhnIAMoDjInLnByb3RvM19hcmVuYV9saXRlX3VuaXR0ZXN0LkZvcmVpZ25FbnVtQgIQASLkAwoRVGVzdFVucGFja2VkVHlwZXMSGgoOcmVwZWF0ZWRfaW50MzIYASADKAVCAhAAEhoKDnJlcGVhdGVkX2ludDY0GAIgAygDQgIQABIbCg9yZXBlYXRlZF91aW50MzIYAyADKA1CAhAAEhsKD3JlcGVhdGVkX3VpbnQ2NBgEIAMoBEICEAASGwoPcmVwZWF0ZWRfc2ludDMyGAUgAygRQgIQABIbCg9yZXBlYXRlZF9zaW50NjQYBiADKBJCAhAAEhwKEHJlcGVhdGVkX2ZpeGVkMzIYByADKAdCAhAAEhwKEHJlcGVhdGVkX2ZpeGVkNjQYCCADKAZCAhAAEh0KEXJlcGVhdGVkX3NmaXhlZDMyGAkgAygPQgIQABIdChFyZXBlYXRlZF9zZml4ZWQ2NBgKIAMoEEICEAASGgoOcmVwZWF0ZWRfZmxvYXQYCyADKAJCAhAAEhsKD3JlcGVhdGVkX2RvdWJsZRgMIAMoAUICEAASGQoNcmVwZWF0ZWRfYm9vbBgNIAMoCEICEAASVQoUcmVwZWF0ZWRfbmVzdGVkX2VudW0YDiADKA4yMy5wcm90bzNfYXJlbmFfbGl0ZV91bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkRW51bUICEAAijgEKEk5lc3RlZFRlc3RBbGxUeXBlcxI9CgVjaGlsZBgBIAEoCzIuLnByb3RvM19hcmVuYV9saXRlX3VuaXR0ZXN0Lk5lc3RlZFRlc3RBbGxUeXBlcxI5CgdwYXlsb2FkGAIgASgLMigucHJvdG8zX2FyZW5hX2xpdGVfdW5pdHRlc3QuVGVzdEFsbFR5cGVzIhsKDkZvcmVpZ25NZXNzYWdlEgkKAWMYASABKAUiEgoQVGVzdEVtcHR5TWVzc2FnZSpSCgtGb3JlaWduRW51bRIQCgxGT1JFSUdOX1pFUk8QABIPCgtGT1JFSUdOX0ZPTxAEEg8KC0ZPUkVJR05fQkFSEAUSDwoLRk9SRUlHTl9CQVoQBkIFSAP4AQFiBnByb3RvMw", [fileDesc_google_protobuf_unittest_import]);

// Describes the message proto3_arena_lite_unittest.TestAllTypes. Use `create(TestAllTypesDesc)` to create a new TestAllTypes.
export const TestAllTypesDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 0);

// Describes the message proto3_arena_lite_unittest.TestAllTypes.NestedMessage. Use `create(TestAllTypes_NestedMessageDesc)` to create a new TestAllTypes_NestedMessage.
export const TestAllTypes_NestedMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 0, 0);

// Describes the enum proto3_arena_lite_unittest.TestAllTypes.NestedEnum.
export const TestAllTypes_NestedEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 0, 0);

/**
 * @generated from enum proto3_arena_lite_unittest.TestAllTypes.NestedEnum
 */
export const TestAllTypes_NestedEnum = tsEnum(TestAllTypes_NestedEnumDesc);

// Describes the message proto3_arena_lite_unittest.TestPackedTypes. Use `create(TestPackedTypesDesc)` to create a new TestPackedTypes.
export const TestPackedTypesDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 1);

// Describes the message proto3_arena_lite_unittest.TestUnpackedTypes. Use `create(TestUnpackedTypesDesc)` to create a new TestUnpackedTypes.
export const TestUnpackedTypesDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 2);

// Describes the message proto3_arena_lite_unittest.NestedTestAllTypes. Use `create(NestedTestAllTypesDesc)` to create a new NestedTestAllTypes.
export const NestedTestAllTypesDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 3);

// Describes the message proto3_arena_lite_unittest.ForeignMessage. Use `create(ForeignMessageDesc)` to create a new ForeignMessage.
export const ForeignMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 4);

// Describes the message proto3_arena_lite_unittest.TestEmptyMessage. Use `create(TestEmptyMessageDesc)` to create a new TestEmptyMessage.
export const TestEmptyMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 5);

// Describes the enum proto3_arena_lite_unittest.ForeignEnum.
export const ForeignEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_proto3_arena_lite, 0);

/**
 * @generated from enum proto3_arena_lite_unittest.ForeignEnum
 */
export const ForeignEnum = tsEnum(ForeignEnumDesc);

