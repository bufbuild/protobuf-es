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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import {
  create,
  enumFromJson,
  enumToJson,
  fromJson,
  isEnumJson,
  toJson,
} from "@bufbuild/protobuf";
import {
  JsonEnumNamesMessageSchema,
  JsonEnumNamesSeason,
  JsonEnumNamesSeasonSchema,
} from "./gen/ts/extra/json-enum-names_pb.js";
import * as json_types_ts_json from "./gen/ts,json_types/extra/json-enum-names_pb.js";

void suite("enum value option (pb.enumvalue.json).string", () => {
  test("sets DescEnumValue.jsonName", () => {
    assert.deepStrictEqual(
      JsonEnumNamesSeasonSchema.values.map((v) => v.jsonName),
      [undefined, "primavera", "estate", undefined],
    );
  });
  test("toJson() uses custom JSON names", () => {
    const msg = create(JsonEnumNamesMessageSchema, {
      seasonField: JsonEnumNamesSeason.SPRING,
      repeatedField: [JsonEnumNamesSeason.SUMMER, JsonEnumNamesSeason.FALL],
      mapField: {
        a: JsonEnumNamesSeason.SPRING,
        b: JsonEnumNamesSeason.UNSPECIFIED,
      },
    });
    assert.deepStrictEqual(toJson(JsonEnumNamesMessageSchema, msg), {
      seasonField: "primavera",
      repeatedField: ["estate", "JSON_ENUM_NAMES_SEASON_FALL"],
      mapField: { a: "primavera", b: "JSON_ENUM_NAMES_SEASON_UNSPECIFIED" },
    });
  });
  test("toJson() with enumAsInteger ignores custom JSON names", () => {
    const msg = create(JsonEnumNamesMessageSchema, {
      seasonField: JsonEnumNamesSeason.SPRING,
    });
    assert.deepStrictEqual(
      toJson(JsonEnumNamesMessageSchema, msg, { enumAsInteger: true }),
      { seasonField: 1 },
    );
  });
  test("fromJson() parses custom JSON names", () => {
    const msg = fromJson(JsonEnumNamesMessageSchema, {
      seasonField: "primavera",
      repeatedField: ["estate", "JSON_ENUM_NAMES_SEASON_FALL"],
      mapField: { a: "primavera", b: "JSON_ENUM_NAMES_SEASON_UNSPECIFIED" },
    });
    assert.strictEqual(msg.seasonField, JsonEnumNamesSeason.SPRING);
    assert.deepStrictEqual(msg.repeatedField, [
      JsonEnumNamesSeason.SUMMER,
      JsonEnumNamesSeason.FALL,
    ]);
    assert.deepStrictEqual(msg.mapField, {
      a: JsonEnumNamesSeason.SPRING,
      b: JsonEnumNamesSeason.UNSPECIFIED,
    });
  });
  test("fromJson() parses names of values with custom JSON names", () => {
    const msg = fromJson(JsonEnumNamesMessageSchema, {
      seasonField: "JSON_ENUM_NAMES_SEASON_SPRING",
    });
    assert.strictEqual(msg.seasonField, JsonEnumNamesSeason.SPRING);
  });
  test("fromJson() rejects unknown names", () => {
    assert.throws(
      () =>
        fromJson(JsonEnumNamesMessageSchema, {
          seasonField: "inverno",
        }),
      {
        message:
          /cannot decode enum spec.JsonEnumNamesSeason from JSON: "inverno"/,
      },
    );
    const msg = fromJson(
      JsonEnumNamesMessageSchema,
      { seasonField: "inverno" },
      { ignoreUnknownFields: true },
    );
    assert.strictEqual(msg.seasonField, JsonEnumNamesSeason.UNSPECIFIED);
  });
  test("enumToJson() returns custom JSON name", () => {
    const json: json_types_ts_json.JsonEnumNamesSeasonJson = enumToJson(
      json_types_ts_json.JsonEnumNamesSeasonSchema,
      json_types_ts_json.JsonEnumNamesSeason.SPRING,
    );
    assert.strictEqual(json, "primavera");
  });
  test("enumFromJson() parses custom JSON name and name", () => {
    let e: json_types_ts_json.JsonEnumNamesSeason = enumFromJson(
      json_types_ts_json.JsonEnumNamesSeasonSchema,
      "primavera",
    );
    assert.strictEqual(e, json_types_ts_json.JsonEnumNamesSeason.SPRING);
    e = enumFromJson(
      json_types_ts_json.JsonEnumNamesSeasonSchema,
      "JSON_ENUM_NAMES_SEASON_SPRING",
    );
    assert.strictEqual(e, json_types_ts_json.JsonEnumNamesSeason.SPRING);
  });
  test("isEnumJson() accepts custom JSON name and name", () => {
    assert.ok(
      isEnumJson(json_types_ts_json.JsonEnumNamesSeasonSchema, "primavera"),
    );
    assert.ok(
      isEnumJson(
        json_types_ts_json.JsonEnumNamesSeasonSchema,
        "JSON_ENUM_NAMES_SEASON_SPRING",
      ),
    );
    assert.strictEqual(
      isEnumJson(json_types_ts_json.JsonEnumNamesSeasonSchema, "inverno"),
      false,
    );
  });
  test("JSON type includes custom JSON names and names", () => {
    const json: json_types_ts_json.JsonEnumNamesMessageJson = {
      seasonField: "primavera",
      repeatedField: ["JSON_ENUM_NAMES_SEASON_SPRING", "estate"],
      // @ts-expect-error TS2322
      mapField: { a: "inverno" },
    };
    assert.ok(json);
  });
});
