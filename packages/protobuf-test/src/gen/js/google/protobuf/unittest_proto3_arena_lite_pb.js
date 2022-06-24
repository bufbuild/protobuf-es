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

// @generated by protoc-gen-es v0.0.7 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_proto3_arena_lite.proto (package proto3_arena_lite_unittest, syntax proto3)
/* eslint-disable */

import {proto3} from "@bufbuild/protobuf";
import {ImportMessage} from "./unittest_import_pb.js";
import {PublicImportMessage} from "./unittest_import_public_pb.js";

/**
 * @generated from enum proto3_arena_lite_unittest.ForeignEnum
 */
export const ForeignEnum = proto3.makeEnum(
  "proto3_arena_lite_unittest.ForeignEnum",
  [
    {no: 0, name: "FOREIGN_ZERO"},
    {no: 4, name: "FOREIGN_FOO"},
    {no: 5, name: "FOREIGN_BAR"},
    {no: 6, name: "FOREIGN_BAZ"},
  ],
);

/**
 * This proto includes every type of field in both singular and repeated
 * forms.
 *
 * @generated from message proto3_arena_lite_unittest.TestAllTypes
 */
export const TestAllTypes = proto3.makeMessageType(
  "proto3_arena_lite_unittest.TestAllTypes",
  () => [
    { no: 1, name: "optional_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "optional_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "optional_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "optional_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 5, name: "optional_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */ },
    { no: 6, name: "optional_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */ },
    { no: 7, name: "optional_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */ },
    { no: 8, name: "optional_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */ },
    { no: 9, name: "optional_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */ },
    { no: 10, name: "optional_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */ },
    { no: 11, name: "optional_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 12, name: "optional_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 13, name: "optional_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 14, name: "optional_string", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 15, name: "optional_bytes", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 18, name: "optional_nested_message", kind: "message", T: TestAllTypes_NestedMessage },
    { no: 19, name: "optional_foreign_message", kind: "message", T: ForeignMessage },
    { no: 20, name: "optional_import_message", kind: "message", T: ImportMessage },
    { no: 21, name: "optional_nested_enum", kind: "enum", T: proto3.getEnumType(TestAllTypes_NestedEnum) },
    { no: 22, name: "optional_foreign_enum", kind: "enum", T: proto3.getEnumType(ForeignEnum) },
    { no: 24, name: "optional_string_piece", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 25, name: "optional_cord", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 26, name: "optional_public_import_message", kind: "message", T: PublicImportMessage },
    { no: 27, name: "optional_lazy_message", kind: "message", T: TestAllTypes_NestedMessage },
    { no: 31, name: "repeated_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 32, name: "repeated_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 33, name: "repeated_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
    { no: 34, name: "repeated_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 35, name: "repeated_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true },
    { no: 36, name: "repeated_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 37, name: "repeated_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true },
    { no: 38, name: "repeated_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 39, name: "repeated_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true },
    { no: 40, name: "repeated_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 41, name: "repeated_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true },
    { no: 42, name: "repeated_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 43, name: "repeated_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true },
    { no: 44, name: "repeated_string", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 45, name: "repeated_bytes", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
    { no: 48, name: "repeated_nested_message", kind: "message", T: TestAllTypes_NestedMessage, repeated: true },
    { no: 49, name: "repeated_foreign_message", kind: "message", T: ForeignMessage, repeated: true },
    { no: 50, name: "repeated_import_message", kind: "message", T: ImportMessage, repeated: true },
    { no: 51, name: "repeated_nested_enum", kind: "enum", T: proto3.getEnumType(TestAllTypes_NestedEnum), repeated: true },
    { no: 52, name: "repeated_foreign_enum", kind: "enum", T: proto3.getEnumType(ForeignEnum), repeated: true },
    { no: 54, name: "repeated_string_piece", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 55, name: "repeated_cord", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 57, name: "repeated_lazy_message", kind: "message", T: TestAllTypes_NestedMessage, repeated: true },
    { no: 111, name: "oneof_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, oneof: "oneof_field" },
    { no: 112, name: "oneof_nested_message", kind: "message", T: TestAllTypes_NestedMessage, oneof: "oneof_field" },
    { no: 113, name: "oneof_string", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "oneof_field" },
    { no: 114, name: "oneof_bytes", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "oneof_field" },
  ],
);

/**
 * @generated from enum proto3_arena_lite_unittest.TestAllTypes.NestedEnum
 */
export const TestAllTypes_NestedEnum = proto3.makeEnum(
  "proto3_arena_lite_unittest.TestAllTypes.NestedEnum",
  [
    {no: 0, name: "ZERO"},
    {no: 1, name: "FOO"},
    {no: 2, name: "BAR"},
    {no: 3, name: "BAZ"},
    {no: -1, name: "NEG"},
  ],
);

/**
 * @generated from message proto3_arena_lite_unittest.TestAllTypes.NestedMessage
 */
export const TestAllTypes_NestedMessage = proto3.makeMessageType(
  "proto3_arena_lite_unittest.TestAllTypes.NestedMessage",
  () => [
    { no: 1, name: "bb", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
  {localName: "TestAllTypes_NestedMessage"},
);

/**
 * @generated from message proto3_arena_lite_unittest.TestPackedTypes
 */
export const TestPackedTypes = proto3.makeMessageType(
  "proto3_arena_lite_unittest.TestPackedTypes",
  () => [
    { no: 90, name: "packed_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 91, name: "packed_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true },
    { no: 92, name: "packed_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true },
    { no: 93, name: "packed_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true },
    { no: 94, name: "packed_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true },
    { no: 95, name: "packed_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true },
    { no: 96, name: "packed_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true },
    { no: 97, name: "packed_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true },
    { no: 98, name: "packed_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true },
    { no: 99, name: "packed_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true },
    { no: 100, name: "packed_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true },
    { no: 101, name: "packed_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
    { no: 102, name: "packed_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true },
    { no: 103, name: "packed_enum", kind: "enum", T: proto3.getEnumType(ForeignEnum), repeated: true },
  ],
);

/**
 * Explicitly set packed to false
 *
 * @generated from message proto3_arena_lite_unittest.TestUnpackedTypes
 */
export const TestUnpackedTypes = proto3.makeMessageType(
  "proto3_arena_lite_unittest.TestUnpackedTypes",
  () => [
    { no: 1, name: "repeated_int32", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true, packed: false },
    { no: 2, name: "repeated_int64", kind: "scalar", T: 3 /* ScalarType.INT64 */, repeated: true, packed: false },
    { no: 3, name: "repeated_uint32", kind: "scalar", T: 13 /* ScalarType.UINT32 */, repeated: true, packed: false },
    { no: 4, name: "repeated_uint64", kind: "scalar", T: 4 /* ScalarType.UINT64 */, repeated: true, packed: false },
    { no: 5, name: "repeated_sint32", kind: "scalar", T: 17 /* ScalarType.SINT32 */, repeated: true, packed: false },
    { no: 6, name: "repeated_sint64", kind: "scalar", T: 18 /* ScalarType.SINT64 */, repeated: true, packed: false },
    { no: 7, name: "repeated_fixed32", kind: "scalar", T: 7 /* ScalarType.FIXED32 */, repeated: true, packed: false },
    { no: 8, name: "repeated_fixed64", kind: "scalar", T: 6 /* ScalarType.FIXED64 */, repeated: true, packed: false },
    { no: 9, name: "repeated_sfixed32", kind: "scalar", T: 15 /* ScalarType.SFIXED32 */, repeated: true, packed: false },
    { no: 10, name: "repeated_sfixed64", kind: "scalar", T: 16 /* ScalarType.SFIXED64 */, repeated: true, packed: false },
    { no: 11, name: "repeated_float", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true, packed: false },
    { no: 12, name: "repeated_double", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true, packed: false },
    { no: 13, name: "repeated_bool", kind: "scalar", T: 8 /* ScalarType.BOOL */, repeated: true, packed: false },
    { no: 14, name: "repeated_nested_enum", kind: "enum", T: proto3.getEnumType(TestAllTypes_NestedEnum), repeated: true, packed: false },
  ],
);

/**
 * This proto includes a recursively nested message.
 *
 * @generated from message proto3_arena_lite_unittest.NestedTestAllTypes
 */
export const NestedTestAllTypes = proto3.makeMessageType(
  "proto3_arena_lite_unittest.NestedTestAllTypes",
  () => [
    { no: 1, name: "child", kind: "message", T: NestedTestAllTypes },
    { no: 2, name: "payload", kind: "message", T: TestAllTypes },
  ],
);

/**
 * Define these after TestAllTypes to make sure the compiler can handle
 * that.
 *
 * @generated from message proto3_arena_lite_unittest.ForeignMessage
 */
export const ForeignMessage = proto3.makeMessageType(
  "proto3_arena_lite_unittest.ForeignMessage",
  () => [
    { no: 1, name: "c", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * TestEmptyMessage is used to test behavior of unknown fields.
 *
 * @generated from message proto3_arena_lite_unittest.TestEmptyMessage
 */
export const TestEmptyMessage = proto3.makeMessageType(
  "proto3_arena_lite_unittest.TestEmptyMessage",
  [],
);

