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
import { User } from "./gen/ts/extra/example_pb.js";
import { isMessage, Message } from "@bufbuild/protobuf";

describe("isMessage", () => {
  test("Message", () => {
    const msg = new Message();

    const user = new User({
      firstName: "Homer",
      lastName: "Simpson",
    });
    console.log(user.getType());

    console.log(msg.getType().typeName);

    expect(isMessage(msg)).toBeTruthy();
  });
  // test("subclass of Message", () => {
  //   const user = new User({
  //     firstName: "Homer",
  //     lastName: "Simpson",
  //   });

  //   expect(isMessage(user, User)).toBeTruthy();
  // });
});
