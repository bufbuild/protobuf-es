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

import { beforeEach, describe, expect, test } from "@jest/globals";
import assert from "node:assert";
import { create, equals } from "@bufbuild/protobuf";
import type { Message } from "@bufbuild/protobuf";
import type { DescMessage } from "@bufbuild/protobuf";
import { reflect } from "@bufbuild/protobuf/reflect";
import { WireType } from "@bufbuild/protobuf/wire";
import * as proto2_ts from "./gen/ts/extra/proto2_pbv2.js";
import * as proto3_ts from "./gen/ts/extra/proto3_pbv2.js";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pbv2.js";
import { UserDesc } from "./gen/ts/extra/example_pbv2.js";
import { fillProto3Message } from "./helpers-proto3.js";
import { fillProto2Message } from "./helpers-proto2.js";
import { fillEdition2023Message } from "./helpers-edition2023.js";

describe("equals()", () => {
  test("same messages are equal", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    const b = a;
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(true);
  });
  test.each([
    proto3_ts.Proto3MessageDesc,
    proto2_ts.Proto2MessageDesc,
    edition2023_ts.Edition2023MessageDesc,
  ])("equal zero messages are equal $typeName", (desc) => {
    const a = create(desc);
    const b = create(desc);
    expect(equals(desc, a, b)).toBe(true);
  });
  test("equal proto3 messages are equal", () => {
    const a = fillProto3Message(create(proto3_ts.Proto3MessageDesc));
    const b = fillProto3Message(create(proto3_ts.Proto3MessageDesc));
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(true);
  });
  test("equal proto2 messages are equal", () => {
    const a = fillProto2Message(create(proto2_ts.Proto2MessageDesc));
    const b = fillProto2Message(create(proto2_ts.Proto2MessageDesc));
    expect(equals(proto2_ts.Proto2MessageDesc, a, b)).toBe(true);
  });
  test("equal edition2023 messages are equal", () => {
    const a = fillEdition2023Message(
      create(edition2023_ts.Edition2023MessageDesc),
    );
    const b = fillEdition2023Message(
      create(edition2023_ts.Edition2023MessageDesc),
    );
    expect(equals(edition2023_ts.Edition2023MessageDesc, a, b)).toBe(true);
  });
  test("different message types are not equal", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    const b = create(UserDesc);
    expect(equals(proto3_ts.Proto3MessageDesc as DescMessage, a, b)).toBe(
      false,
    );
    expect(equals(proto3_ts.Proto3MessageDesc as DescMessage, b, b)).toBe(
      false,
    );
  });
  test("accepts anonymous messages", () => {
    const desc: DescMessage = proto3_ts.Proto3MessageDesc;
    const a: Message = create(proto3_ts.Proto3MessageDesc);
    const b: Message = create(proto3_ts.Proto3MessageDesc);
    expect(equals(desc, a, b)).toBe(true);
  });
  test("NaN does not equal NaN", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    a.singularFloatField = Number.NaN;
    const b = create(proto3_ts.Proto3MessageDesc);
    b.singularFloatField = Number.NaN;
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
  });
  test("extensions and unknown fields are disregarded", () => {
    const a = create(proto3_ts.Proto3MessageDesc);
    a.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const b = create(proto3_ts.Proto3MessageDesc);
    expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(true);
  });
  test("set proto2 field is not equal unset field", () => {
    const a = create(proto2_ts.Proto2MessageDesc);
    const b = create(proto2_ts.Proto2MessageDesc);
    b.optionalStringField = "";
    expect(equals(proto2_ts.Proto2MessageDesc, a, b)).toBe(false);
  });
  describe("set proto3 field is not equal unset field", () => {
    const desc = proto3_ts.Proto3MessageDesc;
    const a = fillProto3Message(create(desc));
    let b: proto3_ts.Proto3Message;
    beforeEach(() => {
      b = fillProto3Message(create(desc));
    });
    test.each(desc.fields.filter((f) => reflect(desc, a).isSet(f)))(
      "$name",
      (f) => {
        reflect(desc, b).clear(f);
        expect(reflect(desc, b).isSet(f)).toBe(false);
        expect(reflect(desc, a).isSet(f)).toBe(true);
        expect(equals(desc, a, b)).toBe(false);
      },
    );
  });
  describe("set edition2023 field is not equal unset field", () => {
    const desc = edition2023_ts.Edition2023MessageDesc;
    const a = fillEdition2023Message(create(desc));
    let b: edition2023_ts.Edition2023Message;
    beforeEach(() => {
      b = fillEdition2023Message(create(desc));
    });
    test.each(desc.fields.filter((f) => reflect(desc, a).isSet(f)))(
      "$name",
      (f) => {
        reflect(desc, b).clear(f);
        expect(reflect(desc, b).isSet(f)).toBe(false);
        expect(reflect(desc, a).isSet(f)).toBe(true);
        expect(equals(desc, a, b)).toBe(false);
      },
    );
  });
  describe("modified", () => {
    let a: proto3_ts.Proto3Message;
    let b: proto3_ts.Proto3Message;
    beforeEach(() => {
      a = fillProto3Message(create(proto3_ts.Proto3MessageDesc));
      b = fillProto3Message(create(proto3_ts.Proto3MessageDesc));
    });
    test("singularStringField is not equal", () => {
      b.singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("singularBytesField is not equal", () => {
      b.singularBytesField[0] = 0x01;
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("optionalStringField is not equal", () => {
      b.optionalStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("repeatedStringField is not equal", () => {
      b.repeatedStringField.push("modified");
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("oneof is not equal", () => {
      b.either = { case: "oneofInt32Field", value: 123 };
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("singularMessageField is not equal", () => {
      assert(b.singularMessageField);
      b.singularMessageField.singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("mapStringStringField is not equal", () => {
      b.mapStringStringField["modified"] = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
    test("mapInt32MessageField is not equal", () => {
      b.mapInt32MessageField[123].singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageDesc, a, b)).toBe(false);
    });
  });
});
