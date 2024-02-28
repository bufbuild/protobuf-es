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
import { User as TS_User } from "./gen/ts/extra/example_pb.js";
import { User as JS_User } from "./gen/js/extra/example_pb.js";
import { isMessage, Message } from "@bufbuild/protobuf";

describe("isMessage", () => {
  test("subclass of Message", () => {
    const user = new TS_User({
      firstName: "Homer",
      lastName: "Simpson",
    });

    expect(isMessage(user)).toBeTruthy();
    expect(isMessage(user, TS_User)).toBeTruthy();
  });
  test("returns false if expected Message property is not a function", () => {
    const user = new TS_User({
      firstName: "Homer",
      lastName: "Simpson",
    });
    // @ts-ignore - Setting to a boolean to force a failure
    user.toJson = false;

    expect(isMessage(user, TS_User)).toBeFalsy();
  });
  test("null returns false", () => {
    expect(isMessage(null)).toBeFalsy();
    expect(isMessage(null, TS_User)).toBeFalsy();
  });
  test("non-object returns false", () => {
    expect(isMessage("test")).toBeFalsy();
    expect(isMessage("test", TS_User)).toBeFalsy();
  });
  test("mixed instances", () => {
    const user = new TS_User({
      firstName: "Homer",
      lastName: "Simpson",
    });

    expect(isMessage(user, JS_User)).toBeTruthy();
  });
  // test("Message is a message", () => {
  //   const msg = new Message();
  //   expect(isMessage(msg)).toBeFalsy();
  //   expect(isMessage(msg)).toBeFalsy();
  // });
});
