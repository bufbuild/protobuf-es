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
import { TestAllTypesProto3 } from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import type { JsonValue } from "@bufbuild/protobuf";

// Coverage for JSON parse errors to guard against regressions.
// We do not cover all cases here. Map fields and oneofs are incomplete,
// and bytes, string, and other scalar types are not tested.
describe("JSON parse errors", () => {
  test("unknown field", () => {
    expectJsonParseError(
      { notAKnownField: "abc" },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: key "notAKnownField" is unknown`,
    );
  });

  test("singular scalar", () => {
    expectJsonParseError(
      { optionalInt32: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: "abc": invalid int 32: NaN`,
    );
    expectJsonParseError(
      { optionalInt32: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: true`,
    );
    expectJsonParseError(
      { optionalInt32: {} },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: object`,
    );
    expectJsonParseError(
      { optionalInt32: [] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: array`,
    );
  });

  test("repeated scalar", () => {
    expectJsonParseError(
      { repeatedInt32: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: "abc"`,
    );
    expectJsonParseError(
      { repeatedInt32: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: 123`,
    );
    expectJsonParseError(
      { repeatedInt32: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: true`,
    );
    expectJsonParseError(
      { repeatedInt32: { x: 1 } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: object`,
    );
    expectJsonParseError(
      { repeatedInt32: [1, null] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: null`,
    );
    expectJsonParseError(
      { repeatedInt32: ["abc"] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: "abc": invalid int 32: NaN`,
    );
    expectJsonParseError(
      { repeatedInt32: [true] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: true`,
    );
    expectJsonParseError(
      { repeatedInt32: [{}] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: object`,
    );
    expectJsonParseError(
      { repeatedInt32: [[]] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_int32 from JSON: array`,
    );
  });

  test("singular enum", () => {
    expectJsonParseError(
      { optionalForeignEnum: true },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: true`,
    );
    expectJsonParseError(
      { optionalForeignEnum: "abc" },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: "abc"`,
    );
    expectJsonParseError(
      { optionalForeignEnum: {} },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: object`,
    );
    expectJsonParseError(
      { optionalForeignEnum: [] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: array`,
    );
  });

  test("repeated enum", () => {
    expectJsonParseError(
      { repeatedForeignEnum: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: "abc"`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: 123`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: true`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: {} },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: object`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [1, null] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_foreign_enum from JSON: null`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [true] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: true`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: ["abc"] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: "abc"`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [{}] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: object`,
    );
    expectJsonParseError(
      { repeatedForeignEnum: [[]] },
      `cannot decode enum protobuf_test_messages.proto3.ForeignEnum from JSON: array`,
    );
  });

  test("singular message", () => {
    expectJsonParseError(
      { recursiveMessage: "abc" },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: "abc"`,
    );
    expectJsonParseError(
      { recursiveMessage: [] },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: array`,
    );
    expectJsonParseError(
      { recursiveMessage: true },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: true`,
    );
    expectJsonParseError(
      { recursiveMessage: 123 },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: 123`,
    );
    expectJsonParseError(
      { recursiveMessage: { optionalInt32: "abc" } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: "abc": invalid int 32: NaN`,
    );
  });

  test("repeated message", () => {
    expectJsonParseError(
      { repeatedNestedMessage: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: "abc"`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: 123`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: [null] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: null`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: {} },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.repeated_nested_message from JSON: object`,
    );
    expectJsonParseError(
      { repeatedNestedMessage: [{ corecursive: { optionalInt32: "abc" } }] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.optional_int32 from JSON: "abc": invalid int 32: NaN`,
    );
  });

  test("map scalar", () => {
    expectJsonParseError(
      { mapInt32Int32: "abc" },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: "abc"`,
    );
    expectJsonParseError(
      { mapInt32Int32: [] },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: array`,
    );
    expectJsonParseError(
      { mapInt32Int32: 123 },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: 123`,
    );
    expectJsonParseError(
      { mapInt32Int32: true },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: true`,
    );
    expectJsonParseError(
      { mapInt32Int32: { 123: null } },
      `cannot decode field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: map value null`,
    );
    expectJsonParseError(
      { mapInt32Int32: { "not-an-int32": 123 } },
      `cannot decode map key for field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: object: invalid int 32: NaN`,
    );
    expectJsonParseError(
      { mapInt32Int32: { 123: "not-an-int32" } },
      `cannot decode map value for field protobuf_test_messages.proto3.TestAllTypesProto3.map_int32_int32 from JSON: object: invalid int 32: NaN`,
    );
  });

  test("oneof", () => {
    expectJsonParseError(
      { oneofUint32: 1, oneofString: "a" },
      `cannot decode message protobuf_test_messages.proto3.TestAllTypesProto3 from JSON: multiple keys for oneof "oneof_field" present: "oneofUint32", "oneofString"`,
    );
  });

  function expectJsonParseError(input: JsonValue, errorMessage: string): void {
    let gotErrorMessage: unknown;
    try {
      TestAllTypesProto3.fromJson(input);
    } catch (e) {
      gotErrorMessage = e instanceof Error ? e.message : e;
    }
    expect(gotErrorMessage).toBe(errorMessage);
  }
});
