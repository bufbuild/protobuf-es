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

// @generated by protoc-gen-es v1.7.2 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file google/protobuf/source_context.proto (package google.protobuf, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * `SourceContext` represents information about the source of a
 * protobuf element, like the file in which it is defined.
 *
 * @generated from message google.protobuf.SourceContext
 */
export declare class SourceContext extends Message<SourceContext> {
  /**
   * The path-qualified name of the .proto file that contained the associated
   * protobuf element.  For example: `"google/protobuf/source_context.proto"`.
   *
   * @generated from field: string file_name = 1;
   */
  fileName: string;

  constructor(data?: PartialMessage<SourceContext>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "google.protobuf.SourceContext";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SourceContext;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SourceContext;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SourceContext;

  static equals(a: SourceContext | PlainMessage<SourceContext> | undefined, b: SourceContext | PlainMessage<SourceContext> | undefined): boolean;
}

