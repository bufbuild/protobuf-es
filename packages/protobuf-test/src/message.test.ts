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
import { Timestamp as JS_Timestamp } from "./gen/js/google/protobuf/timestamp_pb";
import { Timestamp as TS_Timestamp } from "./gen/ts/google/protobuf/timestamp_pb";

describe("PlainMessage", () => {
  describe("toDate", () => {
    test("JS_Timestamp", () => {
      const plainTimestamp: PlainMessage<JS_Timestamp> = JS_Timestamp.now();
      // @ts-expect-error TS2339
      plainTimestamp.toDate();
    });
    test("TS_Timestamp", () => {
      const plainTimestamp: PlainMessage<TS_Timestamp> = TS_Timestamp.now();
      // @ts-expect-error TS2339
      plainTimestamp.toDate();
    });
  });
});
