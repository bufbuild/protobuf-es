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

import type { Message } from "../types.js";
import type {
  DescEnum,
  DescEnumValue,
  DescExtension,
  DescField,
  DescFile,
  DescMessage,
  DescMethod,
  DescService,
} from "../descriptors.js";
import type { JsonValue } from "../json-value.js";

/**
 * Describes a protobuf source file.
 *
 * @private
 */
export type GenFile = DescFile;

/**
 * Describes a message declaration in a protobuf source file.
 *
 * This type is identical to DescMessage, but carries additional type
 * information.
 *
 * @private
 */
// prettier-ignore
export type GenMessage<RuntimeShape extends Message, JsonType = JsonValue> =
  & Omit<DescMessage, "field">
  & { field: Record<MessageFieldNames<RuntimeShape>, DescField> }
  & brandv1<RuntimeShape, JsonType>;

/**
 * Describes an enumeration in a protobuf source file.
 *
 * This type is identical to DescEnum, but carries additional type
 * information.
 *
 * @private
 */
export type GenEnum<
  RuntimeShape extends number,
  JsonType extends JsonValue = JsonValue,
> = Omit<DescEnum, "value"> & {
  value: Record<RuntimeShape, DescEnumValue>;
} & brandv1<RuntimeShape, JsonType>;

/**
 * Describes an extension in a protobuf source file.
 *
 * This type is identical to DescExtension, but carries additional type
 * information.
 *
 * @private
 */
export type GenExtension<
  Extendee extends Message = Message,
  RuntimeShape = unknown,
> = DescExtension & brandv1<Extendee, RuntimeShape>;

/**
 * Describes a service declaration in a protobuf source file.
 *
 * This type is identical to DescService, but carries additional type
 * information.
 *
 * @private
 */
export type GenService<RuntimeShape extends GenServiceMethods> = Omit<
  DescService,
  "method"
> & {
  method: { [K in keyof RuntimeShape]: RuntimeShape[K] & DescMethod };
};

/**
 * @private
 */
export type GenServiceMethods = Record<
  string,
  Pick<DescMethod, "input" | "output" | "methodKind">
>;

class brandv1<A, B = unknown> {
  protected v = "codegenv1" as const;
  protected a: A | boolean = false;
  protected b: B | boolean = false;
}

/**
 * Union of the property names of all fields, including oneof members.
 * For an anonymous message (no generated message shape), it's simply a string.
 */
// prettier-ignore
type MessageFieldNames<T extends Message> = Message extends T ? string :
  Exclude<keyof {
    [P in keyof T as
    P extends ("$typeName" | "$unknown") ? never
    : T[P] extends Oneof<infer K> ? K
    : P
    ]-?: true;
  }, number | symbol>;

type Oneof<K extends string> = {
  case: K | undefined;
  value?: unknown;
};
