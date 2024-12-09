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

// @generated by protoc-gen-es v2.2.3 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/proto2.proto.
 */
export const file_extra_proto2 = /*@__PURE__*/
  fileDesc("ChJleHRyYS9wcm90bzIucHJvdG8SBHNwZWMioiYKDVByb3RvMk1lc3NhZ2USHQoVcmVxdWlyZWRfc3RyaW5nX2ZpZWxkGAEgAigJEhwKFHJlcXVpcmVkX2J5dGVzX2ZpZWxkGAIgAigMEhwKFHJlcXVpcmVkX2ludDMyX2ZpZWxkGAMgAigFEhwKFHJlcXVpcmVkX2ludDY0X2ZpZWxkGAQgAigDEioKHnJlcXVpcmVkX2ludDY0X2pzX251bWJlcl9maWVsZBhnIAIoA0ICMAISKgoecmVxdWlyZWRfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGYgAigDQgIwARIcChRyZXF1aXJlZF9mbG9hdF9maWVsZBgFIAIoAhIbChNyZXF1aXJlZF9ib29sX2ZpZWxkGAYgAigIEi0KE3JlcXVpcmVkX2VudW1fZmllbGQYByACKA4yEC5zcGVjLlByb3RvMkVudW0SMwoWcmVxdWlyZWRfbWVzc2FnZV9maWVsZBgIIAIoCzITLnNwZWMuUHJvdG8yTWVzc2FnZRI4Cg1yZXF1aXJlZGdyb3VwGAkgAigKMiEuc3BlYy5Qcm90bzJNZXNzYWdlLlJlcXVpcmVkR3JvdXASRAodcmVxdWlyZWRfd3JhcHBlZF91aW50MzJfZmllbGQYyQEgAigLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEjIKHXJlcXVpcmVkX2RlZmF1bHRfc3RyaW5nX2ZpZWxkGAogAigJOgtoZWxsbyAiICovIBJLChxyZXF1aXJlZF9kZWZhdWx0X2J5dGVzX2ZpZWxkGAsgAigMOiVcMDAweFxceFwieFwnQUFBQUFBXDAxMFwwMTRcblxyXHRcMDEzEikKHHJlcXVpcmVkX2RlZmF1bHRfaW50MzJfZmllbGQYDCACKAU6AzEyOBIqChxyZXF1aXJlZF9kZWZhdWx0X2ludDY0X2ZpZWxkGA0gAigDOgQtMjU2EjgKJnJlcXVpcmVkX2RlZmF1bHRfaW50NjRfanNfbnVtYmVyX2ZpZWxkGG4gAigDOgQtMjU2QgIwAhI4CiZyZXF1aXJlZF9kZWZhdWx0X2ludDY0X2pzX3N0cmluZ19maWVsZBhxIAIoAzoELTI1NkICMAESLQoccmVxdWlyZWRfZGVmYXVsdF9mbG9hdF9maWVsZBgOIAIoAjoHLTUxMi4xMxIpChtyZXF1aXJlZF9kZWZhdWx0X2Jvb2xfZmllbGQYDyACKAg6BHRydWUSRgobcmVxdWlyZWRfZGVmYXVsdF9lbnVtX2ZpZWxkGBAgAigOMhAuc3BlYy5Qcm90bzJFbnVtOg9QUk9UTzJfRU5VTV9ZRVMSOwoecmVxdWlyZWRfZGVmYXVsdF9tZXNzYWdlX2ZpZWxkGBEgAigLMhMuc3BlYy5Qcm90bzJNZXNzYWdlEkYKFHJlcXVpcmVkZGVmYXVsdGdyb3VwGBIgAigKMiguc3BlYy5Qcm90bzJNZXNzYWdlLlJlcXVpcmVkRGVmYXVsdEdyb3VwEkwKJXJlcXVpcmVkX2RlZmF1bHRfd3JhcHBlZF91aW50MzJfZmllbGQYygEgAigLMhwuZ29vZ2xlLnByb3RvYnVmLlVJbnQzMlZhbHVlEh0KFW9wdGlvbmFsX3N0cmluZ19maWVsZBgTIAEoCRIcChRvcHRpb25hbF9ieXRlc19maWVsZBgUIAEoDBIcChRvcHRpb25hbF9pbnQzMl9maWVsZBgVIAEoBRIcChRvcHRpb25hbF9pbnQ2NF9maWVsZBgWIAEoAxIqCh5vcHRpb25hbF9pbnQ2NF9qc19udW1iZXJfZmllbGQYaiABKANCAjACEioKHm9wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZBhpIAEoA0ICMAESHAoUb3B0aW9uYWxfZmxvYXRfZmllbGQYFyABKAISGwoTb3B0aW9uYWxfYm9vbF9maWVsZBgYIAEoCBItChNvcHRpb25hbF9lbnVtX2ZpZWxkGBkgASgOMhAuc3BlYy5Qcm90bzJFbnVtEjMKFm9wdGlvbmFsX21lc3NhZ2VfZmllbGQYGiABKAsyEy5zcGVjLlByb3RvMk1lc3NhZ2USOAoNb3B0aW9uYWxncm91cBgbIAEoCjIhLnNwZWMuUHJvdG8yTWVzc2FnZS5PcHRpb25hbEdyb3VwEkQKHW9wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkGM8BIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRIyCh1vcHRpb25hbF9kZWZhdWx0X3N0cmluZ19maWVsZBgcIAEoCToLaGVsbG8gIiAqLyASSwocb3B0aW9uYWxfZGVmYXVsdF9ieXRlc19maWVsZBgdIAEoDDolXDAwMHhcXHhcInhcJ0FBQUFBQVwwMTBcMDE0XG5cclx0XDAxMxIpChxvcHRpb25hbF9kZWZhdWx0X2ludDMyX2ZpZWxkGB4gASgFOgMxMjgSKgocb3B0aW9uYWxfZGVmYXVsdF9pbnQ2NF9maWVsZBgfIAEoAzoELTI1NhI4CiZvcHRpb25hbF9kZWZhdWx0X2ludDY0X2pzX251bWJlcl9maWVsZBh4IAEoAzoELTI1NkICMAISOAomb3B0aW9uYWxfZGVmYXVsdF9pbnQ2NF9qc19zdHJpbmdfZmllbGQYeSABKAM6BC0yNTZCAjABEi0KHG9wdGlvbmFsX2RlZmF1bHRfZmxvYXRfZmllbGQYICABKAI6By01MTIuMTMSKQobb3B0aW9uYWxfZGVmYXVsdF9ib29sX2ZpZWxkGCEgASgIOgR0cnVlEkYKG29wdGlvbmFsX2RlZmF1bHRfZW51bV9maWVsZBgiIAEoDjIQLnNwZWMuUHJvdG8yRW51bToPUFJPVE8yX0VOVU1fWUVTEjsKHm9wdGlvbmFsX2RlZmF1bHRfbWVzc2FnZV9maWVsZBgjIAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZRJGChRvcHRpb25hbGRlZmF1bHRncm91cBgkIAEoCjIoLnNwZWMuUHJvdG8yTWVzc2FnZS5PcHRpb25hbERlZmF1bHRHcm91cBJMCiVvcHRpb25hbF9kZWZhdWx0X3dyYXBwZWRfdWludDMyX2ZpZWxkGMsBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRIdChVyZXBlYXRlZF9zdHJpbmdfZmllbGQYJSADKAkSHAoUcmVwZWF0ZWRfYnl0ZXNfZmllbGQYJiADKAwSHAoUcmVwZWF0ZWRfaW50MzJfZmllbGQYJyADKAUSHAoUcmVwZWF0ZWRfaW50NjRfZmllbGQYKCADKAMSKgoecmVwZWF0ZWRfaW50NjRfanNfbnVtYmVyX2ZpZWxkGG0gAygDQgIwAhIqCh5yZXBlYXRlZF9pbnQ2NF9qc19zdHJpbmdfZmllbGQYbCADKANCAjABEhwKFHJlcGVhdGVkX2Zsb2F0X2ZpZWxkGCkgAygCEhsKE3JlcGVhdGVkX2Jvb2xfZmllbGQYKiADKAgSLQoTcmVwZWF0ZWRfZW51bV9maWVsZBgrIAMoDjIQLnNwZWMuUHJvdG8yRW51bRIzChZyZXBlYXRlZF9tZXNzYWdlX2ZpZWxkGCwgAygLMhMuc3BlYy5Qcm90bzJNZXNzYWdlEjgKDXJlcGVhdGVkZ3JvdXAYLSADKAoyIS5zcGVjLlByb3RvMk1lc3NhZ2UuUmVwZWF0ZWRHcm91cBJECh1yZXBlYXRlZF93cmFwcGVkX3VpbnQzMl9maWVsZBjMASADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSHwoTcGFja2VkX2RvdWJsZV9maWVsZBguIAMoAUICEAESHwoTcGFja2VkX3VpbnQzMl9maWVsZBgvIAMoDUICEAESHwoTcGFja2VkX3VpbnQ2NF9maWVsZBgwIAMoBEICEAESIQoVdW5wYWNrZWRfZG91YmxlX2ZpZWxkGDEgAygBQgIQABIhChV1bnBhY2tlZF91aW50MzJfZmllbGQYMiADKA1CAhAAEiEKFXVucGFja2VkX3VpbnQ2NF9maWVsZBgzIAMoBEICEAASHAoSb25lb2Zfc3RyaW5nX2ZpZWxkGDQgASgJSAASGwoRb25lb2ZfYnl0ZXNfZmllbGQYNSABKAxIABIbChFvbmVvZl9pbnQzMl9maWVsZBg2IAEoBUgAEhsKEW9uZW9mX2ludDY0X2ZpZWxkGDcgASgDSAASKQobb25lb2ZfaW50NjRfanNfbnVtYmVyX2ZpZWxkGHAgASgDQgIwAkgAEikKG29uZW9mX2ludDY0X2pzX3N0cmluZ19maWVsZBhvIAEoA0ICMAFIABIbChFvbmVvZl9mbG9hdF9maWVsZBg4IAEoAkgAEhoKEG9uZW9mX2Jvb2xfZmllbGQYOSABKAhIABIsChBvbmVvZl9lbnVtX2ZpZWxkGDogASgOMhAuc3BlYy5Qcm90bzJFbnVtSAASMgoTb25lb2ZfbWVzc2FnZV9maWVsZBg7IAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZUgAEjQKCm9uZW9mZ3JvdXAYPCABKAoyHi5zcGVjLlByb3RvMk1lc3NhZ2UuT25lb2ZHcm91cEgAEkMKGm9uZW9mX3dyYXBwZWRfdWludDMyX2ZpZWxkGM0BIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZUgAEk4KF21hcF9zdHJpbmdfc3RyaW5nX2ZpZWxkGEYgAygLMi0uc3BlYy5Qcm90bzJNZXNzYWdlLk1hcFN0cmluZ1N0cmluZ0ZpZWxkRW50cnkSSgoVbWFwX2ludDMyX2ludDMyX2ZpZWxkGEcgAygLMisuc3BlYy5Qcm90bzJNZXNzYWdlLk1hcEludDMySW50MzJGaWVsZEVudHJ5EkYKE21hcF9ib29sX2Jvb2xfZmllbGQYSCADKAsyKS5zcGVjLlByb3RvMk1lc3NhZ2UuTWFwQm9vbEJvb2xGaWVsZEVudHJ5EkoKFW1hcF9pbnQ2NF9pbnQ2NF9maWVsZBhJIAMoCzIrLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQ2NEludDY0RmllbGRFbnRyeRJIChRtYXBfaW50MzJfZW51bV9maWVsZBhKIAMoCzIqLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQzMkVudW1GaWVsZEVudHJ5Ek4KF21hcF9pbnQzMl9tZXNzYWdlX2ZpZWxkGEsgAygLMi0uc3BlYy5Qcm90bzJNZXNzYWdlLk1hcEludDMyTWVzc2FnZUZpZWxkRW50cnkSXAoebWFwX2ludDMyX3dyYXBwZWRfdWludDMyX2ZpZWxkGNEBIAMoCzIzLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQzMldyYXBwZWRVaW50MzJGaWVsZEVudHJ5GiQKDVJlcXVpcmVkR3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaKwoUUmVxdWlyZWREZWZhdWx0R3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaJAoNT3B0aW9uYWxHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBRorChRPcHRpb25hbERlZmF1bHRHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBRokCg1SZXBlYXRlZEdyb3VwEhMKC2ludDMyX2ZpZWxkGAEgASgFGiEKCk9uZW9mR3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaOwoZTWFwU3RyaW5nU3RyaW5nRmllbGRFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjkKF01hcEludDMySW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoBToCOAEaNwoVTWFwQm9vbEJvb2xGaWVsZEVudHJ5EgsKA2tleRgBIAEoCBINCgV2YWx1ZRgCIAEoCDoCOAEaOQoXTWFwSW50NjRJbnQ2NEZpZWxkRW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARpSChZNYXBJbnQzMkVudW1GaWVsZEVudHJ5EgsKA2tleRgBIAEoBRInCgV2YWx1ZRgCIAEoDjIYLnNwZWMuUHJvdG8yRW51bVdpdGhaZXJvOgI4ARpQChlNYXBJbnQzMk1lc3NhZ2VGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIiCgV2YWx1ZRgCIAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZToCOAEaXwofTWFwSW50MzJXcmFwcGVkVWludDMyRmllbGRFbnRyeRILCgNrZXkYASABKAUSKwoFdmFsdWUYAiABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWU6AjgBQggKBmVpdGhlcio1CgpQcm90bzJFbnVtEhMKD1BST1RPMl9FTlVNX1lFUxABEhIKDlBST1RPMl9FTlVNX05PEAIqUwoSUHJvdG8yRW51bVdpdGhaZXJvEh4KGlBST1RPMl9FTlVNX1dJVEhfWkVST19aRVJPEAASHQoZUFJPVE8yX0VOVU1fV0lUSF9aRVJPX09ORRABQiFaH2dpdGh1Yi5jb20vYnVmYnVpbGQvcHJvdG9idWYtZXM", [file_google_protobuf_wrappers]);

/**
 * Describes the message spec.Proto2Message.
 * Use `create(Proto2MessageSchema)` to create a new message.
 */
export const Proto2MessageSchema = /*@__PURE__*/
  messageDesc(file_extra_proto2, 0);

/**
 * Describes the message spec.Proto2Message.RequiredGroup.
 * Use `create(Proto2Message_RequiredGroupSchema)` to create a new message.
 */
export const Proto2Message_RequiredGroupSchema = /*@__PURE__*/
  messageDesc(file_extra_proto2, 0, 0);

/**
 * Describes the message spec.Proto2Message.RequiredDefaultGroup.
 * Use `create(Proto2Message_RequiredDefaultGroupSchema)` to create a new message.
 */
export const Proto2Message_RequiredDefaultGroupSchema = /*@__PURE__*/
  messageDesc(file_extra_proto2, 0, 1);

/**
 * Describes the message spec.Proto2Message.OptionalGroup.
 * Use `create(Proto2Message_OptionalGroupSchema)` to create a new message.
 */
export const Proto2Message_OptionalGroupSchema = /*@__PURE__*/
  messageDesc(file_extra_proto2, 0, 2);

/**
 * Describes the message spec.Proto2Message.OptionalDefaultGroup.
 * Use `create(Proto2Message_OptionalDefaultGroupSchema)` to create a new message.
 */
export const Proto2Message_OptionalDefaultGroupSchema = /*@__PURE__*/
  messageDesc(file_extra_proto2, 0, 3);

/**
 * Describes the message spec.Proto2Message.RepeatedGroup.
 * Use `create(Proto2Message_RepeatedGroupSchema)` to create a new message.
 */
export const Proto2Message_RepeatedGroupSchema = /*@__PURE__*/
  messageDesc(file_extra_proto2, 0, 4);

/**
 * Describes the message spec.Proto2Message.OneofGroup.
 * Use `create(Proto2Message_OneofGroupSchema)` to create a new message.
 */
export const Proto2Message_OneofGroupSchema = /*@__PURE__*/
  messageDesc(file_extra_proto2, 0, 5);

/**
 * Describes the enum spec.Proto2Enum.
 */
export const Proto2EnumSchema = /*@__PURE__*/
  enumDesc(file_extra_proto2, 0);

/**
 * @generated from enum spec.Proto2Enum
 */
export const Proto2Enum = /*@__PURE__*/
  tsEnum(Proto2EnumSchema);

/**
 * Describes the enum spec.Proto2EnumWithZero.
 */
export const Proto2EnumWithZeroSchema = /*@__PURE__*/
  enumDesc(file_extra_proto2, 1);

/**
 * First enum value must be 0 when used as map value type
 *
 * @generated from enum spec.Proto2EnumWithZero
 */
export const Proto2EnumWithZero = /*@__PURE__*/
  tsEnum(Proto2EnumWithZeroSchema);

