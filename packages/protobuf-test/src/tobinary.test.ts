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
/* eslint-disable */

import {
  MessageFieldMessage,
  MessageFieldMessage_TestMessage,
} from "./gen/ts/extra/msg-message_pb.js";
import type { FieldList, PartialMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { Proto2PackedMessage } from "./gen/ts/extra/proto2_pb.js";

// This is a replica of the MessageFieldMessage_TestMessage to simulate a separate compilation unit.
export class Msg extends Message<Msg> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<Msg>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "spec.MessageFieldMessage.TestMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);
}

describe("toBinary", () => {
  test("fails if wrong message is there", () => {
    const msg = new MessageFieldMessage();
    msg.messageField = new Proto2PackedMessage() as any;
    expect(() => msg.toBinary()).toThrow(
      Error(
        `cannot wrap field value, ${Msg.typeName} does not define a field wrapper`
      )
    );
  });

  test("serializes identical messages", () => {
    const msg = new MessageFieldMessage();
    msg.messageField = new Msg({ name: "test" });
    expect(() => msg.toBinary()).not.toThrow();
  });

  test("produces identical results", () => {
    const msg = new MessageFieldMessage({
      repeatedMessageField: [
        new MessageFieldMessage_TestMessage({ name: "data1" }),
        new MessageFieldMessage_TestMessage({ name: "data2" }),
      ],
      messageField: new MessageFieldMessage_TestMessage({ name: "data" }),
    });
    const binary = msg.toBinary();

    msg.messageField = new Msg({ name: "data" });

    expect(msg.toBinary()).toEqual(binary);
  });
});
