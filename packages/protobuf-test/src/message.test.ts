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

import { PartialMessage, PlainMessage, Timestamp } from "@bufbuild/protobuf";
import { Example as TS_Example } from "./gen/ts/extra/example_pb.js";
import { Example as JS_Example } from "./gen/js/extra/example_pb.js";
import { describeMT } from "./helpers.js";

describe("PlainMessage", () => {
  const plainTimestamp: PlainMessage<Timestamp> = Timestamp.now();
  test("keeps regular fields", () => {
    // Regular fields are untouched.
    expect(plainTimestamp.nanos).toBeDefined();
  });
  test("removes standard methods and wkt methods from type system", () => {
    // We want to test that the type system sees this function as undefined even though it's still actually there.  So
    // we expect TS error  TS2339, but add a simple test so Jest doesn't complain there's no expectations.
    // @ts-expect-error TS2339
    expect(plainTimestamp.toBinary).toBeDefined();
    // Custom methods of well-known types are removed as well.
    // @ts-expect-error TS2339
    expect(plainTimestamp.toDate).toBeDefined();
  });
});

describe("PartialMessage", () => {
  describe("root level", () => {
    const partialTimestamp: PartialMessage<Timestamp> = Timestamp.now();
    test("keeps regular fields", () => {
      // Regular fields are untouched.
      expect(partialTimestamp.nanos).toBeDefined();
    });
    test("removes standard methods and wkt methods from type system", () => {
      // We want to test that the type system sees this function as undefined even though it's still actually there.  So
      // we expect TS error  TS2339, but add a simple test so Jest doesn't complain there's no expectations.
      // @ts-expect-error TS2339
      expect(partialTimestamp.toBinary).toBeDefined();
      // Custom methods of well-known types are removed as well.
      // @ts-expect-error TS2339
      expect(partialTimestamp.toDate).toBeDefined();
    });
  });
  describeMT({ ts: TS_Example, js: JS_Example }, (messageType) => {
    test("is recursive", () => {
      const recur: PartialMessage<TS_Example> = new messageType();
      recur.created = Timestamp.now();

      // We want to test that the type system sees this function as undefined even though it's still actually there.  So
      // we expect TS error  TS2339, but add a simple test so Jest doesn't complain there's no expectations.
      // @ts-expect-error TS2339
      expect(recur.created.toBinary).toBeDefined();
      // Custom methods of well-known types are removed as well.
      // @ts-expect-error TS2339
      expect(recur.created.toDate).toBeDefined();
    });
  });
});
