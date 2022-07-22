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
import { FileDescriptorSet, LegacyDescriptorSet } from "@bufbuild/protobuf";

const fds = FileDescriptorSet.fromBinary(readFileSync("./descriptorset.bin"));

describe("LegacyDescriptorSet", () => {
  test("add() does not crash", () => {
    const ds = new LegacyDescriptorSet();
    expect(ds.enums).toStrictEqual({});
    expect(ds.messages).toStrictEqual({});
    expect(ds.services).toStrictEqual({});
    ds.add(...fds.file);
  });
});
