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

import { getDescriptorSet } from "./helpers.js";
import type { DescFile } from "@bufbuild/protobuf";
import {
  getCustomOptionBoolean,
  getCustomOptionFloat,
  getCustomOptionUint32,
  getCustomOptionInt32,
  getCustomOptionInt64,
  getCustomOptionString,
  getCustomOptionMessage,
  getCustomOptionEnum,
} from "@bufbuild/protoplugin/ecmascript";
import { proto3 } from "@bufbuild/protobuf";

// Used for custom options of type FooMessage
const foo = proto3.makeMessageType("FooMessage", [
  {
    no: 1,
    name: "foo",
    kind: "scalar",
    T: 5 /* ScalarType.INT32 */,
  },
  {
    no: 2,
    name: "bar",
    kind: "scalar",
    T: 9 /* ScalarType.STRING */,
  },
  {
    no: 3,
    name: "quux",
    kind: "scalar",
    T: 9 /* ScalarType.STRING */,
  },
  {
    no: 4,
    name: "many",
    kind: "scalar",
    repeated: true,
    T: 9 /* ScalarType.STRING */,
  },
  {
    no: 5,
    name: "mapping",
    kind: "map",
    K: 9 /* ScalarType.STRING */,
    V: {
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
  },
  {
    no: 6,
    name: "unused",
    kind: "scalar",
    T: 9 /* ScalarType.STRING */,
  },
]);

describe("custom options", function () {
  let files: DescFile[] = [];
  beforeEach(() => {
    files = getDescriptorSet().files.filter(
      (file) => file.name === "proto/custom_options"
    );
  });
  describe("finds options correctly", function () {
    test("file options", () => {
      for (const file of files) {
        expect(getCustomOptionString(file, 50000)).toEqual("Hello");
      }
    });
    test("enum options", () => {
      for (const file of files) {
        for (const enumeration of file.enums) {
          expect(getCustomOptionBoolean(enumeration, 50004)).toBeTruthy();
        }
      }
    });
    test("enum value options", () => {
      for (const file of files) {
        for (const enumeration of file.enums) {
          for (const enumValue of enumeration.values) {
            if (enumValue.name === "OFF") {
              expect(getCustomOptionUint32(enumValue, 50005)).toEqual(321);
            } else {
              expect(getCustomOptionUint32(enumValue, 50005)).toBeUndefined();
            }
          }
        }
      }
    });
    test("message options", () => {
      for (const file of files) {
        for (const message of file.messages) {
          if (message.name === "FooMessage") {
            expect(getCustomOptionInt32(message, 50001)).toEqual(1234);
          } else {
            expect(getCustomOptionInt32(message, 50001)).toBeUndefined();
          }
        }
      }
    });
    test("field options", () => {
      for (const file of files) {
        for (const message of file.messages) {
          for (const member of message.members) {
            switch (member.kind) {
              case "oneof":
                expect(getCustomOptionInt64(member, 50003)).toEqual(BigInt(42));
                break;
              default: {
                const val = getCustomOptionFloat(member, 50002);
                if (member.name === "foo") {
                  expect(val).toEqual(4.5);
                } else {
                  expect(val).toBeUndefined();
                }
                break;
              }
            }
          }
        }
      }
    });
    test("service options", () => {
      for (const file of files) {
        for (const service of file.services) {
          expect(getCustomOptionEnum(service, 50006)).toEqual(1);
        }
      }
    });
    test("method options", () => {
      for (const file of files) {
        for (const service of file.services) {
          for (const method of service.methods) {
            const option = getCustomOptionMessage(method, 50007, foo);
            expect(option?.foo).toEqual(567);
            expect(option?.bar).toEqual("Some string");
            expect(option?.quux).toEqual("Oneof string");
            expect(option?.many).toEqual(["a", "b", "c"]);
            expect(option?.mapping).toEqual({ testKey: "testVal" });
          }
        }
      }
    });
  });
  describe("all methods return undefined when option not found", function () {
    test("file options", () => {
      for (const file of files) {
        expect(getCustomOptionString(file, 99999)).toBeUndefined();
      }
    });
    test("enum options", () => {
      for (const file of files) {
        for (const enumeration of file.enums) {
          expect(getCustomOptionBoolean(enumeration, 99999)).toBeUndefined();
        }
      }
    });
    test("enum value options", () => {
      for (const file of files) {
        for (const enumeration of file.enums) {
          for (const enumValue of enumeration.values) {
            expect(getCustomOptionUint32(enumValue, 99999)).toBeUndefined();
          }
        }
      }
    });
    test("message options", () => {
      for (const file of files) {
        for (const message of file.messages) {
          expect(getCustomOptionInt32(message, 99999)).toBeUndefined();
        }
      }
    });
    test("field options", () => {
      for (const file of files) {
        for (const message of file.messages) {
          for (const member of message.members) {
            switch (member.kind) {
              case "oneof":
                expect(getCustomOptionInt64(member, 99999)).toBeUndefined();
                break;
              default: {
                expect(getCustomOptionFloat(member, 99999)).toBeUndefined();
                break;
              }
            }
          }
        }
      }
    });
    test("service options", () => {
      for (const file of files) {
        for (const service of file.services) {
          expect(getCustomOptionEnum(service, 99999)).toBeUndefined();
        }
      }
    });
    test("method options", () => {
      for (const file of files) {
        for (const service of file.services) {
          for (const method of service.methods) {
            expect(getCustomOptionMessage(method, 99999, foo)).toBeUndefined();
          }
        }
      }
    });
  });
  // TODO - Should we test wiretype mismatches?  Also should we even validate them.
  describe("invalid wire type", function () {
    test("file options", () => {
      for (const file of files) {
        const getFn = () => {
          getCustomOptionInt64(file, 50000);
        };
        expect(getFn).toThrow(Error);
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
          T: 2 /* ScalarType.FLOAT */,
        },
      ]);
      for (const file of files) {
        for (const service of file.services) {
          for (const method of service.methods) {
            const getFn = () => {
              getCustomOptionMessage(method, 50007, invalid);
            };
            expect(getFn).toThrow(Error);
          }
        }
      }
    });
  });
  test("valid but partial message still returns values", () => {
    const partial = proto3.makeMessageType("InvalidMessage", [
      {
        no: 1,
        name: "foo",
        kind: "scalar",
        T: 5 /* ScalarType.INT32 */,
      },
      {
        no: 2,
        name: "bar",
        kind: "scalar",
        T: 9 /* ScalarType.STRING */,
      },
    ]);
    for (const file of files) {
      for (const service of file.services) {
        for (const method of service.methods) {
          const option = getCustomOptionMessage(method, 50007, partial);
          expect(option?.foo).toEqual(567);
          expect(option?.bar).toEqual("Some string");
          // Following values were set in the proto file but not in the message type above
          expect(option?.quux).toBeUndefined();
          expect(option?.many).toBeUndefined();
          expect(option?.mapping).toBeUndefined();
          expect(option?.unused).toBeUndefined();
        }
      }
    }
  });
  test("unset properties in proto return default values", () => {
    for (const file of files) {
      for (const service of file.services) {
        for (const method of service.methods) {
          const option = getCustomOptionMessage(method, 50007, foo);
          expect(option?.unused).toEqual("");
        }
      }
    }
  });
});
