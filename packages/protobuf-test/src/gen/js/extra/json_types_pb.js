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

// @generated by protoc-gen-es v2.2.4 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/json_types.proto (package spec, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/json_types.proto.
 */
export const file_extra_json_types = /*@__PURE__*/
  fileDesc("ChZleHRyYS9qc29uX3R5cGVzLnByb3RvEgRzcGVjIoYNChBKc29uVHlwZXNNZXNzYWdlEi4KCmJvb2xfZmllbGQYASABKAhSGmJvb2xlYW5GaWVsZFdpdGhDdXN0b21OYW1lEhQKDGRvdWJsZV9maWVsZBgCIAEoARITCgtieXRlc19maWVsZBgDIAEoDBITCgtpbnQ2NF9maWVsZBgEIAEoAxImCgplbnVtX2ZpZWxkGAUgASgOMhIuc3BlYy5Kc29uVHlwZUVudW0SLQoNbWVzc2FnZV9maWVsZBgGIAEoCzIWLnNwZWMuSnNvblR5cGVzTWVzc2FnZRInCglhbnlfZmllbGQYByABKAsyFC5nb29nbGUucHJvdG9idWYuQW55EjEKDmR1cmF0aW9uX2ZpZWxkGAggASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uEisKC2VtcHR5X2ZpZWxkGAkgASgLMhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5EjQKEGZpZWxkX21hc2tfZmllbGQYCiABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrEi0KDHN0cnVjdF9maWVsZBgLIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSKwoLdmFsdWVfZmllbGQYDCABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWUSNAoQbGlzdF92YWx1ZV9maWVsZBgNIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5MaXN0VmFsdWUSNAoQbnVsbF92YWx1ZV9maWVsZBgOIAEoDjIaLmdvb2dsZS5wcm90b2J1Zi5OdWxsVmFsdWUSMwoPdGltZXN0YW1wX2ZpZWxkGA8gASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBI6ChR3cmFwcGVkX2RvdWJsZV9maWVsZBgQIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZRI4ChN3cmFwcGVkX2Zsb2F0X2ZpZWxkGBEgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkZsb2F0VmFsdWUSOAoTd3JhcHBlZF9pbnQ2NF9maWVsZBgSIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEjoKFHdyYXBwZWRfdWludDY0X2ZpZWxkGBMgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQ2NFZhbHVlEjgKE3dyYXBwZWRfaW50MzJfZmllbGQYFCABKAsyGy5nb29nbGUucHJvdG9idWYuSW50MzJWYWx1ZRI6ChR3cmFwcGVkX3VpbnQzMl9maWVsZBgVIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRI2ChJ3cmFwcGVkX2Jvb2xfZmllbGQYFiABKAsyGi5nb29nbGUucHJvdG9idWYuQm9vbFZhbHVlEjoKFHdyYXBwZWRfc3RyaW5nX2ZpZWxkGBcgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlN0cmluZ1ZhbHVlEjgKE3dyYXBwZWRfYnl0ZXNfZmllbGQYGCABKAsyGy5nb29nbGUucHJvdG9idWYuQnl0ZXNWYWx1ZRIvChNyZXBlYXRlZF9lbnVtX2ZpZWxkGBkgAygOMhIuc3BlYy5Kc29uVHlwZUVudW0SSQoTbWFwX2Jvb2xfZW51bV9maWVsZBgaIAMoCzIsLnNwZWMuSnNvblR5cGVzTWVzc2FnZS5NYXBCb29sRW51bUZpZWxkRW50cnkSIQoManNvbl9uYW1lX29rGBsgASgIUgtGb28xMjNfYmFyJBIaCgxqc29uX25hbWVfYXQYHCABKAhSBGZvb0ASIQoQanNvbl9uYW1lX2h5cGhlbhgdIAEoCFIHZm9vLWJhchIoChpqc29uX25hbWVfc3RhcnRfd2l0aF9kaWdpdBgeIAEoCFIEMWZvbxIgCg9qc29uX25hbWVfc3BhY2UYHyABKAhSB2ZvbyBiYXISHgoNanNvbl9uYW1lX3RhYhggIAEoCFIHZm9vCWJhchIjChNqc29uX25hbWVfbm9uX2FzY2lpGCEgASgIUgbkvaDlpb0SIwoQanNvbl9uYW1lX2VzY2FwZRgiIAEoCFIJZm9vCmJhclxuGksKFU1hcEJvb2xFbnVtRmllbGRFbnRyeRILCgNrZXkYASABKAgSIQoFdmFsdWUYAiABKA4yEi5zcGVjLkpzb25UeXBlRW51bToCOAEqXQoMSnNvblR5cGVFbnVtEh4KGkpTT05fVFlQRV9FTlVNX1VOU1BFQ0lGSUVEEAASFgoSSlNPTl9UWVBFX0VOVU1fWUVTEAESFQoRSlNPTl9UWVBFX0VOVU1fTk8QAmIGcHJvdG8z", [file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers]);

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

