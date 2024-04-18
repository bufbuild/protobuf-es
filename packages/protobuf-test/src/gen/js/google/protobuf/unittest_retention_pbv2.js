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

// @generated by protoc-gen-es v1.8.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_retention.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, serviceDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { fileDesc_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";

export const fileDesc_google_protobuf_unittest_retention = /*@__PURE__*/
  fileDesc("Cihnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfcmV0ZW50aW9uLnByb3RvEhFwcm90b2J1Zl91bml0dGVzdCJwCg5PcHRpb25zTWVzc2FnZRITCgtwbGFpbl9maWVsZBgBIAEoBRIkChdydW50aW1lX3JldGVudGlvbl9maWVsZBgCIAEoBUIDiAEBEiMKFnNvdXJjZV9yZXRlbnRpb25fZmllbGQYAyABKAVCA4gBAiIWCghFeHRlbmRlZSoECAEQAioECAIQAyLmAQoPVG9wTGV2ZWxNZXNzYWdlEhUKAWYYASABKAJCCpq67YQPBAgBEAISCwoBaRgCIAEoA0gAGhsKDU5lc3RlZE1lc3NhZ2U6CprF3oUPBAgBEAIiLAoKTmVzdGVkRW51bRISCg5ORVNURURfVU5LTk9XThAAGgr6nqqEDwQIARACKhAIChBlGgqimN+FDwQIARACMjUKAXMSGy5wcm90b2J1Zl91bml0dGVzdC5FeHRlbmRlZRgCIAEoCUIKmrrthA8ECAEQAlIBczoKmsXehQ8ECAEQAkIPCgFvEgqK27eEDwQIARACKj0KDFRvcExldmVsRW51bRIhChFUT1BfTEVWRUxfVU5LTk9XThAAGgrS3amEDwQIARACGgr6nqqEDwQIARACMnQKB1NlcnZpY2USXQoHRG9TdHVmZhIiLnByb3RvYnVmX3VuaXR0ZXN0LlRvcExldmVsTWVzc2FnZRoiLnByb3RvYnVmX3VuaXR0ZXN0LlRvcExldmVsTWVzc2FnZSIK4q74gw8ECAEQAhoK6oeLhA8ECAEQAjpDCgxwbGFpbl9vcHRpb24SHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMYxrXs8AEgASgFUgtwbGFpbk9wdGlvbjpfChhydW50aW1lX3JldGVudGlvbl9vcHRpb24SHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMYnJLp8AEgASgFQgOIAQFSFnJ1bnRpbWVSZXRlbnRpb25PcHRpb246XQoXc291cmNlX3JldGVudGlvbl9vcHRpb24SHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMY1Kzf8AEgASgFQgOIAQJSFXNvdXJjZVJldGVudGlvbk9wdGlvbjpkCgtmaWxlX29wdGlvbhIcLmdvb2dsZS5wcm90b2J1Zi5GaWxlT3B0aW9ucxiA8t7wASABKAsyIS5wcm90b2J1Zl91bml0dGVzdC5PcHRpb25zTWVzc2FnZVIKZmlsZU9wdGlvbjpuChByZXBlYXRlZF9vcHRpb25zEhwuZ29vZ2xlLnByb3RvYnVmLkZpbGVPcHRpb25zGJL+2/ABIAMoCzIhLnByb3RvYnVmX3VuaXR0ZXN0Lk9wdGlvbnNNZXNzYWdlUg9yZXBlYXRlZE9wdGlvbnM6gwEKFmV4dGVuc2lvbl9yYW5nZV9vcHRpb24SJi5nb29nbGUucHJvdG9idWYuRXh0ZW5zaW9uUmFuZ2VPcHRpb25zGITz2/ABIAEoCzIhLnByb3RvYnVmX3VuaXR0ZXN0Lk9wdGlvbnNNZXNzYWdlUhRleHRlbnNpb25SYW5nZU9wdGlvbjptCg5tZXNzYWdlX29wdGlvbhIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxjT6NvwASABKAsyIS5wcm90b2J1Zl91bml0dGVzdC5PcHRpb25zTWVzc2FnZVINbWVzc2FnZU9wdGlvbjpnCgxmaWVsZF9vcHRpb24SHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGKPXzfABIAEoCzIhLnByb3RvYnVmX3VuaXR0ZXN0Lk9wdGlvbnNNZXNzYWdlUgtmaWVsZE9wdGlvbjpnCgxvbmVvZl9vcHRpb24SHS5nb29nbGUucHJvdG9idWYuT25lb2ZPcHRpb25zGLH7xvABIAEoCzIhLnByb3RvYnVmX3VuaXR0ZXN0Lk9wdGlvbnNNZXNzYWdlUgtvbmVvZk9wdGlvbjpkCgtlbnVtX29wdGlvbhIcLmdvb2dsZS5wcm90b2J1Zi5FbnVtT3B0aW9ucxjvo8XwASABKAsyIS5wcm90b2J1Zl91bml0dGVzdC5PcHRpb25zTWVzc2FnZVIKZW51bU9wdGlvbjp0ChFlbnVtX2VudHJ5X29wdGlvbhIhLmdvb2dsZS5wcm90b2J1Zi5FbnVtVmFsdWVPcHRpb25zGNqbxfABIAEoCzIhLnByb3RvYnVmX3VuaXR0ZXN0Lk9wdGlvbnNNZXNzYWdlUg9lbnVtRW50cnlPcHRpb246bQoOc2VydmljZV9vcHRpb24SHy5nb29nbGUucHJvdG9idWYuU2VydmljZU9wdGlvbnMY/bDB8AEgASgLMiEucHJvdG9idWZfdW5pdHRlc3QuT3B0aW9uc01lc3NhZ2VSDXNlcnZpY2VPcHRpb246agoNbWV0aG9kX29wdGlvbhIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGOyFv/ABIAEoCzIhLnByb3RvYnVmX3VuaXR0ZXN0Lk9wdGlvbnNNZXNzYWdlUgxtZXRob2RPcHRpb246NQoBaRIbLnByb3RvYnVmX3VuaXR0ZXN0LkV4dGVuZGVlGAEgASgFQgqauu2EDwQIARACUgFpQjOqAhBQcm90b2J1ZlVuaXR0ZXN0kvHfhQ8ECAEQAoKQ94UPBAgBEALgkcmGDwKwrOOGDwE", [fileDesc_google_protobuf_descriptor]);

// Describes the message protobuf_unittest.OptionsMessage. Use `create(OptionsMessageDesc)` to create a new OptionsMessage.
export const OptionsMessageDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_retention, 0);

// Describes the message protobuf_unittest.Extendee. Use `create(ExtendeeDesc)` to create a new Extendee.
export const ExtendeeDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_retention, 1);

// Describes the message protobuf_unittest.TopLevelMessage. Use `create(TopLevelMessageDesc)` to create a new TopLevelMessage.
export const TopLevelMessageDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_retention, 2);

// Describes the message protobuf_unittest.TopLevelMessage.NestedMessage. Use `create(TopLevelMessage_NestedMessageDesc)` to create a new TopLevelMessage_NestedMessage.
export const TopLevelMessage_NestedMessageDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_retention, 2, 0);

// Describes the enum protobuf_unittest.TopLevelMessage.NestedEnum.
export const TopLevelMessage_NestedEnumDesc = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_unittest_retention, 2, 0);

/**
 * @generated from enum protobuf_unittest.TopLevelMessage.NestedEnum
 */
export const TopLevelMessage_NestedEnum = /*@__PURE__*/
  tsEnum(TopLevelMessage_NestedEnumDesc);

/**
 * @generated from extension: optional string s = 2;
 */
export const TopLevelMessage_s = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 2, 0);

// Describes the enum protobuf_unittest.TopLevelEnum.
export const TopLevelEnumDesc = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_unittest_retention, 0);

/**
 * @generated from enum protobuf_unittest.TopLevelEnum
 */
export const TopLevelEnum = /*@__PURE__*/
  tsEnum(TopLevelEnumDesc);

/**
 * @generated from service protobuf_unittest.Service
 */
export const Service = /*@__PURE__*/
  serviceDesc(fileDesc_google_protobuf_unittest_retention, 0);

/**
 * @generated from extension: optional int32 plain_option = 505092806;
 */
export const plain_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 0);

/**
 * @generated from extension: optional int32 runtime_retention_option = 505039132;
 */
export const runtime_retention_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 1);

/**
 * @generated from extension: optional int32 source_retention_option = 504878676;
 */
export const source_retention_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 2);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage file_option = 504871168;
 */
export const file_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 3);

/**
 * @generated from extension: repeated protobuf_unittest.OptionsMessage repeated_options = 504823570;
 */
export const repeated_options = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 4);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage extension_range_option = 504822148;
 */
export const extension_range_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 5);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage message_option = 504820819;
 */
export const message_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 6);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage field_option = 504589219;
 */
export const field_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 7);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage oneof_option = 504479153;
 */
export const oneof_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 8);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage enum_option = 504451567;
 */
export const enum_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 9);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage enum_entry_option = 504450522;
 */
export const enum_entry_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 10);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage service_option = 504387709;
 */
export const service_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 11);

/**
 * @generated from extension: optional protobuf_unittest.OptionsMessage method_option = 504349420;
 */
export const method_option = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 12);

/**
 * @generated from extension: optional int32 i = 1;
 */
export const i = /*@__PURE__*/
  extDesc(fileDesc_google_protobuf_unittest_retention, 13);

