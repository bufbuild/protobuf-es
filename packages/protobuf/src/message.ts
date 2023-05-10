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

import type { BinaryReadOptions, BinaryWriteOptions } from "./binary-format.js";
import type {
  JsonReadOptions,
  JsonValue,
  JsonWriteOptions,
  JsonWriteStringOptions,
} from "./json-format.js";
import type { MessageType } from "./message-type.js";
import { BinaryReaderUtil } from "./private/binary-reader-util.js";

/**
 * AnyMessage is an interface implemented by all messages. If you need to
 * handle messages of unknown type, this interface provides a convenient
 * index signature to access fields with message["fieldname"].
 */
export interface AnyMessage extends Message<AnyMessage> {
  [k: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
}

/**
 * Message is the base class of every message, generated, or created at
 * runtime.
 *
 * It is _not_ safe to extend this class. If you want to create a message at
 * run time, use proto3.makeMessageType().
 */
export class Message<T extends Message<T> = AnyMessage> {
  /**
   * Compare with a message of the same type.
   */
  equals(other: T | PlainMessage<T> | undefined | null): boolean {
    return this.getType().runtime.util.equals(
      this.getType(),
      this as unknown as T,
      other
    );
  }

  /**
   * Create a deep copy.
   */
  clone(): T {
    return this.getType().runtime.util.clone(this as unknown as T);
  }

  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): this {
    const opt = this.getType().runtime.bin.makeReadOptions(options);
    BinaryReaderUtil.readMessage(
      opt.readerFactory(bytes),
      this,
      bytes.byteLength,
      opt
    );
    return this;
  }

  /**
   * Parse a message from a JSON value.
   */
  fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): this {
    const type = this.getType(),
      format = type.runtime.json,
      opt = format.makeReadOptions(options);
    format.readMessage(type, jsonValue, opt, this as unknown as T);
    return this;
  }

  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): this {
    let json: JsonValue;
    try {
      json = JSON.parse(jsonString) as JsonValue;
    } catch (e) {
      throw new Error(
        `cannot decode ${this.getType().typeName} from JSON: ${
          e instanceof Error ? e.message : String(e)
        }`
      );
    }
    return this.fromJson(json, options);
  }

  /**
   * Serialize the message to binary data.
   */
  toBinary(options?: Partial<BinaryWriteOptions>): Uint8Array {
    const type = this.getType(),
      bin = type.runtime.bin,
      opt = bin.makeWriteOptions(options),
      writer = opt.writerFactory();
    bin.writeMessage(this, writer, opt);
    return writer.finish();
  }

  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(options?: Partial<JsonWriteOptions>): JsonValue {
    const type = this.getType(),
      json = type.runtime.json,
      opt = json.makeWriteOptions(options);
    return json.writeMessage(this, opt);
  }

  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(options?: Partial<JsonWriteStringOptions>): string {
    const value = this.toJson(options);
    return JSON.stringify(value, null, options?.prettySpaces ?? 0);
  }

  /**
   * Override for serialization behavior. This will be invoked when calling
   * JSON.stringify on this message (i.e. JSON.stringify(msg)).
   *
   * Note that this will not serialize google.protobuf.Any with a packed
   * message because the protobuf JSON format specifies that it needs to be
   * unpacked, and this is only possible with a type registry to look up the
   * message type.  As a result, attempting to serialize a message with this
   * type will throw an Error.
   *
   * This method is protected because you should not need to invoke it
   * directly -- instead use JSON.stringify or toJsonString for
   * stringified JSON.  Alternatively, if actual JSON is desired, you should
   * use toJson.
   */
  protected toJSON(): JsonValue {
    return this.toJson({
      emitDefaultValues: true,
    });
  }

  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType(): MessageType<T> {
    // Any class that extends Message _must_ provide a complete static
    // implementation of MessageType.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return Object.getPrototypeOf(this).constructor;
  }
}

/**
 * PlainMessage<T> strips all methods from a message, leaving only fields
 * and oneof groups.  It is recursive, meaning it applies this same logic to all
 * nested message fields as well.
 */
export type PlainMessage<T extends Message<T>> = {
  // eslint-disable-next-line @typescript-eslint/ban-types -- we use `Function` to identify methods
  [P in keyof T as T[P] extends Function ? never : P]: PlainField<T[P]>;
};

// prettier-ignore
type PlainField<F> =
  F extends (Date | Uint8Array | bigint | boolean | string | number) ? F
  : F extends Array<infer U> ? Array<PlainField<U>>
  : F extends ReadonlyArray<infer U> ? ReadonlyArray<PlainField<U>>
  : F extends Message<infer U> ? PlainMessage<U>
  : F extends OneofSelectedMessage<infer C, infer V> ? { case: C; value: PlainField<V> }
  : F extends { case: string | undefined; value?: unknown } ? F
  : F extends { [key: string|number]: Message<infer U> } ? { [key: string|number]: PlainField<U> }
  : F ;

/**
 * PartialMessage<T> constructs a type from a message. The resulting type
 * only contains the protobuf field members of the message, and all of them
 * are optional.
 *
 * Note that the optionality of the fields is the only difference between
 * PartialMessage and PlainMessage.
 *
 * PartialMessage is similar to the built-in type Partial<T>, but recursive,
 * and respects `oneof` groups.
 */
export type PartialMessage<T extends Message<T>> = {
  // eslint-disable-next-line @typescript-eslint/ban-types -- we use `Function` to identify methods
  [P in keyof T as T[P] extends Function ? never : P]?: PartialField<T[P]>;
};

// prettier-ignore
type PartialField<F> =
  F extends (Date | Uint8Array | bigint | boolean | string | number) ? F
  : F extends Array<infer U> ? Array<PartialField<U>>
  : F extends ReadonlyArray<infer U> ? ReadonlyArray<PartialField<U>>
  : F extends Message<infer U> ? PartialMessage<U>
  : F extends OneofSelectedMessage<infer C, infer V> ? {case: C; value: PartialMessage<V>}
  : F extends { case: string | undefined; value?: unknown; } ? F
  : F extends {[key: string|number]: Message<infer U>} ? {[key: string|number]: PartialMessage<U>}
  : F ;

type OneofSelectedMessage<K extends string, M extends Message<M>> = {
  case: K;
  value: M;
};
