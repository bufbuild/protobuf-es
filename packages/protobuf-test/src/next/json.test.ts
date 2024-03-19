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
import { create, toJson } from "@bufbuild/protobuf/next";
import type { MessageInitShape } from "@bufbuild/protobuf/next";
import {
  ScalarValuesMessage,
  RepeatedScalarValuesMessage,
} from "../gen/ts/extra/msg-scalar_pb.js";
import { MapsMessage } from "../gen/ts/extra/msg-maps_pb.js";
import {
  RepeatedScalarValuesMessageDesc,
  ScalarValuesMessageDesc,
} from "../gen/ts/extra/msg-scalar_pbv2.js";
import type {
  DescMessage,
  Message,
  MessageType,
  PartialMessage,
} from "@bufbuild/protobuf";
import { MapsMessageDesc } from "../gen/ts/extra/msg-maps_pbv2.js";
import { MessageFieldMessageDesc } from "../gen/ts/extra/msg-message_pbv2.js";
import { MessageFieldMessage } from "../gen/ts/extra/msg-message_pb.js";

describe("binary serialization", () => {
  describe("should be identical to v1", () => {
    test("for scalar fields", () => {
      testV1Compat(ScalarValuesMessage, ScalarValuesMessageDesc, {
        boolField: true,
        doubleField: 1.23,
        int32Field: 123,
        stringField: "foo",
      });
    });
    test("for message fields", () => {
      testV1Compat(MessageFieldMessage, MessageFieldMessageDesc, {
        messageField: {
          name: "foo",
        },
        repeatedMessageField: [
          {
            name: "bar",
          },
        ],
      });
    });
    test("for repeated scalar fields", () => {
      testV1Compat(
        RepeatedScalarValuesMessage,
        RepeatedScalarValuesMessageDesc,
        {
          boolField: [true, false],
          stringField: ["foo", "bar"],
          doubleField: [1.23, 23.1],
          int32Field: [123, 321],
        },
      );
    });
    // TODO: `create` doesn't support maps yet, remove after support is added.
    test.skip("for map fields", () => {
      testV1Compat(MapsMessage, MapsMessageDesc, {
        boolStrField: { true: "foo" },
        int32MsgField: { 123: { strStrField: { key: "value" } } },
      });
    });
  });
});

function testV1Compat<T extends Message<T>, Desc extends DescMessage>(
  type: MessageType<T>,
  desc: Desc,
  init: PartialMessage<T> & MessageInitShape<Desc>,
) {
  const v1Msg = new type(init);
  const v2Msg = create(desc, init);
  const v2Json = toJson(v2Msg);
  expect(type.fromJson(v2Json)).toEqual(v1Msg);
}
