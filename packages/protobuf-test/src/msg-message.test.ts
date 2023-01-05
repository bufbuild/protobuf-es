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

import { expect, test } from "@jest/globals";
import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { MessageFieldMessage as TS_MessageFieldMessage } from "./gen/ts/extra/msg-message_pb.js";
import { MessageFieldMessage as JS_MessageFieldMessage } from "./gen/js/extra/msg-message_pb.js";
import { describeMT } from "./helpers.js";

describeMT(
  { ts: TS_MessageFieldMessage, js: JS_MessageFieldMessage },
  (messageType) => {
    const defaultFields: PlainMessage<
      TS_MessageFieldMessage | JS_MessageFieldMessage
    > = {
      repeatedMessageField: [],
    };
    const defaultJson: JsonValue = {};
    const exampleFields = {
      messageField: { name: "test" },
      repeatedMessageField: [{ name: "a" }, { name: "b" }],
    };
    const exampleJson: JsonValue = {
      messageField: { name: "test" },
      repeatedMessageField: [{ name: "a" }, { name: "b" }],
    };

    test("has expected defaults", () => {
      const got = { ...new messageType() };
      expect(got).toStrictEqual(defaultFields);
    });
    test("defaults encodes to JSON", () => {
      const got = new messageType().toJson();
      expect(got).toStrictEqual(defaultJson);
    });
    test("defaults decodes from JSON", () => {
      const got = messageType.fromJson(defaultJson);
      expect(got.messageField?.name).toStrictEqual(
        defaultFields.messageField?.name
      );
      expect(got.repeatedMessageField.length).toStrictEqual(
        defaultFields.repeatedMessageField.length
      );
    });
    test("example encodes to JSON", () => {
      /* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access */
      const got = new messageType(exampleFields).toJson();
      expect((got as any).messageField?.name).toStrictEqual(
        (exampleJson as any).messageField?.name
      );
      expect((got as any).repeatedMessageField.length).toStrictEqual(
        (exampleJson as any).repeatedMessageField.length
      );
      expect((got as any).repeatedMessageField[0].name).toStrictEqual(
        (exampleJson as any).repeatedMessageField[0].name
      );
      expect((got as any).repeatedMessageField[1].name).toStrictEqual(
        (exampleJson as any).repeatedMessageField[1].name
      );
    });
    test("example decodes from JSON", () => {
      const got = messageType.fromJson(exampleJson);
      expect(got.messageField?.name).toStrictEqual(
        exampleFields.messageField.name
      );
      expect(got.repeatedMessageField.length).toStrictEqual(
        exampleFields.repeatedMessageField.length
      );
      expect(got.repeatedMessageField[0].name).toStrictEqual(
        exampleFields.repeatedMessageField[0].name
      );
      expect(got.repeatedMessageField[1].name).toStrictEqual(
        exampleFields.repeatedMessageField[1].name
      );
    });
    test("JSON.stringify correctly stringifies defaults", () => {
      const msg = new messageType();
      const got = JSON.stringify(msg);
      expect(got).toStrictEqual(
        msg.toJsonString({
          emitDefaultValues: true,
        })
      );
    });
    test("JSON.stringify correctly stringifies fields with values", () => {
      const msg = new messageType(exampleFields);
      const got = JSON.stringify(msg);
      expect(got).toStrictEqual(
        msg.toJsonString({
          emitDefaultValues: true,
        })
      );
    });
  }
);
