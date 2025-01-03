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

import { describe, expect, test } from "@jest/globals";
import { protoInt64 } from "@bufbuild/protobuf";
import Long from "long";

const SIGNED = {
  "0": {
    lo: 0,
    hi: 0,
  },
  "127": {
    lo: 127,
    hi: 0,
  },
  "-127": {
    lo: -127,
    hi: -1,
  },
  "9007199254740991": {
    // Number.MAX_SAFE_INTEGER
    lo: -1,
    hi: 2097151,
  },
  "-9007199254740991": {
    // Number.MIN_SAFE_INTEGER
    lo: 1,
    hi: -2097152,
  },
  "9223372036854775807": {
    // signed 64-bit max
    lo: -1,
    hi: 2147483647,
  },
  "-9223372036854775808": {
    // signed 64-bit min
    lo: 0,
    hi: -2147483648,
  },
} as const;

const UNSIGNED = {
  "0": SIGNED["0"],
  "127": SIGNED["127"],
  "9007199254740991": SIGNED["9007199254740991"],
  "9223372036854775807": SIGNED["9223372036854775807"],
  "18446744073709551615": {
    // unsigned 64-bit max
    lo: -1,
    hi: -1,
  },
} as const;

describe("npm package 'long'", () => {
  for (const [k, v] of Object.entries(SIGNED)) {
    test(`should parse the same bits from string ${k}`, () => {
      const got = Long.fromString(k, false);
      expect({ lo: got.low, hi: got.high }).toStrictEqual(v);
      expect(got.toString()).toBe(k);
    });
  }
  for (const [k, v] of Object.entries(UNSIGNED)) {
    test(`should parse the same bits from string ${k}`, () => {
      const got = Long.fromString(k, true);
      expect({ lo: got.low, hi: got.high }).toStrictEqual(v);
      expect(got.toString()).toBe(k);
    });
  }
  describe("integration example", () => {
    test("should work", () => {
      const message = { int64Field: protoInt64.parse("9223372036854775807") };

      // convert the field value to a Long
      const bits = protoInt64.enc(message.int64Field);
      const longValue = Long.fromBits(bits.lo, bits.hi);

      // perform arithmetic
      const longResult = longValue.subtract(1);

      // set the result in the field
      message.int64Field = protoInt64.dec(longResult.low, longResult.high);

      // Assuming int64Field contains 9223372036854775807:
      expect(message.int64Field).toBe(protoInt64.parse("9223372036854775806"));
    });
  });
});

describe("protoInt64", function () {
  describe("parse()", () => {
    for (const [k] of Object.entries(SIGNED)) {
      test(`should parse string ${k}`, () => {
        const val = protoInt64.parse(k);
        expect(val.toString()).toBe(k);
        expect(typeof val === "bigint").toBe(protoInt64.supported);
        expect(typeof val === "string").toBe(!protoInt64.supported);
      });
      test(`should parse number ${k}`, () => {
        const number = Number(k);
        if (
          number <= Number.MAX_SAFE_INTEGER &&
          number >= Number.MIN_SAFE_INTEGER
        ) {
          const val = protoInt64.parse(k);
          expect(val.toString()).toBe(k);
          expect(typeof val === "bigint").toBe(protoInt64.supported);
          expect(typeof val === "string").toBe(!protoInt64.supported);
        }
      });
      if (protoInt64.supported) {
        test(`should parse bigint ${k}`, () => {
          const bigint = BigInt(k);
          const val = protoInt64.parse(bigint);
          expect(val.toString()).toBe(k);
          expect(typeof val).toBe("bigint");
        });
      }
    }
  });

  describe("uParse()", () => {
    for (const [k] of Object.entries(UNSIGNED)) {
      test(`should parse string ${k}`, () => {
        const val = protoInt64.uParse(k);
        expect(val.toString()).toBe(k);
        expect(typeof val === "bigint").toBe(protoInt64.supported);
        expect(typeof val === "string").toBe(!protoInt64.supported);
      });
      test(`should parse number ${k}`, () => {
        const number = Number(k);
        if (
          number <= Number.MAX_SAFE_INTEGER &&
          number >= Number.MIN_SAFE_INTEGER
        ) {
          const val = protoInt64.uParse(k);
          expect(val.toString()).toBe(k);
          expect(typeof val === "bigint").toBe(protoInt64.supported);
          expect(typeof val === "string").toBe(!protoInt64.supported);
        }
      });
      if (protoInt64.supported) {
        test(`should parse bigint ${k}`, () => {
          const bigint = BigInt(k);
          const val = protoInt64.uParse(bigint);
          expect(val.toString()).toBe(k);
          expect(typeof val).toBe("bigint");
        });
      }
    }
  });

  describe("enc()", () => {
    for (const [k, v] of Object.entries(SIGNED)) {
      test(`should encode string ${k}`, () => {
        expect(protoInt64.enc(k)).toStrictEqual(v);
      });
      test(`should encode number ${k}`, () => {
        const number = Number(k);
        if (
          number <= Number.MAX_SAFE_INTEGER &&
          number >= Number.MIN_SAFE_INTEGER
        ) {
          expect(protoInt64.enc(number)).toStrictEqual(v);
        }
      });
      if (protoInt64.supported) {
        test(`should encode bigint ${k}`, () => {
          for (const [k, v] of Object.entries(SIGNED)) {
            const bigint = BigInt(k);
            expect(protoInt64.enc(bigint)).toStrictEqual(v);
          }
        });
      }
    }
    test("should fail to encode invalid", () => {
      if (protoInt64.supported) {
        expect(() => protoInt64.enc(BigInt("18446744073709551615"))).toThrow(
          "invalid int64: 18446744073709551615",
        );
      }
    });
  });

  describe("uEnc()", () => {
    for (const [k, v] of Object.entries(UNSIGNED)) {
      test(`should encode string ${k}`, () => {
        expect(protoInt64.uEnc(k)).toStrictEqual(v);
      });
      test(`should encode number ${k}`, () => {
        const number = Number(k);
        if (
          number <= Number.MAX_SAFE_INTEGER &&
          number >= Number.MIN_SAFE_INTEGER
        ) {
          expect(protoInt64.uEnc(number)).toStrictEqual(v);
        }
      });
      if (protoInt64.supported) {
        test(`should encode bigint ${k}`, () => {
          const bigint = BigInt(k);
          expect(protoInt64.uEnc(bigint)).toStrictEqual(v);
        });
      }
    }
    test("should fail to encode invalid", () => {
      if (protoInt64.supported) {
        expect(() => protoInt64.uEnc(BigInt(-127))).toThrow(
          "invalid uint64: -127",
        );
        expect(() => protoInt64.uEnc(BigInt("-9007199254740991"))).toThrow(
          "invalid uint64: -9007199254740991",
        );
        expect(() => protoInt64.uEnc(BigInt("-9223372036854775808"))).toThrow(
          "invalid uint64: -9223372036854775808",
        );
      }
      expect(() => protoInt64.uEnc(-127)).toThrow("invalid uint64: -127");
      expect(() => protoInt64.uEnc("-9007199254740991")).toThrow(
        "invalid uint64: -9007199254740991",
      );
      expect(() => protoInt64.uEnc("-9223372036854775808")).toThrow(
        "invalid uint64: -9223372036854775808",
      );
    });
  });

  describe("dec()", () => {
    for (const [k, v] of Object.entries(SIGNED)) {
      test(`should decode ${k}`, () => {
        const val = protoInt64.dec(v.lo, v.hi);
        expect(val.toString()).toBe(k);
        expect(typeof val === "bigint").toBe(protoInt64.supported);
        expect(typeof val === "string").toBe(!protoInt64.supported);
      });
    }
  });

  describe("uDec()", () => {
    for (const [k, v] of Object.entries(UNSIGNED)) {
      test(`should decode ${k}`, () => {
        const val = protoInt64.uDec(v.lo, v.hi);
        expect(val.toString()).toBe(k);
        expect(typeof val === "bigint").toBe(protoInt64.supported);
        expect(typeof val === "string").toBe(!protoInt64.supported);
      });
    }
  });

  describe("zero", () => {
    if (protoInt64.supported) {
      test("zero is a string ", () => {
        expect(protoInt64.zero).toBe(BigInt(0));
      });
    } else {
      test("zero is a string ", () => {
        expect(protoInt64.zero).toBe("0");
      });
    }
  });
});
