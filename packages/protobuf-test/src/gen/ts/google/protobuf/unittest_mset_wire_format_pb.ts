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
// This file contains messages for testing message_set_wire_format.

// @generated by protoc-gen-es v1.4.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_mset_wire_format.proto (package proto2_wireformat_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * A message with message_set_wire_format.
 *
 * @generated from message proto2_wireformat_unittest.TestMessageSet
 */
export class TestMessageSet extends Message<TestMessageSet> {
  constructor(data?: PartialMessage<TestMessageSet>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2_wireformat_unittest.TestMessageSet";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSet {
    return new TestMessageSet().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSet {
    return new TestMessageSet().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSet {
    return new TestMessageSet().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageSet | PlainMessage<TestMessageSet> | undefined, b: TestMessageSet | PlainMessage<TestMessageSet> | undefined): boolean {
    return proto2.util.equals(TestMessageSet, a, b);
  }
}

/**
 * @generated from message proto2_wireformat_unittest.TestMessageSetWireFormatContainer
 */
export class TestMessageSetWireFormatContainer extends Message<TestMessageSetWireFormatContainer> {
  /**
   * @generated from field: optional proto2_wireformat_unittest.TestMessageSet message_set = 1;
   */
  messageSet?: TestMessageSet;

  constructor(data?: PartialMessage<TestMessageSetWireFormatContainer>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "proto2_wireformat_unittest.TestMessageSetWireFormatContainer";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "message_set", kind: "message", T: TestMessageSet, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetWireFormatContainer {
    return new TestMessageSetWireFormatContainer().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetWireFormatContainer {
    return new TestMessageSetWireFormatContainer().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetWireFormatContainer {
    return new TestMessageSetWireFormatContainer().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageSetWireFormatContainer | PlainMessage<TestMessageSetWireFormatContainer> | undefined, b: TestMessageSetWireFormatContainer | PlainMessage<TestMessageSetWireFormatContainer> | undefined): boolean {
    return proto2.util.equals(TestMessageSetWireFormatContainer, a, b);
  }
}

