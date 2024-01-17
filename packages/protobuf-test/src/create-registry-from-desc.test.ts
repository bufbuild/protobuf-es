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
import { readFileSync } from "fs";
import {
  createDescriptorSet,
  createRegistry,
  createRegistryFromDescriptors,
  FileDescriptorSet,
  MethodKind,
  proto3,
} from "@bufbuild/protobuf";
import type {
  IExtensionRegistry,
  IMessageTypeRegistry,
} from "@bufbuild/protobuf";
import {
  TestAllTypes,
  TestAllTypes_NestedEnum,
} from "./gen/ts/google/protobuf/unittest_proto3_pb.js";
import {
  assertEnumTypeEquals,
  assertExtensionEquals,
  assertMessageTypeEquals,
} from "./helpers.js";
import {
  ExampleRequest,
  ExampleResponse,
} from "./gen/ts/extra/service-example_pb.js";
import {
  Proto2Extendee,
  string_ext,
  uint32_ext,
} from "./gen/ts/extra/extensions-proto2_pb";

const fdsBytes = readFileSync("./descriptorset.bin");
const fds = FileDescriptorSet.fromBinary(fdsBytes);

describe("createRegistryFromDescriptors()", () => {
  test("finds nothing if empty", () => {
    const dr = createRegistryFromDescriptors(createDescriptorSet([]));
    expect(dr.findMessage("foo.Foo")).toBeUndefined();
    expect(dr.findEnum("foo.Foo")).toBeUndefined();
    expect(dr.findService("foo.Foo")).toBeUndefined();
    expect(dr.findExtension("foo.bar_ext")).toBeUndefined();
    expect(dr.findExtensionFor("foo.Bar", 123)).toBeUndefined();
  });
  test("from google.protobuf.FileDescriptorSet", () => {
    const dr = createRegistryFromDescriptors(fds);
    expectMessageTypes(dr);
    expectEnumTypes(dr);
    expectServiceTypes(dr);
    expectExtensions(dr);
  });
  test("from serialized google.protobuf.FileDescriptorSet", () => {
    const dr = createRegistryFromDescriptors(fdsBytes);
    expectMessageTypes(dr);
    expectEnumTypes(dr);
    expectServiceTypes(dr);
    expectExtensions(dr);
  });
});

function expectExtensions(registry: IExtensionRegistry) {
  const extByExtendee = registry.findExtensionFor(
    Proto2Extendee.typeName,
    uint32_ext.field.no,
  );
  expect(extByExtendee).toBeDefined();
  if (extByExtendee) {
    assertExtensionEquals(extByExtendee, uint32_ext);
  }
  const extByName = registry.findExtension(string_ext.typeName);
  expect(extByName).toBeDefined();
  if (extByName) {
    assertExtensionEquals(extByName, string_ext);
  }
}

function expectMessageTypes(registry: IMessageTypeRegistry) {
  const mt = registry.findMessage(TestAllTypes.typeName);
  expect(mt).toBeDefined();
  if (mt) {
    assertMessageTypeEquals(mt, TestAllTypes);
  }
}

function expectEnumTypes(registry: ReturnType<typeof createRegistry>) {
  const { typeName } = proto3.getEnumType(TestAllTypes_NestedEnum);
  const enumType = registry.findEnum(typeName);
  expect(enumType).toBeDefined();
  if (enumType) {
    assertEnumTypeEquals(enumType, proto3.getEnumType(TestAllTypes_NestedEnum));
  }
}

function expectServiceTypes(registry: ReturnType<typeof createRegistry>) {
  const st = registry.findService("spec.ExampleService");
  expect(st).toBeDefined();
  expect(Object.keys(st?.methods ?? {})).toStrictEqual([
    "unary",
    "serverStream",
    "clientStream",
    "bidi",
  ]);
  for (const m of Object.values(st?.methods ?? {})) {
    assertMessageTypeEquals(m.I, ExampleRequest);
    assertMessageTypeEquals(m.O, ExampleResponse);
    switch (m.name) {
      case "Unary":
        expect(m.kind).toBe(MethodKind.Unary);
        break;
      case "ServerStream":
        expect(m.kind).toBe(MethodKind.ServerStreaming);
        break;
      case "ClientStream":
        expect(m.kind).toBe(MethodKind.ClientStreaming);
        break;
      case "Bidi":
        expect(m.kind).toBe(MethodKind.BiDiStreaming);
        break;
    }
  }
}
