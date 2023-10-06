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
//
// Tests that a "lite" message can import a regular message.

// @generated by protoc-gen-es v1.3.3 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_lite_imports_nonlite.proto (package protobuf_unittest, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";
import { TestAllTypes, TestRequired } from "./unittest_pb.js";

/**
 * @generated from message protobuf_unittest.TestLiteImportsNonlite
 */
export class TestLiteImportsNonlite extends Message<TestLiteImportsNonlite> {
  /**
   * @generated from field: optional protobuf_unittest.TestAllTypes message = 1;
   */
  message?: TestAllTypes;

  /**
   * Verifies that transitive required fields generates valid code.
   *
   * @generated from field: optional protobuf_unittest.TestRequired message_with_required = 2;
   */
  messageWithRequired?: TestRequired;

  constructor(data?: PartialMessage<TestLiteImportsNonlite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest.TestLiteImportsNonlite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "message", kind: "message", T: TestAllTypes, opt: true },
    { no: 2, name: "message_with_required", kind: "message", T: TestRequired, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TestLiteImportsNonlite {
    return new TestLiteImportsNonlite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TestLiteImportsNonlite {
    return new TestLiteImportsNonlite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TestLiteImportsNonlite {
    return new TestLiteImportsNonlite().fromJsonString(jsonString, options);
  }

  static equals(a: TestLiteImportsNonlite | PlainMessage<TestLiteImportsNonlite> | undefined, b: TestLiteImportsNonlite | PlainMessage<TestLiteImportsNonlite> | undefined): boolean {
    return proto2.util.equals(TestLiteImportsNonlite, a, b);
  }
}

