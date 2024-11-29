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
import type { Any } from "./gen/google/protobuf/any_pb.js";
import { AnySchema } from "./gen/google/protobuf/any_pb.js";
import type { DescMessage } from "../descriptors.js";
import type { Registry } from "../registry.js";
import { create } from "../create.js";
import { toBinary } from "../to-binary.js";
import { fromBinary, mergeFromBinary } from "../from-binary.js";

/**
 * Creates a `google.protobuf.Any` from a message.
 */
export function anyPack<Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
): Any;

/**
 * Packs the message into the given any.
 */
export function anyPack<Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
  into: Any,
): void;

export function anyPack<Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
  into?: Any,
) {
  let ret = false;
  if (!into) {
    into = create(AnySchema);
    ret = true;
  }
  into.value = toBinary(schema, message);
  into.typeUrl = typeNameToUrl(message.$typeName);
  return ret ? into : undefined;
}

/**
 * Returns true if the Any contains the type given by schema.
 */
export function anyIs(any: Any, schema: DescMessage): boolean;

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
 * in the given registry.
 */
export function anyUnpack(any: Any, registry: Registry): Message | undefined;

/**
 * Unpacks the message the Any represents.
 *
 * Returns undefined if the Any is empty, or if it does not contain the type
 * given by schema.
 */
export function anyUnpack<Desc extends DescMessage>(
  any: Any,
  schema: Desc,
): MessageShape<Desc> | undefined;

export function anyUnpack(
  any: Any,
  registryOrMessageDesc: Registry | DescMessage,
): Message | undefined {
  if (any.typeUrl === "") {
    return undefined;
  }
  const desc =
    registryOrMessageDesc.kind == "message"
      ? registryOrMessageDesc
      : registryOrMessageDesc.getMessage(typeUrlToName(any.typeUrl));
  if (!desc || !anyIs(any, desc)) {
    return undefined;
  }
  return fromBinary(desc, any.value);
}

/**
 * Same as anyUnpack but unpacks into the target message.
 */
export function anyUnpackTo<Desc extends DescMessage>(
  any: Any,
  schema: Desc,
  message: MessageShape<Desc>,
) {
  if (!anyIs(any, schema)) {
    return undefined;
  }
  return mergeFromBinary(schema, message, any.value);
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
