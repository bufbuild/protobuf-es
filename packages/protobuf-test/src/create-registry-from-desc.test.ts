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
import {
  createDescriptorSet,
  createRegistry,
  createRegistryFromDescriptors,
  FileDescriptorSet,
  MethodKind,
} from "@bufbuild/protobuf";
import { TestAllTypes } from "./gen/ts/google/protobuf/unittest_proto3_pb.js";
import { assertMessageTypeEquals } from "./helpers.js";
import {
  ExampleRequest,
  ExampleResponse,
} from "./gen/ts/extra/service-example_pb";

const fdsBytes = readFileSync("./descriptorset.bin");
const fds = FileDescriptorSet.fromBinary(fdsBytes);

describe("createRegistryFromDescriptors()", () => {
  test("finds nothing if empty", () => {
    const dr = createRegistryFromDescriptors(createDescriptorSet([]));
    expect(dr.findMessage("foo.Foo")).toBeUndefined();
    expect(dr.findEnum("foo.Foo")).toBeUndefined();
    expect(dr.findService("foo.Foo")).toBeUndefined();
  });
  test("from google.protobuf.FileDescriptorSet", () => {
    const dr = createRegistryFromDescriptors(fds);
    assertExpectedRegistry(dr);
  });
  test("from serialized google.protobuf.FileDescriptorSet", () => {
    const dr = createRegistryFromDescriptors(fdsBytes);
    assertExpectedRegistry(dr);
  });
});

function assertExpectedRegistry(
  registry: ReturnType<typeof createRegistry>
): void {
  expect(registry.findEnum("foo.Foo")).toBeUndefined();
  const mt = registry.findMessage(TestAllTypes.typeName);
  expect(mt).toBeDefined();
  if (mt) {
    assertMessageTypeEquals(mt, TestAllTypes);
  }
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
