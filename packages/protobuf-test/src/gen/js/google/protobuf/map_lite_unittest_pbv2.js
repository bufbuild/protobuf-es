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

// @generated by protoc-gen-es-next v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/map_lite_unittest.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/next/codegenv1";
import { fileDesc_google_protobuf_unittest_lite } from "./unittest_lite_pbv2.js";

export const fileDesc_google_protobuf_map_lite_unittest = fileDesc("Cidnb29nbGUvcHJvdG9idWYvbWFwX2xpdGVfdW5pdHRlc3QucHJvdG8SEXByb3RvYnVmX3VuaXR0ZXN0ItcTCgtUZXN0TWFwTGl0ZRJKCg9tYXBfaW50MzJfaW50MzIYASADKAsyMS5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwTGl0ZS5NYXBJbnQzMkludDMyRW50cnkSSgoPbWFwX2ludDY0X2ludDY0GAIgAygLMjEucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1hcExpdGUuTWFwSW50NjRJbnQ2NEVudHJ5Ek4KEW1hcF91aW50MzJfdWludDMyGAMgAygLMjMucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1hcExpdGUuTWFwVWludDMyVWludDMyRW50cnkSTgoRbWFwX3VpbnQ2NF91aW50NjQYBCADKAsyMy5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwTGl0ZS5NYXBVaW50NjRVaW50NjRFbnRyeRJOChFtYXBfc2ludDMyX3NpbnQzMhgFIAMoCzIzLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBMaXRlLk1hcFNpbnQzMlNpbnQzMkVudHJ5Ek4KEW1hcF9zaW50NjRfc2ludDY0GAYgAygLMjMucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1hcExpdGUuTWFwU2ludDY0U2ludDY0RW50cnkSUgoTbWFwX2ZpeGVkMzJfZml4ZWQzMhgHIAMoCzI1LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBMaXRlLk1hcEZpeGVkMzJGaXhlZDMyRW50cnkSUgoTbWFwX2ZpeGVkNjRfZml4ZWQ2NBgIIAMoCzI1LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBMaXRlLk1hcEZpeGVkNjRGaXhlZDY0RW50cnkSVgoVbWFwX3NmaXhlZDMyX3NmaXhlZDMyGAkgAygLMjcucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1hcExpdGUuTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5ElYKFW1hcF9zZml4ZWQ2NF9zZml4ZWQ2NBgKIAMoCzI3LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBMaXRlLk1hcFNmaXhlZDY0U2ZpeGVkNjRFbnRyeRJKCg9tYXBfaW50MzJfZmxvYXQYCyADKAsyMS5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwTGl0ZS5NYXBJbnQzMkZsb2F0RW50cnkSTAoQbWFwX2ludDMyX2RvdWJsZRgMIAMoCzIyLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBMaXRlLk1hcEludDMyRG91YmxlRW50cnkSRgoNbWFwX2Jvb2xfYm9vbBgNIAMoCzIvLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNYXBMaXRlLk1hcEJvb2xCb29sRW50cnkSTgoRbWFwX3N0cmluZ19zdHJpbmcYDiADKAsyMy5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwTGl0ZS5NYXBTdHJpbmdTdHJpbmdFbnRyeRJKCg9tYXBfaW50MzJfYnl0ZXMYDyADKAsyMS5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwTGl0ZS5NYXBJbnQzMkJ5dGVzRW50cnkSSAoObWFwX2ludDMyX2VudW0YECADKAsyMC5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWFwTGl0ZS5NYXBJbnQzMkVudW1FbnRyeRJdChltYXBfaW50MzJfZm9yZWlnbl9tZXNzYWdlGBEgAygLMjoucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1hcExpdGUuTWFwSW50MzJGb3JlaWduTWVzc2FnZUVudHJ5Ej4KCHRlYm9yaW5nGBIgAygLMiwucHJvdG9idWZfdW5pdHRlc3QuVGVzdE1hcExpdGUuVGVib3JpbmdFbnRyeRo0ChJNYXBJbnQzMkludDMyRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ARo0ChJNYXBJbnQ2NEludDY0RW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARo2ChRNYXBVaW50MzJVaW50MzJFbnRyeRILCgNrZXkYASABKA0SDQoFdmFsdWUYAiABKA06AjgBGjYKFE1hcFVpbnQ2NFVpbnQ2NEVudHJ5EgsKA2tleRgBIAEoBBINCgV2YWx1ZRgCIAEoBDoCOAEaNgoUTWFwU2ludDMyU2ludDMyRW50cnkSCwoDa2V5GAEgASgREg0KBXZhbHVlGAIgASgROgI4ARo2ChRNYXBTaW50NjRTaW50NjRFbnRyeRILCgNrZXkYASABKBISDQoFdmFsdWUYAiABKBI6AjgBGjgKFk1hcEZpeGVkMzJGaXhlZDMyRW50cnkSCwoDa2V5GAEgASgHEg0KBXZhbHVlGAIgASgHOgI4ARo4ChZNYXBGaXhlZDY0Rml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhINCgV2YWx1ZRgCIAEoBjoCOAEaOgoYTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoDxINCgV2YWx1ZRgCIAEoDzoCOAEaOgoYTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoEBINCgV2YWx1ZRgCIAEoEDoCOAEaNAoSTWFwSW50MzJGbG9hdEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoAjoCOAEaNQoTTWFwSW50MzJEb3VibGVFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAE6AjgBGjIKEE1hcEJvb2xCb29sRW50cnkSCwoDa2V5GAEgASgIEg0KBXZhbHVlGAIgASgIOgI4ARo2ChRNYXBTdHJpbmdTdHJpbmdFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjQKEk1hcEludDMyQnl0ZXNFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAw6AjgBGlMKEU1hcEludDMyRW51bUVudHJ5EgsKA2tleRgBIAEoBRItCgV2YWx1ZRgCIAEoDjIeLnByb3RvYnVmX3VuaXR0ZXN0Lk1hcEVudW1MaXRlOgI4ARpkChtNYXBJbnQzMkZvcmVpZ25NZXNzYWdlRW50cnkSCwoDa2V5GAEgASgFEjQKBXZhbHVlGAIgASgLMiUucHJvdG9idWZfdW5pdHRlc3QuRm9yZWlnbk1lc3NhZ2VMaXRlOgI4ARovCg1UZWJvcmluZ0VudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoBToCOAEixRMKEFRlc3RBcmVuYU1hcExpdGUSTwoPbWFwX2ludDMyX2ludDMyGAEgAygLMjYucHJvdG9idWZfdW5pdHRlc3QuVGVzdEFyZW5hTWFwTGl0ZS5NYXBJbnQzMkludDMyRW50cnkSTwoPbWFwX2ludDY0X2ludDY0GAIgAygLMjYucHJvdG9idWZfdW5pdHRlc3QuVGVzdEFyZW5hTWFwTGl0ZS5NYXBJbnQ2NEludDY0RW50cnkSUwoRbWFwX3VpbnQzMl91aW50MzIYAyADKAsyOC5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcFVpbnQzMlVpbnQzMkVudHJ5ElMKEW1hcF91aW50NjRfdWludDY0GAQgAygLMjgucHJvdG9idWZfdW5pdHRlc3QuVGVzdEFyZW5hTWFwTGl0ZS5NYXBVaW50NjRVaW50NjRFbnRyeRJTChFtYXBfc2ludDMyX3NpbnQzMhgFIAMoCzI4LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RBcmVuYU1hcExpdGUuTWFwU2ludDMyU2ludDMyRW50cnkSUwoRbWFwX3NpbnQ2NF9zaW50NjQYBiADKAsyOC5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcFNpbnQ2NFNpbnQ2NEVudHJ5ElcKE21hcF9maXhlZDMyX2ZpeGVkMzIYByADKAsyOi5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcEZpeGVkMzJGaXhlZDMyRW50cnkSVwoTbWFwX2ZpeGVkNjRfZml4ZWQ2NBgIIAMoCzI6LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RBcmVuYU1hcExpdGUuTWFwRml4ZWQ2NEZpeGVkNjRFbnRyeRJbChVtYXBfc2ZpeGVkMzJfc2ZpeGVkMzIYCSADKAsyPC5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcFNmaXhlZDMyU2ZpeGVkMzJFbnRyeRJbChVtYXBfc2ZpeGVkNjRfc2ZpeGVkNjQYCiADKAsyPC5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcFNmaXhlZDY0U2ZpeGVkNjRFbnRyeRJPCg9tYXBfaW50MzJfZmxvYXQYCyADKAsyNi5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcEludDMyRmxvYXRFbnRyeRJRChBtYXBfaW50MzJfZG91YmxlGAwgAygLMjcucHJvdG9idWZfdW5pdHRlc3QuVGVzdEFyZW5hTWFwTGl0ZS5NYXBJbnQzMkRvdWJsZUVudHJ5EksKDW1hcF9ib29sX2Jvb2wYDSADKAsyNC5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcEJvb2xCb29sRW50cnkSUwoRbWFwX3N0cmluZ19zdHJpbmcYDiADKAsyOC5wcm90b2J1Zl91bml0dGVzdC5UZXN0QXJlbmFNYXBMaXRlLk1hcFN0cmluZ1N0cmluZ0VudHJ5Ek8KD21hcF9pbnQzMl9ieXRlcxgPIAMoCzI2LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RBcmVuYU1hcExpdGUuTWFwSW50MzJCeXRlc0VudHJ5Ek0KDm1hcF9pbnQzMl9lbnVtGBAgAygLMjUucHJvdG9idWZfdW5pdHRlc3QuVGVzdEFyZW5hTWFwTGl0ZS5NYXBJbnQzMkVudW1FbnRyeRJiChltYXBfaW50MzJfZm9yZWlnbl9tZXNzYWdlGBEgAygLMj8ucHJvdG9idWZfdW5pdHRlc3QuVGVzdEFyZW5hTWFwTGl0ZS5NYXBJbnQzMkZvcmVpZ25NZXNzYWdlRW50cnkaNAoSTWFwSW50MzJJbnQzMkVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoBToCOAEaNAoSTWFwSW50NjRJbnQ2NEVudHJ5EgsKA2tleRgBIAEoAxINCgV2YWx1ZRgCIAEoAzoCOAEaNgoUTWFwVWludDMyVWludDMyRW50cnkSCwoDa2V5GAEgASgNEg0KBXZhbHVlGAIgASgNOgI4ARo2ChRNYXBVaW50NjRVaW50NjRFbnRyeRILCgNrZXkYASABKAQSDQoFdmFsdWUYAiABKAQ6AjgBGjYKFE1hcFNpbnQzMlNpbnQzMkVudHJ5EgsKA2tleRgBIAEoERINCgV2YWx1ZRgCIAEoEToCOAEaNgoUTWFwU2ludDY0U2ludDY0RW50cnkSCwoDa2V5GAEgASgSEg0KBXZhbHVlGAIgASgSOgI4ARo4ChZNYXBGaXhlZDMyRml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoBxINCgV2YWx1ZRgCIAEoBzoCOAEaOAoWTWFwRml4ZWQ2NEZpeGVkNjRFbnRyeRILCgNrZXkYASABKAYSDQoFdmFsdWUYAiABKAY6AjgBGjoKGE1hcFNmaXhlZDMyU2ZpeGVkMzJFbnRyeRILCgNrZXkYASABKA8SDQoFdmFsdWUYAiABKA86AjgBGjoKGE1hcFNmaXhlZDY0U2ZpeGVkNjRFbnRyeRILCgNrZXkYASABKBASDQoFdmFsdWUYAiABKBA6AjgBGjQKEk1hcEludDMyRmxvYXRFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAI6AjgBGjUKE01hcEludDMyRG91YmxlRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgBOgI4ARoyChBNYXBCb29sQm9vbEVudHJ5EgsKA2tleRgBIAEoCBINCgV2YWx1ZRgCIAEoCDoCOAEaNgoUTWFwU3RyaW5nU3RyaW5nRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARo0ChJNYXBJbnQzMkJ5dGVzRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgMOgI4ARpTChFNYXBJbnQzMkVudW1FbnRyeRILCgNrZXkYASABKAUSLQoFdmFsdWUYAiABKA4yHi5wcm90b2J1Zl91bml0dGVzdC5NYXBFbnVtTGl0ZToCOAEaaQobTWFwSW50MzJGb3JlaWduTWVzc2FnZUVudHJ5EgsKA2tleRgBIAEoBRI5CgV2YWx1ZRgCIAEoCzIqLnByb3RvYnVmX3VuaXR0ZXN0LkZvcmVpZ25NZXNzYWdlQXJlbmFMaXRlOgI4ASLCAQoaVGVzdFJlcXVpcmVkTWVzc2FnZU1hcExpdGUSTgoJbWFwX2ZpZWxkGAEgAygLMjsucHJvdG9idWZfdW5pdHRlc3QuVGVzdFJlcXVpcmVkTWVzc2FnZU1hcExpdGUuTWFwRmllbGRFbnRyeRpUCg1NYXBGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIyCgV2YWx1ZRgCIAEoCzIjLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RSZXF1aXJlZExpdGU6AjgBIu8CCg9UZXN0RW51bU1hcExpdGUSTgoPa25vd25fbWFwX2ZpZWxkGGUgAygLMjUucHJvdG9idWZfdW5pdHRlc3QuVGVzdEVudW1NYXBMaXRlLktub3duTWFwRmllbGRFbnRyeRJSChF1bmtub3duX21hcF9maWVsZBhmIAMoCzI3LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwTGl0ZS5Vbmtub3duTWFwRmllbGRFbnRyeRpaChJLbm93bk1hcEZpZWxkRW50cnkSCwoDa2V5GAEgASgFEjMKBXZhbHVlGAIgASgOMiQucHJvdG9idWZfdW5pdHRlc3QuUHJvdG8yTWFwRW51bUxpdGU6AjgBGlwKFFVua25vd25NYXBGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIzCgV2YWx1ZRgCIAEoDjIkLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1MaXRlOgI4ASKcAwoYVGVzdEVudW1NYXBQbHVzRXh0cmFMaXRlElcKD2tub3duX21hcF9maWVsZBhlIAMoCzI+LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RFbnVtTWFwUGx1c0V4dHJhTGl0ZS5Lbm93bk1hcEZpZWxkRW50cnkSWwoRdW5rbm93bl9tYXBfZmllbGQYZiADKAsyQC5wcm90b2J1Zl91bml0dGVzdC5UZXN0RW51bU1hcFBsdXNFeHRyYUxpdGUuVW5rbm93bk1hcEZpZWxkRW50cnkaYwoSS25vd25NYXBGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRI8CgV2YWx1ZRgCIAEoDjItLnByb3RvYnVmX3VuaXR0ZXN0LlByb3RvMk1hcEVudW1QbHVzRXh0cmFMaXRlOgI4ARplChRVbmtub3duTWFwRmllbGRFbnRyeRILCgNrZXkYASABKAUSPAoFdmFsdWUYAiABKA4yLS5wcm90b2J1Zl91bml0dGVzdC5Qcm90bzJNYXBFbnVtUGx1c0V4dHJhTGl0ZToCOAEiyAEKElRlc3RNZXNzYWdlTWFwTGl0ZRJVChFtYXBfaW50MzJfbWVzc2FnZRgBIAMoCzI6LnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RNZXNzYWdlTWFwTGl0ZS5NYXBJbnQzMk1lc3NhZ2VFbnRyeRpbChRNYXBJbnQzMk1lc3NhZ2VFbnRyeRILCgNrZXkYASABKAUSMgoFdmFsdWUYAiABKAsyIy5wcm90b2J1Zl91bml0dGVzdC5UZXN0QWxsVHlwZXNMaXRlOgI4ASKbAQoQVGVzdFJlcXVpcmVkTGl0ZRIJCgFhGAEgAigFEgkKAWIYAiACKAUSCQoBYxgDIAIoBTJmCgZzaW5nbGUSKC5wcm90b2J1Zl91bml0dGVzdC5UZXN0QWxsRXh0ZW5zaW9uc0xpdGUY6AcgASgLMiMucHJvdG9idWZfdW5pdHRlc3QuVGVzdFJlcXVpcmVkTGl0ZVIGc2luZ2xlIiQKF0ZvcmVpZ25NZXNzYWdlQXJlbmFMaXRlEgkKAWMYASABKAUqbQoRUHJvdG8yTWFwRW51bUxpdGUSHAoYUFJPVE8yX01BUF9FTlVNX0ZPT19MSVRFEAASHAoYUFJPVE8yX01BUF9FTlVNX0JBUl9MSVRFEAESHAoYUFJPVE8yX01BUF9FTlVNX0JBWl9MSVRFEAIqngEKGlByb3RvMk1hcEVudW1QbHVzRXh0cmFMaXRlEh4KGkVfUFJPVE8yX01BUF9FTlVNX0ZPT19MSVRFEAASHgoaRV9QUk9UTzJfTUFQX0VOVU1fQkFSX0xJVEUQARIeChpFX1BST1RPMl9NQVBfRU5VTV9CQVpfTElURRACEiAKHEVfUFJPVE8yX01BUF9FTlVNX0VYVFJBX0xJVEUQAypSCgtNYXBFbnVtTGl0ZRIVChFNQVBfRU5VTV9GT09fTElURRAAEhUKEU1BUF9FTlVNX0JBUl9MSVRFEAESFQoRTUFQX0VOVU1fQkFaX0xJVEUQAkIFSAP4AQE", [fileDesc_google_protobuf_unittest_lite]);

// Describes the message protobuf_unittest.TestMapLite. Use `create(TestMapLiteDesc)` to create a new TestMapLite.
export const TestMapLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 0);

// Describes the message protobuf_unittest.TestArenaMapLite. Use `create(TestArenaMapLiteDesc)` to create a new TestArenaMapLite.
export const TestArenaMapLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 1);

// Describes the message protobuf_unittest.TestRequiredMessageMapLite. Use `create(TestRequiredMessageMapLiteDesc)` to create a new TestRequiredMessageMapLite.
export const TestRequiredMessageMapLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 2);

// Describes the message protobuf_unittest.TestEnumMapLite. Use `create(TestEnumMapLiteDesc)` to create a new TestEnumMapLite.
export const TestEnumMapLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 3);

// Describes the message protobuf_unittest.TestEnumMapPlusExtraLite. Use `create(TestEnumMapPlusExtraLiteDesc)` to create a new TestEnumMapPlusExtraLite.
export const TestEnumMapPlusExtraLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 4);

// Describes the message protobuf_unittest.TestMessageMapLite. Use `create(TestMessageMapLiteDesc)` to create a new TestMessageMapLite.
export const TestMessageMapLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 5);

// Describes the message protobuf_unittest.TestRequiredLite. Use `create(TestRequiredLiteDesc)` to create a new TestRequiredLite.
export const TestRequiredLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 6);

/**
 * @generated from extension: optional protobuf_unittest.TestRequiredLite single = 1000;
 */
export const TestRequiredLite_single = extDesc(fileDesc_google_protobuf_map_lite_unittest, 6, 0);

// Describes the message protobuf_unittest.ForeignMessageArenaLite. Use `create(ForeignMessageArenaLiteDesc)` to create a new ForeignMessageArenaLite.
export const ForeignMessageArenaLiteDesc = messageDesc(fileDesc_google_protobuf_map_lite_unittest, 7);

// Describes the enum protobuf_unittest.Proto2MapEnumLite.
export const Proto2MapEnumLiteDesc = enumDesc(fileDesc_google_protobuf_map_lite_unittest, 0);

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumLite
 */
export const Proto2MapEnumLite = tsEnum(Proto2MapEnumLiteDesc);

// Describes the enum protobuf_unittest.Proto2MapEnumPlusExtraLite.
export const Proto2MapEnumPlusExtraLiteDesc = enumDesc(fileDesc_google_protobuf_map_lite_unittest, 1);

/**
 * @generated from enum protobuf_unittest.Proto2MapEnumPlusExtraLite
 */
export const Proto2MapEnumPlusExtraLite = tsEnum(Proto2MapEnumPlusExtraLiteDesc);

// Describes the enum protobuf_unittest.MapEnumLite.
export const MapEnumLiteDesc = enumDesc(fileDesc_google_protobuf_map_lite_unittest, 2);

/**
 * @generated from enum protobuf_unittest.MapEnumLite
 */
export const MapEnumLite = tsEnum(MapEnumLiteDesc);

