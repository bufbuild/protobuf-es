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
// @generated from file extra/proto2.proto (package spec, syntax proto2)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/next/codegenv1";
import { fileDesc_google_protobuf_wrappers } from "@bufbuild/protobuf/next";

export const fileDesc_extra_proto2 = fileDesc("ChJleHRyYS9wcm90bzIucHJvdG8SBHNwZWMioiYKDVByb3RvMk1lc3NhZ2USHQoVcmVxdWlyZWRfc3RyaW5nX2ZpZWxkGAEgAigJEhwKFHJlcXVpcmVkX2J5dGVzX2ZpZWxkGAIgAigMEhwKFHJlcXVpcmVkX2ludDMyX2ZpZWxkGAMgAigFEhwKFHJlcXVpcmVkX2ludDY0X2ZpZWxkGAQgAigDEioKHnJlcXVpcmVkX2ludDY0X2pzX251bWJlcl9maWVsZBhnIAIoA0ICMAISKgoecmVxdWlyZWRfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGYgAigDQgIwARIcChRyZXF1aXJlZF9mbG9hdF9maWVsZBgFIAIoAhIbChNyZXF1aXJlZF9ib29sX2ZpZWxkGAYgAigIEi0KE3JlcXVpcmVkX2VudW1fZmllbGQYByACKA4yEC5zcGVjLlByb3RvMkVudW0SMwoWcmVxdWlyZWRfbWVzc2FnZV9maWVsZBgIIAIoCzITLnNwZWMuUHJvdG8yTWVzc2FnZRI4Cg1yZXF1aXJlZGdyb3VwGAkgAigKMiEuc3BlYy5Qcm90bzJNZXNzYWdlLlJlcXVpcmVkR3JvdXASRAodcmVxdWlyZWRfd3JhcHBlZF9kb3VibGVfZmllbGQYyQEgAigLMhwuZ29vZ2xlLnByb3RvYnVmLkRvdWJsZVZhbHVlEjIKHXJlcXVpcmVkX2RlZmF1bHRfc3RyaW5nX2ZpZWxkGAogAigJOgtoZWxsbyAiICovIBJLChxyZXF1aXJlZF9kZWZhdWx0X2J5dGVzX2ZpZWxkGAsgAigMOiVcMDAweFxceFwieFwnQUFBQUFBXDAxMFwwMTRcblxyXHRcMDEzEikKHHJlcXVpcmVkX2RlZmF1bHRfaW50MzJfZmllbGQYDCACKAU6AzEyOBIqChxyZXF1aXJlZF9kZWZhdWx0X2ludDY0X2ZpZWxkGA0gAigDOgQtMjU2EjgKJnJlcXVpcmVkX2RlZmF1bHRfaW50NjRfanNfbnVtYmVyX2ZpZWxkGG4gAigDOgQtMjU2QgIwAhI4CiZyZXF1aXJlZF9kZWZhdWx0X2ludDY0X2pzX3N0cmluZ19maWVsZBhxIAIoAzoELTI1NkICMAESLQoccmVxdWlyZWRfZGVmYXVsdF9mbG9hdF9maWVsZBgOIAIoAjoHLTUxMi4xMxIpChtyZXF1aXJlZF9kZWZhdWx0X2Jvb2xfZmllbGQYDyACKAg6BHRydWUSRgobcmVxdWlyZWRfZGVmYXVsdF9lbnVtX2ZpZWxkGBAgAigOMhAuc3BlYy5Qcm90bzJFbnVtOg9QUk9UTzJfRU5VTV9ZRVMSOwoecmVxdWlyZWRfZGVmYXVsdF9tZXNzYWdlX2ZpZWxkGBEgAigLMhMuc3BlYy5Qcm90bzJNZXNzYWdlEkYKFHJlcXVpcmVkZGVmYXVsdGdyb3VwGBIgAigKMiguc3BlYy5Qcm90bzJNZXNzYWdlLlJlcXVpcmVkRGVmYXVsdEdyb3VwEkwKJXJlcXVpcmVkX2RlZmF1bHRfd3JhcHBlZF9kb3VibGVfZmllbGQYygEgAigLMhwuZ29vZ2xlLnByb3RvYnVmLkRvdWJsZVZhbHVlEh0KFW9wdGlvbmFsX3N0cmluZ19maWVsZBgTIAEoCRIcChRvcHRpb25hbF9ieXRlc19maWVsZBgUIAEoDBIcChRvcHRpb25hbF9pbnQzMl9maWVsZBgVIAEoBRIcChRvcHRpb25hbF9pbnQ2NF9maWVsZBgWIAEoAxIqCh5vcHRpb25hbF9pbnQ2NF9qc19udW1iZXJfZmllbGQYaiABKANCAjACEioKHm9wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZBhpIAEoA0ICMAESHAoUb3B0aW9uYWxfZmxvYXRfZmllbGQYFyABKAISGwoTb3B0aW9uYWxfYm9vbF9maWVsZBgYIAEoCBItChNvcHRpb25hbF9lbnVtX2ZpZWxkGBkgASgOMhAuc3BlYy5Qcm90bzJFbnVtEjMKFm9wdGlvbmFsX21lc3NhZ2VfZmllbGQYGiABKAsyEy5zcGVjLlByb3RvMk1lc3NhZ2USOAoNb3B0aW9uYWxncm91cBgbIAEoCjIhLnNwZWMuUHJvdG8yTWVzc2FnZS5PcHRpb25hbEdyb3VwEkQKHW9wdGlvbmFsX3dyYXBwZWRfZG91YmxlX2ZpZWxkGM8BIAIoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZRIyCh1vcHRpb25hbF9kZWZhdWx0X3N0cmluZ19maWVsZBgcIAIoCToLaGVsbG8gIiAqLyASSwocb3B0aW9uYWxfZGVmYXVsdF9ieXRlc19maWVsZBgdIAIoDDolXDAwMHhcXHhcInhcJ0FBQUFBQVwwMTBcMDE0XG5cclx0XDAxMxIpChxvcHRpb25hbF9kZWZhdWx0X2ludDMyX2ZpZWxkGB4gAigFOgMxMjgSKgocb3B0aW9uYWxfZGVmYXVsdF9pbnQ2NF9maWVsZBgfIAIoAzoELTI1NhI4CiZvcHRpb25hbF9kZWZhdWx0X2ludDY0X2pzX251bWJlcl9maWVsZBh4IAEoAzoELTI1NkICMAISOAomb3B0aW9uYWxfZGVmYXVsdF9pbnQ2NF9qc19zdHJpbmdfZmllbGQYeSABKAM6BC0yNTZCAjABEi0KHG9wdGlvbmFsX2RlZmF1bHRfZmxvYXRfZmllbGQYICACKAI6By01MTIuMTMSKQobb3B0aW9uYWxfZGVmYXVsdF9ib29sX2ZpZWxkGCEgAigIOgR0cnVlEkYKG29wdGlvbmFsX2RlZmF1bHRfZW51bV9maWVsZBgiIAIoDjIQLnNwZWMuUHJvdG8yRW51bToPUFJPVE8yX0VOVU1fWUVTEjsKHm9wdGlvbmFsX2RlZmF1bHRfbWVzc2FnZV9maWVsZBgjIAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZRJGChRvcHRpb25hbGRlZmF1bHRncm91cBgkIAEoCjIoLnNwZWMuUHJvdG8yTWVzc2FnZS5PcHRpb25hbERlZmF1bHRHcm91cBJMCiVvcHRpb25hbF9kZWZhdWx0X3dyYXBwZWRfZG91YmxlX2ZpZWxkGMsBIAIoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZRIdChVyZXBlYXRlZF9zdHJpbmdfZmllbGQYJSADKAkSHAoUcmVwZWF0ZWRfYnl0ZXNfZmllbGQYJiADKAwSHAoUcmVwZWF0ZWRfaW50MzJfZmllbGQYJyADKAUSHAoUcmVwZWF0ZWRfaW50NjRfZmllbGQYKCADKAMSKgoecmVwZWF0ZWRfaW50NjRfanNfbnVtYmVyX2ZpZWxkGG0gAygDQgIwAhIqCh5yZXBlYXRlZF9pbnQ2NF9qc19zdHJpbmdfZmllbGQYbCADKANCAjABEhwKFHJlcGVhdGVkX2Zsb2F0X2ZpZWxkGCkgAygCEhsKE3JlcGVhdGVkX2Jvb2xfZmllbGQYKiADKAgSLQoTcmVwZWF0ZWRfZW51bV9maWVsZBgrIAMoDjIQLnNwZWMuUHJvdG8yRW51bRIzChZyZXBlYXRlZF9tZXNzYWdlX2ZpZWxkGCwgAygLMhMuc3BlYy5Qcm90bzJNZXNzYWdlEjgKDXJlcGVhdGVkZ3JvdXAYLSADKAoyIS5zcGVjLlByb3RvMk1lc3NhZ2UuUmVwZWF0ZWRHcm91cBJECh1yZXBlYXRlZF93cmFwcGVkX2RvdWJsZV9maWVsZBjMASADKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUSHwoTcGFja2VkX2RvdWJsZV9maWVsZBguIAMoAUICEAESHwoTcGFja2VkX3VpbnQzMl9maWVsZBgvIAMoDUICEAESHwoTcGFja2VkX3VpbnQ2NF9maWVsZBgwIAMoBEICEAESIQoVdW5wYWNrZWRfZG91YmxlX2ZpZWxkGDEgAygBQgIQABIhChV1bnBhY2tlZF91aW50MzJfZmllbGQYMiADKA1CAhAAEiEKFXVucGFja2VkX3VpbnQ2NF9maWVsZBgzIAMoBEICEAASHAoSb25lb2Zfc3RyaW5nX2ZpZWxkGDQgASgJSAASGwoRb25lb2ZfYnl0ZXNfZmllbGQYNSABKAxIABIbChFvbmVvZl9pbnQzMl9maWVsZBg2IAEoBUgAEhsKEW9uZW9mX2ludDY0X2ZpZWxkGDcgASgDSAASKQobb25lb2ZfaW50NjRfanNfbnVtYmVyX2ZpZWxkGHAgASgDQgIwAkgAEikKG29uZW9mX2ludDY0X2pzX3N0cmluZ19maWVsZBhvIAEoA0ICMAFIABIbChFvbmVvZl9mbG9hdF9maWVsZBg4IAEoAkgAEhoKEG9uZW9mX2Jvb2xfZmllbGQYOSABKAhIABIsChBvbmVvZl9lbnVtX2ZpZWxkGDogASgOMhAuc3BlYy5Qcm90bzJFbnVtSAASMgoTb25lb2ZfbWVzc2FnZV9maWVsZBg7IAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZUgAEjQKCm9uZW9mZ3JvdXAYPCABKAoyHi5zcGVjLlByb3RvMk1lc3NhZ2UuT25lb2ZHcm91cEgAEkMKGm9uZW9mX3dyYXBwZWRfZG91YmxlX2ZpZWxkGM0BIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZUgAEk4KF21hcF9zdHJpbmdfc3RyaW5nX2ZpZWxkGEYgAygLMi0uc3BlYy5Qcm90bzJNZXNzYWdlLk1hcFN0cmluZ1N0cmluZ0ZpZWxkRW50cnkSSgoVbWFwX2ludDMyX2ludDMyX2ZpZWxkGEcgAygLMisuc3BlYy5Qcm90bzJNZXNzYWdlLk1hcEludDMySW50MzJGaWVsZEVudHJ5EkYKE21hcF9ib29sX2Jvb2xfZmllbGQYSCADKAsyKS5zcGVjLlByb3RvMk1lc3NhZ2UuTWFwQm9vbEJvb2xGaWVsZEVudHJ5EkoKFW1hcF9pbnQ2NF9pbnQ2NF9maWVsZBhJIAMoCzIrLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQ2NEludDY0RmllbGRFbnRyeRJIChRtYXBfaW50MzJfZW51bV9maWVsZBhKIAMoCzIqLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQzMkVudW1GaWVsZEVudHJ5Ek4KF21hcF9pbnQzMl9tZXNzYWdlX2ZpZWxkGEsgAygLMi0uc3BlYy5Qcm90bzJNZXNzYWdlLk1hcEludDMyTWVzc2FnZUZpZWxkRW50cnkSXAoebWFwX2ludDMyX3dyYXBwZWRfZG91YmxlX2ZpZWxkGNEBIAMoCzIzLnNwZWMuUHJvdG8yTWVzc2FnZS5NYXBJbnQzMldyYXBwZWREb3VibGVGaWVsZEVudHJ5GiQKDVJlcXVpcmVkR3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaKwoUUmVxdWlyZWREZWZhdWx0R3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaJAoNT3B0aW9uYWxHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBRorChRPcHRpb25hbERlZmF1bHRHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBRokCg1SZXBlYXRlZEdyb3VwEhMKC2ludDMyX2ZpZWxkGAEgASgFGiEKCk9uZW9mR3JvdXASEwoLaW50MzJfZmllbGQYASABKAUaOwoZTWFwU3RyaW5nU3RyaW5nRmllbGRFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjkKF01hcEludDMySW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoBToCOAEaNwoVTWFwQm9vbEJvb2xGaWVsZEVudHJ5EgsKA2tleRgBIAEoCBINCgV2YWx1ZRgCIAEoCDoCOAEaOQoXTWFwSW50NjRJbnQ2NEZpZWxkRW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARpSChZNYXBJbnQzMkVudW1GaWVsZEVudHJ5EgsKA2tleRgBIAEoBRInCgV2YWx1ZRgCIAEoDjIYLnNwZWMuUHJvdG8yRW51bVdpdGhaZXJvOgI4ARpQChlNYXBJbnQzMk1lc3NhZ2VGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIiCgV2YWx1ZRgCIAEoCzITLnNwZWMuUHJvdG8yTWVzc2FnZToCOAEaXwofTWFwSW50MzJXcmFwcGVkRG91YmxlRmllbGRFbnRyeRILCgNrZXkYASABKAUSKwoFdmFsdWUYAiABKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWU6AjgBQggKBmVpdGhlciLYAgoVUHJvdG8yUmVwZWF0ZWRNZXNzYWdlEhQKDHN0cmluZ19maWVsZBgBIAMoCRITCgtieXRlc19maWVsZBgCIAMoDBITCgtpbnQzMl9maWVsZBgDIAMoBRITCgtpbnQ2NF9maWVsZBgEIAMoAxITCgtmbG9hdF9maWVsZBgFIAMoAhISCgpib29sX2ZpZWxkGAYgAygIEiQKCmVudW1fZmllbGQYByADKA4yEC5zcGVjLlByb3RvMkVudW0SLwoNbWVzc2FnZV9maWVsZBgIIAMoCzIYLnNwZWMuUHJvdG8yQ2hpbGRNZXNzYWdlEkAKDXJlcGVhdGVkZ3JvdXAYCSADKAoyKS5zcGVjLlByb3RvMlJlcGVhdGVkTWVzc2FnZS5SZXBlYXRlZEdyb3VwGiQKDVJlcGVhdGVkR3JvdXASEwoLaW50MzJfZmllbGQYASABKAU6AhgBIuwCChJQcm90bzJPbmVvZk1lc3NhZ2USFgoMc3RyaW5nX2ZpZWxkGAEgASgJSAASFQoLYnl0ZXNfZmllbGQYAiABKAxIABIVCgtpbnQzMl9maWVsZBgDIAEoBUgAEhUKC2ludDY0X2ZpZWxkGAQgASgDSAASFQoLZmxvYXRfZmllbGQYBSABKAJIABIUCgpib29sX2ZpZWxkGAYgASgISAASJgoKZW51bV9maWVsZBgHIAEoDjIQLnNwZWMuUHJvdG8yRW51bUgAEjEKDW1lc3NhZ2VfZmllbGQYCCABKAsyGC5zcGVjLlByb3RvMkNoaWxkTWVzc2FnZUgAEj8KDXJlcGVhdGVkZ3JvdXAYCSABKAoyJi5zcGVjLlByb3RvMk9uZW9mTWVzc2FnZS5SZXBlYXRlZEdyb3VwSAAaJAoNUmVwZWF0ZWRHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBToCGAFCBgoEc29tZSJ8ChNQcm90bzJQYWNrZWRNZXNzYWdlEh8KE3BhY2tlZF9kb3VibGVfZmllbGQYZSADKAFCAhABEh8KE3BhY2tlZF91aW50MzJfZmllbGQYZiADKA1CAhABEh8KE3BhY2tlZF91aW50NjRfZmllbGQYZyADKARCAhABOgIYASKHAQoVUHJvdG8yVW5wYWNrZWRNZXNzYWdlEiIKFXVucGFja2VkX2RvdWJsZV9maWVsZBjJASADKAFCAhAAEiIKFXVucGFja2VkX3VpbnQzMl9maWVsZBjKASADKA1CAhAAEiIKFXVucGFja2VkX3VpbnQ2NF9maWVsZBjLASADKARCAhAAOgIYASJmCh5Qcm90bzJVbnNwZWNpZmllZFBhY2tlZE1lc3NhZ2USFAoMZG91YmxlX2ZpZWxkGAEgAygBEhQKDHVpbnQzMl9maWVsZBgCIAMoDRIUCgx1aW50NjRfZmllbGQYAyADKAQ6AhgBIvABChVQcm90bzJPcHRpb25hbE1lc3NhZ2USFAoMc3RyaW5nX2ZpZWxkGAEgASgJEhMKC2J5dGVzX2ZpZWxkGAIgASgMEhMKC2ludDMyX2ZpZWxkGAMgASgFEhMKC2ludDY0X2ZpZWxkGAQgASgDEhMKC2Zsb2F0X2ZpZWxkGAUgASgCEhIKCmJvb2xfZmllbGQYBiABKAgSJAoKZW51bV9maWVsZBgHIAEoDjIQLnNwZWMuUHJvdG8yRW51bRIvCg1tZXNzYWdlX2ZpZWxkGAggASgLMhguc3BlYy5Qcm90bzJDaGlsZE1lc3NhZ2U6AhgBIvABChVQcm90bzJSZXF1aXJlZE1lc3NhZ2USFAoMc3RyaW5nX2ZpZWxkGAEgAigJEhMKC2J5dGVzX2ZpZWxkGAIgAigMEhMKC2ludDMyX2ZpZWxkGAMgAigFEhMKC2ludDY0X2ZpZWxkGAQgAigDEhMKC2Zsb2F0X2ZpZWxkGAUgAigCEhIKCmJvb2xfZmllbGQYBiACKAgSJAoKZW51bV9maWVsZBgHIAIoDjIQLnNwZWMuUHJvdG8yRW51bRIvCg1tZXNzYWdlX2ZpZWxkGAggAigLMhguc3BlYy5Qcm90bzJDaGlsZE1lc3NhZ2U6AhgBItcCCh1Qcm90bzJSZXF1aXJlZERlZmF1bHRzTWVzc2FnZRIhCgxzdHJpbmdfZmllbGQYASACKAk6C2hlbGxvICIgKi8gEjoKC2J5dGVzX2ZpZWxkGAIgAigMOiVcMDAweFxceFwieFwnQUFBQUFBXDAxMFwwMTRcblxyXHRcMDEzEhgKC2ludDMyX2ZpZWxkGAMgAigFOgMxMjgSGQoLaW50NjRfZmllbGQYBCACKAM6BC0yNTYSHAoLZmxvYXRfZmllbGQYBSACKAI6By01MTIuMTMSGAoKYm9vbF9maWVsZBgGIAIoCDoEdHJ1ZRI1CgplbnVtX2ZpZWxkGAcgAigOMhAuc3BlYy5Qcm90bzJFbnVtOg9QUk9UTzJfRU5VTV9ZRVMSLwoNbWVzc2FnZV9maWVsZBgIIAIoCzIYLnNwZWMuUHJvdG8yQ2hpbGRNZXNzYWdlOgIYASLPAgoVUHJvdG8yRGVmYXVsdHNNZXNzYWdlEiEKDHN0cmluZ19maWVsZBgBIAEoCToLaGVsbG8gIiAqLyASOgoLYnl0ZXNfZmllbGQYAiABKAw6JVwwMDB4XFx4XCJ4XCdBQUFBQUFcMDEwXDAxNFxuXHJcdFwwMTMSGAoLaW50MzJfZmllbGQYAyABKAU6AzEyOBIZCgtpbnQ2NF9maWVsZBgEIAEoAzoELTI1NhIcCgtmbG9hdF9maWVsZBgFIAEoAjoHLTUxMi4xMxIYCgpib29sX2ZpZWxkGAYgASgIOgR0cnVlEjUKCmVudW1fZmllbGQYByABKA4yEC5zcGVjLlByb3RvMkVudW06D1BST1RPMl9FTlVNX1lFUxIvCg1tZXNzYWdlX2ZpZWxkGAggASgLMhguc3BlYy5Qcm90bzJDaGlsZE1lc3NhZ2U6AhgBIi4KElByb3RvMkNoaWxkTWVzc2FnZRIUCgxzdHJpbmdfZmllbGQYASABKAk6AhgBIsoEChNQcm90bzJHcm91cHNNZXNzYWdlEi4KBWdyb3VwGAEgASgKMh8uc3BlYy5Qcm90bzJHcm91cHNNZXNzYWdlLkdyb3VwEj4KDXJlcGVhdGVkZ3JvdXAYAiADKAoyJy5zcGVjLlByb3RvMkdyb3Vwc01lc3NhZ2UuUmVwZWF0ZWRHcm91cBI6CgpvbmVvZmdyb3VwGAMgASgKMiQuc3BlYy5Qcm90bzJHcm91cHNNZXNzYWdlLk9uZW9mR3JvdXBIABJCChltZXNzYWdlX2ZpZWxkX3VzaW5nX2dyb3VwGAQgASgLMh8uc3BlYy5Qcm90bzJHcm91cHNNZXNzYWdlLkdyb3VwElUKIG1lc3NhZ2VfZmllbGRfdXNpbmdfbmVzdGVkX2dyb3VwGAUgASgLMisuc3BlYy5Qcm90bzJHcm91cHNNZXNzYWdlLkdyb3VwLk5lc3RlZEdyb3VwGoMBCgVHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBRJACgtuZXN0ZWRncm91cBgCIAEoCjIrLnNwZWMuUHJvdG8yR3JvdXBzTWVzc2FnZS5Hcm91cC5OZXN0ZWRHcm91cBojCgtOZXN0ZWRHcm91cBIUCgxzdHJpbmdfZmllbGQYASABKAkaKAoNUmVwZWF0ZWRHcm91cBITCgtpbnQzMl9maWVsZBgBIAEoBToCGAEaJAoKT25lb2ZHcm91cBISCgpib29sX2ZpZWxkGAEgASgIOgIYAToCGAFCEgoQb25lb2Zfd2l0aF9ncm91cCo1CgpQcm90bzJFbnVtEhMKD1BST1RPMl9FTlVNX1lFUxABEhIKDlBST1RPMl9FTlVNX05PEAIqUwoSUHJvdG8yRW51bVdpdGhaZXJvEh4KGlBST1RPMl9FTlVNX1dJVEhfWkVST19aRVJPEAASHQoZUFJPVE8yX0VOVU1fV0lUSF9aRVJPX09ORRABQiFaH2dpdGh1Yi5jb20vYnVmYnVpbGQvcHJvdG9idWYtZXM", [fileDesc_google_protobuf_wrappers]);

// Describes the message spec.Proto2Message. Use `create(Proto2MessageDesc)` to create a new Proto2Message.
export const Proto2MessageDesc = messageDesc(fileDesc_extra_proto2, 0);

// Describes the message spec.Proto2Message.RequiredGroup. Use `create(Proto2Message_RequiredGroupDesc)` to create a new Proto2Message_RequiredGroup.
export const Proto2Message_RequiredGroupDesc = messageDesc(fileDesc_extra_proto2, 0, 0);

// Describes the message spec.Proto2Message.RequiredDefaultGroup. Use `create(Proto2Message_RequiredDefaultGroupDesc)` to create a new Proto2Message_RequiredDefaultGroup.
export const Proto2Message_RequiredDefaultGroupDesc = messageDesc(fileDesc_extra_proto2, 0, 1);

// Describes the message spec.Proto2Message.OptionalGroup. Use `create(Proto2Message_OptionalGroupDesc)` to create a new Proto2Message_OptionalGroup.
export const Proto2Message_OptionalGroupDesc = messageDesc(fileDesc_extra_proto2, 0, 2);

// Describes the message spec.Proto2Message.OptionalDefaultGroup. Use `create(Proto2Message_OptionalDefaultGroupDesc)` to create a new Proto2Message_OptionalDefaultGroup.
export const Proto2Message_OptionalDefaultGroupDesc = messageDesc(fileDesc_extra_proto2, 0, 3);

// Describes the message spec.Proto2Message.RepeatedGroup. Use `create(Proto2Message_RepeatedGroupDesc)` to create a new Proto2Message_RepeatedGroup.
export const Proto2Message_RepeatedGroupDesc = messageDesc(fileDesc_extra_proto2, 0, 4);

// Describes the message spec.Proto2Message.OneofGroup. Use `create(Proto2Message_OneofGroupDesc)` to create a new Proto2Message_OneofGroup.
export const Proto2Message_OneofGroupDesc = messageDesc(fileDesc_extra_proto2, 0, 5);

// Describes the message spec.Proto2RepeatedMessage. Use `create(Proto2RepeatedMessageDesc)` to create a new Proto2RepeatedMessage.
export const Proto2RepeatedMessageDesc = messageDesc(fileDesc_extra_proto2, 1);

// Describes the message spec.Proto2RepeatedMessage.RepeatedGroup. Use `create(Proto2RepeatedMessage_RepeatedGroupDesc)` to create a new Proto2RepeatedMessage_RepeatedGroup.
export const Proto2RepeatedMessage_RepeatedGroupDesc = messageDesc(fileDesc_extra_proto2, 1, 0);

// Describes the message spec.Proto2OneofMessage. Use `create(Proto2OneofMessageDesc)` to create a new Proto2OneofMessage.
export const Proto2OneofMessageDesc = messageDesc(fileDesc_extra_proto2, 2);

// Describes the message spec.Proto2OneofMessage.RepeatedGroup. Use `create(Proto2OneofMessage_RepeatedGroupDesc)` to create a new Proto2OneofMessage_RepeatedGroup.
export const Proto2OneofMessage_RepeatedGroupDesc = messageDesc(fileDesc_extra_proto2, 2, 0);

// Describes the message spec.Proto2PackedMessage. Use `create(Proto2PackedMessageDesc)` to create a new Proto2PackedMessage.
export const Proto2PackedMessageDesc = messageDesc(fileDesc_extra_proto2, 3);

// Describes the message spec.Proto2UnpackedMessage. Use `create(Proto2UnpackedMessageDesc)` to create a new Proto2UnpackedMessage.
export const Proto2UnpackedMessageDesc = messageDesc(fileDesc_extra_proto2, 4);

// Describes the message spec.Proto2UnspecifiedPackedMessage. Use `create(Proto2UnspecifiedPackedMessageDesc)` to create a new Proto2UnspecifiedPackedMessage.
export const Proto2UnspecifiedPackedMessageDesc = messageDesc(fileDesc_extra_proto2, 5);

// Describes the message spec.Proto2OptionalMessage. Use `create(Proto2OptionalMessageDesc)` to create a new Proto2OptionalMessage.
export const Proto2OptionalMessageDesc = messageDesc(fileDesc_extra_proto2, 6);

// Describes the message spec.Proto2RequiredMessage. Use `create(Proto2RequiredMessageDesc)` to create a new Proto2RequiredMessage.
export const Proto2RequiredMessageDesc = messageDesc(fileDesc_extra_proto2, 7);

// Describes the message spec.Proto2RequiredDefaultsMessage. Use `create(Proto2RequiredDefaultsMessageDesc)` to create a new Proto2RequiredDefaultsMessage.
export const Proto2RequiredDefaultsMessageDesc = messageDesc(fileDesc_extra_proto2, 8);

// Describes the message spec.Proto2DefaultsMessage. Use `create(Proto2DefaultsMessageDesc)` to create a new Proto2DefaultsMessage.
export const Proto2DefaultsMessageDesc = messageDesc(fileDesc_extra_proto2, 9);

// Describes the message spec.Proto2ChildMessage. Use `create(Proto2ChildMessageDesc)` to create a new Proto2ChildMessage.
export const Proto2ChildMessageDesc = messageDesc(fileDesc_extra_proto2, 10);

// Describes the message spec.Proto2GroupsMessage. Use `create(Proto2GroupsMessageDesc)` to create a new Proto2GroupsMessage.
export const Proto2GroupsMessageDesc = messageDesc(fileDesc_extra_proto2, 11);

// Describes the message spec.Proto2GroupsMessage.Group. Use `create(Proto2GroupsMessage_GroupDesc)` to create a new Proto2GroupsMessage_Group.
export const Proto2GroupsMessage_GroupDesc = messageDesc(fileDesc_extra_proto2, 11, 0);

// Describes the message spec.Proto2GroupsMessage.Group.NestedGroup. Use `create(Proto2GroupsMessage_Group_NestedGroupDesc)` to create a new Proto2GroupsMessage_Group_NestedGroup.
export const Proto2GroupsMessage_Group_NestedGroupDesc = messageDesc(fileDesc_extra_proto2, 11, 0, 0);

// Describes the message spec.Proto2GroupsMessage.RepeatedGroup. Use `create(Proto2GroupsMessage_RepeatedGroupDesc)` to create a new Proto2GroupsMessage_RepeatedGroup.
export const Proto2GroupsMessage_RepeatedGroupDesc = messageDesc(fileDesc_extra_proto2, 11, 1);

// Describes the message spec.Proto2GroupsMessage.OneofGroup. Use `create(Proto2GroupsMessage_OneofGroupDesc)` to create a new Proto2GroupsMessage_OneofGroup.
export const Proto2GroupsMessage_OneofGroupDesc = messageDesc(fileDesc_extra_proto2, 11, 2);

// Describes the enum spec.Proto2Enum.
export const Proto2EnumDesc = enumDesc(fileDesc_extra_proto2, 0);

/**
 * @generated from enum spec.Proto2Enum
 */
export const Proto2Enum = tsEnum(Proto2EnumDesc);

// Describes the enum spec.Proto2EnumWithZero.
export const Proto2EnumWithZeroDesc = enumDesc(fileDesc_extra_proto2, 1);

/**
 * First enum value must be 0 when used as map value type
 *
 * @generated from enum spec.Proto2EnumWithZero
 */
export const Proto2EnumWithZero = tsEnum(Proto2EnumWithZeroDesc);

