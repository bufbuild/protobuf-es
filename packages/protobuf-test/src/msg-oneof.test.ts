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
import type { JsonValue, PlainMessage } from "@bufbuild/protobuf";
import { clearField, isFieldSet } from "@bufbuild/protobuf";
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
  test("allows number[] for bytes field", () => {
    const bytes = [0xff];
    const got = {
      ...new messageType({
        ...defaultFields,
        scalar: { case: "bytes", value: bytes as any }, //eslint-disable-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
      }),
    };
    expect(got).toStrictEqual({
      ...defaultFields,
      scalar: { case: "bytes", value: new Uint8Array(bytes) },
    });
  });
  describe("isFieldSet()", () => {
    test("returns false for unselected oneof", () => {
      const msg = new messageType({
        scalar: { case: undefined },
      });
      expect(isFieldSet(msg, "value")).toBe(false);
      expect(isFieldSet(msg, "error")).toBe(false);
      expect(isFieldSet(msg, "bytes")).toBe(false);
    });
    test("returns true for selected oneof", () => {
      const msg = new messageType({
        scalar: { case: "value", value: 123 },
      });
      expect(isFieldSet(msg, "value")).toBe(true);
      expect(isFieldSet(msg, "error")).toBe(false);
      expect(isFieldSet(msg, "bytes")).toBe(false);
    });
  });
  describe("clearField()", () => {
    test("deselects selected oneof", () => {
      const msg = new messageType({
        scalar: { case: "value", value: 123 },
      });
      clearField(msg, "value");
      expect(msg.scalar.case).toBeUndefined();
      expect(msg.scalar.value).toBeUndefined();
    });
    test("skips if field is not selected", () => {
      const msg = new messageType({
        scalar: { case: "error", value: "test" },
      });
      clearField(msg, "value");
      expect(msg.scalar.case).toBe("error");
      expect(msg.scalar.value).toBe("test");
    });
  });
  describe("field info", () => {
    test.each(messageType.fields.byNumber())("$name", (field) => {
      expect(typeof field.no).toBe("number");
      expect(typeof field.name).toBe("string");
      expect(typeof field.localName).toBe("string");
      expect(typeof field.jsonName).toBe("string");
      expect(field.repeated).toBe(false);
      expect(typeof field.packed).toBe("boolean");
      expect(field.delimited).toBe(false);
      expect(field.default).toBeUndefined();
      expect(field.opt).toBe(false);
      expect(field.req).toBe(false);
    });
    test.each(["value", "error", "bytes"])("oneof scalar %s", (fieldName) => {
      const f = messageType.fields.findJsonName(fieldName);
      expect(f?.oneof?.name).toBe("scalar");
      expect(f?.kind).toBe("scalar");
      if (f?.kind == "scalar") {
        expect(typeof f.T).toBe("number");
        expect(typeof f.L).toBe("number");
        expect(typeof f.packed).toBe("boolean");
      }
    });
    test.each(["foo", "bar", "baz"])("oneof message %s", (fieldName) => {
      const f = messageType.fields.findJsonName(fieldName);
      expect(f?.oneof?.name).toBe("message");
      expect(f?.kind).toBe("message");
      if (f?.kind == "message") {
        expect(typeof f.T.typeName).toBe("string");
      }
    });
    test.each(["e"])("oneof enum %s", (fieldName) => {
      const f = messageType.fields.findJsonName(fieldName);
      expect(f?.oneof?.name).toBe("enum");
      expect(f?.kind).toBe("enum");
      if (f?.kind == "enum") {
        expect(f.T.typeName).toBe("spec.OneofEnum");
      }
    });
  });
});
