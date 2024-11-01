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
import type {
  Int32ValueSchema,
  StringValueSchema,
} from "@bufbuild/protobuf/wkt";
import { hasExtension } from "@bufbuild/protobuf";
import type { GenService } from "@bufbuild/protobuf/codegenv1";
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
import * as json_types_ts_json from "./gen/ts,json_types/extra/json_types_pb.js";
import * as json_types_js_json from "./gen/js,json_types/extra/json_types_pb.js";

test("source retention options are unavailable in generated code", () => {
  const fileOptions = option_usage_ts.file_extra_option_usage.proto.options;
  expect(
    !!fileOptions &&
      hasExtension(fileOptions, options_ts.file_option_retention_source),
  ).toBe(false);

  const messageOptions = option_usage_ts.MessageWithOptionsSchema.proto.options;
  expect(
    !!messageOptions &&
      hasExtension(messageOptions, options_ts.message_option_retention_source),
  ).toBe(false);

  const fieldOptions =
    option_usage_ts.MessageWithOptionsSchema.fields[0].proto.options;
  expect(
    !!fieldOptions &&
      hasExtension(fieldOptions, options_ts.field_option_retention_source),
  ).toBe(false);

  const oneofOptions =
    option_usage_ts.MessageWithOptionsSchema.oneofs[0].proto.options;
  expect(
    !!oneofOptions &&
      hasExtension(oneofOptions, options_ts.oneof_option_retention_source),
  ).toBe(false);

  const enumOptions = option_usage_ts.EnumWithOptionsSchema.proto.options;
  expect(
    !!enumOptions &&
      hasExtension(enumOptions, options_ts.enum_option_retention_source),
  ).toBe(false);

  const enumValueOptions =
    option_usage_ts.EnumWithOptionsSchema.values[0].proto.options;
  expect(
    !!enumValueOptions &&
      hasExtension(
        enumValueOptions,
        options_ts.enum_value_option_retention_source,
      ),
  ).toBe(false);

  const serviceOptions = option_usage_ts.ServiceWithOptions.proto.options;
  expect(
    !!serviceOptions &&
      hasExtension(serviceOptions, options_ts.service_option_retention_source),
  ).toBe(false);

  const methodOptions =
    option_usage_ts.ServiceWithOptions.methods[0].proto.options;
  expect(
    !!methodOptions &&
      hasExtension(methodOptions, options_ts.method_option_retention_source),
  ).toBe(false);
});

describe("JSON types", () => {
  const ok_ts: json_types_ts_json.JsonTypesMessageJson = {
    booleanFieldWithCustomName: true,
    Foo123_bar$: true,
    "foo@": true,
    "foo-bar": true,
    "1foo": true,
    "foo bar": true,
    "foo\tbar": true,
    你好: true,
    "foo\nbar\\n": true,
    doubleField: "Infinity",
    bytesField: "aGVsbG8gd29ybGQ=",
    int64Field: "123",
    enumField: "JSON_TYPE_ENUM_YES",
    repeatedEnumField: ["JSON_TYPE_ENUM_YES", "JSON_TYPE_ENUM_NO"],
    mapBoolEnumField: {
      true: "JSON_TYPE_ENUM_YES",
    },
  };
  expect(ok_ts).toBeDefined();
  const ok_js: json_types_js_json.JsonTypesMessageJson = {
    booleanFieldWithCustomName: true,
    Foo123_bar$: true,
    "foo@": true,
    "foo-bar": true,
    "1foo": true,
    "foo bar": true,
    "foo\tbar": true,
    你好: true,
    "foo\nbar\\n": true,
    doubleField: "Infinity",
    bytesField: "aGVsbG8gd29ybGQ=",
    int64Field: "123",
    enumField: "JSON_TYPE_ENUM_YES",
    repeatedEnumField: ["JSON_TYPE_ENUM_YES", "JSON_TYPE_ENUM_NO"],
    mapBoolEnumField: {
      true: "JSON_TYPE_ENUM_YES",
    },
  };
  expect(ok_js).toBeDefined();
});

test("ts generated code is assignable to js", () => {
  expect([
    function f(
      ts: json_types_ts_json.JsonTypesMessageJson,
      js: json_types_js_json.JsonTypesMessageJson,
    ) {
      ts = js;
      js = ts;
      return [ts, js];
    },
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
      methodKind: "unary";
      input: typeof StringValueSchema;
      output: typeof Int32ValueSchema;
    };
    serverStream: {
      methodKind: "server_streaming";
      input: typeof StringValueSchema;
      output: typeof Int32ValueSchema;
    };
    clientStream: {
      methodKind: "client_streaming";
      input: typeof StringValueSchema;
      output: typeof Int32ValueSchema;
    };
    bidi: {
      methodKind: "bidi_streaming";
      input: typeof StringValueSchema;
      output: typeof Int32ValueSchema;
    };
  };
  type Actual<T> = T extends GenService<infer Shape> ? Shape : never;
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
          if (
            "toString" in value &&
            typeof value.toString == "function" &&
            Object.prototype.hasOwnProperty.call(value, "toString")
          ) {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string -- we're not calling Object.toString
            id = value.toString() + "@" + seen.size;
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

describe("GenMessage.field", () => {
  test("is type safe", () => {
    proto3_ts.Proto3MessageSchema.field.optionalStringField;
    // @ts-expect-error TS2339: Property foo does not exist on type
    proto3_ts.Proto3MessageSchema.field.foo;
  });
});

describe("GenDescEnum.value", () => {
  test("is type safe", () => {
    const val = proto3_ts.Proto3EnumSchema.value[proto3_ts.Proto3Enum.YES];
    expect(val.number).toBe(1);
    expect(val.name).toBe("PROTO3_ENUM_YES");
    expect(val.localName).toBe("YES");
    // @ts-expect-error TS7053: Element implicitly has an any type because expression of type 77 can't be used to index type Record<Proto3Enum, DescEnumValue>
    proto3_ts.Proto3EnumSchema.value[77];
  });
});
