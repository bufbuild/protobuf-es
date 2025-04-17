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
// A proto file which is imported by unittest.proto to test importing.

// @generated by protoc-gen-es v1.10.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_import.proto (package protobuf_unittest_import, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In test_util.h we do
// "using namespace unittest_import = protobuf_unittest_import".

import { proto2 } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest_import.ImportEnum
 */
export const ImportEnum = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest_import.ImportEnum",
  [
    {no: 7, name: "IMPORT_FOO"},
    {no: 8, name: "IMPORT_BAR"},
    {no: 9, name: "IMPORT_BAZ"},
  ],
);

/**
 * To use an enum in a map, it must has the first value as 0.
 *
 * @generated from enum protobuf_unittest_import.ImportEnumForMap
 */
export const ImportEnumForMap = /*@__PURE__*/ proto2.makeEnum(
  "protobuf_unittest_import.ImportEnumForMap",
  [
    {no: 0, name: "UNKNOWN"},
    {no: 1, name: "FOO"},
    {no: 2, name: "BAR"},
  ],
);

/**
 * @generated from message protobuf_unittest_import.ImportMessage
 */
export const ImportMessage = /*@__PURE__*/ proto2.makeMessageType(
  "protobuf_unittest_import.ImportMessage",
  () => [
    { no: 1, name: "d", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
);

