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

import {
  getComments,
  getDeclarationString,
  // getDeclarationString,
  getPackageComments,
  getSyntaxComments,
} from "@bufbuild/protoplugin/next";
import { describe, expect, test } from "@jest/globals";
import { readFileSync } from "node:fs";
import { UpstreamProtobuf } from "upstream-protobuf";
import { createDescFileSet } from "@bufbuild/protobuf/next/reflect";
import { FileDescriptorSet, proto3 } from "@bufbuild/protobuf";
import {
  JsonNamesMessage,
  MapsMessage,
  MessageWithComments,
  RepeatedScalarValuesMessage,
  SimpleEnum,
} from "../gen/source_code_info_pb.js";

describe("getComments()", () => {
  test("for syntax", async () => {
    const set = await getDescFileSet();
    const file = set.getMessage(MessageWithComments.typeName)?.file;
    const comments = file ? getSyntaxComments(file) : undefined;
    expect(comments).toBeDefined();
    if (comments) {
      expect(comments.leadingDetached[0]).toMatch(
        / Copyright .* Buf Technologies/,
      );
      expect(comments.leading).toBe(" Comment before syntax.\n");
      expect(comments.trailing).toBe(" Comment next to syntax.\n");
    }
  });
  test("for package", async () => {
    const set = await getDescFileSet();
    const file = set.getMessage(MessageWithComments.typeName)?.file;
    const comments = file ? getPackageComments(file) : undefined;
    expect(comments).toBeDefined();
    if (comments) {
      expect(comments.leadingDetached[0]).toBe(" Comment after syntax.\n");
      expect(comments.leading).toBe(" Comment before package.\n");
      expect(comments.trailing).toBe(" Comment next to package.\n");
    }
  });
  test("for messages", async () => {
    const set = await getDescFileSet();
    const message = set.getMessage(MessageWithComments.typeName);
    const comments = message ? getComments(message) : undefined;
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
  test("for fields", async () => {
    const set = await getDescFileSet();
    const field = set
      .getMessage(MessageWithComments.typeName)
      ?.fields.find((field) => field.name === "foo");
    const comments = field ? getComments(field) : undefined;
    expect(comments).toBeDefined();
    if (comments) {
      expect(comments.leadingDetached).toStrictEqual([
        "\n Comment after start of message,\n with funny indentation,\n and empty lines on start and end.\n\n",
      ]);
      expect(comments.leading).toBe(
        " Comment before field with 5 lines:\n line 2, next is empty\n\n line 4, next is empty\n\n",
      );
      expect(comments.trailing).toBe(" Comment next to field.\n");
    }
  });
});

describe("getDeclarationString()", () => {
  test("for field with options", async () => {
    const set = await getDescFileSet();
    const message = set.getMessage(JsonNamesMessage.typeName);
    expect(message).toBeDefined();
    if (message !== undefined) {
      const field = message.fields.find((f) => f.number === 1);
      expect(field ? getDeclarationString(field) : undefined).toBe(
        'string scalar_field = 1 [json_name = "scalarFieldJsonName"]',
      );
    }
  });
  test("for field with labels", async () => {
    const set = await getDescFileSet();
    const message = set.getMessage(RepeatedScalarValuesMessage.typeName);
    expect(message).toBeDefined();
    if (message !== undefined) {
      const field = message.fields.find((f) => f.number === 1);
      expect(field ? getDeclarationString(field) : undefined).toBe(
        "repeated double double_field = 1",
      );
    }
  });
  test("for map field", async () => {
    const set = await getDescFileSet();
    const message = set.getMessage(MapsMessage.typeName);
    const field = message?.fields.find((f) => f.name === "int32_msg_field");
    const got = field ? getDeclarationString(field) : undefined;
    expect(got).toBe(
      "map<int32, testcomments.MapsMessage> int32_msg_field = 10",
    );
  });
  test("for enum value", async () => {
    const set = await getDescFileSet();
    const e = set.getEnum(proto3.getEnumType(SimpleEnum).typeName);
    const v = e?.values.find((v) => v.name === "SIMPLE_ZERO");
    const got = v ? getDeclarationString(v) : undefined;
    expect(got).toBe("SIMPLE_ZERO = 0");
  });
});

async function getDescFileSet() {
  const upstream = new UpstreamProtobuf();
  const setBin = await upstream.compileToDescriptorSet(
    readFileSync("proto/source_code_info.proto", "utf-8"),
    {
      includeSourceInfo: true,
    },
  );
  return createDescFileSet(FileDescriptorSet.fromBinary(setBin));
}
