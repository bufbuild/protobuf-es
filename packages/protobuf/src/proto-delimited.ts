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

import type { BinaryReadOptions, BinaryWriteOptions } from "./binary-format.js";
import type { Message } from "./message.js";
import type { MessageType } from "./message-type.js";
import { makeBinaryFormatCommon } from "./private/binary-format-common.js";
import { BinaryReader } from "./binary-encoding.js";

/**
 * protoDelimited provides functions to serialize and parse size-delimited
 * messages.
 *
 * A size-delimited message is a varint size in bytes, followed by exactly
 * that many bytes of a message serialized with the binary format.
 *
 * This size-delimited format is compatible with other implementations.
 * For details, see https://github.com/protocolbuffers/protobuf/issues/10229
 */
export const protoDelimited = {
  /**
   * Serialize a message, prefixing it with its size.
   */
  enc(message: Message, options?: BinaryWriteOptions): Uint8Array {
    const opt = makeBinaryFormatCommon().makeWriteOptions(options);
    return opt.writerFactory().bytes(message.toBinary(opt)).finish();
  },

  /**
   * Parse a size-delimited message, ignoring extra bytes.
   */
  dec<T extends Message<T>>(
    type: MessageType<T>,
    bytes: Uint8Array,
    options?: BinaryReadOptions
  ): T {
    const opt = makeBinaryFormatCommon().makeReadOptions(options);
    return type.fromBinary(opt.readerFactory(bytes).bytes(), opt);
  },

  /**
   * Parse a stream of size-delimited messages.
   */
  async *decStream<T extends Message<T>>(
    type: MessageType<T>,
    iterable: AsyncIterable<Uint8Array>
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
  },

  /**
   * Decodes the size from the given size-delimited message, which may be
   * incomplete.
   *
   * Returns an object with the following properties:
   * - size: The size of the delimited message in bytes
   * - offset: The offset in the given byte array where the message starts
   * - eof: true
   *
   * If the size-delimited data does not include all bytes of the varint size,
   * the following object is returned:
   * - size: null
   * - offset: null
   * - eof: false
   *
   * This function can be used to implement parsing of size-delimited messages
   * from a stream.
   */
  peekSize(
    data: Uint8Array
  ):
    | { readonly eof: false; readonly size: number; readonly offset: number }
    | { readonly eof: true; readonly size: null; readonly offset: null } {
    const sizeEof = { eof: true, size: null, offset: null } as const;
    for (let i = 0; i < 10; i++) {
      if (i > data.byteLength) {
        return sizeEof;
      }
      if ((data[i] & 0x80) == 0) {
        const reader = new BinaryReader(data);
        let size: number;
        try {
          size = reader.uint32();
        } catch (e) {
          if (e instanceof RangeError) {
            return sizeEof;
          }
          throw e;
        }
        return {
          eof: false,
          size,
          offset: reader.pos,
        };
      }
    }
    throw new Error("invalid varint");
  },
};
