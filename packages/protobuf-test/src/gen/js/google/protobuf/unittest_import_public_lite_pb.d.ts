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

// Author: liujisi@google.com (Pherl Liu)

// @generated by protoc-gen-es v1.7.0 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_import_public_lite.proto (package protobuf_unittest_import, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message protobuf_unittest_import.PublicImportMessageLite
 */
export declare class PublicImportMessageLite extends Message<PublicImportMessageLite> {
  /**
   * @generated from field: optional int32 e = 1;
   */
  e?: number;

  constructor(data?: PartialMessage<PublicImportMessageLite>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest_import.PublicImportMessageLite";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PublicImportMessageLite;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PublicImportMessageLite;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PublicImportMessageLite;

  static equals(a: PublicImportMessageLite | PlainMessage<PublicImportMessageLite> | undefined, b: PublicImportMessageLite | PlainMessage<PublicImportMessageLite> | undefined): boolean;
}

