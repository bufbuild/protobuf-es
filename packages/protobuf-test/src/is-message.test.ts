// Copyright 2021-2026 Buf Technologies, Inc.
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
import { UserSchema } from "./gen/ts/extra/example_pb.js";
import { create, isMessage } from "@bufbuild/protobuf";
import { MessageFieldMessageSchema } from "./gen/ts/extra/msg-message_pb.js";

void suite("isMessage", () => {
  void test("narrows down to anonymous message", () => {
    const unknown = create(UserSchema) as unknown;
    assert.ok(isMessage(unknown));
    if (isMessage(unknown)) {
      assert.strictEqual(unknown.$typeName, "example.User");
    }
  });
  void test("narrows down to specific message", () => {
    const unknown = create(UserSchema) as unknown;
    assert.ok(isMessage(unknown, UserSchema));
    if (isMessage(unknown, UserSchema)) {
      assert.strictEqual(unknown.$typeName, "example.User");
      unknown.firstName = "Homer"; // proves that the type is known
    }
    assert.ok(isMessage(unknown, UserSchema));
    assert.ok(isMessage(unknown, UserSchema));
  });
});
test("rejects foreign message", () => {
  const user = create(UserSchema);
  assert.strictEqual(isMessage(user, MessageFieldMessageSchema), false);
});
test("rejects non-message values", () => {
  assert.strictEqual(isMessage(null), false);
  assert.strictEqual(isMessage(undefined), false);
  assert.strictEqual(isMessage(123), false);
  assert.strictEqual(isMessage("str"), false);
  assert.strictEqual(isMessage({}), false);
});
test("falsely returns true if the argument is close enough to a Message", () => {
  assert.ok(
    isMessage({
      $typeName: "",
    }),
  );
  assert.ok(
    isMessage(
      {
        $typeName: "example.User",
      },
      UserSchema,
    ),
  );
});
