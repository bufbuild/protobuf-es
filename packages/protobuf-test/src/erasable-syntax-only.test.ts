// Copyright 2021-2025 Buf Technologies, Inc.
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
  Status,
  TestMessage_Priority,
} from "./gen/ts_erasable_syntax_only/extra/erasable_syntax_only_pb.js";

describe("erasable_syntax_only option", () => {
  test("generates const object for top-level enum", () => {
    expect(Status.UNSPECIFIED).toBe(0);
    expect(Status.PENDING).toBe(1);
    expect(Status.RUNNING).toBe(2);
    expect(Status.COMPLETED).toBe(3);
    expect(Status.FAILED).toBe(4);

    // Enumの値にプロパティとしてアクセスできる
    const keys = Object.keys(Status);
    expect(keys).toContain("UNSPECIFIED");
    expect(keys).toContain("PENDING");
    expect(keys).toContain("RUNNING");
    expect(keys).toContain("COMPLETED");
    expect(keys).toContain("FAILED");
  });

  test("generates const object for nested enum", () => {
    expect(TestMessage_Priority.UNSPECIFIED).toBe(0);
    expect(TestMessage_Priority.LOW).toBe(1);
    expect(TestMessage_Priority.MEDIUM).toBe(2);
    expect(TestMessage_Priority.HIGH).toBe(3);

    const keys = Object.keys(TestMessage_Priority);
    expect(keys).toContain("UNSPECIFIED");
    expect(keys).toContain("LOW");
    expect(keys).toContain("MEDIUM");
    expect(keys).toContain("HIGH");
  });

  test("enum values can be used in switch statements", () => {
    function getStatusMessage(status: number): string {
      switch (status) {
        case Status.UNSPECIFIED:
          return "Unspecified";
        case Status.PENDING:
          return "Pending";
        case Status.RUNNING:
          return "Running";
        case Status.COMPLETED:
          return "Completed";
        case Status.FAILED:
          return "Failed";
        default:
          return "Unknown";
      }
    }

    expect(getStatusMessage(Status.PENDING)).toBe("Pending");
    expect(getStatusMessage(Status.COMPLETED)).toBe("Completed");
  });
});
