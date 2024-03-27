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
import { UserDesc as JS_UserDesc } from "../gen/js/extra/example_pbv2.js";
import { UserDesc as TS_UserDesc } from "../gen/ts/extra/example_pbv2.js";
import { create, isMessage } from "@bufbuild/protobuf/next";
import { describeGenerated } from "./helpers.js";
import { MessageFieldMessageDesc } from "../gen/ts/extra/msg-message_pbv2.js";

describe("isMessage", () => {
  describeGenerated(TS_UserDesc, JS_UserDesc, (desc) => {
    test("narrows down to anonymous message", () => {
      const unknown = create(desc) as unknown;
      expect(isMessage(unknown)).toBe(true);
      if (isMessage(unknown)) {
        expect(unknown.$typeName).toBe("docs.User");
      }
    });
    test("narrows down to specific message", () => {
      const unknown = create(desc) as unknown;
      expect(isMessage(unknown, desc)).toBe(true);
      if (isMessage(unknown, desc)) {
        expect(unknown.$typeName).toBe("docs.User");
        unknown.firstName = "Homer"; // proves that the type is known
      }
      expect(isMessage(unknown, TS_UserDesc)).toBe(true);
      expect(isMessage(unknown, JS_UserDesc)).toBe(true);
    });
  });
  test("rejects foreign message", () => {
    const user = create(TS_UserDesc);
    expect(isMessage(user, MessageFieldMessageDesc)).toBe(false);
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
        TS_UserDesc,
      ),
    ).toBe(true);
  });
});
