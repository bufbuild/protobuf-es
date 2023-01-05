// Copyright 2021-2023 Buf Technologies, Inc.
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
import type { MessageType } from "./message-type.js";
import type { ScalarType } from "./field.js";
import type { IMessageTypeRegistry } from "./type-registry.js";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * JsonFormat is the contract for serializing messages to and from JSON.
 * Implementations may be specific to a proto syntax, and can be reflection
 * based, or delegate to speed optimized generated code.
 */
export interface JsonFormat {
  /**
   * Provide options for parsing JSON data.
   */
  makeReadOptions(
    options?: Partial<JsonReadOptions>
  ): Readonly<JsonReadOptions>;

  /**
   * Provide options for serializing to JSON.
   */
  makeWriteOptions(
    options?: Partial<JsonWriteStringOptions>
  ): Readonly<JsonWriteStringOptions>;

  /**
   * Parse a message from JSON.
   */
  readMessage<T extends Message<T>>(
    type: MessageType<T>,
    jsonValue: JsonValue,
    options: JsonReadOptions,
    message?: T
  ): T;

  /**
   * Serialize a message to JSON.
   */
  writeMessage(message: Message, options: JsonWriteOptions): JsonValue;

  /**
   * Parse a single scalar value from JSON.
   * This method may throw an error, but it may have a blank error message.
   * Callers are expected to provide context.
   */
  readScalar(type: ScalarType, json: JsonValue): any;

  /**
   * Serialize a single scalar value to JSON.
   */
  writeScalar(
    type: ScalarType,
    value: any,
    emitDefaultValues: boolean
  ): JsonValue | undefined;

  /**
   * Returns a short string representation of a JSON value, suitable for error messages.
   */
  debug(json: JsonValue): string;
}

/**
 * Options for parsing JSON data.
 */
export interface JsonReadOptions {
  /**
   * Ignore unknown fields: Proto3 JSON parser should reject unknown fields
   * by default. This option ignores unknown fields in parsing, as well as
   * unrecognized enum string representations.
   */
  ignoreUnknownFields: boolean;

  /**
   * This option is required to read `google.protobuf.Any`
   * from JSON format.
   */
  typeRegistry?: IMessageTypeRegistry;
}

/**
 * Options for serializing to JSON.
 */
export interface JsonWriteOptions {
  /**
   * Emit fields with default values: Fields with default values are omitted
   * by default in proto3 JSON output. This option overrides this behavior
   * and outputs fields with their default values.
   */
  emitDefaultValues: boolean;

  /**
   * Emit enum values as integers instead of strings: The name of an enum
   * value is used by default in JSON output. An option may be provided to
   * use the numeric value of the enum value instead.
   */
  enumAsInteger: boolean;

  /**
   * Use proto field name instead of lowerCamelCase name: By default proto3
   * JSON printer should convert the field name to lowerCamelCase and use
   * that as the JSON name. An implementation may provide an option to use
   * proto field name as the JSON name instead. Proto3 JSON parsers are
   * required to accept both the converted lowerCamelCase name and the proto
   * field name.
   */
  useProtoFieldName: boolean;

  /**
   * This option is required to write `google.protobuf.Any`
   * to JSON format.
   */
  typeRegistry?: IMessageTypeRegistry;
}

/**
 * Options for serializing to JSON.
 */
export interface JsonWriteStringOptions extends JsonWriteOptions {
  prettySpaces: number;
}

/**
 * Represents any possible JSON value:
 * - number
 * - string
 * - boolean
 * - null
 * - object (with any JSON value as property)
 * - array (with any JSON value as element)
 */
export type JsonValue =
  | number
  | string
  | boolean
  | null
  | JsonObject
  | JsonValue[];

/**
 * Represents a JSON object.
 */
export type JsonObject = { [k: string]: JsonValue };
