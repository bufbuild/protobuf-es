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

import { base64Decode, base64Encode } from "./next/wire/index.js";

/**
 * @deprecated use base64Encode / base64Decode from @bufbuild/protobuf/wire instead
 */
export const protoBase64 = {
  /**
   * @deprecated use base64Decode from @bufbuild/protobuf/wire instead
   *
   * Decodes a base64 string to a byte array.
   *
   * - ignores white-space, including line breaks and tabs
   * - allows inner padding (can decode concatenated base64 strings)
   * - does not require padding
   * - understands base64url encoding:
   *   "-" instead of "+",
   *   "_" instead of "/",
   *   no padding
   */
  dec(base64Str: string): Uint8Array {
    return base64Decode(base64Str);
  },
  /**
   * @deprecated use base64Encode from @bufbuild/protobuf/wire instead
   *
   * Encode a byte array to a base64 string.
   */
  enc(bytes: Uint8Array): string {
    return base64Encode(bytes);
  },
} as const;
