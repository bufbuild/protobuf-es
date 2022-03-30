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

// @generated by protoc-gen-es v0.0.2-alpha.2 with parameter "ts_nocheck=false,target=ts"
// @generated from file extra/msg-message.proto (package spec, syntax proto3)
/* eslint-disable */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message spec.MessageFieldMessage
 */
export class MessageFieldMessage extends Message<MessageFieldMessage> {

    /**
     * @generated from field: spec.MessageFieldMessage.TestMessage message_field = 1;
     */
    messageField?: MessageFieldMessage_TestMessage;

    /**
     * @generated from field: repeated spec.MessageFieldMessage.TestMessage repeated_message_field = 2;
     */
    repeatedMessageField: MessageFieldMessage_TestMessage[] = [];

    constructor(data?: PartialMessage<MessageFieldMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.MessageFieldMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "message_field", kind: "message", T: MessageFieldMessage_TestMessage},
        {no: 2, name: "repeated_message_field", kind: "message", T: MessageFieldMessage_TestMessage, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageFieldMessage {
        return new MessageFieldMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageFieldMessage {
        return new MessageFieldMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageFieldMessage {
        return new MessageFieldMessage().fromJsonString(jsonString, options);
    }

    static equals(a: MessageFieldMessage | PlainMessage<MessageFieldMessage> | undefined, b: MessageFieldMessage | PlainMessage<MessageFieldMessage> | undefined): boolean {
        return proto3.util.equals(MessageFieldMessage, a, b);
    }

}

/**
 * @generated from message spec.MessageFieldMessage.TestMessage
 */
export class MessageFieldMessage_TestMessage extends Message<MessageFieldMessage_TestMessage> {

    /**
     * @generated from field: string name = 1;
     */
    name = "";

    constructor(data?: PartialMessage<MessageFieldMessage_TestMessage>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.MessageFieldMessage.TestMessage";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageFieldMessage_TestMessage {
        return new MessageFieldMessage_TestMessage().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageFieldMessage_TestMessage {
        return new MessageFieldMessage_TestMessage().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageFieldMessage_TestMessage {
        return new MessageFieldMessage_TestMessage().fromJsonString(jsonString, options);
    }

    static equals(a: MessageFieldMessage_TestMessage | PlainMessage<MessageFieldMessage_TestMessage> | undefined, b: MessageFieldMessage_TestMessage | PlainMessage<MessageFieldMessage_TestMessage> | undefined): boolean {
        return proto3.util.equals(MessageFieldMessage_TestMessage, a, b);
    }

}



