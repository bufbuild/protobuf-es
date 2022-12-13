// Copyright 2021-2022 Buf Technologies, Inc.
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
import { WrappersMessage as TS_WrappersMessage } from "./gen/ts/extra/wkt-wrappers_pb.js";
import { WrappersMessage as JS_WrappersMessage } from "./gen/js/extra/wkt-wrappers_pb.js";
import { describeMT } from "./helpers.js";
import { BoolValue, protoInt64 } from "@bufbuild/protobuf";

describeMT(
  { ts: TS_WrappersMessage, js: JS_WrappersMessage },
  (messageType) => {
    describe("singular fields", () => {
      test("wrapper field is unset by default", () => {
        const w = new messageType();
        expect(w.doubleValueField).toBeUndefined();
        expect(w.boolValueField).toBeUndefined();
        expect(w.floatValueField).toBeUndefined();
        expect(w.int64ValueField).toBeUndefined();
        expect(w.uint64ValueField).toBeUndefined();
        expect(w.int32ValueField).toBeUndefined();
        expect(w.uint32ValueField).toBeUndefined();
        expect(w.stringValueField).toBeUndefined();
        expect(w.bytesValueField).toBeUndefined();
      });
      test("unwrapped wrapper field is accepted in constructor", () => {
        const w = new messageType({
          doubleValueField: 1.2,
          boolValueField: true,
          floatValueField: 1.3,
          int64ValueField: protoInt64.parse(4),
          uint64ValueField: protoInt64.parse(5),
          int32ValueField: 6,
          uint32ValueField: 7,
          stringValueField: "a",
          bytesValueField: new Uint8Array([0xff]),
        });
        expect(w.doubleValueField).toBe(1.2);
        expect(w.boolValueField).toBe(true);
        expect(w.floatValueField).toBe(1.3);
        expect(w.int64ValueField).toBe(protoInt64.parse(4));
        expect(w.uint64ValueField).toBe(protoInt64.parse(5));
        expect(w.int32ValueField).toBe(6);
        expect(w.uint32ValueField).toBe(7);
        expect(w.stringValueField).toBe("a");
        expect(w.bytesValueField).toStrictEqual(new Uint8Array([0xff]));
      });
      test("unset wrapper field is omitted in JSON", () => {
        const w = new messageType();
        const got = w.toJsonString();
        const want = `{}`;
        expect(got).toBe(want);
      });
      test("set wrapper field is not omitted in JSON", () => {
        const w = new messageType({
          boolValueField: true,
        });
        const got = w.toJsonString();
        const want = `{"boolValueField":true}`;
        expect(got).toBe(want);
      });
    });
    describe("oneof fields", () => {
      const w = new messageType({
        oneofFields: {
          case: "oneofBoolValueField",
          value: new BoolValue({ value: false }),
        },
      });
      test("construct as expected", () => {
        expect(w.oneofFields.case).toBe("oneofBoolValueField");
        expect(w.oneofFields.value?.value).toBe(false);
      });
      test("clone as expected", () => {
        const wClone = w.clone();
        expect(wClone.oneofFields.case).toBe("oneofBoolValueField");
        expect(wClone.oneofFields.value?.value).toBe(false);
      });
      test("serialize to binary", () => {
        const wBinary = messageType.fromBinary(w.toBinary());
        expect(wBinary.oneofFields.case).toBe("oneofBoolValueField");
        expect(wBinary.oneofFields.value?.value).toBe(false);
      });
      test("serialize to JSON", () => {
        const wJson = messageType.fromJsonString(w.toJsonString());
        expect(wJson.oneofFields.case).toBe("oneofBoolValueField");
        expect(wJson.oneofFields.value?.value).toBe(false);
      });
    });
    describe("repeated fields", () => {
      const w = new messageType({
        repeatedBoolValueField: [
          new BoolValue({ value: true }),
          new BoolValue({ value: false }),
        ],
      });
      test("construct as expected", () => {
        expect(w.repeatedBoolValueField.length).toBe(2);
        expect(w.repeatedBoolValueField[0]?.value).toBe(true);
        expect(w.repeatedBoolValueField[1]?.value).toBe(false);
      });
      test("clone as expected", () => {
        const wClone = w.clone();
        expect(wClone.repeatedBoolValueField.length).toBe(2);
        expect(wClone.repeatedBoolValueField[0]?.value).toBe(true);
        expect(wClone.repeatedBoolValueField[1]?.value).toBe(false);
      });
      test("serialize to binary", () => {
        const wBinary = messageType.fromBinary(w.toBinary());
        expect(wBinary.repeatedBoolValueField.length).toBe(2);
        expect(wBinary.repeatedBoolValueField[0]?.value).toBe(true);
        expect(wBinary.repeatedBoolValueField[1]?.value).toBe(false);
      });
      test("serialize to JSON", () => {
        const wJson = messageType.fromJsonString(w.toJsonString());
        expect(wJson.repeatedBoolValueField.length).toBe(2);
        expect(wJson.repeatedBoolValueField[0]?.value).toBe(true);
        expect(wJson.repeatedBoolValueField[1]?.value).toBe(false);
      });
    });
    describe("map fields", () => {
      const w = new messageType({
        mapBoolValueField: {
          foo: new BoolValue({ value: true }),
          bar: new BoolValue({ value: false }),
        },
      });
      test("construct as expected", () => {
        expect(w.mapBoolValueField["foo"].value).toBe(true);
        expect(w.mapBoolValueField["bar"].value).toBe(false);
      });
      test("clone as expected", () => {
        const wClone = w.clone();
        expect(wClone.mapBoolValueField["foo"].value).toBe(true);
        expect(wClone.mapBoolValueField["bar"].value).toBe(false);
      });
      test("serialize to binary", () => {
        const wBinary = messageType.fromBinary(w.toBinary());
        expect(wBinary.mapBoolValueField["foo"].value).toBe(true);
        expect(wBinary.mapBoolValueField["bar"].value).toBe(false);
      });
      test("serialize to JSON", () => {
        const wJson = messageType.fromJsonString(w.toJsonString());
        expect(wJson.mapBoolValueField["foo"].value).toBe(true);
        expect(wJson.mapBoolValueField["bar"].value).toBe(false);
      });
    });
  }
);
