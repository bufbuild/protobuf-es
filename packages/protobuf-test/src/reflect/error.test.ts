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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import { FieldError, isFieldError } from "@bufbuild/protobuf/reflect";
import { UserSchema } from "../gen/ts/extra/example_pb.js";
import type { DescField, DescOneof } from "@bufbuild/protobuf";

void suite("FieldError", () => {
  test("is JSON serializable", () => {
    const err = new FieldError(UserSchema.fields[0], "foo");
    assert.ok(JSON.stringify(err) !== undefined);
  });
  void suite("field()", () => {
    test("returns field", () => {
      const err = new FieldError(UserSchema.fields[0], "foo");
      assert.strictEqual(err.field(), UserSchema.fields[0]);
    });
  });
});

void suite("isFieldError()", () => {
  test("returns true for FieldError instances", () => {
    assert.strictEqual(
      isFieldError(new FieldError(UserSchema.fields[0], "foo")),
      true,
    );
    assert.strictEqual(
      isFieldError(
        new FieldError(UserSchema.fields[0], "foo", "FieldValueInvalidError"),
      ),
      true,
    );
    assert.strictEqual(
      isFieldError(
        new FieldError(UserSchema.fields[0], "foo", "FieldListRangeError"),
      ),
      true,
    );
    assert.strictEqual(
      isFieldError(
        new FieldError(UserSchema.fields[0], "foo", "ForeignFieldError"),
      ),
      true,
    );
  });
  test("narrows down to FieldError", () => {
    const u: unknown = null;
    if (isFieldError(u)) {
      assert.ok(u.name !== undefined);
      assert.ok(u.message !== undefined);
      const field: DescField | DescOneof = u.field();
      assert.ok(field !== undefined);
    }
  });
  test("returns false for other errors", () => {
    assert.strictEqual(isFieldError(null), false);
    assert.strictEqual(isFieldError(new Error("foo")), false);
    const err = new Error();
    err.name = "FieldValueInvalidError";
    assert.strictEqual(isFieldError(err), false);
  });
  test("falsely returns true if the argument is close enough to a FieldError", () => {
    const err = new Error();
    err.name = "FieldValueInvalidError";
    (err as unknown as Record<"field", () => unknown>).field = () => {
      //
    };
    assert.strictEqual(isFieldError(err), true);
  });
});
