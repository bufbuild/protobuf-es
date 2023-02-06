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

import { describe, expect, it } from "@jest/globals";
import {
  BinaryReader,
  BinaryWriter,
  Message,
  MessageType,
  protoDelimited,
  WireType,
} from "@bufbuild/protobuf";
import { TestAllTypesProto3 } from "./gen/ts/google/protobuf/test_messages_proto3_pb.js";

describe("protoDelimited", function () {
  const testMessages = [
    new TestAllTypesProto3({
      optionalBool: true,
    }),
    new TestAllTypesProto3({
      optionalInt32: 123,
    }),
  ];
  const testMessagesBytes = testMessages.map((m) => m.toBinary());
  const testMessagesSizes = testMessagesBytes.map((b) => b.byteLength);

  describe("enc", function () {
    it("should store length as varint", function () {
      const serialized = protoDelimited.enc(testMessages[0]);
      const reader = new BinaryReader(serialized);
      const storedLength = reader.uint32();
      expect(storedLength).toBe(testMessagesSizes[0]);
    });
    it("should store serialized message", function () {
      const serialized = protoDelimited.enc(testMessages[0]);
      const storeMessageBytes = new BinaryReader(serialized).bytes();
      expect(storeMessageBytes).toEqual(testMessagesBytes[0]);
    });
    it("should not store extra bytes", function () {
      const serialized = protoDelimited.enc(testMessages[0]);
      const reader = new BinaryReader(serialized);
      reader.skip(WireType.LengthDelimited);
      expect(reader.pos).toBe(reader.len);
    });
  });

  describe("dec", function () {
    it("should parse expected", function () {
      const bytes = new BinaryWriter()
        .uint32(testMessagesSizes[0])
        .raw(testMessagesBytes[0])
        .finish();
      const parsed = protoDelimited.dec(TestAllTypesProto3, bytes);
      expect(TestAllTypesProto3.equals(parsed, testMessages[0])).toBeTruthy();
    });
    it("should ignore extra bytes", function () {
      const bytes = new BinaryWriter()
        .bytes(testMessages[0].toBinary())
        .raw(new Uint8Array([0xde, 0xad, 0xbe, 0xef])) // this fails to read as a varint with "premature EOF"
        .finish();
      const parsed = protoDelimited.dec(TestAllTypesProto3, bytes);
      expect(TestAllTypesProto3.equals(parsed, testMessages[0])).toBeTruthy();
    });
    it("should fail for missing data", function () {
      const bytes = new BinaryWriter()
        .uint32(testMessagesSizes[0] + 1)
        .raw(testMessagesBytes[0])
        .finish();
      expect(() => protoDelimited.dec(TestAllTypesProto3, bytes)).toThrow({
        name: "RangeError",
        message: "premature EOF",
      });
    });
  });

  describe("round-trip serialize and parse", function () {
    it("should not change data", function () {
      const serialized = protoDelimited.enc(testMessages[0]);
      const parsed = protoDelimited.dec(TestAllTypesProto3, serialized);
      expect(TestAllTypesProto3.equals(parsed, testMessages[0])).toBeTruthy();
    });
  });

  describe("peekSize", function () {
    describe.each([0, 1, 2, 4, 8, 16, 32, 64, 0xffffffff])(
      "with just a size",
      function (size: number) {
        const bytes = new BinaryWriter().uint32(size).finish();
        it("should return EOF", function () {
          const got = protoDelimited.peekSize(bytes);
          expect(got.size).toBe(size);
        });
        it("should return expected offset", function () {
          const got = protoDelimited.peekSize(bytes);
          expect(got.offset).toBe(bytes.byteLength);
        });
      }
    );
    describe("with incomplete varint", function () {
      const complete = new BinaryWriter().uint32(0xffffffff).finish(); // uint32 max is 5 bytes as varint
      it.each([0, 1, 2, 3, 4])("should return EOF for %s", function (x) {
        const bytes = complete.slice(0, x);
        const got = protoDelimited.peekSize(bytes);
        expect(got.eof).toBeTruthy();
      });
    });
    describe("with invalid varint", function () {
      const invalid = new Uint8Array([
        0xde, 0xad, 0xbe, 0xef, 0xde, 0xad, 0xbe, 0xef, 0xde, 0xad,
      ]);
      it("should raise error", function () {
        expect(() => protoDelimited.peekSize(invalid)).toThrowError({
          name: "Error",
          message: "invalid varint",
        });
      });
    });
    describe("with size and message", function () {
      const bytes = new BinaryWriter()
        .uint32(testMessagesSizes[0])
        .raw(testMessagesBytes[0])
        .finish();
      it("should return size", function () {
        const got = protoDelimited.peekSize(bytes);
        expect(got.size).toBe(testMessagesSizes[0]);
      });
      it("should return expected offset", function () {
        const got = protoDelimited.peekSize(bytes);
        expect(got.offset).toBe(
          bytes.byteLength - testMessagesBytes[0].byteLength
        );
      });
    });
    describe("used for parsing a stream", function () {
      async function* createAsyncIterableBytes(
        bytes: Uint8Array,
        chunkSize = 2,
        delay = 5
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
      const stream = createAsyncIterableBytes(
        new BinaryWriter()
          .uint32(testMessagesSizes[0])
          .raw(testMessagesBytes[0])
          .uint32(testMessagesSizes[1])
          .raw(testMessagesBytes[1])
          .finish()
      );
      /**
       * An example implementation for a function decoding size-delimited messages
       * from a simple stream using protoDelimited.peekSize and protoDelimited.dec.
       * This example does not limit the amount of data read into memory.
       */
      async function* decStream<T extends Message<T>>(
        iterable: AsyncIterable<Uint8Array>,
        type: MessageType<T>
      ) {
        // append chunk to buffer, returning updated buffer
        function append(buffer: Uint8Array, chunk: Uint8Array): Uint8Array {
          const n = new Uint8Array(buffer.byteLength + chunk.byteLength);
          n.set(buffer);
          n.set(chunk, buffer.length);
          return n;
        }
        let buffer = new Uint8Array(0);
        for await (const chunk of iterable) {
          buffer = append(buffer, chunk);
          for (;;) {
            const size = protoDelimited.peekSize(buffer);
            if (size.eof) {
              // size is incomplete, buffer more data
              break;
            }
            if (size.offset + size.size > buffer.byteLength) {
              // message is incomplete, buffer more data
              break;
            }
            yield protoDelimited.dec(type, buffer);
            buffer = buffer.subarray(size.offset + size.size);
          }
        }
        if (buffer.byteLength > 0) {
          throw new Error("incomplete data");
        }
      }
      it("should decode messages", async function () {
        const decoded: TestAllTypesProto3[] = [];
        for await (const m of decStream(stream, TestAllTypesProto3)) {
          decoded.push(m);
        }
        expect(decoded).toStrictEqual(testMessages);
      });
    });
  });
});
