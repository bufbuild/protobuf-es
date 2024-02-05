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

import type { JsonFormat, JsonValue } from "../json-format.js";
import type { BinaryFormat } from "../binary-format.js";
import type { AnyMessage } from "../message.js";
import type { Message } from "../message.js";
import type { EnumType, EnumValueInfo } from "../enum.js";
import type { MessageType } from "../message-type.js";
import type { FieldListSource } from "./field-list.js";
import type { EnumObject } from "./enum.js";
import { getEnumType, makeEnum, makeEnumType } from "./enum.js";
import type { Util } from "./util.js";
import { makeMessageType } from "./message-type.js";
import type { Extension } from "../extension.js";
import type { ExtensionFieldSource } from "./extensions.js";
import { makeExtension } from "./extensions.js";
import { makeJsonFormat } from "./json-format.js";
import { makeBinaryFormat } from "./binary-format.js";
import { makeUtilCommon } from "./util-common.js";

/**
 * A facade that provides serialization and other internal functionality.
 */
export interface ProtoRuntime {
  readonly syntax: string;
  readonly json: JsonFormat;
  readonly bin: BinaryFormat;
  readonly util: Util;

  /**
   * Create a message type at runtime, without generating code.
   */
  makeMessageType<T extends Message<T> = AnyMessage>(
    typeName: string,
    fields: FieldListSource,
    opt?: {
      localName?: string;
      // We do not surface options at this time
      // options?: { readonly [extensionName: string]: JsonValue };
    },
  ): MessageType<T>;

  /**
   * Create an enum object at runtime, without generating code.
   *
   * The object conforms to TypeScript enums, and comes with
   * mapping from name to value, and from value to name.
   *
   * The type name and other reflection information is accessible
   * via getEnumType().
   */
  makeEnum(
    typeName: string,
    values: (EnumValueInfo | Omit<EnumValueInfo, "localName">)[],
    opt?: {
      // We do not surface options at this time
      // options?: { readonly [extensionName: string]: JsonValue };
    },
  ): EnumObject;

  /**
   * Create an enum type at runtime, without generating code.
   * Note that this only creates the reflection information, not an
   * actual enum object.
   */
  makeEnumType(
    typeName: string,
    values: (EnumValueInfo | Omit<EnumValueInfo, "localName">)[],
    opt?: {
      // We do not surface options at this time
      // options?: { readonly [extensionName: string]: JsonValue };
    },
  ): EnumType;

  /**
   * Get reflection information - the EnumType - from an enum object.
   * If this function is called on something other than a generated
   * enum, or an enum constructed with makeEnum(), it raises an error.
   */
  getEnumType(enumObject: EnumObject): EnumType;

  /**
   * Create an extension at runtime, without generating code.
   */
  makeExtension<E extends Message<E> = AnyMessage, V = unknown>(
    typeName: string,
    extendee: MessageType<E>,
    field: ExtensionFieldSource,
  ): Extension<E, V>;
}

export function makeProtoRuntime(
  syntax: string,
  newFieldList: Util["newFieldList"],
  initFields: Util["initFields"],
): ProtoRuntime {
  return {
    syntax,
    json: makeJsonFormat(),
    bin: makeBinaryFormat(),
    util: {
      ...makeUtilCommon(),
      newFieldList,
      initFields,
    },
    makeMessageType(
      typeName: string,
      fields: FieldListSource,
      opt?: {
        localName?: string;
        options?: { readonly [extensionName: string]: JsonValue };
      },
    ) {
      return makeMessageType(this, typeName, fields, opt);
    },
    makeEnum,
    makeEnumType,
    getEnumType,
    makeExtension(typeName, extendee, field) {
      return makeExtension(this, typeName, extendee, field);
    },
  };
}
