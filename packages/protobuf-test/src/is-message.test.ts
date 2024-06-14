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
import { UserSchema } from "./gen/ts/extra/example_pb.js";
import { create, isMessage } from "@bufbuild/protobuf";
import { MessageFieldMessageSchema } from "./gen/ts/extra/msg-message_pb.js";

describe("isMessage", () => {
  test("narrows down to anonymous message", () => {
    const unknown = create(UserSchema) as unknown;
    expect(isMessage(unknown)).toBe(true);
    if (isMessage(unknown)) {
      expect(unknown.$typeName).toBe("docs.User");
    }
  });
  test("narrows down to specific message", () => {
    const unknown = create(UserSchema) as unknown;
    expect(isMessage(unknown, UserSchema)).toBe(true);
    if (isMessage(unknown, UserSchema)) {
      expect(unknown.$typeName).toBe("docs.User");
      unknown.firstName = "Homer"; // proves that the type is known
    }
    expect(isMessage(unknown, UserSchema)).toBe(true);
    expect(isMessage(unknown, UserSchema)).toBe(true);
  });
});
test("rejects foreign message", () => {
  const user = create(UserSchema);
  expect(isMessage(user, MessageFieldMessageSchema)).toBe(false);
});
test("rejects non-message values", () => {
  expect(isMessage(null)).toBe(false);
  expect(isMessage(undefined)).toBe(false);
  expect(isMessage(123)).toBe(false);
  expect(isMessage("str")).toBe(false);
  expect(isMessage({})).toBe(false);
});
test("falsely returns true if the argument is close enough to a Message", () => {
  expect(
    isMessage({
      $typeName: "",
    }),
  ).toBe(true);
  expect(
    isMessage(
      {
        $typeName: "docs.User",
      },
      UserSchema,
    ),
  ).toBe(true);
});
