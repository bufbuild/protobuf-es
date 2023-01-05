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

import { describe, expect, test } from "@jest/globals";
import { createRegistry } from "@bufbuild/protobuf";
import {
  MessageFieldMessage,
  MessageFieldMessage_TestMessage,
} from "./gen/ts/extra/msg-message_pb.js";

describe("createRegistry()", () => {
  test("finds nothing if empty", () => {
    const reg = createRegistry();
    expect(reg.findMessage(MessageFieldMessage.typeName)).toBeUndefined();
  });
  test("finds message", () => {
    const reg = createRegistry(MessageFieldMessage);
    expect(reg.findMessage(MessageFieldMessage.typeName)).toBe(
      MessageFieldMessage
    );
  });
  test("finds message through field", () => {
    const reg = createRegistry(MessageFieldMessage);
    expect(reg.findMessage(MessageFieldMessage_TestMessage.typeName)).toBe(
      MessageFieldMessage_TestMessage
    );
  });
});
