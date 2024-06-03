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
  DescExtension,
  DescField,
  DescFile,
  DescMessage,
  DescMethod,
  DescService,
} from "../descriptors.js";

/**
 * Describes a protobuf source file.
 *
 * @private
 */
export type GenDescFile = DescFile;

/**
 * Describes a message declaration in a protobuf source file.
 *
 * This type is identical to DescMessage, but carries additional type
 * information.
 *
 * @private
 */
// prettier-ignore
export type GenDescMessage<RuntimeShape extends Message> =
  & Omit<DescMessage, "field">
  & { field: Record<MessageFieldNames<RuntimeShape>, DescField> }
  & brand<RuntimeShape>;

/**
 * Describes an enumeration in a protobuf source file.
 *
 * This type is identical to DescEnum, but carries additional type
 * information.
 *
 * @private
 */
export type GenDescEnum<RuntimeShape> = DescEnum & brand<RuntimeShape>;

/**
 * Describes an extension in a protobuf source file.
 *
 * This type is identical to DescExtension, but carries additional type
 * information.
 *
 * @private
 */
export type GenDescExtension<
  Extendee extends Message = Message,
  RuntimeShape = unknown,
> = DescExtension & brand<Extendee, RuntimeShape>;

/**
 * Describes a service declaration in a protobuf source file.
 *
 * This type is identical to DescService, but carries additional type
 * information.
 *
 * @private
 */
export type GenDescService<RuntimeShape extends GenDescServiceMethods> = Omit<
  DescService,
  "method"
> & {
  method: { [K in keyof RuntimeShape]: RuntimeShape[K] & DescMethod };
};

/**
 * @private
 */
export type GenDescServiceMethods = Record<
  string,
  Pick<DescMethod, "input" | "output" | "methodKind">
>;

class brand<A, B = unknown> {
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
