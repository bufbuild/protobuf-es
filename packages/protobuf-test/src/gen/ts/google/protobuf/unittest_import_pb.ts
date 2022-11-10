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
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file which is imported by unittest.proto to test importing.

// @generated by protoc-gen-es v0.2.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_import.proto (package protobuf_unittest_import, syntax proto2)
/* eslint-disable */

// We don't put this in a package within proto2 because we need to make sure
// that the generated code doesn't depend on being in the proto2 namespace.
// In test_util.h we do
// "using namespace unittest_import = protobuf_unittest_import".

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest_import.ImportEnum
 */
export enum ImportEnum {
  /**
   * @generated from enum value: IMPORT_FOO = 7;
   */
  IMPORT_FOO = 7,

  /**
   * @generated from enum value: IMPORT_BAR = 8;
   */
  IMPORT_BAR = 8,

  /**
   * @generated from enum value: IMPORT_BAZ = 9;
   */
  IMPORT_BAZ = 9,
}
// Retrieve enum metadata with: proto2.getEnumType(ImportEnum)
proto2.util.setEnumType(ImportEnum, "protobuf_unittest_import.ImportEnum", [
  { no: 7, name: "IMPORT_FOO" },
  { no: 8, name: "IMPORT_BAR" },
  { no: 9, name: "IMPORT_BAZ" },
]);

/**
 * To use an enum in a map, it must has the first value as 0.
 *
 * @generated from enum protobuf_unittest_import.ImportEnumForMap
 */
export enum ImportEnumForMap {
  /**
   * @generated from enum value: UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * @generated from enum value: FOO = 1;
   */
  FOO = 1,

  /**
   * @generated from enum value: BAR = 2;
   */
  BAR = 2,
}
// Retrieve enum metadata with: proto2.getEnumType(ImportEnumForMap)
proto2.util.setEnumType(ImportEnumForMap, "protobuf_unittest_import.ImportEnumForMap", [
  { no: 0, name: "UNKNOWN" },
  { no: 1, name: "FOO" },
  { no: 2, name: "BAR" },
]);

/**
 * @generated from message protobuf_unittest_import.ImportMessage
 */
export class ImportMessage extends Message<ImportMessage> {
  /**
   * @generated from field: optional int32 d = 1;
   */
  d?: number;

  constructor(data?: PartialMessage<ImportMessage>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "protobuf_unittest_import.ImportMessage";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "d", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImportMessage {
    return new ImportMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImportMessage {
    return new ImportMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImportMessage {
    return new ImportMessage().fromJsonString(jsonString, options);
  }

  static equals(a: ImportMessage | PlainMessage<ImportMessage> | undefined, b: ImportMessage | PlainMessage<ImportMessage> | undefined): boolean {
    return proto2.util.equals(ImportMessage, a, b);
  }
}

