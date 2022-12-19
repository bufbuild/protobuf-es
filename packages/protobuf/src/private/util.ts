// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { FieldListSource } from "./field-list.js";
import type { FieldList } from "../field-list.js";
import type { EnumObject } from "./enum.js";
import type { Message, PartialMessage, PlainMessage } from "../message.js";
import type { MessageType, TypeCreateOptions } from "../message-type.js";
import type { EnumValueInfo } from "../enum.js";

/**
 * Provides utilities used by generated code.
 * All methods are internal and are not safe to use, they may break with a
 * future release.
 */
export interface Util {
  /**
   * Create a field list
   */
  newFieldList(fields: FieldListSource): FieldList;

  /**
   * Sets reflection information on a generated enum.
   */
  setEnumType(
    enumObject: EnumObject,
    typeName: string,
    values: Omit<EnumValueInfo, "localName">[],
    opt?: {
      // We do not surface options at this time
      // options?: { readonly [extensionName: string]: JsonValue };
    }
  ): void;

  /**
   * Set default field values on the target message.
   */
  initFields(target: Message, options?: TypeCreateOptions): void;

  /**
   * Set specified field values on the target message, recursively.
   */
  initPartial<T extends Message<T>>(
    source: PartialMessage<T> | undefined,
    target: T
  ): void;

  /**
   * Compares two messages of the same type recursively.
   * Will also return true if both messages are `undefined` or `null`.
   */
  equals<T extends Message<T>>(
    type: MessageType<T>,
    a: T | PlainMessage<T> | undefined | null,
    b: T | PlainMessage<T> | undefined | null
  ): boolean;

  /**
   * Create a deep copy.
   */
  clone<T extends Message<T>>(message: T): T;
}
