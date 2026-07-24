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

import * as assert from "node:assert";
import { suite, test } from "node:test";
import {
  create,
  createRegistry,
  equals,
  fromBinary,
  getExtension,
  protoInt64,
  setExtension,
  toBinary,
} from "@bufbuild/protobuf";
import { fromText, mergeFromText, toText } from "@bufbuild/protobuf/txtpb";
import { AnySchema, anyPack } from "@bufbuild/protobuf/wkt";
import {
  file_extra_extensions_proto2,
  Proto2ExtMessageSchema,
  Proto2ExtendeeSchema,
  repeated_message_ext,
  string_ext,
} from "./gen/ts/extra/extensions-proto2_pb.js";
import {
  file_google_protobuf_test_messages_proto2,
  GroupFieldSchema,
  groupfield,
  TestAllTypesProto2Schema,
  TestAllTypesProto2_NestedEnum,
} from "./gen/ts/google/protobuf/test_messages_proto2_pb.js";
import {
  TestAllTypesProto3Schema,
  TestAllTypesProto3_NestedEnum,
} from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";
import {
  Edition2023FromProto2MessageSchema,
  Edition2023MessageSchema,
} from "./gen/ts/extra/edition2023_pb.js";

// The text format requires BigInt. These tests exercise it, so they are skipped
// in the string fall-back enabled by BUF_BIGINT_DISABLE; the "text format
// without BigInt" suite at the bottom covers that environment instead.
void suite(
  "text format",
  { skip: protoInt64.supported ? false : "requires BigInt" },
  () => {
    void suite("round-trip closure", () => {
      // The single highest-value property: fromText(toText(m)) deep-equals m,
      // and toText is stable. A broad typed corpus exercises every scalar type,
      // repeated fields, maps, oneofs, enums, and nested messages at once, which
      // catches escaping, ordering, and sign divergences between read and write.
      test("preserves a broad proto3 message", () => {
        const want = create(TestAllTypesProto3Schema, {
          optionalInt32: -42,
          optionalInt64: protoInt64.parse("-9223372036854775808"),
          optionalUint32: 4294967295,
          optionalUint64: protoInt64.uParse("18446744073709551615"),
          optionalSint64: protoInt64.parse("-1"),
          optionalFixed32: 7,
          optionalFloat: 0.5,
          optionalDouble: 12345.6789,
          optionalBool: true,
          optionalString: 'a "quote", tab\t, newline\n, é 🎉',
          optionalBytes: new Uint8Array([0, 1, 2, 0x7f, 0x80, 0xff]),
          optionalNestedMessage: { a: 17 },
          optionalNestedEnum: TestAllTypesProto3_NestedEnum.BAZ,
          repeatedInt32: [1, 2, 3],
          repeatedString: ["x", "y"],
          repeatedNestedMessage: [{ a: 1 }, { a: 2 }],
          mapStringString: { one: "1", two: "2" },
          mapInt32Int32: { 1: 10, 2: 20 },
          mapStringNestedMessage: { k: { a: 5 } },
          oneofField: { case: "oneofUint32", value: 123 },
        });
        const text = toText(TestAllTypesProto3Schema, want);
        const got = fromText(TestAllTypesProto3Schema, text);
        assert.ok(equals(TestAllTypesProto3Schema, want, got), text);
        assert.strictEqual(toText(TestAllTypesProto3Schema, got), text);
      });

      // proto3 has no groups, required fields, closed enums, or explicit
      // defaults, so a proto2 message covers what proto3 cannot.
      test("preserves a broad proto2 message (groups, closed enum)", () => {
        const want = create(TestAllTypesProto2Schema, {
          optionalInt32: -7,
          optionalInt64: protoInt64.parse("9223372036854775807"),
          optionalString: "hello",
          optionalNestedEnum: TestAllTypesProto2_NestedEnum.NEG,
          data: { groupInt32: 5, groupUint32: 6 },
          repeatedNestedEnum: [
            TestAllTypesProto2_NestedEnum.FOO,
            TestAllTypesProto2_NestedEnum.BAZ,
          ],
        });
        const text = toText(TestAllTypesProto2Schema, want);
        const got = fromText(TestAllTypesProto2Schema, text);
        assert.ok(equals(TestAllTypesProto2Schema, want, got), text);
        assert.strictEqual(toText(TestAllTypesProto2Schema, got), text);
      });

      // proto2 fields with an explicit default (default_int32 = -123456789,
      // default_string = "Rosebud"). Explicit presence means a field set even to
      // its default value is emitted and round-trips; an unset one is omitted.
      test("preserves proto2 explicit-default fields", () => {
        for (const init of [
          { defaultInt32: 5, defaultString: "x" },
          { defaultInt32: -123456789, defaultString: "Rosebud" },
        ]) {
          const want = create(TestAllTypesProto2Schema, init);
          const text = toText(TestAllTypesProto2Schema, want);
          assert.match(text, /default_int32:/);
          const got = fromText(TestAllTypesProto2Schema, text);
          assert.ok(equals(TestAllTypesProto2Schema, want, got), text);
        }
        // An unset default field is not emitted, and reads back as its default.
        assert.strictEqual(
          toText(TestAllTypesProto2Schema, create(TestAllTypesProto2Schema)),
          "",
        );
        assert.strictEqual(
          fromText(TestAllTypesProto2Schema, "").defaultString,
          "Rosebud",
        );
      });
    });

    void suite("toText formatting", () => {
      test("uses 2-space indent, one field per line, trailing newline", () => {
        const msg = create(TestAllTypesProto3Schema, {
          optionalInt32: 1,
          optionalNestedMessage: { a: 2 },
          repeatedInt32: [3, 4],
        });
        assert.strictEqual(
          toText(TestAllTypesProto3Schema, msg),
          "optional_int32: 1\n" +
            "optional_nested_message: {\n  a: 2\n}\n" +
            "repeated_int32: 3\n" +
            "repeated_int32: 4\n",
        );
      });
      test("writes fields in declaration order", () => {
        // Fields are emitted in declaration order. In this proto declaration
        // order happens to equal field-number order, so a regression to sorting
        // by number is caught instead by the extension-ordering test below,
        // where the two orders disagree.
        const msg = create(TestAllTypesProto3Schema, {
          optionalInt32: 1,
          recursiveMessage: { optionalInt32: 2 },
        });
        assert.strictEqual(
          toText(TestAllTypesProto3Schema, msg),
          "optional_int32: 1\nrecursive_message: {\n  optional_int32: 2\n}\n",
        );
      });
      test("renders an empty submessage inline as {}", () => {
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            create(TestAllTypesProto3Schema, { optionalNestedMessage: {} }),
          ),
          "optional_nested_message: {}\n",
        );
      });
      test("returns an empty string for an empty message", () => {
        assert.strictEqual(
          toText(TestAllTypesProto3Schema, create(TestAllTypesProto3Schema)),
          "",
        );
      });
      test("escapes strings: controls, quotes, C1, raw UTF-8", () => {
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            create(TestAllTypesProto3Schema, {
              optionalString: 'tab\tnl\n"q"\\b\x7f\u0085é',
            }),
          ),
          'optional_string: "tab\\tnl\\n\\"q\\"\\\\b\\x7f\\u0085é"\n',
        );
      });
      test("escapes bytes: invalid UTF-8 as \\xHH, valid runs raw", () => {
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            create(TestAllTypesProto3Schema, {
              optionalBytes: new Uint8Array([0x00, 0x41, 0xc3, 0xa9, 0xff]),
            }),
          ),
          // 0x00 -> \x00, A raw, 0xc3 0xa9 is valid UTF-8 "é" raw, 0xff invalid.
          'optional_bytes: "\\x00Aé\\xff"\n',
        );
      });
      test("writes non-mnemonic C0 controls as \\xHH, like protobuf-go", () => {
        // 0x07/0x08/0x0b/0x0c have C mnemonics (\a \b \v \f) but the write path
        // deliberately does not use them; only \n \r \t are mnemonics.
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            create(TestAllTypesProto3Schema, {
              optionalBytes: new Uint8Array([0x07, 0x08, 0x0b, 0x0c]),
            }),
          ),
          'optional_bytes: "\\x07\\x08\\x0b\\x0c"\n',
        );
      });
      test("renders float and double special values", () => {
        const cases: [number, string][] = [
          [Number.POSITIVE_INFINITY, "inf"],
          [Number.NEGATIVE_INFINITY, "-inf"],
          [Number.NaN, "nan"],
          [-0, "-0"],
        ];
        for (const [value, repr] of cases) {
          assert.strictEqual(
            toText(
              TestAllTypesProto3Schema,
              create(TestAllTypesProto3Schema, { optionalDouble: value }),
            ),
            `optional_double: ${repr}\n`,
          );
        }
      });
      test("writes float as the shortest single-precision decimal", () => {
        const parsed = fromText(
          TestAllTypesProto3Schema,
          "optional_float: 0.1",
        );
        assert.strictEqual(parsed.optionalFloat, 0.10000000149011612);
        assert.strictEqual(
          toText(TestAllTypesProto3Schema, parsed),
          "optional_float: 0.1\n",
        );
        // float overflow prints inf, not the JS "Infinity".
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            fromText(TestAllTypesProto3Schema, "optional_float: 1e50"),
          ),
          "optional_float: inf\n",
        );
        // float underflow to negative zero keeps its sign.
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            create(TestAllTypesProto3Schema, { optionalFloat: -1e-50 }),
          ),
          "optional_float: -0\n",
        );
      });
      test("renders enums by name, unknown numbers as integers", () => {
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            create(TestAllTypesProto3Schema, { optionalNestedEnum: 2 }),
          ),
          "optional_nested_enum: BAZ\n",
        );
        assert.strictEqual(
          toText(
            TestAllTypesProto3Schema,
            // @ts-expect-error 99 is an open-enum value outside the known set
            create(TestAllTypesProto3Schema, { optionalNestedEnum: 99 }),
          ),
          "optional_nested_enum: 99\n",
        );
      });
    });

    void suite("fromText scalars", () => {
      test("parses integers in decimal, hex, and octal", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_int32: 0x7fffffff")
            .optionalInt32,
          2147483647,
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_int32: -010")
            .optionalInt32,
          -8,
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_uint32: 0xff")
            .optionalUint32,
          255,
        );
      });
      test("parses 64-bit integers as bigint", () => {
        const msg = fromText(
          TestAllTypesProto3Schema,
          "optional_int64: -9223372036854775808 optional_uint64: 18446744073709551615",
        );
        assert.strictEqual(
          msg.optionalInt64,
          protoInt64.parse("-9223372036854775808"),
        );
        assert.strictEqual(
          msg.optionalUint64,
          protoInt64.uParse("18446744073709551615"),
        );
      });
      test("parses float literals, suffixes, and overflow to inf", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_float: 1.5f")
            .optionalFloat,
          1.5,
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_float: 1e50")
            .optionalFloat,
          Number.POSITIVE_INFINITY,
        );
        assert.ok(
          Number.isNaN(
            fromText(TestAllTypesProto3Schema, "optional_float: NaN")
              .optionalFloat,
          ),
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_double: -Infinity")
            .optionalDouble,
          Number.NEGATIVE_INFINITY,
        );
      });
      test("rejects numbers with no significand digit", () => {
        for (const bad of [".e5", ".E5", "-.e5", "1.e", ".", "-."]) {
          assert.throws(
            () => fromText(TestAllTypesProto3Schema, `optional_float: ${bad}`),
            `optional_float: ${bad} should be rejected`,
          );
        }
      });
      test("parses bool as keywords and 0/1", () => {
        for (const t of ["true", "True", "t", "1"]) {
          assert.strictEqual(
            fromText(TestAllTypesProto3Schema, `optional_bool: ${t}`)
              .optionalBool,
            true,
          );
        }
        for (const f of ["false", "False", "f", "0"]) {
          assert.strictEqual(
            fromText(TestAllTypesProto3Schema, `optional_bool: ${f}`)
              .optionalBool,
            false,
          );
        }
      });
      test("concatenates adjacent string literals", () => {
        assert.strictEqual(
          fromText(
            TestAllTypesProto3Schema,
            'optional_string: "foo" \'bar\' "baz"',
          ).optionalString,
          "foobarbaz",
        );
      });
      test("decodes octal, hex, and unicode escapes", () => {
        assert.strictEqual(
          fromText(
            TestAllTypesProto3Schema,
            'optional_string: "\\u0041\\x42\\103"',
          ).optionalString,
          "ABC",
        );
        assert.deepStrictEqual(
          fromText(TestAllTypesProto3Schema, 'optional_bytes: "\\xde\\xad"')
            .optionalBytes,
          new Uint8Array([0xde, 0xad]),
        );
      });
    });

    void suite("sign x type matrix", () => {
      test("a sign may be separated from the digits by whitespace", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_int32: - 42")
            .optionalInt32,
          -42,
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_double: -inf")
            .optionalDouble,
          Number.NEGATIVE_INFINITY,
        );
      });
      test("rejects -nan", () => {
        assert.throws(() =>
          fromText(TestAllTypesProto3Schema, "optional_double: -nan"),
        );
      });
      test("requires the sign glued to inf/infinity, like protobuf-go", () => {
        // Whitespace may separate the sign from digits, but not from a float
        // literal: "-inf" is negative infinity, "- inf" is an error.
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_double: -infinity")
            .optionalDouble,
          Number.NEGATIVE_INFINITY,
        );
        for (const bad of [
          "optional_double: - inf",
          "optional_double: - infinity",
          "optional_double: - nan",
        ]) {
          assert.throws(
            () => fromText(TestAllTypesProto3Schema, bad),
            `${bad} should be rejected`,
          );
        }
      });
      test("rejects a sign on unsigned, bool, and enum names", () => {
        for (const bad of [
          "optional_uint32: -1",
          "optional_uint32: -0",
          "optional_uint64: -1",
          "optional_bool: -1",
          "optional_bool: -0",
        ]) {
          assert.throws(
            () => fromText(TestAllTypesProto3Schema, bad),
            `${bad} should be rejected`,
          );
        }
        // A sign on an enum name is invalid; a sign on an enum number is fine
        // for an open enum.
        assert.throws(() =>
          fromText(TestAllTypesProto2Schema, "optional_nested_enum: -BAZ"),
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_nested_enum: -1")
            .optionalNestedEnum,
          -1,
        );
      });
    });

    void suite("fromText structure", () => {
      test("colon optional before messages, required for scalars", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_nested_message { a: 1 }")
            .optionalNestedMessage?.a,
          1,
        );
        assert.throws(() =>
          fromText(TestAllTypesProto3Schema, "optional_int32 1"),
        );
      });
      test("accepts angle brackets as message delimiters", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_nested_message < a: 7 >")
            .optionalNestedMessage?.a,
          7,
        );
      });
      test("accepts repeated fields and list syntax", () => {
        assert.deepStrictEqual(
          fromText(
            TestAllTypesProto3Schema,
            "repeated_int32: 1 repeated_int32: 2 repeated_int32: 3",
          ).repeatedInt32,
          [1, 2, 3],
        );
        assert.deepStrictEqual(
          fromText(TestAllTypesProto3Schema, "repeated_int32: [4, 5, 6]")
            .repeatedInt32,
          [4, 5, 6],
        );
      });
      test("ignores comments and comma/semicolon separators", () => {
        const msg = fromText(
          TestAllTypesProto3Schema,
          "# a comment\noptional_int32: 1, # trailing\noptional_int64: 2;",
        );
        assert.strictEqual(msg.optionalInt32, 1);
        assert.strictEqual(msg.optionalInt64, protoInt64.parse(2));
      });
      test("skips a leading byte-order mark", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "﻿optional_int32: 1").optionalInt32,
          1,
        );
      });
      test("treats comment-only and empty input as an empty message", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "  # nothing here\n")
            .optionalInt32,
          0,
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "").optionalInt32,
          0,
        );
      });
    });

    void suite("separator matrix", () => {
      test("accepts a single trailing separator", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_int32: 1,")
            .optionalInt32,
          1,
        );
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_int32: 1;")
            .optionalInt32,
          1,
        );
      });
      test("rejects doubled and trailing separators", () => {
        for (const bad of [
          "optional_int32: 1;;",
          "optional_int32: 1,,",
          "repeated_int32: [1,]",
          "repeated_int32: [1,,2]",
          "optional_nested_message { a: 1,, }",
        ]) {
          assert.throws(
            () => fromText(TestAllTypesProto3Schema, bad),
            `${bad} should be rejected`,
          );
        }
      });
      test("requires a list separator except between strings", () => {
        // Non-string list elements need a separator.
        assert.throws(() =>
          fromText(TestAllTypesProto3Schema, "repeated_int32: [1 2]"),
        );
        // Adjacent string literals concatenate into a single element.
        assert.deepStrictEqual(
          fromText(TestAllTypesProto3Schema, 'repeated_string: ["a" "b"]')
            .repeatedString,
          ["ab"],
        );
        assert.deepStrictEqual(
          fromText(TestAllTypesProto3Schema, 'repeated_string: ["a", "b"]')
            .repeatedString,
          ["a", "b"],
        );
      });
      test("rejects trailing tokens after the top message", () => {
        assert.throws(() =>
          fromText(TestAllTypesProto3Schema, "optional_int32: 1 }"),
        );
      });
    });

    void suite("maps", () => {
      test("parses entries and keeps insertion order", () => {
        const msg = fromText(
          TestAllTypesProto3Schema,
          'map_string_string { key: "a" value: "b" } map_string_string { key: "c" value: "d" }',
        );
        assert.deepStrictEqual(msg.mapStringString, { a: "b", c: "d" });
      });
      test("last entry wins for a duplicate key across entries", () => {
        const msg = fromText(
          TestAllTypesProto3Schema,
          "map_int32_int32 { key: 1 value: 2 } map_int32_int32 { key: 1 value: 3 }",
        );
        assert.deepStrictEqual(msg.mapInt32Int32, { 1: 3 });
      });
      test("rejects a duplicate key or value within one entry", () => {
        assert.throws(() =>
          fromText(
            TestAllTypesProto3Schema,
            "map_int32_int32 { key: 1 key: 2 value: 3 }",
          ),
        );
        assert.throws(() =>
          fromText(
            TestAllTypesProto3Schema,
            "map_int32_int32 { key: 1 value: 2 value: 3 }",
          ),
        );
      });
      test("emits map entries in insertion order, without sorting", () => {
        // String keys preserve insertion order in a JS object. We emit them in
        // that order; protobuf-go would sort them to a, b, c. (Integer keys are
        // always numeric in JS, so a string-keyed map is what makes the
        // deliberate no-sort divergence observable.)
        const text = toText(
          TestAllTypesProto3Schema,
          create(TestAllTypesProto3Schema, {
            mapStringString: { b: "1", a: "2", c: "3" },
          }),
        );
        const keys = [...text.matchAll(/key: "(\w)"/g)].map((m) => m[1]);
        assert.deepStrictEqual(keys, ["b", "a", "c"]);
      });
    });

    void suite("fromText errors", () => {
      test("rejects unknown fields", () => {
        assert.throws(
          () => fromText(TestAllTypesProto3Schema, "no_such_field: 1"),
          /unknown field/,
        );
      });
      test("silently skips reserved field names", () => {
        const msg = fromText(
          TestAllTypesProto3Schema,
          "reserved_field: 123 optional_int32: 7",
        );
        assert.strictEqual(msg.optionalInt32, 7);
      });
      test("rejects a repeated singular field and a repeated oneof", () => {
        assert.throws(
          () =>
            fromText(
              TestAllTypesProto3Schema,
              "optional_int32: 1 optional_int32: 2",
            ),
          /repeated/,
        );
        assert.throws(
          () =>
            fromText(
              TestAllTypesProto3Schema,
              'oneof_uint32: 1 oneof_string: "x"',
            ),
          /oneof/,
        );
      });
      test("rejects a field addressed by number", () => {
        assert.throws(() => fromText(TestAllTypesProto3Schema, "5: 1"));
      });
      test("rejects out-of-range integers via reflect", () => {
        assert.throws(() =>
          fromText(TestAllTypesProto3Schema, "optional_int32: 2147483648"),
        );
      });
      test("rejects malformed octal but accepts valid octal", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_int32: 010")
            .optionalInt32,
          8,
        );
        assert.throws(() =>
          fromText(TestAllTypesProto3Schema, "optional_int32: 08"),
        );
        assert.throws(() =>
          fromText(TestAllTypesProto3Schema, "optional_float: 010"),
        );
      });
      test("rejects surrogate unicode escapes (lone and paired)", () => {
        for (const bad of ["\\ud800", "\\ud801\\udc37", "\\U00110000"]) {
          assert.throws(
            () =>
              fromText(TestAllTypesProto3Schema, `optional_string: '${bad}'`),
            `${bad} should be rejected`,
          );
        }
      });
      test("enforces the recursion limit, including the reserved-skip path", () => {
        let nested = "optional_int32: 1";
        for (let i = 0; i < 200; i++) {
          nested = `recursive_message { ${nested} }`;
        }
        assert.throws(
          () =>
            fromText(TestAllTypesProto3Schema, nested, { recursionLimit: 100 }),
          /recursion/,
        );
        // The reserved-skip path is guarded too: a reserved field whose value is
        // a deeply nested message must not bypass the limit.
        let skip = "reserved_field { ";
        for (let i = 0; i < 200; i++) {
          skip += "a { ";
        }
        assert.throws(
          () =>
            fromText(TestAllTypesProto3Schema, skip, { recursionLimit: 100 }),
          /recursion/,
        );
        // The map-entry path is guarded too: nesting through map entry values
        // must not bypass the limit.
        let map = "optional_int32: 1";
        for (let i = 0; i < 100; i++) {
          map = `map_string_nested_message { key: "k" value { corecursive { ${map} } } }`;
        }
        assert.throws(
          () =>
            fromText(TestAllTypesProto3Schema, map, { recursionLimit: 100 }),
          /recursion/,
        );
      });
    });

    void suite("closed vs open enums", () => {
      test("rejects unknown numbers for a closed (proto2) enum", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto2Schema, "optional_nested_enum: BAZ")
            .optionalNestedEnum,
          2,
        );
        assert.throws(() =>
          fromText(TestAllTypesProto2Schema, "optional_nested_enum: 99"),
        );
      });
      test("accepts unknown numbers for an open (proto3) enum", () => {
        assert.strictEqual(
          fromText(TestAllTypesProto3Schema, "optional_nested_enum: 99")
            .optionalNestedEnum,
          99,
        );
      });
    });

    void suite("groups", () => {
      test("addresses a group by its message type name and lowercase alias", () => {
        const text = toText(
          TestAllTypesProto2Schema,
          create(TestAllTypesProto2Schema, { data: { groupInt32: 5 } }),
        );
        assert.match(text, /^Data: \{\n {2}group_int32: 5\n\}\n$/);
        assert.strictEqual(
          fromText(TestAllTypesProto2Schema, "Data { group_int32: 9 }").data
            ?.groupInt32,
          9,
        );
        assert.strictEqual(
          fromText(TestAllTypesProto2Schema, "data { group_int32: 9 }").data
            ?.groupInt32,
          9,
        );
      });
      test("addresses a group extension by its field name, not its message type name", () => {
        // A group declared as an extension is addressed by its extension field
        // full name (lowercase), never by the group message name — the opposite
        // of a regular group field above. (conformance GroupFieldExtension /
        // GroupFieldExtensionGroupName.)
        const registry = createRegistry(
          file_google_protobuf_test_messages_proto2,
        );
        const msg = create(TestAllTypesProto2Schema);
        setExtension(
          msg,
          groupfield,
          create(GroupFieldSchema, { groupInt32: 7 }),
        );
        const text = toText(TestAllTypesProto2Schema, msg, { registry });
        assert.match(text, /\[protobuf_test_messages\.proto2\.groupfield\]/);
        assert.doesNotMatch(text, /GroupField/);
        assert.ok(
          equals(
            TestAllTypesProto2Schema,
            msg,
            fromText(TestAllTypesProto2Schema, text, { registry }),
          ),
          text,
        );
        // Addressing it by the GroupField message name is rejected.
        assert.throws(() =>
          fromText(
            TestAllTypesProto2Schema,
            "[protobuf_test_messages.proto2.GroupField] { group_int32: 1 }",
            { registry },
          ),
        );
      });
    });

    void suite("editions delimited", () => {
      // delimitedEncoding here comes from [features.message_encoding=DELIMITED],
      // not the proto2 `group` keyword — isGroupLike must treat them identically.
      test("group-like delimited field uses the message name (+ lowercase alias)", () => {
        const want = create(Edition2023FromProto2MessageSchema, {
          optionalgroup: { int32Field: 5 },
        });
        const text = toText(Edition2023FromProto2MessageSchema, want);
        assert.match(text, /^OptionalGroup: \{/m);
        assert.ok(
          equals(
            Edition2023FromProto2MessageSchema,
            want,
            fromText(Edition2023FromProto2MessageSchema, text),
          ),
          text,
        );
        for (const name of ["OptionalGroup", "optionalgroup"]) {
          assert.strictEqual(
            fromText(
              Edition2023FromProto2MessageSchema,
              `${name} { int32_field: 9 }`,
            ).optionalgroup?.int32Field,
            9,
          );
        }
      });
      test("non-group-like delimited field uses the field name", () => {
        const want = create(Edition2023MessageSchema, {
          explicitMessageDelimitedField: {},
        });
        const text = toText(Edition2023MessageSchema, want);
        assert.match(text, /^explicit_message_delimited_field: \{\}/m);
        assert.ok(
          equals(
            Edition2023MessageSchema,
            want,
            fromText(Edition2023MessageSchema, text),
          ),
          text,
        );
      });
    });

    void suite("extensions", () => {
      const registry = createRegistry(file_extra_extensions_proto2);
      test("round-trips singular and repeated extensions, sorted by name", () => {
        const msg = create(Proto2ExtendeeSchema, { ownField: 1 });
        setExtension(msg, string_ext, "hello");
        setExtension(msg, repeated_message_ext, [
          create(Proto2ExtMessageSchema, { stringField: "x" }),
          create(Proto2ExtMessageSchema, { stringField: "y" }),
        ]);
        const text = toText(Proto2ExtendeeSchema, msg, { registry });
        assert.match(text, /\[proto2ext\.string_ext\]: "hello"/);
        // Regular fields come first, then extensions sorted by full name.
        const ownIdx = text.indexOf("own_field");
        const rIdx = text.indexOf("[proto2ext.repeated_message_ext]");
        const sIdx = text.indexOf("[proto2ext.string_ext]");
        assert.ok(ownIdx >= 0 && ownIdx < rIdx && rIdx < sIdx, text);
        const got = fromText(Proto2ExtendeeSchema, text, { registry });
        assert.strictEqual(getExtension(got, string_ext), "hello");
        assert.strictEqual(getExtension(got, repeated_message_ext).length, 2);
      });
      test("rejects an unknown extension", () => {
        assert.throws(() =>
          fromText(Proto2ExtendeeSchema, "[proto2ext.nope]: 1", { registry }),
        );
      });
      test("rejects a repeated singular extension, naming it by bracket", () => {
        assert.throws(
          () =>
            fromText(
              Proto2ExtendeeSchema,
              '[proto2ext.string_ext]: "a" [proto2ext.string_ext]: "b"',
              { registry },
            ),
          /\[proto2ext\.string_ext\]/,
        );
      });
      test("rejects a known extension used on the wrong message", () => {
        // string_ext extends Proto2Extendee, not Proto2ExtMessage.
        assert.throws(() =>
          fromText(Proto2ExtMessageSchema, '[proto2ext.string_ext]: "x"', {
            registry,
          }),
        );
      });
    });

    void suite("google.protobuf.Any", () => {
      const registry = createRegistry(TestAllTypesProto3Schema, AnySchema);
      test("round-trips the expanded form", () => {
        const payload = create(TestAllTypesProto3Schema, { optionalInt32: 42 });
        const any = anyPack(TestAllTypesProto3Schema, payload);
        const text = toText(AnySchema, any, { registry });
        assert.match(
          text,
          /^\[type\.googleapis\.com\/protobuf_test_messages\.proto3\.TestAllTypesProto3\]: \{\n {2}optional_int32: 42\n\}\n$/,
        );
        assert.ok(
          equals(AnySchema, any, fromText(AnySchema, text, { registry })),
        );
      });
      test("falls back to type_url/value without a registry", () => {
        const any = anyPack(
          TestAllTypesProto3Schema,
          create(TestAllTypesProto3Schema, { optionalInt32: 1 }),
        );
        const text = toText(AnySchema, any);
        assert.match(text, /^type_url: /);
        assert.match(text, /\nvalue: /);
      });
      test("rejects mixing the expanded form with type_url/value", () => {
        assert.throws(() =>
          fromText(
            AnySchema,
            '[type.googleapis.com/protobuf_test_messages.proto3.TestAllTypesProto3] {} type_url: "x"',
            { registry },
          ),
        );
      });
      test("rejects an invalid type-URL percent-escape", () => {
        assert.throws(() =>
          fromText(AnySchema, "[type.googleapis.com/%ZZ/foo.Bar] {}", {
            registry,
          }),
        );
      });
    });

    void suite("lone surrogates", () => {
      test("substitute U+FFFD instead of breaking the round-trip", () => {
        const msg = create(TestAllTypesProto3Schema, {
          optionalString: "\uD800",
        });
        const back = fromText(
          TestAllTypesProto3Schema,
          toText(TestAllTypesProto3Schema, msg),
        );
        assert.strictEqual(back.optionalString, "�");
      });
    });

    void suite("mergeFromText", () => {
      test("appends to repeated fields and merges messages", () => {
        const msg = create(TestAllTypesProto3Schema, {
          repeatedInt32: [1],
          optionalNestedMessage: { a: 1 },
        });
        mergeFromText(
          TestAllTypesProto3Schema,
          msg,
          "repeated_int32: 2 optional_nested_message { corecursive { optional_int32: 9 } }",
        );
        assert.deepStrictEqual(msg.repeatedInt32, [1, 2]);
        assert.strictEqual(msg.optionalNestedMessage?.a, 1);
        assert.strictEqual(
          msg.optionalNestedMessage?.corecursive?.optionalInt32,
          9,
        );
      });
      test("overwrites singular fields and map keys (last wins)", () => {
        const msg = create(TestAllTypesProto3Schema, {
          optionalInt32: 1,
          mapStringString: { k: "old", keep: "me" },
        });
        mergeFromText(
          TestAllTypesProto3Schema,
          msg,
          'optional_int32: 2 map_string_string { key: "k" value: "new" }',
        );
        assert.strictEqual(msg.optionalInt32, 2);
        assert.deepStrictEqual(msg.mapStringString, { k: "new", keep: "me" });
      });
    });

    void suite("unknown fields", () => {
      test("omitted by default, printed by number on request", () => {
        const bytes = toBinary(
          TestAllTypesProto3Schema,
          create(TestAllTypesProto3Schema, { optionalInt32: 1 }),
        );
        // Append an unknown varint field 999 = 5. Tag = (999 << 3) | 0.
        const withUnknown = new Uint8Array(bytes.length + 3);
        withUnknown.set(bytes);
        withUnknown.set([0xb8, 0x3e, 0x05], bytes.length);
        const msg = fromBinary(TestAllTypesProto3Schema, withUnknown);
        assert.strictEqual(
          toText(TestAllTypesProto3Schema, msg),
          "optional_int32: 1\n",
        );
        assert.strictEqual(
          toText(TestAllTypesProto3Schema, msg, { printUnknownFields: true }),
          "optional_int32: 1\n999: 5\n",
        );
      });
      test("numbered output cannot be parsed back", () => {
        assert.throws(() => fromText(TestAllTypesProto3Schema, "999: 5"));
      });
    });
  },
);

// The text format is only supported with BigInt. fromText, mergeFromText, and
// toText must throw immediately when BigInt is unavailable, rather than fall
// back to a string representation the way the JSON and binary codecs do.
void suite(
  "text format without BigInt",
  {
    skip: protoInt64.supported
      ? "requires an environment without BigInt"
      : false,
  },
  () => {
    test("fromText throws", () => {
      assert.throws(
        () => fromText(TestAllTypesProto3Schema, "optional_int32: 1"),
        /requires BigInt/,
      );
    });
    test("mergeFromText throws", () => {
      assert.throws(
        () =>
          mergeFromText(
            TestAllTypesProto3Schema,
            create(TestAllTypesProto3Schema),
            "optional_int32: 1",
          ),
        /requires BigInt/,
      );
    });
    test("toText throws", () => {
      assert.throws(
        () =>
          toText(TestAllTypesProto3Schema, create(TestAllTypesProto3Schema)),
        /requires BigInt/,
      );
    });
  },
);
