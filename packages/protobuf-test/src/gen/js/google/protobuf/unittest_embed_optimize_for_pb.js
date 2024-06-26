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
// A proto file which imports a proto file that uses optimize_for = CODE_SIZE.

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/unittest_embed_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_unittest_optimize_for } from "./unittest_optimize_for_pb.js";

/**
 * Describes the file google/protobuf/unittest_embed_optimize_for.proto.
 */
export const file_google_protobuf_unittest_embed_optimize_for = /*@__PURE__*/
  fileDesc("CjFnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfZW1iZWRfb3B0aW1pemVfZm9yLnByb3RvEhFwcm90b2J1Zl91bml0dGVzdCKhAQoZVGVzdEVtYmVkT3B0aW1pemVkRm9yU2l6ZRJBChBvcHRpb25hbF9tZXNzYWdlGAEgASgLMicucHJvdG9idWZfdW5pdHRlc3QuVGVzdE9wdGltaXplZEZvclNpemUSQQoQcmVwZWF0ZWRfbWVzc2FnZRgCIAMoCzInLnByb3RvYnVmX3VuaXR0ZXN0LlRlc3RPcHRpbWl6ZWRGb3JTaXplQgJIAQ", [file_google_protobuf_unittest_optimize_for]);

/**
 * Describes the message protobuf_unittest.TestEmbedOptimizedForSize.
 * Use `create(TestEmbedOptimizedForSizeSchema)` to create a new message.
 */
export const TestEmbedOptimizedForSizeSchema = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_embed_optimize_for, 0);

