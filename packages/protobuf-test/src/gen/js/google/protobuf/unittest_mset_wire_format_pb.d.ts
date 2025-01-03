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
// This file contains messages for testing message_set_wire_format.

// @generated by protoc-gen-es v2.2.3 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_mset_wire_format.proto (package proto2_wireformat_unittest, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_mset_wire_format.proto.
 */
export declare const file_google_protobuf_unittest_mset_wire_format: GenFile;

/**
 * A message with message_set_wire_format.
 *
 * @generated from message proto2_wireformat_unittest.TestMessageSet
 */
export declare type TestMessageSet = Message<"proto2_wireformat_unittest.TestMessageSet"> & {
};

/**
 * Describes the message proto2_wireformat_unittest.TestMessageSet.
 * Use `create(TestMessageSetSchema)` to create a new message.
 */
export declare const TestMessageSetSchema: GenMessage<TestMessageSet>;

/**
 * @generated from message proto2_wireformat_unittest.TestMessageSetWireFormatContainer
 */
export declare type TestMessageSetWireFormatContainer = Message<"proto2_wireformat_unittest.TestMessageSetWireFormatContainer"> & {
  /**
   * @generated from field: optional proto2_wireformat_unittest.TestMessageSet message_set = 1;
   */
  messageSet?: TestMessageSet;
};

/**
 * Describes the message proto2_wireformat_unittest.TestMessageSetWireFormatContainer.
 * Use `create(TestMessageSetWireFormatContainerSchema)` to create a new message.
 */
export declare const TestMessageSetWireFormatContainerSchema: GenMessage<TestMessageSetWireFormatContainer>;

