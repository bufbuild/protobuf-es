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

import type { Message } from "./message.js";
import type {
  IBinaryReader,
  IBinaryWriter,
  WireType,
} from "./binary-encoding.js";
import type { FieldInfo } from "./field.js";

/**
 * BinaryFormat is the contract for serializing messages to and from binary
 * data. Implementations may be specific to a proto syntax, and can be
 * reflection based, or delegate to speed optimized generated code.
 */
export interface BinaryFormat {
  /**
   * Provide options for parsing binary data.
   */
  makeReadOptions(
    options?: Partial<BinaryReadOptions>,
  ): Readonly<BinaryReadOptions>;

  /**
   * Provide options for serializing binary data.
   */
  makeWriteOptions(
    options?: Partial<BinaryWriteOptions>,
  ): Readonly<BinaryWriteOptions>;

  /**
   * Parse a message from binary data, merging fields.
   *
   * Supports two message encodings:
   * - length-prefixed: delimitedMessageEncoding is false or omitted, and
   *   lengthOrEndTagFieldNo is the expected length of the message in the reader.
   * - delimited: delimitedMessageEncoding is true, and lengthOrEndTagFieldNo is
   *   the field number in a tag with wire type end-group signalling the end of
   *   the message in the reader.
   *
   * delimitedMessageEncoding is optional for backwards compatibility.
   */
  readMessage(
    message: Message,
    reader: IBinaryReader,
    lengthOrEndTagFieldNo: number,
    options: BinaryReadOptions,
    delimitedMessageEncoding?: boolean,
  ): void;

  /**
   * Parse a field from binary data, and store it in the given target.
   *
   * The target must be an initialized message object, with oneof groups,
   * repeated fields and maps already present.
   */
  readField(
    target: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
    reader: IBinaryReader,
    field: FieldInfo,
    wireType: WireType,
    options: BinaryReadOptions,
  ): void;

  /**
   * Serialize a message to binary data.
   */
  writeMessage(
    message: Message,
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): void;

  /**
   * Serialize a field value to binary data.
   *
   * The value must be an array for repeated fields, a record object for map
   * fields. Only selected oneof fields should be passed to this method.
   */
  writeField(
    field: FieldInfo,
    value: any, // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
    writer: IBinaryWriter,
    options: BinaryWriteOptions,
  ): void;

  /**
   * Retrieve the unknown fields for the given message.
   *
   * Unknown fields are well-formed protocol buffer serialized data for
   * fields that the parserdoes not recognize.
   *
   * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
   */
  listUnknownFields(
    message: Message,
  ): ReadonlyArray<{ no: number; wireType: WireType; data: Uint8Array }>;

  /**
   * Discard unknown fields for the given message.
   */
  discardUnknownFields(message: Message): void;

  /**
   * Retrieve the unknown fields for the given message and write them to
   * the given writer. This method is called when a message is serialized,
   * so the fields that are unknown to the parser persist through a round
   * trip.
   */
  writeUnknownFields(message: Message, writer: IBinaryWriter): void;

  /**
   * Store an unknown field for the given message. The parser will use this
   * method if it does not recognize a field, unless the option
   * `readUnknownFields` has been disabled.
   */
  onUnknownField(
    message: Message,
    no: number,
    wireType: WireType,
    data: Uint8Array,
  ): void;
}

/**
 * Options for parsing binary data.
 */
export interface BinaryReadOptions {
  /**
   * Retain unknown fields during parsing? The default behavior is to retain
   * unknown fields and include them in the serialized output.
   *
   * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
   */
  readUnknownFields: boolean;

  /**
   * Allows to use a custom implementation to decode binary data.
   */
  readerFactory: (bytes: Uint8Array) => IBinaryReader;
}

/**
 * Options for serializing to binary data.
 */
export interface BinaryWriteOptions {
  /**
   * Include unknown fields in the serialized output? The default behavior
   * is to retain unknown fields and include them in the serialized output.
   *
   * For more details see https://developers.google.com/protocol-buffers/docs/proto3#unknowns
   */
  writeUnknownFields: boolean;

  /**
   * Allows to use a custom implementation to encode binary data.
   */
  writerFactory: () => IBinaryWriter;
}
