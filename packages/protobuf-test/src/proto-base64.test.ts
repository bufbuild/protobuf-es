// Copyright 2021-2023 Buf Technologies, Inc.
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
import { protoBase64 } from "@bufbuild/protobuf";
import { User } from "./gen/ts/extra/example_pb";

/**
 * Inspiration for data source taken from https://github.com/jsdom/abab
 */
const decData = {
  success: [
    ["", []],
    ["abcd", [105, 183, 29]],
    [" abcd", [105, 183, 29]],
    ["abcd ", [105, 183, 29]],
    ["ab", [105]],
    ["abc", [105, 183]],
    ["ab==", [105]],
    ["abc=", [105, 183]],
    ["ab\tcd", [105, 183, 29]],
    ["ab\ncd", [105, 183, 29]],
    ["ab\rcd", [105, 183, 29]],
    ["ab cd", [105, 183, 29]],

    ["/A", [252]],
    ["//A", [255, 240]],
    ["///A", [255, 255, 192]],
    ["A/", [3]],
    ["AA/", [0, 15]],
    ["AAA/", [0, 0, 63]],

    ["abc=d=", [105, 183]],

    [" abcd===", [105, 183, 29]],
    ["abcd=== ", [105, 183, 29]],
    ["abcd ===", [105, 183, 29]],

    ["=", []],
    ["==", []],
    ["===", []],
    ["====", []],
    ["=====", []],
    ["a=", []],
    ["a==", []],
    ["a===", []],
    ["a====", []],
    ["a=====", []],
    ["ab=", [105]],
    ["ab===", [105]],
    ["ab====", [105]],
    ["ab=====", [105]],
    ["abc==", [105]],
    ["abc===", [105, 183]],
    ["abc====", [105, 183]],
    ["abc=====", [105, 183]],
    ["abcd=", [105, 183]],
    ["abcd==", [105, 183]],
    ["abcd===", [105, 183, 29]],
    ["abcd====", [105, 183, 29]],
    ["abcd=====", [105, 183, 29]],
    ["abcde=", [105, 183, 29]],
    ["abcde==", [105, 183, 29]],
    ["abcde===", [105, 183, 29]],
    ["abcde====", [105, 183, 29]],
    ["abcde=====", [105, 183, 29]],

    ["=a=", []],
    ["a=b=", []],

    ["ab=c=", [105]],
  ] as const,
  error: [
    "ab\fcd",
    "ab\t\n\f\r cd",
    " \t\n\f\r ab\t\n\f\r cd\t\n\f\r ",
    "a=b",
    "abc=d",
    "a",
    "ab\t\n\f\r =\t\n\f\r =\t\n\f\r ",
    "abcde",
    "ab=c",
    "=a",
    "ab\u00a0cd",
    "A",
    "////A",
    "/",
    "AAAA/",
    "\0nonsense",
    "abcd\0nonsense",
  ] as const,
};

const encData = [
  [[], ""],
  [[89, 87, 73, 61], "WVdJPQ=="],
  [[89, 87, 74, 106], "WVdKag=="],
  [[89, 87, 74, 106, 90, 65, 61, 61], "WVdKalpBPT0="],
  [[89, 87, 74, 106, 90, 71, 85, 61], "WVdKalpHVT0="],
  [[47, 47, 47, 65], "Ly8vQQ=="],
  [[65, 71, 69, 61], "QUdFPQ=="],
  [[89, 81, 66, 105], "WVFCaQ=="],
  [[105, 183, 29], "abcd"],
  [[105], "aQ=="],
] as const;

describe("protoBase64", function () {
  describe("dec()", () => {
    decData.success.forEach(([input, output]) => {
      test(`should decode ${input.replace(/[^\x20-\x7F]/g, "?")}`, () => {
        expect(protoBase64.dec(input)).toStrictEqual(Uint8Array.from(output));
      });
    });

    test.each(decData.error)(
      `should throw an error trying to decode %s`,
      (input) => {
        expect(() => protoBase64.dec(input)).toThrow("invalid base64 string.");
      }
    );
  });

  describe("enc()", () => {
    encData.forEach(([input, output]) => {
      test(`should encode to ${output}`, () => {
        expect(protoBase64.enc(Uint8Array.from(input))).toStrictEqual(output);
      });
    });
  });

  test("encode and decode user works as expected", () => {
    const user = new User({
      firstName: "John",
      lastName: "Smith",
      active: true,
      manager: {
        firstName: "Jane",
        lastName: "Jones",
      },
      locations: ["PIT", "GER"],
      projects: {
        PES: "Protobuf-ES",
        CWB: "Connect-Web",
      },
    });

    const userToBase64 = protoBase64.enc(user.toBinary());

    const userFromBase64 = User.fromBinary(protoBase64.dec(userToBase64));

    expect(user.equals(userFromBase64)).toBe(true);
  });
});
