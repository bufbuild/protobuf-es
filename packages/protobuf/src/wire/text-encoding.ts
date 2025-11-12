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

const symbol = Symbol.for("@bufbuild/protobuf/text-encoding");

interface TextEncoding {
  /**
   * Verify that the given text is valid UTF-8.
   */
  checkUtf8: (text: string) => boolean;
  /**
   * Encode UTF-8 text to binary.
   */
  encodeUtf8: (text: string) => Uint8Array<ArrayBuffer>;
  /**
   * Decode UTF-8 text from binary.
   *
   * By default, inserts U+FFFD for decoding failures. If `strict` is `true`,
   * throws a TypeError for any decoding failure.
   */
  decodeUtf8: (bytes: Uint8Array, strict?: boolean) => string;
}

/**
 * Protobuf-ES requires the Text Encoding API to convert UTF-8 from and to
 * binary. This WHATWG API is widely available, but it is not part of the
 * ECMAScript standard. On runtimes where it is not available, use this
 * function to provide your own implementation.
 *
 * Note that the Text Encoding API does not provide a way to validate UTF-8.
 * Our implementation falls back to use encodeURIComponent().
 */
export function configureTextEncoding(textEncoding: TextEncoding): void {
  (globalThis as GlobalWithTextEncoding)[symbol] = textEncoding;
}

export function getTextEncoding() {
  if ((globalThis as GlobalWithTextEncoding)[symbol] == undefined) {
    const te = new (
      globalThis as unknown as GlobalWithTextEncoderDecoder
    ).TextEncoder();
    const td = new (
      globalThis as unknown as GlobalWithTextEncoderDecoder
    ).TextDecoder();
    const dst = new (
      globalThis as unknown as GlobalWithTextEncoderDecoder
    ).TextDecoder(undefined, { fatal: true });
    (globalThis as GlobalWithTextEncoding)[symbol] = {
      encodeUtf8(text: string): Uint8Array<ArrayBuffer> {
        return te.encode(text);
      },
      decodeUtf8(bytes: Uint8Array, strict = false): string {
        return (strict ? dst : td).decode(bytes);
      },
      checkUtf8(text: string): boolean {
        try {
          encodeURIComponent(text);
          return true;
        } catch (_) {
          return false;
        }
      },
    };
  }
  return (globalThis as GlobalWithTextEncoding)[symbol] as TextEncoding;
}

type GlobalWithTextEncoding = {
  [symbol]?: TextEncoding;
};

type GlobalWithTextEncoderDecoder = {
  TextEncoder: {
    new (): {
      encode(text: string): Uint8Array<ArrayBuffer>;
    };
  };
  TextDecoder: {
    new (
      _?: undefined,
      options?: { fatal: boolean },
    ): {
      decode(data: Uint8Array): string;
    };
  };
};
