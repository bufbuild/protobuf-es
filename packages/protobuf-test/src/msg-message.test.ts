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

import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { Any, Struct } from "@bufbuild/protobuf";
import {
  MessageFieldMessage as TS_MessageFieldMessage,
  MessageStringifyMessage as TS_MessageStringifyMessage,
  MessageStringifyAnyMessage as TS_MessageStringifyAnyMessage,
} from "./gen/ts/extra/msg-message_pb.js";
import {
  MessageFieldMessage as JS_MessageFieldMessage,
  MessageStringifyMessage as JS_MessageStringifyMessage,
  MessageStringifyAnyMessage as JS_MessageStringifyAnyMessage,
} from "./gen/js/extra/msg-message_pb.js";
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
  }
);

describeMT(
  { ts: TS_MessageStringifyMessage, js: JS_MessageStringifyMessage },
  (messageType) => {
    const defaultFieldsString =
      '{"stringField":"","int32Field":0,"boolField":false,"mapField":{},"repeatedMessageField":[]}';

    const fieldsString =
      '{"stringField":"test","int32Field":42,"boolField":true,"mapField":{"key1":"value1","key2":"value2"},"repeatedMessageField":[{"name":"a"},{"name":"b"}]}';

    const fieldsJson = {
      stringField: "test",
      int32Field: 42,
      boolField: true,
      mapField: {
        key1: "value1",
        key2: "value2",
      },
      repeatedMessageField: [{ name: "a" }, { name: "b" }],
    };

    test("JSON.stringify correctly stringifies defaults", () => {
      const got = JSON.stringify(new messageType());
      expect(got).toStrictEqual(defaultFieldsString);
    });

    test("JSON.stringify correctly stringifies fields with values", () => {
      const got = JSON.stringify(new messageType(fieldsJson));
      expect(got).toStrictEqual(fieldsString);
    });

    test("round trip", () => {
      const got = JSON.parse(JSON.stringify(new messageType(fieldsJson)));
      expect(got).toStrictEqual(fieldsJson);
    });
  }
);

describeMT(
  { ts: TS_MessageStringifyAnyMessage, js: JS_MessageStringifyAnyMessage },
  (messageType) => {
    test("JSON.stringify correctly stringifies any", () => {
      const str = new Struct({
        fields: {
          foo: { kind: { case: "numberValue", value: 1 } },
        },
      });
      const anyMsg = Any.pack(str);
      const msg = new messageType({
        anyField: anyMsg,
      });
      const t = () => {
        JSON.stringify(msg);
      };
      expect(t).toThrow(Error);
    });
  }
);

// TODO - One for int64/BigInt expecting throws
