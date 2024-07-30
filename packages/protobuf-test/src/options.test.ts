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

describe("hasOption()", () => {
  test("supports anonymous descriptor and extension", () => {
    const file: AnyDesc = file_extra_option_usage;
    const ext: DescExtension = file_option_retention_runtime;
    const has = hasOption(file, ext);
    expect(has).toBe(true);
  });
  test("returns false if extendee does not match", () => {
    const file = file_extra_option_usage;
    const ext = oneof_option_retention_runtime;
    // @ts-expect-error TS2345
    const has = hasOption(file, ext);
    expect(has).toBe(false);
  });
  test("returns false if descriptor has no options", () => {
    expect(Proto3MessageSchema.proto.options).toBeUndefined();
    const has = hasOption(
      Proto3MessageSchema,
      message_option_retention_runtime,
    );
    expect(has).toBe(false);
  });
});

describe("getOption()", () => {
  test("supports anonymous descriptor and extension", () => {
    const file: AnyDesc = file_extra_option_usage;
    const ext: DescExtension = file_option_retention_runtime;
    const val = getOption(file, ext);
    expect(val).toBe("file option retention runtime");
  });
  test("returns zero value if descriptor has no options", () => {
    const field = Proto3MessageSchema.fields[0];
    expect(field.proto.options).toBeUndefined();
    const val = getOption(field, field_option_retention_runtime);
    expect(val).toBe("");
  });
  test("returns option", () => {
    const file = file_extra_option_usage;
    expect(getOption(file, file_option_retention_unknown)).toBe(
      "file option retention unknown",
    );
    expect(getOption(file, file_option_retention_runtime)).toBe(
      "file option retention runtime",
    );

    const message = MessageWithOptionsSchema;
    expect(getOption(message, message_option_retention_unknown)).toBe(
      "message option retention unknown",
    );
    expect(getOption(message, message_option_retention_runtime)).toBe(
      "message option retention runtime",
    );

    const field = MessageWithOptionsSchema.fields[0];
    expect(getOption(field, field_option_retention_unknown)).toBe(
      "field option retention unknown",
    );
    expect(getOption(field, field_option_retention_runtime)).toBe(
      "field option retention runtime",
    );

    const oneof = MessageWithOptionsSchema.oneofs[0];
    expect(getOption(oneof, oneof_option_retention_unknown)).toBe(
      "oneof option retention unknown",
    );
    expect(getOption(oneof, oneof_option_retention_runtime)).toBe(
      "oneof option retention runtime",
    );

    const enumeration = EnumWithOptionsSchema;
    expect(getOption(enumeration, enum_option_retention_unknown)).toBe(
      "enum option retention unknown",
    );
    expect(getOption(enumeration, enum_option_retention_runtime)).toBe(
      "enum option retention runtime",
    );

    const enumValue = EnumWithOptionsSchema.values[0];
    expect(getOption(enumValue, enum_value_option_retention_unknown)).toBe(
      "enum value option retention unknown",
    );
    expect(getOption(enumValue, enum_value_option_retention_runtime)).toBe(
      "enum value option retention runtime",
    );

    const service = ServiceWithOptions;
    expect(getOption(service, service_option_retention_unknown)).toBe(
      "service option retention unknown",
    );
    expect(getOption(service, service_option_retention_runtime)).toBe(
      "service option retention runtime",
    );

    const method = ServiceWithOptions.methods[0];
    expect(getOption(method, method_option_retention_unknown)).toBe(
      "method option retention unknown",
    );
    expect(getOption(method, method_option_retention_runtime)).toBe(
      "method option retention runtime",
    );
  });
});
