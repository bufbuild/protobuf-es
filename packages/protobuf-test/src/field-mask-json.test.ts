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
import { create, equals, toJson, fromJson } from "@bufbuild/protobuf";
import { FieldMaskSchema } from "@bufbuild/protobuf/wkt";
import assert from "node:assert";

void suite("FieldMask JSON compatibility", () => {
  void suite("round trips", () => {
    void test("path name round trip", () => {
      const message = create(FieldMaskSchema, { paths: ["bird_of_prey"] });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "birdOfPrey");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("compound path name round trip", () => {
      const message = create(FieldMaskSchema, {
        paths: ["klingon.bird_of_prey"],
      });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "klingon.birdOfPrey");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("path name digit suffix round trip", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc1701"] });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "ncc1701");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("path name segment digit suffix round trip", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc1701_a"] });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "ncc1701A");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("compound path name digit suffix round trip", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc1701.b"] });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "ncc1701.b");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("path name underscore prefix round trip", () => {
      const message = create(FieldMaskSchema, { paths: ["_bird_of_prey"] });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "BirdOfPrey");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("compound path name underscore prefix round trip", () => {
      const message = create(FieldMaskSchema, {
        paths: ["klingon._bird_of_prey"],
      });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "klingon.BirdOfPrey");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("path name segment digits infix round trip", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc1701d"] });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "ncc1701d");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
    void test("compound path name segment digits infix round trip", () => {
      const message = create(FieldMaskSchema, {
        paths: ["federation.ncc1701d"],
      });
      const messageToJson = toJson(FieldMaskSchema, message);
      const messageToJsonToMessage = fromJson(FieldMaskSchema, messageToJson);

      assert.equal(messageToJson, "federation.ncc1701d");
      assert.ok(equals(FieldMaskSchema, message, messageToJsonToMessage));
    });
  });

  void suite("invalid toJson()", () => {
    void test("digits only", () => {
      const message = create(FieldMaskSchema, { paths: ["1701"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: path "1701" contains invalid field name',
      });
    });
    void test("compound path name digits only", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc.1701"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: path "ncc.1701" contains invalid field name',
      });
    });
    void test("path name segment digits only prefix", () => {
      const message = create(FieldMaskSchema, { paths: ["1701_c"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: path "1701_c" contains invalid field name',
      });
    });
    void test("compound path name segment digits only prefix", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc.1701_c"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: path "ncc.1701_c" contains invalid field name',
      });
    });
  });

  void suite("irreversible toJson()", () => {
    void test("path name with uppercase", () => {
      const message = create(FieldMaskSchema, { paths: ["warBird"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "warBird" is irreversible',
      });
    });
    void test("compound path name with uppercase", () => {
      const message = create(FieldMaskSchema, { paths: ["romulan.warBird"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "romulan.warBird" is irreversible',
      });
    });
    void test("path name underscore suffix", () => {
      const message = create(FieldMaskSchema, { paths: ["bird_of_prey_"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "bird_of_prey_" is irreversible',
      });
    });
    void test("compound path name underscore suffix", () => {
      const message = create(FieldMaskSchema, {
        paths: ["klingon_.bird_of_prey"],
      });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "klingon_.bird_of_prey" is irreversible',
      });
    });
    void test("path name double underscore prefix", () => {
      const message = create(FieldMaskSchema, { paths: ["__bird_of_prey"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "__bird_of_prey" is irreversible',
      });
    });
    void test("compound path name double underscore prefix", () => {
      const message = create(FieldMaskSchema, {
        paths: ["klingon.__bird_of_prey"],
      });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "klingon.__bird_of_prey" is irreversible',
      });
    });
    void test("path name double underscore suffix", () => {
      const message = create(FieldMaskSchema, { paths: ["bird_of_prey__"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "bird_of_prey__" is irreversible',
      });
    });
    void test("compound path name double underscore suffix", () => {
      const message = create(FieldMaskSchema, {
        paths: ["klingon.bird_of_prey__"],
      });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "klingon.bird_of_prey__" is irreversible',
      });
    });
    void test("path name double underscore infix", () => {
      const message = create(FieldMaskSchema, { paths: ["war__bird"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "war__bird" is irreversible',
      });
    });
    void test("compound path name double underscore infix", () => {
      const message = create(FieldMaskSchema, { paths: ["romulan.war__bird"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "romulan.war__bird" is irreversible',
      });
    });
    void test("path name segment digits only infix", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc_1701_c"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "ncc_1701_c" is irreversible',
      });
    });
    void test("compound path name segment digits only infix", () => {
      const message = create(FieldMaskSchema, {
        paths: ["federation.ncc_1701_c"],
      });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "federation.ncc_1701_c" is irreversible',
      });
    });
    void test("path name segment digit prefix", () => {
      const message = create(FieldMaskSchema, { paths: ["ncc_1701d"] });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "ncc_1701d" is irreversible',
      });
    });
    void test("compound path name segment digit prefix", () => {
      const message = create(FieldMaskSchema, {
        paths: ["federation.ncc_1701d"],
      });
      assert.throws(() => toJson(FieldMaskSchema, message), {
        message:
          'cannot encode message google.protobuf.FieldMask to JSON: camel case of path name "federation.ncc_1701d" is irreversible',
      });
    });
  });

  void suite("invalid fromJson()", () => {
    void test("digits only", () => {
      const json = '"1701"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("compound path name digits only", () => {
      const json = '"ncc.1701"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("path name segment digits only prefix", () => {
      const json = '"1701C"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("compound path name segment digits only prefix", () => {
      const json = '"ncc.1701C"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("path name underscore_infix", () => {
      const json = '"war_bird"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("compound path name underscore_infix", () => {
      const json = '"romulan.war_bird"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("path name underscore prefix", () => {
      const json = '"_birdOfPrey"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("compound path name underscore prefix", () => {
      const json = '"klingon._birdOfPrey"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("path name underscore suffix", () => {
      const json = '"birdOfPrey_"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
    void test("compound path name underscore suffix", () => {
      const json = '"klingon_.birdOfPrey"';
      assert.throws(() => fromJson(FieldMaskSchema, json), {
        message:
          "cannot decode message google.protobuf.FieldMask from JSON: path names must be camel case",
      });
    });
  });
});
