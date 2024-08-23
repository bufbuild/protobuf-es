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
  varint32read,
  varint32write,
  varint64read,
  varint64write,
} from "./varint.js";
import { protoInt64 } from "../proto-int64.js";
import { getTextEncoding } from "./text-encoding.js";

/* eslint-disable prefer-const,no-case-declarations,@typescript-eslint/restrict-plus-operands */

/**
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
 * Maximum value for a 32-bit floating point value (Protobuf FLOAT).
 */
export const FLOAT32_MAX = 3.4028234663852886e38;

/**
 * Minimum value for a 32-bit floating point value (Protobuf FLOAT).
 */
export const FLOAT32_MIN = -3.4028234663852886e38;

/**
 * Maximum value for an unsigned 32-bit integer (Protobuf UINT32, FIXED32).
 */
export const UINT32_MAX = 0xffffffff;

/**
 * Maximum value for a signed 32-bit integer (Protobuf INT32, SFIXED32, SINT32).
 */
export const INT32_MAX = 0x7fffffff;

/**
 * Minimum value for a signed 32-bit integer (Protobuf INT32, SFIXED32, SINT32).
 */
export const INT32_MIN = -0x80000000;

export class BinaryWriter {
  /**
   * This is the storage backing for the bytes buffer.
   *
   * Max byte length is 2GB - 1, which is the maximum for array buffers.
   *
   * TODO(ekrekr): remove the `any` cast once types are fixed:
   * https://github.com/microsoft/TypeScript/pull/58573.
   */
  private bytesBufStorage = new (ArrayBuffer as any)(0, {
    maxByteLength: (((2 << 10) << 10) << 10) - 1,
  });

  /**
   * This contains the editable view onto the storage backing.
   */
  private bytesBuf = new Uint8Array(this.bytesBufStorage);

  constructor(
    private readonly encodeInto: (
      text: string,
      buf: Uint8Array
    ) => { read: number; written: number } = getTextEncoding().encodeInto
  ) {}

  /**
   * Return all bytes written and reset this writer.
   */
  finish(): Uint8Array {
    return this.bytesBuf;
  }

  /**
   * Gets a tag (field number and wire type) without writing it.
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  getTag(fieldNo: number, type: WireType): number[] {
    let value = ((fieldNo << 3) | type) >>> 0;
    assertUInt32(value);
    const numberBuf: number[] = [];
    // write value as varint 32, inlined for speed
    while (value > 0x7f) {
      numberBuf.push((value & 0x7f) | 0x80);
      value = value >>> 7;
    }
    numberBuf.push(value);
    return numberBuf;
  }

  /**
   * Writes a tag (field number and wire type).
   */
  tag(fieldNo: number, type: WireType): this {
    return this.uint32(((fieldNo << 3) | type) >>> 0);
  }

  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value: number): this {
    assertUInt32(value);
    // write value as varint 32, inlined for speed
    while (value > 0x7f) {
      const currentBufHead = this.bytesBufStorage.byteLength;
      this.bytesBufStorage.resize(currentBufHead + 1);
      this.bytesBuf.set([(value & 0x7f) | 0x80], currentBufHead);
      value = value >>> 7;
    }
    const currentBufHead = this.bytesBufStorage.byteLength;
    // Expand the bytes buffer, then allocate the byte at the head.
    this.bytesBufStorage.resize(currentBufHead + 1);
    this.bytesBuf.set([value], currentBufHead);
    return this;
  }

  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value: number): this {
    assertInt32(value);
    const currentBufHead = this.bytesBufStorage.byteLength;
    const numberBuf: number[] = [];
    varint32write(value, numberBuf);
    this.bytesBufStorage.resize(currentBufHead + numberBuf.length);
    this.bytesBuf.set(numberBuf, currentBufHead);
    return this;
  }

  /**
   * Write a `bool` value, a variant.
   */
  bool(value: boolean): this {
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + 1);
    this.bytesBuf.set([value ? 1 : 0], currentBufHead);
    return this;
  }

  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value: Uint8Array): this {
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.uint32(value.byteLength); // write length of chunk as varint
    this.bytesBufStorage.resize(currentBufHead + value.byteLength);
    this.bytesBuf.set(value, currentBufHead);
    return this;
  }

  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value: string): this {
    const currentBufHead = this.bytesBufStorage.byteLength;

    // NodeJS strings are by default UTF-8, so we can assume the byte length as the length of
    // the string.
    const valueBytesLength = value.length;

    this.uint32(valueBytesLength);

    // Allocate new bytes for the string.
    this.bytesBufStorage.resize(currentBufHead + valueBytesLength);

    // Write the decoded string directly into the encoded message array buffer.
    this.encodeInto(
      value,
      this.bytesBuf.subarray(currentBufHead, currentBufHead + valueBytesLength)
    );

    return this;
  }

  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value: number): this {
    const currentBufHead = this.bytesBufStorage.byteLength;
    assertFloat32(value);
    this.bytesBufStorage.resize(currentBufHead + 4);
    new DataView(this.bytesBufStorage).setFloat64(currentBufHead, value, true);
    return this;
  }

  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value: number): this {
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + 8);
    new DataView(this.bytesBufStorage).setFloat64(currentBufHead, value, true);
    return this;
  }

  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value: number): this {
    assertUInt32(value);
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + 4);
    new DataView(this.bytesBufStorage).setUint32(currentBufHead, value, true);
    return this;
  }

  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value: number): this {
    assertInt32(value);
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + 4);
    new DataView(this.bytesBufStorage).setInt32(currentBufHead, value, true);
    return this;
  }

  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value: number): this {
    assertInt32(value);
    // zigzag encode
    value = ((value << 1) ^ (value >> 31)) >>> 0;
    const numberBuf: number[] = [];
    varint32write(value, numberBuf);
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + numberBuf.length);
    this.bytesBuf.set(numberBuf, currentBufHead);
    return this;
  }

  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value: string | number | bigint): this {
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + 8);
    let view = new DataView(this.bytesBufStorage);
    let tc = protoInt64.enc(value);
    view.setInt32(currentBufHead, tc.lo, true);
    view.setInt32(currentBufHead + 4, tc.hi, true);
    return this;
  }

  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value: string | number | bigint): this {
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + 8);
    let view = new DataView(this.bytesBufStorage);
    let tc = protoInt64.uEnc(value);
    view.setInt32(currentBufHead, tc.lo, true);
    view.setInt32(currentBufHead + 4, tc.hi, true);
    return this;
  }

  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value: string | number | bigint): this {
    let tc = protoInt64.enc(value);
    const numberBuf: number[] = [];
    varint64write(tc.lo, tc.hi, numberBuf);
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + numberBuf.length);
    this.bytesBuf.set(numberBuf, currentBufHead);
    return this;
  }

  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value: string | number | bigint): this {
    let tc = protoInt64.enc(value),
      // zigzag encode
      sign = tc.hi >> 31,
      lo = (tc.lo << 1) ^ sign,
      hi = ((tc.hi << 1) | (tc.lo >>> 31)) ^ sign;
    const numberBuf: number[] = [];
    varint64write(lo, hi, numberBuf);
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + numberBuf.length);
    this.bytesBuf.set(numberBuf, currentBufHead);
    return this;
  }

  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value: string | number | bigint): this {
    let tc = protoInt64.uEnc(value);
    const numberBuf: number[] = [];
    varint64write(tc.lo, tc.hi, numberBuf);
    const currentBufHead = this.bytesBufStorage.byteLength;
    this.bytesBufStorage.resize(currentBufHead + numberBuf.length);
    this.bytesBuf.set(numberBuf, currentBufHead);
    return this;
  }
}

export class BinaryReader {
  /**
   * Current position.
   */
  pos: number;

  /**
   * Number of bytes available in this reader.
   */
  readonly len: number;

  protected readonly buf: Uint8Array;
  private readonly view: DataView;

  constructor(
    buf: Uint8Array,
    private readonly decodeUtf8: (
      bytes: Uint8Array
    ) => string = getTextEncoding().decodeUtf8
  ) {
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  /**
   * Reads a tag - field number and wire type.
   */
  tag(): [number, WireType] {
    let tag = this.uint32(),
      fieldNo = tag >>> 3,
      wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error(
        "illegal tag: field no " + fieldNo + " wire type " + wireType
      );
    return [fieldNo, wireType];
  }

  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(wireType: WireType, fieldNo?: number): Uint8Array {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 0x80) {
          // ignore
        }
        break;
      // eslint-disable-next-line
      // @ts-expect-error TS7029: Fallthrough case in switch
      case WireType.Bit64:
        this.pos += 4;
      // eslint-disable-next-line no-fallthrough
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        for (;;) {
          const [fn, wt] = this.tag();
          if (wt === WireType.EndGroup) {
            if (fieldNo !== undefined && fn !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt, fn);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }

  protected varint64 = varint64read as () => [number, number]; // dirty cast for `this`

  /**
   * Throws error if position in byte array is out of range.
   */
  protected assertBounds(): void {
    if (this.pos > this.len) throw new RangeError("premature EOF");
  }

  /**
   * Read a `uint32` field, an unsigned 32 bit varint.
   */
  uint32: () => number = varint32read;

  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32(): number {
    return this.uint32() | 0;
  }

  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(): number {
    let zze = this.uint32();
    // decode zigzag
    return (zze >>> 1) ^ -(zze & 1);
  }

  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64(): bigint | string {
    return protoInt64.dec(...this.varint64());
  }

  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64(): bigint | string {
    return protoInt64.uDec(...this.varint64());
  }

  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(): bigint | string {
    let [lo, hi] = this.varint64();
    // decode zig zag
    let s = -(lo & 1);
    lo = ((lo >>> 1) | ((hi & 1) << 31)) ^ s;
    hi = (hi >>> 1) ^ s;
    return protoInt64.dec(lo, hi);
  }

  /**
   * Read a `bool` field, a variant.
   */
  bool(): boolean {
    let [lo, hi] = this.varint64();
    return lo !== 0 || hi !== 0;
  }

  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(): number {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32(): number {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(): bigint | string {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }

  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64(): bigint | string {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }

  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float(): number {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double(): number {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }

  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes(): Uint8Array {
    let len = this.uint32(),
      start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }

  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string(): string {
    return this.decodeUtf8(this.bytes());
  }
}

/**
 * Assert a valid signed protobuf 32-bit integer as a number or string.
 */
function assertInt32(arg: unknown): asserts arg is number {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid int32: " + typeof arg);
  }
  if (
    !Number.isInteger(arg) ||
    (arg as number) > INT32_MAX ||
    (arg as number) < INT32_MIN
  )
    throw new Error("invalid int32: " + arg);
}

/**
 * Assert a valid unsigned protobuf 32-bit integer as a number or string.
 */
function assertUInt32(arg: unknown): asserts arg is number {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid uint32: " + typeof arg);
  }
  if (
    !Number.isInteger(arg) ||
    (arg as number) > UINT32_MAX ||
    (arg as number) < 0
  )
    throw new Error("invalid uint32: " + arg);
}

/**
 * Assert a valid protobuf float value as a number or string.
 */
function assertFloat32(arg: unknown): asserts arg is number {
  if (typeof arg == "string") {
    const o = arg;
    arg = Number(arg);
    if (isNaN(arg as number) && o !== "NaN") {
      throw new Error("invalid float32: " + o);
    }
  } else if (typeof arg != "number") {
    throw new Error("invalid float32: " + typeof arg);
  }
  if (
    Number.isFinite(arg) &&
    ((arg as number) > FLOAT32_MAX || (arg as number) < FLOAT32_MIN)
  )
    throw new Error("invalid float32: " + arg);
}
