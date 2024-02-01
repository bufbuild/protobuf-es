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

// @generated by protoc-gen-es v1.7.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_extension_set.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * A message with message_set_wire_format.
 *
 * @generated from message protobuf_unittest.TestExtensionSet
 */
export class TestExtensionSet extends Message<TestExtensionSet> {
  constructor(data?: PartialMessage<TestExtensionSet>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestExtensionSet";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestExtensionSet {
    return new TestExtensionSet().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestExtensionSet {
    return new TestExtensionSet().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestExtensionSet {
    return new TestExtensionSet().fromJsonString(jsonString, options);
  }

  static equals(a: TestExtensionSet | PlainMessage<TestExtensionSet> | undefined, b: TestExtensionSet | PlainMessage<TestExtensionSet> | undefined): boolean {
    return proto2.util.equals(TestExtensionSet, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestExtensionSetContainer
 */
export class TestExtensionSetContainer extends Message<TestExtensionSetContainer> {
  /**
   * @generated from field: optional protobuf_unittest.TestExtensionSet extension = 1;
   */
  extension?: TestExtensionSet;

  constructor(data?: PartialMessage<TestExtensionSetContainer>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestExtensionSetContainer";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "extension", kind: "message", T: TestExtensionSet, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestExtensionSetContainer {
    return new TestExtensionSetContainer().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestExtensionSetContainer {
    return new TestExtensionSetContainer().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestExtensionSetContainer {
    return new TestExtensionSetContainer().fromJsonString(jsonString, options);
  }

  static equals(a: TestExtensionSetContainer | PlainMessage<TestExtensionSetContainer> | undefined, b: TestExtensionSetContainer | PlainMessage<TestExtensionSetContainer> | undefined): boolean {
    return proto2.util.equals(TestExtensionSetContainer, a, b);
  }
}

