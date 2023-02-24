// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Author: kenton@google.com (Kenton Varda)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// This file contains messages for testing message_set_wire_format.

// @generated by protoc-gen-es v1.0.0 with parameter "ts_nocheck=false,target=ts"
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

