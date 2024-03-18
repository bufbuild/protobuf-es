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
import { toBinary, create } from "@bufbuild/protobuf/next";
import {
  ScalarValuesMessage,
  RepeatedScalarValuesMessage,
} from "../gen/ts/extra/msg-scalar_pb.js";
import { MapsMessage } from "../gen/ts/extra/msg-maps_pb.js";
import {
  RepeatedScalarValuesMessageDesc,
  ScalarValuesMessageDesc,
} from "../gen/ts/extra/msg-scalar_pbv2.js";
import type { Message, MessageType, PartialMessage } from "@bufbuild/protobuf";
import { MapsMessageDesc } from "../gen/ts/extra/msg-maps_pbv2.js";

describe("toBinary()", () => {
  describe("should be identical to v1", () => {
    test("for scalar fields", () => {
      const init = {
        boolField: true,
        doubleField: 1.23,
        int32Field: 123,
        stringField: "foo",
      } satisfies PartialMessage<ScalarValuesMessage>;
      expectEq(
        ScalarValuesMessage,
        toBinary(create(ScalarValuesMessageDesc, init)),
        init,
      );
    });
    test("for repeated scalar fields", () => {
      const init = {
        boolField: [true, false],
        stringField: ["foo", "bar"],
        doubleField: [1.23, 23.1],
        int32Field: [123, 321],
      } satisfies PartialMessage<RepeatedScalarValuesMessage>;
      expectEq(
        RepeatedScalarValuesMessage,
        toBinary(create(RepeatedScalarValuesMessageDesc, init)),
        init,
      );
    });
    // TODO: `create` doesn't support maps
    test.skip("for map fields", () => {
      const init = {
        boolStrField: { true: "foo" },
        int32MsgField: { 123: { strStrField: { key: "value" } } },
      } satisfies PartialMessage<MapsMessage>;
      expectEq(MapsMessage, toBinary(create(MapsMessageDesc, init)), init);
    });
  });
});

function expectEq<T extends Message<T>>(
  type: MessageType<T>,
  bin: Uint8Array,
  init: PartialMessage<T>,
) {
  expect(type.fromBinary(bin).equals(new type(init))).toEqual(true);
}
