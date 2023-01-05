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
import { FieldMask as TS_FieldMask } from "../../gen/ts/google/protobuf/field_mask_pb.js";
import { FieldMask as JS_FieldMask } from "../../gen/js/google/protobuf/field_mask_pb.js";

describe("google.protobuf.FieldMask", () => {
  describe.each([
    { FieldMask: TS_FieldMask, name: `(generated ts)` },
    { FieldMask: JS_FieldMask, name: `(generated js)` },
  ])("$name", ({ FieldMask }) => {
    const fieldMask = new FieldMask({
      paths: ["user.display_name", "photo"],
    });
    const json = "user.displayName,photo";
    test("encodes to JSON", () => {
      expect(fieldMask.toJson()).toBe(json);
    });
    test("decodes from JSON", () => {
      const want = new FieldMask({
        paths: ["user.display_name", "photo"],
      });
      expect(FieldMask.fromJson(json)).toStrictEqual(want);
    });
  });
});
