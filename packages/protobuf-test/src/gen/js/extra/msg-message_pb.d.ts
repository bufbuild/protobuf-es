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

// @generated by protoc-gen-es v2.0.0-alpha.1 with parameter "ts_nocheck=false,target=js+dts"
// @generated from file extra/msg-message.proto (package spec, syntax proto3)
/* eslint-disable */

import type { GenDescFile, GenDescMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file extra/msg-message.proto.
 */
export declare const fileDesc_extra_msg_message: GenDescFile;

/**
 * @generated from message spec.MessageFieldMessage
 */
export declare type MessageFieldMessage = Message<"spec.MessageFieldMessage"> & {
  /**
   * @generated from field: spec.MessageFieldMessage.TestMessage message_field = 1;
   */
  messageField?: MessageFieldMessage_TestMessage;

  /**
   * @generated from field: repeated spec.MessageFieldMessage.TestMessage repeated_message_field = 2;
   */
  repeatedMessageField: MessageFieldMessage_TestMessage[];
};

/**
 * Describes the message spec.MessageFieldMessage.
 * Use `create(MessageFieldMessageDesc)` to create a new message.
 */
export declare const MessageFieldMessageDesc: GenDescMessage<MessageFieldMessage>;

/**
 * @generated from message spec.MessageFieldMessage.TestMessage
 */
export declare type MessageFieldMessage_TestMessage = Message<"spec.MessageFieldMessage.TestMessage"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;
};

/**
 * Describes the message spec.MessageFieldMessage.TestMessage.
 * Use `create(MessageFieldMessage_TestMessageDesc)` to create a new message.
 */
export declare const MessageFieldMessage_TestMessageDesc: GenDescMessage<MessageFieldMessage_TestMessage>;

