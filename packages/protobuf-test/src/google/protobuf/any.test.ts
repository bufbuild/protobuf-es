// Copyright 2021-2022 Buf Technologies, Inc.
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

import {
  Any as PKG_Any,
  createRegistry,
  Struct,
  Value,
} from "@bufbuild/protobuf";
import { Any as TS_Any } from "../../gen/ts/google/protobuf/any_pb.js";
import { Any as JS_Any } from "../../gen/js/google/protobuf/any_pb.js";
import { MessageWithAnyField as TS_MessageWithAnyField } from "../../gen/ts/extra/wkt-any_pb.js";
import { MessageWithAnyField as JS_MessageWithAnyField } from "../../gen/js/extra/wkt-any_pb.js";

describe("google.protobuf.Any", () => {
  describe.each([
    {
      Any: PKG_Any,
      MessageWithAnyField: TS_MessageWithAnyField,
      name: `(from package)`,
    },
    {
      Any: TS_Any,
      MessageWithAnyField: TS_MessageWithAnyField,
      name: `(generated ts)`,
    },
    {
      Any: JS_Any,
      MessageWithAnyField: JS_MessageWithAnyField,
      name: `(generated js)`,
    },
  ])("$name", ({ Any, MessageWithAnyField }) => {
    test("encodes to JSON {} without packed content", () => {
      const m = new MessageWithAnyField({
        field: {},
      });
      expect(m.field).toBeDefined();
      expect(m.toJsonString()).toBe('{"field":{}}');
    });

    test("decodes from JSON field value {}", () => {
      const jsonString = '{"field":{}}';
      const m = MessageWithAnyField.fromJsonString(jsonString);
      expect(m.field).toBeDefined();
      expect(m.field?.typeUrl).toBe("");
      expect(m.field?.value.length).toBe(0);
    });

    test("decodes from JSON field value null", () => {
      const jsonString = '{"field":null}';
      const m = MessageWithAnyField.fromJsonString(jsonString);
      expect(m.field).toBeUndefined();
    });

    test(`encodes ${Struct.typeName} to JSON`, () => {
      const typeRegistry = createRegistry(Struct, Value);
      const str = new Struct({
        fields: {
          foo: { kind: { case: "numberValue", value: 1 } },
        },
      });
      const got = Any.pack(str).toJson({
        typeRegistry,
      });
      expect(got).toStrictEqual({
        "@type": "type.googleapis.com/google.protobuf.Struct",
        value: { foo: 1 },
      });
    });

    test(`encodes ${Value.typeName} to JSON`, () => {
      const typeRegistry = createRegistry(Struct, Value);
      const val = new Value({
        kind: { case: "numberValue", value: 1 },
      });
      const got = Any.pack(val).toJson({
        typeRegistry,
      });
      expect(got).toStrictEqual({
        "@type": "type.googleapis.com/google.protobuf.Value",
        value: 1,
      });
    });

    test(`encodes ${Value.typeName} with ${Struct.typeName} to JSON`, () => {
      const typeRegistry = createRegistry(Struct, Value);
      const want = {
        "@type": "type.googleapis.com/google.protobuf.Value",
        value: {
          foo: 1,
        },
      };
      const got = Any.pack(
        new Value({
          kind: {
            case: "structValue",
            value: new Struct({
              fields: {
                foo: { kind: { case: "numberValue", value: 1 } },
              },
            }),
          },
        })
      ).toJson({ typeRegistry });
      expect(got).toStrictEqual(want);
    });

    test(`decodes ${Value.typeName} from JSON`, () => {
      const typeRegistry = createRegistry(Struct, Value);
      const want = new Value({
        kind: { case: "numberValue", value: 1 },
      });
      const any = Any.fromJson(
        {
          "@type": "type.googleapis.com/google.protobuf.Value",
          value: 1,
        },
        { typeRegistry }
      );
      const got = new Value();
      expect(any.unpackTo(got)).toBe(true);
      expect(got).toStrictEqual(want);
    });
  });
});
