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

// @generated by protoc-gen-es v1.7.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_lite_imports_nonlite.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";
import type { TestAllTypes, TestRequired } from "./unittest_pb.js";

/**
 * @generated from message protobuf_unittest.TestLiteImportsNonlite
 */
export declare class TestLiteImportsNonlite extends Message<TestLiteImportsNonlite> {
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

  constructor(data?: PartialMessage<TestLiteImportsNonlite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestLiteImportsNonlite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestLiteImportsNonlite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestLiteImportsNonlite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestLiteImportsNonlite;

  static equals(a: TestLiteImportsNonlite | PlainMessage<TestLiteImportsNonlite> | undefined, b: TestLiteImportsNonlite | PlainMessage<TestLiteImportsNonlite> | undefined): boolean;
}

