// Copyright 2021-2023 Buf Technologies, Inc.
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
import { User } from "./gen/ts/extra/example_pb.js";

function createUser(): User {
  // Using an object in the constructor
  const user = new User({
    firstName: "Homer",
    lastName: "Simpson",
    active: true,
    locations: ["Springfield"],
    projects: { SPP: "Springfield Power Plant" },
    manager: {
      // you can simply pass an initializer object for this nested message field
      firstName: "Montgomery",
      lastName: "Burns",
    },
  });

  return user;
}

function verifyUser(user: User) {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  expect(user.firstName).toEqual("Homer");
  expect(user.lastName).toEqual("Simpson");
  expect(user.active).toBeTruthy();
  expect(user.locations).toEqual(["Springfield"]);
  expect(user.projects).toEqual({ SPP: "Springfield Power Plant" });
  expect(user.manager).toBeDefined();
  expect(user.manager!.firstName).toEqual("Montgomery");
  expect(user.manager!.lastName).toEqual("Burns");
}

describe("README examples work as illustrated", () => {
  test("setting via property", () => {
    const user = new User();
    user.firstName = "Homer";
    user.lastName = "Simpson";
    user.active = true;
    user.locations = ["Springfield"];
    user.projects = {
      SPP: "Springfield Power Plant",
    };

    const mgr = new User();
    mgr.firstName = "Montgomery";
    mgr.lastName = "Burns";

    user.manager = mgr;

    verifyUser(user);
  });
  test("setting via constructor", () => {
    // Using an object in the constructor
    const user = createUser();

    verifyUser(user);
  });
  test("binary serialization roundtrip", () => {
    const user = createUser();

    const bytes = user.toBinary();
    // ...
    const deserialized = User.fromBinary(bytes);

    verifyUser(deserialized);
  });
  test("json serialization roundtrip", () => {
    const user = createUser();

    const json = user.toJson();
    // ...
    const deserialized = User.fromJson(json);

    verifyUser(deserialized);
  });
  test("json string serialization roundtrip", () => {
    const user = createUser();

    const str = JSON.stringify(user);
    // ...
    const deserialized = User.fromJsonString(str);

    verifyUser(deserialized);
  });
});
