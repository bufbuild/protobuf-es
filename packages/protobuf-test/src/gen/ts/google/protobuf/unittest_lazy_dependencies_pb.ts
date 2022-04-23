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

// @generated by protoc-gen-es v0.0.2-alpha.3 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_lazy_dependencies.proto (package protobuf_unittest.lazy_imports, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In test_util.h we do "using namespace unittest = protobuf_unittest".

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto2} from "@bufbuild/protobuf";
import {LazyMessage} from "./unittest_lazy_dependencies_custom_option_pb.js";

/**
 * @generated from message protobuf_unittest.lazy_imports.ImportedMessage
 */
export class ImportedMessage extends Message<ImportedMessage> {
  /**
   * @generated from field: optional protobuf_unittest.lazy_imports.LazyMessage lazy_message = 1;
   */
  lazyMessage?: LazyMessage;

  constructor(data?: PartialMessage<ImportedMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.lazy_imports.ImportedMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "lazy_message", kind: "message", T: LazyMessage, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImportedMessage {
    return new ImportedMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImportedMessage {
    return new ImportedMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImportedMessage {
    return new ImportedMessage().fromJsonString(jsonString, options);
  }

  static equals(a: ImportedMessage | PlainMessage<ImportedMessage> | undefined, b: ImportedMessage | PlainMessage<ImportedMessage> | undefined): boolean {
    return proto2.util.equals(ImportedMessage, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.lazy_imports.MessageCustomOption
 */
export class MessageCustomOption extends Message<MessageCustomOption> {
  constructor(data?: PartialMessage<MessageCustomOption>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.lazy_imports.MessageCustomOption";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageCustomOption {
    return new MessageCustomOption().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageCustomOption {
    return new MessageCustomOption().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageCustomOption {
    return new MessageCustomOption().fromJsonString(jsonString, options);
  }

  static equals(a: MessageCustomOption | PlainMessage<MessageCustomOption> | undefined, b: MessageCustomOption | PlainMessage<MessageCustomOption> | undefined): boolean {
    return proto2.util.equals(MessageCustomOption, a, b);
  }
}

/**
 * @generated from message protobuf_unittest.lazy_imports.MessageCustomOption2
 */
export class MessageCustomOption2 extends Message<MessageCustomOption2> {
  constructor(data?: PartialMessage<MessageCustomOption2>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest.lazy_imports.MessageCustomOption2";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageCustomOption2 {
    return new MessageCustomOption2().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageCustomOption2 {
    return new MessageCustomOption2().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageCustomOption2 {
    return new MessageCustomOption2().fromJsonString(jsonString, options);
  }

  static equals(a: MessageCustomOption2 | PlainMessage<MessageCustomOption2> | undefined, b: MessageCustomOption2 | PlainMessage<MessageCustomOption2> | undefined): boolean {
    return proto2.util.equals(MessageCustomOption2, a, b);
  }
}

