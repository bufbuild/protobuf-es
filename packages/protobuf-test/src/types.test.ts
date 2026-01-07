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
  type MessageShape,
  type EnumShape,
  type Extendee,
  type ExtensionValueShape,
  type Message,
  type DescEnum,
  type DescMessage,
  type DescExtension,
  type MessageJsonType,
  type JsonValue,
  type EnumJsonType,
  type MessageValidType,
} from "@bufbuild/protobuf";
import type { Timestamp, Duration } from "@bufbuild/protobuf/wkt";
import type { Proto3Message, Proto3Enum } from "./gen/ts/extra/proto3_pb.js";
import type { Proto3EnumSchema } from "./gen/ts/extra/proto3_pb.js";
import type { User } from "./gen/ts/extra/example_pb.js";
import { UserSchema } from "./gen/ts/extra/example_pb.js";
import type {
  Proto2Extendee,
  repeated_string_ext,
  uint32_ext,
  message_ext,
  Proto2ExtMessage,
  repeated_message_ext,
} from "./gen/ts/extra/extensions-proto2_pb.js";
import type * as json_types_ts_json from "./gen/ts,json_types/extra/json_types_pb.js";
import type * as json_types_ts_nojson from "./gen/ts/extra/json_types_pb.js";
import type * as valid_types_ts from "./gen/ts,valid_types/extra/valid_types_pb.js";
import type * as valid_types_ts_novalid from "./gen/ts/extra/valid_types_pb.js";
import type * as codegenv1 from "@bufbuild/protobuf/codegenv1";

void suite("type Message", () => {
  void suite(
    "assigning different messages with same shape to each other",
    () => {
      void test("is a type error", () => {
        const duration = "fake" as unknown as Duration;
        const timestamp = "fake" as unknown as Timestamp;
        // @ts-expect-error TS2322
        const duration2: Duration = timestamp;
        // @ts-expect-error TS2322
        const timestamp2: Timestamp = duration;
        assert.ok(duration2);
        assert.ok(timestamp2);
      });
    },
  );
  void suite("narrow down from message shape union", () => {
    const msg = create(UserSchema) as unknown as Proto3Message | User;
    void test("can switch on Message.$typeName against literal string type", () => {
      switch (msg.$typeName) {
        case "example.User":
          assert.ok(msg.firstName !== undefined);
          break;
        default:
          throw new Error();
      }
    });
    void test("can switch on Message.$typeName against embedded desc's typeName", () => {
      switch (msg.$typeName) {
        case UserSchema.typeName:
          assert.ok(msg.firstName !== undefined);
          break;
        default:
          throw new Error();
      }
    });
  });
});

void suite("type MessageShape", () => {
  void test("derives generated shape", () => {
    function t(derived: MessageShape<typeof UserSchema>, direct: User) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("supports codegenv1", () => {
    type M = Message<"M"> & { v1: true };
    function t(derived: MessageShape<codegenv1.GenMessage<M>>, direct: M) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("derives anonymous shape", () => {
    function t(derived: MessageShape<DescMessage>, anon: Message) {
      derived = anon;
      anon = derived;
    }
    assert.ok(t);
  });
});

void suite("type EnumShape", () => {
  void test("derives generated shape", () => {
    function t(
      derived: EnumShape<typeof Proto3EnumSchema>,
      direct: Proto3Enum,
    ) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("supports codegenv1", () => {
    type E = 1;
    function t(derived: EnumShape<codegenv1.GenEnum<E>>, direct: E) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("derives anonymous shape", () => {
    function t(derived: EnumShape<DescEnum>, anon: number) {
      derived = anon;
      anon = derived;
    }
    assert.ok(t);
  });
});

void suite("type Extendee", () => {
  void test("derives generated type info", () => {
    function t(derived: Extendee<typeof uint32_ext>, direct: Proto2Extendee) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("supports codegenv1", () => {
    type E = Message<"E"> & { v1: true };
    function t(derived: Extendee<codegenv1.GenExtension<E>>, direct: E) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("derives anonymous type info", () => {
    function t(derived: Extendee<DescExtension>, anon: Message) {
      derived = anon;
      anon = derived;
    }
    assert.ok(t);
  });
});

void suite("type ExtensionValueShape", () => {
  void test("derives generated type info for singular scalar", () => {
    function t(
      derived: ExtensionValueShape<typeof uint32_ext>,
      direct: number,
    ) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("supports codegenv1", () => {
    type E = Message<"E"> & { v1: true };
    function t(derived: Extendee<codegenv1.GenExtension<E>>, direct: E) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  void test("derives generated type info for repeated scalar", () => {
    function t(
      derived: ExtensionValueShape<typeof repeated_string_ext>,
      direct: string[],
    ) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  test("derives generated type info for singular message", () => {
    function t(
      derived: ExtensionValueShape<typeof message_ext>,
      direct: Proto2ExtMessage,
    ) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  test("derives generated type info for repeated message", () => {
    function t(
      derived: ExtensionValueShape<typeof repeated_message_ext>,
      direct: Proto2ExtMessage[],
    ) {
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  test("derives anonymous as unknown", () => {
    function t(derived: ExtensionValueShape<DescExtension>, anon: unknown) {
      derived = anon;
      anon = derived;
    }
    assert.ok(t);
  });
});

void suite("type MessageJsonType", () => {
  test("should resolve generated type", () => {
    function f(
      derived: MessageJsonType<
        typeof json_types_ts_json.JsonTypesMessageSchema
      >,
      direct: json_types_ts_json.JsonTypesMessageJson,
    ) {
      direct = derived;
      return direct;
    }
    assert.ok(f);
  });
  test("supports codegenv1", () => {
    function t(
      derived: MessageJsonType<
        codegenv1.GenMessage<
          json_types_ts_json.JsonTypesMessage,
          json_types_ts_json.JsonTypesMessageJson
        >
      >,
      direct: json_types_ts_json.JsonTypesMessageJson,
    ) {
      // @ts-expect-error - prove that this is not just fallback JsonObject
      derived.unknownField;
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  test("should resolve JsonValue without generated type", () => {
    function f(
      derived: MessageJsonType<
        typeof json_types_ts_nojson.JsonTypesMessageSchema
      >,
      direct: JsonValue,
    ) {
      direct = derived;
      derived = direct;
      return derived;
    }
    assert.ok(f);
  });
});

void suite("type EnumJsonType", () => {
  test("should resolve generated type", () => {
    function f(
      derived: EnumJsonType<typeof json_types_ts_json.JsonTypeEnumSchema>,
      direct: json_types_ts_json.JsonTypeEnumJson,
    ) {
      direct = derived;
      derived = direct;
      return direct;
    }
    assert.ok(f);
  });
  test("supports codegenv1", () => {
    function t(
      derived: EnumJsonType<
        codegenv1.GenEnum<
          json_types_ts_json.JsonTypeEnum,
          json_types_ts_json.JsonTypeEnumJson
        >
      >,
      direct: json_types_ts_json.JsonTypeEnumJson,
    ) {
      // @ts-expect-error - prove that this is not just fallback string
      derived = "X";
      derived = direct;
      direct = derived;
    }
    assert.ok(t);
  });
  test("should resolve string without generated type", () => {
    function f(
      derived: EnumJsonType<typeof json_types_ts_nojson.JsonTypeEnumSchema>,
      direct: string | null,
    ) {
      derived = direct;
      direct = derived;
      return derived;
    }
    assert.ok(f);
  });
});

void suite("type MessageValidType", () => {
  test("should resolve generated type", () => {
    function f(
      derived: MessageValidType<typeof valid_types_ts.VTypesSchema>,
      direct: valid_types_ts.VTypesValid,
    ) {
      let str: string = direct.requiredMsg.$typeName;
      str = derived.requiredMsg.$typeName;
      direct = derived;
      return [direct, str];
    }
    assert.ok(f);
  });
  test("should resolve regular type as fallback", () => {
    function f(
      derived: MessageValidType<typeof valid_types_ts_novalid.VTypesSchema>,
      direct: valid_types_ts_novalid.VTypes,
    ) {
      derived = direct;
      direct = derived;
      return direct;
    }
    assert.ok(f);
  });
});
