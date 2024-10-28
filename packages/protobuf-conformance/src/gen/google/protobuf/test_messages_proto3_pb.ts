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

// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file google/protobuf/test_messages_proto3.proto (package protobuf_test_messages.proto3, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Any, BoolValue, BytesValue, DoubleValue, Duration, FieldMask, FloatValue, Int32Value, Int64Value, ListValue, NullValue, StringValue, Timestamp, UInt32Value, UInt64Value, Value } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/test_messages_proto3.proto.
 */
export const file_google_protobuf_test_messages_proto3: GenFile = /*@__PURE__*/
  fileDesc("Cipnb29nbGUvcHJvdG9idWYvdGVzdF9tZXNzYWdlc19wcm90bzMucHJvdG8SHXByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zIrFFChJUZXN0QWxsVHlwZXNQcm90bzMSFgoOb3B0aW9uYWxfaW50MzIYASABKAUSFgoOb3B0aW9uYWxfaW50NjQYAiABKAMSFwoPb3B0aW9uYWxfdWludDMyGAMgASgNEhcKD29wdGlvbmFsX3VpbnQ2NBgEIAEoBBIXCg9vcHRpb25hbF9zaW50MzIYBSABKBESFwoPb3B0aW9uYWxfc2ludDY0GAYgASgSEhgKEG9wdGlvbmFsX2ZpeGVkMzIYByABKAcSGAoQb3B0aW9uYWxfZml4ZWQ2NBgIIAEoBhIZChFvcHRpb25hbF9zZml4ZWQzMhgJIAEoDxIZChFvcHRpb25hbF9zZml4ZWQ2NBgKIAEoEBIWCg5vcHRpb25hbF9mbG9hdBgLIAEoAhIXCg9vcHRpb25hbF9kb3VibGUYDCABKAESFQoNb3B0aW9uYWxfYm9vbBgNIAEoCBIXCg9vcHRpb25hbF9zdHJpbmcYDiABKAkSFgoOb3B0aW9uYWxfYnl0ZXMYDyABKAwSYAoXb3B0aW9uYWxfbmVzdGVkX21lc3NhZ2UYEiABKAsyPy5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkTWVzc2FnZRJPChhvcHRpb25hbF9mb3JlaWduX21lc3NhZ2UYEyABKAsyLS5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5Gb3JlaWduTWVzc2FnZRJaChRvcHRpb25hbF9uZXN0ZWRfZW51bRgVIAEoDjI8LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5OZXN0ZWRFbnVtEkkKFW9wdGlvbmFsX2ZvcmVpZ25fZW51bRgWIAEoDjIqLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLkZvcmVpZ25FbnVtElwKFW9wdGlvbmFsX2FsaWFzZWRfZW51bRgXIAEoDjI9LnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5BbGlhc2VkRW51bRIhChVvcHRpb25hbF9zdHJpbmdfcGllY2UYGCABKAlCAggCEhkKDW9wdGlvbmFsX2NvcmQYGSABKAlCAggBEkwKEXJlY3Vyc2l2ZV9tZXNzYWdlGBsgASgLMjEucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zEhYKDnJlcGVhdGVkX2ludDMyGB8gAygFEhYKDnJlcGVhdGVkX2ludDY0GCAgAygDEhcKD3JlcGVhdGVkX3VpbnQzMhghIAMoDRIXCg9yZXBlYXRlZF91aW50NjQYIiADKAQSFwoPcmVwZWF0ZWRfc2ludDMyGCMgAygREhcKD3JlcGVhdGVkX3NpbnQ2NBgkIAMoEhIYChByZXBlYXRlZF9maXhlZDMyGCUgAygHEhgKEHJlcGVhdGVkX2ZpeGVkNjQYJiADKAYSGQoRcmVwZWF0ZWRfc2ZpeGVkMzIYJyADKA8SGQoRcmVwZWF0ZWRfc2ZpeGVkNjQYKCADKBASFgoOcmVwZWF0ZWRfZmxvYXQYKSADKAISFwoPcmVwZWF0ZWRfZG91YmxlGCogAygBEhUKDXJlcGVhdGVkX2Jvb2wYKyADKAgSFwoPcmVwZWF0ZWRfc3RyaW5nGCwgAygJEhYKDnJlcGVhdGVkX2J5dGVzGC0gAygMEmAKF3JlcGVhdGVkX25lc3RlZF9tZXNzYWdlGDAgAygLMj8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk5lc3RlZE1lc3NhZ2USTwoYcmVwZWF0ZWRfZm9yZWlnbl9tZXNzYWdlGDEgAygLMi0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuRm9yZWlnbk1lc3NhZ2USWgoUcmVwZWF0ZWRfbmVzdGVkX2VudW0YMyADKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bRJJChVyZXBlYXRlZF9mb3JlaWduX2VudW0YNCADKA4yKi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5Gb3JlaWduRW51bRIhChVyZXBlYXRlZF9zdHJpbmdfcGllY2UYNiADKAlCAggCEhkKDXJlcGVhdGVkX2NvcmQYNyADKAlCAggBEhgKDHBhY2tlZF9pbnQzMhhLIAMoBUICEAESGAoMcGFja2VkX2ludDY0GEwgAygDQgIQARIZCg1wYWNrZWRfdWludDMyGE0gAygNQgIQARIZCg1wYWNrZWRfdWludDY0GE4gAygEQgIQARIZCg1wYWNrZWRfc2ludDMyGE8gAygRQgIQARIZCg1wYWNrZWRfc2ludDY0GFAgAygSQgIQARIaCg5wYWNrZWRfZml4ZWQzMhhRIAMoB0ICEAESGgoOcGFja2VkX2ZpeGVkNjQYUiADKAZCAhABEhsKD3BhY2tlZF9zZml4ZWQzMhhTIAMoD0ICEAESGwoPcGFja2VkX3NmaXhlZDY0GFQgAygQQgIQARIYCgxwYWNrZWRfZmxvYXQYVSADKAJCAhABEhkKDXBhY2tlZF9kb3VibGUYViADKAFCAhABEhcKC3BhY2tlZF9ib29sGFcgAygIQgIQARJcChJwYWNrZWRfbmVzdGVkX2VudW0YWCADKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bUICEAESGgoOdW5wYWNrZWRfaW50MzIYWSADKAVCAhAAEhoKDnVucGFja2VkX2ludDY0GFogAygDQgIQABIbCg91bnBhY2tlZF91aW50MzIYWyADKA1CAhAAEhsKD3VucGFja2VkX3VpbnQ2NBhcIAMoBEICEAASGwoPdW5wYWNrZWRfc2ludDMyGF0gAygRQgIQABIbCg91bnBhY2tlZF9zaW50NjQYXiADKBJCAhAAEhwKEHVucGFja2VkX2ZpeGVkMzIYXyADKAdCAhAAEhwKEHVucGFja2VkX2ZpeGVkNjQYYCADKAZCAhAAEh0KEXVucGFja2VkX3NmaXhlZDMyGGEgAygPQgIQABIdChF1bnBhY2tlZF9zZml4ZWQ2NBhiIAMoEEICEAASGgoOdW5wYWNrZWRfZmxvYXQYYyADKAJCAhAAEhsKD3VucGFja2VkX2RvdWJsZRhkIAMoAUICEAASGQoNdW5wYWNrZWRfYm9vbBhlIAMoCEICEAASXgoUdW5wYWNrZWRfbmVzdGVkX2VudW0YZiADKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bUICEAASXQoPbWFwX2ludDMyX2ludDMyGDggAygLMkQucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcEludDMySW50MzJFbnRyeRJdCg9tYXBfaW50NjRfaW50NjQYOSADKAsyRC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwSW50NjRJbnQ2NEVudHJ5EmEKEW1hcF91aW50MzJfdWludDMyGDogAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFVpbnQzMlVpbnQzMkVudHJ5EmEKEW1hcF91aW50NjRfdWludDY0GDsgAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFVpbnQ2NFVpbnQ2NEVudHJ5EmEKEW1hcF9zaW50MzJfc2ludDMyGDwgAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFNpbnQzMlNpbnQzMkVudHJ5EmEKEW1hcF9zaW50NjRfc2ludDY0GD0gAygLMkYucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFNpbnQ2NFNpbnQ2NEVudHJ5EmUKE21hcF9maXhlZDMyX2ZpeGVkMzIYPiADKAsySC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwRml4ZWQzMkZpeGVkMzJFbnRyeRJlChNtYXBfZml4ZWQ2NF9maXhlZDY0GD8gAygLMkgucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcEZpeGVkNjRGaXhlZDY0RW50cnkSaQoVbWFwX3NmaXhlZDMyX3NmaXhlZDMyGEAgAygLMkoucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFNmaXhlZDMyU2ZpeGVkMzJFbnRyeRJpChVtYXBfc2ZpeGVkNjRfc2ZpeGVkNjQYQSADKAsySi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5El0KD21hcF9pbnQzMl9mbG9hdBhCIAMoCzJELnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBJbnQzMkZsb2F0RW50cnkSXwoQbWFwX2ludDMyX2RvdWJsZRhDIAMoCzJFLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBJbnQzMkRvdWJsZUVudHJ5ElkKDW1hcF9ib29sX2Jvb2wYRCADKAsyQi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwQm9vbEJvb2xFbnRyeRJhChFtYXBfc3RyaW5nX3N0cmluZxhFIAMoCzJGLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBTdHJpbmdTdHJpbmdFbnRyeRJfChBtYXBfc3RyaW5nX2J5dGVzGEYgAygLMkUucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFN0cmluZ0J5dGVzRW50cnkScAoZbWFwX3N0cmluZ19uZXN0ZWRfbWVzc2FnZRhHIAMoCzJNLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBTdHJpbmdOZXN0ZWRNZXNzYWdlRW50cnkScgoabWFwX3N0cmluZ19mb3JlaWduX21lc3NhZ2UYSCADKAsyTi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTWFwU3RyaW5nRm9yZWlnbk1lc3NhZ2VFbnRyeRJqChZtYXBfc3RyaW5nX25lc3RlZF9lbnVtGEkgAygLMkoucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk1hcFN0cmluZ05lc3RlZEVudW1FbnRyeRJsChdtYXBfc3RyaW5nX2ZvcmVpZ25fZW51bRhKIAMoCzJLLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMy5NYXBTdHJpbmdGb3JlaWduRW51bUVudHJ5EhYKDG9uZW9mX3VpbnQzMhhvIAEoDUgAEl8KFG9uZW9mX25lc3RlZF9tZXNzYWdlGHAgASgLMj8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk5lc3RlZE1lc3NhZ2VIABIWCgxvbmVvZl9zdHJpbmcYcSABKAlIABIVCgtvbmVvZl9ieXRlcxhyIAEoDEgAEhQKCm9uZW9mX2Jvb2wYcyABKAhIABIWCgxvbmVvZl91aW50NjQYdCABKARIABIVCgtvbmVvZl9mbG9hdBh1IAEoAkgAEhYKDG9uZW9mX2RvdWJsZRh2IAEoAUgAElIKCm9uZW9mX2VudW0YdyABKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bUgAEjYKEG9uZW9mX251bGxfdmFsdWUYeCABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASOgoVb3B0aW9uYWxfYm9vbF93cmFwcGVyGMkBIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5Cb29sVmFsdWUSPAoWb3B0aW9uYWxfaW50MzJfd3JhcHBlchjKASABKAsyGy5nb29nbGUucHJvdG9idWYuSW50MzJWYWx1ZRI8ChZvcHRpb25hbF9pbnQ2NF93cmFwcGVyGMsBIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEj4KF29wdGlvbmFsX3VpbnQzMl93cmFwcGVyGMwBIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRI+ChdvcHRpb25hbF91aW50NjRfd3JhcHBlchjNASABKAsyHC5nb29nbGUucHJvdG9idWYuVUludDY0VmFsdWUSPAoWb3B0aW9uYWxfZmxvYXRfd3JhcHBlchjOASABKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZRI+ChdvcHRpb25hbF9kb3VibGVfd3JhcHBlchjPASABKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUSPgoXb3B0aW9uYWxfc3RyaW5nX3dyYXBwZXIY0AEgASgLMhwuZ29vZ2xlLnByb3RvYnVmLlN0cmluZ1ZhbHVlEjwKFm9wdGlvbmFsX2J5dGVzX3dyYXBwZXIY0QEgASgLMhsuZ29vZ2xlLnByb3RvYnVmLkJ5dGVzVmFsdWUSOgoVcmVwZWF0ZWRfYm9vbF93cmFwcGVyGNMBIAMoCzIaLmdvb2dsZS5wcm90b2J1Zi5Cb29sVmFsdWUSPAoWcmVwZWF0ZWRfaW50MzJfd3JhcHBlchjUASADKAsyGy5nb29nbGUucHJvdG9idWYuSW50MzJWYWx1ZRI8ChZyZXBlYXRlZF9pbnQ2NF93cmFwcGVyGNUBIAMoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEj4KF3JlcGVhdGVkX3VpbnQzMl93cmFwcGVyGNYBIAMoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRI+ChdyZXBlYXRlZF91aW50NjRfd3JhcHBlchjXASADKAsyHC5nb29nbGUucHJvdG9idWYuVUludDY0VmFsdWUSPAoWcmVwZWF0ZWRfZmxvYXRfd3JhcHBlchjYASADKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZRI+ChdyZXBlYXRlZF9kb3VibGVfd3JhcHBlchjZASADKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUSPgoXcmVwZWF0ZWRfc3RyaW5nX3dyYXBwZXIY2gEgAygLMhwuZ29vZ2xlLnByb3RvYnVmLlN0cmluZ1ZhbHVlEjwKFnJlcGVhdGVkX2J5dGVzX3dyYXBwZXIY2wEgAygLMhsuZ29vZ2xlLnByb3RvYnVmLkJ5dGVzVmFsdWUSNQoRb3B0aW9uYWxfZHVyYXRpb24YrQIgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uEjcKEm9wdGlvbmFsX3RpbWVzdGFtcBiuAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEjgKE29wdGlvbmFsX2ZpZWxkX21hc2sYrwIgASgLMhouZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzaxIxCg9vcHRpb25hbF9zdHJ1Y3QYsAIgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBIrCgxvcHRpb25hbF9hbnkYsQIgASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueRIvCg5vcHRpb25hbF92YWx1ZRiyAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWUSOAoTb3B0aW9uYWxfbnVsbF92YWx1ZRizAiABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlEjUKEXJlcGVhdGVkX2R1cmF0aW9uGLcCIAMoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbhI3ChJyZXBlYXRlZF90aW1lc3RhbXAYuAIgAygLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBI3ChJyZXBlYXRlZF9maWVsZG1hc2sYuQIgAygLMhouZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzaxIxCg9yZXBlYXRlZF9zdHJ1Y3QYxAIgAygLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBIrCgxyZXBlYXRlZF9hbnkYuwIgAygLMhQuZ29vZ2xlLnByb3RvYnVmLkFueRIvCg5yZXBlYXRlZF92YWx1ZRi8AiADKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWUSOAoTcmVwZWF0ZWRfbGlzdF92YWx1ZRi9AiADKAsyGi5nb29nbGUucHJvdG9idWYuTGlzdFZhbHVlEhMKCmZpZWxkbmFtZTEYkQMgASgFEhQKC2ZpZWxkX25hbWUyGJIDIAEoBRIVCgxfZmllbGRfbmFtZTMYkwMgASgFEhYKDWZpZWxkX19uYW1lNF8YlAMgASgFEhQKC2ZpZWxkMG5hbWU1GJUDIAEoBRIWCg1maWVsZF8wX25hbWU2GJYDIAEoBRITCgpmaWVsZE5hbWU3GJcDIAEoBRITCgpGaWVsZE5hbWU4GJgDIAEoBRIUCgtmaWVsZF9OYW1lORiZAyABKAUSFQoMRmllbGRfTmFtZTEwGJoDIAEoBRIVCgxGSUVMRF9OQU1FMTEYmwMgASgFEhUKDEZJRUxEX25hbWUxMhicAyABKAUSFwoOX19maWVsZF9uYW1lMTMYnQMgASgFEhcKDl9fRmllbGRfbmFtZTE0GJ4DIAEoBRIWCg1maWVsZF9fbmFtZTE1GJ8DIAEoBRIWCg1maWVsZF9fTmFtZTE2GKADIAEoBRIXCg5maWVsZF9uYW1lMTdfXxihAyABKAUSFwoORmllbGRfbmFtZTE4X18YogMgASgFGmIKDU5lc3RlZE1lc3NhZ2USCQoBYRgBIAEoBRJGCgtjb3JlY3Vyc2l2ZRgCIAEoCzIxLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zLlRlc3RBbGxUeXBlc1Byb3RvMxo0ChJNYXBJbnQzMkludDMyRW50cnkSCwoDa2V5GAEgASgFEg0KBXZhbHVlGAIgASgFOgI4ARo0ChJNYXBJbnQ2NEludDY0RW50cnkSCwoDa2V5GAEgASgDEg0KBXZhbHVlGAIgASgDOgI4ARo2ChRNYXBVaW50MzJVaW50MzJFbnRyeRILCgNrZXkYASABKA0SDQoFdmFsdWUYAiABKA06AjgBGjYKFE1hcFVpbnQ2NFVpbnQ2NEVudHJ5EgsKA2tleRgBIAEoBBINCgV2YWx1ZRgCIAEoBDoCOAEaNgoUTWFwU2ludDMyU2ludDMyRW50cnkSCwoDa2V5GAEgASgREg0KBXZhbHVlGAIgASgROgI4ARo2ChRNYXBTaW50NjRTaW50NjRFbnRyeRILCgNrZXkYASABKBISDQoFdmFsdWUYAiABKBI6AjgBGjgKFk1hcEZpeGVkMzJGaXhlZDMyRW50cnkSCwoDa2V5GAEgASgHEg0KBXZhbHVlGAIgASgHOgI4ARo4ChZNYXBGaXhlZDY0Rml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoBhINCgV2YWx1ZRgCIAEoBjoCOAEaOgoYTWFwU2ZpeGVkMzJTZml4ZWQzMkVudHJ5EgsKA2tleRgBIAEoDxINCgV2YWx1ZRgCIAEoDzoCOAEaOgoYTWFwU2ZpeGVkNjRTZml4ZWQ2NEVudHJ5EgsKA2tleRgBIAEoEBINCgV2YWx1ZRgCIAEoEDoCOAEaNAoSTWFwSW50MzJGbG9hdEVudHJ5EgsKA2tleRgBIAEoBRINCgV2YWx1ZRgCIAEoAjoCOAEaNQoTTWFwSW50MzJEb3VibGVFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAE6AjgBGjIKEE1hcEJvb2xCb29sRW50cnkSCwoDa2V5GAEgASgIEg0KBXZhbHVlGAIgASgIOgI4ARo2ChRNYXBTdHJpbmdTdHJpbmdFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBGjUKE01hcFN0cmluZ0J5dGVzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgMOgI4ARp+ChtNYXBTdHJpbmdOZXN0ZWRNZXNzYWdlRW50cnkSCwoDa2V5GAEgASgJEk4KBXZhbHVlGAIgASgLMj8ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuVGVzdEFsbFR5cGVzUHJvdG8zLk5lc3RlZE1lc3NhZ2U6AjgBGm0KHE1hcFN0cmluZ0ZvcmVpZ25NZXNzYWdlRW50cnkSCwoDa2V5GAEgASgJEjwKBXZhbHVlGAIgASgLMi0ucHJvdG9idWZfdGVzdF9tZXNzYWdlcy5wcm90bzMuRm9yZWlnbk1lc3NhZ2U6AjgBGngKGE1hcFN0cmluZ05lc3RlZEVudW1FbnRyeRILCgNrZXkYASABKAkSSwoFdmFsdWUYAiABKA4yPC5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5UZXN0QWxsVHlwZXNQcm90bzMuTmVzdGVkRW51bToCOAEaZwoZTWFwU3RyaW5nRm9yZWlnbkVudW1FbnRyeRILCgNrZXkYASABKAkSOQoFdmFsdWUYAiABKA4yKi5wcm90b2J1Zl90ZXN0X21lc3NhZ2VzLnByb3RvMy5Gb3JlaWduRW51bToCOAEiOQoKTmVzdGVkRW51bRIHCgNGT08QABIHCgNCQVIQARIHCgNCQVoQAhIQCgNORUcQ////////////ASJZCgtBbGlhc2VkRW51bRINCglBTElBU19GT08QABINCglBTElBU19CQVIQARINCglBTElBU19CQVoQAhIHCgNNT08QAhIHCgNtb28QAhIHCgNiQXoQAhoCEAFCDQoLb25lb2ZfZmllbGRKBgj1AxD/AyIbCg5Gb3JlaWduTWVzc2FnZRIJCgFjGAEgASgFIhYKFE51bGxIeXBvdGhlc2lzUHJvdG8zIi8KDkVudW1Pbmx5UHJvdG8zIh0KBEJvb2wSCgoGa0ZhbHNlEAASCQoFa1RydWUQASpACgtGb3JlaWduRW51bRIPCgtGT1JFSUdOX0ZPTxAAEg8KC0ZPUkVJR05fQkFSEAESDwoLRk9SRUlHTl9CQVoQAkI4Cihjb20uZ29vZ2xlLnByb3RvYnVmX3Rlc3RfbWVzc2FnZXMucHJvdG8zSAH4AQGiAgZQcm90bzNiBnByb3RvMw", [file_google_protobuf_any, file_google_protobuf_duration, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_protobuf_wrappers]);

/**
 * This proto includes every type of field in both singular and repeated
 * forms.
 *
 * Also, crucially, all messages and enums in this file are eventually
 * submessages of this message.  So for example, a fuzz test of TestAllTypes
 * could trigger bugs that occur in any message type in this file.  We verify
 * this stays true in a unit test.
 *
 * @generated from message protobuf_test_messages.proto3.TestAllTypesProto3
 */
export type TestAllTypesProto3 = Message<"protobuf_test_messages.proto3.TestAllTypesProto3"> & {
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
   * @generated from field: protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage optional_nested_message = 18;
   */
  optionalNestedMessage?: TestAllTypesProto3_NestedMessage;

  /**
   * @generated from field: protobuf_test_messages.proto3.ForeignMessage optional_foreign_message = 19;
   */
  optionalForeignMessage?: ForeignMessage;

  /**
   * @generated from field: protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum optional_nested_enum = 21;
   */
  optionalNestedEnum: TestAllTypesProto3_NestedEnum;

  /**
   * @generated from field: protobuf_test_messages.proto3.ForeignEnum optional_foreign_enum = 22;
   */
  optionalForeignEnum: ForeignEnum;

  /**
   * @generated from field: protobuf_test_messages.proto3.TestAllTypesProto3.AliasedEnum optional_aliased_enum = 23;
   */
  optionalAliasedEnum: TestAllTypesProto3_AliasedEnum;

  /**
   * @generated from field: string optional_string_piece = 24;
   */
  optionalStringPiece: string;

  /**
   * @generated from field: string optional_cord = 25;
   */
  optionalCord: string;

  /**
   * @generated from field: protobuf_test_messages.proto3.TestAllTypesProto3 recursive_message = 27;
   */
  recursiveMessage?: TestAllTypesProto3;

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
   * @generated from field: repeated protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage repeated_nested_message = 48;
   */
  repeatedNestedMessage: TestAllTypesProto3_NestedMessage[];

  /**
   * @generated from field: repeated protobuf_test_messages.proto3.ForeignMessage repeated_foreign_message = 49;
   */
  repeatedForeignMessage: ForeignMessage[];

  /**
   * @generated from field: repeated protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum repeated_nested_enum = 51;
   */
  repeatedNestedEnum: TestAllTypesProto3_NestedEnum[];

  /**
   * @generated from field: repeated protobuf_test_messages.proto3.ForeignEnum repeated_foreign_enum = 52;
   */
  repeatedForeignEnum: ForeignEnum[];

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
   * @generated from field: repeated int32 packed_int32 = 75 [packed = true];
   */
  packedInt32: number[];

  /**
   * @generated from field: repeated int64 packed_int64 = 76 [packed = true];
   */
  packedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 packed_uint32 = 77 [packed = true];
   */
  packedUint32: number[];

  /**
   * @generated from field: repeated uint64 packed_uint64 = 78 [packed = true];
   */
  packedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 packed_sint32 = 79 [packed = true];
   */
  packedSint32: number[];

  /**
   * @generated from field: repeated sint64 packed_sint64 = 80 [packed = true];
   */
  packedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 packed_fixed32 = 81 [packed = true];
   */
  packedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 packed_fixed64 = 82 [packed = true];
   */
  packedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 packed_sfixed32 = 83 [packed = true];
   */
  packedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 packed_sfixed64 = 84 [packed = true];
   */
  packedSfixed64: bigint[];

  /**
   * @generated from field: repeated float packed_float = 85 [packed = true];
   */
  packedFloat: number[];

  /**
   * @generated from field: repeated double packed_double = 86 [packed = true];
   */
  packedDouble: number[];

  /**
   * @generated from field: repeated bool packed_bool = 87 [packed = true];
   */
  packedBool: boolean[];

  /**
   * @generated from field: repeated protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum packed_nested_enum = 88 [packed = true];
   */
  packedNestedEnum: TestAllTypesProto3_NestedEnum[];

  /**
   * Unpacked
   *
   * @generated from field: repeated int32 unpacked_int32 = 89 [packed = false];
   */
  unpackedInt32: number[];

  /**
   * @generated from field: repeated int64 unpacked_int64 = 90 [packed = false];
   */
  unpackedInt64: bigint[];

  /**
   * @generated from field: repeated uint32 unpacked_uint32 = 91 [packed = false];
   */
  unpackedUint32: number[];

  /**
   * @generated from field: repeated uint64 unpacked_uint64 = 92 [packed = false];
   */
  unpackedUint64: bigint[];

  /**
   * @generated from field: repeated sint32 unpacked_sint32 = 93 [packed = false];
   */
  unpackedSint32: number[];

  /**
   * @generated from field: repeated sint64 unpacked_sint64 = 94 [packed = false];
   */
  unpackedSint64: bigint[];

  /**
   * @generated from field: repeated fixed32 unpacked_fixed32 = 95 [packed = false];
   */
  unpackedFixed32: number[];

  /**
   * @generated from field: repeated fixed64 unpacked_fixed64 = 96 [packed = false];
   */
  unpackedFixed64: bigint[];

  /**
   * @generated from field: repeated sfixed32 unpacked_sfixed32 = 97 [packed = false];
   */
  unpackedSfixed32: number[];

  /**
   * @generated from field: repeated sfixed64 unpacked_sfixed64 = 98 [packed = false];
   */
  unpackedSfixed64: bigint[];

  /**
   * @generated from field: repeated float unpacked_float = 99 [packed = false];
   */
  unpackedFloat: number[];

  /**
   * @generated from field: repeated double unpacked_double = 100 [packed = false];
   */
  unpackedDouble: number[];

  /**
   * @generated from field: repeated bool unpacked_bool = 101 [packed = false];
   */
  unpackedBool: boolean[];

  /**
   * @generated from field: repeated protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum unpacked_nested_enum = 102 [packed = false];
   */
  unpackedNestedEnum: TestAllTypesProto3_NestedEnum[];

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
   * @generated from field: map<string, protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage> map_string_nested_message = 71;
   */
  mapStringNestedMessage: { [key: string]: TestAllTypesProto3_NestedMessage };

  /**
   * @generated from field: map<string, protobuf_test_messages.proto3.ForeignMessage> map_string_foreign_message = 72;
   */
  mapStringForeignMessage: { [key: string]: ForeignMessage };

  /**
   * @generated from field: map<string, protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum> map_string_nested_enum = 73;
   */
  mapStringNestedEnum: { [key: string]: TestAllTypesProto3_NestedEnum };

  /**
   * @generated from field: map<string, protobuf_test_messages.proto3.ForeignEnum> map_string_foreign_enum = 74;
   */
  mapStringForeignEnum: { [key: string]: ForeignEnum };

  /**
   * @generated from oneof protobuf_test_messages.proto3.TestAllTypesProto3.oneof_field
   */
  oneofField: {
    /**
     * @generated from field: uint32 oneof_uint32 = 111;
     */
    value: number;
    case: "oneofUint32";
  } | {
    /**
     * @generated from field: protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage oneof_nested_message = 112;
     */
    value: TestAllTypesProto3_NestedMessage;
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
     * @generated from field: protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum oneof_enum = 119;
     */
    value: TestAllTypesProto3_NestedEnum;
    case: "oneofEnum";
  } | {
    /**
     * @generated from field: google.protobuf.NullValue oneof_null_value = 120;
     */
    value: NullValue;
    case: "oneofNullValue";
  } | { case: undefined; value?: undefined };

  /**
   * Well-known types
   *
   * @generated from field: google.protobuf.BoolValue optional_bool_wrapper = 201;
   */
  optionalBoolWrapper?: boolean;

  /**
   * @generated from field: google.protobuf.Int32Value optional_int32_wrapper = 202;
   */
  optionalInt32Wrapper?: number;

  /**
   * @generated from field: google.protobuf.Int64Value optional_int64_wrapper = 203;
   */
  optionalInt64Wrapper?: bigint;

  /**
   * @generated from field: google.protobuf.UInt32Value optional_uint32_wrapper = 204;
   */
  optionalUint32Wrapper?: number;

  /**
   * @generated from field: google.protobuf.UInt64Value optional_uint64_wrapper = 205;
   */
  optionalUint64Wrapper?: bigint;

  /**
   * @generated from field: google.protobuf.FloatValue optional_float_wrapper = 206;
   */
  optionalFloatWrapper?: number;

  /**
   * @generated from field: google.protobuf.DoubleValue optional_double_wrapper = 207;
   */
  optionalDoubleWrapper?: number;

  /**
   * @generated from field: google.protobuf.StringValue optional_string_wrapper = 208;
   */
  optionalStringWrapper?: string;

  /**
   * @generated from field: google.protobuf.BytesValue optional_bytes_wrapper = 209;
   */
  optionalBytesWrapper?: Uint8Array;

  /**
   * @generated from field: repeated google.protobuf.BoolValue repeated_bool_wrapper = 211;
   */
  repeatedBoolWrapper: BoolValue[];

  /**
   * @generated from field: repeated google.protobuf.Int32Value repeated_int32_wrapper = 212;
   */
  repeatedInt32Wrapper: Int32Value[];

  /**
   * @generated from field: repeated google.protobuf.Int64Value repeated_int64_wrapper = 213;
   */
  repeatedInt64Wrapper: Int64Value[];

  /**
   * @generated from field: repeated google.protobuf.UInt32Value repeated_uint32_wrapper = 214;
   */
  repeatedUint32Wrapper: UInt32Value[];

  /**
   * @generated from field: repeated google.protobuf.UInt64Value repeated_uint64_wrapper = 215;
   */
  repeatedUint64Wrapper: UInt64Value[];

  /**
   * @generated from field: repeated google.protobuf.FloatValue repeated_float_wrapper = 216;
   */
  repeatedFloatWrapper: FloatValue[];

  /**
   * @generated from field: repeated google.protobuf.DoubleValue repeated_double_wrapper = 217;
   */
  repeatedDoubleWrapper: DoubleValue[];

  /**
   * @generated from field: repeated google.protobuf.StringValue repeated_string_wrapper = 218;
   */
  repeatedStringWrapper: StringValue[];

  /**
   * @generated from field: repeated google.protobuf.BytesValue repeated_bytes_wrapper = 219;
   */
  repeatedBytesWrapper: BytesValue[];

  /**
   * @generated from field: google.protobuf.Duration optional_duration = 301;
   */
  optionalDuration?: Duration;

  /**
   * @generated from field: google.protobuf.Timestamp optional_timestamp = 302;
   */
  optionalTimestamp?: Timestamp;

  /**
   * @generated from field: google.protobuf.FieldMask optional_field_mask = 303;
   */
  optionalFieldMask?: FieldMask;

  /**
   * @generated from field: google.protobuf.Struct optional_struct = 304;
   */
  optionalStruct?: JsonObject;

  /**
   * @generated from field: google.protobuf.Any optional_any = 305;
   */
  optionalAny?: Any;

  /**
   * @generated from field: google.protobuf.Value optional_value = 306;
   */
  optionalValue?: Value;

  /**
   * @generated from field: google.protobuf.NullValue optional_null_value = 307;
   */
  optionalNullValue: NullValue;

  /**
   * @generated from field: repeated google.protobuf.Duration repeated_duration = 311;
   */
  repeatedDuration: Duration[];

  /**
   * @generated from field: repeated google.protobuf.Timestamp repeated_timestamp = 312;
   */
  repeatedTimestamp: Timestamp[];

  /**
   * @generated from field: repeated google.protobuf.FieldMask repeated_fieldmask = 313;
   */
  repeatedFieldmask: FieldMask[];

  /**
   * @generated from field: repeated google.protobuf.Struct repeated_struct = 324;
   */
  repeatedStruct: JsonObject[];

  /**
   * @generated from field: repeated google.protobuf.Any repeated_any = 315;
   */
  repeatedAny: Any[];

  /**
   * @generated from field: repeated google.protobuf.Value repeated_value = 316;
   */
  repeatedValue: Value[];

  /**
   * @generated from field: repeated google.protobuf.ListValue repeated_list_value = 317;
   */
  repeatedListValue: ListValue[];

  /**
   * Test field-name-to-JSON-name convention.
   * (protobuf says names can be any valid C/C++ identifier.)
   *
   * @generated from field: int32 fieldname1 = 401;
   */
  fieldname1: number;

  /**
   * @generated from field: int32 field_name2 = 402;
   */
  fieldName2: number;

  /**
   * @generated from field: int32 _field_name3 = 403;
   */
  FieldName3: number;

  /**
   * @generated from field: int32 field__name4_ = 404;
   */
  fieldName4: number;

  /**
   * @generated from field: int32 field0name5 = 405;
   */
  field0name5: number;

  /**
   * @generated from field: int32 field_0_name6 = 406;
   */
  field0Name6: number;

  /**
   * @generated from field: int32 fieldName7 = 407;
   */
  fieldName7: number;

  /**
   * @generated from field: int32 FieldName8 = 408;
   */
  FieldName8: number;

  /**
   * @generated from field: int32 field_Name9 = 409;
   */
  fieldName9: number;

  /**
   * @generated from field: int32 Field_Name10 = 410;
   */
  FieldName10: number;

  /**
   * @generated from field: int32 FIELD_NAME11 = 411;
   */
  FIELDNAME11: number;

  /**
   * @generated from field: int32 FIELD_name12 = 412;
   */
  FIELDName12: number;

  /**
   * @generated from field: int32 __field_name13 = 413;
   */
  FieldName13: number;

  /**
   * @generated from field: int32 __Field_name14 = 414;
   */
  FieldName14: number;

  /**
   * @generated from field: int32 field__name15 = 415;
   */
  fieldName15: number;

  /**
   * @generated from field: int32 field__Name16 = 416;
   */
  fieldName16: number;

  /**
   * @generated from field: int32 field_name17__ = 417;
   */
  fieldName17: number;

  /**
   * @generated from field: int32 Field_name18__ = 418;
   */
  FieldName18: number;
};

/**
 * Describes the message protobuf_test_messages.proto3.TestAllTypesProto3.
 * Use `create(TestAllTypesProto3Schema)` to create a new message.
 */
export const TestAllTypesProto3Schema: GenMessage<TestAllTypesProto3> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 0);

/**
 * @generated from message protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage
 */
export type TestAllTypesProto3_NestedMessage = Message<"protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage"> & {
  /**
   * @generated from field: int32 a = 1;
   */
  a: number;

  /**
   * @generated from field: protobuf_test_messages.proto3.TestAllTypesProto3 corecursive = 2;
   */
  corecursive?: TestAllTypesProto3;
};

/**
 * Describes the message protobuf_test_messages.proto3.TestAllTypesProto3.NestedMessage.
 * Use `create(TestAllTypesProto3_NestedMessageSchema)` to create a new message.
 */
export const TestAllTypesProto3_NestedMessageSchema: GenMessage<TestAllTypesProto3_NestedMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 0, 0);

/**
 * @generated from enum protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum
 */
export enum TestAllTypesProto3_NestedEnum {
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
 * Describes the enum protobuf_test_messages.proto3.TestAllTypesProto3.NestedEnum.
 */
export const TestAllTypesProto3_NestedEnumSchema: GenEnum<TestAllTypesProto3_NestedEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 0, 0);

/**
 * @generated from enum protobuf_test_messages.proto3.TestAllTypesProto3.AliasedEnum
 */
export enum TestAllTypesProto3_AliasedEnum {
  /**
   * @generated from enum value: ALIAS_FOO = 0;
   */
  ALIAS_FOO = 0,

  /**
   * @generated from enum value: ALIAS_BAR = 1;
   */
  ALIAS_BAR = 1,

  /**
   * @generated from enum value: ALIAS_BAZ = 2;
   */
  ALIAS_BAZ = 2,

  /**
   * @generated from enum value: MOO = 2;
   */
  MOO = 2,

  /**
   * @generated from enum value: moo = 2;
   */
  moo = 2,

  /**
   * @generated from enum value: bAz = 2;
   */
  bAz = 2,
}

/**
 * Describes the enum protobuf_test_messages.proto3.TestAllTypesProto3.AliasedEnum.
 */
export const TestAllTypesProto3_AliasedEnumSchema: GenEnum<TestAllTypesProto3_AliasedEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 0, 1);

/**
 * @generated from message protobuf_test_messages.proto3.ForeignMessage
 */
export type ForeignMessage = Message<"protobuf_test_messages.proto3.ForeignMessage"> & {
  /**
   * @generated from field: int32 c = 1;
   */
  c: number;
};

/**
 * Describes the message protobuf_test_messages.proto3.ForeignMessage.
 * Use `create(ForeignMessageSchema)` to create a new message.
 */
export const ForeignMessageSchema: GenMessage<ForeignMessage> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 1);

/**
 * @generated from message protobuf_test_messages.proto3.NullHypothesisProto3
 */
export type NullHypothesisProto3 = Message<"protobuf_test_messages.proto3.NullHypothesisProto3"> & {
};

/**
 * Describes the message protobuf_test_messages.proto3.NullHypothesisProto3.
 * Use `create(NullHypothesisProto3Schema)` to create a new message.
 */
export const NullHypothesisProto3Schema: GenMessage<NullHypothesisProto3> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 2);

/**
 * @generated from message protobuf_test_messages.proto3.EnumOnlyProto3
 */
export type EnumOnlyProto3 = Message<"protobuf_test_messages.proto3.EnumOnlyProto3"> & {
};

/**
 * Describes the message protobuf_test_messages.proto3.EnumOnlyProto3.
 * Use `create(EnumOnlyProto3Schema)` to create a new message.
 */
export const EnumOnlyProto3Schema: GenMessage<EnumOnlyProto3> = /*@__PURE__*/
  messageDesc(file_google_protobuf_test_messages_proto3, 3);

/**
 * @generated from enum protobuf_test_messages.proto3.EnumOnlyProto3.Bool
 */
export enum EnumOnlyProto3_Bool {
  /**
   * @generated from enum value: kFalse = 0;
   */
  kFalse = 0,

  /**
   * @generated from enum value: kTrue = 1;
   */
  kTrue = 1,
}

/**
 * Describes the enum protobuf_test_messages.proto3.EnumOnlyProto3.Bool.
 */
export const EnumOnlyProto3_BoolSchema: GenEnum<EnumOnlyProto3_Bool> = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 3, 0);

/**
 * @generated from enum protobuf_test_messages.proto3.ForeignEnum
 */
export enum ForeignEnum {
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
 * Describes the enum protobuf_test_messages.proto3.ForeignEnum.
 */
export const ForeignEnumSchema: GenEnum<ForeignEnum> = /*@__PURE__*/
  enumDesc(file_google_protobuf_test_messages_proto3, 0);

