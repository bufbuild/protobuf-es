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

import Benchmark from "benchmark";
import { readFileSync } from "node:fs";
import { FileDescriptorSet } from "./gen/ts/google/protobuf/descriptor_pb.js";
import { User } from "./gen/ts/extra/example_pb.js";
import { protoInt64 } from "@bufbuild/protobuf";
import {
  RepeatedScalarValuesMessage,
  ScalarValuesMessage,
} from "./gen/ts/extra/msg-scalar_pb.js";
import { MapsMessage } from "./gen/ts/extra/msg-maps_pb.js";
import {
  MessageFieldMessage,
  MessageFieldMessage_TestMessage,
} from "./gen/ts/extra/msg-message_pb.js";

/* eslint-disable no-console, import/no-named-as-default-member */

run("Parsing binary", [
  function () {
    const data = readFileSync("./descriptorset.bin");
    return {
      name: `large google.protobuf.FileDescriptorSet (${data.byteLength} bytes)`,
      fn: () => {
        FileDescriptorSet.fromBinary(data);
      },
    };
  },
  function () {
    const tinyUser = new User({
      active: false,
      manager: { active: true },
    });
    const data = tinyUser.toBinary();
    return {
      name: `tiny docs.User (${data.byteLength} bytes)`,
      fn: () => {
        FileDescriptorSet.fromBinary(data);
      },
    };
  },
  function () {
    const message = new ScalarValuesMessage({
      doubleField: 0.75,
      floatField: -0.75,
      int64Field: protoInt64.parse(-1),
      uint64Field: protoInt64.uParse(1),
      int32Field: -123,
      fixed64Field: protoInt64.uParse(1),
      fixed32Field: 123,
      boolField: true,
      stringField: "hello world",
      bytesField: new Uint8Array([
        104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
      ]),
      uint32Field: 123,
      sfixed32Field: -123,
      sfixed64Field: protoInt64.parse(-1),
      sint32Field: -1,
      sint64Field: protoInt64.parse(-1),
    });
    const data = message.toBinary();
    return {
      name: `scalar values (${data.byteLength} bytes)`,
      fn: () => {
        ScalarValuesMessage.fromBinary(data);
      },
    };
  },
  function () {
    const message = new RepeatedScalarValuesMessage({
      doubleField: [0.75, 0, 1],
      floatField: [0.75, -0.75],
      int64Field: [protoInt64.parse(-1), protoInt64.parse(-2)],
      uint64Field: [protoInt64.uParse(1), protoInt64.uParse(2)],
      int32Field: [-123, 500],
      fixed64Field: [protoInt64.uParse(1), protoInt64.uParse(99)],
      fixed32Field: [123, 999],
      boolField: [true, false, true],
      stringField: ["hello", "world"],
      bytesField: [
        new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]),
      ],
      uint32Field: [123, 123],
      sfixed32Field: [-123, -123, -123],
      sfixed64Field: [
        protoInt64.parse(-1),
        protoInt64.parse(-2),
        protoInt64.parse(100),
      ],
      sint32Field: [-1, -2, 999],
      sint64Field: [
        protoInt64.parse(-1),
        protoInt64.parse(-99),
        protoInt64.parse(99),
      ],
    });
    const data = message.toBinary();
    return {
      name: `repeated scalar fields (${data.byteLength} bytes)`,
      fn: () => {
        RepeatedScalarValuesMessage.fromBinary(data);
      },
    };
  },
  function () {
    const message = new MapsMessage({
      strStrField: { a: "str", b: "xx" },
      strInt32Field: { a: 123, b: 455 },
      strInt64Field: { a: protoInt64.parse(123) },
      strBoolField: { a: true, b: false },
      strBytesField: {
        a: new Uint8Array([
          104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
        ]),
      },
      int32StrField: { 123: "hello" },
      int64StrField: { "9223372036854775807": "hello" },
      boolStrField: { true: "yes", false: "no" },
      strEnuField: { a: 0, b: 1, c: 2 },
      int32EnuField: { 1: 0, 2: 1, 0: 2 },
      int64EnuField: { "-1": 0, "2": 1, "0": 2 },
    });
    const data = message.toBinary();
    return {
      name: `map with scalar keys and values (${data.byteLength} bytes)`,
      fn: () => {
        MapsMessage.fromBinary(data);
      },
    };
  },
  function () {
    const message = new MessageFieldMessage();
    for (let i = 0; i < 1000; i++) {
      message.repeatedMessageField.push(new MessageFieldMessage_TestMessage());
    }
    const data = message.toBinary();
    return {
      name: `repeated field with 1000 messages (${data.byteLength} bytes)`,
      fn: () => {
        MessageFieldMessage.fromBinary(data);
      },
    };
  },
  function () {
    const message = new MapsMessage();
    for (let i = 0; i < 1000; i++) {
      message.strMsgField[i.toString()] = new MapsMessage();
    }
    const data = message.toBinary();
    return {
      name: `map field with 1000 messages (${data.byteLength} bytes)`,
      fn: () => {
        MapsMessage.fromBinary(data);
      },
    };
  },
]);

interface Test {
  name: string;
  fn: () => void;
}

/**
 * Benchmark a suite of tests with the npm package "benchmark". Results are
 * printed to standard out.
 */
function run(name: string, tests: (Test | (() => Test))[]): void {
  let error: unknown;
  const suite = new Benchmark.Suite({
    name,
    onCycle(event: Event) {
      console.log(String(event.target));
    },
    onError(event: Event) {
      const target = event.target as unknown;
      if (typeof target == "object" && target !== null && "error" in target) {
        error = (target as { error: unknown }).error;
      }
    },
    async: false,
  });
  for (const testOrProvider of tests) {
    if (typeof testOrProvider == "function") {
      const { name, fn } = testOrProvider();
      suite.add(name, fn);
    } else {
      const { name, fn } = testOrProvider;
      suite.add(name, fn);
    }
  }
  console.log(`### ${String(suite.name)}`);
  suite.run();
  if (error !== undefined) {
    throw error;
  }
}
