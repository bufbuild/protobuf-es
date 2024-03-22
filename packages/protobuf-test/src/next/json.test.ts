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
import type {
  MessageInitShape,
  JsonWriteOptions,
} from "@bufbuild/protobuf/next";
import {
  ScalarValuesMessage,
  RepeatedScalarValuesMessage,
} from "../gen/ts/extra/msg-scalar_pb.js";
import { MapsMessage } from "../gen/ts/extra/msg-maps_pb.js";
import {
  RepeatedScalarValuesMessageDesc,
  ScalarValuesMessageDesc,
} from "../gen/ts/extra/msg-scalar_pbv2.js";
import { Any, createRegistry, Struct, Value } from "@bufbuild/protobuf";
import { MapsMessageDesc } from "../gen/ts/extra/msg-maps_pbv2.js";
import { MessageFieldMessageDesc } from "../gen/ts/extra/msg-message_pbv2.js";
import { MessageFieldMessage } from "../gen/ts/extra/msg-message_pb.js";
import { WrappersMessage } from "../gen/ts/extra/wkt-wrappers_pb.js";
import { WrappersMessageDesc } from "../gen/ts/extra/wkt-wrappers_pbv2.js";
import {
  AnyDesc,
  StructDesc,
  ValueDesc,
  anyPack,
} from "@bufbuild/protobuf/next/wkt";
import type {
  JsonWriteOptions as JsonWriteOptionsV1,
  DescMessage,
  Message,
  PartialMessage,
  MessageType,
} from "@bufbuild/protobuf";
import { createDescSet } from "@bufbuild/protobuf/next/reflect";

describe("json serialization", () => {
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
    // TODO: `create` doesn't support maps yet, remove skip after support is added.
    test.skip("for map fields", () => {
      testV1Compat(MapsMessage, MapsMessageDesc, {
        boolStrField: { true: "foo" },
        int32MsgField: { 123: { strStrField: { key: "value" } } },
      });
    });
    test("for wkt wrapper", () => {
      testV1Compat(WrappersMessage, WrappersMessageDesc, {
        boolValueField: true,
        doubleValueField: 1.23,
        int64ValueField: BigInt(123),
        repeatedUint32ValueField: [{ value: 432 }, { value: 234 }],
      });
    });
    describe("for Any", () => {
      test("without value encodes to JSON {}", () => {
        const any = create(AnyDesc);
        expect(toJson(any)).toStrictEqual({});
      });
      // TODO: `create` doesn't support maps yet, remove skip after support is added.
      test.skip(`encodes ${ValueDesc.typeName} with ${StructDesc.typeName} to JSON`, () => {
        const any = anyPack(
          create(ValueDesc, {
            kind: {
              case: "structValue",
              value: {
                fields: {
                  foo: { kind: { case: "numberValue", value: 1 } },
                },
              },
            },
          }),
        );
        testV1Compat(Any, AnyDesc, any, {
          typeRegistry: createRegistry(Struct, Value),
          descSet: createDescSet(StructDesc, ValueDesc),
        });
      });
    });
  });
});

function testV1Compat<T extends Message<T>, Desc extends DescMessage>(
  type: MessageType<T>,
  desc: Desc,
  init: PartialMessage<T> & MessageInitShape<Desc>,
  options?: Partial<JsonWriteOptionsV1 & JsonWriteOptions>,
) {
  const v1Msg = new type(init);
  const v2Msg = create(desc, init);
  const v2Json = toJson(v2Msg, options);
  expect(type.fromJson(v2Json, options).equals(v1Msg)).toBe(true);
}
