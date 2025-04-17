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

import { varint32read, varint64read } from "./varint.js";
import { protoInt64 } from "../proto-int64.js";
import { getTextEncoding } from "./text-encoding.js";

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
   * Growable byte buffer. We allocate a reasonably sized
   * initial buffer and double its capacity when needed.
   */
  private buffer: Uint8Array<ArrayBuffer>;

  /**
   * Current write position in the buffer.
   */
  private pos: number;

  /**
   * Previous fork positions (the write position at the time
   * `fork()` was called).
   */
  private stackPos: number[] = [];

  private readonly initialSize = 128;

  constructor(
    private readonly encodeUtf8: (
      text: string,
    ) => Uint8Array = getTextEncoding().encodeUtf8,
  ) {
    // Defer the first Uint8Array allocation: small messages (e.g. a bool-only
    // request) would otherwise pay for a full initialSize zeroed buffer.
    this.buffer = EMPTY_BUFFER;
    this.pos = 0;
  }

  private ensureCapacity(size: number) {
    const required = this.pos + size;
    if (required > this.buffer.length) {
      let newLen = this.buffer.length || this.initialSize;
      while (newLen < required) newLen *= 2;
      const newBuf = new Uint8Array(newLen);
      if (this.pos > 0) newBuf.set(this.buffer.subarray(0, this.pos));
      this.buffer = newBuf;
    }
  }

  /**
   * Return all bytes written and reset this writer.
   */
  finish(): Uint8Array<ArrayBuffer> {
    const result = this.buffer.slice(0, this.pos);
    this.pos = 0;
    this.stackPos = [];
    return result;
  }

  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork(): this {
    this.stackPos.push(this.pos);
    return this;
  }

  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join(): this {
    const forkPos = this.stackPos.pop();
    if (forkPos === undefined)
      throw new Error("invalid state, fork stack empty");
    const len = this.pos - forkPos;
    const size = varint32Size(len);
    this.ensureCapacity(size);
    // Make room for the length prefix by shifting the fork's data forward.
    this.buffer.copyWithin(forkPos + size, forkPos, this.pos);
    // Write the unsigned varint length directly in place.
    let p = forkPos;
    let v = len;
    while (v > 0x7f) {
      this.buffer[p++] = (v & 0x7f) | 0x80;
      v >>>= 7;
    }
    this.buffer[p] = v;
    this.pos += size;
    return this;
  }

  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo: number, type: WireType): this {
    return this.uint32(((fieldNo << 3) | type) >>> 0);
  }

  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk: Uint8Array): this {
    this.ensureCapacity(chunk.length);
    this.buffer.set(chunk, this.pos);
    this.pos += chunk.length;
    return this;
  }

  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value: number): this {
    assertUInt32(value);
    // uint32 varints are at most 5 bytes; reserve once and avoid per-byte
    // capacity checks.
    this.ensureCapacity(5);
    if (value < 0x80) {
      this.buffer[this.pos++] = value;
      return this;
    }
    while (value > 0x7f) {
      this.buffer[this.pos++] = (value & 0x7f) | 0x80;
      value >>>= 7;
    }
    this.buffer[this.pos++] = value;
    return this;
  }

  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value: number): this {
    assertInt32(value);
    if (value >= 0) {
      return this.uint32(value);
    }
    // Negative: sign-extend to 64 bits, encodes to 10 bytes.
    this.ensureCapacity(10);
    for (let i = 0; i < 9; i++) {
      this.buffer[this.pos++] = (value & 0x7f) | 0x80;
      value >>= 7;
    }
    this.buffer[this.pos++] = 1;
    return this;
  }

  /**
   * Write a `bool` value, a varint.
   */
  bool(value: boolean): this {
    this.ensureCapacity(1);
    this.buffer[this.pos++] = value ? 1 : 0;
    return this;
  }

  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value: Uint8Array): this {
    this.uint32(value.byteLength);
    return this.raw(value);
  }

  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value: string): this {
    let chunk = this.encodeUtf8(value);
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }

  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value: number): this {
    assertFloat32(value);
    this.ensureCapacity(4);
    new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength,
    ).setFloat32(this.pos, value, true);
    this.pos += 4;
    return this;
  }

  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value: number): this {
    this.ensureCapacity(8);
    new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength,
    ).setFloat64(this.pos, value, true);
    this.pos += 8;
    return this;
  }

  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value: number): this {
    assertUInt32(value);
    this.ensureCapacity(4);
    new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength,
    ).setUint32(this.pos, value, true);
    this.pos += 4;
    return this;
  }

  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value: number): this {
    assertInt32(value);
    this.ensureCapacity(4);
    new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength,
    ).setInt32(this.pos, value, true);
    this.pos += 4;
    return this;
  }

  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value: number): this {
    assertInt32(value);
    // zigzag encode then emit as uint32 varint
    return this.uint32(((value << 1) ^ (value >> 31)) >>> 0);
  }

  /**
   * Write a `sfixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value: string | number | bigint): this {
    const tc = protoInt64.enc(value);
    this.ensureCapacity(8);
    const view = new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength,
    );
    view.setInt32(this.pos, tc.lo, true);
    view.setInt32(this.pos + 4, tc.hi, true);
    this.pos += 8;
    return this;
  }

  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value: string | number | bigint): this {
    const tc = protoInt64.uEnc(value);
    this.ensureCapacity(8);
    const view = new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength,
    );
    view.setInt32(this.pos, tc.lo, true);
    view.setInt32(this.pos + 4, tc.hi, true);
    this.pos += 8;
    return this;
  }

  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value: string | number | bigint): this {
    const tc = protoInt64.enc(value);
    return this.writeVarint64(tc.lo, tc.hi);
  }

  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value: string | number | bigint): this {
    const tc = protoInt64.enc(value),
      // zigzag encode
      sign = tc.hi >> 31,
      lo = (tc.lo << 1) ^ sign,
      hi = ((tc.hi << 1) | (tc.lo >>> 31)) ^ sign;
    return this.writeVarint64(lo, hi);
  }

  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value: string | number | bigint): this {
    const tc = protoInt64.uEnc(value);
    return this.writeVarint64(tc.lo, tc.hi);
  }

  /**
   * Write a 64-bit varint directly into the buffer. Accepts the value as
   * split low/high 32-bit words.
   *
   * Ported from varint64write() to avoid the intermediate number[] buffer.
   * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
   */
  private writeVarint64(lo: number, hi: number): this {
    // Worst case: 10 bytes.
    this.ensureCapacity(10);
    const buf = this.buffer;
    let pos = this.pos;

    for (let i = 0; i < 28; i = i + 7) {
      const shift = lo >>> i;
      const hasNext = !(shift >>> 7 == 0 && hi == 0);
      buf[pos++] = (hasNext ? shift | 0x80 : shift) & 0xff;
      if (!hasNext) {
        this.pos = pos;
        return this;
      }
    }

    const splitBits = ((lo >>> 28) & 0x0f) | ((hi & 0x07) << 4);
    const hasMoreBits = !(hi >> 3 == 0);
    buf[pos++] = (hasMoreBits ? splitBits | 0x80 : splitBits) & 0xff;

    if (!hasMoreBits) {
      this.pos = pos;
      return this;
    }

    for (let i = 3; i < 31; i = i + 7) {
      const shift = hi >>> i;
      const hasNext = !(shift >>> 7 == 0);
      buf[pos++] = (hasNext ? shift | 0x80 : shift) & 0xff;
      if (!hasNext) {
        this.pos = pos;
        return this;
      }
    }

    buf[pos++] = (hi >>> 31) & 0x01;
    this.pos = pos;
    return this;
  }
}

/**
 * Shared empty buffer used as the initial value before the first write.
 * Avoids allocating and zeroing `initialSize` bytes per BinaryWriter when a
 * writer is only used for a tiny message (or not used at all).
 */
const EMPTY_BUFFER = new Uint8Array(0) as Uint8Array<ArrayBuffer>;

/**
 * Number of bytes needed to encode `value` as an unsigned 32-bit varint.
 */
function varint32Size(value: number): number {
  if (value < 0x80) return 1;
  if (value < 0x4000) return 2;
  if (value < 0x200000) return 3;
  if (value < 0x10000000) return 4;
  return 5;
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
      bytes: Uint8Array,
      strict?: boolean,
    ) => string = getTextEncoding().decodeUtf8,
  ) {
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  /**
   * Reads a tag - field number and wire type. Tags are uint32 varints; values
   * that do not fit in uint32 are rejected.
   */
  tag(): [number, WireType] {
    const start = this.pos;
    const tag = this.uint32();
    const bytesRead = this.pos - start;
    if (bytesRead > 5 || (bytesRead == 5 && this.buf[this.pos - 1] > 0x0f)) {
      throw new Error("illegal tag: varint overflows uint32");
    }
    const fieldNo = tag >>> 3;
    const wireType = tag & 7;
    if (fieldNo <= 0 || wireType > 5) {
      throw new Error(
        "illegal tag: field no " + fieldNo + " wire type " + wireType,
      );
    }
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
      // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
      case WireType.Bit64:
        this.pos += 4;
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
    // biome-ignore lint/suspicious/noAssignInExpressions: no
    return this.view.getUint32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32(): number {
    // biome-ignore lint/suspicious/noAssignInExpressions: no
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
    // biome-ignore lint/suspicious/noAssignInExpressions: no
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }

  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double(): number {
    // biome-ignore lint/suspicious/noAssignInExpressions: no
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
   * Read a `string` field, length-delimited data converted to UTF-8 text. If
   * `strict` is true, throw on invalid UTF-8 instead of substituting U+FFFD.
   */
  string(strict?: boolean): string {
    return this.decodeUtf8(this.bytes(), strict);
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
    if (Number.isNaN(arg as number) && o !== "NaN") {
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
