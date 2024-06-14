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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file extra/options.proto (package spec, syntax proto3)
/* eslint-disable */

import { extDesc, fileDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/options.proto.
 */
export const file_extra_options = /*@__PURE__*/
  fileDesc("ChNleHRyYS9vcHRpb25zLnByb3RvEgRzcGVjOmQKHWZpbGVfb3B0aW9uX3JldGVudGlvbl91bmtub3duEhwuZ29vZ2xlLnByb3RvYnVmLkZpbGVPcHRpb25zGNWjBCABKAlSGmZpbGVPcHRpb25SZXRlbnRpb25Vbmtub3duiAEBOmkKHWZpbGVfb3B0aW9uX3JldGVudGlvbl9ydW50aW1lEhwuZ29vZ2xlLnByb3RvYnVmLkZpbGVPcHRpb25zGNajBCABKAlCA4gBAVIaZmlsZU9wdGlvblJldGVudGlvblJ1bnRpbWWIAQE6ZwocZmlsZV9vcHRpb25fcmV0ZW50aW9uX3NvdXJjZRIcLmdvb2dsZS5wcm90b2J1Zi5GaWxlT3B0aW9ucxjXowQgASgJQgOIAQJSGWZpbGVPcHRpb25SZXRlbnRpb25Tb3VyY2WIAQE6bQogbWVzc2FnZV9vcHRpb25fcmV0ZW50aW9uX3Vua25vd24SHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYuaQEIAEoCVIdbWVzc2FnZU9wdGlvblJldGVudGlvblVua25vd26IAQE6cgogbWVzc2FnZV9vcHRpb25fcmV0ZW50aW9uX3J1bnRpbWUSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYuqQEIAEoCUIDiAEBUh1tZXNzYWdlT3B0aW9uUmV0ZW50aW9uUnVudGltZYgBATpwCh9tZXNzYWdlX29wdGlvbl9yZXRlbnRpb25fc291cmNlEh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGLukBCABKAlCA4gBAlIcbWVzc2FnZU9wdGlvblJldGVudGlvblNvdXJjZYgBATpnCh5maWVsZF9vcHRpb25fcmV0ZW50aW9uX3Vua25vd24SHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGJ2lBCABKAlSG2ZpZWxkT3B0aW9uUmV0ZW50aW9uVW5rbm93bogBATpsCh5maWVsZF9vcHRpb25fcmV0ZW50aW9uX3J1bnRpbWUSHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGJ6lBCABKAlCA4gBAVIbZmllbGRPcHRpb25SZXRlbnRpb25SdW50aW1liAEBOmoKHWZpZWxkX29wdGlvbl9yZXRlbnRpb25fc291cmNlEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxifpQQgASgJQgOIAQJSGmZpZWxkT3B0aW9uUmV0ZW50aW9uU291cmNliAEBOmcKHm9uZW9mX29wdGlvbl9yZXRlbnRpb25fdW5rbm93bhIdLmdvb2dsZS5wcm90b2J1Zi5PbmVvZk9wdGlvbnMYgaYEIAEoCVIbb25lb2ZPcHRpb25SZXRlbnRpb25Vbmtub3duiAEBOmwKHm9uZW9mX29wdGlvbl9yZXRlbnRpb25fcnVudGltZRIdLmdvb2dsZS5wcm90b2J1Zi5PbmVvZk9wdGlvbnMYgqYEIAEoCUIDiAEBUhtvbmVvZk9wdGlvblJldGVudGlvblJ1bnRpbWWIAQE6agodb25lb2Zfb3B0aW9uX3JldGVudGlvbl9zb3VyY2USHS5nb29nbGUucHJvdG9idWYuT25lb2ZPcHRpb25zGIOmBCABKAlCA4gBAlIab25lb2ZPcHRpb25SZXRlbnRpb25Tb3VyY2WIAQE6ZAodZW51bV9vcHRpb25fcmV0ZW50aW9uX3Vua25vd24SHC5nb29nbGUucHJvdG9idWYuRW51bU9wdGlvbnMY5aYEIAEoCVIaZW51bU9wdGlvblJldGVudGlvblVua25vd26IAQE6aQodZW51bV9vcHRpb25fcmV0ZW50aW9uX3J1bnRpbWUSHC5nb29nbGUucHJvdG9idWYuRW51bU9wdGlvbnMY5qYEIAEoCUIDiAEBUhplbnVtT3B0aW9uUmV0ZW50aW9uUnVudGltZYgBATpnChxlbnVtX29wdGlvbl9yZXRlbnRpb25fc291cmNlEhwuZ29vZ2xlLnByb3RvYnVmLkVudW1PcHRpb25zGOemBCABKAlCA4gBAlIZZW51bU9wdGlvblJldGVudGlvblNvdXJjZYgBATp0CiNlbnVtX3ZhbHVlX29wdGlvbl9yZXRlbnRpb25fdW5rbm93bhIhLmdvb2dsZS5wcm90b2J1Zi5FbnVtVmFsdWVPcHRpb25zGMmnBCABKAlSH2VudW1WYWx1ZU9wdGlvblJldGVudGlvblVua25vd26IAQE6eQojZW51bV92YWx1ZV9vcHRpb25fcmV0ZW50aW9uX3J1bnRpbWUSIS5nb29nbGUucHJvdG9idWYuRW51bVZhbHVlT3B0aW9ucxjKpwQgASgJQgOIAQFSH2VudW1WYWx1ZU9wdGlvblJldGVudGlvblJ1bnRpbWWIAQE6dwoiZW51bV92YWx1ZV9vcHRpb25fcmV0ZW50aW9uX3NvdXJjZRIhLmdvb2dsZS5wcm90b2J1Zi5FbnVtVmFsdWVPcHRpb25zGMunBCABKAlCA4gBAlIeZW51bVZhbHVlT3B0aW9uUmV0ZW50aW9uU291cmNliAEBOm0KIHNlcnZpY2Vfb3B0aW9uX3JldGVudGlvbl91bmtub3duEh8uZ29vZ2xlLnByb3RvYnVmLlNlcnZpY2VPcHRpb25zGK2oBCABKAlSHXNlcnZpY2VPcHRpb25SZXRlbnRpb25Vbmtub3duiAEBOnIKIHNlcnZpY2Vfb3B0aW9uX3JldGVudGlvbl9ydW50aW1lEh8uZ29vZ2xlLnByb3RvYnVmLlNlcnZpY2VPcHRpb25zGK6oBCABKAlCA4gBAVIdc2VydmljZU9wdGlvblJldGVudGlvblJ1bnRpbWWIAQE6cAofc2VydmljZV9vcHRpb25fcmV0ZW50aW9uX3NvdXJjZRIfLmdvb2dsZS5wcm90b2J1Zi5TZXJ2aWNlT3B0aW9ucxivqAQgASgJQgOIAQJSHHNlcnZpY2VPcHRpb25SZXRlbnRpb25Tb3VyY2WIAQE6agofbWV0aG9kX29wdGlvbl9yZXRlbnRpb25fdW5rbm93bhIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGJGpBCABKAlSHG1ldGhvZE9wdGlvblJldGVudGlvblVua25vd26IAQE6bwofbWV0aG9kX29wdGlvbl9yZXRlbnRpb25fcnVudGltZRIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGJKpBCABKAlCA4gBAVIcbWV0aG9kT3B0aW9uUmV0ZW50aW9uUnVudGltZYgBATptCh5tZXRob2Rfb3B0aW9uX3JldGVudGlvbl9zb3VyY2USHi5nb29nbGUucHJvdG9idWYuTWV0aG9kT3B0aW9ucxiTqQQgASgJQgOIAQJSG21ldGhvZE9wdGlvblJldGVudGlvblNvdXJjZYgBAWIGcHJvdG8z", [file_google_protobuf_descriptor]);

/**
 * @generated from extension: optional string file_option_retention_unknown = 70101;
 */
export const file_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 0);

/**
 * @generated from extension: optional string file_option_retention_runtime = 70102;
 */
export const file_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 1);

/**
 * @generated from extension: optional string file_option_retention_source = 70103;
 */
export const file_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 2);

/**
 * @generated from extension: optional string message_option_retention_unknown = 70201;
 */
export const message_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 3);

/**
 * @generated from extension: optional string message_option_retention_runtime = 70202;
 */
export const message_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 4);

/**
 * @generated from extension: optional string message_option_retention_source = 70203;
 */
export const message_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 5);

/**
 * @generated from extension: optional string field_option_retention_unknown = 70301;
 */
export const field_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 6);

/**
 * @generated from extension: optional string field_option_retention_runtime = 70302;
 */
export const field_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 7);

/**
 * @generated from extension: optional string field_option_retention_source = 70303;
 */
export const field_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 8);

/**
 * @generated from extension: optional string oneof_option_retention_unknown = 70401;
 */
export const oneof_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 9);

/**
 * @generated from extension: optional string oneof_option_retention_runtime = 70402;
 */
export const oneof_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 10);

/**
 * @generated from extension: optional string oneof_option_retention_source = 70403;
 */
export const oneof_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 11);

/**
 * @generated from extension: optional string enum_option_retention_unknown = 70501;
 */
export const enum_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 12);

/**
 * @generated from extension: optional string enum_option_retention_runtime = 70502;
 */
export const enum_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 13);

/**
 * @generated from extension: optional string enum_option_retention_source = 70503;
 */
export const enum_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 14);

/**
 * @generated from extension: optional string enum_value_option_retention_unknown = 70601;
 */
export const enum_value_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 15);

/**
 * @generated from extension: optional string enum_value_option_retention_runtime = 70602;
 */
export const enum_value_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 16);

/**
 * @generated from extension: optional string enum_value_option_retention_source = 70603;
 */
export const enum_value_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 17);

/**
 * @generated from extension: optional string service_option_retention_unknown = 70701;
 */
export const service_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 18);

/**
 * @generated from extension: optional string service_option_retention_runtime = 70702;
 */
export const service_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 19);

/**
 * @generated from extension: optional string service_option_retention_source = 70703;
 */
export const service_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 20);

/**
 * @generated from extension: optional string method_option_retention_unknown = 70801;
 */
export const method_option_retention_unknown = /*@__PURE__*/
  extDesc(file_extra_options, 21);

/**
 * @generated from extension: optional string method_option_retention_runtime = 70802;
 */
export const method_option_retention_runtime = /*@__PURE__*/
  extDesc(file_extra_options, 22);

/**
 * @generated from extension: optional string method_option_retention_source = 70803;
 */
export const method_option_retention_source = /*@__PURE__*/
  extDesc(file_extra_options, 23);

