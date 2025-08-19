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

import { suite, test } from "node:test";
import * as assert from "node:assert";
import {
  BinaryReader,
  BinaryWriter,
  sizeDelimitedDecodeStream,
  sizeDelimitedEncode,
  sizeDelimitedPeek,
  WireType,
} from "@bufbuild/protobuf/wire";
import { create, toBinary } from "@bufbuild/protobuf";
import { TestAllTypesProto3Schema } from "../gen/ts/google/protobuf/test_messages_proto3_pb.js";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createReadStream, createWriteStream } from "node:fs";

void suite("sizeDelimitedEncode()", () => {
  const desc = TestAllTypesProto3Schema;
  const msg = create(desc, {
    optionalBool: true,
  });
  void test("should store length as varint", () => {
    const bytes = sizeDelimitedEncode(desc, msg);
    const reader = new BinaryReader(bytes);
    const storedLength = reader.uint32();
    assert.strictEqual(storedLength, toBinary(desc, msg).byteLength);
  });
  void test("should store serialized message", () => {
    const bytes = sizeDelimitedEncode(desc, msg);
    const storeMessageBytes = new BinaryReader(bytes).bytes();
    assert.deepStrictEqual(storeMessageBytes, toBinary(desc, msg));
  });
  void test("should not store extra bytes", () => {
    const bytes = sizeDelimitedEncode(desc, msg);
    const reader = new BinaryReader(bytes);
    reader.skip(WireType.LengthDelimited);
    assert.strictEqual(reader.pos, reader.len);
  });
});

void suite("sizeDelimitedDecodeStream()", () => {
  void suite("with async generator", () => {
    const desc = TestAllTypesProto3Schema;
    const testMessages = [
      create(desc, {
        optionalBool: true,
      }),
      create(desc, {
        optionalInt32: 123,
      }),
    ];
    async function* createAsyncIterableBytes(
      bytes: Uint8Array,
      chunkSize = 2,
      delay = 5,
    ): AsyncIterable<Uint8Array> {
      let offset = 0;
      for (;;) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        const end = Math.min(offset + chunkSize, bytes.byteLength);
        yield bytes.slice(offset, end);
        offset = end;
        if (offset === bytes.length) {
          break;
        }
      }
    }
    void test("should decode stream", async () => {
      const stream = createAsyncIterableBytes(
        new BinaryWriter()
          .bytes(toBinary(desc, testMessages[0]))
          .bytes(toBinary(desc, testMessages[1]))
          .finish(),
      );
      let i = 0;
      for await (const dec of sizeDelimitedDecodeStream(desc, stream)) {
        assert.deepStrictEqual(dec, testMessages[i]);
        i++;
      }
      assert.strictEqual(i, 2);
    });
  });
  void suite("with Node.js APIS", () => {
    void test("should decode stream", async () => {
      const desc = TestAllTypesProto3Schema;
      const testMessages = [
        create(desc, {
          optionalBool: true,
        }),
        create(desc, {
          optionalInt32: 123,
        }),
      ];
      const path = join(tmpdir(), "protoDelimited.bin");
      const writeStream = createWriteStream(path, { encoding: "binary" });
      for (const m of testMessages) {
        writeStream.write(sizeDelimitedEncode(desc, m));
      }
      writeStream.end();
      await new Promise<void>((resolve, reject) =>
        writeStream.close((err) => (err ? reject(err) : resolve())),
      );
      const readStream = createReadStream(path);
      let i = 0;
      for await (const m of sizeDelimitedDecodeStream(desc, readStream)) {
        assert.deepStrictEqual(m, testMessages[i]);
        i++;
      }
    });
  });
});

void suite("sizeDelimitedPeek()", () => {
  for (const size of [0, 1, 2, 4, 8, 16, 32, 64, 0xffffffff]) {
    void suite(`with just a size ${size}`, () => {
      const bytes = new BinaryWriter().uint32(size).finish();
      void test("should return EOF", () => {
        const got = sizeDelimitedPeek(bytes);
        assert.strictEqual(got.size, size);
      });
      void test("should return expected offset", () => {
        const got = sizeDelimitedPeek(bytes);
        assert.strictEqual(got.offset, bytes.byteLength);
      });
    });
  }
  void suite("with incomplete varint", () => {
    const complete = new BinaryWriter().uint32(0xffffffff).finish(); // uint32 max is 5 bytes as varint
    for (const x of [0, 1, 2, 3, 4]) {
      void test(`should return EOF for ${x}`, () => {
        const bytes = complete.slice(0, x);
        const got = sizeDelimitedPeek(bytes);
        assert.strictEqual(got.eof, true);
      });
    }
  });
  void suite("with invalid varint", () => {
    const invalid = new Uint8Array([
      0xde, 0xad, 0xbe, 0xef, 0xde, 0xad, 0xbe, 0xef, 0xde, 0xad,
    ]);
    void test("should raise error", () => {
      assert.throws(() => sizeDelimitedPeek(invalid), {
        name: "Error",
        message: "invalid varint",
      });
    });
  });
  void suite("with size and message", () => {
    const desc = TestAllTypesProto3Schema;
    const msg = create(desc, {
      optionalBool: true,
    });
    const msgBytes = toBinary(desc, msg);
    const bytes = new BinaryWriter()
      .uint32(msgBytes.byteLength)
      .raw(msgBytes)
      .finish();
    void test("should return size", () => {
      const got = sizeDelimitedPeek(bytes);
      assert.strictEqual(got.size, msgBytes.byteLength);
    });
    void test("should return expected offset", () => {
      const got = sizeDelimitedPeek(bytes);
      assert.strictEqual(got.offset, bytes.byteLength - msgBytes.byteLength);
    });
  });
});
