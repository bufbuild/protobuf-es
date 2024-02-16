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
import * as TS from "./gen/ts/extra/proto3_pb.js";
import * as JS from "./gen/js/extra/proto3_pb.js";
import { describeMT } from "./helpers.js";
import { clearField, isFieldSet, protoInt64 } from "@bufbuild/protobuf";
import { Proto3Enum } from "./gen/ts/extra/proto3_pb.js";

describe("proto3 field info packed", () => {
  // Also see msg-scalars.test.ts
  describeMT(
    { ts: TS.Proto3PackedMessage, js: JS.Proto3PackedMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is packed", (field) => {
        expect(field.packed).toBe(true);
        expect(field.repeated).toBe(true);
      });
    },
  );
  describeMT(
    { ts: TS.Proto3UnpackedMessage, js: JS.Proto3UnpackedMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is unpacked", (field) => {
        expect(field.packed).toBe(false);
        expect(field.repeated).toBe(true);
      });
    },
  );
  describeMT(
    {
      ts: TS.Proto3UnspecifiedPackedMessage,
      js: JS.Proto3UnspecifiedPackedMessage,
    },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is unpacked", (field) => {
        expect(field.packed).toBe(true);
        expect(field.repeated).toBe(true);
      });
    },
  );
});

describeMT(
  { ts: TS.Proto3OptionalMessage, js: JS.Proto3OptionalMessage },
  (messageType) => {
    describe("initially", () => {
      test("has expected properties", () => {
        const msg = new messageType();
        expect(msg.stringField).toBeUndefined();
        expect(msg.bytesField).toBeUndefined();
        expect(msg.int32Field).toBeUndefined();
        expect(msg.int64Field).toBeUndefined();
        expect(msg.floatField).toBeUndefined();
        expect(msg.boolField).toBeUndefined();
        expect(msg.enumField).toBeUndefined();
        expect(msg.messageField).toBeUndefined();
      });
      test.each(messageType.fields.byNumber())(
        "field $name is not set",
        (field) => {
          const msg = new messageType();
          expect(isFieldSet(msg, field)).toBeFalsy();
          expect(
            Object.prototype.hasOwnProperty.call(msg, field.localName),
          ).toBe(false);
        },
      );
    });
    describe("isFieldSet()", () => {
      test.each(messageType.fields.byNumber())(
        "returns true for field $name set to zero value",
        (field) => {
          if (field.kind == "message") {
            // message fields do not have zero values
            return;
          }
          const msg = new messageType({
            stringField: "",
            bytesField: new Uint8Array(),
            int32Field: 0,
            int64Field: protoInt64.zero,
            floatField: 0,
            boolField: false,
            enumField: Proto3Enum.UNSPECIFIED,
          });
          expect(isFieldSet(msg, field)).toBe(true);
        },
      );
      test.each(messageType.fields.byNumber())(
        "returns true for field $name set to non-zero value",
        (field) => {
          const msg = new messageType({
            stringField: "abc",
            bytesField: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            int32Field: 1,
            int64Field: protoInt64.parse("123456"),
            floatField: 3.14,
            boolField: true,
            enumField: Proto3Enum.YES,
            messageField: new messageType(),
          });
          expect(isFieldSet(msg, field)).toBe(true);
        },
      );
    });
    describe("clearField()", () => {
      test.each(messageType.fields.byNumber())(
        "clears field $name",
        (field) => {
          const msg = new messageType({
            stringField: "",
            bytesField: new Uint8Array(),
            int32Field: 0,
            int64Field: protoInt64.zero,
            floatField: 0,
            boolField: false,
            enumField: Proto3Enum.UNSPECIFIED,
            messageField: new messageType(),
          });
          clearField(msg, field);
          expect(isFieldSet(msg, field)).toBe(false);
        },
      );
    });
  },
);

describeMT(
  { ts: TS.Proto3UnlabelledMessage, js: JS.Proto3UnlabelledMessage },
  (messageType) => {
    describe("initially", () => {
      test("has expected properties", () => {
        const msg = new messageType();
        expect(msg.stringField).toBe("");
        expect(msg.bytesField).toBeInstanceOf(Uint8Array);
        expect(msg.bytesField.length).toBe(0);
        expect(msg.int32Field).toBe(0);
        expect(msg.int64Field).toBe(protoInt64.zero);
        expect(msg.floatField).toBe(0);
        expect(msg.boolField).toBe(false);
        expect(msg.enumField).toBe(Proto3Enum.UNSPECIFIED);
        expect(msg.messageField).toBeUndefined();
      });
      test.each(messageType.fields.byNumber())(
        "field $name is not set",
        (field) => {
          const msg = new messageType();
          expect(isFieldSet(msg, field)).toBeFalsy();
          const shouldHaveOwn = field.kind != "message";
          expect(
            Object.prototype.hasOwnProperty.call(msg, field.localName),
          ).toBe(shouldHaveOwn);
        },
      );
    });
    describe("isFieldSet()", () => {
      test.each(messageType.fields.byNumber())(
        "returns false for field $name set to zero value",
        (field) => {
          if (field.kind == "message") {
            // message fields do not have zero values
            return;
          }
          const msg = new messageType({
            stringField: "",
            bytesField: new Uint8Array(),
            int32Field: 0,
            int64Field: protoInt64.zero,
            floatField: 0,
            boolField: false,
            enumField: Proto3Enum.UNSPECIFIED,
          });
          expect(isFieldSet(msg, field)).toBe(false);
        },
      );
      test.each(messageType.fields.byNumber())(
        "returns true for field $name set to non-zero value",
        (field) => {
          const msg = new messageType({
            stringField: "abc",
            bytesField: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            int32Field: 1,
            int64Field: protoInt64.parse("123456"),
            floatField: 3.14,
            boolField: true,
            enumField: Proto3Enum.YES,
            messageField: new messageType(),
          });
          expect(isFieldSet(msg, field)).toBe(true);
        },
      );
    });
    describe("clearField()", () => {
      test.each(messageType.fields.byNumber())(
        "clears field $name",
        (field) => {
          const msg = new messageType({
            stringField: "abc",
            bytesField: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
            int32Field: 1,
            int64Field: protoInt64.parse("123456"),
            floatField: 3.14,
            boolField: true,
            enumField: Proto3Enum.YES,
            messageField: new messageType(),
          });
          clearField(msg, field);
          expect(isFieldSet(msg, field)).toBe(false);
        },
      );
    });
  },
);

describe("proto3 field info optional / required", () => {
  describeMT(
    { ts: TS.Proto3OptionalMessage, js: JS.Proto3OptionalMessage },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is optional", (field) => {
        expect(field.req).toBe(false);
        expect(field.opt).toBe(true);
      });
    },
  );
  describeMT(
    {
      ts: TS.Proto3UnspecifiedPackedMessage,
      js: JS.Proto3UnspecifiedPackedMessage,
    },
    (messageType) => {
      test.each(messageType.fields.byNumber())("$name is optional", (field) => {
        expect(field.req).toBe(false);
        expect(field.opt).toBe(false);
      });
    },
  );
});
