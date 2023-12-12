// Copyright 2021-2023 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v1.6.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/msg-scalar.proto (package spec, syntax proto3)
/* eslint-disable */

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message spec.ScalarValuesMessage
 */
export const ScalarValuesMessage = proto3.makeMessageType(
  "spec.ScalarValuesMessage",
  () => [
    { no: 1, name: "double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 2, name: "float_field", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "int32_field", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */ },
    { no: 7, name: "fixed32_field", kind: "scalar", T: 7 /* ScalarType.FIXED32 */ },
    { no: 8, name: "bool_field", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 9, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 12, name: "uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 14, name: "sfixed32_field", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */ },
    { no: 15, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */ },
    { no: 16, name: "sint32_field", kind: "scalar", T: 17 /* ScalarType.SINT32 */ },
    { no: 17, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */ },
  ],
);

/**
 * @generated from message spec.RepeatedScalarValuesMessage
 */
export const RepeatedScalarValuesMessage = proto3.makeMessageType(
  "spec.RepeatedScalarValuesMessage",
  () => [
    { no: 1, name: "double_field", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 2, name: "float_field", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true },
    { no: 3, name: "int64_field", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 4, name: "uint64_field", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 5, name: "int32_field", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 6, name: "fixed64_field", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 7, name: "fixed32_field", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true },
    { no: 8, name: "bool_field", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true },
    { no: 9, name: "string_field", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 11, name: "bytes_field", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
    { no: 12, name: "uint32_field", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
    { no: 14, name: "sfixed32_field", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true },
    { no: 15, name: "sfixed64_field", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 16, name: "sint32_field", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true },
    { no: 17, name: "sint64_field", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
  ],
);

