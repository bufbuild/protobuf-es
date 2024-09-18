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

// Author: kenton@google.com (Kenton Varda)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file which uses optimize_for = CODE_SIZE.

// @generated by protoc-gen-es v2.1.0 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_unittest } from "./unittest_pb.js";

/**
 * Describes the file google/protobuf/unittest_optimize_for.proto.
 */
export const file_google_protobuf_unittest_optimize_for = /*@__PURE__*/
  fileDesc("Citnb29nbGUvcHJvdG9idWYvdW5pdHRlc3Rfb3B0aW1pemVfZm9yLnByb3RvEhFwcm90b2J1Zl91bml0dGVzdCLqAgoUVGVzdE9wdGltaXplZEZvclNpemUSCQoBaRgBIAEoBRIuCgNtc2cYEyABKAsyIS5wcm90b2J1Zl91bml0dGVzdC5Gb3JlaWduTWVzc2FnZRIXCg1pbnRlZ2VyX2ZpZWxkGAIgASgFSAASFgoMc3RyaW5nX2ZpZWxkGAMgASgJSAAqCQjoBxCAgICAAjJPCg50ZXN0X2V4dGVuc2lvbhInLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RPcHRpbWl6ZWRGb3JTaXplGNIJIAEoBVINdGVzdEV4dGVuc2lvbjKCAQoPdGVzdF9leHRlbnNpb24yEicucHJvdG9idWZfdW5pdHRlc3QuVGVzdE9wdGltaXplZEZvclNpemUY0wkgASgLMi8ucHJvdG9idWZfdW5pdHRlc3QuVGVzdFJlcXVpcmVkT3B0aW1pemVkRm9yU2l6ZVIOdGVzdEV4dGVuc2lvbjJCBQoDZm9vIikKHFRlc3RSZXF1aXJlZE9wdGltaXplZEZvclNpemUSCQoBeBgBIAIoBSJaChxUZXN0T3B0aW9uYWxPcHRpbWl6ZWRGb3JTaXplEjoKAW8YASABKAsyLy5wcm90b2J1Zl91bml0dGVzdC5UZXN0UmVxdWlyZWRPcHRpbWl6ZWRGb3JTaXplQgJIAg", [file_google_protobuf_unittest]);

/**
 * Describes the message protobuf_unittest.TestOptimizedForSize.
 * Use `create(TestOptimizedForSizeSchema)` to create a new message.
 */
export const TestOptimizedForSizeSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_optimize_for, 0);

/**
 * @generated from extension: optional int32 test_extension = 1234;
 */
export const TestOptimizedForSize_test_extension = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_optimize_for, 0, 0);

/**
 * @generated from extension: optional protobuf_unittest.TestRequiredOptimizedForSize test_extension2 = 1235;
 */
export const TestOptimizedForSize_test_extension2 = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_optimize_for, 0, 1);

/**
 * Describes the message protobuf_unittest.TestRequiredOptimizedForSize.
 * Use `create(TestRequiredOptimizedForSizeSchema)` to create a new message.
 */
export const TestRequiredOptimizedForSizeSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_optimize_for, 1);

/**
 * Describes the message protobuf_unittest.TestOptionalOptimizedForSize.
 * Use `create(TestOptionalOptimizedForSizeSchema)` to create a new message.
 */
export const TestOptionalOptimizedForSizeSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_optimize_for, 2);

