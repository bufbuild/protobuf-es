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

// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file google/protobuf/test_messages_edition2023.proto (package protobuf_test_messages.editions, edition 2023)
/* eslint-disable */

import type { GenEnum, GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/test_messages_edition2023.proto.
 */
export const file_google_protobuf_test_messages_edition2023: GenFile = /*@__PURE__*/
  fileDesc("Ci9nb29nbGUvcHJvdG9idWYvdGVzdF9tZXNzYWdlc19lZGl0aW9uMjAyMy5wcm90bxIfcHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucyLcNgoXVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMSFgoOb3B0aW9uYWxfaW50MzIYASABKAUSFgoOb3B0aW9uYWxfaW50NjQYAiABKAMSFwoPb3B0aW9uYWxfdWludDMyGAMgASgNEhcKD29wdGlvbmFsX3VpbnQ2NBgEIAEoBBIXCg9vcHRpb25hbF9zaW50MzIYBSABKBESFwoPb3B0aW9uYWxfc2ludDY0GAYgASgSEhgKEG9wdGlvbmFsX2ZpeGVkMzIYByABKAcSGAoQb3B0aW9uYWxfZml4ZWQ2NBgIIAEoBhIZChFvcHRpb25hbF9zZml4ZWQzMhgJIAEoDxIZChFvcHRpb25hbF9zZml4ZWQ2NBgKIAEoEBIWCg5vcHRpb25hbF9mbG9hdBgLIAEoAhIXCg9vcHRpb25hbF9kb3VibGUYDCABKAESFQoNb3B0aW9uYWxfYm9vbBgNIAEoCBIXCg9vcHRpb25hbF9zdHJpbmcYDiABKAkSFgoOb3B0aW9uYWxfYnl0ZXMYDyABKAwSZwoXb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UYEiABKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZE1lc3NhZ2USXAoYb3B0aW9uYWxfZm9yZWlnbl9tZXNzYWdlGBMgASgLMjoucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5Gb3JlaWduTWVzc2FnZUVkaXRpb24yMDIzEmEKFG9wdGlvbmFsX25lc3RlZF9lbnVtGBUgASgOMkMucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5OZXN0ZWRFbnVtElYKFW9wdGlvbmFsX2ZvcmVpZ25fZW51bRgWIAEoDjI3LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuRm9yZWlnbkVudW1FZGl0aW9uMjAyMxIhChVvcHRpb25hbF9zdHJpbmdfcGllY2UYGCABKAlCAggCEhkKDW9wdGlvbmFsX2NvcmQYGSABKAlCAggBElMKEXJlY3Vyc2l2ZV9tZXNzYWdlGBsgASgLMjgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMxIWCg5yZXBlYXRlZF9pbnQzMhgfIAMoBRIWCg5yZXBlYXRlZF9pbnQ2NBggIAMoAxIXCg9yZXBlYXRlZF91aW50MzIYISADKA0SFwoPcmVwZWF0ZWRfdWludDY0GCIgAygEEhcKD3JlcGVhdGVkX3NpbnQzMhgjIAMoERIXCg9yZXBlYXRlZF9zaW50NjQYJCADKBISGAoQcmVwZWF0ZWRfZml4ZWQzMhglIAMoBxIYChByZXBlYXRlZF9maXhlZDY0GCYgAygGEhkKEXJlcGVhdGVkX3NmaXhlZDMyGCcgAygPEhkKEXJlcGVhdGVkX3NmaXhlZDY0GCggAygQEhYKDnJlcGVhdGVkX2Zsb2F0GCkgAygCEhcKD3JlcGVhdGVkX2RvdWJsZRgqIAMoARIVCg1yZXBlYXRlZF9ib29sGCsgAygIEhcKD3JlcGVhdGVkX3N0cmluZxgsIAMoCRIWCg5yZXBlYXRlZF9ieXRlcxgtIAMoDBJnChdyZXBlYXRlZF9uZXN0ZWRfbWVzc2FnZRgwIAMoCzJGLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTmVzdGVkTWVzc2FnZRJcChhyZXBlYXRlZF9mb3JlaWduX21lc3NhZ2UYMSADKAsyOi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLkZvcmVpZ25NZXNzYWdlRWRpdGlvbjIwMjMSYQoUcmVwZWF0ZWRfbmVzdGVkX2VudW0YMyADKA4yQy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZEVudW0SVgoVcmVwZWF0ZWRfZm9yZWlnbl9lbnVtGDQgAygOMjcucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5Gb3JlaWduRW51bUVkaXRpb24yMDIzEiEKFXJlcGVhdGVkX3N0cmluZ19waWVjZRg2IAMoCUICCAISGQoNcmVwZWF0ZWRfY29yZBg3IAMoCUICCAESGwoMcGFja2VkX2ludDMyGEsgAygFQgWqAQIYARIbCgxwYWNrZWRfaW50NjQYTCADKANCBaoBAhgBEhwKDXBhY2tlZF91aW50MzIYTSADKA1CBaoBAhgBEhwKDXBhY2tlZF91aW50NjQYTiADKARCBaoBAhgBEhwKDXBhY2tlZF9zaW50MzIYTyADKBFCBaoBAhgBEhwKDXBhY2tlZF9zaW50NjQYUCADKBJCBaoBAhgBEh0KDnBhY2tlZF9maXhlZDMyGFEgAygHQgWqAQIYARIdCg5wYWNrZWRfZml4ZWQ2NBhSIAMoBkIFqgECGAESHgoPcGFja2VkX3NmaXhlZDMyGFMgAygPQgWqAQIYARIeCg9wYWNrZWRfc2ZpeGVkNjQYVCADKBBCBaoBAhgBEhsKDHBhY2tlZF9mbG9hdBhVIAMoAkIFqgECGAESHAoNcGFja2VkX2RvdWJsZRhWIAMoAUIFqgECGAESGgoLcGFja2VkX2Jvb2wYVyADKAhCBaoBAhgBEmYKEnBhY2tlZF9uZXN0ZWRfZW51bRhYIAMoDjJDLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTmVzdGVkRW51bUIFqgECGAESHQoOdW5wYWNrZWRfaW50MzIYWSADKAVCBaoBAhgCEh0KDnVucGFja2VkX2ludDY0GFogAygDQgWqAQIYAhIeCg91bnBhY2tlZF91aW50MzIYWyADKA1CBaoBAhgCEh4KD3VucGFja2VkX3VpbnQ2NBhcIAMoBEIFqgECGAISHgoPdW5wYWNrZWRfc2ludDMyGF0gAygRQgWqAQIYAhIeCg91bnBhY2tlZF9zaW50NjQYXiADKBJCBaoBAhgCEh8KEHVucGFja2VkX2ZpeGVkMzIYXyADKAdCBaoBAhgCEh8KEHVucGFja2VkX2ZpeGVkNjQYYCADKAZCBaoBAhgCEiAKEXVucGFja2VkX3NmaXhlZDMyGGEgAygPQgWqAQIYAhIgChF1bnBhY2tlZF9zZml4ZWQ2NBhiIAMoEEIFqgECGAISHQoOdW5wYWNrZWRfZmxvYXQYYyADKAJCBaoBAhgCEh4KD3VucGFja2VkX2RvdWJsZRhkIAMoAUIFqgECGAISHAoNdW5wYWNrZWRfYm9vbBhlIAMoCEIFqgECGAISaAoUdW5wYWNrZWRfbmVzdGVkX2VudW0YZiADKA4yQy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZEVudW1CBaoBAhgCEmQKD21hcF9pbnQzMl9pbnQzMhg4IAMoCzJLLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwSW50MzJJbnQzMkVudHJ5EmQKD21hcF9pbnQ2NF9pbnQ2NBg5IAMoCzJLLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwSW50NjRJbnQ2NEVudHJ5EmgKEW1hcF91aW50MzJfdWludDMyGDogAygLMk0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBVaW50MzJVaW50MzJFbnRyeRJoChFtYXBfdWludDY0X3VpbnQ2NBg7IAMoCzJNLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwVWludDY0VWludDY0RW50cnkSaAoRbWFwX3NpbnQzMl9zaW50MzIYPCADKAsyTS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcFNpbnQzMlNpbnQzMkVudHJ5EmgKEW1hcF9zaW50NjRfc2ludDY0GD0gAygLMk0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTaW50NjRTaW50NjRFbnRyeRJsChNtYXBfZml4ZWQzMl9maXhlZDMyGD4gAygLMk8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBGaXhlZDMyRml4ZWQzMkVudHJ5EmwKE21hcF9maXhlZDY0X2ZpeGVkNjQYPyADKAsyTy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcEZpeGVkNjRGaXhlZDY0RW50cnkScAoVbWFwX3NmaXhlZDMyX3NmaXhlZDMyGEAgAygLMlEucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTZml4ZWQzMlNmaXhlZDMyRW50cnkScAoVbWFwX3NmaXhlZDY0X3NmaXhlZDY0GEEgAygLMlEucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTZml4ZWQ2NFNmaXhlZDY0RW50cnkSZAoPbWFwX2ludDMyX2Zsb2F0GEIgAygLMksucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBJbnQzMkZsb2F0RW50cnkSZgoQbWFwX2ludDMyX2RvdWJsZRhDIAMoCzJMLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwSW50MzJEb3VibGVFbnRyeRJgCg1tYXBfYm9vbF9ib29sGEQgAygLMkkucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBCb29sQm9vbEVudHJ5EmgKEW1hcF9zdHJpbmdfc3RyaW5nGEUgAygLMk0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTdHJpbmdTdHJpbmdFbnRyeRJmChBtYXBfc3RyaW5nX2J5dGVzGEYgAygLMkwucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTdHJpbmdCeXRlc0VudHJ5EncKGW1hcF9zdHJpbmdfbmVzdGVkX21lc3NhZ2UYRyADKAsyVC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcFN0cmluZ05lc3RlZE1lc3NhZ2VFbnRyeRJ5ChptYXBfc3RyaW5nX2ZvcmVpZ25fbWVzc2FnZRhIIAMoCzJVLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTWFwU3RyaW5nRm9yZWlnbk1lc3NhZ2VFbnRyeRJxChZtYXBfc3RyaW5nX25lc3RlZF9lbnVtGEkgAygLMlEucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMy5NYXBTdHJpbmdOZXN0ZWRFbnVtRW50cnkScwoXbWFwX3N0cmluZ19mb3JlaWduX2VudW0YSiADKAsyUi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk1hcFN0cmluZ0ZvcmVpZ25FbnVtRW50cnkSFgoMb25lb2ZfdWludDMyGG8gASgNSAASZgoUb25lb2ZfbmVzdGVkX21lc3NhZ2UYcCABKAsyRi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZE1lc3NhZ2VIABIWCgxvbmVvZl9zdHJpbmcYcSABKAlIABIVCgtvbmVvZl9ieXRlcxhyIAEoDEgAEhQKCm9uZW9mX2Jvb2wYcyABKAhIABIWCgxvbmVvZl91aW50NjQYdCABKARIABIVCgtvbmVvZl9mbG9hdBh1IAEoAkgAEhYKDG9uZW9mX2RvdWJsZRh2IAEoAUgAElkKCm9uZW9mX2VudW0YdyABKA4yQy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZEVudW1IABJlCg1ncm91cGxpa2V0eXBlGMkBIAEoCzJGLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuR3JvdXBMaWtlVHlwZUIFqgECKAISZwoPZGVsaW1pdGVkX2ZpZWxkGMoBIAEoCzJGLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuR3JvdXBMaWtlVHlwZUIFqgECKAIaaQoNTmVzdGVkTWVzc2FnZRIJCgFhGAEgASgFEk0KC2NvcmVjdXJzaXZlGAIgASgLMjgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMxo0ChJNYXBJbnQzMkludDMyRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ARo0ChJNYXBJbnQ2NEludDY0RW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARo2ChRNYXBVaW50MzJVaW50MzJFbnRyeRILCgNrZXkYASABKA0SDQoFdmFsdWUYAiABKA06AjgBGjYKFE1hcFVpbnQ2NFVpbnQ2NEVudHJ5EgsKA2tleRgBIAEoBBINCgV2YWx1ZRgCIAEoBDoCOAEaNgoUTWFwU2ludDMyU2ludDMyRW50cnkSCwoDa2V5GAEgASgREg0KBXZhbHVlGAIgASgROgI4ARo2ChRNYXBTaW50NjRTaW50NjRFbnRyeRILCgNrZXkYASABKBISDQoFdmFsdWUYAiABKBI6AjgBGjgKFk1hcEZpeGVkMzJGaXhlZDMyRW50cnkSCwoDa2V5GAEgASgHEg0KBXZhbHVlGAIgASgHOgI4ARo4ChZNYXBGaXhlZDY0Rml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhINCgV2YWx1ZRgCIAEoBjoCOAEaOgoYTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoDxINCgV2YWx1ZRgCIAEoDzoCOAEaOgoYTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoEBINCgV2YWx1ZRgCIAEoEDoCOAEaNAoSTWFwSW50MzJGbG9hdEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoAjoCOAEaNQoTTWFwSW50MzJEb3VibGVFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAE6AjgBGjIKEE1hcEJvb2xCb29sRW50cnkSCwoDa2V5GAEgASgIEg0KBXZhbHVlGAIgASgIOgI4ARo2ChRNYXBTdHJpbmdTdHJpbmdFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjUKE01hcFN0cmluZ0J5dGVzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgMOgI4ARqFAQobTWFwU3RyaW5nTmVzdGVkTWVzc2FnZUVudHJ5EgsKA2tleRgBIAEoCRJVCgV2YWx1ZRgCIAEoCzJGLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMuTmVzdGVkTWVzc2FnZToCOAEaegocTWFwU3RyaW5nRm9yZWlnbk1lc3NhZ2VFbnRyeRILCgNrZXkYASABKAkSSQoFdmFsdWUYAiABKAsyOi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLkZvcmVpZ25NZXNzYWdlRWRpdGlvbjIwMjM6AjgBGn8KGE1hcFN0cmluZ05lc3RlZEVudW1FbnRyeRILCgNrZXkYASABKAkSUgoFdmFsdWUYAiABKA4yQy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzLk5lc3RlZEVudW06AjgBGnQKGU1hcFN0cmluZ0ZvcmVpZ25FbnVtRW50cnkSCwoDa2V5GAEgASgJEkYKBXZhbHVlGAIgASgOMjcucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5Gb3JlaWduRW51bUVkaXRpb24yMDIzOgI4ARo8Cg1Hcm91cExpa2VUeXBlEhQKC2dyb3VwX2ludDMyGMoBIAEoBRIVCgxncm91cF91aW50MzIYywEgASgNIjkKCk5lc3RlZEVudW0SBwoDRk9PEAASBwoDQkFSEAESBwoDQkFaEAISEAoDTkVHEP///////////wEqBQh4EMkBQg0KC29uZW9mX2ZpZWxkIiYKGUZvcmVpZ25NZXNzYWdlRWRpdGlvbjIwMjMSCQoBYxgBIAEoBSIaCg1Hcm91cExpa2VUeXBlEgkKAWMYASABKAUqSwoWRm9yZWlnbkVudW1FZGl0aW9uMjAyMxIPCgtGT1JFSUdOX0ZPTxAAEg8KC0ZPUkVJR05fQkFSEAESDwoLRk9SRUlHTl9CQVoQAjphCg9leHRlbnNpb25faW50MzISOC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLlRlc3RBbGxUeXBlc0VkaXRpb24yMDIzGHggASgFUg5leHRlbnNpb25JbnQzMjqVAQoNZ3JvdXBsaWtldHlwZRI4LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuVGVzdEFsbFR5cGVzRWRpdGlvbjIwMjMYeSABKAsyLi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLmVkaXRpb25zLkdyb3VwTGlrZVR5cGVCBaoBAigCUg1ncm91cGxpa2V0eXBlOpQBCg1kZWxpbWl0ZWRfZXh0EjgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5lZGl0aW9ucy5UZXN0QWxsVHlwZXNFZGl0aW9uMjAyMxh6IAEoCzIuLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbnMuR3JvdXBMaWtlVHlwZUIFqgECKAJSDGRlbGltaXRlZEV4dEI8Ci1jb20uZ29vZ2xlLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMuZWRpdGlvbjIwMjNQAaICCEVkaXRpb25zYghlZGl0aW9uc3DoBw");

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
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage optional_nested_message = 18;
   */
  optionalNestedMessage?: TestAllTypesEdition2023_NestedMessage;

  /**
   * @generated from field: protobuf_test_messages.editions.ForeignMessageEdition2023 optional_foreign_message = 19;
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
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023 recursive_message = 27;
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
   * @generated from field: repeated protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage repeated_nested_message = 48;
   */
  repeatedNestedMessage: TestAllTypesEdition2023_NestedMessage[];

  /**
   * @generated from field: repeated protobuf_test_messages.editions.ForeignMessageEdition2023 repeated_foreign_message = 49;
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
     * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage oneof_nested_message = 112;
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
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.GroupLikeType groupliketype = 201 [features.message_encoding = DELIMITED];
   */
  groupliketype?: TestAllTypesEdition2023_GroupLikeType;

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023.GroupLikeType delimited_field = 202 [features.message_encoding = DELIMITED];
   */
  delimitedField?: TestAllTypesEdition2023_GroupLikeType;
};

/**
 * Describes the message protobuf_test_messages.editions.TestAllTypesEdition2023.
 * Use `create(TestAllTypesEdition2023Schema)` to create a new message.
 */
export const TestAllTypesEdition2023Schema: GenMessage<TestAllTypesEdition2023> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 0);

/**
 * @generated from message protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage
 */
export type TestAllTypesEdition2023_NestedMessage = Message<"protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage"> & {
  /**
   * @generated from field: int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: protobuf_test_messages.editions.TestAllTypesEdition2023 corecursive = 2;
   */
  corecursive?: TestAllTypesEdition2023;
};

/**
 * Describes the message protobuf_test_messages.editions.TestAllTypesEdition2023.NestedMessage.
 * Use `create(TestAllTypesEdition2023_NestedMessageSchema)` to create a new message.
 */
export const TestAllTypesEdition2023_NestedMessageSchema: GenMessage<TestAllTypesEdition2023_NestedMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_edition2023, 0, 0);

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
  messageDesc(file_google_protobuf_test_messages_edition2023, 0, 1);

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
  enumDesc(file_google_protobuf_test_messages_edition2023, 0, 0);

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
  messageDesc(file_google_protobuf_test_messages_edition2023, 1);

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
  messageDesc(file_google_protobuf_test_messages_edition2023, 2);

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
 * @generated from extension: protobuf_test_messages.editions.GroupLikeType groupliketype = 121 [features.message_encoding = DELIMITED];
 */
export const groupliketype: GenExtension<TestAllTypesEdition2023, GroupLikeType> = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_edition2023, 1);

/**
 * @generated from extension: protobuf_test_messages.editions.GroupLikeType delimited_ext = 122 [features.message_encoding = DELIMITED];
 */
export const delimited_ext: GenExtension<TestAllTypesEdition2023, GroupLikeType> = /*@__PURE__*/
  extDesc(file_google_protobuf_test_messages_edition2023, 2);

