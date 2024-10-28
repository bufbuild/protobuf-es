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
//
// Tests that a "lite" message can import a regular message.

// @generated by protoc-gen-es v2.2.1 with parameter "target=ts,import_extension=js"
// @generated from file google/protobuf/unittest_lite_imports_nonlite.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { TestAllTypes, TestRequired } from "./unittest_pb.js";
import { file_google_protobuf_unittest } from "./unittest_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/protobuf/unittest_lite_imports_nonlite.proto.
 */
export const file_google_protobuf_unittest_lite_imports_nonlite: GenFile = /*@__PURE__*/
  fileDesc("CjNnb29nbGUvcHJvdG9idWYvdW5pdHRlc3RfbGl0ZV9pbXBvcnRzX25vbmxpdGUucHJvdG8SEXByb3RvYnVmX3VuaXR0ZXN0IooBChZUZXN0TGl0ZUltcG9ydHNOb25saXRlEjAKB21lc3NhZ2UYASABKAsyHy5wcm90b2J1Zl91bml0dGVzdC5UZXN0QWxsVHlwZXMSPgoVbWVzc2FnZV93aXRoX3JlcXVpcmVkGAIgASgLMh8ucHJvdG9idWZfdW5pdHRlc3QuVGVzdFJlcXVpcmVkQgJIAw", [file_google_protobuf_unittest]);

/**
 * @generated from message protobuf_unittest.TestLiteImportsNonlite
 */
export type TestLiteImportsNonlite = Message<"protobuf_unittest.TestLiteImportsNonlite"> & {
  /**
   * @generated from field: optional protobuf_unittest.TestAllTypes message = 1;
   */
  message?: TestAllTypes;

  /**
   * Verifies that transitive required fields generates valid code.
   *
   * @generated from field: optional protobuf_unittest.TestRequired message_with_required = 2;
   */
  messageWithRequired?: TestRequired;
};

/**
 * Describes the message protobuf_unittest.TestLiteImportsNonlite.
 * Use `create(TestLiteImportsNonliteSchema)` to create a new message.
 */
export const TestLiteImportsNonliteSchema: GenMessage<TestLiteImportsNonlite> = /*@__PURE__*/
  messageDesc(file_google_protobuf_unittest_lite_imports_nonlite, 0);

