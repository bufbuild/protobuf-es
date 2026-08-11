// Copyright 2021-2026 Buf Technologies, Inc.
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

import { isMessage } from "./is-message.js";
import {
  type DescField,
  type DescMessage,
  type DescOneof,
  ScalarType,
} from "./descriptors.js";
import type { Message, MessageInitShape, MessageShape } from "./types.js";
import { type ScalarValue, scalarZeroValue } from "./reflect/scalar.js";
import { isObject } from "./reflect/guard.js";
import { isWrapperDesc } from "./wkt/wrappers.js";

// bootstrap-inject google.protobuf.Edition.EDITION_PROTO3: const $name = $number;
const EDITION_PROTO3 = 999;
// bootstrap-inject google.protobuf.Edition.EDITION_PROTO2: const $name = $number;
const EDITION_PROTO2 = 998;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name = $number;
const IMPLICIT = 2;

/**
 * Create a new message instance.
 *
 * The second argument is an optional initializer object, where all fields are
 * optional.
 */
export function create<Desc extends DescMessage>(
  schema: Desc,
  init?: MessageInitShape<Desc>,
): MessageShape<Desc> {
  if (isMessage(init, schema)) {
    return init;
  }
  return compiledCreate(schema)(
    init as Record<string, unknown> | undefined,
  ) as MessageShape<Desc>;
}

/**
 * Creates a message: a zero message without an init, otherwise with member
 * values from a MessageInitShape.
 */
type CompiledCreate = (init?: Record<string, unknown>) => Message;

const compiledCreates = new WeakMap<DescMessage, CompiledCreate>();

/**
 * Return the compiled create function for a message, compiling it on first use. */
function compiledCreate(desc: DescMessage): CompiledCreate {
  let compiled = compiledCreates.get(desc);
  if (compiled === undefined) {
    compiled = compileCreate(desc);
    compiledCreates.set(desc, compiled);
  }
  return compiled;
}

/** Singular field: scalar, enum, or message. */
const INIT_SINGULAR = 0;
/** List field: a zero message has a fresh empty array. */
const INIT_LIST = 1;
/** Map field: a zero message has a fresh empty object. */
const INIT_MAP = 2;
/** Oneof group: the ADT is always stored, cases convert by case name. */
const INIT_ONEOF = 3;

/** Definition of a message. */
interface InitMessage {
  /** One property per member of the message, in declaration order. */
  readonly properties: InitProperty[];
  /* Undefined for messages that track presence without the prototype chain. */
  readonly prototype: Record<string, unknown> | undefined;
}

/** Definition for one property of a message. */
type InitProperty = {
  readonly name: string;
} & (
  | {
      readonly kind: typeof INIT_SINGULAR;
      /** The zero value for implicit presence, undefined for explicit. */
      readonly constant: ScalarValue | undefined;
      readonly convert: Converter | undefined;
    }
  | {
      readonly kind: typeof INIT_LIST | typeof INIT_MAP;
      readonly constant: undefined;
      readonly convert: Converter | undefined;
    }
  | {
      readonly kind: typeof INIT_ONEOF;
      readonly constant: undefined;
      readonly convert: Map<string, Converter>;
    }
);

/* Compile the create function for this message type. */
function compileCreate(desc: DescMessage): CompiledCreate {
  const typeName = desc.typeName;
  const { properties, prototype } = compileInitMessage(desc);
  return (init) => {
    let message: Record<string, unknown>;
    if (prototype !== undefined) {
      message = Object.create(prototype) as Record<string, unknown>;
      message.$typeName = typeName;
    } else {
      message = { $typeName: typeName };
    }
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const name = property.name;
      const initValue = init?.[name];
      switch (property.kind) {
        case INIT_SINGULAR:
          if (initValue != null) {
            message[name] =
              property.convert !== undefined
                ? property.convert(initValue)
                : initValue;
          } else if (property.constant !== undefined) {
            message[name] = property.constant;
          }
          break;
        case INIT_LIST:
          message[name] =
            property.convert !== undefined && Array.isArray(initValue)
              ? initValue.map(property.convert)
              : (initValue ?? []);
          break;
        case INIT_MAP:
          // Object.create(null) would be desirable for the fresh map, but is
          // unsupported by React:
          // https://react.dev/reference/react/use-server#serializable-parameters-and-return-values
          if (property.convert === undefined || !isObject(initValue)) {
            message[name] = initValue ?? {};
          } else {
            const converted: Record<string, unknown> = {};
            const keys = Object.keys(initValue);
            for (let k = 0; k < keys.length; k++) {
              converted[keys[k]] = property.convert(initValue[keys[k]]);
            }
            message[name] = converted;
          }
          break;
        case INIT_ONEOF: {
          const oneofValue = initValue as
            | { case?: unknown; value?: unknown }
            | null
            | undefined;
          if (oneofValue?.case != null) {
            const convert = property.convert.get(oneofValue.case as string);
            if (convert !== undefined) {
              message[name] = {
                case: oneofValue.case,
                value: convert(oneofValue.value),
              };
              break;
            }
          }
          message[name] = { case: undefined };
          break;
        }
      }
    }
    return message as Message;
  };
}

/**
 * Classify every member once, so that creating a message is a walk over a
 * compact list instead of a walk over the descriptor.
 */
function compileInitMessage(desc: DescMessage): InitMessage {
  const properties: InitProperty[] = [];
  const prototype: Record<string, unknown> = {};
  const usePrototype = needsPrototypeChain(desc);

  for (const member of desc.members) {
    const name = member.localName;
    if (member.kind == "oneof") {
      properties.push({
        name,
        kind: INIT_ONEOF,
        constant: undefined,
        convert: compileConvertOneof(member),
      });
      continue;
    }
    switch (member.fieldKind) {
      case "message": {
        // Singular message fields are absent from a zero message.
        properties.push({
          name,
          kind: INIT_SINGULAR,
          constant: undefined,
          convert: compileConvertMessage(member),
        });
        break;
      }
      case "list": {
        properties.push({
          name,
          kind: INIT_LIST,
          constant: undefined,
          convert:
            member.listKind == "message"
              ? compileConvertMessage(member)
              : member.scalar == ScalarType.BYTES
                ? toU8Arr
                : undefined,
        });
        break;
      }
      case "map": {
        properties.push({
          name,
          kind: INIT_MAP,
          constant: undefined,
          convert:
            member.mapKind == "message"
              ? compileConvertMessage(member)
              : member.scalar == ScalarType.BYTES
                ? toU8Arr
                : undefined,
        });
        break;
      }
      default: {
        const zeroValue = createZeroValue(member);
        properties.push({
          name,
          kind: INIT_SINGULAR,
          constant: member.presence == IMPLICIT ? zeroValue : undefined,
          convert:
            member.fieldKind == "scalar" && member.scalar == ScalarType.BYTES
              ? toU8Arr
              : undefined,
        });
        if (usePrototype) {
          prototype[name] = zeroValue;
        }
        break;
      }
    }
  }

  return {
    properties,
    prototype: usePrototype ? prototype : undefined,
  };
}

/**
 * Compile the conversion of each case of a oneof group, keyed by case name.
 */
function compileConvertOneof(oneof: DescOneof): Map<string, Converter> {
  const converters = new Map<string, Converter>();
  for (const field of oneof.fields) {
    let convert: Converter | undefined;
    if (field.fieldKind == "message") {
      convert = compileConvertMessage(field);
    } else if (
      field.fieldKind == "scalar" &&
      field.scalar == ScalarType.BYTES
    ) {
      convert = toU8Arr;
    }
    converters.set(field.localName, convert ?? ((value) => value));
  }
  return converters;
}

/**
 * Converts a member value from a MessageInitShape to its message
 * representation.
 */
type Converter = (value: unknown) => unknown;

/**
 * Compile the conversion of an init value for a message field, a message
 * list item, or a message map value. Returns undefined if values are used
 * as-is.
 */
function compileConvertMessage(
  field: DescField & { message: DescMessage },
): Converter | undefined {
  if (
    field.fieldKind == "message" &&
    !field.oneof &&
    isWrapperDesc(field.message)
  ) {
    // Types from google/protobuf/wrappers.proto are unwrapped when used in
    // a singular field that is not part of a oneof group.
    return field.message.fields[0].scalar == ScalarType.BYTES
      ? toU8Arr
      : undefined;
  }
  if (
    field.message.typeName == "google.protobuf.Struct" &&
    field.parent.typeName !== "google.protobuf.Value"
  ) {
    // google.protobuf.Struct is represented with JsonObject when used in a
    // field, except when used in google.protobuf.Value.
    return undefined;
  }
  const messageDesc = field.message;
  // Resolved on first use, not here: the message type can be this very field's
  // parent, whose create function is still being compiled.
  let compiled: CompiledCreate | undefined;
  return (value) => {
    if (!isObject(value) || isMessage(value, messageDesc)) {
      return value;
    }
    compiled ??= compiledCreate(messageDesc);
    return compiled(value);
  };
}

// converts any ArrayLike<number> to Uint8Array if necessary.
function toU8Arr(value: unknown) {
  return Array.isArray(value) ? new Uint8Array(value) : value;
}

/**
 * Do we need the prototype chain to track field presence?
 */
function needsPrototypeChain(desc: DescMessage): boolean {
  switch (desc.file.edition) {
    case EDITION_PROTO3:
      // proto3 always uses implicit presence, we never need the prototype chain.
      return false;
    case EDITION_PROTO2:
      // proto2 never uses implicit presence, we always need the prototype chain.
      return true;
    default:
      // If a message uses scalar or enum fields with explicit presence, we need
      // the prototype chain to track presence. This rule does not apply to fields
      // in a oneof group - they use a different mechanism to track presence.
      return desc.fields.some(
        (f) => f.presence != IMPLICIT && f.fieldKind != "message" && !f.oneof,
      );
  }
}

/**
 * Returns the zero value for a scalar or enum field. Scalar and enum fields
 * can have default values.
 */
function createZeroValue(
  field: DescField & { fieldKind: "scalar" | "enum" },
): ScalarValue {
  const defaultValue = field.getDefaultValue();
  if (defaultValue !== undefined) {
    return field.fieldKind == "scalar" && field.longAsString
      ? defaultValue.toString()
      : defaultValue;
  }
  return field.fieldKind == "scalar"
    ? scalarZeroValue(field.scalar, field.longAsString)
    : field.enum.values[0].number;
}
