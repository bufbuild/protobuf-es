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
import * as TS from "./gen/ts/extra/proto2_pb.js";
import * as JS from "./gen/js/extra/proto2_pb.js";
import { describeMT, testMT } from "./helpers.js";
import type { AnyMessage, Message } from "@bufbuild/protobuf";
import {
  BinaryReader,
  BinaryWriter,
  protoInt64,
  WireType,
} from "@bufbuild/protobuf";

function setDefaults(m: AnyMessage): void {
  for (const f of m.getType().fields.list()) {
    if (f.kind == "scalar" || f.kind == "enum") {
      m[f.localName] = f.default;
    }
  }
}

function verify<T extends Message>(m: T): boolean {
  return m
    .getType()
    .fields.list()
    .every((f) => f.opt || (m as AnyMessage)[f.localName] !== undefined);
}

describe("setDefaults", () => {
  testMT<TS.Proto2DefaultsMessage>(
    { ts: TS.Proto2DefaultsMessage, js: JS.Proto2DefaultsMessage },
    (messageType) => {
      const msg = new messageType();
      setDefaults(msg);
      expect(msg.stringField).toBe('hello " */ ');
      expect(msg.bytesField).toStrictEqual(
        new Uint8Array([
          0x00, 0x78, 0x5c, 0x78, 0x78, 0x41, 0x41, 0x41, 0x41, 0x41, 0x41,
          0x08, 0x0c, 0x0a, 0x0d, 0x09, 0x0b,
        ]),
      );
      expect(msg.int32Field).toBe(128);
      expect(msg.int46Field).toBe(protoInt64.parse("-256"));
      expect(msg.floatField).toBe(-512.13);
      expect(msg.enumField).toBe(TS.Proto2Enum.YES);
      expect(msg.messageField).toBe(undefined);
    },
  );
});

describe("verify", () => {
  testMT<TS.Proto2RequiredDefaultsMessage>(
    {
      ts: TS.Proto2RequiredDefaultsMessage,
      js: JS.Proto2RequiredDefaultsMessage,
    },
    (messageType) => {
      const msg = new messageType({
        messageField: {},
      });
      expect(verify(msg)).toBe(false);
      setDefaults(msg);
      expect(verify(msg)).toBe(true);
    },
  );
});

describeMT<TS.Proto2RequiredMessage>(
  { ts: TS.Proto2RequiredMessage, js: JS.Proto2RequiredMessage },
  (messageType) => {
    test("has expected defaults", () => {
      const got = { ...new messageType() };
      expect(got).toStrictEqual({});
    });
    test("encode to JSON errors on missing required field", () => {
      expect(() =>
        new messageType({
          // enumField: Proto2Enum.PROTO2_ENUM_YES,
          messageField: {},
          bytesField: new Uint8Array(0),
          stringField: "",
        }).toJson(),
      ).toThrow(
        `cannot encode field ${messageType.typeName}.enum_field to JSON: required field not set`,
      );
    });
    test("encode to binary errors on missing required field", () => {
      expect(() =>
        new messageType({
          // enumField: Proto2Enum.PROTO2_ENUM_YES,
          messageField: {},
          bytesField: new Uint8Array(0),
          stringField: "",
        }).toBinary(),
      ).toThrow(
        `cannot encode field ${messageType.typeName}.enum_field to binary: required field not set`,
      );
    });
  },
);

describeMT(
  { ts: TS.Proto2DefaultsMessage, js: JS.Proto2DefaultsMessage },
  (messageType) => {
    test("has no default values", () => {
      const got = { ...new messageType() };
      expect(got).toStrictEqual({});
    });
  },
);

describe("proto2 group", () => {
  const fieldNumbers = {
    "Proto2GroupsMessage.group": 1,
    "Proto2GroupsMessage.repeatedgroup": 2,
    "Proto2GroupsMessage.oneofgroup": 3,
    "Proto2GroupsMessage.message_field_using_group": 4,
    "Proto2GroupsMessage.message_field_using_nested_group": 5,
    "Proto2GroupsMessage.Group.int32_field": 1,
    "Proto2GroupsMessage.Group.nestedgroup": 2,
    "Proto2GroupsMessage.Group.NestedGroup.string_field": 1,
    "Proto2GroupsMessage.RepeatedGroup.int32_field": 1,
    "Proto2GroupsMessage.OneofGroup.bool_field": 1,
  };
  describe("field info", () => {
    describeMT<TS.Proto2GroupsMessage>(
      { ts: TS.Proto2GroupsMessage, js: JS.Proto2GroupsMessage },
      (messageType) => {
        test("field group", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.group"],
          );
          expect(f?.name).toBe("group");
          expect(f?.kind).toBe("message");
          expect(f?.delimited).toBe(true);
          const mt = f?.kind == "message" ? f.T : null;
          expect(mt?.typeName).toBe("spec.Proto2GroupsMessage.Group");
        });
        test("field repeatedgroup", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.repeatedgroup"],
          );
          expect(f?.name).toBe("repeatedgroup");
          expect(f?.repeated).toBe(true);
          expect(f?.kind).toBe("message");
          expect(f?.delimited).toBe(true);
          const mt = f?.kind == "message" ? f.T : null;
          expect(mt?.typeName).toBe("spec.Proto2GroupsMessage.RepeatedGroup");
        });
        test("field oneofgroup", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.oneofgroup"],
          );
          expect(f?.name).toBe("oneofgroup");
          expect(f?.oneof).toBeDefined();
          expect(f?.kind).toBe("message");
          expect(f?.delimited).toBe(true);
          const mt = f?.kind == "message" ? f.T : null;
          expect(mt?.typeName).toBe("spec.Proto2GroupsMessage.OneofGroup");
        });
        test("field message_field_using_group", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.message_field_using_group"],
          );
          expect(f?.name).toBe("message_field_using_group");
          expect(f?.kind).toBe("message");
          expect(f?.delimited).toBe(false);
          const mt = f?.kind == "message" ? f.T : null;
          expect(mt?.typeName).toBe("spec.Proto2GroupsMessage.Group");
        });
        test("field message_field_using_nested_group", () => {
          const f = messageType.fields.find(
            fieldNumbers[
              "Proto2GroupsMessage.message_field_using_nested_group"
            ],
          );
          expect(f?.name).toBe("message_field_using_nested_group");
          expect(f?.kind).toBe("message");
          expect(f?.delimited).toBe(false);
          const mt = f?.kind == "message" ? f.T : null;
          expect(mt?.typeName).toBe(
            "spec.Proto2GroupsMessage.Group.NestedGroup",
          );
        });
      },
    );
    describeMT<TS.Proto2GroupsMessage_Group>(
      { ts: TS.Proto2GroupsMessage_Group, js: JS.Proto2GroupsMessage_Group },
      (messageType) => {
        test("field int32_field", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.Group.int32_field"],
          );
          expect(f?.name).toBe("int32_field");
          expect(f?.kind).toBe("scalar");
        });
        test("field nestedgroup", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.Group.nestedgroup"],
          );
          expect(f?.name).toBe("nestedgroup");
          expect(f?.kind).toBe("message");
          expect(f?.delimited).toBe(true);
          const mt = f?.kind == "message" ? f.T : null;
          expect(mt?.typeName).toBe(
            "spec.Proto2GroupsMessage.Group.NestedGroup",
          );
        });
      },
    );
    describeMT<TS.Proto2GroupsMessage_Group_NestedGroup>(
      {
        ts: TS.Proto2GroupsMessage_Group_NestedGroup,
        js: JS.Proto2GroupsMessage_Group_NestedGroup,
      },
      (messageType) => {
        test("field string_field", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.Group.NestedGroup.string_field"],
          );
          expect(f?.name).toBe("string_field");
          expect(f?.kind).toBe("scalar");
        });
      },
    );
    describeMT<TS.Proto2GroupsMessage_RepeatedGroup>(
      {
        ts: TS.Proto2GroupsMessage_RepeatedGroup,
        js: JS.Proto2GroupsMessage_RepeatedGroup,
      },
      (messageType) => {
        test("field int32_field", () => {
          const f = messageType.fields.find(
            fieldNumbers["Proto2GroupsMessage.RepeatedGroup.int32_field"],
          );
          expect(f?.name).toBe("int32_field");
          expect(f?.kind).toBe("scalar");
        });
      },
    );
  });
  describeMT<TS.Proto2GroupsMessage>(
    { ts: TS.Proto2GroupsMessage, js: JS.Proto2GroupsMessage },
    (messageType) => {
      test("parse", () => {
        const bytes = new BinaryWriter()
          .tag(fieldNumbers["Proto2GroupsMessage.group"], WireType.StartGroup)
          .tag(
            fieldNumbers["Proto2GroupsMessage.Group.int32_field"],
            WireType.Varint,
          )
          .int32(123)
          .tag(fieldNumbers["Proto2GroupsMessage.group"], WireType.EndGroup)
          .finish();
        const m = messageType.fromBinary(bytes);
        expect(m.messageFieldUsingGroup).toBeUndefined();
        expect(m.messageFieldUsingNestedGroup).toBeUndefined();
        expect(m.group).toBeDefined();
        expect(m.group?.int32Field).toBe(123);
      });
      test("parse wrong end group field no", () => {
        const bytes = new BinaryWriter()
          .tag(fieldNumbers["Proto2GroupsMessage.group"], WireType.StartGroup)
          .tag(
            fieldNumbers["Proto2GroupsMessage.group"] + 99,
            WireType.EndGroup,
          )
          .finish();
        expect(() => messageType.fromBinary(bytes)).toThrow(
          /invalid end group tag/,
        );
      });
      test("parse missing end group tag", () => {
        const bytes = new BinaryWriter()
          .tag(fieldNumbers["Proto2GroupsMessage.group"], WireType.StartGroup)
          .finish();
        expect(() => messageType.fromBinary(bytes)).toThrow(
          /invalid end group tag/,
        );
      });
      test("serialize", () => {
        const bytes = new messageType({
          group: {
            int32Field: 123,
          },
        }).toBinary();
        const r = new BinaryReader(bytes);
        // expect group start
        let [fieldNo, wireType] = r.tag();
        expect(fieldNo).toBe(fieldNumbers["Proto2GroupsMessage.group"]);
        expect(wireType).toBe(WireType.StartGroup);
        [fieldNo, wireType] = r.tag();
        // expect field in group
        expect(fieldNo).toBe(
          fieldNumbers["Proto2GroupsMessage.Group.int32_field"],
        );
        expect(wireType).toBe(WireType.Varint);
        expect(r.int32()).toBe(123);
        // expect group end
        [fieldNo, wireType] = r.tag();
        expect(fieldNo).toBe(fieldNumbers["Proto2GroupsMessage.group"]);
        expect(wireType).toBe(WireType.EndGroup);
      });
      test("simple roundtrip", () => {
        const a = new messageType({
          group: {
            int32Field: 123,
          },
        });
        const bytes = a.toBinary();
        const b = messageType.fromBinary(bytes);
        expect(a.equals(b)).toBe(true);
      });
      test("full round trip", () => {
        const a = new messageType({
          group: {
            int32Field: 123,
            nestedgroup: {
              stringField: "abc",
            },
          },
          repeatedgroup: [
            { int32Field: 1 },
            { int32Field: 2 },
            { int32Field: 3 },
          ],
          oneofWithGroup: {
            case: "oneofgroup",
            value: { boolField: true },
          },
          messageFieldUsingGroup: {
            int32Field: 456,
            nestedgroup: {
              stringField: "def",
            },
          },
          messageFieldUsingNestedGroup: {
            stringField: "ghi",
          },
        });
        const bytes = a.toBinary();
        const b = messageType.fromBinary(bytes);
        expect(a.equals(b)).toBe(true);
      });
    },
  );
});
