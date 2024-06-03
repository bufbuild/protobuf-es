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

// @generated by protoc-gen-es v2.0.0-alpha.3 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/map_proto2_unittest.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In map_test_util.h we do "using namespace unittest = protobuf_unittest".

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { fileDesc_google_protobuf_unittest_import } from "./unittest_import_pb.js";

/**
 * Describes the file google/protobuf/map_proto2_unittest.proto.
 */
export const fileDesc_google_protobuf_map_proto2_unittest = /*@__PURE__*/
  fileDesc("Cilnb29nbGUvcHJvdG9idWYvbWFwX3Byb3RvMl91bml0dGVzdC5wcm90bxIRcHJvdG9idWZfdW5pdHRlc3QiyRQKC1Rlc3RFbnVtTWFwEkoKD2tub3duX21hcF9maWVsZBhlIAMoCzIxLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLktub3duTWFwRmllbGRFbnRyeRJOChF1bmtub3duX21hcF9maWVsZBhmIAMoCzIzLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZEVudHJ5EloKF3Vua25vd25fbWFwX2ZpZWxkX2ludDY0GMgBIAMoCzI4LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZEludDY0RW50cnkSXAoYdW5rbm93bl9tYXBfZmllbGRfdWludDY0GMkBIAMoCzI5LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZFVpbnQ2NEVudHJ5EloKF3Vua25vd25fbWFwX2ZpZWxkX2ludDMyGMoBIAMoCzI4LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZEludDMyRW50cnkSXAoYdW5rbm93bl9tYXBfZmllbGRfdWludDMyGMsBIAMoCzI5LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZFVpbnQzMkVudHJ5El4KGXVua25vd25fbWFwX2ZpZWxkX2ZpeGVkMzIYzAEgAygLMjoucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkRml4ZWQzMkVudHJ5El4KGXVua25vd25fbWFwX2ZpZWxkX2ZpeGVkNjQYzQEgAygLMjoucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkRml4ZWQ2NEVudHJ5ElgKFnVua25vd25fbWFwX2ZpZWxkX2Jvb2wYzgEgAygLMjcucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkQm9vbEVudHJ5ElwKGHVua25vd25fbWFwX2ZpZWxkX3N0cmluZxjPASADKAsyOS5wcm90b2J1Zl91bml0dGVzdC5UZXN0RW51bU1hcC5Vbmtub3duTWFwRmllbGRTdHJpbmdFbnRyeRJcChh1bmtub3duX21hcF9maWVsZF9zaW50MzIY0AEgAygLMjkucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkU2ludDMyRW50cnkSXAoYdW5rbm93bl9tYXBfZmllbGRfc2ludDY0GNEBIAMoCzI5LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZFNpbnQ2NEVudHJ5EmAKGnVua25vd25fbWFwX2ZpZWxkX3NmaXhlZDMyGNIBIAMoCzI7LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwLlVua25vd25NYXBGaWVsZFNmaXhlZDMyRW50cnkSYAoadW5rbm93bl9tYXBfZmllbGRfc2ZpeGVkNjQY0wEgAygLMjsucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXAuVW5rbm93bk1hcEZpZWxkU2ZpeGVkNjRFbnRyeRpWChJLbm93bk1hcEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEi8KBXZhbHVlGAIgASgOMiAucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaWAoUVW5rbm93bk1hcEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEi8KBXZhbHVlGAIgASgOMiAucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaXQoZVW5rbm93bk1hcEZpZWxkSW50NjRFbnRyeRILCgNrZXkYASABKAMSLwoFdmFsdWUYAiABKA4yIC5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ARpeChpVbmtub3duTWFwRmllbGRVaW50NjRFbnRyeRILCgNrZXkYASABKAQSLwoFdmFsdWUYAiABKA4yIC5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ARpdChlVbmtub3duTWFwRmllbGRJbnQzMkVudHJ5EgsKA2tleRgBIAEoBRIvCgV2YWx1ZRgCIAEoDjIgLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl4KGlVua25vd25NYXBGaWVsZFVpbnQzMkVudHJ5EgsKA2tleRgBIAEoDRIvCgV2YWx1ZRgCIAEoDjIgLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl8KG1Vua25vd25NYXBGaWVsZEZpeGVkMzJFbnRyeRILCgNrZXkYASABKAcSLwoFdmFsdWUYAiABKA4yIC5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ARpfChtVbmtub3duTWFwRmllbGRGaXhlZDY0RW50cnkSCwoDa2V5GAEgASgGEi8KBXZhbHVlGAIgASgOMiAucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaXAoYVW5rbm93bk1hcEZpZWxkQm9vbEVudHJ5EgsKA2tleRgBIAEoCBIvCgV2YWx1ZRgCIAEoDjIgLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl4KGlVua25vd25NYXBGaWVsZFN0cmluZ0VudHJ5EgsKA2tleRgBIAEoCRIvCgV2YWx1ZRgCIAEoDjIgLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl4KGlVua25vd25NYXBGaWVsZFNpbnQzMkVudHJ5EgsKA2tleRgBIAEoERIvCgV2YWx1ZRgCIAEoDjIgLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGl4KGlVua25vd25NYXBGaWVsZFNpbnQ2NEVudHJ5EgsKA2tleRgBIAEoEhIvCgV2YWx1ZRgCIAEoDjIgLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW06AjgBGmAKHFVua25vd25NYXBGaWVsZFNmaXhlZDMyRW50cnkSCwoDa2V5GAEgASgPEi8KBXZhbHVlGAIgASgOMiAucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bToCOAEaYAocVW5rbm93bk1hcEZpZWxkU2ZpeGVkNjRFbnRyeRILCgNrZXkYASABKBASLwoFdmFsdWUYAiABKA4yIC5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtOgI4ASLOFgoUVGVzdEVudW1NYXBQbHVzRXh0cmESUwoPa25vd25fbWFwX2ZpZWxkGGUgAygLMjoucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuS25vd25NYXBGaWVsZEVudHJ5ElcKEXVua25vd25fbWFwX2ZpZWxkGGYgAygLMjwucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkRW50cnkSYwoXdW5rbm93bl9tYXBfZmllbGRfaW50NjQYyAEgAygLMkEucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkSW50NjRFbnRyeRJlChh1bmtub3duX21hcF9maWVsZF91aW50NjQYyQEgAygLMkIucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkVWludDY0RW50cnkSYwoXdW5rbm93bl9tYXBfZmllbGRfaW50MzIYygEgAygLMkEucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkSW50MzJFbnRyeRJlChh1bmtub3duX21hcF9maWVsZF91aW50MzIYywEgAygLMkIucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkVWludDMyRW50cnkSZwoZdW5rbm93bl9tYXBfZmllbGRfZml4ZWQzMhjMASADKAsyQy5wcm90b2J1Zl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRGaXhlZDMyRW50cnkSZwoZdW5rbm93bl9tYXBfZmllbGRfZml4ZWQ2NBjNASADKAsyQy5wcm90b2J1Zl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRGaXhlZDY0RW50cnkSYQoWdW5rbm93bl9tYXBfZmllbGRfYm9vbBjOASADKAsyQC5wcm90b2J1Zl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRCb29sRW50cnkSZQoYdW5rbm93bl9tYXBfZmllbGRfc3RyaW5nGM8BIAMoCzJCLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwUGx1c0V4dHJhLlVua25vd25NYXBGaWVsZFN0cmluZ0VudHJ5EmUKGHVua25vd25fbWFwX2ZpZWxkX3NpbnQzMhjQASADKAsyQi5wcm90b2J1Zl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRTaW50MzJFbnRyeRJlChh1bmtub3duX21hcF9maWVsZF9zaW50NjQY0QEgAygLMkIucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkU2ludDY0RW50cnkSaQoadW5rbm93bl9tYXBfZmllbGRfc2ZpeGVkMzIY0gEgAygLMkQucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBQbHVzRXh0cmEuVW5rbm93bk1hcEZpZWxkU2ZpeGVkMzJFbnRyeRJpChp1bmtub3duX21hcF9maWVsZF9zZml4ZWQ2NBjTASADKAsyRC5wcm90b2J1Zl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYS5Vbmtub3duTWFwRmllbGRTZml4ZWQ2NEVudHJ5Gl8KEktub3duTWFwRmllbGRFbnRyeRILCgNrZXkYASABKAUSOAoFdmFsdWUYAiABKA4yKS5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARphChRVbmtub3duTWFwRmllbGRFbnRyeRILCgNrZXkYASABKAUSOAoFdmFsdWUYAiABKA4yKS5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARpmChlVbmtub3duTWFwRmllbGRJbnQ2NEVudHJ5EgsKA2tleRgBIAEoAxI4CgV2YWx1ZRgCIAEoDjIpLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGmcKGlVua25vd25NYXBGaWVsZFVpbnQ2NEVudHJ5EgsKA2tleRgBIAEoBBI4CgV2YWx1ZRgCIAEoDjIpLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGmYKGVVua25vd25NYXBGaWVsZEludDMyRW50cnkSCwoDa2V5GAEgASgFEjgKBXZhbHVlGAIgASgOMikucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZwoaVW5rbm93bk1hcEZpZWxkVWludDMyRW50cnkSCwoDa2V5GAEgASgNEjgKBXZhbHVlGAIgASgOMikucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaaAobVW5rbm93bk1hcEZpZWxkRml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoBxI4CgV2YWx1ZRgCIAEoDjIpLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBGmgKG1Vua25vd25NYXBGaWVsZEZpeGVkNjRFbnRyeRILCgNrZXkYASABKAYSOAoFdmFsdWUYAiABKA4yKS5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARplChhVbmtub3duTWFwRmllbGRCb29sRW50cnkSCwoDa2V5GAEgASgIEjgKBXZhbHVlGAIgASgOMikucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZwoaVW5rbm93bk1hcEZpZWxkU3RyaW5nRW50cnkSCwoDa2V5GAEgASgJEjgKBXZhbHVlGAIgASgOMikucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZwoaVW5rbm93bk1hcEZpZWxkU2ludDMyRW50cnkSCwoDa2V5GAEgASgREjgKBXZhbHVlGAIgASgOMikucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaZwoaVW5rbm93bk1hcEZpZWxkU2ludDY0RW50cnkSCwoDa2V5GAEgASgSEjgKBXZhbHVlGAIgASgOMikucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bVBsdXNFeHRyYToCOAEaaQocVW5rbm93bk1hcEZpZWxkU2ZpeGVkMzJFbnRyeRILCgNrZXkYASABKA8SOAoFdmFsdWUYAiABKA4yKS5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhOgI4ARppChxVbmtub3duTWFwRmllbGRTZml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoEBI4CgV2YWx1ZRgCIAEoDjIpLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmE6AjgBIscBChFUZXN0SW1wb3J0RW51bU1hcBJQCg9pbXBvcnRfZW51bV9hbXAYASADKAsyNy5wcm90b2J1Zl91bml0dGVzdC5UZXN0SW1wb3J0RW51bU1hcC5JbXBvcnRFbnVtQW1wRW50cnkaYAoSSW1wb3J0RW51bUFtcEVudHJ5EgsKA2tleRgBIAEoBRI5CgV2YWx1ZRgCIAEoDjIqLnByb3RvYnVmX3VuaXR0ZXN0X2ltcG9ydC5JbXBvcnRFbnVtRm9yTWFwOgI4ASJtCg1UZXN0SW50SW50TWFwEjIKAW0YASADKAsyJy5wcm90b2J1Zl91bml0dGVzdC5UZXN0SW50SW50TWFwLk1FbnRyeRooCgZNRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ASK4DQoIVGVzdE1hcHMSOAoHbV9pbnQzMhgBIAMoCzInLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBzLk1JbnQzMkVudHJ5EjgKB21faW50NjQYAiADKAsyJy5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwcy5NSW50NjRFbnRyeRI6CghtX3VpbnQzMhgDIAMoCzIoLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBzLk1VaW50MzJFbnRyeRI6CghtX3VpbnQ2NBgEIAMoCzIoLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBzLk1VaW50NjRFbnRyeRI6CghtX3NpbnQzMhgFIAMoCzIoLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBzLk1TaW50MzJFbnRyeRI6CghtX3NpbnQ2NBgGIAMoCzIoLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBzLk1TaW50NjRFbnRyeRI8CgltX2ZpeGVkMzIYByADKAsyKS5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwcy5NRml4ZWQzMkVudHJ5EjwKCW1fZml4ZWQ2NBgIIAMoCzIpLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBzLk1GaXhlZDY0RW50cnkSPgoKbV9zZml4ZWQzMhgJIAMoCzIqLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBzLk1TZml4ZWQzMkVudHJ5Ej4KCm1fc2ZpeGVkNjQYCiADKAsyKi5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwcy5NU2ZpeGVkNjRFbnRyeRI2CgZtX2Jvb2wYCyADKAsyJi5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwcy5NQm9vbEVudHJ5EjoKCG1fc3RyaW5nGAwgAygLMigucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1hcHMuTVN0cmluZ0VudHJ5Gk8KC01JbnQzMkVudHJ5EgsKA2tleRgBIAEoBRIvCgV2YWx1ZRgCIAEoCzIgLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RJbnRJbnRNYXA6AjgBGk8KC01JbnQ2NEVudHJ5EgsKA2tleRgBIAEoAxIvCgV2YWx1ZRgCIAEoCzIgLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RJbnRJbnRNYXA6AjgBGlAKDE1VaW50MzJFbnRyeRILCgNrZXkYASABKA0SLwoFdmFsdWUYAiABKAsyIC5wcm90b2J1Zl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpQCgxNVWludDY0RW50cnkSCwoDa2V5GAEgASgEEi8KBXZhbHVlGAIgASgLMiAucHJvdG9idWZfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEaUAoMTVNpbnQzMkVudHJ5EgsKA2tleRgBIAEoERIvCgV2YWx1ZRgCIAEoCzIgLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RJbnRJbnRNYXA6AjgBGlAKDE1TaW50NjRFbnRyeRILCgNrZXkYASABKBISLwoFdmFsdWUYAiABKAsyIC5wcm90b2J1Zl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpRCg1NRml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoBxIvCgV2YWx1ZRgCIAEoCzIgLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RJbnRJbnRNYXA6AjgBGlEKDU1GaXhlZDY0RW50cnkSCwoDa2V5GAEgASgGEi8KBXZhbHVlGAIgASgLMiAucHJvdG9idWZfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEaUgoOTVNmaXhlZDMyRW50cnkSCwoDa2V5GAEgASgPEi8KBXZhbHVlGAIgASgLMiAucHJvdG9idWZfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEaUgoOTVNmaXhlZDY0RW50cnkSCwoDa2V5GAEgASgQEi8KBXZhbHVlGAIgASgLMiAucHJvdG9idWZfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEaTgoKTUJvb2xFbnRyeRILCgNrZXkYASABKAgSLwoFdmFsdWUYAiABKAsyIC5wcm90b2J1Zl91bml0dGVzdC5UZXN0SW50SW50TWFwOgI4ARpQCgxNU3RyaW5nRW50cnkSCwoDa2V5GAEgASgJEi8KBXZhbHVlGAIgASgLMiAucHJvdG9idWZfdW5pdHRlc3QuVGVzdEludEludE1hcDoCOAEiPAoSVGVzdFN1Ym1lc3NhZ2VNYXBzEiYKAW0YASABKAsyGy5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwcyKJAgoSVGVzdFByb3RvMkJ5dGVzTWFwEkYKCW1hcF9ieXRlcxgBIAMoCzIzLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RQcm90bzJCeXRlc01hcC5NYXBCeXRlc0VudHJ5EkgKCm1hcF9zdHJpbmcYAiADKAsyNC5wcm90b2J1Zl91bml0dGVzdC5UZXN0UHJvdG8yQnl0ZXNNYXAuTWFwU3RyaW5nRW50cnkaLwoNTWFwQnl0ZXNFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAw6AjgBGjAKDk1hcFN0cmluZ0VudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoCToCOAEqWgoNUHJvdG8yTWFwRW51bRIXChNQUk9UTzJfTUFQX0VOVU1fRk9PEAASFwoTUFJPVE8yX01BUF9FTlVNX0JBUhABEhcKE1BST1RPMl9NQVBfRU5VTV9CQVoQAiqGAQoWUHJvdG8yTWFwRW51bVBsdXNFeHRyYRIZChVFX1BST1RPMl9NQVBfRU5VTV9GT08QABIZChVFX1BST1RPMl9NQVBfRU5VTV9CQVIQARIZChVFX1BST1RPMl9NQVBfRU5VTV9CQVoQAhIbChdFX1BST1RPMl9NQVBfRU5VTV9FWFRSQRADQgP4AQE", [fileDesc_google_protobuf_unittest_import]);

/**
 * Describes the message protobuf_unittest.TestEnumMap.
 * Use `create(TestEnumMapDesc)` to create a new message.
 */
export const TestEnumMapDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_map_proto2_unittest, 0);

/**
 * Describes the message protobuf_unittest.TestEnumMapPlusExtra.
 * Use `create(TestEnumMapPlusExtraDesc)` to create a new message.
 */
export const TestEnumMapPlusExtraDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_map_proto2_unittest, 1);

/**
 * Describes the message protobuf_unittest.TestImportEnumMap.
 * Use `create(TestImportEnumMapDesc)` to create a new message.
 */
export const TestImportEnumMapDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_map_proto2_unittest, 2);

/**
 * Describes the message protobuf_unittest.TestIntIntMap.
 * Use `create(TestIntIntMapDesc)` to create a new message.
 */
export const TestIntIntMapDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_map_proto2_unittest, 3);

/**
 * Describes the message protobuf_unittest.TestMaps.
 * Use `create(TestMapsDesc)` to create a new message.
 */
export const TestMapsDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_map_proto2_unittest, 4);

/**
 * Describes the message protobuf_unittest.TestSubmessageMaps.
 * Use `create(TestSubmessageMapsDesc)` to create a new message.
 */
export const TestSubmessageMapsDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_map_proto2_unittest, 5);

/**
 * Describes the message protobuf_unittest.TestProto2BytesMap.
 * Use `create(TestProto2BytesMapDesc)` to create a new message.
 */
export const TestProto2BytesMapDesc = /*@__PURE__*/
  messageDesc(fileDesc_google_protobuf_map_proto2_unittest, 6);

/**
 * Describes the enum protobuf_unittest.Proto2MapEnum.
 */
export const Proto2MapEnumDesc = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_map_proto2_unittest, 0);

/**
 * @generated from enum protobuf_unittest.Proto2MapEnum
 */
export const Proto2MapEnum = /*@__PURE__*/
  tsEnum(Proto2MapEnumDesc);

/**
 * Describes the enum protobuf_unittest.Proto2MapEnumPlusExtra.
 */
export const Proto2MapEnumPlusExtraDesc = /*@__PURE__*/
  enumDesc(fileDesc_google_protobuf_map_proto2_unittest, 1);

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumPlusExtra
 */
export const Proto2MapEnumPlusExtra = /*@__PURE__*/
  tsEnum(Proto2MapEnumPlusExtraDesc);

