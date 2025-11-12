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

import { suite, test, beforeEach, afterEach } from "node:test";
import * as assert from "node:assert";
import {
  getTextEncoding,
  configureTextEncoding,
} from "@bufbuild/protobuf/wire";

void suite("getTextEncoding()", () => {
  void test("returns TextEncoding", () => {
    const te = getTextEncoding();
    assert.ok(te !== undefined);
  });
  void test("returns same TextEncoding", () => {
    const te1 = getTextEncoding();
    const te2 = getTextEncoding();
    assert.strictEqual(te2, te1);
  });
  void suite("encodeUtf8()", () => {
    void test("encodes", () => {
      const bytes = getTextEncoding().encodeUtf8("hello 🌍");
      assert.deepStrictEqual(
        bytes,
        new Uint8Array([104, 101, 108, 108, 111, 32, 240, 159, 140, 141]),
      );
    });
  });
  void suite("decodeUtf8()", () => {
    void test("decodes", () => {
      const text = getTextEncoding().decodeUtf8(
        new Uint8Array([104, 101, 108, 108, 111, 32, 240, 159, 140, 141]),
      );
      assert.strictEqual(text, "hello 🌍");
    });
    void test("decodes errors as U+FFFD", () => {
      const text = getTextEncoding().decodeUtf8(
        new Uint8Array([104, 101, 108, 108, 111, 32, 240]),
      );
      assert.strictEqual(text, "hello \uFFFD");
    });
    void test("throws TypeError for errors, if strict is true", () => {
      assert.throws(
        () => {
          getTextEncoding().decodeUtf8(
            new Uint8Array([104, 101, 108, 108, 111, 32, 240]),
            true,
          );
        },
        {
          name: "TypeError",
        },
      );
    });
  });
  void suite("checkUtf8()", () => {
    void test("returns true for valid", () => {
      const valid = "🌍";
      const ok = getTextEncoding().checkUtf8(valid);
      assert.strictEqual(ok, true);
    });
    void test("returns false for invalid", () => {
      const invalid = "🌍".substring(0, 1);
      const ok = getTextEncoding().checkUtf8(invalid);
      assert.strictEqual(ok, false);
    });
  });
});

void suite("configureTextEncoding()", () => {
  let backup: ReturnType<typeof getTextEncoding>;
  beforeEach(() => {
    backup = getTextEncoding();
  });
  afterEach(() => {
    configureTextEncoding(backup);
  });
  void test("configures checkUtf8", () => {
    configureTextEncoding({
      checkUtf8(text: string): boolean {
        if (text === "valid") {
          return true;
        }
        return false;
      },
      decodeUtf8: backup.decodeUtf8,
      encodeUtf8: backup.encodeUtf8,
    });
    assert.strictEqual(getTextEncoding().checkUtf8("valid"), true);
    assert.strictEqual(getTextEncoding().checkUtf8("no valid"), false);
  });
  void test("configures decodeUtf8", () => {
    let arg: Uint8Array | undefined;
    configureTextEncoding({
      checkUtf8: backup.checkUtf8,
      decodeUtf8(bytes: Uint8Array): string {
        arg = bytes;
        return "custom decodeUtf8";
      },
      encodeUtf8: backup.encodeUtf8,
    });
    const bytes = new Uint8Array(10);
    const text = getTextEncoding().decodeUtf8(bytes);
    assert.strictEqual(text, "custom decodeUtf8");
    assert.strictEqual(arg, bytes);
  });
  void test("configures encodeUtf8", () => {
    let arg: string | undefined;
    configureTextEncoding({
      checkUtf8: backup.checkUtf8,
      decodeUtf8: backup.decodeUtf8,
      encodeUtf8(text: string) {
        arg = text;
        return new Uint8Array(10);
      },
    });
    assert.deepStrictEqual(
      getTextEncoding().encodeUtf8("test"),
      new Uint8Array(10),
    );
    assert.strictEqual(arg, "test");
  });
});
