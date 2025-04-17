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

// @generated by protoc-gen-es v1.10.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_no_generic_services.proto (package protobuf_unittest.no_generic_services_test, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest.no_generic_services_test.TestEnum
 */
export const TestEnum = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest.no_generic_services_test.TestEnum",
  [
    {no: 1, name: "FOO"},
  ],
);

/**
 * @generated from message protobuf_unittest.no_generic_services_test.TestMessage
 */
export const TestMessage = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest.no_generic_services_test.TestMessage",
  () => [
    { no: 1, name: "a", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
);

/**
 * @generated from extension: optional int32 test_extension = 1000;
 */
export const test_extension = proto2.makeExtension(
  "protobuf_unittest.no_generic_services_test.test_extension", 
  TestMessage, 
  { no: 1000, kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
);

