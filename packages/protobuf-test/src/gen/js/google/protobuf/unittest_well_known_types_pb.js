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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_well_known_types.proto (package protobuf_unittest, syntax proto3)
/* eslint-disable */

import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { fileDesc_google_protobuf_any, fileDesc_google_protobuf_api, fileDesc_google_protobuf_duration, fileDesc_google_protobuf_empty, fileDesc_google_protobuf_field_mask, fileDesc_google_protobuf_source_context, fileDesc_google_protobuf_struct, fileDesc_google_protobuf_timestamp, fileDesc_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_type } from "./type_pb.js";

/**
 * Describes the file google/protobuf/unittest_well_known_types.proto.
 */
export const fileDesc_google_protobuf_unittest_well_known_types = /*@__PURE__*/
  fileDesc("Ci9nb29nbGUvcHJvdG9idWYvdW5pdHRlc3Rfd2VsbF9rbm93bl90eXBlcy5wcm90bxIRcHJvdG9idWZfdW5pdHRlc3QivgcKElRlc3RXZWxsS25vd25UeXBlcxInCglhbnlfZmllbGQYASABKAsyFC5nb29nbGUucHJvdG9idWYuQW55EicKCWFwaV9maWVsZBgCIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BcGkSMQoOZHVyYXRpb25fZmllbGQYAyABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb24SKwoLZW1wdHlfZmllbGQYBCABKAsyFi5nb29nbGUucHJvdG9idWYuRW1wdHkSNAoQZmllbGRfbWFza19maWVsZBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2sSPAoUc291cmNlX2NvbnRleHRfZmllbGQYBiABKAsyHi5nb29nbGUucHJvdG9idWYuU291cmNlQ29udGV4dBItCgxzdHJ1Y3RfZmllbGQYByABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0EjMKD3RpbWVzdGFtcF9maWVsZBgIIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASKQoKdHlwZV9maWVsZBgJIAEoCzIVLmdvb2dsZS5wcm90b2J1Zi5UeXBlEjIKDGRvdWJsZV9maWVsZBgKIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZRIwCgtmbG9hdF9maWVsZBgLIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5GbG9hdFZhbHVlEjAKC2ludDY0X2ZpZWxkGAwgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkludDY0VmFsdWUSMgoMdWludDY0X2ZpZWxkGA0gASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQ2NFZhbHVlEjAKC2ludDMyX2ZpZWxkGA4gASgLMhsuZ29vZ2xlLnByb3RvYnVmLkludDMyVmFsdWUSMgoMdWludDMyX2ZpZWxkGA8gASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEi4KCmJvb2xfZmllbGQYECABKAsyGi5nb29nbGUucHJvdG9idWYuQm9vbFZhbHVlEjIKDHN0cmluZ19maWVsZBgRIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5TdHJpbmdWYWx1ZRIwCgtieXRlc19maWVsZBgSIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5CeXRlc1ZhbHVlEisKC3ZhbHVlX2ZpZWxkGBMgASgLMhYuZ29vZ2xlLnByb3RvYnVmLlZhbHVlIpUHChZSZXBlYXRlZFdlbGxLbm93blR5cGVzEicKCWFueV9maWVsZBgBIAMoCzIULmdvb2dsZS5wcm90b2J1Zi5BbnkSJwoJYXBpX2ZpZWxkGAIgAygLMhQuZ29vZ2xlLnByb3RvYnVmLkFwaRIxCg5kdXJhdGlvbl9maWVsZBgDIAMoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbhIrCgtlbXB0eV9maWVsZBgEIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRI0ChBmaWVsZF9tYXNrX2ZpZWxkGAUgAygLMhouZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzaxI8ChRzb3VyY2VfY29udGV4dF9maWVsZBgGIAMoCzIeLmdvb2dsZS5wcm90b2J1Zi5Tb3VyY2VDb250ZXh0Ei0KDHN0cnVjdF9maWVsZBgHIAMoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSMwoPdGltZXN0YW1wX2ZpZWxkGAggAygLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIpCgp0eXBlX2ZpZWxkGAkgAygLMhUuZ29vZ2xlLnByb3RvYnVmLlR5cGUSMgoMZG91YmxlX2ZpZWxkGAogAygLMhwuZ29vZ2xlLnByb3RvYnVmLkRvdWJsZVZhbHVlEjAKC2Zsb2F0X2ZpZWxkGAsgAygLMhsuZ29vZ2xlLnByb3RvYnVmLkZsb2F0VmFsdWUSMAoLaW50NjRfZmllbGQYDCADKAsyGy5nb29nbGUucHJvdG9idWYuSW50NjRWYWx1ZRIyCgx1aW50NjRfZmllbGQYDSADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDY0VmFsdWUSMAoLaW50MzJfZmllbGQYDiADKAsyGy5nb29nbGUucHJvdG9idWYuSW50MzJWYWx1ZRIyCgx1aW50MzJfZmllbGQYDyADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSLgoKYm9vbF9maWVsZBgQIAMoCzIaLmdvb2dsZS5wcm90b2J1Zi5Cb29sVmFsdWUSMgoMc3RyaW5nX2ZpZWxkGBEgAygLMhwuZ29vZ2xlLnByb3RvYnVmLlN0cmluZ1ZhbHVlEjAKC2J5dGVzX2ZpZWxkGBIgAygLMhsuZ29vZ2xlLnByb3RvYnVmLkJ5dGVzVmFsdWUixQcKE09uZW9mV2VsbEtub3duVHlwZXMSKQoJYW55X2ZpZWxkGAEgASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueUgAEikKCWFwaV9maWVsZBgCIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BcGlIABIzCg5kdXJhdGlvbl9maWVsZBgDIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkgAEi0KC2VtcHR5X2ZpZWxkGAQgASgLMhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5SAASNgoQZmllbGRfbWFza19maWVsZBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2tIABI+ChRzb3VyY2VfY29udGV4dF9maWVsZBgGIAEoCzIeLmdvb2dsZS5wcm90b2J1Zi5Tb3VyY2VDb250ZXh0SAASLwoMc3RydWN0X2ZpZWxkGAcgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdEgAEjUKD3RpbWVzdGFtcF9maWVsZBgIIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBIABIrCgp0eXBlX2ZpZWxkGAkgASgLMhUuZ29vZ2xlLnByb3RvYnVmLlR5cGVIABI0Cgxkb3VibGVfZmllbGQYCiABKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWVIABIyCgtmbG9hdF9maWVsZBgLIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5GbG9hdFZhbHVlSAASMgoLaW50NjRfZmllbGQYDCABKAsyGy5nb29nbGUucHJvdG9idWYuSW50NjRWYWx1ZUgAEjQKDHVpbnQ2NF9maWVsZBgNIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50NjRWYWx1ZUgAEjIKC2ludDMyX2ZpZWxkGA4gASgLMhsuZ29vZ2xlLnByb3RvYnVmLkludDMyVmFsdWVIABI0Cgx1aW50MzJfZmllbGQYDyABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWVIABIwCgpib29sX2ZpZWxkGBAgASgLMhouZ29vZ2xlLnByb3RvYnVmLkJvb2xWYWx1ZUgAEjQKDHN0cmluZ19maWVsZBgRIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5TdHJpbmdWYWx1ZUgAEjIKC2J5dGVzX2ZpZWxkGBIgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkJ5dGVzVmFsdWVIAEINCgtvbmVvZl9maWVsZCKWFgoRTWFwV2VsbEtub3duVHlwZXMSRQoJYW55X2ZpZWxkGAEgAygLMjIucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuQW55RmllbGRFbnRyeRJFCglhcGlfZmllbGQYAiADKAsyMi5wcm90b2J1Zl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5BcGlGaWVsZEVudHJ5Ek8KDmR1cmF0aW9uX2ZpZWxkGAMgAygLMjcucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuRHVyYXRpb25GaWVsZEVudHJ5EkkKC2VtcHR5X2ZpZWxkGAQgAygLMjQucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuRW1wdHlGaWVsZEVudHJ5ElIKEGZpZWxkX21hc2tfZmllbGQYBSADKAsyOC5wcm90b2J1Zl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5GaWVsZE1hc2tGaWVsZEVudHJ5EloKFHNvdXJjZV9jb250ZXh0X2ZpZWxkGAYgAygLMjwucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuU291cmNlQ29udGV4dEZpZWxkRW50cnkSSwoMc3RydWN0X2ZpZWxkGAcgAygLMjUucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuU3RydWN0RmllbGRFbnRyeRJRCg90aW1lc3RhbXBfZmllbGQYCCADKAsyOC5wcm90b2J1Zl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5UaW1lc3RhbXBGaWVsZEVudHJ5EkcKCnR5cGVfZmllbGQYCSADKAsyMy5wcm90b2J1Zl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5UeXBlRmllbGRFbnRyeRJLCgxkb3VibGVfZmllbGQYCiADKAsyNS5wcm90b2J1Zl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5Eb3VibGVGaWVsZEVudHJ5EkkKC2Zsb2F0X2ZpZWxkGAsgAygLMjQucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuRmxvYXRGaWVsZEVudHJ5EkkKC2ludDY0X2ZpZWxkGAwgAygLMjQucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuSW50NjRGaWVsZEVudHJ5EksKDHVpbnQ2NF9maWVsZBgNIAMoCzI1LnByb3RvYnVmX3VuaXR0ZXN0Lk1hcFdlbGxLbm93blR5cGVzLlVpbnQ2NEZpZWxkRW50cnkSSQoLaW50MzJfZmllbGQYDiADKAsyNC5wcm90b2J1Zl91bml0dGVzdC5NYXBXZWxsS25vd25UeXBlcy5JbnQzMkZpZWxkRW50cnkSSwoMdWludDMyX2ZpZWxkGA8gAygLMjUucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuVWludDMyRmllbGRFbnRyeRJHCgpib29sX2ZpZWxkGBAgAygLMjMucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuQm9vbEZpZWxkRW50cnkSSwoMc3RyaW5nX2ZpZWxkGBEgAygLMjUucHJvdG9idWZfdW5pdHRlc3QuTWFwV2VsbEtub3duVHlwZXMuU3RyaW5nRmllbGRFbnRyeRJJCgtieXRlc19maWVsZBgSIAMoCzI0LnByb3RvYnVmX3VuaXR0ZXN0Lk1hcFdlbGxLbm93blR5cGVzLkJ5dGVzRmllbGRFbnRyeRpFCg1BbnlGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIjCgV2YWx1ZRgCIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5Bbnk6AjgBGkUKDUFwaUZpZWxkRW50cnkSCwoDa2V5GAEgASgFEiMKBXZhbHVlGAIgASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFwaToCOAEaTwoSRHVyYXRpb25GaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIoCgV2YWx1ZRgCIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbjoCOAEaSQoPRW1wdHlGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eToCOAEaUQoTRmllbGRNYXNrRmllbGRFbnRyeRILCgNrZXkYASABKAUSKQoFdmFsdWUYAiABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrOgI4ARpZChdTb3VyY2VDb250ZXh0RmllbGRFbnRyeRILCgNrZXkYASABKAUSLQoFdmFsdWUYAiABKAsyHi5nb29nbGUucHJvdG9idWYuU291cmNlQ29udGV4dDoCOAEaSwoQU3RydWN0RmllbGRFbnRyeRILCgNrZXkYASABKAUSJgoFdmFsdWUYAiABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0OgI4ARpRChNUaW1lc3RhbXBGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIpCgV2YWx1ZRgCIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXA6AjgBGkcKDlR5cGVGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIkCgV2YWx1ZRgCIAEoCzIVLmdvb2dsZS5wcm90b2J1Zi5UeXBlOgI4ARpQChBEb3VibGVGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIrCgV2YWx1ZRgCIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZToCOAEaTgoPRmxvYXRGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIqCgV2YWx1ZRgCIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5GbG9hdFZhbHVlOgI4ARpOCg9JbnQ2NEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEioKBXZhbHVlGAIgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkludDY0VmFsdWU6AjgBGlAKEFVpbnQ2NEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEisKBXZhbHVlGAIgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQ2NFZhbHVlOgI4ARpOCg9JbnQzMkZpZWxkRW50cnkSCwoDa2V5GAEgASgFEioKBXZhbHVlGAIgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkludDMyVmFsdWU6AjgBGlAKEFVpbnQzMkZpZWxkRW50cnkSCwoDa2V5GAEgASgFEisKBXZhbHVlGAIgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlOgI4ARpMCg5Cb29sRmllbGRFbnRyeRILCgNrZXkYASABKAUSKQoFdmFsdWUYAiABKAsyGi5nb29nbGUucHJvdG9idWYuQm9vbFZhbHVlOgI4ARpQChBTdHJpbmdGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIrCgV2YWx1ZRgCIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5TdHJpbmdWYWx1ZToCOAEaTgoPQnl0ZXNGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIqCgV2YWx1ZRgCIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5CeXRlc1ZhbHVlOgI4AUI5Chhjb20uZ29vZ2xlLnByb3RvYnVmLnRlc3RQAaoCGkdvb2dsZS5Qcm90b2J1Zi5UZXN0UHJvdG9zYgZwcm90bzM", [fileDesc_google_protobuf_any, fileDesc_google_protobuf_api, fileDesc_google_protobuf_duration, fileDesc_google_protobuf_empty, fileDesc_google_protobuf_field_mask, fileDesc_google_protobuf_source_context, fileDesc_google_protobuf_struct, fileDesc_google_protobuf_timestamp, fileDesc_google_protobuf_type, fileDesc_google_protobuf_wrappers]);

/**
 * Describes the message protobuf_unittest.TestWellKnownTypes.
 * Use `create(TestWellKnownTypesDesc)` to create a new message.
 */
export const TestWellKnownTypesDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_well_known_types, 0);

/**
 * Describes the message protobuf_unittest.RepeatedWellKnownTypes.
 * Use `create(RepeatedWellKnownTypesDesc)` to create a new message.
 */
export const RepeatedWellKnownTypesDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_well_known_types, 1);

/**
 * Describes the message protobuf_unittest.OneofWellKnownTypes.
 * Use `create(OneofWellKnownTypesDesc)` to create a new message.
 */
export const OneofWellKnownTypesDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_well_known_types, 2);

/**
 * Describes the message protobuf_unittest.MapWellKnownTypes.
 * Use `create(MapWellKnownTypesDesc)` to create a new message.
 */
export const MapWellKnownTypesDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_unittest_well_known_types, 3);

