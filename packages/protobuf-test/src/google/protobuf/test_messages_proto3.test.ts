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

import { expect, test } from "@jest/globals";
import { TestAllTypesProto3 as TS_TestAllTypesProto3 } from "../../gen/ts/google/protobuf/test_messages_proto3_pb.js";
import { TestAllTypesProto3 as JS_TestAllTypesProto3 } from "../../gen/js/google/protobuf/test_messages_proto3_pb.js";
import { describeMT } from "../../helpers.js";
import type {
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";

describeMT(
  { ts: TS_TestAllTypesProto3, js: JS_TestAllTypesProto3 },
  (messageType) => {
    test("defaults encodes to JSON", () => {
      const got: JsonValue = new messageType().toJson();
      const want: JsonValue = {};
      expect(got).toStrictEqual(want);
    });
    test("defaults decodes from JSON", () => {
      const got: PlainMessage<TS_TestAllTypesProto3 | JS_TestAllTypesProto3> = {
        ...messageType.fromJson({}),
      };
      const want: PartialMessage<
        TS_TestAllTypesProto3 | JS_TestAllTypesProto3
      > = { ...new messageType() };
      expect(got).toStrictEqual(want);
    });
  }
);
