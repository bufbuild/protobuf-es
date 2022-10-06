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

import { assert, getDescriptorSet } from "./helpers.js";
import {
  findCustomScalarOption,
  findCustomMessageOption,
  findCustomEnumOption,
} from "@bufbuild/protoplugin/ecmascript";
import { proto3, ScalarType } from "@bufbuild/protobuf";
import { FooMessage } from "./gen/proto/custom_options_pb.js";

describe("custom options", function () {
  const descriptorSet = getDescriptorSet();
  describe("finds options correctly", function () {
    test("file options", () => {
      for (const file of descriptorSet.files) {
        if (file.name === "proto/custom_options") {
          expect(
            findCustomScalarOption(file, 50000, ScalarType.STRING)
          ).toEqual("Hello");
        }
      }
    });
    test("enum options", () => {
      const enumeration = descriptorSet.enums.get("example.FooEnum");
      assert(enumeration);
      expect(
        findCustomScalarOption(enumeration, 50004, ScalarType.BOOL)
      ).toBeTruthy();
    });
    test("enum value options", () => {
      const enumeration = descriptorSet.enums.get("example.FooEnum");
      assert(enumeration);
      for (const enumValue of enumeration.values) {
        if (enumValue.name === "OFF") {
          expect(
            findCustomScalarOption(enumValue, 50005, ScalarType.UINT32)
          ).toEqual(321);
        } else {
          expect(
            findCustomScalarOption(enumValue, 50005, ScalarType.UINT32)
          ).toBeUndefined();
        }
      }
    });
    test("message options", () => {
      const msg = descriptorSet.messages.get("example.FooMessage");
      assert(msg);
      expect(findCustomScalarOption(msg, 50001, ScalarType.INT32)).toEqual(
        1234
      );
    });
    test("field options", () => {
      const msg = descriptorSet.messages.get("example.FooMessage");
      assert(msg);
      for (const member of msg.members) {
        switch (member.kind) {
          case "oneof":
            expect(
              findCustomScalarOption(member, 50003, ScalarType.INT64)
            ).toEqual(BigInt(42));
            break;
          default: {
            const val = findCustomScalarOption(member, 50002, ScalarType.FLOAT);
            if (member.name === "foo") {
              expect(val).toEqual(4.5);
            } else {
              expect(val).toBeUndefined();
            }
            break;
          }
        }
      }
    });
    test("service options", () => {
      const service = descriptorSet.services.get("example.FooService");
      assert(service);
      expect(findCustomEnumOption(service, 50006)).toEqual(1);
    });
    test("method options", () => {
      const service = descriptorSet.services.get("example.FooService");
      assert(service);
      for (const method of service.methods) {
        const option = findCustomMessageOption(method, 50007, FooMessage);
        expect(option?.foo).toEqual(567);
        expect(option?.bar).toEqual("Some string");
        expect(option?.qux.case).toEqual("quux");
        expect(option?.qux.value).toEqual("Oneof string");
        expect(option?.many).toEqual(["a", "b", "c"]);
        expect(option?.mapping).toEqual({ testKey: "testVal" });
      }
    });
  });
  describe("all methods return undefined when option not found", function () {
    test("file options", () => {
      for (const file of descriptorSet.files) {
        expect(
          findCustomScalarOption(file, 99999, ScalarType.STRING)
        ).toBeUndefined();
      }
    });
    test("enum options", () => {
      for (const file of descriptorSet.files) {
        for (const enumeration of file.enums) {
          expect(
            findCustomScalarOption(enumeration, 99999, ScalarType.BOOL)
          ).toBeUndefined();
        }
      }
    });
    test("enum value options", () => {
      for (const file of descriptorSet.files) {
        for (const enumeration of file.enums) {
          for (const enumValue of enumeration.values) {
            expect(
              findCustomScalarOption(enumValue, 99999, ScalarType.UINT32)
            ).toBeUndefined();
          }
        }
      }
    });
    test("message options", () => {
      for (const file of descriptorSet.files) {
        for (const message of file.messages) {
          expect(
            findCustomScalarOption(message, 99999, ScalarType.INT32)
          ).toBeUndefined();
        }
      }
    });
    test("field options", () => {
      for (const file of descriptorSet.files) {
        for (const message of file.messages) {
          for (const member of message.members) {
            switch (member.kind) {
              case "oneof":
                expect(
                  findCustomScalarOption(member, 99999, ScalarType.INT64)
                ).toBeUndefined();
                break;
              default: {
                expect(
                  findCustomScalarOption(member, 99999, ScalarType.FLOAT)
                ).toBeUndefined();
                break;
              }
            }
          }
        }
      }
    });
    test("service options", () => {
      for (const file of descriptorSet.files) {
        for (const service of file.services) {
          expect(findCustomEnumOption(service, 99999)).toBeUndefined();
        }
      }
    });
    test("method options", () => {
      for (const file of descriptorSet.files) {
        for (const service of file.services) {
          for (const method of service.methods) {
            expect(
              findCustomMessageOption(method, 99999, FooMessage)
            ).toBeUndefined();
          }
        }
      }
    });
  });
  describe("custom options with message type", function () {
    test("invalid message throws", () => {
      const invalid = proto3.makeMessageType("InvalidMessage", [
        {
          no: 1,
          name: "invalid",
          kind: "scalar",
          T: ScalarType.FLOAT,
        },
      ]);
      const service = descriptorSet.services.get("example.FooService");
      assert(service);
      for (const method of service.methods) {
        const getFn = () => {
          findCustomMessageOption(method, 50007, invalid);
        };
        expect(getFn).toThrow(Error);
      }
    });
  });
  test("valid but partial message still returns values", () => {
    // Rather than use the generated FooMessage, we are using a type created at
    // runtime to test 1.  that makeMessageType also allows us to get message options
    // and 2.  that a partial message will work.
    const partial = proto3.makeMessageType("InvalidMessage", [
      {
        no: 1,
        name: "foo",
        kind: "scalar",
        T: ScalarType.INT32,
      },
      {
        no: 2,
        name: "bar",
        kind: "scalar",
        T: ScalarType.STRING,
      },
    ]);
    const service = descriptorSet.services.get("example.FooService");
    assert(service);
    for (const method of service.methods) {
      const option = findCustomMessageOption(method, 50007, partial);
      expect(option?.foo).toEqual(567);
      expect(option?.bar).toEqual("Some string");
      // Following values were set in the proto file but not in the message type above
      expect(option?.quux).toBeUndefined();
      expect(option?.many).toBeUndefined();
      expect(option?.mapping).toBeUndefined();
      expect(option?.unused).toBeUndefined();
    }
  });
  test("unset properties in proto return default values", () => {
    const service = descriptorSet.services.get("example.FooService");
    assert(service);
    for (const method of service.methods) {
      const option = findCustomMessageOption(method, 50007, FooMessage);
      expect(option?.unused).toEqual("");
    }
  });
});
