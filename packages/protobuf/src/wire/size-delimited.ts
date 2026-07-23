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

import type { DescMessage } from "../descriptors.js";
import type { BinaryWriteOptions } from "../to-binary.js";
import { toBinary } from "../to-binary.js";
import type { MessageShape } from "../types.js";
import { BinaryReader, BinaryWriter } from "./binary-encoding.js";
import type { BinaryReadOptions } from "../from-binary.js";
import { fromBinary } from "../from-binary.js";

/**
 * Serialize a message, prefixing it with its size.
 *
 * A size-delimited message is a varint size in bytes, followed by exactly
 * that many bytes of a message serialized with the binary format.
 *
 * This size-delimited format is compatible with other implementations.
 * For details, see https://github.com/protocolbuffers/protobuf/issues/10229
 */
export function sizeDelimitedEncode<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  options?: BinaryWriteOptions,
): Uint8Array {
  const writer = new BinaryWriter();
  writer.bytes(toBinary(messageDesc, message, options));
  return writer.finish();
}

/**
 * Options for parsing size-delimited messages from a stream.
 */
export interface SizeDelimitedDecodeOptions extends BinaryReadOptions {
  /**
   * Limit the size of a single message in the stream, in bytes.
   *
   * If a message in the stream declares a size exceeding this limit, an
   * error is raised before the message is buffered.
   *
   * The default limit is 64 MiB.
   */
  readMaxBytes: number;
}

// Default for SizeDelimitedDecodeOptions.readMaxBytes.
const defaultReadMaxBytes = 64 * 1024 * 1024; // 64 MiB

/**
 * A growable byte buffer. Used in place of a resizable ArrayBuffer, which is
 * not widely available.
 */
class ByteBuffer {
  private buffer = new Uint8Array(0);
  private length = 0;

  get byteLength(): number {
    return this.length;
  }

  bytes(): Uint8Array {
    return this.buffer.subarray(0, this.length);
  }

  append(chunk: Uint8Array): void {
    const newByteLength = this.length + chunk.byteLength;
    if (newByteLength > this.buffer.byteLength) {
      const grown = new Uint8Array(
        Math.max(this.buffer.byteLength * 2, newByteLength),
      );
      grown.set(this.buffer.subarray(0, this.length));
      this.buffer = grown;
    }
    this.buffer.set(chunk, this.length);
    this.length += chunk.byteLength;
  }
}

/**
 * Parse a stream of size-delimited messages.
 *
 * A size-delimited message is a varint size in bytes, followed by exactly
 * that many bytes of a message serialized with the binary format.
 *
 * This size-delimited format is compatible with other implementations.
 * For details, see https://github.com/protocolbuffers/protobuf/issues/10229
 *
 * Messages exceeding the limit given with the option readMaxBytes raise an
 * error. The limit is 64 MiB by default. All other options are the
 * standard binary read options, passed through to decode each message.
 */
export async function* sizeDelimitedDecodeStream<Desc extends DescMessage>(
  messageDesc: Desc,
  iterable: AsyncIterable<Uint8Array>,
  options?: Partial<SizeDelimitedDecodeOptions>,
): AsyncIterableIterator<MessageShape<Desc>> {
  const readMaxBytes = options?.readMaxBytes ?? defaultReadMaxBytes;
  let buffer = new ByteBuffer();

  for await (const chunk of iterable) {
    buffer.append(chunk);
    const bytes = buffer.bytes();
    let offset = 0;

    for (;;) {
      const size = sizeDelimitedPeek(bytes.subarray(offset));
      if (size.eof) {
        // size is incomplete, buffer more data
        break;
      }
      if (size.size > readMaxBytes) {
        throw new Error(
          `message size ${size.size} is larger than configured readMaxBytes ${readMaxBytes}`,
        );
      }
      const messageStart = offset + size.offset;
      const messageEnd = messageStart + size.size;
      if (messageEnd > bytes.byteLength) {
        // message is incomplete, buffer more data
        break;
      }
      yield fromBinary(
        messageDesc,
        bytes.subarray(messageStart, messageEnd),
        options,
      );
      offset = messageEnd;
    }
    if (offset > 0) {
      buffer = new ByteBuffer();
      buffer.append(bytes.subarray(offset));
    }
  }
  if (buffer.byteLength > 0) {
    throw new Error("incomplete data");
  }
}

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
export function sizeDelimitedPeek(
  data: Uint8Array,
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
}
