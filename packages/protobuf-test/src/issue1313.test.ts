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

import { test } from "node:test";
import { compileMessage } from "./helpers.js";
import { create, fromJson, toJson } from "@bufbuild/protobuf";
import { NullValue } from "@bufbuild/protobuf/wkt";
import assert from "node:assert";

void test("issue #1313", async () => {
  const descMessage = await compileMessage(`
    syntax="proto3";
    import "google/protobuf/struct.proto";
    message M {
      map<string, google.protobuf.Value> value_map = 1;
      map<string, google.protobuf.NullValue> null_value_map = 2;
      repeated google.protobuf.Value value_list = 3;
      repeated google.protobuf.NullValue null_value_list = 4;
    }
  `);
  const msg = create(descMessage, {
    valueMap: {
      val1: {
        kind: { case: "nullValue", value: NullValue.NULL_VALUE },
      },
    },
    nullValueMap: {
      val1: NullValue.NULL_VALUE,
    },
    valueList: [
      {
        kind: { case: "nullValue", value: NullValue.NULL_VALUE },
      },
    ],
    nullValueList: [NullValue.NULL_VALUE],
  });
  const json = toJson(descMessage, msg);
  assert.deepStrictEqual(json, {
    valueMap: { val1: null },
    nullValueMap: { val1: null },
    valueList: [null],
    nullValueList: [null],
  });
  const msg2 = fromJson(descMessage, json);
  assert.deepStrictEqual(msg2, msg);
});
