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
import { BinaryWriter, WireType } from "@bufbuild/protobuf/wire";
import { fromBinary, isFieldSet } from "@bufbuild/protobuf";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import * as proto2_ts from "./gen/ts/extra/proto2_pb.js";

void suite("open enum", () => {
  test("from binary sets foreign value", () => {
    assert.strictEqual(proto3_ts.Proto3EnumSchema.open, true);
    const foreignValue = 4;
    assert.strictEqual(proto3_ts.Proto3Enum[foreignValue], undefined);
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
    assert.strictEqual(set, true);
    assert.strictEqual(msg.singularEnumField, foreignValue);
    assert.strictEqual(msg.$unknown, undefined);
  });
});

void suite("closed enum", () => {
  test("from binary sets foreign value as unknown field", () => {
    assert.strictEqual(proto2_ts.Proto2EnumSchema.open, false);
    const foreignValue = 4;
    assert.strictEqual(proto2_ts.Proto2Enum[foreignValue], undefined);
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
    assert.strictEqual(set, false);
    assert.strictEqual(msg.optionalEnumField, proto2_ts.Proto2Enum.YES);
    assert.ok(msg.$unknown !== undefined);
    assert.strictEqual(msg.$unknown?.length, 1);
    assert.strictEqual(msg.$unknown?.[0].no,
      proto2_ts.Proto2MessageSchema.field.optionalEnumField.number,
    );
    assert.strictEqual(msg.$unknown?.[0].wireType, WireType.Varint);
    assert.deepStrictEqual(msg.$unknown?.[0].data,
      new BinaryWriter().int32(foreignValue).finish(),
    );
  });
});
