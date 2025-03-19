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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/map_proto2_unittest.proto (package proto2_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In map_test_util.h we do "using namespace unittest = proto2_unittest".

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { ImportEnumForMap } from "./unittest_import_pb.js";
import { file_google_protobuf_unittest_import } from "./unittest_import_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/map_proto2_unittest.proto.
 */
export const file_google_protobuf_map_proto2_unittest: GenFile = /*@__PURE__*/
  fileDesc("Cilnb29nbGUvcHJvdG9idWYvbWFwX3Byb3RvMl91bml0dGVzdC5wcm90bxIPcHJvdG8yX3VuaXR0ZXN0IpEUCgtUZXN0RW51bU1hcBJICg9rbm93bl9tYXBfZmllbGQYZSADKAsyLy5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXAuS25vd25NYXBGaWVsZEVudHJ5EkwKEXVua25vd25fbWFwX2ZpZWxkGGYgAygLMjEucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZEVudHJ5ElgKF3Vua25vd25fbWFwX2ZpZWxkX2ludDY0GMgBIAMoCzI2LnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcC5Vbmtub3duTWFwRmllbGRJbnQ2NEVudHJ5EloKGHVua25vd25fbWFwX2ZpZWxkX3VpbnQ2NBjJASADKAsyNy5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkVWludDY0RW50cnkSWAoXdW5rbm93bl9tYXBfZmllbGRfaW50MzIYygEgAygLMjYucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZEludDMyRW50cnkSWgoYdW5rbm93bl9tYXBfZmllbGRfdWludDMyGMsBIAMoCzI3LnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcC5Vbmtub3duTWFwRmllbGRVaW50MzJFbnRyeRJcChl1bmtub3duX21hcF9maWVsZF9maXhlZDMyGMwBIAMoCzI4LnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcC5Vbmtub3duTWFwRmllbGRGaXhlZDMyRW50cnkSXAoZdW5rbm93bl9tYXBfZmllbGRfZml4ZWQ2NBjNASADKAsyOC5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkRml4ZWQ2NEVudHJ5ElYKFnVua25vd25fbWFwX2ZpZWxkX2Jvb2wYzgEgAygLMjUucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZEJvb2xFbnRyeRJaChh1bmtub3duX21hcF9maWVsZF9zdHJpbmcYzwEgAygLMjcucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZFN0cmluZ0VudHJ5EloKGHVua25vd25fbWFwX2ZpZWxkX3NpbnQzMhjQASADKAsyNy5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkU2ludDMyRW50cnkSWgoYdW5rbm93bl9tYXBfZmllbGRfc2ludDY0GNEBIAMoCzI3LnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcC5Vbmtub3duTWFwRmllbGRTaW50NjRFbnRyeRJeChp1bmtub3duX21hcF9maWVsZF9zZml4ZWQzMhjSASADKAsyOS5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkU2ZpeGVkMzJFbnRyeRJeChp1bmtub3duX21hcF9maWVsZF9zZml4ZWQ2NBjTASADKAsyOS5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkU2ZpeGVkNjRFbnRyeRpUChJLbm93bk1hcEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEi0KBXZhbHVlGAIgASgOMh4ucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGlYKFFVua25vd25NYXBGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRItCgV2YWx1ZRgCIAEoDjIeLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ARpbChlVbmtub3duTWFwRmllbGRJbnQ2NEVudHJ5EgsKA2tleRgBIAEoAxItCgV2YWx1ZRgCIAEoDjIeLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ARpcChpVbmtub3duTWFwRmllbGRVaW50NjRFbnRyeRILCgNrZXkYASABKAQSLQoFdmFsdWUYAiABKA4yHi5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaWwoZVW5rbm93bk1hcEZpZWxkSW50MzJFbnRyeRILCgNrZXkYASABKAUSLQoFdmFsdWUYAiABKA4yHi5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaXAoaVW5rbm93bk1hcEZpZWxkVWludDMyRW50cnkSCwoDa2V5GAEgASgNEi0KBXZhbHVlGAIgASgOMh4ucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl0KG1Vua25vd25NYXBGaWVsZEZpeGVkMzJFbnRyeRILCgNrZXkYASABKAcSLQoFdmFsdWUYAiABKA4yHi5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaXQobVW5rbm93bk1hcEZpZWxkRml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhItCgV2YWx1ZRgCIAEoDjIeLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ARpaChhVbmtub3duTWFwRmllbGRCb29sRW50cnkSCwoDa2V5GAEgASgIEi0KBXZhbHVlGAIgASgOMh4ucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGlwKGlVua25vd25NYXBGaWVsZFN0cmluZ0VudHJ5EgsKA2tleRgBIAEoCRItCgV2YWx1ZRgCIAEoDjIeLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ARpcChpVbmtub3duTWFwRmllbGRTaW50MzJFbnRyeRILCgNrZXkYASABKBESLQoFdmFsdWUYAiABKA4yHi5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaXAoaVW5rbm93bk1hcEZpZWxkU2ludDY0RW50cnkSCwoDa2V5GAEgASgSEi0KBXZhbHVlGAIgASgOMh4ucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl4KHFVua25vd25NYXBGaWVsZFNmaXhlZDMyRW50cnkSCwoDa2V5GAEgASgPEi0KBXZhbHVlGAIgASgOMh4ucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl4KHFVua25vd25NYXBGaWVsZFNmaXhlZDY0RW50cnkSCwoDa2V5GAEgASgQEi0KBXZhbHVlGAIgASgOMh4ucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBIpYWChRUZXN0RW51bU1hcFBsdXNFeHRyYRJRCg9rbm93bl9tYXBfZmllbGQYZSADKAsyOC5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuS25vd25NYXBGaWVsZEVudHJ5ElUKEXVua25vd25fbWFwX2ZpZWxkGGYgAygLMjoucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwUGx1c0V4dHJhLlVua25vd25NYXBGaWVsZEVudHJ5EmEKF3Vua25vd25fbWFwX2ZpZWxkX2ludDY0GMgBIAMoCzI/LnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRJbnQ2NEVudHJ5EmMKGHVua25vd25fbWFwX2ZpZWxkX3VpbnQ2NBjJASADKAsyQC5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkVWludDY0RW50cnkSYQoXdW5rbm93bl9tYXBfZmllbGRfaW50MzIYygEgAygLMj8ucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwUGx1c0V4dHJhLlVua25vd25NYXBGaWVsZEludDMyRW50cnkSYwoYdW5rbm93bl9tYXBfZmllbGRfdWludDMyGMsBIAMoCzJALnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRVaW50MzJFbnRyeRJlChl1bmtub3duX21hcF9maWVsZF9maXhlZDMyGMwBIAMoCzJBLnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRGaXhlZDMyRW50cnkSZQoZdW5rbm93bl9tYXBfZmllbGRfZml4ZWQ2NBjNASADKAsyQS5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkRml4ZWQ2NEVudHJ5El8KFnVua25vd25fbWFwX2ZpZWxkX2Jvb2wYzgEgAygLMj4ucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwUGx1c0V4dHJhLlVua25vd25NYXBGaWVsZEJvb2xFbnRyeRJjChh1bmtub3duX21hcF9maWVsZF9zdHJpbmcYzwEgAygLMkAucHJvdG8yX3VuaXR0ZXN0LlRlc3RFbnVtTWFwUGx1c0V4dHJhLlVua25vd25NYXBGaWVsZFN0cmluZ0VudHJ5EmMKGHVua25vd25fbWFwX2ZpZWxkX3NpbnQzMhjQASADKAsyQC5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkU2ludDMyRW50cnkSYwoYdW5rbm93bl9tYXBfZmllbGRfc2ludDY0GNEBIAMoCzJALnByb3RvMl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRTaW50NjRFbnRyeRJnChp1bmtub3duX21hcF9maWVsZF9zZml4ZWQzMhjSASADKAsyQi5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkU2ZpeGVkMzJFbnRyeRJnChp1bmtub3duX21hcF9maWVsZF9zZml4ZWQ2NBjTASADKAsyQi5wcm90bzJfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkU2ZpeGVkNjRFbnRyeRpdChJLbm93bk1hcEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEjYKBXZhbHVlGAIgASgOMicucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGl8KFFVua25vd25NYXBGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRI2CgV2YWx1ZRgCIAEoDjInLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARpkChlVbmtub3duTWFwRmllbGRJbnQ2NEVudHJ5EgsKA2tleRgBIAEoAxI2CgV2YWx1ZRgCIAEoDjInLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARplChpVbmtub3duTWFwRmllbGRVaW50NjRFbnRyeRILCgNrZXkYASABKAQSNgoFdmFsdWUYAiABKA4yJy5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZAoZVW5rbm93bk1hcEZpZWxkSW50MzJFbnRyeRILCgNrZXkYASABKAUSNgoFdmFsdWUYAiABKA4yJy5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZQoaVW5rbm93bk1hcEZpZWxkVWludDMyRW50cnkSCwoDa2V5GAEgASgNEjYKBXZhbHVlGAIgASgOMicucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGmYKG1Vua25vd25NYXBGaWVsZEZpeGVkMzJFbnRyeRILCgNrZXkYASABKAcSNgoFdmFsdWUYAiABKA4yJy5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZgobVW5rbm93bk1hcEZpZWxkRml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhI2CgV2YWx1ZRgCIAEoDjInLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARpjChhVbmtub3duTWFwRmllbGRCb29sRW50cnkSCwoDa2V5GAEgASgIEjYKBXZhbHVlGAIgASgOMicucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGmUKGlVua25vd25NYXBGaWVsZFN0cmluZ0VudHJ5EgsKA2tleRgBIAEoCRI2CgV2YWx1ZRgCIAEoDjInLnByb3RvMl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARplChpVbmtub3duTWFwRmllbGRTaW50MzJFbnRyeRILCgNrZXkYASABKBESNgoFdmFsdWUYAiABKA4yJy5wcm90bzJfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZQoaVW5rbm93bk1hcEZpZWxkU2ludDY0RW50cnkSCwoDa2V5GAEgASgSEjYKBXZhbHVlGAIgASgOMicucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGmcKHFVua25vd25NYXBGaWVsZFNmaXhlZDMyRW50cnkSCwoDa2V5GAEgASgPEjYKBXZhbHVlGAIgASgOMicucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGmcKHFVua25vd25NYXBGaWVsZFNmaXhlZDY0RW50cnkSCwoDa2V5GAEgASgQEjYKBXZhbHVlGAIgASgOMicucHJvdG8yX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBIsMBChFUZXN0SW1wb3J0RW51bU1hcBJOCg9pbXBvcnRfZW51bV9hbXAYASADKAsyNS5wcm90bzJfdW5pdHRlc3QuVGVzdEltcG9ydEVudW1NYXAuSW1wb3J0RW51bUFtcEVudHJ5Gl4KEkltcG9ydEVudW1BbXBFbnRyeRILCgNrZXkYASABKAUSNwoFdmFsdWUYAiABKA4yKC5wcm90bzJfdW5pdHRlc3RfaW1wb3J0LkltcG9ydEVudW1Gb3JNYXA6AjgBImsKDVRlc3RJbnRJbnRNYXASMAoBbRgBIAMoCzIlLnByb3RvMl91bml0dGVzdC5UZXN0SW50SW50TWFwLk1FbnRyeRooCgZNRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ASKIDQoIVGVzdE1hcHMSNgoHbV9pbnQzMhgBIAMoCzIlLnByb3RvMl91bml0dGVzdC5UZXN0TWFwcy5NSW50MzJFbnRyeRI2CgdtX2ludDY0GAIgAygLMiUucHJvdG8yX3VuaXR0ZXN0LlRlc3RNYXBzLk1JbnQ2NEVudHJ5EjgKCG1fdWludDMyGAMgAygLMiYucHJvdG8yX3VuaXR0ZXN0LlRlc3RNYXBzLk1VaW50MzJFbnRyeRI4CghtX3VpbnQ2NBgEIAMoCzImLnByb3RvMl91bml0dGVzdC5UZXN0TWFwcy5NVWludDY0RW50cnkSOAoIbV9zaW50MzIYBSADKAsyJi5wcm90bzJfdW5pdHRlc3QuVGVzdE1hcHMuTVNpbnQzMkVudHJ5EjgKCG1fc2ludDY0GAYgAygLMiYucHJvdG8yX3VuaXR0ZXN0LlRlc3RNYXBzLk1TaW50NjRFbnRyeRI6CgltX2ZpeGVkMzIYByADKAsyJy5wcm90bzJfdW5pdHRlc3QuVGVzdE1hcHMuTUZpeGVkMzJFbnRyeRI6CgltX2ZpeGVkNjQYCCADKAsyJy5wcm90bzJfdW5pdHRlc3QuVGVzdE1hcHMuTUZpeGVkNjRFbnRyeRI8CgptX3NmaXhlZDMyGAkgAygLMigucHJvdG8yX3VuaXR0ZXN0LlRlc3RNYXBzLk1TZml4ZWQzMkVudHJ5EjwKCm1fc2ZpeGVkNjQYCiADKAsyKC5wcm90bzJfdW5pdHRlc3QuVGVzdE1hcHMuTVNmaXhlZDY0RW50cnkSNAoGbV9ib29sGAsgAygLMiQucHJvdG8yX3VuaXR0ZXN0LlRlc3RNYXBzLk1Cb29sRW50cnkSOAoIbV9zdHJpbmcYDCADKAsyJi5wcm90bzJfdW5pdHRlc3QuVGVzdE1hcHMuTVN0cmluZ0VudHJ5Gk0KC01JbnQzMkVudHJ5EgsKA2tleRgBIAEoBRItCgV2YWx1ZRgCIAEoCzIeLnByb3RvMl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpNCgtNSW50NjRFbnRyeRILCgNrZXkYASABKAMSLQoFdmFsdWUYAiABKAsyHi5wcm90bzJfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEaTgoMTVVpbnQzMkVudHJ5EgsKA2tleRgBIAEoDRItCgV2YWx1ZRgCIAEoCzIeLnByb3RvMl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpOCgxNVWludDY0RW50cnkSCwoDa2V5GAEgASgEEi0KBXZhbHVlGAIgASgLMh4ucHJvdG8yX3VuaXR0ZXN0LlRlc3RJbnRJbnRNYXA6AjgBGk4KDE1TaW50MzJFbnRyeRILCgNrZXkYASABKBESLQoFdmFsdWUYAiABKAsyHi5wcm90bzJfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEaTgoMTVNpbnQ2NEVudHJ5EgsKA2tleRgBIAEoEhItCgV2YWx1ZRgCIAEoCzIeLnByb3RvMl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpPCg1NRml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoBxItCgV2YWx1ZRgCIAEoCzIeLnByb3RvMl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpPCg1NRml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhItCgV2YWx1ZRgCIAEoCzIeLnByb3RvMl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpQCg5NU2ZpeGVkMzJFbnRyeRILCgNrZXkYASABKA8SLQoFdmFsdWUYAiABKAsyHi5wcm90bzJfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEaUAoOTVNmaXhlZDY0RW50cnkSCwoDa2V5GAEgASgQEi0KBXZhbHVlGAIgASgLMh4ucHJvdG8yX3VuaXR0ZXN0LlRlc3RJbnRJbnRNYXA6AjgBGkwKCk1Cb29sRW50cnkSCwoDa2V5GAEgASgIEi0KBXZhbHVlGAIgASgLMh4ucHJvdG8yX3VuaXR0ZXN0LlRlc3RJbnRJbnRNYXA6AjgBGk4KDE1TdHJpbmdFbnRyeRILCgNrZXkYASABKAkSLQoFdmFsdWUYAiABKAsyHi5wcm90bzJfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEiOgoSVGVzdFN1Ym1lc3NhZ2VNYXBzEiQKAW0YASABKAsyGS5wcm90bzJfdW5pdHRlc3QuVGVzdE1hcHMihQIKElRlc3RQcm90bzJCeXRlc01hcBJECgltYXBfYnl0ZXMYASADKAsyMS5wcm90bzJfdW5pdHRlc3QuVGVzdFByb3RvMkJ5dGVzTWFwLk1hcEJ5dGVzRW50cnkSRgoKbWFwX3N0cmluZxgCIAMoCzIyLnByb3RvMl91bml0dGVzdC5UZXN0UHJvdG8yQnl0ZXNNYXAuTWFwU3RyaW5nRW50cnkaLwoNTWFwQnl0ZXNFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAw6AjgBGjAKDk1hcFN0cmluZ0VudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoCToCOAEqWgoNUHJvdG8yTWFwRW51bRIXChNQUk9UTzJfTUFQX0VOVU1fRk9PEAASFwoTUFJPVE8yX01BUF9FTlVNX0JBUhABEhcKE1BST1RPMl9NQVBfRU5VTV9CQVoQAiqGAQoWUHJvdG8yTWFwRW51bVBsdXNFeHRyYRIZChVFX1BST1RPMl9NQVBfRU5VTV9GT08QABIZChVFX1BST1RPMl9NQVBfRU5VTV9CQVIQARIZChVFX1BST1RPMl9NQVBfRU5VTV9CQVoQAhIbChdFX1BST1RPMl9NQVBfRU5VTV9FWFRSQRADQgP4AQE", [file_google_protobuf_unittest_import]);

/**
 * @generated from message proto2_unittest.TestEnumMap
 */
export type TestEnumMap = Message<"proto2_unittest.TestEnumMap"> & {
  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnum> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnum> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnum };

  /**
   * Other maps with all key types to test the unknown entry serialization
   *
   * @generated from field: map<int64, proto2_unittest.Proto2MapEnum> unknown_map_field_int64 = 200;
   */
  unknownMapFieldInt64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<uint64, proto2_unittest.Proto2MapEnum> unknown_map_field_uint64 = 201;
   */
  unknownMapFieldUint64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnum> unknown_map_field_int32 = 202;
   */
  unknownMapFieldInt32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<uint32, proto2_unittest.Proto2MapEnum> unknown_map_field_uint32 = 203;
   */
  unknownMapFieldUint32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<fixed32, proto2_unittest.Proto2MapEnum> unknown_map_field_fixed32 = 204;
   */
  unknownMapFieldFixed32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<fixed64, proto2_unittest.Proto2MapEnum> unknown_map_field_fixed64 = 205;
   */
  unknownMapFieldFixed64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<bool, proto2_unittest.Proto2MapEnum> unknown_map_field_bool = 206;
   */
  unknownMapFieldBool: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<string, proto2_unittest.Proto2MapEnum> unknown_map_field_string = 207;
   */
  unknownMapFieldString: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<sint32, proto2_unittest.Proto2MapEnum> unknown_map_field_sint32 = 208;
   */
  unknownMapFieldSint32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<sint64, proto2_unittest.Proto2MapEnum> unknown_map_field_sint64 = 209;
   */
  unknownMapFieldSint64: { [key: string]: Proto2MapEnum };

  /**
   * @generated from field: map<sfixed32, proto2_unittest.Proto2MapEnum> unknown_map_field_sfixed32 = 210;
   */
  unknownMapFieldSfixed32: { [key: number]: Proto2MapEnum };

  /**
   * @generated from field: map<sfixed64, proto2_unittest.Proto2MapEnum> unknown_map_field_sfixed64 = 211;
   */
  unknownMapFieldSfixed64: { [key: string]: Proto2MapEnum };
};

/**
 * Describes the message proto2_unittest.TestEnumMap.
 * Use `create(TestEnumMapSchema)` to create a new message.
 */
export const TestEnumMapSchema: GenMessage<TestEnumMap> = /*@__PURE__*/
  messageDesc(file_google_protobuf_map_proto2_unittest, 0);

/**
 * @generated from message proto2_unittest.TestEnumMapPlusExtra
 */
export type TestEnumMapPlusExtra = Message<"proto2_unittest.TestEnumMapPlusExtra"> & {
  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnumPlusExtra> known_map_field = 101;
   */
  knownMapField: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field = 102;
   */
  unknownMapField: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * Other maps with all key types to test the unknown entry serialization
   *
   * @generated from field: map<int64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_int64 = 200;
   */
  unknownMapFieldInt64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<uint64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_uint64 = 201;
   */
  unknownMapFieldUint64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<int32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_int32 = 202;
   */
  unknownMapFieldInt32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<uint32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_uint32 = 203;
   */
  unknownMapFieldUint32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<fixed32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_fixed32 = 204;
   */
  unknownMapFieldFixed32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<fixed64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_fixed64 = 205;
   */
  unknownMapFieldFixed64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<bool, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_bool = 206;
   */
  unknownMapFieldBool: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<string, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_string = 207;
   */
  unknownMapFieldString: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sint32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sint32 = 208;
   */
  unknownMapFieldSint32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sint64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sint64 = 209;
   */
  unknownMapFieldSint64: { [key: string]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sfixed32, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sfixed32 = 210;
   */
  unknownMapFieldSfixed32: { [key: number]: Proto2MapEnumPlusExtra };

  /**
   * @generated from field: map<sfixed64, proto2_unittest.Proto2MapEnumPlusExtra> unknown_map_field_sfixed64 = 211;
   */
  unknownMapFieldSfixed64: { [key: string]: Proto2MapEnumPlusExtra };
};

/**
 * Describes the message proto2_unittest.TestEnumMapPlusExtra.
 * Use `create(TestEnumMapPlusExtraSchema)` to create a new message.
 */
export const TestEnumMapPlusExtraSchema: GenMessage<TestEnumMapPlusExtra> = /*@__PURE__*/
  messageDesc(file_google_protobuf_map_proto2_unittest, 1);

/**
 * @generated from message proto2_unittest.TestImportEnumMap
 */
export type TestImportEnumMap = Message<"proto2_unittest.TestImportEnumMap"> & {
  /**
   * @generated from field: map<int32, proto2_unittest_import.ImportEnumForMap> import_enum_amp = 1;
   */
  importEnumAmp: { [key: number]: ImportEnumForMap };
};

/**
 * Describes the message proto2_unittest.TestImportEnumMap.
 * Use `create(TestImportEnumMapSchema)` to create a new message.
 */
export const TestImportEnumMapSchema: GenMessage<TestImportEnumMap> = /*@__PURE__*/
  messageDesc(file_google_protobuf_map_proto2_unittest, 2);

/**
 * @generated from message proto2_unittest.TestIntIntMap
 */
export type TestIntIntMap = Message<"proto2_unittest.TestIntIntMap"> & {
  /**
   * @generated from field: map<int32, int32> m = 1;
   */
  m: { [key: number]: number };
};

/**
 * Describes the message proto2_unittest.TestIntIntMap.
 * Use `create(TestIntIntMapSchema)` to create a new message.
 */
export const TestIntIntMapSchema: GenMessage<TestIntIntMap> = /*@__PURE__*/
  messageDesc(file_google_protobuf_map_proto2_unittest, 3);

/**
 * Test all key types: string, plus the non-floating-point scalars.
 *
 * @generated from message proto2_unittest.TestMaps
 */
export type TestMaps = Message<"proto2_unittest.TestMaps"> & {
  /**
   * @generated from field: map<int32, proto2_unittest.TestIntIntMap> m_int32 = 1;
   */
  mInt32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<int64, proto2_unittest.TestIntIntMap> m_int64 = 2;
   */
  mInt64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<uint32, proto2_unittest.TestIntIntMap> m_uint32 = 3;
   */
  mUint32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<uint64, proto2_unittest.TestIntIntMap> m_uint64 = 4;
   */
  mUint64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<sint32, proto2_unittest.TestIntIntMap> m_sint32 = 5;
   */
  mSint32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<sint64, proto2_unittest.TestIntIntMap> m_sint64 = 6;
   */
  mSint64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<fixed32, proto2_unittest.TestIntIntMap> m_fixed32 = 7;
   */
  mFixed32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<fixed64, proto2_unittest.TestIntIntMap> m_fixed64 = 8;
   */
  mFixed64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<sfixed32, proto2_unittest.TestIntIntMap> m_sfixed32 = 9;
   */
  mSfixed32: { [key: number]: TestIntIntMap };

  /**
   * @generated from field: map<sfixed64, proto2_unittest.TestIntIntMap> m_sfixed64 = 10;
   */
  mSfixed64: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<bool, proto2_unittest.TestIntIntMap> m_bool = 11;
   */
  mBool: { [key: string]: TestIntIntMap };

  /**
   * @generated from field: map<string, proto2_unittest.TestIntIntMap> m_string = 12;
   */
  mString: { [key: string]: TestIntIntMap };
};

/**
 * Describes the message proto2_unittest.TestMaps.
 * Use `create(TestMapsSchema)` to create a new message.
 */
export const TestMapsSchema: GenMessage<TestMaps> = /*@__PURE__*/
  messageDesc(file_google_protobuf_map_proto2_unittest, 4);

/**
 * Test maps in submessages.
 *
 * @generated from message proto2_unittest.TestSubmessageMaps
 */
export type TestSubmessageMaps = Message<"proto2_unittest.TestSubmessageMaps"> & {
  /**
   * @generated from field: optional proto2_unittest.TestMaps m = 1;
   */
  m?: TestMaps;
};

/**
 * Describes the message proto2_unittest.TestSubmessageMaps.
 * Use `create(TestSubmessageMapsSchema)` to create a new message.
 */
export const TestSubmessageMapsSchema: GenMessage<TestSubmessageMaps> = /*@__PURE__*/
  messageDesc(file_google_protobuf_map_proto2_unittest, 5);

/**
 * @generated from message proto2_unittest.TestProto2BytesMap
 */
export type TestProto2BytesMap = Message<"proto2_unittest.TestProto2BytesMap"> & {
  /**
   * @generated from field: map<int32, bytes> map_bytes = 1;
   */
  mapBytes: { [key: number]: Uint8Array };

  /**
   * @generated from field: map<int32, string> map_string = 2;
   */
  mapString: { [key: number]: string };
};

/**
 * Describes the message proto2_unittest.TestProto2BytesMap.
 * Use `create(TestProto2BytesMapSchema)` to create a new message.
 */
export const TestProto2BytesMapSchema: GenMessage<TestProto2BytesMap> = /*@__PURE__*/
  messageDesc(file_google_protobuf_map_proto2_unittest, 6);

/**
 * @generated from enum proto2_unittest.Proto2MapEnum
 */
export enum Proto2MapEnum {
  /**
   * @generated from enum value: PROTO2_MAP_ENUM_FOO = 0;
   */
  FOO = 0,

  /**
   * @generated from enum value: PROTO2_MAP_ENUM_BAR = 1;
   */
  BAR = 1,

  /**
   * @generated from enum value: PROTO2_MAP_ENUM_BAZ = 2;
   */
  BAZ = 2,
}

/**
 * Describes the enum proto2_unittest.Proto2MapEnum.
 */
export const Proto2MapEnumSchema: GenEnum<Proto2MapEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_map_proto2_unittest, 0);

/**
 * @generated from enum proto2_unittest.Proto2MapEnumPlusExtra
 */
export enum Proto2MapEnumPlusExtra {
  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_FOO = 0;
   */
  E_PROTO2_MAP_ENUM_FOO = 0,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_BAR = 1;
   */
  E_PROTO2_MAP_ENUM_BAR = 1,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_BAZ = 2;
   */
  E_PROTO2_MAP_ENUM_BAZ = 2,

  /**
   * @generated from enum value: E_PROTO2_MAP_ENUM_EXTRA = 3;
   */
  E_PROTO2_MAP_ENUM_EXTRA = 3,
}

/**
 * Describes the enum proto2_unittest.Proto2MapEnumPlusExtra.
 */
export const Proto2MapEnumPlusExtraSchema: GenEnum<Proto2MapEnumPlusExtra> = /*@__PURE__*/
  enumDesc(file_google_protobuf_map_proto2_unittest, 1);

