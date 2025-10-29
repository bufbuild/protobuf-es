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

import {
  varint32write,
  varint64write,
} from "./varint.js";
import { protoInt64 } from "../proto-int64.js";
import { getTextEncoding } from "./text-encoding.js";
import {FLOAT32_MAX, FLOAT32_MIN, INT32_MAX, INT32_MIN, UINT32_MAX, type WireType} from "./binary-encoding.js";

function sizeOfWrites(writes: Write[]): number {
  let size = 0;
  for (let i = 0; i < writes.length; i++) {
    size += writes[i].size;
  }
  return size;
}

type Write = {
  readonly size: number;
  write(arr: Uint8Array, view: DataView, byteOffset: number): void;
}

/**
 * Write a chunk of raw bytes.
 */
class WriteRaw {
  readonly size: number;
  private readonly value: Uint8Array;
  constructor(value: Uint8Array) {
    this.size = value.length;
    this.value = value;
  }
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr.set(this.value, byteOffset);
  }
}

/**
 * Write a `uint32` value, an unsigned 32 bit varint.
 */
class WriteUint32 {
  readonly size: number;
  private readonly buf: number[] = [];
  constructor(value: number) {
    varint32write(value, this.buf);
    this.size = this.buf.length;
  }
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr.set(this.buf, byteOffset);
  }
}

/**
 * Write a `int32` value, a signed 32 bit varint.
 */
class WriteInt32 {
  readonly size: number;
  private readonly buf: number[] = [];
  constructor(value: number) {
    varint32write(value, this.buf);
    this.size = this.buf.length;
  }
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr.set(this.buf, byteOffset);
  }
}

/**
 * Write a `bool` value, a variant.
 */
class WriteBool {
  readonly size = 1;
  constructor(private readonly value: boolean) {}
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr[byteOffset] = this.value ? 1 : 0;
  }
}

/**
 * Write a `float` value, 32-bit floating point number.
 */
class WriteFloat {
  readonly size = 4;
  private readonly value: number;
  constructor(value: number) {
    this.value = value;
  }
  write(_arr: Uint8Array, view: DataView, byteOffset: number): void {
    view.setFloat32(byteOffset, this.value, true);
  }
}

/**
 * Write a `double` value, a 64-bit floating point number.
 */
class WriteDouble {
  readonly size = 8;
  private readonly value: number;
  constructor(
    value: number,
  ) {
    this.value = value;
  }
  write(_arr: Uint8Array, view: DataView, byteOffset: number): void {
    view.setFloat64(byteOffset, this.value, true);
  }
}

/**
 * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
 */
class WriteFixed32 {
  readonly size = 4;
  private readonly value: number;
  constructor(
    value: number,
  ) {
    this.value = value;
  }
  write(_arr: Uint8Array, view: DataView, byteOffset: number): void {
    view.setUint32(byteOffset, this.value, true);
  }
}

/**
 * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
 */
class WriteSfixed32 {
  readonly size = 4;
  private readonly value: number;
  constructor(
    value: number,
  ) {
    this.value = value;
  }
  write(_arr: Uint8Array, view: DataView, byteOffset: number): void {
    view.setInt32(byteOffset, this.value, true);
  }
}

/**
 * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
 */
class WriteSint32 {
  readonly size: number;
  private readonly value: number[];
  constructor(value: number) {
    const buf: number[] = [];
    // zigzag encode
    value = ((value << 1) ^ (value >> 31)) >>> 0;
    varint32write(value, buf);
    this.value = buf;
    this.size = buf.length;
  }
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr.set(this.value, byteOffset);
  }
}

/**
 * Write a `sfixed64` value, a signed, fixed-length 64-bit integer.
 */
class WriteSfixed64 {
  readonly size = 8;
  constructor(private readonly value: string | number | bigint) {}
  write(_arr: Uint8Array, view: DataView, byteOffset: number): void {
    const tc = protoInt64.enc(this.value);
    view.setInt32(byteOffset, tc.lo, true);
    view.setInt32(byteOffset + 4, tc.hi, true);
  }
}

/**
 * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
 */
class WriteFixed64 {
  readonly size = 8;
  constructor(private readonly value: string | number | bigint) {}
  write(_arr: Uint8Array, view: DataView, byteOffset: number): void {
    const tc = protoInt64.uEnc(this.value);
    view.setInt32(byteOffset, tc.lo, true);
    view.setInt32(byteOffset + 4, tc.hi, true);
  }
}


/**
 * Write a `int64` value, a signed 64-bit varint.
 */
class WriteInt64 {
  readonly size: number;
  private readonly buf: number[];
  constructor(value: string | number | bigint) {
    const tc = protoInt64.enc(value);
    const buf: number[] = [];
    varint64write(tc.lo, tc.hi, buf);
    this.buf = buf;
    this.size = buf.length;
  }
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr.set(this.buf, byteOffset);
  }
}

/**
 * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
 */
class WriteSint64 {
  readonly size: number;
  private readonly buf: number[];
  constructor(value: string | number | bigint) {
    const tc = protoInt64.enc(value),
      // zigzag encode
      sign = tc.hi >> 31,
      lo = (tc.lo << 1) ^ sign,
      hi = ((tc.hi << 1) | (tc.lo >>> 31)) ^ sign;
    const buf: number[] = [];
    varint64write(lo, hi, buf);
    this.buf = buf;
    this.size = buf.length;
  }
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr.set(this.buf, byteOffset);
  }
}

/**
 * Write a `uint64` value, an unsigned 64-bit varint.
 */
class WriteUint64 {
  readonly size: number;
  private readonly buf: number[];
  constructor(value: string | number | bigint) {
    const tc = protoInt64.uEnc(value);
    const buf: number[] = [];
    varint64write(tc.lo, tc.hi, buf);
    this.buf = buf;
    this.size = buf.length;
  }
  write(arr: Uint8Array, _view: DataView, byteOffset: number): void {
    arr.set(this.buf, byteOffset);
  }
}

export class BinaryWriter2 {

  private writes: Write[] = [];

  /**
   * Previous fork states.
   */
  private readonly stack: Write[][] = [];


  constructor(
    private readonly encodeUtf8: (
      text: string,
    ) => Uint8Array = getTextEncoding().encodeUtf8,
  ) {
  }

  /**
   * Return all bytes written and reset this writer.
   */
  finish(): Uint8Array<ArrayBuffer> {
    if (this.stack.length > 0) {
      throw new Error();
    }
    const size = sizeOfWrites(this.writes);
    const arr = new Uint8Array(size);
    const view = new DataView(arr.buffer);
    let byteOffset = 0;
    for (const w of this.writes) {
      w.write(arr, view, byteOffset);
      byteOffset += w.size;
    }
    this.writes = [];
    return arr;
  }

  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork(): this {
    this.stack.push(this.writes);
    this.writes = [];
    return this;
  }

  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join(): this {
    const size = sizeOfWrites(this.writes);
    const prev = this.stack.pop();
    if (!prev) throw new Error("invalid state, fork stack empty");
    this.writes = prev.concat(new WriteUint32(size), this.writes);
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
    this.writes.push(new WriteUint32(((fieldNo << 3) | type) >>> 0));
    return this;
  }

  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk: Uint8Array): this {
    this.writes.push(new WriteRaw(chunk));
    return this;
  }

  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value: number): this {
    assertUInt32(value);
    this.writes.push(new WriteUint32(value));
    return this;
  }

  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value: number): this {
    assertInt32(value);
    this.writes.push(new WriteInt32(value));
    return this;
  }

  /**
   * Write a `bool` value, a variant.
   */
  bool(value: boolean): this {
    this.writes.push(new WriteBool(value));
    return this;
  }

  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value: Uint8Array): this {
    this.writes.push(new WriteUint32(value.length), new WriteRaw(value));
    return this;
  }

  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value: string): this {
    let chunk = this.encodeUtf8(value);
    this.writes.push(new WriteUint32(chunk.length), new WriteRaw(chunk));
    return this;
  }

  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value: number): this {
    assertFloat32(value);
    this.writes.push(new WriteFloat(value));
    return this;
  }

  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value: number): this {
    this.writes.push(new WriteDouble(value));
    return this;
  }

  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value: number): this {
    assertUInt32(value);
    this.writes.push(new WriteFixed32(value));
    return this;
  }

  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value: number): this {
    assertInt32(value);
    this.writes.push(new WriteSfixed32(value));
    return this;
  }

  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value: number): this {
    assertInt32(value);
    this.writes.push(new WriteSint32(value));
    return this;
  }

  /**
   * Write a `sfixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value: string | number | bigint): this {
    this.writes.push(new WriteSfixed64(value));
    return this;
  }

  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value: string | number | bigint): this {
    this.writes.push(new WriteFixed64(value));
    return this;
  }

  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value: string | number | bigint): this {
    this.writes.push(new WriteInt64(value));
    return this;
  }

  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value: string | number | bigint): this {
    this.writes.push(new WriteSint64(value));
    return this;
  }

  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value: string | number | bigint): this {
    this.writes.push(new WriteUint64(value));
    return this;
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
