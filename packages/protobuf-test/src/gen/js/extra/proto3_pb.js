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

// @generated by protoc-gen-es v2.2.2 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/proto3.proto (package spec, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_struct, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file extra/proto3.proto.
 */
export const file_extra_proto3 = /*@__PURE__*/
  fileDesc("ChJleHRyYS9wcm90bzMucHJvdG8SBHNwZWMi0x0KDVByb3RvM01lc3NhZ2USHQoVc2luZ3VsYXJfc3RyaW5nX2ZpZWxkGAEgASgJEhwKFHNpbmd1bGFyX2J5dGVzX2ZpZWxkGAIgASgMEhwKFHNpbmd1bGFyX2ludDMyX2ZpZWxkGAMgASgFEhwKFHNpbmd1bGFyX2ludDY0X2ZpZWxkGAQgASgDEioKHnNpbmd1bGFyX2ludDY0X2pzX251bWJlcl9maWVsZBhnIAEoA0ICMAISKgoec2luZ3VsYXJfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGYgASgDQgIwARIcChRzaW5ndWxhcl9mbG9hdF9maWVsZBgFIAEoAhIbChNzaW5ndWxhcl9ib29sX2ZpZWxkGAYgASgIEi0KE3Npbmd1bGFyX2VudW1fZmllbGQYByABKA4yEC5zcGVjLlByb3RvM0VudW0SMwoWc2luZ3VsYXJfbWVzc2FnZV9maWVsZBgIIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZRJECh1zaW5ndWxhcl93cmFwcGVkX3VpbnQzMl9maWVsZBjTASABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSNwoVc2luZ3VsYXJfc3RydWN0X2ZpZWxkGNYBIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSIgoVb3B0aW9uYWxfc3RyaW5nX2ZpZWxkGAkgASgJSAGIAQESIQoUb3B0aW9uYWxfYnl0ZXNfZmllbGQYCiABKAxIAogBARIhChRvcHRpb25hbF9pbnQzMl9maWVsZBgLIAEoBUgDiAEBEiEKFG9wdGlvbmFsX2ludDY0X2ZpZWxkGAwgASgDSASIAQESLwoeb3B0aW9uYWxfaW50NjRfanNfbnVtYmVyX2ZpZWxkGGogASgDQgIwAkgFiAEBEi8KHm9wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZBhpIAEoA0ICMAFIBogBARIhChRvcHRpb25hbF9mbG9hdF9maWVsZBgNIAEoAkgHiAEBEiAKE29wdGlvbmFsX2Jvb2xfZmllbGQYDiABKAhICIgBARIyChNvcHRpb25hbF9lbnVtX2ZpZWxkGA8gASgOMhAuc3BlYy5Qcm90bzNFbnVtSAmIAQESOAoWb3B0aW9uYWxfbWVzc2FnZV9maWVsZBgQIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZUgKiAEBEkkKHW9wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkGNQBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZUgLiAEBEjwKFW9wdGlvbmFsX3N0cnVjdF9maWVsZBjXASABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0SAyIAQESHQoVcmVwZWF0ZWRfc3RyaW5nX2ZpZWxkGBEgAygJEhwKFHJlcGVhdGVkX2J5dGVzX2ZpZWxkGBIgAygMEhwKFHJlcGVhdGVkX2ludDMyX2ZpZWxkGBMgAygFEhwKFHJlcGVhdGVkX2ludDY0X2ZpZWxkGBQgAygDEioKHnJlcGVhdGVkX2ludDY0X2pzX251bWJlcl9maWVsZBhtIAMoA0ICMAISKgoecmVwZWF0ZWRfaW50NjRfanNfc3RyaW5nX2ZpZWxkGGwgAygDQgIwARIcChRyZXBlYXRlZF9mbG9hdF9maWVsZBgVIAMoAhIbChNyZXBlYXRlZF9ib29sX2ZpZWxkGBYgAygIEi0KE3JlcGVhdGVkX2VudW1fZmllbGQYFyADKA4yEC5zcGVjLlByb3RvM0VudW0SMwoWcmVwZWF0ZWRfbWVzc2FnZV9maWVsZBgYIAMoCzITLnNwZWMuUHJvdG8zTWVzc2FnZRJECh1yZXBlYXRlZF93cmFwcGVkX3VpbnQzMl9maWVsZBjVASADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUSNwoVcmVwZWF0ZWRfc3RydWN0X2ZpZWxkGNgBIAMoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSHwoTcGFja2VkX2RvdWJsZV9maWVsZBgZIAMoAUICEAESHwoTcGFja2VkX3VpbnQzMl9maWVsZBgaIAMoDUICEAESHwoTcGFja2VkX3VpbnQ2NF9maWVsZBgbIAMoBEICEAESIQoVdW5wYWNrZWRfZG91YmxlX2ZpZWxkGBwgAygBQgIQABIhChV1bnBhY2tlZF91aW50MzJfZmllbGQYHSADKA1CAhAAEiEKFXVucGFja2VkX3VpbnQ2NF9maWVsZBgeIAMoBEICEAASHAoSb25lb2Zfc3RyaW5nX2ZpZWxkGB8gASgJSAASGwoRb25lb2ZfYnl0ZXNfZmllbGQYICABKAxIABIbChFvbmVvZl9pbnQzMl9maWVsZBghIAEoBUgAEhsKEW9uZW9mX2ludDY0X2ZpZWxkGCIgASgDSAASKQobb25lb2ZfaW50NjRfanNfbnVtYmVyX2ZpZWxkGHAgASgDQgIwAkgAEikKG29uZW9mX2ludDY0X2pzX3N0cmluZ19maWVsZBhvIAEoA0ICMAFIABIbChFvbmVvZl9mbG9hdF9maWVsZBgjIAEoAkgAEhoKEG9uZW9mX2Jvb2xfZmllbGQYJCABKAhIABIsChBvbmVvZl9lbnVtX2ZpZWxkGCUgASgOMhAuc3BlYy5Qcm90bzNFbnVtSAASMgoTb25lb2ZfbWVzc2FnZV9maWVsZBgmIAEoCzITLnNwZWMuUHJvdG8zTWVzc2FnZUgAEkMKGm9uZW9mX3dyYXBwZWRfdWludDMyX2ZpZWxkGMwBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZUgAEjYKEm9uZW9mX3N0cnVjdF9maWVsZBjZASABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0SAASTgoXbWFwX3N0cmluZ19zdHJpbmdfZmllbGQYJyADKAsyLS5zcGVjLlByb3RvM01lc3NhZ2UuTWFwU3RyaW5nU3RyaW5nRmllbGRFbnRyeRJKChVtYXBfaW50MzJfaW50MzJfZmllbGQYKCADKAsyKy5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJJbnQzMkZpZWxkRW50cnkSRgoTbWFwX2Jvb2xfYm9vbF9maWVsZBgpIAMoCzIpLnNwZWMuUHJvdG8zTWVzc2FnZS5NYXBCb29sQm9vbEZpZWxkRW50cnkSSgoVbWFwX2ludDY0X2ludDY0X2ZpZWxkGCogAygLMisuc3BlYy5Qcm90bzNNZXNzYWdlLk1hcEludDY0SW50NjRGaWVsZEVudHJ5EkgKFG1hcF9pbnQzMl9lbnVtX2ZpZWxkGCsgAygLMiouc3BlYy5Qcm90bzNNZXNzYWdlLk1hcEludDMyRW51bUZpZWxkRW50cnkSTgoXbWFwX2ludDMyX21lc3NhZ2VfZmllbGQYLCADKAsyLS5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJNZXNzYWdlRmllbGRFbnRyeRJcCh5tYXBfaW50MzJfd3JhcHBlZF91aW50MzJfZmllbGQYzQEgAygLMjMuc3BlYy5Qcm90bzNNZXNzYWdlLk1hcEludDMyV3JhcHBlZFVpbnQzMkZpZWxkRW50cnkSTQoWbWFwX2ludDMyX3N0cnVjdF9maWVsZBjaASADKAsyLC5zcGVjLlByb3RvM01lc3NhZ2UuTWFwSW50MzJTdHJ1Y3RGaWVsZEVudHJ5GjsKGU1hcFN0cmluZ1N0cmluZ0ZpZWxkRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARo5ChdNYXBJbnQzMkludDMyRmllbGRFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAU6AjgBGjcKFU1hcEJvb2xCb29sRmllbGRFbnRyeRILCgNrZXkYASABKAgSDQoFdmFsdWUYAiABKAg6AjgBGjkKF01hcEludDY0SW50NjRGaWVsZEVudHJ5EgsKA2tleRgBIAEoAxINCgV2YWx1ZRgCIAEoAzoCOAEaSgoWTWFwSW50MzJFbnVtRmllbGRFbnRyeRILCgNrZXkYASABKAUSHwoFdmFsdWUYAiABKA4yEC5zcGVjLlByb3RvM0VudW06AjgBGlAKGU1hcEludDMyTWVzc2FnZUZpZWxkRW50cnkSCwoDa2V5GAEgASgFEiIKBXZhbHVlGAIgASgLMhMuc3BlYy5Qcm90bzNNZXNzYWdlOgI4ARpfCh9NYXBJbnQzMldyYXBwZWRVaW50MzJGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRIrCgV2YWx1ZRgCIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZToCOAEaUwoYTWFwSW50MzJTdHJ1Y3RGaWVsZEVudHJ5EgsKA2tleRgBIAEoBRImCgV2YWx1ZRgCIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3Q6AjgBQggKBmVpdGhlckIYChZfb3B0aW9uYWxfc3RyaW5nX2ZpZWxkQhcKFV9vcHRpb25hbF9ieXRlc19maWVsZEIXChVfb3B0aW9uYWxfaW50MzJfZmllbGRCFwoVX29wdGlvbmFsX2ludDY0X2ZpZWxkQiEKH19vcHRpb25hbF9pbnQ2NF9qc19udW1iZXJfZmllbGRCIQofX29wdGlvbmFsX2ludDY0X2pzX3N0cmluZ19maWVsZEIXChVfb3B0aW9uYWxfZmxvYXRfZmllbGRCFgoUX29wdGlvbmFsX2Jvb2xfZmllbGRCFgoUX29wdGlvbmFsX2VudW1fZmllbGRCGQoXX29wdGlvbmFsX21lc3NhZ2VfZmllbGRCIAoeX29wdGlvbmFsX3dyYXBwZWRfdWludDMyX2ZpZWxkQhgKFl9vcHRpb25hbF9zdHJ1Y3RfZmllbGQqUgoKUHJvdG8zRW51bRIbChdQUk9UTzNfRU5VTV9VTlNQRUNJRklFRBAAEhMKD1BST1RPM19FTlVNX1lFUxABEhIKDlBST1RPM19FTlVNX05PEAJCIVofZ2l0aHViLmNvbS9idWZidWlsZC9wcm90b2J1Zi1lc2IGcHJvdG8z", [file_google_protobuf_wrappers, file_google_protobuf_struct]);

/**
 * Describes the message spec.Proto3Message.
 * Use `create(Proto3MessageSchema)` to create a new message.
 */
export const Proto3MessageSchema = /*@__PURE__*/
  messageDesc(file_extra_proto3, 0);

/**
 * Describes the enum spec.Proto3Enum.
 */
export const Proto3EnumSchema = /*@__PURE__*/
  enumDesc(file_extra_proto3, 0);

/**
 * @generated from enum spec.Proto3Enum
 */
export const Proto3Enum = /*@__PURE__*/
  tsEnum(Proto3EnumSchema);

