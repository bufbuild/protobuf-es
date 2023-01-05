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
import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { describeMT } from "./helpers.js";
import { OneofMessage as TS_OneofMessage } from "./gen/ts/extra/msg-oneof_pb.js";
import { OneofMessage as JS_OneofMessage } from "./gen/js/extra/msg-oneof_pb.js";

describeMT({ ts: TS_OneofMessage, js: JS_OneofMessage }, (messageType) => {
  const messageField11 = messageType.fields.find(11);
  if (!messageField11) {
    throw new Error();
  }
  if (messageField11.kind !== "message") {
    throw new Error();
  }
  const defaultFields: PlainMessage<TS_OneofMessage | JS_OneofMessage> = {
    message: { case: undefined },
    scalar: { case: undefined },
    enum: { case: undefined },
  };
  const defaultJson: JsonValue = {};
  const fooValue = new messageField11.T({
    name: "max",
    toggle: false,
  });
  const exampleFields: PlainMessage<TS_OneofMessage | JS_OneofMessage> = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    message: { case: "foo", value: fooValue as any },
    scalar: { case: undefined },
    enum: { case: undefined },
  };
  const exampleJson: JsonValue = {
    foo: { name: "max" },
  };
  test("has expected defaults", () => {
    const got = { ...new messageType() };
    expect(got).toStrictEqual(defaultFields);
  });
  test("defaults encodes to JSON", () => {
    const got = new messageType().toJson();
    expect(got).toStrictEqual(defaultJson);
  });
  test("defaults decodes from JSON", () => {
    const got = { ...messageType.fromJson(defaultJson) };
    expect(got).toStrictEqual(defaultFields);
  });
  test("example encodes to JSON", () => {
    const got = new messageType(exampleFields).toJson();
    expect(got).toStrictEqual(exampleJson);
  });
  test("example decodes from JSON", () => {
    const got = { ...messageType.fromJson(exampleJson) };
    expect(got).toStrictEqual(exampleFields);
  });
});
