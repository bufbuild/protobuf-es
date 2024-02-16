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

import { describe, expect, test } from "@jest/globals";
import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { clearField, isFieldSet } from "@bufbuild/protobuf";
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
        defaultFields.messageField?.name,
      );
      expect(got.repeatedMessageField.length).toStrictEqual(
        defaultFields.repeatedMessageField.length,
      );
    });
    describe("isFieldSet()", () => {
      test("returns false for empty repeated field", () => {
        const msg = new messageType({
          repeatedMessageField: [],
        });
        expect(isFieldSet(msg, "repeatedMessageField")).toBe(false);
      });
      test("returns false for empty singular field", () => {
        const msg = new messageType();
        expect(isFieldSet(msg, "messageField")).toBe(false);
      });
      test("returns true for non-empty repeated field", () => {
        const msg = new messageType({
          repeatedMessageField: [{}],
        });
        expect(isFieldSet(msg, "repeatedMessageField")).toBe(true);
      });
      test("returns true for non-empty singular field", () => {
        const msg = new messageType({
          messageField: { name: "test" },
        });
        expect(isFieldSet(msg, "messageField")).toBe(true);
      });
    });
    describe("clearField()", () => {
      test("clears repeated field", () => {
        const msg = new messageType({
          repeatedMessageField: [{}],
        });
        clearField(msg, "repeatedMessageField");
        expect(msg.repeatedMessageField.length).toBe(0);
      });
      test("clears singular field", () => {
        const msg = new messageType({
          messageField: { name: "test" },
        });
        clearField(msg, "messageField");
        expect(msg.messageField).toBeUndefined();
      });
    });
    test("example encodes to JSON", () => {
      /* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access */
      const got = new messageType(exampleFields).toJson();
      expect((got as any).messageField?.name).toStrictEqual(
        (exampleJson as any).messageField?.name,
      );
      expect((got as any).repeatedMessageField.length).toStrictEqual(
        (exampleJson as any).repeatedMessageField.length,
      );
      expect((got as any).repeatedMessageField[0].name).toStrictEqual(
        (exampleJson as any).repeatedMessageField[0].name,
      );
      expect((got as any).repeatedMessageField[1].name).toStrictEqual(
        (exampleJson as any).repeatedMessageField[1].name,
      );
    });
    test("example decodes from JSON", () => {
      const got = messageType.fromJson(exampleJson);
      expect(got.messageField?.name).toStrictEqual(
        exampleFields.messageField.name,
      );
      expect(got.repeatedMessageField.length).toStrictEqual(
        exampleFields.repeatedMessageField.length,
      );
      expect(got.repeatedMessageField[0].name).toStrictEqual(
        exampleFields.repeatedMessageField[0].name,
      );
      expect(got.repeatedMessageField[1].name).toStrictEqual(
        exampleFields.repeatedMessageField[1].name,
      );
    });
    test("JSON.stringify correctly stringifies defaults", () => {
      const msg = new messageType();
      const got = JSON.stringify(msg);
      expect(got).toStrictEqual(
        msg.toJsonString({
          emitDefaultValues: true,
        }),
      );
    });
    test("JSON.stringify correctly stringifies fields with values", () => {
      const msg = new messageType(exampleFields);
      const got = JSON.stringify(msg);
      expect(got).toStrictEqual(
        msg.toJsonString({
          emitDefaultValues: true,
        }),
      );
    });
    describe("field info", () => {
      test.each(messageType.fields.byNumber())("$name", (field) => {
        expect(typeof field.no).toBe("number");
        expect(typeof field.name).toBe("string");
        expect(typeof field.localName).toBe("string");
        expect(typeof field.jsonName).toBe("string");
        expect(field.packed).toBe(false);
        expect(field.delimited).toBe(false);
        expect(field.oneof).toBeUndefined();
        expect(field.default).toBeUndefined();
        expect(field.opt).toBe(false);
        expect(field.req).toBe(false);
        expect(field.kind).toBe("message");
      });
      test("message_field", () => {
        const f = messageType.fields.find(1);
        expect(f?.kind).toBe("message");
        expect(f?.repeated).toBe(false);
        if (f?.kind == "message") {
          expect(f.T.typeName).toBe("spec.MessageFieldMessage.TestMessage");
        }
      });
      test("repeated_message_field", () => {
        const f = messageType.fields.find(2);
        expect(f?.repeated).toBe(true);
        expect(f?.kind).toBe("message");
        if (f?.kind == "message") {
          expect(f.T.typeName).toBe("spec.MessageFieldMessage.TestMessage");
        }
      });
    });
  },
);
