/* eslint-disable */
// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_preserve_unknown_enum2.proto (package proto2_preserve_unknown_enum_unittest, syntax proto2)
//
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

import {proto2} from "@bufbuild/protobuf";

/**
 * @generated from enum proto2_preserve_unknown_enum_unittest.MyEnum
 */
export const MyEnum = proto2.makeEnum(
    "proto2_preserve_unknown_enum_unittest.MyEnum",
    [
        {no: 0, name: "FOO"},
        {no: 1, name: "BAR"},
        {no: 2, name: "BAZ"},
    ],
);


/**
 * @generated from message proto2_preserve_unknown_enum_unittest.MyMessage
 */
export const MyMessage = proto2.makeMessageType(
    "proto2_preserve_unknown_enum_unittest.MyMessage",
    () => [
        {no: 1, name: "e", kind: "enum", T: proto2.getEnumType(MyEnum), opt: true},
        {no: 2, name: "repeated_e", kind: "enum", T: proto2.getEnumType(MyEnum), repeated: true},
        {no: 3, name: "repeated_packed_e", kind: "enum", T: proto2.getEnumType(MyEnum), repeated: true, packed: true},
        {no: 4, name: "repeated_packed_unexpected_e", kind: "enum", T: proto2.getEnumType(MyEnum), repeated: true},
        {no: 5, name: "oneof_e_1", kind: "enum", T: proto2.getEnumType(MyEnum), oneof: "o"},
        {no: 6, name: "oneof_e_2", kind: "enum", T: proto2.getEnumType(MyEnum), oneof: "o"},
    ],
);


