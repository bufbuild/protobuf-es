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

// Author: kenton@google.com (Kenton Varda)
//  Based on original Protocol Buffers design by
//  Sanjay Ghemawat, Jeff Dean, and others.
//
// A proto file which is imported by unittest.proto to test importing.

// @generated by protoc-gen-es v1.3.3 with parameter "ts_nocheck=false,target=js+dts"
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
export declare enum ImportEnum {
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

/**
 * To use an enum in a map, it must has the first value as 0.
 *
 * @generated from enum protobuf_unittest_import.ImportEnumForMap
 */
export declare enum ImportEnumForMap {
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

/**
 * @generated from message protobuf_unittest_import.ImportMessage
 */
export declare class ImportMessage extends Message<ImportMessage> {
  /**
   * @generated from field: optional int32 d = 1;
   */
  d?: number;

  constructor(data?: PartialMessage<ImportMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest_import.ImportMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImportMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImportMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImportMessage;

  static equals(a: ImportMessage | PlainMessage<ImportMessage> | undefined, b: ImportMessage | PlainMessage<ImportMessage> | undefined): boolean;
}

