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
import { base64Decode, base64Encode } from "@bufbuild/protobuf/wire";

// The following test cases match https://cs.opensource.google/go/go/+/master:src/encoding/base64/base64_test.go;l=25
// One example specific for URL encoding was added.
const exampleCases: {
  name: string;
  bytes: Uint8Array | string;
  std: string;
  std_raw: string;
  url: string;
}[] = [
  { name: "RFC 3548 example #1", bytes: "", std: "", std_raw: "", url: "" },
  {
    name: "RFC 3548 example #1",
    bytes: new Uint8Array([0x14, 0xfb, 0x9c, 0x03, 0xd9, 0x7e]),
    std: "FPucA9l+",
    std_raw: "FPucA9l+",
    url: "FPucA9l-",
  },
  {
    name: "RFC 3548 example #2",
    bytes: new Uint8Array([0x14, 0xfb, 0x9c, 0x03, 0xd9]),
    std: "FPucA9k=",
    std_raw: "FPucA9k",
    url: "FPucA9k",
  },
  {
    name: "RFC 3548 example #3",
    bytes: new Uint8Array([0x14, 0xfb, 0x9c, 0x03]),
    std: "FPucAw==",
    std_raw: "FPucAw",
    url: "FPucAw",
  },

  { name: "RFC 4648 example #1", bytes: "", std: "", std_raw: "", url: "" },
  {
    name: "RFC 4648 example #2",
    bytes: "f",
    std: "Zg==",
    std_raw: "Zg",
    url: "Zg",
  },
  {
    name: "RFC 4648 example #4",
    bytes: "fo",
    std: "Zm8=",
    std_raw: "Zm8",
    url: "Zm8",
  },
  {
    name: "RFC 4648 example #5",
    bytes: "foo",
    std: "Zm9v",
    std_raw: "Zm9v",
    url: "Zm9v",
  },
  {
    name: "RFC 4648 example #6",
    bytes: "foob",
    std: "Zm9vYg==",
    std_raw: "Zm9vYg",
    url: "Zm9vYg",
  },
  {
    name: "RFC 4648 example #7",
    bytes: "fooba",
    std: "Zm9vYmE=",
    std_raw: "Zm9vYmE",
    url: "Zm9vYmE",
  },
  {
    name: "RFC 4648 example #8",
    bytes: "foobar",
    std: "Zm9vYmFy",
    std_raw: "Zm9vYmFy",
    url: "Zm9vYmFy",
  },

  {
    name: "Wikipedia example #1",
    bytes: "sure.",
    std: "c3VyZS4=",
    std_raw: "c3VyZS4",
    url: "c3VyZS4",
  },
  {
    name: "Wikipedia example #2",
    bytes: "sure",
    std: "c3VyZQ==",
    std_raw: "c3VyZQ",
    url: "c3VyZQ",
  },
  {
    name: "Wikipedia example #3",
    bytes: "sur",
    std: "c3Vy",
    std_raw: "c3Vy",
    url: "c3Vy",
  },
  {
    name: "Wikipedia example #4",
    bytes: "su",
    std: "c3U=",
    std_raw: "c3U",
    url: "c3U",
  },
  {
    name: "Wikipedia example #5",
    bytes: "leasure.",
    std: "bGVhc3VyZS4=",
    std_raw: "bGVhc3VyZS4",
    url: "bGVhc3VyZS4",
  },
  {
    name: "Wikipedia example #6",
    bytes: "easure.",
    std: "ZWFzdXJlLg==",
    std_raw: "ZWFzdXJlLg",
    url: "ZWFzdXJlLg",
  },
  {
    name: "Wikipedia example #7",
    bytes: "asure.",
    std: "YXN1cmUu",
    std_raw: "YXN1cmUu",
    url: "YXN1cmUu",
  },
  {
    name: "Wikipedia example #8",
    bytes: "sure.",
    std: "c3VyZS4=",
    std_raw: "c3VyZS4",
    url: "c3VyZS4",
  },

  {
    name: "Example with URL relevant characters #1",
    bytes: "<<???>>",
    std: "PDw/Pz8+Pg==",
    std_raw: "PDw/Pz8+Pg",
    url: "PDw_Pz8-Pg",
  },
];

void suite("base64Decode()", () => {
  for (const { name, bytes, std } of exampleCases) {
    void test(`decodes ${name}`, () => {
      assert.deepStrictEqual(
        base64Decode(std),
        bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes),
      );
    });
  }
  for (const { name, bytes, std_raw } of exampleCases) {
    void test(`decodes std_raw ${name}`, () => {
      assert.deepStrictEqual(
        base64Decode(std_raw),
        bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes),
      );
    });
  }
  for (const { name, bytes, url } of exampleCases) {
    void test(`decodes url ${name}`, () => {
      assert.deepStrictEqual(
        base64Decode(url),
        bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes),
      );
    });
  }
  for (const b64 of [
    "c3VyZQ==",
    "c3VyZQ==  ",
    "c3VyZQ==\t",
    "c3VyZQ==\r",
    "c3VyZQ==\n",
    "c3VyZQ==\r\n",
    "c3VyZ\r\nQ==",
    "c3V\ryZ\nQ==",
    "c3V\nyZ\rQ==",
    "c3VyZ\nQ==",
    "c3VyZQ\n==",
    "c3VyZQ=\n=",
    "c3VyZQ=\r\n\r\n=",
  ]) {
    void test(`ignores white-space, including line breaks and tabs in ${b64}`, () => {
      assert.deepStrictEqual(
        base64Decode(b64),
        new TextEncoder().encode("sure"),
      );
    });
  }
  for (const b64 of [
    "c3VyZQ==c3VyZQ==",
    "c3VyZQ==\nc3VyZQ==",
    "c3VyZQ==\tc3VyZQ==",
    "c3VyZQ==\rc3VyZQ==",
    "c3VyZQ== c3VyZQ==",
  ]) {
    void test(`allows inner padding in ${b64}`, () => {
      assert.deepStrictEqual(
        base64Decode(b64),
        new TextEncoder().encode("suresure"),
      );
    });
  }
  void test("does not require padding", () => {
    assert.deepStrictEqual(
      base64Decode("c3VyZQ"),
      new TextEncoder().encode("sure"),
    );
  });
  for (const b64 of [
    "c3VyZQ==",
    "c3VyZQ==\r",
    "c3VyZQ==\n",
    "c3VyZQ==\r\n",
    "c3VyZ\r\nQ==",
    "c3V\ryZ\nQ==",
    "c3V\nyZ\rQ==",
    "c3VyZ\nQ==",
    "c3VyZQ\n==",
    "c3VyZQ=\n=",
    "c3VyZQ=\r\n\r\n=",
  ]) {
    void test(`ignores whitespace in ${b64}`, () => {
      assert.deepStrictEqual(
        base64Decode(b64),
        new TextEncoder().encode("sure"),
      );
    });
  }
  test("understands URL encoding", () => {
    const b64 = "PDw_Pz8-Pg";
    const bytes = base64Decode(b64);
    assert.deepStrictEqual(bytes, new TextEncoder().encode("<<???>>"));
  });
});

void suite("base64Encode()", () => {
  for (const { name, bytes, std } of exampleCases) {
    void test(`std encodes ${name}`, () => {
      const input =
        bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes);
      assert.strictEqual(base64Encode(input), std);
    });
  }
  for (const { name, bytes, std_raw } of exampleCases) {
    void test(`std_raw encodes ${name}`, () => {
      const input =
        bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes);
      assert.strictEqual(base64Encode(input, "std_raw"), std_raw);
    });
  }
  for (const { name, bytes, url } of exampleCases) {
    void test(`url encodes ${name}`, () => {
      const input =
        bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes);
      assert.strictEqual(base64Encode(input, "url"), url);
    });
  }
});
