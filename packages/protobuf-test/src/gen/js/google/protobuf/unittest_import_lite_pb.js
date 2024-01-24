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
// This is like unittest_import.proto but with optimize_for = LITE_RUNTIME.

// @generated by protoc-gen-es v1.7.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_import_lite.proto (package protobuf_unittest_import, syntax proto2)
/* eslint-disable */

import { proto2 } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest_import.ImportEnumLite
 */
export const ImportEnumLite = proto2.makeEnum(
  "protobuf_unittest_import.ImportEnumLite",
  [
    {no: 7, name: "IMPORT_LITE_FOO"},
    {no: 8, name: "IMPORT_LITE_BAR"},
    {no: 9, name: "IMPORT_LITE_BAZ"},
  ],
);

/**
 * @generated from message protobuf_unittest_import.ImportMessageLite
 */
export const ImportMessageLite = proto2.makeMessageType(
  "protobuf_unittest_import.ImportMessageLite",
  () => [
    { no: 1, name: "d", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ],
);

