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
import {
  create,
  type MessageShape,
  type EnumShape,
  type Message,
  type DescEnum,
  type DescMessage,
} from "@bufbuild/protobuf";
import type { Timestamp, Duration } from "@bufbuild/protobuf/wkt";
import type { Proto3Message, Proto3Enum } from "./gen/ts/extra/proto3_pb.js";
import { Proto3EnumSchema } from "./gen/ts/extra/proto3_pb.js";
import type { User } from "./gen/ts/extra/example_pb.js";
import { UserSchema } from "./gen/ts/extra/example_pb.js";

describe("type Message", () => {
  describe("assigning different messages with same shape to each other", () => {
    test("is a type error", () => {
      const duration = "fake" as unknown as Duration;
      const timestamp = "fake" as unknown as Timestamp;
      // @ts-expect-error TS2322
      const duration2: Duration = timestamp;
      // @ts-expect-error TS2322
      const timestamp2: Timestamp = duration;
      expect(duration2).toBeDefined();
      expect(timestamp2).toBeDefined();
    });
  });
  describe("narrow down from message shape union", () => {
    const msg = create(UserSchema) as unknown as Proto3Message | User;
    test("can switch on Message.$typeName against literal string type", () => {
      switch (msg.$typeName) {
        case "docs.User":
          expect(msg.firstName).toBeDefined();
          break;
        default:
          throw new Error();
      }
    });
    test("cannot switch on Message.$typeName against embedded desc's typeName", () => {
      switch (msg.$typeName) {
        case UserSchema.typeName:
          // @ts-expect-error TS2339
          expect(msg.firstName).toBeDefined();
          break;
        default:
          throw new Error();
      }
    });
  });
});

describe("type MessageShape", () => {
  test("derives generated shape", () => {
    function t(derived: MessageShape<typeof UserSchema>, direct: User) {
      derived = direct;
      direct = derived;
    }
    expect(t).toBeDefined();
  });
  test("derives anonymous shape", () => {
    function t(derived: MessageShape<DescMessage>, anon: Message) {
      derived = anon;
      anon = derived;
    }
    expect(t).toBeDefined();
  });
});

describe("type EnumShape", () => {
  test("derives generated shape", () => {
    function t(
      derived: EnumShape<typeof Proto3EnumSchema>,
      direct: Proto3Enum,
    ) {
      derived = direct;
      direct = derived;
    }
    expect(t).toBeDefined();
  });
  test("derives generated shape", () => {
    function t(derived: EnumShape<DescEnum>, anon: number) {
      derived = anon;
      anon = derived;
    }
    expect(t).toBeDefined();
  });
});
