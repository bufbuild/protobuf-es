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

import { describe, expect, test } from "@jest/globals";
import { BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import { fromBinary, isFieldSet } from "@bufbuild/protobuf";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";

describe("open enum", () => {
  test("from binary sets foreign value", () => {
    expect(proto3_ts.Proto3EnumSchema.open).toBe(true);
    const foreignValue = 4;
    expect(proto3_ts.Proto3Enum[foreignValue]).toBeUndefined();
    const bytes = new BinaryWriter()
      .tag(
        proto3_ts.Proto3MessageSchema.field.singularEnumField.number,
        WireType.Varint,
      )
      .int32(foreignValue)
      .finish();
    const msg = fromBinary(proto3_ts.Proto3MessageSchema, bytes);
    const set = isFieldSet(
      msg,
      proto3_ts.Proto3MessageSchema.field.singularEnumField,
    );
    expect(set).toBe(true);
    expect(msg.singularEnumField).toBe(foreignValue);
    expect(msg.$unknown).toBeUndefined();
  });
});

describe("closed enum", () => {
  test("from binary sets foreign value as unknown field", () => {
    expect(proto2_ts.Proto2EnumSchema.open).toBe(false);
    const foreignValue = 4;
    expect(proto2_ts.Proto2Enum[foreignValue]).toBeUndefined();
    const bytes = new BinaryWriter()
      .tag(
        proto2_ts.Proto2MessageSchema.field.optionalEnumField.number,
        WireType.Varint,
      )
      .int32(foreignValue)
      .finish();
    const msg = fromBinary(proto2_ts.Proto2MessageSchema, bytes);
    const set = isFieldSet(
      msg,
      proto2_ts.Proto2MessageSchema.field.optionalEnumField,
    );
    expect(set).toBe(false);
    expect(msg.optionalEnumField).toBe(proto2_ts.Proto2Enum.YES);
    expect(msg.$unknown).toBeDefined();
    expect(msg.$unknown?.length).toBe(1);
    expect(msg.$unknown?.[0].no).toBe(
      proto2_ts.Proto2MessageSchema.field.optionalEnumField.number,
    );
    expect(msg.$unknown?.[0].wireType).toBe(WireType.Varint);
    expect(msg.$unknown?.[0].data).toStrictEqual(
      new BinaryWriter().int32(foreignValue).finish(),
    );
  });
});
