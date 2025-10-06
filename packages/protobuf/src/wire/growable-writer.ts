import {varint32writeCCC, varint64writeCCC} from "./varint.js";
import { protoInt64 } from "../proto-int64.js";
import {
  assertFloat32,
  assertInt32,
  assertUInt32,
  type WireType,
} from "./binary-encoding.js";


const te: {
  encodeInto(src: string, dest: Uint8Array): { read: number; written: number };
// @ts-expect-error
} = new TextEncoder();

export class GrowableBinaryWriter {

  private readonly buffer: ArrayBuffer;
  // TODO
  // private readonly bucketSize: number;
  private readonly barr: Uint8Array<ArrayBuffer>;
  private readonly view: DataView<ArrayBuffer>;
  private pos: number;
  // TODO
  // private readonly te: {
  //   encodeInto(src: string, dest: Uint8Array): { read: number; written: number };
  // };
  private readonly stack: number[] = [];

  constructor(
    // TODO offset arg for buffer
    init?: {
      buffer?: ArrayBuffer,
      // TODO
      // bucketSize?: number,
      // TODO
      // alloc?: (got: number, need: number) => number,
      // TODO encodeInto arg
      // encodeInto?: (src: string, dest: Uint8Array) => { read: number; written: number },
    },
  ) {
    // TODO
    // this.bucketSize = init?.bucketSize || 1024;
    // this.buffer = new ArrayBuffer(this.bucketSize, {
    // TODO
    this.buffer = new ArrayBuffer(0, {
      maxByteLength: 0xffffffff /* ~4GiB */,
      // maxByteLength: 1024*1024*2,
      // maxByteLength: 1024*4,
    });
    this.pos = 0; // TODO offset arg for buffer
    this.barr = new Uint8Array(this.buffer, this.pos);
    this.view = new DataView(this.buffer, this.pos);
    // TODO
    // this.te = new TextEncoder();
  }

  /**
   * Return all bytes written and reset this writer.
   */
  finish(): Uint8Array<ArrayBuffer> {
    if (this.pos == this.barr.byteLength) {
      return this.barr;
    }
    return this.barr.subarray(0, this.pos);
  }

  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork(): this {
    this.grow(5);
    this.stack.push(this.pos);
    this.pos += 5;
    return this;
  }

  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join(): this {
    const start = this.stack.pop();
    if (start === undefined) {
      throw new Error("invalid state, fork stack empty");
    }
    const len = this.pos - start - 5;
    this.pos = start;
    this.uint32(len);
    this.barr.copyWithin(this.pos, start + 5, start + 5 + len);
    this.pos += len;
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


  private grow(by: number): void {
    if (this.pos + by > this.buffer.byteLength) {
      // const bucketSize = 1024 * 8;
      // this.buffer.resize(Math.ceil((this.pos + by) / bucketSize) * bucketSize);
      // TODO identity:
      this.buffer.resize(this.pos + by);
    }
  }


  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk: Uint8Array): this {
    this.grow(chunk.byteLength);
    this.barr.set(chunk, this.pos);
    this.pos += chunk.byteLength;
    return this;
  }

  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value: number): this {
    assertUInt32(value);
    // TODO
    this.grow(5);
    // write value as varint 32, inlined for speed
    while (value > 0x7f) {
      this.barr[this.pos++] = (value & 0x7f) | 0x80;
      // this.buf.push((value & 0x7f) | 0x80);
      value = value >>> 7;
    }
    // this.buf.push(value);
    this.barr[this.pos++] = value;
    return this;
  }

  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value: number): this {
    assertInt32(value);
    // TODO
    this.grow(10);
    this.pos = varint32writeCCC(value, this.barr, this.pos);
    return this;
  }

  /**
   * Write a `bool` value, a varint.
   */
  bool(value: boolean): this {
    // this.buf.push(value ? 1 : 0);
    this.grow(1);
    this.barr[this.pos++] = value ? 1 : 0;
    return this;
  }

  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value: Uint8Array): this {
    this.uint32(value.byteLength); // write length of chunk as varint
    return this.raw(value);
  }

  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value: string): this {
    this.fork();
    this.grow(value.length * 3);
    // TODO
    // const res = this.te.encodeInto(value, this.barr.subarray(this.pos));
    const res = te.encodeInto(value, this.barr.subarray(this.pos));
    this.pos += res.written;
    this.join();
    return this;
  }

  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value: number): this {
    assertFloat32(value);
    this.grow(4);
    this.view.setFloat32(this.pos, value, true);
    this.pos += 4;
    return this;
  }

  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value: number): this {
    this.grow(8);
    this.view.setFloat64(this.pos, value, true);
    this.pos += 8;
    return this;
  }

  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value: number): this {
    assertUInt32(value);
    this.grow(4);
    this.view.setUint32(this.pos, value, true);
    this.pos += 4;
    return this;
  }

  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value: number): this {
    assertInt32(value);
    this.grow(4);
    this.view.setInt32(this.pos, value, true);
    this.pos += 4;
    return this;
  }

  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value: number): this {
    assertInt32(value);
    // zigzag encode
    value = ((value << 1) ^ (value >> 31)) >>> 0;

    // TODO
    // varint32write(value, this.buf);
    this.grow(10);
    this.pos = varint32writeCCC(value, this.barr, this.pos);

    return this;
  }

  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value: string | number | bigint): this {
    this.grow(8);
    const tc = protoInt64.enc(value);
    this.view.setInt32(this.pos, tc.lo, true);
    this.view.setInt32(this.pos + 4, tc.hi, true);
    this.pos += 8;
    return this;
  }

  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value: string | number | bigint): this {
    this.grow(8);
    const tc = protoInt64.uEnc(value);
    this.view.setInt32(this.pos, tc.lo, true);
    this.view.setInt32(this.pos + 4, tc.hi, true);
    this.pos += 8;
    return this;
  }

  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value: string | number | bigint): this {
    let tc = protoInt64.enc(value);
    // TODO
    // varint64write(tc.lo, tc.hi, this.buf);
    this.grow(10);
    this.pos = varint64writeCCC(tc.lo, tc.hi, this.barr, this.pos);
    return this;
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
    // TODO
    // varint64write(lo, hi, this.buf);
    this.grow(10);
    this.pos = varint64writeCCC(lo, hi, this.barr, this.pos);
    return this;
  }

  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value: string | number | bigint): this {
    const tc = protoInt64.uEnc(value);
    // TODO
    // varint64write(tc.lo, tc.hi, this.buf);
    this.grow(10);
    this.pos = varint64writeCCC(tc.lo, tc.hi, this.barr, this.pos);
    return this;
  }
}
