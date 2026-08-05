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

const symbol = Symbol.for("@bufbuild/protobuf/text-encoding");

// Native String.prototype.isWellFormed, if the runtime provides it.
const nativeStringIsWellFormed = (
  String.prototype as Partial<{ isWellFormed(): boolean }>
).isWellFormed;

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
   * Encode UTF-8 text to a Uint8Array.
   */
  encodeUtf8Into: (
    text: string,
    dest: Uint8Array,
  ) => { read: number; written: number };
  /**
   * Decode UTF-8 text from binary. If `strict` is true, throw on invalid byte
   * sequences instead of silently substituting U+FFFD. Implementations that
   * do not support strict decoding may ignore the flag.
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
export function configureTextEncoding(
  textEncoding: Omit<TextEncoding, "encodeUtf8Into"> &
    Partial<Pick<TextEncoding, "encodeUtf8Into">>,
): void {
  (globalThis as GlobalWithTextEncoding)[symbol] = {
    ...textEncoding,
    // Emulate encodeUtf8Into with encodeUtf8 if it is not provided.
    encodeUtf8Into:
      textEncoding.encodeUtf8Into ??
      ((text, dest) => {
        const bytes = textEncoding.encodeUtf8(text);
        dest.set(bytes);
        return { read: text.length, written: bytes.byteLength };
      }),
  };
}

export function getTextEncoding() {
  if ((globalThis as GlobalWithTextEncoding)[symbol] == undefined) {
    const textEncoder = new (
      globalThis as unknown as GlobalWithTextEncoderDecoder
    ).TextEncoder();
    const textDecoder = new (
      globalThis as unknown as GlobalWithTextEncoderDecoder
    ).TextDecoder();
    let textDecoderStrict: { decode(data: Uint8Array): string } | undefined;

    configureTextEncoding({
      encodeUtf8(text: string): Uint8Array<ArrayBuffer> {
        return textEncoder.encode(text);
      },
      // With exactOptionalPropertyTypes, an explicit undefined is not
      // assignable to the optional property, so spread conditionally.
      ...(textEncoder.encodeInto !== undefined
        ? { encodeUtf8Into: textEncoder.encodeInto.bind(textEncoder) }
        : undefined),
      decodeUtf8(bytes: Uint8Array, strict?: boolean): string {
        if (strict) {
          if (textDecoderStrict === undefined) {
            textDecoderStrict = new (
              globalThis as unknown as GlobalWithTextEncoderDecoder
            ).TextDecoder("utf-8", { fatal: true });
          }
          return textDecoderStrict.decode(bytes);
        }
        return textDecoder.decode(bytes);
      },
      checkUtf8(text: string): boolean {
        if (nativeStringIsWellFormed) {
          return nativeStringIsWellFormed.call(text);
        }
        try {
          encodeURIComponent(text);
          return true;
        } catch (_) {
          return false;
        }
      },
    });
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
      encodeInto?(
        text: string,
        dest: Uint8Array,
      ): { read: number; written: number };
    };
  };
  TextDecoder: {
    new (
      label?: string,
      options?: { fatal?: boolean },
    ): {
      decode(data: Uint8Array): string;
    };
  };
};
