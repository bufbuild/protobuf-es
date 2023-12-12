// Copyright 2021-2023 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_extension_set.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * A message with message_set_wire_format.
 *
 * @generated from message protobuf_unittest.TestExtensionSet
 */
export declare class TestExtensionSet extends Message<TestExtensionSet> {
  constructor(data?: PartialMessage<TestExtensionSet>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestExtensionSet";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestExtensionSet;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestExtensionSet;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestExtensionSet;

  static equals(a: TestExtensionSet | PlainMessage<TestExtensionSet> | undefined, b: TestExtensionSet | PlainMessage<TestExtensionSet> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestExtensionSetContainer
 */
export declare class TestExtensionSetContainer extends Message<TestExtensionSetContainer> {
  /**
   * @generated from field: optional protobuf_unittest.TestExtensionSet extension = 1;
   */
  extension?: TestExtensionSet;

  constructor(data?: PartialMessage<TestExtensionSetContainer>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestExtensionSetContainer";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestExtensionSetContainer;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestExtensionSetContainer;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestExtensionSetContainer;

  static equals(a: TestExtensionSetContainer | PlainMessage<TestExtensionSetContainer> | undefined, b: TestExtensionSetContainer | PlainMessage<TestExtensionSetContainer> | undefined): boolean;
}

