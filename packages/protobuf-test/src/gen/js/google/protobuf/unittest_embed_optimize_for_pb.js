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
// A proto file which imports a proto file that uses optimize_for = CODE_SIZE.

// @generated by protoc-gen-es v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_embed_optimize_for.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";
import { TestOptimizedForSize } from "./unittest_optimize_for_pb.js";

/**
 * @generated from message protobuf_unittest.TestEmbedOptimizedForSize
 */
export const TestEmbedOptimizedForSize = proto2.makeMessageType(
  "protobuf_unittest.TestEmbedOptimizedForSize",
  () => [
    { no: 1, name: "optional_message", kind: "message", T: TestOptimizedForSize, opt: true },
    { no: 2, name: "repeated_message", kind: "message", T: TestOptimizedForSize, repeated: true },
  ],
);

