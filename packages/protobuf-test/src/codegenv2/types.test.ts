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
import type {
  DescField,
  DescFile,
  EnumShape,
  JsonValue,
  Message,
  MessageJsonType,
  MessageValidType,
  MessageShape,
  EnumJsonType,
  DescMessage,
  DescEnum,
  DescExtension,
  ExtensionValueShape,
  Extendee,
  DescService,
  DescMethod,
} from "@bufbuild/protobuf";
import type {
  GenEnum,
  GenExtension,
  GenFile,
  GenMessage,
  GenService,
} from "@bufbuild/protobuf/codegenv2";

void suite("GenFile", () => {
  test("is DescFile", async () => {
    function f(genFile: GenFile, descFile: DescFile) {
      genFile = descFile;
      descFile = genFile;
      return descFile;
    }
    assert.ok(f !== undefined);
  });
});

void suite("GenMessage", () => {
  type FakeMessage = Message<"fake"> & { foo: boolean };
  test("is DescMessage", () => {
    function f(genMessage: GenMessage<FakeMessage>): DescMessage {
      return genMessage;
    }
    assert.ok(f !== undefined);
  });
  test("single type parameter is message shape", () => {
    function f(message: FakeMessage): MessageShape<GenMessage<FakeMessage>> {
      return message;
    }
    assert.ok(f !== undefined);
  });
  test("json type defaults to JsonValue", () => {
    function f(
      messageJson: MessageJsonType<GenMessage<FakeMessage>>,
      jsonValue: JsonValue,
    ) {
      jsonValue = messageJson;
      messageJson = jsonValue;
      return [jsonValue, messageJson];
    }
    assert.ok(f !== undefined);
  });
  test("json type parameter", () => {
    type FakeMessageJson = "fake-json";
    function f(): MessageJsonType<
      GenMessage<FakeMessage, { jsonType: FakeMessageJson }>
    > {
      return "fake-json";
    }
    assert.ok(f !== undefined);
  });
  test("valid type defaults to message shape", () => {
    function f(
      messageValid: MessageValidType<GenMessage<FakeMessage>>,
      messageValidWithJson: MessageValidType<
        GenMessage<FakeMessage, { jsonType: "fake-json" }>
      >,
      message: FakeMessage,
    ) {
      message = messageValid;
      message = messageValidWithJson;
      messageValid = message;
      messageValidWithJson = message;
      return [message, messageValid, messageValidWithJson];
    }
    assert.ok(f !== undefined);
  });
  test("valid type parameter", () => {
    type FakeMessageValid = Message<"fake-valid"> & {
      foo: boolean;
      valid: true;
    };
    function f(
      messageValid: MessageValidType<
        GenMessage<FakeMessage, { validType: FakeMessageValid }>
      >,
      messageValidWithJson: MessageValidType<
        GenMessage<
          FakeMessage,
          { jsonType: "fake-json"; validType: FakeMessageValid }
        >
      >,
      fakeMessage: FakeMessage,
      fakeMessageValid: FakeMessageValid,
    ) {
      // @ts-expect-error
      fakeMessageValid = fakeMessage;
      // @ts-expect-error
      fakeMessage = fakeMessageValid;
      fakeMessageValid = messageValid;
      messageValid = fakeMessageValid;
      messageValidWithJson = fakeMessageValid;
      fakeMessageValid = messageValidWithJson;
      return [
        fakeMessage,
        messageValid,
        messageValidWithJson,
        fakeMessageValid,
      ];
    }
    assert.ok(f !== undefined);
  });
  test("has typed field names", () => {
    function f(genMessage: GenMessage<FakeMessage>): DescField {
      // @ts-expect-error
      genMessage.field.bar;
      return genMessage.field.foo;
    }
    assert.ok(f !== undefined);
  });
});

void suite("GenEnum", () => {
  enum FakeEnum {
    FOO = 0,
    BAR = 1,
  }
  test("is DescEnum", () => {
    function f(genEnum: GenEnum<FakeEnum>): DescEnum {
      return genEnum;
    }
    assert.ok(f !== undefined);
  });
  test("single type parameter is enum shape", () => {
    function f(fakeEnum: FakeEnum): EnumShape<GenEnum<FakeEnum>> {
      return fakeEnum;
    }
    assert.ok(f !== undefined);
  });
  test("json type defaults to JsonValue", () => {
    function f(
      enumJson: EnumJsonType<GenEnum<FakeEnum>>,
      jsonValue: JsonValue,
    ) {
      jsonValue = enumJson;
      enumJson = jsonValue;
      return [jsonValue, enumJson];
    }
    assert.ok(f !== undefined);
  });
  test("json type parameter", async () => {
    type FakeEnumJson = "fake-json";
    function f(): EnumJsonType<GenEnum<FakeEnum, FakeEnumJson>> {
      return "fake-json";
    }
    assert.ok(f !== undefined);
  });
});

void suite("GenExtension", () => {
  type FakeExtendee = Message<"fake-extendee"> & { foo: boolean };
  type FakeExtensionVal = "fake-ext-val";
  test("is DescExtension", () => {
    function f(genExt: GenExtension): DescExtension {
      return genExt;
    }
    assert.ok(f !== undefined);
  });
  test("without type parameters", () => {
    function f(
      extendee: Extendee<GenExtension>,
      extensionValueShape: ExtensionValueShape<GenExtension>,
      unknownMessage: Message,
      unknownValue: unknown,
    ) {
      unknownMessage = extendee;
      extendee = unknownMessage;
      unknownValue = extensionValueShape;
      extensionValueShape = unknownValue;
      return [extendee, extensionValueShape];
    }
    assert.ok(f !== undefined);
  });

  test("single type parameter is extendee", () => {
    function f(extendee: Extendee<GenExtension<FakeExtendee>>): FakeExtendee {
      return extendee;
    }
    assert.ok(f !== undefined);
  });
  test("second type parameter is extension value", () => {
    function f(
      extendee: Extendee<GenExtension<FakeExtendee, FakeExtensionVal>>,
      val: ExtensionValueShape<GenExtension<FakeExtendee, FakeExtensionVal>>,
    ): [FakeExtendee, "fake-ext-val"] {
      return [extendee, val];
    }
    assert.ok(f !== undefined);
  });
});

void suite("GenService", () => {
  type FakeGenServiceMethods = {
    foo: DescMethod;
  };
  test("is DescService", () => {
    function f(genService: GenService<FakeGenServiceMethods>): DescService {
      return genService;
    }
    assert.ok(f !== undefined);
  });
  test("has typed method names", () => {
    function f(genService: GenService<FakeGenServiceMethods>): DescMethod {
      // @ts-expect-error
      genService.method.bar;
      return genService.method.foo;
    }
    assert.ok(f !== undefined);
  });
});
