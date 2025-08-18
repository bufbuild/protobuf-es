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
import { create, merge } from "@bufbuild/protobuf";
import * as proto3_ts from "./gen/ts/extra/proto3_pb.js";
import { WireType } from "@bufbuild/protobuf/wire";

void suite("merge()", () => {
  void test("sets scalar field in target, replacing existing fields", () => {
    const target = create(proto3_ts.Proto3MessageSchema, {
      singularMessageField: {
        singularStringField: "old",
        singularBytesField: new Uint8Array([0xff, 0xff]),
        optionalStringField: "old",
        singularEnumField: proto3_ts.Proto3Enum.NO,
      },
    });
    const source = create(proto3_ts.Proto3MessageSchema, {
      singularStringField: "abc",
      singularBytesField: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
      optionalStringField: "abc",
      singularEnumField: proto3_ts.Proto3Enum.YES,
      singularMessageField: {
        singularStringField: "abc",
        singularBytesField: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        optionalStringField: "abc",
        singularEnumField: proto3_ts.Proto3Enum.YES,
      },
    });
    merge(proto3_ts.Proto3MessageSchema, target, source);
    // sets scalar field in target
    assert.strictEqual(target.singularStringField, "abc");
    assert.strictEqual(target.optionalStringField, "abc");
    assert.strictEqual(target.singularBytesField, source.singularBytesField); // bytes field is copied by reference
    assert.strictEqual(target.singularEnumField, proto3_ts.Proto3Enum.YES);
    // replaces existing fields
    assert.strictEqual(target.singularMessageField?.singularStringField, "abc");
    assert.strictEqual(target.singularMessageField?.optionalStringField, "abc");
    assert.strictEqual(target.singularMessageField?.singularBytesField,
      source.singularMessageField?.singularBytesField,
    ); // bytes field is copied by reference
    assert.strictEqual(target.singularMessageField?.singularEnumField,
      proto3_ts.Proto3Enum.YES,
    );
  });
  void test("sets map values in target", () => {
    const target = create(proto3_ts.Proto3MessageSchema, {
      mapStringStringField: {
        a: "A",
        b: "B",
      },
    });
    const source = create(proto3_ts.Proto3MessageSchema, {
      mapStringStringField: {
        b: "beta",
        c: "C",
      },
    });
    merge(proto3_ts.Proto3MessageSchema, target, source);
    assert.deepStrictEqual(target.mapStringStringField, {
      a: "A",
      b: "beta",
      c: "C",
    });
  });
  test("adds repeated items in target", () => {
    const target = create(proto3_ts.Proto3MessageSchema, {
      repeatedStringField: ["a", "b"],
    });
    const source = create(proto3_ts.Proto3MessageSchema, {
      repeatedStringField: ["c"],
      repeatedInt32Field: [1, 2],
    });
    merge(proto3_ts.Proto3MessageSchema, target, source);
    assert.deepStrictEqual(target.repeatedStringField, ["a", "b", "c"]);
    assert.deepStrictEqual(target.repeatedInt32Field, [1, 2]);
  });
  test("merges message field with field in target", () => {
    const target = create(proto3_ts.Proto3MessageSchema, {
      singularMessageField: {
        singularStringField: "abc",
        repeatedInt32Field: [1],
      },
    });
    const source = create(proto3_ts.Proto3MessageSchema, {
      singularMessageField: {
        singularStringField: "DEF",
        repeatedInt32Field: [2],
      },
      optionalMessageField: {
        singularStringField: "foo",
      },
    });
    const targetSingularMessageField = target.singularMessageField;
    merge(proto3_ts.Proto3MessageSchema, target, source);
    assert.strictEqual(target.optionalMessageField, source.optionalMessageField); // message field is copied by reference
    assert.notStrictEqual(target.singularMessageField, source.singularMessageField);
    assert.strictEqual(target.singularMessageField, targetSingularMessageField); // target message field reference is maintained
    assert.strictEqual(target.singularMessageField?.singularStringField, "DEF");
    assert.deepStrictEqual(target.singularMessageField?.repeatedInt32Field, [
      1, 2,
    ]);
  });
  test("adds unknown fields to target", () => {
    const target = create(proto3_ts.Proto3MessageSchema);
    target.$unknown = [
      {
        no: 98,
        wireType: WireType.Varint,
        data: new Uint8Array([0xaa]),
      },
    ];
    const source = create(proto3_ts.Proto3MessageSchema);
    source.$unknown = [
      {
        no: 99,
        wireType: WireType.Varint,
        data: new Uint8Array([0xbb]),
      },
    ];
    merge(proto3_ts.Proto3MessageSchema, target, source);
    assert.deepStrictEqual(target.$unknown, [
      {
        no: 98,
        wireType: WireType.Varint,
        data: new Uint8Array([0xaa]),
      },
      {
        no: 99,
        wireType: WireType.Varint,
        data: new Uint8Array([0xbb]),
      },
    ]);
  });
});
