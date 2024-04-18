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

import { describe, expect, it } from "@jest/globals";
import { BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import { UserDesc } from "../gen/ts/extra/example_pb.js";
import { fromBinary } from "@bufbuild/protobuf";

describe("BinaryWriter example", () => {
  it("should work as expected", () => {
    const bytes = new BinaryWriter()
      // string first_name = 1
      .tag(1, WireType.LengthDelimited)
      .string("Homer")
      // bool active = 3
      .tag(3, WireType.Varint)
      .bool(true)
      .finish();
    const user = fromBinary(UserDesc, bytes);
    expect(user.firstName).toBe("Homer");
    expect(user.active).toBe(true);
  });
});
