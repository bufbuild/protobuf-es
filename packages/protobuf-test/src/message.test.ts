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

import { PlainMessage, PartialMessage, Timestamp } from "@bufbuild/protobuf";
import { describeMT } from "./helpers.js";

import { TestAllTypesProto3 as TS_TestAllTypesProto3 } from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import { TestAllTypesProto3 as JS_TestAllTypesProto3 } from "./gen/js/google/protobuf/test_messages_proto3_pb.js";

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
  describeMT(
    { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
    (messageType) => {
      test("is recursive", () => {
        const msg: PlainMessage<TS_TestAllTypesProto3 | JS_TestAllTypesProto3> =
          new messageType();
        msg.optionalTimestamp = Timestamp.now();

        // We want to test that the type system sees this function as undefined even though it's still actually there.  So
        // we expect TS error  TS2339, but add a simple test so Jest doesn't complain there's no expectations.
        // @ts-expect-error TS2339
        expect(msg.optionalTimestamp.toBinary).toBeDefined();
        // Custom methods of well-known types are removed as well.
        // @ts-expect-error TS2339
        expect(msg.optionalTimestamp.toDate).toBeDefined();
      });
    }
  );
});

describe("PartialMessage", () => {
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
  describeMT(
    { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
    (messageType) => {
      test("is recursive", () => {
        const msg: PartialMessage<
          TS_TestAllTypesProto3 | JS_TestAllTypesProto3
        > = new messageType();
        msg.optionalTimestamp = Timestamp.now();

        // We want to test that the type system sees this function as undefined even though it's still actually there.  So
        // we expect TS error  TS2339, but add a simple test so Jest doesn't complain there's no expectations.
        // @ts-expect-error TS2339
        expect(msg.optionalTimestamp.toBinary).toBeDefined();
        // Custom methods of well-known types are removed as well.
        // @ts-expect-error TS2339
        expect(msg.optionalTimestamp.toDate).toBeDefined();
      });
    }
  );
});
