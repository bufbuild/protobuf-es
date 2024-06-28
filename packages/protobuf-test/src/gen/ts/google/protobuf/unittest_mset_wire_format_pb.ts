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
// This file contains messages for testing message_set_wire_format.

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/unittest_mset_wire_format.proto (package proto2_wireformat_unittest, syntax proto2)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_mset_wire_format.proto.
 */
export const file_google_protobuf_unittest_mset_wire_format: GenDescFile = /*@__PURE__*/
  fileDesc("Ci9nb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfbXNldF93aXJlX2Zvcm1hdC5wcm90bxIacHJvdG8yX3dpcmVmb3JtYXRfdW5pdHRlc3QiLAoOVGVzdE1lc3NhZ2VTZXQqCAgEEIDR3PwBKgwIgNHc/AEQ/////wc6AggBImQKIVRlc3RNZXNzYWdlU2V0V2lyZUZvcm1hdENvbnRhaW5lchI/CgttZXNzYWdlX3NldBgBIAEoCzIqLnByb3RvMl93aXJlZm9ybWF0X3VuaXR0ZXN0LlRlc3RNZXNzYWdlU2V0QilIAfgBAaoCIUdvb2dsZS5Qcm90b2NvbEJ1ZmZlcnMuVGVzdFByb3Rvcw");

/**
 * A message with message_set_wire_format.
 *
 * @generated from message proto2_wireformat_unittest.TestMessageSet
 */
export type TestMessageSet = Message<"proto2_wireformat_unittest.TestMessageSet"> & {
};

/**
 * Describes the message proto2_wireformat_unittest.TestMessageSet.
 * Use `create(TestMessageSetSchema)` to create a new message.
 */
export const TestMessageSetSchema: GenDescMessage<TestMessageSet> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_mset_wire_format, 0);

/**
 * @generated from message proto2_wireformat_unittest.TestMessageSetWireFormatContainer
 */
export type TestMessageSetWireFormatContainer = Message<"proto2_wireformat_unittest.TestMessageSetWireFormatContainer"> & {
  /**
   * @generated from field: optional proto2_wireformat_unittest.TestMessageSet message_set = 1;
   */
  messageSet?: TestMessageSet;
};

/**
 * Describes the message proto2_wireformat_unittest.TestMessageSetWireFormatContainer.
 * Use `create(TestMessageSetWireFormatContainerSchema)` to create a new message.
 */
export const TestMessageSetWireFormatContainerSchema: GenDescMessage<TestMessageSetWireFormatContainer> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_mset_wire_format, 1);

