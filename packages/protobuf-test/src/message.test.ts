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
import { Timestamp } from "@bufbuild/protobuf";

import {
  TestAllTypesProto3,
  // TestAllTypesProto3_NestedEnum,
} from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";

describe("PlainMessage", () => {
  test("keeps regular fields", () => {
    const msg = new TestAllTypesProto3({
      optionalTimestamp: Timestamp.now(),
    });
    // const t: PlainMessage<TestAllTypesProto3> = {
    //   optionalInt32: 0,
    //   // ...
    //   optionalNestedMessage: {
    //     a: 123,
    //   },
    //   repeatedBoolWrapper: [{ value: true }],
    //   optionalBool: false,
    //   optionalString: "",
    //   optionalBytes: new Uint8Array(0),
    //   optionalNestedEnum: TestAllTypesProto3_NestedEnum.FOO,
    //   optionalAny: {
    //     value: new Uint8Array(0),
    //     typeUrl: "",
    //   },
    //   // ...
    // };
    //

    const plain: PlainMessage<TestAllTypesProto3> = msg;

    expect(msg).toBeDefined();
    expect(plain).toBeDefined();
    // We want to test that the type system sees this function as undefined even though it's still actually there.  So
    // we expect TS error  TS2339, but add a simple test so Jest doesn't complain there's no expectations.
    // @ts-expect-error TS2339
    expect(plain.toBinary).toBeDefined();
    // Custom methods of well-known types are removed as well.
    // @ts-expect-error TS2339
    expect(plain.optionalTimestamp.toDate).toBeDefined();
  });
});
