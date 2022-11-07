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

import {
  MessageFieldMessage as TS_MessageFieldMessage,
  MessageFieldMessage_TestMessage as TS_MessageFieldMessage_TestMessage,
} from "./gen/ts/extra/msg-message_pb.js";
import { MessageFieldMessage_TestMessage as JS_MessageFieldMessage_TestMessage } from "./gen/js/extra/msg-message_pb.js";

describe("mixing message instances", () => {
  const message = new TS_MessageFieldMessage();
  message.messageField = new JS_MessageFieldMessage_TestMessage({
    name: "foo",
  });
  test("serializes to the binary format", () => {
    const bytes = message.toBinary();
    const message2 = TS_MessageFieldMessage.fromBinary(bytes);
    expect(message2.messageField?.name).toBe("foo");
  });
  test("serializes to JSON", () => {
    const jsonString = message.toJsonString();
    const message2 = TS_MessageFieldMessage.fromJsonString(jsonString);
    expect(message2.messageField?.name).toBe("foo");
  });
});

describe("mixing message instances in the constructor", () => {
  test("normalizes by creating a new instance", () => {
    const test = new JS_MessageFieldMessage_TestMessage({ name: "foo" });
    const message = new TS_MessageFieldMessage({
      messageField: test,
    });
    expect(message.messageField?.name).toBe("foo");
    expect(message.messageField).toBeInstanceOf(
      TS_MessageFieldMessage_TestMessage
    );
  });
});
