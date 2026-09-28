// Copyright 2021-2026 Buf Technologies, Inc.
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

import { suite, test, before } from "node:test";
import * as assert from "node:assert";
import {
  type DescEnum,
  type DescMessage,
  create,
  enumFromJson,
  enumToJson,
  fromJson,
  isEnumJson,
  toJson,
} from "@bufbuild/protobuf";
import { compileMessage } from "./helpers.js";

void suite("enum value option (pb.enumvalue.json).string", () => {
  const UNSPECIFIED = 0;
  const CUSTOM = 1;
  const EMPTY = 2;
  const DEFAULT = 3;
  let messageDesc: DescMessage;
  let enumDesc: DescEnum;
  before(async () => {
    messageDesc = await compileMessage(`
      edition = "2026";
      import "google/protobuf/json_enumvalue_options.proto";
      message M {
        E singular = 1;
        repeated E list = 2;
        map<string, E> map = 3;
      }
      enum E {
        E_UNSPECIFIED = 0;
        E_CUSTOM = 1 [(pb.enumvalue.json).string = "custom"];
        E_EMPTY = 2 [(pb.enumvalue.json).string = ""];
        E_DEFAULT = 3;
      }
    `);
    const field = messageDesc.fields[0];
    assert.ok(field.fieldKind == "enum");
    enumDesc = field.enum;
  });
  void suite("toJson()", () => {
    test("emits custom JSON names", () => {
      const msg = create(messageDesc, {
        singular: CUSTOM,
        list: [CUSTOM, EMPTY, DEFAULT],
        map: { a: CUSTOM, b: EMPTY, c: DEFAULT },
      });
      assert.deepStrictEqual(toJson(messageDesc, msg), {
        singular: "custom",
        list: ["custom", "", "E_DEFAULT"],
        map: { a: "custom", b: "", c: "E_DEFAULT" },
      });
    });
    test("emits numbers with enumAsInteger", () => {
      const msg = create(messageDesc, {
        singular: CUSTOM,
        list: [CUSTOM, EMPTY],
        map: { a: CUSTOM },
      });
      assert.deepStrictEqual(
        toJson(messageDesc, msg, { enumAsInteger: true }),
        { singular: 1, list: [1, 2], map: { a: 1 } },
      );
    });
  });
  void suite("fromJson()", () => {
    test("parses custom JSON names", () => {
      const msg = fromJson(messageDesc, {
        singular: "custom",
        list: ["custom", "", "E_DEFAULT"],
        map: { a: "custom", b: "", c: "E_DEFAULT" },
      });
      assert.deepStrictEqual(
        msg,
        create(messageDesc, {
          singular: CUSTOM,
          list: [CUSTOM, EMPTY, DEFAULT],
          map: { a: CUSTOM, b: EMPTY, c: DEFAULT },
        }),
      );
    });
    test("parses Protobuf names of values with custom JSON names", () => {
      const msg = fromJson(messageDesc, {
        singular: "E_CUSTOM",
        list: ["E_CUSTOM", "E_EMPTY"],
        map: { a: "E_CUSTOM", b: "E_EMPTY" },
      });
      assert.deepStrictEqual(
        msg,
        create(messageDesc, {
          singular: CUSTOM,
          list: [CUSTOM, EMPTY],
          map: { a: CUSTOM, b: EMPTY },
        }),
      );
    });
    test("rejects unknown names", () => {
      assert.throws(() => fromJson(messageDesc, { singular: "unknown" }), {
        message: /cannot decode enum E from JSON: "unknown"/,
      });
    });
    test("ignores unknown names with ignoreUnknownFields", () => {
      const msg = fromJson(
        messageDesc,
        { singular: "unknown" },
        { ignoreUnknownFields: true },
      );
      assert.deepStrictEqual(msg, create(messageDesc));
    });
  });
  void suite("enumToJson()", () => {
    test("returns custom JSON name", () => {
      assert.strictEqual(enumToJson(enumDesc, CUSTOM), "custom");
      assert.strictEqual(enumToJson(enumDesc, EMPTY), "");
    });
    test("returns Protobuf name without custom JSON name", () => {
      assert.strictEqual(enumToJson(enumDesc, UNSPECIFIED), "E_UNSPECIFIED");
      assert.strictEqual(enumToJson(enumDesc, DEFAULT), "E_DEFAULT");
    });
  });
  void suite("enumFromJson()", () => {
    test("parses custom JSON name", () => {
      assert.strictEqual(enumFromJson(enumDesc, "custom"), CUSTOM);
      assert.strictEqual(enumFromJson(enumDesc, ""), EMPTY);
    });
    test("parses Protobuf name of value with custom JSON name", () => {
      assert.strictEqual(enumFromJson(enumDesc, "E_CUSTOM"), CUSTOM);
      assert.strictEqual(enumFromJson(enumDesc, "E_EMPTY"), EMPTY);
    });
  });
  void suite("isEnumJson()", () => {
    test("returns true for custom JSON name", () => {
      assert.strictEqual(isEnumJson(enumDesc, "custom"), true);
      assert.strictEqual(isEnumJson(enumDesc, ""), true);
    });
    test("returns true for Protobuf name without custom JSON name", () => {
      assert.strictEqual(isEnumJson(enumDesc, "E_DEFAULT"), true);
    });
    test("returns false for Protobuf name of value with custom JSON name", () => {
      assert.strictEqual(isEnumJson(enumDesc, "E_CUSTOM"), false);
      assert.strictEqual(isEnumJson(enumDesc, "E_EMPTY"), false);
    });
    test("returns false for other values", () => {
      assert.strictEqual(isEnumJson(enumDesc, "unknown"), false);
      assert.strictEqual(isEnumJson(enumDesc, CUSTOM), false);
      assert.strictEqual(isEnumJson(enumDesc, undefined), false);
      assert.strictEqual(isEnumJson(enumDesc, null), false);
    });
  });
});
