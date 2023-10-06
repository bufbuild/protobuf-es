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

// @generated by protoc-gen-es v1.3.3 with parameter "ts_nocheck=false,target=js+dts"
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
 * @generated from message protobuf_unittest.TestMessageSetExtension2
 */
export const TestMessageSetExtension2 = proto2.makeMessageType(
  "protobuf_unittest.TestMessageSetExtension2",
  () => [
    { no: 25, name: "str", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ],
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
 * MessageSet wire format is equivalent to this.
 *
 * @generated from message protobuf_unittest.RawMessageSet
 */
export const RawMessageSet = proto2.makeMessageType(
  "protobuf_unittest.RawMessageSet",
  () => [
    { no: 1, name: "item", kind: "message", T: RawMessageSet_Item, repeated: true },
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

