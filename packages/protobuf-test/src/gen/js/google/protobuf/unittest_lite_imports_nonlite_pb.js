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
//
// Tests that a "lite" message can import a regular message.

// @generated by protoc-gen-es v1.10.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_lite_imports_nonlite.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";
import { TestAllTypes, TestRequired } from "./unittest_pb.js";

/**
 * @generated from message protobuf_unittest.TestLiteImportsNonlite
 */
export const TestLiteImportsNonlite = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.TestLiteImportsNonlite",
  () => [
    { no: 1, name: "message", kind: "message", T: TestAllTypes, opt: true },
    { no: 2, name: "message_with_required", kind: "message", T: TestRequired, opt: true },
  ],
);

