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

import type {
  GenDescEnum,
  GenDescExtension,
  GenDescMessage,
} from "./codegenv1/types.js";
import type { DescEnum, DescExtension, DescMessage } from "./descriptors.js";
import type { OneofADT } from "./reflect/guard.js";
import type { WireType } from "./wire/index.js";

/**
 * The type `Message` contains the properties shared by all messages.
 */
export type Message<TypeName extends string = string> = {
  /**
   * The fully qualified Protobuf type-name of the message.
   */
  readonly $typeName: TypeName;
  /**
   * Unknown fields and extensions stored on the message.
   */
  $unknown?: UnknownField[];
};

/**
 * Extract the message type from a message descriptor.
 */
export type MessageShape<Desc extends DescMessage> =
  Desc extends GenDescMessage<infer RuntimeShape> ? RuntimeShape : Message;

/**
 * Extract the init type from a message descriptor.
 * The init type is accepted by the function create().
 */
export type MessageInitShape<Desc extends DescMessage> =
  Desc extends GenDescMessage<infer RuntimeShape>
    ? RuntimeShape | MessageInit<RuntimeShape>
    : Record<string, unknown>; // TODO better input type?

/**
 * Extract the enum type of from an enum descriptor.
 */
export type EnumShape<Desc extends DescEnum> =
  Desc extends GenDescEnum<infer RuntimeShape> ? RuntimeShape : number;

/**
 * Extract the value type from an extension descriptor.
 */
export type ExtensionValueShape<Desc extends DescExtension> =
  Desc extends GenDescExtension<Message, infer RuntimeShape>
    ? RuntimeShape
    : unknown;

/**
 * Extract the type of the extended message from an extension descriptor.
 */
export type Extendee<Desc extends DescExtension> =
  Desc extends GenDescExtension<infer Extendee> ? Extendee : Message;

/**
 * Unknown fields are fields that were not recognized during parsing, or
 * extension.
 */
export type UnknownField = {
  readonly no: number;
  readonly wireType: WireType;
  readonly data: Uint8Array;
};

/**
 * The init type for a message, which makes all fields optional.
 * The init type is accepted by the function create().
 */
type MessageInit<T extends Message> = {
  [P in keyof T as P extends "$typeName" | "$unknown" ? never : P]?: FieldInit<
    T[P]
  >;
};

// prettier-ignore
type FieldInit<F> =
    F extends (Date | Uint8Array | bigint | boolean | string | number) ? F
  : F extends Array<infer U> ? Array<FieldInit<U>>
  : F extends ReadonlyArray<infer U> ? ReadonlyArray<FieldInit<U>>
  : F extends Message ? MessageInit<F>
  : F extends OneofSelectedMessage<infer C, infer V> ? {case: C; value: MessageInit<V>}
  : F extends OneofADT ? F
  : F extends MapWithMessage<infer V> ? { [key: string | number]: MessageInit<V> }
  : F ;

type MapWithMessage<V extends Message> = {
  [key: string | number]: V;
};

type OneofSelectedMessage<K extends string, M extends Message> = {
  case: K;
  value: M;
};
