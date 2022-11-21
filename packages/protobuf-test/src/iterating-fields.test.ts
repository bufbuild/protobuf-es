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

import type { AnyMessage } from "@bufbuild/protobuf";
import { Example } from "./gen/ts/extra/example_pb.js";

/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions */

describe("iterating fields", function () {
  test("works as expected", function () {
    const r = walkFields(
      new Example({
        foo: "abc",
        bar: true,
        baz: undefined,
      })
    );
    expect(r.length).toBe(4);
    expect(r[0]).toBe("field foo: abc");
    expect(r[1]).toBe("field bar: true");
    expect(r[2]).toBe("field baz: undefined");
  });
});

function walkFields(message: AnyMessage): string[] {
  const r: string[] = [];
  for (const fieldInfo of message.getType().fields.byNumber()) {
    const value = message[fieldInfo.localName];
    r.push(`field ${fieldInfo.localName}: ${value}`);
  }
  return r;
}
