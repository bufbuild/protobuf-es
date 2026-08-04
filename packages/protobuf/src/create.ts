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
import { scalarZeroValue } from "./reflect/scalar.js";
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
 * Return the compiled create function for a message, compiling it on
 * first use.
 */
function compiledCreate(desc: DescMessage): CompiledCreate {
  let compiled = compiledCreates.get(desc);
  if (compiled === undefined) {
    compiled = compileCreate(desc);
    compiledCreates.set(desc, compiled);
  }
  return compiled;
}

// Cutoff below which storing properties in a loop beats cloning the template.
const smallMessageMaxProperties = 12;

/**
 * Compile the create function for this message type, so that creating a
 * message does not interpret the descriptor every time.
 */
function compileCreate(desc: DescMessage): CompiledCreate {
  const values = new Map<string, unknown>([["$typeName", desc.typeName]]);

  // Default values for fields with explicit presence, served via the
  // prototype chain, where presence is tracked by own properties.
  const prototype: Record<string, unknown> = {};
  const usePrototypeChain = needsPrototypeChain(desc);

  const lists: string[] = [];
  const maps: string[] = [];
  const oneofs: string[] = [];

  // Mutable values (lists, maps, oneofs) cannot be shared via the template.
  // We store nulls in their slots that we replace later.
  for (const member of desc.members) {
    if (member.kind == "oneof") {
      values.set(member.localName, null);
      oneofs.push(member.localName);
      continue;
    }
    switch (member.fieldKind) {
      case "message":
        // Message fields track presence by absence of the property.
        break;
      case "list":
        values.set(member.localName, null);
        lists.push(member.localName);
        break;
      case "map":
        values.set(member.localName, null);
        maps.push(member.localName);
        break;
      default:
        if (member.presence == IMPLICIT) {
          values.set(member.localName, createZeroValue(member));
        } else if (usePrototypeChain) {
          prototype[member.localName] = createZeroValue(member);
        }
        break;
    }
  }

  const initializers = desc.members.map((member) => compileInitMember(member));
  const typeName = desc.typeName;

  const zeroNames: string[] = [];
  const zeroValues: unknown[] = [];
  let template: Record<string, unknown> | undefined;

  // Small messages are built with a store per property instead of cloning a
  // template: below the threshold this beats the megamorphic clone.
  const isSmallMessage = values.size <= smallMessageMaxProperties;
  if (isSmallMessage) {
    for (const [key, value] of values) {
      if (key != "$typeName" && value !== null) {
        zeroNames.push(key);
        zeroValues.push(value);
      }
    }
  } else {
    const skeleton: Record<string, null> = {};
    for (const key of values.keys()) {
      skeleton[key] = null;
    }
    // Create the template shape in one shot via JSON.parse - adding properties
    // one by one overflows V8's in-object slots.
    template = JSON.parse(JSON.stringify(skeleton)) as Record<string, unknown>;
    for (const [key, value] of values) {
      template[key] = value;
    }
  }

  return (init) => {
    let message: Record<string, unknown>;
    if (template !== undefined) {
      if (usePrototypeChain) {
        message = Object.assign(
          Object.create(prototype) as Record<string, unknown>,
          template,
        );
      } else {
        message = { ...template };
      }
    } else if (usePrototypeChain) {
      message = Object.create(prototype) as Record<string, unknown>;
      message.$typeName = typeName;
    } else {
      message = { $typeName: typeName };
    }
    if (init === undefined) {
      for (let i = 0; i < zeroNames.length; i++) {
        message[zeroNames[i]] = zeroValues[i];
      }
      for (const name of lists) {
        message[name] = [];
      }
      for (const name of maps) {
        message[name] = {};
      }
      for (const name of oneofs) {
        message[name] = { case: undefined };
      }
      return message as Message;
    }
    for (let i = 0; i < initializers.length; i++) {
      initializers[i](message, init);
    }
    return message as Message;
  };
}

/**
 * Sets one member from a MessageInitShape on a cloned template.
 */
type MemberInit = (
  message: Record<string, unknown>,
  init: Record<string, unknown>,
) => void;

/**
 * Converts a member value from a MessageInitShape to its message
 * representation.
 */
type Converter = (value: unknown) => unknown;

function compileInitMember(member: DescField | DescOneof): MemberInit {
  if (member.kind == "oneof") {
    return compileInitOneof(member);
  }
  switch (member.fieldKind) {
    case "list":
      return compileInitList(member);
    case "map":
      return compileInitMap(member);
    case "message":
      const convert = compileConvertMessage(member);
      return compileInitExplicit(member.localName, convert);
    case "scalar":
    case "enum": {
      const convert =
        member.fieldKind == "scalar" && member.scalar == ScalarType.BYTES
          ? toU8Arr
          : undefined;
      return member.presence == IMPLICIT
        ? compileInitImplicit(
            member.localName,
            convert,
            createZeroValue(member),
          )
        : compileInitExplicit(member.localName, convert);
    }
  }
}

function compileInitExplicit(
  name: string,
  convert: Converter | undefined,
): MemberInit {
  if (convert === undefined) {
    return (message, init) => {
      const value = init[name];
      if (value != null) {
        message[name] = value;
      }
    };
  }
  return (message, init) => {
    const value = init[name];
    if (value != null) {
      message[name] = convert(value);
    }
  };
}

function compileInitImplicit(
  name: string,
  convert: Converter | undefined,
  zeroValue: unknown,
): MemberInit {
  if (convert === undefined) {
    return (message, init) => {
      const value = init[name];
      message[name] = value != null ? value : zeroValue;
    };
  }
  return (message, init) => {
    const value = init[name];
    message[name] = value != null ? convert(value) : zeroValue;
  };
}

function compileInitList(field: DescField & { fieldKind: "list" }): MemberInit {
  const name = field.localName;
  let convertItem: Converter | undefined;
  if (field.listKind == "message") {
    convertItem = compileConvertMessage(field);
  } else if (field.scalar == ScalarType.BYTES) {
    convertItem = toU8Arr;
  }
  if (convertItem === undefined) {
    return (message, init) => {
      const value = init[name];
      message[name] = value == null ? [] : value;
    };
  }
  return (message, init) => {
    const value = init[name];
    message[name] =
      value == null
        ? []
        : Array.isArray(value)
          ? value.map(convertItem)
          : value;
  };
}

function compileInitMap(field: DescField & { fieldKind: "map" }): MemberInit {
  const name = field.localName;
  let convertValue: Converter | undefined;
  if (field.mapKind == "message") {
    convertValue = compileConvertMessage(field);
  } else if (field.scalar == ScalarType.BYTES) {
    convertValue = toU8Arr;
  }
  if (convertValue === undefined) {
    return (message, init) => {
      const value = init[name];
      // Object.create(null) would be desirable for the fresh map, but is
      // unsupported by React:
      // https://react.dev/reference/react/use-server#serializable-parameters-and-return-values
      message[name] = value == null ? {} : value;
    };
  }
  return (message, init) => {
    const value = init[name];
    if (value == null) {
      message[name] = {};
    } else if (isObject(value)) {
      const convertedValues: Record<string, unknown> = {};
      for (const key of Object.keys(value)) {
        convertedValues[key] = convertValue(value[key]);
      }
      message[name] = convertedValues;
    } else {
      message[name] = value;
    }
  };
}

function compileInitOneof(oneof: DescOneof): MemberInit {
  const name = oneof.localName;
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
  return (message, init) => {
    const oneofValue = init[name] as
      | { case?: unknown; value?: unknown }
      | null
      | undefined;
    if (oneofValue != null && oneofValue.case != null) {
      const convert = converters.get(oneofValue.case as string);
      if (convert !== undefined) {
        message[name] = {
          case: oneofValue.case,
          value: convert(oneofValue.value),
        };
        return;
      }
    }
    message[name] = { case: undefined };
  };
}

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
  return (value) => (isObject(value) ? create(messageDesc, value) : value);
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
): string | boolean | number | bigint | Uint8Array {
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
