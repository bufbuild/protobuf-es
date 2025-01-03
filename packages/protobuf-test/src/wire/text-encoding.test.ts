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

import { beforeEach, describe, expect, test } from "@jest/globals";
import {
  getTextEncoding,
  configureTextEncoding,
} from "@bufbuild/protobuf/wire";
import { afterEach } from "node:test";

describe("getTextEncoding()", () => {
  test("returns TextEncoding", () => {
    const te = getTextEncoding();
    expect(te).toBeDefined();
  });
  test("returns same TextEncoding", () => {
    const te1 = getTextEncoding();
    const te2 = getTextEncoding();
    expect(te2).toBe(te1);
  });
  describe("encodeUtf8()", () => {
    test("encodes", () => {
      const bytes = getTextEncoding().encodeUtf8("hello 🌍");
      expect(bytes).toStrictEqual(
        new Uint8Array([104, 101, 108, 108, 111, 32, 240, 159, 140, 141]),
      );
    });
  });
  describe("decodeUtf8()", () => {
    test("decodes", () => {
      const text = getTextEncoding().decodeUtf8(
        new Uint8Array([104, 101, 108, 108, 111, 32, 240, 159, 140, 141]),
      );
      expect(text).toBe("hello 🌍");
    });
  });
  describe("checkUtf8()", () => {
    test("returns true for valid", () => {
      const valid = "🌍";
      const ok = getTextEncoding().checkUtf8(valid);
      expect(ok).toBe(true);
    });
    test("returns false for invalid", () => {
      const invalid = "🌍".substring(0, 1);
      const ok = getTextEncoding().checkUtf8(invalid);
      expect(ok).toBe(false);
    });
  });
});

describe("configureTextEncoding()", () => {
  let backup: ReturnType<typeof getTextEncoding>;
  beforeEach(() => {
    backup = getTextEncoding();
  });
  afterEach(() => {
    configureTextEncoding(backup);
  });
  test("configures checkUtf8", () => {
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
    expect(getTextEncoding().checkUtf8("valid")).toBe(true);
    expect(getTextEncoding().checkUtf8("no valid")).toBe(false);
  });
  test("configures checkUtf8", () => {
    configureTextEncoding({
      checkUtf8: backup.checkUtf8,
      decodeUtf8: backup.decodeUtf8,
      encodeUtf8: backup.encodeUtf8,
    });
    expect(getTextEncoding().checkUtf8("valid")).toBe(true);
    expect(getTextEncoding().checkUtf8("no valid")).toBe(false);
  });
  test("configures decodeUtf8", () => {
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
    expect(text).toBe("custom decodeUtf8");
    expect(arg).toBe(bytes);
  });
  test("configures encodeUtf8", () => {
    let arg: string | undefined;
    configureTextEncoding({
      checkUtf8: backup.checkUtf8,
      decodeUtf8: backup.decodeUtf8,
      encodeUtf8(text: string): Uint8Array {
        arg = text;
        return new Uint8Array(10);
      },
    });
    expect(getTextEncoding().encodeUtf8("test")).toStrictEqual(
      new Uint8Array(10),
    );
    expect(arg).toBe("test");
  });
});
