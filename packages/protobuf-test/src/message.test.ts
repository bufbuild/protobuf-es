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

import type { PlainMessage } from "@bufbuild/protobuf";
import { Timestamp } from "./gen/ts/google/protobuf/timestamp_pb";

describe("PlainMessage", () => {
  const plainTimestamp: PlainMessage<Timestamp> = Timestamp.now();
  test("keeps regular fields", () => {
    // Regular fields are untouched.
    expect(plainTimestamp.nanos).toBeDefined();
  });
  test("removes standard methods from type system", () => {
    // Methods are removed from the type system.
    // @ts-expect-error TS2339
    const toBinary = plainTimestamp.toBinary;
    // The method property still exists.
    expect(toBinary).toBeDefined();
  });
  test("removes wkt methods from type system", () => {
    // Custom methods of well-known types are removed as well.
    // @ts-expect-error TS2339
    const toDate = plainTimestamp.toDate;
    // The method property still exists.
    expect(toDate).toBeDefined();
  });
});
