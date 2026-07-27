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

// Capacity allocated by the first reserve() that needs to grow.
const initialCapacity = 128;

// Shared empty buffer, so that creating a ByteBuffer does not allocate. Small
// messages (e.g. a bool-only request) would otherwise pay for a zeroed buffer
// of initialCapacity bytes.
const emptyBytes = new Uint8Array(0);

/**
 * A growable byte buffer. Used in place of a resizable ArrayBuffer, which is
 * not widely available.
 */
export class ByteBuffer {
  /**
   * The backing buffer, valid up to the reserved capacity. Re-read it after
   * reserve() or append(), which may have replaced it.
   */
  buffer: Uint8Array<ArrayBuffer> = emptyBytes;

  /**
   * Number of bytes written. Advance it after writing directly into buffer.
   */
  length = 0;

  /**
   * Return the bytes written so far, as a view into the backing buffer.
   */
  bytes(): Uint8Array<ArrayBuffer> {
    return this.buffer.subarray(0, this.length);
  }

  /**
   * Ensure there is capacity for at least additionalBytes beyond length.
   * Starts at initialCapacity and doubles until the required size fits.
   */
  reserve(additionalBytes: number): void {
    const required = this.length + additionalBytes;
    if (required > this.buffer.byteLength) {
      let capacity = this.buffer.byteLength || initialCapacity;
      while (capacity < required) capacity *= 2;
      const grown = new Uint8Array(capacity);
      if (this.length > 0) grown.set(this.bytes());
      this.buffer = grown;
    }
  }

  /**
   * Append a chunk of bytes, growing the backing buffer if necessary.
   */
  append(chunk: Uint8Array): void {
    this.reserve(chunk.byteLength);
    this.buffer.set(chunk, this.length);
    this.length += chunk.byteLength;
  }
}
