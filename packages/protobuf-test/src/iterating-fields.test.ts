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

import { describe, expect, test } from "@jest/globals";
import type { AnyMessage } from "@bufbuild/protobuf";
import { User } from "./gen/ts/extra/example_pb.js";

/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions */

describe("iterating fields", function () {
  test("works as expected", function () {
    const r = walkFields(
      new User({
        firstName: "John",
        lastName: "Smith",
        active: true,
        manager: {
          firstName: "Jane",
          lastName: "Jones",
        },
        locations: ["PIT", "GER"],
        projects: {
          PES: "Protobuf-ES",
          CES: "Connect-ES",
        },
      }),
    );
    expect(r.length).toBe(6);
    expect(r[0]).toBe("field firstName: John");
    expect(r[1]).toBe("field lastName: Smith");
    expect(r[2]).toBe("field active: true");
    expect(r[3]).toBe(
      'field manager: {"firstName":"Jane","lastName":"Jones","active":false,"locations":[],"projects":{}}',
    );
    expect(r[4]).toBe("field locations: PIT,GER");
    expect(r[5]).toBe(
      'field projects: {"PES":"Protobuf-ES","CES":"Connect-ES"}',
    );
  });
});

function walkFields(message: AnyMessage): string[] {
  const r: string[] = [];
  for (const fieldInfo of message.getType().fields.byNumber()) {
    let value = message[fieldInfo.localName];
    if (fieldInfo.kind === "message" || fieldInfo.kind === "map") {
      value = JSON.stringify(value);
    }
    r.push(`field ${fieldInfo.localName}: ${value}`);
  }
  return r;
}
