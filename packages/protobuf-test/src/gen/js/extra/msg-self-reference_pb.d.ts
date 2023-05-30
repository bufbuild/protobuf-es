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

// @generated by protoc-gen-es v1.2.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/msg-self-reference.proto (package spec, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message spec.SelfReferencingMessage
 */
export declare class SelfReferencingMessage extends Message<SelfReferencingMessage> {
  /**
   * @generated from field: spec.SelfReferencingMessage self = 1;
   */
  self?: SelfReferencingMessage;

  /**
   * @generated from field: repeated spec.SelfReferencingMessage self_list = 2;
   */
  selfList: SelfReferencingMessage[];

  /**
   * @generated from field: map<string, spec.SelfReferencingMessage> self_map = 3;
   */
  selfMap: { [key: string]: SelfReferencingMessage };

  constructor(data?: PartialMessage<SelfReferencingMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.SelfReferencingMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SelfReferencingMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SelfReferencingMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SelfReferencingMessage;

  static equals(a: SelfReferencingMessage | PlainMessage<SelfReferencingMessage> | undefined, b: SelfReferencingMessage | PlainMessage<SelfReferencingMessage> | undefined): boolean;
}

