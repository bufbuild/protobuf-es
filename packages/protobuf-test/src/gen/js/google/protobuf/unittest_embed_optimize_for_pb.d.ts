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

// @generated by protoc-gen-es v2.1.0 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_embed_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { TestOptimizedForSize } from "./unittest_optimize_for_pb.js";

/**
 * Describes the file google/protobuf/unittest_embed_optimize_for.proto.
 */
export declare const file_google_protobuf_unittest_embed_optimize_for: GenFile;

/**
 * @generated from message protobuf_unittest.TestEmbedOptimizedForSize
 */
export declare type TestEmbedOptimizedForSize = Message<"protobuf_unittest.TestEmbedOptimizedForSize"> & {
  /**
   * Test that embedding a message which has optimize_for = CODE_SIZE into
   * one optimized for speed works.
   *
   * @generated from field: optional protobuf_unittest.TestOptimizedForSize optional_message = 1;
   */
  optionalMessage?: TestOptimizedForSize;

  /**
   * @generated from field: repeated protobuf_unittest.TestOptimizedForSize repeated_message = 2;
   */
  repeatedMessage: TestOptimizedForSize[];
};

/**
 * Describes the message protobuf_unittest.TestEmbedOptimizedForSize.
 * Use `create(TestEmbedOptimizedForSizeSchema)` to create a new message.
 */
export declare const TestEmbedOptimizedForSizeSchema: GenMessage<TestEmbedOptimizedForSize>;

