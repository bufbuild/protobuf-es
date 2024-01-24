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
// A proto file which uses optimize_for = CODE_SIZE.

// @generated by protoc-gen-es v1.7.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";
import { ForeignMessage } from "./unittest_pb.js";

/**
 * @generated from message protobuf_unittest.TestOptimizedForSize
 */
export class TestOptimizedForSize extends Message<TestOptimizedForSize> {
  /**
   * @generated from field: optional int32 i = 1;
   */
  i?: number;

  /**
   * @generated from field: optional protobuf_unittest.ForeignMessage msg = 19;
   */
  msg?: ForeignMessage;

  /**
   * @generated from oneof protobuf_unittest.TestOptimizedForSize.foo
   */
  foo: {
    /**
     * @generated from field: int32 integer_field = 2;
     */
    value: number;
    case: "integerField";
  } | {
    /**
     * @generated from field: string string_field = 3;
     */
    value: string;
    case: "stringField";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<TestOptimizedForSize>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestOptimizedForSize";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "i", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 19, name: "msg", kind: "message", T: ForeignMessage, opt: true },
    { no: 2, name: "integer_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "foo" },
    { no: 3, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "foo" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestOptimizedForSize {
    return new TestOptimizedForSize().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestOptimizedForSize {
    return new TestOptimizedForSize().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestOptimizedForSize {
    return new TestOptimizedForSize().fromJsonString(jsonString, options);
  }

  static equals(a: TestOptimizedForSize | PlainMessage<TestOptimizedForSize> | undefined, b: TestOptimizedForSize | PlainMessage<TestOptimizedForSize> | undefined): boolean {
    return proto2.util.equals(TestOptimizedForSize, a, b);
  }
}

/**
 * @generated from extension: optional int32 test_extension = 1234;
 */
export const TestOptimizedForSize_test_extension = proto2.makeExtension<TestOptimizedForSize, number>(
  "protobuf_unittest.TestOptimizedForSize.test_extension", 
  TestOptimizedForSize, 
  { no: 1234, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional protobuf_unittest.TestRequiredOptimizedForSize test_extension2 = 1235;
 */
export const TestOptimizedForSize_test_extension2 = proto2.makeExtension<TestOptimizedForSize, TestRequiredOptimizedForSize>(
  "protobuf_unittest.TestOptimizedForSize.test_extension2", 
  TestOptimizedForSize, 
  () => ({ no: 1235, kind: "message", T: TestRequiredOptimizedForSize, opt: true }),
);

/**
 * @generated from message protobuf_unittest.TestRequiredOptimizedForSize
 */
export class TestRequiredOptimizedForSize extends Message<TestRequiredOptimizedForSize> {
  /**
   * @generated from field: required int32 x = 1;
   */
  x?: number;

  constructor(data?: PartialMessage<TestRequiredOptimizedForSize>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestRequiredOptimizedForSize";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "x", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredOptimizedForSize {
    return new TestRequiredOptimizedForSize().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredOptimizedForSize {
    return new TestRequiredOptimizedForSize().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredOptimizedForSize {
    return new TestRequiredOptimizedForSize().fromJsonString(jsonString, options);
  }

  static equals(a: TestRequiredOptimizedForSize | PlainMessage<TestRequiredOptimizedForSize> | undefined, b: TestRequiredOptimizedForSize | PlainMessage<TestRequiredOptimizedForSize> | undefined): boolean {
    return proto2.util.equals(TestRequiredOptimizedForSize, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.TestOptionalOptimizedForSize
 */
export class TestOptionalOptimizedForSize extends Message<TestOptionalOptimizedForSize> {
  /**
   * @generated from field: optional protobuf_unittest.TestRequiredOptimizedForSize o = 1;
   */
  o?: TestRequiredOptimizedForSize;

  constructor(data?: PartialMessage<TestOptionalOptimizedForSize>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestOptionalOptimizedForSize";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "o", kind: "message", T: TestRequiredOptimizedForSize, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestOptionalOptimizedForSize {
    return new TestOptionalOptimizedForSize().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestOptionalOptimizedForSize {
    return new TestOptionalOptimizedForSize().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestOptionalOptimizedForSize {
    return new TestOptionalOptimizedForSize().fromJsonString(jsonString, options);
  }

  static equals(a: TestOptionalOptimizedForSize | PlainMessage<TestOptionalOptimizedForSize> | undefined, b: TestOptionalOptimizedForSize | PlainMessage<TestOptionalOptimizedForSize> | undefined): boolean {
    return proto2.util.equals(TestOptionalOptimizedForSize, a, b);
  }
}

