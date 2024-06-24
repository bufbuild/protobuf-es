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

// @generated by protoc-gen-es v2.0.0-beta.1 with parameter "ts_nocheck=false,target=js+dts,import_extension=.js"
// @generated from file google/protobuf/unittest_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { ForeignMessage } from "./unittest_pb.js";

/**
 * Describes the file google/protobuf/unittest_optimize_for.proto.
 */
export declare const file_google_protobuf_unittest_optimize_for: GenDescFile;

/**
 * @generated from message protobuf_unittest.TestOptimizedForSize
 */
export declare type TestOptimizedForSize = Message<"protobuf_unittest.TestOptimizedForSize"> & {
  /**
   * @generated from field: optional int32 i = 1;
   */
  i: number;

  /**
   * @generated from field: optional protobuf_unittest.ForeignMessage msg = 19;
   */
  msg?: ForeignMessage;

  /**
   * @generated from oneof protobuf_unittest.TestOptimizedForSize.foo
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
 * Describes the message protobuf_unittest.TestOptimizedForSize.
 * Use `create(TestOptimizedForSizeSchema)` to create a new message.
 */
export declare const TestOptimizedForSizeSchema: GenDescMessage<TestOptimizedForSize>;

/**
 * @generated from extension: optional int32 test_extension = 1234;
 */
export declare const TestOptimizedForSize_test_extension: GenDescExtension<TestOptimizedForSize, number>;

/**
 * @generated from extension: optional protobuf_unittest.TestRequiredOptimizedForSize test_extension2 = 1235;
 */
export declare const TestOptimizedForSize_test_extension2: GenDescExtension<TestOptimizedForSize, TestRequiredOptimizedForSize>;

/**
 * @generated from message protobuf_unittest.TestRequiredOptimizedForSize
 */
export declare type TestRequiredOptimizedForSize = Message<"protobuf_unittest.TestRequiredOptimizedForSize"> & {
  /**
   * @generated from field: required int32 x = 1;
   */
  x: number;
};

/**
 * Describes the message protobuf_unittest.TestRequiredOptimizedForSize.
 * Use `create(TestRequiredOptimizedForSizeSchema)` to create a new message.
 */
export declare const TestRequiredOptimizedForSizeSchema: GenDescMessage<TestRequiredOptimizedForSize>;

/**
 * @generated from message protobuf_unittest.TestOptionalOptimizedForSize
 */
export declare type TestOptionalOptimizedForSize = Message<"protobuf_unittest.TestOptionalOptimizedForSize"> & {
  /**
   * @generated from field: optional protobuf_unittest.TestRequiredOptimizedForSize o = 1;
   */
  o?: TestRequiredOptimizedForSize;
};

/**
 * Describes the message protobuf_unittest.TestOptionalOptimizedForSize.
 * Use `create(TestOptionalOptimizedForSizeSchema)` to create a new message.
 */
export declare const TestOptionalOptimizedForSizeSchema: GenDescMessage<TestOptionalOptimizedForSize>;

