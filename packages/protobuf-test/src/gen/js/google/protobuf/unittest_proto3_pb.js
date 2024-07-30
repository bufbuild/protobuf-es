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

// @generated by protoc-gen-es v2.0.0-beta.3 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_proto3.proto (package proto3_unittest, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_unittest_import } from "./unittest_import_pb.js";

/**
 * Describes the file google/protobuf/unittest_proto3.proto.
 */
export const file_google_protobuf_unittest_proto3 = /*@__PURE__*/
  fileDesc("CiVnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcHJvdG8zLnByb3RvEg9wcm90bzNfdW5pdHRlc3Qi/xEKDFRlc3RBbGxUeXBlcxIWCg5vcHRpb25hbF9pbnQzMhgBIAEoBRIWCg5vcHRpb25hbF9pbnQ2NBgCIAEoAxIXCg9vcHRpb25hbF91aW50MzIYAyABKA0SFwoPb3B0aW9uYWxfdWludDY0GAQgASgEEhcKD29wdGlvbmFsX3NpbnQzMhgFIAEoERIXCg9vcHRpb25hbF9zaW50NjQYBiABKBISGAoQb3B0aW9uYWxfZml4ZWQzMhgHIAEoBxIYChBvcHRpb25hbF9maXhlZDY0GAggASgGEhkKEW9wdGlvbmFsX3NmaXhlZDMyGAkgASgPEhkKEW9wdGlvbmFsX3NmaXhlZDY0GAogASgQEhYKDm9wdGlvbmFsX2Zsb2F0GAsgASgCEhcKD29wdGlvbmFsX2RvdWJsZRgMIAEoARIVCg1vcHRpb25hbF9ib29sGA0gASgIEhcKD29wdGlvbmFsX3N0cmluZxgOIAEoCRIWCg5vcHRpb25hbF9ieXRlcxgPIAEoDBJRChdvcHRpb25hbF9uZXN0ZWRfbWVzc2FnZRgSIAEoCzIrLnByb3RvM191bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZUgBiAEBEkEKGG9wdGlvbmFsX2ZvcmVpZ25fbWVzc2FnZRgTIAEoCzIfLnByb3RvM191bml0dGVzdC5Gb3JlaWduTWVzc2FnZRJIChdvcHRpb25hbF9pbXBvcnRfbWVzc2FnZRgUIAEoCzInLnByb3RvYnVmX3VuaXR0ZXN0X2ltcG9ydC5JbXBvcnRNZXNzYWdlEkYKFG9wdGlvbmFsX25lc3RlZF9lbnVtGBUgASgOMigucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRFbnVtEjsKFW9wdGlvbmFsX2ZvcmVpZ25fZW51bRgWIAEoDjIcLnByb3RvM191bml0dGVzdC5Gb3JlaWduRW51bRIhChVvcHRpb25hbF9zdHJpbmdfcGllY2UYGCABKAlCAggCEhkKDW9wdGlvbmFsX2NvcmQYGSABKAlCAggBElUKHm9wdGlvbmFsX3B1YmxpY19pbXBvcnRfbWVzc2FnZRgaIAEoCzItLnByb3RvYnVmX3VuaXR0ZXN0X2ltcG9ydC5QdWJsaWNJbXBvcnRNZXNzYWdlEk4KFW9wdGlvbmFsX2xhenlfbWVzc2FnZRgbIAEoCzIrLnByb3RvM191bml0dGVzdC5UZXN0QWxsVHlwZXMuTmVzdGVkTWVzc2FnZUICKAESWQogb3B0aW9uYWxfdW52ZXJpZmllZF9sYXp5X21lc3NhZ2UYHCABKAsyKy5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZE1lc3NhZ2VCAngBElEKHG9wdGlvbmFsX2xhenlfaW1wb3J0X21lc3NhZ2UYcyABKAsyJy5wcm90b2J1Zl91bml0dGVzdF9pbXBvcnQuSW1wb3J0TWVzc2FnZUICKAESFgoOcmVwZWF0ZWRfaW50MzIYHyADKAUSFgoOcmVwZWF0ZWRfaW50NjQYICADKAMSFwoPcmVwZWF0ZWRfdWludDMyGCEgAygNEhcKD3JlcGVhdGVkX3VpbnQ2NBgiIAMoBBIXCg9yZXBlYXRlZF9zaW50MzIYIyADKBESFwoPcmVwZWF0ZWRfc2ludDY0GCQgAygSEhgKEHJlcGVhdGVkX2ZpeGVkMzIYJSADKAcSGAoQcmVwZWF0ZWRfZml4ZWQ2NBgmIAMoBhIZChFyZXBlYXRlZF9zZml4ZWQzMhgnIAMoDxIZChFyZXBlYXRlZF9zZml4ZWQ2NBgoIAMoEBIWCg5yZXBlYXRlZF9mbG9hdBgpIAMoAhIXCg9yZXBlYXRlZF9kb3VibGUYKiADKAESFQoNcmVwZWF0ZWRfYm9vbBgrIAMoCBIXCg9yZXBlYXRlZF9zdHJpbmcYLCADKAkSFgoOcmVwZWF0ZWRfYnl0ZXMYLSADKAwSTAoXcmVwZWF0ZWRfbmVzdGVkX21lc3NhZ2UYMCADKAsyKy5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZE1lc3NhZ2USQQoYcmVwZWF0ZWRfZm9yZWlnbl9tZXNzYWdlGDEgAygLMh8ucHJvdG8zX3VuaXR0ZXN0LkZvcmVpZ25NZXNzYWdlEkgKF3JlcGVhdGVkX2ltcG9ydF9tZXNzYWdlGDIgAygLMicucHJvdG9idWZfdW5pdHRlc3RfaW1wb3J0LkltcG9ydE1lc3NhZ2USRgoUcmVwZWF0ZWRfbmVzdGVkX2VudW0YMyADKA4yKC5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzLk5lc3RlZEVudW0SOwoVcmVwZWF0ZWRfZm9yZWlnbl9lbnVtGDQgAygOMhwucHJvdG8zX3VuaXR0ZXN0LkZvcmVpZ25FbnVtEiEKFXJlcGVhdGVkX3N0cmluZ19waWVjZRg2IAMoCUICCAISGQoNcmVwZWF0ZWRfY29yZBg3IAMoCUICCAESSgoVcmVwZWF0ZWRfbGF6eV9tZXNzYWdlGDkgAygLMisucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRNZXNzYWdlEhYKDG9uZW9mX3VpbnQzMhhvIAEoDUgAEksKFG9uZW9mX25lc3RlZF9tZXNzYWdlGHAgASgLMisucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRNZXNzYWdlSAASFgoMb25lb2Zfc3RyaW5nGHEgASgJSAASFQoLb25lb2ZfYnl0ZXMYciABKAxIABobCg1OZXN0ZWRNZXNzYWdlEgoKAmJiGAEgASgFIkMKCk5lc3RlZEVudW0SCAoEWkVSTxAAEgcKA0ZPTxABEgcKA0JBUhACEgcKA0JBWhADEhAKA05FRxD///////////8BQg0KC29uZW9mX2ZpZWxkQhoKGF9vcHRpb25hbF9uZXN0ZWRfbWVzc2FnZSKoAwoPVGVzdFBhY2tlZFR5cGVzEhgKDHBhY2tlZF9pbnQzMhhaIAMoBUICEAESGAoMcGFja2VkX2ludDY0GFsgAygDQgIQARIZCg1wYWNrZWRfdWludDMyGFwgAygNQgIQARIZCg1wYWNrZWRfdWludDY0GF0gAygEQgIQARIZCg1wYWNrZWRfc2ludDMyGF4gAygRQgIQARIZCg1wYWNrZWRfc2ludDY0GF8gAygSQgIQARIaCg5wYWNrZWRfZml4ZWQzMhhgIAMoB0ICEAESGgoOcGFja2VkX2ZpeGVkNjQYYSADKAZCAhABEhsKD3BhY2tlZF9zZml4ZWQzMhhiIAMoD0ICEAESGwoPcGFja2VkX3NmaXhlZDY0GGMgAygQQgIQARIYCgxwYWNrZWRfZmxvYXQYZCADKAJCAhABEhkKDXBhY2tlZF9kb3VibGUYZSADKAFCAhABEhcKC3BhY2tlZF9ib29sGGYgAygIQgIQARI1CgtwYWNrZWRfZW51bRhnIAMoDjIcLnByb3RvM191bml0dGVzdC5Gb3JlaWduRW51bUICEAEi2QMKEVRlc3RVbnBhY2tlZFR5cGVzEhoKDnJlcGVhdGVkX2ludDMyGAEgAygFQgIQABIaCg5yZXBlYXRlZF9pbnQ2NBgCIAMoA0ICEAASGwoPcmVwZWF0ZWRfdWludDMyGAMgAygNQgIQABIbCg9yZXBlYXRlZF91aW50NjQYBCADKARCAhAAEhsKD3JlcGVhdGVkX3NpbnQzMhgFIAMoEUICEAASGwoPcmVwZWF0ZWRfc2ludDY0GAYgAygSQgIQABIcChByZXBlYXRlZF9maXhlZDMyGAcgAygHQgIQABIcChByZXBlYXRlZF9maXhlZDY0GAggAygGQgIQABIdChFyZXBlYXRlZF9zZml4ZWQzMhgJIAMoD0ICEAASHQoRcmVwZWF0ZWRfc2ZpeGVkNjQYCiADKBBCAhAAEhoKDnJlcGVhdGVkX2Zsb2F0GAsgAygCQgIQABIbCg9yZXBlYXRlZF9kb3VibGUYDCADKAFCAhAAEhkKDXJlcGVhdGVkX2Jvb2wYDSADKAhCAhAAEkoKFHJlcGVhdGVkX25lc3RlZF9lbnVtGA4gAygOMigucHJvdG8zX3VuaXR0ZXN0LlRlc3RBbGxUeXBlcy5OZXN0ZWRFbnVtQgIQACJ4ChJOZXN0ZWRUZXN0QWxsVHlwZXMSMgoFY2hpbGQYASABKAsyIy5wcm90bzNfdW5pdHRlc3QuTmVzdGVkVGVzdEFsbFR5cGVzEi4KB3BheWxvYWQYAiABKAsyHS5wcm90bzNfdW5pdHRlc3QuVGVzdEFsbFR5cGVzIhsKDkZvcmVpZ25NZXNzYWdlEgkKAWMYASABKAUiEgoQVGVzdEVtcHR5TWVzc2FnZSIpChRUZXN0TWVzc2FnZVdpdGhEdW1teRIRCgVkdW1teRj/////ASABKAgihQEKClRlc3RPbmVvZjISOgoIZm9vX2VudW0YBiABKA4yJi5wcm90bzNfdW5pdHRlc3QuVGVzdE9uZW9mMi5OZXN0ZWRFbnVtSAAiNAoKTmVzdGVkRW51bRILCgdVTktOT1dOEAASBwoDRk9PEAESBwoDQkFSEAISBwoDQkFaEANCBQoDZm9vKlIKC0ZvcmVpZ25FbnVtEhAKDEZPUkVJR05fWkVSTxAAEg8KC0ZPUkVJR05fRk9PEAQSDwoLRk9SRUlHTl9CQVIQBRIPCgtGT1JFSUdOX0JBWhAGQgJIAWIGcHJvdG8z", [file_google_protobuf_unittest_import]);

/**
 * Describes the message proto3_unittest.TestAllTypes.
 * Use `create(TestAllTypesSchema)` to create a new message.
 */
export const TestAllTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 0);

/**
 * Describes the message proto3_unittest.TestAllTypes.NestedMessage.
 * Use `create(TestAllTypes_NestedMessageSchema)` to create a new message.
 */
export const TestAllTypes_NestedMessageSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 0, 0);

/**
 * Describes the enum proto3_unittest.TestAllTypes.NestedEnum.
 */
export const TestAllTypes_NestedEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3, 0, 0);

/**
 * @generated from enum proto3_unittest.TestAllTypes.NestedEnum
 */
export const TestAllTypes_NestedEnum = /*@__PURE__*/
  tsEnum(TestAllTypes_NestedEnumSchema);

/**
 * Describes the message proto3_unittest.TestPackedTypes.
 * Use `create(TestPackedTypesSchema)` to create a new message.
 */
export const TestPackedTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 1);

/**
 * Describes the message proto3_unittest.TestUnpackedTypes.
 * Use `create(TestUnpackedTypesSchema)` to create a new message.
 */
export const TestUnpackedTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 2);

/**
 * Describes the message proto3_unittest.NestedTestAllTypes.
 * Use `create(NestedTestAllTypesSchema)` to create a new message.
 */
export const NestedTestAllTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 3);

/**
 * Describes the message proto3_unittest.ForeignMessage.
 * Use `create(ForeignMessageSchema)` to create a new message.
 */
export const ForeignMessageSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 4);

/**
 * Describes the message proto3_unittest.TestEmptyMessage.
 * Use `create(TestEmptyMessageSchema)` to create a new message.
 */
export const TestEmptyMessageSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 5);

/**
 * Describes the message proto3_unittest.TestMessageWithDummy.
 * Use `create(TestMessageWithDummySchema)` to create a new message.
 */
export const TestMessageWithDummySchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 6);

/**
 * Describes the message proto3_unittest.TestOneof2.
 * Use `create(TestOneof2Schema)` to create a new message.
 */
export const TestOneof2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_proto3, 7);

/**
 * Describes the enum proto3_unittest.TestOneof2.NestedEnum.
 */
export const TestOneof2_NestedEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3, 7, 0);

/**
 * @generated from enum proto3_unittest.TestOneof2.NestedEnum
 */
export const TestOneof2_NestedEnum = /*@__PURE__*/
  tsEnum(TestOneof2_NestedEnumSchema);

/**
 * Describes the enum proto3_unittest.ForeignEnum.
 */
export const ForeignEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_unittest_proto3, 0);

/**
 * @generated from enum proto3_unittest.ForeignEnum
 */
export const ForeignEnum = /*@__PURE__*/
  tsEnum(ForeignEnumSchema);

