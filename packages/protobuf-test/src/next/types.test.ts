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
import { create } from "@bufbuild/protobuf/next";
import type { MessageShape, EnumShape, Message } from "@bufbuild/protobuf/next";
import type { DescEnum, DescMessage } from "@bufbuild/protobuf";
import type { Proto3Message, Proto3Enum } from "../gen/ts/extra/proto3_pbv2.js";
import { Proto3EnumDesc } from "../gen/ts/extra/proto3_pbv2.js";
import type { User } from "../gen/ts/extra/example_pbv2.js";
import { UserDesc } from "../gen/ts/extra/example_pbv2.js";
import type { Timestamp } from "../gen/ts/google/protobuf/timestamp_pbv2.js";
import type { Duration } from "../gen/ts/google/protobuf/duration_pbv2.js";

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
    const msg = create(UserDesc) as unknown as Proto3Message | User;
    test("can switch on Message.$typeName against literal string type", () => {
      switch (msg.$typeName) {
        case "docs.User":
          expect(msg.firstName).toBeDefined();
          break;
        default:
          throw new Error();
      }
    });
    test("cannot type switch on Message.$desc", () => {
      switch (msg.$desc) {
        case UserDesc:
          // @ts-expect-error TS2339
          expect(msg.firstName).toBeDefined();
          break;
        default:
          throw new Error();
      }
    });
    test("cannot switch on Message.$desc.typeName", () => {
      switch (msg.$desc.typeName) {
        case "spec.UserDesc":
        case UserDesc.typeName:
          // @ts-expect-error TS2339
          expect(msg.firstName).toBeDefined();
          break;
        default:
          throw new Error();
      }
    });
    test("cannot switch on Message.$typeName against embedded desc's typeName", () => {
      switch (msg.$typeName) {
        case UserDesc.typeName:
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
    function t(derived: MessageShape<typeof UserDesc>, direct: User) {
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
    function t(derived: EnumShape<typeof Proto3EnumDesc>, direct: Proto3Enum) {
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
