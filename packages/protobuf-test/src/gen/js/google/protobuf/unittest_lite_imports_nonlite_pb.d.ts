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

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_lite_imports_nonlite.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { TestAllTypes, TestRequired } from "./unittest_pb.js";

/**
 * Describes the file google/protobuf/unittest_lite_imports_nonlite.proto.
 */
export declare const file_google_protobuf_unittest_lite_imports_nonlite: GenFile;

/**
 * @generated from message protobuf_unittest.TestLiteImportsNonlite
 */
export declare type TestLiteImportsNonlite = Message<"protobuf_unittest.TestLiteImportsNonlite"> & {
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
export declare const TestLiteImportsNonliteSchema: GenMessage<TestLiteImportsNonlite>;

