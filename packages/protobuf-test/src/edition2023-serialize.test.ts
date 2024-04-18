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

import { fillEdition2023Message } from "./helpers-edition2023.js";
import { describe, expect, test } from "@jest/globals";
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
import { Edition2023MapEncodingMessageDesc } from "./gen/ts/extra/edition2023-map-encoding_pb.js";
import { BinaryReader, BinaryWriter, WireType } from "@bufbuild/protobuf/wire";

describe("edition2023 serialization", () => {
  test("should round-trip for binary", () => {
    const desc = edition2023_ts.Edition2023MessageDesc;
    const a = fillEdition2023Message(create(desc));
    const bytes = toBinary(desc, a);
    const b = fromBinary(desc, bytes);
    expect(a).toStrictEqual(b);
  });
  test("should round-trip for json", () => {
    const desc = edition2023_ts.Edition2023MessageDesc;
    const a = fillEdition2023Message(create(desc));
    const json = toJson(desc, a);
    const b = fromJson(desc, json);
    expect(a).toStrictEqual(b);
  });
  describe("proto2 / edition2023 interop", () => {
    test("to binary", () => {
      const descProto2 = edition2023_proto2_ts.Proto2MessageForEdition2023Desc;
      const msgProto2 = fillProto2Message(create(descProto2));
      const descEdition = edition2023_ts.Edition2023FromProto2MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(toBinary(descEdition, msgEdition)).toStrictEqual(
        toBinary(descProto2, msgProto2),
      );
    });
    test("to json", () => {
      const descProto2 = edition2023_proto2_ts.Proto2MessageForEdition2023Desc;
      const msgProto2 = fillProto2Message(create(descProto2));
      const descEdition = edition2023_ts.Edition2023FromProto2MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(
        toJson(descEdition, msgEdition, {
          enumAsInteger: true,
        }),
      ).toStrictEqual(
        toJson(descProto2, msgProto2, {
          enumAsInteger: true,
        }),
      );
    });
    test("from binary", () => {
      const descProto2 = edition2023_proto2_ts.Proto2MessageForEdition2023Desc;
      const msgProto2 = fillProto2Message(create(descProto2));
      const bytesProto2 = toBinary(descProto2, msgProto2);
      const descEdition = edition2023_ts.Edition2023FromProto2MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(fromBinary(descEdition, bytesProto2)).toStrictEqual(msgEdition);
    });
    test("from json", () => {
      const descProto2 = edition2023_proto2_ts.Proto2MessageForEdition2023Desc;
      const msgProto2 = fillProto2Message(create(descProto2));
      const jsonProto2 = toJson(descProto2, msgProto2, {
        enumAsInteger: true,
      });
      const descEdition = edition2023_ts.Edition2023FromProto2MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(fromJson(descEdition, jsonProto2)).toStrictEqual(msgEdition);
    });

    function fillEditionMessage(
      msg: edition2023_ts.Edition2023FromProto2Message,
    ) {
      msg.optionalBoolField = false;
      msg.optionalClosedEnumField = edition2023_ts.Edition2023EnumClosed.A;
      msg.optionalStringFieldWithDefault = "";
      msg.optionalgroup = create(
        edition2023_ts.Edition2023FromProto2Message_OptionalGroupDesc,
        {
          int32Field: 123,
        },
      );
      msg.requiredBoolField = false;
      msg.requiredClosedEnumField = edition2023_ts.Edition2023EnumClosed.A;
      msg.requiredStringFieldWithDefault = "";
      msg.requiredgroup = create(
        edition2023_ts.Edition2023FromProto2Message_RequiredGroupDesc,
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
        edition2023_proto2_ts.Proto2MessageForEdition2023_OptionalGroupDesc,
        {
          int32Field: 123,
        },
      );
      msg.requiredBoolField = false;
      msg.requiredClosedEnumField =
        edition2023_proto2_ts.Proto2EnumForEdition2023.A;
      msg.requiredStringFieldWithDefault = "";
      msg.requiredgroup = create(
        edition2023_proto2_ts.Proto2MessageForEdition2023_RequiredGroupDesc,
        {
          int32Field: 123,
        },
      );
      msg.packedDoubleField = [1, 2, 3];
      msg.unpackedDoubleField = [4, 5, 6];
      return msg;
    }
  });
  describe("proto3 / edition2023 interop", () => {
    test("to binary", () => {
      const descProto3 = edition2023_proto3_ts.Proto3MessageForEdition2023Desc;
      const msgProto3 = fillProto3Message(create(descProto3));
      const descEdition = edition2023_ts.Edition2023FromProto3MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(toBinary(descEdition, msgEdition)).toStrictEqual(
        toBinary(descProto3, msgProto3),
      );
    });
    test("to json", () => {
      const descProto3 = edition2023_proto3_ts.Proto3MessageForEdition2023Desc;
      const msgProto3 = fillProto3Message(create(descProto3));
      const descEdition = edition2023_ts.Edition2023FromProto3MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(
        toJson(descEdition, msgEdition, {
          enumAsInteger: true,
        }),
      ).toStrictEqual(
        toJson(descProto3, msgProto3, {
          enumAsInteger: true,
        }),
      );
    });
    test("from binary", () => {
      const descProto3 = edition2023_proto3_ts.Proto3MessageForEdition2023Desc;
      const msgProto3 = fillProto3Message(create(descProto3));
      const bytesProto3 = toBinary(descProto3, msgProto3);
      const descEdition = edition2023_ts.Edition2023FromProto3MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(fromBinary(descEdition, bytesProto3)).toStrictEqual(msgEdition);
    });
    test("from json", () => {
      const descProto3 = edition2023_proto3_ts.Proto3MessageForEdition2023Desc;
      const msgProto3 = fillProto3Message(create(descProto3));
      const jsonProto3 = toJson(descProto3, msgProto3, {
        enumAsInteger: true,
      });
      const descEdition = edition2023_ts.Edition2023FromProto3MessageDesc;
      const msgEdition = fillEditionMessage(create(descEdition));
      expect(fromJson(descEdition, jsonProto3)).toStrictEqual(msgEdition);
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
  describe("message_encoding DELIMITED with maps", () => {
    test("should round-trip", () => {
      const a = create(Edition2023MapEncodingMessageDesc);
      a.mapField[123] = true;
      const bytes = toBinary(Edition2023MapEncodingMessageDesc, a);
      const b = fromBinary(Edition2023MapEncodingMessageDesc, bytes);
      expect(b).toStrictEqual(a);
    });
    test("should expect LENGTH_PREFIXED", () => {
      const w = new BinaryWriter();
      w.tag(77, WireType.LengthDelimited);
      w.uint32(4);
      w.tag(1, WireType.Varint).int32(123);
      w.tag(2, WireType.Varint).bool(true);
      const bytes = w.finish();
      const msg = fromBinary(Edition2023MapEncodingMessageDesc, bytes);
      expect(msg.mapField).toStrictEqual({
        123: true,
      });
    });
    test("should serialize LENGTH_PREFIXED", () => {
      const msg = create(Edition2023MapEncodingMessageDesc);
      msg.mapField[123] = true;
      const bytes = toBinary(Edition2023MapEncodingMessageDesc, msg);
      const r = new BinaryReader(bytes);
      {
        const [number, wireType] = r.tag();
        expect(number).toBe(77);
        expect(wireType).toBe(WireType.LengthDelimited);
        const length = r.uint32();
        expect(length).toBe(r.len - r.pos);
      }
      {
        const [number, wireType] = r.tag();
        expect(number).toBe(1);
        expect(wireType).toBe(WireType.Varint);
        expect(r.int32()).toBe(123);
      }
      {
        const [number, wireType] = r.tag();
        expect(number).toBe(2);
        expect(wireType).toBe(WireType.Varint);
        expect(r.bool()).toBe(true);
      }
      {
        expect(r.pos).toBe(r.len);
      }
    });
  });
});
