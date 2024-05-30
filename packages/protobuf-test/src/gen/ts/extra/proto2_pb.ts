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

// @generated by protoc-gen-es v2.0.0-alpha.2 with parameter "ts_nocheck=false,target=ts,import_extension=.js"
// @generated from file extra/proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import type { GenDescEnum, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { UInt32Value, UInt32ValueJson } from "@bufbuild/protobuf/wkt";
import { fileDesc_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/proto2.proto.
 */
export const fileDesc_extra_proto2: GenDescFile = /*@__PURE__*/
  fileDesc("ChJleHRyYS9wcm90bzIucHJvdG8SBHNwZWMioiYKDVByb3RvMk1lc3NhZ2USHQoVcmVxdWlyZWRfc3RyaW5nX2ZpZWxkGAEgAigJEhwKFHJlcXVpcmVkX2J5dGVzX2ZpZWxkGAIgAigMEhwKFHJlcXVpcmVkX2ludDMyX2ZpZWxkGAMgAigFEhwKFHJlcXVpcmVkX2ludDY0X2ZpZWxkGAQgAigDEioKHnJlcXVpcmVkX2ludDY0X2pzX251bWJlcl9maWVsZBhnIAIoA0ICMAISKgoecmVxdWlyZWRfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGYgAigDQgIwARIcChRyZXF1aXJlZF9mbG9hdF9maWVsZBgFIAIoAhIbChNyZXF1aXJlZF9ib29sX2ZpZWxkGAYgAigIEi0KE3JlcXVpcmVkX2VudW1fZmllbGQYByACKA4yEC5zcGVjLlByb3RvMkVudW0SMwoWcmVxdWlyZWRfbWVzc2FnZV9maWVsZBgIIAIoCzITLnNwZWMuUHJvdG8yTWVzc2FnZRI4Cg1yZXF1aXJlZGdyb3VwGAkgAigKMiEuc3BlYy5Qcm90bzJNZXNzYWdlLlJlcXVpcmVkR3JvdXASRAodcmVxdWlyZWRfd3JhcHBlZF91aW50MzJfZmllbGQYyQEgAigLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEjIKHXJlcXVpcmVkX2RlZmF1bHRfc3RyaW5nX2ZpZWxkGAogAigJOgtoZWxsbyAiICovIBJLChxyZXF1aXJlZF9kZWZhdWx0X2J5dGVzX2ZpZWxkGAsgAigMOiVcMDAweFxceFwieFwnQUFBQUFBXDAxMFwwMTRcblxyXHRcMDEzEikKHHJlcXVpcmVkX2RlZmF1bHRfaW50MzJfZmllbGQYDCACKAU6AzEyOBIqChxyZXF1aXJlZF9kZWZhdWx0X2ludDY0X2ZpZWxkGA0gAigDOgQtMjU2EjgKJnJlcXVpcmVkX2RlZmF1bHRfaW50NjRfanNfbnVtYmVyX2ZpZWxkGG4gAigDOgQtMjU2QgIwAhI4CiZyZXF1aXJlZF9kZWZhdWx0X2ludDY0X2pzX3N0cmluZ19maWVsZBhxIAIoAzoELTI1NkICMAESLQoccmVxdWlyZWRfZGVmYXVsdF9mbG9hdF9maWVsZBgOIAIoAjoHLTUxMi4xMxIpChtyZXF1aXJlZF9kZWZhdWx0X2Jvb2xfZmllbGQYDyACKAg6BHRydWUSRgobcmVxdWlyZWRfZGVmYXVsdF9lbnVtX2ZpZWxkGBAgAigOMhAuc3BlYy5Qcm90bzJFbnVtOg9QUk9UTzJfRU5VTV9ZRVMSOwoecmVxdWlyZWRfZGVmYXVsdF9tZXNzYWdlX2ZpZWxkGBEgAigLMhMuc3BlYy5Qcm90bzJNZXNzYWdlEkYKFHJlcXVpcmVkZGVmYXVsdGdyb3VwGBIgAigKMiguc3BlYy5Qcm90bzJNZXNzYWdlLlJlcXVpcmVkRGVmYXVsdEdyb3VwEkwKJXJlcXVpcmVkX2RlZmF1bHRfd3JhcHBlZF91aW50MzJfZmllbGQYygEgAigLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEh0KFW9wdGlvbmFsX3N0cmluZ19maWVsZBgTIAEoCRIcChRvcHRpb25hbF9ieXRlc19maWVsZBgUIAEoDBIcChRvcHRpb25hbF9pbnQzMl9maWVsZBgVIAEoBRIcChRvcHRpb25hbF9pbnQ2NF9maWVsZBgWIAEoAxIqCh5vcHRpb25hbF9pbnQ2NF9qc19udW1iZXJfZmllbGQYaiABKANCAjACEioKHm9wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZBhpIAEoA0ICMAESHAoUb3B0aW9uYWxfZmxvYXRfZmllbGQYFyABKAISGwoTb3B0aW9uYWxfYm9vbF9maWVsZBgYIAEoCBItChNvcHRpb25hbF9lbnVtX2ZpZWxkGBkgASgOMhAuc3BlYy5Qcm90bzJFbnVtEjMKFm9wdGlvbmFsX21lc3NhZ2VfZmllbGQYGiABKAsyEy5zcGVjLlByb3RvMk1lc3NhZ2USOAoNb3B0aW9uYWxncm91cBgbIAEoCjIhLnNwZWMuUHJvdG8yTWVzc2FnZS5PcHRpb25hbEdyb3VwEkQKHW9wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkGM8BIAIoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRIyCh1vcHRpb25hbF9kZWZhdWx0X3N0cmluZ19maWVsZBgcIAIoCToLaGVsbG8gIiAqLyASSwocb3B0aW9uYWxfZGVmYXVsdF9ieXRlc19maWVsZBgdIAIoDDolXDAwMHhcXHhcInhcJ0FBQUFBQVwwMTBcMDE0XG5cclx0XDAxMxIpChxvcHRpb25hbF9kZWZhdWx0X2ludDMyX2ZpZWxkGB4gAigFOgMxMjgSKgocb3B0aW9uYWxfZGVmYXVsdF9pbnQ2NF9maWVsZBgfIAIoAzoELTI1NhI4CiZvcHRpb25hbF9kZWZhdWx0X2ludDY0X2pzX251bWJlcl9maWVsZBh4IAEoAzoELTI1NkICMAISOAomb3B0aW9uYWxfZGVmYXVsdF9pbnQ2NF9qc19zdHJpbmdfZmllbGQYeSABKAM6BC0yNTZCAjABEi0KHG9wdGlvbmFsX2RlZmF1bHRfZmxvYXRfZmllbGQYICACKAI6By01MTIuMTMSKQobb3B0aW9uYWxfZGVmYXVsdF9ib29sX2ZpZWxkGCEgAigIOgR0cnVlEkYKG29wdGlvbmFsX2RlZmF1bHRfZW51bV9maWVsZBgiIAIoDjIQLnNwZWMuUHJvdG8yRW51bToPUFJPVE8yX0VOVU1fWUVTEjsKHm9wdGlvbmFsX2RlZmF1bHRfbWVzc2FnZV9maWVsZBgjIAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZRJGChRvcHRpb25hbGRlZmF1bHRncm91cBgkIAEoCjIoLnNwZWMuUHJvdG8yTWVzc2FnZS5PcHRpb25hbERlZmF1bHRHcm91cBJMCiVvcHRpb25hbF9kZWZhdWx0X3dyYXBwZWRfdWludDMyX2ZpZWxkGMsBIAIoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRIdChVyZXBlYXRlZF9zdHJpbmdfZmllbGQYJSADKAkSHAoUcmVwZWF0ZWRfYnl0ZXNfZmllbGQYJiADKAwSHAoUcmVwZWF0ZWRfaW50MzJfZmllbGQYJyADKAUSHAoUcmVwZWF0ZWRfaW50NjRfZmllbGQYKCADKAMSKgoecmVwZWF0ZWRfaW50NjRfanNfbnVtYmVyX2ZpZWxkGG0gAygDQgIwAhIqCh5yZXBlYXRlZF9pbnQ2NF9qc19zdHJpbmdfZmllbGQYbCADKANCAjABEhwKFHJlcGVhdGVkX2Zsb2F0X2ZpZWxkGCkgAygCEhsKE3JlcGVhdGVkX2Jvb2xfZmllbGQYKiADKAgSLQoTcmVwZWF0ZWRfZW51bV9maWVsZBgrIAMoDjIQLnNwZWMuUHJvdG8yRW51bRIzChZyZXBlYXRlZF9tZXNzYWdlX2ZpZWxkGCwgAygLMhMuc3BlYy5Qcm90bzJNZXNzYWdlEjgKDXJlcGVhdGVkZ3JvdXAYLSADKAoyIS5zcGVjLlByb3RvMk1lc3NhZ2UuUmVwZWF0ZWRHcm91cBJECh1yZXBlYXRlZF93cmFwcGVkX3VpbnQzMl9maWVsZBjMASADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSHwoTcGFja2VkX2RvdWJsZV9maWVsZBguIAMoAUICEAESHwoTcGFja2VkX3VpbnQzMl9maWVsZBgvIAMoDUICEAESHwoTcGFja2VkX3VpbnQ2NF9maWVsZBgwIAMoBEICEAESIQoVdW5wYWNrZWRfZG91YmxlX2ZpZWxkGDEgAygBQgIQABIhChV1bnBhY2tlZF91aW50MzJfZmllbGQYMiADKA1CAhAAEiEKFXVucGFja2VkX3VpbnQ2NF9maWVsZBgzIAMoBEICEAASHAoSb25lb2Zfc3RyaW5nX2ZpZWxkGDQgASgJSAASGwoRb25lb2ZfYnl0ZXNfZmllbGQYNSABKAxIABIbChFvbmVvZl9pbnQzMl9maWVsZBg2IAEoBUgAEhsKEW9uZW9mX2ludDY0X2ZpZWxkGDcgASgDSAASKQobb25lb2ZfaW50NjRfanNfbnVtYmVyX2ZpZWxkGHAgASgDQgIwAkgAEikKG29uZW9mX2ludDY0X2pzX3N0cmluZ19maWVsZBhvIAEoA0ICMAFIABIbChFvbmVvZl9mbG9hdF9maWVsZBg4IAEoAkgAEhoKEG9uZW9mX2Jvb2xfZmllbGQYOSABKAhIABIsChBvbmVvZl9lbnVtX2ZpZWxkGDogASgOMhAuc3BlYy5Qcm90bzJFbnVtSAASMgoTb25lb2ZfbWVzc2FnZV9maWVsZBg7IAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZUgAEjQKCm9uZW9mZ3JvdXAYPCABKAoyHi5zcGVjLlByb3RvMk1lc3NhZ2UuT25lb2ZHcm91cEgAEkMKGm9uZW9mX3dyYXBwZWRfdWludDMyX2ZpZWxkGM0BIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZUgAEk4KF21hcF9zdHJpbmdfc3RyaW5nX2ZpZWxkGEYgAygLMi0uc3BlYy5Qcm90bzJNZXNzYWdlLk1hcFN0cmluZ1N0cmluZ0ZpZWxkRW50cnkSSgoVbWFwX2ludDMyX2ludDMyX2ZpZWxkGEcgAygLMisuc3BlYy5Qcm90bzJNZXNzYWdlLk1hcEludDMySW50MzJGaWVsZEVudHJ5EkYKE21hcF9ib29sX2Jvb2xfZmllbGQYSCADKAsyKS5zcGVjLlByb3RvMk1lc3NhZ2UuTWFwQm9vbEJvb2xGaWVsZEVudHJ5EkoKFW1hcF9pbnQ2NF9pbnQ2NF9maWVsZBhJIAMoCzIrLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQ2NEludDY0RmllbGRFbnRyeRJIChRtYXBfaW50MzJfZW51bV9maWVsZBhKIAMoCzIqLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQzMkVudW1GaWVsZEVudHJ5Ek4KF21hcF9pbnQzMl9tZXNzYWdlX2ZpZWxkGEsgAygLMi0uc3BlYy5Qcm90bzJNZXNzYWdlLk1hcEludDMyTWVzc2FnZUZpZWxkRW50cnkSXAoebWFwX2ludDMyX3dyYXBwZWRfdWludDMyX2ZpZWxkGNEBIAMoCzIzLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQzMldyYXBwZWRVaW50MzJGaWVsZEVudHJ5GiQKDVJlcXVpcmVkR3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaKwoUUmVxdWlyZWREZWZhdWx0R3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaJAoNT3B0aW9uYWxHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBRorChRPcHRpb25hbERlZmF1bHRHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBRokCg1SZXBlYXRlZEdyb3VwEhMKC2ludDMyX2ZpZWxkGAEgASgFGiEKCk9uZW9mR3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaOwoZTWFwU3RyaW5nU3RyaW5nRmllbGRFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjkKF01hcEludDMySW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoBToCOAEaNwoVTWFwQm9vbEJvb2xGaWVsZEVudHJ5EgsKA2tleRgBIAEoCBINCgV2YWx1ZRgCIAEoCDoCOAEaOQoXTWFwSW50NjRJbnQ2NEZpZWxkRW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARpSChZNYXBJbnQzMkVudW1GaWVsZEVudHJ5EgsKA2tleRgBIAEoBRInCgV2YWx1ZRgCIAEoDjIYLnNwZWMuUHJvdG8yRW51bVdpdGhaZXJvOgI4ARpQChlNYXBJbnQzMk1lc3NhZ2VGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIiCgV2YWx1ZRgCIAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZToCOAEaXwofTWFwSW50MzJXcmFwcGVkVWludDMyRmllbGRFbnRyeRILCgNrZXkYASABKAUSKwoFdmFsdWUYAiABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWU6AjgBQggKBmVpdGhlcio1CgpQcm90bzJFbnVtEhMKD1BST1RPMl9FTlVNX1lFUxABEhIKDlBST1RPMl9FTlVNX05PEAIqUwoSUHJvdG8yRW51bVdpdGhaZXJvEh4KGlBST1RPMl9FTlVNX1dJVEhfWkVST19aRVJPEAASHQoZUFJPVE8yX0VOVU1fV0lUSF9aRVJPX09ORRABQiFaH2dpdGh1Yi5jb20vYnVmYnVpbGQvcHJvdG9idWYtZXM", [fileDesc_google_protobuf_wrappers]);

/**
 * Note: We do not exhaust all field types
 *
 * @generated from message spec.Proto2Message
 */
export type Proto2Message = Message<"spec.Proto2Message"> & {
  /**
   * @generated from field: required string required_string_field = 1;
   */
  requiredStringField: string;

  /**
   * @generated from field: required bytes required_bytes_field = 2;
   */
  requiredBytesField: Uint8Array;

  /**
   * @generated from field: required int32 required_int32_field = 3;
   */
  requiredInt32Field: number;

  /**
   * @generated from field: required int64 required_int64_field = 4;
   */
  requiredInt64Field: bigint;

  /**
   * @generated from field: required int64 required_int64_js_number_field = 103 [jstype = JS_NUMBER];
   */
  requiredInt64JsNumberField: bigint;

  /**
   * @generated from field: required int64 required_int64_js_string_field = 102 [jstype = JS_STRING];
   */
  requiredInt64JsStringField: string;

  /**
   * @generated from field: required float required_float_field = 5;
   */
  requiredFloatField: number;

  /**
   * @generated from field: required bool required_bool_field = 6;
   */
  requiredBoolField: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_enum_field = 7;
   */
  requiredEnumField: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2Message required_message_field = 8;
   */
  requiredMessageField?: Proto2Message;

  /**
   * @generated from field: required spec.Proto2Message.RequiredGroup requiredgroup = 9;
   */
  requiredgroup?: Proto2Message_RequiredGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_wrapped_uint32_field = 201;
   */
  requiredWrappedUint32Field?: number;

  /**
   * @generated from field: required string required_default_string_field = 10 [default = "hello \" *\/ "];
   */
  requiredDefaultStringField: string;

  /**
   * @generated from field: required bytes required_default_bytes_field = 11 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  requiredDefaultBytesField: Uint8Array;

  /**
   * @generated from field: required int32 required_default_int32_field = 12 [default = 128];
   */
  requiredDefaultInt32Field: number;

  /**
   * @generated from field: required int64 required_default_int64_field = 13 [default = -256];
   */
  requiredDefaultInt64Field: bigint;

  /**
   * @generated from field: required int64 required_default_int64_js_number_field = 110 [default = -256, jstype = JS_NUMBER];
   */
  requiredDefaultInt64JsNumberField: bigint;

  /**
   * @generated from field: required int64 required_default_int64_js_string_field = 113 [default = -256, jstype = JS_STRING];
   */
  requiredDefaultInt64JsStringField: string;

  /**
   * @generated from field: required float required_default_float_field = 14 [default = -512.13];
   */
  requiredDefaultFloatField: number;

  /**
   * @generated from field: required bool required_default_bool_field = 15 [default = true];
   */
  requiredDefaultBoolField: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_default_enum_field = 16 [default = PROTO2_ENUM_YES];
   */
  requiredDefaultEnumField: Proto2Enum;

  /**
   * @generated from field: required spec.Proto2Message required_default_message_field = 17;
   */
  requiredDefaultMessageField?: Proto2Message;

  /**
   * @generated from field: required spec.Proto2Message.RequiredDefaultGroup requireddefaultgroup = 18;
   */
  requireddefaultgroup?: Proto2Message_RequiredDefaultGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_default_wrapped_uint32_field = 202;
   */
  requiredDefaultWrappedUint32Field?: number;

  /**
   * @generated from field: optional string optional_string_field = 19;
   */
  optionalStringField: string;

  /**
   * @generated from field: optional bytes optional_bytes_field = 20;
   */
  optionalBytesField: Uint8Array;

  /**
   * @generated from field: optional int32 optional_int32_field = 21;
   */
  optionalInt32Field: number;

  /**
   * @generated from field: optional int64 optional_int64_field = 22;
   */
  optionalInt64Field: bigint;

  /**
   * @generated from field: optional int64 optional_int64_js_number_field = 106 [jstype = JS_NUMBER];
   */
  optionalInt64JsNumberField: bigint;

  /**
   * @generated from field: optional int64 optional_int64_js_string_field = 105 [jstype = JS_STRING];
   */
  optionalInt64JsStringField: string;

  /**
   * @generated from field: optional float optional_float_field = 23;
   */
  optionalFloatField: number;

  /**
   * @generated from field: optional bool optional_bool_field = 24;
   */
  optionalBoolField: boolean;

  /**
   * @generated from field: optional spec.Proto2Enum optional_enum_field = 25;
   */
  optionalEnumField: Proto2Enum;

  /**
   * @generated from field: optional spec.Proto2Message optional_message_field = 26;
   */
  optionalMessageField?: Proto2Message;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalGroup optionalgroup = 27;
   */
  optionalgroup?: Proto2Message_OptionalGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_wrapped_uint32_field = 207;
   */
  optionalWrappedUint32Field?: number;

  /**
   * @generated from field: required string optional_default_string_field = 28 [default = "hello \" *\/ "];
   */
  optionalDefaultStringField: string;

  /**
   * @generated from field: required bytes optional_default_bytes_field = 29 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  optionalDefaultBytesField: Uint8Array;

  /**
   * @generated from field: required int32 optional_default_int32_field = 30 [default = 128];
   */
  optionalDefaultInt32Field: number;

  /**
   * @generated from field: required int64 optional_default_int64_field = 31 [default = -256];
   */
  optionalDefaultInt64Field: bigint;

  /**
   * @generated from field: optional int64 optional_default_int64_js_number_field = 120 [default = -256, jstype = JS_NUMBER];
   */
  optionalDefaultInt64JsNumberField: bigint;

  /**
   * @generated from field: optional int64 optional_default_int64_js_string_field = 121 [default = -256, jstype = JS_STRING];
   */
  optionalDefaultInt64JsStringField: string;

  /**
   * @generated from field: required float optional_default_float_field = 32 [default = -512.13];
   */
  optionalDefaultFloatField: number;

  /**
   * @generated from field: required bool optional_default_bool_field = 33 [default = true];
   */
  optionalDefaultBoolField: boolean;

  /**
   * @generated from field: required spec.Proto2Enum optional_default_enum_field = 34 [default = PROTO2_ENUM_YES];
   */
  optionalDefaultEnumField: Proto2Enum;

  /**
   * @generated from field: optional spec.Proto2Message optional_default_message_field = 35;
   */
  optionalDefaultMessageField?: Proto2Message;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalDefaultGroup optionaldefaultgroup = 36;
   */
  optionaldefaultgroup?: Proto2Message_OptionalDefaultGroup;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_default_wrapped_uint32_field = 203;
   */
  optionalDefaultWrappedUint32Field?: number;

  /**
   * @generated from field: repeated string repeated_string_field = 37;
   */
  repeatedStringField: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes_field = 38;
   */
  repeatedBytesField: Uint8Array[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 39;
   */
  repeatedInt32Field: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 40;
   */
  repeatedInt64Field: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_number_field = 109 [jstype = JS_NUMBER];
   */
  repeatedInt64JsNumberField: bigint[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_string_field = 108 [jstype = JS_STRING];
   */
  repeatedInt64JsStringField: string[];

  /**
   * @generated from field: repeated float repeated_float_field = 41;
   */
  repeatedFloatField: number[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 42;
   */
  repeatedBoolField: boolean[];

  /**
   * @generated from field: repeated spec.Proto2Enum repeated_enum_field = 43;
   */
  repeatedEnumField: Proto2Enum[];

  /**
   * @generated from field: repeated spec.Proto2Message repeated_message_field = 44;
   */
  repeatedMessageField: Proto2Message[];

  /**
   * @generated from field: repeated spec.Proto2Message.RepeatedGroup repeatedgroup = 45;
   */
  repeatedgroup: Proto2Message_RepeatedGroup[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_wrapped_uint32_field = 204;
   */
  repeatedWrappedUint32Field: UInt32Value[];

  /**
   * @generated from field: repeated double packed_double_field = 46 [packed = true];
   */
  packedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 47 [packed = true];
   */
  packedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 48 [packed = true];
   */
  packedUint64Field: bigint[];

  /**
   * @generated from field: repeated double unpacked_double_field = 49 [packed = false];
   */
  unpackedDoubleField: number[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 50 [packed = false];
   */
  unpackedUint32Field: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 51 [packed = false];
   */
  unpackedUint64Field: bigint[];

  /**
   * @generated from oneof spec.Proto2Message.either
   */
  either: {
    /**
     * @generated from field: string oneof_string_field = 52;
     */
    value: string;
    case: "oneofStringField";
  } | {
    /**
     * @generated from field: bytes oneof_bytes_field = 53;
     */
    value: Uint8Array;
    case: "oneofBytesField";
  } | {
    /**
     * @generated from field: int32 oneof_int32_field = 54;
     */
    value: number;
    case: "oneofInt32Field";
  } | {
    /**
     * @generated from field: int64 oneof_int64_field = 55;
     */
    value: bigint;
    case: "oneofInt64Field";
  } | {
    /**
     * @generated from field: int64 oneof_int64_js_number_field = 112 [jstype = JS_NUMBER];
     */
    value: bigint;
    case: "oneofInt64JsNumberField";
  } | {
    /**
     * @generated from field: int64 oneof_int64_js_string_field = 111 [jstype = JS_STRING];
     */
    value: string;
    case: "oneofInt64JsStringField";
  } | {
    /**
     * @generated from field: float oneof_float_field = 56;
     */
    value: number;
    case: "oneofFloatField";
  } | {
    /**
     * @generated from field: bool oneof_bool_field = 57;
     */
    value: boolean;
    case: "oneofBoolField";
  } | {
    /**
     * @generated from field: spec.Proto2Enum oneof_enum_field = 58;
     */
    value: Proto2Enum;
    case: "oneofEnumField";
  } | {
    /**
     * @generated from field: spec.Proto2Message oneof_message_field = 59;
     */
    value: Proto2Message;
    case: "oneofMessageField";
  } | {
    /**
     * @generated from field: spec.Proto2Message.OneofGroup oneofgroup = 60;
     */
    value: Proto2Message_OneofGroup;
    case: "oneofgroup";
  } | {
    /**
     * @generated from field: google.protobuf.UInt32Value oneof_wrapped_uint32_field = 205;
     */
    value: UInt32Value;
    case: "oneofWrappedUint32Field";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: map<string, string> map_string_string_field = 70;
   */
  mapStringStringField: { [key: string]: string };

  /**
   * @generated from field: map<int32, int32> map_int32_int32_field = 71;
   */
  mapInt32Int32Field: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool_field = 72;
   */
  mapBoolBoolField: { [key: string]: boolean };

  /**
   * @generated from field: map<int64, int64> map_int64_int64_field = 73;
   */
  mapInt64Int64Field: { [key: string]: bigint };

  /**
   * @generated from field: map<int32, spec.Proto2EnumWithZero> map_int32_enum_field = 74;
   */
  mapInt32EnumField: { [key: number]: Proto2EnumWithZero };

  /**
   * @generated from field: map<int32, spec.Proto2Message> map_int32_message_field = 75;
   */
  mapInt32MessageField: { [key: number]: Proto2Message };

  /**
   * @generated from field: map<int32, google.protobuf.UInt32Value> map_int32_wrapped_uint32_field = 209;
   */
  mapInt32WrappedUint32Field: { [key: number]: UInt32Value };
};

/**
 * JSON type for the message spec.Proto2Message.
 */
export type Proto2MessageJson = {
  /**
   * @generated from field: required string required_string_field = 1;
   */
  requiredStringField?: string;

  /**
   * @generated from field: required bytes required_bytes_field = 2;
   */
  requiredBytesField?: string;

  /**
   * @generated from field: required int32 required_int32_field = 3;
   */
  requiredInt32Field?: number;

  /**
   * @generated from field: required int64 required_int64_field = 4;
   */
  requiredInt64Field?: string;

  /**
   * @generated from field: required int64 required_int64_js_number_field = 103 [jstype = JS_NUMBER];
   */
  requiredInt64JsNumberField?: string;

  /**
   * @generated from field: required int64 required_int64_js_string_field = 102 [jstype = JS_STRING];
   */
  requiredInt64JsStringField?: string;

  /**
   * @generated from field: required float required_float_field = 5;
   */
  requiredFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: required bool required_bool_field = 6;
   */
  requiredBoolField?: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_enum_field = 7;
   */
  requiredEnumField?: Proto2EnumJson;

  /**
   * @generated from field: required spec.Proto2Message required_message_field = 8;
   */
  requiredMessageField?: Proto2MessageJson;

  /**
   * @generated from field: required spec.Proto2Message.RequiredGroup requiredgroup = 9;
   */
  requiredgroup?: Proto2Message_RequiredGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_wrapped_uint32_field = 201;
   */
  requiredWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: required string required_default_string_field = 10 [default = "hello \" *\/ "];
   */
  requiredDefaultStringField?: string;

  /**
   * @generated from field: required bytes required_default_bytes_field = 11 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  requiredDefaultBytesField?: string;

  /**
   * @generated from field: required int32 required_default_int32_field = 12 [default = 128];
   */
  requiredDefaultInt32Field?: number;

  /**
   * @generated from field: required int64 required_default_int64_field = 13 [default = -256];
   */
  requiredDefaultInt64Field?: string;

  /**
   * @generated from field: required int64 required_default_int64_js_number_field = 110 [default = -256, jstype = JS_NUMBER];
   */
  requiredDefaultInt64JsNumberField?: string;

  /**
   * @generated from field: required int64 required_default_int64_js_string_field = 113 [default = -256, jstype = JS_STRING];
   */
  requiredDefaultInt64JsStringField?: string;

  /**
   * @generated from field: required float required_default_float_field = 14 [default = -512.13];
   */
  requiredDefaultFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: required bool required_default_bool_field = 15 [default = true];
   */
  requiredDefaultBoolField?: boolean;

  /**
   * @generated from field: required spec.Proto2Enum required_default_enum_field = 16 [default = PROTO2_ENUM_YES];
   */
  requiredDefaultEnumField?: Proto2EnumJson;

  /**
   * @generated from field: required spec.Proto2Message required_default_message_field = 17;
   */
  requiredDefaultMessageField?: Proto2MessageJson;

  /**
   * @generated from field: required spec.Proto2Message.RequiredDefaultGroup requireddefaultgroup = 18;
   */
  requireddefaultgroup?: Proto2Message_RequiredDefaultGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value required_default_wrapped_uint32_field = 202;
   */
  requiredDefaultWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: optional string optional_string_field = 19;
   */
  optionalStringField?: string;

  /**
   * @generated from field: optional bytes optional_bytes_field = 20;
   */
  optionalBytesField?: string;

  /**
   * @generated from field: optional int32 optional_int32_field = 21;
   */
  optionalInt32Field?: number;

  /**
   * @generated from field: optional int64 optional_int64_field = 22;
   */
  optionalInt64Field?: string;

  /**
   * @generated from field: optional int64 optional_int64_js_number_field = 106 [jstype = JS_NUMBER];
   */
  optionalInt64JsNumberField?: string;

  /**
   * @generated from field: optional int64 optional_int64_js_string_field = 105 [jstype = JS_STRING];
   */
  optionalInt64JsStringField?: string;

  /**
   * @generated from field: optional float optional_float_field = 23;
   */
  optionalFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: optional bool optional_bool_field = 24;
   */
  optionalBoolField?: boolean;

  /**
   * @generated from field: optional spec.Proto2Enum optional_enum_field = 25;
   */
  optionalEnumField?: Proto2EnumJson;

  /**
   * @generated from field: optional spec.Proto2Message optional_message_field = 26;
   */
  optionalMessageField?: Proto2MessageJson;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalGroup optionalgroup = 27;
   */
  optionalgroup?: Proto2Message_OptionalGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_wrapped_uint32_field = 207;
   */
  optionalWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: required string optional_default_string_field = 28 [default = "hello \" *\/ "];
   */
  optionalDefaultStringField?: string;

  /**
   * @generated from field: required bytes optional_default_bytes_field = 29 [default = "\000x\\x\\"x\'AAAAAA\010\014\n\r\t\013"];
   */
  optionalDefaultBytesField?: string;

  /**
   * @generated from field: required int32 optional_default_int32_field = 30 [default = 128];
   */
  optionalDefaultInt32Field?: number;

  /**
   * @generated from field: required int64 optional_default_int64_field = 31 [default = -256];
   */
  optionalDefaultInt64Field?: string;

  /**
   * @generated from field: optional int64 optional_default_int64_js_number_field = 120 [default = -256, jstype = JS_NUMBER];
   */
  optionalDefaultInt64JsNumberField?: string;

  /**
   * @generated from field: optional int64 optional_default_int64_js_string_field = 121 [default = -256, jstype = JS_STRING];
   */
  optionalDefaultInt64JsStringField?: string;

  /**
   * @generated from field: required float optional_default_float_field = 32 [default = -512.13];
   */
  optionalDefaultFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: required bool optional_default_bool_field = 33 [default = true];
   */
  optionalDefaultBoolField?: boolean;

  /**
   * @generated from field: required spec.Proto2Enum optional_default_enum_field = 34 [default = PROTO2_ENUM_YES];
   */
  optionalDefaultEnumField?: Proto2EnumJson;

  /**
   * @generated from field: optional spec.Proto2Message optional_default_message_field = 35;
   */
  optionalDefaultMessageField?: Proto2MessageJson;

  /**
   * @generated from field: optional spec.Proto2Message.OptionalDefaultGroup optionaldefaultgroup = 36;
   */
  optionaldefaultgroup?: Proto2Message_OptionalDefaultGroupJson;

  /**
   * @generated from field: required google.protobuf.UInt32Value optional_default_wrapped_uint32_field = 203;
   */
  optionalDefaultWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: repeated string repeated_string_field = 37;
   */
  repeatedStringField?: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes_field = 38;
   */
  repeatedBytesField?: string[];

  /**
   * @generated from field: repeated int32 repeated_int32_field = 39;
   */
  repeatedInt32Field?: number[];

  /**
   * @generated from field: repeated int64 repeated_int64_field = 40;
   */
  repeatedInt64Field?: string[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_number_field = 109 [jstype = JS_NUMBER];
   */
  repeatedInt64JsNumberField?: string[];

  /**
   * @generated from field: repeated int64 repeated_int64_js_string_field = 108 [jstype = JS_STRING];
   */
  repeatedInt64JsStringField?: string[];

  /**
   * @generated from field: repeated float repeated_float_field = 41;
   */
  repeatedFloatField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated bool repeated_bool_field = 42;
   */
  repeatedBoolField?: boolean[];

  /**
   * @generated from field: repeated spec.Proto2Enum repeated_enum_field = 43;
   */
  repeatedEnumField?: Proto2EnumJson[];

  /**
   * @generated from field: repeated spec.Proto2Message repeated_message_field = 44;
   */
  repeatedMessageField?: Proto2MessageJson[];

  /**
   * @generated from field: repeated spec.Proto2Message.RepeatedGroup repeatedgroup = 45;
   */
  repeatedgroup?: Proto2Message_RepeatedGroupJson[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_wrapped_uint32_field = 204;
   */
  repeatedWrappedUint32Field?: UInt32ValueJson[];

  /**
   * @generated from field: repeated double packed_double_field = 46 [packed = true];
   */
  packedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated uint32 packed_uint32_field = 47 [packed = true];
   */
  packedUint32Field?: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64_field = 48 [packed = true];
   */
  packedUint64Field?: string[];

  /**
   * @generated from field: repeated double unpacked_double_field = 49 [packed = false];
   */
  unpackedDoubleField?: (number | "NaN" | "Infinity" | "-Infinity")[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32_field = 50 [packed = false];
   */
  unpackedUint32Field?: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64_field = 51 [packed = false];
   */
  unpackedUint64Field?: string[];

  /**
   * @generated from field: string oneof_string_field = 52;
   */
  oneofStringField?: string;

  /**
   * @generated from field: bytes oneof_bytes_field = 53;
   */
  oneofBytesField?: string;

  /**
   * @generated from field: int32 oneof_int32_field = 54;
   */
  oneofInt32Field?: number;

  /**
   * @generated from field: int64 oneof_int64_field = 55;
   */
  oneofInt64Field?: string;

  /**
   * @generated from field: int64 oneof_int64_js_number_field = 112 [jstype = JS_NUMBER];
   */
  oneofInt64JsNumberField?: string;

  /**
   * @generated from field: int64 oneof_int64_js_string_field = 111 [jstype = JS_STRING];
   */
  oneofInt64JsStringField?: string;

  /**
   * @generated from field: float oneof_float_field = 56;
   */
  oneofFloatField?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: bool oneof_bool_field = 57;
   */
  oneofBoolField?: boolean;

  /**
   * @generated from field: spec.Proto2Enum oneof_enum_field = 58;
   */
  oneofEnumField?: Proto2EnumJson;

  /**
   * @generated from field: spec.Proto2Message oneof_message_field = 59;
   */
  oneofMessageField?: Proto2MessageJson;

  /**
   * @generated from field: spec.Proto2Message.OneofGroup oneofgroup = 60;
   */
  oneofgroup?: Proto2Message_OneofGroupJson;

  /**
   * @generated from field: google.protobuf.UInt32Value oneof_wrapped_uint32_field = 205;
   */
  oneofWrappedUint32Field?: UInt32ValueJson;

  /**
   * @generated from field: map<string, string> map_string_string_field = 70;
   */
  mapStringStringField?: { [key: string]: string };

  /**
   * @generated from field: map<int32, int32> map_int32_int32_field = 71;
   */
  mapInt32Int32Field?: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool_field = 72;
   */
  mapBoolBoolField?: { [key: string]: boolean };

  /**
   * @generated from field: map<int64, int64> map_int64_int64_field = 73;
   */
  mapInt64Int64Field?: { [key: string]: string };

  /**
   * @generated from field: map<int32, spec.Proto2EnumWithZero> map_int32_enum_field = 74;
   */
  mapInt32EnumField?: { [key: number]: Proto2EnumWithZeroJson };

  /**
   * @generated from field: map<int32, spec.Proto2Message> map_int32_message_field = 75;
   */
  mapInt32MessageField?: { [key: number]: Proto2MessageJson };

  /**
   * @generated from field: map<int32, google.protobuf.UInt32Value> map_int32_wrapped_uint32_field = 209;
   */
  mapInt32WrappedUint32Field?: { [key: number]: UInt32ValueJson };
};

/**
 * Describes the message spec.Proto2Message.
 * Use `create(Proto2MessageDesc)` to create a new message.
 */
export const Proto2MessageDesc: GenDescMessage<Proto2Message, Proto2MessageJson> = /*@__PURE__*/
  messageDesc(fileDesc_extra_proto2, 0);

/**
 * @generated from message spec.Proto2Message.RequiredGroup
 */
export type Proto2Message_RequiredGroup = Message<"spec.Proto2Message.RequiredGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.RequiredGroup.
 */
export type Proto2Message_RequiredGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.RequiredGroup.
 * Use `create(Proto2Message_RequiredGroupDesc)` to create a new message.
 */
export const Proto2Message_RequiredGroupDesc: GenDescMessage<Proto2Message_RequiredGroup, Proto2Message_RequiredGroupJson> = /*@__PURE__*/
  messageDesc(fileDesc_extra_proto2, 0, 0);

/**
 * @generated from message spec.Proto2Message.RequiredDefaultGroup
 */
export type Proto2Message_RequiredDefaultGroup = Message<"spec.Proto2Message.RequiredDefaultGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.RequiredDefaultGroup.
 */
export type Proto2Message_RequiredDefaultGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.RequiredDefaultGroup.
 * Use `create(Proto2Message_RequiredDefaultGroupDesc)` to create a new message.
 */
export const Proto2Message_RequiredDefaultGroupDesc: GenDescMessage<Proto2Message_RequiredDefaultGroup, Proto2Message_RequiredDefaultGroupJson> = /*@__PURE__*/
  messageDesc(fileDesc_extra_proto2, 0, 1);

/**
 * @generated from message spec.Proto2Message.OptionalGroup
 */
export type Proto2Message_OptionalGroup = Message<"spec.Proto2Message.OptionalGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.OptionalGroup.
 */
export type Proto2Message_OptionalGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.OptionalGroup.
 * Use `create(Proto2Message_OptionalGroupDesc)` to create a new message.
 */
export const Proto2Message_OptionalGroupDesc: GenDescMessage<Proto2Message_OptionalGroup, Proto2Message_OptionalGroupJson> = /*@__PURE__*/
  messageDesc(fileDesc_extra_proto2, 0, 2);

/**
 * @generated from message spec.Proto2Message.OptionalDefaultGroup
 */
export type Proto2Message_OptionalDefaultGroup = Message<"spec.Proto2Message.OptionalDefaultGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.OptionalDefaultGroup.
 */
export type Proto2Message_OptionalDefaultGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.OptionalDefaultGroup.
 * Use `create(Proto2Message_OptionalDefaultGroupDesc)` to create a new message.
 */
export const Proto2Message_OptionalDefaultGroupDesc: GenDescMessage<Proto2Message_OptionalDefaultGroup, Proto2Message_OptionalDefaultGroupJson> = /*@__PURE__*/
  messageDesc(fileDesc_extra_proto2, 0, 3);

/**
 * @generated from message spec.Proto2Message.RepeatedGroup
 */
export type Proto2Message_RepeatedGroup = Message<"spec.Proto2Message.RepeatedGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.RepeatedGroup.
 */
export type Proto2Message_RepeatedGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.RepeatedGroup.
 * Use `create(Proto2Message_RepeatedGroupDesc)` to create a new message.
 */
export const Proto2Message_RepeatedGroupDesc: GenDescMessage<Proto2Message_RepeatedGroup, Proto2Message_RepeatedGroupJson> = /*@__PURE__*/
  messageDesc(fileDesc_extra_proto2, 0, 4);

/**
 * @generated from message spec.Proto2Message.OneofGroup
 */
export type Proto2Message_OneofGroup = Message<"spec.Proto2Message.OneofGroup"> & {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field: number;
};

/**
 * JSON type for the message spec.Proto2Message.OneofGroup.
 */
export type Proto2Message_OneofGroupJson = {
  /**
   * @generated from field: optional int32 int32_field = 1;
   */
  int32Field?: number;
};

/**
 * Describes the message spec.Proto2Message.OneofGroup.
 * Use `create(Proto2Message_OneofGroupDesc)` to create a new message.
 */
export const Proto2Message_OneofGroupDesc: GenDescMessage<Proto2Message_OneofGroup, Proto2Message_OneofGroupJson> = /*@__PURE__*/
  messageDesc(fileDesc_extra_proto2, 0, 5);

/**
 * @generated from enum spec.Proto2Enum
 */
export enum Proto2Enum {
  /**
   * @generated from enum value: PROTO2_ENUM_YES = 1;
   */
  YES = 1,

  /**
   * @generated from enum value: PROTO2_ENUM_NO = 2;
   */
  NO = 2,
}

/**
 * JSON type for the enum spec.Proto2Enum.
 */
export type Proto2EnumJson = "PROTO2_ENUM_YES" | "PROTO2_ENUM_NO";

/**
 * Describes the enum spec.Proto2Enum.
 */
export const Proto2EnumDesc: GenDescEnum<Proto2Enum, Proto2EnumJson> = /*@__PURE__*/
  enumDesc(fileDesc_extra_proto2, 0);

/**
 * First enum value must be 0 when used as map value type
 *
 * @generated from enum spec.Proto2EnumWithZero
 */
export enum Proto2EnumWithZero {
  /**
   * @generated from enum value: PROTO2_ENUM_WITH_ZERO_ZERO = 0;
   */
  ZERO = 0,

  /**
   * @generated from enum value: PROTO2_ENUM_WITH_ZERO_ONE = 1;
   */
  ONE = 1,
}

/**
 * JSON type for the enum spec.Proto2EnumWithZero.
 */
export type Proto2EnumWithZeroJson = "PROTO2_ENUM_WITH_ZERO_ZERO" | "PROTO2_ENUM_WITH_ZERO_ONE";

/**
 * Describes the enum spec.Proto2EnumWithZero.
 */
export const Proto2EnumWithZeroDesc: GenDescEnum<Proto2EnumWithZero, Proto2EnumWithZeroJson> = /*@__PURE__*/
  enumDesc(fileDesc_extra_proto2, 1);

