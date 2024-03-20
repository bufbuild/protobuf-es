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

import { describe, expect, test } from "@jest/globals";
import {
  createRegistry,
  Int32Value,
  MethodKind,
  proto3,
  StringValue,
} from "@bufbuild/protobuf";
import {
  MessageFieldMessage,
  MessageFieldMessage_TestMessage,
} from "./gen/ts/extra/msg-message_pb.js";
import {
  enum_ext,
  message_ext,
  Proto2Extendee,
  Proto2ExtEnum,
  Proto2ExtMessage,
  uint32_ext,
} from "./gen/ts/extra/extensions-proto2_pb.js";
import {
  TestAllTypes,
  TestAllTypes_NestedEnum,
} from "./gen/ts/google/protobuf/unittest_proto3_pb.js";

describe("createRegistry()", () => {
  describe("findMessage()", () => {
    test("finds nothing if empty", () => {
      const reg = createRegistry();
      expect(reg.findMessage(MessageFieldMessage.typeName)).toBeUndefined();
    });
    test("finds message", () => {
      const reg = createRegistry(MessageFieldMessage);
      expect(reg.findMessage(MessageFieldMessage.typeName)).toBe(
        MessageFieldMessage,
      );
    });
    test("finds message through message field", () => {
      const reg = createRegistry(MessageFieldMessage);
      expect(reg.findMessage(MessageFieldMessage_TestMessage.typeName)).toBe(
        MessageFieldMessage_TestMessage,
      );
    });
    test("finds message through extension extendee", () => {
      const reg = createRegistry(uint32_ext);
      expect(reg.findMessage(Proto2Extendee.typeName)).toBe(Proto2Extendee);
    });
    test("finds message through extension message field", () => {
      const reg = createRegistry(message_ext);
      expect(reg.findMessage(Proto2ExtMessage.typeName)).toBe(Proto2ExtMessage);
    });
    test("finds message through service", () => {
      const fakeService = {
        typeName: "foo.Service",
        methods: {
          foo: {
            kind: MethodKind.Unary,
            name: "Foo",
            I: MessageFieldMessage,
            O: MessageFieldMessage,
          },
        },
      } as const;
      const reg = createRegistry(fakeService);
      expect(reg.findMessage(MessageFieldMessage.typeName)).toBe(
        MessageFieldMessage,
      );
    });
  });

  describe("findEnum()", () => {
    const { typeName } = proto3.getEnumType(TestAllTypes_NestedEnum);
    test("finds nothing if empty", () => {
      const reg = createRegistry();
      const enumType = reg.findEnum(typeName);
      expect(enumType).toBeUndefined();
    });
    test("finds enumeration by type name", () => {
      const reg = createRegistry(proto3.getEnumType(TestAllTypes_NestedEnum));
      const enumType = reg.findEnum(typeName);
      expect(enumType).toBe(proto3.getEnumType(TestAllTypes_NestedEnum));
    });
    test("finds enumeration through message field", () => {
      const reg = createRegistry(TestAllTypes);
      const enumType = reg.findEnum(typeName);
      expect(enumType).toBe(proto3.getEnumType(TestAllTypes_NestedEnum));
    });
    test("finds enum through extension enum field", () => {
      const { typeName } = proto3.getEnumType(Proto2ExtEnum);
      const reg = createRegistry(enum_ext);
      const enumType = reg.findEnum(typeName);
      expect(enumType).toBe(proto3.getEnumType(Proto2ExtEnum));
    });
  });

  describe("findExtension()", () => {
    test("finds nothing if empty", () => {
      const reg = createRegistry();
      expect(reg.findExtension("fake_ext")).toBeUndefined();
    });
    test("finds extension by type name", () => {
      const reg = createRegistry(uint32_ext);
      expect(reg.findExtension(uint32_ext.typeName)).toBe(uint32_ext);
    });
  });

  describe("findExtensionFor()", () => {
    test("finds nothing if empty", () => {
      const reg = createRegistry();
      expect(reg.findExtensionFor("MyFakeMessage", 123)).toBeUndefined();
    });
    test("finds extension by extendee type name and extension field number", () => {
      const reg = createRegistry(uint32_ext);
      expect(
        reg.findExtensionFor(Proto2Extendee.typeName, uint32_ext.field.no),
      ).toBe(uint32_ext);
    });
  });

  describe("findService()", () => {
    const fakeService = {
      typeName: "foo.Service",
      methods: {
        foo: {
          kind: MethodKind.Unary,
          name: "Foo",
          I: Int32Value,
          O: StringValue,
        },
      },
    } as const;
    test("finds nothing if empty", () => {
      const reg = createRegistry();
      const service = reg.findService(fakeService.typeName);
      expect(service).toBeUndefined();
    });
    test("finds service by type name", () => {
      const reg = createRegistry(fakeService);
      const service = reg.findService(fakeService.typeName);
      expect(service).toBe(fakeService);
    });
  });
});
