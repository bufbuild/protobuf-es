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

import { isMessage } from "./is-message.js";
import type { DescField, DescMessage, DescOneof } from "./desc-types.js";
import type { Message, MessageInitShape, MessageShape } from "./types.js";
import { localName } from "./reflect/names.js";
import { LongType, ScalarType, scalarZeroValue } from "./reflect/scalar.js";
import { FieldError } from "./reflect/error.js";
import { isObject, type OneofADT } from "./reflect/guard.js";
import { unsafeGet, unsafeOneofCase, unsafeSet } from "./reflect/unsafe.js";
import { isWrapperDesc } from "./wkt/wrappers.js";
import type {
  Edition,
  FeatureSet_FieldPresence,
} from "./wkt/gen/google/protobuf/descriptor_pbv2.js";

// bootstrap-inject google.protobuf.Edition.EDITION_PROTO3: const $name: Edition.$localName = $number;
const EDITION_PROTO3: Edition.EDITION_PROTO3 = 999;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.EXPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
const EXPLICIT: FeatureSet_FieldPresence.EXPLICIT = 1;
// bootstrap-inject google.protobuf.FeatureSet.FieldPresence.IMPLICIT: const $name: FeatureSet_FieldPresence.$localName = $number;
const IMPLICIT: FeatureSet_FieldPresence.IMPLICIT = 2;

/**
 * Create a new message instance.
 *
 * The second argument is an optional initializer object, where all fields are
 * optional.
 */
export function create<Desc extends DescMessage>(
  messageDesc: Desc,
  init?: MessageInitShape<Desc>,
): MessageShape<Desc> {
  if (isMessage(init, messageDesc)) {
    return init;
  }
  const message = createZeroMessage(messageDesc) as MessageShape<Desc>;
  if (init !== undefined) {
    initMessage(messageDesc, message, init);
  }
  return message;
}

/**
 * Sets field values from a MessageInitShape on a zero message.
 */
function initMessage<Desc extends DescMessage>(
  messageDesc: Desc,
  message: MessageShape<Desc>,
  init: MessageInitShape<Desc>,
): MessageShape<Desc> | FieldError {
  for (const member of messageDesc.members) {
    let value = (init as Record<string, unknown>)[localName(member)];
    if (value == null) {
      // intentionally ignore undefined and null
      continue;
    }
    let field: DescField;
    if (member.kind == "oneof") {
      const oneofField = unsafeOneofCase(init, member);
      if (!oneofField) {
        continue;
      }
      field = oneofField;
      value = unsafeGet(init, oneofField);
    } else {
      field = member;
    }
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- no need to convert enum
    switch (field.fieldKind) {
      case "message":
        if (isWrapperDesc(field.message)) {
          value = initScalar(field.message.fields[0], value);
        } else {
          value = toMessage(value, field.message);
        }
        break;
      case "scalar":
        value = initScalar(field, value);
        break;
      case "list":
        value = initList(field, value);
        break;
      case "map":
        value = initMap(field, value);
        break;
    }
    unsafeSet(message, field, value);
  }
  return message;
}

function initScalar(
  field: DescField & { fieldKind: "scalar" },
  value: unknown,
): unknown {
  if (field.scalar == ScalarType.BYTES) {
    return toU8Arr(value);
  }
  return value;
}

function initMap(
  field: DescField & { fieldKind: "map" },
  value: unknown,
): unknown {
  if (isObject(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return convertObjectValues(value, toU8Arr);
    }
    if (field.mapKind == "message") {
      return convertObjectValues(value, (val) => toMessage(val, field.message));
    }
  }
  return value;
}

function initList(
  field: DescField & { fieldKind: "list" },
  value: unknown,
): unknown {
  if (Array.isArray(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return value.map(toU8Arr);
    }
    if (field.listKind == "message") {
      return value.map((item: unknown) => toMessage(item, field.message));
    }
  }
  return value;
}

function toMessage(value: unknown, message: DescMessage): unknown {
  if (!isMessage(value, message) && isObject(value)) {
    return create(message, value);
  }
  return value;
}

// converts any ArrayLike<number> to Uint8Array if necessary.
function toU8Arr(value: unknown) {
  return Array.isArray(value) ? new Uint8Array(value) : value;
}

function convertObjectValues(
  obj: Record<string, unknown>,
  fn: (val: unknown) => unknown,
): Record<string, unknown> {
  const ret: Record<string, unknown> = {};
  for (const entry of Object.entries(obj)) {
    ret[entry[0]] = fn(entry[1]);
  }
  return ret;
}

const tokenZeroMessageField = Symbol();

const messagePrototypes = new WeakMap<
  DescMessage,
  { prototype: Record<string, unknown>; members: Set<DescField | DescOneof> }
>();

/**
 * Create a zero message.
 */
function createZeroMessage(desc: DescMessage): Message {
  let msg: Record<string, unknown>;
  if (desc.file.edition == EDITION_PROTO3) {
    // we special case proto3: since it does not have default values, we let
    // the `optional` keyword generate an optional property.
    msg = {};
    for (const member of desc.members) {
      if (member.kind == "field") {
        if (
          member.fieldKind == "scalar" ||
          member.fieldKind == "enum" ||
          member.fieldKind == "message"
        ) {
          if (member.presence == EXPLICIT) {
            // skips message fields and optional scalar/enum
            continue;
          }
        }
      }
      msg[localName(member)] = createZeroField(member);
    }
  } else {
    // for everything but proto3, we support default values, and track presence
    // via the prototype chain
    const cached = messagePrototypes.get(desc);
    let prototype: Record<string, unknown>;
    let members: Set<DescField | DescOneof>;
    if (cached) {
      ({ prototype, members } = cached);
    } else {
      prototype = {};
      members = new Set<DescField | DescOneof>();
      for (const member of desc.members) {
        if (member.kind == "oneof") {
          // we can only put immutable values on the prototype,
          // oneof ADTs are mutable
          continue;
        }
        if (member.fieldKind != "scalar" && member.fieldKind != "enum") {
          // only scalar and enum values are immutable, map, list, and message
          // are not
          continue;
        }
        if (member.presence == IMPLICIT) {
          // implicit presence tracks field presence by zero values
          // e.g. 0, false, "", are unset, 1, true, "x" are set
          continue;
        }
        members.add(member);
        prototype[localName(member)] = createZeroField(member);
      }
      messagePrototypes.set(desc, { prototype, members });
    }
    msg = Object.create(prototype) as Record<string, unknown>;
    for (const member of desc.members) {
      if (members.has(member)) {
        continue;
      }
      if (member.kind == "field") {
        if (member.fieldKind == "message") {
          continue;
        }
        if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
          if (member.presence != IMPLICIT) {
            continue;
          }
        }
      }
      msg[localName(member)] = createZeroField(member);
    }
  }
  msg.$typeName = desc.typeName;
  return msg as Message;
}

/**
 * Returns a zero value for oneof groups, and for every field kind except
 * messages. Scalar and enum fields can have default values.
 */
function createZeroField(
  field: DescOneof | DescField,
):
  | string
  | boolean
  | number
  | bigint
  | Uint8Array
  | OneofADT
  | []
  | object
  | typeof tokenZeroMessageField {
  if (field.kind == "oneof") {
    return { case: undefined };
  }
  if (field.fieldKind == "list") {
    return [];
  }
  if (field.fieldKind == "map") {
    return {}; // Object.create(null) would be desirable here, but is unsupported by react https://react.dev/reference/react/use-server#serializable-parameters-and-return-values
  }
  if (field.fieldKind == "message") {
    return tokenZeroMessageField;
  }
  const defaultValue = field.getDefaultValue();
  if (defaultValue !== undefined) {
    return field.fieldKind == "scalar" && field.longType == LongType.STRING
      ? defaultValue.toString()
      : defaultValue;
  }
  return field.fieldKind == "scalar"
    ? scalarZeroValue(field.scalar, field.longType)
    : field.enum.values[0].number;
}
