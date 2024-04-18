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

import { describe, test, expect } from "@jest/globals";
import type { Int32Value, StringValue } from "@bufbuild/protobuf/wkt";
import type { GenDescService } from "@bufbuild/protobuf/codegenv1";
import * as proto2_ts from "./gen/ts/extra/proto2_pbv2.js";
import * as proto2_js from "./gen/js/extra/proto2_pbv2.js";
import * as proto3_ts from "./gen/ts/extra/proto3_pbv2.js";
import * as proto3_js from "./gen/js/extra/proto3_pbv2.js";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pbv2.js";
import * as edition2023_js from "./gen/js/extra/edition2023_pbv2.js";
import * as nameclash_ts from "./gen/ts/extra/name-clash_pbv2.js";
import * as nameclash_js from "./gen/js/extra/name-clash_pbv2.js";
import * as service_ts from "./gen/ts/extra/service-all_pbv2.js";
import * as service_js from "./gen/js/extra/service-all_pbv2.js";
import * as test_messages_proto2_ts from "./gen/ts/google/protobuf/test_messages_proto2_pbv2.js";
import * as test_messages_proto2_js from "./gen/js/google/protobuf/test_messages_proto2_pbv2.js";
import * as test_messages_proto3_ts from "./gen/ts/google/protobuf/test_messages_proto3_pbv2.js";
import * as test_messages_proto3_js from "./gen/js/google/protobuf/test_messages_proto3_pbv2.js";
import * as descriptor_ts from "./gen/ts/google/protobuf/descriptor_pbv2.js";
import * as descriptor_js from "./gen/js/google/protobuf/descriptor_pbv2.js";

test("ts generated code is assignable to js", () => {
  expect([
    function f(ts: proto2_ts.Proto2Enum, js: proto2_js.Proto2Enum) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(ts: proto2_ts.Proto2Message, js: proto2_js.Proto2Message) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(ts: proto3_ts.Proto3Enum, js: proto3_js.Proto3Enum) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(ts: proto3_ts.Proto3Message, js: proto3_js.Proto3Message) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(
      ts: edition2023_ts.Edition2023EnumOpen,
      js: edition2023_js.Edition2023EnumOpen,
    ) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(
      ts: edition2023_ts.Edition2023Message,
      js: edition2023_js.Edition2023Message,
    ) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(
      ts: test_messages_proto2_ts.TestAllTypesProto2,
      js: test_messages_proto2_js.TestAllTypesProto2,
    ) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(
      ts: test_messages_proto3_ts.TestAllTypesProto3,
      js: test_messages_proto3_js.TestAllTypesProto3,
    ) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(
      ts: descriptor_ts.FileDescriptorSet,
      js: descriptor_js.FileDescriptorSet,
    ) {
      ts = js;
      js = ts;
      return [ts, js];
    },
    function f(
      ts: typeof service_ts.ServiceAll,
      js: typeof service_js.ServiceAll,
    ) {
      ts = js;
      js = ts;
      return [ts, js];
    },
  ]).toBeDefined();
});

test("service generates as expected", () => {
  type Expected = {
    unary: {
      kind: "unary";
      I: StringValue;
      O: Int32Value;
    };
    serverStream: {
      kind: "server_streaming";
      I: StringValue;
      O: Int32Value;
    };
    clientStream: {
      kind: "client_streaming";
      I: StringValue;
      O: Int32Value;
    };
    bidi: {
      kind: "bidi_streaming";
      I: StringValue;
      O: Int32Value;
    };
  };
  type Actual<T> = T extends GenDescService<infer Shape> ? Shape : never;
  function f(expected: Expected, actual: Actual<typeof service_js.ServiceAll>) {
    expected = actual;
    actual = expected;
    return [expected, actual];
  }
  expect(f).toBeDefined();
});

describe("ts generated code is equal to js generated code", () => {
  test("proto2", () => {
    expect(toPlain(proto2_ts)).toStrictEqual(toPlain(proto2_js));
  });
  test("proto3", () => {
    expect(toPlain(proto3_ts)).toStrictEqual(toPlain(proto3_js));
  });
  test("edition2023", () => {
    expect(toPlain(edition2023_ts)).toStrictEqual(toPlain(edition2023_js));
  });
  test("nameclash", () => {
    expect(toPlain(nameclash_ts)).toStrictEqual(toPlain(nameclash_js));
  });
  test("test_messages_proto3", () => {
    expect(toPlain(test_messages_proto3_ts)).toStrictEqual(
      toPlain(test_messages_proto3_js),
    );
  });
  test("descriptor", () => {
    expect(toPlain(descriptor_ts)).toStrictEqual(toPlain(descriptor_js));
  });
  test("service", () => {
    expect(toPlain(service_ts)).toStrictEqual(toPlain(service_js));
  });

  /**
   * Convert to plain object for comparison with Jest.
   * Replaces cyclic references.
   */
  function toPlain(obj: unknown): unknown {
    const seen = new Map<object, string>();
    return JSON.parse(
      JSON.stringify(obj, (_, value: unknown): unknown => {
        if (typeof value == "bigint") {
          return value.toString() + "n";
        }
        if (typeof value == "object" && value !== null) {
          let id = seen.get(value);
          if (id !== undefined) {
            return id;
          }
          if ("toString" in value) {
            id = String(value) + "@" + seen.size;
          } else {
            id = "unknown@" + seen.size;
          }
          seen.set(value, id);
        }
        return value;
      }),
    );
  }
});
