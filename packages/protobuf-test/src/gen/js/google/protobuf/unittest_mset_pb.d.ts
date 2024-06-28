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
// This file is similar to unittest_mset_wire_format.proto, but does not
// have a TestMessageSet, so it can be downgraded to proto1.

// @generated by protoc-gen-es v2.0.0-beta.2 with parameter "ts_nocheck=false,target=js+dts,import_extension=js"
// @generated from file google/protobuf/unittest_mset.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { GenDescExtension, GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { TestMessageSet } from "./unittest_mset_wire_format_pb.js";

/**
 * Describes the file google/protobuf/unittest_mset.proto.
 */
export declare const file_google_protobuf_unittest_mset: GenDescFile;

/**
 * @generated from message protobuf_unittest.TestMessageSetContainer
 */
export declare type TestMessageSetContainer = Message<"protobuf_unittest.TestMessageSetContainer"> & {
  /**
   * @generated from field: optional proto2_wireformat_unittest.TestMessageSet message_set = 1;
   */
  messageSet?: TestMessageSet;
};

/**
 * Describes the message protobuf_unittest.TestMessageSetContainer.
 * Use `create(TestMessageSetContainerSchema)` to create a new message.
 */
export declare const TestMessageSetContainerSchema: GenDescMessage<TestMessageSetContainer>;

/**
 * @generated from message protobuf_unittest.NestedTestMessageSetContainer
 */
export declare type NestedTestMessageSetContainer = Message<"protobuf_unittest.NestedTestMessageSetContainer"> & {
  /**
   * @generated from field: optional protobuf_unittest.TestMessageSetContainer container = 1;
   */
  container?: TestMessageSetContainer;

  /**
   * @generated from field: optional protobuf_unittest.NestedTestMessageSetContainer child = 2;
   */
  child?: NestedTestMessageSetContainer;

  /**
   * @generated from field: optional protobuf_unittest.NestedTestMessageSetContainer lazy_child = 3;
   */
  lazyChild?: NestedTestMessageSetContainer;
};

/**
 * Describes the message protobuf_unittest.NestedTestMessageSetContainer.
 * Use `create(NestedTestMessageSetContainerSchema)` to create a new message.
 */
export declare const NestedTestMessageSetContainerSchema: GenDescMessage<NestedTestMessageSetContainer>;

/**
 * @generated from message protobuf_unittest.NestedTestInt
 */
export declare type NestedTestInt = Message<"protobuf_unittest.NestedTestInt"> & {
  /**
   * @generated from field: optional fixed32 a = 1;
   */
  a: number;

  /**
   * @generated from field: optional int32 b = 3;
   */
  b: number;

  /**
   * @generated from field: optional protobuf_unittest.NestedTestInt child = 2;
   */
  child?: NestedTestInt;
};

/**
 * Describes the message protobuf_unittest.NestedTestInt.
 * Use `create(NestedTestIntSchema)` to create a new message.
 */
export declare const NestedTestIntSchema: GenDescMessage<NestedTestInt>;

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension1
 */
export declare type TestMessageSetExtension1 = Message<"protobuf_unittest.TestMessageSetExtension1"> & {
  /**
   * @generated from field: optional int32 i = 15;
   */
  i: number;

  /**
   * @generated from field: optional proto2_wireformat_unittest.TestMessageSet recursive = 16;
   */
  recursive?: TestMessageSet;

  /**
   * @generated from field: optional string test_aliasing = 17;
   */
  testAliasing: string;
};

/**
 * Describes the message protobuf_unittest.TestMessageSetExtension1.
 * Use `create(TestMessageSetExtension1Schema)` to create a new message.
 */
export declare const TestMessageSetExtension1Schema: GenDescMessage<TestMessageSetExtension1>;

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension1 message_set_extension = 1545008;
 */
export declare const TestMessageSetExtension1_message_set_extension: GenDescExtension<TestMessageSet, TestMessageSetExtension1>;

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension2
 */
export declare type TestMessageSetExtension2 = Message<"protobuf_unittest.TestMessageSetExtension2"> & {
  /**
   * @generated from field: optional string str = 25;
   */
  str: string;
};

/**
 * Describes the message protobuf_unittest.TestMessageSetExtension2.
 * Use `create(TestMessageSetExtension2Schema)` to create a new message.
 */
export declare const TestMessageSetExtension2Schema: GenDescMessage<TestMessageSetExtension2>;

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension2 message_set_extension = 1547769;
 */
export declare const TestMessageSetExtension2_message_set_extension: GenDescExtension<TestMessageSet, TestMessageSetExtension2>;

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension3
 */
export declare type TestMessageSetExtension3 = Message<"protobuf_unittest.TestMessageSetExtension3"> & {
  /**
   * @generated from field: optional protobuf_unittest.NestedTestInt msg = 35;
   */
  msg?: NestedTestInt;

  /**
   * @generated from field: required int32 required_int = 36;
   */
  requiredInt: number;
};

/**
 * Describes the message protobuf_unittest.TestMessageSetExtension3.
 * Use `create(TestMessageSetExtension3Schema)` to create a new message.
 */
export declare const TestMessageSetExtension3Schema: GenDescMessage<TestMessageSetExtension3>;

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension3 message_set_extension = 195273129;
 */
export declare const TestMessageSetExtension3_message_set_extension: GenDescExtension<TestMessageSet, TestMessageSetExtension3>;

/**
 * MessageSet wire format is equivalent to this.
 *
 * @generated from message protobuf_unittest.RawMessageSet
 */
export declare type RawMessageSet = Message<"protobuf_unittest.RawMessageSet"> & {
  /**
   * @generated from field: repeated protobuf_unittest.RawMessageSet.Item item = 1;
   */
  item: RawMessageSet_Item[];
};

/**
 * Describes the message protobuf_unittest.RawMessageSet.
 * Use `create(RawMessageSetSchema)` to create a new message.
 */
export declare const RawMessageSetSchema: GenDescMessage<RawMessageSet>;

/**
 * @generated from message protobuf_unittest.RawMessageSet.Item
 */
export declare type RawMessageSet_Item = Message<"protobuf_unittest.RawMessageSet.Item"> & {
  /**
   * @generated from field: required int32 type_id = 2;
   */
  typeId: number;

  /**
   * @generated from field: required bytes message = 3;
   */
  message: Uint8Array;
};

/**
 * Describes the message protobuf_unittest.RawMessageSet.Item.
 * Use `create(RawMessageSet_ItemSchema)` to create a new message.
 */
export declare const RawMessageSet_ItemSchema: GenDescMessage<RawMessageSet_Item>;

