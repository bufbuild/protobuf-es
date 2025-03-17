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

// Author: kenton@google.com (Kenton Varda)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file which uses optimize_for = CODE_SIZE.

// @generated by protoc-gen-es v2.2.4 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/unittest_optimize_for.proto (package proto2_unittest, syntax proto2)
/* eslint-disable */

import type { GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { ForeignMessage } from "./unittest_pb.js";
import { file_google_protobuf_unittest } from "./unittest_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_optimize_for.proto.
 */
export const file_google_protobuf_unittest_optimize_for: GenFile = /*@__PURE__*/
  fileDesc("Citnb29nbGUvcHJvdG9idWYvdW5pdHRlc3Rfb3B0aW1pemVfZm9yLnByb3RvEg9wcm90bzJfdW5pdHRlc3Qi4QIKFFRlc3RPcHRpbWl6ZWRGb3JTaXplEgkKAWkYASABKAUSLAoDbXNnGBMgASgLMh8ucHJvdG8yX3VuaXR0ZXN0LkZvcmVpZ25NZXNzYWdlEhcKDWludGVnZXJfZmllbGQYAiABKAVIABIWCgxzdHJpbmdfZmllbGQYAyABKAlIACoJCOgHEICAgIACMk0KDnRlc3RfZXh0ZW5zaW9uEiUucHJvdG8yX3VuaXR0ZXN0LlRlc3RPcHRpbWl6ZWRGb3JTaXplGNIJIAEoBVINdGVzdEV4dGVuc2lvbjJ+Cg90ZXN0X2V4dGVuc2lvbjISJS5wcm90bzJfdW5pdHRlc3QuVGVzdE9wdGltaXplZEZvclNpemUY0wkgASgLMi0ucHJvdG8yX3VuaXR0ZXN0LlRlc3RSZXF1aXJlZE9wdGltaXplZEZvclNpemVSDnRlc3RFeHRlbnNpb24yQgUKA2ZvbyIpChxUZXN0UmVxdWlyZWRPcHRpbWl6ZWRGb3JTaXplEgkKAXgYASACKAUiWAocVGVzdE9wdGlvbmFsT3B0aW1pemVkRm9yU2l6ZRI4CgFvGAEgASgLMi0ucHJvdG8yX3VuaXR0ZXN0LlRlc3RSZXF1aXJlZE9wdGltaXplZEZvclNpemVCAkgC", [file_google_protobuf_unittest]);

/**
 * @generated from message proto2_unittest.TestOptimizedForSize
 */
export type TestOptimizedForSize = Message<"proto2_unittest.TestOptimizedForSize"> & {
  /**
   * @generated from field: optional int32 i = 1;
   */
  i: number;

  /**
   * @generated from field: optional proto2_unittest.ForeignMessage msg = 19;
   */
  msg?: ForeignMessage;

  /**
   * @generated from oneof proto2_unittest.TestOptimizedForSize.foo
   */
  foo: {
    /**
     * @generated from field: int32 integer_field = 2;
     */
    value: number;
    case: "integerField";
  } | {
    /**
     * @generated from field: string string_field = 3;
     */
    value: string;
    case: "stringField";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message proto2_unittest.TestOptimizedForSize.
 * Use `create(TestOptimizedForSizeSchema)` to create a new message.
 */
export const TestOptimizedForSizeSchema: GenMessage<TestOptimizedForSize> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_optimize_for, 0);

/**
 * @generated from extension: optional int32 test_extension = 1234;
 */
export const TestOptimizedForSize_test_extension: GenExtension<TestOptimizedForSize, number> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_optimize_for, 0, 0);

/**
 * @generated from extension: optional proto2_unittest.TestRequiredOptimizedForSize test_extension2 = 1235;
 */
export const TestOptimizedForSize_test_extension2: GenExtension<TestOptimizedForSize, TestRequiredOptimizedForSize> = /*@__PURE__*/
  extDesc(file_google_protobuf_unittest_optimize_for, 0, 1);

/**
 * @generated from message proto2_unittest.TestRequiredOptimizedForSize
 */
export type TestRequiredOptimizedForSize = Message<"proto2_unittest.TestRequiredOptimizedForSize"> & {
  /**
   * @generated from field: required int32 x = 1;
   */
  x: number;
};

/**
 * Describes the message proto2_unittest.TestRequiredOptimizedForSize.
 * Use `create(TestRequiredOptimizedForSizeSchema)` to create a new message.
 */
export const TestRequiredOptimizedForSizeSchema: GenMessage<TestRequiredOptimizedForSize> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_optimize_for, 1);

/**
 * @generated from message proto2_unittest.TestOptionalOptimizedForSize
 */
export type TestOptionalOptimizedForSize = Message<"proto2_unittest.TestOptionalOptimizedForSize"> & {
  /**
   * @generated from field: optional proto2_unittest.TestRequiredOptimizedForSize o = 1;
   */
  o?: TestRequiredOptimizedForSize;
};

/**
 * Describes the message proto2_unittest.TestOptionalOptimizedForSize.
 * Use `create(TestOptionalOptimizedForSizeSchema)` to create a new message.
 */
export const TestOptionalOptimizedForSizeSchema: GenMessage<TestOptionalOptimizedForSize> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_optimize_for, 2);

