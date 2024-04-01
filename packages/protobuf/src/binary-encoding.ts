// Copyright 2021-2024 Buf Technologies, Inc.
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

import {
  BinaryReader as NextBinaryReader,
  BinaryWriter as NextBinaryWriter,
} from "./next/wire/binary-encoding.js";

/* eslint-disable prefer-const,no-case-declarations,@typescript-eslint/restrict-plus-operands */

/**
 * @deprecated use WireType from @bufbuild/protobuf/wire instead
 *
 * Protobuf binary format wire types.
 *
 * A wire type provides just enough information to find the length of the
 * following value.
 *
 * See https://developers.google.com/protocol-buffers/docs/encoding#structure
 */
export enum WireType {
  /**
   * Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
   */
  Varint = 0,

  /**
   * Used for fixed64, sfixed64, double.
   * Always 8 bytes with little-endian byte order.
   */
  Bit64 = 1,

  /**
   * Used for string, bytes, embedded messages, packed repeated fields
   *
   * Only repeated numeric types (types which use the varint, 32-bit,
   * or 64-bit wire types) can be packed. In proto3, such fields are
   * packed by default.
   */
  LengthDelimited = 2,

  /**
   * Start of a tag-delimited aggregate, such as a proto2 group, or a message
   * in editions with message_encoding = DELIMITED.
   */
  StartGroup = 3,

  /**
   * End of a tag-delimited aggregate.
   */
  EndGroup = 4,

  /**
   * Used for fixed32, sfixed32, float.
   * Always 4 bytes with little-endian byte order.
   */
  Bit32 = 5,
}

/**
 * @deprecated Replaced by concrete class BinaryReader from @bufbuild/protobuf/wire
 */
export interface IBinaryReader {
  /**
   * Current position.
   */
  readonly pos: number;

  /**
   * Number of bytes available in this reader.
   */
  readonly len: number;

  /**
   * Reads a tag - field number and wire type.
   */
  tag(): [number, WireType];

  /**
   * Skip one element on the wire and return the skipped data.
   */
  skip(wireType: WireType): Uint8Array;

  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  uint32(): number;

  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  int32(): number;

  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(): number;

  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64(): bigint | string;

  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(): bigint | string;

  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64(): bigint | string;

  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64(): bigint | string;

  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(): bigint | string;

  /**
   * Read a `bool` field, a variant.
   */
  bool(): boolean;

  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(): number;

  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32(): number;

  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float(): number;

  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double(): number;

  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes(): Uint8Array;

  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string(): string;
}

/**
 * @deprecated Replaced by concrete class BinaryWriter from @bufbuild/protobuf/wire
 */
export interface IBinaryWriter {
  /**
   * Return all bytes written and reset this writer.
   */
  finish(): Uint8Array;

  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork(): IBinaryWriter;

  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join(): IBinaryWriter;

  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo: number, type: WireType): IBinaryWriter;

  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk: Uint8Array): IBinaryWriter;

  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value: number): IBinaryWriter;

  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value: number): IBinaryWriter;

  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value: number): IBinaryWriter;

  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value: string | number | bigint): IBinaryWriter;

  /**
   * Write a `bool` value, a variant.
   */
  bool(value: boolean): IBinaryWriter;

  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value: number): IBinaryWriter;

  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value: number): IBinaryWriter;

  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value: number): IBinaryWriter;

  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value: number): IBinaryWriter;

  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value: Uint8Array): IBinaryWriter;

  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value: string): IBinaryWriter;
}

/**
 * @deprecated Use BinaryReader from @bufbuild/protobuf/wire instead
 */
export class BinaryWriter extends NextBinaryWriter implements IBinaryWriter {}

/**
 * @deprecated Use BinaryReader from @bufbuild/protobuf/wire instead
 */
export class BinaryReader extends NextBinaryReader implements IBinaryReader {}
