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

import type { FieldInfo } from "./field.js";
import type { AnyMessage, Message } from "./message.js";
import type { MessageType } from "./message-type.js";
import type { ProtoRuntime } from "./private/proto-runtime.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Extension<E extends Message<E> = AnyMessage, V = unknown> {
  /**
   * The fully qualified name of the extension.
   */
  readonly typeName: string;

  /**
   * The message extended by this extension.
   */
  readonly extendee: MessageType<E>;

  /**
   * Field information for this extension. Note that required fields, maps,
   * oneof are not allowed in extensions. Behavior of "localName" property is
   * undefined and must not be relied upon.
   */
  readonly field: FieldInfo;

  /**
   * Provides serialization and other functionality.
   */
  readonly runtime: ProtoRuntime;
}
