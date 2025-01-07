// Copyright 2021-2025 Buf Technologies, Inc.
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
import {
  create,
  fromBinary,
  toBinary,
  protoInt64,
  toJsonString,
  fromJsonString,
} from "@bufbuild/protobuf";
import { readFileSync } from "fs";
import { UserSchema } from "./gen/ts/extra/example_pb.js";
import {
  ScalarValuesMessageSchema,
  RepeatedScalarValuesMessageSchema,
} from "./gen/ts/extra/msg-scalar_pb.js";
import { MapsMessageSchema } from "./gen/ts/extra/msg-maps_pb.js";
import {
  MessageFieldMessageSchema,
  MessageFieldMessage_TestMessageSchema,
} from "./gen/ts/extra/msg-message_pb.js";
import { PerfMessageSchema } from "./gen/ts/extra/perf_pb.js";

/* eslint-disable no-console, import/no-named-as-default-member */

main(process.argv.slice(2));

function main(args: string[]): void {
  function filterTests(regexp: string): Test[] {
    const tests = setupTests();
    const re = new RegExp(regexp);
    return tests.filter((test) => re.test(test.name));
  }
  switch (args.shift()) {
    case "list":
      if (args.length > 1) {
        exitUsage(1);
        break;
      }
      for (const test of filterTests(args.length == 1 ? args[0] : ".*")) {
        console.log(test.name);
      }
      break;
    case "benchmark":
      if (args.length > 1) {
        exitUsage(1);
        break;
      }
      bench(filterTests(args.length == 1 ? args[0] : ".*"));
      break;
    case "run": {
      if (args.length != 2) {
        exitUsage(1);
        break;
      }
      const tests = filterTests(args[0]);
      const iterations = parseInt(args[1]);
      run(tests, iterations);
      break;
    }
    default:
      exitUsage(1);
  }

  function exitUsage(exitCode = 0) {
    const out = exitCode === 0 ? process.stdout : process.stderr;
    out.write(
      [
        `USAGE: ${process.argv[1]} [list|benchmark|run] [regex] [iteration]`,
        ``,
        `benchmark '.*'`,
        `Run tests with the npm package "benchmark", and print results to standard out.`,
        ``,
        `run '.*' 1000`,
        `Run each test 1.000 times.`,
        ``,
        `list '.*':`,
        `List tests.`,
        ``,
      ].join("\n"),
      () => process.exit(exitCode),
    );
  }
}

interface Test {
  name: string;
  fn: () => void;
}

function setupTests(): Test[] {
  const tests: Test[] = [
    {
      name: "perf-payload.bin",
      desc: PerfMessageSchema,
      msg: fromBinary(
        PerfMessageSchema,
        readFileSync(new URL("perf-payload.bin", import.meta.url).pathname),
      ),
    },
    {
      name: "tiny example.User",
      desc: UserSchema,
      msg: create(UserSchema, { active: false, manager: { active: true } }),
    },
    {
      name: "normal example.User",
      desc: UserSchema,
      msg: create(UserSchema, {
        firstName: "Jane",
        lastName: "Doe",
        active: true,
        manager: { firstName: "Jane", lastName: "Doe", active: false },
        locations: ["Seattle", "New York", "Tokyo"],
        projects: { foo: "project foo", bar: "project bar" },
      }),
    },
    {
      name: "scalar values",
      desc: ScalarValuesMessageSchema,
      msg: create(ScalarValuesMessageSchema, {
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
      }),
    },
    {
      name: "repeated scalar values",
      desc: RepeatedScalarValuesMessageSchema,
      msg: create(RepeatedScalarValuesMessageSchema, {
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
          new Uint8Array([
            104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
          ]),
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
      }),
    },
    {
      name: "map with scalar keys and values",
      desc: MapsMessageSchema,
      msg: create(MapsMessageSchema, {
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
      }),
    },
    {
      name: "repeated field with 1000 messages",
      desc: MessageFieldMessageSchema,
      msg: (() => {
        const message = create(MessageFieldMessageSchema);
        for (let i = 0; i < 1000; i++) {
          message.repeatedMessageField.push(
            create(MessageFieldMessage_TestMessageSchema),
          );
        }
        return message;
      })(),
    },
    {
      name: "map field with 1000 messages",
      desc: MapsMessageSchema,
      msg: (() => {
        const message = create(MapsMessageSchema);
        for (let i = 0; i < 1000; i++) {
          message.strMsgField[i.toString()] = create(MapsMessageSchema);
        }
        return message;
      })(),
    },
  ].flatMap(({ name, msg, desc }) => {
    const bytes = toBinary(desc, msg);
    const jsonString = toJsonString(desc, msg);
    return [
      {
        name: `fromBinary ${name}`,
        fn: () => {
          fromBinary(desc, bytes);
        },
      },
      {
        name: `fromJson   ${name}`,
        fn: () => {
          fromJsonString(desc, jsonString);
        },
      },
      {
        name: `toBinary   ${name}`,
        fn: () => {
          toBinary(desc, msg);
        },
      },
      {
        name: `toJson     ${name}`,
        fn: () => {
          toJsonString(desc, msg);
        },
      },
    ];
  });
  return tests;
}

/**
 * Run given tests consecutively. Repeating each one several times.
 */
function run(tests: Test[], iterations: number): void {
  for (const test of tests) {
    console.log(`Running "${test.name}" ${iterations} times...`);
    for (let i = 0; i < iterations; i++) {
      test.fn();
    }
  }
}

/**
 * Benchmark tests with the npm package "benchmark". Results are printed to
 * standard out.
 */
function bench(tests: Test[]): void {
  let error: unknown;
  const suite = new Benchmark.Suite({
    name: "Benchmark",
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
  for (const test of tests) {
    suite.add(test.name, test.fn);
  }
  suite.run();
  if (error !== undefined) {
    throw error;
  }
}
