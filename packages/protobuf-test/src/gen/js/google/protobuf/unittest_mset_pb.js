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

// @generated by protoc-gen-es v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_mset.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";
import { TestMessageSet } from "./unittest_mset_wire_format_pb.js";

/**
 * @generated from message protobuf_unittest.TestMessageSetContainer
 */
export const TestMessageSetContainer = proto2.makeMessageType(
  "protobuf_unittest.TestMessageSetContainer",
  () => [
    { no: 1, name: "message_set", kind: "message", T: TestMessageSet, opt: true },
  ],
);

/**
 * @generated from message protobuf_unittest.NestedTestMessageSetContainer
 */
export const NestedTestMessageSetContainer = proto2.makeMessageType(
  "protobuf_unittest.NestedTestMessageSetContainer",
  () => [
    { no: 1, name: "container", kind: "message", T: TestMessageSetContainer, opt: true },
    { no: 2, name: "child", kind: "message", T: NestedTestMessageSetContainer, opt: true },
    { no: 3, name: "lazy_child", kind: "message", T: NestedTestMessageSetContainer, opt: true },
  ],
);

/**
 * @generated from message protobuf_unittest.NestedTestInt
 */
export const NestedTestInt = proto2.makeMessageType(
  "protobuf_unittest.NestedTestInt",
  () => [
    { no: 1, name: "a", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, opt: true },
    { no: 3, name: "b", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 2, name: "child", kind: "message", T: NestedTestInt, opt: true },
  ],
);

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension1
 */
export const TestMessageSetExtension1 = proto2.makeMessageType(
  "protobuf_unittest.TestMessageSetExtension1",
  () => [
    { no: 15, name: "i", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 16, name: "recursive", kind: "message", T: TestMessageSet, opt: true },
    { no: 17, name: "test_aliasing", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension1 message_set_extension = 1545008;
 */
export const TestMessageSetExtension1_message_set_extension = proto2.makeExtension(
  "protobuf_unittest.TestMessageSetExtension1.message_set_extension", 
  TestMessageSet, 
  () => ({ no: 1545008, kind: "message", T: TestMessageSetExtension1, opt: true }),
);

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension2
 */
export const TestMessageSetExtension2 = proto2.makeMessageType(
  "protobuf_unittest.TestMessageSetExtension2",
  () => [
    { no: 25, name: "str", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
);

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension2 message_set_extension = 1547769;
 */
export const TestMessageSetExtension2_message_set_extension = proto2.makeExtension(
  "protobuf_unittest.TestMessageSetExtension2.message_set_extension", 
  TestMessageSet, 
  () => ({ no: 1547769, kind: "message", T: TestMessageSetExtension2, opt: true }),
);

/**
 * @generated from message protobuf_unittest.TestMessageSetExtension3
 */
export const TestMessageSetExtension3 = proto2.makeMessageType(
  "protobuf_unittest.TestMessageSetExtension3",
  () => [
    { no: 35, name: "msg", kind: "message", T: NestedTestInt, opt: true },
    { no: 36, name: "required_int", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from extension: optional protobuf_unittest.TestMessageSetExtension3 message_set_extension = 195273129;
 */
export const TestMessageSetExtension3_message_set_extension = proto2.makeExtension(
  "protobuf_unittest.TestMessageSetExtension3.message_set_extension", 
  TestMessageSet, 
  () => ({ no: 195273129, kind: "message", T: TestMessageSetExtension3, opt: true }),
);

/**
 * MessageSet wire format is equivalent to this.
 *
 * @generated from message protobuf_unittest.RawMessageSet
 */
export const RawMessageSet = proto2.makeMessageType(
  "protobuf_unittest.RawMessageSet",
  () => [
    { no: 1, name: "item", kind: "message", T: RawMessageSet_Item, delimited: true, repeated: true },
  ],
);

/**
 * @generated from message protobuf_unittest.RawMessageSet.Item
 */
export const RawMessageSet_Item = proto2.makeMessageType(
  "protobuf_unittest.RawMessageSet.Item",
  () => [
    { no: 2, name: "type_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "message", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ],
  {localName: "RawMessageSet_Item"},
);

