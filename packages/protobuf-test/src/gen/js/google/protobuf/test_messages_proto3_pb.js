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

// @generated by protoc-gen-es v2.0.0-alpha.4 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js,json_types=true"
// @generated from file google/protobuf/test_messages_proto3.proto (package protobuf_test_messages.proto3, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file google/protobuf/test_messages_proto3.proto.
 */
export const file_google_protobuf_test_messages_proto3 = /*@__PURE__*/
  fileDesc("Cipnb29nbGUvcHJvdG9idWYvdGVzdF9tZXNzYWdlc19wcm90bzMucHJvdG8SHXByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zIrFFChJUZXN0QWxsVHlwZXNQcm90bzMSFgoOb3B0aW9uYWxfaW50MzIYASABKAUSFgoOb3B0aW9uYWxfaW50NjQYAiABKAMSFwoPb3B0aW9uYWxfdWludDMyGAMgASgNEhcKD29wdGlvbmFsX3VpbnQ2NBgEIAEoBBIXCg9vcHRpb25hbF9zaW50MzIYBSABKBESFwoPb3B0aW9uYWxfc2ludDY0GAYgASgSEhgKEG9wdGlvbmFsX2ZpeGVkMzIYByABKAcSGAoQb3B0aW9uYWxfZml4ZWQ2NBgIIAEoBhIZChFvcHRpb25hbF9zZml4ZWQzMhgJIAEoDxIZChFvcHRpb25hbF9zZml4ZWQ2NBgKIAEoEBIWCg5vcHRpb25hbF9mbG9hdBgLIAEoAhIXCg9vcHRpb25hbF9kb3VibGUYDCABKAESFQoNb3B0aW9uYWxfYm9vbBgNIAEoCBIXCg9vcHRpb25hbF9zdHJpbmcYDiABKAkSFgoOb3B0aW9uYWxfYnl0ZXMYDyABKAwSYAoXb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UYEiABKAsyPy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkTWVzc2FnZRJPChhvcHRpb25hbF9mb3JlaWduX21lc3NhZ2UYEyABKAsyLS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5Gb3JlaWduTWVzc2FnZRJaChRvcHRpb25hbF9uZXN0ZWRfZW51bRgVIAEoDjI8LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5OZXN0ZWRFbnVtEkkKFW9wdGlvbmFsX2ZvcmVpZ25fZW51bRgWIAEoDjIqLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLkZvcmVpZ25FbnVtElwKFW9wdGlvbmFsX2FsaWFzZWRfZW51bRgXIAEoDjI9LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5BbGlhc2VkRW51bRIhChVvcHRpb25hbF9zdHJpbmdfcGllY2UYGCABKAlCAggCEhkKDW9wdGlvbmFsX2NvcmQYGSABKAlCAggBEkwKEXJlY3Vyc2l2ZV9tZXNzYWdlGBsgASgLMjEucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zEhYKDnJlcGVhdGVkX2ludDMyGB8gAygFEhYKDnJlcGVhdGVkX2ludDY0GCAgAygDEhcKD3JlcGVhdGVkX3VpbnQzMhghIAMoDRIXCg9yZXBlYXRlZF91aW50NjQYIiADKAQSFwoPcmVwZWF0ZWRfc2ludDMyGCMgAygREhcKD3JlcGVhdGVkX3NpbnQ2NBgkIAMoEhIYChByZXBlYXRlZF9maXhlZDMyGCUgAygHEhgKEHJlcGVhdGVkX2ZpeGVkNjQYJiADKAYSGQoRcmVwZWF0ZWRfc2ZpeGVkMzIYJyADKA8SGQoRcmVwZWF0ZWRfc2ZpeGVkNjQYKCADKBASFgoOcmVwZWF0ZWRfZmxvYXQYKSADKAISFwoPcmVwZWF0ZWRfZG91YmxlGCogAygBEhUKDXJlcGVhdGVkX2Jvb2wYKyADKAgSFwoPcmVwZWF0ZWRfc3RyaW5nGCwgAygJEhYKDnJlcGVhdGVkX2J5dGVzGC0gAygMEmAKF3JlcGVhdGVkX25lc3RlZF9tZXNzYWdlGDAgAygLMj8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk5lc3RlZE1lc3NhZ2USTwoYcmVwZWF0ZWRfZm9yZWlnbl9tZXNzYWdlGDEgAygLMi0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuRm9yZWlnbk1lc3NhZ2USWgoUcmVwZWF0ZWRfbmVzdGVkX2VudW0YMyADKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bRJJChVyZXBlYXRlZF9mb3JlaWduX2VudW0YNCADKA4yKi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5Gb3JlaWduRW51bRIhChVyZXBlYXRlZF9zdHJpbmdfcGllY2UYNiADKAlCAggCEhkKDXJlcGVhdGVkX2NvcmQYNyADKAlCAggBEhgKDHBhY2tlZF9pbnQzMhhLIAMoBUICEAESGAoMcGFja2VkX2ludDY0GEwgAygDQgIQARIZCg1wYWNrZWRfdWludDMyGE0gAygNQgIQARIZCg1wYWNrZWRfdWludDY0GE4gAygEQgIQARIZCg1wYWNrZWRfc2ludDMyGE8gAygRQgIQARIZCg1wYWNrZWRfc2ludDY0GFAgAygSQgIQARIaCg5wYWNrZWRfZml4ZWQzMhhRIAMoB0ICEAESGgoOcGFja2VkX2ZpeGVkNjQYUiADKAZCAhABEhsKD3BhY2tlZF9zZml4ZWQzMhhTIAMoD0ICEAESGwoPcGFja2VkX3NmaXhlZDY0GFQgAygQQgIQARIYCgxwYWNrZWRfZmxvYXQYVSADKAJCAhABEhkKDXBhY2tlZF9kb3VibGUYViADKAFCAhABEhcKC3BhY2tlZF9ib29sGFcgAygIQgIQARJcChJwYWNrZWRfbmVzdGVkX2VudW0YWCADKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bUICEAESGgoOdW5wYWNrZWRfaW50MzIYWSADKAVCAhAAEhoKDnVucGFja2VkX2ludDY0GFogAygDQgIQABIbCg91bnBhY2tlZF91aW50MzIYWyADKA1CAhAAEhsKD3VucGFja2VkX3VpbnQ2NBhcIAMoBEICEAASGwoPdW5wYWNrZWRfc2ludDMyGF0gAygRQgIQABIbCg91bnBhY2tlZF9zaW50NjQYXiADKBJCAhAAEhwKEHVucGFja2VkX2ZpeGVkMzIYXyADKAdCAhAAEhwKEHVucGFja2VkX2ZpeGVkNjQYYCADKAZCAhAAEh0KEXVucGFja2VkX3NmaXhlZDMyGGEgAygPQgIQABIdChF1bnBhY2tlZF9zZml4ZWQ2NBhiIAMoEEICEAASGgoOdW5wYWNrZWRfZmxvYXQYYyADKAJCAhAAEhsKD3VucGFja2VkX2RvdWJsZRhkIAMoAUICEAASGQoNdW5wYWNrZWRfYm9vbBhlIAMoCEICEAASXgoUdW5wYWNrZWRfbmVzdGVkX2VudW0YZiADKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bUICEAASXQoPbWFwX2ludDMyX2ludDMyGDggAygLMkQucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcEludDMySW50MzJFbnRyeRJdCg9tYXBfaW50NjRfaW50NjQYOSADKAsyRC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwSW50NjRJbnQ2NEVudHJ5EmEKEW1hcF91aW50MzJfdWludDMyGDogAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFVpbnQzMlVpbnQzMkVudHJ5EmEKEW1hcF91aW50NjRfdWludDY0GDsgAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFVpbnQ2NFVpbnQ2NEVudHJ5EmEKEW1hcF9zaW50MzJfc2ludDMyGDwgAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFNpbnQzMlNpbnQzMkVudHJ5EmEKEW1hcF9zaW50NjRfc2ludDY0GD0gAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFNpbnQ2NFNpbnQ2NEVudHJ5EmUKE21hcF9maXhlZDMyX2ZpeGVkMzIYPiADKAsySC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwRml4ZWQzMkZpeGVkMzJFbnRyeRJlChNtYXBfZml4ZWQ2NF9maXhlZDY0GD8gAygLMkgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcEZpeGVkNjRGaXhlZDY0RW50cnkSaQoVbWFwX3NmaXhlZDMyX3NmaXhlZDMyGEAgAygLMkoucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFNmaXhlZDMyU2ZpeGVkMzJFbnRyeRJpChVtYXBfc2ZpeGVkNjRfc2ZpeGVkNjQYQSADKAsySi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5El0KD21hcF9pbnQzMl9mbG9hdBhCIAMoCzJELnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBJbnQzMkZsb2F0RW50cnkSXwoQbWFwX2ludDMyX2RvdWJsZRhDIAMoCzJFLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBJbnQzMkRvdWJsZUVudHJ5ElkKDW1hcF9ib29sX2Jvb2wYRCADKAsyQi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwQm9vbEJvb2xFbnRyeRJhChFtYXBfc3RyaW5nX3N0cmluZxhFIAMoCzJGLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBTdHJpbmdTdHJpbmdFbnRyeRJfChBtYXBfc3RyaW5nX2J5dGVzGEYgAygLMkUucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFN0cmluZ0J5dGVzRW50cnkScAoZbWFwX3N0cmluZ19uZXN0ZWRfbWVzc2FnZRhHIAMoCzJNLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBTdHJpbmdOZXN0ZWRNZXNzYWdlRW50cnkScgoabWFwX3N0cmluZ19mb3JlaWduX21lc3NhZ2UYSCADKAsyTi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwU3RyaW5nRm9yZWlnbk1lc3NhZ2VFbnRyeRJqChZtYXBfc3RyaW5nX25lc3RlZF9lbnVtGEkgAygLMkoucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFN0cmluZ05lc3RlZEVudW1FbnRyeRJsChdtYXBfc3RyaW5nX2ZvcmVpZ25fZW51bRhKIAMoCzJLLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBTdHJpbmdGb3JlaWduRW51bUVudHJ5EhYKDG9uZW9mX3VpbnQzMhhvIAEoDUgAEl8KFG9uZW9mX25lc3RlZF9tZXNzYWdlGHAgASgLMj8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk5lc3RlZE1lc3NhZ2VIABIWCgxvbmVvZl9zdHJpbmcYcSABKAlIABIVCgtvbmVvZl9ieXRlcxhyIAEoDEgAEhQKCm9uZW9mX2Jvb2wYcyABKAhIABIWCgxvbmVvZl91aW50NjQYdCABKARIABIVCgtvbmVvZl9mbG9hdBh1IAEoAkgAEhYKDG9uZW9mX2RvdWJsZRh2IAEoAUgAElIKCm9uZW9mX2VudW0YdyABKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bUgAEjYKEG9uZW9mX251bGxfdmFsdWUYeCABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASOgoVb3B0aW9uYWxfYm9vbF93cmFwcGVyGMkBIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5Cb29sVmFsdWUSPAoWb3B0aW9uYWxfaW50MzJfd3JhcHBlchjKASABKAsyGy5nb29nbGUucHJvdG9idWYuSW50MzJWYWx1ZRI8ChZvcHRpb25hbF9pbnQ2NF93cmFwcGVyGMsBIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEj4KF29wdGlvbmFsX3VpbnQzMl93cmFwcGVyGMwBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRI+ChdvcHRpb25hbF91aW50NjRfd3JhcHBlchjNASABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDY0VmFsdWUSPAoWb3B0aW9uYWxfZmxvYXRfd3JhcHBlchjOASABKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZRI+ChdvcHRpb25hbF9kb3VibGVfd3JhcHBlchjPASABKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUSPgoXb3B0aW9uYWxfc3RyaW5nX3dyYXBwZXIY0AEgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlN0cmluZ1ZhbHVlEjwKFm9wdGlvbmFsX2J5dGVzX3dyYXBwZXIY0QEgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkJ5dGVzVmFsdWUSOgoVcmVwZWF0ZWRfYm9vbF93cmFwcGVyGNMBIAMoCzIaLmdvb2dsZS5wcm90b2J1Zi5Cb29sVmFsdWUSPAoWcmVwZWF0ZWRfaW50MzJfd3JhcHBlchjUASADKAsyGy5nb29nbGUucHJvdG9idWYuSW50MzJWYWx1ZRI8ChZyZXBlYXRlZF9pbnQ2NF93cmFwcGVyGNUBIAMoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEj4KF3JlcGVhdGVkX3VpbnQzMl93cmFwcGVyGNYBIAMoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRI+ChdyZXBlYXRlZF91aW50NjRfd3JhcHBlchjXASADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDY0VmFsdWUSPAoWcmVwZWF0ZWRfZmxvYXRfd3JhcHBlchjYASADKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZRI+ChdyZXBlYXRlZF9kb3VibGVfd3JhcHBlchjZASADKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUSPgoXcmVwZWF0ZWRfc3RyaW5nX3dyYXBwZXIY2gEgAygLMhwuZ29vZ2xlLnByb3RvYnVmLlN0cmluZ1ZhbHVlEjwKFnJlcGVhdGVkX2J5dGVzX3dyYXBwZXIY2wEgAygLMhsuZ29vZ2xlLnByb3RvYnVmLkJ5dGVzVmFsdWUSNQoRb3B0aW9uYWxfZHVyYXRpb24YrQIgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uEjcKEm9wdGlvbmFsX3RpbWVzdGFtcBiuAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEjgKE29wdGlvbmFsX2ZpZWxkX21hc2sYrwIgASgLMhouZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzaxIxCg9vcHRpb25hbF9zdHJ1Y3QYsAIgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBIrCgxvcHRpb25hbF9hbnkYsQIgASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueRIvCg5vcHRpb25hbF92YWx1ZRiyAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWUSOAoTb3B0aW9uYWxfbnVsbF92YWx1ZRizAiABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlEjUKEXJlcGVhdGVkX2R1cmF0aW9uGLcCIAMoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbhI3ChJyZXBlYXRlZF90aW1lc3RhbXAYuAIgAygLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBI3ChJyZXBlYXRlZF9maWVsZG1hc2sYuQIgAygLMhouZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzaxIxCg9yZXBlYXRlZF9zdHJ1Y3QYxAIgAygLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBIrCgxyZXBlYXRlZF9hbnkYuwIgAygLMhQuZ29vZ2xlLnByb3RvYnVmLkFueRIvCg5yZXBlYXRlZF92YWx1ZRi8AiADKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWUSOAoTcmVwZWF0ZWRfbGlzdF92YWx1ZRi9AiADKAsyGi5nb29nbGUucHJvdG9idWYuTGlzdFZhbHVlEhMKCmZpZWxkbmFtZTEYkQMgASgFEhQKC2ZpZWxkX25hbWUyGJIDIAEoBRIVCgxfZmllbGRfbmFtZTMYkwMgASgFEhYKDWZpZWxkX19uYW1lNF8YlAMgASgFEhQKC2ZpZWxkMG5hbWU1GJUDIAEoBRIWCg1maWVsZF8wX25hbWU2GJYDIAEoBRITCgpmaWVsZE5hbWU3GJcDIAEoBRITCgpGaWVsZE5hbWU4GJgDIAEoBRIUCgtmaWVsZF9OYW1lORiZAyABKAUSFQoMRmllbGRfTmFtZTEwGJoDIAEoBRIVCgxGSUVMRF9OQU1FMTEYmwMgASgFEhUKDEZJRUxEX25hbWUxMhicAyABKAUSFwoOX19maWVsZF9uYW1lMTMYnQMgASgFEhcKDl9fRmllbGRfbmFtZTE0GJ4DIAEoBRIWCg1maWVsZF9fbmFtZTE1GJ8DIAEoBRIWCg1maWVsZF9fTmFtZTE2GKADIAEoBRIXCg5maWVsZF9uYW1lMTdfXxihAyABKAUSFwoORmllbGRfbmFtZTE4X18YogMgASgFGmIKDU5lc3RlZE1lc3NhZ2USCQoBYRgBIAEoBRJGCgtjb3JlY3Vyc2l2ZRgCIAEoCzIxLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMxo0ChJNYXBJbnQzMkludDMyRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ARo0ChJNYXBJbnQ2NEludDY0RW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARo2ChRNYXBVaW50MzJVaW50MzJFbnRyeRILCgNrZXkYASABKA0SDQoFdmFsdWUYAiABKA06AjgBGjYKFE1hcFVpbnQ2NFVpbnQ2NEVudHJ5EgsKA2tleRgBIAEoBBINCgV2YWx1ZRgCIAEoBDoCOAEaNgoUTWFwU2ludDMyU2ludDMyRW50cnkSCwoDa2V5GAEgASgREg0KBXZhbHVlGAIgASgROgI4ARo2ChRNYXBTaW50NjRTaW50NjRFbnRyeRILCgNrZXkYASABKBISDQoFdmFsdWUYAiABKBI6AjgBGjgKFk1hcEZpeGVkMzJGaXhlZDMyRW50cnkSCwoDa2V5GAEgASgHEg0KBXZhbHVlGAIgASgHOgI4ARo4ChZNYXBGaXhlZDY0Rml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhINCgV2YWx1ZRgCIAEoBjoCOAEaOgoYTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoDxINCgV2YWx1ZRgCIAEoDzoCOAEaOgoYTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoEBINCgV2YWx1ZRgCIAEoEDoCOAEaNAoSTWFwSW50MzJGbG9hdEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoAjoCOAEaNQoTTWFwSW50MzJEb3VibGVFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAE6AjgBGjIKEE1hcEJvb2xCb29sRW50cnkSCwoDa2V5GAEgASgIEg0KBXZhbHVlGAIgASgIOgI4ARo2ChRNYXBTdHJpbmdTdHJpbmdFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjUKE01hcFN0cmluZ0J5dGVzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgMOgI4ARp+ChtNYXBTdHJpbmdOZXN0ZWRNZXNzYWdlRW50cnkSCwoDa2V5GAEgASgJEk4KBXZhbHVlGAIgASgLMj8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk5lc3RlZE1lc3NhZ2U6AjgBGm0KHE1hcFN0cmluZ0ZvcmVpZ25NZXNzYWdlRW50cnkSCwoDa2V5GAEgASgJEjwKBXZhbHVlGAIgASgLMi0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuRm9yZWlnbk1lc3NhZ2U6AjgBGngKGE1hcFN0cmluZ05lc3RlZEVudW1FbnRyeRILCgNrZXkYASABKAkSSwoFdmFsdWUYAiABKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bToCOAEaZwoZTWFwU3RyaW5nRm9yZWlnbkVudW1FbnRyeRILCgNrZXkYASABKAkSOQoFdmFsdWUYAiABKA4yKi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5Gb3JlaWduRW51bToCOAEiOQoKTmVzdGVkRW51bRIHCgNGT08QABIHCgNCQVIQARIHCgNCQVoQAhIQCgNORUcQ////////////ASJZCgtBbGlhc2VkRW51bRINCglBTElBU19GT08QABINCglBTElBU19CQVIQARINCglBTElBU19CQVoQAhIHCgNNT08QAhIHCgNtb28QAhIHCgNiQXoQAhoCEAFCDQoLb25lb2ZfZmllbGRKBgj1AxD/AyIbCg5Gb3JlaWduTWVzc2FnZRIJCgFjGAEgASgFIhYKFE51bGxIeXBvdGhlc2lzUHJvdG8zIi8KDkVudW1Pbmx5UHJvdG8zIh0KBEJvb2wSCgoGa0ZhbHNlEAASCQoFa1RydWUQASpACgtGb3JlaWduRW51bRIPCgtGT1JFSUdOX0ZPTxAAEg8KC0ZPUkVJR05fQkFSEAESDwoLRk9SRUlHTl9CQVoQAkI4Cihjb20uZ29vZ2xlLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zSAH4AQGiAgZQcm90bzNiBnByb3RvMw", [file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers]);

/**
 * Describes the message protobuf_test_messages.proto3.TestAllTypesProto3.
 * Use `create(TestAllTypesProto3Schema)` to create a new message.
 */
export const TestAllTypesProto3Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 0);

/**
 * Describes the message protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage.
 * Use `create(TestAllTypesProto3_NestedMessageSchema)` to create a new message.
 */
export const TestAllTypesProto3_NestedMessageSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 0, 0);

/**
 * Describes the enum protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum.
 */
export const TestAllTypesProto3_NestedEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 0, 0);

/**
 * @generated from enum protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum
 */
export const TestAllTypesProto3_NestedEnum = /*@__PURE__*/
  tsEnum(TestAllTypesProto3_NestedEnumSchema);

/**
 * Describes the enum protobuf_test_messages.proto3.TestAllTypesProto3.AliasedEnum.
 */
export const TestAllTypesProto3_AliasedEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 0, 1);

/**
 * @generated from enum protobuf_test_messages.proto3.TestAllTypesProto3.AliasedEnum
 */
export const TestAllTypesProto3_AliasedEnum = /*@__PURE__*/
  tsEnum(TestAllTypesProto3_AliasedEnumSchema);

/**
 * Describes the message protobuf_test_messages.proto3.ForeignMessage.
 * Use `create(ForeignMessageSchema)` to create a new message.
 */
export const ForeignMessageSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 1);

/**
 * Describes the message protobuf_test_messages.proto3.NullHypothesisProto3.
 * Use `create(NullHypothesisProto3Schema)` to create a new message.
 */
export const NullHypothesisProto3Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 2);

/**
 * Describes the message protobuf_test_messages.proto3.EnumOnlyProto3.
 * Use `create(EnumOnlyProto3Schema)` to create a new message.
 */
export const EnumOnlyProto3Schema = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 3);

/**
 * Describes the enum protobuf_test_messages.proto3.EnumOnlyProto3.Bool.
 */
export const EnumOnlyProto3_BoolSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 3, 0);

/**
 * @generated from enum protobuf_test_messages.proto3.EnumOnlyProto3.Bool
 */
export const EnumOnlyProto3_Bool = /*@__PURE__*/
  tsEnum(EnumOnlyProto3_BoolSchema);

/**
 * Describes the enum protobuf_test_messages.proto3.ForeignEnum.
 */
export const ForeignEnumSchema = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 0);

/**
 * @generated from enum protobuf_test_messages.proto3.ForeignEnum
 */
export const ForeignEnum = /*@__PURE__*/
  tsEnum(ForeignEnumSchema);

