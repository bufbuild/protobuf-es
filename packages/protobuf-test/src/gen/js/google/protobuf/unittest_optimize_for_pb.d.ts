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
// A proto file which uses optimize_for = CODE_SIZE.

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";
import type { ForeignMessage } from "./unittest_pb.js";

/**
 * @generated from message protobuf_unittest.TestOptimizedForSize
 */
export declare class TestOptimizedForSize extends Message<TestOptimizedForSize> {
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
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<TestOptimizedForSize>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestOptimizedForSize";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestOptimizedForSize;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestOptimizedForSize;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestOptimizedForSize;

  static equals(a: TestOptimizedForSize | PlainMessage<TestOptimizedForSize> | undefined, b: TestOptimizedForSize | PlainMessage<TestOptimizedForSize> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestRequiredOptimizedForSize
 */
export declare class TestRequiredOptimizedForSize extends Message<TestRequiredOptimizedForSize> {
  /**
   * @generated from field: required int32 x = 1;
   */
  x: number;

  constructor(data?: PartialMessage<TestRequiredOptimizedForSize>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestRequiredOptimizedForSize";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestRequiredOptimizedForSize;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestRequiredOptimizedForSize;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestRequiredOptimizedForSize;

  static equals(a: TestRequiredOptimizedForSize | PlainMessage<TestRequiredOptimizedForSize> | undefined, b: TestRequiredOptimizedForSize | PlainMessage<TestRequiredOptimizedForSize> | undefined): boolean;
}

/**
 * @generated from message protobuf_unittest.TestOptionalOptimizedForSize
 */
export declare class TestOptionalOptimizedForSize extends Message<TestOptionalOptimizedForSize> {
  /**
   * @generated from field: optional protobuf_unittest.TestRequiredOptimizedForSize o = 1;
   */
  o?: TestRequiredOptimizedForSize;

  constructor(data?: PartialMessage<TestOptionalOptimizedForSize>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest.TestOptionalOptimizedForSize";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestOptionalOptimizedForSize;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestOptionalOptimizedForSize;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestOptionalOptimizedForSize;

  static equals(a: TestOptionalOptimizedForSize | PlainMessage<TestOptionalOptimizedForSize> | undefined, b: TestOptionalOptimizedForSize | PlainMessage<TestOptionalOptimizedForSize> | undefined): boolean;
}

