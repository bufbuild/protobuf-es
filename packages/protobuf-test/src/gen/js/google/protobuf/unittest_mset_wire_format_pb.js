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
// This file contains messages for testing message_set_wire_format.

// @generated by protoc-gen-es v1.10.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_mset_wire_format.proto (package proto2_wireformat_unittest, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";

/**
 * A message with message_set_wire_format.
 *
 * @generated from message proto2_wireformat_unittest.TestMessageSet
 */
export const TestMessageSet = /*@__PURE__*/ proto2.makeMessageType(
  "proto2_wireformat_unittest.TestMessageSet",
  [],
);

/**
 * @generated from message proto2_wireformat_unittest.TestMessageSetWireFormatContainer
 */
export const TestMessageSetWireFormatContainer = /*@__PURE__*/ proto2.makeMessageType(
  "proto2_wireformat_unittest.TestMessageSetWireFormatContainer",
  () => [
    { no: 1, name: "message_set", kind: "message", T: TestMessageSet, opt: true },
  ],
);

