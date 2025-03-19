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

// @generated by protoc-gen-es v2.2.5 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_well_known_types.proto (package proto2_unittest, syntax proto3)
/* eslint-disable */

import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_any, file_google_protobuf_api, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_source_context, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_type } from "./type_pb.js";

/**
 * Describes the file google/protobuf/unittest_well_known_types.proto.
 */
export const file_google_protobuf_unittest_well_known_types = /*@__PURE__*/
  fileDesc("Ci9nb29nbGUvcHJvdG9idWYvdW5pdHRlc3Rfd2VsbF9rbm93bl90eXBlcy5wcm90bxIPcHJvdG8yX3VuaXR0ZXN0Ir4HChJUZXN0V2VsbEtub3duVHlwZXMSJwoJYW55X2ZpZWxkGAEgASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueRInCglhcGlfZmllbGQYAiABKAsyFC5nb29nbGUucHJvdG9idWYuQXBpEjEKDmR1cmF0aW9uX2ZpZWxkGAMgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uEisKC2VtcHR5X2ZpZWxkGAQgASgLMhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5EjQKEGZpZWxkX21hc2tfZmllbGQYBSABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrEjwKFHNvdXJjZV9jb250ZXh0X2ZpZWxkGAYgASgLMh4uZ29vZ2xlLnByb3RvYnVmLlNvdXJjZUNvbnRleHQSLQoMc3RydWN0X2ZpZWxkGAcgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBIzCg90aW1lc3RhbXBfZmllbGQYCCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEikKCnR5cGVfZmllbGQYCSABKAsyFS5nb29nbGUucHJvdG9idWYuVHlwZRIyCgxkb3VibGVfZmllbGQYCiABKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUSMAoLZmxvYXRfZmllbGQYCyABKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZRIwCgtpbnQ2NF9maWVsZBgMIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEjIKDHVpbnQ2NF9maWVsZBgNIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50NjRWYWx1ZRIwCgtpbnQzMl9maWVsZBgOIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlEjIKDHVpbnQzMl9maWVsZBgPIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRIuCgpib29sX2ZpZWxkGBAgASgLMhouZ29vZ2xlLnByb3RvYnVmLkJvb2xWYWx1ZRIyCgxzdHJpbmdfZmllbGQYESABKAsyHC5nb29nbGUucHJvdG9idWYuU3RyaW5nVmFsdWUSMAoLYnl0ZXNfZmllbGQYEiABKAsyGy5nb29nbGUucHJvdG9idWYuQnl0ZXNWYWx1ZRIrCgt2YWx1ZV9maWVsZBgTIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSKVBwoWUmVwZWF0ZWRXZWxsS25vd25UeXBlcxInCglhbnlfZmllbGQYASADKAsyFC5nb29nbGUucHJvdG9idWYuQW55EicKCWFwaV9maWVsZBgCIAMoCzIULmdvb2dsZS5wcm90b2J1Zi5BcGkSMQoOZHVyYXRpb25fZmllbGQYAyADKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb24SKwoLZW1wdHlfZmllbGQYBCADKAsyFi5nb29nbGUucHJvdG9idWYuRW1wdHkSNAoQZmllbGRfbWFza19maWVsZBgFIAMoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2sSPAoUc291cmNlX2NvbnRleHRfZmllbGQYBiADKAsyHi5nb29nbGUucHJvdG9idWYuU291cmNlQ29udGV4dBItCgxzdHJ1Y3RfZmllbGQYByADKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0EjMKD3RpbWVzdGFtcF9maWVsZBgIIAMoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASKQoKdHlwZV9maWVsZBgJIAMoCzIVLmdvb2dsZS5wcm90b2J1Zi5UeXBlEjIKDGRvdWJsZV9maWVsZBgKIAMoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZRIwCgtmbG9hdF9maWVsZBgLIAMoCzIbLmdvb2dsZS5wcm90b2J1Zi5GbG9hdFZhbHVlEjAKC2ludDY0X2ZpZWxkGAwgAygLMhsuZ29vZ2xlLnByb3RvYnVmLkludDY0VmFsdWUSMgoMdWludDY0X2ZpZWxkGA0gAygLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQ2NFZhbHVlEjAKC2ludDMyX2ZpZWxkGA4gAygLMhsuZ29vZ2xlLnByb3RvYnVmLkludDMyVmFsdWUSMgoMdWludDMyX2ZpZWxkGA8gAygLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEi4KCmJvb2xfZmllbGQYECADKAsyGi5nb29nbGUucHJvdG9idWYuQm9vbFZhbHVlEjIKDHN0cmluZ19maWVsZBgRIAMoCzIcLmdvb2dsZS5wcm90b2J1Zi5TdHJpbmdWYWx1ZRIwCgtieXRlc19maWVsZBgSIAMoCzIbLmdvb2dsZS5wcm90b2J1Zi5CeXRlc1ZhbHVlIsUHChNPbmVvZldlbGxLbm93blR5cGVzEikKCWFueV9maWVsZBgBIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BbnlIABIpCglhcGlfZmllbGQYAiABKAsyFC5nb29nbGUucHJvdG9idWYuQXBpSAASMwoOZHVyYXRpb25fZmllbGQYAyABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25IABItCgtlbXB0eV9maWVsZBgEIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eUgAEjYKEGZpZWxkX21hc2tfZmllbGQYBSABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrSAASPgoUc291cmNlX2NvbnRleHRfZmllbGQYBiABKAsyHi5nb29nbGUucHJvdG9idWYuU291cmNlQ29udGV4dEgAEi8KDHN0cnVjdF9maWVsZBgHIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABI1Cg90aW1lc3RhbXBfZmllbGQYCCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wSAASKwoKdHlwZV9maWVsZBgJIAEoCzIVLmdvb2dsZS5wcm90b2J1Zi5UeXBlSAASNAoMZG91YmxlX2ZpZWxkGAogASgLMhwuZ29vZ2xlLnByb3RvYnVmLkRvdWJsZVZhbHVlSAASMgoLZmxvYXRfZmllbGQYCyABKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZUgAEjIKC2ludDY0X2ZpZWxkGAwgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkludDY0VmFsdWVIABI0Cgx1aW50NjRfZmllbGQYDSABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDY0VmFsdWVIABIyCgtpbnQzMl9maWVsZBgOIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlSAASNAoMdWludDMyX2ZpZWxkGA8gASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlSAASMAoKYm9vbF9maWVsZBgQIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5Cb29sVmFsdWVIABI0CgxzdHJpbmdfZmllbGQYESABKAsyHC5nb29nbGUucHJvdG9idWYuU3RyaW5nVmFsdWVIABIyCgtieXRlc19maWVsZBgSIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5CeXRlc1ZhbHVlSABCDQoLb25lb2ZfZmllbGQi8hUKEU1hcFdlbGxLbm93blR5cGVzEkMKCWFueV9maWVsZBgBIAMoCzIwLnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5BbnlGaWVsZEVudHJ5EkMKCWFwaV9maWVsZBgCIAMoCzIwLnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5BcGlGaWVsZEVudHJ5Ek0KDmR1cmF0aW9uX2ZpZWxkGAMgAygLMjUucHJvdG8yX3VuaXR0ZXN0Lk1hcFdlbGxLbm93blR5cGVzLkR1cmF0aW9uRmllbGRFbnRyeRJHCgtlbXB0eV9maWVsZBgEIAMoCzIyLnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5FbXB0eUZpZWxkRW50cnkSUAoQZmllbGRfbWFza19maWVsZBgFIAMoCzI2LnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5GaWVsZE1hc2tGaWVsZEVudHJ5ElgKFHNvdXJjZV9jb250ZXh0X2ZpZWxkGAYgAygLMjoucHJvdG8yX3VuaXR0ZXN0Lk1hcFdlbGxLbm93blR5cGVzLlNvdXJjZUNvbnRleHRGaWVsZEVudHJ5EkkKDHN0cnVjdF9maWVsZBgHIAMoCzIzLnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5TdHJ1Y3RGaWVsZEVudHJ5Ek8KD3RpbWVzdGFtcF9maWVsZBgIIAMoCzI2LnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5UaW1lc3RhbXBGaWVsZEVudHJ5EkUKCnR5cGVfZmllbGQYCSADKAsyMS5wcm90bzJfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuVHlwZUZpZWxkRW50cnkSSQoMZG91YmxlX2ZpZWxkGAogAygLMjMucHJvdG8yX3VuaXR0ZXN0Lk1hcFdlbGxLbm93blR5cGVzLkRvdWJsZUZpZWxkRW50cnkSRwoLZmxvYXRfZmllbGQYCyADKAsyMi5wcm90bzJfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuRmxvYXRGaWVsZEVudHJ5EkcKC2ludDY0X2ZpZWxkGAwgAygLMjIucHJvdG8yX3VuaXR0ZXN0Lk1hcFdlbGxLbm93blR5cGVzLkludDY0RmllbGRFbnRyeRJJCgx1aW50NjRfZmllbGQYDSADKAsyMy5wcm90bzJfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuVWludDY0RmllbGRFbnRyeRJHCgtpbnQzMl9maWVsZBgOIAMoCzIyLnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5JbnQzMkZpZWxkRW50cnkSSQoMdWludDMyX2ZpZWxkGA8gAygLMjMucHJvdG8yX3VuaXR0ZXN0Lk1hcFdlbGxLbm93blR5cGVzLlVpbnQzMkZpZWxkRW50cnkSRQoKYm9vbF9maWVsZBgQIAMoCzIxLnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5Cb29sRmllbGRFbnRyeRJJCgxzdHJpbmdfZmllbGQYESADKAsyMy5wcm90bzJfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuU3RyaW5nRmllbGRFbnRyeRJHCgtieXRlc19maWVsZBgSIAMoCzIyLnByb3RvMl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5CeXRlc0ZpZWxkRW50cnkaRQoNQW55RmllbGRFbnRyeRILCgNrZXkYASABKAUSIwoFdmFsdWUYAiABKAsyFC5nb29nbGUucHJvdG9idWYuQW55OgI4ARpFCg1BcGlGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIjCgV2YWx1ZRgCIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BcGk6AjgBGk8KEkR1cmF0aW9uRmllbGRFbnRyeRILCgNrZXkYASABKAUSKAoFdmFsdWUYAiABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb246AjgBGkkKD0VtcHR5RmllbGRFbnRyeRILCgNrZXkYASABKAUSJQoFdmFsdWUYAiABKAsyFi5nb29nbGUucHJvdG9idWYuRW1wdHk6AjgBGlEKE0ZpZWxkTWFza0ZpZWxkRW50cnkSCwoDa2V5GAEgASgFEikKBXZhbHVlGAIgASgLMhouZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzazoCOAEaWQoXU291cmNlQ29udGV4dEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEi0KBXZhbHVlGAIgASgLMh4uZ29vZ2xlLnByb3RvYnVmLlNvdXJjZUNvbnRleHQ6AjgBGksKEFN0cnVjdEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEiYKBXZhbHVlGAIgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdDoCOAEaUQoTVGltZXN0YW1wRmllbGRFbnRyeRILCgNrZXkYASABKAUSKQoFdmFsdWUYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wOgI4ARpHCg5UeXBlRmllbGRFbnRyeRILCgNrZXkYASABKAUSJAoFdmFsdWUYAiABKAsyFS5nb29nbGUucHJvdG9idWYuVHlwZToCOAEaUAoQRG91YmxlRmllbGRFbnRyeRILCgNrZXkYASABKAUSKwoFdmFsdWUYAiABKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWU6AjgBGk4KD0Zsb2F0RmllbGRFbnRyeRILCgNrZXkYASABKAUSKgoFdmFsdWUYAiABKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZToCOAEaTgoPSW50NjRGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIqCgV2YWx1ZRgCIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlOgI4ARpQChBVaW50NjRGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIrCgV2YWx1ZRgCIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50NjRWYWx1ZToCOAEaTgoPSW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIqCgV2YWx1ZRgCIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlOgI4ARpQChBVaW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIrCgV2YWx1ZRgCIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZToCOAEaTAoOQm9vbEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEikKBXZhbHVlGAIgASgLMhouZ29vZ2xlLnByb3RvYnVmLkJvb2xWYWx1ZToCOAEaUAoQU3RyaW5nRmllbGRFbnRyeRILCgNrZXkYASABKAUSKwoFdmFsdWUYAiABKAsyHC5nb29nbGUucHJvdG9idWYuU3RyaW5nVmFsdWU6AjgBGk4KD0J5dGVzRmllbGRFbnRyeRILCgNrZXkYASABKAUSKgoFdmFsdWUYAiABKAsyGy5nb29nbGUucHJvdG9idWYuQnl0ZXNWYWx1ZToCOAFCOQoYY29tLmdvb2dsZS5wcm90b2J1Zi50ZXN0UAGqAhpHb29nbGUuUHJvdG9idWYuVGVzdFByb3Rvc2IGcHJvdG8z", [file_google_protobuf_any, file_google_protobuf_api, file_google_protobuf_duration, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_source_context, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_type, file_google_protobuf_wrappers]);

/**
 * Describes the message proto2_unittest.TestWellKnownTypes.
 * Use `create(TestWellKnownTypesSchema)` to create a new message.
 */
export const TestWellKnownTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_well_known_types, 0);

/**
 * Describes the message proto2_unittest.RepeatedWellKnownTypes.
 * Use `create(RepeatedWellKnownTypesSchema)` to create a new message.
 */
export const RepeatedWellKnownTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_well_known_types, 1);

/**
 * Describes the message proto2_unittest.OneofWellKnownTypes.
 * Use `create(OneofWellKnownTypesSchema)` to create a new message.
 */
export const OneofWellKnownTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_well_known_types, 2);

/**
 * Describes the message proto2_unittest.MapWellKnownTypes.
 * Use `create(MapWellKnownTypesSchema)` to create a new message.
 */
export const MapWellKnownTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_well_known_types, 3);

