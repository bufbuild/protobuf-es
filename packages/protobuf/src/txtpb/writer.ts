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

const indentUnit = "  ";

/**
 * A position in the Writer's output, used to roll back speculative writes.
 */
interface Mark {
  readonly size: number;
  readonly depth: number;
}

/**
 * A writer for the protobuf text format.
 *
 * The Writer owns layout: indentation, line breaks, and braces. Its output
 * matches the default formatting of txtpbfmt and the multi-line output of
 * protobuf-go: two-space indentation, `name: value` with a single space after
 * the colon, submessages as `name: {` with the body indented and `}` aligned
 * under the field name, and a trailing newline. It never inserts the randomized
 * extra spaces that protobuf-go adds to discourage parsing its output as
 * canonical.
 *
 * Output accumulates into a single buffer of lines, so a deep tree costs no
 * more than the bytes it prints. To decide between `name: {}` and an indented
 * block, the caller renders the body, then rolls back with mark()/reset() if it
 * turned out empty — an O(1) decision that needs no separate child buffer.
 */
export class Writer {
  private readonly chunks: string[] = [];
  private depth = 0;

  /**
   * Write a scalar field: `<indent>name: value` followed by a newline.
   */
  scalar(name: string, value: string): void {
    this.chunks.push(this.indent() + name + ": " + value + "\n");
  }

  /**
   * Write an empty message field: `<indent>name: {}` followed by a newline.
   */
  emptyMessage(name: string): void {
    this.chunks.push(this.indent() + name + ": {}\n");
  }

  /**
   * Open a message field: `<indent>name: {` followed by a newline, then indent
   * the body. Close it with end().
   */
  openMessage(name: string): void {
    this.chunks.push(this.indent() + name + ": {\n");
    this.depth++;
  }

  /**
   * Close a message opened with openMessage(): outdent and write `<indent>}`
   * followed by a newline.
   */
  end(): void {
    this.depth--;
    this.chunks.push(this.indent() + "}\n");
  }

  /**
   * Capture the current output position so it can be rolled back with reset().
   */
  mark(): Mark {
    return { size: this.chunks.length, depth: this.depth };
  }

  /**
   * Roll back to a position captured with mark().
   */
  reset(mark: Mark): void {
    this.chunks.length = mark.size;
    this.depth = mark.depth;
  }

  /**
   * The number of lines written since the given mark.
   */
  writesSince(mark: Mark): number {
    return this.chunks.length - mark.size;
  }

  toString(): string {
    return this.chunks.join("");
  }

  private indent(): string {
    return indentUnit.repeat(this.depth);
  }
}

/**
 * Quote and escape a string field value as a double-quoted text format literal.
 *
 * Uses the single escaping decision in escapeCodePoint, so string fields, bytes
 * fields, and unknown length-delimited rendering can never drift apart. Valid
 * non-ASCII passes through as raw UTF-8; surrogates are never escaped.
 */
export function quoteString(value: string): string {
  let out = '"';
  for (const ch of value) {
    out += escapeCodePoint(ch.codePointAt(0) as number) ?? ch;
  }
  return out + '"';
}

/**
 * Quote and escape a bytes field value as a double-quoted text format literal.
 *
 * Valid UTF-8 runs are emitted with escapeCodePoint (so they read identically
 * to a string field); any byte that is not part of a valid UTF-8 sequence is
 * emitted as `\xHH`, keeping the output plain ASCII that round-trips exactly.
 */
export function quoteBytes(value: Uint8Array): string {
  let out = '"';
  for (let i = 0; i < value.length; ) {
    const rune = decodeUtf8(value, i);
    if (rune === undefined) {
      out += "\\x" + hex2(value[i]);
      i++;
      continue;
    }
    out += escapeCodePoint(rune.code) ?? String.fromCodePoint(rune.code);
    i += rune.size;
  }
  return out + '"';
}

/**
 * The single source of truth for escaping a code point in a text format string
 * literal. Returns the escape sequence, or undefined when the code point may be
 * emitted raw.
 *
 * Escapes the conventional sequences, all C0 controls and DEL as `\xHH`, and
 * the C1 controls (U+0080–U+009F) as `\u00HH`. Surrogates and everything else
 * pass through raw.
 */
function escapeCodePoint(code: number): string | undefined {
  switch (code) {
    case 0x5c:
      return "\\\\";
    case 0x22:
      return '\\"';
    case 0x0a:
      return "\\n";
    case 0x0d:
      return "\\r";
    case 0x09:
      return "\\t";
  }
  if (code < 0x20 || code === 0x7f) {
    return "\\x" + hex2(code);
  }
  if (code >= 0x80 && code <= 0x9f) {
    return "\\u" + code.toString(16).padStart(4, "0");
  }
  return undefined;
}

/**
 * Decode the UTF-8 sequence starting at `offset`, returning the code point and
 * its byte length, or undefined if the bytes there are not valid UTF-8. We
 * decode manually (rather than via TextDecoder) so an invalid byte can be
 * pinpointed and escaped individually.
 */
function decodeUtf8(
  bytes: Uint8Array,
  offset: number,
): { code: number; size: number } | undefined {
  const b0 = bytes[offset];
  if (b0 < 0x80) {
    return { code: b0, size: 1 };
  }
  if (b0 < 0xc0) {
    return undefined;
  }
  if (b0 < 0xe0) {
    const b1 = bytes[offset + 1];
    if (!isContinuation(b1)) {
      return undefined;
    }
    const code = ((b0 & 0x1f) << 6) | (b1 & 0x3f);
    return code < 0x80 ? undefined : { code, size: 2 };
  }
  if (b0 < 0xf0) {
    const b1 = bytes[offset + 1];
    const b2 = bytes[offset + 2];
    if (!isContinuation(b1) || !isContinuation(b2)) {
      return undefined;
    }
    const code = ((b0 & 0x0f) << 12) | ((b1 & 0x3f) << 6) | (b2 & 0x3f);
    if (code < 0x800 || (code >= 0xd800 && code <= 0xdfff)) {
      return undefined;
    }
    return { code, size: 3 };
  }
  if (b0 < 0xf8) {
    const b1 = bytes[offset + 1];
    const b2 = bytes[offset + 2];
    const b3 = bytes[offset + 3];
    if (!isContinuation(b1) || !isContinuation(b2) || !isContinuation(b3)) {
      return undefined;
    }
    const code =
      ((b0 & 0x07) << 18) |
      ((b1 & 0x3f) << 12) |
      ((b2 & 0x3f) << 6) |
      (b3 & 0x3f);
    if (code < 0x10000 || code > 0x10ffff) {
      return undefined;
    }
    return { code, size: 4 };
  }
  return undefined;
}

function isContinuation(byte: number | undefined): boolean {
  return byte !== undefined && (byte & 0xc0) === 0x80;
}

function hex2(value: number): string {
  return value.toString(16).padStart(2, "0");
}
