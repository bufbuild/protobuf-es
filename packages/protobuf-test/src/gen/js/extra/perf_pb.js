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

// @generated by protoc-gen-es v2.2.0 with parameter "target=js+dts,import_extension=js"
// @generated from file extra/perf.proto (package perf.v1, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";

/**
 * Describes the file extra/perf.proto.
 */
export const file_extra_perf = /*@__PURE__*/
  fileDesc("ChBleHRyYS9wZXJmLnByb3RvEgdwZXJmLnYxIuYNCgtQZXJmTWVzc2FnZRIUCgxkb3VibGVfZmllbGQYASABKAESEwoLaW50MzJfZmllbGQYAiABKAUSFQoMdWludDMyX2ZpZWxkGIUaIAEoDRIYCgtpbnQ2NF9maWVsZBgDIAEoA0gDiAEBEhcKCmJvb2xfZmllbGQYBCABKAhIBIgBARIUCgxzdHJpbmdfZmllbGQYBSABKAkSEwoLYnl0ZXNfZmllbGQYBiABKAwSJQoKZW51bV9maWVsZBgHIAEoDjIRLnBlcmYudjEuUGVyZkVudW0SMQoTc21hbGxfbWVzc2FnZV9maWVsZBgIIAEoCzIULnBlcmYudjEuUGVyZk1lc3NhZ2USFgoOdW51c2VkX2ZpZWxkXzEYCSABKAUSFgoOdW51c2VkX2ZpZWxkXzIYCiABKAUSFgoOdW51c2VkX2ZpZWxkXzMYCyABKAUSFgoOdW51c2VkX2ZpZWxkXzQYDCABKAUSFgoOdW51c2VkX2ZpZWxkXzUYDSABKAUSFgoOdW51c2VkX2ZpZWxkXzYYDiABKAUSFgoOdW51c2VkX2ZpZWxkXzcYDyABKAUSFgoOdW51c2VkX2ZpZWxkXzgYECABKAUSFgoOdW51c2VkX2ZpZWxkXzkYESABKAUSFwoPdW51c2VkX2ZpZWxkXzEwGBIgASgFEh0KFXJlcGVhdGVkX2RvdWJsZV9maWVsZBgTIAMoARIcChRyZXBlYXRlZF9pbnQzMl9maWVsZBgUIAMoBRIcChRyZXBlYXRlZF9pbnQ2NF9maWVsZBgpIAMoAxIbChNyZXBlYXRlZF9ib29sX2ZpZWxkGBYgAygIEiMKG3JlcGVhdGVkX3Nob3J0X3N0cmluZ19maWVsZBgXIAMoCRIiChpyZXBlYXRlZF9sb25nX3N0cmluZ19maWVsZBgYIAMoCRIiChpyZXBlYXRlZF9zaG9ydF9ieXRlc19maWVsZBgZIAMoDBIhChlyZXBlYXRlZF9sb25nX2J5dGVzX2ZpZWxkGBogAygMEi4KE3JlcGVhdGVkX2VudW1fZmllbGQYGyADKA4yES5wZXJmLnYxLlBlcmZFbnVtEjoKHHJlcGVhdGVkX3NtYWxsX21lc3NhZ2VfZmllbGQYHCADKAsyFC5wZXJmLnYxLlBlcmZNZXNzYWdlEkAKD21hcF9pbnQzMl9pbnQzMhgeIAMoCzInLnBlcmYudjEuUGVyZk1lc3NhZ2UuTWFwSW50MzJJbnQzMkVudHJ5EkAKD21hcF9pbnQ2NF9pbnQ2NBgfIAMoCzInLnBlcmYudjEuUGVyZk1lc3NhZ2UuTWFwSW50NjRJbnQ2NEVudHJ5EkYKEm1hcF9zdHJpbmdfbWVzc2FnZRggIAMoCzIqLnBlcmYudjEuUGVyZk1lc3NhZ2UuTWFwU3RyaW5nTWVzc2FnZUVudHJ5EkAKD21hcF9zdHJpbmdfZW51bRghIAMoCzInLnBlcmYudjEuUGVyZk1lc3NhZ2UuTWFwU3RyaW5nRW51bUVudHJ5EjAKE29uZW9mX2VudW1fdmVyaWZpZWQYIiABKA4yES5wZXJmLnYxLlBlcmZFbnVtSAASMQoUb25lb2ZfZW51bV9jcm9tdWxlbnQYIyABKA4yES5wZXJmLnYxLlBlcmZFbnVtSAASMwoTb25lb2ZfbWVzc2FnZV9maWVsZBgkIAEoCzIULnBlcmYudjEuUGVyZk1lc3NhZ2VIARI5ChlvbmVvZl9zbWFsbF9tZXNzYWdlX2ZpZWxkGCUgASgLMhQucGVyZi52MS5QZXJmTWVzc2FnZUgBEhsKEW9uZW9mX2ludDMyX2ZpZWxkGCYgASgFSAISGgoQb25lb2ZfYm9vbF9maWVsZBgnIAEoCEgCEgoKAmlkGCggASgNGjQKEk1hcEludDMySW50MzJFbnRyeRILCgNrZXkYASABKAUSDQoFdmFsdWUYAiABKAU6AjgBGjQKEk1hcEludDY0SW50NjRFbnRyeRILCgNrZXkYASABKAMSDQoFdmFsdWUYAiABKAM6AjgBGk0KFU1hcFN0cmluZ01lc3NhZ2VFbnRyeRILCgNrZXkYASABKAkSIwoFdmFsdWUYAiABKAsyFC5wZXJmLnYxLlBlcmZNZXNzYWdlOgI4ARpHChJNYXBTdHJpbmdFbnVtRW50cnkSCwoDa2V5GAEgASgJEiAKBXZhbHVlGAIgASgOMhEucGVyZi52MS5QZXJmRW51bToCOAFCDAoKb25lb2ZfZW51bUIPCg1vbmVvZl9tZXNzYWdlQg4KDG9uZW9mX3NjYWxhckIOCgxfaW50NjRfZmllbGRCDQoLX2Jvb2xfZmllbGQqSgoIUGVyZkVudW0SGQoVUEVSRl9FTlVNX1VOU1BFQ0lGSUVEEAASEQoNUEVSRl9FTlVNX1lFUxABEhAKDFBFUkZfRU5VTV9OTxACYgZwcm90bzM");

/**
 * Describes the message perf.v1.PerfMessage.
 * Use `create(PerfMessageSchema)` to create a new message.
 */
export const PerfMessageSchema = /*@__PURE__*/
  messageDesc(file_extra_perf, 0);

/**
 * Describes the enum perf.v1.PerfEnum.
 */
export const PerfEnumSchema = /*@__PURE__*/
  enumDesc(file_extra_perf, 0);

/**
 * @generated from enum perf.v1.PerfEnum
 */
export const PerfEnum = /*@__PURE__*/
  tsEnum(PerfEnumSchema);

