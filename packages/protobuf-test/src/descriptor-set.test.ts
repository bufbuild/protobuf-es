// Copyright 2021-2022 Buf Technologies, Inc.
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

import { readFileSync } from "fs";
import { createDescriptorSet, proto3, ScalarType } from "@bufbuild/protobuf";
import { JsonNamesMessage } from "./gen/ts/extra/msg-json-names_pb.js";
import { MapsMessage } from "./gen/ts/extra/msg-maps_pb.js";
import { RepeatedScalarValuesMessage } from "./gen/ts/extra/msg-scalar_pb.js";
import { MessageWithComments } from "./gen/ts/extra/comments_pb.js";
import { SimpleEnum } from "./gen/ts/extra/enum_pb.js";
import {
  TestAllExtensions,
  TestNestedExtension,
} from "./gen/ts/google/protobuf/unittest_pb.js";

const fdsBytes = readFileSync("./descriptorset.bin");

describe("DescriptorSet", () => {
  const set = createDescriptorSet(fdsBytes);
  test("knows extension", () => {
    const ext = set.extensions.get(
      "protobuf_unittest.optional_int32_extension"
    );
    expect(ext).toBeDefined();
    expect(ext?.name).toBe("optional_int32_extension");
    expect(ext?.typeName).toBe("protobuf_unittest.optional_int32_extension");
    expect(ext?.extendee.typeName).toBe(TestAllExtensions.typeName);
    expect(ext?.optional).toBe(true);
    expect(ext?.kind).toBe("extension");
    expect(ext?.fieldKind).toBe("scalar");
    expect(ext?.scalar).toBe(ScalarType.INT32);
    expect(ext?.toString()).toBe(
      "extension protobuf_unittest.optional_int32_extension"
    );
    expect(ext?.declarationString()).toBe(
      "optional int32 optional_int32_extension = 1"
    );
  });
  test("knows nested extension", () => {
    const ext = set.extensions.get(
      "protobuf_unittest.TestNestedExtension.nested_string_extension"
    );
    expect(ext).toBeDefined();
    expect(ext?.name).toBe("nested_string_extension");
    expect(ext?.typeName).toBe(
      "protobuf_unittest.TestNestedExtension.nested_string_extension"
    );
    expect(ext?.extendee.typeName).toBe(TestAllExtensions.typeName);
    expect(ext?.scalar).toBe(ScalarType.STRING);
    expect(ext?.toString()).toBe(
      "extension protobuf_unittest.TestNestedExtension.nested_string_extension"
    );
    expect(ext?.declarationString()).toBe(
      "optional string nested_string_extension = 1003"
    );
    const ext2 = set.messages
      .get(TestNestedExtension.typeName)
      ?.nestedExtensions.find((ext) => ext.name === "nested_string_extension");
    expect(ext2).toBe(ext);
  });
  describe("declarationString()", () => {
    test("for field with options", () => {
      const message = set.messages.get(JsonNamesMessage.typeName);
      expect(message).toBeDefined();
      if (message !== undefined) {
        const field = message.fields.find((f) => f.number === 1);
        expect(field?.declarationString()).toBe(
          'string scalar_field = 1 [json_name = "scalarFieldJsonName"]'
        );
      }
    });
    test("for field with labels", () => {
      const message = set.messages.get(RepeatedScalarValuesMessage.typeName);
      expect(message).toBeDefined();
      if (message !== undefined) {
        const field = message.fields.find((f) => f.number === 1);
        expect(field?.declarationString()).toBe(
          "repeated double double_field = 1"
        );
      }
    });
    test("for map field", () => {
      const message = set.messages.get(MapsMessage.typeName);
      const got = message?.fields
        .find((f) => f.name === "int32_msg_field")
        ?.declarationString();
      expect(got).toBe("map<int32, spec.MapsMessage> int32_msg_field = 10");
    });
    test("for enum value", () => {
      const e = set.enums.get(proto3.getEnumType(SimpleEnum).typeName);
      const got = e?.values
        .find((v) => v.name === "SIMPLE_ZERO")
        ?.declarationString();
      expect(got).toBe("SIMPLE_ZERO = 0");
    });
  });
  describe("getComments()", () => {
    describe("for file", () => {
      const file = set.files.find((file) =>
        file.messages.some(
          (message) => message.typeName === MessageWithComments.typeName
        )
      );
      test("syntax", () => {
        const comments = file?.getSyntaxComments();
        expect(comments).toBeDefined();
        if (comments) {
          expect(comments.leadingDetached[0]).toMatch(
            / Copyright .* Buf Technologies/
          );
          expect(comments.leading).toBe(" Comment before syntax.\n");
          expect(comments.trailing).toBe(" Comment next to syntax.\n");
        }
      });
      test("package", () => {
        const comments = file?.getPackageComments();
        expect(comments).toBeDefined();
        if (comments) {
          expect(comments.leadingDetached[0]).toBe(" Comment after syntax.\n");
          expect(comments.leading).toBe(" Comment before package.\n");
          expect(comments.trailing).toBe(" Comment next to package.\n");
        }
      });
    });
  });
  describe("for message", () => {
    const message = set.messages.get(MessageWithComments.typeName);
    test("itself", () => {
      const comments = message?.getComments();
      expect(comments).toBeDefined();
      if (comments) {
        expect(comments.leadingDetached).toStrictEqual([
          " Comment after package.\n",
          " Comment between package and message.\n",
        ]);
        expect(comments.leading).toBe(" Comment before message.\n");
        expect(comments.trailing).toBeUndefined();
      }
    });
    test("field", () => {
      const comments = message?.fields
        .find((field) => field.name === "foo")
        ?.getComments();
      expect(comments).toBeDefined();
      if (comments) {
        expect(comments.leadingDetached).toStrictEqual([
          "\n Comment after start of message,\n with funny indentation,\n and empty lines on start and end.\n\n",
        ]);
        expect(comments.leading).toBe(
          " Comment before field with 5 lines:\n line 2, next is empty\n\n line 4, next is empty\n\n"
        );
        expect(comments.trailing).toBe(" Comment next to field.\n");
      }
    });
  });
});
