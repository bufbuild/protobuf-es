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

import type { MessageType } from "./message-type.js";
import type { AnyMessage } from "./message.js";
import { Message } from "./message.js";

/**
 * Check whether the given object is an instance of the given message type.
 *
 * This function is equivalent to the `instanceof` operator. For example,
 * `isMessage(foo, MyMessage)` is the same as `foo instanceof MyMessage`, and
 * `isMessage(foo)` is the same as `foo instanceof Message`.
 *
 * Just like `instanceof`, `isMessage` narrows the type. The advantage of
 * `isMessage` is that it compares identity by the message type name, not by
 * class identity. This makes it robust against the dual package hazard and
 * similar situations, where the same message is duplicated.
 */
export function isMessage<T extends Message<T> = AnyMessage>(
  arg: unknown,
  type?: MessageType<T>,
): arg is T {
  if (arg === null || typeof arg != "object") {
    return false;
  }
  if (
    !Object.getOwnPropertyNames(Message.prototype).every(
      (m) =>
        m in arg && typeof (arg as Record<string, unknown>)[m] == "function",
    )
  ) {
    return false;
  }
  const actualType = (arg as { getType(): unknown }).getType();
  if (
    actualType === null ||
    typeof actualType != "function" ||
    !("typeName" in actualType) ||
    typeof actualType.typeName != "string"
  ) {
    return false;
  }
  return type === undefined ? true : actualType.typeName == type.typeName;
}
