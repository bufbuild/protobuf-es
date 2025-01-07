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

import { beforeEach, describe, expect, test } from "@jest/globals";
import assert from "node:assert";
import {
  create,
  equals,
  type Message,
  type DescMessage,
  createRegistry,
  type Registry,
  setExtension,
  type UnknownField,
} from "@bufbuild/protobuf";
import { reflect } from "@bufbuild/protobuf/reflect";
import { WireType } from "@bufbuild/protobuf/wire";
import { type Any, anyPack, AnySchema } from "@bufbuild/protobuf/wkt";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pb.js";
import * as test_messages_proto3 from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import * as extensions_proto2 from "./gen/ts/extra/extensions-proto2_pb.js";
import { UserSchema } from "./gen/ts/extra/example_pb.js";
import { fillProto3Message } from "./helpers-proto3.js";
import { fillProto2Message } from "./helpers-proto2.js";
import { fillEdition2023Message } from "./helpers-edition2023.js";

describe("equals()", () => {
  test("same messages are equal", () => {
    const a = create(proto3_ts.Proto3MessageSchema);
    const b = a;
    expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(true);
  });
  test.each([
    proto3_ts.Proto3MessageSchema,
    proto2_ts.Proto2MessageSchema,
    edition2023_ts.Edition2023MessageSchema,
  ])("equal zero messages are equal $typeName", (desc) => {
    const a = create(desc);
    const b = create(desc);
    expect(equals(desc, a, b)).toBe(true);
  });
  test("equal proto3 messages are equal", () => {
    const a = fillProto3Message(create(proto3_ts.Proto3MessageSchema));
    const b = fillProto3Message(create(proto3_ts.Proto3MessageSchema));
    expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(true);
  });
  test("equal proto2 messages are equal", () => {
    const a = fillProto2Message(create(proto2_ts.Proto2MessageSchema));
    const b = fillProto2Message(create(proto2_ts.Proto2MessageSchema));
    expect(equals(proto2_ts.Proto2MessageSchema, a, b)).toBe(true);
  });
  test("equal edition2023 messages are equal", () => {
    const a = fillEdition2023Message(
      create(edition2023_ts.Edition2023MessageSchema),
    );
    const b = fillEdition2023Message(
      create(edition2023_ts.Edition2023MessageSchema),
    );
    expect(equals(edition2023_ts.Edition2023MessageSchema, a, b)).toBe(true);
  });
  test("different message types are not equal", () => {
    const a = create(proto3_ts.Proto3MessageSchema);
    const b = create(UserSchema);
    expect(equals(proto3_ts.Proto3MessageSchema as DescMessage, a, b)).toBe(
      false,
    );
    expect(equals(proto3_ts.Proto3MessageSchema as DescMessage, b, b)).toBe(
      false,
    );
  });
  test("accepts anonymous messages", () => {
    const desc: DescMessage = proto3_ts.Proto3MessageSchema;
    const a: Message = create(proto3_ts.Proto3MessageSchema);
    const b: Message = create(proto3_ts.Proto3MessageSchema);
    expect(equals(desc, a, b)).toBe(true);
  });
  test("NaN does not equal NaN", () => {
    const a = create(proto3_ts.Proto3MessageSchema);
    a.singularFloatField = Number.NaN;
    const b = create(proto3_ts.Proto3MessageSchema);
    b.singularFloatField = Number.NaN;
    expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
  });
  test("extensions and unknown fields are disregarded", () => {
    const a = create(proto3_ts.Proto3MessageSchema);
    a.$unknown = [
      { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
    ];
    const b = create(proto3_ts.Proto3MessageSchema);
    expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(true);
  });
  test("set proto2 field is not equal unset field", () => {
    const a = create(proto2_ts.Proto2MessageSchema);
    const b = create(proto2_ts.Proto2MessageSchema);
    b.optionalStringField = "";
    expect(equals(proto2_ts.Proto2MessageSchema, a, b)).toBe(false);
  });
  describe("set proto3 field is not equal unset field", () => {
    const desc = proto3_ts.Proto3MessageSchema;
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
    const desc = edition2023_ts.Edition2023MessageSchema;
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
      a = fillProto3Message(create(proto3_ts.Proto3MessageSchema));
      b = fillProto3Message(create(proto3_ts.Proto3MessageSchema));
    });
    test("singularStringField is not equal", () => {
      b.singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
    test("singularBytesField is not equal", () => {
      b.singularBytesField[0] = 0x01;
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
    test("optionalStringField is not equal", () => {
      b.optionalStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
    test("repeatedStringField is not equal", () => {
      b.repeatedStringField.push("modified");
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
    test("oneof is not equal", () => {
      b.either = { case: "oneofInt32Field", value: 123 };
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
    test("singularMessageField is not equal", () => {
      assert(b.singularMessageField);
      b.singularMessageField.singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
    test("mapStringStringField is not equal", () => {
      b.mapStringStringField["modified"] = "modified";
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
    test("mapInt32MessageField is not equal", () => {
      b.mapInt32MessageField[123].singularStringField = "modified";
      expect(equals(proto3_ts.Proto3MessageSchema, a, b)).toBe(false);
    });
  });

  describe("with extensions enabled", () => {
    const schema = extensions_proto2.Proto2ExtendeeSchema;
    const ext = extensions_proto2.uint32_ext;
    function unknownEq(
      msgA: extensions_proto2.Proto2Extendee,
      msgB: extensions_proto2.Proto2Extendee,
      registry: Registry,
    ) {
      return equals(schema, msgA, msgB, {
        registry,
        extensions: true,
      });
    }
    test("same extensions are equal", () => {
      const a = create(schema, {});
      setExtension(a, ext, 123);
      const b = create(schema, {});
      setExtension(b, ext, 123);
      const reg = createRegistry(ext);
      expect(unknownEq(a, b, reg)).toBe(true);
    });
    test("different extension values are equal", () => {
      const a = create(schema, {});
      setExtension(a, ext, 123);
      const b = create(schema, {});
      setExtension(b, ext, 456);
      const reg = createRegistry(ext);
      expect(unknownEq(a, b, reg)).toBe(false);
    });
    test("unset extension value is not equal set extension value", () => {
      const a = create(schema, {});
      setExtension(a, ext, 123);
      const b = create(schema, {});
      const reg = createRegistry(ext);
      expect(unknownEq(a, b, reg)).toBe(false);
    });
    test("compares extension value instead of unknown field", () => {
      const a = create(schema, {});
      setExtension(a, ext, 123);
      const b = create(schema, {});
      b.$unknown = [...(a.$unknown ?? []), ...(a.$unknown ?? [])];
      const reg = createRegistry(ext);
      expect(unknownEq(a, b, reg)).toBe(true);
    });
  });

  describe("with unknown enabled", () => {
    function unknownEq(
      unknownA: UnknownField[] | undefined,
      unknownB: UnknownField[] | undefined,
    ) {
      const a = create(UserSchema, {});
      a.$unknown = unknownA;
      const b = create(UserSchema, {});
      b.$unknown = unknownB;
      return equals(UserSchema, a, b, {
        registry: createRegistry(),
        unknown: true,
        extensions: false,
      });
    }
    test("same unknown fields are equal", () => {
      const a = [
        { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
      ];
      const b = [
        { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
      ];
      expect(unknownEq(a, b)).toBe(true);
    });
    test("different unknown fields are not equal", () => {
      const a = [
        { no: 10100, wireType: WireType.Varint, data: new Uint8Array([0]) },
      ];
      const b = [
        {
          no: 10100,
          wireType: WireType.LengthDelimited,
          data: new Uint8Array([0]),
        },
      ];
      expect(unknownEq(a, b)).toBe(false);
    });
  });

  describe("with unpackAny enabled", () => {
    function anyEq(anyA: Any, anyB: Any, registry: Registry) {
      const hostSchema = test_messages_proto3.TestAllTypesProto3Schema;
      const hostA = create(hostSchema, {
        optionalAny: anyA,
      });
      const hostB = create(hostSchema, {
        optionalAny: anyB,
      });
      return equals(hostSchema, hostA, hostB, {
        registry,
        unpackAny: true,
      });
    }
    test("equal packed Any are equal", () => {
      const reg = createRegistry(UserSchema);
      const a = anyPack(UserSchema, create(UserSchema, { active: true }));
      const b = anyPack(UserSchema, create(UserSchema, { active: true }));
      expect(anyEq(a, b, reg)).toBe(true);
    });
    test("different packed Any are not equal", () => {
      const reg = createRegistry(UserSchema);
      const a = anyPack(UserSchema, create(UserSchema, { active: true }));
      const b = anyPack(UserSchema, create(UserSchema, { active: false }));
      expect(anyEq(a, b, reg)).toBe(false);
    });
    test("requires Any.typeUrl to be exactly the same", () => {
      const reg = createRegistry(UserSchema);
      const a = anyPack(UserSchema, create(UserSchema, { active: true }));
      a.typeUrl = `type.googleapis.com/${UserSchema.typeName}`;
      const b = anyPack(UserSchema, create(UserSchema, { active: true }));
      b.typeUrl = `example.com/${UserSchema.typeName}`;
      expect(anyEq(a, b, reg)).toBe(false);
    });
    test("compares unpacked instead of Any.value bytes", () => {
      const reg = createRegistry(UserSchema);
      const a = anyPack(
        UserSchema,
        create(UserSchema, {
          active: true,
        }),
      );
      const b = anyPack(
        UserSchema,
        create(UserSchema, {
          active: true,
        }),
      );
      b.value = new Uint8Array(a.value.byteLength * 2);
      b.value.set(a.value, 0);
      b.value.set(a.value, a.value.byteLength);
      expect(a.value).not.toStrictEqual(b.value);
      expect(anyEq(a, b, reg)).toBe(true);
    });
    test("compares Any.value bytes if message not in registry", () => {
      const reg = createRegistry();
      const a = anyPack(
        UserSchema,
        create(UserSchema, {
          active: true,
        }),
      );
      const b = anyPack(
        UserSchema,
        create(UserSchema, {
          active: true,
        }),
      );
      b.value = new Uint8Array(a.value.byteLength * 2);
      b.value.set(a.value, 0);
      b.value.set(a.value, a.value.byteLength);
      expect(a.value).not.toStrictEqual(b.value);
      expect(anyEq(a, b, reg)).toBe(false);
    });
    test("Any in Any", () => {
      const reg = createRegistry(UserSchema, AnySchema);
      const a = anyPack(
        AnySchema,
        anyPack(UserSchema, create(UserSchema, { active: true })),
      );
      const b = anyPack(
        AnySchema,
        anyPack(UserSchema, create(UserSchema, { active: true })),
      );
      b.value = new Uint8Array(a.value.byteLength * 2);
      b.value.set(a.value, 0);
      b.value.set(a.value, a.value.byteLength);
      expect(anyEq(a, b, reg)).toBe(true);
    });
  });
});
