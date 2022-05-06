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
  DescriptorRegistry,
  DescriptorSet,
  FileDescriptorSet,
} from "@bufbuild/protobuf";
import { TestAllTypes } from "./gen/ts/google/protobuf/unittest_proto3_pb.js";
import { assertMessageTypeEquals } from "./helpers.js";

const fdsBytes = readFileSync("./descriptorset.bin");
const fds = FileDescriptorSet.fromBinary(fdsBytes);

describe("DescriptorSet", () => {
  test("add() does not crash", () => {
    const ds = new DescriptorSet();
    expect(ds.enums).toStrictEqual({});
    expect(ds.messages).toStrictEqual({});
    expect(ds.services).toStrictEqual({});
    ds.add(...fds.file);
  });
});

describe("DescriptorRegistry", () => {
  test("finds nothing if empty", () => {
    const dr = new DescriptorRegistry();
    expect(dr.findMessage("foo.Foo")).toBeUndefined();
    expect(dr.findEnum("foo.Foo")).toBeUndefined();
  });
  test("fromDescriptorSet with instance", () => {
    const dr = DescriptorRegistry.fromFileDescriptorSet(fds);
    expect(dr.findEnum("foo.Foo")).toBeUndefined();
    const mt = dr.findMessage(TestAllTypes.typeName);
    expect(mt).toBeDefined();
    if (mt) {
      assertMessageTypeEquals(mt, TestAllTypes);
    }
  });
  test("fromDescriptorSet with bytes", () => {
    const dr = DescriptorRegistry.fromFileDescriptorSet(fdsBytes);
    expect(dr.findEnum("foo.Foo")).toBeUndefined();
    const mt = dr.findMessage(TestAllTypes.typeName);
    expect(mt).toBeDefined();
    if (mt) {
      assertMessageTypeEquals(mt, TestAllTypes);
    }
  });
});
