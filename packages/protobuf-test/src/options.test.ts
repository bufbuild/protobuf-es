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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import {
  type AnyDesc,
  type DescExtension,
  getOption,
  hasOption,
} from "@bufbuild/protobuf";
import {
  enum_option_retention_runtime,
  enum_option_retention_unknown,
  enum_value_option_retention_runtime,
  enum_value_option_retention_unknown,
  field_option_retention_runtime,
  field_option_retention_unknown,
  file_option_retention_runtime,
  file_option_retention_unknown,
  message_option_retention_runtime,
  message_option_retention_unknown,
  method_option_retention_runtime,
  method_option_retention_unknown,
  oneof_option_retention_runtime,
  oneof_option_retention_unknown,
  service_option_retention_runtime,
  service_option_retention_unknown,
} from "./gen/ts/extra/options_pb.js";
import {
  EnumWithOptionsSchema,
  file_extra_option_usage,
  MessageWithOptionsSchema,
  ServiceWithOptions,
} from "./gen/ts/extra/option-usage_pb.js";
import { Proto3MessageSchema } from "./gen/ts/extra/proto3_pb.js";

void suite("hasOption()", () => {
  void test("supports anonymous descriptor and extension", () => {
    const file: AnyDesc = file_extra_option_usage;
    const ext: DescExtension = file_option_retention_runtime;
    const has = hasOption(file, ext);
    assert.ok(has);
  });
  void test("returns false if extendee does not match", () => {
    const file = file_extra_option_usage;
    const ext = oneof_option_retention_runtime;
    // @ts-expect-error TS2345
    const has = hasOption(file, ext);
    assert.strictEqual(has, false);
  });
  void test("returns false if descriptor has no options", () => {
    assert.strictEqual(Proto3MessageSchema.proto.options, undefined);
    const has = hasOption(
      Proto3MessageSchema,
      message_option_retention_runtime,
    );
    assert.strictEqual(has, false);
  });
});

void suite("getOption()", () => {
  void test("supports anonymous descriptor and extension", () => {
    const file: AnyDesc = file_extra_option_usage;
    const ext: DescExtension = file_option_retention_runtime;
    const val = getOption(file, ext);
    assert.strictEqual(val, "file option retention runtime");
  });
  void test("returns zero value if descriptor has no options", () => {
    const field = Proto3MessageSchema.fields[0];
    assert.strictEqual(field.proto.options, undefined);
    const val = getOption(field, field_option_retention_runtime);
    assert.strictEqual(val, "");
  });
  void test("returns option", () => {
    const file = file_extra_option_usage;
    assert.strictEqual(
      getOption(file, file_option_retention_unknown),
      "file option retention unknown",
    );
    assert.strictEqual(
      getOption(file, file_option_retention_runtime),
      "file option retention runtime",
    );

    const message = MessageWithOptionsSchema;
    assert.strictEqual(
      getOption(message, message_option_retention_unknown),
      "message option retention unknown",
    );
    assert.strictEqual(
      getOption(message, message_option_retention_runtime),
      "message option retention runtime",
    );

    const field = MessageWithOptionsSchema.fields[0];
    assert.strictEqual(
      getOption(field, field_option_retention_unknown),
      "field option retention unknown",
    );
    assert.strictEqual(
      getOption(field, field_option_retention_runtime),
      "field option retention runtime",
    );

    const oneof = MessageWithOptionsSchema.oneofs[0];
    assert.strictEqual(
      getOption(oneof, oneof_option_retention_unknown),
      "oneof option retention unknown",
    );
    assert.strictEqual(
      getOption(oneof, oneof_option_retention_runtime),
      "oneof option retention runtime",
    );

    const enumeration = EnumWithOptionsSchema;
    assert.strictEqual(
      getOption(enumeration, enum_option_retention_unknown),
      "enum option retention unknown",
    );
    assert.strictEqual(
      getOption(enumeration, enum_option_retention_runtime),
      "enum option retention runtime",
    );

    const enumValue = EnumWithOptionsSchema.values[0];
    assert.strictEqual(
      getOption(enumValue, enum_value_option_retention_unknown),
      "enum value option retention unknown",
    );
    assert.strictEqual(
      getOption(enumValue, enum_value_option_retention_runtime),
      "enum value option retention runtime",
    );

    const service = ServiceWithOptions;
    assert.strictEqual(
      getOption(service, service_option_retention_unknown),
      "service option retention unknown",
    );
    assert.strictEqual(
      getOption(service, service_option_retention_runtime),
      "service option retention runtime",
    );

    const method = ServiceWithOptions.methods[0];
    assert.strictEqual(
      getOption(method, method_option_retention_unknown),
      "method option retention unknown",
    );
    assert.strictEqual(
      getOption(method, method_option_retention_runtime),
      "method option retention runtime",
    );
  });
});
