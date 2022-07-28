// Copyright 2021-2022 Buf Technologies, Inc.
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

// @generated by protoc-gen-es v0.0.10 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/msg-message.proto (package spec, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message spec.MessageFieldMessage
 */
export declare class MessageFieldMessage extends Message<MessageFieldMessage> {
  /**
   * @generated from field: spec.MessageFieldMessage.TestMessage message_field = 1;
   */
  messageField?: MessageFieldMessage_TestMessage;

  /**
   * @generated from field: repeated spec.MessageFieldMessage.TestMessage repeated_message_field = 2;
   */
  repeatedMessageField: MessageFieldMessage_TestMessage[];

  constructor(data?: PartialMessage<MessageFieldMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.MessageFieldMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageFieldMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageFieldMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageFieldMessage;

  static equals(a: MessageFieldMessage | PlainMessage<MessageFieldMessage> | undefined, b: MessageFieldMessage | PlainMessage<MessageFieldMessage> | undefined): boolean;
}

/**
 * @generated from message spec.MessageFieldMessage.TestMessage
 */
export declare class MessageFieldMessage_TestMessage extends Message<MessageFieldMessage_TestMessage> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  constructor(data?: PartialMessage<MessageFieldMessage_TestMessage>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "spec.MessageFieldMessage.TestMessage";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageFieldMessage_TestMessage;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageFieldMessage_TestMessage;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageFieldMessage_TestMessage;

  static equals(a: MessageFieldMessage_TestMessage | PlainMessage<MessageFieldMessage_TestMessage> | undefined, b: MessageFieldMessage_TestMessage | PlainMessage<MessageFieldMessage_TestMessage> | undefined): boolean;
}

