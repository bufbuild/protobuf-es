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

import { scalarZeroValue } from "./scalars.js";
import type { Extension } from "../extension.js";
import type { AnyMessage, Message } from "../message.js";
import type { FieldInfo, OneofInfo, PartialFieldInfo } from "../field.js";
import { WireType } from "../binary-encoding.js";
import type { ProtoRuntime } from "./proto-runtime.js";
import type { MessageType } from "../message-type.js";

export type ExtensionFieldSource =
  | extensionFieldRules<FieldInfo>
  | extensionFieldRules<PartialFieldInfo>
  | (() => extensionFieldRules<FieldInfo>)
  | (() => extensionFieldRules<PartialFieldInfo>);

// prettier-ignore
type extensionFieldRules<T extends FieldInfo | PartialFieldInfo> =
   T extends { kind: "map" } ? never
  : T extends { oneof: string } ? never
  : T extends { oneof: OneofInfo } ? never
  : Omit<T, "name"> & Partial<Pick<T, "name">>;

/**
 * Create a new extension using the given runtime.
 */
export function makeExtension<E extends Message<E> = AnyMessage, V = unknown>(
  runtime: ProtoRuntime,
  typeName: string,
  extendee: MessageType<E>,
  field: ExtensionFieldSource,
): Extension<E, V> {
  let fi: FieldInfo | undefined;
  return {
    typeName,
    extendee,
    get field() {
      if (!fi) {
        const i = (typeof field == "function" ? field() : field) as Record<
          string,
          any // eslint-disable-line @typescript-eslint/no-explicit-any
        >;
        i.name = typeName.split(".").pop();
        i.jsonName = `[${typeName}]`;
        fi = runtime.util.newFieldList([i as PartialFieldInfo]).list()[0];
      }
      return fi;
    },
    runtime,
  };
}

/**
 * Create a container that allows us to read extension fields into it with the
 * same logic as regular fields.
 */
export function createExtensionContainer<
  E extends Message<E> = AnyMessage,
  V = unknown,
>(extension: Extension<E, V>): [Record<string, V>, () => V] {
  const localName = extension.field.localName;
  const container = Object.create(null) as Record<string, V>;
  container[localName] = initExtensionField(extension) as V;
  return [container, () => container[localName]];
}

function initExtensionField(ext: Extension): unknown {
  const field = ext.field;
  if (field.repeated) {
    return [];
  }
  if (field.default !== undefined) {
    return field.default;
  }
  switch (field.kind) {
    case "enum":
      return field.T.values[0].no;
    case "scalar":
      return scalarZeroValue(field.T, field.L);
    case "message":
      // eslint-disable-next-line no-case-declarations
      const T = field.T,
        value = new T();
      return T.fieldWrapper ? T.fieldWrapper.unwrapField(value) : value;
    case "map":
      throw "map fields are not allowed to be extensions";
  }
}

type UnknownField = {
  no: number;
  wireType: WireType;
  data: Uint8Array;
};
type UnknownFields = ReadonlyArray<UnknownField>;

/**
 * Helper to filter unknown fields, optimized based on field type.
 */
export function filterUnknownFields(
  unknownFields: UnknownFields,
  field: Pick<FieldInfo, "no" | "kind" | "repeated">,
): UnknownField[] {
  if (!field.repeated && (field.kind == "enum" || field.kind == "scalar")) {
    // singular scalar fields do not merge, we pick the last
    for (let i = unknownFields.length - 1; i >= 0; --i) {
      if (unknownFields[i].no == field.no) {
        return [unknownFields[i]];
      }
    }
    return [];
  }
  return unknownFields.filter((uf) => uf.no === field.no);
}
