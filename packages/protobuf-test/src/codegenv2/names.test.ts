// Copyright 2021-2026 Buf Technologies, Inc.
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
import { create } from "@bufbuild/protobuf";
import { assertValidNames } from "@bufbuild/protobuf/codegenv2";
import {
  type FileDescriptorProto,
  FileDescriptorProtoSchema,
} from "@bufbuild/protobuf/wkt";

void suite("assertValidNames()", () => {
  function createFile(): FileDescriptorProto {
    return create(FileDescriptorProtoSchema, {
      name: "x.proto",
      messageType: [
        {
          name: "Msg",
          field: [{ name: "field" }],
          oneofDecl: [{ name: "kind" }],
          extension: [{ name: "nested_ext" }],
          nestedType: [{ name: "Nested" }],
          enumType: [{ name: "NestedEnum", value: [{ name: "NESTED_ZERO" }] }],
        },
      ],
      enumType: [{ name: "Enum", value: [{ name: "ZERO" }] }],
      extension: [{ name: "ext" }],
      service: [{ name: "Svc", method: [{ name: "Method" }] }],
    });
  }

  void test("accepts a file with valid names", () => {
    assert.doesNotThrow(() => assertValidNames(createFile()));
  });

  const kinds: [
    label: string,
    kind: string,
    target: (file: FileDescriptorProto) => { name: string },
  ][] = [
    ["message", "message", (f) => f.messageType[0]],
    ["nested message", "message", (f) => f.messageType[0].nestedType[0]],
    ["field", "field", (f) => f.messageType[0].field[0]],
    ["oneof", "oneof", (f) => f.messageType[0].oneofDecl[0]],
    ["enum", "enum", (f) => f.enumType[0]],
    ["nested enum", "enum", (f) => f.messageType[0].enumType[0]],
    ["enum value", "enum value", (f) => f.enumType[0].value[0]],
    [
      "nested enum value",
      "enum value",
      (f) => f.messageType[0].enumType[0].value[0],
    ],
    ["extension", "extension", (f) => f.extension[0]],
    ["nested extension", "extension", (f) => f.messageType[0].extension[0]],
    ["service", "service", (f) => f.service[0]],
    ["method", "method", (f) => f.service[0].method[0]],
  ];
  for (const [label, kind, target] of kinds) {
    void test(`rejects an invalid ${label} name`, () => {
      const file = createFile();
      target(file).name = "a.b";
      assert.throws(() => assertValidNames(file), {
        message: `x.proto: invalid ${kind} name "a.b"`,
      });
    });
  }

  // A leading digit is not a JS identifier, but protoc accepts it in a
  // descriptor, so rejecting it is left to code generation.
  for (const name of ["Msg", "_Msg", "_", "x_1", "1Msg", "123"]) {
    void test(`accepts ${JSON.stringify(name)}`, () => {
      const file = createFile();
      file.messageType[0].name = name;
      assert.doesNotThrow(() => assertValidNames(file));
    });
  }

  for (const name of [
    "",
    "a b",
    "a-b",
    "a$",
    "é",
    // With the i and u flags, \w also matches these.
    "\u017F",
    "\u212A",
    "a\n",
    "\na",
    `X = 1; globalThis["injected"] = 1; export const Y`,
  ]) {
    void test(`rejects ${JSON.stringify(name)}`, () => {
      const file = createFile();
      file.messageType[0].name = name;
      assert.throws(() => assertValidNames(file), {
        message: `x.proto: invalid message name ${JSON.stringify(name)}`,
      });
    });
  }
});
