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

// @generated by protoc-gen-es v1.7.1 with parameter "ts_nocheck=false,target=ts"
// @generated from file google/protobuf/unittest_import_lite.proto (package protobuf_unittest_import, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from enum protobuf_unittest_import.ImportEnumLite
 */
export enum ImportEnumLite {
  /**
   * @generated from enum value: IMPORT_LITE_FOO = 7;
   */
  IMPORT_LITE_FOO = 7,

  /**
   * @generated from enum value: IMPORT_LITE_BAR = 8;
   */
  IMPORT_LITE_BAR = 8,

  /**
   * @generated from enum value: IMPORT_LITE_BAZ = 9;
   */
  IMPORT_LITE_BAZ = 9,
}
// Retrieve enum metadata with: proto2.getEnumType(ImportEnumLite)
proto2.util.setEnumType(ImportEnumLite, "protobuf_unittest_import.ImportEnumLite", [
  { no: 7, name: "IMPORT_LITE_FOO" },
  { no: 8, name: "IMPORT_LITE_BAR" },
  { no: 9, name: "IMPORT_LITE_BAZ" },
]);

/**
 * @generated from message protobuf_unittest_import.ImportMessageLite
 */
export class ImportMessageLite extends Message<ImportMessageLite> {
  /**
   * @generated from field: optional int32 d = 1;
   */
  d?: number;

  constructor(data?: PartialMessage<ImportMessageLite>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "protobuf_unittest_import.ImportMessageLite";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "d", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImportMessageLite {
    return new ImportMessageLite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImportMessageLite {
    return new ImportMessageLite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImportMessageLite {
    return new ImportMessageLite().fromJsonString(jsonString, options);
  }

  static equals(a: ImportMessageLite | PlainMessage<ImportMessageLite> | undefined, b: ImportMessageLite | PlainMessage<ImportMessageLite> | undefined): boolean {
    return proto2.util.equals(ImportMessageLite, a, b);
  }
}

