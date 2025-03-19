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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts"
// @generated from file google/protobuf/test_messages_edition2023.proto (package protobuf_test_messages.editions, edition 2023)
// option features.message_encoding = DELIMITED;
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/test_messages_edition2023.proto.
 */
export const file_google_protobuf_test_messages_edition2023: GenFile = /*@__PURE__*/
  fileDesc("Ci9nb29nbGUvcHJvdG9idWYvdGVzdF9tZXNzYWdlc19lZGl0aW9uMjAyMy5wcm90bxIfcHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucyIbCg5Db21wbGV4TWVzc2FnZRIJCgFkGAEgASgFIv82ChdUZXN0QWxsVHlwZXNFZGl0aW9uMjAyMxIWCg5vcHRpb25hbF9pbnQzMhgBIAEoBRIWCg5vcHRpb25hbF9pbnQ2NBgCIAEoAxIXCg9vcHRpb25hbF91aW50MzIYAyABKA0SFwoPb3B0aW9uYWxfdWludDY0GAQgASgEEhcKD29wdGlvbmFsX3NpbnQzMhgFIAEoERIXCg9vcHRpb25hbF9zaW50NjQYBiABKBISGAoQb3B0aW9uYWxfZml4ZWQzMhgHIAEoBxIYChBvcHRpb25hbF9maXhlZDY0GAggASgGEhkKEW9wdGlvbmFsX3NmaXhlZDMyGAkgASgPEhkKEW9wdGlvbmFsX3NmaXhlZDY0GAogASgQEhYKDm9wdGlvbmFsX2Zsb2F0GAsgASgCEhcKD29wdGlvbmFsX2RvdWJsZRgMIAEoARIVCg1vcHRpb25hbF9ib29sGA0gASgIEhcKD29wdGlvbmFsX3N0cmluZxgOIAEoCRIWCg5vcHRpb25hbF9ieXRlcxgPIAEoDBJuChdvcHRpb25hbF9uZXN0ZWRfbWVzc2FnZRgSIAEoCzJGLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTmVzdGVkTWVzc2FnZUIFqgECKAESYwoYb3B0aW9uYWxfZm9yZWlnbl9tZXNzYWdlGBMgASgLMjoucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5Gb3JlaWduTWVzc2FnZUVkaXRpb24yMDIzQgWqAQIoARJhChRvcHRpb25hbF9uZXN0ZWRfZW51bRgVIAEoDjJDLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTmVzdGVkRW51bRJWChVvcHRpb25hbF9mb3JlaWduX2VudW0YFiABKA4yNy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLkZvcmVpZ25FbnVtRWRpdGlvbjIwMjMSIQoVb3B0aW9uYWxfc3RyaW5nX3BpZWNlGBggASgJQgIIAhIZCg1vcHRpb25hbF9jb3JkGBkgASgJQgIIARJaChFyZWN1cnNpdmVfbWVzc2FnZRgbIAEoCzI4LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjNCBaoBAigBEhYKDnJlcGVhdGVkX2ludDMyGB8gAygFEhYKDnJlcGVhdGVkX2ludDY0GCAgAygDEhcKD3JlcGVhdGVkX3VpbnQzMhghIAMoDRIXCg9yZXBlYXRlZF91aW50NjQYIiADKAQSFwoPcmVwZWF0ZWRfc2ludDMyGCMgAygREhcKD3JlcGVhdGVkX3NpbnQ2NBgkIAMoEhIYChByZXBlYXRlZF9maXhlZDMyGCUgAygHEhgKEHJlcGVhdGVkX2ZpeGVkNjQYJiADKAYSGQoRcmVwZWF0ZWRfc2ZpeGVkMzIYJyADKA8SGQoRcmVwZWF0ZWRfc2ZpeGVkNjQYKCADKBASFgoOcmVwZWF0ZWRfZmxvYXQYKSADKAISFwoPcmVwZWF0ZWRfZG91YmxlGCogAygBEhUKDXJlcGVhdGVkX2Jvb2wYKyADKAgSFwoPcmVwZWF0ZWRfc3RyaW5nGCwgAygJEhYKDnJlcGVhdGVkX2J5dGVzGC0gAygMEm4KF3JlcGVhdGVkX25lc3RlZF9tZXNzYWdlGDAgAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5OZXN0ZWRNZXNzYWdlQgWqAQIoARJjChhyZXBlYXRlZF9mb3JlaWduX21lc3NhZ2UYMSADKAsyOi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLkZvcmVpZ25NZXNzYWdlRWRpdGlvbjIwMjNCBaoBAigBEmEKFHJlcGVhdGVkX25lc3RlZF9lbnVtGDMgAygOMkMucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5OZXN0ZWRFbnVtElYKFXJlcGVhdGVkX2ZvcmVpZ25fZW51bRg0IAMoDjI3LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuRm9yZWlnbkVudW1FZGl0aW9uMjAyMxIhChVyZXBlYXRlZF9zdHJpbmdfcGllY2UYNiADKAlCAggCEhkKDXJlcGVhdGVkX2NvcmQYNyADKAlCAggBEhsKDHBhY2tlZF9pbnQzMhhLIAMoBUIFqgECGAESGwoMcGFja2VkX2ludDY0GEwgAygDQgWqAQIYARIcCg1wYWNrZWRfdWludDMyGE0gAygNQgWqAQIYARIcCg1wYWNrZWRfdWludDY0GE4gAygEQgWqAQIYARIcCg1wYWNrZWRfc2ludDMyGE8gAygRQgWqAQIYARIcCg1wYWNrZWRfc2ludDY0GFAgAygSQgWqAQIYARIdCg5wYWNrZWRfZml4ZWQzMhhRIAMoB0IFqgECGAESHQoOcGFja2VkX2ZpeGVkNjQYUiADKAZCBaoBAhgBEh4KD3BhY2tlZF9zZml4ZWQzMhhTIAMoD0IFqgECGAESHgoPcGFja2VkX3NmaXhlZDY0GFQgAygQQgWqAQIYARIbCgxwYWNrZWRfZmxvYXQYVSADKAJCBaoBAhgBEhwKDXBhY2tlZF9kb3VibGUYViADKAFCBaoBAhgBEhoKC3BhY2tlZF9ib29sGFcgAygIQgWqAQIYARJmChJwYWNrZWRfbmVzdGVkX2VudW0YWCADKA4yQy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZEVudW1CBaoBAhgBEh0KDnVucGFja2VkX2ludDMyGFkgAygFQgWqAQIYAhIdCg51bnBhY2tlZF9pbnQ2NBhaIAMoA0IFqgECGAISHgoPdW5wYWNrZWRfdWludDMyGFsgAygNQgWqAQIYAhIeCg91bnBhY2tlZF91aW50NjQYXCADKARCBaoBAhgCEh4KD3VucGFja2VkX3NpbnQzMhhdIAMoEUIFqgECGAISHgoPdW5wYWNrZWRfc2ludDY0GF4gAygSQgWqAQIYAhIfChB1bnBhY2tlZF9maXhlZDMyGF8gAygHQgWqAQIYAhIfChB1bnBhY2tlZF9maXhlZDY0GGAgAygGQgWqAQIYAhIgChF1bnBhY2tlZF9zZml4ZWQzMhhhIAMoD0IFqgECGAISIAoRdW5wYWNrZWRfc2ZpeGVkNjQYYiADKBBCBaoBAhgCEh0KDnVucGFja2VkX2Zsb2F0GGMgAygCQgWqAQIYAhIeCg91bnBhY2tlZF9kb3VibGUYZCADKAFCBaoBAhgCEhwKDXVucGFja2VkX2Jvb2wYZSADKAhCBaoBAhgCEmgKFHVucGFja2VkX25lc3RlZF9lbnVtGGYgAygOMkMucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5OZXN0ZWRFbnVtQgWqAQIYAhJkCg9tYXBfaW50MzJfaW50MzIYOCADKAsySy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcEludDMySW50MzJFbnRyeRJkCg9tYXBfaW50NjRfaW50NjQYOSADKAsySy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcEludDY0SW50NjRFbnRyeRJoChFtYXBfdWludDMyX3VpbnQzMhg6IAMoCzJNLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwVWludDMyVWludDMyRW50cnkSaAoRbWFwX3VpbnQ2NF91aW50NjQYOyADKAsyTS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcFVpbnQ2NFVpbnQ2NEVudHJ5EmgKEW1hcF9zaW50MzJfc2ludDMyGDwgAygLMk0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTaW50MzJTaW50MzJFbnRyeRJoChFtYXBfc2ludDY0X3NpbnQ2NBg9IAMoCzJNLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwU2ludDY0U2ludDY0RW50cnkSbAoTbWFwX2ZpeGVkMzJfZml4ZWQzMhg+IAMoCzJPLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwRml4ZWQzMkZpeGVkMzJFbnRyeRJsChNtYXBfZml4ZWQ2NF9maXhlZDY0GD8gAygLMk8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBGaXhlZDY0Rml4ZWQ2NEVudHJ5EnAKFW1hcF9zZml4ZWQzMl9zZml4ZWQzMhhAIAMoCzJRLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5EnAKFW1hcF9zZml4ZWQ2NF9zZml4ZWQ2NBhBIAMoCzJRLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5EmQKD21hcF9pbnQzMl9mbG9hdBhCIAMoCzJLLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwSW50MzJGbG9hdEVudHJ5EmYKEG1hcF9pbnQzMl9kb3VibGUYQyADKAsyTC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcEludDMyRG91YmxlRW50cnkSYAoNbWFwX2Jvb2xfYm9vbBhEIAMoCzJJLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwQm9vbEJvb2xFbnRyeRJoChFtYXBfc3RyaW5nX3N0cmluZxhFIAMoCzJNLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwU3RyaW5nU3RyaW5nRW50cnkSZgoQbWFwX3N0cmluZ19ieXRlcxhGIAMoCzJMLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwU3RyaW5nQnl0ZXNFbnRyeRJ3ChltYXBfc3RyaW5nX25lc3RlZF9tZXNzYWdlGEcgAygLMlQucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTdHJpbmdOZXN0ZWRNZXNzYWdlRW50cnkSeQoabWFwX3N0cmluZ19mb3JlaWduX21lc3NhZ2UYSCADKAsyVS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcFN0cmluZ0ZvcmVpZ25NZXNzYWdlRW50cnkScQoWbWFwX3N0cmluZ19uZXN0ZWRfZW51bRhJIAMoCzJRLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwU3RyaW5nTmVzdGVkRW51bUVudHJ5EnMKF21hcF9zdHJpbmdfZm9yZWlnbl9lbnVtGEogAygLMlIucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTdHJpbmdGb3JlaWduRW51bUVudHJ5EhYKDG9uZW9mX3VpbnQzMhhvIAEoDUgAEm0KFG9uZW9mX25lc3RlZF9tZXNzYWdlGHAgASgLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5OZXN0ZWRNZXNzYWdlQgWqAQIoAUgAEhYKDG9uZW9mX3N0cmluZxhxIAEoCUgAEhUKC29uZW9mX2J5dGVzGHIgASgMSAASFAoKb25lb2ZfYm9vbBhzIAEoCEgAEhYKDG9uZW9mX3VpbnQ2NBh0IAEoBEgAEhUKC29uZW9mX2Zsb2F0GHUgASgCSAASFgoMb25lb2ZfZG91YmxlGHYgASgBSAASWQoKb25lb2ZfZW51bRh3IAEoDjJDLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTmVzdGVkRW51bUgAEl4KDWdyb3VwbGlrZXR5cGUYyQEgASgLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5Hcm91cExpa2VUeXBlEmAKD2RlbGltaXRlZF9maWVsZBjKASABKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLkdyb3VwTGlrZVR5cGUacAoNTmVzdGVkTWVzc2FnZRIJCgFhGAEgASgFElQKC2NvcmVjdXJzaXZlGAIgASgLMjgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyM0IFqgECKAEaNAoSTWFwSW50MzJJbnQzMkVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoBToCOAEaNAoSTWFwSW50NjRJbnQ2NEVudHJ5EgsKA2tleRgBIAEoAxINCgV2YWx1ZRgCIAEoAzoCOAEaNgoUTWFwVWludDMyVWludDMyRW50cnkSCwoDa2V5GAEgASgNEg0KBXZhbHVlGAIgASgNOgI4ARo2ChRNYXBVaW50NjRVaW50NjRFbnRyeRILCgNrZXkYASABKAQSDQoFdmFsdWUYAiABKAQ6AjgBGjYKFE1hcFNpbnQzMlNpbnQzMkVudHJ5EgsKA2tleRgBIAEoERINCgV2YWx1ZRgCIAEoEToCOAEaNgoUTWFwU2ludDY0U2ludDY0RW50cnkSCwoDa2V5GAEgASgSEg0KBXZhbHVlGAIgASgSOgI4ARo4ChZNYXBGaXhlZDMyRml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoBxINCgV2YWx1ZRgCIAEoBzoCOAEaOAoWTWFwRml4ZWQ2NEZpeGVkNjRFbnRyeRILCgNrZXkYASABKAYSDQoFdmFsdWUYAiABKAY6AjgBGjoKGE1hcFNmaXhlZDMyU2ZpeGVkMzJFbnRyeRILCgNrZXkYASABKA8SDQoFdmFsdWUYAiABKA86AjgBGjoKGE1hcFNmaXhlZDY0U2ZpeGVkNjRFbnRyeRILCgNrZXkYASABKBASDQoFdmFsdWUYAiABKBA6AjgBGjQKEk1hcEludDMyRmxvYXRFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAI6AjgBGjUKE01hcEludDMyRG91YmxlRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgBOgI4ARoyChBNYXBCb29sQm9vbEVudHJ5EgsKA2tleRgBIAEoCBINCgV2YWx1ZRgCIAEoCDoCOAEaNgoUTWFwU3RyaW5nU3RyaW5nRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARo1ChNNYXBTdHJpbmdCeXRlc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoDDoCOAEahQEKG01hcFN0cmluZ05lc3RlZE1lc3NhZ2VFbnRyeRILCgNrZXkYASABKAkSVQoFdmFsdWUYAiABKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZE1lc3NhZ2U6AjgBGnoKHE1hcFN0cmluZ0ZvcmVpZ25NZXNzYWdlRW50cnkSCwoDa2V5GAEgASgJEkkKBXZhbHVlGAIgASgLMjoucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5Gb3JlaWduTWVzc2FnZUVkaXRpb24yMDIzOgI4ARp/ChhNYXBTdHJpbmdOZXN0ZWRFbnVtRW50cnkSCwoDa2V5GAEgASgJElIKBXZhbHVlGAIgASgOMkMucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5OZXN0ZWRFbnVtOgI4ARp0ChlNYXBTdHJpbmdGb3JlaWduRW51bUVudHJ5EgsKA2tleRgBIAEoCRJGCgV2YWx1ZRgCIAEoDjI3LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuRm9yZWlnbkVudW1FZGl0aW9uMjAyMzoCOAEaPAoNR3JvdXBMaWtlVHlwZRIUCgtncm91cF9pbnQzMhjKASABKAUSFQoMZ3JvdXBfdWludDMyGMsBIAEoDSI5CgpOZXN0ZWRFbnVtEgcKA0ZPTxAAEgcKA0JBUhABEgcKA0JBWhACEhAKA05FRxD///////////8BKgUIeBDJAUINCgtvbmVvZl9maWVsZCImChlGb3JlaWduTWVzc2FnZUVkaXRpb24yMDIzEgkKAWMYASABKAUiGgoNR3JvdXBMaWtlVHlwZRIJCgFjGAEgASgFKksKFkZvcmVpZ25FbnVtRWRpdGlvbjIwMjMSDwoLRk9SRUlHTl9GT08QABIPCgtGT1JFSUdOX0JBUhABEg8KC0ZPUkVJR05fQkFaEAI6YQoPZXh0ZW5zaW9uX2ludDMyEjgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMxh4IAEoBVIOZXh0ZW5zaW9uSW50MzI6jgEKDWdyb3VwbGlrZXR5cGUSOC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzGHkgASgLMi4ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5Hcm91cExpa2VUeXBlUg1ncm91cGxpa2V0eXBlOo0BCg1kZWxpbWl0ZWRfZXh0EjgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMxh6IAEoCzIuLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuR3JvdXBMaWtlVHlwZVIMZGVsaW1pdGVkRXh0QkEKLWNvbS5nb29nbGUucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9uMjAyM1ABogIIRWRpdGlvbnOSAwIoAmIIZWRpdGlvbnNw6Ac");

/**
 * @generated from message protobuf_test_messages.editions.ComplexMessage
 */
export type ComplexMessage = Message<"protobuf_test_messages.editions.ComplexMessage"> & {
  /**
   * @generated from field: int32 d = 1;
   */
  d: number;
};

/**
 * Describes the message protobuf_test_messages.editions.ComplexMessage.
 * Use `create(ComplexMessageSchema)` to create a new message.
 */
export const ComplexMessageSchema: GenMessage<ComplexMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 0);

/**
 * @generated from message protobuf_test_messages.editions.TestAllTypesEdition2023
 */
export type TestAllTypesEdition2023 = Message<"protobuf_test_messages.editions.TestAllTypesEdition2023"> & {
  /**
   * Singular
   *
   * @generated from field: int32 optional_int32 = 1;
   */
  optionalInt32: number;

  /**
   * @generated from field: int64 optional_int64 = 2;
   */
  optionalInt64: bigint;

  /**
   * @generated from field: uint32 optional_uint32 = 3;
   */
  optionalUint32: number;

  /**
   * @generated from field: uint64 optional_uint64 = 4;
   */
  optionalUint64: bigint;

  /**
   * @generated from field: sint32 optional_sint32 = 5;
   */
  optionalSint32: number;

  /**
   * @generated from field: sint64 optional_sint64 = 6;
   */
  optionalSint64: bigint;

  /**
   * @generated from field: fixed32 optional_fixed32 = 7;
   */
  optionalFixed32: number;

  /**
   * @generated from field: fixed64 optional_fixed64 = 8;
   */
  optionalFixed64: bigint;

  /**
   * @generated from field: sfixed32 optional_sfixed32 = 9;
   */
  optionalSfixed32: number;

  /**
   * @generated from field: sfixed64 optional_sfixed64 = 10;
   */
  optionalSfixed64: bigint;

  /**
   * @generated from field: float optional_float = 11;
   */
  optionalFloat: number;

  /**
   * @generated from field: double optional_double = 12;
   */
  optionalDouble: number;

  /**
   * @generated from field: bool optional_bool = 13;
   */
  optionalBool: boolean;

  /**
   * @generated from field: string optional_string = 14;
   */
  optionalString: string;

  /**
   * @generated from field: bytes optional_bytes = 15;
   */
  optionalBytes: Uint8Array;

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage optional_nested_message = 18 [features.message_encoding = LENGTH_PREFIXED];
   */
  optionalNestedMessage?: TestAllTypesEdition2023_NestedMessage;

  /**
   * @generated from field: protobuf_test_messages.editions.ForeignMessageEdition2023 optional_foreign_message = 19 [features.message_encoding = LENGTH_PREFIXED];
   */
  optionalForeignMessage?: ForeignMessageEdition2023;

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum optional_nested_enum = 21;
   */
  optionalNestedEnum: TestAllTypesEdition2023_NestedEnum;

  /**
   * @generated from field: protobuf_test_messages.editions.ForeignEnumEdition2023 optional_foreign_enum = 22;
   */
  optionalForeignEnum: ForeignEnumEdition2023;

  /**
   * @generated from field: string optional_string_piece = 24;
   */
  optionalStringPiece: string;

  /**
   * @generated from field: string optional_cord = 25;
   */
  optionalCord: string;

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023 recursive_message = 27 [features.message_encoding = LENGTH_PREFIXED];
   */
  recursiveMessage?: TestAllTypesEdition2023;

  /**
   * Repeated
   *
   * @generated from field: repeated int32 repeated_int32 = 31;
   */
  repeatedInt32: number[];

  /**
   * @generated from field: repeated int64 repeated_int64 = 32;
   */
  repeatedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 repeated_uint32 = 33;
   */
  repeatedUint32: number[];

  /**
   * @generated from field: repeated uint64 repeated_uint64 = 34;
   */
  repeatedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 repeated_sint32 = 35;
   */
  repeatedSint32: number[];

  /**
   * @generated from field: repeated sint64 repeated_sint64 = 36;
   */
  repeatedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 repeated_fixed32 = 37;
   */
  repeatedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 repeated_fixed64 = 38;
   */
  repeatedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 repeated_sfixed32 = 39;
   */
  repeatedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 repeated_sfixed64 = 40;
   */
  repeatedSfixed64: bigint[];

  /**
   * @generated from field: repeated float repeated_float = 41;
   */
  repeatedFloat: number[];

  /**
   * @generated from field: repeated double repeated_double = 42;
   */
  repeatedDouble: number[];

  /**
   * @generated from field: repeated bool repeated_bool = 43;
   */
  repeatedBool: boolean[];

  /**
   * @generated from field: repeated string repeated_string = 44;
   */
  repeatedString: string[];

  /**
   * @generated from field: repeated bytes repeated_bytes = 45;
   */
  repeatedBytes: Uint8Array[];

  /**
   * @generated from field: repeated protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage repeated_nested_message = 48 [features.message_encoding = LENGTH_PREFIXED];
   */
  repeatedNestedMessage: TestAllTypesEdition2023_NestedMessage[];

  /**
   * @generated from field: repeated protobuf_test_messages.editions.ForeignMessageEdition2023 repeated_foreign_message = 49 [features.message_encoding = LENGTH_PREFIXED];
   */
  repeatedForeignMessage: ForeignMessageEdition2023[];

  /**
   * @generated from field: repeated protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum repeated_nested_enum = 51;
   */
  repeatedNestedEnum: TestAllTypesEdition2023_NestedEnum[];

  /**
   * @generated from field: repeated protobuf_test_messages.editions.ForeignEnumEdition2023 repeated_foreign_enum = 52;
   */
  repeatedForeignEnum: ForeignEnumEdition2023[];

  /**
   * @generated from field: repeated string repeated_string_piece = 54;
   */
  repeatedStringPiece: string[];

  /**
   * @generated from field: repeated string repeated_cord = 55;
   */
  repeatedCord: string[];

  /**
   * Packed
   *
   * @generated from field: repeated int32 packed_int32 = 75 [features.repeated_field_encoding = PACKED];
   */
  packedInt32: number[];

  /**
   * @generated from field: repeated int64 packed_int64 = 76 [features.repeated_field_encoding = PACKED];
   */
  packedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 packed_uint32 = 77 [features.repeated_field_encoding = PACKED];
   */
  packedUint32: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64 = 78 [features.repeated_field_encoding = PACKED];
   */
  packedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 packed_sint32 = 79 [features.repeated_field_encoding = PACKED];
   */
  packedSint32: number[];

  /**
   * @generated from field: repeated sint64 packed_sint64 = 80 [features.repeated_field_encoding = PACKED];
   */
  packedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 packed_fixed32 = 81 [features.repeated_field_encoding = PACKED];
   */
  packedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 packed_fixed64 = 82 [features.repeated_field_encoding = PACKED];
   */
  packedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 packed_sfixed32 = 83 [features.repeated_field_encoding = PACKED];
   */
  packedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 packed_sfixed64 = 84 [features.repeated_field_encoding = PACKED];
   */
  packedSfixed64: bigint[];

  /**
   * @generated from field: repeated float packed_float = 85 [features.repeated_field_encoding = PACKED];
   */
  packedFloat: number[];

  /**
   * @generated from field: repeated double packed_double = 86 [features.repeated_field_encoding = PACKED];
   */
  packedDouble: number[];

  /**
   * @generated from field: repeated bool packed_bool = 87 [features.repeated_field_encoding = PACKED];
   */
  packedBool: boolean[];

  /**
   * @generated from field: repeated protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum packed_nested_enum = 88 [features.repeated_field_encoding = PACKED];
   */
  packedNestedEnum: TestAllTypesEdition2023_NestedEnum[];

  /**
   * Unpacked
   *
   * @generated from field: repeated int32 unpacked_int32 = 89 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedInt32: number[];

  /**
   * @generated from field: repeated int64 unpacked_int64 = 90 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32 = 91 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedUint32: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64 = 92 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 unpacked_sint32 = 93 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedSint32: number[];

  /**
   * @generated from field: repeated sint64 unpacked_sint64 = 94 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 unpacked_fixed32 = 95 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 unpacked_fixed64 = 96 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 unpacked_sfixed32 = 97 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 unpacked_sfixed64 = 98 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedSfixed64: bigint[];

  /**
   * @generated from field: repeated float unpacked_float = 99 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedFloat: number[];

  /**
   * @generated from field: repeated double unpacked_double = 100 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedDouble: number[];

  /**
   * @generated from field: repeated bool unpacked_bool = 101 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedBool: boolean[];

  /**
   * @generated from field: repeated protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum unpacked_nested_enum = 102 [features.repeated_field_encoding = EXPANDED];
   */
  unpackedNestedEnum: TestAllTypesEdition2023_NestedEnum[];

  /**
   * Map
   *
   * @generated from field: map<int32, int32> map_int32_int32 = 56;
   */
  mapInt32Int32: { [key: number]: number };

  /**
   * @generated from field: map<int64, int64> map_int64_int64 = 57;
   */
  mapInt64Int64: { [key: string]: bigint };

  /**
   * @generated from field: map<uint32, uint32> map_uint32_uint32 = 58;
   */
  mapUint32Uint32: { [key: number]: number };

  /**
   * @generated from field: map<uint64, uint64> map_uint64_uint64 = 59;
   */
  mapUint64Uint64: { [key: string]: bigint };

  /**
   * @generated from field: map<sint32, sint32> map_sint32_sint32 = 60;
   */
  mapSint32Sint32: { [key: number]: number };

  /**
   * @generated from field: map<sint64, sint64> map_sint64_sint64 = 61;
   */
  mapSint64Sint64: { [key: string]: bigint };

  /**
   * @generated from field: map<fixed32, fixed32> map_fixed32_fixed32 = 62;
   */
  mapFixed32Fixed32: { [key: number]: number };

  /**
   * @generated from field: map<fixed64, fixed64> map_fixed64_fixed64 = 63;
   */
  mapFixed64Fixed64: { [key: string]: bigint };

  /**
   * @generated from field: map<sfixed32, sfixed32> map_sfixed32_sfixed32 = 64;
   */
  mapSfixed32Sfixed32: { [key: number]: number };

  /**
   * @generated from field: map<sfixed64, sfixed64> map_sfixed64_sfixed64 = 65;
   */
  mapSfixed64Sfixed64: { [key: string]: bigint };

  /**
   * @generated from field: map<int32, float> map_int32_float = 66;
   */
  mapInt32Float: { [key: number]: number };

  /**
   * @generated from field: map<int32, double> map_int32_double = 67;
   */
  mapInt32Double: { [key: number]: number };

  /**
   * @generated from field: map<bool, bool> map_bool_bool = 68;
   */
  mapBoolBool: { [key: string]: boolean };

  /**
   * @generated from field: map<string, string> map_string_string = 69;
   */
  mapStringString: { [key: string]: string };

  /**
   * @generated from field: map<string, bytes> map_string_bytes = 70;
   */
  mapStringBytes: { [key: string]: Uint8Array };

  /**
   * @generated from field: map<string, protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage> map_string_nested_message = 71;
   */
  mapStringNestedMessage: { [key: string]: TestAllTypesEdition2023_NestedMessage };

  /**
   * @generated from field: map<string, protobuf_test_messages.editions.ForeignMessageEdition2023> map_string_foreign_message = 72;
   */
  mapStringForeignMessage: { [key: string]: ForeignMessageEdition2023 };

  /**
   * @generated from field: map<string, protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum> map_string_nested_enum = 73;
   */
  mapStringNestedEnum: { [key: string]: TestAllTypesEdition2023_NestedEnum };

  /**
   * @generated from field: map<string, protobuf_test_messages.editions.ForeignEnumEdition2023> map_string_foreign_enum = 74;
   */
  mapStringForeignEnum: { [key: string]: ForeignEnumEdition2023 };

  /**
   * @generated from oneof protobuf_test_messages.editions.TestAllTypesEdition2023.oneof_field
   */
  oneofField: {
    /**
     * @generated from field: uint32 oneof_uint32 = 111;
     */
    value: number;
    case: "oneofUint32";
  } | {
    /**
     * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage oneof_nested_message = 112 [features.message_encoding = LENGTH_PREFIXED];
     */
    value: TestAllTypesEdition2023_NestedMessage;
    case: "oneofNestedMessage";
  } | {
    /**
     * @generated from field: string oneof_string = 113;
     */
    value: string;
    case: "oneofString";
  } | {
    /**
     * @generated from field: bytes oneof_bytes = 114;
     */
    value: Uint8Array;
    case: "oneofBytes";
  } | {
    /**
     * @generated from field: bool oneof_bool = 115;
     */
    value: boolean;
    case: "oneofBool";
  } | {
    /**
     * @generated from field: uint64 oneof_uint64 = 116;
     */
    value: bigint;
    case: "oneofUint64";
  } | {
    /**
     * @generated from field: float oneof_float = 117;
     */
    value: number;
    case: "oneofFloat";
  } | {
    /**
     * @generated from field: double oneof_double = 118;
     */
    value: number;
    case: "oneofDouble";
  } | {
    /**
     * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum oneof_enum = 119;
     */
    value: TestAllTypesEdition2023_NestedEnum;
    case: "oneofEnum";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.GroupLikeType groupliketype = 201;
   */
  groupliketype?: TestAllTypesEdition2023_GroupLikeType;

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.GroupLikeType delimited_field = 202;
   */
  delimitedField?: TestAllTypesEdition2023_GroupLikeType;
};

/**
 * Describes the message protobuf_test_messages.editions.TestAllTypesEdition2023.
 * Use `create(TestAllTypesEdition2023Schema)` to create a new message.
 */
export const TestAllTypesEdition2023Schema: GenMessage<TestAllTypesEdition2023> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 1);

/**
 * @generated from message protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage
 */
export type TestAllTypesEdition2023_NestedMessage = Message<"protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage"> & {
  /**
   * @generated from field: int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023 corecursive = 2 [features.message_encoding = LENGTH_PREFIXED];
   */
  corecursive?: TestAllTypesEdition2023;
};

/**
 * Describes the message protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage.
 * Use `create(TestAllTypesEdition2023_NestedMessageSchema)` to create a new message.
 */
export const TestAllTypesEdition2023_NestedMessageSchema: GenMessage<TestAllTypesEdition2023_NestedMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 1, 0);

/**
 * groups
 *
 * @generated from message protobuf_test_messages.editions.TestAllTypesEdition2023.GroupLikeType
 */
export type TestAllTypesEdition2023_GroupLikeType = Message<"protobuf_test_messages.editions.TestAllTypesEdition2023.GroupLikeType"> & {
  /**
   * @generated from field: int32 group_int32 = 202;
   */
  groupInt32: number;

  /**
   * @generated from field: uint32 group_uint32 = 203;
   */
  groupUint32: number;
};

/**
 * Describes the message protobuf_test_messages.editions.TestAllTypesEdition2023.GroupLikeType.
 * Use `create(TestAllTypesEdition2023_GroupLikeTypeSchema)` to create a new message.
 */
export const TestAllTypesEdition2023_GroupLikeTypeSchema: GenMessage<TestAllTypesEdition2023_GroupLikeType> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 1, 1);

/**
 * @generated from enum protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum
 */
export enum TestAllTypesEdition2023_NestedEnum {
  /**
   * @generated from enum value: FOO = 0;
   */
  FOO = 0,

  /**
   * @generated from enum value: BAR = 1;
   */
  BAR = 1,

  /**
   * @generated from enum value: BAZ = 2;
   */
  BAZ = 2,

  /**
   * Intentionally negative.
   *
   * @generated from enum value: NEG = -1;
   */
  NEG = -1,
}

/**
 * Describes the enum protobuf_test_messages.editions.TestAllTypesEdition2023.NestedEnum.
 */
export const TestAllTypesEdition2023_NestedEnumSchema: GenEnum<TestAllTypesEdition2023_NestedEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_edition2023, 1, 0);

/**
 * @generated from message protobuf_test_messages.editions.ForeignMessageEdition2023
 */
export type ForeignMessageEdition2023 = Message<"protobuf_test_messages.editions.ForeignMessageEdition2023"> & {
  /**
   * @generated from field: int32 c = 1;
   */
  c: number;
};

/**
 * Describes the message protobuf_test_messages.editions.ForeignMessageEdition2023.
 * Use `create(ForeignMessageEdition2023Schema)` to create a new message.
 */
export const ForeignMessageEdition2023Schema: GenMessage<ForeignMessageEdition2023> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 2);

/**
 * @generated from message protobuf_test_messages.editions.GroupLikeType
 */
export type GroupLikeType = Message<"protobuf_test_messages.editions.GroupLikeType"> & {
  /**
   * @generated from field: int32 c = 1;
   */
  c: number;
};

/**
 * Describes the message protobuf_test_messages.editions.GroupLikeType.
 * Use `create(GroupLikeTypeSchema)` to create a new message.
 */
export const GroupLikeTypeSchema: GenMessage<GroupLikeType> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 3);

/**
 * @generated from enum protobuf_test_messages.editions.ForeignEnumEdition2023
 */
export enum ForeignEnumEdition2023 {
  /**
   * @generated from enum value: FOREIGN_FOO = 0;
   */
  FOREIGN_FOO = 0,

  /**
   * @generated from enum value: FOREIGN_BAR = 1;
   */
  FOREIGN_BAR = 1,

  /**
   * @generated from enum value: FOREIGN_BAZ = 2;
   */
  FOREIGN_BAZ = 2,
}

/**
 * Describes the enum protobuf_test_messages.editions.ForeignEnumEdition2023.
 */
export const ForeignEnumEdition2023Schema: GenEnum<ForeignEnumEdition2023> = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_edition2023, 0);

/**
 * @generated from extension: int32 extension_int32 = 120;
 */
export const extension_int32: GenExtension<TestAllTypesEdition2023, number> = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_edition2023, 0);

/**
 * @generated from extension: protobuf_test_messages.editions.GroupLikeType groupliketype = 121;
 */
export const groupliketype: GenExtension<TestAllTypesEdition2023, GroupLikeType> = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_edition2023, 1);

/**
 * @generated from extension: protobuf_test_messages.editions.GroupLikeType delimited_ext = 122;
 */
export const delimited_ext: GenExtension<TestAllTypesEdition2023, GroupLikeType> = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_edition2023, 2);

