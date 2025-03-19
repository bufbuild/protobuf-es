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

// @generated by protoc-gen-es v2.2.5 with parameter "target=ts"
// @generated from file google/type/localized_text.proto (package google.type, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file google/type/localized_text.proto.
 */
export const file_google_type_localized_text: GenFile = /*@__PURE__*/
  fileDesc("CiBnb29nbGUvdHlwZS9sb2NhbGl6ZWRfdGV4dC5wcm90bxILZ29vZ2xlLnR5cGUiNAoNTG9jYWxpemVkVGV4dBIMCgR0ZXh0GAEgASgJEhUKDWxhbmd1YWdlX2NvZGUYAiABKAlCegoPY29tLmdvb2dsZS50eXBlQhJMb2NhbGl6ZWRUZXh0UHJvdG9QAVpIZ29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy90eXBlL2xvY2FsaXplZF90ZXh0O2xvY2FsaXplZF90ZXh0+AEBogIDR1RQYgZwcm90bzM");

/**
 * Localized variant of a text in a particular language.
 *
 * @generated from message google.type.LocalizedText
 */
export type LocalizedText = Message<"google.type.LocalizedText"> & {
  /**
   * Localized string in the language corresponding to `language_code' below.
   *
   * @generated from field: string text = 1;
   */
  text: string;

  /**
   * The text's BCP-47 language code, such as "en-US" or "sr-Latn".
   *
   * For more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   *
   * @generated from field: string language_code = 2;
   */
  languageCode: string;
};

/**
 * Describes the message google.type.LocalizedText.
 * Use `create(LocalizedTextSchema)` to create a new message.
 */
export const LocalizedTextSchema: GenMessage<LocalizedText> = /*@__PURE__*/
  messageDesc(file_google_type_localized_text, 0);

