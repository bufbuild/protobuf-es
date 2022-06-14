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
// This file is similar to unittest_mset_wire_format.proto, but does not
// have a TestMessageSet, so it can be downgraded to proto1.

// @generated by protoc-gen-es v0.0.5 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_mset.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto2} from "@bufbuild/protobuf";
import {TestMessageSet} from "./unittest_mset_wire_format_pb.js";

/**
 * @generated from message protobuf_unittest.TestMessageSetContainer
 */
export class TestMessageSetContainer extends Message<TestMessageSetContainer> {
  /**
   * @generated from field: optional proto2_wireformat_unittest.TestMessageSet message_set = 1;
   */
  messageSet?: TestMessageSet;

  constructor(data?: PartialMessage<TestMessageSetContainer>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.TestMessageSetContainer";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "message_set", kind: "message", T: TestMessageSet, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetContainer {
    return new TestMessageSetContainer().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetContainer {
    return new TestMessageSetContainer().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetContainer {
    return new TestMessageSetContainer().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageSetContainer | PlainMessage<TestMessageSetContainer> | undefined, b: TestMessageSetContainer | PlainMessage<TestMessageSetContainer> | undefined): boolean {
    return proto2.util.equals(TestMessageSetContainer, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.NestedTestMessageSetContainer
 */
export class NestedTestMessageSetContainer extends Message<NestedTestMessageSetContainer> {
  /**
   * @generated from field: optional protobuf_unittest.TestMessageSetContainer container = 1;
   */
  container?: TestMessageSetContainer;

  /**
   * @generated from field: optional protobuf_unittest.NestedTestMessageSetContainer child = 2;
   */
  child?: NestedTestMessageSetContainer;

  constructor(data?: PartialMessage<NestedTestMessageSetContainer>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.NestedTestMessageSetContainer";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "container", kind: "message", T: TestMessageSetContainer, opt: true },
    { no: 2, name: "child", kind: "message", T: NestedTestMessageSetContainer, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NestedTestMessageSetContainer {
    return new NestedTestMessageSetContainer().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NestedTestMessageSetContainer {
    return new NestedTestMessageSetContainer().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NestedTestMessageSetContainer {
    return new NestedTestMessageSetContainer().fromJsonString(jsonString, options);
  }

  static equals(a: NestedTestMessageSetContainer | PlainMessage<NestedTestMessageSetContainer> | undefined, b: NestedTestMessageSetContainer | PlainMessage<NestedTestMessageSetContainer> | undefined): boolean {
    return proto2.util.equals(NestedTestMessageSetContainer, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension1
 */
export class TestMessageSetExtension1 extends Message<TestMessageSetExtension1> {
  /**
   * @generated from field: optional int32 i = 15;
   */
  i?: number;

  /**
   * @generated from field: optional proto2_wireformat_unittest.TestMessageSet recursive = 16;
   */
  recursive?: TestMessageSet;

  /**
   * @generated from field: optional string test_aliasing = 17;
   */
  testAliasing?: string;

  constructor(data?: PartialMessage<TestMessageSetExtension1>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.TestMessageSetExtension1";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 15, name: "i", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 16, name: "recursive", kind: "message", T: TestMessageSet, opt: true },
    { no: 17, name: "test_aliasing", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetExtension1 {
    return new TestMessageSetExtension1().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetExtension1 {
    return new TestMessageSetExtension1().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetExtension1 {
    return new TestMessageSetExtension1().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageSetExtension1 | PlainMessage<TestMessageSetExtension1> | undefined, b: TestMessageSetExtension1 | PlainMessage<TestMessageSetExtension1> | undefined): boolean {
    return proto2.util.equals(TestMessageSetExtension1, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension2
 */
export class TestMessageSetExtension2 extends Message<TestMessageSetExtension2> {
  /**
   * @generated from field: optional string str = 25;
   */
  str?: string;

  constructor(data?: PartialMessage<TestMessageSetExtension2>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.TestMessageSetExtension2";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 25, name: "str", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetExtension2 {
    return new TestMessageSetExtension2().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetExtension2 {
    return new TestMessageSetExtension2().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetExtension2 {
    return new TestMessageSetExtension2().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageSetExtension2 | PlainMessage<TestMessageSetExtension2> | undefined, b: TestMessageSetExtension2 | PlainMessage<TestMessageSetExtension2> | undefined): boolean {
    return proto2.util.equals(TestMessageSetExtension2, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.NestedTestInt
 */
export class NestedTestInt extends Message<NestedTestInt> {
  /**
   * @generated from field: optional fixed32 a = 1;
   */
  a?: number;

  /**
   * @generated from field: optional protobuf_unittest.NestedTestInt child = 2;
   */
  child?: NestedTestInt;

  constructor(data?: PartialMessage<NestedTestInt>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.NestedTestInt";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "a", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, opt: true },
    { no: 2, name: "child", kind: "message", T: NestedTestInt, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NestedTestInt {
    return new NestedTestInt().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NestedTestInt {
    return new NestedTestInt().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NestedTestInt {
    return new NestedTestInt().fromJsonString(jsonString, options);
  }

  static equals(a: NestedTestInt | PlainMessage<NestedTestInt> | undefined, b: NestedTestInt | PlainMessage<NestedTestInt> | undefined): boolean {
    return proto2.util.equals(NestedTestInt, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension3
 */
export class TestMessageSetExtension3 extends Message<TestMessageSetExtension3> {
  /**
   * @generated from field: optional protobuf_unittest.NestedTestInt msg = 35;
   */
  msg?: NestedTestInt;

  constructor(data?: PartialMessage<TestMessageSetExtension3>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.TestMessageSetExtension3";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 35, name: "msg", kind: "message", T: NestedTestInt, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestMessageSetExtension3 {
    return new TestMessageSetExtension3().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestMessageSetExtension3 {
    return new TestMessageSetExtension3().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestMessageSetExtension3 {
    return new TestMessageSetExtension3().fromJsonString(jsonString, options);
  }

  static equals(a: TestMessageSetExtension3 | PlainMessage<TestMessageSetExtension3> | undefined, b: TestMessageSetExtension3 | PlainMessage<TestMessageSetExtension3> | undefined): boolean {
    return proto2.util.equals(TestMessageSetExtension3, a, b);
  }
}

/**
 * MessageSet wire format is equivalent to this.
 *
 * @generated from message protobuf_unittest.RawMessageSet
 */
export class RawMessageSet extends Message<RawMessageSet> {
  /**
   * @generated from field: repeated protobuf_unittest.RawMessageSet.Item item = 1;
   */
  item: RawMessageSet_Item[] = [];

  constructor(data?: PartialMessage<RawMessageSet>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.RawMessageSet";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "item", kind: "message", T: RawMessageSet_Item, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RawMessageSet {
    return new RawMessageSet().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RawMessageSet {
    return new RawMessageSet().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RawMessageSet {
    return new RawMessageSet().fromJsonString(jsonString, options);
  }

  static equals(a: RawMessageSet | PlainMessage<RawMessageSet> | undefined, b: RawMessageSet | PlainMessage<RawMessageSet> | undefined): boolean {
    return proto2.util.equals(RawMessageSet, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.RawMessageSet.Item
 */
export class RawMessageSet_Item extends Message<RawMessageSet_Item> {
  /**
   * @generated from field: required int32 type_id = 2;
   */
  typeId?: number;

  /**
   * @generated from field: required bytes message = 3;
   */
  message?: Uint8Array;

  constructor(data?: PartialMessage<RawMessageSet_Item>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.RawMessageSet.Item";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 2, name: "type_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "message", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RawMessageSet_Item {
    return new RawMessageSet_Item().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RawMessageSet_Item {
    return new RawMessageSet_Item().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RawMessageSet_Item {
    return new RawMessageSet_Item().fromJsonString(jsonString, options);
  }

  static equals(a: RawMessageSet_Item | PlainMessage<RawMessageSet_Item> | undefined, b: RawMessageSet_Item | PlainMessage<RawMessageSet_Item> | undefined): boolean {
    return proto2.util.equals(RawMessageSet_Item, a, b);
  }
}

