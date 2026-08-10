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

// Cutoff below which storing properties one by one beats cloning a template.
const smallMessageMaxProperties = 16;

/**
 * Compile the create function for this message type, so that creating a
 * message does not interpret the descriptor every time.
 */
function compileCreate(desc: DescMessage): CompiledCreate {
  const typeName = desc.typeName;

  // Fields with explicit presence store default values in a prototype.
  const prototype: Record<string, unknown> = {};
  const usePrototype = needsPrototypeChain(desc);

  // Scalar / enum fields with implicit presence, and their zero values.
  const implicitScalars: string[] = [];
  const implicitScalarValues: unknown[] = [];

  // Fields containing mutable types - lists, maps, and oneofs.
  const lists: string[] = [];
  const maps: string[] = [];
  const oneofs: string[] = [];

  for (const member of desc.members) {
    if (member.kind == "oneof") {
      oneofs.push(member.localName);
      continue;
    }
    switch (member.fieldKind) {
      case "message":
        break;
      case "list":
        lists.push(member.localName);
        break;
      case "map":
        maps.push(member.localName);
        break;
      default:
        if (member.presence == IMPLICIT) {
          implicitScalars.push(member.localName);
          implicitScalarValues.push(createZeroValue(member));
        } else if (usePrototype) {
          prototype[member.localName] = createZeroValue(member);
        }
        break;
    }
  }

  // For smaller messages, a megamorphic clone has a high fixed cost, so we're
  // better off setting fields to their zero values ourselves.
  let template: Record<string, unknown> | undefined;
  const isSmallMessage = desc.members.length + 1 <= smallMessageMaxProperties; // + 1 for $typeName
  if (!isSmallMessage) {
    const skeleton: Record<string, unknown> = { $typeName: typeName };
    for (const key of [...implicitScalars, ...lists, ...maps, ...oneofs]) {
      skeleton[key] = null;
    }
    // Create the template shape via JSON.parse() - adding properties one by
    // one overflows V8's in-object slots.
    template = JSON.parse(JSON.stringify(skeleton)) as Record<string, unknown>;
    for (let i = 0; i < implicitScalars.length; i++) {
      template[implicitScalars[i]] = implicitScalarValues[i];
    }
  }

  // Cloning the template already sets zero values, only set zero values if we
  // are not cloning the template.
  const initializers = desc.members.map((member) =>
    compileInitMember(member, template === undefined),
  );

  return (init) => {
    let message: Record<string, unknown>;
    if (template === undefined) {
      if (usePrototype) {
        message = Object.create(prototype) as Record<string, unknown>;
        message.$typeName = typeName;
      } else {
        message = { $typeName: typeName };
      }
      if (init === undefined) {
        for (let i = 0; i < implicitScalars.length; i++) {
          message[implicitScalars[i]] = implicitScalarValues[i];
        }
      }
    } else {
      if (usePrototype) {
        message = Object.assign(
          Object.create(prototype) as Record<string, unknown>,
          template,
        );
      } else {
        message = { ...template };
      }
    }
    if (init === undefined) {
      for (let i = 0; i < lists.length; i++) {
        message[lists[i]] = [];
      }
      for (let i = 0; i < maps.length; i++) {
        message[maps[i]] = {};
      }
      for (let i = 0; i < oneofs.length; i++) {
        message[oneofs[i]] = { case: undefined };
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
 * Sets one member from a MessageInitShape on a message under construction.
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

function compileInitMember(
  member: DescField | DescOneof,
  setZeroValues: boolean,
): MemberInit {
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
      return compileInitProperty(member.localName, convert);
    case "scalar":
    case "enum": {
      const convert =
        member.fieldKind == "scalar" && member.scalar == ScalarType.BYTES
          ? toU8Arr
          : undefined;
      return member.presence == IMPLICIT && setZeroValues
        ? compileInitPropertyWithZeroValue(
            member.localName,
            convert,
            createZeroValue(member),
          )
        : compileInitProperty(member.localName, convert);
    }
  }
}

function compileInitProperty(
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

function compileInitPropertyWithZeroValue(
  name: string,
  convert: Converter | undefined,
  zeroValue: unknown,
): MemberInit {
  if (convert === undefined) {
    return (message, init) => {
      const value = init[name];
      message[name] = value ?? zeroValue;
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
      message[name] = value ?? [];
    };
  }
  return (message, init) => {
    const value = init[name];
    message[name] = Array.isArray(value)
      ? value.map(convertItem)
      : (value ?? []);
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
      message[name] = value ?? {};
    };
  }
  return (message, init) => {
    const value = init[name];
    if (value == null) {
      message[name] = {};
    } else if (isObject(value)) {
      const convertedValues: Record<string, unknown> = {};
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
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
