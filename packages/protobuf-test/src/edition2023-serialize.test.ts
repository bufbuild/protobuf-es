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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import { fillEdition2023Message } from "./helpers-edition2023.js";
import {
  create,
  fromBinary,
  fromJson,
  toBinary,
  toJson,
} from "@bufbuild/protobuf";
import * as edition2023_ts from "./gen/ts/extra/edition2023_pb.js";
import * as edition2023_proto2_ts from "./gen/ts/extra/edition2023-proto2_pb.js";
import * as edition2023_proto3_ts from "./gen/ts/extra/edition2023-proto3_pb.js";
import {
  Edition2023MapEncodingMessage_ChildSchema,
  Edition2023MapEncodingMessageSchema,
} from "./gen/ts/extra/edition2023-map-encoding_pb.js";
import { BinaryReader, BinaryWriter, WireType } from "@bufbuild/protobuf/wire";

void suite("edition2023 serialization", () => {
  test("should round-trip for binary", () => {
    const desc = edition2023_ts.Edition2023MessageSchema;
    const a = fillEdition2023Message(create(desc));
    const bytes = toBinary(desc, a);
    const b = fromBinary(desc, bytes);
    assert.deepStrictEqual(a, b);
  });
  test("should round-trip for json", () => {
    const desc = edition2023_ts.Edition2023MessageSchema;
    const a = fillEdition2023Message(create(desc));
    const json = toJson(desc, a);
    const b = fromJson(desc, json);
    assert.deepStrictEqual(a, b);
  });
  void suite("proto2 / edition2023 interop", () => {
    test("to binary", () => {
      const descProto2 =
        edition2023_proto2_ts.Proto2MessageForEdition2023Schema;
      const msgProto2 = fillProto2Message(create(descProto2));
      const descEdition = edition2023_ts.Edition2023FromProto2MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(toBinary(descEdition, msgEdition),
        toBinary(descProto2, msgProto2),
      );
    });
    test("to json", () => {
      const descProto2 =
        edition2023_proto2_ts.Proto2MessageForEdition2023Schema;
      const msgProto2 = fillProto2Message(create(descProto2));
      const descEdition = edition2023_ts.Edition2023FromProto2MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(
        toJson(descEdition, msgEdition, {
          enumAsInteger: true,
        }),
        toJson(descProto2, msgProto2, {
          enumAsInteger: true,
        }),
      );
    });
    test("from binary", () => {
      const descProto2 =
        edition2023_proto2_ts.Proto2MessageForEdition2023Schema;
      const msgProto2 = fillProto2Message(create(descProto2));
      const bytesProto2 = toBinary(descProto2, msgProto2);
      const descEdition = edition2023_ts.Edition2023FromProto2MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(fromBinary(descEdition, bytesProto2), msgEdition);
    });
    test("from json", () => {
      const descProto2 =
        edition2023_proto2_ts.Proto2MessageForEdition2023Schema;
      const msgProto2 = fillProto2Message(create(descProto2));
      const jsonProto2 = toJson(descProto2, msgProto2, {
        enumAsInteger: true,
      });
      const descEdition = edition2023_ts.Edition2023FromProto2MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(fromJson(descEdition, jsonProto2), msgEdition);
    });

    function fillEditionMessage(
      msg: edition2023_ts.Edition2023FromProto2Message,
    ) {
      msg.optionalBoolField = false;
      msg.optionalClosedEnumField = edition2023_ts.Edition2023EnumClosed.A;
      msg.optionalStringFieldWithDefault = "";
      msg.optionalgroup = create(
        edition2023_ts.Edition2023FromProto2Message_OptionalGroupSchema,
        {
          int32Field: 123,
        },
      );
      msg.requiredBoolField = false;
      msg.requiredClosedEnumField = edition2023_ts.Edition2023EnumClosed.A;
      msg.requiredStringFieldWithDefault = "";
      msg.requiredgroup = create(
        edition2023_ts.Edition2023FromProto2Message_RequiredGroupSchema,
        {
          int32Field: 123,
        },
      );
      msg.packedDoubleField = [1, 2, 3];
      msg.unpackedDoubleField = [4, 5, 6];
      return msg;
    }

    function fillProto2Message(
      msg: edition2023_proto2_ts.Proto2MessageForEdition2023,
    ) {
      msg.optionalBoolField = false;
      msg.optionalClosedEnumField =
        edition2023_proto2_ts.Proto2EnumForEdition2023.A;
      msg.optionalStringFieldWithDefault = "";
      msg.optionalgroup = create(
        edition2023_proto2_ts.Proto2MessageForEdition2023_OptionalGroupSchema,
        {
          int32Field: 123,
        },
      );
      msg.requiredBoolField = false;
      msg.requiredClosedEnumField =
        edition2023_proto2_ts.Proto2EnumForEdition2023.A;
      msg.requiredStringFieldWithDefault = "";
      msg.requiredgroup = create(
        edition2023_proto2_ts.Proto2MessageForEdition2023_RequiredGroupSchema,
        {
          int32Field: 123,
        },
      );
      msg.packedDoubleField = [1, 2, 3];
      msg.unpackedDoubleField = [4, 5, 6];
      return msg;
    }
  });
  void suite("proto3 / edition2023 interop", () => {
    test("to binary", () => {
      const descProto3 =
        edition2023_proto3_ts.Proto3MessageForEdition2023Schema;
      const msgProto3 = fillProto3Message(create(descProto3));
      const descEdition = edition2023_ts.Edition2023FromProto3MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(toBinary(descEdition, msgEdition),
        toBinary(descProto3, msgProto3),
      );
    });
    test("to json", () => {
      const descProto3 =
        edition2023_proto3_ts.Proto3MessageForEdition2023Schema;
      const msgProto3 = fillProto3Message(create(descProto3));
      const descEdition = edition2023_ts.Edition2023FromProto3MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(
        toJson(descEdition, msgEdition, {
          enumAsInteger: true,
        }),
        toJson(descProto3, msgProto3, {
          enumAsInteger: true,
        }),
      );
    });
    test("from binary", () => {
      const descProto3 =
        edition2023_proto3_ts.Proto3MessageForEdition2023Schema;
      const msgProto3 = fillProto3Message(create(descProto3));
      const bytesProto3 = toBinary(descProto3, msgProto3);
      const descEdition = edition2023_ts.Edition2023FromProto3MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(fromBinary(descEdition, bytesProto3), msgEdition);
    });
    test("from json", () => {
      const descProto3 =
        edition2023_proto3_ts.Proto3MessageForEdition2023Schema;
      const msgProto3 = fillProto3Message(create(descProto3));
      const jsonProto3 = toJson(descProto3, msgProto3, {
        enumAsInteger: true,
      });
      const descEdition = edition2023_ts.Edition2023FromProto3MessageSchema;
      const msgEdition = fillEditionMessage(create(descEdition));
      assert.deepStrictEqual(fromJson(descEdition, jsonProto3), msgEdition);
    });

    function fillEditionMessage(
      msg: edition2023_ts.Edition2023FromProto3Message,
    ) {
      msg.implicitBoolField = true;
      msg.implicitOpenEnumField = edition2023_ts.Edition2023EnumOpen.A;
      msg.explicitBoolField = false;
      msg.explicitOpenEnumField =
        edition2023_ts.Edition2023EnumOpen.UNSPECIFIED;
      msg.packedDoubleField = [1, 2, 3];
      msg.unpackedDoubleField = [4, 5, 6];
      return msg;
    }
    function fillProto3Message(
      msg: edition2023_proto3_ts.Proto3MessageForEdition2023,
    ) {
      msg.implicitBoolField = true;
      msg.implicitOpenEnumField =
        edition2023_proto3_ts.Proto3EnumForEdition2023.A;
      msg.explicitBoolField = false;
      msg.explicitOpenEnumField =
        edition2023_proto3_ts.Proto3EnumForEdition2023.UNSPECIFIED;
      msg.packedDoubleField = [1, 2, 3];
      msg.unpackedDoubleField = [4, 5, 6];
      return msg;
    }
  });
  void suite("message_encoding DELIMITED with maps", () => {
    test("should round-trip", () => {
      const a = create(Edition2023MapEncodingMessageSchema);
      a.stringMap[123] = "abc";
      const bytes = toBinary(Edition2023MapEncodingMessageSchema, a);
      const b = fromBinary(Edition2023MapEncodingMessageSchema, bytes);
      assert.deepStrictEqual(b, a);
    });
    test("should expect LENGTH_PREFIXED map entry", () => {
      const w = new BinaryWriter();
      w.tag(77, WireType.LengthDelimited);
      w.fork();
      w.tag(1, WireType.Varint).int32(123);
      w.tag(2, WireType.Varint).string("abc");
      w.join();
      const bytes = w.finish();
      const msg = fromBinary(Edition2023MapEncodingMessageSchema, bytes);
      assert.deepStrictEqual(msg.stringMap, {
        123: "abc",
      });
    });
    test("should expect LENGTH_PREFIXED map value message", () => {
      const w = new BinaryWriter();
      w.tag(88, WireType.LengthDelimited);
      w.fork();
      w.tag(1, WireType.Varint).int32(123);
      w.tag(2, WireType.LengthDelimited).fork().join();
      w.join();
      const bytes = w.finish();
      const msg = fromBinary(Edition2023MapEncodingMessageSchema, bytes);
      assert.deepStrictEqual(msg.messageMap, {
        123: create(Edition2023MapEncodingMessage_ChildSchema),
      });
    });
    test("should serialize map entry LENGTH_PREFIXED", () => {
      const msg = create(Edition2023MapEncodingMessageSchema);
      msg.stringMap[123] = "abc";
      const bytes = toBinary(Edition2023MapEncodingMessageSchema, msg);
      const r = new BinaryReader(bytes);
      {
        const [number, wireType] = r.tag();
        assert.strictEqual(number, 77);
        assert.strictEqual(wireType, WireType.LengthDelimited);
        const length = r.uint32();
        assert.strictEqual(length, r.len - r.pos);
      }
      {
        const [number] = r.tag();
        assert.strictEqual(number, 1);
        assert.strictEqual(r.int32(), 123);
      }
      {
        const [number] = r.tag();
        assert.strictEqual(number, 2);
        assert.strictEqual(r.string(), "abc");
      }
      assert.strictEqual(r.pos, r.len);
    });
    test("should serialize map value message LENGTH_PREFIXED", () => {
      const msg = create(Edition2023MapEncodingMessageSchema);
      msg.messageMap[123] = create(Edition2023MapEncodingMessage_ChildSchema);
      const bytes = toBinary(Edition2023MapEncodingMessageSchema, msg);
      const r = new BinaryReader(bytes);
      {
        const [number, wireType] = r.tag();
        assert.strictEqual(number, 88);
        assert.strictEqual(wireType, WireType.LengthDelimited);
        const length = r.uint32();
        assert.strictEqual(length, r.len - r.pos);
      }
      {
        const [number] = r.tag();
        assert.strictEqual(number, 1);
        assert.strictEqual(r.int32(), 123);
      }
      {
        const [number, wireType] = r.tag();
        assert.strictEqual(number, 2);
        assert.strictEqual(wireType, WireType.LengthDelimited);
        const length = r.uint32();
        assert.strictEqual(length, 0);
      }
      assert.strictEqual(r.pos, r.len);
    });
  });
});
