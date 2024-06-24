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

// LINT: ALLOW_GROUPS

// @generated by protoc-gen-es v2.0.0-beta.1 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/test_messages_proto2.proto (package protobuf_test_messages.proto2, syntax proto2)
/* eslint-disable */

import { enumDesc, extDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";

/**
 * Describes the file google/protobuf/test_messages_proto2.proto.
 */
export const file_google_protobuf_test_messages_proto2 = /*@__PURE__*/
  fileDesc("Cipnb29nbGUvcHJvdG9idWYvdGVzdF9tZXNzYWdlc19wcm90bzIucHJvdG8SHXByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yIpdAChJUZXN0QWxsVHlwZXNQcm90bzISFgoOb3B0aW9uYWxfaW50MzIYASABKAUSFgoOb3B0aW9uYWxfaW50NjQYAiABKAMSFwoPb3B0aW9uYWxfdWludDMyGAMgASgNEhcKD29wdGlvbmFsX3VpbnQ2NBgEIAEoBBIXCg9vcHRpb25hbF9zaW50MzIYBSABKBESFwoPb3B0aW9uYWxfc2ludDY0GAYgASgSEhgKEG9wdGlvbmFsX2ZpeGVkMzIYByABKAcSGAoQb3B0aW9uYWxfZml4ZWQ2NBgIIAEoBhIZChFvcHRpb25hbF9zZml4ZWQzMhgJIAEoDxIZChFvcHRpb25hbF9zZml4ZWQ2NBgKIAEoEBIWCg5vcHRpb25hbF9mbG9hdBgLIAEoAhIXCg9vcHRpb25hbF9kb3VibGUYDCABKAESFQoNb3B0aW9uYWxfYm9vbBgNIAEoCBIXCg9vcHRpb25hbF9zdHJpbmcYDiABKAkSFgoOb3B0aW9uYWxfYnl0ZXMYDyABKAwSYAoXb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UYEiABKAsyPy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTmVzdGVkTWVzc2FnZRJVChhvcHRpb25hbF9mb3JlaWduX21lc3NhZ2UYEyABKAsyMy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5Gb3JlaWduTWVzc2FnZVByb3RvMhJaChRvcHRpb25hbF9uZXN0ZWRfZW51bRgVIAEoDjI8LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5OZXN0ZWRFbnVtEk8KFW9wdGlvbmFsX2ZvcmVpZ25fZW51bRgWIAEoDjIwLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLkZvcmVpZ25FbnVtUHJvdG8yEiEKFW9wdGlvbmFsX3N0cmluZ19waWVjZRgYIAEoCUICCAISGQoNb3B0aW9uYWxfY29yZBgZIAEoCUICCAESTAoRcmVjdXJzaXZlX21lc3NhZ2UYGyABKAsyMS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzISFgoOcmVwZWF0ZWRfaW50MzIYHyADKAUSFgoOcmVwZWF0ZWRfaW50NjQYICADKAMSFwoPcmVwZWF0ZWRfdWludDMyGCEgAygNEhcKD3JlcGVhdGVkX3VpbnQ2NBgiIAMoBBIXCg9yZXBlYXRlZF9zaW50MzIYIyADKBESFwoPcmVwZWF0ZWRfc2ludDY0GCQgAygSEhgKEHJlcGVhdGVkX2ZpeGVkMzIYJSADKAcSGAoQcmVwZWF0ZWRfZml4ZWQ2NBgmIAMoBhIZChFyZXBlYXRlZF9zZml4ZWQzMhgnIAMoDxIZChFyZXBlYXRlZF9zZml4ZWQ2NBgoIAMoEBIWCg5yZXBlYXRlZF9mbG9hdBgpIAMoAhIXCg9yZXBlYXRlZF9kb3VibGUYKiADKAESFQoNcmVwZWF0ZWRfYm9vbBgrIAMoCBIXCg9yZXBlYXRlZF9zdHJpbmcYLCADKAkSFgoOcmVwZWF0ZWRfYnl0ZXMYLSADKAwSYAoXcmVwZWF0ZWRfbmVzdGVkX21lc3NhZ2UYMCADKAsyPy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTmVzdGVkTWVzc2FnZRJVChhyZXBlYXRlZF9mb3JlaWduX21lc3NhZ2UYMSADKAsyMy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5Gb3JlaWduTWVzc2FnZVByb3RvMhJaChRyZXBlYXRlZF9uZXN0ZWRfZW51bRgzIAMoDjI8LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5OZXN0ZWRFbnVtEk8KFXJlcGVhdGVkX2ZvcmVpZ25fZW51bRg0IAMoDjIwLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLkZvcmVpZ25FbnVtUHJvdG8yEiEKFXJlcGVhdGVkX3N0cmluZ19waWVjZRg2IAMoCUICCAISGQoNcmVwZWF0ZWRfY29yZBg3IAMoCUICCAESGAoMcGFja2VkX2ludDMyGEsgAygFQgIQARIYCgxwYWNrZWRfaW50NjQYTCADKANCAhABEhkKDXBhY2tlZF91aW50MzIYTSADKA1CAhABEhkKDXBhY2tlZF91aW50NjQYTiADKARCAhABEhkKDXBhY2tlZF9zaW50MzIYTyADKBFCAhABEhkKDXBhY2tlZF9zaW50NjQYUCADKBJCAhABEhoKDnBhY2tlZF9maXhlZDMyGFEgAygHQgIQARIaCg5wYWNrZWRfZml4ZWQ2NBhSIAMoBkICEAESGwoPcGFja2VkX3NmaXhlZDMyGFMgAygPQgIQARIbCg9wYWNrZWRfc2ZpeGVkNjQYVCADKBBCAhABEhgKDHBhY2tlZF9mbG9hdBhVIAMoAkICEAESGQoNcGFja2VkX2RvdWJsZRhWIAMoAUICEAESFwoLcGFja2VkX2Jvb2wYVyADKAhCAhABElwKEnBhY2tlZF9uZXN0ZWRfZW51bRhYIAMoDjI8LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5OZXN0ZWRFbnVtQgIQARIaCg51bnBhY2tlZF9pbnQzMhhZIAMoBUICEAASGgoOdW5wYWNrZWRfaW50NjQYWiADKANCAhAAEhsKD3VucGFja2VkX3VpbnQzMhhbIAMoDUICEAASGwoPdW5wYWNrZWRfdWludDY0GFwgAygEQgIQABIbCg91bnBhY2tlZF9zaW50MzIYXSADKBFCAhAAEhsKD3VucGFja2VkX3NpbnQ2NBheIAMoEkICEAASHAoQdW5wYWNrZWRfZml4ZWQzMhhfIAMoB0ICEAASHAoQdW5wYWNrZWRfZml4ZWQ2NBhgIAMoBkICEAASHQoRdW5wYWNrZWRfc2ZpeGVkMzIYYSADKA9CAhAAEh0KEXVucGFja2VkX3NmaXhlZDY0GGIgAygQQgIQABIaCg51bnBhY2tlZF9mbG9hdBhjIAMoAkICEAASGwoPdW5wYWNrZWRfZG91YmxlGGQgAygBQgIQABIZCg11bnBhY2tlZF9ib29sGGUgAygIQgIQABJeChR1bnBhY2tlZF9uZXN0ZWRfZW51bRhmIAMoDjI8LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5OZXN0ZWRFbnVtQgIQABJdCg9tYXBfaW50MzJfaW50MzIYOCADKAsyRC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwSW50MzJJbnQzMkVudHJ5El0KD21hcF9pbnQ2NF9pbnQ2NBg5IAMoCzJELnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NYXBJbnQ2NEludDY0RW50cnkSYQoRbWFwX3VpbnQzMl91aW50MzIYOiADKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwVWludDMyVWludDMyRW50cnkSYQoRbWFwX3VpbnQ2NF91aW50NjQYOyADKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwVWludDY0VWludDY0RW50cnkSYQoRbWFwX3NpbnQzMl9zaW50MzIYPCADKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwU2ludDMyU2ludDMyRW50cnkSYQoRbWFwX3NpbnQ2NF9zaW50NjQYPSADKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwU2ludDY0U2ludDY0RW50cnkSZQoTbWFwX2ZpeGVkMzJfZml4ZWQzMhg+IAMoCzJILnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NYXBGaXhlZDMyRml4ZWQzMkVudHJ5EmUKE21hcF9maXhlZDY0X2ZpeGVkNjQYPyADKAsySC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwRml4ZWQ2NEZpeGVkNjRFbnRyeRJpChVtYXBfc2ZpeGVkMzJfc2ZpeGVkMzIYQCADKAsySi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5EmkKFW1hcF9zZml4ZWQ2NF9zZml4ZWQ2NBhBIAMoCzJKLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NYXBTZml4ZWQ2NFNmaXhlZDY0RW50cnkSXQoPbWFwX2ludDMyX2Zsb2F0GEIgAygLMkQucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFR5cGVzUHJvdG8yLk1hcEludDMyRmxvYXRFbnRyeRJfChBtYXBfaW50MzJfZG91YmxlGEMgAygLMkUucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFR5cGVzUHJvdG8yLk1hcEludDMyRG91YmxlRW50cnkSWQoNbWFwX2Jvb2xfYm9vbBhEIAMoCzJCLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NYXBCb29sQm9vbEVudHJ5EmEKEW1hcF9zdHJpbmdfc3RyaW5nGEUgAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFR5cGVzUHJvdG8yLk1hcFN0cmluZ1N0cmluZ0VudHJ5El8KEG1hcF9zdHJpbmdfYnl0ZXMYRiADKAsyRS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwU3RyaW5nQnl0ZXNFbnRyeRJwChltYXBfc3RyaW5nX25lc3RlZF9tZXNzYWdlGEcgAygLMk0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFR5cGVzUHJvdG8yLk1hcFN0cmluZ05lc3RlZE1lc3NhZ2VFbnRyeRJyChptYXBfc3RyaW5nX2ZvcmVpZ25fbWVzc2FnZRhIIAMoCzJOLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NYXBTdHJpbmdGb3JlaWduTWVzc2FnZUVudHJ5EmoKFm1hcF9zdHJpbmdfbmVzdGVkX2VudW0YSSADKAsySi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTWFwU3RyaW5nTmVzdGVkRW51bUVudHJ5EmwKF21hcF9zdHJpbmdfZm9yZWlnbl9lbnVtGEogAygLMksucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFR5cGVzUHJvdG8yLk1hcFN0cmluZ0ZvcmVpZ25FbnVtRW50cnkSFgoMb25lb2ZfdWludDMyGG8gASgNSAASXwoUb25lb2ZfbmVzdGVkX21lc3NhZ2UYcCABKAsyPy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTmVzdGVkTWVzc2FnZUgAEhYKDG9uZW9mX3N0cmluZxhxIAEoCUgAEhUKC29uZW9mX2J5dGVzGHIgASgMSAASFAoKb25lb2ZfYm9vbBhzIAEoCEgAEhYKDG9uZW9mX3VpbnQ2NBh0IAEoBEgAEhUKC29uZW9mX2Zsb2F0GHUgASgCSAASFgoMb25lb2ZfZG91YmxlGHYgASgBSAASUgoKb25lb2ZfZW51bRh3IAEoDjI8LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5OZXN0ZWRFbnVtSAASRQoEZGF0YRjJASABKAoyNi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuRGF0YRJjChNtdWx0aXdvcmRncm91cGZpZWxkGMwBIAEoCjJFLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NdWx0aVdvcmRHcm91cEZpZWxkEiIKDWRlZmF1bHRfaW50MzIY8QEgASgFOgotMTIzNDU2Nzg5EiwKDWRlZmF1bHRfaW50NjQY8gEgASgDOhQtOTEyMzQ1Njc4OTEyMzQ1Njc4ORIjCg5kZWZhdWx0X3VpbnQzMhjzASABKA06CjIxMjM0NTY3ODkSLQoOZGVmYXVsdF91aW50NjQY9AEgASgEOhQxMDEyMzQ1Njc4OTEyMzQ1Njc4ORIjCg5kZWZhdWx0X3NpbnQzMhj1ASABKBE6Ci0xMjM0NTY3ODkSLQoOZGVmYXVsdF9zaW50NjQY9gEgASgSOhQtOTEyMzQ1Njc4OTEyMzQ1Njc4ORIkCg9kZWZhdWx0X2ZpeGVkMzIY9wEgASgHOgoyMTIzNDU2Nzg5Ei4KD2RlZmF1bHRfZml4ZWQ2NBj4ASABKAY6FDEwMTIzNDU2Nzg5MTIzNDU2Nzg5EiUKEGRlZmF1bHRfc2ZpeGVkMzIY+QEgASgPOgotMTIzNDU2Nzg5Ei8KEGRlZmF1bHRfc2ZpeGVkNjQY+gEgASgQOhQtOTEyMzQ1Njc4OTEyMzQ1Njc4ORIdCg1kZWZhdWx0X2Zsb2F0GPsBIAEoAjoFOWUrMDkSHgoOZGVmYXVsdF9kb3VibGUY/AEgASgBOgU3ZSsyMhIbCgxkZWZhdWx0X2Jvb2wY/QEgASgIOgR0cnVlEiAKDmRlZmF1bHRfc3RyaW5nGP4BIAEoCToHUm9zZWJ1ZBIeCg1kZWZhdWx0X2J5dGVzGP8BIAEoDDoGam9zaHVhEhMKCmZpZWxkbmFtZTEYkQMgASgFEhQKC2ZpZWxkX25hbWUyGJIDIAEoBRIVCgxfZmllbGRfbmFtZTMYkwMgASgFEhYKDWZpZWxkX19uYW1lNF8YlAMgASgFEhQKC2ZpZWxkMG5hbWU1GJUDIAEoBRIWCg1maWVsZF8wX25hbWU2GJYDIAEoBRITCgpmaWVsZE5hbWU3GJcDIAEoBRITCgpGaWVsZE5hbWU4GJgDIAEoBRIUCgtmaWVsZF9OYW1lORiZAyABKAUSFQoMRmllbGRfTmFtZTEwGJoDIAEoBRIVCgxGSUVMRF9OQU1FMTEYmwMgASgFEhUKDEZJRUxEX25hbWUxMhicAyABKAUSFwoOX19maWVsZF9uYW1lMTMYnQMgASgFEhcKDl9fRmllbGRfbmFtZTE0GJ4DIAEoBRIWCg1maWVsZF9fbmFtZTE1GJ8DIAEoBRIWCg1maWVsZF9fTmFtZTE2GKADIAEoBRIXCg5maWVsZF9uYW1lMTdfXxihAyABKAUSFwoORmllbGRfbmFtZTE4X18YogMgASgFGmIKDU5lc3RlZE1lc3NhZ2USCQoBYRgBIAEoBRJGCgtjb3JlY3Vyc2l2ZRgCIAEoCzIxLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMho0ChJNYXBJbnQzMkludDMyRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ARo0ChJNYXBJbnQ2NEludDY0RW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARo2ChRNYXBVaW50MzJVaW50MzJFbnRyeRILCgNrZXkYASABKA0SDQoFdmFsdWUYAiABKA06AjgBGjYKFE1hcFVpbnQ2NFVpbnQ2NEVudHJ5EgsKA2tleRgBIAEoBBINCgV2YWx1ZRgCIAEoBDoCOAEaNgoUTWFwU2ludDMyU2ludDMyRW50cnkSCwoDa2V5GAEgASgREg0KBXZhbHVlGAIgASgROgI4ARo2ChRNYXBTaW50NjRTaW50NjRFbnRyeRILCgNrZXkYASABKBISDQoFdmFsdWUYAiABKBI6AjgBGjgKFk1hcEZpeGVkMzJGaXhlZDMyRW50cnkSCwoDa2V5GAEgASgHEg0KBXZhbHVlGAIgASgHOgI4ARo4ChZNYXBGaXhlZDY0Rml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhINCgV2YWx1ZRgCIAEoBjoCOAEaOgoYTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoDxINCgV2YWx1ZRgCIAEoDzoCOAEaOgoYTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoEBINCgV2YWx1ZRgCIAEoEDoCOAEaNAoSTWFwSW50MzJGbG9hdEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoAjoCOAEaNQoTTWFwSW50MzJEb3VibGVFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAE6AjgBGjIKEE1hcEJvb2xCb29sRW50cnkSCwoDa2V5GAEgASgIEg0KBXZhbHVlGAIgASgIOgI4ARo2ChRNYXBTdHJpbmdTdHJpbmdFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjUKE01hcFN0cmluZ0J5dGVzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgMOgI4ARp+ChtNYXBTdHJpbmdOZXN0ZWRNZXNzYWdlRW50cnkSCwoDa2V5GAEgASgJEk4KBXZhbHVlGAIgASgLMj8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFR5cGVzUHJvdG8yLk5lc3RlZE1lc3NhZ2U6AjgBGnMKHE1hcFN0cmluZ0ZvcmVpZ25NZXNzYWdlRW50cnkSCwoDa2V5GAEgASgJEkIKBXZhbHVlGAIgASgLMjMucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuRm9yZWlnbk1lc3NhZ2VQcm90bzI6AjgBGngKGE1hcFN0cmluZ05lc3RlZEVudW1FbnRyeRILCgNrZXkYASABKAkSSwoFdmFsdWUYAiABKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIuTmVzdGVkRW51bToCOAEabQoZTWFwU3RyaW5nRm9yZWlnbkVudW1FbnRyeRILCgNrZXkYASABKAkSPwoFdmFsdWUYAiABKA4yMC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5Gb3JlaWduRW51bVByb3RvMjoCOAEaMwoERGF0YRIUCgtncm91cF9pbnQzMhjKASABKAUSFQoMZ3JvdXBfdWludDMyGMsBIAEoDRpCChNNdWx0aVdvcmRHcm91cEZpZWxkEhQKC2dyb3VwX2ludDMyGM0BIAEoBRIVCgxncm91cF91aW50MzIYzgEgASgNGiEKEU1lc3NhZ2VTZXRDb3JyZWN0KggIBBD/////BzoCCAEa9QEKG01lc3NhZ2VTZXRDb3JyZWN0RXh0ZW5zaW9uMRILCgNzdHIYGSABKAkyyAEKFW1lc3NhZ2Vfc2V0X2V4dGVuc2lvbhJDLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NZXNzYWdlU2V0Q29ycmVjdBj5u14gASgLMk0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFR5cGVzUHJvdG8yLk1lc3NhZ2VTZXRDb3JyZWN0RXh0ZW5zaW9uMVITbWVzc2FnZVNldEV4dGVuc2lvbhr0AQobTWVzc2FnZVNldENvcnJlY3RFeHRlbnNpb24yEgkKAWkYCSABKAUyyQEKFW1lc3NhZ2Vfc2V0X2V4dGVuc2lvbhJDLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NZXNzYWdlU2V0Q29ycmVjdBiQs/wBIAEoCzJNLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxUeXBlc1Byb3RvMi5NZXNzYWdlU2V0Q29ycmVjdEV4dGVuc2lvbjJSE21lc3NhZ2VTZXRFeHRlbnNpb24iOQoKTmVzdGVkRW51bRIHCgNGT08QABIHCgNCQVIQARIHCgNCQVoQAhIQCgNORUcQ////////////ASoFCHgQyQFCDQoLb25lb2ZfZmllbGRKBgjoBxCQTiIhChRGb3JlaWduTWVzc2FnZVByb3RvMhIJCgFjGAEgASgFIjcKCkdyb3VwRmllbGQSEwoLZ3JvdXBfaW50MzIYeiABKAUSFAoMZ3JvdXBfdWludDMyGHsgASgNIsECChVVbmtub3duVG9UZXN0QWxsVHlwZXMSFwoOb3B0aW9uYWxfaW50MzIY6QcgASgFEhgKD29wdGlvbmFsX3N0cmluZxjqByABKAkSTAoObmVzdGVkX21lc3NhZ2UY6wcgASgLMjMucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuRm9yZWlnbk1lc3NhZ2VQcm90bzISWgoNb3B0aW9uYWxncm91cBjsByABKAoyQi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5Vbmtub3duVG9UZXN0QWxsVHlwZXMuT3B0aW9uYWxHcm91cBIWCg1vcHRpb25hbF9ib29sGO4HIAEoCBIXCg5yZXBlYXRlZF9pbnQzMhjzByADKAUaGgoNT3B0aW9uYWxHcm91cBIJCgFhGAEgASgFIhYKFE51bGxIeXBvdGhlc2lzUHJvdG8yIi8KDkVudW1Pbmx5UHJvdG8yIh0KBEJvb2wSCgoGa0ZhbHNlEAASCQoFa1RydWUQASIfCg9PbmVTdHJpbmdQcm90bzISDAoEZGF0YRgBIAEoCSJGChFQcm90b1dpdGhLZXl3b3JkcxIOCgZpbmxpbmUYASABKAUSDwoHY29uY2VwdBgCIAEoCRIQCghyZXF1aXJlcxgDIAMoCSKIFAoaVGVzdEFsbFJlcXVpcmVkVHlwZXNQcm90bzISFgoOcmVxdWlyZWRfaW50MzIYASACKAUSFgoOcmVxdWlyZWRfaW50NjQYAiACKAMSFwoPcmVxdWlyZWRfdWludDMyGAMgAigNEhcKD3JlcXVpcmVkX3VpbnQ2NBgEIAIoBBIXCg9yZXF1aXJlZF9zaW50MzIYBSACKBESFwoPcmVxdWlyZWRfc2ludDY0GAYgAigSEhgKEHJlcXVpcmVkX2ZpeGVkMzIYByACKAcSGAoQcmVxdWlyZWRfZml4ZWQ2NBgIIAIoBhIZChFyZXF1aXJlZF9zZml4ZWQzMhgJIAIoDxIZChFyZXF1aXJlZF9zZml4ZWQ2NBgKIAIoEBIWCg5yZXF1aXJlZF9mbG9hdBgLIAIoAhIXCg9yZXF1aXJlZF9kb3VibGUYDCACKAESFQoNcmVxdWlyZWRfYm9vbBgNIAIoCBIXCg9yZXF1aXJlZF9zdHJpbmcYDiACKAkSFgoOcmVxdWlyZWRfYnl0ZXMYDyACKAwSaAoXcmVxdWlyZWRfbmVzdGVkX21lc3NhZ2UYEiACKAsyRy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsUmVxdWlyZWRUeXBlc1Byb3RvMi5OZXN0ZWRNZXNzYWdlElUKGHJlcXVpcmVkX2ZvcmVpZ25fbWVzc2FnZRgTIAIoCzIzLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLkZvcmVpZ25NZXNzYWdlUHJvdG8yEmIKFHJlcXVpcmVkX25lc3RlZF9lbnVtGBUgAigOMkQucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFJlcXVpcmVkVHlwZXNQcm90bzIuTmVzdGVkRW51bRJPChVyZXF1aXJlZF9mb3JlaWduX2VudW0YFiACKA4yMC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5Gb3JlaWduRW51bVByb3RvMhIhChVyZXF1aXJlZF9zdHJpbmdfcGllY2UYGCACKAlCAggCEhkKDXJlcXVpcmVkX2NvcmQYGSACKAlCAggBElQKEXJlY3Vyc2l2ZV9tZXNzYWdlGBsgAigLMjkucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFJlcXVpcmVkVHlwZXNQcm90bzISXQoab3B0aW9uYWxfcmVjdXJzaXZlX21lc3NhZ2UYHCABKAsyOS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsUmVxdWlyZWRUeXBlc1Byb3RvMhJNCgRkYXRhGMkBIAIoCjI+LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxSZXF1aXJlZFR5cGVzUHJvdG8yLkRhdGESIgoNZGVmYXVsdF9pbnQzMhjxASACKAU6Ci0xMjM0NTY3ODkSLAoNZGVmYXVsdF9pbnQ2NBjyASACKAM6FC05MTIzNDU2Nzg5MTIzNDU2Nzg5EiMKDmRlZmF1bHRfdWludDMyGPMBIAIoDToKMjEyMzQ1Njc4ORItCg5kZWZhdWx0X3VpbnQ2NBj0ASACKAQ6FDEwMTIzNDU2Nzg5MTIzNDU2Nzg5EiMKDmRlZmF1bHRfc2ludDMyGPUBIAIoEToKLTEyMzQ1Njc4ORItCg5kZWZhdWx0X3NpbnQ2NBj2ASACKBI6FC05MTIzNDU2Nzg5MTIzNDU2Nzg5EiQKD2RlZmF1bHRfZml4ZWQzMhj3ASACKAc6CjIxMjM0NTY3ODkSLgoPZGVmYXVsdF9maXhlZDY0GPgBIAIoBjoUMTAxMjM0NTY3ODkxMjM0NTY3ODkSJQoQZGVmYXVsdF9zZml4ZWQzMhj5ASACKA86Ci0xMjM0NTY3ODkSLwoQZGVmYXVsdF9zZml4ZWQ2NBj6ASACKBA6FC05MTIzNDU2Nzg5MTIzNDU2Nzg5Eh0KDWRlZmF1bHRfZmxvYXQY+wEgAigCOgU5ZSswORIeCg5kZWZhdWx0X2RvdWJsZRj8ASACKAE6BTdlKzIyEhsKDGRlZmF1bHRfYm9vbBj9ASACKAg6BHRydWUSIAoOZGVmYXVsdF9zdHJpbmcY/gEgAigJOgdSb3NlYnVkEh4KDWRlZmF1bHRfYnl0ZXMY/wEgAigMOgZqb3NodWEawwEKDU5lc3RlZE1lc3NhZ2USCQoBYRgBIAIoBRJOCgtjb3JlY3Vyc2l2ZRgCIAIoCzI5LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8yLlRlc3RBbGxSZXF1aXJlZFR5cGVzUHJvdG8yElcKFG9wdGlvbmFsX2NvcmVjdXJzaXZlGAMgASgLMjkucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFJlcXVpcmVkVHlwZXNQcm90bzIaMwoERGF0YRIUCgtncm91cF9pbnQzMhjKASACKAUSFQoMZ3JvdXBfdWludDMyGMsBIAIoDRohChFNZXNzYWdlU2V0Q29ycmVjdCoICAQQ/////wc6AggBGoUCChtNZXNzYWdlU2V0Q29ycmVjdEV4dGVuc2lvbjESCwoDc3RyGBkgAigJMtgBChVtZXNzYWdlX3NldF9leHRlbnNpb24SSy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsUmVxdWlyZWRUeXBlc1Byb3RvMi5NZXNzYWdlU2V0Q29ycmVjdBj5u14gASgLMlUucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFJlcXVpcmVkVHlwZXNQcm90bzIuTWVzc2FnZVNldENvcnJlY3RFeHRlbnNpb24xUhNtZXNzYWdlU2V0RXh0ZW5zaW9uGoQCChtNZXNzYWdlU2V0Q29ycmVjdEV4dGVuc2lvbjISCQoBaRgJIAIoBTLZAQoVbWVzc2FnZV9zZXRfZXh0ZW5zaW9uEksucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzIuVGVzdEFsbFJlcXVpcmVkVHlwZXNQcm90bzIuTWVzc2FnZVNldENvcnJlY3QYkLP8ASABKAsyVS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsUmVxdWlyZWRUeXBlc1Byb3RvMi5NZXNzYWdlU2V0Q29ycmVjdEV4dGVuc2lvbjJSE21lc3NhZ2VTZXRFeHRlbnNpb24iOQoKTmVzdGVkRW51bRIHCgNGT08QABIHCgNCQVIQARIHCgNCQVoQAhIQCgNORUcQ////////////ASoFCHgQyQFKBgjoBxCQTipGChFGb3JlaWduRW51bVByb3RvMhIPCgtGT1JFSUdOX0ZPTxAAEg8KC0ZPUkVJR05fQkFSEAESDwoLRk9SRUlHTl9CQVoQAjpaCg9leHRlbnNpb25faW50MzISMS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIYeCABKAVSDmV4dGVuc2lvbkludDMyOnwKCmdyb3VwZmllbGQSMS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5UZXN0QWxsVHlwZXNQcm90bzIYeSABKAoyKS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMi5Hcm91cEZpZWxkUgpncm91cGZpZWxkQjgKKGNvbS5nb29nbGUucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzJIAfgBAaICBlByb3RvMg");

/**
 * Describes the message protobuf_test_messages.proto2.TestAllTypesProto2.
 * Use `create(TestAllTypesProto2Schema)` to create a new message.
 */
export const TestAllTypesProto2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 0);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllTypesProto2.NestedMessage.
 * Use `create(TestAllTypesProto2_NestedMessageSchema)` to create a new message.
 */
export const TestAllTypesProto2_NestedMessageSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 0, 0);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllTypesProto2.Data.
 * Use `create(TestAllTypesProto2_DataSchema)` to create a new message.
 */
export const TestAllTypesProto2_DataSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 0, 1);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllTypesProto2.MultiWordGroupField.
 * Use `create(TestAllTypesProto2_MultiWordGroupFieldSchema)` to create a new message.
 */
export const TestAllTypesProto2_MultiWordGroupFieldSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 0, 2);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllTypesProto2.MessageSetCorrect.
 * Use `create(TestAllTypesProto2_MessageSetCorrectSchema)` to create a new message.
 */
export const TestAllTypesProto2_MessageSetCorrectSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 0, 3);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllTypesProto2.MessageSetCorrectExtension1.
 * Use `create(TestAllTypesProto2_MessageSetCorrectExtension1Schema)` to create a new message.
 */
export const TestAllTypesProto2_MessageSetCorrectExtension1Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 0, 4);

/**
 * @generated from extension: optional protobuf_test_messages.proto2.TestAllTypesProto2.MessageSetCorrectExtension1 message_set_extension = 1547769;
 */
export const TestAllTypesProto2_MessageSetCorrectExtension1_message_set_extension = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_proto2, 0, 4, 0);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllTypesProto2.MessageSetCorrectExtension2.
 * Use `create(TestAllTypesProto2_MessageSetCorrectExtension2Schema)` to create a new message.
 */
export const TestAllTypesProto2_MessageSetCorrectExtension2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 0, 5);

/**
 * @generated from extension: optional protobuf_test_messages.proto2.TestAllTypesProto2.MessageSetCorrectExtension2 message_set_extension = 4135312;
 */
export const TestAllTypesProto2_MessageSetCorrectExtension2_message_set_extension = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_proto2, 0, 5, 0);

/**
 * Describes the enum protobuf_test_messages.proto2.TestAllTypesProto2.NestedEnum.
 */
export const TestAllTypesProto2_NestedEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto2, 0, 0);

/**
 * @generated from enum protobuf_test_messages.proto2.TestAllTypesProto2.NestedEnum
 */
export const TestAllTypesProto2_NestedEnum = /*@__PURE__*/
  tsEnum(TestAllTypesProto2_NestedEnumSchema);

/**
 * Describes the message protobuf_test_messages.proto2.ForeignMessageProto2.
 * Use `create(ForeignMessageProto2Schema)` to create a new message.
 */
export const ForeignMessageProto2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 1);

/**
 * Describes the message protobuf_test_messages.proto2.GroupField.
 * Use `create(GroupFieldSchema)` to create a new message.
 */
export const GroupFieldSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 2);

/**
 * Describes the message protobuf_test_messages.proto2.UnknownToTestAllTypes.
 * Use `create(UnknownToTestAllTypesSchema)` to create a new message.
 */
export const UnknownToTestAllTypesSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 3);

/**
 * Describes the message protobuf_test_messages.proto2.UnknownToTestAllTypes.OptionalGroup.
 * Use `create(UnknownToTestAllTypes_OptionalGroupSchema)` to create a new message.
 */
export const UnknownToTestAllTypes_OptionalGroupSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 3, 0);

/**
 * Describes the message protobuf_test_messages.proto2.NullHypothesisProto2.
 * Use `create(NullHypothesisProto2Schema)` to create a new message.
 */
export const NullHypothesisProto2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 4);

/**
 * Describes the message protobuf_test_messages.proto2.EnumOnlyProto2.
 * Use `create(EnumOnlyProto2Schema)` to create a new message.
 */
export const EnumOnlyProto2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 5);

/**
 * Describes the enum protobuf_test_messages.proto2.EnumOnlyProto2.Bool.
 */
export const EnumOnlyProto2_BoolSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto2, 5, 0);

/**
 * @generated from enum protobuf_test_messages.proto2.EnumOnlyProto2.Bool
 */
export const EnumOnlyProto2_Bool = /*@__PURE__*/
  tsEnum(EnumOnlyProto2_BoolSchema);

/**
 * Describes the message protobuf_test_messages.proto2.OneStringProto2.
 * Use `create(OneStringProto2Schema)` to create a new message.
 */
export const OneStringProto2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 6);

/**
 * Describes the message protobuf_test_messages.proto2.ProtoWithKeywords.
 * Use `create(ProtoWithKeywordsSchema)` to create a new message.
 */
export const ProtoWithKeywordsSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 7);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllRequiredTypesProto2.
 * Use `create(TestAllRequiredTypesProto2Schema)` to create a new message.
 */
export const TestAllRequiredTypesProto2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 8);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllRequiredTypesProto2.NestedMessage.
 * Use `create(TestAllRequiredTypesProto2_NestedMessageSchema)` to create a new message.
 */
export const TestAllRequiredTypesProto2_NestedMessageSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 8, 0);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllRequiredTypesProto2.Data.
 * Use `create(TestAllRequiredTypesProto2_DataSchema)` to create a new message.
 */
export const TestAllRequiredTypesProto2_DataSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 8, 1);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllRequiredTypesProto2.MessageSetCorrect.
 * Use `create(TestAllRequiredTypesProto2_MessageSetCorrectSchema)` to create a new message.
 */
export const TestAllRequiredTypesProto2_MessageSetCorrectSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 8, 2);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllRequiredTypesProto2.MessageSetCorrectExtension1.
 * Use `create(TestAllRequiredTypesProto2_MessageSetCorrectExtension1Schema)` to create a new message.
 */
export const TestAllRequiredTypesProto2_MessageSetCorrectExtension1Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 8, 3);

/**
 * @generated from extension: optional protobuf_test_messages.proto2.TestAllRequiredTypesProto2.MessageSetCorrectExtension1 message_set_extension = 1547769;
 */
export const TestAllRequiredTypesProto2_MessageSetCorrectExtension1_message_set_extension = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_proto2, 8, 3, 0);

/**
 * Describes the message protobuf_test_messages.proto2.TestAllRequiredTypesProto2.MessageSetCorrectExtension2.
 * Use `create(TestAllRequiredTypesProto2_MessageSetCorrectExtension2Schema)` to create a new message.
 */
export const TestAllRequiredTypesProto2_MessageSetCorrectExtension2Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto2, 8, 4);

/**
 * @generated from extension: optional protobuf_test_messages.proto2.TestAllRequiredTypesProto2.MessageSetCorrectExtension2 message_set_extension = 4135312;
 */
export const TestAllRequiredTypesProto2_MessageSetCorrectExtension2_message_set_extension = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_proto2, 8, 4, 0);

/**
 * Describes the enum protobuf_test_messages.proto2.TestAllRequiredTypesProto2.NestedEnum.
 */
export const TestAllRequiredTypesProto2_NestedEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto2, 8, 0);

/**
 * @generated from enum protobuf_test_messages.proto2.TestAllRequiredTypesProto2.NestedEnum
 */
export const TestAllRequiredTypesProto2_NestedEnum = /*@__PURE__*/
  tsEnum(TestAllRequiredTypesProto2_NestedEnumSchema);

/**
 * Describes the enum protobuf_test_messages.proto2.ForeignEnumProto2.
 */
export const ForeignEnumProto2Schema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto2, 0);

/**
 * @generated from enum protobuf_test_messages.proto2.ForeignEnumProto2
 */
export const ForeignEnumProto2 = /*@__PURE__*/
  tsEnum(ForeignEnumProto2Schema);

/**
 * @generated from extension: optional int32 extension_int32 = 120;
 */
export const extension_int32 = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_proto2, 0);

/**
 * @generated from extension: optional protobuf_test_messages.proto2.GroupField groupfield = 121;
 */
export const groupfield = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_proto2, 1);

