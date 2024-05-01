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
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";
import * as proto2_js from "./gen/js/extra/proto2_pb.js";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto3_js from "./gen/js/extra/proto3_pb.js";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pb.js";
import * as edition2023_js from "./gen/js/extra/edition2023_pb.js";
import * as nameclash_ts from "./gen/ts/extra/name-clash_pb.js";
import * as nameclash_js from "./gen/js/extra/name-clash_pb.js";
import * as service_ts from "./gen/ts/extra/service-all_pb.js";
import * as service_js from "./gen/js/extra/service-all_pb.js";
import * as test_messages_proto2_ts from "./gen/ts/google/protobuf/test_messages_proto2_pb.js";
import * as test_messages_proto2_js from "./gen/js/google/protobuf/test_messages_proto2_pb.js";
import * as test_messages_proto3_ts from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import * as test_messages_proto3_js from "./gen/js/google/protobuf/test_messages_proto3_pb.js";
import * as options_ts from "./gen/ts/extra/options_pb.js";
import * as option_usage_ts from "./gen/ts/extra/option-usage_pb.js";
import assert from "node:assert";
import { getExtension, hasExtension } from "@bufbuild/protobuf";

describe("custom options from generated code", () => {
  test("can be read via extensions", () => {
    const fileOptions =
      option_usage_ts.fileDesc_extra_option_usage.proto.options;
    assert(fileOptions);
    expect(
      getExtension(fileOptions, options_ts.file_option_retention_unknown),
    ).toBe("file option retention unknown");
    expect(
      getExtension(fileOptions, options_ts.file_option_retention_runtime),
    ).toBe("file option retention runtime");

    const messageOptions = option_usage_ts.MessageWithOptionsDesc.proto.options;
    assert(messageOptions);
    expect(
      getExtension(messageOptions, options_ts.message_option_retention_unknown),
    ).toBe("message option retention unknown");
    expect(
      getExtension(messageOptions, options_ts.message_option_retention_runtime),
    ).toBe("message option retention runtime");

    const fieldOptions =
      option_usage_ts.MessageWithOptionsDesc.fields[0].proto.options;
    assert(fieldOptions);
    expect(
      getExtension(fieldOptions, options_ts.field_option_retention_unknown),
    ).toBe("field option retention unknown");
    expect(
      getExtension(fieldOptions, options_ts.field_option_retention_runtime),
    ).toBe("field option retention runtime");

    const oneofOptions =
      option_usage_ts.MessageWithOptionsDesc.oneofs[0].proto.options;
    assert(oneofOptions);
    expect(
      getExtension(oneofOptions, options_ts.oneof_option_retention_unknown),
    ).toBe("oneof option retention unknown");
    expect(
      getExtension(oneofOptions, options_ts.oneof_option_retention_runtime),
    ).toBe("oneof option retention runtime");

    const enumOptions = option_usage_ts.EnumWithOptionsDesc.proto.options;
    assert(enumOptions);
    expect(
      getExtension(enumOptions, options_ts.enum_option_retention_unknown),
    ).toBe("enum option retention unknown");
    expect(
      getExtension(enumOptions, options_ts.enum_option_retention_runtime),
    ).toBe("enum option retention runtime");

    const enumValueOptions =
      option_usage_ts.EnumWithOptionsDesc.values[0].proto.options;
    assert(enumValueOptions);
    expect(
      getExtension(
        enumValueOptions,
        options_ts.enum_value_option_retention_unknown,
      ),
    ).toBe("enum value option retention unknown");
    expect(
      getExtension(
        enumValueOptions,
        options_ts.enum_value_option_retention_runtime,
      ),
    ).toBe("enum value option retention runtime");

    const serviceOptions = option_usage_ts.ServiceWithOptions.proto.options;
    assert(serviceOptions);
    expect(
      getExtension(serviceOptions, options_ts.service_option_retention_unknown),
    ).toBe("service option retention unknown");
    expect(
      getExtension(serviceOptions, options_ts.service_option_retention_runtime),
    ).toBe("service option retention runtime");

    const methodOptions =
      option_usage_ts.ServiceWithOptions.methods[0].proto.options;
    assert(methodOptions);
    expect(
      getExtension(methodOptions, options_ts.method_option_retention_unknown),
    ).toBe("method option retention unknown");
    expect(
      getExtension(methodOptions, options_ts.method_option_retention_runtime),
    ).toBe("method option retention runtime");
  });
  test("are unavailable for source retention options", () => {
    const fileOptions =
      option_usage_ts.fileDesc_extra_option_usage.proto.options;
    assert(fileOptions);
    expect(
      hasExtension(fileOptions, options_ts.file_option_retention_source),
    ).toBe(false);

    const messageOptions = option_usage_ts.MessageWithOptionsDesc.proto.options;
    assert(messageOptions);
    expect(
      hasExtension(messageOptions, options_ts.message_option_retention_source),
    ).toBe(false);

    const fieldOptions =
      option_usage_ts.MessageWithOptionsDesc.fields[0].proto.options;
    assert(fieldOptions);
    expect(
      hasExtension(fieldOptions, options_ts.field_option_retention_source),
    ).toBe(false);

    const oneofOptions =
      option_usage_ts.MessageWithOptionsDesc.oneofs[0].proto.options;
    assert(oneofOptions);
    expect(
      hasExtension(oneofOptions, options_ts.oneof_option_retention_source),
    ).toBe(false);

    const enumOptions = option_usage_ts.EnumWithOptionsDesc.proto.options;
    assert(enumOptions);
    expect(
      hasExtension(enumOptions, options_ts.enum_option_retention_source),
    ).toBe(false);

    const enumValueOptions =
      option_usage_ts.EnumWithOptionsDesc.values[0].proto.options;
    assert(enumValueOptions);
    expect(
      hasExtension(
        enumValueOptions,
        options_ts.enum_value_option_retention_source,
      ),
    ).toBe(false);

    const serviceOptions = option_usage_ts.ServiceWithOptions.proto.options;
    assert(serviceOptions);
    expect(
      hasExtension(serviceOptions, options_ts.service_option_retention_source),
    ).toBe(false);

    const methodOptions =
      option_usage_ts.ServiceWithOptions.methods[0].proto.options;
    assert(methodOptions);
    expect(
      hasExtension(methodOptions, options_ts.method_option_retention_source),
    ).toBe(false);
  });
});

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
