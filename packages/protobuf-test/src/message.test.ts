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
import { Timestamp as TS_Timestamp } from "./gen/ts/google/protobuf/timestamp_pb";

describe("PlainMessage", () => {
  test("removes wkt functions", () => {
    const plainTimestamp: PlainMessage<TS_Timestamp> = TS_Timestamp.now();
    // We want to test that the type system sees this function as undefined even though it's still actually there.
    // @ts-expect-error TS2334
    expect(plainTimestamp.toDate).toBeDefined();
  });
});
