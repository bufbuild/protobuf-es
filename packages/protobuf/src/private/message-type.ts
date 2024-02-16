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

import { Message } from "../message.js";
import type { AnyMessage, PartialMessage, PlainMessage } from "../message.js";
import type { FieldListSource } from "./field-list.js";
import type { JsonReadOptions, JsonValue } from "../json-format.js";
import type { MessageType } from "../message-type.js";
import type { BinaryReadOptions } from "../binary-format.js";
import type { ProtoRuntime } from "./proto-runtime.js";
import { scalarZeroValue } from "./scalars.js";
import type { FieldInfo } from "../field";

/**
 * Create a new message type using the given runtime.
 */
export function makeMessageType<T extends Message<T> = AnyMessage>(
  runtime: ProtoRuntime,
  typeName: string,
  fields: FieldListSource,
  opt?: {
    /**
     * localName is the "name" property of the constructed function.
     * It is useful in stack traces, debuggers and test frameworks,
     * but has no other implications.
     *
     * If omitted, the last part of the typeName is used.
     */
    localName?: string;
    // We do not surface options at this time
    // options?: { readonly [extensionName: string]: JsonValue };
  },
): MessageType<T> {
  const localName =
    opt?.localName ?? typeName.substring(typeName.lastIndexOf(".") + 1);
  let prototypeFieldsNeeded = runtime.syntax == "proto2";
  const type = {
    [localName]: function (this: T, data?: PartialMessage<T>) {
      if (prototypeFieldsNeeded) {
        addPrototypeFields(type);
        prototypeFieldsNeeded = false;
      }
      runtime.util.initFields(this);
      runtime.util.initPartial(data, this);
    },
  }[localName] as unknown as MessageType<T>;
  Object.setPrototypeOf(type.prototype, new Message<T>());
  Object.assign<MessageType<T>, Omit<MessageType<T>, "new">>(type, {
    runtime,
    typeName,
    fields: runtime.util.newFieldList(fields),
    fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): T {
      return new type().fromBinary(bytes, options);
    },
    fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): T {
      return new type().fromJson(jsonValue, options);
    },
    fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): T {
      return new type().fromJsonString(jsonString, options);
    },
    equals(
      a: T | PlainMessage<T> | undefined,
      b: T | PlainMessage<T> | undefined,
    ): boolean {
      return runtime.util.equals(type, a, b);
    },
  });
  return type;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function addPrototypeFields(ctor: MessageType) {
  for (const field of ctor.fields.list()) {
    if (!fieldUsesPrototype(field)) {
      continue;
    }
    let value: unknown = field.default;
    if (value === undefined) {
      if (field.kind == "scalar") {
        value = scalarZeroValue(field.T, field.L);
      } else if (field.kind == "enum") {
        value = field.T.values[0].no;
      }
    }
    (ctor.prototype as Record<string, unknown>)[field.localName] = value;
  }
}

// Behavior must match with the counterpart in @bufbuild/protoc-gen-es
function fieldUsesPrototype(field: FieldInfo): boolean {
  if (field.repeated || field.oneof) {
    return false;
  }
  if (field.kind != "scalar" && field.kind != "enum") {
    return false;
  }
  // proto2 singular scalar and enum fields use an initial value on the prototype chain
  return true;
}
