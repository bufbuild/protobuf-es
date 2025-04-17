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

// @generated by protoc-gen-es v1.10.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";
import { ForeignMessage } from "./unittest_pb.js";

/**
 * @generated from message protobuf_unittest.TestOptimizedForSize
 */
export const TestOptimizedForSize = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.TestOptimizedForSize",
  () => [
    { no: 1, name: "i", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 19, name: "msg", kind: "message", T: ForeignMessage, opt: true },
    { no: 2, name: "integer_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "foo" },
    { no: 3, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "foo" },
  ],
);

/**
 * @generated from extension: optional int32 test_extension = 1234;
 */
export const TestOptimizedForSize_test_extension = proto2.makeExtension(
  "protobuf_unittest.TestOptimizedForSize.test_extension", 
  TestOptimizedForSize, 
  { no: 1234, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

/**
 * @generated from extension: optional protobuf_unittest.TestRequiredOptimizedForSize test_extension2 = 1235;
 */
export const TestOptimizedForSize_test_extension2 = proto2.makeExtension(
  "protobuf_unittest.TestOptimizedForSize.test_extension2", 
  TestOptimizedForSize, 
  () => ({ no: 1235, kind: "message", T: TestRequiredOptimizedForSize, opt: true }),
);

/**
 * @generated from message protobuf_unittest.TestRequiredOptimizedForSize
 */
export const TestRequiredOptimizedForSize = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.TestRequiredOptimizedForSize",
  () => [
    { no: 1, name: "x", kind: "scalar", T: 5 /* ScalarType.INT32 */, req: true },
  ],
);

/**
 * @generated from message protobuf_unittest.TestOptionalOptimizedForSize
 */
export const TestOptionalOptimizedForSize = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.TestOptionalOptimizedForSize",
  () => [
    { no: 1, name: "o", kind: "message", T: TestRequiredOptimizedForSize, opt: true },
  ],
);

