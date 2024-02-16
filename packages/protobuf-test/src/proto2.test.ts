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
import { describeMT } from "./helpers.js";
import { toPlainMessage } from "@bufbuild/protobuf";
import {
  BinaryReader,
  BinaryWriter,
  protoInt64,
  WireType,
  isFieldSet,
  clearField,
} from "@bufbuild/protobuf";
import { Proto2Enum } from "./gen/ts/extra/proto2_pb.js";

describe("proto2 required fields", () => {
  describeMT(
    { ts: TS.Proto2RequiredMessage, js: JS.Proto2RequiredMessage },
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
          expect(msg.enumField).toBe(1);
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
              enumField: Proto2Enum.YES,
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
              enumField: Proto2Enum.YES,
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
              enumField: Proto2Enum.YES,
              messageField: new messageType(),
            });
            clearField(msg, field);
            expect(isFieldSet(msg, field)).toBe(false);
          },
        );
      });
      describe("as plain object", () => {
        describe("toPlainMessage", () => {
          test("retains initial field values", () => {
            const plain = toPlainMessage(new messageType());
            expect(plain.stringField).toBe("");
            expect(plain.bytesField).toBeInstanceOf(Uint8Array);
            expect(plain.bytesField.length).toBe(0);
            expect(plain.int32Field).toBe(0);
            expect(plain.int64Field).toBe(protoInt64.zero);
            expect(plain.floatField).toBe(0);
            expect(plain.boolField).toBe(false);
            expect(plain.enumField).toBe(1);
            expect(plain.messageField).toBeUndefined();
          });
          test.each(messageType.fields.byNumber())(
            "field $name is an own property",
            (field) => {
              const msg = new messageType();
              expect(
                Object.prototype.hasOwnProperty.call(msg, field.localName),
              ).toBeFalsy();
            },
          );
        });
        describe("object spread", () => {
          test.each(messageType.fields.byNumber())(
            "elides prototype property $name",
            (field) => {
              const spread = { ...new messageType() };
              expect(spread[field.localName as keyof typeof spread]).toBe(
                undefined,
              );
              expect(
                Object.prototype.hasOwnProperty.call(spread, field.localName),
              ).toBeFalsy();
              expect(field.localName in spread).toBe(false);
            },
          );
        });
      });
      describe("parse", () => {
        describe("fromJson", () => {
          test("does not raise error with unset field", () => {
            const msg = messageType.fromJson({
              stringField: "",
            });
            expect(msg.enumField).toBeDefined();
            expect(isFieldSet(msg, "enumField")).toBeFalsy();
            expect(msg.stringField).toBeDefined();
            expect(isFieldSet(msg, "stringField")).toBeTruthy();
          });
        });
        describe("fromBinary", () => {
          test("does not raise error with unset field", () => {
            const bytes = new BinaryWriter()
              .tag(1, WireType.LengthDelimited)
              .string("")
              .finish();
            const msg = messageType.fromBinary(bytes);
            expect(msg.enumField).toBeDefined();
            expect(isFieldSet(msg, "enumField")).toBeFalsy();
            expect(msg.stringField).toBeDefined();
            expect(isFieldSet(msg, "stringField")).toBeTruthy();
          });
        });
      });
      describe("serialize", () => {
        const validMsg = new messageType({
          stringField: "",
          bytesField: new Uint8Array(0),
          int32Field: 0,
          int64Field: protoInt64.zero,
          floatField: 0,
          boolField: false,
          enumField: TS.Proto2Enum.YES,
          messageField: {},
        });
        describe("toJson", () => {
          test("does not raise error with set fields", () => {
            const json = validMsg.toJson();
            expect(json).toBeDefined();
          });
          test.each(messageType.fields.byNumber())(
            "raises error with unset field $name",
            (field) => {
              const invalidMsg = validMsg.clone();
              clearField(invalidMsg, field);
              expect(() => invalidMsg.toJson()).toThrow(
                `cannot encode field ${messageType.typeName}.${field.name} to JSON: required field not set`,
              );
            },
          );
        });
        describe("toBinary", () => {
          test("does not raise error with set fields", () => {
            const json = validMsg.toBinary();
            expect(json).toBeDefined();
          });
          test.each(messageType.fields.byNumber())(
            "raises error with unset field $name",
            (field) => {
              const invalidMsg = validMsg.clone();
              clearField(invalidMsg, field);
              expect(() => invalidMsg.toBinary()).toThrow(
                `cannot encode field ${messageType.typeName}.${field.name} to binary: required field not set`,
              );
            },
          );
        });
      });
    },
  );

  describe("with default values", () => {
    describeMT(
      {
        ts: TS.Proto2RequiredDefaultsMessage,
        js: JS.Proto2RequiredDefaultsMessage,
      },
      (messageType) => {
        describe("initially", () => {
          test("has expected properties", () => {
            const msg = new messageType();
            expect(msg.stringField).toBe('hello " */ ');
            expect(msg.bytesField).toBeInstanceOf(Uint8Array);
            expect(msg.bytesField.length).toBe(17);
            expect(msg.int32Field).toBe(128);
            expect(msg.int64Field).toBe(protoInt64.parse(-256));
            expect(msg.floatField).toBe(-512.13);
            expect(msg.boolField).toBe(true);
            expect(msg.enumField).toBe(TS.Proto2Enum.YES);
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
        describe("serialize", () => {
          const validMsg = new messageType({
            stringField: "",
            bytesField: new Uint8Array(0),
            int32Field: 0,
            int64Field: protoInt64.zero,
            floatField: 0,
            boolField: false,
            enumField: TS.Proto2Enum.YES,
            messageField: {},
          });
          describe("toJson", () => {
            test("does not raise error with set fields", () => {
              const json = validMsg.toJson();
              expect(json).toBeDefined();
            });
            test.each(messageType.fields.byNumber())(
              "raises error with unset field $name",
              (field) => {
                const invalidMsg = validMsg.clone();
                clearField(invalidMsg, field);
                expect(() => invalidMsg.toJson()).toThrow(
                  `cannot encode field ${messageType.typeName}.${field.name} to JSON: required field not set`,
                );
              },
            );
          });
          describe("toBinary", () => {
            test("does not raise error with set fields", () => {
              const json = validMsg.toBinary();
              expect(json).toBeDefined();
            });
            test.each(messageType.fields.byNumber())(
              "raises error with unset field $name",
              (field) => {
                const invalidMsg = validMsg.clone();
                clearField(invalidMsg, field);
                expect(() => invalidMsg.toBinary()).toThrow(
                  `cannot encode field ${messageType.typeName}.${field.name} to binary: required field not set`,
                );
              },
            );
          });
        });
      },
    );
  });
});

describe("proto2 optional fields", () => {
  describeMT(
    { ts: TS.Proto2OptionalMessage, js: JS.Proto2OptionalMessage },
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
              enumField: Proto2Enum.YES,
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
              enumField: Proto2Enum.YES,
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
              enumField: Proto2Enum.YES,
              messageField: new messageType(),
            });
            clearField(msg, field);
            expect(isFieldSet(msg, field)).toBe(false);
          },
        );
      });
    },
  );

  describe("with default values", () => {
    describeMT(
      { ts: TS.Proto2DefaultsMessage, js: JS.Proto2DefaultsMessage },
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
              expect(isFieldSet(msg, field)).toBe(false);
              expect(
                Object.prototype.hasOwnProperty.call(msg, field.localName),
              ).toBe(false);
            },
          );
        });
      },
    );
  });
});

describe("proto2 field info", () => {
  describe("packed", () => {
    describeMT(
      { ts: TS.Proto2PackedMessage, js: JS.Proto2PackedMessage },
      (messageType) => {
        test.each(messageType.fields.byNumber())("$name is packed", (field) => {
          expect(field.packed).toBe(true);
          expect(field.repeated).toBe(true);
        });
      },
    );
    describeMT(
      { ts: TS.Proto2UnpackedMessage, js: JS.Proto2UnpackedMessage },
      (messageType) => {
        test.each(messageType.fields.byNumber())(
          "$name is unpacked",
          (field) => {
            expect(field.packed).toBe(false);
            expect(field.repeated).toBe(true);
          },
        );
      },
    );
    describeMT(
      {
        ts: TS.Proto2UnspecifiedPackedMessage,
        js: JS.Proto2UnspecifiedPackedMessage,
      },
      (messageType) => {
        test.each(messageType.fields.byNumber())(
          "$name is unpacked",
          (field) => {
            expect(field.packed).toBe(false);
            expect(field.repeated).toBe(true);
          },
        );
      },
    );
  });

  describe("default", () => {
    describeMT(
      { ts: TS.Proto2DefaultsMessage, js: JS.Proto2DefaultsMessage },
      (messageType) => {
        test("", () => {
          expect(messageType.fields.findJsonName("stringField")?.default).toBe(
            `hello " */ `,
          );
          expect(
            messageType.fields.findJsonName("bytesField")?.default,
          ).toStrictEqual(
            new Uint8Array([
              0x00, 0x78, 0x5c, 0x78, 0x78, 0x41, 0x41, 0x41, 0x41, 0x41, 0x41,
              0x08, 0x0c, 0x0a, 0x0d, 0x09, 0x0b,
            ]),
          );
          expect(messageType.fields.findJsonName("int32Field")?.default).toBe(
            128,
          );
          expect(messageType.fields.findJsonName("int64Field")?.default).toBe(
            protoInt64.parse("-256"),
          );
          expect(messageType.fields.findJsonName("floatField")?.default).toBe(
            -512.13,
          );
          expect(messageType.fields.findJsonName("enumField")?.default).toBe(
            TS.Proto2Enum.YES,
          );
        });
      },
    );
  });

  describe("optional / required", () => {
    describeMT(
      { ts: TS.Proto2RequiredMessage, js: JS.Proto2RequiredMessage },
      (messageType) => {
        test.each(messageType.fields.byNumber())(
          "$name is required",
          (field) => {
            expect(field.req).toBe(true);
            expect(field.opt).toBe(false);
          },
        );
      },
    );
    describeMT(
      { ts: TS.Proto2OptionalMessage, js: JS.Proto2OptionalMessage },
      (messageType) => {
        test.each(messageType.fields.byNumber())(
          "$name is optional",
          (field) => {
            expect(field.req).toBe(false);
            expect(field.opt).toBe(true);
          },
        );
      },
    );
  });
});

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
