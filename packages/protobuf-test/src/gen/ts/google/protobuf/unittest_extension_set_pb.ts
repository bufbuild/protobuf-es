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
// This file contains messages for testing extensions.

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/unittest_extension_set.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_extension_set.proto.
 */
export const file_google_protobuf_unittest_extension_set: GenFile = /*@__PURE__*/
  fileDesc("Cixnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfZXh0ZW5zaW9uX3NldC5wcm90bxIRcHJvdG9idWZfdW5pdHRlc3QiHAoQVGVzdEV4dGVuc2lvblNldCoICAQQgICAgAIiUwoZVGVzdEV4dGVuc2lvblNldENvbnRhaW5lchI2CglleHRlbnNpb24YASABKAsyIy5wcm90b2J1Zl91bml0dGVzdC5UZXN0RXh0ZW5zaW9uU2V0QiZIAaoCIUdvb2dsZS5Qcm90b2NvbEJ1ZmZlcnMuVGVzdFByb3Rvcw");

/**
 * A message with message_set_wire_format.
 *
 * @generated from message protobuf_unittest.TestExtensionSet
 */
export type TestExtensionSet = Message<"protobuf_unittest.TestExtensionSet"> & {
};

/**
 * Describes the message protobuf_unittest.TestExtensionSet.
 * Use `create(TestExtensionSetSchema)` to create a new message.
 */
export const TestExtensionSetSchema: GenMessage<TestExtensionSet> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_extension_set, 0);

/**
 * @generated from message protobuf_unittest.TestExtensionSetContainer
 */
export type TestExtensionSetContainer = Message<"protobuf_unittest.TestExtensionSetContainer"> & {
  /**
   * @generated from field: optional protobuf_unittest.TestExtensionSet extension = 1;
   */
  extension?: TestExtensionSet;
};

/**
 * Describes the message protobuf_unittest.TestExtensionSetContainer.
 * Use `create(TestExtensionSetContainerSchema)` to create a new message.
 */
export const TestExtensionSetContainerSchema: GenMessage<TestExtensionSetContainer> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_extension_set, 1);

