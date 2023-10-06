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

// @generated by protoc-gen-es v1.3.3 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_lazy_dependencies.proto (package protobuf_unittest.lazy_imports, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In test_util.h we do "using namespace unittest = protobuf_unittest".

import { proto2 } from "@bufbuild/protobuf";
import { LazyMessage } from "./unittest_lazy_dependencies_custom_option_pb.js";

/**
 * @generated from message protobuf_unittest.lazy_imports.ImportedMessage
 */
export const ImportedMessage = proto2.makeMessageType(
  "protobuf_unittest.lazy_imports.ImportedMessage",
  () => [
    { no: 1, name: "lazy_message", kind: "message", T: LazyMessage, opt: true },
  ],
);

/**
 * @generated from message protobuf_unittest.lazy_imports.MessageCustomOption
 */
export const MessageCustomOption = proto2.makeMessageType(
  "protobuf_unittest.lazy_imports.MessageCustomOption",
  [],
);

/**
 * @generated from message protobuf_unittest.lazy_imports.MessageCustomOption2
 */
export const MessageCustomOption2 = proto2.makeMessageType(
  "protobuf_unittest.lazy_imports.MessageCustomOption2",
  [],
);

