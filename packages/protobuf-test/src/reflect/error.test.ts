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
import { FieldError, isFieldError } from "@bufbuild/protobuf/reflect";
import { UserSchema } from "../gen/ts/extra/example_pb.js";
import type { DescField, DescOneof } from "@bufbuild/protobuf";

describe("FieldError", () => {
  test("is JSON serializable", () => {
    const err = new FieldError(UserSchema.fields[0], "foo");
    expect(JSON.stringify(err)).toBeDefined();
  });
  describe("field()", () => {
    test("returns field", () => {
      const err = new FieldError(UserSchema.fields[0], "foo");
      expect(err.field()).toBe(UserSchema.fields[0]);
    });
  });
});

describe("isFieldError()", () => {
  test("returns true for FieldError instances", () => {
    expect(isFieldError(new FieldError(UserSchema.fields[0], "foo"))).toBe(
      true,
    );
    expect(
      isFieldError(
        new FieldError(UserSchema.fields[0], "foo", "FieldValueInvalidError"),
      ),
    ).toBe(true);
    expect(
      isFieldError(
        new FieldError(UserSchema.fields[0], "foo", "FieldListRangeError"),
      ),
    ).toBe(true);
    expect(
      isFieldError(
        new FieldError(UserSchema.fields[0], "foo", "ForeignFieldError"),
      ),
    ).toBe(true);
  });
  test("narrows down to FieldError", () => {
    const u: unknown = null;
    if (isFieldError(u)) {
      expect(u.name).toBeDefined();
      expect(u.message).toBeDefined();
      const field: DescField | DescOneof = u.field();
      expect(field).toBeDefined();
    }
  });
  test("returns false for other errors", () => {
    expect(isFieldError(null)).toBe(false);
    expect(isFieldError(new Error("foo"))).toBe(false);
    const err = new Error();
    err.name = "FieldValueInvalidError";
    expect(isFieldError(err)).toBe(false);
  });
  test("falsely returns true if the argument is close enough to a FieldError", () => {
    const err = new Error();
    err.name = "FieldValueInvalidError";
    (err as unknown as Record<"field", () => unknown>).field = function () {};
    expect(isFieldError(err)).toBe(true);
  });
});
