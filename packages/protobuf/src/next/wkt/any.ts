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

import type { Message, MessageShape } from "../types.js";
import type { Any } from "./gen/google/protobuf/any_pbv2.js";
import { AnyDesc } from "./gen/google/protobuf/any_pbv2.js";
import type { DescMessage } from "../../descriptor-set.js";
import type { DescSet } from "../reflect/index.js";
import { create } from "../create.js";
import { toBinary } from "../to-binary.js";
import { fromBinary } from "../from-binary.js";

/**
 * Creates a `google.protobuf.Any` from a message.
 */
export function anyPack(message: Message): Any;
/**
 * Packs the message into the given any.
 */
export function anyPack(message: Message, into: Any): void;
export function anyPack(message: Message, into?: Any) {
  let ret = false;
  if (!into) {
    into = create(AnyDesc);
    ret = true;
  }
  into.value = toBinary(message);
  into.typeUrl = typeNameToUrl(message.$typeName);
  return ret ? into : undefined;
}

/**
 * Returns true if the Any contains the type given by messageDesc.
 */
export function anyIs(any: Any, messageDesc: DescMessage): boolean;
/**
 * Returns true if the Any contains a message with the given typeName.
 */
export function anyIs(any: Any, typeName: string): boolean;
export function anyIs(any: Any, descOrTypeName: DescMessage | string): boolean {
  if (any.typeUrl === "") {
    return false;
  }
  const want =
    typeof descOrTypeName == "string"
      ? descOrTypeName
      : descOrTypeName.typeName;
  const got = typeUrlToName(any.typeUrl);
  return want === got;
}

/**
 * Unpacks the message the Any represents.
 *
 * Returns undefined if the Any is empty, or if packed type is not included
 * in the given set.
 */
export function anyUnpack(any: Any, set: DescSet): Message | undefined;
/**
 * Unpacks the message the Any represents.
 *
 * Returns undefined if the Any is empty, or if it does not contain the type
 * given by messageDesc.
 */
export function anyUnpack<Desc extends DescMessage>(
  any: Any,
  messageDesc: Desc,
): MessageShape<Desc> | undefined;
export function anyUnpack(
  any: Any,
  descSetOrMessage: DescSet | DescMessage,
): Message | undefined {
  if (any.typeUrl === "") {
    return undefined;
  }
  const desc =
    descSetOrMessage.kind == "message"
      ? descSetOrMessage
      : descSetOrMessage.getMessage(typeUrlToName(any.typeUrl));
  if (!desc) {
    return undefined;
  }
  return fromBinary(desc, any.value);
}

/**
 * Same as anyUnpack but unpacks into the target message.
 */
export function anyUnpackTo(any: Any, target: Message) {
  if (any.typeUrl === "") {
    return undefined;
  }
  return fromBinary(target, any.value);
}

function typeNameToUrl(name: string): string {
  return `type.googleapis.com/${name}`;
}

function typeUrlToName(url: string): string {
  const slash = url.lastIndexOf("/");
  const name = slash >= 0 ? url.substring(slash + 1) : url;
  if (!name.length) {
    throw new Error(`invalid type url: ${url}`);
  }
  return name;
}
