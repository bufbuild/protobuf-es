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

import {
  createDescriptorSet,
  createRegistryFromDescriptors,
  LongType,
  protoInt64,
} from "@bufbuild/protobuf";
import { readFileSync } from "fs";
import { describe, expect, test } from "@jest/globals";
import {
  JSTypeNormalMessage,
  JSTypeStringMessage as TS_JSTypeStringMessage,
} from "./gen/ts/extra/jstype_pb.js";
import assert from "node:assert";
import { testMT } from "./helpers.js";
import { JSTypeStringMessage as JS_JSTypeStringMessage } from "./gen/js/extra/jstype_pb.js";
import {
  JSTypeProto2NormalMessage,
  JSTypeProto2StringMessage as TS_JSTypeProto2StringMessage,
} from "./gen/ts/extra/jstype-proto2_pb.js";
import { JSTypeProto2StringMessage as JS_JSTypeProto2StringMessage } from "./gen/js/extra/jstype-proto2_pb.js";

describe("jstype=JS_STRING", () => {
  const normalValues = {
    fixed64Field: protoInt64.uParse(123),
    int64Field: protoInt64.parse(123),
    sfixed64Field: protoInt64.parse(123),
    sint64Field: protoInt64.parse(123),
    uint64Field: protoInt64.uParse(123),
    repeatedFixed64Field: [protoInt64.uParse(123)],
    repeatedInt64Field: [protoInt64.parse(123)],
    repeatedSfixed64Field: [protoInt64.parse(123)],
    repeatedSint64Field: [protoInt64.parse(123)],
    repeatedUint64Field: [protoInt64.uParse(123)],
  };
  const goldenProto3 = new JSTypeNormalMessage(normalValues);
  const goldenProto2 = new JSTypeProto2NormalMessage(normalValues);

  describe("from JSON", () => {
    testMT(
      { ts: TS_JSTypeStringMessage, js: JS_JSTypeStringMessage },
      (messageType) => {
        const m = messageType.fromJsonString(goldenProto3.toJsonString());
        expectAllFieldsString123(m);
      },
    );
    testMT(
      { ts: TS_JSTypeProto2StringMessage, js: JS_JSTypeProto2StringMessage },
      (messageType) => {
        const m = messageType.fromJsonString(goldenProto2.toJsonString());
        expectAllFieldsString123(m);
      },
    );
  });

  describe("to JSON", () => {
    testMT(
      { ts: TS_JSTypeStringMessage, js: JS_JSTypeStringMessage },
      (messageType) => {
        const want = goldenProto3.toJsonString();
        const actual = messageType.fromJsonString(want).toJsonString();
        expect(actual).toStrictEqual(want);
      },
    );
    testMT(
      { ts: TS_JSTypeProto2StringMessage, js: JS_JSTypeProto2StringMessage },
      (messageType) => {
        const want = goldenProto2.toJsonString();
        const actual = messageType.fromJsonString(want).toJsonString();
        expect(actual).toStrictEqual(want);
      },
    );
  });

  describe("from binary", () => {
    testMT(
      { ts: TS_JSTypeStringMessage, js: JS_JSTypeStringMessage },
      (messageType) => {
        const m = messageType.fromBinary(goldenProto3.toBinary());
        expectAllFieldsString123(m);
      },
    );
    testMT(
      { ts: TS_JSTypeProto2StringMessage, js: JS_JSTypeProto2StringMessage },
      (messageType) => {
        const m = messageType.fromBinary(goldenProto2.toBinary());
        expectAllFieldsString123(m);
      },
    );
  });

  describe("to binary", () => {
    testMT(
      { ts: TS_JSTypeStringMessage, js: JS_JSTypeStringMessage },
      (messageType) => {
        const want = goldenProto3.toBinary();
        const actual = messageType.fromBinary(want).toBinary();
        expect(actual).toStrictEqual(want);
      },
    );
    testMT(
      { ts: TS_JSTypeProto2StringMessage, js: JS_JSTypeProto2StringMessage },
      (messageType) => {
        const want = goldenProto2.toBinary();
        const actual = messageType.fromBinary(want).toBinary();
        expect(actual).toStrictEqual(want);
      },
    );
  });

  function expectAllFieldsString123(
    m: JS_JSTypeStringMessage | TS_JSTypeProto2StringMessage,
  ) {
    expect(typeof m.fixed64Field).toBe("string");
    expect(m.fixed64Field).toBe("123");

    expect(typeof m.int64Field).toBe("string");
    expect(m.int64Field).toBe("123");

    expect(typeof m.sfixed64Field).toBe("string");
    expect(m.sfixed64Field).toBe("123");

    expect(typeof m.sint64Field).toBe("string");
    expect(m.sint64Field).toBe("123");

    expect(typeof m.uint64Field).toBe("string");
    expect(m.uint64Field).toBe("123");

    expect(m.repeatedFixed64Field.length).toBe(1);
    expect(typeof m.repeatedFixed64Field[0]).toBe("string");
    expect(m.repeatedFixed64Field[0]).toBe("123");

    expect(m.repeatedInt64Field.length).toBe(1);
    expect(typeof m.repeatedInt64Field[0]).toBe("string");
    expect(m.repeatedInt64Field[0]).toBe("123");

    expect(m.repeatedSfixed64Field.length).toBe(1);
    expect(typeof m.repeatedSfixed64Field[0]).toBe("string");
    expect(m.repeatedSfixed64Field[0]).toBe("123");

    expect(m.repeatedSint64Field.length).toBe(1);
    expect(typeof m.repeatedSint64Field[0]).toBe("string");
    expect(m.repeatedSint64Field[0]).toBe("123");

    expect(m.repeatedUint64Field.length).toBe(1);
    expect(typeof m.repeatedUint64Field[0]).toBe("string");
    expect(m.repeatedUint64Field[0]).toBe("123");
  }
});

describe("createDescriptorSet with jstype", () => {
  const reg = createRegistryFromDescriptors(
    readFileSync("./descriptorset.binpb"),
  );
  testAllFieldsLongType("spec.JSTypeOmittedMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeStringMessage", LongType.STRING);
  testAllFieldsLongType("spec.JSTypeNormalMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeNumberMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeProto2OmittedMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeProto2StringMessage", LongType.STRING);
  testAllFieldsLongType("spec.JSTypeProto2NormalMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeProto2NumberMessage", LongType.BIGINT);

  function testAllFieldsLongType(messageTypeName: string, longType: LongType) {
    const mt = reg.findMessage(messageTypeName);
    assert(mt);
    for (const field of mt.fields.list()) {
      test(`${messageTypeName} field #${field.no}`, () => {
        assert(field.kind === "scalar");
        expect(field.L).toBe(longType);
      });
    }
  }
});

describe("createRegistryFromDescriptors with jstype", () => {
  const descriptorSet = createDescriptorSet(
    readFileSync("./descriptorset.binpb"),
  );
  testAllFieldsLongType("spec.JSTypeOmittedMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeStringMessage", LongType.STRING);
  testAllFieldsLongType("spec.JSTypeNormalMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeNumberMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeProto2OmittedMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeProto2StringMessage", LongType.STRING);
  testAllFieldsLongType("spec.JSTypeProto2NormalMessage", LongType.BIGINT);
  testAllFieldsLongType("spec.JSTypeProto2NumberMessage", LongType.BIGINT);

  function testAllFieldsLongType(messageTypeName: string, longType: LongType) {
    const mt = descriptorSet.messages.get(messageTypeName);
    assert(mt);
    for (const field of mt.fields) {
      test(`${messageTypeName} field #${field.number}`, () => {
        expect(field.longType).toBe(longType);
      });
    }
  }
});
