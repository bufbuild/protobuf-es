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

// Author: liujisi@google.com (Pherl Liu)

// @generated by protoc-gen-es v1.4.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/unittest_import_public.proto (package protobuf_unittest_import, syntax proto2)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message protobuf_unittest_import.PublicImportMessage
 */
export declare class PublicImportMessage extends Message<PublicImportMessage> {
  /**
   * @generated from field: optional int32 e = 1;
   */
  e?: number;

  constructor(data?: PartialMessage<PublicImportMessage>);

  static readonly runtime: typeof proto2;
  static readonly typeName = "protobuf_unittest_import.PublicImportMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PublicImportMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PublicImportMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PublicImportMessage;

  static equals(a: PublicImportMessage | PlainMessage<PublicImportMessage> | undefined, b: PublicImportMessage | PlainMessage<PublicImportMessage> | undefined): boolean;
}

