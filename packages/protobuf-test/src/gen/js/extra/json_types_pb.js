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
// @generated from file extra/json_types.proto (package spec, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/json_types.proto.
 */
export const file_extra_json_types = /*@__PURE__*/
  fileDesc("ChZleHRyYS9qc29uX3R5cGVzLnByb3RvEgRzcGVjItIKChBKc29uVHlwZXNNZXNzYWdlEhIKCmJvb2xfZmllbGQYASABKAgSFAoMZG91YmxlX2ZpZWxkGAIgASgBEhMKC2J5dGVzX2ZpZWxkGAMgASgMEhMKC2ludDY0X2ZpZWxkGAQgASgDEiYKCmVudW1fZmllbGQYBSABKA4yEi5zcGVjLkpzb25UeXBlRW51bRItCg1tZXNzYWdlX2ZpZWxkGAYgASgLMhYuc3BlYy5Kc29uVHlwZXNNZXNzYWdlEicKCWFueV9maWVsZBgHIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BbnkSMQoOZHVyYXRpb25fZmllbGQYCCABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb24SKwoLZW1wdHlfZmllbGQYCSABKAsyFi5nb29nbGUucHJvdG9idWYuRW1wdHkSNAoQZmllbGRfbWFza19maWVsZBgKIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2sSLQoMc3RydWN0X2ZpZWxkGAsgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBIrCgt2YWx1ZV9maWVsZBgMIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZRI0ChBsaXN0X3ZhbHVlX2ZpZWxkGA0gASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZRI0ChBudWxsX3ZhbHVlX2ZpZWxkGA4gASgOMhouZ29vZ2xlLnByb3RvYnVmLk51bGxWYWx1ZRIzCg90aW1lc3RhbXBfZmllbGQYDyABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEjoKFHdyYXBwZWRfZG91YmxlX2ZpZWxkGBAgASgLMhwuZ29vZ2xlLnByb3RvYnVmLkRvdWJsZVZhbHVlEjgKE3dyYXBwZWRfZmxvYXRfZmllbGQYESABKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZRI4ChN3cmFwcGVkX2ludDY0X2ZpZWxkGBIgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkludDY0VmFsdWUSOgoUd3JhcHBlZF91aW50NjRfZmllbGQYEyABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDY0VmFsdWUSOAoTd3JhcHBlZF9pbnQzMl9maWVsZBgUIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlEjoKFHdyYXBwZWRfdWludDMyX2ZpZWxkGBUgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEjYKEndyYXBwZWRfYm9vbF9maWVsZBgWIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5Cb29sVmFsdWUSOgoUd3JhcHBlZF9zdHJpbmdfZmllbGQYFyABKAsyHC5nb29nbGUucHJvdG9idWYuU3RyaW5nVmFsdWUSOAoTd3JhcHBlZF9ieXRlc19maWVsZBgYIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5CeXRlc1ZhbHVlEi8KE3JlcGVhdGVkX2VudW1fZmllbGQYGSADKA4yEi5zcGVjLkpzb25UeXBlRW51bRJJChNtYXBfYm9vbF9lbnVtX2ZpZWxkGBogAygLMiwuc3BlYy5Kc29uVHlwZXNNZXNzYWdlLk1hcEJvb2xFbnVtRmllbGRFbnRyeRpLChVNYXBCb29sRW51bUZpZWxkRW50cnkSCwoDa2V5GAEgASgIEiEKBXZhbHVlGAIgASgOMhIuc3BlYy5Kc29uVHlwZUVudW06AjgBKl0KDEpzb25UeXBlRW51bRIeChpKU09OX1RZUEVfRU5VTV9VTlNQRUNJRklFRBAAEhYKEkpTT05fVFlQRV9FTlVNX1lFUxABEhUKEUpTT05fVFlQRV9FTlVNX05PEAJiBnByb3RvMw", [file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers]);

/**
 * Describes the message spec.JsonTypesMessage.
 * Use `create(JsonTypesMessageSchema)` to create a new message.
 */
export const JsonTypesMessageSchema = /*@__PURE__*/
  messageDesc(file_extra_json_types, 0);

/**
 * Describes the enum spec.JsonTypeEnum.
 */
export const JsonTypeEnumSchema = /*@__PURE__*/
  enumDesc(file_extra_json_types, 0);

/**
 * @generated from enum spec.JsonTypeEnum
 */
export const JsonTypeEnum = /*@__PURE__*/
  tsEnum(JsonTypeEnumSchema);

