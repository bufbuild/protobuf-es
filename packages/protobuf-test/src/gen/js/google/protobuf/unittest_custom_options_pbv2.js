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

// Author: benjy@google.com (Benjy Weinberger)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file used to test the "custom options" feature of google.protobuf.

// @generated by protoc-gen-es-next v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_custom_options.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.

import { enumDesc, extDesc, fileDesc, messageDesc, serviceDesc, tsEnum } from "@bufbuild/protobuf/next/codegenv1";
import { fileDesc_google_protobuf_any, fileDesc_google_protobuf_descriptor } from "@bufbuild/protobuf/next";

export const fileDesc_google_protobuf_unittest_custom_options = fileDesc("Ci1nb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfY3VzdG9tX29wdGlvbnMucHJvdG8SEXByb3RvYnVmX3VuaXR0ZXN0ItACChxUZXN0TWVzc2FnZVdpdGhDdXN0b21PcHRpb25zEh4KBmZpZWxkMRgBIAEoCUIOCAHB4MMdLeF1CgIAAAASFQoLb25lb2ZfZmllbGQYAiABKAVIABJeCgltYXBfZmllbGQYAyADKAsyPS5wcm90b2J1Zl91bml0dGVzdC5UZXN0TWVzc2FnZVdpdGhDdXN0b21PcHRpb25zLk1hcEZpZWxkRW50cnlCDMHgwx05MAAAAAAAABovCg1NYXBGaWVsZEVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiOwoGQW5FbnVtEg8KC0FORU5VTV9WQUwxEAESFgoLQU5FTlVNX1ZBTDIQAhoFsIb6BXsaCMX2yR3r/P//OhAIAODpwh3I//////////8BQhkKB0FuT25lb2YSDviswx2d//////////8BIhgKFkN1c3RvbU9wdGlvbkZvb1JlcXVlc3QiGQoXQ3VzdG9tT3B0aW9uRm9vUmVzcG9uc2UiHgocQ3VzdG9tT3B0aW9uRm9vQ2xpZW50TWVzc2FnZSIeChxDdXN0b21PcHRpb25Gb29TZXJ2ZXJNZXNzYWdlIm0KGkR1bW15TWVzc2FnZUNvbnRhaW5pbmdFbnVtIk8KDFRlc3RFbnVtVHlwZRIaChZURVNUX09QVElPTl9FTlVNX1RZUEUxEBYSIwoWVEVTVF9PUFRJT05fRU5VTV9UWVBFMhDp//////////8BIiEKH0R1bW15TWVzc2FnZUludmFsaWRBc09wdGlvblR5cGUiigEKHEN1c3RvbU9wdGlvbk1pbkludGVnZXJWYWx1ZXM6apnWqB0AAAAAAAAAgK2Nrx0AAACAke6vHQAAAAAAAAAAnfWvHQAAAAD4l7Ad////////////AYDEsB3/////D/j1sB0AgJOyHQCwvLIdgICAgICAgICAAejGsh2AgICA+P////8B0N6yHQAikQEKHEN1c3RvbU9wdGlvbk1heEludGVnZXJWYWx1ZXM6cZnWqB3/////////f62Nrx3///9/ke6vHf//////////nfWvHf/////4l7Ad/v//////////AYDEsB3+////D/j1sB3///////////8BgJOyHf////8PsLyyHf//////////f+jGsh3/////B9Desh0BIm4KF0N1c3RvbU9wdGlvbk90aGVyVmFsdWVzOlOI2aId6f//////////AbLZoh0LSGVsbG8AV29ybGSq3KIdDkhlbGxvLCAiV29ybGQi6dyiHftZjELKwPM/9d+jHeeHRUHoxrIdnP//////////ASI0ChxTZXR0aW5nUmVhbHNGcm9tUG9zaXRpdmVJbnRzOhTp3KIdAAAAAABAY0D136MdAABAQSI0ChxTZXR0aW5nUmVhbHNGcm9tTmVnYXRpdmVJbnRzOhTp3KIdAAAAAABAY8D136MdAABAwSJVChJDb21wbGV4T3B0aW9uVHlwZTESCwoDZm9vGAEgASgFEgwKBGZvbzIYAiABKAUSDAoEZm9vMxgDIAEoBRIMCgRmb280GAQgAygFKggIZBCAgICAAiKYAwoSQ29tcGxleE9wdGlvblR5cGUyEjIKA2JhchgBIAEoCzIlLnByb3RvYnVmX3VuaXR0ZXN0LkNvbXBsZXhPcHRpb25UeXBlMRILCgNiYXoYAiABKAUSRgoEZnJlZBgDIAEoCzI4LnByb3RvYnVmX3VuaXR0ZXN0LkNvbXBsZXhPcHRpb25UeXBlMi5Db21wbGV4T3B0aW9uVHlwZTQSSAoGYmFybmV5GAQgAygLMjgucHJvdG9idWZfdW5pdHRlc3QuQ29tcGxleE9wdGlvblR5cGUyLkNvbXBsZXhPcHRpb25UeXBlNBqkAQoSQ29tcGxleE9wdGlvblR5cGU0Eg0KBXdhbGRvGAEgASgFMn8KDGNvbXBsZXhfb3B0NBIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxiK9dEDIAEoCzI4LnByb3RvYnVmX3VuaXR0ZXN0LkNvbXBsZXhPcHRpb25UeXBlMi5Db21wbGV4T3B0aW9uVHlwZTRSC2NvbXBsZXhPcHQ0KggIZBCAgICAAiKcAQoSQ29tcGxleE9wdGlvblR5cGUzEgsKA21vbxgBIAEoBRJUChJjb21wbGV4b3B0aW9udHlwZTUYAiABKAoyOC5wcm90b2J1Zl91bml0dGVzdC5Db21wbGV4T3B0aW9uVHlwZTMuQ29tcGxleE9wdGlvblR5cGU1GiMKEkNvbXBsZXhPcHRpb25UeXBlNRINCgVwbHVnaBgDIAEoBSIfCgtDb21wbGV4T3B0NhIQCgV4eXp6eRjfv88DIAEoBSKXAQoVVmFyaW91c0NvbXBsZXhPcHRpb25zOn7j3Pwc+P37HBjk3Pwc0qiPHQMIsw/63pAdBggJExgWFKr9kB1AChEI5wWS9Z0dAwjYD9iFnh3PDxDbBxoDCMECIgIIZSIDCNQBwqyXHREI5QWS9Z0dAwjJENiFnh3OD/jmlx2OBaLilR0UCCogYyBYkvWdHQMI7AbYhZ4dxAIiIwoTQWdncmVnYXRlTWVzc2FnZVNldCoICAQQ/////wc6AggBIrYBChpBZ2dyZWdhdGVNZXNzYWdlU2V0RWxlbWVudBIJCgFzGAEgASgJMowBChVtZXNzYWdlX3NldF9leHRlbnNpb24SJi5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVNZXNzYWdlU2V0GPbrrgcgASgLMi0ucHJvdG9idWZfdW5pdHRlc3QuQWdncmVnYXRlTWVzc2FnZVNldEVsZW1lbnRSE21lc3NhZ2VTZXRFeHRlbnNpb24iqAIKCUFnZ3JlZ2F0ZRIJCgFpGAEgASgFEgkKAXMYAiABKAkSKQoDc3ViGAMgASgLMhwucHJvdG9idWZfdW5pdHRlc3QuQWdncmVnYXRlEioKBGZpbGUYBCABKAsyHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMSNAoEbXNldBgFIAEoCzImLnByb3RvYnVmX3VuaXR0ZXN0LkFnZ3JlZ2F0ZU1lc3NhZ2VTZXQSIQoDYW55GAYgASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueTJVCgZuZXN0ZWQSHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMYp9GwByABKAsyHC5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVSBm5lc3RlZCJZChBBZ2dyZWdhdGVNZXNzYWdlEikKCWZpZWxkbmFtZRgBIAEoBUIW8qGHOxESD0ZpZWxkQW5ub3RhdGlvbjoawtGGOxUIZRIRTWVzc2FnZUFubm90YXRpb24i2gEKEE5lc3RlZE9wdGlvblR5cGUaOwoNTmVzdGVkTWVzc2FnZRIiCgxuZXN0ZWRfZmllbGQYASABKAVCDMHgwx3qAwAAAAAAADoG4OnCHekHIjUKCk5lc3RlZEVudW0SHQoRTkVTVEVEX0VOVU1fVkFMVUUQARoGsIb6BewHGgjF9skd6wMAADJSChBuZXN0ZWRfZXh0ZW5zaW9uEhwuZ29vZ2xlLnByb3RvYnVmLkZpbGVPcHRpb25zGP344gMgASgFQgbIi8od7QdSD25lc3RlZEV4dGVuc2lvbiJkCg1PbGRPcHRpb25UeXBlEjgKBXZhbHVlGAEgAigOMikucHJvdG9idWZfdW5pdHRlc3QuT2xkT3B0aW9uVHlwZS5UZXN0RW51bSIZCghUZXN0RW51bRINCglPTERfVkFMVUUQACJzCg1OZXdPcHRpb25UeXBlEjgKBXZhbHVlGAEgAigOMikucHJvdG9idWZfdW5pdHRlc3QuTmV3T3B0aW9uVHlwZS5UZXN0RW51bSIoCghUZXN0RW51bRINCglPTERfVkFMVUUQABINCglORVdfVkFMVUUQASItCiFUZXN0TWVzc2FnZVdpdGhSZXF1aXJlZEVudW1PcHRpb246CPro/JQDAggAKjYKCk1ldGhvZE9wdDESEwoPTUVUSE9ET1BUMV9WQUwxEAESEwoPTUVUSE9ET1BUMV9WQUwyEAIqTQoNQWdncmVnYXRlRW51bRIlCgVWQUxVRRABGhrK/Ik7FRITRW51bVZhbHVlQW5ub3RhdGlvbhoVkpWIOxASDkVudW1Bbm5vdGF0aW9uMo4BChxUZXN0U2VydmljZVdpdGhDdXN0b21PcHRpb25zEmMKA0ZvbxIpLnByb3RvYnVmX3VuaXR0ZXN0LkN1c3RvbU9wdGlvbkZvb1JlcXVlc3QaKi5wcm90b2J1Zl91bml0dGVzdC5DdXN0b21PcHRpb25Gb29SZXNwb25zZSIF4PqMHgIaCZCyix7T24DLSTKZAQoQQWdncmVnYXRlU2VydmljZRJrCgZNZXRob2QSIy5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVNZXNzYWdlGiMucHJvdG9idWZfdW5pdHRlc3QuQWdncmVnYXRlTWVzc2FnZSIXysiWOxISEE1ldGhvZEFubm90YXRpb24aGMr7jjsTEhFTZXJ2aWNlQW5ub3RhdGlvbjo8CglmaWxlX29wdDESHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMYjp3YAyABKARSCGZpbGVPcHQxOkUKDG1lc3NhZ2Vfb3B0MRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxicrdgDIAEoBVILbWVzc2FnZU9wdDE6PwoKZmllbGRfb3B0MRIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYiLzYAyABKAZSCWZpZWxkT3B0MTpDCgpmaWVsZF9vcHQyEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxi5odkDIAEoBToCNDJSCWZpZWxkT3B0Mjo/CgpvbmVvZl9vcHQxEh0uZ29vZ2xlLnByb3RvYnVmLk9uZW9mT3B0aW9ucxjPtdgDIAEoBVIJb25lb2ZPcHQxOjwKCWVudW1fb3B0MRIcLmdvb2dsZS5wcm90b2J1Zi5FbnVtT3B0aW9ucxjontkDIAEoD1IIZW51bU9wdDE6SwoPZW51bV92YWx1ZV9vcHQxEiEuZ29vZ2xlLnByb3RvYnVmLkVudW1WYWx1ZU9wdGlvbnMY5qBfIAEoBVINZW51bVZhbHVlT3B0MTpFCgxzZXJ2aWNlX29wdDESHy5nb29nbGUucHJvdG9idWYuU2VydmljZU9wdGlvbnMYorbhAyABKBJSC3NlcnZpY2VPcHQxOmEKC21ldGhvZF9vcHQxEh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMYrM/hAyABKA4yHS5wcm90b2J1Zl91bml0dGVzdC5NZXRob2RPcHQxUgptZXRob2RPcHQxOj0KCGJvb2xfb3B0Eh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGOqr1gMgASgIUgdib29sT3B0Oj8KCWludDMyX29wdBIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxjtqNYDIAEoBVIIaW50MzJPcHQ6PwoJaW50NjRfb3B0Eh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGMan1gMgASgDUghpbnQ2NE9wdDpBCgp1aW50MzJfb3B0Eh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGLCi1gMgASgNUgl1aW50MzJPcHQ6QQoKdWludDY0X29wdBIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxjfjtYDIAEoBFIJdWludDY0T3B0OkEKCnNpbnQzMl9vcHQSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYwIjWAyABKBFSCXNpbnQzMk9wdDpBCgpzaW50NjRfb3B0Eh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGP+C1gMgASgSUglzaW50NjRPcHQ6QwoLZml4ZWQzMl9vcHQSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMY0/7VAyABKAdSCmZpeGVkMzJPcHQ6QwoLZml4ZWQ2NF9vcHQSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMY4v3VAyABKAZSCmZpeGVkNjRPcHQ6RQoMc2ZpeGVkMzJfb3B0Eh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGNXx1QMgASgPUgtzZml4ZWQzMk9wdDpFCgxzZml4ZWQ2NF9vcHQSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMY44rVAyABKBBSC3NmaXhlZDY0T3B0Oj8KCWZsb2F0X29wdBIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxj+u9QDIAEoAlIIZmxvYXRPcHQ6QQoKZG91YmxlX29wdBIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxjNq9QDIAEoAVIJZG91YmxlT3B0OkEKCnN0cmluZ19vcHQSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYxavUAyABKAlSCXN0cmluZ09wdDo/CglieXRlc19vcHQSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYlqvUAyABKAxSCGJ5dGVzT3B0OnkKCGVudW1fb3B0Eh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGJGr1AMgASgOMjoucHJvdG9idWZfdW5pdHRlc3QuRHVtbXlNZXNzYWdlQ29udGFpbmluZ0VudW0uVGVzdEVudW1UeXBlUgdlbnVtT3B0OoABChBtZXNzYWdlX3R5cGVfb3B0Eh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGK/y0wMgASgLMjIucHJvdG9idWZfdW5pdHRlc3QuRHVtbXlNZXNzYWdlSW52YWxpZEFzT3B0aW9uVHlwZVIObWVzc2FnZVR5cGVPcHQ6PAoEbW9vbxIlLnByb3RvYnVmX3VuaXR0ZXN0LkNvbXBsZXhPcHRpb25UeXBlMRjb4NMDIAEoBVIEbW9vbzplCgVjb3JnZRIlLnByb3RvYnVmX3VuaXR0ZXN0LkNvbXBsZXhPcHRpb25UeXBlMRjS3tMDIAEoCzIlLnByb3RvYnVmX3VuaXR0ZXN0LkNvbXBsZXhPcHRpb25UeXBlM1IFY29yZ2U6QAoGZ3JhdWx0EiUucHJvdG9idWZfdW5pdHRlc3QuQ29tcGxleE9wdGlvblR5cGUyGO/80gMgASgFUgZncmF1bHQ6ZwoGZ2FycGx5EiUucHJvdG9idWZfdW5pdHRlc3QuQ29tcGxleE9wdGlvblR5cGUyGMj10gMgASgLMiUucHJvdG9idWZfdW5pdHRlc3QuQ29tcGxleE9wdGlvblR5cGUxUgZnYXJwbHk6bAoMY29tcGxleF9vcHQxEh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGKTc0gMgASgLMiUucHJvdG9idWZfdW5pdHRlc3QuQ29tcGxleE9wdGlvblR5cGUxUgtjb21wbGV4T3B0MTpsCgxjb21wbGV4X29wdDISHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMY1Y/SAyABKAsyJS5wcm90b2J1Zl91bml0dGVzdC5Db21wbGV4T3B0aW9uVHlwZTJSC2NvbXBsZXhPcHQyOmwKDGNvbXBsZXhfb3B0MxIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxjvi9IDIAEoCzIlLnByb3RvYnVmX3VuaXR0ZXN0LkNvbXBsZXhPcHRpb25UeXBlM1ILY29tcGxleE9wdDM6ZAoLY29tcGxleG9wdDYSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYzMvPAyABKAoyHi5wcm90b2J1Zl91bml0dGVzdC5Db21wbGV4T3B0NlILY29tcGxleG9wdDY6VwoHZmlsZW9wdBIcLmdvb2dsZS5wcm90b2J1Zi5GaWxlT3B0aW9ucxjP3bAHIAEoCzIcLnByb3RvYnVmX3VuaXR0ZXN0LkFnZ3JlZ2F0ZVIHZmlsZW9wdDpYCgZtc2dvcHQSHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYmOqwByABKAsyHC5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVSBm1zZ29wdDpaCghmaWVsZG9wdBIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYnvSwByABKAsyHC5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVSCGZpZWxkb3B0OlcKB2VudW1vcHQSHC5nb29nbGUucHJvdG9idWYuRW51bU9wdGlvbnMY0oKxByABKAsyHC5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVSB2VudW1vcHQ6YgoKZW51bXZhbG9wdBIhLmdvb2dsZS5wcm90b2J1Zi5FbnVtVmFsdWVPcHRpb25zGMmfsQcgASgLMhwucHJvdG9idWZfdW5pdHRlc3QuQWdncmVnYXRlUgplbnVtdmFsb3B0OmAKCnNlcnZpY2VvcHQSHy5nb29nbGUucHJvdG9idWYuU2VydmljZU9wdGlvbnMYue+xByABKAsyHC5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVSCnNlcnZpY2VvcHQ6XQoJbWV0aG9kb3B0Eh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMYiemyByABKAsyHC5wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVSCW1ldGhvZG9wdDpwChFyZXF1aXJlZF9lbnVtX29wdBIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxiPzc8yIAEoCzIgLnByb3RvYnVmX3VuaXR0ZXN0Lk9sZE9wdGlvblR5cGVSD3JlcXVpcmVkRW51bU9wdELpAYABAYgBAZABAfDowR3qrcDlJPrshTvRAQhkEg5GaWxlQW5ub3RhdGlvbhoWEhROZXN0ZWRGaWxlQW5ub3RhdGlvbiIe+uyFOxkSF0ZpbGVFeHRlbnNpb25Bbm5vdGF0aW9uKiQLEPbrrgcaGwoZRW1iZWRkZWRNZXNzYWdlU2V0RWxlbWVudAwyXwpAdHlwZS5nb29nbGVhcGlzLmNvbS9wcm90b2J1Zl91bml0dGVzdC5BZ2dyZWdhdGVNZXNzYWdlU2V0RWxlbWVudBIbChlFbWJlZGRlZE1lc3NhZ2VTZXRFbGVtZW50", [fileDesc_google_protobuf_any, fileDesc_google_protobuf_descriptor]);

// Describes the message protobuf_unittest.TestMessageWithCustomOptions. Use `create(TestMessageWithCustomOptionsDesc)` to create a new TestMessageWithCustomOptions.
export const TestMessageWithCustomOptionsDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 0);

// Describes the enum protobuf_unittest.TestMessageWithCustomOptions.AnEnum.
export const TestMessageWithCustomOptions_AnEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_custom_options, 0, 0);

/**
 * @generated from enum protobuf_unittest.TestMessageWithCustomOptions.AnEnum
 */
export const TestMessageWithCustomOptions_AnEnum = tsEnum(TestMessageWithCustomOptions_AnEnumDesc);

// Describes the message protobuf_unittest.CustomOptionFooRequest. Use `create(CustomOptionFooRequestDesc)` to create a new CustomOptionFooRequest.
export const CustomOptionFooRequestDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 1);

// Describes the message protobuf_unittest.CustomOptionFooResponse. Use `create(CustomOptionFooResponseDesc)` to create a new CustomOptionFooResponse.
export const CustomOptionFooResponseDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 2);

// Describes the message protobuf_unittest.CustomOptionFooClientMessage. Use `create(CustomOptionFooClientMessageDesc)` to create a new CustomOptionFooClientMessage.
export const CustomOptionFooClientMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 3);

// Describes the message protobuf_unittest.CustomOptionFooServerMessage. Use `create(CustomOptionFooServerMessageDesc)` to create a new CustomOptionFooServerMessage.
export const CustomOptionFooServerMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 4);

// Describes the message protobuf_unittest.DummyMessageContainingEnum. Use `create(DummyMessageContainingEnumDesc)` to create a new DummyMessageContainingEnum.
export const DummyMessageContainingEnumDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 5);

// Describes the enum protobuf_unittest.DummyMessageContainingEnum.TestEnumType.
export const DummyMessageContainingEnum_TestEnumTypeDesc = enumDesc(fileDesc_google_protobuf_unittest_custom_options, 5, 0);

/**
 * @generated from enum protobuf_unittest.DummyMessageContainingEnum.TestEnumType
 */
export const DummyMessageContainingEnum_TestEnumType = tsEnum(DummyMessageContainingEnum_TestEnumTypeDesc);

// Describes the message protobuf_unittest.DummyMessageInvalidAsOptionType. Use `create(DummyMessageInvalidAsOptionTypeDesc)` to create a new DummyMessageInvalidAsOptionType.
export const DummyMessageInvalidAsOptionTypeDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 6);

// Describes the message protobuf_unittest.CustomOptionMinIntegerValues. Use `create(CustomOptionMinIntegerValuesDesc)` to create a new CustomOptionMinIntegerValues.
export const CustomOptionMinIntegerValuesDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 7);

// Describes the message protobuf_unittest.CustomOptionMaxIntegerValues. Use `create(CustomOptionMaxIntegerValuesDesc)` to create a new CustomOptionMaxIntegerValues.
export const CustomOptionMaxIntegerValuesDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 8);

// Describes the message protobuf_unittest.CustomOptionOtherValues. Use `create(CustomOptionOtherValuesDesc)` to create a new CustomOptionOtherValues.
export const CustomOptionOtherValuesDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 9);

// Describes the message protobuf_unittest.SettingRealsFromPositiveInts. Use `create(SettingRealsFromPositiveIntsDesc)` to create a new SettingRealsFromPositiveInts.
export const SettingRealsFromPositiveIntsDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 10);

// Describes the message protobuf_unittest.SettingRealsFromNegativeInts. Use `create(SettingRealsFromNegativeIntsDesc)` to create a new SettingRealsFromNegativeInts.
export const SettingRealsFromNegativeIntsDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 11);

// Describes the message protobuf_unittest.ComplexOptionType1. Use `create(ComplexOptionType1Desc)` to create a new ComplexOptionType1.
export const ComplexOptionType1Desc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 12);

// Describes the message protobuf_unittest.ComplexOptionType2. Use `create(ComplexOptionType2Desc)` to create a new ComplexOptionType2.
export const ComplexOptionType2Desc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 13);

// Describes the message protobuf_unittest.ComplexOptionType2.ComplexOptionType4. Use `create(ComplexOptionType2_ComplexOptionType4Desc)` to create a new ComplexOptionType2_ComplexOptionType4.
export const ComplexOptionType2_ComplexOptionType4Desc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 13, 0);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType2.ComplexOptionType4 complex_opt4 = 7633546;
 */
export const ComplexOptionType2_ComplexOptionType4_complex_opt4 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 13, 0, 0);

// Describes the message protobuf_unittest.ComplexOptionType3. Use `create(ComplexOptionType3Desc)` to create a new ComplexOptionType3.
export const ComplexOptionType3Desc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 14);

// Describes the message protobuf_unittest.ComplexOptionType3.ComplexOptionType5. Use `create(ComplexOptionType3_ComplexOptionType5Desc)` to create a new ComplexOptionType3_ComplexOptionType5.
export const ComplexOptionType3_ComplexOptionType5Desc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 14, 0);

// Describes the message protobuf_unittest.ComplexOpt6. Use `create(ComplexOpt6Desc)` to create a new ComplexOpt6.
export const ComplexOpt6Desc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 15);

// Describes the message protobuf_unittest.VariousComplexOptions. Use `create(VariousComplexOptionsDesc)` to create a new VariousComplexOptions.
export const VariousComplexOptionsDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 16);

// Describes the message protobuf_unittest.AggregateMessageSet. Use `create(AggregateMessageSetDesc)` to create a new AggregateMessageSet.
export const AggregateMessageSetDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 17);

// Describes the message protobuf_unittest.AggregateMessageSetElement. Use `create(AggregateMessageSetElementDesc)` to create a new AggregateMessageSetElement.
export const AggregateMessageSetElementDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 18);

/**
 * @generated from extension: optional protobuf_unittest.AggregateMessageSetElement message_set_extension = 15447542;
 */
export const AggregateMessageSetElement_message_set_extension = extDesc(fileDesc_google_protobuf_unittest_custom_options, 18, 0);

// Describes the message protobuf_unittest.Aggregate. Use `create(AggregateDesc)` to create a new Aggregate.
export const AggregateDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 19);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate nested = 15476903;
 */
export const Aggregate_nested = extDesc(fileDesc_google_protobuf_unittest_custom_options, 19, 0);

// Describes the message protobuf_unittest.AggregateMessage. Use `create(AggregateMessageDesc)` to create a new AggregateMessage.
export const AggregateMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 20);

// Describes the message protobuf_unittest.NestedOptionType. Use `create(NestedOptionTypeDesc)` to create a new NestedOptionType.
export const NestedOptionTypeDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 21);

// Describes the message protobuf_unittest.NestedOptionType.NestedMessage. Use `create(NestedOptionType_NestedMessageDesc)` to create a new NestedOptionType_NestedMessage.
export const NestedOptionType_NestedMessageDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 21, 0);

// Describes the enum protobuf_unittest.NestedOptionType.NestedEnum.
export const NestedOptionType_NestedEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_custom_options, 21, 0);

/**
 * @generated from enum protobuf_unittest.NestedOptionType.NestedEnum
 */
export const NestedOptionType_NestedEnum = tsEnum(NestedOptionType_NestedEnumDesc);

/**
 * @generated from extension: optional int32 nested_extension = 7912573;
 */
export const NestedOptionType_nested_extension = extDesc(fileDesc_google_protobuf_unittest_custom_options, 21, 0);

// Describes the message protobuf_unittest.OldOptionType. Use `create(OldOptionTypeDesc)` to create a new OldOptionType.
export const OldOptionTypeDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 22);

// Describes the enum protobuf_unittest.OldOptionType.TestEnum.
export const OldOptionType_TestEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_custom_options, 22, 0);

/**
 * @generated from enum protobuf_unittest.OldOptionType.TestEnum
 */
export const OldOptionType_TestEnum = tsEnum(OldOptionType_TestEnumDesc);

// Describes the message protobuf_unittest.NewOptionType. Use `create(NewOptionTypeDesc)` to create a new NewOptionType.
export const NewOptionTypeDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 23);

// Describes the enum protobuf_unittest.NewOptionType.TestEnum.
export const NewOptionType_TestEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_custom_options, 23, 0);

/**
 * @generated from enum protobuf_unittest.NewOptionType.TestEnum
 */
export const NewOptionType_TestEnum = tsEnum(NewOptionType_TestEnumDesc);

// Describes the message protobuf_unittest.TestMessageWithRequiredEnumOption. Use `create(TestMessageWithRequiredEnumOptionDesc)` to create a new TestMessageWithRequiredEnumOption.
export const TestMessageWithRequiredEnumOptionDesc = messageDesc(fileDesc_google_protobuf_unittest_custom_options, 24);

// Describes the enum protobuf_unittest.MethodOpt1.
export const MethodOpt1Desc = enumDesc(fileDesc_google_protobuf_unittest_custom_options, 0);

/**
 * @generated from enum protobuf_unittest.MethodOpt1
 */
export const MethodOpt1 = tsEnum(MethodOpt1Desc);

// Describes the enum protobuf_unittest.AggregateEnum.
export const AggregateEnumDesc = enumDesc(fileDesc_google_protobuf_unittest_custom_options, 1);

/**
 * @generated from enum protobuf_unittest.AggregateEnum
 */
export const AggregateEnum = tsEnum(AggregateEnumDesc);

/**
 * @generated from service protobuf_unittest.TestServiceWithCustomOptions
 */
export const TestServiceWithCustomOptions = serviceDesc(fileDesc_google_protobuf_unittest_custom_options, 0);

/**
 * @generated from service protobuf_unittest.AggregateService
 */
export const AggregateService = serviceDesc(fileDesc_google_protobuf_unittest_custom_options, 1);

/**
 * @generated from extension: optional uint64 file_opt1 = 7736974;
 */
export const file_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 0);

/**
 * @generated from extension: optional int32 message_opt1 = 7739036;
 */
export const message_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 1);

/**
 * @generated from extension: optional fixed64 field_opt1 = 7740936;
 */
export const field_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 2);

/**
 * This is useful for testing that we correctly register default values for
 * extension options.
 *
 * @generated from extension: optional int32 field_opt2 = 7753913 [default = 42];
 */
export const field_opt2 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 3);

/**
 * @generated from extension: optional int32 oneof_opt1 = 7740111;
 */
export const oneof_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 4);

/**
 * @generated from extension: optional sfixed32 enum_opt1 = 7753576;
 */
export const enum_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 5);

/**
 * @generated from extension: optional int32 enum_value_opt1 = 1560678;
 */
export const enum_value_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 6);

/**
 * @generated from extension: optional sint64 service_opt1 = 7887650;
 */
export const service_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 7);

/**
 * @generated from extension: optional protobuf_unittest.MethodOpt1 method_opt1 = 7890860;
 */
export const method_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 8);

/**
 * @generated from extension: optional bool bool_opt = 7706090;
 */
export const bool_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 9);

/**
 * @generated from extension: optional int32 int32_opt = 7705709;
 */
export const int32_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 10);

/**
 * @generated from extension: optional int64 int64_opt = 7705542;
 */
export const int64_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 11);

/**
 * @generated from extension: optional uint32 uint32_opt = 7704880;
 */
export const uint32_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 12);

/**
 * @generated from extension: optional uint64 uint64_opt = 7702367;
 */
export const uint64_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 13);

/**
 * @generated from extension: optional sint32 sint32_opt = 7701568;
 */
export const sint32_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 14);

/**
 * @generated from extension: optional sint64 sint64_opt = 7700863;
 */
export const sint64_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 15);

/**
 * @generated from extension: optional fixed32 fixed32_opt = 7700307;
 */
export const fixed32_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 16);

/**
 * @generated from extension: optional fixed64 fixed64_opt = 7700194;
 */
export const fixed64_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 17);

/**
 * @generated from extension: optional sfixed32 sfixed32_opt = 7698645;
 */
export const sfixed32_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 18);

/**
 * @generated from extension: optional sfixed64 sfixed64_opt = 7685475;
 */
export const sfixed64_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 19);

/**
 * @generated from extension: optional float float_opt = 7675390;
 */
export const float_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 20);

/**
 * @generated from extension: optional double double_opt = 7673293;
 */
export const double_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 21);

/**
 * @generated from extension: optional string string_opt = 7673285;
 */
export const string_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 22);

/**
 * @generated from extension: optional bytes bytes_opt = 7673238;
 */
export const bytes_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 23);

/**
 * @generated from extension: optional protobuf_unittest.DummyMessageContainingEnum.TestEnumType enum_opt = 7673233;
 */
export const enum_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 24);

/**
 * @generated from extension: optional protobuf_unittest.DummyMessageInvalidAsOptionType message_type_opt = 7665967;
 */
export const message_type_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 25);

/**
 * @generated from extension: optional int32 mooo = 7663707;
 */
export const mooo = extDesc(fileDesc_google_protobuf_unittest_custom_options, 26);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType3 corge = 7663442;
 */
export const corge = extDesc(fileDesc_google_protobuf_unittest_custom_options, 27);

/**
 * @generated from extension: optional int32 grault = 7650927;
 */
export const grault = extDesc(fileDesc_google_protobuf_unittest_custom_options, 28);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType1 garply = 7649992;
 */
export const garply = extDesc(fileDesc_google_protobuf_unittest_custom_options, 29);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType1 complex_opt1 = 7646756;
 */
export const complex_opt1 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 30);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType2 complex_opt2 = 7636949;
 */
export const complex_opt2 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 31);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOptionType3 complex_opt3 = 7636463;
 */
export const complex_opt3 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 32);

/**
 * @generated from extension: optional protobuf_unittest.ComplexOpt6 complexopt6 = 7595468;
 */
export const complexopt6 = extDesc(fileDesc_google_protobuf_unittest_custom_options, 33);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate fileopt = 15478479;
 */
export const fileopt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 34);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate msgopt = 15480088;
 */
export const msgopt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 35);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate fieldopt = 15481374;
 */
export const fieldopt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 36);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate enumopt = 15483218;
 */
export const enumopt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 37);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate enumvalopt = 15486921;
 */
export const enumvalopt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 38);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate serviceopt = 15497145;
 */
export const serviceopt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 39);

/**
 * @generated from extension: optional protobuf_unittest.Aggregate methodopt = 15512713;
 */
export const methodopt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 40);

/**
 * @generated from extension: optional protobuf_unittest.OldOptionType required_enum_opt = 106161807;
 */
export const required_enum_opt = extDesc(fileDesc_google_protobuf_unittest_custom_options, 41);

