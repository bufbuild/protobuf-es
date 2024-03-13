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
  TypedDescEnum,
  TypedDescMessage,
} from "./codegenv1/typed-desc.js";
import type { DescEnum, DescMessage } from "../descriptor-set.js";

export type Message<TypeName extends string = string> = {
  readonly $desc: DescMessage;
  readonly $typeName: TypeName;

  // TODO support unknown fields
  // $unknown?: ({no: number; wireType: WireType; data: Uint8Array; })[];
};

// TODO docs
export type MessageShape<Desc extends DescMessage> =
  Desc extends TypedDescMessage<infer RuntimeShape> ? RuntimeShape : Message;

// TODO docs
export type MessageInitShape<Desc extends DescMessage> =
  Desc extends TypedDescMessage<infer RuntimeShape>
    ? RuntimeShape | MessageInit<RuntimeShape>
    : Record<string, unknown>; // TODO better input type

// TODO docs
export type EnumShape<Desc extends DescEnum> =
  Desc extends TypedDescEnum<infer RuntimeShape> ? RuntimeShape : number;

// TODO ServiceShape
// TODO MethodShape?

type MessageInit<T extends Message> = {
  [P in keyof T as T extends "$desc" | "$typename" ? never : P]?: FieldInit<
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
  : F extends { case: string | undefined; value?: unknown; } ? F
  : F extends MapWithMessage<infer V> ? { [key: string | number]: MessageInit<V> }
  : F ;

type MapWithMessage<V extends Message> = {
  [key: string | number]: V;
};

type OneofSelectedMessage<K extends string, M extends Message> = {
  case: K;
  value: M;
};
