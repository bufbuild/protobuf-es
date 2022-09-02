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

// Author: trafacz@google.com (Todd Rafacz)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file we will use for unit testing.

// @generated by protoc-gen-es v0.1.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_lazy_dependencies_enum.proto (package protobuf_unittest.lazy_imports, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In test_util.h we do "using namespace unittest = protobuf_unittest".

import {proto2} from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest.lazy_imports.LazyEnum
 */
export enum LazyEnum {
  /**
   * @generated from enum value: LAZY_ENUM_0 = 0;
   */
  LAZY_ENUM_0 = 0,

  /**
   * @generated from enum value: LAZY_ENUM_1 = 1;
   */
  LAZY_ENUM_1 = 1,
}
// Retrieve enum metadata with: proto2.getEnumType(LazyEnum)
proto2.util.setEnumType(LazyEnum, "protobuf_unittest.lazy_imports.LazyEnum", [
  { no: 0, name: "LAZY_ENUM_0" },
  { no: 1, name: "LAZY_ENUM_1" },
]);

