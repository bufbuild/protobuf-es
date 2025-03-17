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
// This file contains messages for testing extensions.

// @generated by protoc-gen-es v2.2.4 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_extension_set.proto (package proto2_unittest, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_extension_set.proto.
 */
export declare const file_google_protobuf_unittest_extension_set: GenFile;

/**
 * A message with message_set_wire_format.
 *
 * @generated from message proto2_unittest.TestExtensionSet
 */
export declare type TestExtensionSet = Message<"proto2_unittest.TestExtensionSet"> & {
};

/**
 * Describes the message proto2_unittest.TestExtensionSet.
 * Use `create(TestExtensionSetSchema)` to create a new message.
 */
export declare const TestExtensionSetSchema: GenMessage<TestExtensionSet>;

/**
 * @generated from message proto2_unittest.TestExtensionSetContainer
 */
export declare type TestExtensionSetContainer = Message<"proto2_unittest.TestExtensionSetContainer"> & {
  /**
   * @generated from field: optional proto2_unittest.TestExtensionSet extension = 1;
   */
  extension?: TestExtensionSet;
};

/**
 * Describes the message proto2_unittest.TestExtensionSetContainer.
 * Use `create(TestExtensionSetContainerSchema)` to create a new message.
 */
export declare const TestExtensionSetContainerSchema: GenMessage<TestExtensionSetContainer>;

